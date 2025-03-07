
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import ProductCard from '@/components/ProductCard';
import { useFeaturedProducts } from '@/hooks/useProducts';
import { Button } from '@/components/ui/button';

const FeaturedProducts = () => {
  const [isVisible, setIsVisible] = useState(false);
  const { data: featuredProducts, isLoading, error } = useFeaturedProducts();

  useEffect(() => {
    const handleScroll = () => {
      const element = document.getElementById('featured-products');
      if (element) {
        const rect = element.getBoundingClientRect();
        const isInView = rect.top < window.innerHeight * 0.75;
        setIsVisible(isInView);
      }
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Check on initial render
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <section 
      id="featured-products" 
      className="section bg-gradient-to-b from-white to-gray-50 dark:from-transparent dark:to-black/10"
    >
      <div className="page-container">
        <div className={`mb-12 transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <h2 className="text-3xl font-medium mb-2">Featured Products</h2>
          <div className="flex items-center justify-between">
            <p className="text-muted-foreground">Our handpicked selection of premium products</p>
            <Link to="/products" className="flex items-center text-sm font-medium text-primary hover:underline">
              View All <ArrowRight className="ml-1 h-4 w-4" />
            </Link>
          </div>
        </div>
        
        {isLoading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="animate-pulse">
                <div className="bg-gray-200 dark:bg-gray-800 rounded-lg aspect-square mb-3"></div>
                <div className="h-4 bg-gray-200 dark:bg-gray-800 rounded mb-2 w-1/3"></div>
                <div className="h-4 bg-gray-200 dark:bg-gray-800 rounded mb-4 w-1/2"></div>
                <div className="h-4 bg-gray-200 dark:bg-gray-800 rounded w-1/4"></div>
              </div>
            ))}
          </div>
        ) : error ? (
          <div className="text-center py-12">
            <p className="text-muted-foreground mb-4">Failed to load products</p>
            <Button 
              variant="outline" 
              onClick={() => window.location.reload()}
            >
              Retry
            </Button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {featuredProducts?.map((product, index) => (
              <div 
                key={product.id}
                className={`transition-all duration-700 delay-${index * 100} ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
              >
                <ProductCard product={product} />
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default FeaturedProducts;
