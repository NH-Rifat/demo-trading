// ============================================
// LOGIN SCREEN - Main Component
// Features: Email/password login, validation, demo credentials
// ============================================

import { useTheme } from '@/src/contexts/ThemeContext';
import React from 'react';
import { KeyboardAvoidingView, Platform, ScrollView, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import DemoCredentialsBanner from './components/DemoCredentialsBanner';
import DemoInfoSection from './components/DemoInfoSection';
import Footer from './components/Footer';
import ForgotPasswordLink from './components/ForgotPasswordLink';
import InputField from './components/InputField';
import LoginButton from './components/LoginButton';
import LogoSection from './components/LogoSection';
import SignUpLink from './components/SignUpLink';
import WelcomeHeader from './components/WelcomeHeader';
import { useLoginAuth } from './hooks/useLoginAuth';
import { useLoginForm } from './hooks/useLoginForm';
import { createStyles } from './styles/loginStyles';

export default function LoginScreen() {
  const insets = useSafeAreaInsets();
  const { colors } = useTheme();
  const styles = createStyles(colors);
  const { handleLogin } = useLoginAuth();

  const {
    email,
    password,
    showPassword,
    isLoading,
    errors,
    setEmail,
    setPassword,
    setShowPassword,
    setIsLoading,
    handleFillDemo,
    validateForm,
    clearError,
  } = useLoginForm();

  const onLogin = async () => {
    if (!validateForm()) return;
    await handleLogin(email, password, setIsLoading);
  };

  return (
    <KeyboardAvoidingView
      style={[styles.container, { paddingTop: insets.top }]}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {/* Logo Section */}
        <LogoSection />

        {/* Login Form */}
        <View style={styles.formContainer}>
          {/* Welcome Header */}
          <WelcomeHeader />

          {/* Demo Credentials Banner */}
          <DemoCredentialsBanner onPress={handleFillDemo} />

          {/* Email Input */}
          <InputField
            label="Email Address"
            value={email}
            onChangeText={(text) => {
              setEmail(text);
              if (errors.email) clearError('email');
            }}
            placeholder="Enter your email"
            icon="mail-outline"
            error={errors.email}
            keyboardType="email-address"
            autoCapitalize="none"
            autoComplete="email"
          />

          {/* Password Input */}
          <InputField
            label="Password"
            value={password}
            onChangeText={(text) => {
              setPassword(text);
              if (errors.password) clearError('password');
            }}
            placeholder="Enter your password"
            icon="lock-closed-outline"
            error={errors.password}
            secureTextEntry
            showPassword={showPassword}
            onTogglePassword={() => setShowPassword(!showPassword)}
            autoCapitalize="none"
            autoComplete="password"
          />

          {/* Forgot Password */}
          <ForgotPasswordLink />

          {/* Login Button */}
          <LoginButton onPress={onLogin} isLoading={isLoading} />

          {/* Demo Info */}
          <DemoInfoSection />

          {/* Sign Up Link */}
          <SignUpLink />
        </View>

        {/* Footer */}
        <Footer />
      </ScrollView>
    </KeyboardAvoidingView>
  );
}
