
import { useState, useEffect } from 'react';
import { Product } from '@/lib/types';
import ProductCard from '@/components/ProductCard';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
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
        <h2 className="text-2xl font-medium mb-8">Recently Viewed</h2>
        
        <Carousel className="w-full">
          <CarouselContent>
            {recentlyViewed.map((product) => (
              <CarouselItem key={product.id} className="basis-full sm:basis-1/2 md:basis-1/3 lg:basis-1/4 p-1">
                <ProductCard product={product} />
              </CarouselItem>
            ))}
          </CarouselContent>
          <div className="flex justify-center mt-4">
            <CarouselPrevious className="relative static mx-2" />
            <CarouselNext className="relative static mx-2" />
          </div>
        </Carousel>
      </div>
    </div>
  );
};

export default RecentlyViewed;
