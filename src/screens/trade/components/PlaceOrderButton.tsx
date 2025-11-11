import { useTheme } from '@/src/contexts/ThemeContext';
import React from 'react';
import { Text, TouchableOpacity } from 'react-native';
import { createPlaceOrderStyles } from '../styles/tradeStyles';

interface PlaceOrderButtonProps {
  tradeType: 'BUY' | 'SELL';
  isDisabled: boolean;
  onPress: () => void;
}

export const PlaceOrderButton: React.FC<PlaceOrderButtonProps> = ({
  tradeType,
  isDisabled,
  onPress,
}) => {
  const { colors } = useTheme();
  const styles = createPlaceOrderStyles(colors);
  
  return (
    <TouchableOpacity
      style={[
        styles.placeOrderButton,
        tradeType === 'BUY'
          ? styles.placeOrderButtonBuy
          : styles.placeOrderButtonSell,
        isDisabled && styles.placeOrderButtonDisabled,
      ]}
      onPress={onPress}
      disabled={isDisabled}
    >
      <Text style={styles.placeOrderButtonText}>
        {tradeType === 'BUY' ? 'Place Buy Order' : 'Place Sell Order'}
      </Text>
    </TouchableOpacity>
  );
};
