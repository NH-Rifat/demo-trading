// ============================================
// HOLDINGS LIST COMPONENT
// Displays list of all positions
// ============================================

import React from 'react';
import { FlatList, Text, View } from 'react-native';
import { portfolioStyles } from '../styles/portfolioStyles';
import { PositionCard } from './PositionCard';

interface HoldingsListProps {
  positions: any[];
  positionsCount: number;
}

export const HoldingsList: React.FC<HoldingsListProps> = ({ positions, positionsCount }) => {
  return (
    <View style={portfolioStyles.section}>
      <View style={portfolioStyles.sectionHeader}>
        <Text style={portfolioStyles.sectionTitle}>Holdings</Text>
        <Text style={portfolioStyles.sectionCount}>{positionsCount}</Text>
      </View>
      <FlatList
        data={positions}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => <PositionCard position={item} />}
        scrollEnabled={false}
        contentContainerStyle={{ gap: 12 }}
      />
    </View>
  );
};
