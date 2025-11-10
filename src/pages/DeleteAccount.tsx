import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { AlertTriangle, Lock } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

const DeleteAccount = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const [confirmText, setConfirmText] = useState("");

  const handleDelete = () => {
    setIsLoading(true);
    
    setTimeout(() => {
      setIsLoading(false);
      toast({
        title: "Account deleted",
        description: "Your account has been permanently deleted.",
        variant: "destructive",
      });
      navigate('/');
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <div className="pt-20 px-4 sm:px-6 lg:px-8 max-w-2xl mx-auto pb-20">
        <div className="mb-8">
          <h1 className="font-serif text-4xl font-bold mb-2 text-destructive">Delete Account</h1>
          <p className="text-muted-foreground">Permanently remove your account and all associated data</p>
        </div>

        <Card className="card-luxury border-destructive/50">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-destructive">
              <AlertTriangle className="w-5 h-5" />
              Warning: This action cannot be undone
            </CardTitle>
            <CardDescription>
              Deleting your account will permanently remove all your data including:
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="bg-destructive/10 p-4 rounded-lg border border-destructive/30">
              <ul className="space-y-2 text-sm">
                <li>• Your profile information and preferences</li>
                <li>• Order history and transaction records</li>
                <li>• Wishlist and saved items</li>
                <li>• Fragrance profile and recommendations</li>
                <li>• All associated account data</li>
              </ul>
            </div>

            <div>
              <Label htmlFor="password">Confirm Your Password</Label>
              <div className="relative">
                <Lock className="absolute left-3 top-3 w-4 h-4 text-muted-foreground" />
                <Input 
                  id="password" 
                  type="password" 
                  placeholder="Enter your password"
                  className="pl-10"
                />
              </div>
            </div>

            <div>
              <Label htmlFor="confirm-text">Type "DELETE" to confirm</Label>
              <Input 
                id="confirm-text" 
                placeholder="Type DELETE to confirm"
                value={confirmText}
                onChange={(e) => setConfirmText(e.target.value)}
              />
              <p className="text-sm text-muted-foreground mt-1">
                This helps prevent accidental deletions
              </p>
            </div>

            <div className="flex gap-4">
              <AlertDialog>
                <AlertDialogTrigger asChild>
                  <Button 
                    variant="destructive" 
                    size="lg"
                    disabled={confirmText !== "DELETE"}
                  >
                    Delete Account
                  </Button>
                </AlertDialogTrigger>
                <AlertDialogContent>
                  <AlertDialogHeader>
                    <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                    <AlertDialogDescription>
                      This action cannot be undone. This will permanently delete your account
                      and remove all your data from our servers.
                    </AlertDialogDescription>
                  </AlertDialogHeader>
                  <AlertDialogFooter>
                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                    <AlertDialogAction
                      onClick={handleDelete}
                      className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                    >
                      {isLoading ? "Deleting..." : "Yes, delete my account"}
                    </AlertDialogAction>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>

              <Button 
                type="button" 
                variant="outline" 
                size="lg"
                onClick={() => navigate('/profile')}
              >
                Cancel
              </Button>
            </div>

            <div className="bg-muted/50 p-4 rounded-lg border">
              <p className="text-sm text-muted-foreground">
                <strong>Need help?</strong> If you're having issues with your account or want to 
                take a break, consider contacting our support team instead of deleting your account.
              </p>
            </div>
          </CardContent>
        </Card>
      </div>

      <Footer />
    </div>
  );
};

export default DeleteAccount;
