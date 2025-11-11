import { useTheme } from '@/src/contexts/ThemeContext';
import { formatCurrency, formatPercent } from '@/src/utils/helpers';
import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import { Text, View } from 'react-native';
import { createPriceSectionStyles } from '../styles/stockDetailStyles';

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
  const { colors } = useTheme();
  const styles = createPriceSectionStyles(colors);
  const isPositive = change >= 0;

  return (
    <View style={styles.priceSection}>
      <Text style={styles.currentPrice}>{formatCurrency(price)}</Text>
      <View style={styles.changeContainer}>
        <Ionicons
          name={isPositive ? 'trending-up' : 'trending-down'}
          size={20}
          color={priceColor}
        />
        <Text style={[styles.changeText, { color: priceColor }]}>
          {formatCurrency(Math.abs(change))} ({formatPercent(changePercent)})
        </Text>
      </View>
      <Text style={styles.lastUpdate}>
        Last updated: {new Date(lastUpdate).toLocaleTimeString()}
      </Text>
    </View>
  );
};
