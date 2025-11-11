import { useTheme } from '@/src/contexts/ThemeContext';
import type { Watchlist } from '@/src/types';
import React from 'react';
import { ScrollView, View } from 'react-native';
import { createWatchlistTabStyles } from '../styles/watchlistStyles';
import { WatchlistTab } from './WatchlistTab';

interface WatchlistTabsProps {
  watchlists: Watchlist[];
  activeWatchlistId: string | null;
  onSelectWatchlist: (id: string) => void;
  onEditWatchlist: (watchlist: Watchlist) => void;
}

export const WatchlistTabs: React.FC<WatchlistTabsProps> = ({
  watchlists,
  activeWatchlistId,
  onSelectWatchlist,
  onEditWatchlist,
}) => {
  const { colors } = useTheme();
  const styles = createWatchlistTabStyles(colors);
  
  return (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={styles.watchlistTabs}
    >
      {watchlists.map((watchlist) => (
        <View key={watchlist.id}>
          <WatchlistTab
            watchlist={watchlist}
            isActive={watchlist.id === activeWatchlistId}
            onPress={() => onSelectWatchlist(watchlist.id)}
            onEdit={() => onEditWatchlist(watchlist)}
          />
        </View>
      ))}
    </ScrollView>
  );
};
