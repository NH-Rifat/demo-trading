import { useTheme } from '@/src/contexts/ThemeContext';
import { Ionicons } from '@expo/vector-icons';
import React, { useEffect, useState } from 'react';
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
  const { colors, fonts } = useTheme();
  const selectorStyles = createStockSelectorStyles(colors, fonts);
  const priceStyles = createPriceInputStyles(colors, fonts);
  const [showWarning, setShowWarning] = useState(false);
  
  useEffect(() => {
    if (quantity.length >= 9) {
      setShowWarning(true);
      const timer = setTimeout(() => setShowWarning(false), 2000);
      return () => clearTimeout(timer);
    }
  }, [quantity]);

  const handleDecrement = () => {
    const qty = Math.max(1, parseInt(quantity) - 1);
    onChangeQuantity(qty.toString());
  };

  const handleIncrement = () => {
    const currentQty = parseInt(quantity);
    if (quantity.length < 9) {
      const qty = currentQty + 1;
      onChangeQuantity(qty.toString());
    }
  };

  const handleTextChange = (text: string) => {
    const cleaned = text.replace(/[^0-9]/g, '');
    if (cleaned.length <= 9) {
      onChangeQuantity(cleaned || '0');
    }
  };

  return (
    <View style={selectorStyles.section}>
          <Text style={selectorStyles.sectionLabel}>Quantity</Text>
          <View style={[
            priceStyles.priceInputContainer,
            showWarning && { borderColor: colors.danger, borderWidth: 1.5 }
          ]}>
            <TouchableOpacity
              style={priceStyles.priceButton}
              onPress={handleDecrement}
              activeOpacity={0.7}
            >
              <Ionicons name="remove" size={18} color={colors.danger} />
            </TouchableOpacity>
    
            <View style={priceStyles.priceInputWrapper}>
              <TextInput
                style={priceStyles.priceInput}
                value={quantity}
                onChangeText={handleTextChange}
                keyboardType="number-pad"
                textAlign="center"
                placeholder="0"
                placeholderTextColor={colors.textTertiary}
                maxLength={9}
              />
            </View>
    
            <TouchableOpacity
              style={priceStyles.priceButton}
              onPress={handleIncrement}
              activeOpacity={0.7}
            >
              <Ionicons name="add" size={18} color={colors.success} />
            </TouchableOpacity>
          </View>
          {showWarning && (
            <Text style={{
              fontSize: 11,
              color: colors.danger,
              marginTop: 4,
              fontFamily: fonts.medium,
            }}>
              Maximum 9 digits allowed
            </Text>
          )}
        </View>
  );
};
