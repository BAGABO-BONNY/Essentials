
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';

const heroBackgrounds = [
  'https://images.unsplash.com/photo-1493663284031-b7e3aefcae8e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80',
  'https://images.unsplash.com/photo-1583847268964-b28dc8f51f92?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1374&q=80',
  'https://images.unsplash.com/photo-1554295405-abb8fd54f153?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1526&q=80',
];

const Hero = () => {
  const [currentBgIndex, setCurrentBgIndex] = useState(0);
  const [isChanging, setIsChanging] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const interval = setInterval(() => {
      setIsChanging(true);
      setTimeout(() => {
        setCurrentBgIndex((prevIndex) => (prevIndex + 1) % heroBackgrounds.length);
        setIsChanging(false);
      }, 500);
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative min-h-screen flex items-center overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <div
          className={`absolute inset-0 transition-opacity duration-1000 ${
            isChanging ? 'opacity-0' : 'opacity-100'
          }`}
          style={{
            backgroundImage: `url(${heroBackgrounds[currentBgIndex]})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        />
        <div className="absolute inset-0 bg-black/40" />
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 md:pt-0">
        <div className="max-w-2xl text-white">
          <div className="animate-fade-in">
            <div className="bg-white/10 backdrop-blur-sm border border-white/20 px-3 py-1 rounded-full inline-block mb-4">
              <span className="text-sm font-medium">New Collection</span>
            </div>
            
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-medium leading-tight md:leading-tight mb-6">
              Simplicity is the <br />ultimate sophistication
            </h1>
            
            <p className="text-lg md:text-xl opacity-90 mb-8">
              Curated premium essentials for modern living.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4">
              <Button 
                size="lg" 
                className="relative overflow-hidden group bg-white text-black hover:bg-white/90 dark:bg-white dark:text-black dark:hover:bg-white/90"
                onClick={() => navigate('/products')}
              >
                <span className="relative z-10">Shop Now</span>
                <div className="absolute inset-0 bg-gray scale-x-0 group-hover:scale-x-100 transition-transform origin-left"></div>
              </Button>
              <Button 
                variant="outline" 
                size="lg" 
                className="text-gray-500 border-gray hover:bg-white/50 "
                onClick={() => navigate('/about')}
              >
                Learn More
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll down indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-10 flex flex-col items-center animate-bounce">
        <div className="text-white text-xs font-medium mb-2">Scroll Down</div>
        <div className="w-0.5 h-6 bg-white/50" />
      </div>
    </div>
  );
};

export default Hero;
