import React, { createContext, useContext, useState, useEffect } from 'react';
import { CartItem, Product } from '@/lib/types';
import { toast } from '@/components/ui/use-toast';

interface CartContextType {
  cart: CartItem[];
  addToCart: (product: Product, quantity?: number) => void;
  removeFromCart: (productId: string) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  clearCart: () => void;
  totalItems: number;
  subtotal: number;
  isInCart: (productId: string) => boolean;
  getCartItemQuantity: (productId: string) => number;
  incrementQuantity: (productId: string) => void;
  decrementQuantity: (productId: string) => void;
  maxQuantityPerItem: number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

const MAX_QUANTITY_PER_ITEM = 10;

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [mounted, setMounted] = useState(false);

  const totalItems = cart.reduce((total, item) => total + item.quantity, 0);
  const subtotal = cart.reduce((total, item) => total + (item.product.price * item.quantity), 0);

  useEffect(() => {
    const storedCart = localStorage.getItem('cart');
    if (storedCart) {
      try {
        setCart(JSON.parse(storedCart));
      } catch (error) {
        console.error('Failed to parse cart from localStorage', error);
      }
    }
    setMounted(true);
  }, []);

  useEffect(() => {
    if (mounted) {
      localStorage.setItem('cart', JSON.stringify(cart));
    }
  }, [cart, mounted]);

  const isInCart = (productId: string): boolean => {
    return cart.some(item => item.product.id === productId);
  };

  const getCartItemQuantity = (productId: string): number => {
    const item = cart.find(item => item.product.id === productId);
    return item ? item.quantity : 0;
  };

  const addToCart = (product: Product, quantity = 1) => {
    if (quantity <= 0) return;
    
    setCart(prevCart => {
      const existingItem = prevCart.find(item => item.product.id === product.id);
      
      if (existingItem) {
        const newQuantity = Math.min(existingItem.quantity + quantity, MAX_QUANTITY_PER_ITEM);
        
        if (existingItem.quantity === MAX_QUANTITY_PER_ITEM) {
          toast({
            description: `Maximum quantity of ${MAX_QUANTITY_PER_ITEM} items reached`,
          });
          return prevCart;
        }
        
        if (newQuantity === MAX_QUANTITY_PER_ITEM) {
          toast({
            description: `Added to maximum quantity of ${MAX_QUANTITY_PER_ITEM}`,
          });
        } else {
          toast({
            description: `${product.name} quantity updated in cart`,
          });
        }
        
        return prevCart.map(item => 
          item.product.id === product.id 
            ? { ...item, quantity: newQuantity } 
            : item
        );
      }
      
      toast({
        description: `${product.name} added to cart`,
      });
      
      return [...prevCart, { product, quantity }];
    });
  };

  const removeFromCart = (productId: string) => {
    setCart(prevCart => prevCart.filter(item => item.product.id !== productId));
    
    toast({
      description: "Item removed from cart",
    });
  };

  const updateQuantity = (productId: string, quantity: number) => {
    if (quantity < 1 || quantity > MAX_QUANTITY_PER_ITEM) return;
    
    setCart(prevCart => 
      prevCart.map(item => 
        item.product.id === productId 
          ? { ...item, quantity } 
          : item
      )
    );
  };

  const incrementQuantity = (productId: string) => {
    setCart(prevCart => {
      const existingItem = prevCart.find(item => item.product.id === productId);
      
      if (!existingItem) return prevCart;
      
      if (existingItem.quantity >= MAX_QUANTITY_PER_ITEM) {
        toast({
          description: `Maximum quantity of ${MAX_QUANTITY_PER_ITEM} items reached`,
        });
        return prevCart;
      }
      
      return prevCart.map(item => 
        item.product.id === productId 
          ? { ...item, quantity: item.quantity + 1 } 
          : item
      );
    });
  };

  const decrementQuantity = (productId: string) => {
    setCart(prevCart => {
      const existingItem = prevCart.find(item => item.product.id === productId);
      
      if (!existingItem) return prevCart;
      
      if (existingItem.quantity <= 1) {
        toast({
          description: "Item removed from cart",
        });
        return prevCart.filter(item => item.product.id !== productId);
      }
      
      return prevCart.map(item => 
        item.product.id === productId 
          ? { ...item, quantity: item.quantity - 1 } 
          : item
      );
    });
  };

  const clearCart = () => {
    setCart([]);
    toast({
      description: "Cart cleared",
    });
  };

  return (
    <CartContext.Provider value={{
      cart,
      addToCart,
      removeFromCart,
      updateQuantity,
      clearCart,
      totalItems,
      subtotal,
      isInCart,
      getCartItemQuantity,
      incrementQuantity,
      decrementQuantity,
      maxQuantityPerItem: MAX_QUANTITY_PER_ITEM
    }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = (): CartContextType => {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};
