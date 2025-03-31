
import React, { useState } from "react";
import { MapPin, Mail, Phone } from "lucide-react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Form, FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

const contactSchema = z.object({
  name: z.string().min(2, { message: "Name must be at least 2 characters" }),
  email: z.string().email({ message: "Please enter a valid email address" }),
  subject: z.string().min(5, { message: "Subject must be at least 5 characters" }),
  message: z.string().min(10, { message: "Message must be at least 10 characters" }),
});

type ContactFormValues = z.infer<typeof contactSchema>;

const ContactForm = () => {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const form = useForm<ContactFormValues>({
    resolver: zodResolver(contactSchema),
    defaultValues: {
      name: "",
      email: "",
      subject: "",
      message: "",
    },
  });

  const onSubmit = async (values: ContactFormValues) => {
    console.log("Form Values:", values);
    setIsSubmitting(true);
    
    try {
      const { error } = await supabase
        .from('ContactMessages')
        .insert({
          name: values.name,
          email: values.email,
          subject: values.subject,
          message: values.message,
        });
      
      if (error) {
        throw error;
      }
      
      toast({
        title: "Message sent",
        description: "Thank you for your message. We'll get back to you soon!",
        variant:"success",
      });
      
      form.reset();
    } catch (error) {
      if (error instanceof Error) {
        console.error("Error sending message:", error);
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
      setIsSubmitting(false);
    }
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
      <div>
        <h2 className="text-2xl font-semibold mb-6">Get in Touch</h2>
        <p className="text-black mb-8">
          Have questions about Stoicism or suggestions for our content? We'd love to hear from you. Our team is dedicated to spreading Stoic wisdom and building a community of like-minded individuals.
        </p>
        
        <div className="space-y-6">
          <div className="flex items-start">
            <MapPin className="mr-4 text-muted-foreground" size={20} />
            <div>
              <p className="font-medium">Location</p>
              <p className="text-muted-foreground">Juja City, Kiambu</p>
            </div>
          </div>
          
          <div className="flex items-start">
            <Mail className="mr-4 text-muted-foreground" size={20} />
            <div>
              <p className="font-medium">Email</p>
              <p className="text-muted-foreground">chocstheballs@gmail.com</p>
            </div>
          </div>
          
          <div className="flex items-start">
            <Phone className="mr-4 text-muted-foreground" size={20} />
            <div>
              <p className="font-medium">Phone</p>
              <p className="text-muted-foreground">+254 746 917 394</p>
            </div>
          </div>
        </div>
      </div>
      
      <div>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Name</FormLabel>
                    <FormControl>
                      <Input 
                        placeholder="Your name" 
                        {...field} 
                        disabled={isSubmitting} 
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input 
                        type="email" 
                        placeholder="Your email" 
                        {...field} 
                        disabled={isSubmitting} 
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            
            <FormField
              control={form.control}
              name="subject"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Subject</FormLabel>
                  <FormControl>
                    <Input 
                      placeholder="Subject" 
                      {...field} 
                      disabled={isSubmitting} 
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="message"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Message</FormLabel>
                  <FormControl>
                    <Textarea 
                      placeholder="Your message" 
                      rows={5} 
                      {...field} 
                      disabled={isSubmitting} 
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <Button
              type="submit"
              className="inline-flex justify-center bg-black text-white px-8 py-3 text-sm font-medium transition-colors hover:bg-gray-800"
              disabled={isSubmitting}
            >
              {isSubmitting ? "Sending..." : "Send Message"}
            </Button>
          </form>
        </Form>
      </div>
    </div>
  );
};

export default ContactForm;
