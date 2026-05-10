export interface EnvConfig {
  API_BASE_URL: string;
  API_TIMEOUT: number;
  ENABLE_OFFLINE_MODE: boolean;
  APP_VERSION: string;
  ENVIRONMENT: 'development' | 'staging' | 'production';
}

export const ENV: EnvConfig = {
  API_BASE_URL: __DEV__ ? 'http://localhost:3000/api' : 'https://api.smartfactory.com/api',
  API_TIMEOUT: 30000,
  ENABLE_OFFLINE_MODE: true,
  APP_VERSION: '1.0.0',
  ENVIRONMENT: __DEV__ ? 'development' : 'production',
};