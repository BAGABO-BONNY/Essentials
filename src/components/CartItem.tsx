
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Trash, Plus, Minus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { CartItem as CartItemType } from '@/lib/types';
import { useCart } from '@/context/CartContext';
import { getProductImage } from '@/lib/imageUtils';
import { toast } from '@/components/ui/use-toast';

interface CartItemProps {
  item: CartItemType;
}

const CartItem = ({ item }: CartItemProps) => {
  const { product, quantity } = item;
  const { updateQuantity, removeFromCart } = useCart();
  const [isHovered, setIsHovered] = useState(false);
  const [imageError, setImageError] = useState(false);

  const handleRemove = () => {
    removeFromCart(product.id);
    toast({
      description: `${product.name} removed from cart`,
    });
  };

  // Get appropriate image with fallback
  const displayImage = !imageError 
    ? getProductImage(product.images, product.category)
    : getProductImage(undefined, product.category);

  return (
    <div 
      className="flex items-center py-4 gap-4 relative border-b border-border last:border-none"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <Link to={`/product/${product.id}`} className="shrink-0 relative overflow-hidden rounded-md w-20 h-20">
        <img 
          src={displayImage} 
          alt={product.name}
          className="w-full h-full object-cover object-center"
          onError={() => setImageError(true)}
        />
      </Link>
      
      <div className="flex-1 min-w-0">
        <Link to={`/product/${product.id}`} className="block hover:text-primary">
          <h3 className="font-medium text-base mb-1 truncate">{product.name}</h3>
        </Link>
        <p className="text-sm text-muted-foreground mb-1">{product.category}</p>
        <p className="font-medium">${product.price.toFixed(2)}</p>
        {product.price > 100 && (
          <p className="text-xs text-green-600 mt-1">Free Shipping</p>
        )}
      </div>
      
      <div className="flex items-center space-x-2">
        <Button 
          variant="outline" 
          size="icon" 
          className="h-8 w-8"
          onClick={() => updateQuantity(product.id, quantity - 1)}
          disabled={quantity <= 1}
        >
          <Minus className="h-3 w-3" />
        </Button>
        
        <span className="w-8 text-center">{quantity}</span>
        
        <Button 
          variant="outline" 
          size="icon" 
          className="h-8 w-8"
          onClick={() => updateQuantity(product.id, quantity + 1)}
        >
          <Plus className="h-3 w-3" />
        </Button>
      </div>
      
      <div className="text-right shrink-0 w-24">
        <p className="font-medium">${(product.price * quantity).toFixed(2)}</p>
        <p className="text-xs text-muted-foreground mt-1">
          ${product.price.toFixed(2)} each
        </p>
      </div>
      
      <Button 
        variant="ghost" 
        size="icon" 
        className={`absolute right-0 top-2 opacity-0 transition-opacity duration-300 ${isHovered ? 'opacity-100' : ''}`}
        onClick={handleRemove}
      >
        <Trash className="h-4 w-4" />
      </Button>
    </div>
  );
};

export default CartItem;
