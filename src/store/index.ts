// ============================================
// XPERT TRADING - REDUX STORE
// Central state management configuration
// ============================================

import { configureStore } from '@reduxjs/toolkit';
import authReducer from './slices/authSlice';
import marketReducer from './slices/marketSlice';
import ordersReducer from './slices/ordersSlice';
import portfolioReducer from './slices/portfolioSlice';
import transactionsReducer from './slices/transactionsSlice';
import watchlistReducer from './slices/watchlistSlice';

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
        // Ignore these field paths in all actions
        ignoredActionPaths: ['payload.timestamp', 'meta.arg', 'meta.baseQueryMeta'],
        // Ignore these paths in the state (Date objects)
        ignoredPaths: [
          'market.stocks',
          'portfolio.portfolio.positions',
          'portfolio.positions',
          'orders.orders',
          'watchlist.watchlists',
          'transactions.transactions',
        ],
      },
    }),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
