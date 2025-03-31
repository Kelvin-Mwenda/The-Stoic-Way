
import React from 'react';
import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const CallToAction = () => {
  return (
    <div className="w-full bg-secondary py-20 px-6 md:px-16">
      <div className="container mx-auto text-center">
        <h2 className="text-3xl md:text-5xl font-bold mb-6 max-w-3xl mx-auto">Ready to Transform Your Life Through Stoic Principles?</h2>
        <p className="text-muted-foreground text-lg mb-8 max-w-2xl mx-auto">
          Join thousands who have discovered how ancient wisdom can solve modern problems, bringing clarity, purpose, and resilience to everyday life.
        </p>
        <Link 
          to="/foundations" 
          className="inline-flex items-center justify-center bg-black text-white border border-black px-10 py-4 text-base font-medium transition-all duration-300 ease-in-out hover:bg-transparent hover:text-black"
        >
          Start Your Stoic Journey <ArrowRight size={18} className="ml-2" />
        </Link>
      </div>
    </div>
  );
};

export default CallToAction;
