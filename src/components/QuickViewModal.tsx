import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Heart, ShoppingCart, Star, Minus, Plus } from "lucide-react";
import { useState } from "react";
import { useCart } from "@/contexts/CartContext";

interface QuickViewModalProps {
  isOpen: boolean;
  onClose: () => void;
  product: {
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
  };
  initialVariant?: 'EDT' | 'EDP';
}

export const QuickViewModal = ({ isOpen, onClose, product, initialVariant = 'EDT' }: QuickViewModalProps) => {
  const [quantity, setQuantity] = useState(1);
  const [isLiked, setIsLiked] = useState(false);
  const [selectedVariant, setSelectedVariant] = useState<'EDT' | 'EDP'>(initialVariant);
  const { addToCart } = useCart();

  const variantPrice = selectedVariant === 'EDP' ? Math.round(product.price * 1.2) : product.price;
  const variantOriginalPrice = product.originalPrice && selectedVariant === 'EDP' ? Math.round(product.originalPrice * 1.2) : product.originalPrice;

  const handleAddToCart = () => {
    for (let i = 0; i < quantity; i++) {
      addToCart({
        id: product.id,
        name: product.name,
        price: variantPrice,
        image: product.image,
        category: product.category,
        variant: selectedVariant
      });
    }
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="sr-only">Quick View - {product.name}</DialogTitle>
        </DialogHeader>
        
        <div className="grid md:grid-cols-2 gap-8">
          {/* Product Image */}
          <div className="relative">
            <img
              src={product.image}
              alt={product.name}
              className="w-full h-96 object-cover rounded-xl"
            />
            {(product.isNew || product.isBestSeller) && (
              <Badge className="absolute top-4 left-4 bg-luxury-gold text-luxury-dark">
                {product.isBestSeller ? 'Best Seller' : 'New'}
              </Badge>
            )}
            <Button
              variant="ghost"
              size="icon"
              className="absolute top-4 right-4 bg-white/80 hover:bg-white"
              onClick={() => setIsLiked(!isLiked)}
            >
              <Heart className={`w-5 h-5 ${isLiked ? 'fill-red-500 text-red-500' : ''}`} />
            </Button>
          </div>

          {/* Product Details */}
          <div className="flex flex-col gap-6">
            <div>
              <span className="text-sm uppercase tracking-wider text-muted-foreground font-medium">
                {product.category}
              </span>
              <h2 className="font-serif text-3xl font-bold mt-2 mb-3">{product.name}</h2>
              
              {/* Rating */}
              <div className="flex items-center gap-2 mb-4">
                <div className="flex items-center">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`w-4 h-4 ${
                        i < Math.floor(product.rating)
                          ? 'fill-luxury-gold text-luxury-gold'
                          : 'text-muted-foreground'
                      }`}
                    />
                  ))}
                </div>
                <span className="text-sm text-muted-foreground">({product.rating})</span>
              </div>
            </div>

            <p className="text-muted-foreground leading-relaxed">{product.description}</p>

            {/* Variant Selector */}
            <div className="space-y-2">
              <span className="font-medium text-sm">Concentration:</span>
              <div className="flex gap-3">
                <button
                  onClick={() => setSelectedVariant('EDT')}
                  className={`flex-1 px-4 py-3 text-sm font-medium rounded-lg transition-all duration-300 ${
                    selectedVariant === 'EDT'
                      ? 'bg-accent text-accent-foreground shadow-lg scale-105 ring-2 ring-accent/50'
                      : 'bg-muted/30 text-muted-foreground hover:bg-muted/50 hover:scale-102'
                  }`}
                >
                  <div>EDT</div>
                  <div className="text-xs opacity-80">Eau de Toilette</div>
                </button>
                <button
                  onClick={() => setSelectedVariant('EDP')}
                  className={`flex-1 px-4 py-3 text-sm font-medium rounded-lg transition-all duration-300 ${
                    selectedVariant === 'EDP'
                      ? 'bg-accent text-accent-foreground shadow-lg scale-105 ring-2 ring-accent/50'
                      : 'bg-muted/30 text-muted-foreground hover:bg-muted/50 hover:scale-102'
                  }`}
                >
                  <div>EDP <span className="text-xs">(+20%)</span></div>
                  <div className="text-xs opacity-80">Eau de Parfum</div>
                </button>
              </div>
            </div>

            {/* Price */}
            <div className="flex items-center gap-3">
              <span className="text-3xl font-bold gradient-text">₹{variantPrice}</span>
              {variantOriginalPrice && (
                <span className="text-lg text-muted-foreground line-through">
                  ₹{variantOriginalPrice}
                </span>
              )}
            </div>

            {/* Quantity Selector */}
            <div className="flex items-center gap-4">
              <span className="font-medium">Quantity:</span>
              <div className="flex items-center gap-2">
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                >
                  <Minus className="w-4 h-4" />
                </Button>
                <span className="w-12 text-center font-semibold">{quantity}</span>
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => setQuantity(quantity + 1)}
                >
                  <Plus className="w-4 h-4" />
                </Button>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-4 mt-auto">
              <Button
                variant="luxury"
                size="lg"
                className="flex-1"
                onClick={handleAddToCart}
              >
                <ShoppingCart className="w-5 h-5 mr-2" />
                Add to Cart
              </Button>
              <Button variant="outline-luxury" size="lg">
                Learn More
              </Button>
            </div>

            {/* Additional Info */}
            <div className="text-sm text-muted-foreground space-y-1 pt-4 border-t">
              <p>✓ Free shipping on orders over ₹100</p>
              <p>✓ 30-day return policy</p>
              <p>✓ Authentic luxury fragrances</p>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
