
import React from "react";
import Layout from "../components/Layout";

const Foundations = () => {
  return (
    <Layout>
      <div className="w-full bg-background px-6 md:px-16 py-20 mt-16">
        <div className="container mx-auto max-w-4xl">
          <h1 className="text-5xl md:text-6xl font-bold mb-8">Stoic Foundations</h1>
          <div className="w-16 h-0.5 bg-foreground mb-10"></div>
          
          <section className="mb-16">
            <h2 className="text-3xl font-semibold mb-6">What is Stoicism?</h2>
            <p className="text-lg mb-6">
              Stoicism is a philosophical tradition founded in Athens in the early 3rd century BCE by Zeno of Citium. 
              It's not about suppressing emotions or enduring pain without complaint, but rather a comprehensive system 
              for living virtuously and finding inner peace regardless of external circumstances.
            </p>
            <p className="text-lg mb-6">
              Unlike many philosophical systems, Stoicism is intensely practical. Its core teachings focus on distinguishing 
              what we can control from what we cannot, developing emotional resilience, and living in accordance with nature 
              and reason.
            </p>
          </section>
          
          <section className="mb-16">
            <h2 className="text-3xl font-semibold mb-6">Key Stoic Principles</h2>
            
            <div className="bg-muted p-6 mb-8">
              <h3 className="text-xl font-medium mb-3">The Dichotomy of Control</h3>
              <p className="text-muted-foreground">
                "Some things are within our power, while others are not. Within our power are opinion, 
                motivation, desire, aversion, and, in a word, whatever is of our own doing; not within our 
                power are our body, our property, reputation, office, and, in a word, whatever is not of our own doing."
                — Epictetus
              </p>
            </div>
            
            <div className="bg-muted p-6 mb-8">
              <h3 className="text-xl font-medium mb-3">Memento Mori (Remember Death)</h3>
              <p className="text-muted-foreground">
                "You could leave life right now. Let that determine what you do and say and think."
                — Marcus Aurelius
              </p>
            </div>
            
            <div className="bg-muted p-6 mb-8">
              <h3 className="text-xl font-medium mb-3">Amor Fati (Love of Fate)</h3>
              <p className="text-muted-foreground">
                "Do not seek for things to happen the way you want them to; rather, wish that what happens happen the way it happens: 
                then you will be happy."
                — Epictetus
              </p>
            </div>
            
            <div className="bg-muted p-6">
              <h3 className="text-xl font-medium mb-3">Negative Visualization</h3>
              <p className="text-muted-foreground">
                "He robs present ills of their power who has perceived their coming beforehand."
                — Seneca
              </p>
            </div>
          </section>
          
          <section>
            <h2 className="text-3xl font-semibold mb-6">Ancient Wisdom, Modern Life</h2>
            <p className="text-lg mb-6">
              Despite being over two millennia old, Stoic philosophy remains remarkably relevant today. In our age of 
              endless distractions, information overload, and constant connectivity, the Stoic emphasis on focusing 
              only on what we can control is more valuable than ever.
            </p>
            <p className="text-lg mb-6">
              Modern applications of Stoicism can be found in cognitive behavioral therapy, productivity systems, 
              leadership training, and resilience building. From Silicon Valley CEOs to professional athletes, 
              many high-performers attribute their success to Stoic principles.
            </p>
            
            <div className="mt-12">
              <a 
                href="/practices" 
                className="inline-flex items-center justify-center bg-secondary text-secondary-foreground px-8 py-3 text-sm font-medium transition-colors"
              >
                Explore Daily Stoic Practices
              </a>
            </div>
          </section>
        </div>
      </div>
    </Layout>
  );
};

export default Foundations;
