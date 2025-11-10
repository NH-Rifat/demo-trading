// ============================================
// MARKET STATS COMPONENT
// Displays turnover, volume, and trade statistics
// ============================================

import React from 'react';
import { Text, View } from 'react-native';
import { marketStatsStyles } from '../styles/homeStyles';

interface MarketStatsProps {
  turnover: { value: number; percent: number };
  volume: { value: number };
  trade: { value: number; percent: number };
}

export const MarketStats: React.FC<MarketStatsProps> = ({ turnover, volume, trade }) => {
  return (
    <View style={marketStatsStyles.statsRow}>
      <View style={[marketStatsStyles.statBox, { backgroundColor: '#d1fae5' }]}>
        <Text style={marketStatsStyles.statValue}>{turnover.value.toFixed(2)} cr</Text>
        <Text style={marketStatsStyles.statLabel}>Turnover</Text>
        <Text style={marketStatsStyles.statPercent}>{turnover.percent.toFixed(2)}%</Text>
        <Text style={marketStatsStyles.statType}>BUY PRESSURE</Text>
      </View>
      <View style={[marketStatsStyles.statBox, { backgroundColor: '#fecaca' }]}>
        <Text style={marketStatsStyles.statValue}>{volume.value.toFixed(2)} cr</Text>
        <Text style={marketStatsStyles.statLabel}>Volume</Text>
      </View>
      <View style={[marketStatsStyles.statBox, { backgroundColor: '#fecaca' }]}>
        <Text style={marketStatsStyles.statValue}>{trade.value}</Text>
        <Text style={marketStatsStyles.statLabel}>Trade</Text>
        <Text style={marketStatsStyles.statPercent}>{trade.percent.toFixed(2)}%</Text>
        <Text style={marketStatsStyles.statType}>SELL PRESSURE</Text>
      </View>
    </View>
  );
};
