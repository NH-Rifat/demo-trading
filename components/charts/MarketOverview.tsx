// ============================================
// MARKET OVERVIEW CHART - Market Index Performance
// Features: Simple line chart showing market trends
// ============================================

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
  // Calculate market trend percentage (mock)
  const trendPercent = useMemo(() => {
    const total = topGainers + topLosers + unchanged;
    const netChange = topGainers - topLosers;
    return ((netChange / total) * 100).toFixed(2);
  }, [topGainers, topLosers, unchanged]);

  const isPositive = parseFloat(trendPercent) >= 0;
  const trendColor = isPositive ? '#10b981' : '#ef4444';

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
          <View style={[styles.statDot, { backgroundColor: '#10b981' }]} />
          <Text style={styles.statValue}>{topGainers}</Text>
          <Text style={styles.statLabel}>Gainers</Text>
        </View>
        <View style={styles.statDivider} />
        <View style={styles.statItem}>
          <View style={[styles.statDot, { backgroundColor: '#ef4444' }]} />
          <Text style={styles.statValue}>{topLosers}</Text>
          <Text style={styles.statLabel}>Losers</Text>
        </View>
        <View style={styles.statDivider} />
        <View style={styles.statItem}>
          <View style={[styles.statDot, { backgroundColor: '#6b7280' }]} />
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
                backgroundColor: '#10b981',
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

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#ffffff',
    borderRadius: 12,
    padding: 16,
    marginHorizontal: 16,
    marginBottom: 16,
    shadowColor: '#000',
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
    color: '#111827',
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 12,
    color: '#6b7280',
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
    color: '#111827',
  },
  indexChange: {
    fontSize: 16,
    fontWeight: '700',
  },
  indexLabel: {
    fontSize: 10,
    color: '#6b7280',
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
    color: '#111827',
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 12,
    color: '#6b7280',
  },
  statDivider: {
    width: 1,
    height: 40,
    backgroundColor: '#e5e7eb',
  },
  trendBarContainer: {
    marginTop: 8,
  },
  trendBarBackground: {
    height: 8,
    backgroundColor: '#f3f4f6',
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
    color: '#6b7280',
    fontWeight: '600',
  },
});
