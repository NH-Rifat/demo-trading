// ============================================
// PIE CHART - Portfolio Distribution
// Features: Sector/asset allocation visualization
// ============================================

import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Svg, { Circle, G, Text as SvgText } from 'react-native-svg';

interface PieData {
  label: string;
  value: number;
  color: string;
}

interface Props {
  data: PieData[];
  size?: number;
}

export default function PieChart({ data, size = 200 }: Props) {
  const total = data.reduce((sum, item) => sum + item.value, 0);
  const radius = size / 2;
  const center = size / 2;
  const innerRadius = radius * 0.6; // Donut chart

  // Calculate angles for each slice
  let currentAngle = -90; // Start from top
  const slices = data.map((item) => {
    const percentage = (item.value / total) * 100;
    const angle = (percentage / 100) * 360;
    const startAngle = currentAngle;
    const endAngle = currentAngle + angle;
    currentAngle = endAngle;

    return {
      ...item,
      percentage,
      startAngle,
      endAngle,
    };
  });

  return (
    <View style={styles.container}>
      <Svg width={size} height={size}>
        <G>
          {slices.map((slice, index) => {
            return (
              <G key={index}>
                <Circle
                  cx={center}
                  cy={center}
                  r={radius}
                  fill="none"
                  stroke={slice.color}
                  strokeWidth={radius - innerRadius}
                  strokeDasharray={`${(slice.percentage / 100) * (2 * Math.PI * radius)} ${
                    2 * Math.PI * radius
                  }`}
                  strokeDashoffset={
                    -(slice.startAngle / 360) * (2 * Math.PI * radius)
                  }
                  rotation={-90}
                  origin={`${center}, ${center}`}
                />
              </G>
            );
          })}

          {/* Center Text */}
          <SvgText
            x={center}
            y={center - 10}
            textAnchor="middle"
            fontSize="24"
            fontWeight="bold"
            fill="#111827"
          >
            {data.length}
          </SvgText>
          <SvgText
            x={center}
            y={center + 15}
            textAnchor="middle"
            fontSize="14"
            fill="#6b7280"
          >
            Sectors
          </SvgText>
        </G>
      </Svg>

      {/* Legend */}
      <View style={styles.legend}>
        {slices.map((slice, index) => (
          <View key={index} style={styles.legendItem}>
            <View
              style={[styles.legendDot, { backgroundColor: slice.color }]}
            />
            <View style={styles.legendTextContainer}>
              <Text style={styles.legendLabel}>{slice.label}</Text>
              <Text style={styles.legendValue}>
                {slice.percentage.toFixed(1)}%
              </Text>
            </View>
          </View>
        ))}
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
    alignItems: 'center',
  },
  legend: {
    marginTop: 24,
    width: '100%',
  },
  legendItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 8,
    paddingHorizontal: 12,
    marginBottom: 4,
    backgroundColor: '#f9fafb',
    borderRadius: 8,
  },
  legendDot: {
    width: 12,
    height: 12,
    borderRadius: 6,
    marginRight: 12,
  },
  legendTextContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  legendLabel: {
    fontSize: 14,
    color: '#111827',
    fontWeight: '500',
  },
  legendValue: {
    fontSize: 14,
    color: '#6b7280',
    fontWeight: '600',
  },
});
