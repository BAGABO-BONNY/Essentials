
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Product } from '@/lib/types';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ShoppingCart, Star, ImageIcon, Heart } from 'lucide-react';
import { useCart } from '@/context/CartContext';
import { useWishlist } from '@/context/WishlistContext';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';

interface ProductCardProps {
  product: Product;
}

const ProductCard = ({ product }: ProductCardProps) => {
  const [isHovered, setIsHovered] = useState(false);
  const [imageError, setImageError] = useState(false);
  const { addToCart } = useCart();
  const { addToWishlist, isInWishlist } = useWishlist();

  const isProductInWishlist = isInWishlist(product.id);
  
  // Fallback image for when the product image fails to load
  const fallbackImage = "https://images.unsplash.com/photo-1505843490701-5c4b83b47dc3?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80";

  return (
    <Card 
      className="overflow-hidden transition-all duration-300 group border-border hover:shadow-md"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <Link to={`/product/${product.id}`} className="relative block overflow-hidden aspect-square">
        {!imageError ? (
          <img 
            src={product.images && product.images.length > 0 ? product.images[0] : fallbackImage} 
            alt={product.name}
            className="w-full h-full object-cover object-center transition-transform duration-700 group-hover:scale-105"
            onError={() => setImageError(true)}
          />
        ) : (
          <img 
            src={fallbackImage}
            alt={product.name}
            className="w-full h-full object-cover object-center transition-transform duration-700 group-hover:scale-105"
          />
        )}
        {product.featured && (
          <div className="absolute top-2 left-2 bg-primary text-primary-foreground text-xs font-medium px-2 py-1 rounded">
            Featured
          </div>
        )}
        
        <Button 
          variant="ghost" 
          size="icon"
          className="absolute top-2 right-2 bg-white/80 dark:bg-black/50 backdrop-blur-sm hover:bg-white dark:hover:bg-black/70 text-foreground transition-opacity duration-300"
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            addToWishlist(product);
          }}
        >
          <Heart 
            className={`h-4 w-4 ${isProductInWishlist ? 'fill-red-500 text-red-500' : 'text-foreground'}`} 
          />
        </Button>
      </Link>
      
      <CardContent className="p-4">
        <div className="flex items-center space-x-1 mb-2">
          <Star className="h-3.5 w-3.5 fill-primary text-primary" />
          <span className="text-sm font-medium">{product.rating}</span>
        </div>
        
        <Link to={`/product/${product.id}`}>
          <h3 className="font-medium text-base mb-1 transition-colors hover:text-primary">{product.name}</h3>
        </Link>
        
        <p className="text-sm text-muted-foreground mb-4">{product.category}</p>
        
        <div className="flex justify-between items-center">
          <span className="font-medium">${product.price.toFixed(2)}</span>
          
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button 
                  variant="ghost" 
                  size="sm" 
                  className="transition-opacity duration-300"
                  onClick={(e) => {
                    e.preventDefault();
                    addToCart(product);
                  }}
                >
                  <ShoppingCart className="h-4 w-4 mr-2" />
                  <span>Add</span>
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>Add to cart</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
      </CardContent>
    </Card>
  );
};

export default ProductCard;
