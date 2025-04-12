
import React from 'react';
import { ArrowRight, MapPin } from 'lucide-react';
import { Button } from '@/components/ui/button';

const HeroSection = () => {
  return (
    <div className="relative h-[90vh] w-full overflow-hidden">
      {/* Hero Image */}
      <div className="absolute inset-0 z-0">
        <img 
          src="https://images.unsplash.com/photo-1595074474374-3dae9c2e0076?q=80&w=2070&auto=format&fit=crop" 
          alt="Bir Billing Paragliding View" 
          className="w-full h-full object-cover"
        />
        <div className="hero-overlay"></div>
      </div>
      
      {/* Hero Content */}
      <div className="container relative z-10 h-full flex flex-col justify-center items-start text-white">
        <h1 className="text-4xl md:text-6xl font-bold mb-4 max-w-xl animate-fade-in">
          Experience the Magic of <span className="text-sky-300">Bir Billing</span>
        </h1>
        <p className="text-lg md:text-xl max-w-lg mb-8 animate-fade-in" style={{animationDelay: '0.2s'}}>
          Discover the paragliding capital of India with our AI-powered guide to adventure, accommodation, dining, and attractions.
        </p>
        
        <div className="flex flex-wrap gap-4 animate-fade-in" style={{animationDelay: '0.4s'}}>
          <Button size="lg" className="bg-primary hover:bg-primary/90 text-white">
            Start Exploring <ArrowRight className="ml-2 h-5 w-5" />
          </Button>
          <Button size="lg" variant="outline" className="bg-white/10 backdrop-blur-sm hover:bg-white/20 border-white/40 text-white">
            <MapPin className="mr-2 h-5 w-5" /> View Map
          </Button>
        </div>
        
        <div className="mt-16 flex items-center gap-6 animate-fade-in" style={{animationDelay: '0.6s'}}>
          <div className="px-4 py-2 bg-white/10 backdrop-blur-sm rounded-lg flex items-center">
            <span className="text-sky-300 text-4xl font-bold mr-2">2,400</span>
            <span className="text-sm">Meters Elevation</span>
          </div>
          <div className="px-4 py-2 bg-white/10 backdrop-blur-sm rounded-lg flex items-center">
            <span className="text-sky-300 text-4xl font-bold mr-2">200+</span>
            <span className="text-sm">Paragliding Days/Year</span>
          </div>
          <div className="px-4 py-2 bg-white/10 backdrop-blur-sm rounded-lg flex items-center">
            <span className="text-sky-300 text-4xl font-bold mr-2">50+</span>
            <span className="text-sm">Trekking Routes</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
