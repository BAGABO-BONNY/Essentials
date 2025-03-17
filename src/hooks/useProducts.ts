
import { useQuery } from '@tanstack/react-query';
import api from '@/lib/api';
import { toast } from '@/components/ui/use-toast';
import { Product } from '@/lib/types';

export function useProducts() {
  return useQuery({
    queryKey: ['products'],
    queryFn: () => api.products.getAll(),
    retry: 2,
    meta: {
      onError: (error: Error) => {
        toast({
          title: 'Error loading products',
          description: error instanceof Error ? error.message : 'Something went wrong',
          variant: 'destructive',
        });
      },
    },
  });
}

export function useProductById(id: string) {
  return useQuery({
    queryKey: ['product', id],
    queryFn: () => api.products.getById(id),
    enabled: !!id,
    retry: 1,
    meta: {
      onError: (error: Error) => {
        toast({
          title: 'Error loading product',
          description: error instanceof Error ? error.message : 'Something went wrong',
          variant: 'destructive',
        });
      },
    },
  });
}

export function useProductsByCategory(category: string) {
  return useQuery({
    queryKey: ['products', 'category', category],
    queryFn: () => api.products.getByCategory(category),
    enabled: !!category,
    retry: 1,
    meta: {
      onError: (error: Error) => {
        toast({
          title: 'Error loading products',
          description: error instanceof Error ? error.message : 'Something went wrong',
          variant: 'destructive',
        });
      },
    },
  });
}

export function useFeaturedProducts() {
  return useQuery({
    queryKey: ['products', 'featured'],
    queryFn: () => api.products.getFeatured(),
    retry: 1,
    meta: {
      onError: (error: Error) => {
        toast({
          title: 'Error loading featured products',
          description: error instanceof Error ? error.message : 'Something went wrong',
          variant: 'destructive',
        });
      },
    },
  });
}

export type SortOption = 'newest' | 'price-low' | 'price-high' | 'rating' | 'popularity';
export type PriceRange = [number, number];
export type FilterOptions = {
  category?: string;
  priceRange?: PriceRange;
  inStock?: boolean;
  featured?: boolean;
  searchTerm?: string;
  sortBy?: SortOption;
};

export function useFilteredProducts(options: FilterOptions = {}) {
  const {
    category,
    priceRange = [0, 10000],
    inStock,
    featured,
    searchTerm = '',
    sortBy = 'newest'
  } = options;

  return useQuery({
    queryKey: ['products', 'filtered', { category, priceRange, inStock, featured, searchTerm, sortBy }],
    queryFn: async () => {
      let products: Product[] = [];
      
      // Get base products list
      if (category && category !== 'All') {
        products = await api.products.getByCategory(category);
      } else {
        products = await api.products.getAll();
      }
      
      // Apply filters
      products = products.filter(product => {
        // Price range filter
        const withinPriceRange = product.price >= priceRange[0] && product.price <= priceRange[1];
        
        // In stock filter
        const stockMatch = inStock !== undefined ? product.inStock === inStock : true;
        
        // Featured filter
        const featuredMatch = featured !== undefined ? product.featured === featured : true;
        
        // Search term filter
        const matchesSearch = searchTerm 
          ? product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            product.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
            product.category.toLowerCase().includes(searchTerm.toLowerCase())
          : true;
        
        return withinPriceRange && stockMatch && featuredMatch && matchesSearch;
      });
      
      // Apply sorting
      switch (sortBy) {
        case 'price-low':
          products.sort((a, b) => a.price - b.price);
          break;
        case 'price-high':
          products.sort((a, b) => b.price - a.price);
          break;
        case 'rating':
          products.sort((a, b) => b.rating - a.rating);
          break;
        case 'popularity':
          // For demo purposes, we're using the rating as a proxy for popularity
          products.sort((a, b) => b.rating - a.rating);
          break;
        case 'newest':
        default:
          // For demo purposes, we'll keep the default order from the API
          break;
      }
      
      return products;
    },
    retry: 1,
    meta: {
      onError: (error: Error) => {
        toast({
          title: 'Error loading products',
          description: error instanceof Error ? error.message : 'Something went wrong',
          variant: 'destructive',
        });
      },
    },
  });
}

export function useProductsByNewCategories() {
  const { data: allProducts, isLoading, error } = useProducts();
  
  const productsByCategory = !isLoading && !error && allProducts
    ? categories.reduce((acc, category) => {
        if (category !== 'All') {
          acc[category] = allProducts.filter(product => product.category === category);
        }
        return acc;
      }, {} as Record<string, Product[]>)
    : {};
    
  return {
    productsByCategory,
    isLoading,
    error
  };
}
