
import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { ChevronLeft, X, ShoppingCart } from 'lucide-react';
import { Product } from '@/lib/types';
import { useCart } from '@/context/CartContext';
import { toast } from '@/components/ui/use-toast';

const Compare = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const navigate = useNavigate();
  const { addToCart } = useCart();
  
  // Fallback image for when product images are missing or fail to load
  const fallbackImage = "https://images.unsplash.com/photo-1505843490701-5c4b83b47dc3?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80";
  
  useEffect(() => {
    const compareProducts = localStorage.getItem('compareProducts');
    if (compareProducts) {
      setProducts(JSON.parse(compareProducts));
    } else {
      setProducts([]);
    }
  }, []);
  
  const removeFromComparison = (productId: string) => {
    const updatedProducts = products.filter(p => p.id !== productId);
    setProducts(updatedProducts);
    localStorage.setItem('compareProducts', JSON.stringify(updatedProducts));
    
    toast({
      description: "Product removed from comparison",
    });
    
    if (updatedProducts.length < 2) {
      navigate('/products');
    }
  };
  
  const clearComparison = () => {
    setProducts([]);
    localStorage.removeItem('compareProducts');
    navigate('/products');
    
    toast({
      description: "Comparison cleared",
    });
  };
  
  const handleAddToCart = (product: Product) => {
    addToCart(product);
    toast({
      description: `${product.name} added to cart`,
    });
  };
  
  if (products.length < 2) {
    return (
      <div className="page-container py-16 animate-fade-in">
        <div className="max-w-md mx-auto text-center">
          <h1 className="text-2xl font-medium mb-4">Product Comparison</h1>
          <p className="text-muted-foreground mb-6">
            Please select at least 2 products to compare.
          </p>
          <Button asChild>
            <Link to="/products">Browse Products</Link>
          </Button>
        </div>
      </div>
    );
  }
  
  // Get all unique attributes to compare
  const getAttributes = () => {
    return [
      { name: "Price", key: "price" },
      { name: "Category", key: "category" },
      { name: "Rating", key: "rating" },
      { name: "In Stock", key: "inStock" },
    ];
  };
  
  return (
    <div className="page-container py-8 md:py-16 animate-fade-in">
      <div className="flex justify-between items-center mb-8">
        <Button 
          variant="ghost" 
          onClick={() => navigate('/products')}
        >
          <ChevronLeft className="h-4 w-4 mr-2" />
          Back to Products
        </Button>
        
        <Button 
          variant="outline" 
          onClick={clearComparison}
        >
          Clear Comparison
        </Button>
      </div>
      
      <h1 className="text-3xl font-medium mb-8">Product Comparison</h1>
      
      <div className="w-full overflow-x-auto">
        <table className="w-full border-collapse">
          <thead>
            <tr>
              <th className="text-left p-4 min-w-[200px]">Product</th>
              {products.map(product => (
                <th key={product.id} className="p-4 min-w-[250px] text-center relative">
                  <Button 
                    variant="ghost" 
                    size="icon" 
                    className="absolute top-2 right-2"
                    onClick={() => removeFromComparison(product.id)}
                  >
                    <X className="h-4 w-4" />
                  </Button>
                  <img
                    src={product.images && product.images.length > 0 ? product.images[0] : fallbackImage}
                    alt={product.name}
                    className="w-full h-48 object-contain mb-4"
                    onError={(e) => { (e.target as HTMLImageElement).src = fallbackImage }}
                  />
                  <Link to={`/product/${product.id}`} className="hover:text-primary transition-colors">
                    <h3 className="font-medium text-lg mb-2">{product.name}</h3>
                  </Link>
                  <Button onClick={() => handleAddToCart(product)}>
                    <ShoppingCart className="h-4 w-4 mr-2" />
                    Add to Cart
                  </Button>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {getAttributes().map(attr => (
              <tr key={attr.key} className="border-t">
                <td className="font-medium p-4">{attr.name}</td>
                {products.map(product => (
                  <td key={`${product.id}-${attr.key}`} className="p-4 text-center">
                    {attr.key === 'price' && `$${product[attr.key].toFixed(2)}`}
                    {attr.key === 'inStock' && (
                      <span className={product[attr.key] ? "text-green-500" : "text-red-500"}>
                        {product[attr.key] ? "Yes" : "No"}
                      </span>
                    )}
                    {(attr.key !== 'price' && attr.key !== 'inStock') && product[attr.key]}
                  </td>
                ))}
              </tr>
            ))}
            <tr className="border-t">
              <td className="font-medium p-4">Description</td>
              {products.map(product => (
                <td key={`${product.id}-desc`} className="p-4 text-center">
                  <p className="line-clamp-3">{product.description}</p>
                </td>
              ))}
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Compare;
