import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import { styles } from '../styles/loginStyles';

// ============================================
// SIGN UP LINK COMPONENT
// Link to sign up flow
// ============================================

export default function SignUpLink() {
  return (
    <View style={styles.signUpContainer}>
      <Text style={styles.signUpText}>Don&apos;t have an account? </Text>
      <TouchableOpacity>
        <Text style={styles.signUpLink}>Sign Up</Text>
      </TouchableOpacity>
    </View>
  );
}
