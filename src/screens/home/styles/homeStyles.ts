// ============================================
// STYLES - Home Screen
// All StyleSheet definitions for the market dashboard
// Theme-aware styles using color parameters
// ============================================

import { Platform, StyleSheet } from 'react-native';

export const createHomeStyles = (colors: any) => StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  scrollContent: {
    flex: 1,
  },
});

// Header Styles
export const createHeaderStyles = (colors: any) => StyleSheet.create({
  headerTopSection: {
    backgroundColor: colors.surface,
    paddingHorizontal: 16,
    paddingVertical: 12,
    ...Platform.select({
      ios: {
        shadowColor: colors.shadow,
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.05,
        shadowRadius: 2,
      },
      android: {
        elevation: 1,
      },
    }),
  },
  headerBottomSection: {
    backgroundColor: colors.background,
    paddingHorizontal: 16,
    paddingVertical: 12,
    marginTop: 2,
    ...Platform.select({
      ios: {
        shadowColor: colors.shadow,
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
      },
      android: {
        elevation: 2,
      },
    }),
  },
  headerTop: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  cashLimitContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.surfaceSecondary,
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 20,
    gap: 6,
  },
  cashLimitIcon: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: colors.surfaceSecondary,
    justifyContent: 'center',
    alignItems: 'center',
  },
  cashLimitLabel: {
    fontSize: 13,
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
    fontSize: 11,
    color: colors.textSecondary,
    fontWeight: '600',
  },
  tickerValue: {
    fontSize: 14,
    fontWeight: '700',
  },
  iconButton: {
    position: 'relative',
  },
  notificationBadge: {
    position: 'absolute',
    top: -4,
    right: -4,
    backgroundColor: colors.danger,
    borderRadius: 10,
    minWidth: 18,
    height: 18,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 4,
  },
  badgeText: {
    color: '#ffffff',
    fontSize: 9,
    fontWeight: '700',
  },
  headerMiddle: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  logoContainer: {
    paddingVertical: 8,
  },
  logoText: {
    fontSize: 24,
    fontWeight: '900',
    color: colors.primary,
    letterSpacing: 1,
  },
  exchangeToggle: {
    flexDirection: 'row',
    backgroundColor: colors.surface,
    borderRadius: 20,
    padding: 4,
  },
  exchangeButton: {
    paddingHorizontal: 16,
    paddingVertical: 6,
    borderRadius: 16,
  },
  exchangeButtonActive: {
    backgroundColor: colors.danger,
  },
  exchangeButtonText: {
    fontSize: 13,
    fontWeight: '700',
    color: colors.textSecondary,
  },
  exchangeButtonTextActive: {
    color: '#ffffff',
  },
});

// Index Cards Styles
export const createIndexCardStyles = (colors: any) => StyleSheet.create({
  indicesRow: {
    flexDirection: 'row',
    gap: 8,
    paddingHorizontal: 16,
    paddingTop: 16,
  },
  indexCard: {
    flex: 1,
    backgroundColor: colors.card,
    borderRadius: 12,
    padding: 12,
    ...Platform.select({
      ios: {
        shadowColor: colors.shadow,
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.1,
        shadowRadius: 2,
      },
      android: {
        elevation: 2,
      },
    }),
  },
  indexSymbol: {
    fontSize: 14,
    fontWeight: '700',
    color: colors.text,
    marginBottom: 4,
  },
  indexValue: {
    fontSize: 16,
    fontWeight: '700',
    color: colors.text,
    marginBottom: 8,
  },
  miniChart: {
    marginBottom: 8,
  },
  indexChange: {
    fontSize: 13,
    fontWeight: '600',
  },
  indexChangePercent: {
    fontSize: 11,
    fontWeight: '600',
  },
});

// Market Stats Styles
export const createMarketStatsStyles = (colors: any) => StyleSheet.create({
  statsRow: {
    flexDirection: 'row',
    gap: 8,
    paddingHorizontal: 16,
    marginTop: 16,
  },
  statBox: {
    flex: 1,
    borderRadius: 12,
    padding: 16,
  },
  statValue: {
    fontSize: 16,
    fontWeight: '700',
    color: colors.text,
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 11,
    color: colors.textSecondary,
    marginBottom: 8,
  },
  statPercent: {
    fontSize: 14,
    fontWeight: '700',
    color: colors.text,
    marginBottom: 2,
  },
  statType: {
    fontSize: 9,
    fontWeight: '600',
    color: colors.textSecondary,
    letterSpacing: 0.5,
  },
});

