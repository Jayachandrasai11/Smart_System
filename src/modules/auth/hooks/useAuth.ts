import {useDispatch, useSelector} from 'react-redux';
import {RootState, AppDispatch} from '../../../redux/store';
import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {useCallback} from 'react';
import {login, logout} from '../redux/authSlice';
import type {RootStackParamList} from '../../../navigation/types';

export const useAuth: () => {
  user: RootState['auth']['user'];
  token: RootState['auth']['token'];
  isAuthenticated: RootState['auth']['isAuthenticated'];
  isLoading: RootState['auth']['isLoading'];
  error: RootState['auth']['error'];
  login: (credentials: {employeeId: string; password: string}) => Promise<void>;
  logout: () => Promise<void>;
} = () => {
  const dispatch = useDispatch<AppDispatch>();
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  const {user, token, isAuthenticated, isLoading, error} = useSelector(
    (state: RootState) => state.auth,
  );

  const loginAction = useCallback(
    async (credentials: {employeeId: string; password: string}) => {
      await dispatch(login(credentials)).unwrap();
    },
    [dispatch],
  );

  const logoutAction = useCallback(async () => {
    await dispatch(logout());
    navigation.reset({
      index: 0,
      routes: [{name: 'Auth'}],
    });
  }, [dispatch, navigation]);

  return {
    user,
    token,
    isAuthenticated,
    isLoading,
    error,
    login: loginAction,
    logout: logoutAction,
  };
};