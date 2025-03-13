
import { Product, User, Order } from '@/lib/types';
import { products, getProductById, getProductsByCategory, getFeaturedProducts } from './data';

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

// Mock backend storage
const mockUsers: Record<string, { user: User; password: string; token: string }> = {};
const mockOrders: Order[] = [];

// Product API using data.ts
export const productApi = {
  async getAll(): Promise<Product[]> {
    return products;
  },

  async getById(id: string): Promise<Product> {
    const product = getProductById(id);
    if (!product) {
      throw new Error('Product not found');
    }
    return product;
  },

  async getByCategory(category: string): Promise<Product[]> {
    return getProductsByCategory(category);
  },

  async getFeatured(): Promise<Product[]> {
    return getFeaturedProducts();
  }
};

// Auth API (mock implementation)
export const authApi = {
  async login(email: string, password: string) {
    // Simulate network delay
    await new Promise(resolve => setTimeout(resolve, 500));
    
    const userRecord = Object.values(mockUsers).find(record => 
      record.user.email === email && record.password === password
    );
    
    if (!userRecord) {
      throw new Error('Invalid email or password');
    }
    
    return {
      user: userRecord.user,
      token: userRecord.token
    };
  },
  
  async register(name: string, email: string, password: string) {
    // Simulate network delay
    await new Promise(resolve => setTimeout(resolve, 500));
    
    // Check if email already exists
    const emailExists = Object.values(mockUsers).some(record => 
      record.user.email === email
    );
    
    if (emailExists) {
      throw new Error('Email already in use');
    }
    
    // Create new user
    const userId = `user_${Date.now()}`;
    const token = `token_${Math.random().toString(36).substring(2, 15)}`;
    
    const newUser = {
      id: userId,
      name,
      email
    };
    
    mockUsers[userId] = {
      user: newUser,
      password,
      token
    };
    
    return {
      user: newUser,
      token
    };
  },
  
  async getUser() {
    // Simulate network delay
    await new Promise(resolve => setTimeout(resolve, 500));
    
    const user = localStorage.getItem('user');
    if (!user) {
      throw new Error('Not authenticated');
    }
    
    const userData = JSON.parse(user);
    return userData;
  }
};

// Order API (mock implementation)
export const orderApi = {
  async create(order: Omit<Order, 'id' | 'date' | 'status'>) {
    // Simulate network delay
    await new Promise(resolve => setTimeout(resolve, 500));
    
    const user = localStorage.getItem('user');
    if (!user) {
      throw new Error('Not authenticated');
    }
    
    const userId = JSON.parse(user).id;
    
    const newOrder: Order = {
      id: `order_${Date.now()}`,
      userId: userId,
      items: order.items,
      total: order.total,
      status: 'pending',
      date: new Date().toISOString(),
      shippingAddress: order.shippingAddress
    };
    
    mockOrders.push(newOrder);
    return newOrder;
  },
  
  async getAll() {
    // Simulate network delay
    await new Promise(resolve => setTimeout(resolve, 500));
    
    const user = localStorage.getItem('user');
    if (!user) {
      throw new Error('Not authenticated');
    }
    
    const userId = JSON.parse(user).id;
    return mockOrders.filter(order => order.userId === userId);
  },
  
  async getById(id: string) {
    // Simulate network delay
    await new Promise(resolve => setTimeout(resolve, 500));
    
    const user = localStorage.getItem('user');
    if (!user) {
      throw new Error('Not authenticated');
    }
    
    const userId = JSON.parse(user).id;
    const order = mockOrders.find(order => order.id === id && order.userId === userId);
    
    if (!order) {
      throw new Error('Order not found');
    }
    
    return order;
  }
};

// Use mock APIs
export const api = {
  products: productApi,
  auth: authApi,
  orders: orderApi,
};

export default api;
