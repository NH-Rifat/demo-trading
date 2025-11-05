// ============================================
// PORTFOLIO SLICE - User Portfolio State
// ============================================

import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Portfolio, Position } from '../../types';

interface PortfolioState {
  portfolio: Portfolio;
  isLoading: boolean;
}

const initialState: PortfolioState = {
  portfolio: {
    totalInvestment: 25000.00,
    currentValue: 27850.50,
    totalProfitLoss: 2850.50,
    totalProfitLossPercent: 11.40,
    availableBalance: 25000.00,
    positions: [
      {
        id: 'POS001',
        stockId: 'STK001',
        stockSymbol: 'AAPL',
        stockName: 'Apple Inc.',
        quantity: 50,
        avgBuyPrice: 175.00,
        currentPrice: 182.45,
        investedAmount: 8750.00,
        currentValue: 9122.50,
        profitLoss: 372.50,
        profitLossPercent: 4.26,
        purchaseDate: new Date('2025-10-15'),
      },
      {
        id: 'POS002',
        stockId: 'STK004',
        stockSymbol: 'TSLA',
        stockName: 'Tesla Inc.',
        quantity: 30,
        avgBuyPrice: 220.00,
        currentPrice: 242.80,
        investedAmount: 6600.00,
        currentValue: 7284.00,
        profitLoss: 684.00,
        profitLossPercent: 10.36,
        purchaseDate: new Date('2025-10-20'),
      },
      {
        id: 'POS003',
        stockId: 'STK019',
        stockSymbol: 'NVDA',
        stockName: 'NVIDIA Corporation',
        quantity: 20,
        avgBuyPrice: 465.00,
        currentPrice: 495.50,
        investedAmount: 9300.00,
        currentValue: 9910.00,
        profitLoss: 610.00,
        profitLossPercent: 6.56,
        purchaseDate: new Date('2025-10-25'),
      },
      {
        id: 'POS004',
        stockId: 'STK003',
        stockSymbol: 'GOOGL',
        stockName: 'Alphabet Inc.',
        quantity: 20,
        avgBuyPrice: 148.00,
        currentPrice: 142.65,
        investedAmount: 2960.00,
        currentValue: 2853.00,
        profitLoss: -107.00,
        profitLossPercent: -3.61,
        purchaseDate: new Date('2025-11-01'),
      },
    ],
  },
  isLoading: false,
};

const portfolioSlice = createSlice({
  name: 'portfolio',
  initialState,
  reducers: {
    updatePortfolio: (state, action: PayloadAction<Partial<Portfolio>>) => {
      state.portfolio = { ...state.portfolio, ...action.payload };
    },
    addPosition: (state, action: PayloadAction<Position>) => {
      state.portfolio.positions.push(action.payload);
      // Recalculate totals
      const totalInvestment = state.portfolio.positions.reduce(
        (sum, pos) => sum + pos.investedAmount,
        0
      );
      const currentValue = state.portfolio.positions.reduce(
        (sum, pos) => sum + pos.currentValue,
        0
      );
      state.portfolio.totalInvestment = totalInvestment;
      state.portfolio.currentValue = currentValue;
      state.portfolio.totalProfitLoss = currentValue - totalInvestment;
      state.portfolio.totalProfitLossPercent =
        ((currentValue - totalInvestment) / totalInvestment) * 100;
    },
    updatePosition: (state, action: PayloadAction<{ id: string; updates: Partial<Position> }>) => {
      const index = state.portfolio.positions.findIndex(p => p.id === action.payload.id);
      if (index !== -1) {
        state.portfolio.positions[index] = {
          ...state.portfolio.positions[index],
          ...action.payload.updates,
        };
      }
    },
    updatePositionPrices: (state, action: PayloadAction<{ stockId: string; price: number }>) => {
      state.portfolio.positions = state.portfolio.positions.map(position => {
        if (position.stockId === action.payload.stockId) {
          const currentValue = position.quantity * action.payload.price;
          const profitLoss = currentValue - position.investedAmount;
          const profitLossPercent = (profitLoss / position.investedAmount) * 100;

          return {
            ...position,
            currentPrice: action.payload.price,
            currentValue: parseFloat(currentValue.toFixed(2)),
            profitLoss: parseFloat(profitLoss.toFixed(2)),
            profitLossPercent: parseFloat(profitLossPercent.toFixed(2)),
          };
        }
        return position;
      });

      // Recalculate portfolio totals
      const currentValue = state.portfolio.positions.reduce(
        (sum, pos) => sum + pos.currentValue,
        0
      );
      state.portfolio.currentValue = parseFloat(currentValue.toFixed(2));
      state.portfolio.totalProfitLoss = parseFloat(
        (currentValue - state.portfolio.totalInvestment).toFixed(2)
      );
      state.portfolio.totalProfitLossPercent = parseFloat(
        (((currentValue - state.portfolio.totalInvestment) / state.portfolio.totalInvestment) * 100).toFixed(2)
      );
    },
    removePosition: (state, action: PayloadAction<string>) => {
      state.portfolio.positions = state.portfolio.positions.filter(p => p.id !== action.payload);
    },
  },
});

export const {
  updatePortfolio,
  addPosition,
  updatePosition,
  updatePositionPrices,
  removePosition,
} = portfolioSlice.actions;

export default portfolioSlice.reducer;
