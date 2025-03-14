
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Trash, Plus, Minus, Heart } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { CartItem as CartItemType } from '@/lib/types';
import { useCart } from '@/context/CartContext';
import { useWishlist } from '@/context/WishlistContext';
import { getProductImage } from '@/lib/imageUtils';
import { toast } from '@/components/ui/use-toast';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface CartItemProps {
  item: CartItemType;
}

const CartItem = ({ item }: CartItemProps) => {
  const { product, quantity } = item;
  const { 
    updateQuantity, 
    removeFromCart, 
    incrementQuantity, 
    decrementQuantity,
    maxQuantityPerItem 
  } = useCart();
  const { addToWishlist, isInWishlist } = useWishlist();
  const [isHovered, setIsHovered] = useState(false);
  const [imageError, setImageError] = useState(false);

  const handleRemove = () => {
    removeFromCart(product.id);
    toast({
      description: `${product.name} removed from cart`,
    });
  };
  
  const moveToWishlist = () => {
    if (!isInWishlist(product.id)) {
      addToWishlist(product);
      removeFromCart(product.id);
      toast({
        description: `${product.name} moved to wishlist`,
      });
    } else {
      toast({
        description: `${product.name} is already in your wishlist`,
      });
    }
  };

  // Get appropriate image with fallback
  const displayImage = !imageError 
    ? getProductImage(product.images, product.category)
    : getProductImage(undefined, product.category);
    
  // Generate quantity options for select
  const quantityOptions = Array.from({ length: maxQuantityPerItem }, (_, i) => i + 1);

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
        
        <div className="flex mt-2 space-x-2 md:hidden">
          <Button 
            variant="outline" 
            size="icon" 
            className="h-7 w-7 rounded-full"
            onClick={() => decrementQuantity(product.id)}
          >
            <Minus className="h-3 w-3" />
          </Button>
          
          <div className="w-7 flex items-center justify-center text-sm">
            {quantity}
          </div>
          
          <Button 
            variant="outline" 
            size="icon" 
            className="h-7 w-7 rounded-full"
            onClick={() => incrementQuantity(product.id)}
          >
            <Plus className="h-3 w-3" />
          </Button>
        </div>
      </div>
      
      {/* Desktop Quantity Controls */}
      <div className="hidden md:flex items-center space-x-2">
        <Button 
          variant="outline" 
          size="icon" 
          className="h-8 w-8"
          onClick={() => decrementQuantity(product.id)}
        >
          <Minus className="h-3 w-3" />
        </Button>
        
        <Select 
          value={quantity.toString()} 
          onValueChange={(value) => updateQuantity(product.id, parseInt(value))}
        >
          <SelectTrigger className="w-14 h-8">
            <SelectValue placeholder={quantity} />
          </SelectTrigger>
          <SelectContent>
            {quantityOptions.map((num) => (
              <SelectItem key={num} value={num.toString()}>
                {num}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        
        <Button 
          variant="outline" 
          size="icon" 
          className="h-8 w-8"
          onClick={() => incrementQuantity(product.id)}
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
      
      <div className={`absolute right-0 top-4 flex flex-col gap-2 transition-opacity duration-300 ${isHovered ? 'opacity-100' : 'opacity-0'}`}>
        <Button 
          variant="ghost" 
          size="icon" 
          className="h-8 w-8"
          onClick={handleRemove}
          title="Remove from cart"
        >
          <Trash className="h-4 w-4" />
        </Button>
        
        <Button 
          variant="ghost" 
          size="icon" 
          className="h-8 w-8"
          onClick={moveToWishlist}
          title="Move to wishlist"
        >
          <Heart className={`h-4 w-4 ${isInWishlist(product.id) ? 'fill-red-500 text-red-500' : ''}`} />
        </Button>
      </div>
    </div>
  );
};

export default CartItem;
