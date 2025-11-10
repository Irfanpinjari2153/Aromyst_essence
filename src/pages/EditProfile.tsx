import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { User, Mail, Phone, MapPin, Camera } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";

const EditProfile = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const { user } = useAuth();
  const [isLoading, setIsLoading] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [fullName, setFullName] = useState("");
  const [phone, setPhone] = useState("");
  const [avatarUrl, setAvatarUrl] = useState<string | null>(null);

  useEffect(() => {
    const fetchProfile = async () => {
      if (!user) return;

      const { data, error } = await supabase
        // @ts-ignore - Supabase types not synced
        .from('profiles')
        .select('*')
        .eq('id', user.id)
        .single();

      if (error) {
        console.error('Error fetching profile:', error);
        return;
      }

      if (data) {
        // @ts-ignore
        setFullName(data.full_name || "");
        // @ts-ignore
        setPhone(data.phone || "");
        // @ts-ignore
        setAvatarUrl(data.avatar_url || null);
      }
    };

    fetchProfile();
  }, [user]);

  const handleAvatarUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files || !e.target.files[0] || !user) return;

    const file = e.target.files[0];
    const fileExt = file.name.split('.').pop();
    const fileName = `${user.id}/${Date.now()}.${fileExt}`;

    // Check file size (2MB max)
    if (file.size > 2 * 1024 * 1024) {
      toast({
        title: "File too large",
        description: "Please upload an image smaller than 2MB.",
        variant: "destructive",
      });
      return;
    }

    setUploading(true);

    try {
      // Upload to storage
      const { error: uploadError } = await supabase.storage
        .from('avatars')
        .upload(fileName, file, {
          cacheControl: '3600',
          upsert: false
        });

      if (uploadError) throw uploadError;

      // Get public URL
      const { data: { publicUrl } } = supabase.storage
        .from('avatars')
        .getPublicUrl(fileName);

      // Update profile with avatar URL
      // @ts-ignore
      const { error: updateError } = await supabase
        .from('profiles')
        // @ts-ignore
        .update({ avatar_url: publicUrl })
        .eq('id', user.id);

      if (updateError) throw updateError;

      setAvatarUrl(publicUrl);
      toast({
        title: "Photo uploaded",
        description: "Your profile photo has been updated.",
      });
    } catch (error: any) {
      console.error('Error uploading avatar:', error);
      toast({
        title: "Upload failed",
        description: "Failed to upload photo. Please try again.",
        variant: "destructive",
      });
    } finally {
      setUploading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return;

    setIsLoading(true);

    const { error } = await supabase
      // @ts-ignore - Supabase types not synced
      .from('profiles')
      // @ts-ignore
      .update({
        full_name: fullName,
        phone: phone,
      })
      .eq('id', user.id);

    setIsLoading(false);

    if (error) {
      toast({
        title: "Error",
        description: "Failed to update profile. Please try again.",
        variant: "destructive",
      });
      return;
    }

    toast({
      title: "Profile updated",
      description: "Your profile has been successfully updated.",
    });
    navigate('/profile');
  };

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <div className="pt-20 px-4 sm:px-6 lg:px-8 max-w-3xl mx-auto pb-20">
        <div className="mb-8">
          <h1 className="font-serif text-4xl font-bold mb-2 gradient-text">Edit Profile</h1>
          <p className="text-muted-foreground">Update your personal information and preferences</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Profile Picture */}
          <Card className="card-luxury">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Camera className="w-5 h-5" />
                Profile Picture
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center gap-6">
                <div className="w-24 h-24 bg-gradient-luxury rounded-full flex items-center justify-center overflow-hidden">
                  {avatarUrl ? (
                    <img src={avatarUrl} alt="Profile" className="w-full h-full object-cover" />
                  ) : (
                    <User className="w-12 h-12 text-foreground" />
                  )}
                </div>
                <div>
                  <input
                    type="file"
                    id="avatar-upload"
                    accept="image/jpeg,image/png,image/gif"
                    className="hidden"
                    onChange={handleAvatarUpload}
                    disabled={uploading}
                  />
                  <label htmlFor="avatar-upload">
                    <Button 
                      variant="outline-luxury" 
                      type="button"
                      disabled={uploading}
                      onClick={() => document.getElementById('avatar-upload')?.click()}
                    >
                      {uploading ? "Uploading..." : "Upload New Photo"}
                    </Button>
                  </label>
                  <p className="text-sm text-muted-foreground mt-2">
                    JPG, PNG or GIF. Max size 2MB.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

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
                <Label htmlFor="fullName">Full Name</Label>
                <Input 
                  id="fullName" 
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  placeholder="Enter your full name"
                />
              </div>

              <div>
                <Label htmlFor="email">
                  <Mail className="w-4 h-4 inline mr-2" />
                  Email
                </Label>
                <Input 
                  id="email" 
                  type="email" 
                  value={user?.email || ""} 
                  disabled
                  className="bg-muted"
                />
                <p className="text-xs text-muted-foreground mt-1">Email cannot be changed</p>
              </div>

              <div>
                <Label htmlFor="phone">
                  <Phone className="w-4 h-4 inline mr-2" />
                  Phone
                </Label>
                <Input 
                  id="phone" 
                  type="tel" 
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="Enter your phone number"
                />
              </div>
            </CardContent>
          </Card>


          {/* Action Buttons */}
          <div className="flex gap-4">
            <Button 
              type="submit" 
              variant="luxury" 
              size="lg"
              disabled={isLoading}
            >
              {isLoading ? "Saving..." : "Save Changes"}
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
      </div>

      <Footer />
    </div>
  );
};

export default EditProfile;
