import { useState } from "react";
import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useCart } from "@/contexts/CartContext";
import { useAuth } from "@/contexts/AuthContext";
import { CreditCard, MapPin } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

const Checkout = () => {
  const { items, totalPrice, clearCart } = useCart();
  const { user } = useAuth();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);

  if (items.length === 0) {
    navigate('/perfumes');
    return null;
  }

  if (!user) {
    toast.error('Please sign in to checkout');
    navigate('/auth');
    return null;
  }

  const shipping = 15;
  const tax = totalPrice * 0.08;
  const total = totalPrice + shipping + tax;

  const handlePlaceOrder = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    const formData = new FormData(e.target as HTMLFormElement);
    
    try {
      const orderData = {
        user_id: user.id,
        first_name: formData.get('firstName') as string,
        last_name: formData.get('lastName') as string,
        email: formData.get('email') as string,
        phone: formData.get('phone') as string,
        address: formData.get('address') as string,
        city: formData.get('city') as string,
        state: formData.get('state') as string,
        zip_code: formData.get('zip') as string,
        order_items: items as any,
        subtotal: totalPrice,
        shipping: shipping,
        tax: tax,
        total: total,
        payment_method: 'cash_on_delivery',
        status: 'pending'
      };

      const { data: insertedOrder, error } = await supabase
        // @ts-ignore - Supabase types not synced
        .from('orders')
        // @ts-ignore
        .insert(orderData)
        .select()
        .single();

      if (error) throw error;

      // Send order confirmation emails
      const fullAddress = `${orderData.address}, ${orderData.city}, ${orderData.state} ${orderData.zip_code}`;
      
      console.log('Sending order confirmation email...');
      const emailResult = await supabase.functions.invoke('send-order-email', {
        body: {
          customerEmail: orderData.email,
          customerName: `${orderData.first_name} ${orderData.last_name}`,
          orderDetails: {
            // @ts-ignore
            orderId: insertedOrder?.id || '',
            items: items.map(item => ({
              name: item.name,
              quantity: item.quantity,
              price: item.price
            })),
            total: total,
            address: fullAddress,
            phone: orderData.phone
          }
        }
      });
      
      if (emailResult.error) {
        console.error('Email sending failed:', emailResult.error);
        toast.error('Order placed but email notification failed');
      } else {
        console.log('Email sent successfully:', emailResult.data);
      }

      toast.success('Order placed successfully!');
      clearCart();
      navigate('/profile');
    } catch (error: any) {
      console.error('Order error:', error);
      toast.error(error.message || 'Failed to place order');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background animate-fade-in">
      <Navigation />
      
      <div className="pt-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto pb-20">
        <h1 className="font-serif text-4xl font-bold mb-8 gradient-text">Checkout</h1>
        
        <form onSubmit={handlePlaceOrder}>
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Checkout Form */}
            <div className="lg:col-span-2 space-y-6">
              {/* Shipping Information */}
              <Card className="card-luxury">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <MapPin className="w-5 h-5" />
                    Shipping Information
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="firstName">First Name</Label>
                      <Input id="firstName" name="firstName" placeholder="John" required />
                    </div>
                    <div>
                      <Label htmlFor="lastName">Last Name</Label>
                      <Input id="lastName" name="lastName" placeholder="Doe" required />
                    </div>
                  </div>
                  
                  <div>
                    <Label htmlFor="email">Email</Label>
                    <Input id="email" name="email" type="email" placeholder="john@example.com" required />
                  </div>
                  
                  <div>
                    <Label htmlFor="phone">Phone</Label>
                    <Input id="phone" name="phone" type="tel" placeholder="+1 (555) 123-4567" required />
                  </div>
                  
                  <div>
                    <Label htmlFor="address">Street Address</Label>
                    <Input id="address" name="address" placeholder="123 Main St" required />
                  </div>
                  
                  <div className="grid sm:grid-cols-3 gap-4">
                    <div>
                      <Label htmlFor="city">City</Label>
                      <Input id="city" name="city" placeholder="New York" required />
                    </div>
                    <div>
                      <Label htmlFor="state">State</Label>
                      <Input id="state" name="state" placeholder="NY" required />
                    </div>
                    <div>
                      <Label htmlFor="zip">ZIP Code</Label>
                      <Input id="zip" name="zip" placeholder="10001" required />
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Payment Method */}
              <Card className="card-luxury">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <CreditCard className="w-5 h-5" />
                    Payment Method
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center gap-3 p-4 border border-luxury-gold/30 rounded-lg bg-luxury-gold/5">
                    <CreditCard className="w-6 h-6 text-luxury-gold" />
                    <div>
                      <p className="font-semibold text-lg">Cash on Delivery</p>
                      <p className="text-sm text-muted-foreground">Pay when you receive your order</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Order Summary */}
            <div>
              <Card className="card-luxury sticky top-24">
                <CardHeader>
                  <CardTitle>Order Summary</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-3 max-h-64 overflow-y-auto">
                    {items.map((item) => (
                      <div key={item.id} className="flex gap-3">
                        <img
                          src={item.image}
                          alt={item.name}
                          className="w-16 h-16 object-cover rounded-lg"
                        />
                        <div className="flex-1 min-w-0">
                          <p className="font-medium truncate">{item.name}</p>
                          <p className="text-sm text-muted-foreground">Qty: {item.quantity}</p>
                          <p className="text-sm font-semibold">₹{(item.price * item.quantity).toFixed(2)}</p>
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="border-t pt-4 space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Subtotal</span>
                      <span>₹{totalPrice.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span>Shipping</span>
                      <span>₹{shipping.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span>Tax</span>
                      <span>₹{tax.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between font-bold text-lg border-t pt-2">
                      <span>Total</span>
                      <span className="gradient-text">₹{total.toFixed(2)}</span>
                    </div>
                  </div>

                  <Button 
                    type="submit" 
                    variant="luxury" 
                    size="lg" 
                    className="w-full"
                    disabled={isLoading}
                  >
                    {isLoading ? "Placing Order..." : "Place Order"}
                  </Button>
                  
                  <Button 
                    type="button"
                    variant="ghost-luxury" 
                    className="w-full" 
                    onClick={() => navigate('/shopping')}
                  >
                    Back to Cart
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>
        </form>
      </div>

      <Footer />
    </div>
  );
};

export default Checkout;