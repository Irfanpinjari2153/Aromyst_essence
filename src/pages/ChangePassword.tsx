import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Lock, Shield } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";

const ChangePassword = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    setTimeout(() => {
      setIsLoading(false);
      toast({
        title: "Password changed",
        description: "Your password has been successfully updated.",
      });
      navigate('/profile');
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <div className="pt-20 px-4 sm:px-6 lg:px-8 max-w-2xl mx-auto pb-20">
        <div className="mb-8">
          <h1 className="font-serif text-4xl font-bold mb-2 gradient-text">Change Password</h1>
          <p className="text-muted-foreground">Update your password to keep your account secure</p>
        </div>

        <Card className="card-luxury">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Shield className="w-5 h-5" />
              Security Settings
            </CardTitle>
            <CardDescription>
              Enter your current password and choose a new one
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <Label htmlFor="current-password">Current Password</Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-3 w-4 h-4 text-muted-foreground" />
                  <Input 
                    id="current-password" 
                    type="password" 
                    placeholder="Enter current password"
                    className="pl-10"
                    required
                  />
                </div>
              </div>

              <div>
                <Label htmlFor="new-password">New Password</Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-3 w-4 h-4 text-muted-foreground" />
                  <Input 
                    id="new-password" 
                    type="password" 
                    placeholder="Enter new password"
                    className="pl-10"
                    required
                  />
                </div>
                <p className="text-sm text-muted-foreground mt-1">
                  Must be at least 8 characters with uppercase, lowercase, and numbers
                </p>
              </div>

              <div>
                <Label htmlFor="confirm-password">Confirm New Password</Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-3 w-4 h-4 text-muted-foreground" />
                  <Input 
                    id="confirm-password" 
                    type="password" 
                    placeholder="Confirm new password"
                    className="pl-10"
                    required
                  />
                </div>
              </div>

              <div className="bg-muted/50 p-4 rounded-lg border">
                <h4 className="font-semibold mb-2">Password Requirements:</h4>
                <ul className="text-sm space-y-1 text-muted-foreground">
                  <li>• At least 8 characters long</li>
                  <li>• Contains uppercase letters (A-Z)</li>
                  <li>• Contains lowercase letters (a-z)</li>
                  <li>• Contains numbers (0-9)</li>
                  <li>• Contains special characters (!@#$%^&*)</li>
                </ul>
              </div>

              <div className="flex gap-4">
                <Button 
                  type="submit" 
                  variant="luxury" 
                  size="lg"
                  disabled={isLoading}
                >
                  {isLoading ? "Updating..." : "Update Password"}
                </Button>
                <Button 
                  type="button" 
                  variant="outline-luxury" 
                  size="lg"
                  onClick={() => navigate('/profile')}
                >
                  Cancel
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>

      <Footer />
    </div>
  );
};

export default ChangePassword;
