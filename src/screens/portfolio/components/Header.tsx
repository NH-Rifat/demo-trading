// ============================================
// HEADER COMPONENT - Portfolio Screen
// Simple header with title
// ============================================

import React from 'react';
import { Text, View } from 'react-native';
import { headerStyles } from '../styles/portfolioStyles';

interface HeaderProps {
  paddingTop: number;
}

export const Header: React.FC<HeaderProps> = ({ paddingTop }) => {
  return (
    <View style={[headerStyles.header, { paddingTop }]}>
      <Text style={headerStyles.headerTitle}>Portfolio</Text>
    </View>
  );
};
