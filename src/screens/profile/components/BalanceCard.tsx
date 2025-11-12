import { useTheme } from '@/src/contexts/ThemeContext';
import { formatCurrency } from '@/src/utils/helpers';
import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import { createBalanceCardStyles } from '../styles/profileStyles';

interface BalanceCardProps {
  balance: number;
  totalInvestment: number;
  currentValue: number;
}

export const BalanceCard: React.FC<BalanceCardProps> = ({
  balance,
  totalInvestment,
  currentValue,
}) => {
  const { colors, fonts } = useTheme();
  const balanceCardStyles = createBalanceCardStyles(colors, fonts);

  return (
    <View style={balanceCardStyles.balanceCard}>
      <View style={balanceCardStyles.balanceHeader}>
        <View style={balanceCardStyles.balanceHeaderLeft}>
          <Ionicons name="wallet-outline" size={20} color={colors.success} />
          <Text style={balanceCardStyles.balanceLabel}>Available Balance</Text>
        </View>
        <TouchableOpacity style={balanceCardStyles.addFundsButton}>
          <Ionicons name="add-circle" size={18} color={colors.success} />
          <Text style={balanceCardStyles.addFundsText}>Add Funds</Text>
        </TouchableOpacity>
      </View>
      <Text style={balanceCardStyles.balanceAmount}>
        {formatCurrency(balance)}
      </Text>
      <View style={balanceCardStyles.balanceStats}>
        <View style={balanceCardStyles.balanceStat}>
          <Text style={balanceCardStyles.balanceStatLabel}>Invested</Text>
          <Text style={balanceCardStyles.balanceStatValue}>
            {formatCurrency(totalInvestment)}
          </Text>
        </View>
        <View style={balanceCardStyles.balanceStatDivider} />
        <View style={balanceCardStyles.balanceStat}>
          <Text style={balanceCardStyles.balanceStatLabel}>Portfolio Value</Text>
          <Text style={balanceCardStyles.balanceStatValue}>
            {formatCurrency(currentValue)}
          </Text>
        </View>
      </View>
    </View>
  );
};
