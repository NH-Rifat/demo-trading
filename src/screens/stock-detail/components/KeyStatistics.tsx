import { formatCurrency, formatLargeNumber } from '@/src/utils/helpers';
import React from 'react';
import { Text, View } from 'react-native';
import { statsStyles } from '../styles/stockDetailStyles';

interface KeyStatisticsProps {
  open: number;
  high: number;
  low: number;
  close: number;
  volume: number;
  avgVolume: string;
}

export const KeyStatistics: React.FC<KeyStatisticsProps> = ({
  open,
  high,
  low,
  close,
  volume,
  avgVolume,
}) => {
  return (
    <View style={statsStyles.section}>
      <Text style={statsStyles.sectionTitle}>Key Statistics</Text>
      <View style={statsStyles.statsGrid}>
        <View style={statsStyles.statItem}>
          <Text style={statsStyles.statLabel}>Open</Text>
          <Text style={statsStyles.statValue}>{formatCurrency(open)}</Text>
        </View>
        <View style={statsStyles.statItem}>
          <Text style={statsStyles.statLabel}>High</Text>
          <Text style={statsStyles.statValue}>{formatCurrency(high)}</Text>
        </View>
        <View style={statsStyles.statItem}>
          <Text style={statsStyles.statLabel}>Low</Text>
          <Text style={statsStyles.statValue}>{formatCurrency(low)}</Text>
        </View>
        <View style={statsStyles.statItem}>
          <Text style={statsStyles.statLabel}>Close</Text>
          <Text style={statsStyles.statValue}>{formatCurrency(close)}</Text>
        </View>
        <View style={statsStyles.statItem}>
          <Text style={statsStyles.statLabel}>Volume</Text>
          <Text style={statsStyles.statValue}>{formatLargeNumber(volume)}</Text>
        </View>
        <View style={statsStyles.statItem}>
          <Text style={statsStyles.statLabel}>Avg Volume</Text>
          <Text style={statsStyles.statValue}>{avgVolume}</Text>
        </View>
      </View>
    </View>
  );
};
