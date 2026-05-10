import React from 'react';
import {View, ActivityIndicator, Text, StyleSheet} from 'react-native';
import {Colors} from '../config/colors';
import {Spacing} from '../config/dimensions';

interface LoaderProps {
  size?: 'small' | 'large';
  color?: string;
  message?: string;
  fullScreen?: boolean;
}

export const Loader: React.FC<LoaderProps> = ({
  size = 'large',
  color = Colors.primary,
  message,
  fullScreen = false,
}) => {
  const content = (
    <View style={styles.container}>
      <ActivityIndicator size={size} color={color} />
      {message && <Text style={styles.message}>{message}</Text>}
    </View>
  );

  if (fullScreen) {
    return <View style={styles.fullScreen}>{content}</View>;
  }

  return content;
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: Spacing.md,
  },
  message: {
    marginTop: Spacing.sm,
    fontSize: 14,
    color: Colors.textSecondary,
    textAlign: 'center',
  },
  fullScreen: {
    ...StyleSheet.absoluteFill,
    backgroundColor: Colors.background,
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 999,
  },
});