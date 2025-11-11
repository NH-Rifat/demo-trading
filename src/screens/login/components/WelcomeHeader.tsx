import { useTheme } from '@/src/contexts/ThemeContext';
import React from 'react';
import { Text } from 'react-native';
import { createStyles } from '../styles/loginStyles';

// ============================================
// WELCOME HEADER COMPONENT
// Welcome text and subtitle
// ============================================

export default function WelcomeHeader() {
  const { colors } = useTheme();
  const styles = createStyles(colors);

  return (
    <>
      <Text style={styles.welcomeText}>Welcome Back</Text>
      <Text style={styles.subtitleText}>Sign in to continue trading</Text>
    </>
  );
}
