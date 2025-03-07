
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import api from '@/lib/api';
import { Order } from '@/lib/types';
import { toast } from '@/components/ui/use-toast';

export function useOrders() {
  return useQuery({
    queryKey: ['orders'],
    queryFn: () => api.orders.getAll(),
    retry: 1,
    meta: {
      onError: (error: Error) => {
        toast({
          title: 'Error fetching orders',
          description: error instanceof Error ? error.message : 'Something went wrong',
          variant: 'destructive',
        });
      },
    },
  });
}

export function useOrderById(id: string) {
  return useQuery({
    queryKey: ['order', id],
    queryFn: () => api.orders.getById(id),
    enabled: !!id,
    retry: 1,
    meta: {
      onError: (error: Error) => {
        toast({
          title: 'Error fetching order details',
          description: error instanceof Error ? error.message : 'Something went wrong',
          variant: 'destructive',
        });
      },
    },
  });
}

export function useCreateOrder() {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: (orderData: Omit<Order, 'id' | 'date' | 'status'>) => 
      api.orders.create(orderData),
    onSuccess: () => {
      // Invalidate orders query to refresh the orders list
      queryClient.invalidateQueries({ queryKey: ['orders'] });
      
      toast({
        title: 'Order created',
        description: 'Your order has been placed successfully!',
      });
    },
    onError: (error) => {
      toast({
        title: 'Error creating order',
        description: error instanceof Error ? error.message : 'Something went wrong',
        variant: 'destructive',
      });
    },
  });
}
