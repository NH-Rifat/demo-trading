import { useTheme } from '@/src/contexts/ThemeContext';
import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import { menuStyles } from '../styles/profileStyles';

interface MenuItemProps {
  icon: keyof typeof Ionicons.glyphMap;
  label: string;
  value?: string;
  badge?: number;
  onPress?: () => void;
}

export const MenuItem: React.FC<MenuItemProps> = ({
  icon,
  label,
  value,
  badge,
  onPress,
}) => {
  const { colors } = useTheme();

  return (
    <TouchableOpacity 
      style={[menuStyles.menuItem, { backgroundColor: colors.surface, borderBottomColor: colors.borderLight }]} 
      onPress={onPress}
    >
      <View style={menuStyles.menuItemLeft}>
        <Ionicons name={icon} size={22} color={colors.textSecondary} />
        <Text style={[menuStyles.menuItemText, { color: colors.text }]}>{label}</Text>
      </View>
      <View style={menuStyles.menuItemRight}>
        {badge !== undefined && badge > 0 && (
          <View style={menuStyles.badge}>
            <Text style={menuStyles.badgeText}>{badge}</Text>
          </View>
        )}
        {value && (
          <Text style={[menuStyles.menuItemValue, { color: colors.textSecondary }]}>{value}</Text>
        )}
        <Ionicons name="chevron-forward" size={20} color={colors.textTertiary} />
      </View>
    </TouchableOpacity>
  );
};
