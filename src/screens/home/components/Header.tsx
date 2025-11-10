// ============================================
// HEADER COMPONENT - Market Dashboard
// Fixed header with tickers, logo, and exchange toggle
// ============================================

import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import { headerStyles } from '../styles/homeStyles';

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
  return (
    <>
      {/* Top Section with Gray Background */}
      <View style={headerStyles.headerTopSection}>
        <View style={headerStyles.headerTop}>
          {/* Cash Limit */}
          <View style={headerStyles.cashLimitContainer}>
            <View style={headerStyles.cashLimitIcon}>
              <Ionicons name="arrow-up-circle" size={18} color="#10b981" />
            </View>
            <Text style={headerStyles.cashLimitLabel}>Cash Limit</Text>
          </View>

          {/* Divider */}
          <View style={headerStyles.divider} />

          {/* CSCX Ticker */}
          <View style={headerStyles.tickerItem}>
            <Text style={headerStyles.tickerSymbol}>CSCX</Text>
            <Text style={[headerStyles.tickerValue, { color: '#ef4444' }]}>
              {cscxValue.toFixed(2)}
            </Text>
          </View>

          {/* Divider */}
          <View style={headerStyles.divider} />

          {/* DSEX Ticker */}
          <View style={headerStyles.tickerItem}>
            <Text style={headerStyles.tickerSymbol}>DSEX</Text>
            <Text style={[headerStyles.tickerValue, { color: '#ef4444' }]}>
              {dsexValue.toFixed(2)}
            </Text>
          </View>

          {/* Divider */}
          <View style={headerStyles.divider} />

          {/* Notification Icon */}
          <TouchableOpacity style={headerStyles.iconButton}>
            <Ionicons name="notifications-outline" size={22} color="#111827" />
            <View style={headerStyles.notificationBadge}>
              <Text style={headerStyles.badgeText}>9+</Text>
            </View>
          </TouchableOpacity>

          {/* Search Icon */}
          <TouchableOpacity style={headerStyles.iconButton}>
            <Ionicons name="search-outline" size={22} color="#111827" />
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
