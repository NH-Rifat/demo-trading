import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import { Text, View } from 'react-native';
import { statsStyles } from '../styles/profileStyles';

interface QuickStatsProps {
  holdingsCount: number;
  activeOrders: number;
  completedOrders: number;
}

export const QuickStats: React.FC<QuickStatsProps> = ({
  holdingsCount,
  activeOrders,
  completedOrders,
}) => {
  return (
    <View style={statsStyles.statsContainer}>
      <View style={statsStyles.statCard}>
        <View style={statsStyles.statIconContainer}>
          <Ionicons name="layers-outline" size={24} color="#3b82f6" />
        </View>
        <Text style={statsStyles.statValue}>{holdingsCount}</Text>
        <Text style={statsStyles.statLabel}>Holdings</Text>
      </View>

      <View style={statsStyles.statCard}>
        <View style={statsStyles.statIconContainer}>
          <Ionicons name="time-outline" size={24} color="#f59e0b" />
        </View>
        <Text style={statsStyles.statValue}>{activeOrders}</Text>
        <Text style={statsStyles.statLabel}>Active Orders</Text>
      </View>

      <View style={statsStyles.statCard}>
        <View style={statsStyles.statIconContainer}>
          <Ionicons name="checkmark-circle-outline" size={24} color="#10b981" />
        </View>
        <Text style={statsStyles.statValue}>{completedOrders}</Text>
        <Text style={statsStyles.statLabel}>Completed</Text>
      </View>
    </View>
  );
};
