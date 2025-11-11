import { useTheme } from '@/src/contexts/ThemeContext';
import React from 'react';
import { Text, View } from 'react-native';
import { createHeaderStyles } from '../styles/tradeStyles';

interface HeaderProps {
  insets: { top: number; bottom: number; left: number; right: number };
}

export const Header: React.FC<HeaderProps> = ({ insets }) => {
  const { colors } = useTheme();
  const styles = createHeaderStyles(colors);
  
  return (
    <View style={[styles.header, { paddingTop: insets.top + 16 }]}>
      <Text style={styles.headerTitle}>Trade</Text>
    </View>
  );
};
