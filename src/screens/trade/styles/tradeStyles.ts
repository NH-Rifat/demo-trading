import { Platform, StyleSheet } from 'react-native';

export const createTradeStyles = (colors: any) => StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
});

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

export const createTradeTypeStyles = (colors: any) => StyleSheet.create({
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
    backgroundColor: colors.card,
    borderWidth: 2,
    borderColor: colors.border,
    gap: 8,
  },
  tradeTypeTabActiveBuy: {
    backgroundColor: colors.success,
    borderColor: colors.success,
  },
  tradeTypeTabActiveSell: {
    backgroundColor: colors.danger,
    borderColor: colors.danger,
  },
  tradeTypeTabText: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.textSecondary,
  },
  tradeTypeTabTextActive: {
    color: '#ffffff',
  },
});

export const createStockSelectorStyles = (colors: any) => StyleSheet.create({
  section: {
    paddingHorizontal: 16,
    marginBottom: 24,
  },
  sectionLabel: {
    fontSize: 14,
    fontWeight: '600',
    color: colors.textSecondary,
    marginBottom: 12,
  },
  stockSelector: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: colors.card,
    borderRadius: 12,
    padding: 16,
    borderWidth: 2,
    borderColor: colors.border,
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
    color: colors.text,
  },
  selectedStockName: {
    fontSize: 12,
    color: colors.textSecondary,
    marginTop: 2,
  },
  selectedStockRight: {
    alignItems: 'flex-end',
  },
  selectedStockPrice: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.text,
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
    color: colors.textTertiary,
  },
  holdingInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 8,
    gap: 6,
  },
  holdingInfoText: {
    fontSize: 13,
    color: colors.info,
    fontWeight: '500',
  },
});

export const createOrderTypeStyles = (colors: any) => StyleSheet.create({
  orderTypeTabs: {
    flexDirection: 'row',
    backgroundColor: colors.surfaceSecondary,
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
    backgroundColor: colors.card,
  },
  orderTypeTabText: {
    fontSize: 14,
    fontWeight: '600',
    color: colors.textSecondary,
  },
  orderTypeTabTextActive: {
    color: colors.text,
  },
});

export const createQuantityStyles = (colors: any) => StyleSheet.create({
  quantityControl: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.card,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: colors.border,
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
    color: colors.text,
    textAlign: 'center',
  },
});

export const createPriceInputStyles = (colors: any) => StyleSheet.create({
  priceInputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.card,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: colors.border,
    paddingHorizontal: 16,
  },
  currencySymbol: {
    fontSize: 20,
    fontWeight: '600',
    color: colors.textSecondary,
    marginRight: 8,
  },
  priceInput: {
    flex: 1,
    fontSize: 20,
    fontWeight: '600',
    color: colors.text,
    paddingVertical: 16,
  },
});

export const createOrderSummaryStyles = (colors: any) => StyleSheet.create({
  orderSummary: {
    marginHorizontal: 16,
    backgroundColor: colors.card,
    borderRadius: 16,
    padding: 20,
    marginBottom: 24,
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
  orderSummaryTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: colors.text,
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
    color: colors.textSecondary,
  },
  summaryValue: {
    fontSize: 14,
    fontWeight: '600',
    color: colors.text,
  },
  summaryDivider: {
    height: 1,
    backgroundColor: colors.border,
    marginVertical: 12,
  },
  summaryLabelTotal: {
    fontSize: 16,
    fontWeight: '700',
    color: colors.text,
  },
  summaryValueTotal: {
    fontSize: 18,
    fontWeight: '700',
    color: colors.primary,
  },
});

export const createPlaceOrderStyles = (colors: any) => StyleSheet.create({
  placeOrderButton: {
    marginHorizontal: 16,
    paddingVertical: 18,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  placeOrderButtonBuy: {
    backgroundColor: colors.success,
  },
  placeOrderButtonSell: {
    backgroundColor: colors.danger,
  },
  placeOrderButtonDisabled: {
    backgroundColor: colors.disabled,
  },
  placeOrderButtonText: {
    fontSize: 16,
    fontWeight: '700',
    color: '#ffffff',
  },
});

export const createStockPickerStyles = (colors: any) => StyleSheet.create({
  modalContainer: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'flex-end',
  },
  modalContent: {
    flex: 1,
    backgroundColor: colors.surface,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    overflow: 'hidden',
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: Platform.OS === 'ios' ? 60 : 48,
    paddingHorizontal: 16,
    paddingBottom: 16,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: colors.text,
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
    backgroundColor: colors.surfaceSecondary,
    borderRadius: 12,
    marginBottom: 8,
  },
  stockItemLeft: {
    flex: 1,
  },
  stockItemSymbol: {
    fontSize: 16,
    fontWeight: '700',
    color: colors.text,
  },
  stockItemName: {
    fontSize: 12,
    color: colors.textSecondary,
    marginTop: 2,
  },
  stockItemRight: {
    alignItems: 'flex-end',
  },
  stockItemPrice: {
    fontSize: 14,
    fontWeight: '600',
    color: colors.text,
  },
  stockItemChange: {
    fontSize: 12,
    fontWeight: '600',
    marginTop: 2,
  },
});
