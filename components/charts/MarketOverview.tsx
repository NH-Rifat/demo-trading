// ============================================
// MARKET OVERVIEW CHART - Market Index Performance
// Features: Simple line chart showing market trends
// ============================================

import { useTheme } from '@/src/contexts/ThemeContext';
import { Ionicons } from '@expo/vector-icons';
import React, { useMemo } from 'react';
import { StyleSheet, Text, View } from 'react-native';

interface Props {
  topGainers: number;
  topLosers: number;
  unchanged: number;
  marketTrend: 'up' | 'down' | 'neutral';
}

export default function MarketOverview({
  topGainers,
  topLosers,
  unchanged,
  marketTrend,
}: Props) {
  const { colors } = useTheme();
  const styles = createStyles(colors);

  // Calculate market trend percentage (mock)
  const trendPercent = useMemo(() => {
    const total = topGainers + topLosers + unchanged;
    const netChange = topGainers - topLosers;
    return ((netChange / total) * 100).toFixed(2);
  }, [topGainers, topLosers, unchanged]);

  const isPositive = parseFloat(trendPercent) >= 0;
  const trendColor = isPositive ? colors.success : colors.danger;

  return (
    <View style={styles.container}>
      {/* Market Stats */}
      <View style={styles.header}>
        <View>
          <Text style={styles.title}>Market Overview</Text>
          <Text style={styles.subtitle}>Today&apos;s Summary</Text>
        </View>
        <View style={styles.indexContainer}>
          <View style={styles.trendRow}>
            <Ionicons
              name={isPositive ? 'trending-up' : 'trending-down'}
              size={24}
              color={trendColor}
            />
            <Text style={[styles.indexChange, { color: trendColor }]}>
              {isPositive ? '+' : ''}
              {trendPercent}%
            </Text>
          </View>
          <Text style={styles.indexLabel}>Net Movement</Text>
        </View>
      </View>

      {/* Market Stats Grid */}
      <View style={styles.statsGrid}>
        <View style={styles.statItem}>
          <View style={[styles.statDot, { backgroundColor: colors.success }]} />
          <Text style={styles.statValue}>{topGainers}</Text>
          <Text style={styles.statLabel}>Gainers</Text>
        </View>
        <View style={styles.statDivider} />
        <View style={styles.statItem}>
          <View style={[styles.statDot, { backgroundColor: colors.danger }]} />
          <Text style={styles.statValue}>{topLosers}</Text>
          <Text style={styles.statLabel}>Losers</Text>
        </View>
        <View style={styles.statDivider} />
        <View style={styles.statItem}>
          <View style={[styles.statDot, { backgroundColor: colors.textSecondary }]} />
          <Text style={styles.statValue}>{unchanged}</Text>
          <Text style={styles.statLabel}>Unchanged</Text>
        </View>
      </View>

      {/* Visual Trend Bar */}
      <View style={styles.trendBarContainer}>
        <View style={styles.trendBarBackground}>
          <View
            style={[
              styles.trendBar,
              {
                width: `${((topGainers / (topGainers + topLosers + unchanged)) * 100).toFixed(0)}%` as any,
                backgroundColor: colors.success,
              },
            ]}
          />
        </View>
        <View style={styles.trendBarLabels}>
          <Text style={styles.trendBarLabel}>
            {((topGainers / (topGainers + topLosers + unchanged)) * 100).toFixed(0)}% Bullish
          </Text>
          <Text style={styles.trendBarLabel}>
            {((topLosers / (topGainers + topLosers + unchanged)) * 100).toFixed(0)}% Bearish
          </Text>
        </View>
      </View>
    </View>
  );
}

const createStyles = (colors: any) => StyleSheet.create({
  container: {
    backgroundColor: colors.card,
    borderRadius: 12,
    padding: 16,
    marginHorizontal: 16,
    marginBottom: 16,
    shadowColor: colors.shadow,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  title: {
    fontSize: 16,
    fontWeight: '700',
    color: colors.text,
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 12,
    color: colors.textSecondary,
  },
  indexContainer: {
    alignItems: 'flex-end',
  },
  trendRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  indexValue: {
    fontSize: 20,
    fontWeight: '700',
    color: colors.text,
  },
  indexChange: {
    fontSize: 16,
    fontWeight: '700',
  },
  indexLabel: {
    fontSize: 10,
    color: colors.textSecondary,
    marginTop: 2,
  },
  chartContainer: {
    height: 100,
    marginBottom: 16,
  },
  statsGrid: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  statItem: {
    flex: 1,
    alignItems: 'center',
  },
  statDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    marginBottom: 8,
  },
  statValue: {
    fontSize: 18,
    fontWeight: '700',
    color: colors.text,
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 12,
    color: colors.textSecondary,
  },
  statDivider: {
    width: 1,
    height: 40,
    backgroundColor: colors.border,
  },
  trendBarContainer: {
    marginTop: 8,
  },
  trendBarBackground: {
    height: 8,
    backgroundColor: colors.surfaceSecondary,
    borderRadius: 4,
    overflow: 'hidden',
  },
  trendBar: {
    height: '100%',
    borderRadius: 4,
  },
  trendBarLabels: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 8,
  },
  trendBarLabel: {
    fontSize: 11,
    color: colors.textSecondary,
    fontWeight: '600',
  },
});
