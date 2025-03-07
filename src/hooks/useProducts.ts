
import { useQuery } from '@tanstack/react-query';
import api from '@/lib/api';
import { Product } from '@/lib/types';

export function useProducts() {
  return useQuery({
    queryKey: ['products'],
    queryFn: () => api.products.getAll(),
  });
}

export function useProductById(id: string) {
  return useQuery({
    queryKey: ['product', id],
    queryFn: () => api.products.getById(id),
    enabled: !!id,
  });
}

export function useProductsByCategory(category: string) {
  return useQuery({
    queryKey: ['products', 'category', category],
    queryFn: () => api.products.getByCategory(category),
    enabled: !!category,
  });
}

export function useFeaturedProducts() {
  return useQuery({
    queryKey: ['products', 'featured'],
    queryFn: () => api.products.getFeatured(),
  });
}
