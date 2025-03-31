
import React from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const FeaturedContent = () => {
  const featuredItems = [
    {
      title: "What is Stoicism?",
      description: "A beginner-friendly introduction to Stoic philosophy and its core principles.",
      link: "/foundations",
      category: "Philosophy"
    },
    {
      title: "Building Mental Resilience",
      description: "Practical techniques to develop unshakable mental toughness in any situation.",
      link: "/mental-mastery",
      category: "Mindset"
    },
    {
      title: "Daily Stoic Practices",
      description: "Simple exercises you can incorporate into your daily routine to live more intentionally.",
      link: "/practices",
      category: "Practice"
    },
    {
      title: "The Dichotomy of Control",
      description: "Learn to focus only on what you can control and find peace amidst chaos.",
      link: "/foundations",
      category: "Principle"
    }
  ];

  return (
    <div className="w-full bg-background py-16 px-6 md:px-16">
      <div className="container mx-auto">
        <h2 className="text-3xl md:text-4xl font-bold mb-3">Featured Content</h2>
        <p className="text-muted-foreground mb-8 max-w-2xl">Essential guides to help you build discipline, emotional control, and resilience through Stoic principles.</p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {featuredItems.map((item, index) => (
            <Card key={index} className="bg-muted border-border hover:border-secondary transition-colors duration-300">
              <CardHeader className="pb-3">
                <div className="text-xs text-muted-foreground uppercase font-medium tracking-wide mb-1">{item.category}</div>
                <CardTitle className="text-xl">{item.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-muted-foreground">{item.description}</CardDescription>
              </CardContent>
              <CardFooter>
                <Link to={item.link} className="text-sm font-medium flex items-center text-foreground hover:text-secondary-foreground transition-colors">
                  Read More <ArrowRight size={14} className="ml-1" />
                </Link>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default FeaturedContent;
