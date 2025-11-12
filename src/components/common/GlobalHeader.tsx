// ============================================
// GLOBAL HEADER COMPONENT - Tickers Only
// Fixed header with tickers for all pages
// Theme-aware with dynamic colors
// ============================================

import { useTheme } from '@/src/contexts/ThemeContext';
import { Ionicons } from '@expo/vector-icons';
import React, { useEffect, useRef, useState } from 'react';
import { Platform, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import Animated, { FadeIn, FadeOut, useAnimatedStyle, useSharedValue, withRepeat, withSequence, withTiming } from 'react-native-reanimated';
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
  const { colors, fonts } = useTheme();
  const insets = useSafeAreaInsets();
  const styles = createStyles(colors, fonts);
  const [showBalance, setShowBalance] = useState(false);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  
  // Blinking animation for market status dot
  const opacity = useSharedValue(1);

  useEffect(() => {
    // Blinking animation: fade in and out repeatedly
    opacity.value = withRepeat(
      withSequence(
        withTiming(0.3, { duration: 800 }),
        withTiming(1, { duration: 800 })
      ),
      -1, // infinite repeat
      false
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const animatedDotStyle = useAnimatedStyle(() => ({
    opacity: opacity.value,
  }));

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
    }, 5000);
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
              entering={FadeIn.duration(1000)} 
              exiting={FadeOut.duration(1000)}
              style={styles.cashLimitLabel}
            >
              ৳{cashLimit.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
            </Animated.Text>
          ) : (
            <Animated.Text 
              key="label"
              entering={FadeIn.duration(1000)} 
              exiting={FadeOut.duration(1000)}
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
          <View style={styles.tickerHeader}>
            <Ionicons name="trending-down" size={12} color={colors.danger} />
            <Text style={styles.tickerSymbol}>CSCX</Text>
          </View>
          <Text style={[styles.tickerValue, { color: colors.danger }]}>
            {cscxValue.toFixed(2)}
          </Text>
        </View>

        {/* Divider */}
        <View style={styles.divider} />

        {/* DSEX Ticker */}
        <View style={styles.tickerItem}>
          <View style={styles.tickerHeader}>
            <Ionicons name="trending-down" size={12} color={colors.danger} />
            <Text style={styles.tickerSymbol}>DSEX</Text>
          </View>
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

        {/* Market Status */}
        <View style={styles.marketStatus}>
          <Animated.View 
            style={[
              styles.marketDot, 
              { backgroundColor: colors.success },
              animatedDotStyle
            ]}
          />
          <Text style={styles.marketStatusText}>OPEN</Text>
        </View>
      </View>
    </View>
  );
};

const createStyles = (colors: any, fonts: any) => StyleSheet.create({
  headerTopSection: {
    paddingTop:10,
    backgroundColor: colors.surface,
    borderBottomWidth: 1.5,
    borderBottomColor: colors.border,
    overflow: 'visible',
    ...Platform.select({
      ios: {
        shadowColor: colors.shadow,
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
      },
      android: {
        // elevation: 4,
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
    overflow: 'visible',
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
    fontFamily: fonts.semibold,
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
  tickerHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  tickerSymbol: {
    fontSize: 10,
    fontFamily: fonts.semibold,
    color: colors.textSecondary,
  },
  tickerValue: {
    fontSize: 12,
    fontFamily: fonts.bold,
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
    fontFamily: fonts.bold,
  },
  marketStatus: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 12,
    backgroundColor: colors.successLight || colors.primaryLight,
    minHeight: 25,
    overflow: 'visible',
  },
  marketDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
  },
  marketStatusText: {
    fontSize: 11,
    fontFamily: fonts.bold,
    color: colors.success,
    letterSpacing: 0.5,
  },
});
