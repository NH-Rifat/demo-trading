import { useTheme } from '@/src/contexts/ThemeContext';
import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import Animated, { useAnimatedStyle, withTiming, Easing } from 'react-native-reanimated';
import { createTradeTypeStyles } from '../styles/tradeStyles';

interface TradeTypeTabsProps {
  tradeType: 'BUY' | 'SELL';
  onChangeTradeType: (type: 'BUY' | 'SELL') => void;
}

export const TradeTypeTabs: React.FC<TradeTypeTabsProps> = ({ tradeType, onChangeTradeType }) => {
  const { colors } = useTheme();
  const styles = createTradeTypeStyles(colors);
  
  const buyAnimatedStyle = useAnimatedStyle(() => {
    return {
      transform: [
        { scale: withTiming(tradeType === 'BUY' ? 1 : 0.98, { 
          duration: 200,
          easing: Easing.out(Easing.cubic)
        }) },
      ],
      opacity: withTiming(tradeType === 'BUY' ? 1 : 0.65, { 
        duration: 200,
        easing: Easing.out(Easing.ease)
      }),
    };
  });

  const sellAnimatedStyle = useAnimatedStyle(() => {
    return {
      transform: [
        { scale: withTiming(tradeType === 'SELL' ? 1 : 0.98, { 
          duration: 200,
          easing: Easing.out(Easing.cubic)
        }) },
      ],
      opacity: withTiming(tradeType === 'SELL' ? 1 : 0.65, { 
        duration: 200,
        easing: Easing.out(Easing.ease)
      }),
    };
  });
  
  return (
    <View style={styles.tradeTypeTabs}>
      <Animated.View style={[buyAnimatedStyle, { flex: 1 }]}>
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
      </Animated.View>

      <Animated.View style={[sellAnimatedStyle, { flex: 1 }]}>
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
      </Animated.View>
    </View>
  );
};
