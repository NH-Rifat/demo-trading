import type { Stock } from '@/src/types';
import { formatCurrency, formatLargeNumber } from '@/src/utils/helpers';
import { useMemo } from 'react';

export const useStockMetrics = (stock: Stock | null) => {
  return useMemo(() => {
    if (!stock) {
      return {
        dayRange: 'N/A',
        peRatio: 'N/A',
        marketCap: 'N/A',
        avgVolume: 'N/A',
      };
    }

    const dayRange = `${formatCurrency(stock.low)} - ${formatCurrency(stock.high)}`;
    const peRatio = (stock.price / (stock.price * 0.05)).toFixed(2); // Mock P/E
    const marketCap = formatLargeNumber(stock.marketCap);
    const avgVolume = formatLargeNumber(stock.volume * 1.2); // Mock avg volume

    return {
      dayRange,
      peRatio,
      marketCap,
      avgVolume,
    };
  }, [stock]);
};
