
import React from 'react';
import { Star, ArrowRight, MapPin, Clock, Utensils, Coffee } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';

const CafesSection = () => {
  const cafes = [
    {
      id: 1,
      name: 'Silver Lining Cafe',
      rating: 4.8,
      price: '₹₹',
      image: 'https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?q=80&w=1478&auto=format&fit=crop',
      location: 'Chaugan, Bir',
      cuisine: ['Cafe', 'Continental', 'Healthy'],
      hours: '8:00 AM - 9:00 PM',
      specialties: ['Mountain View', 'Breakfast', 'Coffee']
    },
    {
      id: 2,
      name: 'Garden Cafe',
      rating: 4.6,
      price: '₹₹',
      image: 'https://images.unsplash.com/photo-1623800566678-2f4d3c7083fd?q=80&w=1364&auto=format&fit=crop',
      location: 'Colony Road, Bir',
      cuisine: ['Cafe', 'Multi-cuisine', 'Italian'],
      hours: '9:00 AM - 10:00 PM',
      specialties: ['Garden Seating', 'Pizza', 'Organic Food']
    },
    {
      id: 3,
      name: 'June 16 Cafe',
      rating: 4.9,
      price: '₹₹',
      image: 'https://images.unsplash.com/photo-1472851294608-062f824d29cc?q=80&w=1470&auto=format&fit=crop',
      location: 'Bir Colony',
      cuisine: ['Cafe', 'Bakery', 'Continental'],
      hours: '7:30 AM - 8:30 PM',
      specialties: ['Pastries', 'Breakfast', 'Vegan Options']
    },
    {
      id: 4,
      name: 'Nyingma Kitchen',
      rating: 4.7,
      price: '₹',
      image: 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?q=80&w=1374&auto=format&fit=crop',
      location: 'Near Deer Park Institute',
      cuisine: ['Tibetan', 'Local', 'Vegetarian'],
      hours: '8:00 AM - 8:00 PM',
      specialties: ['Momos', 'Thukpa', 'Authentic Tibetan']
    },
    {
      id: 5,
      name: 'Four Tables',
      rating: 4.5,
      price: '₹₹₹',
      image: 'https://images.unsplash.com/photo-1525610553991-2bede1a236e2?q=80&w=1470&auto=format&fit=crop',
      location: 'Chowgan, Bir',
      cuisine: ['Fusion', 'International', 'Gourmet'],
      hours: '12:00 PM - 10:00 PM',
      specialties: ['Fine Dining', 'Intimate Setting', 'Reservation Only']
    },
    {
      id: 6,
      name: 'Gliders Rooftop',
      rating: 4.7,
      price: '₹₹',
      image: 'https://images.unsplash.com/photo-1592861956120-e524fc739696?q=80&w=1470&auto=format&fit=crop',
      location: 'Landing Site, Bir',
      cuisine: ['Cafe', 'Indian', 'Continental'],
      hours: '7:00 AM - 9:00 PM',
      specialties: ['Panoramic Views', 'Paragliding Views', 'All-Day Breakfast']
    },
    {
      id: 7,
      name: 'Musafir Restaurant',
      rating: 4.6,
      price: '₹₹',
      image: 'https://images.unsplash.com/photo-1567574957330-b54fc7768329?q=80&w=1376&auto=format&fit=crop',
      location: 'Upper Bir',
      cuisine: ['Himachali', 'North Indian', 'Regional'],
      hours: '11:00 AM - 10:30 PM',
      specialties: ['Local Cuisine', 'Traditional Dishes', 'Cultural Experience']
    },
    {
      id: 8,
      name: 'Hangout Cafe',
      rating: 4.5,
      price: '₹',
      image: 'https://images.unsplash.com/photo-1554118811-1e0d58224f24?q=80&w=1470&auto=format&fit=crop',
      location: 'Bir Road',
      cuisine: ['Cafe', 'Snacks', 'Beverages'],
      hours: '10:00 AM - 8:00 PM',
      specialties: ['Budget-friendly', 'Quick Bites', 'Student Hangout']
    }
  ];

  return (
    <section className="py-16 container mx-auto px-4 bg-muted/30">
      <h2 className="text-3xl font-bold mb-4 text-center">Cafes & Restaurants</h2>
      <p className="text-muted-foreground max-w-2xl mb-10 mx-auto text-center">
        Discover delightful dining experiences in Bir Billing, from cozy cafes with mountain views to authentic local cuisine.
      </p>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {cafes.map((cafe) => (
          <Card key={cafe.id} className="overflow-hidden shadow-md hover:shadow-lg transition-shadow duration-300">
            <div className="relative">
              <img 
                src={cafe.image} 
                alt={cafe.name}
                className="w-full h-48 object-cover"
              />
              <div className="absolute top-2 right-2">
                <Badge variant="secondary" className="bg-card/80 backdrop-blur-sm">
                  {cafe.price}
                </Badge>
              </div>
            </div>
            
            <CardContent className="p-4">
              <div className="flex justify-between items-start mb-2">
                <h3 className="font-bold text-lg">{cafe.name}</h3>
                <div className="flex items-center">
                  <span className="text-sm font-medium mr-1">{cafe.rating}</span>
                  <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                </div>
              </div>
              
              <div className="flex items-center text-sm text-muted-foreground mb-2">
                <MapPin className="h-3 w-3 mr-1" />
                <span>{cafe.location}</span>
              </div>
              
              <div className="flex items-center text-sm text-muted-foreground mb-3">
                <Clock className="h-3 w-3 mr-1" />
                <span>{cafe.hours}</span>
              </div>
              
              <div className="flex flex-wrap gap-2 mb-3">
                {cafe.cuisine.map((type, index) => (
                  <Badge key={index} variant="outline" className="text-xs">
                    {type === 'Cafe' && <Coffee className="h-3 w-3 mr-1" />}
                    {(type === 'Continental' || type === 'Italian' || type === 'Indian') && 
                      <Utensils className="h-3 w-3 mr-1" />}
                    {type}
                  </Badge>
                ))}
              </div>
              
              <div className="flex flex-wrap gap-1 mb-3">
                {cafe.specialties.slice(0, 2).map((specialty, index) => (
                  <span key={index} className="text-xs text-muted-foreground">
                    {index > 0 && "• "}
                    {specialty}
                    {index < cafe.specialties.length - 1 && " "}
                  </span>
                ))}
                {cafe.specialties.length > 2 && 
                  <span className="text-xs text-muted-foreground">• ...</span>
                }
              </div>
              
              <div className="mt-4 text-right">
                <Button size="sm" className="bg-primary hover:bg-primary/90">
                  View Details
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
      
      <div className="mt-10 text-center">
        <Button className="bg-primary hover:bg-primary/90">
          Browse All Cafes & Restaurants
          <ArrowRight className="ml-2 h-4 w-4" />
        </Button>
      </div>
    </section>
  );
};

export default CafesSection;
