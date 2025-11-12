import { useTheme } from '@/src/contexts/ThemeContext';
import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import { createHeaderStyles } from '../styles/stockDetailStyles';

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
  const { colors, fonts } = useTheme();
  const styles = createHeaderStyles(colors, fonts);
  
  return (
    <View style={[styles.header, { paddingTop: insets.top + 16 }]}>
      <TouchableOpacity style={styles.backButton} onPress={onBack}>
        <Ionicons name="arrow-back" size={24} color={colors.text} />
      </TouchableOpacity>

      <View style={styles.headerCenter}>
        <Text style={styles.headerSymbol}>{symbol}</Text>
        <Text style={styles.headerName}>{name}</Text>
      </View>

      <TouchableOpacity
        style={[styles.starButton, isInWatchlist && styles.starButtonActive]}
        onPress={onToggleWatchlist}
      >
        <Ionicons
          name={isInWatchlist ? 'star' : 'star-outline'}
          size={24}
          color={isInWatchlist ? colors.warning : colors.textSecondary}
        />
      </TouchableOpacity>
    </View>
  );
};
