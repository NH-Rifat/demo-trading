import { GlobalHeader } from '@/src/components/GlobalHeader';
import { useTheme } from '@/src/contexts/ThemeContext';
import { useMarketDataUpdates } from '@/src/screens/home/hooks/useMarketData';
import { useAppDispatch, useAppSelector } from '@/src/store/hooks';
import { addOrder } from '@/src/store/slices/ordersSlice';
import type { Stock } from '@/src/types';
import { formatCurrency } from '@/src/utils/helpers';
import { useLocalSearchParams } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { Alert, KeyboardAvoidingView, Platform, ScrollView, View } from 'react-native';
import Animated, { FadeIn, FadeInDown, FadeInUp, SlideInRight } from 'react-native-reanimated';
import { BalanceInfo } from './components/BalanceInfo';
import { DripQuantityControl } from './components/DripQuantityControl';
import { Header } from './components/Header';
import { LimitPriceInput } from './components/LimitPriceInput';
import { MarketDepth } from './components/MarketDepth';
import { OrderSummary } from './components/OrderSummary';
import { OrderTypeTabs } from './components/OrderTypeTabs';
import { PlaceOrderButton } from './components/PlaceOrderButton';
import { QuantityControl } from './components/QuantityControl';
import { StockPickerModal } from './components/StockPickerModal';
import { StockSelector } from './components/StockSelector';
import { TradeTypeTabs } from './components/TradeTypeTabs';
import { UserSelector } from './components/UserSelector';
import { useOrderValidation } from './hooks/useOrderValidation';
import { useTradeCalculations } from './hooks/useTradeCalculations';
import { createTradeStyles } from './styles/tradeStyles';

type TradeType = 'BUY' | 'SELL';
type OrderType = 'MARKET' | 'LIMIT';

interface User {
  id: string;
  code: string;
  name: string;
}

export default function TradeScreen() {
  const { colors } = useTheme();
  const styles = createTradeStyles(colors);
  const dispatch = useAppDispatch();
  const stocks = useAppSelector((state: any) => state.market.stocks);
  const params = useLocalSearchParams<{ stockSymbol?: string; tradeType?: string }>();
  const marketData = useMarketDataUpdates();

  const [tradeType, setTradeType] = useState<TradeType>('BUY');
  const [selectedStock, setSelectedStock] = useState<Stock | null>(null);
  const [orderType, setOrderType] = useState<OrderType>('MARKET');
  const [quantity, setQuantity] = useState<string>('1');
  const [dripQuantity, setDripQuantity] = useState<string>('1');
  const [limitPrice, setLimitPrice] = useState<string>('');
  const [searchQuery, setSearchQuery] = useState('');
  const [isStockPickerVisible, setIsStockPickerVisible] = useState(false);
  const [selectedUser, setSelectedUser] = useState<User>({
    id: '1',
    code: '81140',
    name: 'YEASIN HOSSAIN',
  });

  // Handle pre-selected stock and trade type from navigation params
  useEffect(() => {
    if (params.stockSymbol) {
      const stock = stocks.find((s: Stock) => s.symbol === params.stockSymbol);
      if (stock) {
        setSelectedStock(stock);
        if (orderType === 'LIMIT') {
          setLimitPrice(stock.price.toString());
        }
      }
    }
    if (params.tradeType && (params.tradeType === 'BUY' || params.tradeType === 'SELL')) {
      setTradeType(params.tradeType as TradeType);
    }
  }, [params.stockSymbol, params.tradeType, stocks, orderType]);

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
    <View style={styles.container}>
      <GlobalHeader
        cashLimit={marketData.cashLimit}
        cscxValue={marketData.cscx.value}
        dsexValue={marketData.dsex.value}
      />
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      >
        <ScrollView showsVerticalScrollIndicator={false}>
          <Animated.View entering={FadeInDown.duration(500)}>
            <Header />
          </Animated.View>
        <Animated.View entering={SlideInRight.duration(500).delay(100).springify()}>
          <TradeTypeTabs tradeType={tradeType} onChangeTradeType={setTradeType} />
        </Animated.View>
        <Animated.View entering={FadeIn.duration(500).delay(150)}>
          <UserSelector selectedUser={selectedUser} onSelectUser={setSelectedUser} />
        </Animated.View>
        <Animated.View entering={FadeIn.duration(500).delay(180)}>
          <BalanceInfo limit={2883.00} balance={2883.00} />
        </Animated.View>
        <Animated.View entering={FadeIn.duration(500).delay(200)}>
          <StockSelector
            selectedStock={selectedStock}
            tradeType={tradeType}
            holdingQuantity={holdingQuantity}
            onPress={() => setIsStockPickerVisible(true)}
          />
        </Animated.View>
        {selectedStock && <MarketDepth stock={selectedStock} />}
        <Animated.View entering={FadeInUp.duration(500).delay(300).springify()}>
          <OrderTypeTabs orderType={orderType} onChangeOrderType={handleChangeOrderType} />
        </Animated.View>
        <Animated.View entering={FadeInUp.duration(500).delay(400).springify()}>
          <QuantityControl quantity={quantity} onChangeQuantity={setQuantity} />
        </Animated.View>
        {orderType === 'MARKET' && (
          <Animated.View entering={FadeInUp.duration(400).springify()}>
            <DripQuantityControl dripQuantity={dripQuantity} onChangeDripQuantity={setDripQuantity} />
          </Animated.View>
        )}
        {orderType === 'LIMIT' && (
          <Animated.View entering={FadeInUp.duration(400).springify()}>
            <LimitPriceInput limitPrice={limitPrice} onChangeLimitPrice={setLimitPrice} />
          </Animated.View>
        )}
        <Animated.View entering={FadeInUp.duration(500).delay(500).springify()}>
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
        </Animated.View>
        <Animated.View entering={FadeInUp.duration(500).delay(600).springify()}>
          <PlaceOrderButton
            tradeType={tradeType}
            isDisabled={!selectedStock}
            onPress={handlePlaceOrder}
          />
        </Animated.View>
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
    </View>
  );
}
