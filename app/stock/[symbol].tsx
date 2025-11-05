// ============================================
// STOCK DETAIL SCREEN - Individual Stock View
// Features: Price chart, company info, buy/sell buttons, technical indicators
// ============================================

import EmptyState from '@/components/common/EmptyState';
import LoadingSpinner from '@/components/common/LoadingSpinner';
import { useAppDispatch, useAppSelector } from '@/src/store/hooks';
import { addStockToWatchlist, removeStockFromWatchlist } from '@/src/store/slices/watchlistSlice';
import type { Stock } from '@/src/types';
import { formatCurrency, formatLargeNumber, formatPercent, getProfitColor } from '@/src/utils/helpers';
import { Ionicons } from '@expo/vector-icons';
import { useLocalSearchParams, useRouter } from 'expo-router';
import React, { useEffect, useState } from 'react';
import {
    Platform,
    SafeAreaView,
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from 'react-native';

type TimeRange = '1D' | '1W' | '1M' | '3M' | '1Y' | 'ALL';

export default function StockDetailScreen() {
  const router = useRouter();
  const { symbol } = useLocalSearchParams<{ symbol: string }>();
  const dispatch = useAppDispatch();

  const stocks = useAppSelector((state) => state.market.stocks);
  const watchlistItems = useAppSelector((state) => state.watchlist.watchlists);

  const [selectedRange, setSelectedRange] = useState<TimeRange>('1D');
  const [isLoading, setIsLoading] = useState(true);

  // Find the stock by symbol
  const stock = stocks.find((s: Stock) => s.symbol === symbol);

  // Check if stock is in any watchlist
  const isInWatchlist = watchlistItems.some((item: any) =>
    item.stocks.some((stockId: string) => {
      const s = stocks.find((st: Stock) => st.id === stockId);
      return s?.symbol === symbol;
    })
  );

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 500);
    return () => clearTimeout(timer);
  }, []);

  if (isLoading) {
    return <LoadingSpinner message="Loading stock details..." />;
  }

  if (!stock) {
    return (
      <SafeAreaView style={styles.container}>
        <EmptyState
          icon="analytics-outline"
          title="Stock not found"
          message={`Unable to find stock with symbol "${symbol}"`}
        />
      </SafeAreaView>
    );
  }

  const priceColor = getProfitColor(stock.change);
  const isPositive = stock.change >= 0;

  // Handle watchlist toggle
  const handleWatchlistToggle = () => {
    if (isInWatchlist) {
      // Remove from all watchlists
      watchlistItems.forEach((watchlist: any) => {
        if (watchlist.stocks.some((id: string) => {
          const s = stocks.find((st: Stock) => st.id === id);
          return s?.symbol === symbol;
        })) {
          dispatch(removeStockFromWatchlist({
            watchlistId: watchlist.id,
            stockId: stock.id,
          }));
        }
      });
    } else {
      // Add to default watchlist (first one or create new)
      const defaultWatchlist = watchlistItems[0];
      if (defaultWatchlist) {
        dispatch(addStockToWatchlist({
          watchlistId: defaultWatchlist.id,
          stockId: stock.id,
        }));
      }
    }
  };

  // Calculate additional metrics
  const dayRange = `${formatCurrency(stock.low)} - ${formatCurrency(stock.high)}`;
  const peRatio = (stock.price / (stock.price * 0.05)).toFixed(2); // Mock P/E
  const marketCap = formatLargeNumber(stock.marketCap);
  const avgVolume = formatLargeNumber(stock.volume * 1.2); // Mock avg volume

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => router.back()}
        >
          <Ionicons name="arrow-back" size={24} color="#111827" />
        </TouchableOpacity>

        <View style={styles.headerCenter}>
          <Text style={styles.headerSymbol}>{stock.symbol}</Text>
          <Text style={styles.headerName}>{stock.name}</Text>
        </View>

        <TouchableOpacity
          style={[styles.starButton, isInWatchlist && styles.starButtonActive]}
          onPress={handleWatchlistToggle}
        >
          <Ionicons
            name={isInWatchlist ? 'star' : 'star-outline'}
            size={24}
            color={isInWatchlist ? '#fbbf24' : '#6b7280'}
          />
        </TouchableOpacity>
      </View>

      <ScrollView
        style={styles.scrollView}
        showsVerticalScrollIndicator={false}
      >
        {/* Price Section */}
        <View style={styles.priceSection}>
          <Text style={styles.currentPrice}>{formatCurrency(stock.price)}</Text>
          <View style={styles.changeContainer}>
            <Ionicons
              name={isPositive ? 'trending-up' : 'trending-down'}
              size={20}
              color={priceColor}
            />
            <Text style={[styles.changeText, { color: priceColor }]}>
              {formatCurrency(Math.abs(stock.change))} ({formatPercent(stock.changePercent)})
            </Text>
          </View>
          <Text style={styles.lastUpdate}>
            Last updated: {new Date(stock.lastUpdate).toLocaleTimeString()}
          </Text>
        </View>

        {/* Time Range Selector */}
        <View style={styles.timeRangeSection}>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.timeRangeScroll}
          >
            {(['1D', '1W', '1M', '3M', '1Y', 'ALL'] as TimeRange[]).map((range) => (
              <TouchableOpacity
                key={range}
                style={[
                  styles.timeRangeButton,
                  selectedRange === range && styles.timeRangeButtonActive,
                ]}
                onPress={() => setSelectedRange(range)}
              >
                <Text
                  style={[
                    styles.timeRangeText,
                    selectedRange === range && styles.timeRangeTextActive,
                  ]}
                >
                  {range}
                </Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>

        {/* Chart Placeholder */}
        <View style={styles.chartSection}>
          <View style={styles.chartPlaceholder}>
            <Ionicons name="trending-up" size={48} color="#d1d5db" />
            <Text style={styles.chartPlaceholderText}>
              Chart coming soon
            </Text>
            <Text style={styles.chartPlaceholderSubtext}>
              {selectedRange} view
            </Text>
          </View>
        </View>

        {/* Key Statistics */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Key Statistics</Text>
          <View style={styles.statsGrid}>
            <View style={styles.statItem}>
              <Text style={styles.statLabel}>Open</Text>
              <Text style={styles.statValue}>{formatCurrency(stock.open)}</Text>
            </View>
            <View style={styles.statItem}>
              <Text style={styles.statLabel}>High</Text>
              <Text style={styles.statValue}>{formatCurrency(stock.high)}</Text>
            </View>
            <View style={styles.statItem}>
              <Text style={styles.statLabel}>Low</Text>
              <Text style={styles.statValue}>{formatCurrency(stock.low)}</Text>
            </View>
            <View style={styles.statItem}>
              <Text style={styles.statLabel}>Close</Text>
              <Text style={styles.statValue}>{formatCurrency(stock.close)}</Text>
            </View>
            <View style={styles.statItem}>
              <Text style={styles.statLabel}>Volume</Text>
              <Text style={styles.statValue}>{formatLargeNumber(stock.volume)}</Text>
            </View>
            <View style={styles.statItem}>
              <Text style={styles.statLabel}>Avg Volume</Text>
              <Text style={styles.statValue}>{avgVolume}</Text>
            </View>
          </View>
        </View>

        {/* Company Info */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Company Information</Text>
          <View style={styles.infoCard}>
            <View style={styles.infoRow}>
              <Text style={styles.infoLabel}>Sector</Text>
              <Text style={styles.infoValue}>{stock.sector}</Text>
            </View>
            <View style={styles.divider} />
            <View style={styles.infoRow}>
              <Text style={styles.infoLabel}>Market Cap</Text>
              <Text style={styles.infoValue}>{marketCap}</Text>
            </View>
            <View style={styles.divider} />
            <View style={styles.infoRow}>
              <Text style={styles.infoLabel}>P/E Ratio</Text>
              <Text style={styles.infoValue}>{peRatio}</Text>
            </View>
            <View style={styles.divider} />
            <View style={styles.infoRow}>
              <Text style={styles.infoLabel}>Day Range</Text>
              <Text style={styles.infoValue}>{dayRange}</Text>
            </View>
          </View>
        </View>

        {/* About Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>About {stock.name}</Text>
          <Text style={styles.aboutText}>
            {stock.name} ({stock.symbol}) is a leading company in the {stock.sector} sector.
            The stock is currently trading at {formatCurrency(stock.price)} with a market
            capitalization of {marketCap}.
          </Text>
        </View>

        {/* Spacer for bottom buttons */}
        <View style={{ height: 100 }} />
      </ScrollView>

      {/* Bottom Action Buttons */}
      <View style={styles.bottomActions}>
        <TouchableOpacity
          style={[styles.actionButton, styles.sellButton]}
          onPress={() => {
            // TODO: Navigate to trade screen with SELL pre-selected
            console.log('Navigate to SELL', stock.symbol);
          }}
        >
          <Ionicons name="trending-down" size={20} color="#ffffff" />
          <Text style={styles.actionButtonText}>Sell</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.actionButton, styles.buyButton]}
          onPress={() => {
            // TODO: Navigate to trade screen with BUY pre-selected
            console.log('Navigate to BUY', stock.symbol);
          }}
        >
          <Ionicons name="trending-up" size={20} color="#ffffff" />
          <Text style={styles.actionButtonText}>Buy</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f9fafb',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingTop: Platform.OS === 'ios' ? 0 : 16,
    paddingBottom: 16,
    backgroundColor: '#ffffff',
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
  backButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#f3f4f6',
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerCenter: {
    flex: 1,
    alignItems: 'center',
    marginHorizontal: 16,
  },
  headerSymbol: {
    fontSize: 18,
    fontWeight: '700',
    color: '#111827',
  },
  headerName: {
    fontSize: 12,
    color: '#6b7280',
    marginTop: 2,
  },
  starButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#f3f4f6',
    justifyContent: 'center',
    alignItems: 'center',
  },
  starButtonActive: {
    backgroundColor: '#fef3c7',
  },
  scrollView: {
    flex: 1,
  },
  priceSection: {
    backgroundColor: '#ffffff',
    padding: 24,
    alignItems: 'center',
  },
  currentPrice: {
    fontSize: 48,
    fontWeight: '700',
    color: '#111827',
  },
  changeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 8,
    gap: 6,
  },
  changeText: {
    fontSize: 18,
    fontWeight: '600',
  },
  lastUpdate: {
    fontSize: 12,
    color: '#9ca3af',
    marginTop: 8,
  },
  timeRangeSection: {
    backgroundColor: '#ffffff',
    paddingVertical: 12,
    marginTop: 8,
  },
  timeRangeScroll: {
    paddingHorizontal: 16,
    gap: 8,
  },
  timeRangeButton: {
    paddingHorizontal: 20,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: '#f3f4f6',
  },
  timeRangeButtonActive: {
    backgroundColor: '#10b981',
  },
  timeRangeText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#6b7280',
  },
  timeRangeTextActive: {
    color: '#ffffff',
  },
  chartSection: {
    backgroundColor: '#ffffff',
    marginTop: 8,
    padding: 24,
  },
  chartPlaceholder: {
    height: 200,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f9fafb',
    borderRadius: 12,
    borderWidth: 2,
    borderColor: '#e5e7eb',
    borderStyle: 'dashed',
  },
  chartPlaceholderText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#9ca3af',
    marginTop: 12,
  },
  chartPlaceholderSubtext: {
    fontSize: 12,
    color: '#d1d5db',
    marginTop: 4,
  },
  section: {
    backgroundColor: '#ffffff',
    marginTop: 8,
    padding: 24,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#111827',
    marginBottom: 16,
  },
  statsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 16,
  },
  statItem: {
    width: '30%',
    minWidth: 100,
  },
  statLabel: {
    fontSize: 12,
    color: '#6b7280',
    marginBottom: 4,
  },
  statValue: {
    fontSize: 16,
    fontWeight: '600',
    color: '#111827',
  },
  infoCard: {
    backgroundColor: '#f9fafb',
    borderRadius: 12,
    padding: 16,
  },
  infoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
  },
  infoLabel: {
    fontSize: 14,
    color: '#6b7280',
  },
  infoValue: {
    fontSize: 14,
    fontWeight: '600',
    color: '#111827',
  },
  divider: {
    height: 1,
    backgroundColor: '#e5e7eb',
  },
  aboutText: {
    fontSize: 14,
    lineHeight: 22,
    color: '#6b7280',
  },
  bottomActions: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    flexDirection: 'row',
    padding: 16,
    gap: 12,
    backgroundColor: '#ffffff',
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: -2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
      },
      android: {
        elevation: 8,
      },
    }),
  },
  actionButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 16,
    borderRadius: 12,
    gap: 8,
  },
  sellButton: {
    backgroundColor: '#ef4444',
  },
  buyButton: {
    backgroundColor: '#10b981',
  },
  actionButtonText: {
    fontSize: 16,
    fontWeight: '700',
    color: '#ffffff',
  },
});
