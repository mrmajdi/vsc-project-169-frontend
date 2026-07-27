// @vsc repo:vsc-project-169-frontend file:src/main.tsx task:f2-src-main-tsx module:frontend session:169
import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';
import i18n from './i18n';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import axiosInstance from './api/client';
import './styles/globals.css';

// Ensure RTL direction and Persian language as fallback
document.documentElement.dir = 'rtl';
document.documentElement.lang = 'fa';

// Initialize i18next (loads Persian translations)
i18n;

// Set up React Query client
const queryClient = new QueryClient();

// Create root container and render app with providers
const rootElement = document.getElementById('root');
if (rootElement) {
  const root = createRoot(rootElement);
  root.render(
    <React.StrictMode>
      <QueryClientProvider client={queryClient}>
        <App />
      </QueryClientProvider>
    </React.StrictMode>
  );
} else {
  throw new Error('Root element not found');
}
