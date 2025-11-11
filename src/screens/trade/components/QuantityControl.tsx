import { useTheme } from '@/src/contexts/ThemeContext';
import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import { Text, TextInput, TouchableOpacity, View } from 'react-native';
import { createPriceInputStyles, createStockSelectorStyles } from '../styles/tradeStyles';

interface QuantityControlProps {
  quantity: string;
  onChangeQuantity: (value: string) => void;
}

export const QuantityControl: React.FC<QuantityControlProps> = ({
  quantity,
  onChangeQuantity,
}) => {
  const { colors } = useTheme();
    const selectorStyles = createStockSelectorStyles(colors);
  const priceStyles = createPriceInputStyles(colors);
  
  const handleDecrement = () => {
    const qty = Math.max(1, parseInt(quantity) - 1);
    onChangeQuantity(qty.toString());
  };

  const handleIncrement = () => {
    const qty = parseInt(quantity) + 1;
    onChangeQuantity(qty.toString());
  };

  const handleTextChange = (text: string) => {
    const cleaned = text.replace(/[^0-9]/g, '');
    onChangeQuantity(cleaned || '0');
  };
  // display qty
  // drip qty

  return (
    <View style={selectorStyles.section}>
          <Text style={selectorStyles.sectionLabel}>Quantity</Text>
          <View style={priceStyles.priceInputContainer}>
            <TouchableOpacity
              style={priceStyles.priceButton}
              onPress={handleDecrement}
              activeOpacity={0.7}
            >
              <Ionicons name="remove" size={24} color={colors.danger} />
            </TouchableOpacity>
    
            <View style={priceStyles.priceInputWrapper}>
              <TextInput
                style={priceStyles.priceInput}
                value={quantity}
                onChangeText={handleTextChange}
                keyboardType="decimal-pad"
                textAlign="center"
                placeholder="0.00"
                placeholderTextColor={colors.textTertiary}
              />
            </View>
    
            <TouchableOpacity
              style={priceStyles.priceButton}
              onPress={handleIncrement}
              activeOpacity={0.7}
            >
              <Ionicons name="add" size={24} color={colors.success} />
            </TouchableOpacity>
          </View>
        </View>
  );
};
