// ============================================
// HEADER COMPONENT - Market Dashboard
// Fixed header with tickers, logo, and exchange toggle
// Theme-aware with dynamic colors
// ============================================

import { useTheme } from '@/src/contexts/ThemeContext';
import { Ionicons } from '@expo/vector-icons';
import React, { useEffect, useRef, useState } from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import Animated, { FadeIn, FadeOut } from 'react-native-reanimated';
import { createHeaderStyles } from '../styles/homeStyles';

interface HeaderProps {
  cashLimit: number;
  cscxValue: number;
  dsexValue: number;
  selectedExchange: 'DSE' | 'CSE';
  onExchangeChange: (exchange: 'DSE' | 'CSE') => void;
}

export const Header: React.FC<HeaderProps> = ({
  cashLimit,
  cscxValue,
  dsexValue,
  selectedExchange,
  onExchangeChange,
}) => {
  const { colors } = useTheme();
  const headerStyles = createHeaderStyles(colors);
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
    <>
      {/* Top Section - Tickers */}
      <View style={headerStyles.headerTopSection}>
        <View style={headerStyles.headerTop}>
          {/* Cash Limit */}
          <TouchableOpacity 
            style={headerStyles.cashLimitContainer} 
            onPress={handleCashLimitPress}
            activeOpacity={0.7}
          >
            <View style={headerStyles.cashLimitIcon}>
              <Ionicons name="arrow-up-circle" size={18} color={colors.primary} />
            </View>
            {showBalance ? (
              <Animated.Text 
                key="balance"
                entering={FadeIn.duration(300)} 
                exiting={FadeOut.duration(300)}
                style={headerStyles.cashLimitLabel}
              >
                ৳{cashLimit.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
              </Animated.Text>
            ) : (
              <Animated.Text 
                key="label"
                entering={FadeIn.duration(300)} 
                exiting={FadeOut.duration(300)}
                style={headerStyles.cashLimitLabel}
              >
                Cash Limit
              </Animated.Text>
            )}
          </TouchableOpacity>

          {/* Divider */}
          <View style={headerStyles.divider} />

          {/* CSCX Ticker */}
          <View style={headerStyles.tickerItem}>
            <Text style={headerStyles.tickerSymbol}>CSCX</Text>
            <Text style={[headerStyles.tickerValue, { color: colors.danger }]}>
              {cscxValue.toFixed(2)}
            </Text>
          </View>

          {/* Divider */}
          <View style={headerStyles.divider} />

          {/* DSEX Ticker */}
          <View style={headerStyles.tickerItem}>
            <Text style={headerStyles.tickerSymbol}>DSEX</Text>
            <Text style={[headerStyles.tickerValue, { color: colors.danger }]}>
              {dsexValue.toFixed(2)}
            </Text>
          </View>

          {/* Divider */}
          <View style={headerStyles.divider} />

          {/* Notification Icon */}
          <TouchableOpacity style={headerStyles.iconButton}>
            <Ionicons name="notifications-outline" size={22} color={colors.text} />
            <View style={headerStyles.notificationBadge}>
              <Text style={headerStyles.badgeText}>9+</Text>
            </View>
          </TouchableOpacity>

          {/* Search Icon */}
          <TouchableOpacity style={headerStyles.iconButton}>
            <Ionicons name="search-outline" size={22} color={colors.text} />
          </TouchableOpacity>
        </View>
      </View>

      {/* Bottom Section with Gray Background - Logo & Exchange Toggle */}
      <View style={headerStyles.headerBottomSection}>
        <View style={headerStyles.headerMiddle}>
          <View style={headerStyles.logoContainer}>
            <Text style={headerStyles.logoText}>Xpert</Text>
          </View>

          <View style={headerStyles.exchangeToggle}>
            <TouchableOpacity
              style={[
                headerStyles.exchangeButton,
                selectedExchange === 'DSE' && headerStyles.exchangeButtonActive,
              ]}
              onPress={() => onExchangeChange('DSE')}
            >
              <Text
                style={[
                  headerStyles.exchangeButtonText,
                  selectedExchange === 'DSE' && headerStyles.exchangeButtonTextActive,
                ]}
              >
                DSE
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[
                headerStyles.exchangeButton,
                selectedExchange === 'CSE' && headerStyles.exchangeButtonActive,
              ]}
              onPress={() => onExchangeChange('CSE')}
            >
              <Text
                style={[
                  headerStyles.exchangeButtonText,
                  selectedExchange === 'CSE' && headerStyles.exchangeButtonTextActive,
                ]}
              >
                CSE
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </>
  );
};
