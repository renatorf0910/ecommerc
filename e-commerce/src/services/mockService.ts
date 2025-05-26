/**
 * Mock service for development without a real API
 */
import { PaginatedResponse } from '../types/api';
import { Product } from '../types/product';
import { User, UserLoginRequest, UserLoginResponse, UserRegisterRequest } from '../types/user';

// Simulate API delay
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

// Load mock data
const loadMockProducts = async (): Promise<Product[]> => {
  try {
    const response = await fetch('/mockProductsData.json');
    const data = await response.json();
    return data.data;
  } catch (error) {
    console.error('Error loading mock products:', error);
    return [];
  }
};

// Mock users
const mockUsers: User[] = [
  {
    id: '1',
    name: 'John Doe',
    email: 'john@example.com',
    role: 'user',
    createdAt: '2023-01-01T00:00:00Z',
  },
  {
    id: '2',
    name: 'Jane Smith',
    email: 'jane@example.com',
    role: 'admin',
    createdAt: '2023-01-02T00:00:00Z',
  },
];

export const mockProductService = {
  getProducts: async (page = 1, limit = 10): Promise<{ data: PaginatedResponse<Product>; status: number }> => {
    await delay(800); // Simulate network delay
    
    const products = await loadMockProducts();
    const startIndex = (page - 1) * limit;
    const endIndex = startIndex + limit;
    const paginatedProducts = products.slice(startIndex, endIndex);
    
    return {
      data: {
        data: paginatedProducts,
        total: products.length,
        page,
        limit,
        totalPages: Math.ceil(products.length / limit),
      },
      status: 200,
    };
  },
  
  getProductById: async (id: string): Promise<{ data: Product; status: number }> => {
    await delay(600); // Simulate network delay
    
    const products = await loadMockProducts();
    const product = products.find(p => p.id === id);
    
    if (!product) {
      throw { status: 404, message: 'Product not found' };
    }
    
    return {
      data: product,
      status: 200,
    };
  },
};

export const mockAuthService = {
  login: async (credentials: UserLoginRequest): Promise<{ data: UserLoginResponse; status: number }> => {
    await delay(1000); // Simulate network delay
    
    const user = mockUsers.find(u => u.email === credentials.email);
    
    if (!user || credentials.password !== 'password123') {
      throw { status: 401, message: 'Invalid email or password' };
    }
    
    // Generate mock token
    const token = `mock-token-${user.id}-${Date.now()}`;
    
    return {
      data: {
        user,
        token,
      },
      status: 200,
    };
  },
  
  register: async (userData: UserRegisterRequest): Promise<{ data: User; status: number }> => {
    await delay(1000); // Simulate network delay
    
    // Check if email already exists
    if (mockUsers.some(u => u.email === userData.email)) {
      throw { 
        status: 422, 
        message: 'Validation failed',
        errors: {
          email: ['Email already taken']
        }
      };
    }
    
    // Create new user
    const newUser: User = {
      id: `user-${Date.now()}`,
      name: userData.name,
      email: userData.email,
      role: 'user',
      createdAt: new Date().toISOString(),
    };
    
    // In a real app, we would add the user to the database
    // Here we're just returning the created user
    return {
      data: newUser,
      status: 201,
    };
  },
};

// Replace the real services with mock ones for development
// In a real app, you would use environment variables to conditionally import real or mock services
export const enableMockServices = () => {
  // Override the API calls with mock implementations
  // This would be done in a more sophisticated way in a real application
  console.log('Using mock API services for development');
};