import { useTheme } from '@/src/contexts/ThemeContext';
import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import { createTradeTypeStyles } from '../styles/tradeStyles';

interface TradeTypeTabsProps {
  tradeType: 'BUY' | 'SELL';
  onChangeTradeType: (type: 'BUY' | 'SELL') => void;
}

export const TradeTypeTabs: React.FC<TradeTypeTabsProps> = ({ tradeType, onChangeTradeType }) => {
  const { colors } = useTheme();
  const styles = createTradeTypeStyles(colors);
  
  return (
    <View style={styles.tradeTypeTabs}>
      <TouchableOpacity
        style={[
          styles.tradeTypeTab,
          tradeType === 'BUY' && styles.tradeTypeTabActiveBuy,
        ]}
        onPress={() => onChangeTradeType('BUY')}
      >
        <Ionicons
          name="trending-up"
          size={20}
          color={tradeType === 'BUY' ? '#ffffff' : colors.success}
        />
        <Text
          style={[
            styles.tradeTypeTabText,
            tradeType === 'BUY' && styles.tradeTypeTabTextActive,
          ]}
        >
          Buy
        </Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={[
          styles.tradeTypeTab,
          tradeType === 'SELL' && styles.tradeTypeTabActiveSell,
        ]}
        onPress={() => onChangeTradeType('SELL')}
      >
        <Ionicons
          name="trending-down"
          size={20}
          color={tradeType === 'SELL' ? '#ffffff' : colors.danger}
        />
        <Text
          style={[
            styles.tradeTypeTabText,
            tradeType === 'SELL' && styles.tradeTypeTabTextActive,
          ]}
        >
          Sell
        </Text>
      </TouchableOpacity>
    </View>
  );
};
