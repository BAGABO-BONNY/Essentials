
import { Product } from './types';

export const products: Product[] = [
  {
    id: '1',
    name: 'Minimalist Desk Lamp',
    description: 'A sleek, adjustable desk lamp with touch controls and multiple brightness settings. Perfect for your minimalist workspace.',
    price: 129.99,
    images: [
      'https://images.unsplash.com/photo-1507473885765-e6ed057f782c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1513506003901-1e6a229e2d15?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80',
    ],
    category: 'Lighting',
    featured: true,
    inStock: true,
    rating: 4.8,
  },
  {
    id: '2',
    name: 'Ergonomic Office Chair',
    description: 'Premium ergonomic chair with lumbar support, adjustable armrests, and breathable mesh back for all-day comfort.',
    price: 349.99,
    images: [
      'https://images.unsplash.com/photo-1505843490701-5c4b83b47dc3?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80',
    ],
    category: 'Furniture',
    featured: true,
    inStock: true,
    rating: 4.9,
  },
  {
    id: '3',
    name: 'Bluetooth Noise-Cancelling Headphones',
    description: 'Premium wireless headphones with active noise cancellation, 30-hour battery life, and exceptional sound quality.',
    price: 249.99,
    images: [
      'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80',
    ],
    category: 'Audio',
    featured: true,
    inStock: true,
    rating: 4.7,
  },
  {
    id: '4',
    name: 'Smart Home Hub',
    description: 'Central control unit for your smart home devices. Connects with lights, thermostats, security systems, and more.',
    price: 199.99,
    images: [
      'https://images.unsplash.com/photo-1558089687-f282ffcbc0d4?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80',
    ],
    category: 'Smart Home',
    featured: false,
    inStock: true,
    rating: 4.5,
  },
  {
    id: '5',
    name: 'Ultra-Thin Laptop',
    description: 'Powerful yet lightweight laptop with 14-inch 4K display, 16GB RAM, 512GB SSD, and all-day battery life.',
    price: 1299.99,
    images: [
      'https://images.unsplash.com/photo-1496181133206-80ce9b88a853?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80',
    ],
    category: 'Computers',
    featured: true,
    inStock: true,
    rating: 4.9,
  },
  {
    id: '6',
    name: 'Ceramic Pour-Over Coffee Set',
    description: 'Handcrafted ceramic pour-over coffee maker with matching cups. The perfect ritual for coffee enthusiasts.',
    price: 89.99,
    images: [
      'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80',
    ],
    category: 'Kitchen',
    featured: false,
    inStock: true,
    rating: 4.6,
  },
  {
    id: '7',
    name: 'Minimalist Wall Clock',
    description: 'Simple, elegant wall clock with a brushed aluminum frame and silent movement. A statement piece for any room.',
    price: 59.99,
    images: [
      'https://images.unsplash.com/photo-1507646227500-4d389b0012be?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80',
    ],
    category: 'Home Decor',
    featured: false,
    inStock: true,
    rating: 4.5,
  },
  {
    id: '8',
    name: 'Wireless Charging Pad',
    description: 'Fast wireless charging pad compatible with all Qi-enabled devices. Sleek design with LED charging indicator.',
    price: 39.99,
    images: [
      'https://images.unsplash.com/photo-1583863788434-e58a36330cf0?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80',
    ],
    category: 'Electronics',
    featured: false,
    inStock: true,
    rating: 4.4,
  },
];

export const categories = [
  'All',
  'Lighting',
  'Furniture',
  'Audio',
  'Smart Home',
  'Computers',
  'Kitchen',
  'Home Decor',
  'Electronics'
];

export function getProductById(id: string): Product | undefined {
  return products.find(product => product.id === id);
}

export function getFeaturedProducts(): Product[] {
  return products.filter(product => product.featured);
}

export function getProductsByCategory(category: string): Product[] {
  if (category === 'All') return products;
  return products.filter(product => product.category === category);
}
