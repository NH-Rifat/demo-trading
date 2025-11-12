import { useTheme } from '@/src/contexts/ThemeContext';
import React from 'react';
import { Text } from 'react-native';
import { createStyles } from '../styles/loginStyles';

// ============================================
// FOOTER COMPONENT
// Copyright and app information
// ============================================

export default function Footer() {
  const { colors, fonts } = useTheme();
  const styles = createStyles(colors, fonts);

  return <Text style={styles.footer}>© 2025 Xpert Trading. All rights reserved.</Text>;
}
