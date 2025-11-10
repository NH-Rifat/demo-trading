import { formatCurrency, formatPercent } from '@/src/utils/helpers';
import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import { Text, View } from 'react-native';
import { priceSectionStyles } from '../styles/stockDetailStyles';

interface PriceSectionProps {
  price: number;
  change: number;
  changePercent: number;
  priceColor: string;
  lastUpdate: Date;
}

export const PriceSection: React.FC<PriceSectionProps> = ({
  price,
  change,
  changePercent,
  priceColor,
  lastUpdate,
}) => {
  const isPositive = change >= 0;

  return (
    <View style={priceSectionStyles.priceSection}>
      <Text style={priceSectionStyles.currentPrice}>{formatCurrency(price)}</Text>
      <View style={priceSectionStyles.changeContainer}>
        <Ionicons
          name={isPositive ? 'trending-up' : 'trending-down'}
          size={20}
          color={priceColor}
        />
        <Text style={[priceSectionStyles.changeText, { color: priceColor }]}>
          {formatCurrency(Math.abs(change))} ({formatPercent(changePercent)})
        </Text>
      </View>
      <Text style={priceSectionStyles.lastUpdate}>
        Last updated: {new Date(lastUpdate).toLocaleTimeString()}
      </Text>
    </View>
  );
};
