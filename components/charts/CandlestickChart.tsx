// ============================================
// CANDLESTICK CHART - Professional Trading Chart
// Features: Simple line chart with OHLC stats
// ============================================

import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Svg, { Circle, Path } from 'react-native-svg';

interface CandleData {
  timestamp: number;
  open: number;
  high: number;
  low: number;
  close: number;
  volume: number;
}

interface Props {
  data: CandleData[];
  height?: number;
}

export default function CandlestickChart({ data, height = 280 }: Props) {
  // Calculate chart dimensions
  const chartWidth = 320;
  const chartHeight = height - 100;
  const padding = 20;

  // Get price range
  const prices = data.flatMap(d => [d.high, d.low]);
  const minPrice = Math.min(...prices);
  const maxPrice = Math.max(...prices);
  const priceRange = maxPrice - minPrice;

  // Generate path for line chart (using close prices)
  const generatePath = () => {
    if (data.length === 0) return '';

    const points = data.map((candle, index) => {
      const x = padding + (index / (data.length - 1)) * (chartWidth - 2 * padding);
      const y = chartHeight - padding - ((candle.close - minPrice) / priceRange) * (chartHeight - 2 * padding);
      return { x, y };
    });

    let path = `M ${points[0].x} ${points[0].y}`;
    for (let i = 1; i < points.length; i++) {
      path += ` L ${points[i].x} ${points[i].y}`;
    }

    return path;
  };

  const pathData = generatePath();
  const lineColor = data[data.length - 1]?.close >= data[0]?.open ? '#10b981' : '#ef4444';

  return (
    <View style={styles.container}>
      {/* Chart Title */}
      <View style={styles.header}>
        <Text style={styles.title}>Price Chart</Text>
      </View>

      {/* Price Chart */}
      <View style={[styles.chartContainer, { height: chartHeight }]}>
        <Svg width={chartWidth} height={chartHeight}>
          {/* Line chart */}
          <Path
            d={pathData}
            stroke={lineColor}
            strokeWidth="2"
            fill="none"
            strokeLinecap="round"
            strokeLinejoin="round"
          />

          {/* End point */}
          {data.length > 0 && (
            <Circle
              cx={chartWidth - padding}
              cy={chartHeight - padding - ((data[data.length - 1]?.close - minPrice) / priceRange) * (chartHeight - 2 * padding)}
              r="4"
              fill={lineColor}
            />
          )}
        </Svg>
      </View>

      {/* Chart Stats */}
      <View style={styles.statsRow}>
        <View style={styles.statItem}>
          <Text style={styles.statLabel}>Open</Text>
          <Text style={styles.statValue}>${data[0]?.open.toFixed(2)}</Text>
        </View>
        <View style={styles.statItem}>
          <Text style={styles.statLabel}>High</Text>
          <Text style={[styles.statValue, { color: '#10b981' }]}>
            ${Math.max(...data.map(d => d.high)).toFixed(2)}
          </Text>
        </View>
        <View style={styles.statItem}>
          <Text style={styles.statLabel}>Low</Text>
          <Text style={[styles.statValue, { color: '#ef4444' }]}>
            ${Math.min(...data.map(d => d.low)).toFixed(2)}
          </Text>
        </View>
        <View style={styles.statItem}>
          <Text style={styles.statLabel}>Close</Text>
          <Text style={styles.statValue}>
            ${data[data.length - 1]?.close.toFixed(2)}
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
    marginBottom: 16,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  title: {
    fontSize: 16,
    fontWeight: '700',
    color: '#111827',
  },
  tooltip: {
    alignItems: 'flex-end',
  },
  tooltipPrice: {
    fontSize: 18,
    fontWeight: '700',
    color: '#111827',
  },
  tooltipDate: {
    fontSize: 12,
    color: '#6b7280',
  },
  chartContainer: {
    borderRadius: 8,
    overflow: 'hidden',
  },
  statsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 16,
    paddingTop: 16,
    borderTopWidth: 1,
    borderTopColor: '#f3f4f6',
  },
  statItem: {
    alignItems: 'center',
  },
  statLabel: {
    fontSize: 11,
    color: '#6b7280',
    marginBottom: 4,
    textTransform: 'uppercase',
  },
  statValue: {
    fontSize: 14,
    fontWeight: '700',
    color: '#111827',
  },
  legend: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 16,
    marginTop: 12,
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: '#f3f4f6',
  },
  legendItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  legendDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
  },
  legendText: {
    fontSize: 12,
    color: '#6b7280',
  },
});
