import React from 'react';
import { Star, Quote, MessageCircle, CheckCircle } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';

const TestimonialsSection = () => {
  const testimonials = [
    {
      id: 1,
      name: 'Sarah Johnson',
      location: 'United Kingdom',
      quote: 'Paragliding in Bir Billing was the highlight of my India trip. The booking was seamless and my pilot was incredibly professional. The views were absolutely breathtaking!',
      rating: 5,
      image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=1587&auto=format&fit=crop',
      activity: 'Paragliding',
      verified: true
    },
    {
      id: 2,
      name: 'Michael Chen',
      location: 'Singapore',
      quote: 'The trek to Rajgundha was magical. The guide knew every hidden spot and the homestay was authentic. I\'ll definitely be coming back for more adventures!',
      rating: 5,
      image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=1587&auto=format&fit=crop',
      activity: 'Trekking',
      verified: true
    },
    {
      id: 3,
      name: 'Priya Patel',
      location: 'Mumbai, India',
      quote: 'The monastery tour and meditation sessions were so peaceful. Perfect escape from city life. The cafes here have the best views and food I\'ve ever experienced.',
      rating: 5,
      image: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?q=80&w=1522&auto=format&fit=crop',
      activity: 'Wellness Retreat',
      verified: true
    },
    {
      id: 4,
      name: 'David Miller',
      location: 'Australia',
      quote: 'Stayed at a camping site near Billing and it was incredible! Waking up to those mountain views while sipping chai - pure bliss. Can\'t wait to return.',
      rating: 5,
      image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=1587&auto=format&fit=crop',
      activity: 'Camping',
      verified: true
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

  const stats = [
    { value: '50,000+', label: 'Happy Travelers' },
    { value: '4.9', label: 'Average Rating' },
    { value: '2000+', label: 'Flights Booked' },
    { value: '99%', label: 'Recommend Us' },
  ];

  return (
    <section className="py-24 bg-gradient-to-b from-background to-muted/30">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-accent/10 text-accent mb-4">
            <MessageCircle className="h-4 w-4" />
            <span className="text-sm font-semibold">Traveler Reviews</span>
          </div>
          <h2 className="section-title">What Travelers Say</h2>
          <p className="section-subtitle">
            Real experiences from adventurers who explored Bir Billing with us
          </p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16">
          {stats.map((stat, index) => (
            <div key={index} className="text-center p-6 rounded-2xl bg-muted/50">
              <div className="text-3xl md:text-4xl font-bold text-primary mb-2">{stat.value}</div>
              <div className="text-sm text-muted-foreground">{stat.label}</div>
            </div>
          ))}
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {testimonials.map((testimonial) => (
            <Card key={testimonial.id} className="bg-card shadow-lg hover:shadow-xl transition-all duration-300 border-0 hover:-translate-y-1">
              <CardContent className="p-6">
                <div className="flex justify-between items-start mb-4">
                  <Quote className="h-8 w-8 text-primary/20" />
                  <div className="flex">{renderStars(testimonial.rating)}</div>
                </div>
                
                <p className="text-foreground mb-6 text-sm leading-relaxed">"{testimonial.quote}"</p>
                
                <div className="flex items-center justify-between pt-4 border-t border-border">
                  <div className="flex items-center">
                    <img 
                      src={testimonial.image} 
                      alt={testimonial.name}
                      className="w-12 h-12 rounded-full object-cover mr-3 ring-2 ring-primary/20"
                    />
                    <div>
                      <h4 className="font-semibold text-sm flex items-center gap-1.5">
                        {testimonial.name}
                        {testimonial.verified && <CheckCircle className="h-3.5 w-3.5 text-accent" />}
                      </h4>
                      <p className="text-xs text-muted-foreground">{testimonial.location}</p>
                    </div>
                  </div>
                </div>
                
                <div className="mt-3">
                  <span className="text-xs px-2.5 py-1 bg-primary/10 text-primary rounded-full">
                    {testimonial.activity}
                  </span>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
