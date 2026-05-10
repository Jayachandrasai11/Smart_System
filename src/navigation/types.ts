import {BottomTabNavigationProp} from '@react-navigation/bottom-tabs';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {CompositeNavigationProp} from '@react-navigation/native';

export type RootStackParamList = {
  Auth: undefined;
  MainTabs: undefined;
  TruckDetail: {truckId: string};
  MaterialDetail: {materialId: string};
};

export type MainTabParamList = {
  Dashboard: undefined;
  Trucks: undefined;
  Materials: undefined;
  Visitors: undefined;
};

export type RootStackNavigationProp = NativeStackNavigationProp<RootStackParamList>;
export type MainTabNavigationProp = BottomTabNavigationProp<MainTabParamList>;

export type CombinedNavigationProp = CompositeNavigationProp<
  MainTabNavigationProp,
  RootStackNavigationProp
>;