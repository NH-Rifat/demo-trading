// ============================================
// TRADE SCREEN - Buy/Sell Stock Interface
// Features: Stock selection, order types, quantity, price, order preview
// ============================================

import SearchBar from '@/components/common/SearchBar';
import { useAppDispatch, useAppSelector } from '@/src/store/hooks';
import { addOrder } from '@/src/store/slices/ordersSlice';
import type { Stock } from '@/src/types';
import { formatCurrency, getProfitColor } from '@/src/utils/helpers';
import { Ionicons } from '@expo/vector-icons';
import React, { useState } from 'react';
import {
    Alert,
    FlatList,
    KeyboardAvoidingView,
    Modal,
    Platform,
    ScrollView,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

type TradeType = 'BUY' | 'SELL';
type OrderType = 'MARKET' | 'LIMIT';

export default function TradeScreen() {
  const dispatch = useAppDispatch();
  const insets = useSafeAreaInsets();
  const stocks = useAppSelector((state: any) => state.market.stocks);
  const portfolio = useAppSelector((state: any) => state.portfolio.portfolio);
  const user = useAppSelector((state: any) => state.auth.user);

  const [tradeType, setTradeType] = useState<TradeType>('BUY');
  const [selectedStock, setSelectedStock] = useState<Stock | null>(null);
  const [orderType, setOrderType] = useState<OrderType>('MARKET');
  const [quantity, setQuantity] = useState<string>('1');
  const [limitPrice, setLimitPrice] = useState<string>('');
  const [searchQuery, setSearchQuery] = useState('');
  const [isStockPickerVisible, setIsStockPickerVisible] = useState(false);

  // Filter stocks for search
  const filteredStocks = stocks.filter((s: Stock) =>
    s.symbol.toLowerCase().includes(searchQuery.toLowerCase()) ||
    s.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Calculate order total
  const getOrderPrice = () => {
    if (!selectedStock) return 0;
    return orderType === 'MARKET' ? selectedStock.price : parseFloat(limitPrice) || 0;
  };

  const getOrderTotal = () => {
    const price = getOrderPrice();
    const qty = parseInt(quantity) || 0;
    return price * qty;
  };

  // Get available balance or holdings
  const getAvailableBalance = () => {
    return user?.balance || 0;
  };

  const getHoldingQuantity = () => {
    if (!selectedStock) return 0;
    const position = portfolio.positions.find((p: any) => p.stockId === selectedStock.id);
    return position?.quantity || 0;
  };

  // Validate order
  const validateOrder = (): string | null => {
    if (!selectedStock) return 'Please select a stock';
    
    const qty = parseInt(quantity);
    if (!qty || qty <= 0) return 'Please enter a valid quantity';
    
    if (orderType === 'LIMIT') {
      const price = parseFloat(limitPrice);
      if (!price || price <= 0) return 'Please enter a valid limit price';
    }
    
    if (tradeType === 'BUY') {
      const total = getOrderTotal();
      if (total > getAvailableBalance()) {
        return 'Insufficient balance';
      }
    } else {
      if (qty > getHoldingQuantity()) {
        return 'Insufficient holdings';
      }
    }
    
    return null;
  };

  // Handle place order
  const handlePlaceOrder = () => {
    const error = validateOrder();
    if (error) {
      Alert.alert('Invalid Order', error);
      return;
    }

    const orderPrice = getOrderPrice();
    const orderTotal = getOrderTotal();

    Alert.alert(
      'Confirm Order',
      `${tradeType} ${quantity} shares of ${selectedStock?.symbol} at ${orderType === 'MARKET' ? 'Market Price' : formatCurrency(orderPrice)}\n\nTotal: ${formatCurrency(orderTotal)}`,
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Confirm',
          onPress: () => {
            if (selectedStock) {
              dispatch(addOrder({
                stockId: selectedStock.id,
                stockSymbol: selectedStock.symbol,
                stockName: selectedStock.name,
                type: tradeType,
                orderType: orderType,
                quantity: parseInt(quantity),
                price: orderPrice,
                totalAmount: orderTotal,
                status: orderType === 'MARKET' ? 'PROCESSING' : 'PENDING',
              }));
              
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

  // Render stock picker item
  const renderStockItem = ({ item }: { item: Stock }) => {
    const priceColor = getProfitColor(item.change);
    
    return (
      <TouchableOpacity
        style={styles.stockItem}
        onPress={() => {
          setSelectedStock(item);
          setIsStockPickerVisible(false);
          setSearchQuery('');
          // Set limit price to current price
          if (orderType === 'LIMIT') {
            setLimitPrice(item.price.toString());
          }
        }}
      >
        <View style={styles.stockItemLeft}>
          <Text style={styles.stockItemSymbol}>{item.symbol}</Text>
          <Text style={styles.stockItemName}>{item.name}</Text>
        </View>
        <View style={styles.stockItemRight}>
          <Text style={styles.stockItemPrice}>{formatCurrency(item.price)}</Text>
          <Text style={[styles.stockItemChange, { color: priceColor }]}>
            {item.change >= 0 ? '+' : ''}{item.changePercent.toFixed(2)}%
          </Text>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View style={[styles.header, { paddingTop: insets.top + 16 }]}>
          <Text style={styles.headerTitle}>Trade</Text>
        </View>

        {/* Buy/Sell Tabs */}
        <View style={styles.tradeTypeTabs}>
          <TouchableOpacity
            style={[styles.tradeTypeTab, tradeType === 'BUY' && styles.tradeTypeTabActiveBuy]}
            onPress={() => setTradeType('BUY')}
          >
            <Ionicons
              name="trending-up"
              size={20}
              color={tradeType === 'BUY' ? '#ffffff' : '#10b981'}
            />
            <Text style={[styles.tradeTypeTabText, tradeType === 'BUY' && styles.tradeTypeTabTextActive]}>
              Buy
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.tradeTypeTab, tradeType === 'SELL' && styles.tradeTypeTabActiveSell]}
            onPress={() => setTradeType('SELL')}
          >
            <Ionicons
              name="trending-down"
              size={20}
              color={tradeType === 'SELL' ? '#ffffff' : '#ef4444'}
            />
            <Text style={[styles.tradeTypeTabText, tradeType === 'SELL' && styles.tradeTypeTabTextActive]}>
              Sell
            </Text>
          </TouchableOpacity>
        </View>

        {/* Stock Selection */}
        <View style={styles.section}>
          <Text style={styles.sectionLabel}>Select Stock</Text>
          <TouchableOpacity
            style={styles.stockSelector}
            onPress={() => setIsStockPickerVisible(true)}
          >
            {selectedStock ? (
              <View style={styles.selectedStockContent}>
                <View>
                  <Text style={styles.selectedStockSymbol}>{selectedStock.symbol}</Text>
                  <Text style={styles.selectedStockName}>{selectedStock.name}</Text>
                </View>
                <View style={styles.selectedStockRight}>
                  <Text style={styles.selectedStockPrice}>
                    {formatCurrency(selectedStock.price)}
                  </Text>
                  <Text
                    style={[
                      styles.selectedStockChange,
                      { color: getProfitColor(selectedStock.change) }
                    ]}
                  >
                    {selectedStock.change >= 0 ? '+' : ''}
                    {selectedStock.changePercent.toFixed(2)}%
                  </Text>
                </View>
              </View>
            ) : (
              <View style={styles.stockSelectorPlaceholder}>
                <Ionicons name="search" size={20} color="#9ca3af" />
                <Text style={styles.stockSelectorPlaceholderText}>
                  Tap to select a stock
                </Text>
              </View>
            )}
            <Ionicons name="chevron-down" size={20} color="#6b7280" />
          </TouchableOpacity>

          {/* Holding info for SELL */}
          {tradeType === 'SELL' && selectedStock && (
            <View style={styles.holdingInfo}>
              <Ionicons name="information-circle" size={16} color="#3b82f6" />
              <Text style={styles.holdingInfoText}>
                You hold {getHoldingQuantity()} shares
              </Text>
            </View>
          )}
        </View>

        {/* Order Type */}
        <View style={styles.section}>
          <Text style={styles.sectionLabel}>Order Type</Text>
          <View style={styles.orderTypeTabs}>
            <TouchableOpacity
              style={[styles.orderTypeTab, orderType === 'MARKET' && styles.orderTypeTabActive]}
              onPress={() => setOrderType('MARKET')}
            >
              <Text style={[styles.orderTypeTabText, orderType === 'MARKET' && styles.orderTypeTabTextActive]}>
                Market
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[styles.orderTypeTab, orderType === 'LIMIT' && styles.orderTypeTabActive]}
              onPress={() => {
                setOrderType('LIMIT');
                if (selectedStock && !limitPrice) {
                  setLimitPrice(selectedStock.price.toString());
                }
              }}
            >
              <Text style={[styles.orderTypeTabText, orderType === 'LIMIT' && styles.orderTypeTabTextActive]}>
                Limit
              </Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Quantity */}
        <View style={styles.section}>
          <Text style={styles.sectionLabel}>Quantity</Text>
          <View style={styles.quantityControl}>
            <TouchableOpacity
              style={styles.quantityButton}
              onPress={() => {
                const qty = Math.max(1, parseInt(quantity) - 1);
                setQuantity(qty.toString());
              }}
            >
              <Ionicons name="remove" size={24} color="#6b7280" />
            </TouchableOpacity>

            <TextInput
              style={styles.quantityInput}
              value={quantity}
              onChangeText={(text) => {
                const cleaned = text.replace(/[^0-9]/g, '');
                setQuantity(cleaned || '0');
              }}
              keyboardType="number-pad"
              textAlign="center"
            />

            <TouchableOpacity
              style={styles.quantityButton}
              onPress={() => {
                const qty = parseInt(quantity) + 1;
                setQuantity(qty.toString());
              }}
            >
              <Ionicons name="add" size={24} color="#6b7280" />
            </TouchableOpacity>
          </View>
        </View>

        {/* Limit Price (for LIMIT orders) */}
        {orderType === 'LIMIT' && (
          <View style={styles.section}>
            <Text style={styles.sectionLabel}>Limit Price</Text>
            <View style={styles.priceInputContainer}>
              <Text style={styles.currencySymbol}>$</Text>
              <TextInput
                style={styles.priceInput}
                value={limitPrice}
                onChangeText={setLimitPrice}
                keyboardType="decimal-pad"
                placeholder="0.00"
              />
            </View>
          </View>
        )}

        {/* Order Summary */}
        <View style={styles.orderSummary}>
          <Text style={styles.orderSummaryTitle}>Order Summary</Text>
          
          <View style={styles.summaryRow}>
            <Text style={styles.summaryLabel}>Order Type</Text>
            <Text style={styles.summaryValue}>
              {tradeType} • {orderType}
            </Text>
          </View>

          <View style={styles.summaryRow}>
            <Text style={styles.summaryLabel}>Price per Share</Text>
            <Text style={styles.summaryValue}>
              {selectedStock ? formatCurrency(getOrderPrice()) : '—'}
            </Text>
          </View>

          <View style={styles.summaryRow}>
            <Text style={styles.summaryLabel}>Quantity</Text>
            <Text style={styles.summaryValue}>{quantity} shares</Text>
          </View>

          <View style={styles.summaryDivider} />

          <View style={styles.summaryRow}>
            <Text style={styles.summaryLabelTotal}>Total</Text>
            <Text style={styles.summaryValueTotal}>
              {selectedStock ? formatCurrency(getOrderTotal()) : '—'}
            </Text>
          </View>

          <View style={styles.summaryRow}>
            <Text style={styles.summaryLabel}>
              {tradeType === 'BUY' ? 'Available Balance' : 'Holdings'}
            </Text>
            <Text style={styles.summaryValue}>
              {tradeType === 'BUY'
                ? formatCurrency(getAvailableBalance())
                : `${getHoldingQuantity()} shares`}
            </Text>
          </View>
        </View>

        {/* Place Order Button */}
        <TouchableOpacity
          style={[
            styles.placeOrderButton,
            tradeType === 'BUY' ? styles.placeOrderButtonBuy : styles.placeOrderButtonSell,
            !selectedStock && styles.placeOrderButtonDisabled,
          ]}
          onPress={handlePlaceOrder}
          disabled={!selectedStock}
        >
          <Text style={styles.placeOrderButtonText}>
            {tradeType === 'BUY' ? 'Place Buy Order' : 'Place Sell Order'}
          </Text>
        </TouchableOpacity>

        <View style={{ height: 40 }} />
      </ScrollView>

      {/* Stock Picker Modal */}
      <Modal
        visible={isStockPickerVisible}
        animationType="slide"
        onRequestClose={() => setIsStockPickerVisible(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalHeader}>
            <Text style={styles.modalTitle}>Select Stock</Text>
            <TouchableOpacity onPress={() => setIsStockPickerVisible(false)}>
              <Ionicons name="close" size={28} color="#6b7280" />
            </TouchableOpacity>
          </View>

          <View style={styles.modalSearchContainer}>
            <SearchBar
              value={searchQuery}
              onChangeText={setSearchQuery}
              placeholder="Search stocks..."
            />
          </View>

          <FlatList
            data={filteredStocks}
            keyExtractor={(item) => item.id}
            renderItem={renderStockItem}
            contentContainerStyle={styles.stockList}
          />
        </View>
      </Modal>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f9fafb',
  },
  header: {
    backgroundColor: '#ffffff',
    paddingTop: Platform.OS === 'ios' ? 60 : 48,
    paddingHorizontal: 16,
    paddingBottom: 20,
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
      },
      android: {
        elevation: 4,
      },
    }),
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: '700',
    color: '#111827',
  },
  tradeTypeTabs: {
    flexDirection: 'row',
    padding: 16,
    gap: 12,
  },
  tradeTypeTab: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 16,
    borderRadius: 12,
    backgroundColor: '#ffffff',
    borderWidth: 2,
    borderColor: '#e5e7eb',
    gap: 8,
  },
  tradeTypeTabActiveBuy: {
    backgroundColor: '#10b981',
    borderColor: '#10b981',
  },
  tradeTypeTabActiveSell: {
    backgroundColor: '#ef4444',
    borderColor: '#ef4444',
  },
  tradeTypeTabText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#6b7280',
  },
  tradeTypeTabTextActive: {
    color: '#ffffff',
  },
  section: {
    paddingHorizontal: 16,
    marginBottom: 24,
  },
  sectionLabel: {
    fontSize: 14,
    fontWeight: '600',
    color: '#6b7280',
    marginBottom: 12,
  },
  stockSelector: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#ffffff',
    borderRadius: 12,
    padding: 16,
    borderWidth: 2,
    borderColor: '#e5e7eb',
  },
  selectedStockContent: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginRight: 12,
  },
  selectedStockSymbol: {
    fontSize: 18,
    fontWeight: '700',
    color: '#111827',
  },
  selectedStockName: {
    fontSize: 12,
    color: '#6b7280',
    marginTop: 2,
  },
  selectedStockRight: {
    alignItems: 'flex-end',
  },
  selectedStockPrice: {
    fontSize: 16,
    fontWeight: '600',
    color: '#111827',
  },
  selectedStockChange: {
    fontSize: 12,
    fontWeight: '600',
    marginTop: 2,
  },
  stockSelectorPlaceholder: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  stockSelectorPlaceholderText: {
    fontSize: 16,
    color: '#9ca3af',
  },
  holdingInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 8,
    gap: 6,
  },
  holdingInfoText: {
    fontSize: 13,
    color: '#3b82f6',
    fontWeight: '500',
  },
  orderTypeTabs: {
    flexDirection: 'row',
    backgroundColor: '#f3f4f6',
    borderRadius: 12,
    padding: 4,
    gap: 4,
  },
  orderTypeTab: {
    flex: 1,
    paddingVertical: 12,
    borderRadius: 10,
    alignItems: 'center',
  },
  orderTypeTabActive: {
    backgroundColor: '#ffffff',
  },
  orderTypeTabText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#6b7280',
  },
  orderTypeTabTextActive: {
    color: '#111827',
  },
  quantityControl: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#ffffff',
    borderRadius: 12,
    borderWidth: 2,
    borderColor: '#e5e7eb',
  },
  quantityButton: {
    width: 56,
    height: 56,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 12,
  },
  quantityInput: {
    flex: 1,
    fontSize: 24,
    fontWeight: '700',
    color: '#111827',
    textAlign: 'center',
  },
  priceInputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#ffffff',
    borderRadius: 12,
    borderWidth: 2,
    borderColor: '#e5e7eb',
    paddingHorizontal: 16,
  },
  currencySymbol: {
    fontSize: 20,
    fontWeight: '600',
    color: '#6b7280',
    marginRight: 8,
  },
  priceInput: {
    flex: 1,
    fontSize: 20,
    fontWeight: '600',
    color: '#111827',
    paddingVertical: 16,
  },
  orderSummary: {
    marginHorizontal: 16,
    backgroundColor: '#ffffff',
    borderRadius: 16,
    padding: 20,
    marginBottom: 24,
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 8,
      },
      android: {
        elevation: 4,
      },
    }),
  },
  orderSummaryTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#111827',
    marginBottom: 16,
  },
  summaryRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  summaryLabel: {
    fontSize: 14,
    color: '#6b7280',
  },
  summaryValue: {
    fontSize: 14,
    fontWeight: '600',
    color: '#111827',
  },
  summaryDivider: {
    height: 1,
    backgroundColor: '#e5e7eb',
    marginVertical: 12,
  },
  summaryLabelTotal: {
    fontSize: 16,
    fontWeight: '700',
    color: '#111827',
  },
  summaryValueTotal: {
    fontSize: 18,
    fontWeight: '700',
    color: '#10b981',
  },
  placeOrderButton: {
    marginHorizontal: 16,
    paddingVertical: 18,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  placeOrderButtonBuy: {
    backgroundColor: '#10b981',
  },
  placeOrderButtonSell: {
    backgroundColor: '#ef4444',
  },
  placeOrderButtonDisabled: {
    backgroundColor: '#d1d5db',
  },
  placeOrderButtonText: {
    fontSize: 16,
    fontWeight: '700',
    color: '#ffffff',
  },
  modalContainer: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: Platform.OS === 'ios' ? 60 : 48,
    paddingHorizontal: 16,
    paddingBottom: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#e5e7eb',
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#111827',
  },
  modalSearchContainer: {
    padding: 16,
  },
  stockList: {
    paddingHorizontal: 16,
  },
  stockItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 16,
    paddingHorizontal: 16,
    backgroundColor: '#f9fafb',
    borderRadius: 12,
    marginBottom: 8,
  },
  stockItemLeft: {
    flex: 1,
  },
  stockItemSymbol: {
    fontSize: 16,
    fontWeight: '700',
    color: '#111827',
  },
  stockItemName: {
    fontSize: 12,
    color: '#6b7280',
    marginTop: 2,
  },
  stockItemRight: {
    alignItems: 'flex-end',
  },
  stockItemPrice: {
    fontSize: 14,
    fontWeight: '600',
    color: '#111827',
  },
  stockItemChange: {
    fontSize: 12,
    fontWeight: '600',
    marginTop: 2,
  },
});
