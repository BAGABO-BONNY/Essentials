
import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getProductById } from '@/lib/data';
import { Button } from '@/components/ui/button';
import { ShoppingCart, Star, Minus, Plus, ChevronLeft, ChevronRight } from 'lucide-react';
import { useCart } from '@/context/CartContext';

const ProductDetail = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { addToCart } = useCart();
  
  const [product, setProduct] = useState(id ? getProductById(id) : null);
  const [quantity, setQuantity] = useState(1);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isImageLoading, setIsImageLoading] = useState(true);
  
  useEffect(() => {
    if (id) {
      const foundProduct = getProductById(id);
      if (foundProduct) {
        setProduct(foundProduct);
      } else {
        navigate('/products');
      }
    }
  }, [id, navigate]);
  
  if (!product) {
    return (
      <div className="page-container">
        <div className="text-center py-12">
          <h2 className="text-2xl font-medium mb-4">Product not found</h2>
          <Button onClick={() => navigate('/products')}>Back to Products</Button>
        </div>
      </div>
    );
  }
  
  const handleQuantityChange = (newQuantity: number) => {
    if (newQuantity >= 1) {
      setQuantity(newQuantity);
    }
  };
  
  const handleAddToCart = () => {
    addToCart(product, quantity);
  };
  
  const handlePrevImage = () => {
    setIsImageLoading(true);
    setCurrentImageIndex((prev) => 
      prev === 0 ? product.images.length - 1 : prev - 1
    );
  };
  
  const handleNextImage = () => {
    setIsImageLoading(true);
    setCurrentImageIndex((prev) => 
      prev === product.images.length - 1 ? 0 : prev + 1
    );
  };

  return (
    <div className="animate-fade-in">
      <div className="page-container py-8 md:py-16">
        <Button 
          variant="ghost" 
          className="mb-6" 
          onClick={() => navigate('/products')}
        >
          <ChevronLeft className="h-4 w-4 mr-2" />
          Back to Products
        </Button>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-16">
          {/* Product Images */}
          <div className="relative">
            <div className="aspect-square overflow-hidden rounded-lg bg-muted relative">
              {product.images.length > 0 && (
                <>
                  <div className={`absolute inset-0 transition-opacity duration-500 ${isImageLoading ? 'opacity-100' : 'opacity-0'}`}>
                    <div className="absolute inset-0 bg-muted/50 backdrop-blur-sm flex items-center justify-center">
                      <div className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin"></div>
                    </div>
                  </div>
                  <img 
                    src={product.images[currentImageIndex]} 
                    alt={product.name}
                    className="w-full h-full object-cover object-center"
                    onLoad={() => setIsImageLoading(false)}
                  />
                </>
              )}
              
              {product.images.length > 1 && (
                <>
                  <Button 
                    variant="ghost" 
                    size="icon" 
                    className="absolute left-2 top-1/2 -translate-y-1/2 bg-white/80 dark:bg-black/50 hover:bg-white dark:hover:bg-black/80 backdrop-blur-sm h-8 w-8 rounded-full"
                    onClick={handlePrevImage}
                  >
                    <ChevronLeft className="h-4 w-4" />
                  </Button>
                  <Button 
                    variant="ghost" 
                    size="icon" 
                    className="absolute right-2 top-1/2 -translate-y-1/2 bg-white/80 dark:bg-black/50 hover:bg-white dark:hover:bg-black/80 backdrop-blur-sm h-8 w-8 rounded-full"
                    onClick={handleNextImage}
                  >
                    <ChevronRight className="h-4 w-4" />
                  </Button>
                </>
              )}
            </div>
            
            {/* Thumbnails */}
            {product.images.length > 1 && (
              <div className="flex space-x-2 mt-4 overflow-x-auto pb-2">
                {product.images.map((image, index) => (
                  <button
                    key={index}
                    className={`w-16 h-16 rounded overflow-hidden flex-shrink-0 transition ${
                      currentImageIndex === index ? 'ring-2 ring-primary' : 'opacity-70 hover:opacity-100'
                    }`}
                    onClick={() => {
                      setIsImageLoading(true);
                      setCurrentImageIndex(index);
                    }}
                  >
                    <img 
                      src={image} 
                      alt={`${product.name} - view ${index + 1}`}
                      className="w-full h-full object-cover object-center"
                    />
                  </button>
                ))}
              </div>
            )}
          </div>
          
          {/* Product Info */}
          <div className="space-y-6">
            <div>
              <div className="flex items-center space-x-1 mb-2">
                <Star className="h-4 w-4 fill-primary text-primary" />
                <span className="text-sm font-medium">{product.rating} Rating</span>
              </div>
              
              <h1 className="text-3xl md:text-4xl font-medium">{product.name}</h1>
              <p className="text-muted-foreground mt-2">{product.category}</p>
              
              <div className="mt-4">
                <p className="text-2xl font-medium">${product.price.toFixed(2)}</p>
              </div>
            </div>
            
            <div className="border-t border-border pt-6">
              <p className="text-muted-foreground">{product.description}</p>
            </div>
            
            <div className="border-t border-border pt-6">
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
              
              <div className="flex flex-col sm:flex-row gap-4">
                <Button 
                  className="flex-1"
                  onClick={handleAddToCart}
                >
                  <ShoppingCart className="h-4 w-4 mr-2" />
                  Add to Cart
                </Button>
                <Button 
                  variant="outline"
                  className="flex-1"
                  onClick={() => {
                    handleAddToCart();
                    navigate('/cart');
                  }}
                >
                  Buy Now
                </Button>
              </div>
            </div>
            
            <div className="border-t border-border pt-6">
              <h3 className="font-medium mb-2">Product Details</h3>
              <ul className="space-y-2 text-muted-foreground">
                <li>Free shipping on orders over $100</li>
                <li>30-day money-back guarantee</li>
                <li>Premium quality materials</li>
                <li>Sustainably manufactured</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
