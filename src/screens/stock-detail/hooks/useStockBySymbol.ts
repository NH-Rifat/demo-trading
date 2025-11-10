import { useAppSelector } from '@/src/store/hooks';
import type { Stock } from '@/src/types';
import { useMemo } from 'react';

export const useStockBySymbol = (symbol: string | undefined) => {
  const stocks = useAppSelector((state: any) => state.market.stocks);

  return useMemo(() => {
    if (!symbol) return null;
    return stocks.find((s: Stock) => s.symbol === symbol) || null;
  }, [stocks, symbol]);
};
