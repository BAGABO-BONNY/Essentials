
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Product } from '@/lib/types';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ShoppingCart, Star, Heart } from 'lucide-react';
import { useCart } from '@/context/CartContext';
import { useWishlist } from '@/context/WishlistContext';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import QuickViewButton from '@/components/QuickViewButton';
import CompareButton from '@/components/CompareButton';
import { getProductImage } from '@/lib/imageUtils';
import { toast } from '@/components/ui/use-toast';

interface ProductCardProps {
  product: Product;
}

const ProductCard = ({ product }: ProductCardProps) => {
  const [isHovered, setIsHovered] = useState(false);
  const [imageError, setImageError] = useState(false);
  const { addToCart } = useCart();
  const { addToWishlist, isInWishlist } = useWishlist();

  const isProductInWishlist = isInWishlist(product.id);
  
  // Track product view when clicking on product
  const handleProductClick = () => {
    const recentItems = localStorage.getItem('recentlyViewed');
    let recentProducts = recentItems ? JSON.parse(recentItems) : [];
    
    // Remove product if it already exists in the list
    recentProducts = recentProducts.filter((p: Product) => p.id !== product.id);
    
    // Add product to the beginning of the array
    recentProducts.unshift(product);
    
    // Keep only the last 8 products
    recentProducts = recentProducts.slice(0, 8);
    
    localStorage.setItem('recentlyViewed', JSON.stringify(recentProducts));
  };
  
  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    addToCart(product);
    toast({
      description: `${product.name} added to cart`,
    });
  };

  // Get appropriate image with fallback
  const displayImage = !imageError 
    ? getProductImage(product.images, product.category)
    : getProductImage(undefined, product.category);

  return (
    <Card 
      className="overflow-hidden transition-all duration-300 group border-border hover:shadow-md"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <Link 
        to={`/product/${product.id}`} 
        className="relative block overflow-hidden aspect-square"
        onClick={handleProductClick}
      >
        <img 
          src={displayImage} 
          alt={product.name}
          className="w-full h-full object-cover object-center transition-transform duration-700 group-hover:scale-105"
          onError={() => setImageError(true)}
        />
        
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
            toast({
              description: isProductInWishlist 
                ? `${product.name} removed from wishlist` 
                : `${product.name} added to wishlist`,
            });
          }}
        >
          <Heart 
            className={`h-4 w-4 ${isProductInWishlist ? 'fill-red-500 text-red-500' : 'text-foreground'}`} 
          />
        </Button>
        
        <CompareButton product={product} />
        <QuickViewButton product={product} />
      </Link>
      
      <CardContent className="p-4">
        <div className="flex items-center space-x-1 mb-2">
          <Star className="h-3.5 w-3.5 fill-primary text-primary" />
          <span className="text-sm font-medium">{product.rating}</span>
          <span className="text-xs text-muted-foreground">(120+ reviews)</span>
        </div>
        
        <Link to={`/product/${product.id}`} onClick={handleProductClick}>
          <h3 className="font-medium text-base mb-1 transition-colors hover:text-primary">{product.name}</h3>
        </Link>
        
        <p className="text-sm text-muted-foreground mb-2">{product.category}</p>
        
        <p className="text-xs text-muted-foreground mb-4 line-clamp-2">
          {product.description}
        </p>
        
        <div className="flex justify-between items-center">
          <div>
            <span className="font-medium">${product.price.toFixed(2)}</span>
            {product.price > 100 && (
              <span className="text-xs text-green-600 ml-2">Free Shipping</span>
            )}
          </div>
          
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button 
                  variant="ghost" 
                  size="sm" 
                  className="transition-opacity duration-300"
                  onClick={handleAddToCart}
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
