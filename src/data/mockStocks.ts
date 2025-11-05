// ============================================
// XPERT TRADING - MOCK STOCK DATA
// Realistic stock market data for demo
// ============================================

import { Stock } from '../types';

export const MOCK_STOCKS: Stock[] = [
  // Technology Sector
  {
    id: 'STK001',
    symbol: 'AAPL',
    name: 'Apple Inc.',
    price: 182.45,
    change: 2.35,
    changePercent: 1.31,
    volume: 52840000,
    value: 9651588000,
    high: 183.20,
    low: 179.90,
    open: 180.50,
    close: 182.45,
    marketCap: 2850000000000,
    sector: 'Technology',
    lastUpdate: new Date(),
  },
  {
    id: 'STK002',
    symbol: 'MSFT',
    name: 'Microsoft Corporation',
    price: 378.90,
    change: 5.60,
    changePercent: 1.50,
    volume: 23450000,
    value: 8886055000,
    high: 380.50,
    low: 375.30,
    open: 376.20,
    close: 378.90,
    marketCap: 2810000000000,
    sector: 'Technology',
    lastUpdate: new Date(),
  },
  {
    id: 'STK003',
    symbol: 'GOOGL',
    name: 'Alphabet Inc.',
    price: 142.65,
    change: -1.85,
    changePercent: -1.28,
    volume: 28900000,
    value: 4121585000,
    high: 145.20,
    low: 142.10,
    open: 144.50,
    close: 142.65,
    marketCap: 1780000000000,
    sector: 'Technology',
    lastUpdate: new Date(),
  },
  {
    id: 'STK004',
    symbol: 'TSLA',
    name: 'Tesla Inc.',
    price: 242.80,
    change: 8.45,
    changePercent: 3.61,
    volume: 125600000,
    value: 30503680000,
    high: 245.90,
    low: 237.20,
    open: 238.50,
    close: 242.80,
    marketCap: 771000000000,
    sector: 'Automotive',
    lastUpdate: new Date(),
  },
  {
    id: 'STK005',
    symbol: 'AMZN',
    name: 'Amazon.com Inc.',
    price: 178.35,
    change: 3.20,
    changePercent: 1.83,
    volume: 45200000,
    value: 8061420000,
    high: 179.80,
    low: 176.50,
    open: 177.10,
    close: 178.35,
    marketCap: 1850000000000,
    sector: 'E-commerce',
    lastUpdate: new Date(),
  },
  
  // Finance Sector
  {
    id: 'STK006',
    symbol: 'JPM',
    name: 'JPMorgan Chase & Co.',
    price: 155.80,
    change: -2.10,
    changePercent: -1.33,
    volume: 12340000,
    value: 1922572000,
    high: 158.50,
    low: 155.20,
    open: 157.90,
    close: 155.80,
    marketCap: 455000000000,
    sector: 'Finance',
    lastUpdate: new Date(),
  },
  {
    id: 'STK007',
    symbol: 'BAC',
    name: 'Bank of America Corp.',
    price: 34.25,
    change: 0.45,
    changePercent: 1.33,
    volume: 48900000,
    value: 1674825000,
    high: 34.60,
    low: 33.80,
    open: 33.90,
    close: 34.25,
    marketCap: 272000000000,
    sector: 'Finance',
    lastUpdate: new Date(),
  },
  {
    id: 'STK008',
    symbol: 'GS',
    name: 'Goldman Sachs Group Inc.',
    price: 386.50,
    change: 4.80,
    changePercent: 1.26,
    volume: 2150000,
    value: 830975000,
    high: 388.90,
    low: 383.20,
    open: 384.50,
    close: 386.50,
    marketCap: 132000000000,
    sector: 'Finance',
    lastUpdate: new Date(),
  },
  
  // Healthcare Sector
  {
    id: 'STK009',
    symbol: 'JNJ',
    name: 'Johnson & Johnson',
    price: 162.30,
    change: 1.20,
    changePercent: 0.74,
    volume: 8420000,
    value: 1366566000,
    high: 163.10,
    low: 161.50,
    open: 161.80,
    close: 162.30,
    marketCap: 396000000000,
    sector: 'Healthcare',
    lastUpdate: new Date(),
  },
  {
    id: 'STK010',
    symbol: 'PFE',
    name: 'Pfizer Inc.',
    price: 28.95,
    change: -0.35,
    changePercent: -1.19,
    volume: 35600000,
    value: 1030620000,
    high: 29.40,
    low: 28.85,
    open: 29.30,
    close: 28.95,
    marketCap: 163000000000,
    sector: 'Healthcare',
    lastUpdate: new Date(),
  },
  
  // Energy Sector
  {
    id: 'STK011',
    symbol: 'XOM',
    name: 'Exxon Mobil Corporation',
    price: 109.45,
    change: 2.30,
    changePercent: 2.15,
    volume: 18900000,
    value: 2068605000,
    high: 110.20,
    low: 107.80,
    open: 108.10,
    close: 109.45,
    marketCap: 448000000000,
    sector: 'Energy',
    lastUpdate: new Date(),
  },
  {
    id: 'STK012',
    symbol: 'CVX',
    name: 'Chevron Corporation',
    price: 158.20,
    change: 3.45,
    changePercent: 2.23,
    volume: 9870000,
    value: 1561434000,
    high: 159.50,
    low: 156.30,
    open: 156.80,
    close: 158.20,
    marketCap: 293000000000,
    sector: 'Energy',
    lastUpdate: new Date(),
  },
  
  // Consumer Goods
  {
    id: 'STK013',
    symbol: 'PG',
    name: 'Procter & Gamble Co.',
    price: 154.70,
    change: 0.90,
    changePercent: 0.59,
    volume: 6780000,
    value: 1048866000,
    high: 155.40,
    low: 153.80,
    open: 154.20,
    close: 154.70,
    marketCap: 367000000000,
    sector: 'Consumer Goods',
    lastUpdate: new Date(),
  },
  {
    id: 'STK014',
    symbol: 'KO',
    name: 'The Coca-Cola Company',
    price: 59.85,
    change: -0.25,
    changePercent: -0.42,
    volume: 15600000,
    value: 933660000,
    high: 60.30,
    low: 59.70,
    open: 60.10,
    close: 59.85,
    marketCap: 259000000000,
    sector: 'Consumer Goods',
    lastUpdate: new Date(),
  },
  
  // Retail
  {
    id: 'STK015',
    symbol: 'WMT',
    name: 'Walmart Inc.',
    price: 168.90,
    change: 1.75,
    changePercent: 1.05,
    volume: 8920000,
    value: 1506588000,
    high: 169.80,
    low: 167.50,
    open: 167.90,
    close: 168.90,
    marketCap: 457000000000,
    sector: 'Retail',
    lastUpdate: new Date(),
  },
  {
    id: 'STK016',
    symbol: 'HD',
    name: 'The Home Depot Inc.',
    price: 342.60,
    change: 4.20,
    changePercent: 1.24,
    volume: 3450000,
    value: 1181970000,
    high: 344.50,
    low: 339.80,
    open: 340.50,
    close: 342.60,
    marketCap: 345000000000,
    sector: 'Retail',
    lastUpdate: new Date(),
  },
  
  // Telecommunications
  {
    id: 'STK017',
    symbol: 'VZ',
    name: 'Verizon Communications Inc.',
    price: 41.25,
    change: -0.55,
    changePercent: -1.32,
    volume: 22800000,
    value: 940500000,
    high: 41.90,
    low: 41.10,
    open: 41.80,
    close: 41.25,
    marketCap: 173000000000,
    sector: 'Telecommunications',
    lastUpdate: new Date(),
  },
  
  // Entertainment
  {
    id: 'STK018',
    symbol: 'DIS',
    name: 'The Walt Disney Company',
    price: 95.40,
    change: 2.10,
    changePercent: 2.25,
    volume: 11200000,
    value: 1068480000,
    high: 96.20,
    low: 94.10,
    open: 94.50,
    close: 95.40,
    marketCap: 174000000000,
    sector: 'Entertainment',
    lastUpdate: new Date(),
  },
  
  // Semiconductor
  {
    id: 'STK019',
    symbol: 'NVDA',
    name: 'NVIDIA Corporation',
    price: 495.50,
    change: 12.80,
    changePercent: 2.65,
    volume: 45900000,
    value: 22741450000,
    high: 498.30,
    low: 487.60,
    open: 488.90,
    close: 495.50,
    marketCap: 1220000000000,
    sector: 'Semiconductor',
    lastUpdate: new Date(),
  },
  {
    id: 'STK020',
    symbol: 'INTC',
    name: 'Intel Corporation',
    price: 45.85,
    change: -0.95,
    changePercent: -2.03,
    volume: 38700000,
    value: 1774395000,
    high: 47.20,
    low: 45.60,
    open: 46.80,
    close: 45.85,
    marketCap: 189000000000,
    sector: 'Semiconductor',
    lastUpdate: new Date(),
  },
];

