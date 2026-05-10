import {createSlice, PayloadAction, createAsyncThunk} from '@reduxjs/toolkit';
import {AuthState, User} from '../../../types';
import {authService, LoginRequest} from '../services/authService';
import {setAuthToken, setRefreshToken, setItem, clearAuthTokens} from '../../../utils/storage';
import {STORAGE_KEYS} from '../../../constants';

const initialState: AuthState = {
  user: null,
  token: null,
  refreshToken: null,
  isAuthenticated: false,
  isLoading: false,
  error: null,
};

export const login = createAsyncThunk(
  'auth/login',
  async (credentials: LoginRequest, {rejectWithValue}) => {
    const response = await authService.login(credentials);

    if (!response.success || !response.data) {
      return rejectWithValue(response.error || 'Login failed');
    }

    const {accessToken, refreshToken, user} = response.data;

    await setAuthToken(accessToken);
    await setRefreshToken(refreshToken);
    await setItem(STORAGE_KEYS.USER_DATA, user);

    return {user, token: accessToken, refreshToken};
  },
);

export const logout = createAsyncThunk('auth/logout', async (_, {dispatch}) => {
  await authService.logout();
  await clearAuthTokens();
});

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload;
    },
    setCredentials: (
      state,
      action: PayloadAction<{user: User; token: string; refreshToken: string}>,
    ) => {
      state.user = action.payload.user;
      state.token = action.payload.token;
      state.refreshToken = action.payload.refreshToken;
      state.isAuthenticated = true;
      state.isLoading = false;
      state.error = null;
    },
    clearError: state => {
      state.error = null;
    },
    restoreSession: (
      state,
      action: PayloadAction<{user: User; token: string; refreshToken: string}>,
    ) => {
      state.user = action.payload.user;
      state.token = action.payload.token;
      state.refreshToken = action.payload.refreshToken;
      state.isAuthenticated = true;
      state.isLoading = false;
    },
  },
  extraReducers: builder => {
    builder
      .addCase(login.pending, state => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.user = action.payload.user;
        state.token = action.payload.token;
        state.refreshToken = action.payload.refreshToken;
        state.isAuthenticated = true;
        state.isLoading = false;
        state.error = null;
      })
      .addCase(login.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      })
      .addCase(logout.fulfilled, state => {
        state.user = null;
        state.token = null;
        state.refreshToken = null;
        state.isAuthenticated = false;
        state.isLoading = false;
        state.error = null;
      });
  },
});

export const {setLoading, setCredentials, clearError, restoreSession} = authSlice.actions;
export default authSlice.reducer;