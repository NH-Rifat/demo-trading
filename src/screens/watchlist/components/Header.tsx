import { useTheme } from '@/src/contexts/ThemeContext';
import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import { createHeaderStyles } from '../styles/watchlistStyles';

interface HeaderProps {
  insets: { top: number; bottom: number; left: number; right: number };
  onCreatePress: () => void;
}

export const Header: React.FC<HeaderProps> = ({ insets, onCreatePress }) => {
  const { colors, fonts } = useTheme();
  const styles = createHeaderStyles(colors, fonts);
  
  return (
    <View style={[styles.headerTop, { paddingTop: insets.top + 16 }]}>
      <Text style={styles.headerTitle}>Watchlists</Text>
      <TouchableOpacity style={styles.createButton} onPress={onCreatePress}>
        <Ionicons name="add" size={24} color="#ffffff" />
      </TouchableOpacity>
    </View>
  );
};
