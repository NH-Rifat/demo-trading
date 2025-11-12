# Inter Font Setup Guide

## ✅ Installation Complete!

The **Inter** font family has been successfully installed and configured in your trading app.

## 📦 What's Installed

- **Inter_400Regular** - Regular weight for body text
- **Inter_500Medium** - Medium weight for emphasis
- **Inter_600SemiBold** - Semi-bold for headings
- **Inter_700Bold** - Bold for strong emphasis

## 🎨 How to Use Inter Font

### Method 1: Using Theme Context (Recommended)

```tsx
import { useTheme } from '@/src/contexts/ThemeContext';

const MyComponent = () => {
  const { colors, fonts } = useTheme();

  const styles = StyleSheet.create({
    title: {
      fontSize: 24,
      fontFamily: fonts.bold,
      color: colors.text,
    },
    subtitle: {
      fontSize: 16,
      fontFamily: fonts.semibold,
      color: colors.textSecondary,
    },
    body: {
      fontSize: 14,
      fontFamily: fonts.regular,
      color: colors.text,
    },
  });

  return (
    <View>
      <Text style={styles.title}>Trading Dashboard</Text>
      <Text style={styles.subtitle}>Market Overview</Text>
      <Text style={styles.body}>Current market analysis...</Text>
    </View>
  );
};
```

### Method 2: Using Constants

```tsx
import { Fonts } from '@/constants/theme';

const styles = StyleSheet.create({
  text: {
    fontFamily: Fonts.regular,     // Inter_400Regular
    fontFamily: Fonts.medium,      // Inter_500Medium
    fontFamily: Fonts.semibold,    // Inter_600SemiBold
    fontFamily: Fonts.bold,        // Inter_700Bold
  },
});
```

### Method 3: Using Typography Helper

```tsx
import { typography } from '@/constants/typography';

const styles = StyleSheet.create({
  heading: {
    ...typography.fontFamily.bold,
    fontSize: typography.fontSize['3xl'],
  },
});
```

## 🎯 Font Weight Guidelines

### Regular (400) - Body Text
- Paragraphs
- Descriptions
- Secondary information

### Medium (500) - Subtle Emphasis
- Navigation items
- Tabs
- Subtle labels

### SemiBold (600) - Moderate Emphasis
- Card titles
- Section headers
- Important labels (e.g., "Cash Limit", "CSCX", "DSEX")

### Bold (700) - Strong Emphasis
- Main headings
- Numbers/Prices
- Call-to-action buttons
- Critical information

## 💡 Best Practices

### 1. **Replace `fontWeight` with `fontFamily`**

❌ **Old Way:**
```tsx
text: {
  fontWeight: '600',
}
```

✅ **New Way:**
```tsx
text: {
  fontFamily: fonts.semibold,
}
```

### 2. **Use Appropriate Weights for Hierarchy**

```tsx
// Page Title
title: {
  fontSize: 28,
  fontFamily: fonts.bold,
}

// Section Heading
heading: {
  fontSize: 20,
  fontFamily: fonts.semibold,
}

// Body Text
body: {
  fontSize: 14,
  fontFamily: fonts.regular,
}

// Caption
caption: {
  fontSize: 12,
  fontFamily: fonts.medium,
}
```

### 3. **Numbers in Trading Apps**

For prices, quantities, and financial data, use **SemiBold** or **Bold**:

```tsx
price: {
  fontSize: 24,
  fontFamily: fonts.bold,
  color: colors.success,
}

quantity: {
  fontSize: 16,
  fontFamily: fonts.semibold,
}
```

## 📝 Example: Updated Component

Here's how the GlobalHeader was updated:

```tsx
// Before
cashLimitLabel: {
  fontSize: 12,
  fontWeight: '600',  // ❌
  color: colors.text,
}

// After
cashLimitLabel: {
  fontSize: 12,
  fontFamily: fonts.semibold,  // ✅
  color: colors.text,
}
```

## 🔄 Migration Steps

To update your existing components:

1. Import `useTheme` hook
2. Destructure `fonts` from theme
3. Replace `fontWeight` with `fontFamily`
4. Use appropriate font weight constants

### Quick Search & Replace Guide:

- `fontWeight: '400'` → `fontFamily: fonts.regular`
- `fontWeight: '500'` → `fontFamily: fonts.medium`
- `fontWeight: '600'` → `fontFamily: fonts.semibold`
- `fontWeight: '700'` or `fontWeight: 'bold'` → `fontFamily: fonts.bold`

## ✨ Benefits of Inter Font

- ✅ **Better Readability** - Optimized for screens
- ✅ **Professional Look** - Used by top fintech apps
- ✅ **Number Clarity** - Excellent for financial data
- ✅ **Cross-platform** - Consistent on iOS & Android
- ✅ **Multiple Weights** - Better typography hierarchy

## 📱 Already Updated Components

- ✅ GlobalHeader.tsx (Cash Limit, CSCX, DSEX, Notifications)

## 🎯 Next Steps

1. Update other components to use Inter font
2. Replace all `fontWeight` properties with `fontFamily`
3. Use the theme's `fonts` object for consistency
4. Test on both light and dark themes

---

**Note:** The app now loads Inter fonts on startup. The splash screen will remain visible until fonts are loaded.
