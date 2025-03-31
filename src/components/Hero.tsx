
import React from 'react';
import { ArrowRight, BookOpen } from 'lucide-react';
import { Link } from 'react-router-dom';
import { AspectRatio } from './ui/aspect-ratio';
import { useIsMobile } from '../hooks/use-mobile';

const Hero = () => {
  const isMobile = useIsMobile();
  
  return (
    <div className="w-full min-h-[calc(100vh-4rem)] bg-background py-12 md:py-16 px-4 md:px-16 flex flex-col justify-center">
      <div className="container mx-auto">
        <div className="flex flex-col md:flex-row items-center gap-8 md:gap-12">
          {/* Right side - Image for mobile (top position) */}
          {isMobile && (
            <div className="w-full order-1 mb-6">
              <div className="rounded-xl overflow-hidden shadow-lg border border-border mx-2">
                <AspectRatio ratio={16/10} className="bg-muted">
                  <img 
                    src="/public/lovable-uploads/f0a57e6b-48a5-4cee-9a25-b3d7514481a0.png" 
                    alt="Statue of Marcus Aurelius, Roman Emperor and Stoic philosopher, mounted on horseback" 
                    className="w-full h-full object-cover object-center grayscale"
                  />
                </AspectRatio>
              </div>
              <p className="text-xs text-muted-foreground mt-2 text-center italic">
                Equestrian statue of Marcus Aurelius - Stoic philosopher and Roman Emperor
              </p>
            </div>
          )}
          
          {/* Left side - Content */}
          <div className="w-full md:w-1/2 order-2 md:order-1">
            <h1 className="text-4xl sm:text-5xl md:text-7xl font-bold mb-6 leading-tight tracking-tighter">
              Master<br />Yourself.<br />Master Life.
            </h1>
            <div className="w-16 h-0.5 bg-foreground mb-6"></div>
            <p className="text-muted-foreground text-base md:text-lg mb-8 max-w-md">
              Discover how ancient Stoic wisdom can transform your modern life, helping you build resilience, discipline, and emotional control for a more meaningful existence.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4">
              <Link 
                to="/foundations" 
                className="inline-flex items-center justify-center bg-black text-white border border-white px-6 md:px-8 py-3 text-sm font-medium transition-colors hover:bg-primary/90"
              >
                Start Your Stoic Journey <ArrowRight size={16} className="ml-2" />
              </Link>
              <Link 
                to="/auth"
                className="inline-flex items-center justify-center bg-white border border-black px-4 md:px-6 py-3 text-sm font-medium text-black hover:bg-primary/10"
              >
                <BookOpen size={16} className="mr-2" /> Join The Community
              </Link>
            </div>
          </div>
          
          {/* Right side - Image for desktop */}
          {!isMobile && (
            <div className="w-full md:w-1/2 order-1 md:order-2 p-4">
              <div className="rounded-xl overflow-hidden shadow-lg border border-border">
                <AspectRatio ratio={16/12} className="bg-muted">
                  <img 
                    src="/public/lovable-uploads/f0a57e6b-48a5-4cee-9a25-b3d7514481a0.png" 
                    alt="Statue of Marcus Aurelius, Roman Emperor and Stoic philosopher, mounted on horseback" 
                    className="w-full h-full object-cover object-center grayscale"
                  />
                </AspectRatio>
              </div>
              <p className="text-xs text-muted-foreground mt-2 text-center italic">
                Equestrian statue of Marcus Aurelius - Stoic philosopher and Roman Emperor
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Hero;
