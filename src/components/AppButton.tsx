import React, { useRef } from 'react';
import { TouchableOpacity, Text, StyleSheet, ActivityIndicator, TouchableOpacityProps, Animated } from 'react-native';
import { colors } from '../theme/colors';
import { borderRadius, spacing } from '../theme/spacing';
import { typography } from '../theme/typography';

interface AppButtonProps extends TouchableOpacityProps {
  title: string;
  onPress: () => void;
  variant?: 'primary' | 'secondary' | 'ghost';
  isLoading?: boolean;
}

export const AppButton: React.FC<AppButtonProps> = ({
  title,
  onPress,
  variant = 'primary',
  isLoading = false,
  style,
  disabled,
  ...props
}) => {
  const scaleAnim = useRef(new Animated.Value(1)).current;

  const handlePressIn = () => {
    Animated.spring(scaleAnim, {
      toValue: 0.98,
      useNativeDriver: true,
      speed: 20,
    }).start();
  };

  const handlePressOut = () => {
    Animated.spring(scaleAnim, {
      toValue: 1,
      useNativeDriver: true,
      speed: 20,
    }).start();
  };

  const getBackgroundColor = () => {
    if (disabled) return 'rgba(255, 255, 255, 0.05)';
    switch (variant) {
      case 'primary': return colors.primaryContainer;
      case 'secondary': return 'rgba(255, 255, 255, 0.05)';
      case 'ghost': return 'transparent';
      default: return colors.primaryContainer;
    }
  };

  const getTextColor = () => {
    if (disabled) return colors.secondary;
    switch (variant) {
      case 'primary': return colors.onPrimaryContainer;
      case 'secondary': return colors.onBackground;
      case 'ghost': return colors.primary;
      default: return colors.onPrimaryContainer;
    }
  };

  const getBorderColor = () => {
    if (variant === 'secondary') return 'rgba(255, 255, 255, 0.1)';
    return 'transparent';
  };

  return (
    <Animated.View style={[{ transform: [{ scale: scaleAnim }] }, style]}>
      <TouchableOpacity
        style={[
          styles.button,
          { 
            backgroundColor: getBackgroundColor(),
            borderColor: getBorderColor(),
            borderWidth: variant === 'secondary' ? 1 : 0,
          },
        ]}
        onPress={onPress}
        onPressIn={handlePressIn}
        onPressOut={handlePressOut}
        disabled={disabled || isLoading}
        activeOpacity={0.9}
        {...props}
      >
        {isLoading ? (
          <ActivityIndicator color={getTextColor()} />
        ) : (
          <Text style={[typography.button, { color: getTextColor() }]}>{title}</Text>
        )}
      </TouchableOpacity>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  button: {
    height: 56, // h-14
    borderRadius: borderRadius.lg, // 12px
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: spacing.md,
    flexDirection: 'row',
  },
});
