import { useAppSelector } from '@/src/store/hooks';
import type { Stock, Watchlist } from '@/src/types';
import { useMemo } from 'react';

export const useWatchlistStocks = (activeWatchlist: Watchlist | undefined) => {
  const stocks = useAppSelector((state: any) => state.market.stocks);

  return useMemo(() => {
    if (!activeWatchlist) return [];

    return activeWatchlist.stocks
      .map((stockId: string) => stocks.find((s: Stock) => s.id === stockId))
      .filter((s: any): s is Stock => s !== undefined);
  }, [activeWatchlist, stocks]);
};
