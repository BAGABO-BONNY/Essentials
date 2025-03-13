
import { useWishlist } from "@/context/WishlistContext";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import ProductCard from "@/components/ProductCard";
import { Heart, ShoppingCart, Trash2 } from "lucide-react";
import { useCart } from "@/context/CartContext";

const Wishlist = () => {
  const { wishlist, clearWishlist, removeFromWishlist } = useWishlist();
  const { addToCart } = useCart();

  const addAllToCart = () => {
    wishlist.forEach(product => {
      addToCart(product);
    });
  };

  return (
    <div className="page-container animate-fade-in pt-24 pb-12">
      <div className="flex items-center justify-between mb-10">
        <div>
          <h1 className="text-3xl font-medium mb-2">My Wishlist</h1>
          <p className="text-muted-foreground">
            {wishlist.length === 0
              ? "Your wishlist is empty"
              : `You have ${wishlist.length} item${wishlist.length === 1 ? "" : "s"} in your wishlist`}
          </p>
        </div>

        {wishlist.length > 0 && (
          <div className="flex gap-4">
            <Button variant="outline" onClick={clearWishlist}>
              <Trash2 className="mr-2 h-4 w-4" />
              Clear Wishlist
            </Button>
            <Button onClick={addAllToCart}>
              <ShoppingCart className="mr-2 h-4 w-4" />
              Add All to Cart
            </Button>
          </div>
        )}
      </div>

      {wishlist.length === 0 ? (
        <div className="text-center py-20">
          <Heart className="mx-auto h-16 w-16 text-muted-foreground/30 mb-6" />
          <h2 className="text-xl font-medium mb-4">Your wishlist is empty</h2>
          <p className="text-muted-foreground mb-8 max-w-md mx-auto">
            Add items you love to your wishlist. Review them anytime and easily move them to the cart.
          </p>
          <Button asChild>
            <Link to="/products">Browse Products</Link>
          </Button>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {wishlist.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}
    </div>
  );
};

export default Wishlist;
