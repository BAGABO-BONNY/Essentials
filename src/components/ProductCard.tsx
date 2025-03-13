
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Product } from '@/lib/types';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ShoppingCart, Star, ImageIcon } from 'lucide-react';
import { useCart } from '@/context/CartContext';

interface ProductCardProps {
  product: Product;
}

const ProductCard = ({ product }: ProductCardProps) => {
  const [isHovered, setIsHovered] = useState(false);
  const [imageError, setImageError] = useState(false);
  const { addToCart } = useCart();

  return (
    <Card 
      className="overflow-hidden transition-all duration-300 group border-border hover:shadow-md"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <Link to={`/product/${product.id}`} className="relative block overflow-hidden aspect-square">
        {product.images && product.images.length > 0 && !imageError ? (
          <img 
            src={product.images[0]} 
            alt={product.name}
            className="w-full h-full object-cover object-center transition-transform duration-700 group-hover:scale-105"
            onError={() => setImageError(true)}
          />
        ) : (
          <div className="w-full h-full bg-muted flex items-center justify-center">
            <ImageIcon className="h-16 w-16 text-muted-foreground opacity-50" />
          </div>
        )}
        {product.featured && (
          <div className="absolute top-2 left-2 bg-primary text-primary-foreground text-xs font-medium px-2 py-1 rounded">
            Featured
          </div>
        )}
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
        </div>
      </CardContent>
    </Card>
  );
};

export default ProductCard;
