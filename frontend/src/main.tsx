import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router';
import { AuthProvider } from './features/auth/AuthProvider';
import { QueryClientProvider } from '@tanstack/react-query';
import { queryClient } from './shared/api/query-client';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';

import './index.css'
import App from './App.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <AuthProvider>
          <App />
        </AuthProvider>
      </BrowserRouter>
      <ReactQueryDevtools />
    </QueryClientProvider>
  </StrictMode>,
);