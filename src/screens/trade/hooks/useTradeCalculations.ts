import { useAppSelector } from '@/src/store/hooks';
import type { Stock } from '@/src/types';
import { useMemo } from 'react';

export const useTradeCalculations = (
  selectedStock: Stock | null,
  orderType: 'MARKET' | 'LIMIT',
  quantity: string,
  limitPrice: string
) => {
  const user = useAppSelector((state: any) => state.auth.user);
  const portfolio = useAppSelector((state: any) => state.portfolio.portfolio);

  return useMemo(() => {
    const getOrderPrice = () => {
      if (!selectedStock) return 0;
      return orderType === 'MARKET' ? selectedStock.price : parseFloat(limitPrice) || 0;
    };

    const getOrderTotal = () => {
      const price = getOrderPrice();
      const qty = parseInt(quantity) || 0;
      return price * qty;
    };

    const getAvailableBalance = () => {
      return user?.balance || 0;
    };

    const getHoldingQuantity = () => {
      if (!selectedStock) return 0;
      const position = portfolio.positions.find((p: any) => p.stockId === selectedStock.id);
      return position?.quantity || 0;
    };

    return {
      orderPrice: getOrderPrice(),
      orderTotal: getOrderTotal(),
      availableBalance: getAvailableBalance(),
      holdingQuantity: getHoldingQuantity(),
    };
  }, [selectedStock, orderType, quantity, limitPrice, user, portfolio]);
};
