// ============================================
// PORTFOLIO SCREEN - Holdings & Performance
// Main screen component with organized architecture
// ============================================

import PerformanceChart from '@/components/charts/PerformanceChart';
import EmptyState from '@/components/common/EmptyState';
import { useTheme } from '@/src/contexts/ThemeContext';
import { useAppSelector } from '@/src/store/hooks';
import { generatePerformanceData } from '@/src/utils/chartDataGenerator';
import React, { useMemo, useState } from 'react';
import { RefreshControl, ScrollView, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Header } from './components/Header';
import { HoldingsList } from './components/HoldingsList';
import { PortfolioSummary } from './components/PortfolioSummary';
import { SectorAllocation } from './components/SectorAllocation';
import {
    usePortfolioValue,
    usePositionsWithCurrentData,
    useSectorAllocation,
    useTodaysChange,
} from './hooks/usePortfolioData';
import { createPortfolioStyles } from './styles/portfolioStyles';

export default function PortfolioScreen() {
  const { colors } = useTheme();
  const styles = createPortfolioStyles(colors);
  const insets = useSafeAreaInsets();
  const portfolio = useAppSelector((state: any) => state.portfolio.portfolio);
  const stocks = useAppSelector((state: any) => state.market.stocks);
  const [refreshing, setRefreshing] = useState(false);

  // Portfolio calculations using custom hooks
  const portfolioValue = usePortfolioValue(portfolio.positions, stocks);
  const todaysChange = useTodaysChange(portfolio.positions, stocks);
  const positionsWithCurrentData = usePositionsWithCurrentData(portfolio.positions, stocks);
  const sectorAllocation = useSectorAllocation(
    positionsWithCurrentData,
    stocks,
    portfolioValue.currentValue
  );

  // Generate performance data for chart
  const performanceData = useMemo(() => {
    return generatePerformanceData(portfolioValue.totalInvested, 30);
  }, [portfolioValue.totalInvested]);

  const onRefresh = async () => {
    setRefreshing(true);
    setTimeout(() => setRefreshing(false), 1000);
  };

  // Empty state
  if (portfolio.positions.length === 0) {
    return (
      <View style={styles.container}>
        <Header paddingTop={insets.top + 16} />
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
        refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
      >
        {/* Header */}
        <Header paddingTop={insets.top + 16} />

        {/* Portfolio Summary Card */}
        <PortfolioSummary portfolioValue={portfolioValue} todaysChange={todaysChange} />

        {/* Portfolio Performance Chart */}
        <PerformanceChart
          data={performanceData}
          height={220}
          title="Portfolio Performance"
          color={colors.primary}
        />

        {/* Holdings Section */}
        <HoldingsList
          positions={positionsWithCurrentData}
          positionsCount={portfolio.positions.length}
        />

        {/* Sector Allocation Section */}
        <SectorAllocation sectorAllocation={sectorAllocation} />

        <View style={{ height: 40 }} />
      </ScrollView>
    </View>
  );
}
