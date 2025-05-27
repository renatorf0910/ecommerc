import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import './index.css';
import { authService } from './services/auth.service';

const token = localStorage.getItem('access_token');
authService.setAuthToken(token);

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
