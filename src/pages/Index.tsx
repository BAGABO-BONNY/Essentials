
import Hero from '@/components/Hero';
import FeaturedProducts from '@/components/FeaturedProducts';
import RecentlyViewed from '@/components/RecentlyViewed';
import { Button } from '@/components/ui/button';
import { ShoppingBag, Truck, RotateCcw, Award } from 'lucide-react';
import { Link } from 'react-router-dom';

const Index = () => {
  return (
    <div className="animate-fade-in">
      <Hero />
      
      {/* Shopping Benefits Section */}
      <div className="bg-muted/30 py-12 dark:bg-muted/10">
        <div className="page-container">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="flex items-center p-4">
              <div className="bg-primary/10 p-3 rounded-full mr-4">
                <ShoppingBag className="h-6 w-6 text-primary" />
              </div>
              <div>
                <h3 className="font-medium mb-1">Secure Shopping</h3>
                <p className="text-sm text-muted-foreground">Protected payments</p>
              </div>
            </div>
            
            <div className="flex items-center p-4">
              <div className="bg-primary/10 p-3 rounded-full mr-4">
                <Truck className="h-6 w-6 text-primary" />
              </div>
              <div>
                <h3 className="font-medium mb-1">Fast Delivery</h3>
                <p className="text-sm text-muted-foreground">Free on orders over $100</p>
              </div>
            </div>
            
            <div className="flex items-center p-4">
              <div className="bg-primary/10 p-3 rounded-full mr-4">
                <RotateCcw className="h-6 w-6 text-primary" />
              </div>
              <div>
                <h3 className="font-medium mb-1">Easy Returns</h3>
                <p className="text-sm text-muted-foreground">30-day return policy</p>
              </div>
            </div>
            
            <div className="flex items-center p-4">
              <div className="bg-primary/10 p-3 rounded-full mr-4">
                <Award className="h-6 w-6 text-primary" />
              </div>
              <div>
                <h3 className="font-medium mb-1">Quality Products</h3>
                <p className="text-sm text-muted-foreground">Curated selection</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <FeaturedProducts />
      
      {/* Shop by Category */}
      <div className="py-16">
        <div className="page-container">
          <h2 className="text-2xl font-medium mb-8 text-center">Shop by Category</h2>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <Link to="/products?category=Lighting" className="group">
              <div className="relative aspect-square overflow-hidden rounded-lg">
                <img 
                  src="https://images.unsplash.com/photo-1513506003901-1e6a229e2d15?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80" 
                  alt="Lighting" 
                  className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-black/20 group-hover:bg-black/30 transition-colors flex items-center justify-center">
                  <h3 className="text-white font-medium text-lg md:text-xl">Lighting</h3>
                </div>
              </div>
            </Link>
            
            <Link to="/products?category=Furniture" className="group">
              <div className="relative aspect-square overflow-hidden rounded-lg">
                <img 
                  src="https://images.unsplash.com/photo-1555041469-a586c61ea9bc?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80" 
                  alt="Furniture" 
                  className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-black/20 group-hover:bg-black/30 transition-colors flex items-center justify-center">
                  <h3 className="text-white font-medium text-lg md:text-xl">Furniture</h3>
                </div>
              </div>
            </Link>
            
            <Link to="/products?category=Audio" className="group">
              <div className="relative aspect-square overflow-hidden rounded-lg">
                <img 
                  src="https://images.unsplash.com/photo-1558537348-c0f8e733989d?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80" 
                  alt="Audio" 
                  className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-black/20 group-hover:bg-black/30 transition-colors flex items-center justify-center">
                  <h3 className="text-white font-medium text-lg md:text-xl">Audio</h3>
                </div>
              </div>
            </Link>
            
            <Link to="/products?category=Electronics" className="group">
              <div className="relative aspect-square overflow-hidden rounded-lg">
                <img 
                  src="https://images.unsplash.com/photo-1550009158-9ebf69173e03?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80" 
                  alt="Electronics" 
                  className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-black/20 group-hover:bg-black/30 transition-colors flex items-center justify-center">
                  <h3 className="text-white font-medium text-lg md:text-xl">Electronics</h3>
                </div>
              </div>
            </Link>
          </div>
          
          <div className="text-center mt-8">
            <Button asChild>
              <Link to="/products">View All Categories</Link>
            </Button>
          </div>
        </div>
      </div>
      
      <RecentlyViewed />
    </div>
  );
};

export default Index;
