import AsyncStorage from '@react-native-async-storage/async-storage';
import DeviceInfo from 'react-native-device-info';
import {STORAGE_KEYS} from '../constants';

export const getDeviceId = async (): Promise<string> => {
  return DeviceInfo.getUniqueId();
};

export const getDeviceName = async (): Promise<string> => {
  return DeviceInfo.getDeviceName();
};

export const getAppVersion = async (): Promise<string> => {
  return DeviceInfo.getVersion();
};

export const setItem = async <T>(key: string, value: T): Promise<void> => {
  await AsyncStorage.setItem(key, JSON.stringify(value));
};

export const getItem = async <T>(key: string): Promise<T | null> => {
  const value = await AsyncStorage.getItem(key);
  return value ? JSON.parse(value) : null;
};

export const removeItem = async (key: string): Promise<void> => {
  await AsyncStorage.removeItem(key);
};

export const clearStorage = async (): Promise<void> => {
  await AsyncStorage.clear();
};

export const setAuthToken = async (token: string): Promise<void> => {
  await AsyncStorage.setItem(STORAGE_KEYS.AUTH_TOKEN, token);
};

export const getAuthToken = async (): Promise<string | null> => {
  return AsyncStorage.getItem(STORAGE_KEYS.AUTH_TOKEN);
};

export const setRefreshToken = async (token: string): Promise<void> => {
  await AsyncStorage.setItem(STORAGE_KEYS.REFRESH_TOKEN, token);
};

export const getRefreshToken = async (): Promise<string | null> => {
  return AsyncStorage.getItem(STORAGE_KEYS.REFRESH_TOKEN);
};

export const clearAuthTokens = async (): Promise<void> => {
  await AsyncStorage.multiRemove([STORAGE_KEYS.AUTH_TOKEN, STORAGE_KEYS.REFRESH_TOKEN]);
};

export const generateUUID = (): string => {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, c => {
    const r = (Math.random() * 16) | 0;
    const v = c === 'x' ? r : (r & 0x3) | 0x8;
    return v.toString(16);
  });
};