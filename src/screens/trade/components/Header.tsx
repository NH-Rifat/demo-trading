import { useTheme } from '@/src/contexts/ThemeContext';
import React from 'react';
import { Text, View } from 'react-native';
import { createHeaderStyles } from '../styles/tradeStyles';

export const Header: React.FC = () => {
  const { colors } = useTheme();
  const styles = createHeaderStyles(colors);
  
  return (
    <View style={styles.header}>
      <Text style={styles.headerTitle}>Trade</Text>
    </View>
  );
};
