
import React from "react";
import Layout from "../components/Layout";
import Hero from "../components/Hero";
import KeyHighlights from "../components/KeyHighlights";
import FeaturedContent from "../components/FeaturedContent";
import CallToAction from "../components/CallToAction";
import { ArrowRight, UserPlus, LogIn } from "lucide-react";
import { Link } from "react-router-dom";

const Index = () => {
  return (
    <Layout>
      <Hero />
      <KeyHighlights />
      <FeaturedContent />
      
      {/* Why Stoicism Matters */}
      <div className="w-full bg-secondary px-6 md:px-16 py-16">
        <div className="container mx-auto">
          <div className="max-w-2xl">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">Why Stoicism Matters Today</h2>
            <div className="w-16 h-0.5 bg-foreground mb-6"></div>
            <p className="text-lg text-muted-foreground mb-6">
              In our fast-paced, distraction-filled world, Stoicism offers a powerful antidote: a practical philosophy focused on developing inner strength, emotional resilience, and clear judgment.
            </p>
            <p className="text-lg text-muted-foreground">
              Unlike the fleeting satisfaction of modern self-help, Stoic principles have endured for over 2,000 years because they address the root causes of human suffering and provide actionable frameworks for living virtuously in any circumstance.
            </p>
          </div>
        </div>
      </div>
      
      {/* Join the Community */}
      <div className="w-full bg-muted px-6 md:px-16 py-16">
        <div className="container mx-auto">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">Join Our Stoic Community</h2>
            <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
              Create an account to access exclusive content, track your progress, and connect with fellow practitioners of Stoic philosophy.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Link 
                to="/auth?mode=signup"
                className="inline-flex items-center justify-center bg-black text-white border border-white px-8 py-3 text-sm font-medium transition-all duration-3000 ease-in-out hover:bg-gray-800 hover:border-gray-700"
              >
                Create Account <UserPlus size={16} className="ml-2" />
              </Link>
              <Link 
                to="/auth?mode=login"
                className="inline-flex items-center justify-center bg-transparent border border-black px-6 py-3 text-sm font-medium text-black transition-all duration-3000 ease-in-out hover:bg-white hover:text-black hover:border-gray-300"
              >
                <LogIn size={16} className="mr-2" /> Sign In
              </Link>
            </div>
          </div>
        </div>
      </div>
      
      <CallToAction />
    </Layout>
  );
};

export default Index;
