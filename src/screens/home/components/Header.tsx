// ============================================
// HEADER COMPONENT - Home Page Only
// Logo and exchange toggle section
// Theme-aware with dynamic colors
// ============================================

import { useTheme } from '@/src/contexts/ThemeContext';
import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import { createHeaderStyles } from '../styles/homeStyles';

interface HeaderProps {
  selectedExchange: 'DSE' | 'CSE';
  onExchangeChange: (exchange: 'DSE' | 'CSE') => void;
}

export const Header: React.FC<HeaderProps> = ({
  selectedExchange,
  onExchangeChange,
}) => {
  const { colors } = useTheme();
  const headerStyles = createHeaderStyles(colors);

  return (
    <View style={headerStyles.headerBottomSection}>
      <View style={headerStyles.headerMiddle}>
        <View style={headerStyles.logoContainer}>
          <Text style={headerStyles.logoText}>Xpert</Text>
        </View>

        <View style={headerStyles.exchangeToggle}>
          <TouchableOpacity
            style={[
              headerStyles.exchangeButton,
              selectedExchange === 'DSE' && headerStyles.exchangeButtonActive,
            ]}
            onPress={() => onExchangeChange('DSE')}
          >
            <Text
              style={[
                headerStyles.exchangeButtonText,
                selectedExchange === 'DSE' && headerStyles.exchangeButtonTextActive,
              ]}
            >
              DSE
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[
              headerStyles.exchangeButton,
              selectedExchange === 'CSE' && headerStyles.exchangeButtonActive,
            ]}
            onPress={() => onExchangeChange('CSE')}
          >
            <Text
              style={[
                headerStyles.exchangeButtonText,
                selectedExchange === 'CSE' && headerStyles.exchangeButtonTextActive,
              ]}
            >
              CSE
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};
