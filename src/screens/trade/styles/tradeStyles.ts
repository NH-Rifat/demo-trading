import { Platform, StyleSheet } from 'react-native';

export const tradeStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f9fafb',
  },
});

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

export const tradeTypeStyles = StyleSheet.create({
  tradeTypeTabs: {
    flexDirection: 'row',
    padding: 16,
    gap: 12,
  },
  tradeTypeTab: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 16,
    borderRadius: 12,
    backgroundColor: '#ffffff',
    borderWidth: 2,
    borderColor: '#e5e7eb',
    gap: 8,
  },
  tradeTypeTabActiveBuy: {
    backgroundColor: '#10b981',
    borderColor: '#10b981',
  },
  tradeTypeTabActiveSell: {
    backgroundColor: '#ef4444',
    borderColor: '#ef4444',
  },
  tradeTypeTabText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#6b7280',
  },
  tradeTypeTabTextActive: {
    color: '#ffffff',
  },
});

export const stockSelectorStyles = StyleSheet.create({
  section: {
    paddingHorizontal: 16,
    marginBottom: 24,
  },
  sectionLabel: {
    fontSize: 14,
    fontWeight: '600',
    color: '#6b7280',
    marginBottom: 12,
  },
  stockSelector: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#ffffff',
    borderRadius: 12,
    padding: 16,
    borderWidth: 2,
    borderColor: '#e5e7eb',
  },
  selectedStockContent: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginRight: 12,
  },
  selectedStockSymbol: {
    fontSize: 18,
    fontWeight: '700',
    color: '#111827',
  },
  selectedStockName: {
    fontSize: 12,
    color: '#6b7280',
    marginTop: 2,
  },
  selectedStockRight: {
    alignItems: 'flex-end',
  },
  selectedStockPrice: {
    fontSize: 16,
    fontWeight: '600',
    color: '#111827',
  },
  selectedStockChange: {
    fontSize: 12,
    fontWeight: '600',
    marginTop: 2,
  },
  stockSelectorPlaceholder: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  stockSelectorPlaceholderText: {
    fontSize: 16,
    color: '#9ca3af',
  },
  holdingInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 8,
    gap: 6,
  },
  holdingInfoText: {
    fontSize: 13,
    color: '#3b82f6',
    fontWeight: '500',
  },
});

export const orderTypeStyles = StyleSheet.create({
  orderTypeTabs: {
    flexDirection: 'row',
    backgroundColor: '#f3f4f6',
    borderRadius: 12,
    padding: 4,
    gap: 4,
  },
  orderTypeTab: {
    flex: 1,
    paddingVertical: 12,
    borderRadius: 10,
    alignItems: 'center',
  },
  orderTypeTabActive: {
    backgroundColor: '#ffffff',
  },
  orderTypeTabText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#6b7280',
  },
  orderTypeTabTextActive: {
    color: '#111827',
  },
});

export const quantityStyles = StyleSheet.create({
  quantityControl: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#ffffff',
    borderRadius: 12,
    borderWidth: 2,
    borderColor: '#e5e7eb',
  },
  quantityButton: {
    width: 56,
    height: 56,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 12,
  },
  quantityInput: {
    flex: 1,
    fontSize: 24,
    fontWeight: '700',
    color: '#111827',
    textAlign: 'center',
  },
});

export const priceInputStyles = StyleSheet.create({
  priceInputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#ffffff',
    borderRadius: 12,
    borderWidth: 2,
    borderColor: '#e5e7eb',
    paddingHorizontal: 16,
  },
  currencySymbol: {
    fontSize: 20,
    fontWeight: '600',
    color: '#6b7280',
    marginRight: 8,
  },
  priceInput: {
    flex: 1,
    fontSize: 20,
    fontWeight: '600',
    color: '#111827',
    paddingVertical: 16,
  },
});

export const orderSummaryStyles = StyleSheet.create({
  orderSummary: {
    marginHorizontal: 16,
    backgroundColor: '#ffffff',
    borderRadius: 16,
    padding: 20,
    marginBottom: 24,
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
  orderSummaryTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#111827',
    marginBottom: 16,
  },
  summaryRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  summaryLabel: {
    fontSize: 14,
    color: '#6b7280',
  },
  summaryValue: {
    fontSize: 14,
    fontWeight: '600',
    color: '#111827',
  },
  summaryDivider: {
    height: 1,
    backgroundColor: '#e5e7eb',
    marginVertical: 12,
  },
  summaryLabelTotal: {
    fontSize: 16,
    fontWeight: '700',
    color: '#111827',
  },
  summaryValueTotal: {
    fontSize: 18,
    fontWeight: '700',
    color: '#10b981',
  },
});

export const placeOrderStyles = StyleSheet.create({
  placeOrderButton: {
    marginHorizontal: 16,
    paddingVertical: 18,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  placeOrderButtonBuy: {
    backgroundColor: '#10b981',
  },
  placeOrderButtonSell: {
    backgroundColor: '#ef4444',
  },
  placeOrderButtonDisabled: {
    backgroundColor: '#d1d5db',
  },
  placeOrderButtonText: {
    fontSize: 16,
    fontWeight: '700',
    color: '#ffffff',
  },
});

export const stockPickerStyles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: Platform.OS === 'ios' ? 60 : 48,
    paddingHorizontal: 16,
    paddingBottom: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#e5e7eb',
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#111827',
  },
  modalSearchContainer: {
    padding: 16,
  },
  stockList: {
    paddingHorizontal: 16,
  },
  stockItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 16,
    paddingHorizontal: 16,
    backgroundColor: '#f9fafb',
    borderRadius: 12,
    marginBottom: 8,
  },
  stockItemLeft: {
    flex: 1,
  },
  stockItemSymbol: {
    fontSize: 16,
    fontWeight: '700',
    color: '#111827',
  },
  stockItemName: {
    fontSize: 12,
    color: '#6b7280',
    marginTop: 2,
  },
  stockItemRight: {
    alignItems: 'flex-end',
  },
  stockItemPrice: {
    fontSize: 14,
    fontWeight: '600',
    color: '#111827',
  },
  stockItemChange: {
    fontSize: 12,
    fontWeight: '600',
    marginTop: 2,
  },
});
