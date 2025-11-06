// ============================================
// PORTFOLIO SCREEN - Holdings & Performance
// Features: Holdings list, total P&L, performance metrics, diversification
// ============================================

import EmptyState from '@/components/common/EmptyState';
import { useAppSelector } from '@/src/store/hooks';
import type { Position } from '@/src/types';
import { formatCurrency, formatPercent, getProfitColor } from '@/src/utils/helpers';
import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import React, { useMemo } from 'react';
import {
    FlatList,
    Platform,
    RefreshControl,
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from 'react-native';

export default function PortfolioScreen() {
  const portfolio = useAppSelector((state) => state.portfolio.portfolio);
  const stocks = useAppSelector((state) => state.market.stocks);
  const [refreshing, setRefreshing] = React.useState(false);

  // Calculate total portfolio value with current prices
  const portfolioValue = useMemo(() => {
    let totalInvested = 0;
    let currentValue = 0;

    portfolio.positions.forEach((position: Position) => {
      const stock = stocks.find((s: any) => s.id === position.stockId);
      if (stock) {
        totalInvested += position.investedAmount;
        currentValue += stock.price * position.quantity;
      }
    });

    const profitLoss = currentValue - totalInvested;
    const profitLossPercent = totalInvested > 0 ? (profitLoss / totalInvested) * 100 : 0;

    return {
      totalInvested,
      currentValue,
      profitLoss,
      profitLossPercent,
    };
  }, [portfolio.positions, stocks]);

  // Calculate today's change
  const todaysChange = useMemo(() => {
    let change = 0;
    portfolio.positions.forEach((position: Position) => {
      const stock = stocks.find((s: any) => s.id === position.stockId);
      if (stock) {
        change += stock.change * position.quantity;
      }
    });
    return change;
  }, [portfolio.positions, stocks]);

  // Get positions with current data
  const positionsWithCurrentData = useMemo(() => {
    return portfolio.positions
      .map((position: Position) => {
        const stock = stocks.find((s: any) => s.id === position.stockId);
        if (!stock) return null;

        const currentValue = stock.price * position.quantity;
        const profitLoss = currentValue - position.investedAmount;
        const profitLossPercent = (profitLoss / position.investedAmount) * 100;

        return {
          ...position,
          currentPrice: stock.price,
          currentValue,
          profitLoss,
          profitLossPercent,
          change: stock.change,
          changePercent: stock.changePercent,
        };
      })
      .filter((p: any): p is NonNullable<typeof p> => p !== null)
      .sort((a: any, b: any) => b.currentValue - a.currentValue);
  }, [portfolio.positions, stocks]);

  // Calculate sector allocation
  const sectorAllocation = useMemo(() => {
    const allocation: { [key: string]: number } = {};
    
    positionsWithCurrentData.forEach((position: any) => {
      const stock = stocks.find((s: any) => s.id === position.stockId);
      if (stock) {
        const sector = stock.sector;
        allocation[sector] = (allocation[sector] || 0) + position.currentValue;
      }
    });

    return Object.entries(allocation)
      .map(([sector, value]) => ({
        sector,
        value,
        percentage: (value / portfolioValue.currentValue) * 100,
      }))
      .sort((a, b) => b.value - a.value);
  }, [positionsWithCurrentData, stocks, portfolioValue.currentValue]);

  const onRefresh = async () => {
    setRefreshing(true);
    // Simulate refresh delay
    setTimeout(() => setRefreshing(false), 1000);
  };

  const renderPositionCard = ({ item }: { item: any }) => {
    const profitColor = getProfitColor(item.profitLoss);
    const changeColor = getProfitColor(item.change);

    return (
      <TouchableOpacity
        style={styles.positionCard}
        onPress={() => router.push(`/stock/${item.stockSymbol}`)}
      >
        <View style={styles.positionHeader}>
          <View>
            <Text style={styles.positionSymbol}>{item.stockSymbol}</Text>
            <Text style={styles.positionName}>{item.stockName}</Text>
          </View>
          <View style={styles.positionHeaderRight}>
            <Text style={styles.positionValue}>
              {formatCurrency(item.currentValue)}
            </Text>
            <View style={styles.positionChangeRow}>
              <Ionicons
                name={item.change >= 0 ? 'trending-up' : 'trending-down'}
                size={14}
                color={changeColor}
              />
              <Text style={[styles.positionChange, { color: changeColor }]}>
                {formatPercent(item.changePercent)}
              </Text>
            </View>
          </View>
        </View>

        <View style={styles.positionDivider} />

        <View style={styles.positionDetails}>
          <View style={styles.positionDetailItem}>
            <Text style={styles.positionDetailLabel}>Quantity</Text>
            <Text style={styles.positionDetailValue}>{item.quantity}</Text>
          </View>
          <View style={styles.positionDetailItem}>
            <Text style={styles.positionDetailLabel}>Avg Price</Text>
            <Text style={styles.positionDetailValue}>
              {formatCurrency(item.avgBuyPrice)}
            </Text>
          </View>
          <View style={styles.positionDetailItem}>
            <Text style={styles.positionDetailLabel}>Current</Text>
            <Text style={styles.positionDetailValue}>
              {formatCurrency(item.currentPrice)}
            </Text>
          </View>
        </View>

        <View style={styles.profitLossContainer}>
          <View style={styles.profitLossRow}>
            <Text style={styles.profitLossLabel}>P&L</Text>
            <View style={styles.profitLossValues}>
              <Text style={[styles.profitLossAmount, { color: profitColor }]}>
                {item.profitLoss >= 0 ? '+' : ''}
                {formatCurrency(item.profitLoss)}
              </Text>
              <Text style={[styles.profitLossPercent, { color: profitColor }]}>
                ({item.profitLossPercent >= 0 ? '+' : ''}
                {formatPercent(item.profitLossPercent)})
              </Text>
            </View>
          </View>
        </View>
      </TouchableOpacity>
    );
  };

  const renderSectorCard = ({ item }: { item: any }) => (
    <View style={styles.sectorCard}>
      <View style={styles.sectorHeader}>
        <View style={styles.sectorLeft}>
          <View
            style={[
              styles.sectorColorDot,
              { backgroundColor: getSectorColor(item.sector) },
            ]}
          />
          <Text style={styles.sectorName}>{item.sector}</Text>
        </View>
        <Text style={styles.sectorPercentage}>{formatPercent(item.percentage)}</Text>
      </View>
      <View style={styles.sectorBarContainer}>
        <View
          style={[
            styles.sectorBar,
            {
              width: `${item.percentage}%`,
              backgroundColor: getSectorColor(item.sector),
            },
          ]}
        />
      </View>
      <Text style={styles.sectorValue}>{formatCurrency(item.value)}</Text>
    </View>
  );

  if (portfolio.positions.length === 0) {
    return (
      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.headerTitle}>Portfolio</Text>
        </View>
        <View style={styles.emptyContainer}>
          <EmptyState
            icon="briefcase-outline"
            title="No Holdings Yet"
            message="Start trading to build your portfolio"
          />
        </View>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      >
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.headerTitle}>Portfolio</Text>
        </View>

        {/* Portfolio Summary Card */}
        <View style={styles.summaryCard}>
          <View style={styles.summaryHeader}>
            <Text style={styles.summaryLabel}>Total Portfolio Value</Text>
            <Ionicons name="trending-up" size={20} color="#10b981" />
          </View>
          <Text style={styles.summaryValue}>
            {formatCurrency(portfolioValue.currentValue)}
          </Text>
          
          <View style={styles.summaryRow}>
            <View style={styles.summaryItem}>
              <Text style={styles.summaryItemLabel}>Invested</Text>
              <Text style={styles.summaryItemValue}>
                {formatCurrency(portfolioValue.totalInvested)}
              </Text>
            </View>
            <View style={styles.summaryDivider} />
            <View style={styles.summaryItem}>
              <Text style={styles.summaryItemLabel}>Total P&L</Text>
              <Text
                style={[
                  styles.summaryItemValue,
                  { color: getProfitColor(portfolioValue.profitLoss) },
                ]}
              >
                {portfolioValue.profitLoss >= 0 ? '+' : ''}
                {formatCurrency(portfolioValue.profitLoss)}
              </Text>
            </View>
            <View style={styles.summaryDivider} />
            <View style={styles.summaryItem}>
              <Text style={styles.summaryItemLabel}>Returns</Text>
              <Text
                style={[
                  styles.summaryItemValue,
                  { color: getProfitColor(portfolioValue.profitLoss) },
                ]}
              >
                {portfolioValue.profitLossPercent >= 0 ? '+' : ''}
                {formatPercent(portfolioValue.profitLossPercent)}
              </Text>
            </View>
          </View>

          <View style={styles.todaysChangeContainer}>
            <View style={styles.todaysChangeRow}>
              <Ionicons
                name={todaysChange >= 0 ? 'arrow-up' : 'arrow-down'}
                size={16}
                color={getProfitColor(todaysChange)}
              />
              <Text style={styles.todaysChangeLabel}>Today&apos;s Change</Text>
            </View>
            <Text
              style={[
                styles.todaysChangeValue,
                { color: getProfitColor(todaysChange) },
              ]}
            >
              {todaysChange >= 0 ? '+' : ''}
              {formatCurrency(todaysChange)}
            </Text>
          </View>
        </View>

        {/* Holdings Section */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Holdings</Text>
            <Text style={styles.sectionCount}>{portfolio.positions.length}</Text>
          </View>
          <FlatList
            data={positionsWithCurrentData}
            keyExtractor={(item) => item.id}
            renderItem={renderPositionCard}
            scrollEnabled={false}
            contentContainerStyle={styles.positionsList}
          />
        </View>

        {/* Sector Allocation Section */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Sector Allocation</Text>
            <Ionicons name="pie-chart-outline" size={20} color="#6b7280" />
          </View>
          <FlatList
            data={sectorAllocation}
            keyExtractor={(item) => item.sector}
            renderItem={renderSectorCard}
            scrollEnabled={false}
            contentContainerStyle={styles.sectorList}
          />
        </View>

        <View style={{ height: 40 }} />
      </ScrollView>
    </View>
  );
}

// Helper function to get sector colors
function getSectorColor(sector: string): string {
  const colors: { [key: string]: string } = {
    Technology: '#3b82f6',
    Healthcare: '#10b981',
    Finance: '#8b5cf6',
    'Consumer Goods': '#f59e0b',
    Energy: '#ef4444',
    Telecommunications: '#06b6d4',
    Automotive: '#6366f1',
    Semiconductors: '#ec4899',
  };
  return colors[sector] || '#6b7280';
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f9fafb',
  },
  header: {
    backgroundColor: '#ffffff',
    paddingTop: Platform.OS === 'ios' ? 60 : 48,
    paddingHorizontal: 16,
    paddingBottom: 20,
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
      },
      android: {
        elevation: 4,
      },
    }),
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: '700',
    color: '#111827',
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 32,
  },
  summaryCard: {
    margin: 16,
    backgroundColor: '#ffffff',
    borderRadius: 16,
    padding: 20,
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 8,
      },
      android: {
        elevation: 4,
      },
    }),
  },
  summaryHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  summaryLabel: {
    fontSize: 14,
    color: '#6b7280',
    fontWeight: '500',
  },
  summaryValue: {
    fontSize: 32,
    fontWeight: '700',
    color: '#111827',
    marginBottom: 20,
  },
  summaryRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: 16,
    borderTopWidth: 1,
    borderTopColor: '#f3f4f6',
  },
  summaryItem: {
    flex: 1,
    alignItems: 'center',
  },
  summaryItemLabel: {
    fontSize: 12,
    color: '#9ca3af',
    marginBottom: 6,
  },
  summaryItemValue: {
    fontSize: 14,
    fontWeight: '700',
    color: '#111827',
  },
  summaryDivider: {
    width: 1,
    height: 30,
    backgroundColor: '#e5e7eb',
  },
  todaysChangeContainer: {
    marginTop: 16,
    paddingTop: 16,
    borderTopWidth: 1,
    borderTopColor: '#f3f4f6',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  todaysChangeRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  todaysChangeLabel: {
    fontSize: 14,
    color: '#6b7280',
    fontWeight: '500',
  },
  todaysChangeValue: {
    fontSize: 16,
    fontWeight: '700',
  },
  section: {
    marginHorizontal: 16,
    marginBottom: 24,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#111827',
  },
  sectionCount: {
    fontSize: 14,
    fontWeight: '600',
    color: '#6b7280',
    backgroundColor: '#f3f4f6',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
  },
  positionsList: {
    gap: 12,
  },
  positionCard: {
    backgroundColor: '#ffffff',
    borderRadius: 12,
    padding: 16,
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
      },
      android: {
        elevation: 2,
      },
    }),
  },
  positionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 12,
  },
  positionSymbol: {
    fontSize: 16,
    fontWeight: '700',
    color: '#111827',
  },
  positionName: {
    fontSize: 12,
    color: '#6b7280',
    marginTop: 2,
  },
  positionHeaderRight: {
    alignItems: 'flex-end',
  },
  positionValue: {
    fontSize: 16,
    fontWeight: '700',
    color: '#111827',
  },
  positionChangeRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    marginTop: 2,
  },
  positionChange: {
    fontSize: 12,
    fontWeight: '600',
  },
  positionDivider: {
    height: 1,
    backgroundColor: '#f3f4f6',
    marginBottom: 12,
  },
  positionDetails: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 12,
  },
  positionDetailItem: {
    flex: 1,
  },
  positionDetailLabel: {
    fontSize: 11,
    color: '#9ca3af',
    marginBottom: 4,
  },
  positionDetailValue: {
    fontSize: 13,
    fontWeight: '600',
    color: '#111827',
  },
  profitLossContainer: {
    backgroundColor: '#f9fafb',
    borderRadius: 8,
    padding: 12,
  },
  profitLossRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  profitLossLabel: {
    fontSize: 12,
    fontWeight: '600',
    color: '#6b7280',
  },
  profitLossValues: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  profitLossAmount: {
    fontSize: 14,
    fontWeight: '700',
  },
  profitLossPercent: {
    fontSize: 12,
    fontWeight: '600',
  },
  sectorList: {
    gap: 12,
  },
  sectorCard: {
    backgroundColor: '#ffffff',
    borderRadius: 12,
    padding: 16,
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
      },
      android: {
        elevation: 2,
      },
    }),
  },
  sectorHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  sectorLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  sectorColorDot: {
    width: 12,
    height: 12,
    borderRadius: 6,
  },
  sectorName: {
    fontSize: 14,
    fontWeight: '600',
    color: '#111827',
  },
  sectorPercentage: {
    fontSize: 14,
    fontWeight: '700',
    color: '#111827',
  },
  sectorBarContainer: {
    height: 6,
    backgroundColor: '#f3f4f6',
    borderRadius: 3,
    overflow: 'hidden',
    marginBottom: 8,
  },
  sectorBar: {
    height: '100%',
    borderRadius: 3,
  },
  sectorValue: {
    fontSize: 13,
    color: '#6b7280',
    fontWeight: '500',
  },
});
