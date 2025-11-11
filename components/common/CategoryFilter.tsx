// ============================================
// CATEGORY FILTER - Market Category Tabs
// ============================================

import { useTheme } from '@/src/contexts/ThemeContext';
import { MarketCategory } from '@/src/types';
import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

interface CategoryFilterProps {
  selected: MarketCategory;
  onSelect: (category: MarketCategory) => void;
}

interface CategoryItem {
  key: MarketCategory;
  label: string;
  icon: keyof typeof Ionicons.glyphMap;
  color: string;
}

const categories: CategoryItem[] = [
  { key: 'GAINER', label: 'Gainers', icon: 'trending-up', color: '#10b981' },
  { key: 'LOSER', label: 'Losers', icon: 'trending-down', color: '#ef4444' },
  { key: 'UNCHANGED', label: 'Unchanged', icon: 'remove', color: '#6b7280' },
  { key: 'MOST_TRADED', label: 'Most Traded', icon: 'swap-horizontal', color: '#3b82f6' },
  { key: 'MOST_VALUE', label: 'Most Value', icon: 'cash', color: '#8b5cf6' },
];

export default function CategoryFilter({ selected, onSelect }: CategoryFilterProps) {
  const { colors } = useTheme();
  const styles = createStyles(colors);

  return (
    <View style={styles.container}>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {categories.map((category) => {
          const isSelected = selected === category.key;
          return (
            <TouchableOpacity
              key={category.key}
              style={[
                styles.categoryButton,
                isSelected && {
                  backgroundColor: category.color,
                  borderColor: category.color,
                },
              ]}
              onPress={() => onSelect(category.key)}
              activeOpacity={0.7}
            >
              <Ionicons
                name={category.icon}
                size={18}
                color={isSelected ? '#ffffff' : category.color}
              />
              <Text
                style={[
                  styles.categoryLabel,
                  isSelected && styles.categoryLabelSelected,
                ]}
              >
                {category.label}
              </Text>
            </TouchableOpacity>
          );
        })}
      </ScrollView>
    </View>
  );
}

const createStyles = (colors: any) => StyleSheet.create({
  container: {
    paddingVertical: 12,
    backgroundColor: colors.surface,
    borderBottomWidth: 1,
    borderBottomColor: colors.borderLight,
  },
  scrollContent: {
    paddingHorizontal: 16,
    gap: 10,
  },
  categoryButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 20,
    borderWidth: 1.5,
    borderColor: colors.border,
    backgroundColor: colors.surface,
    gap: 6,
  },
  categoryLabel: {
    fontSize: 13,
    fontWeight: '600',
    color: colors.text,
  },
  categoryLabelSelected: {
    color: '#ffffff',
  },
});
