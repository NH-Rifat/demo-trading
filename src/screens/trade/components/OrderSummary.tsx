import type { Stock } from '@/src/types';
import { formatCurrency } from '@/src/utils/helpers';
import React from 'react';
import { Text, View } from 'react-native';
import { orderSummaryStyles } from '../styles/tradeStyles';

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
  return (
    <View style={orderSummaryStyles.orderSummary}>
      <Text style={orderSummaryStyles.orderSummaryTitle}>Order Summary</Text>

      <View style={orderSummaryStyles.summaryRow}>
        <Text style={orderSummaryStyles.summaryLabel}>Order Type</Text>
        <Text style={orderSummaryStyles.summaryValue}>
          {tradeType} • {orderType}
        </Text>
      </View>

      <View style={orderSummaryStyles.summaryRow}>
        <Text style={orderSummaryStyles.summaryLabel}>Price per Share</Text>
        <Text style={orderSummaryStyles.summaryValue}>
          {selectedStock ? formatCurrency(orderPrice) : '—'}
        </Text>
      </View>

      <View style={orderSummaryStyles.summaryRow}>
        <Text style={orderSummaryStyles.summaryLabel}>Quantity</Text>
        <Text style={orderSummaryStyles.summaryValue}>{quantity} shares</Text>
      </View>

      <View style={orderSummaryStyles.summaryDivider} />

      <View style={orderSummaryStyles.summaryRow}>
        <Text style={orderSummaryStyles.summaryLabelTotal}>Total</Text>
        <Text style={orderSummaryStyles.summaryValueTotal}>
          {selectedStock ? formatCurrency(orderTotal) : '—'}
        </Text>
      </View>

      <View style={orderSummaryStyles.summaryRow}>
        <Text style={orderSummaryStyles.summaryLabel}>
          {tradeType === 'BUY' ? 'Available Balance' : 'Holdings'}
        </Text>
        <Text style={orderSummaryStyles.summaryValue}>
          {tradeType === 'BUY' ? formatCurrency(availableBalance) : `${holdingQuantity} shares`}
        </Text>
      </View>
    </View>
  );
};
