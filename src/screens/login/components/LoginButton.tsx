import { useTheme } from '@/src/contexts/ThemeContext';
import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import { Text, TouchableOpacity } from 'react-native';
import { createStyles } from '../styles/loginStyles';

// ============================================
// LOGIN BUTTON COMPONENT
// Primary action button for login
// ============================================

interface Props {
  onPress: () => void;
  isLoading: boolean;
}

export default function LoginButton({ onPress, isLoading }: Props) {
  const { colors, fonts } = useTheme();
  const styles = createStyles(colors, fonts);

  return (
    <TouchableOpacity
      style={[styles.loginButton, isLoading && styles.loginButtonDisabled]}
      onPress={onPress}
      disabled={isLoading}
    >
      {isLoading ? (
        <Text style={styles.loginButtonText}>Signing in...</Text>
      ) : (
        <>
          <Text style={styles.loginButtonText}>Sign In</Text>
          <Ionicons name="arrow-forward" size={20} color="#ffffff" />
        </>
      )}
    </TouchableOpacity>
  );
}
