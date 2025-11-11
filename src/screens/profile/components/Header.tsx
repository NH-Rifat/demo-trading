import { useTheme } from '@/src/contexts/ThemeContext';
import React from 'react';
import { Text, View } from 'react-native';
import { createHeaderStyles } from '../styles/profileStyles';

interface HeaderProps {
  insets: { top: number; bottom: number; left: number; right: number };
}

export const Header: React.FC<HeaderProps> = ({ insets }) => {
  const { colors } = useTheme();
  const headerStyles = createHeaderStyles(colors);

  return (
    <View style={[headerStyles.header, { paddingTop: insets.top + 16 }]}>
      <Text style={headerStyles.headerTitle}>Profile</Text>
    </View>
  );
};
