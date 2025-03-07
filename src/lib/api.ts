
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
    return (await import('@/lib/data')).products;
  },
  
  getById: async (id: string) => {
    await new Promise(resolve => setTimeout(resolve, 500));
    const products = (await import('@/lib/data')).products;
    const product = products.find(p => p.id === id);
    if (!product) throw new Error('Product not found');
    return product;
  },
  
  getByCategory: async (category: string) => {
    await new Promise(resolve => setTimeout(resolve, 500));
    const products = (await import('@/lib/data')).products;
    return products.filter(p => p.category === category);
  },
  
  getFeatured: async () => {
    await new Promise(resolve => setTimeout(resolve, 500));
    const products = (await import('@/lib/data')).products;
    // Return 4 random products as featured
    return products
      .sort(() => 0.5 - Math.random())
      .slice(0, 4);
  },
};

// Stored mock data for authentication
let mockUsers: Array<User & { password: string }> = [
  {
    id: '1',
    name: 'John Doe',
    email: 'john@example.com',
    password: 'password123',
  }
];

// Stored mock orders
let mockOrders: Order[] = [];

export const MockAuthAPI = {
  login: async (email: string, password: string) => {
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    const user = mockUsers.find(u => u.email === email && u.password === password);
    if (!user) {
      throw new Error('Invalid credentials');
    }
    
    const userData = {
      id: user.id,
      name: user.name,
      email: user.email,
    };
    
    const token = `mock-jwt-token-${userData.id}-${Date.now()}`;
    
    return {
      user: userData,
      token,
    };
  },
  
  register: async (name: string, email: string, password: string) => {
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Check if user already exists
    if (mockUsers.some(u => u.email === email)) {
      throw new Error('User with this email already exists');
    }
    
    const newUser = {
      id: String(mockUsers.length + 1),
      name,
      email,
      password,
    };
    
    mockUsers.push(newUser);
    
    const userData = {
      id: newUser.id,
      name: newUser.name,
      email: newUser.email,
    };
    
    const token = `mock-jwt-token-${userData.id}-${Date.now()}`;
    
    return {
      user: userData,
      token,
    };
  },
  
  getUser: async () => {
    await new Promise(resolve => setTimeout(resolve, 500));
    const userStr = localStorage.getItem('user');
    if (!userStr) throw new Error('Not authenticated');
    
    const userData = JSON.parse(userStr);
    return userData;
  },
};

export const MockOrderAPI = {
  create: async (order: Omit<Order, 'id' | 'date' | 'status'>) => {
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    const userStr = localStorage.getItem('user');
    if (!userStr) throw new Error('Not authenticated');
    
    const newOrder: Order = {
      ...order,
      id: String(mockOrders.length + 1),
      date: new Date().toISOString(),
      status: 'pending',
    };
    
    mockOrders.push(newOrder);
    return newOrder;
  },
  
  getAll: async () => {
    await new Promise(resolve => setTimeout(resolve, 800));
    
    const userStr = localStorage.getItem('user');
    if (!userStr) throw new Error('Not authenticated');
    
    const userData = JSON.parse(userStr);
    return mockOrders.filter(order => order.userId === userData.id);
  },
  
  getById: async (id: string) => {
    await new Promise(resolve => setTimeout(resolve, 500));
    
    const userStr = localStorage.getItem('user');
    if (!userStr) throw new Error('Not authenticated');
    
    const userData = JSON.parse(userStr);
    const order = mockOrders.find(o => o.id === id && o.userId === userData.id);
    
    if (!order) throw new Error('Order not found');
    return order;
  },
};

// Use mock APIs for development
export const api = {
  products: MockProductAPI,
  auth: MockAuthAPI,
  orders: MockOrderAPI, // Now using mock orders API
};

export default api;
