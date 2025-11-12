// ============================================
// GLOBAL HEADER COMPONENT - Tickers Only
// Fixed header with tickers for all pages
// Theme-aware with dynamic colors
// ============================================

import { useTheme } from '@/src/contexts/ThemeContext';
import { Ionicons } from '@expo/vector-icons';
import React, { useEffect, useRef, useState } from 'react';
import { Platform, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import Animated, { FadeIn, FadeOut } from 'react-native-reanimated';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

interface GlobalHeaderProps {
  cashLimit: number;
  cscxValue: number;
  dsexValue: number;
}

export const GlobalHeader: React.FC<GlobalHeaderProps> = ({
  cashLimit,
  cscxValue,
  dsexValue,
}) => {
  const { colors } = useTheme();
  const insets = useSafeAreaInsets();
  const styles = createStyles(colors);
  const [showBalance, setShowBalance] = useState(false);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  const handleCashLimitPress = () => {
    setShowBalance(true);
    
    // Clear any existing timeout
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    
    // Set timeout to hide balance after 1 second
    timeoutRef.current = setTimeout(() => {
      setShowBalance(false);
    }, 1000);
  };

  return (
    <View style={[styles.headerTopSection, { paddingTop: insets.top }]}>
      <View style={styles.headerTop}>
        {/* Cash Limit */}
        <TouchableOpacity 
          style={styles.cashLimitContainer} 
          onPress={handleCashLimitPress}
          activeOpacity={0.7}
        >
          <View style={styles.cashLimitIcon}>
            <Ionicons name="arrow-up-circle" size={18} color={colors.primary} />
          </View>
          {showBalance ? (
            <Animated.Text 
              key="balance"
              entering={FadeIn.duration(600)} 
              exiting={FadeOut.duration(600)}
              style={styles.cashLimitLabel}
            >
              ৳{cashLimit.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
            </Animated.Text>
          ) : (
            <Animated.Text 
              key="label"
              entering={FadeIn.duration(300)} 
              exiting={FadeOut.duration(300)}
              style={styles.cashLimitLabel}
            >
              Cash Limit
            </Animated.Text>
          )}
        </TouchableOpacity>

        {/* Divider */}
        <View style={styles.divider} />

        {/* CSCX Ticker */}
        <View style={styles.tickerItem}>
          <Text style={styles.tickerSymbol}>CSCX</Text>
          <Text style={[styles.tickerValue, { color: colors.danger }]}>
            {cscxValue.toFixed(2)}
          </Text>
        </View>

        {/* Divider */}
        <View style={styles.divider} />

        {/* DSEX Ticker */}
        <View style={styles.tickerItem}>
          <Text style={styles.tickerSymbol}>DSEX</Text>
          <Text style={[styles.tickerValue, { color: colors.danger }]}>
            {dsexValue.toFixed(2)}
          </Text>
        </View>

        {/* Divider */}
        <View style={styles.divider} />

        {/* Notification Icon */}
        <TouchableOpacity style={styles.iconButton}>
          <Ionicons name="notifications-outline" size={22} color={colors.text} />
          <View style={styles.notificationBadge}>
            <Text style={styles.badgeText}>9+</Text>
          </View>
        </TouchableOpacity>

        {/* Search Icon */}
        <TouchableOpacity style={styles.iconButton}>
          <Ionicons name="search-outline" size={22} color={colors.text} />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const createStyles = (colors: any) => StyleSheet.create({
  headerTopSection: {
    backgroundColor: colors.surface,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
    ...Platform.select({
      ios: {
        shadowColor: colors.shadow,
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
      },
      android: {
        elevation: 4,
      },
    }),
  },
  headerTop: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingTop: 12,
    paddingBottom: 8,
  },
  cashLimitContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  cashLimitIcon: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: colors.primaryLight,
    alignItems: 'center',
    justifyContent: 'center',
  },
  cashLimitLabel: {
    fontSize: 12,
    fontWeight: '600',
    color: colors.text,
  },
  divider: {
    width: 1,
    height: 20,
    backgroundColor: colors.border,
  },
  tickerItem: {
    alignItems: 'center',
  },
  tickerSymbol: {
    fontSize: 10,
    fontWeight: '600',
    color: colors.textSecondary,
  },
  tickerValue: {
    fontSize: 12,
    fontWeight: '700',
    marginTop: 2,
  },
  iconButton: {
    width: 36,
    height: 36,
    borderRadius: 18,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
  },
  notificationBadge: {
    position: 'absolute',
    top: 4,
    right: 4,
    backgroundColor: colors.danger,
    borderRadius: 8,
    minWidth: 16,
    height: 16,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 4,
  },
  badgeText: {
    color: '#ffffff',
    fontSize: 9,
    fontWeight: '700',
  },
});
