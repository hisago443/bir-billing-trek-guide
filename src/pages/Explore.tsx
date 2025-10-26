import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import { supabase } from '@/integrations/supabase/client';
import { MapPin, Calendar, ArrowRight } from 'lucide-react';

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

const Explore = () => {
  const [destinations, setDestinations] = useState<Destination[]>([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchDestinations = async () => {
      setLoading(true);
      const { data, error } = await supabase
        .from('destinations')
        .select('*')
        .order('name', { ascending: true });
      
      if (!error && data) {
        setDestinations(data);
      }
      setLoading(false);
    };
    fetchDestinations();
  }, []);

  return (
    <div className="min-h-screen flex flex-col">
      <Navigation />
      
      {/* Hero Section */}
      <section className="relative h-[60vh] w-full overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img 
            src="https://images.unsplash.com/photo-1506905925346-21bda4d32df4?q=80&w=2070&auto=format&fit=crop" 
            alt="Explore Bir Billing Region" 
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black/60"></div>
        </div>
        
        <div className="container relative z-10 h-full flex flex-col justify-center items-center text-white text-center">
          <h1 className="text-5xl md:text-6xl font-bold mb-4 animate-fade-in">
            Explore the <span className="text-sky-300">Himalayas</span>
          </h1>
          <p className="text-xl md:text-2xl max-w-3xl mb-8 animate-fade-in" style={{animationDelay: '0.2s'}}>
            Discover hidden gems, ancient villages, and breathtaking landscapes across Bir, Billing, Barot, and beyond
          </p>
        </div>
      </section>

      {/* Destinations Grid */}
      <main className="flex-1 container mx-auto px-4 py-16">
        {loading ? (
          <div className="text-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto"></div>
            <p className="mt-4 text-muted-foreground">Loading destinations...</p>
          </div>
        ) : (
          <>
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4">Popular Destinations</h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                Each destination offers unique experiences, from adventure activities to cultural immersion and spiritual retreats
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {destinations.map((destination) => (
                <Card
                  key={destination.id}
                  className="group cursor-pointer overflow-hidden hover:shadow-2xl transition-all duration-300"
                  onClick={() => navigate(`/destinations/${destination.slug}`)}
                >
                  <div className="relative h-64 overflow-hidden">
                    <img
                      src={destination.hero_image}
                      alt={destination.name}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>
                    <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                      <h3 className="text-2xl font-bold mb-2">{destination.name}</h3>
                      <p className="text-sm text-gray-200">{destination.tagline}</p>
                    </div>
                  </div>
                  
                  <CardContent className="p-6">
                    <p className="text-muted-foreground mb-4 line-clamp-3">
                      {destination.description}
                    </p>
                    
                    <div className="flex items-center gap-2 text-sm text-muted-foreground mb-4">
                      <Calendar className="h-4 w-4" />
                      <span className="line-clamp-1">{destination.best_time_to_visit}</span>
                    </div>

                    <div className="flex flex-wrap gap-2 mb-4">
                      {destination.activities?.slice(0, 3).map((activity, idx) => (
                        <Badge key={idx} variant="secondary" className="text-xs">
                          {activity}
                        </Badge>
                      ))}
                      {destination.activities?.length > 3 && (
                        <Badge variant="outline" className="text-xs">
                          +{destination.activities.length - 3} more
                        </Badge>
                      )}
                    </div>

                    <Button 
                      className="w-full group-hover:bg-primary group-hover:text-white transition-colors"
                      variant="outline"
                    >
                      Explore {destination.name}
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </>
        )}
      </main>

      <Footer />
    </div>
  );
};

export default Explore;
