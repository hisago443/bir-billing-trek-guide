import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { MapPin, Calendar, Sparkles } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { destinations } from '@/data/siteData';

const DestinationsShowcase = () => {
  const navigate = useNavigate();

  return (
    <section className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold mb-4 text-foreground">Top Destinations</h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Explore the hidden gems of Bir Billing and surrounding areas
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {destinations.map((dest) => (
            <Card 
              key={dest.id}
              className="group overflow-hidden cursor-pointer hover:shadow-2xl transition-all duration-500 border-0"
              onClick={() => navigate(`/destinations/${dest.slug}`)}
            >
              <div className="relative h-72 overflow-hidden">
                <img 
                  src={dest.hero_image} 
                  alt={dest.name}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                  <div className="flex items-center gap-2 mb-2">
                    <Sparkles className="h-4 w-4 text-yellow-400" />
                    <span className="text-sm font-medium text-yellow-400">{dest.tagline}</span>
                  </div>
                  <h3 className="text-2xl font-bold mb-2">{dest.name}</h3>
                  <p className="text-white/80 text-sm mb-3 line-clamp-2">{dest.description}</p>
                  
                  <div className="flex flex-wrap gap-3 text-xs">
                    <div className="flex items-center gap-1 bg-white/20 px-2 py-1 rounded">
                      <Calendar className="h-3 w-3" />
                      <span>{dest.best_time_to_visit}</span>
                    </div>
                    <div className="flex items-center gap-1 bg-white/20 px-2 py-1 rounded">
                      <MapPin className="h-3 w-3" />
                      <span>{dest.activities?.length || 0} Activities</span>
                    </div>
                  </div>
                </div>
              </div>
              
              <CardContent className="p-4">
                <div className="flex flex-wrap gap-2">
                  {dest.activities?.slice(0, 3).map((activity, idx) => (
                    <span key={idx} className="text-xs px-3 py-1 bg-primary/10 text-primary rounded-full">
                      {activity}
                    </span>
                  ))}
                  {dest.activities && dest.activities.length > 3 && (
                    <span className="text-xs px-3 py-1 bg-muted text-muted-foreground rounded-full">
                      +{dest.activities.length - 3} more
                    </span>
                  )}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="text-center mt-12">
          <Button size="lg" onClick={() => navigate('/explore')}>
            Explore All Destinations
          </Button>
        </div>
      </div>
    </section>
  );
};

export default DestinationsShowcase;
