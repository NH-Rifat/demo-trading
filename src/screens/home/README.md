# Home Screen Architecture

This document outlines the organized structure of the Home Screen, following clean code principles and component-based architecture.

## 📁 Folder Structure

```
src/screens/home/
├── components/           # React components (UI building blocks)
│   ├── Header.tsx       # Fixed header with tickers & logo
│   ├── IndexCards.tsx   # DSEX, DS30, DSES index cards
│   ├── MarketStats.tsx  # Turnover, Volume, Trade stats
│   ├── AdvanceDecline.tsx # Advance/Decline chart
│   ├── FeaturedLists.tsx  # Top Gainer/Loser/Trade/Value/Volume
│   └── TopSectors.tsx     # Top Invested Sectors with progress bars
├── data/                # Mock data & type definitions
│   └── mockData.ts      # Initial data, types, interfaces
├── hooks/               # Custom React hooks
│   └── useMarketData.ts # Real-time data update hooks
├── styles/              # StyleSheet definitions
│   └── homeStyles.ts    # All styles organized by component
├── utils/               # Utility functions
│   └── chartUtils.ts    # Chart path generation functions
├── HomeScreen.tsx       # Main screen component (orchestrator)
└── index.ts            # Export entry point
```

## 🏗️ Architecture Principles

### 1. **Separation of Concerns**
- **Components**: Pure UI components, receive props, no business logic
- **Data**: Centralized mock data and type definitions
- **Hooks**: Custom hooks for state management and side effects
- **Styles**: Separate StyleSheets for maintainability
- **Utils**: Reusable utility functions

### 2. **Component Structure**
Each component follows this pattern:
```tsx
// 1. Imports
import React from 'react';
import { View, Text } from 'react-native';
import { styles } from '../styles/homeStyles';

// 2. Props Interface
interface ComponentProps {
  data: DataType;
  onAction: () => void;
}

// 3. Component Definition
export const Component: React.FC<ComponentProps> = ({ data, onAction }) => {
  return (
    <View style={styles.container}>
      {/* JSX */}
    </View>
  );
};
```

### 3. **Data Flow**
```
HomeScreen (Parent)
  ├── useMarketDataUpdates() → Real-time market data
  ├── useSectorDataUpdates() → Real-time sector data
  └── Props ↓ to Child Components
      ├── Header
      ├── IndexCards
      ├── MarketStats
      ├── AdvanceDecline
      ├── FeaturedLists
      └── TopSectors
```

## 📝 Component Descriptions

### Header
- **Purpose**: Fixed header with cash limit, tickers, notifications
- **Props**: `cashLimit`, `cscxValue`, `dsexValue`, `selectedExchange`, `onExchangeChange`
- **Features**: Two-section layout (top: tickers, bottom: logo & exchange toggle)

### IndexCards
- **Purpose**: Display DSEX, DS30, DSES index values with mini charts
- **Props**: `indices` (object with 3 index data)
- **Features**: Responsive cards with static chart patterns

### MarketStats
- **Purpose**: Show turnover, volume, and trade statistics
- **Props**: `turnover`, `volume`, `trade`
- **Features**: Color-coded boxes (green for buy, red for sell pressure)

### AdvanceDecline
- **Purpose**: Visualize market advance/decline distribution
- **Props**: `advanceDecline` (distribution array)
- **Features**: SVG bar chart with legend

### FeaturedLists
- **Purpose**: Tabbed list of top gainers, losers, trades, etc.
- **Props**: `selectedTab`, `onTabChange`, `data`
- **Features**: 5 tabs with gradient mini charts

### TopSectors
- **Purpose**: Display top invested sectors with progress bars
- **Props**: `sectors`, `showAll`, `onToggleShowAll`
- **Features**: Show 8 by default, expandable to 20, real-time shuffling

## 🔄 Real-Time Updates

### useMarketDataUpdates Hook
Updates different market values at different intervals:
- CSCX: 300ms
- DSEX: 500ms
- DSEX Index: 700ms
- DS30: 450ms
- DSES: 600ms
- Turnover: 600ms
- Buy Pressure: 800ms
- Volume: 600ms
- Trade: 900ms
- Sell Pressure: 900ms

### useSectorDataUpdates Hook
Updates sector values every 1 second:
- Random ±10% value changes
- Auto-sorts by value for position shuffling

## 🎨 Styling Organization

Styles are organized by component in `homeStyles.ts`:
```typescript
export const homeStyles = StyleSheet.create({ ... });
export const headerStyles = StyleSheet.create({ ... });
export const indexCardStyles = StyleSheet.create({ ... });
export const marketStatsStyles = StyleSheet.create({ ... });
export const advanceDeclineStyles = StyleSheet.create({ ... });
export const featuredListsStyles = StyleSheet.create({ ... });
export const topSectorsStyles = StyleSheet.create({ ... });
```

## 📦 Type Safety

All data structures are typed with TypeScript interfaces:
- `SectorData`
- `FeaturedStock`
- `AdvanceDeclineDistribution`
- `MarketData`

## 🔌 Integration

The home screen is integrated into the app via:
```tsx
// app/(tabs)/index.tsx
export { default } from '@/src/screens/home';
```

## 🚀 Benefits of This Architecture

1. **Maintainability**: Easy to locate and update specific components
2. **Reusability**: Components can be used elsewhere
3. **Testability**: Each component can be tested independently
4. **Scalability**: Easy to add new features without affecting existing code
5. **Readability**: Clear structure makes onboarding easier
6. **Type Safety**: TypeScript interfaces prevent errors

## 📋 Usage Example

```tsx
// Using a component elsewhere
import { Header } from '@/src/screens/home/components/Header';

<Header
  cashLimit={2.05}
  cscxValue={-12.62}
  dsexValue={-33.92}
  selectedExchange="DSE"
  onExchangeChange={(exchange) => console.log(exchange)}
/>
```

## 🔄 Following This Structure for Other Screens

When organizing other screens (watchlist, trade, portfolio, profile), follow this pattern:

```
src/screens/[screen-name]/
├── components/       # Screen-specific components
├── data/            # Mock data & types
├── hooks/           # Custom hooks
├── styles/          # StyleSheets
├── utils/           # Utility functions (optional)
├── [ScreenName]Screen.tsx  # Main component
└── index.ts         # Export
```

This ensures consistency across the entire application.
