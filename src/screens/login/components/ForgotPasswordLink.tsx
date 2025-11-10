import React from 'react';
import { Text, TouchableOpacity } from 'react-native';
import { styles } from '../styles/loginStyles';

// ============================================
// FORGOT PASSWORD LINK COMPONENT
// Link to forgot password flow
// ============================================

export default function ForgotPasswordLink() {
  return (
    <TouchableOpacity style={styles.forgotPassword}>
      <Text style={styles.forgotPasswordText}>Forgot Password?</Text>
    </TouchableOpacity>
  );
}
