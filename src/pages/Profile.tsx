import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { User, Heart, ShoppingBag, Settings, Award, MapPin, Phone, Mail, Edit3, Loader2, Sparkles } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { supabase } from "@/integrations/supabase/client";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import roseImage from "@/assets/perfume-rose.jpg";
import { OrderDetailsModal } from "@/components/OrderDetailsModal";

const Profile = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [loading, setLoading] = useState(true);
  const [profile, setProfile] = useState<any>(null);
  const [orders, setOrders] = useState<any[]>([]);
  const [selectedOrder, setSelectedOrder] = useState<any>(null);
  const [orderDetailsOpen, setOrderDetailsOpen] = useState(false);

  useEffect(() => {
    if (!user) {
      navigate('/auth');
      return;
    }

    const fetchProfileAndOrders = async () => {
      try {
        // Fetch profile
        const { data: profileData, error: profileError } = await supabase
          // @ts-ignore - Supabase types not synced
          .from('profiles')
          .select('*')
          .eq('id', user.id)
          .single();

        if (profileError) throw profileError;
        setProfile(profileData);

        // Fetch orders
        const { data: ordersData, error: ordersError } = await supabase
          // @ts-ignore - Supabase types not synced
          .from('orders')
          .select('*')
          .eq('user_id', user.id)
          .order('created_at', { ascending: false });

        if (ordersError) throw ordersError;
        setOrders(ordersData || []);
      } catch (error: any) {
        console.error('Error fetching data:', error);
        toast.error('Failed to load profile data');
      } finally {
        setLoading(false);
      }
    };

    fetchProfileAndOrders();
  }, [user, navigate]);

  const fragranceProfile = {
    preferredNotes: ["Oud", "Jasmine", "Musk", "Vanilla"],
    fragranceStyle: "Woody & Oriental",
    skinType: "Normal",
    occasions: ["Evening", "Special Events", "Daily Wear"]
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
      
      <div className="pt-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto animate-fade-in">
        {/* Profile Header */}
        <div className="mb-8">
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 sm:gap-6">
            <div className="w-20 h-20 sm:w-24 sm:h-24 bg-gradient-luxury rounded-full flex items-center justify-center overflow-hidden">
              {profile?.avatar_url ? (
                <img src={profile.avatar_url} alt="Profile" className="w-full h-full object-cover" />
              ) : (
                <User className="w-10 h-10 sm:w-12 sm:h-12 text-foreground" />
              )}
            </div>
            
            <div className="flex-1">
              <h1 className="font-serif text-2xl sm:text-3xl font-bold mb-2 gradient-text">
                {profile?.full_name || user?.email}
              </h1>
              <p className="text-sm sm:text-base text-muted-foreground mb-3 sm:mb-4">
                Fragrance Enthusiast • Member since {new Date(user?.created_at || '').getFullYear()}
              </p>
              <div className="flex flex-wrap items-center gap-3 sm:gap-4 text-xs sm:text-sm text-muted-foreground">
                <div className="flex items-center gap-1">
                  <Award className="w-4 h-4 text-luxury-gold" />
                  <span>Member</span>
                </div>
                <div className="flex items-center gap-1">
                  <ShoppingBag className="w-4 h-4" />
                  <span>{orders.length} Orders</span>
                </div>
              </div>
            </div>

            <Button variant="outline-luxury" onClick={() => navigate('/edit-profile')} className="w-full sm:w-auto">
              <Edit3 className="w-4 h-4 mr-2" />
              Edit Profile
            </Button>
          </div>
        </div>

        {/* Quick Links Section */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <Link to="/collections" className="block focus:outline-none focus:ring-2 focus:ring-primary rounded-lg hover-scale">
            <Card className="card-luxury">
              <CardContent className="p-6 text-center">
                <ShoppingBag className="w-8 h-8 mx-auto mb-2 text-luxury-gold" />
                <p className="font-semibold text-sm">Shop</p>
              </CardContent>
            </Card>
          </Link>
          <Link to="/discover-scent" className="block focus:outline-none focus:ring-2 focus:ring-primary rounded-lg hover-scale">
            <Card className="card-luxury">
              <CardContent className="p-6 text-center">
                <Sparkles className="w-8 h-8 mx-auto mb-2 text-luxury-gold" />
                <p className="font-semibold text-sm">Quiz</p>
              </CardContent>
            </Card>
          </Link>
          <Link to="/perfume-guide" className="block focus:outline-none focus:ring-2 focus:ring-primary rounded-lg hover-scale">
            <Card className="card-luxury">
              <CardContent className="p-6 text-center">
                <Award className="w-8 h-8 mx-auto mb-2 text-luxury-gold" />
                <p className="font-semibold text-sm">Guide</p>
              </CardContent>
            </Card>
          </Link>
          <Link to="/about" className="block focus:outline-none focus:ring-2 focus:ring-primary rounded-lg hover-scale">
            <Card className="card-luxury">
              <CardContent className="p-6 text-center">
                <Heart className="w-8 h-8 mx-auto mb-2 text-luxury-gold" />
                <p className="font-semibold text-sm">About</p>
              </CardContent>
            </Card>
          </Link>
        </div>

        {/* Profile Content */}
        <Tabs defaultValue="orders" className="space-y-6">
          <TabsList className="grid w-full grid-cols-3 bg-card/50 h-auto p-1">
            <TabsTrigger value="orders" className="flex items-center gap-2 p-3 data-[state=active]:bg-luxury-gold data-[state=active]:text-luxury-dark">
              <ShoppingBag className="w-4 h-4" />
              <span className="hidden sm:inline">Orders</span>
            </TabsTrigger>
            <TabsTrigger value="profile-info" className="flex items-center gap-2 p-3 data-[state=active]:bg-luxury-gold data-[state=active]:text-luxury-dark">
              <User className="w-4 h-4" />
              <span className="hidden sm:inline">Profile</span>
            </TabsTrigger>
            <TabsTrigger value="settings" className="flex items-center gap-2 p-3 data-[state=active]:bg-luxury-gold data-[state=active]:text-luxury-dark">
              <Settings className="w-4 h-4" />
              <span className="hidden sm:inline">Settings</span>
            </TabsTrigger>
          </TabsList>

          {/* Orders Tab */}
          <TabsContent value="orders" className="space-y-6">
            <div>
              <h2 className="font-serif text-2xl font-bold mb-4">Order History</h2>
              {orders.length === 0 ? (
                <Card className="card-luxury">
                  <CardContent className="p-12 text-center">
                    <ShoppingBag className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                    <p className="text-muted-foreground">No orders yet</p>
                  </CardContent>
                </Card>
              ) : (
                <div className="space-y-4">
                  {orders.map((order) => (
                    <Card key={order.id} className="card-luxury">
                      <CardContent className="p-4 sm:p-6">
                        <div className="flex flex-col sm:flex-row justify-between items-start gap-3 sm:gap-0 mb-4">
                          <div>
                            <h3 className="font-semibold text-base sm:text-lg">Order #{order.id.slice(0, 8)}</h3>
                            <p className="text-sm text-muted-foreground">{new Date(order.created_at).toLocaleDateString()}</p>
                          </div>
                          <div className="text-left sm:text-right">
                            <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                              order.status === 'delivered' 
                                ? 'bg-green-500/20 text-green-400'
                                : 'bg-blue-500/20 text-blue-400'
                            }`}>
                              {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                            </span>
                            <p className="text-lg font-bold mt-1">₹{order.total}</p>
                          </div>
                        </div>
                        
                        <div className="space-y-2">
                          {Array.isArray(order.order_items) && order.order_items.map((item: any, index: number) => (
                            <div key={index} className="flex items-center gap-3 sm:gap-4">
                              <img 
                                src={item.image || roseImage} 
                                alt={item.name}
                                className="w-12 h-12 rounded-lg object-cover"
                              />
                              <div className="flex-1 min-w-0">
                                <p className="font-medium text-sm sm:text-base truncate">{item.name}</p>
                                <p className="text-xs sm:text-sm text-muted-foreground">₹{item.price} x {item.quantity}</p>
                              </div>
                            </div>
                          ))}
                        </div>

                        <div className="flex gap-2 mt-4">
                          <Button 
                            variant="outline-luxury" 
                            size="sm" 
                            className="text-xs sm:text-sm"
                            onClick={() => {
                              setSelectedOrder(order);
                              setOrderDetailsOpen(true);
                            }}
                          >
                            View Details
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              )}
            </div>
          </TabsContent>

          {/* Profile Info Tab */}
          <TabsContent value="profile-info" className="space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              {/* Personal Information */}
              <Card className="card-luxury">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <User className="w-5 h-5" />
                    Personal Information
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <label className="text-sm font-medium text-muted-foreground">Full Name</label>
                    <p className="text-foreground">{profile?.full_name || 'Not set'}</p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-muted-foreground">Email</label>
                    <p className="text-foreground flex items-center gap-2">
                      <Mail className="w-4 h-4" />
                      {user?.email}
                    </p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-muted-foreground">Phone</label>
                    <p className="text-foreground flex items-center gap-2">
                      <Phone className="w-4 h-4" />
                      {profile?.phone || 'Not set'}
                    </p>
                  </div>
                </CardContent>
              </Card>

              {/* Fragrance Profile */}
              <Card className="card-luxury">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Award className="w-5 h-5" />
                    Fragrance Profile
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <label className="text-sm font-medium text-muted-foreground">Preferred Notes</label>
                    <div className="flex flex-wrap gap-2 mt-1">
                      {fragranceProfile.preferredNotes.map((note) => (
                        <span key={note} className="px-2 py-1 bg-luxury-gold/20 text-luxury-gold rounded-full text-xs">
                          {note}
                        </span>
                      ))}
                    </div>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-muted-foreground">Fragrance Style</label>
                    <p className="text-foreground">{fragranceProfile.fragranceStyle}</p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-muted-foreground">Skin Type</label>
                    <p className="text-foreground">{fragranceProfile.skinType}</p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-muted-foreground">Preferred Occasions</label>
                    <div className="flex flex-wrap gap-2 mt-1">
                      {fragranceProfile.occasions.map((occasion) => (
                        <span key={occasion} className="px-2 py-1 bg-accent/20 text-accent rounded-full text-xs">
                          {occasion}
                        </span>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Settings Tab */}
          <TabsContent value="settings" className="space-y-6">
            <div>
              <h2 className="font-serif text-2xl font-bold mb-4">Account Settings</h2>
              <div className="space-y-4">
                <Card className="card-luxury">
                  <CardContent className="p-6">
                    <h3 className="font-semibold text-lg mb-4">Fragrance Profile</h3>
                    <div className="space-y-3">
                      <Button 
                        variant="outline-luxury" 
                        className="w-full justify-start"
                        onClick={() => navigate('/discover-scent')}
                      >
                        <Sparkles className="w-4 h-4 mr-2" />
                        Update Fragrance Profile
                      </Button>
                    </div>
                  </CardContent>
                </Card>

                <Card className="card-luxury">
                  <CardContent className="p-6">
                    <h3 className="font-semibold text-lg mb-4">Privacy & Security</h3>
                    <div className="space-y-3">
                      <Button 
                        variant="outline-luxury" 
                        className="w-full justify-start"
                        onClick={() => navigate('/change-password')}
                      >
                        Change Password
                      </Button>
                      <Button variant="outline-luxury" className="w-full justify-start">
                        Two-Factor Authentication
                      </Button>
                      <Button variant="outline-luxury" className="w-full justify-start">
                        Download My Data
                      </Button>
                      <Button 
                        variant="destructive" 
                        className="w-full justify-start"
                        onClick={() => navigate('/delete-account')}
                      >
                        Delete Account
                      </Button>
                    </div>
                  </CardContent>
                </Card>

                <Card className="card-luxury">
                  <CardContent className="p-6">
                    <h3 className="font-semibold text-lg mb-4">Account</h3>
                    <div className="space-y-3">
                      <Button 
                        variant="outline-luxury" 
                        className="w-full justify-start"
                        onClick={async () => {
                          await supabase.auth.signOut();
                          navigate('/');
                        }}
                      >
                        Log Out
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </div>

      <div className="mt-20">
        <Footer />
      </div>

      <OrderDetailsModal 
        order={selectedOrder}
        open={orderDetailsOpen}
        onOpenChange={setOrderDetailsOpen}
      />
    </div>
  );
};

export default Profile;