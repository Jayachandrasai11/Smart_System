export interface User {
  id: string;
  name: string;
  email?: string;
  role: string;
  gate?: string;
  employeeId: string;
}

export interface AuthState {
  user: User | null;
  token: string | null;
  refreshToken: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
}

export interface Truck {
  id: string;
  vehicleNumber: string;
  driverName: string;
  driverPhone: string;
  materialType: string;
  status: 'pending' | 'checked_in' | 'loading' | 'checked_out';
  gateInTime?: string;
  gateOutTime?: string;
}

export interface OfflineRecord {
  id: string;
  type: 'truck' | 'material' | 'visitor';
  action: 'create' | 'update' | 'delete';
  data: Record<string, unknown>;
  timestamp: string;
  synced: boolean;
}