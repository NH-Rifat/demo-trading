// ============================================
// PORTFOLIO SUMMARY COMPONENT
// Displays total value, invested amount, P&L, and today's change
// ============================================

import { useTheme } from '@/src/contexts/ThemeContext';
import { formatCurrency, formatPercent, getProfitColor } from '@/src/utils/helpers';
import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import { Text, View } from 'react-native';
import { createSummaryStyles } from '../styles/portfolioStyles';

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
  const { colors, fonts } = useTheme();
  const styles = createSummaryStyles(colors, fonts);
  
  return (
    <View style={styles.summaryCard}>
      <View style={styles.summaryHeader}>
        <Text style={styles.summaryLabel}>Total Portfolio Value</Text>
        <Ionicons name="trending-up" size={20} color={colors.primary} />
      </View>
      <Text style={styles.summaryValue}>
        {formatCurrency(portfolioValue.currentValue)}
      </Text>

      <View style={styles.summaryRow}>
        <View style={styles.summaryItem}>
          <Text style={styles.summaryItemLabel}>Invested</Text>
          <Text style={styles.summaryItemValue}>
            {formatCurrency(portfolioValue.totalInvested)}
          </Text>
        </View>
        <View style={styles.summaryDivider} />
        <View style={styles.summaryItem}>
          <Text style={styles.summaryItemLabel}>Total P&L</Text>
          <Text
            style={[
              styles.summaryItemValue,
              { color: getProfitColor(portfolioValue.profitLoss) },
            ]}
          >
            {portfolioValue.profitLoss >= 0 ? '+' : ''}
            {formatCurrency(portfolioValue.profitLoss)}
          </Text>
        </View>
        <View style={styles.summaryDivider} />
        <View style={styles.summaryItem}>
          <Text style={styles.summaryItemLabel}>Returns</Text>
          <Text
            style={[
              styles.summaryItemValue,
              { color: getProfitColor(portfolioValue.profitLoss) },
            ]}
          >
            {portfolioValue.profitLossPercent >= 0 ? '+' : ''}
            {formatPercent(portfolioValue.profitLossPercent)}
          </Text>
        </View>
      </View>

      <View style={styles.todaysChangeContainer}>
        <View style={styles.todaysChangeRow}>
          <Ionicons
            name={todaysChange >= 0 ? 'arrow-up' : 'arrow-down'}
            size={16}
            color={getProfitColor(todaysChange)}
          />
          <Text style={styles.todaysChangeLabel}>Today&apos;s Change</Text>
        </View>
        <Text style={[styles.todaysChangeValue, { color: getProfitColor(todaysChange) }]}>
          {todaysChange >= 0 ? '+' : ''}
          {formatCurrency(todaysChange)}
        </Text>
      </View>
    </View>
  );
};
