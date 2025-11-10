import { useState } from 'react';

// ============================================
// LOGIN FORM HOOK
// Manages form state and validation
// ============================================

export const DEMO_EMAIL = 'demo@xperttrading.com';
export const DEMO_PASSWORD = 'demo123';

interface FormErrors {
  email: string;
  password: string;
}

export function useLoginForm() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState<FormErrors>({ email: '', password: '' });

  const handleFillDemo = () => {
    setEmail(DEMO_EMAIL);
    setPassword(DEMO_PASSWORD);
  };

  const validateForm = (): boolean => {
    const newErrors: FormErrors = { email: '', password: '' };
    let isValid = true;

    // Email validation
    if (!email) {
      newErrors.email = 'Email is required';
      isValid = false;
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      newErrors.email = 'Please enter a valid email';
      isValid = false;
    }

    // Password validation
    if (!password) {
      newErrors.password = 'Password is required';
      isValid = false;
    } else if (password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const clearError = (field: 'email' | 'password') => {
    setErrors((prev) => ({ ...prev, [field]: '' }));
  };

  return {
    // Form state
    email,
    password,
    showPassword,
    isLoading,
    errors,

    // Actions
    setEmail,
    setPassword,
    setShowPassword,
    setIsLoading,
    handleFillDemo,
    validateForm,
    clearError,
  };
}
