import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { MapPin, Calendar, Sparkles, ArrowLeft } from 'lucide-react';

interface Destination {
  id: string;
  name: string;
  tagline: string;
  description: string;
  full_article: string;
  hero_image: string;
  best_time_to_visit: string;
  how_to_reach: string;
  activities: string[];
  nearby_attractions: string[];
}

const DestinationDetail = () => {
  const { slug } = useParams<{ slug: string }>();
  const [destination, setDestination] = useState<Destination | null>(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchDestination = async () => {
      if (!slug) return;
      
      const { data, error } = await supabase
        .from('destinations')
        .select('*')
        .eq('slug', slug)
        .single();
      
      if (!error && data) {
        setDestination(data);
      }
      setLoading(false);
    };
    
    fetchDestination();
  }, [slug]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">Loading...</div>
      </div>
    );
  }

  if (!destination) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navigation />
        <div className="flex-1 flex items-center justify-center">
          <div className="text-center">
            <h2 className="text-2xl font-bold mb-4">Destination not found</h2>
            <Button onClick={() => navigate('/')}>Go Home</Button>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Navigation />
      
      {/* Hero Section */}
      <div className="relative h-[70vh] overflow-hidden">
        <img 
          src={destination.hero_image} 
          alt={destination.name}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 container mx-auto px-4 pb-12">
          <Button 
            variant="ghost" 
            className="text-white mb-4 hover:bg-white/20"
            onClick={() => navigate('/')}
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Home
          </Button>
          <div className="flex items-center gap-2 mb-3">
            <Sparkles className="h-6 w-6 text-accent" />
            <span className="text-xl font-medium text-accent">{destination.tagline}</span>
          </div>
          <h1 className="text-5xl md:text-6xl font-bold text-white mb-4">
            {destination.name}
          </h1>
          <p className="text-xl text-white/90 max-w-3xl">
            {destination.description}
          </p>
        </div>
      </div>

      {/* Content */}
      <main className="flex-1 container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            <Card>
              <CardContent className="p-8">
                <h2 className="text-2xl font-bold mb-4">About This Destination</h2>
                <div className="prose max-w-none">
                  <p className="text-muted-foreground leading-relaxed">
                    {destination.full_article || destination.description}
                  </p>
                </div>
              </CardContent>
            </Card>

            {destination.activities && destination.activities.length > 0 && (
              <Card>
                <CardContent className="p-8">
                  <h2 className="text-2xl font-bold mb-4">Activities & Experiences</h2>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                    {destination.activities.map((activity, idx) => (
                      <div 
                        key={idx}
                        className="flex items-center gap-2 p-3 bg-primary/5 rounded-lg hover:bg-primary/10 transition-colors"
                      >
                        <Sparkles className="h-4 w-4 text-primary flex-shrink-0" />
                        <span className="text-sm font-medium">{activity}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            <Card className="sticky top-6">
              <CardContent className="p-6 space-y-6">
                <div>
                  <div className="flex items-center gap-2 text-primary mb-2">
                    <Calendar className="h-5 w-5" />
                    <h3 className="font-semibold">Best Time to Visit</h3>
                  </div>
                  <p className="text-muted-foreground">{destination.best_time_to_visit}</p>
                </div>

                {destination.how_to_reach && (
                  <div>
                    <div className="flex items-center gap-2 text-primary mb-2">
                      <MapPin className="h-5 w-5" />
                      <h3 className="font-semibold">How to Reach</h3>
                    </div>
                    <p className="text-muted-foreground text-sm">{destination.how_to_reach}</p>
                  </div>
                )}

                <Button className="w-full" size="lg">
                  <MapPin className="mr-2 h-4 w-4" />
                  View on Map
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default DestinationDetail;