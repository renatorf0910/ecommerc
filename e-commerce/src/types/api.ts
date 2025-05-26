// API response types
export interface ApiResponse<T> {
  data: T;
  status: number;
  message?: string;
}

// Error response type
export interface ApiError {
  status: number;
  message: string;
  errors?: Record<string, string[]>;
}

// Pagination type
export interface PaginatedResponse<T> {
  data: T[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}