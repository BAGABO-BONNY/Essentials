
import { useQuery } from '@tanstack/react-query';
import api from '@/lib/api';
import { toast } from '@/components/ui/use-toast';

export function useProducts() {
  return useQuery({
    queryKey: ['products'],
    queryFn: () => api.products.getAll(),
    retry: 2,
    onError: (error) => {
      toast({
        title: 'Error loading products',
        description: error instanceof Error ? error.message : 'Something went wrong',
        variant: 'destructive',
      });
    },
  });
}

export function useProductById(id: string) {
  return useQuery({
    queryKey: ['product', id],
    queryFn: () => api.products.getById(id),
    enabled: !!id,
    retry: 1,
    onError: (error) => {
      toast({
        title: 'Error loading product',
        description: error instanceof Error ? error.message : 'Something went wrong',
        variant: 'destructive',
      });
    },
  });
}

export function useProductsByCategory(category: string) {
  return useQuery({
    queryKey: ['products', 'category', category],
    queryFn: () => api.products.getByCategory(category),
    enabled: !!category,
    retry: 1,
    onError: (error) => {
      toast({
        title: 'Error loading products',
        description: error instanceof Error ? error.message : 'Something went wrong',
        variant: 'destructive',
      });
    },
  });
}

export function useFeaturedProducts() {
  return useQuery({
    queryKey: ['products', 'featured'],
    queryFn: () => api.products.getFeatured(),
    retry: 1,
    onError: (error) => {
      toast({
        title: 'Error loading featured products',
        description: error instanceof Error ? error.message : 'Something went wrong',
        variant: 'destructive',
      });
    },
  });
}
