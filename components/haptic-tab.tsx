import { BottomTabBarButtonProps } from '@react-navigation/bottom-tabs';
import { PlatformPressable } from '@react-navigation/elements';
import * as Haptics from 'expo-haptics';
import { useEffect } from 'react';
import Animated, { Easing, useAnimatedStyle, useSharedValue, withTiming } from 'react-native-reanimated';

export function HapticTab(props: BottomTabBarButtonProps) {
  const scale = useSharedValue(1);
  const opacity = useSharedValue(0.6);

  useEffect(() => {
    // Animate when tab becomes active/inactive
    scale.value = withTiming(props.accessibilityState?.selected ? 1 : 0.98, {
      duration: 200,
      easing: Easing.out(Easing.cubic),
    });
    opacity.value = withTiming(props.accessibilityState?.selected ? 1 : 0.6, {
      duration: 200,
      easing: Easing.out(Easing.ease),
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props.accessibilityState?.selected]);

  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{ scale: scale.value }],
      opacity: opacity.value,
    };
  });

  return (
    <Animated.View style={[{ flex: 1 }, animatedStyle]}>
      <PlatformPressable
        {...props}
        onPressIn={(ev) => {
          if (process.env.EXPO_OS === 'ios') {
            // Add a soft haptic feedback when pressing down on the tabs.
            Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
          }
          // Add press animation
          scale.value = withTiming(0.92, { duration: 100, easing: Easing.out(Easing.quad) });
          props.onPressIn?.(ev);
        }}
        onPressOut={(ev) => {
          // Return to normal scale
          scale.value = withTiming(props.accessibilityState?.selected ? 1 : 0.98, {
            duration: 200,
            easing: Easing.out(Easing.cubic),
          });
          props.onPressOut?.(ev);
        }}
      />
    </Animated.View>
  );
}
