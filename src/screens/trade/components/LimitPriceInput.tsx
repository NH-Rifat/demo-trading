import React from 'react';
import { Text, TextInput, View } from 'react-native';
import { priceInputStyles, stockSelectorStyles } from '../styles/tradeStyles';

interface LimitPriceInputProps {
  limitPrice: string;
  onChangeLimitPrice: (value: string) => void;
}

export const LimitPriceInput: React.FC<LimitPriceInputProps> = ({
  limitPrice,
  onChangeLimitPrice,
}) => {
  return (
    <View style={stockSelectorStyles.section}>
      <Text style={stockSelectorStyles.sectionLabel}>Limit Price</Text>
      <View style={priceInputStyles.priceInputContainer}>
        <Text style={priceInputStyles.currencySymbol}>$</Text>
        <TextInput
          style={priceInputStyles.priceInput}
          value={limitPrice}
          onChangeText={onChangeLimitPrice}
          keyboardType="decimal-pad"
          placeholder="0.00"
        />
      </View>
    </View>
  );
};
