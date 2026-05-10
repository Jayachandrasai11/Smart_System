import React from 'react';
import {
  View,
  TextInput,
  Text,
  StyleSheet,
  TextInputProps,
  ViewStyle,
  TouchableOpacity,
} from 'react-native';
import {Colors} from '../config/colors';
import {Spacing} from '../config/dimensions';

interface InputProps extends TextInputProps {
  label?: string;
  error?: string;
  helperText?: string;
  containerStyle?: ViewStyle;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  showPasswordToggle?: boolean;
  isPassword?: boolean;
}

export const Input: React.FC<InputProps> = ({
  label,
  error,
  helperText,
  containerStyle,
  leftIcon,
  rightIcon,
  showPasswordToggle,
  isPassword,
  style,
  ...props
}) => {
  const hasError = !!error;

  return (
    <View style={[styles.container, containerStyle]}>
      {label && <Text style={styles.label}>{label}</Text>}
      <View
        style={[
          styles.inputContainer,
          hasError && styles.inputError,
          props.editable === false && styles.inputDisabled,
        ]}>
        {leftIcon && <View style={styles.iconLeft}>{leftIcon}</View>}
        <TextInput
          style={[styles.input, style]}
          placeholderTextColor={Colors.textDisabled}
          {...props}
        />
        {rightIcon && <View style={styles.iconRight}>{rightIcon}</View>}
      </View>
      {error && (
        <View style={styles.errorContainer}>
          <Text style={styles.errorText}>{error}</Text>
        </View>
      )}
      {helperText && !error && <Text style={styles.helperText}>{helperText}</Text>}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: Spacing.md,
  },
  label: {
    fontSize: 14,
    fontWeight: '600',
    color: Colors.textSecondary,
    marginBottom: Spacing.sm,
    letterSpacing: 0.5,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.inputBackground,
    borderWidth: 1.5,
    borderColor: Colors.inputBorder,
    borderRadius: 16,
    minHeight: 58,
  },
  input: {
    flex: 1,
    paddingHorizontal: Spacing.lg,
    paddingVertical: Spacing.md,
    fontSize: 18,
    color: Colors.textPrimary,
    fontWeight: '500',
  },
  inputError: {
    borderColor: Colors.error,
    backgroundColor: '#FEF2F2',
  },
  inputDisabled: {
    backgroundColor: Colors.background,
    color: Colors.textDisabled,
  },
  iconLeft: {
    paddingLeft: Spacing.lg,
  },
  iconRight: {
    paddingRight: Spacing.lg,
  },
  errorContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: Spacing.xs,
    paddingHorizontal: Spacing.sm,
    paddingVertical: Spacing.xs,
    backgroundColor: '#FEF2F2',
    borderRadius: 8,
  },
  errorText: {
    fontSize: 13,
    color: Colors.error,
    fontWeight: '500',
  },
  helperText: {
    fontSize: 13,
    color: Colors.textSecondary,
    marginTop: Spacing.xs,
  },
});