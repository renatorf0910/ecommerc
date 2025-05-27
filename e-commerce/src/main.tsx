import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import './index.css';
import { authService } from './services/auth.service';

// Configura o token do axios antes de renderizar
const token = localStorage.getItem('access_token');
authService.setAuthToken(token);

// For development, enable mock services when no API_URL is provided
if (!import.meta.env.VITE_API_URL) {
  import('./services/mockService').then(({ enableMockServices }) => {
    enableMockServices();
    console.log('Mock services enabled for development');
  });
}

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>
);
