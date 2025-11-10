import { Platform, StyleSheet } from 'react-native';

export const stockDetailStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f9fafb',
  },
  scrollView: {
    flex: 1,
  },
});

export const headerStyles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingBottom: 16,
    backgroundColor: '#ffffff',
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
  backButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#f3f4f6',
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
    color: '#111827',
  },
  headerName: {
    fontSize: 12,
    color: '#6b7280',
    marginTop: 2,
  },
  starButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#f3f4f6',
    justifyContent: 'center',
    alignItems: 'center',
  },
  starButtonActive: {
    backgroundColor: '#fef3c7',
  },
});

export const priceSectionStyles = StyleSheet.create({
  priceSection: {
    backgroundColor: '#ffffff',
    padding: 24,
    alignItems: 'center',
  },
  currentPrice: {
    fontSize: 48,
    fontWeight: '700',
    color: '#111827',
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
    color: '#9ca3af',
    marginTop: 8,
  },
});

export const timeRangeStyles = StyleSheet.create({
  timeRangeSection: {
    backgroundColor: '#ffffff',
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
    backgroundColor: '#f3f4f6',
  },
  timeRangeButtonActive: {
    backgroundColor: '#10b981',
  },
  timeRangeText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#6b7280',
  },
  timeRangeTextActive: {
    color: '#ffffff',
  },
});

export const chartStyles = StyleSheet.create({
  chartSection: {
    backgroundColor: '#ffffff',
    marginTop: 8,
    padding: 24,
  },
});

export const statsStyles = StyleSheet.create({
  section: {
    backgroundColor: '#ffffff',
    marginTop: 8,
    padding: 24,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#111827',
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
    color: '#6b7280',
    marginBottom: 4,
  },
  statValue: {
    fontSize: 16,
    fontWeight: '600',
    color: '#111827',
  },
});

export const companyInfoStyles = StyleSheet.create({
  infoCard: {
    backgroundColor: '#f9fafb',
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
    color: '#6b7280',
  },
  infoValue: {
    fontSize: 14,
    fontWeight: '600',
    color: '#111827',
  },
  divider: {
    height: 1,
    backgroundColor: '#e5e7eb',
  },
  aboutText: {
    fontSize: 14,
    lineHeight: 22,
    color: '#6b7280',
  },
});

export const actionButtonStyles = StyleSheet.create({
  bottomActions: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    flexDirection: 'row',
    padding: 16,
    gap: 12,
    backgroundColor: '#ffffff',
    ...Platform.select({
      ios: {
        shadowColor: '#000',
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
    backgroundColor: '#ef4444',
  },
  buyButton: {
    backgroundColor: '#10b981',
  },
  actionButtonText: {
    fontSize: 16,
    fontWeight: '700',
    color: '#ffffff',
  },
});
