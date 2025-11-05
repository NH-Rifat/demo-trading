// ============================================
// MARKET SLICE - Stock Market Data State
// ============================================

import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { MOCK_STOCKS } from '../../data/mockStocks';
import { MarketCategory, Stock } from '../../types';

interface MarketState {
  stocks: Stock[];
  selectedStock: Stock | null;
  category: MarketCategory;
  searchQuery: string;
  isLoading: boolean;
}

const initialState: MarketState = {
  stocks: MOCK_STOCKS,
  selectedStock: null,
  category: 'GAINER',
  searchQuery: '',
  isLoading: false,
};

const marketSlice = createSlice({
  name: 'market',
  initialState,
  reducers: {
    setStocks: (state, action: PayloadAction<Stock[]>) => {
      state.stocks = action.payload;
    },
    setSelectedStock: (state, action: PayloadAction<Stock | null>) => {
      state.selectedStock = action.payload;
    },
    setCategory: (state, action: PayloadAction<MarketCategory>) => {
      state.category = action.payload;
    },
    setSearchQuery: (state, action: PayloadAction<string>) => {
      state.searchQuery = action.payload;
    },
    updatePrices: (state) => {
      // Simulate real-time price updates
      state.stocks = state.stocks.map(stock => {
        const randomChange = (Math.random() - 0.5) * 2; // -1 to +1
        const priceChange = stock.price * (randomChange / 100);
        const newPrice = Math.max(0.01, stock.price + priceChange);
        const change = newPrice - stock.close;
        const changePercent = (change / stock.close) * 100;

        return {
          ...stock,
          price: parseFloat(newPrice.toFixed(2)),
          change: parseFloat(change.toFixed(2)),
          changePercent: parseFloat(changePercent.toFixed(2)),
          lastUpdate: new Date(),
        };
      });
    },
    selectStockById: (state, action: PayloadAction<string>) => {
      const stock = state.stocks.find(s => s.id === action.payload);
      state.selectedStock = stock || null;
    },
  },
});

export const {
  setStocks,
  setSelectedStock,
  setCategory,
  setSearchQuery,
  updatePrices,
  selectStockById,
} = marketSlice.actions;

export default marketSlice.reducer;
