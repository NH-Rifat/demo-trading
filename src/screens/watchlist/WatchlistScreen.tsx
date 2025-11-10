import EmptyState from '@/components/common/EmptyState';
import StockCard from '@/components/common/StockCard';
import { useAppDispatch, useAppSelector } from '@/src/store/hooks';
import {
    createWatchlist,
    deleteWatchlist,
    removeStockFromWatchlist,
    setActiveWatchlist,
    updateWatchlist,
} from '@/src/store/slices/watchlistSlice';
import type { Stock, Watchlist } from '@/src/types';
import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import { Alert, FlatList, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { CreateWatchlistModal } from './components/CreateWatchlistModal';
import { EditWatchlistModal } from './components/EditWatchlistModal';
import { Header } from './components/Header';
import { WatchlistTabs } from './components/WatchlistTabs';
import { useWatchlistStocks } from './hooks/useWatchlistStocks';
import { headerStyles, watchlistStyles } from './styles/watchlistStyles';

export default function WatchlistScreen() {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const insets = useSafeAreaInsets();

  const watchlists = useAppSelector((state: any) => state.watchlist.watchlists);
  const activeWatchlistId = useAppSelector((state: any) => state.watchlist.activeWatchlistId);

  const [isCreateModalVisible, setIsCreateModalVisible] = useState(false);
  const [isEditModalVisible, setIsEditModalVisible] = useState(false);
  const [newWatchlistName, setNewWatchlistName] = useState('');
  const [editingWatchlist, setEditingWatchlist] = useState<Watchlist | null>(null);

  // Get active watchlist
  const activeWatchlist = watchlists.find((w: Watchlist) => w.id === activeWatchlistId);

  // Get stocks in active watchlist
  const watchlistStocks = useWatchlistStocks(activeWatchlist);

  // Handlers
  const handleCreateWatchlist = () => {
    if (newWatchlistName.trim()) {
      dispatch(createWatchlist({ name: newWatchlistName.trim() }));
      setNewWatchlistName('');
      setIsCreateModalVisible(false);
    }
  };

  const handleEditWatchlist = () => {
    if (editingWatchlist && newWatchlistName.trim()) {
      dispatch(updateWatchlist({ id: editingWatchlist.id, name: newWatchlistName.trim() }));
      setNewWatchlistName('');
      setEditingWatchlist(null);
      setIsEditModalVisible(false);
    }
  };

  const handleDeleteWatchlist = (watchlist: Watchlist) => {
    Alert.alert('Delete Watchlist', `Are you sure you want to delete "${watchlist.name}"?`, [
      { text: 'Cancel', style: 'cancel' },
      {
        text: 'Delete',
        style: 'destructive',
        onPress: () => {
          dispatch(deleteWatchlist(watchlist.id));
          setIsEditModalVisible(false);
        },
      },
    ]);
  };

  const handleRemoveStock = (stockId: string) => {
    if (activeWatchlistId) {
      dispatch(removeStockFromWatchlist({ watchlistId: activeWatchlistId, stockId }));
    }
  };

  const handleStockPress = (stock: Stock) => {
    router.push(`/stock/${stock.symbol}`);
  };

  const openEditModal = (watchlist: Watchlist) => {
    setEditingWatchlist(watchlist);
    setNewWatchlistName(watchlist.name);
    setIsEditModalVisible(true);
  };

  const handleCloseCreateModal = () => {
    setNewWatchlistName('');
    setIsCreateModalVisible(false);
  };

  const handleCloseEditModal = () => {
    setNewWatchlistName('');
    setEditingWatchlist(null);
    setIsEditModalVisible(false);
  };

  // Render header
  const renderHeader = () => (
    <View style={[headerStyles.header, { paddingTop: insets.top + 16 }]}>
      <Header insets={insets} onCreatePress={() => setIsCreateModalVisible(true)} />
      <WatchlistTabs
        watchlists={watchlists}
        activeWatchlistId={activeWatchlistId}
        onSelectWatchlist={(id) => dispatch(setActiveWatchlist(id))}
        onEditWatchlist={openEditModal}
      />
    </View>
  );

  // Empty state - no watchlists
  if (watchlists.length === 0) {
    return (
      <View style={watchlistStyles.container}>
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
      <View style={watchlistStyles.container}>
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
    <View style={watchlistStyles.container}>
      <FlatList
        data={watchlistStocks}
        keyExtractor={(item) => item.id}
        ListHeaderComponent={renderHeader}
        renderItem={({ item }) => (
          <View style={watchlistStyles.stockCardWrapper}>
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
        contentContainerStyle={watchlistStocks.length === 0 ? watchlistStyles.emptyList : undefined}
        showsVerticalScrollIndicator={false}
      />

      <CreateWatchlistModal
        visible={isCreateModalVisible}
        watchlistName={newWatchlistName}
        onChangeName={setNewWatchlistName}
        onCreate={handleCreateWatchlist}
        onClose={handleCloseCreateModal}
      />

      <EditWatchlistModal
        visible={isEditModalVisible}
        watchlistName={newWatchlistName}
        onChangeName={setNewWatchlistName}
        onSave={handleEditWatchlist}
        onDelete={() => editingWatchlist && handleDeleteWatchlist(editingWatchlist)}
        onClose={handleCloseEditModal}
      />
    </View>
  );
}
