// ============================================
// PERFORMANCE CHART - Portfolio Performance Over Time
// Features: Simple line chart visualization
// ============================================

import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Svg, { Circle, Line, Path } from 'react-native-svg';

interface PerformanceData {
  date: number;
  value: number;
}

interface Props {
  data: PerformanceData[];
  height?: number;
  title?: string;
  color?: string;
}

export default function PerformanceChart({
  data,
  height = 220,
  title = 'Performance',
  color = '#10b981',
}: Props) {
  const firstValue = data[0]?.value || 0;
  const lastValue = data[data.length - 1]?.value || 0;
  const change = lastValue - firstValue;
  const changePercent = ((change / firstValue) * 100).toFixed(2);
  const isPositive = change >= 0;

  // Calculate chart dimensions
  const chartWidth = 320;
  const chartHeight = height - 80;
  const padding = 20;

  // Get min and max values for scaling
  const values = data.map(d => d.value);
  const minValue = Math.min(...values);
  const maxValue = Math.max(...values);
  const valueRange = maxValue - minValue;

  // Generate path for line chart
  const generatePath = () => {
    if (data.length === 0) return '';

    const points = data.map((point, index) => {
      const x = padding + (index / (data.length - 1)) * (chartWidth - 2 * padding);
      const y = chartHeight - padding - ((point.value - minValue) / valueRange) * (chartHeight - 2 * padding);
      return { x, y };
    });

    let path = `M ${points[0].x} ${points[0].y}`;
    for (let i = 1; i < points.length; i++) {
      path += ` L ${points[i].x} ${points[i].y}`;
    }

    return path;
  };

  const pathData = generatePath();

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <View>
          <Text style={styles.title}>{title}</Text>
          <Text style={styles.subtitle}>
            ${lastValue.toLocaleString()}
          </Text>
        </View>
        <View style={styles.changeContainer}>
          <Text
            style={[
              styles.changePercent,
              { color: isPositive ? '#10b981' : '#ef4444' },
            ]}
          >
            {isPositive ? '+' : ''}
            {changePercent}%
          </Text>
          <Text style={styles.changeAmount}>
            {isPositive ? '+' : ''}${Math.abs(change).toLocaleString()}
          </Text>
        </View>
      </View>

      {/* Chart */}
      <View style={[styles.chartContainer, { height: chartHeight }]}>
        <Svg width={chartWidth} height={chartHeight}>
          {/* Grid lines */}
          <Line
            x1={padding}
            y1={chartHeight / 2}
            x2={chartWidth - padding}
            y2={chartHeight / 2}
            stroke="#f3f4f6"
            strokeWidth="1"
          />

          {/* Line chart */}
          <Path
            d={pathData}
            stroke={color}
            strokeWidth="3"
            fill="none"
            strokeLinecap="round"
            strokeLinejoin="round"
          />

          {/* Start point */}
          <Circle
            cx={padding}
            cy={chartHeight - padding - ((data[0]?.value - minValue) / valueRange) * (chartHeight - 2 * padding)}
            r="4"
            fill={color}
          />

          {/* End point */}
          <Circle
            cx={chartWidth - padding}
            cy={chartHeight - padding - ((data[data.length - 1]?.value - minValue) / valueRange) * (chartHeight - 2 * padding)}
            r="4"
            fill={color}
          />
        </Svg>
      </View>

      {/* Time Range Labels */}
      <View style={styles.timeLabels}>
        <Text style={styles.timeLabel}>
          {new Date(data[0]?.date).toLocaleDateString('en-US', {
            month: 'short',
            day: 'numeric',
          })}
        </Text>
        <Text style={styles.timeLabel}>
          {new Date(data[data.length - 1]?.date).toLocaleDateString('en-US', {
            month: 'short',
            day: 'numeric',
          })}
        </Text>
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
    alignItems: 'flex-start',
    marginBottom: 16,
  },
  title: {
    fontSize: 14,
    color: '#6b7280',
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 24,
    fontWeight: '700',
    color: '#111827',
  },
  changeContainer: {
    alignItems: 'flex-end',
  },
  changePercent: {
    fontSize: 18,
    fontWeight: '700',
    marginBottom: 2,
  },
  changeAmount: {
    fontSize: 12,
    color: '#6b7280',
  },
  chartContainer: {
    borderRadius: 8,
    overflow: 'hidden',
  },
  timeLabels: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 12,
    paddingHorizontal: 8,
  },
  timeLabel: {
    fontSize: 12,
    color: '#6b7280',
  },
});
