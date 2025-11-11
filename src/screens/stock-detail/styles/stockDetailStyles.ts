import { Platform, StyleSheet } from 'react-native';

export const createStockDetailStyles = (colors: any) => StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  scrollView: {
    flex: 1,
  },
});

export const createHeaderStyles = (colors: any) => StyleSheet.create({
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingBottom: 16,
    backgroundColor: colors.surface,
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
  backButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: colors.surfaceSecondary,
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerCenter: {
    flex: 1,
    alignItems: 'center',
    marginHorizontal: 16,
  },
  headerSymbol: {
    fontSize: 18,
    fontWeight: '700',
    color: colors.text,
  },
  headerName: {
    fontSize: 12,
    color: colors.textSecondary,
    marginTop: 2,
  },
  starButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: colors.surfaceSecondary,
    justifyContent: 'center',
    alignItems: 'center',
  },
  starButtonActive: {
    backgroundColor: colors.warningLight,
  },
});

export const createPriceSectionStyles = (colors: any) => StyleSheet.create({
  priceSection: {
    backgroundColor: colors.surface,
    padding: 24,
    alignItems: 'center',
  },
  currentPrice: {
    fontSize: 48,
    fontWeight: '700',
    color: colors.text,
  },
  changeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 8,
    gap: 6,
  },
  changeText: {
    fontSize: 18,
    fontWeight: '600',
  },
  lastUpdate: {
    fontSize: 12,
    color: colors.textTertiary,
    marginTop: 8,
  },
});

export const createTimeRangeStyles = (colors: any) => StyleSheet.create({
  timeRangeSection: {
    backgroundColor: colors.surface,
    paddingVertical: 12,
    marginTop: 8,
  },
  timeRangeScroll: {
    paddingHorizontal: 16,
    gap: 8,
  },
  timeRangeButton: {
    paddingHorizontal: 20,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: colors.surfaceSecondary,
  },
  timeRangeButtonActive: {
    backgroundColor: colors.success,
  },
  timeRangeText: {
    fontSize: 14,
    fontWeight: '600',
    color: colors.textSecondary,
  },
  timeRangeTextActive: {
    color: '#ffffff',
  },
});

export const createChartStyles = (colors: any) => StyleSheet.create({
  chartSection: {
    backgroundColor: colors.surface,
    marginTop: 8,
    padding: 24,
  },
});

export const createStatsStyles = (colors: any) => StyleSheet.create({
  section: {
    backgroundColor: colors.surface,
    marginTop: 8,
    padding: 24,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: colors.text,
    marginBottom: 16,
  },
  statsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 16,
  },
  statItem: {
    width: '30%',
    minWidth: 100,
  },
  statLabel: {
    fontSize: 12,
    color: colors.textSecondary,
    marginBottom: 4,
  },
  statValue: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.text,
  },
});

export const createCompanyInfoStyles = (colors: any) => StyleSheet.create({
  infoCard: {
    backgroundColor: colors.surfaceSecondary,
    borderRadius: 12,
    padding: 16,
  },
  infoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
  },
  infoLabel: {
    fontSize: 14,
    color: colors.textSecondary,
  },
  infoValue: {
    fontSize: 14,
    fontWeight: '600',
    color: colors.text,
  },
  divider: {
    height: 1,
    backgroundColor: colors.border,
  },
  aboutText: {
    fontSize: 14,
    lineHeight: 22,
    color: colors.textSecondary,
  },
});

export const createActionButtonStyles = (colors: any) => StyleSheet.create({
  bottomActions: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    flexDirection: 'row',
    padding: 16,
    gap: 12,
    backgroundColor: colors.surface,
    ...Platform.select({
      ios: {
        shadowColor: colors.shadow,
        shadowOffset: { width: 0, height: -2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
      },
      android: {
        elevation: 8,
      },
    }),
  },
  actionButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 16,
    borderRadius: 12,
    gap: 8,
  },
  sellButton: {
    backgroundColor: colors.danger,
  },
  buyButton: {
    backgroundColor: colors.success,
  },
  actionButtonText: {
    fontSize: 16,
    fontWeight: '700',
    color: '#ffffff',
  },
});
