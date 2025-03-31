
import React, { useState } from "react";
import Layout from "../components/Layout";
import ContactForm from "../components/ContactForm";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const Contact = () => {
  const { toast } = useToast();
  const [email, setEmail] = useState("");
  const [isSubscribing, setIsSubscribing] = useState(false);

  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email || !email.includes('@')) {
      toast({
        title: "Invalid email",
        description: "Please enter a valid email address.",
        variant: "destructive",
      });
      return;
    }
    
    setIsSubscribing(true);
    
    try {
      const { error } = await supabase
        .from('NewsletterSubs')
        .insert({
          email,
          is_active: true,
        });
      
      if (error) {
        if (error.code === '23505') { // Unique violation
          toast({
            title: "Already subscribed",
            description: "This email is already subscribed to our newsletter.",
            variant:"destructive",
          });
        } else {
          throw error;
        }
      } else {
        toast({
          title: "Successfully subscribed",
          description: "Thank you for subscribing to our newsletter!",
          variant:"success",
        });
        setEmail("");
      }
    } catch (error) {
      
      if (error instanceof Error) {
        console.error("Error subscribing to newsletter:", error);
        toast({
          title: "Error",
          description: error.message || "An error occurred while sending your message. Please try again.",
          variant: "destructive",
        });
      } else {
        console.error("Unexpected error:", error);
        toast({
          title: "Error",
          description: "An unexpected error occurred. Please try again.",
          variant: "destructive",
        });
      }
    } finally {
      setIsSubscribing(false);
    }
  };

  return (
    <Layout>
      <div className="w-full bg-background px-6 md:px-16 py-20">
        <div className="container mx-auto max-w-5xl">
          <h1 className="text-5xl md:text-6xl font-bold mb-8">Contact</h1>
          <div className="w-16 h-0.5 bg-foreground mb-10"></div>
          
          <ContactForm />
          
          <div className="mt-20">
            <h2 className="text-2xl font-semibold mb-6">Join Our Newsletter</h2>
            <p className="text-muted-foreground mb-6 max-w-2xl">
              Subscribe to receive our weekly Stoic wisdom email, featuring practical exercises, thought-provoking quotes, and actionable insights to apply in your daily life.
            </p>
            
            <form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row gap-4 max-w-lg">
              <Input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="flex-grow p-3 bg-muted border border-border text-foreground"
                placeholder="Your email address"
                disabled={isSubscribing}
              />
              <Button
                type="submit"
                className="whitespace-nowrap bg-black text-white px-6 py-3 text-sm font-medium transition-colors rounded-md border border-transparent hover:bg-white hover:text-black hover:border-black"
                disabled={isSubscribing}
              >
                {isSubscribing ? "Subscribing..." : "Subscribe"}
              </Button>
            </form>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Contact;
