import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { MapPin, Calendar, Sparkles, ArrowRight, Compass } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { destinations } from '@/data/siteData';

const DestinationsShowcase = () => {
  const navigate = useNavigate();

  return (
    <section className="py-24 bg-gradient-to-b from-muted/30 to-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary mb-4">
            <Compass className="h-4 w-4" />
            <span className="text-sm font-semibold">Explore Destinations</span>
          </div>
          <h2 className="section-title">Discover Hidden Gems</h2>
          <p className="section-subtitle">
            From ancient monasteries to pristine valleys, explore the magic of Bir Billing and beyond
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {destinations.map((dest, index) => (
            <Card 
              key={dest.id}
              className={`group overflow-hidden cursor-pointer hover:shadow-2xl transition-all duration-500 border-0 bg-card ${
                index === 0 ? 'md:col-span-2 lg:col-span-1' : ''
              }`}
              onClick={() => navigate(`/destinations/${dest.slug}`)}
            >
              <div className="relative h-80 overflow-hidden">
                <img 
                  src={dest.hero_image} 
                  alt={dest.name}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent" />
                
                {/* Featured badge for first item */}
                {index === 0 && (
                  <div className="absolute top-4 right-4">
                    <span className="px-3 py-1.5 bg-secondary text-secondary-foreground text-xs font-bold rounded-full">
                      ⭐ Most Popular
                    </span>
                  </div>
                )}
                
                <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                  <div className="flex items-center gap-2 mb-2">
                    <Sparkles className="h-4 w-4 text-secondary" />
                    <span className="text-sm font-semibold text-secondary">{dest.tagline}</span>
                  </div>
                  <h3 className="text-2xl font-bold mb-2">{dest.name}</h3>
                  <p className="text-white/80 text-sm mb-4 line-clamp-2">{dest.description}</p>
                  
                  <div className="flex flex-wrap gap-2 text-xs mb-4">
                    <div className="flex items-center gap-1.5 bg-white/20 backdrop-blur-sm px-3 py-1.5 rounded-full">
                      <Calendar className="h-3 w-3" />
                      <span>{dest.best_time_to_visit}</span>
                    </div>
                    <div className="flex items-center gap-1.5 bg-white/20 backdrop-blur-sm px-3 py-1.5 rounded-full">
                      <MapPin className="h-3 w-3" />
                      <span>{dest.activities?.length || 0} Activities</span>
                    </div>
                  </div>

                  <div className="flex flex-wrap gap-2">
                    {dest.activities?.slice(0, 3).map((activity, idx) => (
                      <span key={idx} className="text-xs px-2.5 py-1 bg-primary/30 backdrop-blur-sm text-white rounded-full border border-white/20">
                        {activity}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Hover overlay */}
                <div className="absolute inset-0 bg-primary/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                  <div className="bg-white rounded-full p-4 transform scale-0 group-hover:scale-100 transition-transform duration-300">
                    <ArrowRight className="h-6 w-6 text-primary" />
                  </div>
                </div>
              </div>
            </Card>
          ))}
        </div>

        <div className="text-center mt-16">
          <Button 
            size="lg" 
            onClick={() => navigate('/explore')}
            className="premium-button px-8 py-6 text-base"
          >
            Explore All Destinations
            <ArrowRight className="ml-2 h-5 w-5" />
          </Button>
        </div>
      </div>
    </section>
  );
};

export default DestinationsShowcase;
