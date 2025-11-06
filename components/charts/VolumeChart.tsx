// ============================================
// VOLUME CHART - Trading Volume Bars
// Features: Volume bars with color coding
// ============================================

import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Svg, { Rect } from 'react-native-svg';

interface VolumeData {
  timestamp: number;
  volume: number;
  change: number;
}

interface Props {
  data: VolumeData[];
  height?: number;
}

export default function VolumeChart({ data, height = 180 }: Props) {
  const maxVolume = Math.max(...data.map((d) => d.volume));
  const avgVolume = data.reduce((sum, d) => sum + d.volume, 0) / data.length;

  // Chart dimensions
  const chartWidth = 320;
  const chartHeight = height - 80;
  const padding = 20;
  const barWidth = (chartWidth - 2 * padding) / data.length - 2;

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.title}>Trading Volume</Text>
        <View style={styles.stats}>
          <View style={styles.statItem}>
            <Text style={styles.statLabel}>Avg</Text>
            <Text style={styles.statValue}>
              {(avgVolume / 1000000).toFixed(2)}M
            </Text>
          </View>
          <View style={styles.statItem}>
            <Text style={styles.statLabel}>Max</Text>
            <Text style={styles.statValue}>
              {(maxVolume / 1000000).toFixed(2)}M
            </Text>
          </View>
        </View>
      </View>

      {/* Volume Chart */}
      <View style={[styles.chartContainer, { height: chartHeight }]}>
        <Svg width={chartWidth} height={chartHeight}>
          {data.map((item, index) => {
            const barHeight = (item.volume / maxVolume) * (chartHeight - 2 * padding);
            const x = padding + index * (barWidth + 2);
            const y = chartHeight - padding - barHeight;
            const color = item.change >= 0 ? '#10b981' : '#ef4444';

            return (
              <Rect
                key={index}
                x={x}
                y={y}
                width={barWidth}
                height={barHeight}
                fill={color}
                opacity={0.8}
                rx={2}
              />
            );
          })}
        </Svg>
      </View>

      {/* Legend */}
      <View style={styles.legend}>
        <View style={styles.legendItem}>
          <View style={[styles.legendBar, { backgroundColor: '#10b981' }]} />
          <Text style={styles.legendText}>Price Up</Text>
        </View>
        <View style={styles.legendItem}>
          <View style={[styles.legendBar, { backgroundColor: '#ef4444' }]} />
          <Text style={styles.legendText}>Price Down</Text>
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
  stats: {
    flexDirection: 'row',
    gap: 16,
  },
  statItem: {
    alignItems: 'flex-end',
  },
  statLabel: {
    fontSize: 10,
    color: '#6b7280',
    marginBottom: 2,
  },
  statValue: {
    fontSize: 14,
    fontWeight: '700',
    color: '#111827',
  },
  chartContainer: {
    borderRadius: 8,
    overflow: 'hidden',
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
  legendBar: {
    width: 12,
    height: 12,
    borderRadius: 2,
  },
  legendText: {
    fontSize: 12,
    color: '#6b7280',
  },
});
