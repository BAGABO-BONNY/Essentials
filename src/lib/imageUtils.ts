
// Collection of functional, high-quality fallback images for various product categories
export const categoryFallbackImages = {
  Lighting: "https://images.unsplash.com/photo-1513506003901-1e6a229e2d15?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
  Furniture: "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
  Audio: "https://images.unsplash.com/photo-1558537348-c0f8e733989d?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
  "Smart Home": "https://images.unsplash.com/photo-1558002038-1055e2e28cd0?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
  Computers: "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
  Kitchen: "https://images.unsplash.com/photo-1556911220-bda9da8a1f2c?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
  "Home Decor": "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
  Electronics: "https://images.unsplash.com/photo-1550009158-9ebf69173e03?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
};

// Default fallback image for general use
export const defaultFallbackImage = "https://images.unsplash.com/photo-1505843490701-5c4b83b47dc3?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80";

/**
 * Get a category-specific fallback image or the default one
 */
export const getFallbackImage = (category?: string): string => {
  if (category && categoryFallbackImages[category as keyof typeof categoryFallbackImages]) {
    return categoryFallbackImages[category as keyof typeof categoryFallbackImages];
  }
  return defaultFallbackImage;
};

/**
 * Get a valid image URL, falling back to category-specific or default image if needed
 */
export const getProductImage = (images: string[] | undefined, category?: string): string => {
  if (images && images.length > 0 && images[0]) {
    return images[0];
  }
  return getFallbackImage(category);
};
