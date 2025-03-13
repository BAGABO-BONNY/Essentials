
import { useLocation, Link } from "react-router-dom";
import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { ShoppingBag, Heart, AlertTriangle, ArrowLeft } from "lucide-react";

const NotFound = () => {
  const location = useLocation();
  const path = location.pathname;

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  // Determine what content to show based on the path
  const getRelevantContent = () => {
    if (path.includes('/product/')) {
      return {
        title: "Product Not Found",
        message: "We couldn't find the product you're looking for. It may have been removed or is temporarily unavailable.",
        buttonText: "Browse Products",
        buttonLink: "/products",
        icon: <ShoppingBag className="h-16 w-16 text-muted-foreground mb-6" />
      };
    } else if (path.includes('/order/')) {
      return {
        title: "Order Not Found",
        message: "We couldn't find the order you're looking for. Please check your order history.",
        buttonText: "View Orders",
        buttonLink: "/orders",
        icon: <AlertTriangle className="h-16 w-16 text-muted-foreground mb-6" />
      };
    } else if (path.includes('/category/')) {
      return {
        title: "Category Not Found",
        message: "We couldn't find the category you're looking for. It may have been removed or renamed.",
        buttonText: "Browse Categories",
        buttonLink: "/products",
        icon: <ShoppingBag className="h-16 w-16 text-muted-foreground mb-6" />
      };
    } else if (path.includes('/wishlist')) {
      return {
        title: "Wishlist",
        message: "Manage your favorite products in one place. Add items to your wishlist and easily move them to your cart when you're ready to purchase.",
        buttonText: "Browse Products",
        buttonLink: "/products",
        icon: <Heart className="h-16 w-16 text-muted-foreground mb-6" />
      };
    } else if (path.includes('/about')) {
      return {
        title: "About Us",
        message: "Learn more about our mission, values, and the team behind Essentials. We're dedicated to bringing you premium products for modern living.",
        buttonText: "Back to Home",
        buttonLink: "/",
        icon: <AlertTriangle className="h-16 w-16 text-muted-foreground mb-6" />
      };
    } else if (path.includes('/profile')) {
      return {
        title: "Profile",
        message: "Manage your personal information, view order history, and update your preferences.",
        buttonText: "Sign In",
        buttonLink: "/auth",
        icon: <AlertTriangle className="h-16 w-16 text-muted-foreground mb-6" />
      };
    } else {
      return {
        title: "Page Not Found",
        message: "Oops! We couldn't find the page you're looking for.",
        buttonText: "Back to Home",
        buttonLink: "/",
        icon: <AlertTriangle className="h-16 w-16 text-muted-foreground mb-6" />
      };
    }
  };

  const content = getRelevantContent();

  return (
    <div className="min-h-screen flex items-center justify-center bg-background pt-16">
      <div className="text-center max-w-md p-6 animate-fade-in">
        <div className="flex justify-center">
          {content.icon}
        </div>
        {path !== '/wishlist' && path !== '/about' && path !== '/profile' && (
          <h1 className="text-6xl font-medium mb-4">404</h1>
        )}
        <h2 className="text-2xl font-medium mb-2">{content.title}</h2>
        <p className="text-xl text-muted-foreground mb-8">
          {content.message}
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button asChild variant={path === '/wishlist' || path === '/about' || path === '/profile' ? "default" : "outline"}>
            <Link to={content.buttonLink}>{content.buttonText}</Link>
          </Button>
          <Button asChild variant={path === '/wishlist' || path === '/about' || path === '/profile' ? "outline" : "default"}>
            <Link to="/">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Home
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
