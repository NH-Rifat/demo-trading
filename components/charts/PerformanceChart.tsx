// ============================================
// PERFORMANCE CHART - Portfolio Performance Over Time
// Features: Interactive line chart with touch gestures
// ============================================

import React, { useState } from 'react';
import { Dimensions, StyleSheet, Text, View } from 'react-native';
import { GestureHandlerRootView, PanGestureHandler } from 'react-native-gesture-handler';
import Svg, { Circle, Line, Path, Rect, Text as SvgText } from 'react-native-svg';

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

const SCREEN_WIDTH = Dimensions.get('window').width;

export default function PerformanceChart({
  data,
  height = 220,
  title = 'Performance',
  color = '#10b981',
}: Props) {
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);

  const firstValue = data[0]?.value || 0;
  const lastValue = data[data.length - 1]?.value || 0;
  const change = lastValue - firstValue;
  const changePercent = ((change / firstValue) * 100).toFixed(2);

  // Calculate chart dimensions
  const chartWidth = SCREEN_WIDTH - 64;
  const chartHeight = height - 100;
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

  // Handle touch/pan gesture
  const onGestureEvent = (event: any) => {
    const touchX = event.nativeEvent.x;
    
    // Find nearest data point
    const pointWidth = (chartWidth - 2 * padding) / (data.length - 1);
    const index = Math.round((touchX - padding) / pointWidth);
    
    // Ensure index is within valid bounds
    if (index >= 0 && index < data.length) {
      setSelectedIndex(index);
    }
  };

  const onGestureEnd = () => {
    // Keep showing the last selected point
    // setSelectedIndex(null);
  };

  // Get selected point coordinates
  const getPointCoordinates = (index: number) => {
    // Validate index is within bounds
    if (index < 0 || index >= data.length) return null;
    
    const x = padding + (index / (data.length - 1)) * (chartWidth - 2 * padding);
    const y = chartHeight - padding - ((data[index].value - minValue) / valueRange) * (chartHeight - 2 * padding);
    return { x, y };
  };

  const selectedData = selectedIndex !== null && selectedIndex >= 0 && selectedIndex < data.length
    ? data[selectedIndex]
    : null;
  const selectedPoint = selectedIndex !== null && selectedIndex >= 0 && selectedIndex < data.length
    ? getPointCoordinates(selectedIndex)
    : null;

  // Calculate change for selected point
  const selectedChange = selectedData ? selectedData.value - firstValue : change;
  const selectedChangePercent = selectedData ? ((selectedChange / firstValue) * 100).toFixed(2) : changePercent;
  const selectedIsPositive = selectedChange >= 0;

  return (
    <GestureHandlerRootView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <View>
          <Text style={styles.title}>{title}</Text>
          <Text style={styles.subtitle}>
            ${(selectedData?.value || lastValue).toLocaleString()}
          </Text>
        </View>
        <View style={styles.changeContainer}>
          <Text
            style={[
              styles.changePercent,
              { color: selectedIsPositive ? '#10b981' : '#ef4444' },
            ]}
          >
            {selectedIsPositive ? '+' : ''}
            {selectedChangePercent}%
          </Text>
          <Text style={styles.changeAmount}>
            {selectedIsPositive ? '+' : ''}${Math.abs(selectedChange).toLocaleString()}
          </Text>
        </View>
      </View>

      {/* Chart with Touch Interaction */}
      <PanGestureHandler
        onGestureEvent={onGestureEvent}
        onEnded={onGestureEnd}
      >
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
              strokeDasharray="5,5"
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

            {/* Crosshair and selected point */}
            {selectedPoint && selectedData && (
              <>
                {/* Vertical line */}
                <Line
                  x1={selectedPoint.x}
                  y1={padding}
                  x2={selectedPoint.x}
                  y2={chartHeight - padding}
                  stroke="#6b7280"
                  strokeWidth="1"
                  strokeDasharray="3,3"
                  opacity={0.5}
                />

                {/* Horizontal line */}
                <Line
                  x1={padding}
                  y1={selectedPoint.y}
                  x2={chartWidth - padding}
                  y2={selectedPoint.y}
                  stroke="#6b7280"
                  strokeWidth="1"
                  strokeDasharray="3,3"
                  opacity={0.5}
                />

                {/* Highlight circle */}
                <Circle
                  cx={selectedPoint.x}
                  cy={selectedPoint.y}
                  r="8"
                  fill={color}
                  opacity={0.3}
                />
                <Circle
                  cx={selectedPoint.x}
                  cy={selectedPoint.y}
                  r="4"
                  fill={color}
                />

                {/* Value label */}
                <Rect
                  x={chartWidth - padding - 60}
                  y={selectedPoint.y - 12}
                  width={55}
                  height={24}
                  fill={color}
                  rx={4}
                />
                <Svg x={chartWidth - padding - 60} y={selectedPoint.y - 8}>
                  <SvgText
                    fill="#ffffff"
                    fontSize="11"
                    fontWeight="bold"
                    textAnchor="middle"
                    x={27.5}
                  >
                    ${selectedData.value.toLocaleString()}
                  </SvgText>
                </Svg>
              </>
            )}

            {/* Start point */}
            {!selectedPoint && (
              <>
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
              </>
            )}
          </Svg>
        </View>
      </PanGestureHandler>

      {/* Time Range Labels */}
      <View style={styles.timeLabels}>
        <Text style={styles.timeLabel}>
          {selectedData 
            ? new Date(selectedData.date).toLocaleDateString('en-US', {
                month: 'short',
                day: 'numeric',
              })
            : new Date(data[0]?.date).toLocaleDateString('en-US', {
                month: 'short',
                day: 'numeric',
              })
          }
        </Text>
        <Text style={styles.timeLabel}>
          {new Date(data[data.length - 1]?.date).toLocaleDateString('en-US', {
            month: 'short',
            day: 'numeric',
          })}
        </Text>
      </View>

      {/* Interaction hint */}
      {!selectedData && (
        <Text style={styles.hintText}>👆 Touch chart to see details</Text>
      )}
    </GestureHandlerRootView>
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
  hintText: {
    fontSize: 12,
    color: '#9ca3af',
    textAlign: 'center',
    marginTop: 8,
    fontStyle: 'italic',
  },
});
