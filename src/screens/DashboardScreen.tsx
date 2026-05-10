import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {Card} from '../components';
import {Colors} from '../config/colors';

export const DashboardScreen: React.FC = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Smart Factory Gate</Text>
      <Text style={styles.subtitle}>Dashboard - Foundation Setup Complete</Text>

      <View style={styles.statusGrid}>
        <Card style={styles.statusCard}>
          <Text style={styles.statusLabel}>App Status</Text>
          <Text style={styles.statusValue}>Ready</Text>
        </Card>
        <Card style={styles.statusCard}>
          <Text style={styles.statusLabel}>Mode</Text>
          <Text style={styles.statusValue}>Online</Text>
        </Card>
      </View>

      <View style={styles.moduleGrid}>
        <Card variant="outlined" style={styles.moduleCard}>
          <Text style={styles.moduleTitle}>Truck Management</Text>
          <Text style={styles.moduleDesc}>Check-in / Check-out</Text>
        </Card>
        <Card variant="outlined" style={styles.moduleCard}>
          <Text style={styles.moduleTitle}>Material Inward</Text>
          <Text style={styles.moduleDesc}>Incoming materials</Text>
        </Card>
        <Card variant="outlined" style={styles.moduleCard}>
          <Text style={styles.moduleTitle}>Visitor Entry</Text>
          <Text style={styles.moduleDesc}>Guest management</Text>
        </Card>
        <Card variant="outlined" style={styles.moduleCard}>
          <Text style={styles.moduleTitle}>Product Loading</Text>
          <Text style={styles.moduleDesc}>Dispatch tracking</Text>
        </Card>
      </View>

      <Text style={styles.footer}>Base architecture ready for feature development</Text>
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
    fontSize: 28,
    fontWeight: '700',
    color: Colors.primary,
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 16,
    color: Colors.textSecondary,
    marginBottom: 24,
  },
  statusGrid: {
    flexDirection: 'row',
    gap: 12,
    marginBottom: 24,
  },
  statusCard: {
    flex: 1,
    alignItems: 'center',
    padding: 16,
  },
  statusLabel: {
    fontSize: 12,
    color: Colors.textSecondary,
    marginBottom: 4,
  },
  statusValue: {
    fontSize: 18,
    fontWeight: '600',
    color: Colors.success,
  },
  moduleGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  moduleCard: {
    width: '47%',
    padding: 16,
  },
  moduleTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: Colors.textPrimary,
    marginBottom: 4,
  },
  moduleDesc: {
    fontSize: 12,
    color: Colors.textSecondary,
  },
  footer: {
    marginTop: 'auto',
    textAlign: 'center',
    fontSize: 12,
    color: Colors.textDisabled,
  },
});