import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Minus, Plus, Trash2, ShoppingBag, CreditCard, Truck, Shield } from "lucide-react";
import { useState } from "react";
import roseImage from "@/assets/perfume-rose.jpg";
import oudImage from "@/assets/perfume-oud.jpg";
import oceanImage from "@/assets/perfume-ocean.jpg";

const Shopping = () => {
  const [cartItems, setCartItems] = useState([
    {
      id: "1",
      name: "Midnight Rose Attar",
      price: 89,
      originalPrice: 120,
      quantity: 2,
      image: roseImage,
      category: "Attar",
      size: "12ml"
    },
    {
      id: "2", 
      name: "Golden Oud Premium",
      price: 156,
      quantity: 1,
      image: oudImage,
      category: "Premium",
      size: "15ml"
    },
    {
      id: "3",
      name: "Ocean Breeze",
      price: 67,
      quantity: 1,
      image: oceanImage,
      category: "Fresh",
      size: "30ml"
    }
  ]);

  const updateQuantity = (id: string, change: number) => {
    setCartItems(items => 
      items.map(item => 
        item.id === id 
          ? { ...item, quantity: Math.max(0, item.quantity + change) }
          : item
      ).filter(item => item.quantity > 0)
    );
  };

  const removeItem = (id: string) => {
    setCartItems(items => items.filter(item => item.id !== id));
  };

  const subtotal = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const savings = cartItems.reduce((sum, item) => 
    sum + ((item.originalPrice || item.price) - item.price) * item.quantity, 0
  );
  const shipping = subtotal > 100 ? 0 : 15;
  const tax = subtotal * 0.08;
  const total = subtotal + shipping + tax;

  const paymentMethods = [
    { name: "Credit Card", icon: CreditCard, description: "Visa, Mastercard, Amex" },
    { name: "PayPal", icon: Shield, description: "Secure PayPal payment" },
    { name: "Apple Pay", icon: Shield, description: "Touch ID or Face ID" }
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <div className="pt-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="font-serif text-3xl sm:text-4xl font-bold gradient-text mb-2">
            Shopping Cart
          </h1>
          <p className="text-muted-foreground">
            {cartItems.length} {cartItems.length === 1 ? 'item' : 'items'} in your cart
          </p>
        </div>

        {cartItems.length === 0 ? (
          /* Empty Cart */
          <div className="text-center py-16">
            <ShoppingBag className="w-24 h-24 text-muted-foreground/50 mx-auto mb-6" />
            <h2 className="font-serif text-2xl font-semibold mb-4">Your cart is empty</h2>
            <p className="text-muted-foreground mb-6">
              Looks like you haven't added any fragrances to your cart yet.
            </p>
            <Button variant="luxury" size="lg">
              Continue Shopping
            </Button>
          </div>
        ) : (
          /* Cart Content */
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Cart Items */}
            <div className="lg:col-span-2 space-y-4">
              <Card className="card-luxury">
                <CardContent className="p-6">
                  <h2 className="font-serif text-xl font-semibold mb-6">Cart Items</h2>
                  
                  <div className="space-y-6">
                    {cartItems.map((item) => (
                      <div key={item.id} className="flex gap-4">
                        <img 
                          src={item.image} 
                          alt={item.name}
                          className="w-20 h-20 rounded-lg object-cover"
                        />
                        
                        <div className="flex-1 min-w-0">
                          <h3 className="font-semibold text-lg truncate">{item.name}</h3>
                          <p className="text-sm text-muted-foreground">{item.category} • {item.size}</p>
                          
                          <div className="flex items-center gap-3 mt-2">
                            <span className="text-xl font-bold gradient-text">₹{item.price}</span>
                            {item.originalPrice && item.originalPrice > item.price && (
                              <span className="text-sm text-muted-foreground line-through">
                                ₹{item.originalPrice}
                              </span>
                            )}
                          </div>
                        </div>

                        <div className="flex flex-col items-end gap-2">
                          <Button 
                            variant="ghost-luxury" 
                            size="sm"
                            onClick={() => removeItem(item.id)}
                          >
                            <Trash2 className="w-4 h-4" />
                          </Button>
                          
                          <div className="flex items-center gap-2 bg-card rounded-lg p-1">
                            <Button 
                              variant="ghost-luxury" 
                              size="sm"
                              className="h-8 w-8 p-0"
                              onClick={() => updateQuantity(item.id, -1)}
                            >
                              <Minus className="w-3 h-3" />
                            </Button>
                            <span className="w-8 text-center text-sm font-medium">
                              {item.quantity}
                            </span>
                            <Button 
                              variant="ghost-luxury" 
                              size="sm"
                              className="h-8 w-8 p-0"
                              onClick={() => updateQuantity(item.id, 1)}
                            >
                              <Plus className="w-3 h-3" />
                            </Button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Shipping Info */}
              <Card className="card-luxury">
                <CardContent className="p-6">
                  <h3 className="font-semibold text-lg mb-4 flex items-center gap-2">
                    <Truck className="w-5 h-5 text-luxury-gold" />
                    Shipping Information
                  </h3>
                  <div className="space-y-3 text-sm">
                    <div className="flex items-center justify-between">
                      <span>Free shipping on orders over ₹100</span>
                      {subtotal > 100 && <span className="text-green-500 font-medium">✓ Qualified</span>}
                    </div>
                    <div className="flex items-center justify-between">
                      <span>Express shipping (1-2 days)</span>
                      <span className="text-muted-foreground">+₹25</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span>International shipping available</span>
                      <span className="text-muted-foreground">Calculated at checkout</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Order Summary */}
            <div className="space-y-6">
              <Card className="card-luxury">
                <CardContent className="p-6">
                  <h2 className="font-serif text-xl font-semibold mb-6">Order Summary</h2>
                  
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span>Subtotal ({cartItems.length} items)</span>
                      <span>₹{subtotal.toFixed(2)}</span>
                    </div>
                    
                    {savings > 0 && (
                      <div className="flex justify-between text-green-500">
                        <span>Savings</span>
                        <span>-₹{savings.toFixed(2)}</span>
                      </div>
                    )}
                    
                    <div className="flex justify-between">
                      <span>Shipping</span>
                      <span>{shipping === 0 ? 'Free' : `₹${shipping.toFixed(2)}`}</span>
                    </div>
                    
                    <div className="flex justify-between">
                      <span>Tax</span>
                      <span>₹{tax.toFixed(2)}</span>
                    </div>
                    
                    <Separator />
                    
                    <div className="flex justify-between text-lg font-bold">
                      <span>Total</span>
                      <span className="gradient-text">₹{total.toFixed(2)}</span>
                    </div>
                  </div>

                  <Button variant="luxury" size="lg" className="w-full mt-6">
                    Proceed to Checkout
                  </Button>
                </CardContent>
              </Card>

              {/* Payment Methods */}
              <Card className="card-luxury">
                <CardContent className="p-6">
                  <h3 className="font-semibold text-lg mb-4">We Accept</h3>
                  <div className="space-y-3">
                    {paymentMethods.map((method) => (
                      <div key={method.name} className="flex items-center gap-3 p-3 bg-card/50 rounded-lg">
                        <method.icon className="w-5 h-5 text-luxury-gold" />
                        <div>
                          <p className="font-medium text-sm">{method.name}</p>
                          <p className="text-xs text-muted-foreground">{method.description}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Security Badge */}
              <Card className="card-luxury">
                <CardContent className="p-6 text-center">
                  <Shield className="w-8 h-8 text-luxury-gold mx-auto mb-2" />
                  <h3 className="font-semibold mb-1">Secure Checkout</h3>
                  <p className="text-xs text-muted-foreground">
                    Your payment information is encrypted and secure
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        )}
      </div>

      <div className="mt-20">
        <Footer />
      </div>
    </div>
  );
};

export default Shopping;