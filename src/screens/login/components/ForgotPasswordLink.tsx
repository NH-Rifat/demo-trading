import { useTheme } from '@/src/contexts/ThemeContext';
import React from 'react';
import { Text, TouchableOpacity } from 'react-native';
import { createStyles } from '../styles/loginStyles';

// ============================================
// FORGOT PASSWORD LINK COMPONENT
// Link to forgot password flow
// ============================================

export default function ForgotPasswordLink() {
  const { colors } = useTheme();
  const styles = createStyles(colors);

  return (
    <TouchableOpacity style={styles.forgotPassword}>
      <Text style={styles.forgotPasswordText}>Forgot Password?</Text>
    </TouchableOpacity>
  );
}
