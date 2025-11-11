import { useTheme } from '@/src/contexts/ThemeContext';
import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import { Text, TouchableOpacity } from 'react-native';
import Animated, { FadeInDown } from 'react-native-reanimated';
import { createHeaderStyles } from '../styles/watchlistStyles';

interface HeaderProps {
  insets: { top: number; bottom: number; left: number; right: number };
  onCreatePress: () => void;
}

export const Header: React.FC<HeaderProps> = ({ insets, onCreatePress }) => {
  const { colors } = useTheme();
  const styles = createHeaderStyles(colors);
  
  return (
    <Animated.View 
      style={[styles.headerTop, { paddingTop: insets.top + 16 }]}
      entering={FadeInDown.duration(500)}
    >
      <Text style={styles.headerTitle}>Watchlists</Text>
      <TouchableOpacity style={styles.createButton} onPress={onCreatePress}>
        <Ionicons name="add" size={24} color="#ffffff" />
      </TouchableOpacity>
    </Animated.View>
  );
};
