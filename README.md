# 📈 Demo Trading App

A modern, feature-rich mobile trading application built with React Native and Expo. Experience seamless stock trading with real-time market data, portfolio management, and advanced trading features.

<div align="center">

[![React Native](https://img.shields.io/badge/React%20Native-0.81.5-blue.svg)](https://reactnative.dev/)
[![Expo](https://img.shields.io/badge/Expo-~54.0.22-000020.svg)](https://expo.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.9.2-blue.svg)](https://www.typescriptlang.org/)
[![License](https://img.shields.io/badge/License-MIT-green.svg)](LICENSE)

</div>

## 📱 Download APK

### Latest Release: v1.0.0

**[📥 Download DemoTrading v1.0 APK (128 MB)](https://github.com/NH-Rifat/demo-trading/releases/download/v1.0.0/DemoTrading-v1.0.apk)**

> **How to Install:**
> 1. Download the APK file from the link above
> 2. Enable "Install from Unknown Sources" in your Android settings
> 3. Open the downloaded APK file and install
> 4. Launch the app and start trading!

> **Note:** If the download link doesn't work, go to [Releases](https://github.com/NH-Rifat/demo-trading/releases) and download the latest version.

## ✨ Features

### 🏠 Home Screen
- **Real-time Market Statistics**
  - Live turnover, volume, and trade data
  - Buy/Sell pressure indicators with color-coded visual feedback
  - Stable card heights with optimized layout (no jumping!)
  - Market status indicator with blinking animation

- **Market Overview**
  - CSCX & DSEX ticker symbols with trending indicators
  - Advance/Decline ratio with visual representation
  - Cash limit display
  - Push notifications support

### 📊 Trade Screen
- **Multiple Order Types**
  - Market Orders (instant execution)
  - Limit Orders (price-specific execution)
  
- **Smart Input Controls**
  - Quantity input with +/- buttons (max 9 digits with validation)
  - Drip Quantity for incremental order execution
  - Limit Price input (max 12 digits with validation)
  - Real-time input validation with visual warnings
  - Number pad keyboard for easy input

- **Stock Selection**
  - Quick stock selector with search
  - Recent stocks history
  - Stock details display

- **Order Management**
  - Buy/Sell toggle
  - Real-time order validation
  - Order confirmation system

### 💼 Portfolio Screen
- **Holdings Overview**
  - Current value tracking
  - Total P&L (Profit & Loss) calculation
  - Individual stock performance
  
- **Position Management**
  - Average buy price tracking
  - Current market price updates
  - Quantity and value display
  - Percentage gain/loss indicators

### 📋 Watchlist
- **Stock Monitoring**
  - Add/Remove stocks from watchlist
  - Real-time price updates
  - Quick access to trading

### 👤 Profile & Settings
- **Account Management**
  - User profile information
  - Trading preferences
  - App settings

## 🎨 Design Features

### Visual Excellence
- **Professional Typography**: Inter font family (Regular, Medium, SemiBold, Bold)
- **Theme Support**: Light and Dark mode with smooth transitions
- **Modern UI**: Clean, intuitive interface with consistent styling
- **Responsive Layout**: Optimized for various screen sizes
- **Smooth Animations**: Native animations using Reanimated

### UX Enhancements
- **Haptic Feedback**: Touch feedback for better user experience
- **Loading States**: Clear indicators for async operations
- **Error Handling**: User-friendly error messages
- **Input Validation**: Real-time validation with visual feedback
- **No Layout Shift**: Stable UI elements that don't jump

## 🛠️ Technical Stack

### Core Technologies
- **React Native**: 0.81.5
- **Expo**: ~54.0.22
- **TypeScript**: ~5.9.2
- **React**: 19.1.0

### State Management
- **Redux Toolkit**: 2.10.1
- **React Redux**: 9.2.0

### Navigation
- **Expo Router**: ~6.0.14 (File-based routing)
- **React Navigation**: Bottom tabs, Native Stack

### UI & Animations
- **React Native Reanimated**: ~4.1.1
- **React Native Gesture Handler**: ~2.28.0
- **Victory Native**: ~41.20.1 (Charts)
- **Lucide React Native**: Icons

### Storage & Data
- **AsyncStorage**: 2.2.0
- **Date-fns**: 4.1.0

## 🚀 Getting Started

### Prerequisites
- Node.js (v18 or higher)
- npm or yarn
- Expo CLI
- Android Studio (for Android development)
- Xcode (for iOS development, macOS only)

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/NH-Rifat/demo-trading.git
   cd demo-trading
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the development server**
   ```bash
   npm start
   ```

4. **Run on Android**
   ```bash
   npm run android
   ```

5. **Run on iOS** (macOS only)
   ```bash
   npm run ios
   ```

## 📦 Building for Production

### Android APK
```bash
cd android
./gradlew clean
./gradlew assembleRelease
```

The APK will be generated at:
```
android/app/build/outputs/apk/release/app-release.apk
```

## 📁 Project Structure

```
demo-trading/
├── app/                          # Main application screens (Expo Router)
│   ├── (tabs)/                   # Tab-based navigation
│   │   ├── index.tsx            # Home screen
│   │   └── explore.tsx          # Explore screen
│   ├── _layout.tsx              # Root layout with font loading
│   └── modal.tsx                # Modal screen
├── src/
│   ├── components/              # Reusable components
│   │   ├── trade/              # Trading components
│   │   ├── ui/                 # UI components
│   │   └── ...
│   ├── screens/                # Screen components
│   │   ├── home/               # Home screen components
│   │   ├── trade/              # Trade screen components
│   │   ├── portfolio/          # Portfolio screen
│   │   └── watchlist/          # Watchlist screen
│   ├── contexts/               # React contexts (Theme, etc.)
│   ├── store/                  # Redux store & slices
│   └── constants/              # Constants (colors, fonts, theme)
├── assets/                      # Images and static assets
├── constants/                   # App-wide constants
└── android/                     # Android native code
```

## 🎯 Key Features Implementation

### Input Validation System
```typescript
// 9-digit limit for quantity inputs
- Real-time validation
- Visual warning (red border)
- Auto-dismiss after 2 seconds
- Prevents input beyond limit

// 12-digit limit for price inputs
- Counts only numeric digits (excludes decimal)
- Visual feedback on limit reached
- Smooth user experience
```

### Theme System
```typescript
// Dynamic theming with context
- Light/Dark mode support
- Color-coded feedback (success/danger/warning)
- Consistent typography
- Theme-aware components
```

### State Management
```typescript
// Redux Toolkit slices
- Orders management
- Portfolio tracking
- Watchlist data
- User preferences
```

## 🔧 Configuration

### Theme Customization
Edit `src/constants/theme.ts` to customize colors and fonts.

### API Integration
Update API endpoints in the respective service files (when backend is ready).

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 👨‍💻 Developer

**NH-Rifat**
- GitHub: [@NH-Rifat](https://github.com/NH-Rifat)

## 🙏 Acknowledgments

- [Expo](https://expo.dev/) for the amazing framework
- [React Native](https://reactnative.dev/) community
- All open-source contributors

## 📞 Support

For support, please open an issue in the GitHub repository.

---

<div align="center">
Made with ❤️ using React Native & Expo
</div>
