import axios from 'axios';

const API_BASE_URL = 'http://localhost:8000/api';

const api = axios.create({
  baseURL: API_BASE_URL,
});

const setAuthToken = (token: string | null) => {
  if (token) {
    api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
  } else {
    delete api.defaults.headers.common['Authorization'];
  }
};

export const authService = {
  login: async ({ email, password }: { email: string; password: string }) => {
    const response = await api.post('/auth/login/', { email, password });
    const { access, refresh } = response.data;

    localStorage.setItem('access_token', access);
    localStorage.setItem('refresh_token', refresh);
    setAuthToken(access);

    return response;
  },

  register: async ({
    name,
    email,
    password,
    passwordConfirmation,
  }: {
    name: string;
    email: string;
    password: string;
    passwordConfirmation: string;
  }) => {
    return api.post('/register/', {
      name,
      email,
      password,
      password_confirmation: passwordConfirmation,
    });
  },

  logout: () => {
    localStorage.removeItem('access_token');
    localStorage.removeItem('refresh_token');
    setAuthToken(null);
  },

  isAuthenticated: () => {
    return !!localStorage.getItem('access_token');
  },

  getCurrentUser: async () => {
    const token = localStorage.getItem('access_token');
    setAuthToken(token);
    return api.get('/me/');
  },

  setAuthToken,
  api, // se quiser usar direto a instância em outras partes
};
