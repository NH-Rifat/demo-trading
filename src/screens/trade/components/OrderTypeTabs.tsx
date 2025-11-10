import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import { orderTypeStyles, stockSelectorStyles } from '../styles/tradeStyles';

interface OrderTypeTabsProps {
  orderType: 'MARKET' | 'LIMIT';
  onChangeOrderType: (type: 'MARKET' | 'LIMIT') => void;
}

export const OrderTypeTabs: React.FC<OrderTypeTabsProps> = ({ orderType, onChangeOrderType }) => {
  return (
    <View style={stockSelectorStyles.section}>
      <Text style={stockSelectorStyles.sectionLabel}>Order Type</Text>
      <View style={orderTypeStyles.orderTypeTabs}>
        <TouchableOpacity
          style={[
            orderTypeStyles.orderTypeTab,
            orderType === 'MARKET' && orderTypeStyles.orderTypeTabActive,
          ]}
          onPress={() => onChangeOrderType('MARKET')}
        >
          <Text
            style={[
              orderTypeStyles.orderTypeTabText,
              orderType === 'MARKET' && orderTypeStyles.orderTypeTabTextActive,
            ]}
          >
            Market
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[
            orderTypeStyles.orderTypeTab,
            orderType === 'LIMIT' && orderTypeStyles.orderTypeTabActive,
          ]}
          onPress={() => onChangeOrderType('LIMIT')}
        >
          <Text
            style={[
              orderTypeStyles.orderTypeTabText,
              orderType === 'LIMIT' && orderTypeStyles.orderTypeTabTextActive,
            ]}
          >
            Limit
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};
