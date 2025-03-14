
import { useState, useEffect } from 'react';
import { Product } from '@/lib/types';
import ProductCard from '@/components/ProductCard';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from "@/components/ui/select";
import { SlidersHorizontal, ChevronDown } from "lucide-react";

const RecentlyViewed = () => {
  const [recentlyViewed, setRecentlyViewed] = useState<Product[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [sortOption, setSortOption] = useState<string>("recent");
  const [filterCategory, setFilterCategory] = useState<string>("all");
  const [showFilters, setShowFilters] = useState(false);
  
  // Get unique categories from recently viewed products
  const uniqueCategories = recentlyViewed.length > 0 
    ? ['all', ...Array.from(new Set(recentlyViewed.map(product => product.category.toLowerCase())))]
    : ['all'];
  
  useEffect(() => {
    const recentProducts = localStorage.getItem('recentlyViewed');
    if (recentProducts) {
      const parsedProducts = JSON.parse(recentProducts);
      setRecentlyViewed(parsedProducts);
      setFilteredProducts(parsedProducts);
    }
  }, []);
  
  useEffect(() => {
    let products = [...recentlyViewed];
    
    // Apply category filter
    if (filterCategory !== 'all') {
      products = products.filter(product => 
        product.category.toLowerCase() === filterCategory.toLowerCase()
      );
    }
    
    // Apply sorting
    switch (sortOption) {
      case 'recent':
        // Already sorted by recency (default order)
        break;
      case 'price-low':
        products.sort((a, b) => a.price - b.price);
        break;
      case 'price-high':
        products.sort((a, b) => b.price - a.price);
        break;
      case 'rating':
        products.sort((a, b) => b.rating - a.rating);
        break;
      default:
        break;
    }
    
    setFilteredProducts(products);
  }, [recentlyViewed, sortOption, filterCategory]);
  
  if (recentlyViewed.length === 0) return null;
  
  return (
    <div className="py-12 border-t bg-muted/30 dark:bg-muted/10">
      <div className="page-container">
        <div className="flex justify-between items-start mb-8">
          <div>
            <h2 className="text-2xl font-medium mb-2">Recently Viewed</h2>
            <p className="text-muted-foreground">Products you've recently explored to help you continue your shopping journey</p>
          </div>
          
          <div className="flex flex-col sm:flex-row items-end sm:items-center gap-3">
            <Button 
              variant="outline" 
              size="sm" 
              className="hidden sm:flex items-center gap-1"
              onClick={() => setShowFilters(!showFilters)}
            >
              <SlidersHorizontal className="h-4 w-4 mr-1" />
              Filters
              <ChevronDown className={`h-3 w-3 transition-transform ${showFilters ? 'rotate-180' : ''}`} />
            </Button>
            
            <div className="hidden sm:flex items-center gap-2">
              <CarouselPrevious className="relative static" />
              <CarouselNext className="relative static" />
            </div>
          </div>
        </div>
        
        {showFilters && (
          <div className="grid sm:grid-cols-2 gap-4 p-4 bg-background rounded-lg border mb-6">
            <div>
              <label className="text-sm font-medium mb-1.5 block">Sort by</label>
              <Select value={sortOption} onValueChange={setSortOption}>
                <SelectTrigger>
                  <SelectValue placeholder="Sort by" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="recent">Most Recently Viewed</SelectItem>
                  <SelectItem value="price-low">Price: Low to High</SelectItem>
                  <SelectItem value="price-high">Price: High to Low</SelectItem>
                  <SelectItem value="rating">Highest Rated</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div>
              <label className="text-sm font-medium mb-1.5 block">Filter by Category</label>
              <Select value={filterCategory} onValueChange={setFilterCategory}>
                <SelectTrigger>
                  <SelectValue placeholder="Category" />
                </SelectTrigger>
                <SelectContent>
                  {uniqueCategories.map((category) => (
                    <SelectItem key={category} value={category}>
                      {category === 'all' ? 'All Categories' : category.charAt(0).toUpperCase() + category.slice(1)}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
        )}
        
        <Card className="border-0 shadow-none bg-transparent">
          <CardContent className="p-0">
            {filteredProducts.length > 0 ? (
              <Carousel className="w-full">
                <CarouselContent>
                  {filteredProducts.map((product) => (
                    <CarouselItem key={product.id} className="basis-full sm:basis-1/2 md:basis-1/3 lg:basis-1/4 p-1">
                      <ProductCard product={product} />
                    </CarouselItem>
                  ))}
                </CarouselContent>
                <div className="flex justify-center mt-6 sm:hidden">
                  <Button 
                    variant="outline" 
                    size="sm" 
                    className="mx-2 flex items-center"
                    onClick={() => setShowFilters(!showFilters)}
                  >
                    <SlidersHorizontal className="h-4 w-4 mr-1" />
                    {showFilters ? 'Hide' : 'Show'} Filters
                  </Button>
                  <CarouselPrevious className="relative static mx-2" />
                  <CarouselNext className="relative static mx-2" />
                </div>
              </Carousel>
            ) : (
              <div className="text-center py-8 border border-dashed rounded-lg">
                <p className="text-muted-foreground">No products match your filter criteria</p>
                <Button 
                  variant="link" 
                  onClick={() => {
                    setFilterCategory('all');
                    setSortOption('recent');
                  }}
                >
                  Clear filters
                </Button>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default RecentlyViewed;
