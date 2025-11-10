import SearchBar from '@/components/common/SearchBar';
import type { Stock } from '@/src/types';
import { formatCurrency, getProfitColor } from '@/src/utils/helpers';
import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import { FlatList, Modal, Text, TouchableOpacity, View } from 'react-native';
import { stockPickerStyles } from '../styles/tradeStyles';

interface StockPickerModalProps {
  visible: boolean;
  stocks: Stock[];
  searchQuery: string;
  onChangeSearch: (value: string) => void;
  onSelectStock: (stock: Stock) => void;
  onClose: () => void;
}

export const StockPickerModal: React.FC<StockPickerModalProps> = ({
  visible,
  stocks,
  searchQuery,
  onChangeSearch,
  onSelectStock,
  onClose,
}) => {
  const filteredStocks = stocks.filter(
    (s: Stock) =>
      s.symbol.toLowerCase().includes(searchQuery.toLowerCase()) ||
      s.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const renderStockItem = ({ item }: { item: Stock }) => {
    const priceColor = getProfitColor(item.change);

    return (
      <TouchableOpacity style={stockPickerStyles.stockItem} onPress={() => onSelectStock(item)}>
        <View style={stockPickerStyles.stockItemLeft}>
          <Text style={stockPickerStyles.stockItemSymbol}>{item.symbol}</Text>
          <Text style={stockPickerStyles.stockItemName}>{item.name}</Text>
        </View>
        <View style={stockPickerStyles.stockItemRight}>
          <Text style={stockPickerStyles.stockItemPrice}>{formatCurrency(item.price)}</Text>
          <Text style={[stockPickerStyles.stockItemChange, { color: priceColor }]}>
            {item.change >= 0 ? '+' : ''}
            {item.changePercent.toFixed(2)}%
          </Text>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <Modal visible={visible} animationType="slide" onRequestClose={onClose}>
      <View style={stockPickerStyles.modalContainer}>
        <View style={stockPickerStyles.modalHeader}>
          <Text style={stockPickerStyles.modalTitle}>Select Stock</Text>
          <TouchableOpacity onPress={onClose}>
            <Ionicons name="close" size={28} color="#6b7280" />
          </TouchableOpacity>
        </View>

        <View style={stockPickerStyles.modalSearchContainer}>
          <SearchBar
            value={searchQuery}
            onChangeText={onChangeSearch}
            placeholder="Search stocks..."
          />
        </View>

        <FlatList
          data={filteredStocks}
          keyExtractor={(item) => item.id}
          renderItem={renderStockItem}
          contentContainerStyle={stockPickerStyles.stockList}
        />
      </View>
    </Modal>
  );
};
