// ============================================
// WATCHLIST SLICE - User Watchlists State
// ============================================

import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Watchlist } from '../../types';

interface WatchlistState {
  watchlists: Watchlist[];
  activeWatchlistId: string | null;
  isLoading: boolean;
}

const initialState: WatchlistState = {
  watchlists: [
    {
      id: 'WL001',
      name: 'My Favorites',
      stocks: ['STK001', 'STK002', 'STK004', 'STK019'],
      createdAt: new Date('2025-10-01'),
      updatedAt: new Date('2025-11-01'),
    },
    {
      id: 'WL002',
      name: 'Tech Stocks',
      stocks: ['STK001', 'STK002', 'STK003', 'STK005', 'STK019', 'STK020'],
      createdAt: new Date('2025-10-10'),
      updatedAt: new Date('2025-10-25'),
    },
    {
      id: 'WL003',
      name: 'Finance',
      stocks: ['STK006', 'STK007', 'STK008'],
      createdAt: new Date('2025-10-15'),
      updatedAt: new Date('2025-10-20'),
    },
  ],
  activeWatchlistId: 'WL001',
  isLoading: false,
};

const watchlistSlice = createSlice({
  name: 'watchlist',
  initialState,
  reducers: {
    createWatchlist: (state, action: PayloadAction<{ name: string }>) => {
      const newWatchlist: Watchlist = {
        id: `WL${String(state.watchlists.length + 1).padStart(3, '0')}`,
        name: action.payload.name,
        stocks: [],
        createdAt: new Date(),
        updatedAt: new Date(),
      };
      state.watchlists.push(newWatchlist);
    },
    deleteWatchlist: (state, action: PayloadAction<string>) => {
      state.watchlists = state.watchlists.filter(w => w.id !== action.payload);
      if (state.activeWatchlistId === action.payload) {
        state.activeWatchlistId = state.watchlists[0]?.id || null;
      }
    },
    updateWatchlist: (state, action: PayloadAction<{ id: string; name: string }>) => {
      const index = state.watchlists.findIndex(w => w.id === action.payload.id);
      if (index !== -1) {
        state.watchlists[index].name = action.payload.name;
        state.watchlists[index].updatedAt = new Date();
      }
    },
    addStockToWatchlist: (state, action: PayloadAction<{ watchlistId: string; stockId: string }>) => {
      const watchlist = state.watchlists.find(w => w.id === action.payload.watchlistId);
      if (watchlist && !watchlist.stocks.includes(action.payload.stockId)) {
        watchlist.stocks.push(action.payload.stockId);
        watchlist.updatedAt = new Date();
      }
    },
    removeStockFromWatchlist: (state, action: PayloadAction<{ watchlistId: string; stockId: string }>) => {
      const watchlist = state.watchlists.find(w => w.id === action.payload.watchlistId);
      if (watchlist) {
        watchlist.stocks = watchlist.stocks.filter(id => id !== action.payload.stockId);
        watchlist.updatedAt = new Date();
      }
    },
    setActiveWatchlist: (state, action: PayloadAction<string>) => {
      state.activeWatchlistId = action.payload;
    },
  },
});

export const {
  createWatchlist,
  deleteWatchlist,
  updateWatchlist,
  addStockToWatchlist,
  removeStockFromWatchlist,
  setActiveWatchlist,
} = watchlistSlice.actions;

export default watchlistSlice.reducer;
