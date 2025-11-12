import { useTheme } from '@/src/contexts/ThemeContext';
import type { Stock } from '@/src/types';
import { Ionicons } from '@expo/vector-icons';
import React, { useEffect, useState } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import Animated, {
    Easing,
    useAnimatedStyle,
    useSharedValue,
    withSpring,
    withTiming,
} from 'react-native-reanimated';

interface MarketDepthProps {
  stock: Stock;
}

interface DepthLevel {
  price: number;
  quantity: number;
  total: number;
}

export const MarketDepth: React.FC<MarketDepthProps> = ({ stock }) => {
  const { colors, fonts } = useTheme();
  const [isExpanded, setIsExpanded] = useState(true);

  // Animated values
  const contentHeight = useSharedValue(1);
  const contentOpacity = useSharedValue(1);
  const chevronRotation = useSharedValue(0);

  // Update animations when expanded state changes
  useEffect(() => {
    if (isExpanded) {
      contentHeight.value = withSpring(1, { 
        damping: 25,
        stiffness: 120,
      });
      contentOpacity.value = withTiming(1, { 
        duration: 350,
        easing: Easing.out(Easing.ease),
      });
      chevronRotation.value = withTiming(180, {
        duration: 350,
        easing: Easing.out(Easing.cubic),
      });
    } else {
      contentHeight.value = withTiming(0, {
        duration: 300,
        easing: Easing.in(Easing.ease),
      });
      contentOpacity.value = withTiming(0, { 
        duration: 250,
        easing: Easing.in(Easing.ease),
      });
      chevronRotation.value = withTiming(0, {
        duration: 300,
        easing: Easing.out(Easing.cubic),
      });
    }
  }, [isExpanded, contentHeight, contentOpacity, chevronRotation]);

  // Animated styles
  const animatedContentStyle = useAnimatedStyle(() => {
    return {
      maxHeight: contentHeight.value * 500, // Max height when expanded
      opacity: contentOpacity.value,
      overflow: 'hidden',
    };
  });

  const animatedChevronStyle = useAnimatedStyle(() => {
    return {
      transform: [{ rotate: `${chevronRotation.value}deg` }],
    };
  });

  // Generate realistic market depth data
  const generateDepthData = (): { bids: DepthLevel[]; asks: DepthLevel[] } => {
    const basePrice = stock.price;
    const bids: DepthLevel[] = [];
    const asks: DepthLevel[] = [];

    // Generate 5 bid levels (below current price)
    for (let i = 0; i < 5; i++) {
      const price = basePrice - (i + 1) * 0.1;
      const quantity = Math.floor(Math.random() * 500000) + 100000;
      bids.push({
        price: parseFloat(price.toFixed(2)),
        quantity,
        total: parseFloat((price * quantity).toFixed(2)),
      });
    }

    // Generate 5 ask levels (above current price)
    for (let i = 0; i < 5; i++) {
      const price = basePrice + (i + 1) * 0.1;
      const quantity = Math.floor(Math.random() * 500000) + 100000;
      asks.push({
        price: parseFloat(price.toFixed(2)),
        quantity,
        total: parseFloat((price * quantity).toFixed(2)),
      });
    }

    return { bids, asks };
  };

  const { bids, asks } = generateDepthData();

  // Calculate max quantity for percentage bars
  const maxQuantity = Math.max(
    ...bids.map((b) => b.quantity),
    ...asks.map((a) => a.quantity)
  );

  // Calculate buy/sell pressure percentages
  const totalBidQty = bids.reduce((sum, b) => sum + b.quantity, 0);
  const totalAskQty = asks.reduce((sum, a) => sum + a.quantity, 0);
  const totalQty = totalBidQty + totalAskQty;
  const buyPressure = ((totalBidQty / totalQty) * 100).toFixed(2);
  const sellPressure = ((totalAskQty / totalQty) * 100).toFixed(2);

  const formatNumber = (num: number): string => {
    return num.toLocaleString('en-US', { maximumFractionDigits: 0 });
  };

  const styles = StyleSheet.create({
    container: {
      backgroundColor: colors.card,
      borderRadius: 16,
      marginHorizontal: 16,
      marginTop: 16,
      marginBottom: 16,
      overflow: 'hidden',
      shadowColor: colors.shadow,
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.1,
      shadowRadius: 8,
      elevation: 3,
    },
    header: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      paddingHorizontal: 16,
      paddingVertical: 14,
      borderBottomWidth: 1,
      borderBottomColor: colors.borderLight,
    },
    headerLeft: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: 8,
    },
    title: {
      fontSize: 16,
      fontWeight: '600',
      color: colors.text,
    },
    expandButton: {
      padding: 4,
    },
    pressureBar: {
      flexDirection: 'row',
      height: 6,
    },
    buyBar: {
      backgroundColor: colors.success,
    },
    sellBar: {
      backgroundColor: colors.danger,
    },
    pressureLabels: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      paddingHorizontal: 16,
      paddingTop: 8,
      paddingBottom: 12,
    },
    pressureLabel: {
      fontSize: 12,
      fontWeight: '600',
    },
    buyPressureText: {
      color: colors.success,
    },
    sellPressureText: {
      color: colors.danger,
    },
    content: {
      paddingHorizontal: 16,
      paddingBottom: 16,
    },
    tableHeader: {
      flexDirection: 'row',
      paddingVertical: 10,
      borderBottomWidth: 1,
      borderBottomColor: colors.borderLight,
    },
    tableHeaderCell: {
      fontSize: 11,
      fontWeight: '600',
      color: colors.textSecondary,
      textTransform: 'uppercase',
      letterSpacing: 0.5,
    },
    bidQtyHeader: {
      flex: 1,
      textAlign: 'right',
    },
    bidPriceHeader: {
      flex: 1,
      textAlign: 'right',
      paddingRight: 8,
    },
    askPriceHeader: {
      flex: 1,
      textAlign: 'left',
      paddingLeft: 8,
    },
    askQtyHeader: {
      flex: 1,
      textAlign: 'left',
    },
    tableRow: {
      flexDirection: 'row',
      paddingVertical: 8,
      position: 'relative',
    },
    depthBar: {
      position: 'absolute',
      top: 0,
      bottom: 0,
      opacity: 0.15,
    },
    bidBar: {
      right: 0,
      backgroundColor: colors.success,
    },
    askBar: {
      left: 0,
      backgroundColor: colors.danger,
    },
    cell: {
      flex: 1,
      fontSize: 13,
      fontWeight: '500',
    },
    bidQty: {
      textAlign: 'right',
      color: colors.textSecondary,
    },
    bidPrice: {
      textAlign: 'right',
      color: colors.success,
      fontWeight: '600',
      paddingRight: 8,
    },
    askPrice: {
      textAlign: 'left',
      color: colors.danger,
      fontWeight: '600',
      paddingLeft: 8,
    },
    askQty: {
      textAlign: 'left',
      color: colors.textSecondary,
    },
    moreButton: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
      paddingVertical: 10,
      marginTop: 8,
      borderTopWidth: 1,
      borderTopColor: colors.borderLight,
    },
    moreButtonText: {
      fontSize: 13,
      fontWeight: '600',
      color: colors.info,
      marginRight: 4,
    },
  });

  const toggleExpanded = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <Pressable style={styles.header} onPress={toggleExpanded}>
        <View style={styles.headerLeft}>
          <Ionicons name="layers-outline" size={18} color={colors.text} />
          <Text style={styles.title}>Market Depth</Text>
        </View>
        <Animated.View style={animatedChevronStyle}>
          <Ionicons name="chevron-down" size={20} color={colors.textSecondary} />
        </Animated.View>
      </Pressable>

      {/* Animated Content */}
      <Animated.View style={animatedContentStyle}>
        {/* Buy/Sell Pressure Bar */}
        <View style={styles.pressureBar}>
          <View style={[styles.buyBar, { width: `${buyPressure}%` as any }]} />
          <View style={[styles.sellBar, { width: `${sellPressure}%` as any }]} />
        </View>

        <View style={styles.pressureLabels}>
          <Text style={[styles.pressureLabel, styles.buyPressureText]}>{buyPressure}%</Text>
          <Text style={[styles.pressureLabel, styles.sellPressureText]}>{sellPressure}%</Text>
        </View>

        {/* Table Content */}
        <View style={styles.content}>
        {/* Table Header */}
        <View style={styles.tableHeader}>
          <Text style={[styles.tableHeaderCell, styles.bidQtyHeader]}>BID Q</Text>
          <Text style={[styles.tableHeaderCell, styles.bidPriceHeader]}>BID ↑</Text>
          <Text style={[styles.tableHeaderCell, styles.askPriceHeader]}>ASK ↓</Text>
          <Text style={[styles.tableHeaderCell, styles.askQtyHeader]}>ASK Q</Text>
        </View>

        {/* Table Rows - Show 3 levels by default */}
        {Array.from({ length: 3 }).map((_, index) => {
          const bid = bids[index];
          const ask = asks[index];
          const bidWidth = (bid.quantity / maxQuantity) * 50; // Max 50% width
          const askWidth = (ask.quantity / maxQuantity) * 50;

          return (
            <View key={index} style={styles.tableRow}>
              {/* Bid depth bar */}
              <View style={[styles.depthBar, styles.bidBar, { width: `${bidWidth}%` as any }]} />
              {/* Ask depth bar */}
              <View style={[styles.depthBar, styles.askBar, { width: `${askWidth}%` as any }]} />

              {/* Bid Quantity */}
              <Text style={[styles.cell, styles.bidQty]}>{formatNumber(bid.quantity)}</Text>

              {/* Bid Price */}
              <Text style={[styles.cell, styles.bidPrice]}>{bid.price.toFixed(1)}</Text>

              {/* Ask Price */}
              <Text style={[styles.cell, styles.askPrice]}>{ask.price.toFixed(1)}</Text>

              {/* Ask Quantity */}
              <Text style={[styles.cell, styles.askQty]}>{formatNumber(ask.quantity)}</Text>
            </View>
          );
        })}

        {/* More Button */}
        {/* <Pressable style={styles.moreButton}>
          <Text style={styles.moreButtonText}>More</Text>
          <Ionicons name="chevron-down" size={16} color={colors.info} />
        </Pressable> */}
        </View>
      </Animated.View>
    </View>
  );
};
