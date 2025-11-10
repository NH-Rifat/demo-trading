import { useTheme } from '@/src/contexts/ThemeContext';
import React from 'react';
import { Text, View } from 'react-native';
import { menuStyles } from '../styles/profileStyles';
import { MenuItem } from './MenuItem';

interface MenuSectionProps {
  title: string;
  items: {
    icon: any;
    label: string;
    value?: string;
    badge?: number;
    onPress?: () => void;
  }[];
}

export const MenuSection: React.FC<MenuSectionProps> = ({ title, items }) => {
  const { colors } = useTheme();

  return (
    <View style={menuStyles.section}>
      <Text style={[menuStyles.sectionTitle, { color: colors.textTertiary }]}>{title}</Text>
      {items.map((item, index) => (
        <MenuItem key={index} {...item} />
      ))}
    </View>
  );
};
