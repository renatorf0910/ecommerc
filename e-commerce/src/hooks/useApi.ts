import { useState, useCallback, useEffect } from 'react';
import { ApiError } from '../types/api';

interface UseApiOptions<T> {
  onSuccess?: (data: T) => void;
  onError?: (error: ApiError) => void;
  initialData?: T;
  loadOnMount?: boolean;
}

interface ApiState<T> {
  data: T | null;
  isLoading: boolean;
  error: ApiError | null;
}

/**
 * Custom hook for API calls with loading and error states
 */
export function useApi<T>(
  apiFunction: () => Promise<{ data: T; status: number }>,
  options: UseApiOptions<T> = {}
) {
  const { onSuccess, onError, initialData = null, loadOnMount = false } = options;
  
  const [state, setState] = useState<ApiState<T>>({
    data: initialData,
    isLoading: loadOnMount,
    error: null,
  });

  const execute = useCallback(async () => {
    setState(prev => ({ ...prev, isLoading: true, error: null }));
    
    try {
      const response = await apiFunction();
      const data = response.data;
      
      setState({
        data,
        isLoading: false,
        error: null,
      });
      
      if (onSuccess) {
        onSuccess(data);
      }
      
      return { data, error: null };
    } catch (err) {
      const error = err as ApiError;
      
      setState({
        data: null,
        isLoading: false,
        error,
      });
      
      if (onError) {
        onError(error);
      }
      
      return { data: null, error };
    }
  }, [apiFunction, onSuccess, onError]);
  
  useEffect(() => {
    if (loadOnMount) {
      execute();
    }
  }, [execute, loadOnMount]);
  
  return {
    ...state,
    execute,
    reset: () => setState({ data: initialData, isLoading: false, error: null }),
  };
}