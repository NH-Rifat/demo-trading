import { Platform, StyleSheet } from 'react-native';

export const createWatchlistStyles = (colors: any, fonts: any) => StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  stockCardWrapper: {
    marginBottom: 8,
  },
  emptyList: {
    flexGrow: 1,
  },
});

export const createHeaderStyles = (colors: any, fonts: any) => StyleSheet.create({
  header: {
    backgroundColor: colors.surface,
    paddingBottom: 20,
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
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    marginBottom: 12,
    marginTop: -50,
  },
  headerTitle: {
    fontSize: 28,
    fontFamily: fonts.bold,
    color: colors.text,
  },
  createButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: colors.success,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export const createWatchlistTabStyles = (colors: any, fonts: any) => StyleSheet.create({
  watchlistTabs: {
    paddingHorizontal: 16,
    gap: 12,
  },
  watchlistTab: {
    marginTop: 0,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 12,
    backgroundColor: colors.surfaceSecondary,
    minWidth: 120,
  },
  watchlistTabActive: {
    backgroundColor: colors.successLight,
    borderWidth: 2,
    borderColor: colors.success,
  },
  watchlistTabContent: {
    flex: 1,
  },
  watchlistTabName: {
    fontSize: 14,
    fontFamily: fonts.semibold,
    color: colors.textSecondary,
  },
  watchlistTabNameActive: {
    color: colors.successDark,
  },
  watchlistTabCount: {
    fontSize: 12,
    color: colors.textTertiary,
    marginTop: 2,
  },
  watchlistTabCountActive: {
    color: colors.success,
  },
  watchlistEditButton: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: colors.card,
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 8,
  },
});

export const createModalStyles = (colors: any, fonts: any) => StyleSheet.create({
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'flex-end',
  },
  modalContent: {
    backgroundColor: colors.surface,
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    padding: 24,
    ...Platform.select({
      ios: {
        shadowColor: colors.shadow,
        shadowOffset: { width: 0, height: -4 },
        shadowOpacity: 0.1,
        shadowRadius: 8,
      },
      android: {
        elevation: 8,
      },
    }),
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 24,
  },
  modalTitle: {
    fontSize: 20,
    fontFamily: fonts.bold,
    color: colors.text,
  },
  input: {
    borderWidth: 2,
    borderColor: colors.border,
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 12,
    fontSize: 16,
    color: colors.text,
    marginBottom: 24,
    backgroundColor: colors.card,
  },
  modalActions: {
    flexDirection: 'row',
    gap: 12,
  },
  modalButton: {
    flex: 1,
    paddingVertical: 14,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  modalButtonCancel: {
    backgroundColor: colors.surfaceSecondary,
  },
  modalButtonCreate: {
    backgroundColor: colors.success,
  },
  modalButtonDelete: {
    backgroundColor: colors.danger,
    flex: 0.8,
  },
  modalButtonDisabled: {
    backgroundColor: colors.disabled,
  },
  modalButtonTextCancel: {
    fontSize: 16,
    fontFamily: fonts.semibold,
    color: colors.textSecondary,
  },
  modalButtonTextCreate: {
    fontSize: 16,
    fontFamily: fonts.semibold,
    color: '#ffffff',
  },
  modalButtonTextDelete: {
    fontSize: 16,
    fontFamily: fonts.semibold,
    color: '#ffffff',
  },
});
