// ============================================
// STYLES - Portfolio Screen
// All StyleSheet definitions for portfolio components
// ============================================

import { Platform, StyleSheet } from 'react-native';

export const portfolioStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f9fafb',
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
    color: '#111827',
  },
  sectionCount: {
    fontSize: 14,
    fontWeight: '600',
    color: '#6b7280',
    backgroundColor: '#f3f4f6',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
  },
});

// Header Styles
export const headerStyles = StyleSheet.create({
  header: {
    backgroundColor: '#ffffff',
    paddingTop: Platform.OS === 'ios' ? 60 : 48,
    paddingHorizontal: 16,
    paddingBottom: 20,
    ...Platform.select({
      ios: {
        shadowColor: '#000',
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
    color: '#111827',
  },
});

// Portfolio Summary Styles
export const summaryStyles = StyleSheet.create({
  summaryCard: {
    margin: 16,
    backgroundColor: '#ffffff',
    borderRadius: 16,
    padding: 20,
    ...Platform.select({
      ios: {
        shadowColor: '#000',
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
    color: '#6b7280',
    fontWeight: '500',
  },
  summaryValue: {
    fontSize: 32,
    fontWeight: '700',
    color: '#111827',
    marginBottom: 20,
  },
  summaryRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: 16,
    borderTopWidth: 1,
    borderTopColor: '#f3f4f6',
  },
  summaryItem: {
    flex: 1,
    alignItems: 'center',
  },
  summaryItemLabel: {
    fontSize: 12,
    color: '#9ca3af',
    marginBottom: 6,
  },
  summaryItemValue: {
    fontSize: 14,
    fontWeight: '700',
    color: '#111827',
  },
  summaryDivider: {
    width: 1,
    height: 30,
    backgroundColor: '#e5e7eb',
  },
  todaysChangeContainer: {
    marginTop: 16,
    paddingTop: 16,
    borderTopWidth: 1,
    borderTopColor: '#f3f4f6',
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
    color: '#6b7280',
    fontWeight: '500',
  },
  todaysChangeValue: {
    fontSize: 16,
    fontWeight: '700',
  },
});

// Position Card Styles
export const positionStyles = StyleSheet.create({
  positionsList: {
    gap: 12,
  },
  positionCard: {
    backgroundColor: '#ffffff',
    borderRadius: 12,
    padding: 16,
    ...Platform.select({
      ios: {
        shadowColor: '#000',
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
    color: '#111827',
  },
  positionName: {
    fontSize: 12,
    color: '#6b7280',
    marginTop: 2,
  },
  positionHeaderRight: {
    alignItems: 'flex-end',
  },
  positionValue: {
    fontSize: 16,
    fontWeight: '700',
    color: '#111827',
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
    backgroundColor: '#f3f4f6',
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
    color: '#9ca3af',
    marginBottom: 4,
  },
  positionDetailValue: {
    fontSize: 13,
    fontWeight: '600',
    color: '#111827',
  },
  profitLossContainer: {
    backgroundColor: '#f9fafb',
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
    color: '#6b7280',
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
export const sectorStyles = StyleSheet.create({
  sectorList: {
    gap: 12,
  },
  sectorCard: {
    backgroundColor: '#ffffff',
    borderRadius: 12,
    padding: 16,
    ...Platform.select({
      ios: {
        shadowColor: '#000',
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
    color: '#111827',
  },
  sectorPercentage: {
    fontSize: 14,
    fontWeight: '700',
    color: '#111827',
  },
  sectorBarContainer: {
    height: 6,
    backgroundColor: '#f3f4f6',
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
    color: '#6b7280',
    fontWeight: '500',
  },
});
