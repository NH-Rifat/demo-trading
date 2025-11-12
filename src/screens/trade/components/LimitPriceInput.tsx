import { useTheme } from '@/src/contexts/ThemeContext';
import { Ionicons } from '@expo/vector-icons';
import React, { useEffect, useState } from 'react';
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
  const [showWarning, setShowWarning] = useState(false);
  
  useEffect(() => {
    // Count digits only (excluding decimal point)
    const digitCount = limitPrice.replace(/[^0-9]/g, '').length;
    if (digitCount >= 12) {
      setShowWarning(true);
      const timer = setTimeout(() => setShowWarning(false), 2000);
      return () => clearTimeout(timer);
    }
  }, [limitPrice]);

  const handleIncrease = () => {
    const currentPrice = parseFloat(limitPrice) || 0;
    const newPrice = (currentPrice + 0.10).toFixed(2);
    const digitCount = newPrice.replace(/[^0-9]/g, '').length;
    if (digitCount <= 12) {
      onChangeLimitPrice(newPrice);
    }
  };

  const handleDecrease = () => {
    const currentPrice = parseFloat(limitPrice) || 0;
    const newPrice = Math.max(0, currentPrice - 0.10).toFixed(2);
    onChangeLimitPrice(newPrice);
  };

  const handleTextChange = (text: string) => {
    // Allow only numbers and decimal point
    const cleaned = text.replace(/[^0-9.]/g, '');
    // Count digits only (excluding decimal point)
    const digitCount = cleaned.replace(/[^0-9]/g, '').length;
    
    if (digitCount <= 12) {
      onChangeLimitPrice(cleaned);
    }
  };

  return (
    <View style={selectorStyles.section}>
      <Text style={selectorStyles.sectionLabel}>Limit Price</Text>
      <View style={[
        priceStyles.priceInputContainer,
        showWarning && { borderColor: colors.danger, borderWidth: 1.5 }
      ]}>
        <TouchableOpacity
          style={priceStyles.priceButton}
          onPress={handleDecrease}
          activeOpacity={0.7}
        >
          <Ionicons name="remove" size={18} color={colors.danger} />
        </TouchableOpacity>

        <View style={priceStyles.priceInputWrapper}>
          <Text style={priceStyles.currencySymbol}>৳</Text>
          <TextInput
            style={priceStyles.priceInput}
            value={limitPrice}
            onChangeText={handleTextChange}
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
          Maximum 12 digits allowed
        </Text>
      )}
    </View>
  );
};
