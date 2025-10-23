export interface User {
  id: number;
  username: string;
  email: string;
  role: 'USER' | 'ADMIN' | 'CONTRIBUTOR';
  createdAt: string;
  updatedAt: string;
}

export interface LoginRequest {
  username: string;
  password: string;
}

export interface RegisterRequest {
  username: string;
  email: string;
  password: string;
}

export interface AuthResponse {
  token: string;
  type: string;
  username: string;
  email: string;
  role: string;
}