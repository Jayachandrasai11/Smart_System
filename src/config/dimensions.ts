import {Dimensions} from 'react-native';

const {width, height} = Dimensions.get('window');

export const Screen = {
  width,
  height,
  isSmallDevice: width < 375,
  isTablet: width >= 768,
  isLandscape: width > height,
};

export const Spacing = {
  xs: 4,
  sm: 8,
  md: 16,
  lg: 24,
  xl: 32,
  xxl: 48,
};

export const BorderRadius = {
  sm: 4,
  md: 8,
  lg: 12,
  xl: 16,
  round: 9999,
};

export const HitSlop = {
  small: {top: 8, bottom: 8, left: 8, right: 8},
  medium: {top: 12, bottom: 12, left: 12, right: 12},
  large: {top: 16, bottom: 16, left: 16, right: 16},
};