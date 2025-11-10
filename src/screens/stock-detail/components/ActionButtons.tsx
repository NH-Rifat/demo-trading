import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import { actionButtonStyles } from '../styles/stockDetailStyles';

interface ActionButtonsProps {
  onSell: () => void;
  onBuy: () => void;
}

export const ActionButtons: React.FC<ActionButtonsProps> = ({ onSell, onBuy }) => {
  return (
    <View style={actionButtonStyles.bottomActions}>
      <TouchableOpacity
        style={[actionButtonStyles.actionButton, actionButtonStyles.sellButton]}
        onPress={onSell}
      >
        <Ionicons name="trending-down" size={20} color="#ffffff" />
        <Text style={actionButtonStyles.actionButtonText}>Sell</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={[actionButtonStyles.actionButton, actionButtonStyles.buyButton]}
        onPress={onBuy}
      >
        <Ionicons name="trending-up" size={20} color="#ffffff" />
        <Text style={actionButtonStyles.actionButtonText}>Buy</Text>
      </TouchableOpacity>
    </View>
  );
};
