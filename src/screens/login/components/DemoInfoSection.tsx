import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import { Text, View } from 'react-native';
import { DEMO_EMAIL, DEMO_PASSWORD } from '../hooks/useLoginForm';
import { styles } from '../styles/loginStyles';

// ============================================
// DEMO INFO SECTION COMPONENT
// Display demo credentials information
// ============================================

export default function DemoInfoSection() {
  return (
    <View style={styles.demoInfoContainer}>
      <View style={styles.divider}>
        <View style={styles.dividerLine} />
        <Text style={styles.dividerText}>Demo Credentials</Text>
        <View style={styles.dividerLine} />
      </View>

      <View style={styles.credentialsBox}>
        <View style={styles.credentialRow}>
          <Ionicons name="mail" size={16} color="#6b7280" />
          <Text style={styles.credentialText}>{DEMO_EMAIL}</Text>
        </View>
        <View style={styles.credentialRow}>
          <Ionicons name="key" size={16} color="#6b7280" />
          <Text style={styles.credentialText}>{DEMO_PASSWORD}</Text>
        </View>
      </View>
    </View>
  );
}
