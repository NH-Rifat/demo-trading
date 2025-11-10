import type { Stock } from '@/src/types';

export const useOrderValidation = (
  selectedStock: Stock | null,
  tradeType: 'BUY' | 'SELL',
  orderType: 'MARKET' | 'LIMIT',
  quantity: string,
  limitPrice: string,
  orderTotal: number,
  availableBalance: number,
  holdingQuantity: number
) => {
  const validateOrder = (): string | null => {
    if (!selectedStock) return 'Please select a stock';

    const qty = parseInt(quantity);
    if (!qty || qty <= 0) return 'Please enter a valid quantity';

    if (orderType === 'LIMIT') {
      const price = parseFloat(limitPrice);
      if (!price || price <= 0) return 'Please enter a valid limit price';
    }

    if (tradeType === 'BUY') {
      if (orderTotal > availableBalance) {
        return 'Insufficient balance';
      }
    } else {
      if (qty > holdingQuantity) {
        return 'Insufficient holdings';
      }
    }

    return null;
  };

  return { validateOrder };
};
