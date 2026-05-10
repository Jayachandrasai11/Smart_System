import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {View, Text, StyleSheet} from 'react-native';
import {DashboardScreen, TruckScreen, MaterialScreen, VisitorScreen} from '../screens';
import {Colors} from '../config';
import {MainTabParamList} from './types';

const Tab = createBottomTabNavigator<MainTabParamList>();

const TabIcon: React.FC<{name: string; focused: boolean}> = ({name, focused}) => {
  const icons: Record<string, string> = {
    Dashboard: '⌂',
    Trucks: '🚚',
    Materials: '📦',
    Visitors: '👥',
  };

  return (
    <View style={[styles.iconContainer, focused && styles.iconFocused]}>
      <Text style={[styles.icon, focused && styles.iconTextFocused]}>{icons[name]}</Text>
    </View>
  );
};

export const MainTabNavigator: React.FC = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarStyle: styles.tabBar,
        tabBarActiveTintColor: Colors.primary,
        tabBarInactiveTintColor: Colors.textSecondary,
        tabBarLabelStyle: styles.tabLabel,
        headerStyle: styles.header,
        headerTitleStyle: styles.headerTitle,
        headerTintColor: Colors.textOnPrimary,
      }}>
      <Tab.Screen
        name="Dashboard"
        component={DashboardScreen}
        options={{
          title: 'Dashboard',
          tabBarIcon: ({focused}) => <TabIcon name="Dashboard" focused={focused} />,
        }}
      />
      <Tab.Screen
        name="Trucks"
        component={TruckScreen}
        options={{
          title: 'Trucks',
          tabBarIcon: ({focused}) => <TabIcon name="Trucks" focused={focused} />,
        }}
      />
      <Tab.Screen
        name="Materials"
        component={MaterialScreen}
        options={{
          title: 'Materials',
          tabBarIcon: ({focused}) => <TabIcon name="Materials" focused={focused} />,
        }}
      />
      <Tab.Screen
        name="Visitors"
        component={VisitorScreen}
        options={{
          title: 'Visitors',
          tabBarIcon: ({focused}) => <TabIcon name="Visitors" focused={focused} />,
        }}
      />
    </Tab.Navigator>
  );
};

const styles = StyleSheet.create({
  tabBar: {
    backgroundColor: Colors.surface,
    borderTopWidth: 1,
    borderTopColor: Colors.border,
    height: 64,
    paddingBottom: 8,
    paddingTop: 8,
  },
  tabLabel: {
    fontSize: 12,
    fontWeight: '500',
  },
  header: {
    backgroundColor: Colors.primary,
    elevation: 0,
    shadowOpacity: 0,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: Colors.textOnPrimary,
  },
  iconContainer: {
    width: 32,
    height: 32,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
  },
  iconFocused: {
    backgroundColor: Colors.primaryLight + '30',
  },
  icon: {
    fontSize: 20,
  },
  iconTextFocused: {
    fontSize: 22,
  },
});