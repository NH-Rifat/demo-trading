import { useTheme } from '@/src/contexts/ThemeContext';
import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import Animated, { Easing, useAnimatedStyle, withTiming } from 'react-native-reanimated';
import { createOrderTypeStyles, createStockSelectorStyles } from '../styles/tradeStyles';

interface OrderTypeTabsProps {
  orderType: 'MARKET' | 'LIMIT';
  onChangeOrderType: (type: 'MARKET' | 'LIMIT') => void;
}

export const OrderTypeTabs: React.FC<OrderTypeTabsProps> = ({ orderType, onChangeOrderType }) => {
  const { colors, fonts } = useTheme();
  const selectorStyles = createStockSelectorStyles(colors, fonts);
  const orderStyles = createOrderTypeStyles(colors, fonts);
  
  const marketAnimatedStyle = useAnimatedStyle(() => {
    return {
      transform: [
        { scale: withTiming(orderType === 'MARKET' ? 1 : 0.98, { 
          duration: 200,
          easing: Easing.out(Easing.cubic)
        }) },
      ],
      opacity: withTiming(orderType === 'MARKET' ? 1 : 0.65, { 
        duration: 200,
        easing: Easing.out(Easing.ease)
      }),
    };
  });

  const limitAnimatedStyle = useAnimatedStyle(() => {
    return {
      transform: [
        { scale: withTiming(orderType === 'LIMIT' ? 1 : 0.98, { 
          duration: 200,
          easing: Easing.out(Easing.cubic)
        }) },
      ],
      opacity: withTiming(orderType === 'LIMIT' ? 1 : 0.65, { 
        duration: 200,
        easing: Easing.out(Easing.ease)
      }),
    };
  });
  
  return (
    <View style={selectorStyles.section}>
      <Text style={selectorStyles.sectionLabel}>Order Type</Text>
      <View style={orderStyles.orderTypeTabs}>
        <Animated.View style={[marketAnimatedStyle, { flex: 1 }]}>
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
        </Animated.View>

        <Animated.View style={[limitAnimatedStyle, { flex: 1 }]}>
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
        </Animated.View>
      </View>
    </View>
  );
};