// Helper functions to categorize stocks
export const getGainers = (): Stock[] => {
  return MOCK_STOCKS.filter(stock => stock.changePercent > 0).sort((a, b) => b.changePercent - a.changePercent);
};

export const getLosers = (): Stock[] => {
  return MOCK_STOCKS.filter(stock => stock.changePercent < 0).sort((a, b) => a.changePercent - b.changePercent);
};

export const getUnchanged = (): Stock[] => {
  return MOCK_STOCKS.filter(stock => stock.changePercent === 0);
};

export const getMostTraded = (): Stock[] => {
  return [...MOCK_STOCKS].sort((a, b) => b.volume - a.volume);
};

export const getMostValue = (): Stock[] => {
  return [...MOCK_STOCKS].sort((a, b) => b.value - a.value);
};

export const getStockById = (id: string): Stock | undefined => {
  return MOCK_STOCKS.find(stock => stock.id === id);
};

export const getStockBySymbol = (symbol: string): Stock | undefined => {
  return MOCK_STOCKS.find(stock => stock.symbol === symbol);
};

export const searchStocks = (query: string): Stock[] => {
  const lowerQuery = query.toLowerCase();
  return MOCK_STOCKS.filter(
    stock =>
      stock.symbol.toLowerCase().includes(lowerQuery) ||
      stock.name.toLowerCase().includes(lowerQuery)
  );
};
