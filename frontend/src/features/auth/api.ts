import { apiRequest } from '../../shared/api/http-client';
import type { LoginResponse, User } from './types';

export function loginRequest(credentials: { email: string; password: string }): Promise<LoginResponse> {
  return apiRequest<LoginResponse>('/auth/login', { method: 'POST', body: credentials });
}

export function getCurrentUser(): Promise<User> {
  return apiRequest<User>('/auth/me');
}