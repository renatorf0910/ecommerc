import { api } from './api';
import { Product, ProductCreateRequest, ProductUpdateRequest } from '../types/product';
import { PaginatedResponse } from '../types/api';

const BASE_PATH = '/products';

export const productService = {
  /**
   * Get all products with optional pagination
   */
  getProducts: (page = 1, limit = 10) => {
    return api.get<PaginatedResponse<Product>>(`${BASE_PATH}?page=${page}&limit=${limit}`);
  },
  
  /**
   * Get product by ID
   */
  getProductById: (id: string) => {
    return api.get<Product>(`${BASE_PATH}/${id}`);
  },
  
  /**
   * Create a new product
   */
  createProduct: (product: ProductCreateRequest) => {
    return api.post<ProductCreateRequest, Product>(BASE_PATH, product);
  },
  
  /**
   * Update an existing product
   */
  updateProduct: (id: string, product: ProductUpdateRequest) => {
    return api.patch<ProductUpdateRequest, Product>(`${BASE_PATH}/${id}`, product);
  },
  
  /**
   * Delete a product
   */
  deleteProduct: (id: string) => {
    return api.delete<{ success: boolean }>(`${BASE_PATH}/${id}`);
  }
};