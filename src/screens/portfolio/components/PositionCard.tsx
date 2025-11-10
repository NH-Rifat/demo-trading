// ============================================
// POSITION CARD COMPONENT
// Displays individual stock position with details
// ============================================

import { formatCurrency, formatPercent, getProfitColor } from '@/src/utils/helpers';
import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import { positionStyles } from '../styles/portfolioStyles';

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
  const profitColor = getProfitColor(position.profitLoss);
  const changeColor = getProfitColor(position.change);

  return (
    <TouchableOpacity
      style={positionStyles.positionCard}
      onPress={() => router.push(`/stock/${position.stockSymbol}`)}
    >
      <View style={positionStyles.positionHeader}>
        <View>
          <Text style={positionStyles.positionSymbol}>{position.stockSymbol}</Text>
          <Text style={positionStyles.positionName}>{position.stockName}</Text>
        </View>
        <View style={positionStyles.positionHeaderRight}>
          <Text style={positionStyles.positionValue}>
            {formatCurrency(position.currentValue)}
          </Text>
          <View style={positionStyles.positionChangeRow}>
            <Ionicons
              name={position.change >= 0 ? 'trending-up' : 'trending-down'}
              size={14}
              color={changeColor}
            />
            <Text style={[positionStyles.positionChange, { color: changeColor }]}>
              {formatPercent(position.changePercent)}
            </Text>
          </View>
        </View>
      </View>

      <View style={positionStyles.positionDivider} />

      <View style={positionStyles.positionDetails}>
        <View style={positionStyles.positionDetailItem}>
          <Text style={positionStyles.positionDetailLabel}>Quantity</Text>
          <Text style={positionStyles.positionDetailValue}>{position.quantity}</Text>
        </View>
        <View style={positionStyles.positionDetailItem}>
          <Text style={positionStyles.positionDetailLabel}>Avg Price</Text>
          <Text style={positionStyles.positionDetailValue}>
            {formatCurrency(position.avgBuyPrice)}
          </Text>
        </View>
        <View style={positionStyles.positionDetailItem}>
          <Text style={positionStyles.positionDetailLabel}>Current</Text>
          <Text style={positionStyles.positionDetailValue}>
            {formatCurrency(position.currentPrice)}
          </Text>
        </View>
      </View>

      <View style={positionStyles.profitLossContainer}>
        <View style={positionStyles.profitLossRow}>
          <Text style={positionStyles.profitLossLabel}>P&L</Text>
          <View style={positionStyles.profitLossValues}>
            <Text style={[positionStyles.profitLossAmount, { color: profitColor }]}>
              {position.profitLoss >= 0 ? '+' : ''}
              {formatCurrency(position.profitLoss)}
            </Text>
            <Text style={[positionStyles.profitLossPercent, { color: profitColor }]}>
              ({position.profitLossPercent >= 0 ? '+' : ''}
              {formatPercent(position.profitLossPercent)})
            </Text>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
};
