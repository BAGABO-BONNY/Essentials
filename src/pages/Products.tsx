import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { getProductsByCategory, categories } from '@/lib/data';
import ProductCard from '@/components/ProductCard';
import { Button } from '@/components/ui/button';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Slider } from '@/components/ui/slider';
import { SlidersHorizontal, Search, X } from 'lucide-react';

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

  return (
    <div className="animate-fade-in">
      <div className="bg-secondary/30 dark:bg-secondary/5 py-16 mb-8">
        <div className="page-container">
          <h1 className="text-3xl font-medium mb-2">Shop All Products</h1>
          <p className="text-muted-foreground">Browse our collection of premium products</p>
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
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredProducts.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <h3 className="text-lg font-medium mb-2">No products found</h3>
                <p className="text-muted-foreground mb-4">Try adjusting your filters or search term</p>
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
