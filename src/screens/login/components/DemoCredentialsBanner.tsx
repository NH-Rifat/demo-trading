import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import { styles } from '../styles/loginStyles';

// ============================================
// DEMO CREDENTIALS BANNER COMPONENT
// Quick-fill demo credentials
// ============================================

interface Props {
  onPress: () => void;
}

export default function DemoCredentialsBanner({ onPress }: Props) {
  return (
    <TouchableOpacity style={styles.demoBanner} onPress={onPress}>
      <View style={styles.demoBannerLeft}>
        <Ionicons name="information-circle" size={20} color="#3b82f6" />
        <Text style={styles.demoBannerText}>Tap to use demo credentials</Text>
      </View>
      <Ionicons name="chevron-forward" size={20} color="#3b82f6" />
    </TouchableOpacity>
  );
}
