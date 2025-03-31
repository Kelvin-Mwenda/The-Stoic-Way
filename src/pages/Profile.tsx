
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Layout from "@/components/Layout";
import { useAuth } from "@/contexts/AuthContext";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { User } from "lucide-react";

interface ProfileData {
  id: string;
  full_name: string;
  bio: string | null;
  avatar_url: string | null;
}

const Profile = () => {
  const { user, isLoading } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [profile, setProfile] = useState<ProfileData | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [fullName, setFullName] = useState("");
  const [bio, setBio] = useState("");
  const [avatar, setAvatar] = useState<File | null>(null);
  const [avatarUrl, setAvatarUrl] = useState<string | null>(null);
  const [isUploading, setIsUploading] = useState(false);

  // Redirect if not logged in
  useEffect(() => {
    if (!isLoading && !user) {
      navigate("/auth");
    }
  }, [user, isLoading, navigate]);

  // Fetch user profile
  useEffect(() => {
    const fetchProfile = async () => {
      if (!user) return;

      try {
        const { data, error } = await supabase
          .from("user_profiles")
          .select("*")
          .eq("id", user.id)
          .single();

        if (error) {
          console.error("Error fetching profile:", error);
          return;
        }

        setProfile(data);
        setFullName(data.full_name || "");
        setBio(data.bio || "");
        setAvatarUrl(data.avatar_url);
      } catch (error) {
        console.error("Error in fetchProfile:", error);
      }
    };

    fetchProfile();
  }, [user]);

  const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setAvatar(e.target.files[0]);
      
      // Preview the avatar
      const reader = new FileReader();
      reader.onload = () => {
        setAvatarUrl(reader.result as string);
      };
      reader.readAsDataURL(e.target.files[0]);
    }
  };

  const uploadAvatar = async () => {
    if (!avatar || !user) return null;
    
    setIsUploading(true);
    
    try {
      // Create the avatars bucket if it doesn't exist
      const { data: bucketData, error: bucketError } = await supabase
        .storage
        .getBucket('avatars');
      
      if (bucketError && bucketError.message.includes('not found')) {
        await supabase.storage.createBucket('avatars', {
          public: true,
        });
      }

      // Upload the avatar
      const fileExt = avatar.name.split('.').pop();
      const filePath = `${user.id}-${Date.now()}.${fileExt}`;
      
      const { error: uploadError } = await supabase.storage
        .from('avatars')
        .upload(filePath, avatar);
        
      if (uploadError) {
        throw uploadError;
      }
      
      // Get the public URL
      const { data } = supabase.storage
        .from('avatars')
        .getPublicUrl(filePath);
        
      return data.publicUrl;
    } catch (error) {
      console.error("Error uploading avatar:", error);
      toast({
        title: "Upload failed",
        description: "There was an error uploading your avatar.",
        variant: "destructive",
      });
      return null;
    } finally {
      setIsUploading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return;
    
    setIsSubmitting(true);
    
    try {
      // Upload avatar if there's a new one
      let newAvatarUrl = avatarUrl;
      if (avatar) {
        newAvatarUrl = await uploadAvatar();
      }
      
      // Update profile
      const { error } = await supabase
        .from("user_profiles")
        .update({
          full_name: fullName,
          bio,
          avatar_url: newAvatarUrl,
          updated_at: new Date().toISOString(),
        })
        .eq("id", user.id);
        
      if (error) {
        throw error;
      }
      
      toast({
        title: "Profile updated",
        description: "Your profile has been updated successfully.",
      });
      
      // Update local state
      setProfile(prev => prev ? {
        ...prev,
        full_name: fullName,
        bio,
        avatar_url: newAvatarUrl,
      } : null);
      
    } catch (error: any) {
      console.error("Error updating profile:", error);
      toast({
        title: "Update failed",
        description: error.message || "There was an error updating your profile.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isLoading) {
    return (
      <Layout>
        <div className="container mx-auto py-12 px-6">
          <div className="flex justify-center">
            <p>Loading...</p>
          </div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="container mx-auto py-12 px-6">
        <div className="max-w-2xl mx-auto">
          <h1 className="text-3xl font-bold mb-8">Your Profile</h1>
          
          <div className="bg-muted p-8 rounded-lg">
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Avatar */}
              <div className="flex flex-col items-center space-y-4 mb-6">
                <Avatar className="w-24 h-24">
                  <AvatarImage src={avatarUrl || ""} alt={fullName} />
                  <AvatarFallback className="text-xl">
                    {fullName ? fullName.charAt(0).toUpperCase() : <User />}
                  </AvatarFallback>
                </Avatar>
                
                <div className="flex flex-col items-center">
                  <Label htmlFor="avatar" className="cursor-pointer text-sm font-medium text-primary hover:underline">
                    Change Avatar
                  </Label>
                  <Input
                    id="avatar"
                    type="file"
                    accept="image/*"
                    onChange={handleAvatarChange}
                    className="hidden"
                  />
                  {isUploading && <p className="text-xs text-muted-foreground mt-1">Uploading...</p>}
                </div>
              </div>
              
              {/* Full Name */}
              <div className="space-y-2">
                <Label htmlFor="fullName">Full Name</Label>
                <Input
                  id="fullName"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  placeholder="Your full name"
                  disabled={isSubmitting}
                />
              </div>
              
              {/* Bio */}
              <div className="space-y-2">
                <Label htmlFor="bio">Bio</Label>
                <Textarea
                  id="bio"
                  value={bio}
                  onChange={(e) => setBio(e.target.value)}
                  placeholder="Tell us about yourself..."
                  rows={4}
                  disabled={isSubmitting}
                />
              </div>
              
              {/* Email - read only */}
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  value={user?.email || ""}
                  disabled
                  className="bg-background/50"
                />
                <p className="text-xs text-muted-foreground">Email cannot be changed</p>
              </div>
              
              {/* Submit Button */}
              <Button 
                type="submit" 
                className="w-full"
                disabled={isSubmitting}
              >
                {isSubmitting ? "Saving..." : "Save Changes"}
              </Button>
            </form>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Profile;
