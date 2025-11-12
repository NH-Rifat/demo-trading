import { useTheme } from '@/src/contexts/ThemeContext';
import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import { createStyles } from '../styles/loginStyles';

// ============================================
// SIGN UP LINK COMPONENT
// Link to sign up flow
// ============================================

export default function SignUpLink() {
  const { colors, fonts } = useTheme();
  const styles = createStyles(colors, fonts);

  return (
    <View style={styles.signUpContainer}>
      <Text style={styles.signUpText}>Don&apos;t have an account? </Text>
      <TouchableOpacity>
        <Text style={styles.signUpLink}>Sign Up</Text>
      </TouchableOpacity>
    </View>
  );
}
