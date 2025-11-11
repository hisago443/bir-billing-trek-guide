
import React, { useEffect, useState } from 'react';
import { Star, ArrowRight, MapPin, Clock, Utensils, Coffee } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { supabase } from '@/integrations/supabase/client';
import { useNavigate } from 'react-router-dom';
import { Database } from '@/integrations/supabase/types';

type Cafe = Database['public']['Tables']['cafes']['Row'];

const CafesSection = () => {
  const [cafes, setCafes] = useState<Cafe[]>([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCafes = async () => {
      const { data, error } = await supabase
        .from('cafes')
        .select('*')
        .order('created_at', { ascending: false })
        .limit(8);
      
      if (!error && data) {
        setCafes(data);
      }
      setLoading(false);
    };
    
    fetchCafes();
  }, []);

  if (loading) return null;
  if (cafes.length === 0) return null;

  return (
    <section className="py-16 container mx-auto px-4 bg-muted/30">
      <h2 className="text-3xl font-bold mb-4 text-center">Cafes & Restaurants</h2>
      <p className="text-muted-foreground max-w-2xl mb-10 mx-auto text-center">
        Discover delightful dining experiences in Bir Billing, from cozy cafes with mountain views to authentic local cuisine.
      </p>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {cafes.map((cafe) => (
          <Card 
            key={cafe.id} 
            className="overflow-hidden shadow-md hover:shadow-lg transition-shadow duration-300 cursor-pointer"
            onClick={() => navigate(`/cafes/${cafe.id}`)}
          >
            {cafe.photos && cafe.photos.length > 0 && (
              <div className="relative">
                <img 
                  src={cafe.photos[0]} 
                  alt={cafe.name}
                  className="w-full h-48 object-cover"
                />
                {cafe.price && (
                  <div className="absolute top-2 right-2">
                    <Badge variant="secondary" className="bg-card/80 backdrop-blur-sm">
                      {cafe.price}
                    </Badge>
                  </div>
                )}
              </div>
            )}
            
            <CardContent className="p-4">
              <div className="flex justify-between items-start mb-2">
                <h3 className="font-bold text-lg">{cafe.name}</h3>
              </div>
              
              {cafe.location && (
                <div className="flex items-center text-sm text-muted-foreground mb-2">
                  <MapPin className="h-3 w-3 mr-1" />
                  <span>{cafe.location}</span>
                </div>
              )}
              
              {cafe.hours && (
                <div className="flex items-center text-sm text-muted-foreground mb-3">
                  <Clock className="h-3 w-3 mr-1" />
                  <span>{cafe.hours}</span>
                </div>
              )}
              
              {cafe.cuisine && cafe.cuisine.length > 0 && (
                <div className="flex flex-wrap gap-2 mb-3">
                  {cafe.cuisine.slice(0, 2).map((type, index) => (
                    <Badge key={index} variant="outline" className="text-xs">
                      <Coffee className="h-3 w-3 mr-1" />
                      {type}
                    </Badge>
                  ))}
                </div>
              )}
              
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
        <Button 
          className="bg-primary hover:bg-primary/90"
          onClick={() => navigate('/cafes')}
        >
          Browse All Cafes & Restaurants
          <ArrowRight className="ml-2 h-4 w-4" />
        </Button>
      </div>
    </section>
  );
};

export default CafesSection;
