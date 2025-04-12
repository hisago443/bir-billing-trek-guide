
import React from 'react';
import { Star, Quote } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';

const TestimonialsSection = () => {
  const testimonials = [
    {
      id: 1,
      name: 'Sarah Johnson',
      location: 'United Kingdom',
      quote: 'Paragliding in Bir Billing was the highlight of my India trip. This guide helped me find the perfect tandem pilot and accommodation.',
      rating: 5,
      image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=1587&auto=format&fit=crop'
    },
    {
      id: 2,
      name: 'Michael Chen',
      location: 'Singapore',
      quote: 'The AI recommendations were spot on! I followed the 2-day adventure itinerary and had the best weekend getaway.',
      rating: 5,
      image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=1587&auto=format&fit=crop'
    },
    {
      id: 3,
      name: 'Priya Patel',
      location: 'Mumbai, India',
      quote: 'The monastery tour and meditation sessions were so peaceful. I never would have found these hidden gems without this guide.',
      rating: 4,
      image: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?q=80&w=1522&auto=format&fit=crop'
    },
  ];

  const renderStars = (rating: number) => {
    return Array(5).fill(0).map((_, index) => (
      <Star 
        key={index} 
        className={`h-4 w-4 ${index < Math.floor(rating) ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'}`} 
      />
    ));
  };

  return (
    <section className="py-16 container mx-auto px-4">
      <div className="text-center mb-12">
        <h2 className="text-3xl font-bold mb-4">What Travelers Say</h2>
        <p className="text-muted-foreground max-w-2xl mx-auto">
          Real experiences from travelers who explored Bir Billing with our guide.
        </p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {testimonials.map((testimonial) => (
          <Card key={testimonial.id} className="bg-card shadow-md hover:shadow-lg transition-shadow">
            <CardContent className="p-6">
              <div className="flex justify-between items-start mb-4">
                <Quote className="h-8 w-8 text-primary/20" />
                <div className="flex">{renderStars(testimonial.rating)}</div>
              </div>
              
              <p className="text-foreground mb-6 italic">"{testimonial.quote}"</p>
              
              <div className="flex items-center">
                <img 
                  src={testimonial.image} 
                  alt={testimonial.name}
                  className="w-12 h-12 rounded-full object-cover mr-4"
                />
                <div>
                  <h4 className="font-medium">{testimonial.name}</h4>
                  <p className="text-sm text-muted-foreground">{testimonial.location}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  );
};

export default TestimonialsSection;
