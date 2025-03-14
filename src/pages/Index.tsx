
import Hero from '@/components/Hero';
import FeaturedProducts from '@/components/FeaturedProducts';
import RecentlyViewed from '@/components/RecentlyViewed';

const Index = () => {
  return (
    <div className="animate-fade-in">
      <Hero />
      <FeaturedProducts />
      <RecentlyViewed />
    </div>
  );
};

export default Index;
