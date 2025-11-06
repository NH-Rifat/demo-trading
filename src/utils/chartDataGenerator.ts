// ============================================
// CHART DATA GENERATOR - Generate realistic trading chart data
// Features: Candlestick, volume, performance data generation
// ============================================

export interface CandleData {
  timestamp: number;
  open: number;
  high: number;
  low: number;
  close: number;
  volume: number;
}

export interface VolumeData {
  timestamp: number;
  volume: number;
  change: number;
}

export interface PerformanceData {
  date: number;
  value: number;
}

// Generate realistic candlestick data based on current price
export function generateCandleData(
  basePrice: number,
  days: number = 30
): CandleData[] {
  const data: CandleData[] = [];
  let currentPrice = basePrice;
  const now = Date.now();

  for (let i = days - 1; i >= 0; i--) {
    const timestamp = now - i * 24 * 60 * 60 * 1000;

    // Random price movement (-3% to +3%)
    const priceChange = currentPrice * (Math.random() * 0.06 - 0.03);
    const open = currentPrice;
    const close = currentPrice + priceChange;

    // Calculate high and low
    const volatility = Math.abs(priceChange) * (1 + Math.random());
    const high = Math.max(open, close) + volatility;
    const low = Math.min(open, close) - volatility;

    // Random volume (1M to 10M)
    const volume = Math.floor(1000000 + Math.random() * 9000000);

    data.push({
      timestamp,
      open: parseFloat(open.toFixed(2)),
      high: parseFloat(high.toFixed(2)),
      low: parseFloat(low.toFixed(2)),
      close: parseFloat(close.toFixed(2)),
      volume,
    });

    currentPrice = close;
  }

  return data;
}

// Generate volume data with price change correlation
export function generateVolumeData(
  candleData: CandleData[]
): VolumeData[] {
  return candleData.map((candle) => ({
    timestamp: candle.timestamp,
    volume: candle.volume,
    change: candle.close - candle.open,
  }));
}

// Generate performance data (portfolio value over time)
export function generatePerformanceData(
  startValue: number,
  days: number = 30
): PerformanceData[] {
  const data: PerformanceData[] = [];
  let currentValue = startValue;
  const now = Date.now();

  for (let i = days - 1; i >= 0; i--) {
    const date = now - i * 24 * 60 * 60 * 1000;

    // Gradual growth with some volatility (-2% to +3% daily)
    const change = currentValue * (Math.random() * 0.05 - 0.02);
    currentValue = Math.max(startValue * 0.7, currentValue + change);

    data.push({
      date,
      value: parseFloat(currentValue.toFixed(2)),
    });
  }

  return data;
}

// Generate intraday data (1-minute intervals for last 6 hours)
export function generateIntradayData(
  basePrice: number,
  hours: number = 6
): CandleData[] {
  const data: CandleData[] = [];
  let currentPrice = basePrice;
  const now = Date.now();
  const intervals = hours * 60; // minutes

  for (let i = intervals - 1; i >= 0; i--) {
    const timestamp = now - i * 60 * 1000;

    // Smaller price movements for intraday (-0.5% to +0.5%)
    const priceChange = currentPrice * (Math.random() * 0.01 - 0.005);
    const open = currentPrice;
    const close = currentPrice + priceChange;

    const volatility = Math.abs(priceChange) * (1 + Math.random() * 0.5);
    const high = Math.max(open, close) + volatility;
    const low = Math.min(open, close) - volatility;

    // Lower volume for intraday (100K to 1M)
    const volume = Math.floor(100000 + Math.random() * 900000);

    data.push({
      timestamp,
      open: parseFloat(open.toFixed(2)),
      high: parseFloat(high.toFixed(2)),
      low: parseFloat(low.toFixed(2)),
      close: parseFloat(close.toFixed(2)),
      volume,
    });

    currentPrice = close;
  }

  return data;
}

// Get chart data based on time range
export function getChartDataForRange(
  basePrice: number,
  range: '1D' | '1W' | '1M' | '3M' | '1Y' | 'ALL'
): CandleData[] {
  switch (range) {
    case '1D':
      return generateIntradayData(basePrice, 6);
    case '1W':
      return generateCandleData(basePrice, 7);
    case '1M':
      return generateCandleData(basePrice, 30);
    case '3M':
      return generateCandleData(basePrice, 90);
    case '1Y':
      return generateCandleData(basePrice, 365);
    case 'ALL':
      return generateCandleData(basePrice, 730); // 2 years
    default:
      return generateCandleData(basePrice, 30);
  }
}
