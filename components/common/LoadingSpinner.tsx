// ============================================
// LOADING SPINNER - Reusable Loading Component
// ============================================

import React from 'react';
import { ActivityIndicator, StyleSheet, Text, View } from 'react-native';

interface LoadingSpinnerProps {
  size?: 'small' | 'large';
  color?: string;
  message?: string;
}

export default function LoadingSpinner({
  size = 'large',
  color = '#10b981',
  message,
}: LoadingSpinnerProps) {
  return (
    <View style={styles.container}>
      <ActivityIndicator size={size} color={color} />
      {message && <Text style={styles.message}>{message}</Text>}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#ffffff',
  },
  message: {
    marginTop: 12,
    fontSize: 14,
    color: '#6b7280',
    fontWeight: '500',
  },
});
