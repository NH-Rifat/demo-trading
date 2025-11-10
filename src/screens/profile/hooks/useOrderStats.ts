import { useAppSelector } from '@/src/store/hooks';
import { useMemo } from 'react';

export const useOrderStats = () => {
  const orders = useAppSelector((state: any) => state.orders.orders);

  return useMemo(() => {
    const activeOrders = orders.filter(
      (o: any) => o.status === 'PENDING' || o.status === 'PROCESSING'
    ).length;
    const completedOrders = orders.filter((o: any) => o.status === 'COMPLETED').length;

    return { activeOrders, completedOrders };
  }, [orders]);
};
