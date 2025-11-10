// ============================================
// SECTOR ALLOCATION COMPONENT
// Displays pie chart and sector breakdown
// ============================================

import PieChart from '@/components/charts/PieChart';
import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import { FlatList, Text, View } from 'react-native';
import { portfolioStyles, sectorStyles } from '../styles/portfolioStyles';
import { getSectorColor } from '../utils/sectorUtils';
import { SectorCard } from './SectorCard';

interface SectorAllocationProps {
  sectorAllocation: {
    sector: string;
    value: number;
    percentage: number;
  }[];
}

export const SectorAllocation: React.FC<SectorAllocationProps> = ({ sectorAllocation }) => {
  // Prepare sector data for pie chart
  const sectorPieData = sectorAllocation.map((item) => ({
    label: item.sector,
    value: item.value,
    color: getSectorColor(item.sector),
  }));

  return (
    <View style={portfolioStyles.section}>
      <View style={portfolioStyles.sectionHeader}>
        <Text style={portfolioStyles.sectionTitle}>Sector Allocation</Text>
        <Ionicons name="pie-chart-outline" size={20} color="#6b7280" />
      </View>

      {/* Sector Pie Chart */}
      {sectorPieData.length > 0 && <PieChart data={sectorPieData} size={220} />}

      {/* Sector Details List */}
      <FlatList
        data={sectorAllocation}
        keyExtractor={(item) => item.sector}
        renderItem={({ item }) => <SectorCard sector={item} />}
        scrollEnabled={false}
        contentContainerStyle={sectorStyles.sectorList}
      />
    </View>
  );
};
