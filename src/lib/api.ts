import { Product, User, Order } from '@/lib/types';
import { productApi, authApi, orderApi } from './supabase';

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

// Use Supabase APIs instead of mock ones
export const api = {
  products: productApi,
  auth: authApi,
  orders: orderApi,
};

export default api;
