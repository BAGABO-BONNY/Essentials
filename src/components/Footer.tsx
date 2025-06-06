
import { Link } from 'react-router-dom';
import { InstagramIcon, TwitterIcon, FacebookIcon, Mail } from 'lucide-react';


const Footer = () => {
  return (
    <footer className="bg-secondary dark:bg-secondary/10 border-t border-border mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="space-y-4">
            <h3 className="text-lg font-medium">Essentials</h3>
            <p className="text-muted-foreground text-sm">
              Curated premium products for modern living.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-muted-foreground hover:text-primary transition-colors">
                <InstagramIcon size={20} />
              </a>
              <a href="https://x.com/BagaboBonn56348" className="text-muted-foreground hover:text-primary transition-colors">
                <TwitterIcon size={20} />
              </a>
              <a href="https://www.facebook.com/profile.php?id=61555186797204" className="text-muted-foreground hover:text-primary transition-colors">
                <FacebookIcon size={20} />
              </a>
              <a href="bagabobonny544@gmail.com" className="text-muted-foreground hover:text-primary transition-colors">
                <Mail size={20} />
              </a>
            </div>
          </div>
          
          <div>
            <h3 className="text-sm font-medium mb-4">Shop</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/products" className="text-muted-foreground hover:text-primary text-sm">
                  All Products
                </Link>
              </li>
              <li>
                <Link to="/products" className="text-muted-foreground hover:text-primary text-sm">
                  Featured
                </Link>
              </li>
              <li>
                <Link to="/products" className="text-muted-foreground hover:text-primary text-sm">
                  New Arrivals
                </Link>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-sm font-medium mb-4">Company</h3>
            <ul className="space-y-2">
              <li>
                <a href="#" className="text-muted-foreground hover:text-primary text-sm">
                  About Us
                </a>
              </li>
              <li>
                <a href="#" className="text-muted-foreground hover:text-primary text-sm">
                  Contact
                </a>
              </li>
              <li>
                <a href="#" className="text-muted-foreground hover:text-primary text-sm">
                  Careers
                </a>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-sm font-medium mb-4">Customer Service</h3>
            <ul className="space-y-2">
              <li>
                <a href="#" className="text-muted-foreground hover:text-primary text-sm">
                  FAQ
                </a>
              </li>
              <li>
                <a href="#" className="text-muted-foreground hover:text-primary text-sm">
                  Shipping
                </a>
              </li>
              <li>
                <a href="#" className="text-muted-foreground hover:text-primary text-sm">
                  Returns
                </a>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="mt-12 pt-8 border-t border-border">
          <p className="text-center text-muted-foreground text-sm">
            © {new Date().getFullYear()} Essentials. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
