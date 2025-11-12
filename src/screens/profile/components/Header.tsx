import { useTheme } from '@/src/contexts/ThemeContext';
import React from 'react';
import { Text, View } from 'react-native';
import { createHeaderStyles } from '../styles/profileStyles';

export const Header: React.FC = () => {
  const { colors } = useTheme();
  const headerStyles = createHeaderStyles(colors);

  return (
    <View style={headerStyles.header}>
      <Text style={headerStyles.headerTitle}>Profile</Text>
    </View>
  );
};
