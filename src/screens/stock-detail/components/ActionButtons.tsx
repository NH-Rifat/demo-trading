import { useTheme } from '@/src/contexts/ThemeContext';
import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import { createActionButtonStyles } from '../styles/stockDetailStyles';

interface ActionButtonsProps {
  onSell: () => void;
  onBuy: () => void;
}

export const ActionButtons: React.FC<ActionButtonsProps> = ({ onSell, onBuy }) => {
  const { colors } = useTheme();
  const styles = createActionButtonStyles(colors);
  
  return (
    <View style={styles.bottomActions}>
      <TouchableOpacity
        style={[styles.actionButton, styles.sellButton]}
        onPress={onSell}
      >
        <Ionicons name="trending-down" size={20} color="#ffffff" />
        <Text style={styles.actionButtonText}>Sell</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={[styles.actionButton, styles.buyButton]}
        onPress={onBuy}
      >
        <Ionicons name="trending-up" size={20} color="#ffffff" />
        <Text style={styles.actionButtonText}>Buy</Text>
      </TouchableOpacity>
    </View>
  );
};
