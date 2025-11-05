// ============================================
// XPERT TRADING - TYPE DEFINITIONS
// Professional TypeScript types for the app
// ============================================

export interface Stock {
  id: string;
  symbol: string;
  name: string;
  price: number;
  change: number;
  changePercent: number;
  volume: number;
  value: number;
  high: number;
  low: number;
  open: number;
  close: number;
  marketCap: number;
  sector: string;
  lastUpdate: Date;
}

export interface Watchlist {
  id: string;
  name: string;
  stocks: string[]; // Stock IDs
  createdAt: Date;
  updatedAt: Date;
}

export interface Order {
  id: string;
  stockId: string;
  stockSymbol: string;
  stockName: string;
  type: 'BUY' | 'SELL';
  orderType: 'MARKET' | 'LIMIT';
  quantity: number;
  price: number;
  totalAmount: number;
  status: 'PENDING' | 'PROCESSING' | 'COMPLETED' | 'CANCELLED';
  createdAt: Date;
  executedAt?: Date;
}

export interface Position {
  id: string;
  stockId: string;
  stockSymbol: string;
  stockName: string;
  quantity: number;
  avgBuyPrice: number;
  currentPrice: number;
  investedAmount: number;
  currentValue: number;
  profitLoss: number;
  profitLossPercent: number;
  purchaseDate: Date;
}

export interface Portfolio {
  totalInvestment: number;
  currentValue: number;
  totalProfitLoss: number;
  totalProfitLossPercent: number;
  availableBalance: number;
  positions: Position[];
}

export interface MarketDepth {
  stockId: string;
  bids: { price: number; quantity: number }[];
  asks: { price: number; quantity: number }[];
}

export interface Transaction {
  id: string;
  type: 'DEPOSIT' | 'WITHDRAWAL' | 'BUY' | 'SELL';
  amount: number;
  status: 'SUBMITTED' | 'PROCESSING' | 'APPROVED' | 'CANCELLED';
  transactionId?: string;
  note?: string;
  createdAt: Date;
  processedAt?: Date;
}

export interface IPOApplication {
  id: string;
  companyName: string;
  ipoDate: Date;
  priceRange: { min: number; max: number };
  appliedQuantity: number;
  status: 'SUBMITTED' | 'PROCESSING' | 'APPROVED' | 'CANCELLED';
  createdAt: Date;
}

export interface User {
  id: string;
  name: string;
  email: string;
  accountNumber: string;
  balance: number;
  isAuthenticated: boolean;
}

export interface ChartData {
  date: Date;
  open: number;
  high: number;
  low: number;
  close: number;
  volume: number;
}

export type MarketCategory = 'GAINER' | 'LOSER' | 'UNCHANGED' | 'MOST_TRADED' | 'MOST_VALUE';
export type OrderFilter = 'ALL' | 'ACTIVE' | 'COMPLETED' | 'CANCELLED';
export type TransactionFilter = 'ALL' | 'DEPOSIT' | 'WITHDRAWAL';
