import {createSlice, PayloadAction} from '@reduxjs/toolkit';

interface AppState {
  isOnline: boolean;
  lastSyncTime: string | null;
  pendingSyncCount: number;
  isDarkMode: boolean;
}

const initialState: AppState = {
  isOnline: true,
  lastSyncTime: null,
  pendingSyncCount: 0,
  isDarkMode: false,
};

const appSlice = createSlice({
  name: 'app',
  initialState,
  reducers: {
    setOnlineStatus: (state, action: PayloadAction<boolean>) => {
      state.isOnline = action.payload;
    },
    setLastSyncTime: (state, action: PayloadAction<string>) => {
      state.lastSyncTime = action.payload;
    },
    setPendingSyncCount: (state, action: PayloadAction<number>) => {
      state.pendingSyncCount = action.payload;
    },
    toggleDarkMode: state => {
      state.isDarkMode = !state.isDarkMode;
    },
    setDarkMode: (state, action: PayloadAction<boolean>) => {
      state.isDarkMode = action.payload;
    },
  },
});

export const {setOnlineStatus, setLastSyncTime, setPendingSyncCount, toggleDarkMode, setDarkMode} =
  appSlice.actions;
export default appSlice.reducer;