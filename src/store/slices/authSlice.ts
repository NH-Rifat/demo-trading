// ============================================
// AUTH SLICE - User Authentication State
// ============================================

import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { User } from '../../types';

interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
}

const initialState: AuthState = {
  user: null,
  isAuthenticated: false, // Require login
  isLoading: false,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    login: (state, action: PayloadAction<{ email: string; password: string }>) => {
      // Mock login - always successful for demo
      state.isAuthenticated = true;
      state.user = {
        id: 'USER001',
        name: 'Demo User',
        email: action.payload.email,
        accountNumber: 'XT-2025-001234',
        balance: 50000.00,
        isAuthenticated: true,
      };
    },
    logout: (state) => {
      state.isAuthenticated = false;
      state.user = null;
    },
    updateBalance: (state, action: PayloadAction<number>) => {
      if (state.user) {
        state.user.balance = action.payload;
      }
    },
    updateUserProfile: (state, action: PayloadAction<Partial<User>>) => {
      if (state.user) {
        state.user = { ...state.user, ...action.payload };
      }
    },
  },
});

export const { login, logout, updateBalance, updateUserProfile } = authSlice.actions;
export default authSlice.reducer;
