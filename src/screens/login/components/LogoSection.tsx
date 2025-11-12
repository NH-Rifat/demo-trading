import { useTheme } from '@/src/contexts/ThemeContext';
import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import { Text, View } from 'react-native';
import { createStyles } from '../styles/loginStyles';

// ============================================
// LOGO SECTION COMPONENT
// App branding and welcome message
// ============================================

export default function LogoSection() {
  const { colors, fonts } = useTheme();
  const styles = createStyles(colors, fonts);

  return (
    <View style={styles.logoContainer}>
      <View style={styles.logoCircle}>
        <Ionicons name="trending-up" size={48} color="#ffffff" />
      </View>
      <Text style={styles.appName}>Xpert Trading</Text>
      <Text style={styles.tagline}>Professional Trading Platform</Text>
    </View>
  );
}
