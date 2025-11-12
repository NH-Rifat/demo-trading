// ============================================
// POSITION CARD COMPONENT
// Displays individual stock position with details
// ============================================

import { useTheme } from '@/src/contexts/ThemeContext';
import { formatCurrency, formatPercent, getProfitColor } from '@/src/utils/helpers';
import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import { createPositionStyles } from '../styles/portfolioStyles';

interface PositionCardProps {
  position: {
    stockSymbol: string;
    stockName: string;
    currentValue: number;
    change: number;
    changePercent: number;
    quantity: number;
    avgBuyPrice: number;
    currentPrice: number;
    profitLoss: number;
    profitLossPercent: number;
  };
}

export const PositionCard: React.FC<PositionCardProps> = ({ position }) => {
  const { colors, fonts } = useTheme();
  const styles = createPositionStyles(colors, fonts);
  const profitColor = getProfitColor(position.profitLoss);
  const changeColor = getProfitColor(position.change);

  return (
    <TouchableOpacity
      style={styles.positionCard}
      onPress={() => router.push(`/stock/${position.stockSymbol}`)}
    >
      <View style={styles.positionHeader}>
        <View>
          <Text style={styles.positionSymbol}>{position.stockSymbol}</Text>
          <Text style={styles.positionName}>{position.stockName}</Text>
        </View>
        <View style={styles.positionHeaderRight}>
          <Text style={styles.positionValue}>
            {formatCurrency(position.currentValue)}
          </Text>
          <View style={styles.positionChangeRow}>
            <Ionicons
              name={position.change >= 0 ? 'trending-up' : 'trending-down'}
              size={14}
              color={changeColor}
            />
            <Text style={[styles.positionChange, { color: changeColor }]}>
              {formatPercent(position.changePercent)}
            </Text>
          </View>
        </View>
      </View>

      <View style={styles.positionDivider} />

      <View style={styles.positionDetails}>
        <View style={styles.positionDetailItem}>
          <Text style={styles.positionDetailLabel}>Quantity</Text>
          <Text style={styles.positionDetailValue}>{position.quantity}</Text>
        </View>
        <View style={styles.positionDetailItem}>
          <Text style={styles.positionDetailLabel}>Avg Price</Text>
          <Text style={styles.positionDetailValue}>
            {formatCurrency(position.avgBuyPrice)}
          </Text>
        </View>
        <View style={styles.positionDetailItem}>
          <Text style={styles.positionDetailLabel}>Current</Text>
          <Text style={styles.positionDetailValue}>
            {formatCurrency(position.currentPrice)}
          </Text>
        </View>
      </View>

      <View style={styles.profitLossContainer}>
        <View style={styles.profitLossRow}>
          <Text style={styles.profitLossLabel}>P&L</Text>
          <View style={styles.profitLossValues}>
            <Text style={[styles.profitLossAmount, { color: profitColor }]}>
              {position.profitLoss >= 0 ? '+' : ''}
              {formatCurrency(position.profitLoss)}
            </Text>
            <Text style={[styles.profitLossPercent, { color: profitColor }]}>
              ({position.profitLossPercent >= 0 ? '+' : ''}
              {formatPercent(position.profitLossPercent)})
            </Text>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
};
