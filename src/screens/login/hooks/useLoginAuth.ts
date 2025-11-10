import { useAppDispatch } from '@/src/store/hooks';
import { login } from '@/src/store/slices/authSlice';
import { router } from 'expo-router';
import { Alert } from 'react-native';
import { DEMO_EMAIL, DEMO_PASSWORD } from './useLoginForm';

// ============================================
// LOGIN AUTHENTICATION HOOK
// Handles login authentication logic
// ============================================

export function useLoginAuth() {
  const dispatch = useAppDispatch();

  const handleLogin = async (
    email: string,
    password: string,
    setIsLoading: (loading: boolean) => void
  ) => {
    setIsLoading(true);

    // Simulate API call delay
    setTimeout(() => {
      if (email === DEMO_EMAIL && password === DEMO_PASSWORD) {
        dispatch(login({ email, password }));
        router.replace('/(tabs)');
      } else {
        Alert.alert(
          'Login Failed',
          'Invalid email or password.\n\nDemo credentials:\nEmail: demo@xperttrading.com\nPassword: demo123'
        );
      }
      setIsLoading(false);
    }, 1000);
  };

  return { handleLogin };
}
