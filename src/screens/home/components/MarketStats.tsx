// ============================================
// MARKET STATS COMPONENT
// Displays turnover, volume, and trade statistics
// Theme-aware with dynamic colors
// ============================================

import { useTheme } from '@/src/contexts/ThemeContext';
import React from 'react';
import { Text, View } from 'react-native';
import { createMarketStatsStyles } from '../styles/homeStyles';

interface MarketStatsProps {
  turnover: { value: number; percent: number };
  volume: { value: number };
  trade: { value: number; percent: number };
}

export const MarketStats: React.FC<MarketStatsProps> = ({ turnover, volume, trade }) => {
  const { colors } = useTheme();
  const marketStatsStyles = createMarketStatsStyles(colors);

  return (
    <View style={marketStatsStyles.statsRow}>
      <View style={[marketStatsStyles.statBox, { backgroundColor: colors.successLight }]}>
        <Text style={marketStatsStyles.statValue}>{turnover.value.toFixed(2)} cr</Text>
        <Text style={marketStatsStyles.statLabel}>Turnover</Text>
        <Text style={marketStatsStyles.statPercent}>{turnover.percent.toFixed(2)}%</Text>
        <Text style={marketStatsStyles.statType}>BUY PRESSURE</Text>
      </View>
      <View style={[marketStatsStyles.statBox, { backgroundColor: colors.dangerLight }]}>
        <Text style={marketStatsStyles.statValue}>{volume.value.toFixed(2)} cr</Text>
        <Text style={marketStatsStyles.statLabel}>Volume</Text>
      </View>
      <View style={[marketStatsStyles.statBox, { backgroundColor: colors.dangerLight }]}>
        <Text style={marketStatsStyles.statValue}>{trade.value}</Text>
        <Text style={marketStatsStyles.statLabel}>Trade</Text>
        <Text style={marketStatsStyles.statPercent}>{trade.percent.toFixed(2)}%</Text>
        <Text style={marketStatsStyles.statType}>SELL PRESSURE</Text>
      </View>
    </View>
  );
};
