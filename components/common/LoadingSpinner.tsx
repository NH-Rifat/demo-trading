// ============================================
// LOADING SPINNER - Reusable Loading Component
// ============================================

import { useTheme } from '@/src/contexts/ThemeContext';
import React from 'react';
import { ActivityIndicator, StyleSheet, Text, View } from 'react-native';

interface LoadingSpinnerProps {
  size?: 'small' | 'large';
  color?: string;
  message?: string;
}

export default function LoadingSpinner({
  size = 'large',
  color,
  message,
}: LoadingSpinnerProps) {
  const { colors } = useTheme();
  const styles = createStyles(colors);
  const spinnerColor = color || colors.success;

  return (
    <View style={styles.container}>
      <ActivityIndicator size={size} color={spinnerColor} />
      {message && <Text style={styles.message}>{message}</Text>}
    </View>
  );
}

const createStyles = (colors: any) => StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.background,
  },
  message: {
    marginTop: 12,
    fontSize: 14,
    color: colors.textSecondary,
    fontWeight: '500',
  },
});
