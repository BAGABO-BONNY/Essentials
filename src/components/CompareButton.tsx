
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { SplitSquareVertical } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { toast } from '@/components/ui/use-toast';
import { Product } from '@/lib/types';

interface CompareButtonProps {
  product: Product;
}

const CompareButton = ({ product }: CompareButtonProps) => {
  const navigate = useNavigate();
  
  const handleCompare = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    // Get current products from localStorage
    const compareProducts = localStorage.getItem('compareProducts');
    const products = compareProducts ? JSON.parse(compareProducts) : [];
    
    // Check if product is already in comparison list
    const isProductInCompare = products.some((p: Product) => p.id === product.id);
    
    if (isProductInCompare) {
      toast({
        title: "Already in comparison",
        description: "This product is already in your comparison list.",
      });
      return;
    }
    
    // Maximum 4 products for comparison
    if (products.length >= 4) {
      toast({
        title: "Comparison limit reached",
        description: "You can compare up to 4 products at once.",
        variant: "destructive",
      });
      return;
    }
    
    // Add product to comparison list
    products.push(product);
    localStorage.setItem('compareProducts', JSON.stringify(products));
    
    toast({
      title: "Product added to comparison",
      description: "You can now compare this product with others.",
    });
    
    // If we have at least 2 products, allow navigation to comparison page
    if (products.length >= 2) {
      const goToCompare = window.confirm("Would you like to go to the comparison page?");
      if (goToCompare) {
        navigate('/compare');
      }
    }
  };
  
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <Button 
            variant="ghost" 
            size="icon"
            className="absolute top-12 right-2 bg-white/80 dark:bg-black/50 backdrop-blur-sm hover:bg-white dark:hover:bg-black/70 text-foreground transition-opacity duration-300"
            onClick={handleCompare}
          >
            <SplitSquareVertical className="h-4 w-4" />
          </Button>
        </TooltipTrigger>
        <TooltipContent>
          <p>Add to comparison</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};

export default CompareButton;
