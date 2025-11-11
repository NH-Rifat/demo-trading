import { useTheme } from '@/src/contexts/ThemeContext';
import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import { Text, View } from 'react-native';
import { createStatsStyles } from '../styles/profileStyles';

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
  const { colors } = useTheme();
  const statsStyles = createStatsStyles(colors);

  return (
    <View style={statsStyles.statsContainer}>
      <View style={statsStyles.statCard}>
        <View style={statsStyles.statIconContainer}>
          <Ionicons name="layers-outline" size={24} color={colors.info} />
        </View>
        <Text style={statsStyles.statValue}>{holdingsCount}</Text>
        <Text style={statsStyles.statLabel}>Holdings</Text>
      </View>

      <View style={statsStyles.statCard}>
        <View style={statsStyles.statIconContainer}>
          <Ionicons name="time-outline" size={24} color={colors.warning} />
        </View>
        <Text style={statsStyles.statValue}>{activeOrders}</Text>
        <Text style={statsStyles.statLabel}>Active Orders</Text>
      </View>

      <View style={statsStyles.statCard}>
        <View style={statsStyles.statIconContainer}>
          <Ionicons name="checkmark-circle-outline" size={24} color={colors.success} />
        </View>
        <Text style={statsStyles.statValue}>{completedOrders}</Text>
        <Text style={statsStyles.statLabel}>Completed</Text>
      </View>
    </View>
  );
};
