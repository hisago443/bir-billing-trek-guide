
import React from 'react';
import { ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';

const CategorySection = () => {
  const categories = [
    {
      id: 1,
      title: 'Paragliding',
      description: 'Experience world-class paragliding at Asia\'s best take-off site.',
      image: 'https://images.unsplash.com/photo-1544551763-92ab472cad5d?q=80&w=2070&auto=format&fit=crop'
    },
    {
      id: 2,
      title: 'Trekking',
      description: 'Explore stunning Himalayan trails for all skill levels.',
      image: 'https://images.unsplash.com/photo-1551632811-561732d1e306?q=80&w=2070&auto=format&fit=crop'
    },
    {
      id: 3,
      title: 'Meditation',
      description: 'Visit monasteries and meditation centers for spiritual experiences.',
      image: 'https://images.unsplash.com/photo-1604937455095-ef2fe3d46fcd?q=80&w=1470&auto=format&fit=crop'
    },
    {
      id: 4,
      title: 'Local Culture',
      description: 'Immerse yourself in the rich Tibetan and Himachali heritage.',
      image: 'https://images.unsplash.com/photo-1512291619882-669a3f9b1ff1?q=80&w=1523&auto=format&fit=crop'
    }
  ];

  return (
    <section className="py-16 container mx-auto px-4">
      <h2 className="section-title">Explore Activities</h2>
      <p className="text-muted-foreground max-w-2xl mb-10">
        From adrenaline-pumping adventures to serene cultural experiences, Bir Billing offers activities for every type of traveler.
      </p>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {categories.map((category) => (
          <div key={category.id} className="category-card">
            <img 
              src={category.image} 
              alt={category.title} 
              className="w-full h-80 object-cover"
            />
            <div className="category-overlay"></div>
            <div className="absolute bottom-0 left-0 p-6 text-white">
              <h3 className="text-xl font-bold mb-2">{category.title}</h3>
              <p className="text-sm text-gray-200 mb-4">{category.description}</p>
              <Button size="sm" variant="outline" className="bg-white/10 backdrop-blur-sm hover:bg-white/20 border-white/40 text-white">
                Learn More
              </Button>
            </div>
          </div>
        ))}
      </div>
      
      <div className="mt-10 text-center">
        <Button className="bg-primary hover:bg-primary/90">
          View All Activities
          <ArrowRight className="ml-2 h-4 w-4" />
        </Button>
      </div>
    </section>
  );
};

export default CategorySection;
