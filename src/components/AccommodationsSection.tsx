
import React, { useEffect, useState } from 'react';
import { Star, ArrowRight, MapPin, Coffee, Wifi } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { supabase } from '@/integrations/supabase/client';
import { useNavigate } from 'react-router-dom';
import { Database } from '@/integrations/supabase/types';

type Accommodation = Database['public']['Tables']['accommodations']['Row'];

const AccommodationsSection = () => {
  const [accommodations, setAccommodations] = useState<Accommodation[]>([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchAccommodations = async () => {
      const { data, error } = await supabase
        .from('accommodations')
        .select('*')
        .order('created_at', { ascending: false })
        .limit(4);
      
      if (!error && data) {
        setAccommodations(data);
      }
      setLoading(false);
    };
    
    fetchAccommodations();
  }, []);

  const formatLocation = (location: any): string => {
    if (!location) return 'Location';
    if (typeof location === 'string') return location;
    return 'Location';
  };

  const renderStars = (rating: number) => {
    return Array(5).fill(0).map((_, index) => (
      <Star 
        key={index} 
        className={`h-4 w-4 ${index < Math.floor(rating) ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'}`} 
      />
    ));
  };

  if (loading) return null;
  if (accommodations.length === 0) return null;

  return (
    <section className="py-16 container mx-auto px-4 bg-background">
      <h2 className="text-3xl font-bold mb-4 text-center">Places to Stay</h2>
      <p className="text-muted-foreground max-w-2xl mb-10 mx-auto text-center">
        Discover comfortable and scenic accommodations in Bir Billing, from budget hostels to luxury resorts.
      </p>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {accommodations.map((accommodation) => (
          <Card 
            key={accommodation.id} 
            className="overflow-hidden shadow-md hover:shadow-lg transition-shadow duration-300 cursor-pointer"
            onClick={() => navigate(`/accommodations/${accommodation.id}`)}
          >
            {accommodation.photos && accommodation.photos.length > 0 && (
              <div className="relative">
                <img 
                  src={accommodation.photos[0]} 
                  alt={accommodation.name}
                  className="w-full h-48 object-cover"
                />
                <div className="absolute top-2 right-2">
                  <Badge variant="secondary" className="bg-card/80 backdrop-blur-sm">
                    {accommodation.type || 'Accommodation'}
                  </Badge>
                </div>
              </div>
            )}
            
            <CardContent className="p-4">
              <div className="flex justify-between items-start mb-2">
                <h3 className="font-bold text-lg">{accommodation.name}</h3>
                {accommodation.rating && (
                  <div className="flex items-center">
                    <span className="text-sm font-medium mr-1">{accommodation.rating}</span>
                    <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                  </div>
                )}
              </div>
              
              <div className="flex items-center text-sm text-muted-foreground mb-3">
                <MapPin className="h-3 w-3 mr-1" />
                <span>{formatLocation(accommodation.location)}</span>
              </div>
              
              {accommodation.amenities && accommodation.amenities.length > 0 && (
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
              )}
              
              <div className="flex justify-between items-center mt-4">
                {accommodation.price_range && (
                  <div>
                    <span className="font-bold text-lg">{accommodation.price_range}</span>
                  </div>
                )}
                <Button size="sm" className="bg-primary hover:bg-primary/90">
                  View Details
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
      
      <div className="mt-10 text-center">
        <Button 
          className="bg-primary hover:bg-primary/90"
          onClick={() => navigate('/accommodations')}
        >
          Browse All Accommodations
          <ArrowRight className="ml-2 h-4 w-4" />
        </Button>
      </div>
    </section>
  );
};

export default AccommodationsSection;
