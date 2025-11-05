// ============================================
// ORDERS SLICE - Trading Orders State
// ============================================

import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Order, OrderFilter } from '../../types';

interface OrdersState {
  orders: Order[];
  filter: OrderFilter;
  isLoading: boolean;
}

const initialState: OrdersState = {
  orders: [
    {
      id: 'ORD001',
      stockId: 'STK001',
      stockSymbol: 'AAPL',
      stockName: 'Apple Inc.',
      type: 'BUY',
      orderType: 'MARKET',
      quantity: 50,
      price: 175.00,
      totalAmount: 8750.00,
      status: 'COMPLETED',
      createdAt: new Date('2025-10-15T10:30:00'),
      executedAt: new Date('2025-10-15T10:30:05'),
    },
    {
      id: 'ORD002',
      stockId: 'STK004',
      stockSymbol: 'TSLA',
      stockName: 'Tesla Inc.',
      type: 'BUY',
      orderType: 'LIMIT',
      quantity: 30,
      price: 220.00,
      totalAmount: 6600.00,
      status: 'COMPLETED',
      createdAt: new Date('2025-10-20T14:20:00'),
      executedAt: new Date('2025-10-20T15:45:00'),
    },
    {
      id: 'ORD003',
      stockId: 'STK019',
      stockSymbol: 'NVDA',
      stockName: 'NVIDIA Corporation',
      type: 'BUY',
      orderType: 'MARKET',
      quantity: 20,
      price: 465.00,
      totalAmount: 9300.00,
      status: 'COMPLETED',
      createdAt: new Date('2025-10-25T09:15:00'),
      executedAt: new Date('2025-10-25T09:15:02'),
    },
    {
      id: 'ORD004',
      stockId: 'STK002',
      stockSymbol: 'MSFT',
      stockName: 'Microsoft Corporation',
      type: 'BUY',
      orderType: 'LIMIT',
      quantity: 25,
      price: 370.00,
      totalAmount: 9250.00,
      status: 'PENDING',
      createdAt: new Date('2025-11-04T11:30:00'),
    },
    {
      id: 'ORD005',
      stockId: 'STK003',
      stockSymbol: 'GOOGL',
      stockName: 'Alphabet Inc.',
      type: 'SELL',
      orderType: 'LIMIT',
      quantity: 10,
      price: 150.00,
      totalAmount: 1500.00,
      status: 'PENDING',
      createdAt: new Date('2025-11-05T08:45:00'),
    },
  ],
  filter: 'ALL',
  isLoading: false,
};

const ordersSlice = createSlice({
  name: 'orders',
  initialState,
  reducers: {
    addOrder: (state, action: PayloadAction<Omit<Order, 'id' | 'createdAt'>>) => {
      const newOrder: Order = {
        ...action.payload,
        id: `ORD${String(state.orders.length + 1).padStart(3, '0')}`,
        createdAt: new Date(),
        status: action.payload.orderType === 'MARKET' ? 'PROCESSING' : 'PENDING',
      };
      state.orders.unshift(newOrder);
    },
    updateOrder: (state, action: PayloadAction<{ id: string; updates: Partial<Order> }>) => {
      const index = state.orders.findIndex(o => o.id === action.payload.id);
      if (index !== -1) {
        state.orders[index] = {
          ...state.orders[index],
          ...action.payload.updates,
        };
      }
    },
    cancelOrder: (state, action: PayloadAction<string>) => {
      const index = state.orders.findIndex(o => o.id === action.payload);
      if (index !== -1) {
        state.orders[index].status = 'CANCELLED';
      }
    },
    executeOrder: (state, action: PayloadAction<string>) => {
      const index = state.orders.findIndex(o => o.id === action.payload);
      if (index !== -1) {
        state.orders[index].status = 'COMPLETED';
        state.orders[index].executedAt = new Date();
      }
    },
    setOrderFilter: (state, action: PayloadAction<OrderFilter>) => {
      state.filter = action.payload;
    },
    deleteOrder: (state, action: PayloadAction<string>) => {
      state.orders = state.orders.filter(o => o.id !== action.payload);
    },
  },
});

export const {
  addOrder,
  updateOrder,
  cancelOrder,
  executeOrder,
  setOrderFilter,
  deleteOrder,
} = ordersSlice.actions;

export default ordersSlice.reducer;
