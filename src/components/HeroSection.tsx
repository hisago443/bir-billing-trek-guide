
import React from 'react';
import { ArrowRight, MapPin } from 'lucide-react';
import { Button } from '@/components/ui/button';

const HeroSection = () => {
  return (
    <div className="relative h-screen w-full overflow-hidden">
      {/* Hero Image */}
      <div className="absolute inset-0 z-0">
        <img 
          src="https://images.unsplash.com/photo-1595074474374-3dae9c2e0076?q=80&w=2070&auto=format&fit=crop" 
          alt="Bir Billing Paragliding View" 
          className="w-full h-full object-cover scale-105 animate-[scale_20s_ease-in-out_infinite_alternate]"
        />
        <div className="hero-overlay"></div>
      </div>
      
      {/* Hero Content */}
      <div className="container relative z-10 h-full flex flex-col justify-center items-center text-white text-center px-6">
        <h1 className="text-5xl md:text-7xl lg:text-8xl font-light tracking-tight mb-6 max-w-5xl animate-fade-in">
          Bir Billing
        </h1>
        <p className="text-xl md:text-2xl lg:text-3xl font-light max-w-3xl mb-12 tracking-wide animate-fade-in" style={{animationDelay: '0.2s'}}>
          Where Mountains Meet the Sky
        </p>
        
        <div className="flex flex-wrap gap-4 justify-center animate-fade-in" style={{animationDelay: '0.4s'}}>
          <Button 
            size="lg" 
            className="bg-white text-foreground hover:bg-white/90 font-light tracking-wide px-8 py-6 text-base"
            onClick={() => window.location.href = '/explore'}
          >
            Start Exploring
          </Button>
          <Button 
            size="lg" 
            variant="outline" 
            className="bg-transparent backdrop-blur-sm hover:bg-white/10 border-white text-white font-light tracking-wide px-8 py-6 text-base"
            onClick={() => window.location.href = '/map'}
          >
            View Map
          </Button>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 animate-bounce">
        <div className="w-6 h-10 border-2 border-white/50 rounded-full flex items-start justify-center p-2">
          <div className="w-1 h-2 bg-white/50 rounded-full animate-pulse"></div>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
