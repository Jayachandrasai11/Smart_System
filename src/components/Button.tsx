import React from 'react';
import {
  TouchableOpacity,
  Text,
  StyleSheet,
  ActivityIndicator,
  ViewStyle,
  TextStyle,
  View,
} from 'react-native';
import {Colors} from '../config/colors';

interface ButtonProps {
  title: string;
  onPress: () => void;
  variant?: 'primary' | 'secondary' | 'outline' | 'text' | 'danger';
  size?: 'small' | 'medium' | 'large';
  disabled?: boolean;
  loading?: boolean;
  style?: ViewStyle;
  textStyle?: TextStyle;
  fullWidth?: boolean;
  leftIcon?: React.ReactNode;
}

export const Button: React.FC<ButtonProps> = ({
  title,
  onPress,
  variant = 'primary',
  size = 'medium',
  disabled = false,
  loading = false,
  style,
  textStyle,
  fullWidth = false,
  leftIcon,
}) => {
  const getVariantStyle = (): ViewStyle => {
    switch (variant) {
      case 'primary':
        return {backgroundColor: Colors.primary};
      case 'secondary':
        return {backgroundColor: Colors.secondary};
      case 'outline':
        return {
          backgroundColor: 'transparent',
          borderWidth: 2,
          borderColor: Colors.primary,
        };
      case 'text':
        return {backgroundColor: 'transparent'};
      case 'danger':
        return {backgroundColor: Colors.error};
      default:
        return {backgroundColor: Colors.primary};
    }
  };

  const getSizeStyle = (): ViewStyle => {
    switch (size) {
      case 'small':
        return {paddingVertical: 10, paddingHorizontal: 20, minHeight: 40};
      case 'medium':
        return {paddingVertical: 14, paddingHorizontal: 28, minHeight: 48};
      case 'large':
        return {paddingVertical: 18, paddingHorizontal: 32, minHeight: 56};
      default:
        return {paddingVertical: 14, paddingHorizontal: 28, minHeight: 48};
    }
  };

  const getTextColor = (): string => {
    if (disabled) return Colors.textDisabled;
    switch (variant) {
      case 'primary':
      case 'secondary':
      case 'danger':
        return Colors.textOnPrimary;
      case 'outline':
      case 'text':
        return Colors.primary;
      default:
        return Colors.textOnPrimary;
    }
  };

  const getFontSize = (): number => {
    switch (size) {
      case 'small':
        return 14;
      case 'medium':
        return 16;
      case 'large':
        return 18;
      default:
        return 16;
    }
  };

  const getFontWeight = (): string => {
    return size === 'large' ? '700' : '600';
  };

  return (
    <TouchableOpacity
      style={[
        styles.container,
        getSizeStyle(),
        getVariantStyle(),
        disabled && styles.disabled,
        fullWidth && styles.fullWidth,
        style,
      ]}
      onPress={onPress}
      disabled={disabled || loading}
      activeOpacity={0.8}>
      {loading ? (
        <View style={styles.loadingContainer}>
          <ActivityIndicator
            color={
              variant === 'outline' || variant === 'text'
                ? Colors.primary
                : Colors.textOnPrimary
            }
            size="small"
          />
          {size !== 'small' && (
            <Text
              style={[
                styles.loadingText,
                {color: getTextColor(), fontSize: getFontSize()},
              ]}>
              Authenticating...
            </Text>
          )}
        </View>
      ) : (
        <View style={styles.contentContainer}>
          {leftIcon && <View style={styles.leftIcon}>{leftIcon}</View>}
          <Text
            style={[
              styles.text,
              {color: getTextColor(), fontSize: getFontSize(), fontWeight: getFontWeight()},
              textStyle,
            ]}>
            {title}
          </Text>
        </View>
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    borderRadius: 18,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    shadowColor: Colors.primary,
    shadowOffset: {width: 0, height: 4},
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 4,
  },
  text: {
    textAlign: 'center',
    letterSpacing: 0.5,
  },
  disabled: {
    opacity: 0.5,
    shadowOpacity: 0,
    elevation: 0,
  },
  fullWidth: {
    width: '100%',
  },
  loadingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  loadingText: {
    marginLeft: 10,
  },
  contentContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  leftIcon: {
    marginRight: 8,
  },
});