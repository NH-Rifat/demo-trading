import { useTheme } from '@/src/contexts/ThemeContext';
import React from 'react';
import { Text, View } from 'react-native';
import { createBalanceInfoStyles } from '../styles/tradeStyles';

interface BalanceInfoProps {
  limit: number;
  balance: number;
}

export const BalanceInfo: React.FC<BalanceInfoProps> = ({ limit, balance }) => {
  const { colors, fonts } = useTheme();
  const styles = createBalanceInfoStyles(colors, fonts);

  return (
    <View style={styles.container}>
      <View style={styles.item}>
        <Text style={styles.label}>Limit:</Text>
        <Text style={styles.value}>{limit.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</Text>
      </View>
      <View style={styles.item}>
        <Text style={styles.label}>Balance:</Text>
        <Text style={styles.value}>{balance.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</Text>
      </View>
    </View>
  );
};
