import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useAuth } from "@/contexts/AuthContext";
import { supabase } from "@/integrations/supabase/client";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { ShoppingBag, Package, DollarSign, Users, Loader2, Eye } from "lucide-react";
import { OrderDetailsModal } from "@/components/OrderDetailsModal";

const Admin = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [isAdmin, setIsAdmin] = useState(false);
  const [orders, setOrders] = useState<any[]>([]);
  const [selectedOrder, setSelectedOrder] = useState<any>(null);
  const [orderDetailsOpen, setOrderDetailsOpen] = useState(false);

  useEffect(() => {
    const checkAdminAccess = async () => {
      if (!user) {
        navigate('/auth');
        return;
      }

      try {
        // Check if user has admin role from database
        // @ts-ignore - Supabase types will be updated automatically
        const { data: roleData, error: roleError } = await supabase
          .from('user_roles')
          .select('role')
          .eq('user_id', user.id)
          .eq('role', 'admin')
          .single();

        if (roleError || !roleData) {
          toast.error('Access denied: Admin only');
          navigate('/');
          return;
        }

        setIsAdmin(true);

        // Fetch all orders (RLS will handle permission check)
        // @ts-ignore - Supabase types will be updated automatically
        const { data: ordersData, error: ordersError } = await supabase
          .from('orders')
          .select('*')
          .order('created_at', { ascending: false });

        if (ordersError) throw ordersError;
        setOrders(ordersData || []);
      } catch (error: any) {
        console.error('Error checking admin access:', error);
        toast.error('Failed to verify admin access');
        navigate('/');
      } finally {
        setLoading(false);
      }
    };

    checkAdminAccess();
  }, [user, navigate]);

  const updateOrderStatus = async (orderId: string, newStatus: string) => {
    try {
      // @ts-ignore - Supabase types not synced
      const { error } = await supabase
        // @ts-ignore
        .from('orders')
        // @ts-ignore
        .update({ status: newStatus })
        .eq('id', orderId);

      if (error) throw error;

      setOrders(orders.map(order => 
        order.id === orderId ? { ...order, status: newStatus } : order
      ));

      toast.success('Order status updated');
    } catch (error: any) {
      console.error('Error updating order:', error);
      toast.error('Failed to update order status');
    }
  };

  const stats = {
    totalOrders: orders.length,
    pendingOrders: orders.filter(o => o.status === 'pending').length,
    completedOrders: orders.filter(o => o.status === 'delivered').length,
    totalRevenue: orders.reduce((sum, order) => sum + parseFloat(order.total || 0), 0)
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-luxury-gold" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <div className="pt-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto pb-20 animate-fade-in">
        <div className="mb-8">
          <h1 className="font-serif text-4xl font-bold mb-2 gradient-text">Admin Dashboard</h1>
          <p className="text-muted-foreground">Manage orders and view analytics</p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <Card className="card-luxury">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Total Orders</p>
                  <p className="text-3xl font-bold gradient-text">{stats.totalOrders}</p>
                </div>
                <ShoppingBag className="w-10 h-10 text-luxury-gold opacity-20" />
              </div>
            </CardContent>
          </Card>

          <Card className="card-luxury">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Pending</p>
                  <p className="text-3xl font-bold text-blue-400">{stats.pendingOrders}</p>
                </div>
                <Package className="w-10 h-10 text-blue-400 opacity-20" />
              </div>
            </CardContent>
          </Card>

          <Card className="card-luxury">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Completed</p>
                  <p className="text-3xl font-bold text-green-400">{stats.completedOrders}</p>
                </div>
                <Package className="w-10 h-10 text-green-400 opacity-20" />
              </div>
            </CardContent>
          </Card>

          <Card className="card-luxury">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Total Revenue</p>
                  <p className="text-3xl font-bold gradient-text">₹{stats.totalRevenue.toFixed(2)}</p>
                </div>
                <DollarSign className="w-10 h-10 text-luxury-gold opacity-20" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Orders List */}
        <Card className="card-luxury">
          <CardHeader>
            <CardTitle>All Orders</CardTitle>
          </CardHeader>
          <CardContent>
            {orders.length === 0 ? (
              <div className="text-center py-12">
                <ShoppingBag className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                <p className="text-muted-foreground">No orders yet</p>
              </div>
            ) : (
              <div className="space-y-4">
                {orders.map((order) => (
                  <div key={order.id} className="border border-border/50 rounded-lg p-4">
                    <div className="flex flex-col lg:flex-row gap-4 items-start lg:items-center justify-between mb-4">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <h3 className="font-semibold">Order #{order.id.slice(0, 8)}</h3>
                          <Badge variant={order.status === 'delivered' ? 'default' : 'secondary'}>
                            {order.status}
                          </Badge>
                        </div>
                        <div className="text-sm text-muted-foreground space-y-1">
                          <p><strong>Customer:</strong> {order.first_name} {order.last_name}</p>
                          <p><strong>Email:</strong> {order.email}</p>
                          <p><strong>Phone:</strong> {order.phone}</p>
                          <p><strong>Address:</strong> {order.address}, {order.city}, {order.state} {order.zip_code}</p>
                          <p><strong>Date:</strong> {new Date(order.created_at).toLocaleString()}</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="text-2xl font-bold gradient-text">₹{order.total}</p>
                        <p className="text-sm text-muted-foreground">{order.payment_method}</p>
                      </div>
                    </div>

                    <div className="flex flex-wrap gap-2">
                      <Button 
                        size="sm" 
                        variant="outline-luxury"
                        onClick={() => {
                          setSelectedOrder(order);
                          setOrderDetailsOpen(true);
                        }}
                      >
                        <Eye className="w-4 h-4 mr-2" />
                        View Details
                      </Button>
                      {order.status === 'pending' && (
                        <Button 
                          size="sm" 
                          variant="default"
                          onClick={() => updateOrderStatus(order.id, 'processing')}
                        >
                          Mark Processing
                        </Button>
                      )}
                      {order.status === 'processing' && (
                        <Button 
                          size="sm" 
                          variant="default"
                          onClick={() => updateOrderStatus(order.id, 'delivered')}
                        >
                          Mark Delivered
                        </Button>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      <Footer />

      <OrderDetailsModal 
        order={selectedOrder}
        open={orderDetailsOpen}
        onOpenChange={setOrderDetailsOpen}
      />
    </div>
  );
};

export default Admin;
