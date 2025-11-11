import { useTheme } from '@/src/contexts/ThemeContext';
import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import { Text, TextInput, TouchableOpacity, View } from 'react-native';
import { createQuantityStyles, createStockSelectorStyles } from '../styles/tradeStyles';

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
  const quantityStyles = createQuantityStyles(colors);
  
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

  return (
    <View style={selectorStyles.section}>
      <Text style={selectorStyles.sectionLabel}>Quantity</Text>
      <View style={quantityStyles.quantityControl}>
        <TouchableOpacity style={quantityStyles.quantityButton} onPress={handleDecrement}>
          <Ionicons name="remove" size={24} color={colors.textSecondary} />
        </TouchableOpacity>

        <TextInput
          style={quantityStyles.quantityInput}
          value={quantity}
          onChangeText={handleTextChange}
          keyboardType="number-pad"
          textAlign="center"
          placeholderTextColor={colors.textTertiary}
        />

        <TouchableOpacity style={quantityStyles.quantityButton} onPress={handleIncrement}>
          <Ionicons name="add" size={24} color={colors.textSecondary} />
        </TouchableOpacity>
      </View>
    </View>
  );
};
