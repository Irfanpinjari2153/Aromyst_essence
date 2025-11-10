import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Heart, ShoppingCart, Star, Eye } from "lucide-react";
import { useState } from "react";
import { useCart } from "@/contexts/CartContext";
import { QuickViewModal } from "./QuickViewModal";

interface ProductCardProps {
  id: string;
  name: string;
  description: string;
  price: number;
  originalPrice?: number;
  image: string;
  rating: number;
  category: string;
  isNew?: boolean;
  isBestSeller?: boolean;
}

export const ProductCard = ({
  id,
  name,
  description,
  price,
  originalPrice,
  image,
  rating,
  category,
  isNew,
  isBestSeller,
}: ProductCardProps) => {
  const [isLiked, setIsLiked] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [showQuickView, setShowQuickView] = useState(false);
  const { addToCart } = useCart();

  const handleAddToCart = (e: React.MouseEvent) => {
    e.stopPropagation();
    addToCart({
      id,
      name,
      price,
      image,
      category
    });
  };

  return (
    <Card 
      className="card-product group relative overflow-hidden"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Badge */}
      {(isNew || isBestSeller) && (
        <div className="absolute top-3 left-3 z-10">
          <span className={`px-2 py-1 text-xs font-medium rounded-full ${
            isBestSeller 
              ? 'bg-luxury-gold text-luxury-dark' 
              : 'bg-accent text-accent-foreground'
          }`}>
            {isBestSeller ? 'Best Seller' : 'New'}
          </span>
        </div>
      )}

      {/* Heart Button */}
      <button
        onClick={(e) => {
          e.stopPropagation();
          setIsLiked(!isLiked);
        }}
        className="absolute top-3 right-3 z-10 p-2 rounded-full glass-effect hover:bg-white/20 transition-all duration-300"
      >
        <Heart 
          className={`w-4 h-4 transition-colors ${
            isLiked ? 'fill-red-500 text-red-500' : 'text-foreground/60 hover:text-luxury-gold'
          }`} 
        />
      </button>

      {/* Product Image */}
      <div className="relative overflow-hidden rounded-t-xl">
        <img
          src={image}
          alt={name}
          className={`w-full h-64 object-cover transition-all duration-700 ${
            isHovered ? 'scale-110' : 'scale-100'
          }`}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        
        {/* Quick Actions Overlay */}
        <div className={`absolute inset-0 flex items-center justify-center gap-2 transition-all duration-300 ${
          isHovered ? 'opacity-100 bg-black/20' : 'opacity-0'
        }`}>
          <Button 
            variant="luxury" 
            size="sm" 
            className="transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300"
            onClick={(e) => {
              e.stopPropagation();
              setShowQuickView(true);
            }}
          >
            <Eye className="w-4 h-4 mr-2" />
            Quick View
          </Button>
        </div>
      </div>

      <CardContent className="p-4">
        {/* Category */}
        <div className="flex items-center justify-between mb-2">
          <span className="text-xs uppercase tracking-wider text-muted-foreground font-medium">
            {category}
          </span>
          
          {/* Rating */}
          <div className="flex items-center gap-1">
            <Star className="w-3 h-3 fill-luxury-gold text-luxury-gold" />
            <span className="text-xs text-foreground/80">{rating}</span>
          </div>
        </div>

        {/* Product Name */}
        <h3 className="font-serif text-lg font-semibold mb-2 text-foreground group-hover:text-luxury-gold transition-colors">
          {name}
        </h3>

        {/* Description */}
        <p className="text-sm text-muted-foreground mb-4 line-clamp-2">
          {description}
        </p>

        {/* Price */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="text-xl font-bold gradient-text">
              ₹{price}
            </span>
            {originalPrice && (
              <span className="text-sm text-muted-foreground line-through">
                ₹{originalPrice}
              </span>
            )}
          </div>

          <Button
            variant="ghost-luxury"
            size="sm"
            className="p-2 h-auto hover:bg-luxury-gold hover:text-luxury-dark transition-all duration-300"
            onClick={handleAddToCart}
          >
            <ShoppingCart className="w-4 h-4" />
          </Button>
        </div>
      </CardContent>

      <QuickViewModal
        isOpen={showQuickView}
        onClose={() => setShowQuickView(false)}
        product={{ id, name, description, price, originalPrice, image, rating, category, isNew, isBestSeller }}
      />
    </Card>
  );
};