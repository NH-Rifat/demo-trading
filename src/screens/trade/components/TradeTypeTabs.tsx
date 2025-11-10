import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import { tradeTypeStyles } from '../styles/tradeStyles';

interface TradeTypeTabsProps {
  tradeType: 'BUY' | 'SELL';
  onChangeTradeType: (type: 'BUY' | 'SELL') => void;
}

export const TradeTypeTabs: React.FC<TradeTypeTabsProps> = ({ tradeType, onChangeTradeType }) => {
  return (
    <View style={tradeTypeStyles.tradeTypeTabs}>
      <TouchableOpacity
        style={[
          tradeTypeStyles.tradeTypeTab,
          tradeType === 'BUY' && tradeTypeStyles.tradeTypeTabActiveBuy,
        ]}
        onPress={() => onChangeTradeType('BUY')}
      >
        <Ionicons
          name="trending-up"
          size={20}
          color={tradeType === 'BUY' ? '#ffffff' : '#10b981'}
        />
        <Text
          style={[
            tradeTypeStyles.tradeTypeTabText,
            tradeType === 'BUY' && tradeTypeStyles.tradeTypeTabTextActive,
          ]}
        >
          Buy
        </Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={[
          tradeTypeStyles.tradeTypeTab,
          tradeType === 'SELL' && tradeTypeStyles.tradeTypeTabActiveSell,
        ]}
        onPress={() => onChangeTradeType('SELL')}
      >
        <Ionicons
          name="trending-down"
          size={20}
          color={tradeType === 'SELL' ? '#ffffff' : '#ef4444'}
        />
        <Text
          style={[
            tradeTypeStyles.tradeTypeTabText,
            tradeType === 'SELL' && tradeTypeStyles.tradeTypeTabTextActive,
          ]}
        >
          Sell
        </Text>
      </TouchableOpacity>
    </View>
  );
};
