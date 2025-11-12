import { GlobalHeader } from '@/src/components/common/GlobalHeader';
import { useTheme } from '@/src/contexts/ThemeContext';
import { useMarketDataUpdates } from '@/src/screens/home/hooks/useMarketData';
import { useAppDispatch, useAppSelector } from '@/src/store/hooks';
import { logout } from '@/src/store/slices/authSlice';
import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import React, { useState } from 'react';
import { Alert, ScrollView, Text, TouchableOpacity, View } from 'react-native';
import { BalanceCard } from './components/BalanceCard';
import { Header } from './components/Header';
import { MenuSection } from './components/MenuSection';
import { QuickStats } from './components/QuickStats';
import { ThemeModal } from './components/ThemeModal';
import { UserCard } from './components/UserCard';
import { useOrderStats } from './hooks/useOrderStats';
import { createMenuStyles, createProfileStyles } from './styles/profileStyles';

export default function ProfileScreen() {
  const dispatch = useAppDispatch();
  const { themeMode, setThemeMode, colors, fonts } = useTheme();
  const profileStyles = createProfileStyles(colors, fonts);
  const menuStyles = createMenuStyles(colors, fonts);
  const [showThemeModal, setShowThemeModal] = useState(false);
  const marketData = useMarketDataUpdates();

  // Redux selectors
  const user = useAppSelector((state: any) => state.auth.user);
  const portfolio = useAppSelector((state: any) => state.portfolio.portfolio);

  // Custom hooks
  const { activeOrders, completedOrders } = useOrderStats();

  const handleLogout = () => {
    Alert.alert('Logout', 'Are you sure you want to logout?', [
      { text: 'Cancel', style: 'cancel' },
      {
        text: 'Logout',
        style: 'destructive',
        onPress: () => {
          dispatch(logout());
          router.replace('/login');
        },
      },
    ]);
  };

  const handleSupport = () => {
    Alert.alert(
      'Support',
      'Email: support@xperttrading.com\nPhone: 1-800-XPERT-TRADE'
    );
  };

  const handleAbout = () => {
    Alert.alert(
      'About Xpert Trading',
      'Version 1.0.1\n\nXpert Trading Mobile App\nProfessional Trading Platform\n\n© 2025 Xpert Trading. All rights reserved.'
    );
  };

  // Menu configurations
  const accountMenuItems = [
    {
      icon: 'list-outline' as const,
      label: 'Order History',
      badge: activeOrders,
      onPress: () => {},
    },
    {
      icon: 'swap-horizontal-outline' as const,
      label: 'Transactions',
      onPress: () => {},
    },
    {
      icon: 'document-text-outline' as const,
      label: 'Tax Documents',
      onPress: () => {},
    },
  ];

  const settingsMenuItems = [
    {
      icon: 'notifications-outline' as const,
      label: 'Notifications',
      onPress: () => {},
    },
    {
      icon: 'shield-checkmark-outline' as const,
      label: 'Security',
      onPress: () => {},
    },
    {
      icon: 'color-palette-outline' as const,
      label: 'Theme',
      value: themeMode === 'system' ? 'System' : themeMode === 'light' ? 'Light' : 'Dark',
      onPress: () => setShowThemeModal(true),
    },
    {
      icon: 'language-outline' as const,
      label: 'Language',
      value: 'English',
      onPress: () => {},
    },
  ];

  const supportMenuItems = [
    {
      icon: 'help-circle-outline' as const,
      label: 'Help & Support',
      onPress: handleSupport,
    },
    {
      icon: 'star-outline' as const,
      label: 'Rate App',
      onPress: () => {},
    },
    {
      icon: 'information-circle-outline' as const,
      label: 'About',
      value: 'v1.0.1',
      onPress: handleAbout,
    },
  ];

  return (
    <View style={profileStyles.container}>
      <GlobalHeader
        cashLimit={marketData.cashLimit}
        cscxValue={marketData.cscx.value}
        dsexValue={marketData.dsex.value}
      />
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={profileStyles.scrollContent}>
        <Header />
        <UserCard user={user} />
        <BalanceCard
          balance={user?.balance || 0}
          totalInvestment={portfolio.totalInvestment}
          currentValue={portfolio.currentValue}
        />
        <QuickStats
          holdingsCount={portfolio.positions.length}
          activeOrders={activeOrders}
          completedOrders={completedOrders}
        />

        <MenuSection title="Account" items={accountMenuItems} />
        <MenuSection title="Settings" items={settingsMenuItems} />
        <MenuSection title="Support" items={supportMenuItems} />

        {/* Logout Button */}
        <TouchableOpacity style={menuStyles.logoutButton} onPress={handleLogout}>
          <Ionicons name="log-out-outline" size={22} color="#ef4444" />
          <Text style={menuStyles.logoutText}>Logout</Text>
        </TouchableOpacity>
      </ScrollView>

      <ThemeModal
        visible={showThemeModal}
        themeMode={themeMode}
        onClose={() => setShowThemeModal(false)}
        onSelectTheme={setThemeMode}
      />
    </View>
  );
}
