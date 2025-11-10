import type { Stock } from '@/src/types';
import { formatCurrency, getProfitColor } from '@/src/utils/helpers';
import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import { stockSelectorStyles } from '../styles/tradeStyles';

interface StockSelectorProps {
  selectedStock: Stock | null;
  tradeType: 'BUY' | 'SELL';
  holdingQuantity: number;
  onPress: () => void;
}

export const StockSelector: React.FC<StockSelectorProps> = ({
  selectedStock,
  tradeType,
  holdingQuantity,
  onPress,
}) => {
  return (
    <View style={stockSelectorStyles.section}>
      <Text style={stockSelectorStyles.sectionLabel}>Select Stock</Text>
      <TouchableOpacity style={stockSelectorStyles.stockSelector} onPress={onPress}>
        {selectedStock ? (
          <View style={stockSelectorStyles.selectedStockContent}>
            <View>
              <Text style={stockSelectorStyles.selectedStockSymbol}>{selectedStock.symbol}</Text>
              <Text style={stockSelectorStyles.selectedStockName}>{selectedStock.name}</Text>
            </View>
            <View style={stockSelectorStyles.selectedStockRight}>
              <Text style={stockSelectorStyles.selectedStockPrice}>
                {formatCurrency(selectedStock.price)}
              </Text>
              <Text
                style={[
                  stockSelectorStyles.selectedStockChange,
                  { color: getProfitColor(selectedStock.change) },
                ]}
              >
                {selectedStock.change >= 0 ? '+' : ''}
                {selectedStock.changePercent.toFixed(2)}%
              </Text>
            </View>
          </View>
        ) : (
          <View style={stockSelectorStyles.stockSelectorPlaceholder}>
            <Ionicons name="search" size={20} color="#9ca3af" />
            <Text style={stockSelectorStyles.stockSelectorPlaceholderText}>
              Tap to select a stock
            </Text>
          </View>
        )}
        <Ionicons name="chevron-down" size={20} color="#6b7280" />
      </TouchableOpacity>

      {/* Holding info for SELL */}
      {tradeType === 'SELL' && selectedStock && (
        <View style={stockSelectorStyles.holdingInfo}>
          <Ionicons name="information-circle" size={16} color="#3b82f6" />
          <Text style={stockSelectorStyles.holdingInfoText}>
            You hold {holdingQuantity} shares
          </Text>
        </View>
      )}
    </View>
  );
};
