import { useTheme } from '@/src/contexts/ThemeContext';
import type { Stock } from '@/src/types';
import { formatCurrency } from '@/src/utils/helpers';
import React from 'react';
import { Text, View } from 'react-native';
import { createOrderSummaryStyles } from '../styles/tradeStyles';

interface OrderSummaryProps {
  tradeType: 'BUY' | 'SELL';
  orderType: 'MARKET' | 'LIMIT';
  selectedStock: Stock | null;
  quantity: string;
  orderPrice: number;
  orderTotal: number;
  availableBalance: number;
  holdingQuantity: number;
}

export const OrderSummary: React.FC<OrderSummaryProps> = ({
  tradeType,
  orderType,
  selectedStock,
  quantity,
  orderPrice,
  orderTotal,
  availableBalance,
  holdingQuantity,
}) => {
  const { colors } = useTheme();
  const styles = createOrderSummaryStyles(colors);
  
  return (
    <View style={styles.orderSummary}>
      <Text style={styles.orderSummaryTitle}>Order Summary</Text>

      <View style={styles.summaryRow}>
        <Text style={styles.summaryLabel}>Order Type</Text>
        <Text style={styles.summaryValue}>
          {tradeType} • {orderType}
        </Text>
      </View>

      <View style={styles.summaryRow}>
        <Text style={styles.summaryLabel}>Price per Share</Text>
        <Text style={styles.summaryValue}>
          {selectedStock ? formatCurrency(orderPrice) : '—'}
        </Text>
      </View>

      <View style={styles.summaryRow}>
        <Text style={styles.summaryLabel}>Quantity</Text>
        <Text style={styles.summaryValue}>{quantity} shares</Text>
      </View>

      <View style={styles.summaryDivider} />

      <View style={styles.summaryRow}>
        <Text style={styles.summaryLabelTotal}>Total</Text>
        <Text style={styles.summaryValueTotal}>
          {selectedStock ? formatCurrency(orderTotal) : '—'}
        </Text>
      </View>

      <View style={styles.summaryRow}>
        <Text style={styles.summaryLabel}>
          {tradeType === 'BUY' ? 'Available Balance' : 'Holdings'}
        </Text>
        <Text style={styles.summaryValue}>
          {tradeType === 'BUY' ? formatCurrency(availableBalance) : `${holdingQuantity} shares`}
        </Text>
      </View>
    </View>
  );
};
