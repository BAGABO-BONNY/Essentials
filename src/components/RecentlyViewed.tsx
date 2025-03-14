
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

const RecentlyViewed = () => {
  const [recentlyViewed, setRecentlyViewed] = useState<Product[]>([]);
  
  useEffect(() => {
    const recentProducts = localStorage.getItem('recentlyViewed');
    if (recentProducts) {
      setRecentlyViewed(JSON.parse(recentProducts));
    }
  }, []);
  
  if (recentlyViewed.length === 0) return null;
  
  return (
    <div className="py-12 border-t">
      <div className="page-container">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h2 className="text-2xl font-medium mb-2">Recently Viewed</h2>
            <p className="text-muted-foreground">Products you've recently explored</p>
          </div>
          
          <div className="hidden sm:flex items-center gap-2">
            <CarouselPrevious className="relative static" />
            <CarouselNext className="relative static" />
          </div>
        </div>
        
        <Carousel className="w-full">
          <CarouselContent>
            {recentlyViewed.map((product) => (
              <CarouselItem key={product.id} className="basis-full sm:basis-1/2 md:basis-1/3 lg:basis-1/4 p-1">
                <ProductCard product={product} />
              </CarouselItem>
            ))}
          </CarouselContent>
          <div className="flex justify-center mt-6 sm:hidden">
            <CarouselPrevious className="relative static mx-2" />
            <CarouselNext className="relative static mx-2" />
          </div>
        </Carousel>
      </div>
    </div>
  );
};

export default RecentlyViewed;
