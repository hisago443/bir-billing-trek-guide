
import React from 'react';
import { Star, ArrowRight, MapPin, Coffee, Wifi } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';

const AccommodationsSection = () => {
  const accommodations = [
    {
      id: 1,
      name: 'Zostel Bir',
      type: 'Hostel',
      rating: 4.7,
      price: '₹800',
      image: 'https://images.unsplash.com/photo-1496417263034-38ec4f0b665a?q=80&w=1471&auto=format&fit=crop',
      location: 'Upper Bir',
      amenities: ['WiFi', 'Cafe', 'Garden', 'Mountain View'],
      tags: ['budget', 'social']
    },
    {
      id: 2,
      name: 'Himalayan Nest',
      type: 'Homestay',
      rating: 4.9,
      price: '₹2,200',
      image: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?q=80&w=1470&auto=format&fit=crop',
      location: 'Chaugan',
      amenities: ['Homemade Food', 'WiFi', 'Terrace', 'Valley View'],
      tags: ['family', 'authentic']
    },
    {
      id: 3,
      name: "Colonel's Resort",
      type: 'Resort',
      rating: 4.5,
      price: '₹4,500',
      image: 'https://images.unsplash.com/photo-1455587734955-081b22074882?q=80&w=1470&auto=format&fit=crop',
      location: 'Near Landing Site',
      amenities: ['Restaurant', 'Bar', 'WiFi', 'Parking'],
      tags: ['luxury', 'family']
    },
    {
      id: 4,
      name: "The Monk's Retreat",
      type: 'Eco Lodge',
      rating: 4.6,
      price: '₹1,800',
      image: 'https://images.unsplash.com/photo-1542718610-a1d656d1884c?q=80&w=1470&auto=format&fit=crop',
      location: 'Bir Road',
      amenities: ['Organic Food', 'Meditation Space', 'Garden'],
      tags: ['eco-friendly', 'peaceful']
    }
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
    <section className="py-16 container mx-auto px-4 bg-background">
      <h2 className="text-3xl font-bold mb-4 text-center">Places to Stay</h2>
      <p className="text-muted-foreground max-w-2xl mb-10 mx-auto text-center">
        Discover comfortable and scenic accommodations in Bir Billing, from budget hostels to luxury resorts.
      </p>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {accommodations.map((accommodation) => (
          <Card key={accommodation.id} className="overflow-hidden shadow-md hover:shadow-lg transition-shadow duration-300">
            <div className="relative">
              <img 
                src={accommodation.image} 
                alt={accommodation.name}
                className="w-full h-48 object-cover"
              />
              <div className="absolute top-2 right-2">
                <Badge variant="secondary" className="bg-card/80 backdrop-blur-sm">
                  {accommodation.type}
                </Badge>
              </div>
            </div>
            
            <CardContent className="p-4">
              <div className="flex justify-between items-start mb-2">
                <h3 className="font-bold text-lg">{accommodation.name}</h3>
                <div className="flex items-center">
                  <span className="text-sm font-medium mr-1">{accommodation.rating}</span>
                  <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                </div>
              </div>
              
              <div className="flex items-center text-sm text-muted-foreground mb-3">
                <MapPin className="h-3 w-3 mr-1" />
                <span>{accommodation.location}</span>
              </div>
              
              <div className="flex flex-wrap gap-2 mb-3">
                {accommodation.amenities.slice(0, 3).map((amenity, index) => (
                  <Badge key={index} variant="outline" className="text-xs">
                    {amenity === 'WiFi' && <Wifi className="h-3 w-3 mr-1" />}
                    {amenity === 'Cafe' && <Coffee className="h-3 w-3 mr-1" />}
                    {amenity}
                  </Badge>
                ))}
                {accommodation.amenities.length > 3 && 
                  <Badge variant="outline" className="text-xs">+{accommodation.amenities.length - 3}</Badge>
                }
              </div>
              
              <div className="flex justify-between items-center mt-4">
                <div>
                  <span className="font-bold text-lg">{accommodation.price}</span>
                  <span className="text-xs text-muted-foreground">/night</span>
                </div>
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
          Browse All Accommodations
          <ArrowRight className="ml-2 h-4 w-4" />
        </Button>
      </div>
    </section>
  );
};

export default AccommodationsSection;
