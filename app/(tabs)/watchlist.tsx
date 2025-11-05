// ============================================
// WATCHLIST SCREEN - Manage Stock Watchlists
// Features: View watchlists, create/edit/delete, add/remove stocks
// ============================================

import EmptyState from '@/components/common/EmptyState';
import StockCard from '@/components/common/StockCard';
import { useAppDispatch, useAppSelector } from '@/src/store/hooks';
import {
    createWatchlist,
    deleteWatchlist,
    removeStockFromWatchlist,
    setActiveWatchlist,
    updateWatchlist
} from '@/src/store/slices/watchlistSlice';
import type { Stock, Watchlist } from '@/src/types';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import {
    Alert,
    FlatList,
    Modal,
    Platform,
    ScrollView,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from 'react-native';

export default function WatchlistScreen() {
  const router = useRouter();
  const dispatch = useAppDispatch();

  const watchlists = useAppSelector((state) => state.watchlist.watchlists);
  const activeWatchlistId = useAppSelector((state) => state.watchlist.activeWatchlistId);
  const stocks = useAppSelector((state) => state.market.stocks);

  const [isCreateModalVisible, setIsCreateModalVisible] = useState(false);
  const [isEditModalVisible, setIsEditModalVisible] = useState(false);
  const [newWatchlistName, setNewWatchlistName] = useState('');
  const [editingWatchlist, setEditingWatchlist] = useState<Watchlist | null>(null);

  // Get active watchlist
  const activeWatchlist = watchlists.find((w: Watchlist) => w.id === activeWatchlistId);

  // Get stocks in active watchlist
  const watchlistStocks = activeWatchlist
    ? activeWatchlist.stocks
        .map((stockId: string) => stocks.find((s: Stock) => s.id === stockId))
        .filter((s): s is Stock => s !== undefined)
    : [];

  // Handle create watchlist
  const handleCreateWatchlist = () => {
    if (newWatchlistName.trim()) {
      dispatch(createWatchlist({ name: newWatchlistName.trim() }));
      setNewWatchlistName('');
      setIsCreateModalVisible(false);
    }
  };

  // Handle edit watchlist
  const handleEditWatchlist = () => {
    if (editingWatchlist && newWatchlistName.trim()) {
      dispatch(updateWatchlist({ id: editingWatchlist.id, name: newWatchlistName.trim() }));
      setNewWatchlistName('');
      setEditingWatchlist(null);
      setIsEditModalVisible(false);
    }
  };

  // Handle delete watchlist
  const handleDeleteWatchlist = (watchlist: Watchlist) => {
    Alert.alert(
      'Delete Watchlist',
      `Are you sure you want to delete "${watchlist.name}"?`,
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Delete',
          style: 'destructive',
          onPress: () => dispatch(deleteWatchlist(watchlist.id)),
        },
      ]
    );
  };

  // Handle remove stock from watchlist
  const handleRemoveStock = (stockId: string) => {
    if (activeWatchlistId) {
      dispatch(removeStockFromWatchlist({ watchlistId: activeWatchlistId, stockId }));
    }
  };

  // Handle stock press
  const handleStockPress = (stock: Stock) => {
    router.push(`/stock/${stock.symbol}`);
  };

  // Open edit modal
  const openEditModal = (watchlist: Watchlist) => {
    setEditingWatchlist(watchlist);
    setNewWatchlistName(watchlist.name);
    setIsEditModalVisible(true);
  };

  // Render watchlist tab
  const renderWatchlistTab = (watchlist: Watchlist) => {
    const isActive = watchlist.id === activeWatchlistId;
    const stockCount = watchlist.stocks.length;

    return (
      <TouchableOpacity
        key={watchlist.id}
        style={[styles.watchlistTab, isActive && styles.watchlistTabActive]}
        onPress={() => dispatch(setActiveWatchlist(watchlist.id))}
        onLongPress={() => openEditModal(watchlist)}
      >
        <View style={styles.watchlistTabContent}>
          <Text style={[styles.watchlistTabName, isActive && styles.watchlistTabNameActive]}>
            {watchlist.name}
          </Text>
          <Text style={[styles.watchlistTabCount, isActive && styles.watchlistTabCountActive]}>
            {stockCount} {stockCount === 1 ? 'stock' : 'stocks'}
          </Text>
        </View>
        {isActive && (
          <TouchableOpacity
            style={styles.watchlistEditButton}
            onPress={() => openEditModal(watchlist)}
          >
            <Ionicons name="ellipsis-horizontal" size={18} color="#10b981" />
          </TouchableOpacity>
        )}
      </TouchableOpacity>
    );
  };

  // Render header
  const renderHeader = () => (
    <View style={styles.header}>
      <View style={styles.headerTop}>
        <Text style={styles.headerTitle}>Watchlists</Text>
        <TouchableOpacity
          style={styles.createButton}
          onPress={() => setIsCreateModalVisible(true)}
        >
          <Ionicons name="add" size={24} color="#ffffff" />
        </TouchableOpacity>
      </View>

      {/* Watchlist Tabs */}
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.watchlistTabs}
      >
        {watchlists.map((w: Watchlist) => renderWatchlistTab(w))}
      </ScrollView>
    </View>
  );

  // Empty state
  if (watchlists.length === 0) {
    return (
      <View style={styles.container}>
        {renderHeader()}
        <EmptyState
          icon="star-outline"
          title="No Watchlists"
          message="Create your first watchlist to start tracking stocks"
        />
      </View>
    );
  }

  // No active watchlist
  if (!activeWatchlist) {
    return (
      <View style={styles.container}>
        {renderHeader()}
        <EmptyState
          icon="list-outline"
          title="Select a Watchlist"
          message="Choose a watchlist from above to view stocks"
        />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <FlatList
        data={watchlistStocks}
        keyExtractor={(item) => item.id}
        ListHeaderComponent={renderHeader}
        renderItem={({ item }) => (
          <View style={styles.stockCardWrapper}>
            <StockCard
              stock={item}
              onPress={() => handleStockPress(item)}
              showStar={true}
              isInWatchlist={true}
              onToggleWatchlist={() => handleRemoveStock(item.id)}
            />
          </View>
        )}
        ListEmptyComponent={
          <EmptyState
            icon="star-outline"
            title="No Stocks"
            message={`Add stocks to "${activeWatchlist.name}" to track them`}
          />
        }
        contentContainerStyle={watchlistStocks.length === 0 ? styles.emptyList : undefined}
        showsVerticalScrollIndicator={false}
      />

      {/* Create Watchlist Modal */}
      <Modal
        visible={isCreateModalVisible}
        animationType="slide"
        transparent={true}
        onRequestClose={() => setIsCreateModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>Create Watchlist</Text>
              <TouchableOpacity onPress={() => setIsCreateModalVisible(false)}>
                <Ionicons name="close" size={24} color="#6b7280" />
              </TouchableOpacity>
            </View>

            <TextInput
              style={styles.input}
              placeholder="Watchlist name"
              value={newWatchlistName}
              onChangeText={setNewWatchlistName}
              autoFocus
              maxLength={50}
            />

            <View style={styles.modalActions}>
              <TouchableOpacity
                style={[styles.modalButton, styles.modalButtonCancel]}
                onPress={() => {
                  setNewWatchlistName('');
                  setIsCreateModalVisible(false);
                }}
              >
                <Text style={styles.modalButtonTextCancel}>Cancel</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={[
                  styles.modalButton,
                  styles.modalButtonCreate,
                  !newWatchlistName.trim() && styles.modalButtonDisabled,
                ]}
                onPress={handleCreateWatchlist}
                disabled={!newWatchlistName.trim()}
              >
                <Text style={styles.modalButtonTextCreate}>Create</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>

      {/* Edit Watchlist Modal */}
      <Modal
        visible={isEditModalVisible}
        animationType="slide"
        transparent={true}
        onRequestClose={() => setIsEditModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>Edit Watchlist</Text>
              <TouchableOpacity onPress={() => setIsEditModalVisible(false)}>
                <Ionicons name="close" size={24} color="#6b7280" />
              </TouchableOpacity>
            </View>

            <TextInput
              style={styles.input}
              placeholder="Watchlist name"
              value={newWatchlistName}
              onChangeText={setNewWatchlistName}
              autoFocus
              maxLength={50}
            />

            <View style={styles.modalActions}>
              <TouchableOpacity
                style={[styles.modalButton, styles.modalButtonCancel]}
                onPress={() => {
                  setNewWatchlistName('');
                  setEditingWatchlist(null);
                  setIsEditModalVisible(false);
                }}
              >
                <Text style={styles.modalButtonTextCancel}>Cancel</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={[styles.modalButton, styles.modalButtonDelete]}
                onPress={() => {
                  if (editingWatchlist) {
                    setIsEditModalVisible(false);
                    handleDeleteWatchlist(editingWatchlist);
                  }
                }}
              >
                <Text style={styles.modalButtonTextDelete}>Delete</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={[
                  styles.modalButton,
                  styles.modalButtonCreate,
                  !newWatchlistName.trim() && styles.modalButtonDisabled,
                ]}
                onPress={handleEditWatchlist}
                disabled={!newWatchlistName.trim()}
              >
                <Text style={styles.modalButtonTextCreate}>Save</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </View>
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
    paddingBottom: 16,
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
  headerTop: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    marginBottom: 20,
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: '700',
    color: '#111827',
  },
  createButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#10b981',
    justifyContent: 'center',
    alignItems: 'center',
  },
  watchlistTabs: {
    paddingHorizontal: 16,
    gap: 12,
  },
  watchlistTab: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 12,
    backgroundColor: '#f3f4f6',
    minWidth: 120,
  },
  watchlistTabActive: {
    backgroundColor: '#d1fae5',
    borderWidth: 2,
    borderColor: '#10b981',
  },
  watchlistTabContent: {
    flex: 1,
  },
  watchlistTabName: {
    fontSize: 14,
    fontWeight: '600',
    color: '#6b7280',
  },
  watchlistTabNameActive: {
    color: '#059669',
  },
  watchlistTabCount: {
    fontSize: 12,
    color: '#9ca3af',
    marginTop: 2,
  },
  watchlistTabCountActive: {
    color: '#10b981',
  },
  watchlistEditButton: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#ffffff',
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 8,
  },
  stockCardWrapper: {
    marginBottom: 8,
  },
  emptyList: {
    flexGrow: 1,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'flex-end',
  },
  modalContent: {
    backgroundColor: '#ffffff',
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    padding: 24,
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: -4 },
        shadowOpacity: 0.1,
        shadowRadius: 8,
      },
      android: {
        elevation: 8,
      },
    }),
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 24,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#111827',
  },
  input: {
    borderWidth: 2,
    borderColor: '#e5e7eb',
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 12,
    fontSize: 16,
    color: '#111827',
    marginBottom: 24,
  },
  modalActions: {
    flexDirection: 'row',
    gap: 12,
  },
  modalButton: {
    flex: 1,
    paddingVertical: 14,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  modalButtonCancel: {
    backgroundColor: '#f3f4f6',
  },
  modalButtonCreate: {
    backgroundColor: '#10b981',
  },
  modalButtonDelete: {
    backgroundColor: '#ef4444',
    flex: 0.8,
  },
  modalButtonDisabled: {
    backgroundColor: '#d1d5db',
  },
  modalButtonTextCancel: {
    fontSize: 16,
    fontWeight: '600',
    color: '#6b7280',
  },
  modalButtonTextCreate: {
    fontSize: 16,
    fontWeight: '600',
    color: '#ffffff',
  },
  modalButtonTextDelete: {
    fontSize: 16,
    fontWeight: '600',
    color: '#ffffff',
  },
});
