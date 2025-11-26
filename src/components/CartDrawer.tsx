import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { ShoppingCart, Trash2, Minus, Plus } from "lucide-react";
import { useCart } from "@/contexts/CartContext";
import { Badge } from "@/components/ui/badge";
import { useNavigate } from "react-router-dom";

export const CartDrawer = () => {
  const { items, removeFromCart, updateQuantity, totalItems, totalPrice } = useCart();
  const navigate = useNavigate();

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="ghost" size="icon" className="relative">
          <ShoppingCart className="w-5 h-5" />
          {totalItems > 0 && (
            <Badge className="absolute -top-1 -right-1 h-5 w-5 p-0 flex items-center justify-center bg-luxury-gold text-luxury-dark">
              {totalItems}
            </Badge>
          )}
        </Button>
      </SheetTrigger>
      <SheetContent className="w-full sm:max-w-lg overflow-y-auto">
        <SheetHeader>
          <SheetTitle className="font-serif text-2xl">Shopping Cart</SheetTitle>
        </SheetHeader>
        
        <div className="mt-8 space-y-6">
          {items.length === 0 ? (
            <div className="text-center py-12">
              <ShoppingCart className="w-16 h-16 mx-auto text-muted-foreground mb-4" />
              <p className="text-muted-foreground">Your cart is empty</p>
            </div>
          ) : (
            <>
              {items.map((item) => (
                <div key={`${item.id}-${item.variant}`} className="flex gap-4 pb-6 border-b animate-fade-in">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-24 h-24 object-cover rounded-lg transition-transform duration-300 hover:scale-105"
                  />
                  <div className="flex-1">
                    <h4 className="font-semibold mb-1">{item.name}</h4>
                    <div className="flex items-center gap-2 mb-2">
                      <p className="text-sm text-muted-foreground">{item.category}</p>
                      <span className="text-xs px-2 py-0.5 rounded-full bg-accent/20 text-accent font-medium">
                        {item.variant}
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Button
                        variant="outline"
                        size="icon"
                        className="h-8 w-8 transition-all duration-300 hover:scale-110 hover:border-accent"
                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                      >
                        <Minus className="w-3 h-3" />
                      </Button>
                      <span className="w-8 text-center font-medium">{item.quantity}</span>
                      <Button
                        variant="outline"
                        size="icon"
                        className="h-8 w-8 transition-all duration-300 hover:scale-110 hover:border-accent"
                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                      >
                        <Plus className="w-3 h-3" />
                      </Button>
                    </div>
                  </div>
                  <div className="flex flex-col items-end justify-between">
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-8 w-8 transition-all duration-300 hover:scale-110 hover:text-destructive"
                      onClick={() => removeFromCart(item.id)}
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                    <span className="font-bold gradient-text">₹{(item.price * item.quantity).toFixed(2)}</span>
                  </div>
                </div>
              ))}

              <div className="space-y-4 pt-4">
                <div className="flex justify-between text-lg font-semibold">
                  <span>Total:</span>
                  <span className="gradient-text text-2xl">₹{totalPrice.toFixed(2)}</span>
                </div>
                <Button 
                  variant="luxury" 
                  size="lg" 
                  className="w-full"
                  onClick={() => navigate('/checkout')}
                >
                  Proceed to Checkout
                </Button>
                <Button 
                  variant="outline-luxury" 
                  size="lg" 
                  className="w-full"
                  onClick={() => navigate('/perfumes')}
                >
                  Continue Shopping
                </Button>
              </div>
            </>
          )}
        </div>
      </SheetContent>
    </Sheet>
  );
};