// Advance Decline Styles
export const createAdvanceDeclineStyles = (colors: any) => StyleSheet.create({
  container: {
    backgroundColor: colors.card,
    borderRadius: 12,
    padding: 16,
    marginHorizontal: 16,
    marginTop: 16,
    ...Platform.select({
      ios: {
        shadowColor: colors.shadow,
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.1,
        shadowRadius: 2,
      },
      android: {
        elevation: 2,
      },
    }),
  },
  title: {
    fontSize: 18,
    fontWeight: '700',
    color: colors.text,
    marginBottom: 16,
  },
  legend: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 4,
    marginTop: 6,
  },
  legendItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  legendDot: {
    width: 16,
    height: 16,
    borderRadius: 4,
  },
  legendText: {
    fontSize: 13,
    fontWeight: '600',
    color: colors.text,
  },
});

// Featured Lists Styles
export const createFeaturedListsStyles = (colors: any) => StyleSheet.create({
  container: {
    backgroundColor: colors.card,
    borderRadius: 12,
    padding: 16,
    marginHorizontal: 16,
    marginTop: 16,
    ...Platform.select({
      ios: {
        shadowColor: colors.shadow,
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.1,
        shadowRadius: 2,
      },
      android: {
        elevation: 2,
      },
    }),
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  title: {
    fontSize: 18,
    fontWeight: '700',
    color: colors.text,
  },
  tabsContainer: {
    marginBottom: 16,
  },
  tab: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    marginRight: 8,
    backgroundColor: colors.surfaceSecondary,
    borderRadius: 20,
  },
  tabActive: {
    backgroundColor: colors.infoLight,
  },
  tabText: {
    fontSize: 13,
    fontWeight: '600',
    color: colors.textSecondary,
    fontStyle: 'italic',
  },
  tabTextActive: {
    color: colors.info,
  },
  stockList: {
    gap: 0,
  },
  stockRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: colors.borderLight,
  },
  stockLeft: {
    width: 100,
  },
  stockSymbol: {
    fontSize: 14,
    fontWeight: '700',
    color: colors.text,
    marginBottom: 2,
  },
  stockPrice: {
    fontSize: 12,
    color: colors.textSecondary,
  },
  stockChart: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  chartSvg: {
    overflow: 'visible',
  },
  stockRight: {
    width: 80,
    alignItems: 'flex-end',
  },
  stockChange: {
    fontSize: 14,
    fontWeight: '700',
    marginBottom: 2,
  },
  stockChangePercent: {
    fontSize: 11,
    fontWeight: '600',
  },
});

// Top Sectors Styles
export const createTopSectorsStyles = (colors: any) => StyleSheet.create({
  container: {
    backgroundColor: colors.card,
    borderRadius: 12,
    padding: 16,
    marginHorizontal: 16,
    marginTop: 16,
    ...Platform.select({
      ios: {
        shadowColor: colors.shadow,
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.1,
        shadowRadius: 2,
      },
      android: {
        elevation: 2,
      },
    }),
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  title: {
    fontSize: 18,
    fontWeight: '700',
    color: colors.text,
  },
  sectorsList: {
    gap: 12,
  },
  sectorRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  sectorName: {
    width: 90,
    fontSize: 13,
    fontWeight: '600',
    color: colors.text,
    textAlign: 'right',
  },
  sectorBarContainer: {
    flex: 1,
    height: 20,
    backgroundColor: colors.surfaceSecondary,
    borderRadius: 10,
    overflow: 'hidden',
  },
  sectorBar: {
    height: '100%',
    borderRadius: 10,
  },
  sectorValue: {
    width: 70,
    fontSize: 13,
    fontWeight: '600',
    color: colors.text,
    textAlign: 'left',
  },
  showMoreButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 4,
    marginTop: 16,
    paddingVertical: 8,
  },
  showMoreText: {
    fontSize: 14,
    fontWeight: '600',
    color: colors.primary,
  },
});
