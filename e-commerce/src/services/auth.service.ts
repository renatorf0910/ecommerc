import axios from 'axios';

const API_BASE_URL = 'http://localhost:8000/api';

export const authService = {
  login: async ({ email, password }: { email: string; password: string }) => {
    const response = await axios.post(`${API_BASE_URL}/auth/login/`, { email, password });
    const { access, refresh } = response.data;
    localStorage.setItem('access_token', access);
    localStorage.setItem('refresh_token', refresh);
    axios.defaults.headers.common['Authorization'] = `Bearer ${access}`;

    return { data: { access, refresh } };
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
    const response = await axios.post(`${API_BASE_URL}/register/`, {
      name,
      email,
      password,
      password_confirmation: passwordConfirmation,
    });

    return response.data;
  },

  logout: () => {
    localStorage.removeItem('access_token');
    localStorage.removeItem('refresh_token');
    delete axios.defaults.headers.common['Authorization'];
  },

  isAuthenticated: () => {
    return !!localStorage.getItem('access_token');
  },

  getCurrentUser: async () => {
    const response = await axios.get(`${API_BASE_URL}/me/`);
    return response.data;
  },
};
