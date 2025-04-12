
import React from 'react';
import HeroSection from '@/components/HeroSection';
import CategorySection from '@/components/CategorySection';
import MapSection from '@/components/MapSection';
import AccommodationsSection from '@/components/AccommodationsSection';
import CafesSection from '@/components/CafesSection';
import RecommendationSection from '@/components/RecommendationSection';
import TestimonialsSection from '@/components/TestimonialsSection';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';

const Index = () => {
  return (
    <div className="min-h-screen">
      <Navigation />
      <main>
        <HeroSection />
        <CategorySection />
        <MapSection />
        <AccommodationsSection />
        <CafesSection />
        <RecommendationSection />
        <TestimonialsSection />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
