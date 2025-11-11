// ============================================
// STYLES - Portfolio Screen
// All StyleSheet definitions for portfolio components
// Theme-aware styles using color parameters
// ============================================

import { Platform, StyleSheet } from 'react-native';

export const createPortfolioStyles = (colors: any) => StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 32,
  },
  section: {
    marginHorizontal: 16,
    marginBottom: 24,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: colors.text,
  },
  sectionCount: {
    fontSize: 14,
    fontWeight: '600',
    color: colors.textSecondary,
    backgroundColor: colors.surfaceSecondary,
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
  },
});

// Header Styles
export const createHeaderStyles = (colors: any) => StyleSheet.create({
  header: {
    backgroundColor: colors.surface,
    paddingTop: Platform.OS === 'ios' ? 60 : 48,
    paddingHorizontal: 16,
    paddingBottom: 20,
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
  headerTitle: {
    fontSize: 28,
    fontWeight: '700',
    color: colors.text,
  },
});

// Portfolio Summary Styles
export const createSummaryStyles = (colors: any) => StyleSheet.create({
  summaryCard: {
    margin: 16,
    backgroundColor: colors.card,
    borderRadius: 16,
    padding: 20,
    ...Platform.select({
      ios: {
        shadowColor: colors.shadow,
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 8,
      },
      android: {
        elevation: 4,
      },
    }),
  },
  summaryHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  summaryLabel: {
    fontSize: 14,
    color: colors.textSecondary,
    fontWeight: '500',
  },
  summaryValue: {
    fontSize: 32,
    fontWeight: '700',
    color: colors.text,
    marginBottom: 20,
  },
  summaryRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: 16,
    borderTopWidth: 1,
    borderTopColor: colors.borderLight,
  },
  summaryItem: {
    flex: 1,
    alignItems: 'center',
  },
  summaryItemLabel: {
    fontSize: 12,
    color: colors.textTertiary,
    marginBottom: 6,
  },
  summaryItemValue: {
    fontSize: 14,
    fontWeight: '700',
    color: colors.text,
  },
  summaryDivider: {
    width: 1,
    height: 30,
    backgroundColor: colors.border,
  },
  todaysChangeContainer: {
    marginTop: 16,
    paddingTop: 16,
    borderTopWidth: 1,
    borderTopColor: colors.borderLight,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  todaysChangeRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  todaysChangeLabel: {
    fontSize: 14,
    color: colors.textSecondary,
    fontWeight: '500',
  },
  todaysChangeValue: {
    fontSize: 16,
    fontWeight: '700',
  },
});

// Position Card Styles
export const createPositionStyles = (colors: any) => StyleSheet.create({
  positionsList: {
    gap: 12,
  },
  positionCard: {
    backgroundColor: colors.card,
    borderRadius: 12,
    padding: 16,
    ...Platform.select({
      ios: {
        shadowColor: colors.shadow,
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
      },
      android: {
        elevation: 2,
      },
    }),
  },
  positionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 12,
  },
  positionSymbol: {
    fontSize: 16,
    fontWeight: '700',
    color: colors.text,
  },
  positionName: {
    fontSize: 12,
    color: colors.textSecondary,
    marginTop: 2,
  },
  positionHeaderRight: {
    alignItems: 'flex-end',
  },
  positionValue: {
    fontSize: 16,
    fontWeight: '700',
    color: colors.text,
  },
  positionChangeRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    marginTop: 2,
  },
  positionChange: {
    fontSize: 12,
    fontWeight: '600',
  },
  positionDivider: {
    height: 1,
    backgroundColor: colors.borderLight,
    marginBottom: 12,
  },
  positionDetails: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 12,
  },
  positionDetailItem: {
    flex: 1,
  },
  positionDetailLabel: {
    fontSize: 11,
    color: colors.textTertiary,
    marginBottom: 4,
  },
  positionDetailValue: {
    fontSize: 13,
    fontWeight: '600',
    color: colors.text,
  },
  profitLossContainer: {
    backgroundColor: colors.surfaceSecondary,
    borderRadius: 8,
    padding: 12,
  },
  profitLossRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  profitLossLabel: {
    fontSize: 12,
    fontWeight: '600',
    color: colors.textSecondary,
  },
  profitLossValues: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  profitLossAmount: {
    fontSize: 14,
    fontWeight: '700',
  },
  profitLossPercent: {
    fontSize: 12,
    fontWeight: '600',
  },
});

// Sector Card Styles
export const createSectorStyles = (colors: any) => StyleSheet.create({
  sectorList: {
    gap: 12,
  },
  sectorCard: {
    backgroundColor: colors.card,
    borderRadius: 12,
    padding: 16,
    ...Platform.select({
      ios: {
        shadowColor: colors.shadow,
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
      },
      android: {
        elevation: 2,
      },
    }),
  },
  sectorHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  sectorLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  sectorColorDot: {
    width: 12,
    height: 12,
    borderRadius: 6,
  },
  sectorName: {
    fontSize: 14,
    fontWeight: '600',
    color: colors.text,
  },
  sectorPercentage: {
    fontSize: 14,
    fontWeight: '700',
    color: colors.text,
  },
  sectorBarContainer: {
    height: 6,
    backgroundColor: colors.surfaceSecondary,
    borderRadius: 3,
    overflow: 'hidden',
    marginBottom: 8,
  },
  sectorBar: {
    height: '100%',
    borderRadius: 3,
  },
  sectorValue: {
    fontSize: 13,
    color: colors.textSecondary,
    fontWeight: '500',
  },
});
