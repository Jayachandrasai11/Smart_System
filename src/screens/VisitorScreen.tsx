import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {Card} from '../components';
import {Colors} from '../config/colors';

export const VisitorScreen: React.FC = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Visitor Entry</Text>
      <Text style={styles.subtitle}>Guest management</Text>

      <Card variant="outlined" style={styles.placeholder}>
        <Text style={styles.placeholderText}>
          Visitor workflow screens will be implemented in future tasks
        </Text>
        <Text style={styles.placeholderSubtext}>
          - Visitor check-in{'\n'}
          - ID verification{'\n'}
          - Badge printing{'\n'}
          - Visit purpose tracking
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