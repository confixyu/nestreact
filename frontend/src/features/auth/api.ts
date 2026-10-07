import { apiRequest } from '../../shared/api/http-client';
import type { LoginResponse, Role, User } from './types';

export function loginRequest(credentials: { email: string; password: string }): Promise<LoginResponse> {
  return apiRequest<LoginResponse>('/auth/login', { method: 'POST', body: credentials });
}

export function registerRequest(data: {
  email: string;
  password: string;
  name: string;
  role: Role;
}): Promise<User> {
  return apiRequest<User>('/auth/register', { method: 'POST', body: data });
}

export function getCurrentUser(): Promise<User> {
  return apiRequest<User>('/auth/me');
}
