import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Dialog, DialogContent, DialogClose } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { Star, Minus, Plus, ShoppingCart, X } from 'lucide-react';
import { Product } from '@/lib/types';
import { useCart } from '@/context/CartContext';
import { toast } from '@/components/ui/use-toast';

interface QuickViewModalProps {
  product: Product;
  isOpen: boolean;
  onClose: () => void;
}

const QuickViewModal = ({ product, isOpen, onClose }: QuickViewModalProps) => {
  const [quantity, setQuantity] = useState(1);
  const { addToCart } = useCart();
  const [imageError, setImageError] = useState(false);
  
  // Fallback image for when product images are missing or fail to load
  const fallbackImage = "https://images.unsplash.com/photo-1505843490701-5c4b83b47dc3?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80";
  
  const handleQuantityChange = (newQuantity: number) => {
    if (newQuantity >= 1) {
      setQuantity(newQuantity);
    }
  };
  
  const handleAddToCart = () => {
    addToCart(product, quantity);
    toast({
      description: `${product.name} added to cart`,
    });
    onClose();
  };
  
  // Track product view
  const addToRecentlyViewed = () => {
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
  
  // Get the display image (either from product or fallback)
  const displayImage = !imageError && product.images && product.images.length > 0
    ? product.images[0]
    : fallbackImage;
  
  return (
    <Dialog open={isOpen} onOpenChange={(open) => {
      if (!open) {
        onClose();
      } else {
        addToRecentlyViewed();
      }
    }}>
      <DialogContent className="sm:max-w-[900px] p-0 overflow-hidden">
        <DialogClose className="absolute right-4 top-4 z-10">
          <X className="h-4 w-4" />
        </DialogClose>
        
        <div className="grid grid-cols-1 md:grid-cols-2">
          <div className="aspect-square bg-muted">
            <img 
              src={displayImage}
              alt={product.name}
              className="w-full h-full object-cover object-center"
              onError={() => setImageError(true)}
            />
          </div>
          
          <div className="p-6 overflow-y-auto max-h-[80vh]">
            <div className="flex items-center space-x-1 mb-2">
              <Star className="h-4 w-4 fill-primary text-primary" />
              <span className="text-sm font-medium">{product.rating} Rating</span>
            </div>
            
            <h2 className="text-2xl font-medium mb-2">{product.name}</h2>
            <p className="text-muted-foreground mb-4">{product.category}</p>
            
            <div className="text-xl font-medium mb-4">${product.price.toFixed(2)}</div>
            
            <Separator className="my-4" />
            
            <p className="text-sm text-muted-foreground mb-4 line-clamp-3">
              {product.description}
            </p>
            
            <div className="flex items-center mb-6">
              <Button 
                variant="outline" 
                size="icon" 
                onClick={() => handleQuantityChange(quantity - 1)}
                disabled={quantity <= 1}
              >
                <Minus className="h-4 w-4" />
              </Button>
              <span className="w-12 text-center">{quantity}</span>
              <Button 
                variant="outline" 
                size="icon" 
                onClick={() => handleQuantityChange(quantity + 1)}
              >
                <Plus className="h-4 w-4" />
              </Button>
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <Button 
                onClick={handleAddToCart}
                className="w-full"
              >
                <ShoppingCart className="h-4 w-4 mr-2" />
                Add to Cart
              </Button>
              
              <Button 
                variant="outline"
                asChild
                className="w-full"
              >
                <Link to={`/product/${product.id}`}>View Details</Link>
              </Button>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default QuickViewModal;
