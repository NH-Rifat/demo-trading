import { useTheme } from '@/src/contexts/ThemeContext';
import React from 'react';
import { Text, TextInput, View } from 'react-native';
import { createPriceInputStyles, createStockSelectorStyles } from '../styles/tradeStyles';

interface LimitPriceInputProps {
  limitPrice: string;
  onChangeLimitPrice: (value: string) => void;
}

export const LimitPriceInput: React.FC<LimitPriceInputProps> = ({
  limitPrice,
  onChangeLimitPrice,
}) => {
  const { colors } = useTheme();
  const selectorStyles = createStockSelectorStyles(colors);
  const priceStyles = createPriceInputStyles(colors);
  
  return (
    <View style={selectorStyles.section}>
      <Text style={selectorStyles.sectionLabel}>Limit Price</Text>
      <View style={priceStyles.priceInputContainer}>
        <Text style={priceStyles.currencySymbol}>$</Text>
        <TextInput
          style={priceStyles.priceInput}
          value={limitPrice}
          onChangeText={onChangeLimitPrice}
          keyboardType="decimal-pad"
          placeholder="0.00"
          placeholderTextColor={colors.textTertiary}
        />
      </View>
    </View>
  );
};
