
import Hero from '@/components/Hero';
import FeaturedProducts from '@/components/FeaturedProducts';
import RecentlyViewed from '@/components/RecentlyViewed';
import { Button } from '@/components/ui/button';
import { ShoppingBag, Truck, RotateCcw, Award, Star, Clock, Zap, Shield, Headphones, Gift } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

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
      
      {/* Featured Brand Banner */}
      <div className="py-16 bg-gradient-to-r from-primary/5 to-primary/10">
        <div className="page-container">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <Badge className="mb-4">Featured Collection</Badge>
              <h2 className="text-4xl font-medium mb-6">Minimalist Essentials for Modern Living</h2>
              <p className="text-muted-foreground mb-8">
                Discover our latest collection of minimalist home essentials, designed to bring both beauty and functionality to your space. Each piece is carefully crafted using sustainable materials and ethical manufacturing processes.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Button asChild>
                  <Link to="/products?collection=minimalist">Shop Collection</Link>
                </Button>
                <Button variant="outline" asChild>
                  <Link to="/about">Our Story</Link>
                </Button>
              </div>
            </div>
            <div className="relative">
              <div className="relative z-10 rounded-lg overflow-hidden">
                <img 
                  src="https://images.unsplash.com/photo-1567016376408-0226e4d0c1ea?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80" 
                  alt="Minimalist interior with stylish furniture" 
                  className="w-full h-auto object-cover aspect-[4/3]"
                />
              </div>
              <div className="absolute -bottom-4 -right-4 w-48 h-48 bg-primary/10 rounded-full -z-0"></div>
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
      
      {/* Customer Testimonials */}
      <div className="py-16 bg-muted/20">
        <div className="page-container">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-medium mb-2">What Our Customers Say</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Real feedback from our satisfied customers about their experience shopping with us
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-6">
            {[
              {
                name: "Alex Morgan",
                role: "Verified Buyer",
                quote: "I've been searching for minimalist home decor that doesn't compromise on quality, and I finally found it here. The delivery was prompt and the packaging was eco-friendly too!",
                rating: 5,
                image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80"
              },
              {
                name: "Jamie Chen",
                role: "Verified Buyer",
                quote: "The attention to detail in every product is impressive. I purchased the ceramic tableware set and it's both beautiful and functional. Customer service was excellent when I had questions.",
                rating: 5,
                image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80"
              },
              {
                name: "Taylor Reed",
                role: "Verified Buyer",
                quote: "I appreciate brands that prioritize sustainability, and Essentials truly delivers on this promise. The furniture pieces are timeless and made to last for years.",
                rating: 4,
                image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80"
              }
            ].map((testimonial, i) => (
              <Card key={i} className="bg-background hover:shadow-md transition-shadow">
                <CardContent className="p-6">
                  <div className="flex mb-4">
                    {Array.from({ length: testimonial.rating }).map((_, i) => (
                      <Star key={i} className="h-5 w-5 text-amber-400 fill-amber-400" />
                    ))}
                    {Array.from({ length: 5 - testimonial.rating }).map((_, i) => (
                      <Star key={i} className="h-5 w-5 text-gray-300" />
                    ))}
                  </div>
                  <p className="italic text-muted-foreground mb-6">"{testimonial.quote}"</p>
                  <div className="flex items-center">
                    <div className="w-12 h-12 rounded-full overflow-hidden mr-4">
                      <img 
                        src={testimonial.image} 
                        alt={testimonial.name} 
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div>
                      <p className="font-medium">{testimonial.name}</p>
                      <p className="text-sm text-muted-foreground">{testimonial.role}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
      
      {/* Why Choose Us */}
      <div className="py-16">
        <div className="page-container">
          <div className="text-center mb-12">
            <Badge className="mb-2">Our Approach</Badge>
            <h2 className="text-3xl font-medium mb-2">Why Choose Essentials</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              We're committed to providing exceptional products and service in everything we do
            </p>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {[
              {
                icon: <Shield className="h-8 w-8 text-primary mb-4" />,
                title: "Trusted Quality",
                desc: "Every product is thoroughly tested to meet our high standards"
              },
              {
                icon: <Zap className="h-8 w-8 text-primary mb-4" />,
                title: "Fast Shipping",
                desc: "Get your order quickly with our efficient delivery service"
              },
              {
                icon: <Headphones className="h-8 w-8 text-primary mb-4" />,
                title: "24/7 Support",
                desc: "Our friendly team is always available to help with any questions"
              },
              {
                icon: <Gift className="h-8 w-8 text-primary mb-4" />,
                title: "Special Offers",
                desc: "Regular promotions and discounts for our loyal customers"
              }
            ].map((feature, i) => (
              <div key={i} className="text-center p-6">
                <div className="flex justify-center">{feature.icon}</div>
                <h3 className="font-medium mb-2">{feature.title}</h3>
                <p className="text-sm text-muted-foreground">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
      
      {/* Newsletter Section */}
      <div className="py-16 bg-primary text-primary-foreground">
        <div className="page-container">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl font-medium mb-4">Stay Connected</h2>
            <p className="mb-8">
              Subscribe to our newsletter for exclusive offers, design inspiration, and new product releases.
            </p>
            <div className="flex flex-col sm:flex-row gap-2 max-w-md mx-auto">
              <input 
                type="email" 
                placeholder="Your email address" 
                className="rounded-md px-4 py-2 w-full bg-white/10 border border-white/20 text-white placeholder:text-white/60 focus:outline-none focus:ring-2 focus:ring-white/20"
              />
              <Button className="bg-white text-primary hover:bg-white/90">
                Subscribe
              </Button>
            </div>
          </div>
        </div>
      </div>
      
      {/* Instagram Feed Simulation */}
      <div className="py-16">
        <div className="page-container">
          <div className="text-center mb-8">
            <h2 className="text-2xl font-medium mb-2">#EssentialsLiving</h2>
            <p className="text-muted-foreground">See how our community styles their Essentials products</p>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              "https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
              "https://images.unsplash.com/photo-1583847268964-b28dc8f51f92?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
              "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
              "https://images.unsplash.com/photo-1494438639946-1ebd1d20bf85?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80"
            ].map((image, i) => (
              <div key={i} className="relative aspect-square group overflow-hidden rounded-lg">
                <img 
                  src={image} 
                  alt={`User-generated content ${i+1}`} 
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-colors flex items-center justify-center">
                  <div className="opacity-0 group-hover:opacity-100 transition-opacity text-white text-center px-4">
                    <p className="font-medium">@user{i+1}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      
      <RecentlyViewed />
    </div>
  );
};

export default Index;
