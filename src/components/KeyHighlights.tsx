
import React from 'react';
import { Compass, Brain, Dumbbell, PiggyBank, Heart } from 'lucide-react';

const KeyHighlights = () => {
  const highlights = [
    {
      icon: <Compass className="w-10 h-10 mb-4 text-secondary-foreground" />,
      title: "Stoic Philosophy",
      description: "Ancient wisdom for navigating modern complexities with clarity and purpose."
    },
    {
      icon: <Brain className="w-10 h-10 mb-4 text-secondary-foreground" />,
      title: "Mental Toughness",
      description: "Build resilience to face life's challenges with equanimity and strength."
    },
    {
      icon: <Dumbbell className="w-10 h-10 mb-4 text-secondary-foreground" />,
      title: "Physical Discipline",
      description: "Train your body to strengthen your mind through intentional discomfort."
    },
    {
      icon: <PiggyBank className="w-10 h-10 mb-4 text-secondary-foreground" />,
      title: "Financial Wisdom",
      description: "Apply Stoic principles to build wealth while avoiding materialism."
    },
    {
      icon: <Heart className="w-10 h-10 mb-4 text-secondary-foreground" />,
      title: "Relationship Mastery",
      description: "Navigate social dynamics with emotional intelligence and authenticity."
    }
  ];

  return (
    <div className="w-full bg-muted py-16 px-6 md:px-16">
      <div className="container mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-3">What You'll Learn Here</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">Comprehensive resources to help you apply Stoic principles across all areas of life.</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
          {highlights.map((item, index) => (
            <div key={index} className="text-center">
              <div className="flex justify-center">{item.icon}</div>
              <h3 className="text-xl font-semibold mb-2">{item.title}</h3>
              <p className="text-muted-foreground text-sm">{item.description}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default KeyHighlights;
