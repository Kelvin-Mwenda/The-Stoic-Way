import React, { createContext, useContext, useEffect, useState } from "react";
import { Session, User } from "@supabase/supabase-js";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

interface AuthError {
  message: string;
  code?: string; // Optional error code
}
interface AuthData {
  user: User | null; // Assuming User is defined elsewhere
  session: Session | null; // Assuming Session is defined elsewhere
}

interface AuthContextProps {
  session: Session | null;
  user: User | null;
  isLoading: boolean;
  signUp: (email: string, password: string, fullName: string) => Promise<{
    error: AuthError | null;
    data: AuthData | null;
  }>;
  signIn: (email: string, password: string) => Promise<{
    error: AuthError | null;
    data: AuthData | null;
  }>;
  signOut: () => Promise<void>;
}

const AuthContext = createContext<AuthContextProps | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    // Set up auth state listener FIRST
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (event, session) => {
        console.log("Auth state changed:", event);
        setSession(session);
        setUser(session?.user ?? null);
        
        if (event === 'SIGNED_IN') {
          toast({
            title: "Welcome!",
            description: "You have successfully signed in.",
          });
        } else if (event === 'SIGNED_OUT') {
          toast({
            title: "Signed out",
            description: "You have been signed out.",
          });
        }
      }
    );

    // THEN check for existing session
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      setUser(session?.user ?? null);
      setIsLoading(false);
    });

    return () => subscription.unsubscribe();
  }, [toast]);

  const signUp = async (email: string, password: string, fullName: string): Promise<{
    error: AuthError | null;
    data: AuthData | null;
  }> => {
    try {
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            full_name: fullName,
          },
        },
      });
      
      return {
        error: error ? { message: error.message, code: error.code } : null,
        data: data ? { user: data.user, session: data.session } : null,
      };
    } catch (error) {
      console.error("Error in signUp:", error);
      return { data: null, error: { message: "An unexpected error occurred." } };
    }
  };

  const signIn = async (email: string, password: string): Promise<{
    error: AuthError | null;
    data: AuthData | null;
  }> => {
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });
      
      return {
        error: error ? { message: error.message, code: error.code } : null,
        data: data ? { user: data.user, session: data.session } : null,
      };
    } catch (error) {
      console.error("Error in signIn:", error);
      return { data: null, error: { message: "An unexpected error occurred." } };
    }
  };

  const signOut = async () => {
    try {
      await supabase.auth.signOut();
    } catch (error) {
      console.error("Error signing out:", error);
      toast({
        title: "Error signing out",
        description: "An error occurred while signing out.",
        variant: "destructive",
      });
    }
  };

  return (
    <AuthContext.Provider
      value={{
        session,
        user,
        isLoading,
        signUp,
        signIn,
        signOut,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
