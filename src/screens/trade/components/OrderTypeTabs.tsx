import { useTheme } from '@/src/contexts/ThemeContext';
import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import { createOrderTypeStyles, createStockSelectorStyles } from '../styles/tradeStyles';

interface OrderTypeTabsProps {
  orderType: 'MARKET' | 'LIMIT';
  onChangeOrderType: (type: 'MARKET' | 'LIMIT') => void;
}

export const OrderTypeTabs: React.FC<OrderTypeTabsProps> = ({ orderType, onChangeOrderType }) => {
  const { colors } = useTheme();
  const selectorStyles = createStockSelectorStyles(colors);
  const orderStyles = createOrderTypeStyles(colors);
  
  return (
    <View style={selectorStyles.section}>
      <Text style={selectorStyles.sectionLabel}>Order Type</Text>
      <View style={orderStyles.orderTypeTabs}>
        <TouchableOpacity
          style={[
            orderStyles.orderTypeTab,
            orderType === 'MARKET' && orderStyles.orderTypeTabActive,
          ]}
          onPress={() => onChangeOrderType('MARKET')}
        >
          <Text
            style={[
              orderStyles.orderTypeTabText,
              orderType === 'MARKET' && orderStyles.orderTypeTabTextActive,
            ]}
          >
            Market
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[
            orderStyles.orderTypeTab,
            orderType === 'LIMIT' && orderStyles.orderTypeTabActive,
          ]}
          onPress={() => onChangeOrderType('LIMIT')}
        >
          <Text
            style={[
              orderStyles.orderTypeTabText,
              orderType === 'LIMIT' && orderStyles.orderTypeTabTextActive,
            ]}
          >
            Limit
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};
