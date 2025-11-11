// ============================================
// HEADER COMPONENT - Portfolio Screen
// Simple header with title
// ============================================

import { useTheme } from '@/src/contexts/ThemeContext';
import React from 'react';
import { Text, View } from 'react-native';
import { createHeaderStyles } from '../styles/portfolioStyles';

interface HeaderProps {
  paddingTop: number;
}

export const Header: React.FC<HeaderProps> = ({ paddingTop }) => {
  const { colors } = useTheme();
  const styles = createHeaderStyles(colors);
  
  return (
    <View style={[styles.header, { paddingTop }]}>
      <Text style={styles.headerTitle}>Portfolio</Text>
    </View>
  );
};
