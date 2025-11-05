// ============================================
// CATEGORY FILTER - Market Category Tabs
// ============================================

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

const styles = StyleSheet.create({
  container: {
    paddingVertical: 12,
    backgroundColor: '#ffffff',
    borderBottomWidth: 1,
    borderBottomColor: '#f3f4f6',
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
    borderColor: '#e5e7eb',
    backgroundColor: '#ffffff',
    gap: 6,
  },
  categoryLabel: {
    fontSize: 13,
    fontWeight: '600',
    color: '#374151',
  },
  categoryLabelSelected: {
    color: '#ffffff',
  },
});
