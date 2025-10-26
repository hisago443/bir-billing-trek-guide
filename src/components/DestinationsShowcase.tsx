import { useEffect, useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { MapPin, Calendar, Sparkles } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface Destination {
  id: string;
  name: string;
  slug: string;
  tagline: string;
  description: string;
  hero_image: string;
  best_time_to_visit: string;
  activities: string[];
}

const DestinationsShowcase = () => {
  const [destinations, setDestinations] = useState<Destination[]>([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchDestinations = async () => {
      const { data, error } = await supabase
        .from('destinations')
        .select('*')
        .order('name');
      
      if (!error && data) {
        setDestinations(data);
      }
      setLoading(false);
    };
    
    fetchDestinations();
  }, []);

  if (loading) {
    return <div className="py-20 text-center">Loading destinations...</div>;
  }

  return (
    <section className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold mb-4 text-foreground">Top Destinations</h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Explore the hidden gems of Bir Billing and surrounding areas
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {destinations.map((dest) => (
            <Card 
              key={dest.id}
              className="group overflow-hidden cursor-pointer hover:shadow-2xl transition-all duration-500 border-0"
              onClick={() => navigate(`/destinations/${dest.slug}`)}
            >
              <div className="relative h-80 overflow-hidden">
                <img 
                  src={dest.hero_image} 
                  alt={dest.name}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                  <div className="flex items-center gap-2 mb-2">
                    <Sparkles className="h-5 w-5 text-accent" />
                    <span className="text-sm font-medium text-accent">{dest.tagline}</span>
                  </div>
                  <h3 className="text-3xl font-bold mb-2">{dest.name}</h3>
                  <p className="text-white/90 mb-4">{dest.description}</p>
                  
                  <div className="flex flex-wrap gap-4 text-sm">
                    <div className="flex items-center gap-1">
                      <Calendar className="h-4 w-4" />
                      <span>{dest.best_time_to_visit}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <MapPin className="h-4 w-4" />
                      <span>{dest.activities?.length || 0} Activities</span>
                    </div>
                  </div>
                </div>
              </div>
              
              <CardContent className="p-6">
                <div className="flex flex-wrap gap-2 mb-4">
                  {dest.activities?.slice(0, 4).map((activity, idx) => (
                    <span key={idx} className="text-xs px-3 py-1 bg-primary/10 text-primary rounded-full">
                      {activity}
                    </span>
                  ))}
                </div>
                <Button className="w-full" variant="outline">
                  Explore {dest.name}
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default DestinationsShowcase;