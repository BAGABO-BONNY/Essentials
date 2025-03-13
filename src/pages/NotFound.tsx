
import { useLocation, Link } from "react-router-dom";
import { useEffect } from "react";
import { Button } from "@/components/ui/button";

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
        buttonLink: "/products"
      };
    } else if (path.includes('/order/')) {
      return {
        title: "Order Not Found",
        message: "We couldn't find the order you're looking for. Please check your order history.",
        buttonText: "View Orders",
        buttonLink: "/orders"
      };
    } else if (path.includes('/category/')) {
      return {
        title: "Category Not Found",
        message: "We couldn't find the category you're looking for. It may have been removed or renamed.",
        buttonText: "Browse Categories",
        buttonLink: "/products"
      };
    } else if (path.includes('/wishlist')) {
      return {
        title: "Wishlist Feature Coming Soon",
        message: "We're working on adding wishlist functionality to enhance your shopping experience.",
        buttonText: "Continue Shopping",
        buttonLink: "/products"
      };
    } else {
      return {
        title: "Page Not Found",
        message: "Oops! We couldn't find the page you're looking for.",
        buttonText: "Back to Home",
        buttonLink: "/"
      };
    }
  };

  const content = getRelevantContent();

  return (
    <div className="min-h-screen flex items-center justify-center bg-background">
      <div className="text-center max-w-md p-6">
        <h1 className="text-6xl font-medium mb-4">404</h1>
        <h2 className="text-2xl font-medium mb-2">{content.title}</h2>
        <p className="text-xl text-muted-foreground mb-8">
          {content.message}
        </p>
        <Button asChild>
          <Link to={content.buttonLink}>{content.buttonText}</Link>
        </Button>
      </div>
    </div>
  );
};

export default NotFound;
