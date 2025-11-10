// ============================================
// MOCK DATA - Home Screen
// All static and initial data for the market dashboard
// ============================================

export interface SectorData {
  name: string;
  value: number;
  color: string;
  maxValue: number;
}

export interface FeaturedStock {
  symbol: string;
  price: number;
  change?: number;
  changePercent?: number;
  value?: number;
  hasChart: boolean;
}

export interface AdvanceDeclineDistribution {
  range: string;
  neg: number;
  nc: number;
  pos: number;
}

export interface MarketData {
  cashLimit: number;
  cscx: { value: number; change: number };
  dsex: { value: number; change: number };
  indices: {
    dsex: { value: number; change: number; changePercent: number };
    ds30: { value: number; change: number; changePercent: number };
    dses: { value: number; change: number; changePercent: number };
  };
  turnover: { value: number; percent: number };
  volume: { value: number };
  trade: { value: number; percent: number };
  advanceDecline: {
    neg: number;
    nc: number;
    pos: number;
    distribution: AdvanceDeclineDistribution[];
  };
}

// Initial Market Data
export const initialMarketData: MarketData = {
  cashLimit: 2.05,
  cscx: { value: -12.62, change: -0.69 },
  dsex: { value: -33.92, change: -0.69 },
  indices: {
    dsex: { value: 4866.0, change: -33.92, changePercent: -0.69 },
    ds30: { value: 1919.48, change: -9.31, changePercent: -0.48 },
    dses: { value: 1013.62, change: -8.99, changePercent: -0.88 },
  },
  turnover: { value: 146.16, percent: 40.17 },
  volume: { value: 5.49 },
  trade: { value: 55670, percent: 59.83 },
  advanceDecline: {
    neg: 280,
    nc: 56,
    pos: 45,
    distribution: [
      { range: '<-10%', neg: 20, nc: 0, pos: 6 },
      { range: '-10--7', neg: 35, nc: 0, pos: 0 },
      { range: '-7--5', neg: 87, nc: 0, pos: 0 },
      { range: '-5--2', neg: 138, nc: 0, pos: 0 },
      { range: '-2-0', neg: 56, nc: 0, pos: 0 },
      { range: '0-2%', neg: 32, nc: 56, pos: 12 },
      { range: '2-5%', neg: 11, nc: 0, pos: 32 },
      { range: '5-7%', neg: 4, nc: 0, pos: 25 },
      { range: '7-10%', neg: 35, nc: 0, pos: 10 },
    ],
  },
};

// Initial Sectors Data
export const initialSectorsData: SectorData[] = [
  { name: 'Engineering', value: 24.75, color: '#ef4444', maxValue: 25 },
  { name: 'PharmaChem', value: 23.23, color: '#10b981', maxValue: 25 },
  { name: 'FuelPower', value: 14.74, color: '#f59e0b', maxValue: 25 },
  { name: 'Bank', value: 13.4, color: '#84cc16', maxValue: 25 },
  { name: 'Textile', value: 11.58, color: '#3b82f6', maxValue: 25 },
  { name: 'Insurance', value: 11.27, color: '#b96991ff', maxValue: 25 },
  { name: 'PaperPrint', value: 9.24, color: '#14b8a6', maxValue: 25 },
  { name: 'Misc', value: 7.12, color: '#f97316', maxValue: 25 },
  { name: 'ServRealEst', value: 6.72, color: '#8b5cf6', maxValue: 25 },
  { name: 'FoodAllied', value: 6.02, color: '#ef4444', maxValue: 25 },
  { name: 'Financial In', value: 3.33, color: '#3b82f6', maxValue: 25 },
  { name: 'IT', value: 3.31, color: '#ec4899', maxValue: 25 },
  { name: 'Telecom', value: 2.74, color: '#c084fc', maxValue: 25 },
  { name: 'Jute', value: 2.3, color: '#14b8a6', maxValue: 25 },
  { name: 'TravelLeisur', value: 2.21, color: '#ef4444', maxValue: 25 },
  { name: 'MutFund', value: 2.2, color: '#f59e0b', maxValue: 25 },
  { name: 'Ceramic', value: 72.74, color: '#10b981', maxValue: 150 },
  { name: 'Tannery', value: 54.08, color: '#ef4444', maxValue: 150 },
  { name: 'Cement', value: 46.54, color: '#14b8a6', maxValue: 150 },
  { name: 'CorpBond', value: 8.81, color: '#6b7280', maxValue: 150 },
];

// Featured Lists Data
export const featuredListsData = {
  gainer: [
    { symbol: 'POWERGRID', price: 31.9, change: 3.7, changePercent: 13.1, hasChart: true },
    { symbol: 'UTTARAFIN', price: 11.1, change: 0.7, changePercent: 6.7, hasChart: true },
    { symbol: 'ORIONINFU', price: 393.4, change: 18.5, changePercent: 4.9, hasChart: true },
    { symbol: 'PRIMETEX', price: 12.7, change: 0.5, changePercent: 4.1, hasChart: true },
    { symbol: '1JANATAMF', price: 2.7, change: 0.1, changePercent: 3.9, hasChart: true },
  ],
  loser: [
    { symbol: 'BEACHHATCH', price: 28.5, change: -4.2, changePercent: -12.8, hasChart: true },
    { symbol: 'CENTRALINS', price: 45.3, change: -3.8, changePercent: -7.7, hasChart: true },
    { symbol: 'PARAMOUNT', price: 8.6, change: -0.6, changePercent: -6.5, hasChart: true },
    { symbol: 'LEGACYFOOT', price: 15.2, change: -0.8, changePercent: -5.0, hasChart: true },
    { symbol: 'PHOENIX', price: 102.7, change: -4.5, changePercent: -4.2, hasChart: true },
  ],
  trade: [
    { symbol: 'BATBC', price: 567.8, value: 45670, hasChart: true },
    { symbol: 'SQURPHARMA', price: 234.5, value: 38920, hasChart: true },
    { symbol: 'BEXIMCO', price: 89.4, value: 32150, hasChart: true },
    { symbol: 'CITYBANK', price: 23.6, value: 28730, hasChart: true },
    { symbol: 'GPH', price: 45.8, value: 25480, hasChart: true },
  ],
  value: [
    { symbol: 'GRAMEENPHONE', price: 289.5, value: 156.8, hasChart: true },
    { symbol: 'ROBI', price: 45.7, value: 98.3, hasChart: true },
    { symbol: 'BRACBANK', price: 42.3, value: 76.5, hasChart: true },
    { symbol: 'BRAC', price: 56.9, value: 65.2, hasChart: true },
    { symbol: 'ISLAMIBANK', price: 38.4, value: 54.9, hasChart: true },
  ],
  volume: [
    { symbol: 'BEXIMCO', price: 89.4, value: 8.52, hasChart: true },
    { symbol: 'PENINSULA', price: 12.3, value: 6.78, hasChart: true },
    { symbol: 'ACTIVEFINE', price: 7.8, value: 5.34, hasChart: true },
    { symbol: 'FORTUNE', price: 5.4, value: 4.91, hasChart: true },
    { symbol: 'GENERATION', price: 34.6, value: 4.23, hasChart: true },
  ],
};
