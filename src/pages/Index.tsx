
import { useState } from 'react';
import HeroSection from '@/components/HeroSection';
import DestinationsShowcase from '@/components/DestinationsShowcase';
import AccommodationsSection from '@/components/AccommodationsSection';
import CafesSection from '@/components/CafesSection';
import RentalsSection from '@/components/RentalsSection';
import TaxiServices from '@/components/TaxiServices';
import ArticlesSection from '@/components/ArticlesSection';
import TestimonialsSection from '@/components/TestimonialsSection';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import CompactAIPlanner from '@/components/CompactAIPlanner';
import { Button } from '@/components/ui/button';
import { Sparkles } from 'lucide-react';

const Index = () => {
  const [showPlanner, setShowPlanner] = useState(false);

  return (
    <div className="min-h-screen">
      <Navigation />
      <main>
        <HeroSection />
        <ArticlesSection />
        <DestinationsShowcase />
        <AccommodationsSection />
        <CafesSection />
        <RentalsSection />
        <TaxiServices />
        <TestimonialsSection />
      </main>
      <Footer />
      
      {/* Floating AI Planner Button */}
      {!showPlanner && (
        <Button
          onClick={() => setShowPlanner(true)}
          className="fixed bottom-6 right-6 rounded-full h-14 px-6 shadow-2xl z-50 hover:scale-105 transition-transform"
        >
          <Sparkles className="mr-2 h-5 w-5" />
          Plan My Trip
        </Button>
      )}
      
      {/* Compact AI Planner Sidebar */}
      {showPlanner && (
        <div className="fixed bottom-6 right-6 w-80 z-50 animate-in slide-in-from-right duration-300">
          <CompactAIPlanner onClose={() => setShowPlanner(false)} />
        </div>
      )}
    </div>
  );
};

export default Index;
