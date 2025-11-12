import { useTheme } from '@/src/contexts/ThemeContext';
import { formatCurrency, formatLargeNumber } from '@/src/utils/helpers';
import React from 'react';
import { Text, View } from 'react-native';
import { createStatsStyles } from '../styles/stockDetailStyles';

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
  const { colors, fonts } = useTheme();
  const styles = createStatsStyles(colors, fonts);
  
  return (
    <View style={styles.section}>
      <Text style={styles.sectionTitle}>Key Statistics</Text>
      <View style={styles.statsGrid}>
        <View style={styles.statItem}>
          <Text style={styles.statLabel}>Open</Text>
          <Text style={styles.statValue}>{formatCurrency(open)}</Text>
        </View>
        <View style={styles.statItem}>
          <Text style={styles.statLabel}>High</Text>
          <Text style={styles.statValue}>{formatCurrency(high)}</Text>
        </View>
        <View style={styles.statItem}>
          <Text style={styles.statLabel}>Low</Text>
          <Text style={styles.statValue}>{formatCurrency(low)}</Text>
        </View>
        <View style={styles.statItem}>
          <Text style={styles.statLabel}>Close</Text>
          <Text style={styles.statValue}>{formatCurrency(close)}</Text>
        </View>
        <View style={styles.statItem}>
          <Text style={styles.statLabel}>Volume</Text>
          <Text style={styles.statValue}>{formatLargeNumber(volume)}</Text>
        </View>
        <View style={styles.statItem}>
          <Text style={styles.statLabel}>Avg Volume</Text>
          <Text style={styles.statValue}>{avgVolume}</Text>
        </View>
      </View>
    </View>
  );
};
