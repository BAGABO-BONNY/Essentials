
import Hero from "@/components/Hero";
import FeaturedProducts from "@/components/FeaturedProducts";
import { Button } from "@/components/ui/button";
import { ArrowRight, ShoppingBag, Sparkles, Shield, Heart } from "lucide-react";
import { Link } from "react-router-dom";

const Index = () => {
  return (
    <div className="animate-fade-in">
      <Hero />
      
      <FeaturedProducts />
      
      {/* Categories section */}
      <section className="section bg-secondary/30 dark:bg-secondary/5">
        <div className="page-container">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-medium mb-2">Shop by Category</h2>
            <p className="text-muted-foreground">Browse our curated collection of premium products</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { 
                name: "Furniture", 
                image: "https://images.unsplash.com/photo-1540932239986-30128078f3c5?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=80" 
              },
              { 
                name: "Lighting", 
                image: "https://images.unsplash.com/photo-1507473885765-e6ed057f782c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=80" 
              },
              { 
                name: "Electronics", 
                image: "https://images.unsplash.com/photo-1550009158-9ebf69173e03?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=80" 
              },
            ].map((category, index) => (
              <Link 
                key={index} 
                to="/products"
                className="relative overflow-hidden rounded-lg aspect-square group"
              >
                <img 
                  src={category.image} 
                  alt={category.name} 
                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-black/40 group-hover:bg-black/50 transition-colors duration-300"></div>
                <div className="absolute inset-0 flex flex-col items-center justify-center text-white p-6">
                  <h3 className="text-2xl font-medium mb-4">{category.name}</h3>
                  <Button variant="outline" className="border-white text-white hover:bg-white/10">
                    Shop Now
                  </Button>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
      
      {/* Features section */}
      <section className="section">
        <div className="page-container">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="flex flex-col items-center text-center p-6">
              <div className="w-12 h-12 rounded-full flex items-center justify-center bg-primary/10 mb-4">
                <ShoppingBag className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-lg font-medium mb-2">Free Shipping</h3>
              <p className="text-muted-foreground">Free standard shipping on all orders over $100.</p>
            </div>
            
            <div className="flex flex-col items-center text-center p-6">
              <div className="w-12 h-12 rounded-full flex items-center justify-center bg-primary/10 mb-4">
                <Sparkles className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-lg font-medium mb-2">Premium Quality</h3>
              <p className="text-muted-foreground">Carefully curated products that stand the test of time.</p>
            </div>
            
            <div className="flex flex-col items-center text-center p-6">
              <div className="w-12 h-12 rounded-full flex items-center justify-center bg-primary/10 mb-4">
                <Shield className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-lg font-medium mb-2">Secure Checkout</h3>
              <p className="text-muted-foreground">Your data is protected with industry-leading encryption.</p>
            </div>
          </div>
        </div>
      </section>
      
      {/* New Wishlist Feature section */}
      <section className="section bg-primary/5">
        <div className="page-container">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-medium mb-6">Save Your Favorites</h2>
              <p className="text-muted-foreground mb-6">
                Create your personal wishlist to save products you love. Easily manage your favorite items and add them to your cart whenever you're ready.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Button asChild>
                  <Link to="/products">
                    <Heart className="mr-2 h-4 w-4" />
                    Start Adding
                  </Link>
                </Button>
                <Button variant="outline" asChild>
                  <Link to="/wishlist">View Wishlist</Link>
                </Button>
              </div>
            </div>
            <div className="relative aspect-video md:aspect-square rounded-lg overflow-hidden">
              <img 
                src="https://images.unsplash.com/photo-1586023492125-27b2c045efd7?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80" 
                alt="Wishlist feature" 
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>
      </section>
      
      {/* CTA section */}
      <section className="section bg-primary text-primary-foreground">
        <div className="page-container text-center">
          <h2 className="text-3xl font-medium mb-4">Ready to elevate your space?</h2>
          <p className="text-primary-foreground/80 max-w-2xl mx-auto mb-8">
            Discover our collection of premium products curated for modern living.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              size="lg" 
              variant="outline" 
              className="border-primary-foreground text-primary-foreground hover:bg-primary-foreground/10"
              asChild
            >
              <Link to="/products">
                Shop Collection <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
            <Button 
              size="lg" 
              className="bg-primary-foreground text-primary hover:bg-primary-foreground/90"
              asChild
            >
              <Link to="/about">
                Learn More
              </Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Index;
