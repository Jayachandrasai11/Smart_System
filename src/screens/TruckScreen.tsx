import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {Card} from '../components';
import {Colors} from '../config/colors';

export const TruckScreen: React.FC = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Truck Management</Text>
      <Text style={styles.subtitle}>Check-in / Check-out</Text>

      <Card variant="outlined" style={styles.placeholder}>
        <Text style={styles.placeholderText}>
          Truck workflow screens will be implemented in Task 2
        </Text>
        <Text style={styles.placeholderSubtext}>
          - Check-in / Check-out{'\n'}
          - QR Code verification{'\n'}
          - Driver details capture{'\n'}
          - Material verification
        </Text>
      </Card>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
    padding: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: '700',
    color: Colors.textPrimary,
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 14,
    color: Colors.textSecondary,
    marginBottom: 24,
  },
  placeholder: {
    padding: 32,
    alignItems: 'center',
  },
  placeholderText: {
    fontSize: 16,
    color: Colors.textSecondary,
    textAlign: 'center',
    marginBottom: 16,
  },
  placeholderSubtext: {
    fontSize: 12,
    color: Colors.textDisabled,
    textAlign: 'center',
    lineHeight: 20,
  },
});