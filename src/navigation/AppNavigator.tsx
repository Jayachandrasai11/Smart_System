import React, {useEffect, useState} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {useSelector, useDispatch} from 'react-redux';
import {RootState, AppDispatch} from '../redux/store';
import {MainTabNavigator} from './MainTabNavigator';
import {RootStackParamList} from './types';
import {LoginScreen} from '../modules/auth/screens/LoginScreen';
import {restoreSession} from '../modules/auth/redux/authSlice';
import {getItem} from '../utils/storage';
import {STORAGE_KEYS} from '../constants';
import {User} from '../types';
import {View, ActivityIndicator, StyleSheet} from 'react-native';
import {Colors} from '../config';

const Stack = createNativeStackNavigator<RootStackParamList>();

const AuthStack: React.FC = () => (
  <Stack.Navigator screenOptions={{headerShown: false}}>
    <Stack.Screen name="Auth" component={LoginScreen} />
  </Stack.Navigator>
);

const AppStack: React.FC = () => (
  <Stack.Navigator screenOptions={{headerShown: false}}>
    <Stack.Screen name="MainTabs" component={MainTabNavigator} />
  </Stack.Navigator>
);

export const AppNavigator: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const {isAuthenticated} = useSelector((state: RootState) => state.auth);
  const [isInitializing, setIsInitializing] = useState(true);

  useEffect(() => {
    const restoreAuthSession = async () => {
      console.log('DEBUG: Starting Auth Session Restoration...');
      try {
        const userData = await getItem<User>(STORAGE_KEYS.USER_DATA);
        if (userData) {
          console.log('DEBUG: User data found, restoring session...');
          dispatch(
            restoreSession({
              user: userData,
              token: '',
              refreshToken: '',
            }),
          );
        } else {
          console.log('DEBUG: No user data found in storage.');
        }
      } catch (error) {
        console.log('DEBUG: Error restoring session:', error);
      } finally {
        console.log('DEBUG: Initialization complete.');
        setIsInitializing(false);
      }
    };

    restoreAuthSession();
  }, [dispatch]);

  if (isInitializing) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color={Colors.primary} />
      </View>
    );
  }

  return (
    <NavigationContainer>
      {isAuthenticated ? <AppStack /> : <AuthStack />}
    </NavigationContainer>
  );
};

const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Colors.background,
  },
});