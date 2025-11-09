// ============================================
// VOLUME CHART - Trading Volume Bars
// Features: Interactive volume bars with touch gestures
// ============================================

import React, { useState } from 'react';
import { Dimensions, StyleSheet, Text, View } from 'react-native';
import { GestureHandlerRootView, PanGestureHandler } from 'react-native-gesture-handler';
import Svg, { Line, Rect, Text as SvgText } from 'react-native-svg';

interface VolumeData {
  timestamp: number;
  volume: number;
  change: number;
}

interface Props {
  data: VolumeData[];
  height?: number;
}

const SCREEN_WIDTH = Dimensions.get('window').width;

export default function VolumeChart({ data, height = 180 }: Props) {
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);

  const maxVolume = Math.max(...data.map((d) => d.volume));
  const avgVolume = data.reduce((sum, d) => sum + d.volume, 0) / data.length;

  // Chart dimensions
  const chartWidth = SCREEN_WIDTH - 64;
  const chartHeight = height - 80;
  const padding = 20;
  const barWidth = (chartWidth - 2 * padding) / data.length - 2;

  // Handle touch/pan gesture
  const onGestureEvent = (event: any) => {
    const touchX = event.nativeEvent.x;
    
    // Find which bar was touched
    const barSpacing = (chartWidth - 2 * padding) / data.length;
    const index = Math.floor((touchX - padding) / barSpacing);
    
    // Ensure index is within valid bounds
    if (index >= 0 && index < data.length) {
      setSelectedIndex(index);
    }
  };

  const onGestureEnd = () => {
    // Keep showing the last selected bar
    // setSelectedIndex(null);
  };

  const selectedData = selectedIndex !== null && selectedIndex >= 0 && selectedIndex < data.length
    ? data[selectedIndex]
    : null;

  return (
    <GestureHandlerRootView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <View>
          <Text style={styles.title}>Trading Volume</Text>
          {selectedData && (
            <Text style={styles.dateText}>
              {new Date(selectedData.timestamp).toLocaleDateString('en-US', {
                month: 'short',
                day: 'numeric',
                hour: '2-digit',
                minute: '2-digit',
              })}
            </Text>
          )}
        </View>
        <View style={styles.stats}>
          {selectedData ? (
            <View style={styles.statItem}>
              <Text style={styles.statLabel}>Volume</Text>
              <Text style={styles.statValue}>
                {(selectedData.volume / 1000000).toFixed(2)}M
              </Text>
            </View>
          ) : (
            <>
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
            </>
          )}
        </View>
      </View>

      {/* Volume Chart with Touch Interaction */}
      <PanGestureHandler
        onGestureEvent={onGestureEvent}
        onEnded={onGestureEnd}
      >
        <View style={[styles.chartContainer, { height: chartHeight }]}>
          <Svg width={chartWidth} height={chartHeight}>
            {/* Average line */}
            <Line
              x1={padding}
              y1={chartHeight - padding - (avgVolume / maxVolume) * (chartHeight - 2 * padding)}
              x2={chartWidth - padding}
              y2={chartHeight - padding - (avgVolume / maxVolume) * (chartHeight - 2 * padding)}
              stroke="#9ca3af"
              strokeWidth="1"
              strokeDasharray="5,5"
              opacity={0.5}
            />

            {data.map((item, index) => {
              const barHeight = (item.volume / maxVolume) * (chartHeight - 2 * padding);
              const x = padding + index * (barWidth + 2);
              const y = chartHeight - padding - barHeight;
              const isSelected = selectedIndex === index;
              const baseColor = item.change >= 0 ? '#10b981' : '#ef4444';
              const barOpacity = isSelected ? 1 : 0.6;

              return (
                <React.Fragment key={index}>
                  <Rect
                    x={x}
                    y={y}
                    width={barWidth}
                    height={barHeight}
                    fill={baseColor}
                    opacity={barOpacity}
                    rx={2}
                  />
                  
                  {/* Highlight selected bar */}
                  {isSelected && (
                    <>
                      {/* Outline */}
                      <Rect
                        x={x - 2}
                        y={y - 2}
                        width={barWidth + 4}
                        height={barHeight + 4}
                        fill="none"
                        stroke={baseColor}
                        strokeWidth="2"
                        rx={2}
                      />
                      
                      {/* Volume label */}
                      <Rect
                        x={Math.max(padding, Math.min(x - 10, chartWidth - padding - barWidth - 20))}
                        y={Math.max(padding, y - 30)}
                        width={barWidth + 20}
                        height={24}
                        fill={baseColor}
                        rx={4}
                      />
                      <Svg 
                        x={Math.max(padding, Math.min(x - 10, chartWidth - padding - barWidth - 20))} 
                        y={Math.max(padding + 4, y - 26)}
                      >
                        <SvgText
                          fill="#ffffff"
                          fontSize="10"
                          fontWeight="bold"
                          textAnchor="middle"
                          x={(barWidth + 20) / 2}
                        >
                          {(item.volume / 1000000).toFixed(1)}M
                        </SvgText>
                      </Svg>
                    </>
                  )}
                </React.Fragment>
              );
            })}
          </Svg>
        </View>
      </PanGestureHandler>

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

      {/* Interaction hint */}
      {!selectedData && (
        <Text style={styles.hintText}>👆 Touch bars to see volume</Text>
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
    alignItems: 'center',
    marginBottom: 12,
  },
  title: {
    fontSize: 16,
    fontWeight: '700',
    color: '#111827',
  },
  dateText: {
    fontSize: 11,
    color: '#6b7280',
    marginTop: 2,
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
  hintText: {
    fontSize: 12,
    color: '#9ca3af',
    textAlign: 'center',
    marginTop: 8,
    fontStyle: 'italic',
  },
});
