import apiClient from './apiClient';

export const authService = {
  login: async (credentials: {username: string; password: string}) => {
    const response = await apiClient.post('/auth/login', credentials);
    return response.data;
  },

  logout: async () => {
    const response = await apiClient.post('/auth/logout');
    return response.data;
  },

  refreshToken: async (refreshToken: string) => {
    const response = await apiClient.post('/auth/refresh', {refreshToken});
    return response.data;
  },

  getProfile: async () => {
    const response = await apiClient.get('/auth/profile');
    return response.data;
  },
};

export const truckService = {
  getList: async (params?: Record<string, unknown>) => {
    const response = await apiClient.get('/trucks', {params});
    return response.data;
  },

  getDetail: async (id: string) => {
    const response = await apiClient.get(`/trucks/${id}`);
    return response.data;
  },

  checkIn: async (data: Record<string, unknown>) => {
    const response = await apiClient.post('/trucks/check-in', data);
    return response.data;
  },

  checkOut: async (id: string, data: Record<string, unknown>) => {
    const response = await apiClient.post(`/trucks/${id}/check-out`, data);
    return response.data;
  },
};

export const materialService = {
  getList: async (params?: Record<string, unknown>) => {
    const response = await apiClient.get('/materials', {params});
    return response.data;
  },

  inward: async (data: Record<string, unknown>) => {
    const response = await apiClient.post('/materials/inward', data);
    return response.data;
  },

  inspect: async (id: string, data: Record<string, unknown>) => {
    const response = await apiClient.post(`/materials/${id}/inspect`, data);
    return response.data;
  },
};

export const syncService = {
  push: async (data: Record<string, unknown>) => {
    const response = await apiClient.post('/sync/push', data);
    return response.data;
  },

  pull: async (params?: Record<string, unknown>) => {
    const response = await apiClient.get('/sync/pull', {params});
    return response.data;
  },

  getStatus: async () => {
    const response = await apiClient.get('/sync/status');
    return response.data;
  },
};