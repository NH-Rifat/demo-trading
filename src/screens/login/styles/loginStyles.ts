import { Platform, StyleSheet } from 'react-native';

// ============================================
// LOGIN SCREEN STYLES
// Organized style groups for login screen components
// ============================================

export const styles = StyleSheet.create({
  // Container Styles
  container: {
    flex: 1,
    backgroundColor: '#f9fafb',
  },
  scrollContent: {
    flexGrow: 1,
    paddingHorizontal: 24,
    paddingTop: Platform.OS === 'ios' ? 60 : 40,
    paddingBottom: 40,
  },

  // Logo Section Styles
  logoContainer: {
    alignItems: 'center',
    marginBottom: 40,
  },
  logoCircle: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: '#10b981',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
    ...Platform.select({
      ios: {
        shadowColor: '#10b981',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 12,
      },
      android: {
        elevation: 8,
      },
    }),
  },
  appName: {
    fontSize: 32,
    fontWeight: '700',
    color: '#111827',
    marginBottom: 8,
  },
  tagline: {
    fontSize: 14,
    color: '#6b7280',
  },

  // Form Container Styles
  formContainer: {
    flex: 1,
  },
  welcomeText: {
    fontSize: 28,
    fontWeight: '700',
    color: '#111827',
    marginBottom: 8,
  },
  subtitleText: {
    fontSize: 16,
    color: '#6b7280',
    marginBottom: 24,
  },

  // Demo Banner Styles
  demoBanner: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#dbeafe',
    borderRadius: 12,
    padding: 16,
    marginBottom: 24,
    borderWidth: 1,
    borderColor: '#93c5fd',
  },
  demoBannerLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  demoBannerText: {
    fontSize: 14,
    color: '#1e40af',
    fontWeight: '600',
  },

  // Input Field Styles
  inputContainer: {
    marginBottom: 20,
  },
  inputLabel: {
    fontSize: 14,
    fontWeight: '600',
    color: '#374151',
    marginBottom: 8,
  },
  inputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#ffffff',
    borderRadius: 12,
    paddingHorizontal: 16,
    height: 56,
    borderWidth: 2,
    borderColor: '#e5e7eb',
  },
  inputError: {
    borderColor: '#ef4444',
  },
  input: {
    flex: 1,
    fontSize: 16,
    color: '#111827',
    marginLeft: 12,
  },
  eyeIcon: {
    padding: 8,
  },
  errorText: {
    fontSize: 12,
    color: '#ef4444',
    marginTop: 6,
    marginLeft: 4,
  },

  // Forgot Password Styles
  forgotPassword: {
    alignSelf: 'flex-end',
    marginBottom: 24,
  },
  forgotPasswordText: {
    fontSize: 14,
    color: '#10b981',
    fontWeight: '600',
  },

  // Login Button Styles
  loginButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#10b981',
    borderRadius: 12,
    height: 56,
    gap: 8,
    ...Platform.select({
      ios: {
        shadowColor: '#10b981',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 8,
      },
      android: {
        elevation: 4,
      },
    }),
  },
  loginButtonDisabled: {
    opacity: 0.7,
  },
  loginButtonText: {
    fontSize: 16,
    fontWeight: '700',
    color: '#ffffff',
  },

  // Demo Info Styles
  demoInfoContainer: {
    marginTop: 32,
  },
  divider: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  dividerLine: {
    flex: 1,
    height: 1,
    backgroundColor: '#e5e7eb',
  },
  dividerText: {
    fontSize: 12,
    color: '#9ca3af',
    marginHorizontal: 12,
    fontWeight: '600',
  },
  credentialsBox: {
    backgroundColor: '#f3f4f6',
    borderRadius: 12,
    padding: 16,
    gap: 12,
  },
  credentialRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  credentialText: {
    fontSize: 14,
    color: '#374151',
    fontFamily: Platform.OS === 'ios' ? 'Courier' : 'monospace',
  },

  // Sign Up Styles
  signUpContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 24,
  },
  signUpText: {
    fontSize: 14,
    color: '#6b7280',
  },
  signUpLink: {
    fontSize: 14,
    color: '#10b981',
    fontWeight: '700',
  },

  // Footer Styles
  footer: {
    fontSize: 12,
    color: '#9ca3af',
    textAlign: 'center',
    marginTop: 32,
  },
});
