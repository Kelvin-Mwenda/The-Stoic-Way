
import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import Layout from "../components/Layout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Form, FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { ArrowRight, Mail, Lock, User } from "lucide-react";
import { Link } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { useToast } from "@/hooks/use-toast";

const loginSchema = z.object({
  email: z.string().email({ message: "Please enter a valid email address" }),
  password: z.string().min(8, { message: "Password must be at least 8 characters" }),
});

const signupSchema = z.object({
  name: z.string().min(2, { message: "Name must be at least 2 characters" }),
  email: z.string().email({ message: "Please enter a valid email address" }),
  password: z.string().min(8, { message: "Password must be at least 8 characters" }),
  confirmPassword: z.string().min(8, { message: "Password must be at least 8 characters" }),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords don't match",
  path: ["confirmPassword"],
});

type LoginFormValues = z.infer<typeof loginSchema>;
type SignupFormValues = z.infer<typeof signupSchema>;

const Auth = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { signIn, signUp, user } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const { toast } = useToast();

  // Check URL query params for mode
  const [mode, setMode] = useState<"login" | "signup">(() => {
    const params = new URLSearchParams(location.search);
    const modeParam = params.get("mode");
    return (modeParam === "login" || modeParam === "signup") ? modeParam : "login";
  });

  // Update URL when mode changes
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    params.set("mode", mode);
    navigate(`${location.pathname}?${params.toString()}`, { replace: true });
  }, [mode, location.pathname, navigate]);

  // Redirect if user is already logged in
  useEffect(() => {
    if (user) {
      navigate("/");
    }
  }, [user, navigate]);

  const loginForm = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const signupForm = useForm<SignupFormValues>({
    resolver: zodResolver(signupSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  const onLoginSubmit = async (values: LoginFormValues) => {
    setIsSubmitting(true);
    try {
      const { error } = await signIn(values.email, values.password);
      
      if (error) {
        toast({
          title: "Login failed",
          description: error.message || "Please check your credentials and try again.",
          variant: "destructive",
        });
      } else {
        // Successful login is handled by AuthContext
        navigate("/");
      }
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message || "An unexpected error occurred.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const onSignupSubmit = async (values: SignupFormValues) => {
    setIsSubmitting(true);
    try {
      const { error } = await signUp(values.email, values.password, values.name);
      if (error) {
        toast({
          title: "Signup failed",
          description: error.message || "Please check your information and try again.",
          variant: "destructive",
        });
      } else {
        // Store the email in session storage
        sessionStorage.setItem('userEmail', values.email);
  
        // Notify the user of successful signup
        toast({
          title: "Account created",
          description: "Your account has been created successfully. Please check your email for confirmation.",
          variant: "success",
        });
  
        // Wait a bit before redirecting to login
        setTimeout(() => {
          setMode("login");
        }, 1500);
      }
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message || "An unexpected error occurred.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Layout>
      <div className="w-full flex items-center justify-center py-16 px-6 bg-background">
        <div className="w-full max-w-md">
          <div className="text-center mb-8">
            <h1 className="text-3xl md:text-4xl font-bold mb-2 text-foreground">
              {mode === "login" ? "Welcome Back" : "Join The Stoic Way"}
            </h1>
            <p className="text-muted-foreground">
              {mode === "login" 
                ? "Enter your details to access your account" 
                : "Sign up to start your Stoic journey"}
            </p>
          </div>

          <div className="bg-card shadow-md rounded-lg p-8">
            {/* Auth Mode Tabs */}
            <div className="flex w-full rounded-md overflow-hidden mb-8">
              <button
                className={`flex-1 py-3 text-center font-medium ${
                  mode === "login" 
                    ? "bg-black text-white" 
                    : "bg-secondary text-muted-foreground"
                }`}
                onClick={() => setMode("login")}
              >
                Sign In
              </button>
              <button
                className={`flex-1 py-3 text-center font-medium ${
                  mode === "signup" 
                    ? "bg-black text-primary-foreground" 
                    : "bg-secondary text-muted-foreground"
                }`}
                onClick={() => setMode("signup")}
              >
                Sign Up
              </button>
            </div>

            {/* Login Form */}
            {mode === "login" && (
              <Form {...loginForm}>
                <form onSubmit={loginForm.handleSubmit(onLoginSubmit)} className="space-y-6">
                  <FormField
                    control={loginForm.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-foreground">Email</FormLabel>
                        <FormControl>
                          <div className="relative">
                            <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                            <Input 
                              placeholder="Enter your email" 
                              className="pl-10 border-input" 
                              {...field} 
                              disabled={isSubmitting}
                            />
                          </div>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={loginForm.control}
                    name="password"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-foreground">Password</FormLabel>
                        <FormControl>
                          <div className="relative">
                            <Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                            <Input 
                              type="password" 
                              placeholder="Enter your password" 
                              className="pl-10 border-input" 
                              {...field} 
                              disabled={isSubmitting}
                            />
                          </div>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <div className="text-right">
                    <Link to="#" className="text-sm text-primary hover:underline">
                      Forgot password?
                    </Link>
                  </div>
                  <Button type="submit" className="w-full bg-black hover:bg-gray-800" disabled={isSubmitting}>
                    {isSubmitting ? "Signing In..." : "Sign In"} 
                    {!isSubmitting && <ArrowRight className="ml-2 h-4 w-4" />}
                  </Button>
                </form>
              </Form>
            )}

            {/* Signup Form */}
            {mode === "signup" && (
              <Form {...signupForm}>
                <form onSubmit={signupForm.handleSubmit(onSignupSubmit)} className="space-y-6">
                  <FormField
                    control={signupForm.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-foreground">Full Name</FormLabel>
                        <FormControl>
                          <div className="relative">
                            <User className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                            <Input 
                              placeholder="Enter your name" 
                              className="pl-10 border-input" 
                              {...field} 
                              disabled={isSubmitting}
                            />
                          </div>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={signupForm.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-foreground">Email</FormLabel>
                        <FormControl>
                          <div className="relative">
                            <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                            <Input 
                              placeholder="Enter your email" 
                              className="pl-10 border-input" 
                              {...field} 
                              disabled={isSubmitting}
                            />
                          </div>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={signupForm.control}
                    name="password"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-foreground">Password</FormLabel>
                        <FormControl>
                          <div className="relative">
                            <Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                            <Input 
                              type="password" 
                              placeholder="Create a password" 
                              className="pl-10 border-input" 
                              {...field} 
                              disabled={isSubmitting}
                            />
                          </div>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={signupForm.control}
                    name="confirmPassword"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-foreground">Confirm Password</FormLabel>
                        <FormControl>
                          <div className="relative">
                            <Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                            <Input 
                              type="password" 
                              placeholder="Confirm your password" 
                              className="pl-10 border-input" 
                              {...field} 
                              disabled={isSubmitting}
                            />
                          </div>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <Button type="submit" className="w-full bg-black hover:bg-gray-800" disabled={isSubmitting}>
                    {isSubmitting ? "Creating Account..." : "Create Account"} 
                    {!isSubmitting && <ArrowRight className="ml-2 h-4 w-4" />}
                  </Button> 
                </form>
              </Form>
            )}

            <div className="mt-6 text-center text-sm text-muted-foreground">
              {mode === "login" ? (
                <p>
                  Don't have an account?{" "}
                  <button 
                    onClick={() => setMode("signup")}
                    className="text-primary font-medium hover:underline"
                    disabled={isSubmitting}
                  >
                    Sign up
                  </button>
                </p>
              ) : (
                <p>
                  Already have an account?{" "}
                  <button 
                    onClick={() => setMode("login")}
                    className="text-primary font-medium hover:underline"
                    disabled={isSubmitting}
                  >
                    Sign in
                  </button>
                </p>
              )}
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Auth;
