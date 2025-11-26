import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Package, MapPin, CreditCard, Calendar } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import roseImage from "@/assets/perfume-rose.jpg";

interface OrderDetailsModalProps {
  order: any;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export const OrderDetailsModal = ({ order, open, onOpenChange }: OrderDetailsModalProps) => {
  if (!order) return null;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl font-serif gradient-text">
            Order Details
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          {/* Order Info */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="text-sm text-muted-foreground">Order ID</p>
              <p className="font-semibold">#{order.id.slice(0, 8)}</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Status</p>
              <span className={`inline-block px-3 py-1 rounded-full text-xs font-medium ${
                order.status === 'delivered' 
                  ? 'bg-green-500/20 text-green-400'
                  : 'bg-blue-500/20 text-blue-400'
              }`}>
                {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
              </span>
            </div>
            <div>
              <p className="text-sm text-muted-foreground flex items-center gap-1">
                <Calendar className="w-4 h-4" />
                Order Date
              </p>
              <p className="font-semibold">{new Date(order.created_at).toLocaleDateString('en-US', { 
                year: 'numeric', 
                month: 'long', 
                day: 'numeric' 
              })}</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground flex items-center gap-1">
                <CreditCard className="w-4 h-4" />
                Payment Method
              </p>
              <p className="font-semibold">{order.payment_method.replace('_', ' ').toUpperCase()}</p>
            </div>
          </div>

          <Separator />

          {/* Items */}
          <div>
            <h3 className="font-semibold text-lg mb-4 flex items-center gap-2">
              <Package className="w-5 h-5" />
              Items
            </h3>
            <div className="space-y-3">
              {Array.isArray(order.order_items) && order.order_items.map((item: any, index: number) => (
                <div key={index} className="flex items-center gap-4 p-3 rounded-lg bg-card/50">
                  <img 
                    src={item.image || roseImage} 
                    alt={item.name}
                    className="w-16 h-16 rounded-lg object-cover"
                  />
                  <div className="flex-1">
                    <p className="font-medium">{item.name}</p>
                    <div className="flex items-center gap-2">
                      <p className="text-sm text-muted-foreground">Quantity: {item.quantity}</p>
                      {item.variant && (
                        <span className="text-xs px-2 py-0.5 rounded-full bg-accent/20 text-accent font-medium">
                          {item.variant}
                        </span>
                      )}
                    </div>
                  </div>
                  <p className="font-semibold">₹{(item.price * item.quantity).toFixed(2)}</p>
                </div>
              ))}
            </div>
          </div>

          <Separator />

          {/* Shipping Address */}
          <div>
            <h3 className="font-semibold text-lg mb-3 flex items-center gap-2">
              <MapPin className="w-5 h-5" />
              Shipping Address
            </h3>
            <div className="bg-card/50 p-4 rounded-lg space-y-1">
              <p className="font-medium">{order.first_name} {order.last_name}</p>
              <p className="text-sm text-muted-foreground">{order.address}</p>
              <p className="text-sm text-muted-foreground">{order.city}, {order.state} {order.zip_code}</p>
              <p className="text-sm text-muted-foreground">Phone: {order.phone}</p>
              <p className="text-sm text-muted-foreground">Email: {order.email}</p>
            </div>
          </div>

          <Separator />

          {/* Order Summary */}
          <div>
            <h3 className="font-semibold text-lg mb-3">Order Summary</h3>
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Subtotal</span>
                <span>₹{Number(order.subtotal).toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Shipping</span>
                <span>₹{Number(order.shipping).toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Tax</span>
                <span>₹{Number(order.tax).toFixed(2)}</span>
              </div>
              <Separator />
              <div className="flex justify-between font-bold text-lg">
                <span>Total</span>
                <span className="gradient-text">₹{Number(order.total).toFixed(2)}</span>
              </div>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
