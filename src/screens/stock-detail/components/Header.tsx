import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import { headerStyles } from '../styles/stockDetailStyles';

interface HeaderProps {
  symbol: string;
  name: string;
  isInWatchlist: boolean;
  insets: { top: number; bottom: number; left: number; right: number };
  onBack: () => void;
  onToggleWatchlist: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  symbol,
  name,
  isInWatchlist,
  insets,
  onBack,
  onToggleWatchlist,
}) => {
  return (
    <View style={[headerStyles.header, { paddingTop: insets.top + 16 }]}>
      <TouchableOpacity style={headerStyles.backButton} onPress={onBack}>
        <Ionicons name="arrow-back" size={24} color="#111827" />
      </TouchableOpacity>

      <View style={headerStyles.headerCenter}>
        <Text style={headerStyles.headerSymbol}>{symbol}</Text>
        <Text style={headerStyles.headerName}>{name}</Text>
      </View>

      <TouchableOpacity
        style={[headerStyles.starButton, isInWatchlist && headerStyles.starButtonActive]}
        onPress={onToggleWatchlist}
      >
        <Ionicons
          name={isInWatchlist ? 'star' : 'star-outline'}
          size={24}
          color={isInWatchlist ? '#fbbf24' : '#6b7280'}
        />
      </TouchableOpacity>
    </View>
  );
};
