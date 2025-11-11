import { useTheme } from '@/src/contexts/ThemeContext';
import { useAppDispatch, useAppSelector } from '@/src/store/hooks';
import { addOrder } from '@/src/store/slices/ordersSlice';
import type { Stock } from '@/src/types';
import { formatCurrency } from '@/src/utils/helpers';
import React, { useState } from 'react';
import { Alert, KeyboardAvoidingView, Platform, ScrollView, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Header } from './components/Header';
import { LimitPriceInput } from './components/LimitPriceInput';
import { OrderSummary } from './components/OrderSummary';
import { OrderTypeTabs } from './components/OrderTypeTabs';
import { PlaceOrderButton } from './components/PlaceOrderButton';
import { QuantityControl } from './components/QuantityControl';
import { StockPickerModal } from './components/StockPickerModal';
import { StockSelector } from './components/StockSelector';
import { TradeTypeTabs } from './components/TradeTypeTabs';
import { useOrderValidation } from './hooks/useOrderValidation';
import { useTradeCalculations } from './hooks/useTradeCalculations';
import { createTradeStyles } from './styles/tradeStyles';

type TradeType = 'BUY' | 'SELL';
type OrderType = 'MARKET' | 'LIMIT';

export default function TradeScreen() {
  const { colors } = useTheme();
  const styles = createTradeStyles(colors);
  const dispatch = useAppDispatch();
  const insets = useSafeAreaInsets();
  const stocks = useAppSelector((state: any) => state.market.stocks);

  const [tradeType, setTradeType] = useState<TradeType>('BUY');
  const [selectedStock, setSelectedStock] = useState<Stock | null>(null);
  const [orderType, setOrderType] = useState<OrderType>('MARKET');
  const [quantity, setQuantity] = useState<string>('1');
  const [limitPrice, setLimitPrice] = useState<string>('');
  const [searchQuery, setSearchQuery] = useState('');
  const [isStockPickerVisible, setIsStockPickerVisible] = useState(false);

  // Custom hooks
  const { orderPrice, orderTotal, availableBalance, holdingQuantity } = useTradeCalculations(
    selectedStock,
    orderType,
    quantity,
    limitPrice
  );

  const { validateOrder } = useOrderValidation(
    selectedStock,
    tradeType,
    orderType,
    quantity,
    limitPrice,
    orderTotal,
    availableBalance,
    holdingQuantity
  );

  // Handlers
  const handleSelectStock = (stock: Stock) => {
    setSelectedStock(stock);
    setIsStockPickerVisible(false);
    setSearchQuery('');
    // Set limit price to current price
    if (orderType === 'LIMIT') {
      setLimitPrice(stock.price.toString());
    }
  };

  const handleChangeOrderType = (type: OrderType) => {
    setOrderType(type);
    if (type === 'LIMIT' && selectedStock && !limitPrice) {
      setLimitPrice(selectedStock.price.toString());
    }
  };

  const handlePlaceOrder = () => {
    const error = validateOrder();
    if (error) {
      Alert.alert('Invalid Order', error);
      return;
    }

    Alert.alert(
      'Confirm Order',
      `${tradeType} ${quantity} shares of ${selectedStock?.symbol} at ${
        orderType === 'MARKET' ? 'Market Price' : formatCurrency(orderPrice)
      }\n\nTotal: ${formatCurrency(orderTotal)}`,
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Confirm',
          onPress: () => {
            if (selectedStock) {
              dispatch(
                addOrder({
                  stockId: selectedStock.id,
                  stockSymbol: selectedStock.symbol,
                  stockName: selectedStock.name,
                  type: tradeType,
                  orderType: orderType,
                  quantity: parseInt(quantity),
                  price: orderPrice,
                  totalAmount: orderTotal,
                  status: orderType === 'MARKET' ? 'PROCESSING' : 'PENDING',
                })
              );

              // Reset form
              setQuantity('1');
              setLimitPrice('');

              Alert.alert(
                'Order Placed',
                `Your ${tradeType} order for ${selectedStock.symbol} has been placed successfully!`,
                [{ text: 'OK' }]
              );
            }
          },
        },
      ]
    );
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <ScrollView showsVerticalScrollIndicator={false}>
        <Header insets={insets} />
        <TradeTypeTabs tradeType={tradeType} onChangeTradeType={setTradeType} />
        <StockSelector
          selectedStock={selectedStock}
          tradeType={tradeType}
          holdingQuantity={holdingQuantity}
          onPress={() => setIsStockPickerVisible(true)}
        />
        <OrderTypeTabs orderType={orderType} onChangeOrderType={handleChangeOrderType} />
        <QuantityControl quantity={quantity} onChangeQuantity={setQuantity} />
        {orderType === 'LIMIT' && (
          <LimitPriceInput limitPrice={limitPrice} onChangeLimitPrice={setLimitPrice} />
        )}
        <OrderSummary
          tradeType={tradeType}
          orderType={orderType}
          selectedStock={selectedStock}
          quantity={quantity}
          orderPrice={orderPrice}
          orderTotal={orderTotal}
          availableBalance={availableBalance}
          holdingQuantity={holdingQuantity}
        />
        <PlaceOrderButton
          tradeType={tradeType}
          isDisabled={!selectedStock}
          onPress={handlePlaceOrder}
        />
        <View style={{ height: 40 }} />
      </ScrollView>

      <StockPickerModal
        visible={isStockPickerVisible}
        stocks={stocks}
        searchQuery={searchQuery}
        onChangeSearch={setSearchQuery}
        onSelectStock={handleSelectStock}
        onClose={() => setIsStockPickerVisible(false)}
      />
    </KeyboardAvoidingView>
  );
}
