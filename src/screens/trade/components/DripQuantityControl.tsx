import { useTheme } from '@/src/contexts/ThemeContext';
import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import { Text, TextInput, TouchableOpacity, View } from 'react-native';
import { createPriceInputStyles, createStockSelectorStyles } from '../styles/tradeStyles';

interface DripQuantityControlProps {
  dripQuantity: string;
  onChangeDripQuantity: (value: string) => void;
}

export const DripQuantityControl: React.FC<DripQuantityControlProps> = ({
  dripQuantity,
  onChangeDripQuantity,
}) => {
  const { colors } = useTheme();
  const selectorStyles = createStockSelectorStyles(colors);
  const priceStyles = createPriceInputStyles(colors);
  
  const handleDecrement = () => {
    const qty = Math.max(0, parseInt(dripQuantity) - 1);
    onChangeDripQuantity(qty.toString());
  };

  const handleIncrement = () => {
    const qty = parseInt(dripQuantity) + 1;
    onChangeDripQuantity(qty.toString());
  };

  const handleTextChange = (text: string) => {
    const cleaned = text.replace(/[^0-9]/g, '');
    onChangeDripQuantity(cleaned || '0');
  };

  return (
    <View style={selectorStyles.section}>
              <Text style={selectorStyles.sectionLabel}>
                Drip Quantity
              </Text>
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
                    value={dripQuantity}
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
