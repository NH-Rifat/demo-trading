// ============================================
// PORTFOLIO SUMMARY COMPONENT
// Displays total value, invested amount, P&L, and today's change
// ============================================

import { formatCurrency, formatPercent, getProfitColor } from '@/src/utils/helpers';
import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import { Text, View } from 'react-native';
import { summaryStyles } from '../styles/portfolioStyles';

interface PortfolioSummaryProps {
  portfolioValue: {
    totalInvested: number;
    currentValue: number;
    profitLoss: number;
    profitLossPercent: number;
  };
  todaysChange: number;
}

export const PortfolioSummary: React.FC<PortfolioSummaryProps> = ({
  portfolioValue,
  todaysChange,
}) => {
  return (
    <View style={summaryStyles.summaryCard}>
      <View style={summaryStyles.summaryHeader}>
        <Text style={summaryStyles.summaryLabel}>Total Portfolio Value</Text>
        <Ionicons name="trending-up" size={20} color="#10b981" />
      </View>
      <Text style={summaryStyles.summaryValue}>
        {formatCurrency(portfolioValue.currentValue)}
      </Text>

      <View style={summaryStyles.summaryRow}>
        <View style={summaryStyles.summaryItem}>
          <Text style={summaryStyles.summaryItemLabel}>Invested</Text>
          <Text style={summaryStyles.summaryItemValue}>
            {formatCurrency(portfolioValue.totalInvested)}
          </Text>
        </View>
        <View style={summaryStyles.summaryDivider} />
        <View style={summaryStyles.summaryItem}>
          <Text style={summaryStyles.summaryItemLabel}>Total P&L</Text>
          <Text
            style={[
              summaryStyles.summaryItemValue,
              { color: getProfitColor(portfolioValue.profitLoss) },
            ]}
          >
            {portfolioValue.profitLoss >= 0 ? '+' : ''}
            {formatCurrency(portfolioValue.profitLoss)}
          </Text>
        </View>
        <View style={summaryStyles.summaryDivider} />
        <View style={summaryStyles.summaryItem}>
          <Text style={summaryStyles.summaryItemLabel}>Returns</Text>
          <Text
            style={[
              summaryStyles.summaryItemValue,
              { color: getProfitColor(portfolioValue.profitLoss) },
            ]}
          >
            {portfolioValue.profitLossPercent >= 0 ? '+' : ''}
            {formatPercent(portfolioValue.profitLossPercent)}
          </Text>
        </View>
      </View>

      <View style={summaryStyles.todaysChangeContainer}>
        <View style={summaryStyles.todaysChangeRow}>
          <Ionicons
            name={todaysChange >= 0 ? 'arrow-up' : 'arrow-down'}
            size={16}
            color={getProfitColor(todaysChange)}
          />
          <Text style={summaryStyles.todaysChangeLabel}>Today&apos;s Change</Text>
        </View>
        <Text style={[summaryStyles.todaysChangeValue, { color: getProfitColor(todaysChange) }]}>
          {todaysChange >= 0 ? '+' : ''}
          {formatCurrency(todaysChange)}
        </Text>
      </View>
    </View>
  );
};
