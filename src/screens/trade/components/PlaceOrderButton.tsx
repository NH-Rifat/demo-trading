import React from 'react';
import { Text, TouchableOpacity } from 'react-native';
import { placeOrderStyles } from '../styles/tradeStyles';

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
  return (
    <TouchableOpacity
      style={[
        placeOrderStyles.placeOrderButton,
        tradeType === 'BUY'
          ? placeOrderStyles.placeOrderButtonBuy
          : placeOrderStyles.placeOrderButtonSell,
        isDisabled && placeOrderStyles.placeOrderButtonDisabled,
      ]}
      onPress={onPress}
      disabled={isDisabled}
    >
      <Text style={placeOrderStyles.placeOrderButtonText}>
        {tradeType === 'BUY' ? 'Place Buy Order' : 'Place Sell Order'}
      </Text>
    </TouchableOpacity>
  );
};
