import type { Watchlist } from '@/src/types';
import React from 'react';
import { ScrollView } from 'react-native';
import { watchlistTabStyles } from '../styles/watchlistStyles';
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
  return (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={watchlistTabStyles.watchlistTabs}
    >
      {watchlists.map((watchlist) => (
        <WatchlistTab
          key={watchlist.id}
          watchlist={watchlist}
          isActive={watchlist.id === activeWatchlistId}
          onPress={() => onSelectWatchlist(watchlist.id)}
          onEdit={() => onEditWatchlist(watchlist)}
        />
      ))}
    </ScrollView>
  );
};
