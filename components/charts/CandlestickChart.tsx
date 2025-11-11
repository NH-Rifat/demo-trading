// ============================================
// CANDLESTICK CHART - Professional Trading Chart
// Features: Simple line chart with OHLC stats and touch interaction
// ============================================

import { useTheme } from '@/src/contexts/ThemeContext';
import React, { useState } from 'react';
import { Dimensions, StyleSheet, Text, View } from 'react-native';
import { GestureHandlerRootView, PanGestureHandler } from 'react-native-gesture-handler';
import Svg, { Circle, Line, Path, Rect, Text as SvgText } from 'react-native-svg';

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

const SCREEN_WIDTH = Dimensions.get('window').width;

export default function CandlestickChart({ data, height = 280 }: Props) {
  const { colors } = useTheme();
  const styles = createStyles(colors);
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);

  // Calculate chart dimensions
  const chartWidth = SCREEN_WIDTH - 64;
  const chartHeight = height - 120;
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
    const y = chartHeight - padding - ((data[index].close - minPrice) / priceRange) * (chartHeight - 2 * padding);
    return { x, y };
  };

  const selectedData = selectedIndex !== null && selectedIndex >= 0 && selectedIndex < data.length 
    ? data[selectedIndex] 
    : null;
  const selectedPoint = selectedIndex !== null && selectedIndex >= 0 && selectedIndex < data.length
    ? getPointCoordinates(selectedIndex) 
    : null;

  return (
    <GestureHandlerRootView style={styles.container}>
      {/* Chart Title */}
      <View style={styles.header}>
        <Text style={styles.title}>Price Chart</Text>
        {selectedData && (
          <View style={styles.tooltip}>
            <Text style={styles.tooltipPrice}>${selectedData.close.toFixed(2)}</Text>
            <Text style={styles.tooltipDate}>
              {new Date(selectedData.timestamp).toLocaleDateString('en-US', {
                month: 'short',
                day: 'numeric',
                hour: '2-digit',
                minute: '2-digit',
              })}
            </Text>
          </View>
        )}
      </View>

      {/* Price Chart with Touch Interaction */}
      <PanGestureHandler
        onGestureEvent={onGestureEvent}
        onEnded={onGestureEnd}
      >
        <View style={[styles.chartContainer, { height: chartHeight }]}>
          <Svg width={chartWidth} height={chartHeight}>
            {/* Background grid */}
            <Line
              x1={padding}
              y1={chartHeight / 2}
              x2={chartWidth - padding}
              y2={chartHeight / 2}
              stroke={colors.borderLight}
              strokeWidth="1"
              strokeDasharray="5,5"
            />

            {/* Line chart */}
            <Path
              d={pathData}
              stroke={lineColor}
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
                  stroke={colors.textSecondary}
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
                  stroke={colors.textSecondary}
                  strokeWidth="1"
                  strokeDasharray="3,3"
                  opacity={0.5}
                />

                {/* Highlight circle */}
                <Circle
                  cx={selectedPoint.x}
                  cy={selectedPoint.y}
                  r="8"
                  fill={lineColor}
                  opacity={0.3}
                />
                <Circle
                  cx={selectedPoint.x}
                  cy={selectedPoint.y}
                  r="4"
                  fill={lineColor}
                />

                {/* Price label on Y-axis */}
                <Rect
                  x={chartWidth - padding - 50}
                  y={selectedPoint.y - 12}
                  width={45}
                  height={24}
                  fill={lineColor}
                  rx={4}
                />
                <Svg x={chartWidth - padding - 50} y={selectedPoint.y - 8}>
                  <SvgText
                    fill="#ffffff"
                    fontSize="11"
                    fontWeight="bold"
                    textAnchor="middle"
                    x={22.5}
                  >
                    ${selectedData.close.toFixed(2)}
                  </SvgText>
                </Svg>
              </>
            )}

            {/* End point (when not touching) */}
            {!selectedPoint && data.length > 0 && (
              <Circle
                cx={chartWidth - padding}
                cy={chartHeight - padding - ((data[data.length - 1]?.close - minPrice) / priceRange) * (chartHeight - 2 * padding)}
                r="4"
                fill={lineColor}
              />
            )}
          </Svg>
        </View>
      </PanGestureHandler>

      {/* Chart Stats */}
      <View style={styles.statsRow}>
        <View style={styles.statItem}>
          <Text style={styles.statLabel}>Open</Text>
          <Text style={styles.statValue}>
            ${selectedData ? selectedData.open.toFixed(2) : data[0]?.open.toFixed(2)}
          </Text>
        </View>
        <View style={styles.statItem}>
          <Text style={styles.statLabel}>High</Text>
          <Text style={[styles.statValue, { color: '#10b981' }]}>
            ${selectedData ? selectedData.high.toFixed(2) : Math.max(...data.map(d => d.high)).toFixed(2)}
          </Text>
        </View>
        <View style={styles.statItem}>
          <Text style={styles.statLabel}>Low</Text>
          <Text style={[styles.statValue, { color: '#ef4444' }]}>
            ${selectedData ? selectedData.low.toFixed(2) : Math.min(...data.map(d => d.low)).toFixed(2)}
          </Text>
        </View>
        <View style={styles.statItem}>
          <Text style={styles.statLabel}>Close</Text>
          <Text style={styles.statValue}>
            ${selectedData ? selectedData.close.toFixed(2) : data[data.length - 1]?.close.toFixed(2)}
          </Text>
        </View>
      </View>

      {/* Interaction hint */}
      {!selectedData && (
        <Text style={styles.hintText}>👆 Touch and drag to explore data points</Text>
      )}
    </GestureHandlerRootView>
  );
}

const createStyles = (colors: any) => StyleSheet.create({
  container: {
    backgroundColor: colors.card,
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
    color: colors.text,
  },
  tooltip: {
    alignItems: 'flex-end',
  },
  tooltipPrice: {
    fontSize: 18,
    fontWeight: '700',
    color: colors.text,
  },
  tooltipDate: {
    fontSize: 12,
    color: colors.textSecondary,
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
    borderTopColor: colors.borderLight,
  },
  statItem: {
    alignItems: 'center',
  },
  statLabel: {
    fontSize: 11,
    color: colors.textSecondary,
    marginBottom: 4,
    textTransform: 'uppercase',
  },
  statValue: {
    fontSize: 14,
    fontWeight: '700',
    color: colors.text,
  },
  hintText: {
    fontSize: 12,
    color: colors.textTertiary,
    textAlign: 'center',
    marginTop: 8,
    fontStyle: 'italic',
  },
  legend: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 16,
    marginTop: 12,
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: colors.borderLight,
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
    color: colors.textSecondary,
  },
});
