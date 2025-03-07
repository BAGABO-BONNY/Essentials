
import { Product, User, Order } from '@/lib/types';

// Base URL for our API (would be replaced with actual API URL)
const API_BASE_URL = '/api';

// Helper function for making API requests
async function fetchApi<T>(
  endpoint: string,
  options: RequestInit = {}
): Promise<T> {
  const headers = {
    'Content-Type': 'application/json',
    ...options.headers,
  };

  // Get the auth token if it exists
  const user = localStorage.getItem('user');
  if (user) {
    const token = JSON.parse(user).token;
    if (token) {
      headers['Authorization'] = `Bearer ${token}`;
    }
  }

  const response = await fetch(`${API_BASE_URL}${endpoint}`, {
    ...options,
    headers,
  });

  if (!response.ok) {
    // Handle error responses
    const errorData = await response.json().catch(() => ({}));
    const errorMessage = errorData.message || response.statusText || 'Something went wrong';
    throw new Error(errorMessage);
  }

  return response.json();
}

// Product API
export const ProductAPI = {
  getAll: () => fetchApi<Product[]>('/products'),
  getById: (id: string) => fetchApi<Product>(`/products/${id}`),
  getByCategory: (category: string) => fetchApi<Product[]>(`/products?category=${category}`),
  getFeatured: () => fetchApi<Product[]>('/products/featured'),
};

// Auth API
export const AuthAPI = {
  login: (email: string, password: string) => 
    fetchApi<{ user: User; token: string }>('/auth/login', {
      method: 'POST',
      body: JSON.stringify({ email, password }),
    }),
  
  register: (name: string, email: string, password: string) =>
    fetchApi<{ user: User; token: string }>('/auth/register', {
      method: 'POST',
      body: JSON.stringify({ name, email, password }),
    }),
  
  getUser: () => fetchApi<User>('/auth/me'),
};

// Order API
export const OrderAPI = {
  create: (order: Omit<Order, 'id' | 'date' | 'status'>) =>
    fetchApi<Order>('/orders', {
      method: 'POST',
      body: JSON.stringify(order),
    }),
  
  getAll: () => fetchApi<Order[]>('/orders'),
  
  getById: (id: string) => fetchApi<Order>(`/orders/${id}`),
};

// Mock implementations for development
// These simulate API responses without actually making network requests
export const MockProductAPI = {
  getAll: async () => {
    // Simulate network delay
    await new Promise(resolve => setTimeout(resolve, 500));
    return (await import('@/lib/data')).getProducts();
  },
  
  getById: async (id: string) => {
    await new Promise(resolve => setTimeout(resolve, 500));
    const products = (await import('@/lib/data')).getProducts();
    const product = products.find(p => p.id === id);
    if (!product) throw new Error('Product not found');
    return product;
  },
  
  getByCategory: async (category: string) => {
    await new Promise(resolve => setTimeout(resolve, 500));
    const products = (await import('@/lib/data')).getProducts();
    return products.filter(p => p.category === category);
  },
  
  getFeatured: async () => {
    await new Promise(resolve => setTimeout(resolve, 500));
    return (await import('@/lib/data')).getFeaturedProducts();
  },
};

export const MockAuthAPI = {
  login: async (email: string, password: string) => {
    await new Promise(resolve => setTimeout(resolve, 1000));
    // In a real app, this would validate credentials
    return {
      user: {
        id: '1',
        name: 'John Doe',
        email,
      },
      token: 'mock-jwt-token',
    };
  },
  
  register: async (name: string, email: string, password: string) => {
    await new Promise(resolve => setTimeout(resolve, 1000));
    return {
      user: {
        id: '1',
        name,
        email,
      },
      token: 'mock-jwt-token',
    };
  },
  
  getUser: async () => {
    await new Promise(resolve => setTimeout(resolve, 500));
    const user = localStorage.getItem('user');
    if (!user) throw new Error('Not authenticated');
    return JSON.parse(user);
  },
};

// Use mock APIs for development
export const api = {
  products: MockProductAPI,
  auth: MockAuthAPI,
  orders: OrderAPI, // Using real OrderAPI for now (would be mocked in dev env)
};

export default api;
