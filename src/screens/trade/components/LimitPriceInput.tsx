import { useTheme } from '@/src/contexts/ThemeContext';
import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import { Text, TextInput, TouchableOpacity, View } from 'react-native';
import { createPriceInputStyles, createStockSelectorStyles } from '../styles/tradeStyles';

interface LimitPriceInputProps {
  limitPrice: string;
  onChangeLimitPrice: (value: string) => void;
}

export const LimitPriceInput: React.FC<LimitPriceInputProps> = ({
  limitPrice,
  onChangeLimitPrice,
}) => {
  const { colors, fonts } = useTheme();
  const selectorStyles = createStockSelectorStyles(colors, fonts);
  const priceStyles = createPriceInputStyles(colors, fonts);
  
  const handleIncrease = () => {
    const currentPrice = parseFloat(limitPrice) || 0;
    const newPrice = (currentPrice + 0.10).toFixed(2);
    onChangeLimitPrice(newPrice);
  };

  const handleDecrease = () => {
    const currentPrice = parseFloat(limitPrice) || 0;
    const newPrice = Math.max(0, currentPrice - 0.10).toFixed(2);
    onChangeLimitPrice(newPrice);
  };

  return (
    <View style={selectorStyles.section}>
      <Text style={selectorStyles.sectionLabel}>Limit Price</Text>
      <View style={priceStyles.priceInputContainer}>
        <TouchableOpacity
          style={priceStyles.priceButton}
          onPress={handleDecrease}
          activeOpacity={0.7}
        >
          <Ionicons name="remove" size={24} color={colors.danger} />
        </TouchableOpacity>

        <View style={priceStyles.priceInputWrapper}>
          <Text style={priceStyles.currencySymbol}>৳</Text>
          <TextInput
            style={priceStyles.priceInput}
            value={limitPrice}
            onChangeText={onChangeLimitPrice}
            keyboardType="decimal-pad"
            textAlign="center"
            placeholder="0.00"
            placeholderTextColor={colors.textTertiary}
          />
        </View>

        <TouchableOpacity
          style={priceStyles.priceButton}
          onPress={handleIncrease}
          activeOpacity={0.7}
        >
          <Ionicons name="add" size={24} color={colors.success} />
        </TouchableOpacity>
      </View>
    </View>
  );
};
