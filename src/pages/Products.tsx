
import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { getProductsByCategory, categories } from '@/lib/data';
import ProductCard from '@/components/ProductCard';
import { Button } from '@/components/ui/button';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import { Slider } from '@/components/ui/slider';
import { SlidersHorizontal, Search, X, Info } from 'lucide-react';
import { getFallbackImage } from '@/lib/imageUtils';

const Products = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const categoryParam = searchParams.get('category') || 'All';
  const searchParam = searchParams.get('search') || '';
  
  const [showFilters, setShowFilters] = useState(false);
  const [priceRange, setPriceRange] = useState([0, 1500]);
  const [searchTerm, setSearchTerm] = useState(searchParam);
  const [filteredProducts, setFilteredProducts] = useState(getProductsByCategory(categoryParam));
  
  useEffect(() => {
    let products = getProductsByCategory(categoryParam);
    
    if (searchParam) {
      products = products.filter(product => 
        product.name.toLowerCase().includes(searchParam.toLowerCase()) ||
        product.description.toLowerCase().includes(searchParam.toLowerCase()) ||
        product.category.toLowerCase().includes(searchParam.toLowerCase())
      );
    }
    
    products = products.filter(product => 
      product.price >= priceRange[0] && product.price <= priceRange[1]
    );
    
    setFilteredProducts(products);
  }, [categoryParam, searchParam, priceRange]);
  
  const handleCategoryChange = (value: string) => {
    searchParams.set('category', value);
    setSearchParams(searchParams);
  };
  
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    searchParams.set('search', searchTerm);
    setSearchParams(searchParams);
  };
  
  const clearSearch = () => {
    setSearchTerm('');
    searchParams.delete('search');
    setSearchParams(searchParams);
  };
  
  const toggleFilters = () => {
    setShowFilters(!showFilters);
  };

  // Category descriptions for enhanced UI
  const categoryDescriptions: Record<string, string> = {
    All: "Browse our complete collection of premium products across all categories. From modern home essentials to cutting-edge electronics, discover items that blend style, functionality, and quality.",
    Lighting: "Illuminate your space with our designer lighting collection. From minimalist desk lamps to statement pendant lights, find pieces that transform any room with the perfect ambiance.",
    Furniture: "Discover thoughtfully crafted furniture that combines comfort, durability, and timeless design. Each piece is selected to enhance your living spaces while standing the test of time.",
    Audio: "Experience sound as it was meant to be heard with our premium audio equipment. From noise-cancelling headphones to high-fidelity speakers, elevate your listening experience.",
    "Smart Home": "Transform your living space with intuitive smart home devices that simplify daily tasks, enhance security, and create a more connected living environment.",
    Computers: "Stay productive and creative with our selection of high-performance computing devices. From ultra-thin laptops to powerful accessories, find technology that keeps up with your lifestyle.",
    Kitchen: "Elevate your culinary experience with our thoughtfully designed kitchen essentials. From pour-over coffee sets to precision cooking tools, make every meal a masterpiece.",
    "Home Decor": "Add character and style to your living spaces with our curated home décor collection. Find pieces that reflect your personal aesthetic while enhancing your home's atmosphere.",
    Electronics: "Discover innovative electronics that combine cutting-edge technology with intuitive design. From charging solutions to everyday gadgets, find devices that enhance your daily life."
  };

  return (
    <div className="animate-fade-in">
      <div className="bg-secondary/30 dark:bg-secondary/5 py-10 mb-6">
        <div className="page-container py-4">
          <h1 className="text-3xl font-medium mb-4">Shop {categoryParam} Products</h1>
          <p className="text-muted-foreground max-w-3xl">
            {categoryDescriptions[categoryParam] || categoryDescriptions["All"]}
          </p>
          
          {categoryParam !== 'All' && (
            <div className="mt-6 flex items-center">
              <div className="w-16 h-16 rounded-full overflow-hidden mr-4 bg-background shadow-sm">
                <img 
                  src={getFallbackImage(categoryParam)} 
                  alt={categoryParam} 
                  className="w-full h-full object-cover"
                />
              </div>
              <div>
                <span className="text-sm text-muted-foreground">Category</span>
                <h2 className="text-xl font-medium">{categoryParam}</h2>
              </div>
            </div>
          )}
        </div>
      </div>
      
      <div className="page-container">
        <div className="flex flex-col lg:flex-row gap-8">
          <div className="hidden lg:block w-64 shrink-0">
            <div className="sticky top-24 space-y-8">
              <div>
                <h3 className="font-medium mb-4">Categories</h3>
                <div className="space-y-2">
                  {categories.map((category) => (
                    <Button
                      key={category}
                      variant={categoryParam === category ? "secondary" : "ghost"}
                      className="w-full justify-start"
                      onClick={() => handleCategoryChange(category)}
                    >
                      {category}
                    </Button>
                  ))}
                </div>
              </div>
              
              <div>
                <h3 className="font-medium mb-4">Price Range</h3>
                <Slider
                  defaultValue={priceRange}
                  min={0}
                  max={1500}
                  step={10}
                  value={priceRange}
                  onValueChange={setPriceRange}
                  className="mb-6"
                />
                <div className="flex items-center justify-between">
                  <span>${priceRange[0]}</span>
                  <span>${priceRange[1]}</span>
                </div>
              </div>
              
              <div className="p-4 bg-muted/50 rounded-lg space-y-2">
                <h3 className="font-medium flex items-center">
                  <Info className="h-4 w-4 mr-2" />
                  Shopping Tips
                </h3>
                <ul className="text-sm text-muted-foreground space-y-2">
                  <li>• Free shipping on orders over $100</li>
                  <li>• 30-day hassle-free returns</li>
                  <li>• Price match guarantee</li>
                  <li>• Secure checkout process</li>
                </ul>
              </div>
            </div>
          </div>
          
          <div className="lg:hidden flex justify-between items-center mb-4">
            <Button variant="outline" onClick={toggleFilters}>
              <SlidersHorizontal className="h-4 w-4 mr-2" />
              Filters
            </Button>
          </div>
          
          {showFilters && (
            <div className="fixed inset-0 z-50 bg-black/50 flex justify-end lg:hidden">
              <div className="w-full max-w-xs bg-background p-6 overflow-y-auto">
                <div className="flex justify-between items-center mb-6">
                  <h3 className="font-medium">Filters</h3>
                  <Button variant="ghost" size="sm" onClick={toggleFilters}>
                    <X className="h-4 w-4" />
                  </Button>
                </div>
                
                <div className="space-y-8">
                  <div>
                    <h3 className="font-medium mb-4">Categories</h3>
                    <div className="space-y-2">
                      {categories.map((category) => (
                        <Button
                          key={category}
                          variant={categoryParam === category ? "secondary" : "ghost"}
                          className="w-full justify-start"
                          onClick={() => {
                            handleCategoryChange(category);
                            toggleFilters();
                          }}
                        >
                          {category}
                        </Button>
                      ))}
                    </div>
                  </div>
                  
                  <div>
                    <h3 className="font-medium mb-4">Price Range</h3>
                    <Slider
                      defaultValue={priceRange}
                      min={0}
                      max={1500}
                      step={10}
                      value={priceRange}
                      onValueChange={setPriceRange}
                      className="mb-6"
                    />
                    <div className="flex items-center justify-between">
                      <span>${priceRange[0]}</span>
                      <span>${priceRange[1]}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
          
          <div className="flex-1">
            <div className="mb-8">
              <form onSubmit={handleSearch} className="relative max-w-md">
                <Input
                  type="text"
                  placeholder="Search products..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pr-20"
                />
                {searchTerm && (
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    className="absolute right-10 top-1/2 -translate-y-1/2"
                    onClick={clearSearch}
                  >
                    <X className="h-4 w-4" />
                  </Button>
                )}
                <Button
                  type="submit"
                  variant="ghost"
                  size="sm"
                  className="absolute right-2 top-1/2 -translate-y-1/2"
                >
                  <Search className="h-4 w-4" />
                </Button>
              </form>
            </div>
            
            <div className="mb-8 lg:hidden overflow-x-auto pb-2">
              <Tabs value={categoryParam} onValueChange={handleCategoryChange}>
                <TabsList className="inline-flex w-auto">
                  {categories.map((category) => (
                    <TabsTrigger key={category} value={category} className="whitespace-nowrap">
                      {category}
                    </TabsTrigger>
                  ))}
                </TabsList>
              </Tabs>
            </div>
            
            {filteredProducts.length > 0 ? (
              <>
                <div className="flex justify-between items-center mb-6">
                  <p className="text-muted-foreground">
                    Showing <span className="font-medium text-foreground">{filteredProducts.length}</span> products
                  </p>
                </div>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {filteredProducts.map((product) => (
                    <ProductCard key={product.id} product={product} />
                  ))}
                </div>
              </>
            ) : (
              <div className="text-center py-12 border border-dashed rounded-lg">
                <h3 className="text-lg font-medium mb-2">No products found</h3>
                <p className="text-muted-foreground mb-6 max-w-md mx-auto">
                  We couldn't find any products matching your current filters. Try adjusting your price range, search term, or browse a different category.
                </p>
                <Button onClick={clearSearch}>Clear filters</Button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Products;
