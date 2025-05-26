import { ApiError, ApiResponse } from '../types/api';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'https://api.example.com';

/**
 * Configure request options with appropriate headers
 */
function getRequestOptions<T>(method: string, data?: T): RequestInit {
  const token = localStorage.getItem('token');
  
  const options: RequestInit = {
    method,
    headers: {
      'Content-Type': 'application/json',
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
    },
  };

  if (data) {
    options.body = JSON.stringify(data);
  }

  return options;
}

/**
 * Generic API request function with error handling
 */
async function request<T, R = unknown>(
  endpoint: string,
  method = 'GET',
  data?: T
): Promise<ApiResponse<R>> {
  try {
    const url = `${API_BASE_URL}${endpoint}`;
    const options = getRequestOptions<T>(method, data);
    
    const response = await fetch(url, options);
    const responseData = await response.json();
    
    if (!response.ok) {
      throw {
        status: response.status,
        message: responseData.message || 'Something went wrong',
        errors: responseData.errors,
      } as ApiError;
    }
    
    return {
      data: responseData,
      status: response.status,
      message: responseData.message,
    };
  } catch (error) {
    if ((error as ApiError).status) {
      throw error;
    }
    
    throw {
      status: 500,
      message: (error as Error).message || 'Something went wrong',
    } as ApiError;
  }
}

/**
 * API helper methods
 */
export const api = {
  get: <R>(endpoint: string) => request<null, R>(endpoint, 'GET'),
  post: <T, R>(endpoint: string, data: T) => request<T, R>(endpoint, 'POST', data),
  put: <T, R>(endpoint: string, data: T) => request<T, R>(endpoint, 'PUT', data),
  patch: <T, R>(endpoint: string, data: T) => request<T, R>(endpoint, 'PATCH', data),
  delete: <R>(endpoint: string) => request<null, R>(endpoint, 'DELETE'),
};