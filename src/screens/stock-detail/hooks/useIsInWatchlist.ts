import { useAppSelector } from '@/src/store/hooks';
import type { Stock } from '@/src/types';
import { useMemo } from 'react';

export const useIsInWatchlist = (symbol: string | undefined) => {
  const watchlistItems = useAppSelector((state: any) => state.watchlist.watchlists);
  const stocks = useAppSelector((state: any) => state.market.stocks);

  return useMemo(() => {
    if (!symbol) return false;

    return watchlistItems.some((item: any) =>
      item.stocks.some((stockId: string) => {
        const s = stocks.find((st: Stock) => st.id === stockId);
        return s?.symbol === symbol;
      })
    );
  }, [watchlistItems, stocks, symbol]);
};
