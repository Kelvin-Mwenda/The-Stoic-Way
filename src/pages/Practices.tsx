
import React from "react";
import Layout from "../components/Layout";
import { Sunrise, Sunset, Book, Clock } from "lucide-react";

const Practices = () => {
  return (
    <Layout>
      <div className="w-full bg-background px-6 md:px-16 py-20 mt-16">
        <div className="container mx-auto max-w-4xl">
          <h1 className="text-5xl md:text-6xl font-bold mb-8">Daily Stoic Practices</h1>
          <div className="w-16 h-0.5 bg-foreground mb-10"></div>
          
          <p className="text-xl mb-12">
            Stoicism is not just a philosophy to understand intellectually—it's a practice to be lived daily. 
            These exercises, when performed consistently, will help you develop the mental resilience and clarity 
            that define the Stoic mindset.
          </p>
          
          <section className="mb-16">
            <h2 className="text-3xl font-semibold mb-6 flex items-center">
              <Sunrise className="mr-3" /> Morning Routine
            </h2>
            
            <div className="bg-muted p-8 mb-8">
              <h3 className="text-xl font-medium mb-4">The Morning Preparation</h3>
              <p className="text-lg mb-6">
                "When you first rise in the morning, consider what you must do to live as a good person today. 
                Think about the people and situations you'll face, and prepare yourself to deal with them virtuously."
              </p>
              
              <h4 className="font-medium mb-2">Practice:</h4>
              <ol className="list-decimal list-inside space-y-3 text-muted-foreground">
                <li>Wake up early, before distractions begin</li>
                <li>Remind yourself of your core Stoic principles</li>
                <li>Visualize potential challenges you might face today</li>
                <li>Prepare responses that align with virtue and wisdom</li>
                <li>Set clear intentions for how you'll approach the day</li>
              </ol>
            </div>
          </section>
          
          <section className="mb-16">
            <h2 className="text-3xl font-semibold mb-6 flex items-center">
              <Book className="mr-3" /> Journaling Practice
            </h2>
            
            <div className="bg-muted p-8 mb-8">
              <h3 className="text-xl font-medium mb-4">Structured Self-Reflection</h3>
              <p className="text-lg mb-6">
                "No man was ever wise by chance." — Seneca
              </p>
              
              <h4 className="font-medium mb-2">Journal Prompts:</h4>
              <ul className="list-disc list-inside space-y-3 text-muted-foreground">
                <li>What virtue did I practice today?</li>
                <li>What could I have done better?</li>
                <li>What am I grateful for in this moment?</li>
                <li>What is within my control about this situation?</li>
                <li>How am I preparing for adversity?</li>
              </ul>
              
              <div className="mt-6">
                <p className="text-muted-foreground italic">
                  Aim to write for at least 5-10 minutes daily, either in the morning to set intentions or in the evening to reflect.
                </p>
              </div>
            </div>
          </section>
          
          <section className="mb-16">
            <h2 className="text-3xl font-semibold mb-6 flex items-center">
              <Clock className="mr-3" /> Midday Reflection
            </h2>
            
            <div className="bg-muted p-8 mb-8">
              <h3 className="text-xl font-medium mb-4">The Midday Pause</h3>
              <p className="text-lg mb-6">
                "People seek retreats for themselves in the country, by the sea, on the mountains... But this is altogether a mark of the most common sort of person, for it is in your power whenever you shall choose to retire into yourself." — Marcus Aurelius
              </p>
              
              <h4 className="font-medium mb-2">Practice:</h4>
              <ol className="list-decimal list-inside space-y-3 text-muted-foreground">
                <li>Take a 5-minute break from your activities</li>
                <li>Focus on your breathing to center yourself</li>
                <li>Review your morning intentions</li>
                <li>Assess how you're responding to challenges</li>
                <li>Reset your focus for the remainder of the day</li>
              </ol>
            </div>
          </section>
          
          <section className="mb-16">
            <h2 className="text-3xl font-semibold mb-6 flex items-center">
              <Sunset className="mr-3" /> Evening Review
            </h2>
            
            <div className="bg-muted p-8 mb-8">
              <h3 className="text-xl font-medium mb-4">Daily Examination</h3>
              <p className="text-lg mb-6">
                "I will keep constant watch over myself and—most usefully—will put each day up for review... for this is what makes us evil—that none of us looks back upon our own lives. We reflect upon only that which we are about to do." — Seneca
              </p>
              
              <h4 className="font-medium mb-2">Evening Questions:</h4>
              <ul className="list-disc list-inside space-y-3 text-muted-foreground">
                <li>What did I do well today?</li>
                <li>What mistakes did I make?</li>
                <li>How could I have been better?</li>
                <li>What lessons can I take forward?</li>
                <li>Am I making progress in my character development?</li>
              </ul>
            </div>
          </section>
          
          <section>
            <h2 className="text-3xl font-semibold mb-6">The 30-Day Stoic Challenge</h2>
            <p className="text-lg mb-6">
              To truly internalize Stoic principles, commit to this 30-day challenge. Each day focuses on a specific 
              practice or concept, building a comprehensive Stoic toolkit for your life.
            </p>
            
            <div className="bg-muted p-8">
              <h3 className="text-xl font-medium mb-4">Challenge Overview</h3>
              <p className="text-muted-foreground mb-6">
                The challenge includes practices such as:
              </p>
              <ul className="list-disc list-inside space-y-3 text-muted-foreground">
                <li>Voluntary discomfort (cold showers, fasting)</li>
                <li>Negative visualization exercises</li>
                <li>Meditation on impermanence</li>
                <li>Practicing gratitude daily</li>
                <li>Digital minimalism and focus training</li>
              </ul>
              
              <div className="mt-8">
                <button 
                  className="inline-flex items-center justify-center bg-secondary text-secondary-foreground px-8 py-3 text-sm font-medium transition-colors"
                >
                  Download 30-Day Challenge Guide
                </button>
              </div>
            </div>
          </section>
        </div>
      </div>
    </Layout>
  );
};

export default Practices;
