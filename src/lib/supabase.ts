
import { createClient } from '@supabase/supabase-js';
import { Product, User, Order } from './types';

// Get environment variables for Supabase
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || '';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || '';

// Create Supabase client
export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Product-related API functions
export const productApi = {
  async getAll(): Promise<Product[]> {
    const { data, error } = await supabase
      .from('products')
      .select('*');
    
    if (error) throw new Error(error.message);
    return data || [];
  },

  async getById(id: string): Promise<Product> {
    const { data, error } = await supabase
      .from('products')
      .select('*')
      .eq('id', id)
      .single();
    
    if (error) throw new Error(error.message);
    if (!data) throw new Error('Product not found');
    return data;
  },

  async getByCategory(category: string): Promise<Product[]> {
    const { data, error } = await supabase
      .from('products')
      .select('*')
      .eq('category', category);
    
    if (error) throw new Error(error.message);
    return data || [];
  },

  async getFeatured(): Promise<Product[]> {
    const { data, error } = await supabase
      .from('products')
      .select('*')
      .eq('featured', true)
      .limit(4);
    
    if (error) throw new Error(error.message);
    return data || [];
  }
};

// Auth-related API functions
export const authApi = {
  async login(email: string, password: string) {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password
    });
    
    if (error) throw new Error(error.message);
    
    if (!data.user) throw new Error('User not found');
    
    // Get user profile data
    const { data: userData, error: userError } = await supabase
      .from('users')
      .select('*')
      .eq('id', data.user.id)
      .single();
    
    if (userError) throw new Error(userError.message);
    
    return {
      user: userData as User,
      token: data.session?.access_token || ''
    };
  },
  
  async register(name: string, email: string, password: string) {
    // Register the user with Supabase Auth
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
    });
    
    if (error) throw new Error(error.message);
    if (!data.user) throw new Error('Failed to create user');
    
    // Create the user profile in the users table
    const { error: profileError } = await supabase
      .from('users')
      .insert([{ 
        id: data.user.id, 
        name,
        email
      }]);
    
    if (profileError) throw new Error(profileError.message);
    
    return {
      user: {
        id: data.user.id,
        name,
        email
      } as User,
      token: data.session?.access_token || ''
    };
  },
  
  async getUser() {
    const { data, error } = await supabase.auth.getUser();
    
    if (error) throw new Error(error.message);
    if (!data.user) throw new Error('User not found');
    
    // Get user profile data
    const { data: userData, error: userError } = await supabase
      .from('users')
      .select('*')
      .eq('id', data.user.id)
      .single();
    
    if (userError) throw new Error(userError.message);
    
    return userData as User;
  }
};

// Order-related API functions
export const orderApi = {
  async create(order: Omit<Order, 'id' | 'date' | 'status'>) {
    // Get current user
    const { data: authData } = await supabase.auth.getUser();
    if (!authData.user) throw new Error('Not authenticated');
    
    const newOrder = {
      ...order,
      date: new Date().toISOString(),
      status: 'pending' as const
    };
    
    const { data, error } = await supabase
      .from('orders')
      .insert([newOrder])
      .select()
      .single();
    
    if (error) throw new Error(error.message);
    return data as Order;
  },
  
  async getAll() {
    // Get current user
    const { data: authData } = await supabase.auth.getUser();
    if (!authData.user) throw new Error('Not authenticated');
    
    const { data, error } = await supabase
      .from('orders')
      .select(`
        *,
        items:order_items (
          *,
          product:products (*)
        )
      `)
      .eq('userId', authData.user.id)
      .order('date', { ascending: false });
    
    if (error) throw new Error(error.message);
    
    // Transform the data to match our Order type
    const orders = data.map(order => {
      return {
        ...order,
        items: order.items.map((item: any) => ({
          product: item.product,
          quantity: item.quantity
        }))
      };
    });
    
    return orders as Order[];
  },
  
  async getById(id: string) {
    // Get current user
    const { data: authData } = await supabase.auth.getUser();
    if (!authData.user) throw new Error('Not authenticated');
    
    const { data, error } = await supabase
      .from('orders')
      .select(`
        *,
        items:order_items (
          *,
          product:products (*)
        )
      `)
      .eq('id', id)
      .eq('userId', authData.user.id)
      .single();
    
    if (error) throw new Error(error.message);
    
    // Transform the data to match our Order type
    const order = {
      ...data,
      items: data.items.map((item: any) => ({
        product: item.product,
        quantity: item.quantity
      }))
    };
    
    return order as Order;
  }
};
