import apiClient from '../../../services/apiClient';
import {API_ROUTES} from '../../../constants';
import {getDeviceId} from '../../../utils/storage';

export interface LoginRequest {
  employeeId: string;
  password: string;
  deviceId?: string;
}

export interface AuthResponse {
  accessToken: string;
  refreshToken: string;
  user: {
    id: string;
    name: string;
    role: string;
    gate: string;
    employeeId: string;
    email?: string;
  };
}

export interface LoginResponse {
  success: boolean;
  data?: AuthResponse;
  error?: string;
}

export const authService = {
  async login(credentials: LoginRequest): Promise<LoginResponse> {
    try {
      const deviceId = await getDeviceId();

      const response = await apiClient.post<AuthResponse>(
        API_ROUTES.AUTH.LOGIN,
        {
          employeeId: credentials.employeeId,
          password: credentials.password,
          deviceId: deviceId,
        },
      );

      return {
        success: true,
        data: response.data,
      };
    } catch (error: any) {
      const message =
        error.response?.data?.message ||
        error.response?.data?.error ||
        'Login failed. Please try again.';

      return {
        success: false,
        error: message,
      };
    }
  },

  async logout(): Promise<void> {
    try {
      await apiClient.post(API_ROUTES.AUTH.LOGOUT);
    } catch {
    }
  },
};