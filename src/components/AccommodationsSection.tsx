import { Star, ArrowRight, MapPin, Wifi, Home, Bed, Phone } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { useNavigate } from 'react-router-dom';
import { accommodations } from '@/data/siteData';

const AccommodationsSection = () => {
  const navigate = useNavigate();
  const featuredAccommodations = accommodations.slice(0, 6);

  const getTypeIcon = (type: string) => {
    switch(type.toLowerCase()) {
      case 'resort': return '🏨';
      case 'hostel': return '🛏️';
      case 'homestay': return '🏠';
      case 'camping': return '⛺';
      default: return '🏡';
    }
  };

  return (
    <section className="py-24 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary mb-4">
            <Bed className="h-4 w-4" />
            <span className="text-sm font-semibold">Stay With Us</span>
          </div>
          <h2 className="section-title">Places to Stay</h2>
          <p className="section-subtitle">
            From cozy homestays to luxury resorts, find your perfect mountain retreat in Bir Billing
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {featuredAccommodations.map((accommodation, index) => (
            <Card 
              key={accommodation.id} 
              className={`group overflow-hidden shadow-md hover:shadow-2xl transition-all duration-500 cursor-pointer border-0 hover:-translate-y-2 ${
                index === 0 ? 'md:col-span-2 lg:col-span-1' : ''
              }`}
              onClick={() => navigate(`/accommodations/${accommodation.id}`)}
            >
              <div className="relative h-56 overflow-hidden">
                <img 
                  src={accommodation.image} 
                  alt={accommodation.name}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
                
                <div className="absolute top-3 left-3">
                  <Badge className="bg-card/90 backdrop-blur-sm text-foreground border-0 shadow-lg">
                    <span className="mr-1">{getTypeIcon(accommodation.type)}</span>
                    {accommodation.type}
                  </Badge>
                </div>
                
                <div className="absolute top-3 right-3 flex items-center bg-black/60 backdrop-blur-sm px-2.5 py-1.5 rounded-full">
                  <Star className="h-3.5 w-3.5 fill-yellow-400 text-yellow-400 mr-1" />
                  <span className="text-white text-sm font-bold">{accommodation.rating}</span>
                </div>

                <div className="absolute bottom-3 left-3 right-3">
                  <div className="flex items-center text-white/90 text-sm">
                    <MapPin className="h-3.5 w-3.5 mr-1.5" />
                    <span className="truncate">{accommodation.location}</span>
                  </div>
                </div>
              </div>
              
              <CardContent className="p-5">
                <div className="flex justify-between items-start mb-3">
                  <h3 className="font-bold text-lg group-hover:text-primary transition-colors">{accommodation.name}</h3>
                </div>
                
                <p className="text-muted-foreground text-sm mb-4 line-clamp-2">{accommodation.description}</p>
                
                <div className="flex flex-wrap gap-2 mb-4">
                  {accommodation.amenities.slice(0, 4).map((amenity, idx) => (
                    <span key={idx} className="text-xs px-2.5 py-1 bg-muted rounded-full text-muted-foreground">
                      {amenity === 'WiFi' && <Wifi className="h-3 w-3 inline mr-1" />}
                      {amenity}
                    </span>
                  ))}
                  {accommodation.amenities.length > 4 && 
                    <span className="text-xs px-2.5 py-1 bg-muted rounded-full text-muted-foreground">+{accommodation.amenities.length - 4}</span>
                  }
                </div>
                
                <div className="flex justify-between items-center pt-3 border-t border-border">
                  <div>
                    <span className="text-lg font-bold text-primary">{accommodation.price}</span>
                    <span className="text-xs text-muted-foreground ml-1">/night</span>
                  </div>
                  <Button size="sm" className="premium-button">
                    Book Now
                    <ArrowRight className="ml-1 h-3.5 w-3.5" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
        
        <div className="mt-14 text-center">
          <Button 
            size="lg"
            className="premium-button px-8 py-6 text-base"
            onClick={() => navigate('/accommodations')}
          >
            Browse All Accommodations
            <ArrowRight className="ml-2 h-5 w-5" />
          </Button>
        </div>
      </div>
    </section>
  );
};

export default AccommodationsSection;
