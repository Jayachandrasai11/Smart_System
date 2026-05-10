import React from 'react';
import {View, StyleSheet, ViewStyle, StyleProp} from 'react-native';
import {Colors} from '../config/colors';
import {Spacing, BorderRadius} from '../config/dimensions';

interface CardProps {
  children: React.ReactNode;
  style?: StyleProp<ViewStyle>;
  variant?: 'elevated' | 'outlined' | 'filled';
  padding?: keyof typeof Spacing | number;
}

export const Card: React.FC<CardProps> = ({
  children,
  style,
  variant = 'elevated',
  padding = 'md',
}) => {
  const paddingValue = typeof padding === 'number' ? padding : Spacing[padding];

  const getCardStyle = (): StyleProp<ViewStyle>[] => {
    const baseStyle: StyleProp<ViewStyle>[] = [
      styles.card,
      {padding: paddingValue},
    ];

    switch (variant) {
      case 'elevated':
        baseStyle.push(styles.elevated as ViewStyle);
        break;
      case 'outlined':
        baseStyle.push(styles.outlined as ViewStyle);
        break;
      case 'filled':
        baseStyle.push(styles.filled as ViewStyle);
        break;
    }

    if (style) {
      baseStyle.push(style);
    }

    return baseStyle;
  };

  return <View style={getCardStyle()}>{children}</View>;
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: Colors.card,
    borderRadius: BorderRadius.lg,
  },
  elevated: {
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  outlined: {
    borderWidth: 1,
    borderColor: Colors.border,
  },
  filled: {
    backgroundColor: Colors.background,
  },
});