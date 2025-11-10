import React from 'react';
import { Text } from 'react-native';
import { styles } from '../styles/loginStyles';

// ============================================
// WELCOME HEADER COMPONENT
// Welcome text and subtitle
// ============================================

export default function WelcomeHeader() {
  return (
    <>
      <Text style={styles.welcomeText}>Welcome Back</Text>
      <Text style={styles.subtitleText}>Sign in to continue trading</Text>
    </>
  );
}
