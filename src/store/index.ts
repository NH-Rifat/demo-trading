// ============================================
// XPERT TRADING - REDUX STORE
// Central state management configuration
// ============================================

import { configureStore } from '@reduxjs/toolkit';
import authReducer from './slices/authSlice';
import marketReducer from './slices/marketSlice';
import portfolioReducer from './slices/portfolioSlice';
import ordersReducer from './slices/ordersSlice';
import watchlistReducer from './slices/watchlistSlice';
import transactionsReducer from './slices/transactionsSlice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    market: marketReducer,
    portfolio: portfolioReducer,
    orders: ordersReducer,
    watchlist: watchlistReducer,
    transactions: transactionsReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        // Ignore these action types
        ignoredActions: ['market/updatePrices'],
        // Ignore these paths in the state
        ignoredPaths: ['market.stocks', 'portfolio.positions'],
      },
    }),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
