export const APP_NAME = 'Smart Factory Gate';
export const APP_SHORT_NAME = 'SFG';

export const API_ROUTES = {
  AUTH: {
    LOGIN: '/auth/login',
    LOGOUT: '/auth/logout',
    REFRESH_TOKEN: '/auth/refresh',
  },
  TRUCKS: {
    LIST: '/trucks',
    DETAIL: '/trucks/:id',
    CHECK_IN: '/trucks/check-in',
    CHECK_OUT: '/trucks/check-out',
  },
  MATERIALS: {
    LIST: '/materials',
    INWARD: '/materials/inward',
    INSPECT: '/materials/:id/inspect',
  },
  VISITORS: {
    LIST: '/visitors',
    CHECK_IN: '/visitors/check-in',
    CHECK_OUT: '/visitors/check-out',
  },
  SYNC: {
    PUSH: '/sync/push',
    PULL: '/sync/pull',
    STATUS: '/sync/status',
  },
} as const;

export const STORAGE_KEYS = {
  AUTH_TOKEN: '@sf_auth_token',
  REFRESH_TOKEN: '@sf_refresh_token',
  USER_DATA: '@sf_user_data',
  OFFLINE_QUEUE: '@sf_offline_queue',
  LAST_SYNC: '@sf_last_sync',
  APP_SETTINGS: '@sf_app_settings',
} as const;

export const SYNC_INTERVAL_MS = 30000;
export const MAX_OFFLINE_RECORDS = 1000;