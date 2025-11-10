import { useState, useEffect } from "react";
import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Lock, Mail, Phone, User as UserIcon } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

const Auth = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [user, setUser] = useState<any>(null);
  const navigate = useNavigate();

  useEffect(() => {
    // Check if user is already logged in
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (session?.user) {
        setUser(session.user);
        navigate('/profile');
      }
    });

    // Listen for auth state changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
      setUser(session?.user ?? null);
      if (session?.user) {
        navigate('/profile');
      }
    });

    return () => subscription.unsubscribe();
  }, [navigate]);

  const handleSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    const formData = new FormData(e.target as HTMLFormElement);
    const email = formData.get('signin-email') as string;
    const password = formData.get('signin-password') as string;

    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      toast.error(error.message);
    } else {
      toast.success('Signed in successfully');
    }

    setIsLoading(false);
  };

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    const formData = new FormData(e.target as HTMLFormElement);
    const email = formData.get('signup-email') as string;
    const password = formData.get('signup-password') as string;
    const confirmPassword = formData.get('confirm-password') as string;
    const fullName = `${formData.get('firstName')} ${formData.get('lastName')}`;
    const phone = formData.get('phone') as string;

    if (password !== confirmPassword) {
      toast.error('Passwords do not match');
      setIsLoading(false);
      return;
    }

    if (password.length < 6) {
      toast.error('Password must be at least 6 characters');
      setIsLoading(false);
      return;
    }

    const { error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        emailRedirectTo: `${window.location.origin}/`,
        data: {
          full_name: fullName,
          phone: phone,
        },
      },
    });

    if (error) {
      toast.error(error.message);
    } else {
      toast.success('Account created successfully! You can now sign in.');
    }

    setIsLoading(false);
  };

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <div className="pt-20 px-4 sm:px-6 lg:px-8 max-w-md mx-auto pb-20">
        <div className="text-center mb-8">
          <h1 className="font-serif text-4xl font-bold mb-2 gradient-text">Welcome</h1>
          <p className="text-muted-foreground">Sign in to your account or create a new one</p>
        </div>

        <Card className="card-luxury">
          <CardContent className="pt-6">
            <Tabs defaultValue="signin">
              <TabsList className="grid w-full grid-cols-2 mb-6">
                <TabsTrigger value="signin">Sign In</TabsTrigger>
                <TabsTrigger value="signup">Sign Up</TabsTrigger>
              </TabsList>

              {/* Sign In Tab */}
              <TabsContent value="signin">
                <form onSubmit={handleSignIn} className="space-y-4">
                  <div>
                    <Label htmlFor="signin-email">Email</Label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-3 w-4 h-4 text-muted-foreground" />
                      <Input 
                        id="signin-email"
                        name="signin-email"
                        type="email" 
                        placeholder="you@example.com"
                        className="pl-10"
                        required
                      />
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="signin-password">Password</Label>
                    <div className="relative">
                      <Lock className="absolute left-3 top-3 w-4 h-4 text-muted-foreground" />
                      <Input 
                        id="signin-password"
                        name="signin-password"
                        type="password" 
                        placeholder="••••••••"
                        className="pl-10"
                        required
                      />
                    </div>
                  </div>

                  <Button 
                    type="submit" 
                    variant="luxury" 
                    size="lg" 
                    className="w-full"
                    disabled={isLoading}
                  >
                    {isLoading ? "Signing in..." : "Sign In"}
                  </Button>
                </form>
              </TabsContent>

              {/* Sign Up Tab */}
              <TabsContent value="signup">
                <form onSubmit={handleSignUp} className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
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
                    <Label htmlFor="phone">Phone Number</Label>
                    <div className="relative">
                      <Phone className="absolute left-3 top-3 w-4 h-4 text-muted-foreground" />
                      <Input 
                        id="phone"
                        name="phone"
                        type="tel" 
                        placeholder="+1 (555) 123-4567"
                        className="pl-10"
                        required
                      />
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="signup-email">Email</Label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-3 w-4 h-4 text-muted-foreground" />
                      <Input 
                        id="signup-email"
                        name="signup-email"
                        type="email" 
                        placeholder="you@example.com"
                        className="pl-10"
                        required
                      />
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="signup-password">Password</Label>
                    <div className="relative">
                      <Lock className="absolute left-3 top-3 w-4 h-4 text-muted-foreground" />
                      <Input 
                        id="signup-password"
                        name="signup-password"
                        type="password" 
                        placeholder="••••••••"
                        className="pl-10"
                        required
                        minLength={6}
                      />
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="confirm-password">Confirm Password</Label>
                    <div className="relative">
                      <Lock className="absolute left-3 top-3 w-4 h-4 text-muted-foreground" />
                      <Input 
                        id="confirm-password"
                        name="confirm-password"
                        type="password" 
                        placeholder="••••••••"
                        className="pl-10"
                        required
                        minLength={6}
                      />
                    </div>
                  </div>

                  <Button 
                    type="submit" 
                    variant="luxury" 
                    size="lg" 
                    className="w-full"
                    disabled={isLoading}
                  >
                    {isLoading ? "Creating account..." : "Create Account"}
                  </Button>
                </form>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>

        <p className="text-center text-sm text-muted-foreground mt-6">
          Your data is secure with industry-standard encryption
        </p>
      </div>

      <Footer />
    </div>
  );
};

export default Auth;