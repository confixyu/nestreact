import { type ReactNode, useEffect, useState } from 'react';
import { tokenStorage } from '../../shared/api/token-storage';
import { getCurrentUser, loginRequest } from './api';
import { AuthContext } from './auth-context';
import type { User } from './types';
import { useQueryClient } from '@tanstack/react-query';


export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(() => tokenStorage.get() !== null);

  useEffect(() => {
    if (!tokenStorage.get()) {
      return;
    }

    let ignore = false;
    getCurrentUser()
      .then((currentUser) => {
        if (!ignore) setUser(currentUser);
      })
      .catch(() => {
        tokenStorage.clear();
      })
      .finally(() => {
        if (!ignore) setIsLoading(false);
      });

    return () => {
      ignore = true;
    };
  }, []);

    async function login(email: string, password: string): Promise<void> {
        const result = await loginRequest({ email, password });
        tokenStorage.set(result.accessToken);
        setUser(result.user);
    }

  const queryClient = useQueryClient();

    function logout(): void {
    tokenStorage.clear();
    queryClient.clear();
    setUser(null);
}

  return (
    <AuthContext value={{ user, isLoading, login, logout }}>
      {children}
    </AuthContext>
  );
}