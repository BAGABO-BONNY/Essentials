
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { Eye } from 'lucide-react';
import { Product } from '@/lib/types';
import QuickViewModal from '@/components/QuickViewModal';

interface QuickViewButtonProps {
  product: Product;
}

const QuickViewButton = ({ product }: QuickViewButtonProps) => {
  const [isOpen, setIsOpen] = useState(false);
  
  const handleQuickView = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsOpen(true);
  };
  
  return (
    <>
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <Button 
              variant="ghost" 
              size="icon"
              className="absolute bottom-2 right-2 bg-white/80 dark:bg-black/50 backdrop-blur-sm hover:bg-white dark:hover:bg-black/70 text-foreground transition-opacity duration-300"
              onClick={handleQuickView}
            >
              <Eye className="h-4 w-4" />
            </Button>
          </TooltipTrigger>
          <TooltipContent>
            <p>Quick view</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
      
      <QuickViewModal 
        product={product} 
        isOpen={isOpen} 
        onClose={() => setIsOpen(false)} 
      />
    </>
  );
};

export default QuickViewButton;
