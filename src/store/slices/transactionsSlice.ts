// ============================================
// TRANSACTIONS SLICE - Deposits & Withdrawals
// ============================================

import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Transaction, TransactionFilter } from '../../types';

interface TransactionsState {
  transactions: Transaction[];
  filter: TransactionFilter;
  isLoading: boolean;
}

const initialState: TransactionsState = {
  transactions: [
    {
      id: 'TXN001',
      type: 'DEPOSIT',
      amount: 50000.00,
      status: 'APPROVED',
      transactionId: 'DEP20251001-001',
      note: 'Initial deposit',
      createdAt: new Date('2025-10-01T09:00:00'),
      processedAt: new Date('2025-10-01T10:30:00'),
    },
    {
      id: 'TXN002',
      type: 'BUY',
      amount: 8750.00,
      status: 'APPROVED',
      transactionId: 'BUY20251015-001',
      note: 'Bought AAPL - 50 shares',
      createdAt: new Date('2025-10-15T10:30:00'),
      processedAt: new Date('2025-10-15T10:30:05'),
    },
    {
      id: 'TXN003',
      type: 'BUY',
      amount: 6600.00,
      status: 'APPROVED',
      transactionId: 'BUY20251020-001',
      note: 'Bought TSLA - 30 shares',
      createdAt: new Date('2025-10-20T14:20:00'),
      processedAt: new Date('2025-10-20T15:45:00'),
    },
    {
      id: 'TXN004',
      type: 'DEPOSIT',
      amount: 10000.00,
      status: 'PROCESSING',
      transactionId: 'DEP20251104-001',
      note: 'Additional funds',
      createdAt: new Date('2025-11-04T15:00:00'),
    },
  ],
  filter: 'ALL',
  isLoading: false,
};

const transactionsSlice = createSlice({
  name: 'transactions',
  initialState,
  reducers: {
    addTransaction: (state, action: PayloadAction<Omit<Transaction, 'id' | 'createdAt'>>) => {
      const newTransaction: Transaction = {
        ...action.payload,
        id: `TXN${String(state.transactions.length + 1).padStart(3, '0')}`,
        createdAt: new Date(),
        status: 'SUBMITTED',
      };
      state.transactions.unshift(newTransaction);
    },
    updateTransaction: (state, action: PayloadAction<{ id: string; updates: Partial<Transaction> }>) => {
      const index = state.transactions.findIndex(t => t.id === action.payload.id);
      if (index !== -1) {
        state.transactions[index] = {
          ...state.transactions[index],
          ...action.payload.updates,
        };
      }
    },
    approveTransaction: (state, action: PayloadAction<string>) => {
      const index = state.transactions.findIndex(t => t.id === action.payload);
      if (index !== -1) {
        state.transactions[index].status = 'APPROVED';
        state.transactions[index].processedAt = new Date();
      }
    },
    cancelTransaction: (state, action: PayloadAction<string>) => {
      const index = state.transactions.findIndex(t => t.id === action.payload);
      if (index !== -1) {
        state.transactions[index].status = 'CANCELLED';
      }
    },
    setTransactionFilter: (state, action: PayloadAction<TransactionFilter>) => {
      state.filter = action.payload;
    },
  },
});

export const {
  addTransaction,
  updateTransaction,
  approveTransaction,
  cancelTransaction,
  setTransactionFilter,
} = transactionsSlice.actions;

export default transactionsSlice.reducer;
