import { ArrowRight, MapPin, Clock, Coffee, Star, Utensils, Phone } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { useNavigate } from 'react-router-dom';
import { cafes } from '@/data/siteData';

const CafesSection = () => {
  const navigate = useNavigate();
  const featuredCafes = cafes.slice(0, 6);

  return (
    <section className="py-24 bg-gradient-to-b from-muted/30 to-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-secondary/10 text-secondary mb-4">
            <Utensils className="h-4 w-4" />
            <span className="text-sm font-semibold">Taste the Himalayas</span>
          </div>
          <h2 className="section-title">Cafes & Restaurants</h2>
          <p className="section-subtitle">
            From artisan coffee to authentic Tibetan momos, discover the vibrant food scene of Bir Billing
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {featuredCafes.map((cafe, index) => (
            <Card 
              key={cafe.id} 
              className="group overflow-hidden shadow-md hover:shadow-2xl transition-all duration-500 cursor-pointer border-0 hover:-translate-y-2 bg-card"
              onClick={() => navigate(`/cafes/${cafe.id}`)}
            >
              <div className="relative h-52 overflow-hidden">
                <img 
                  src={cafe.image} 
                  alt={cafe.name}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent"></div>
                
                <div className="absolute top-3 left-3">
                  <Badge className="bg-secondary text-secondary-foreground border-0 font-bold">
                    {cafe.price}
                  </Badge>
                </div>
                
                <div className="absolute top-3 right-3 flex items-center bg-white/90 backdrop-blur-sm px-2.5 py-1.5 rounded-full">
                  <Star className="h-3.5 w-3.5 fill-yellow-500 text-yellow-500 mr-1" />
                  <span className="text-foreground text-sm font-bold">{cafe.rating}</span>
                </div>

                <div className="absolute bottom-3 left-3 right-3">
                  <h3 className="font-bold text-xl text-white mb-1">{cafe.name}</h3>
                  <div className="flex items-center text-white/80 text-sm">
                    <MapPin className="h-3.5 w-3.5 mr-1.5" />
                    <span className="truncate">{cafe.location}</span>
                  </div>
                </div>
              </div>
              
              <CardContent className="p-5">
                <div className="flex items-center gap-2 text-sm text-muted-foreground mb-3">
                  <Clock className="h-4 w-4 text-primary" />
                  <span>{cafe.hours}</span>
                </div>
                
                <div className="flex flex-wrap gap-2 mb-4">
                  {cafe.cuisine.map((type, idx) => (
                    <span key={idx} className="text-xs px-2.5 py-1 bg-primary/10 text-primary rounded-full font-medium">
                      {type}
                    </span>
                  ))}
                </div>
                
                <p className="text-sm text-muted-foreground line-clamp-2 mb-4">
                  {cafe.description}
                </p>

                {cafe.specialties && (
                  <div className="mb-4">
                    <span className="text-xs font-semibold text-foreground">Must Try: </span>
                    <span className="text-xs text-muted-foreground">{cafe.specialties.join(', ')}</span>
                  </div>
                )}
                
                <Button size="sm" className="w-full premium-button">
                  View Menu & Book
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
        
        <div className="mt-14 text-center">
          <Button 
            size="lg"
            variant="outline"
            className="px-8 py-6 text-base"
            onClick={() => navigate('/cafes')}
          >
            Browse All Cafes & Restaurants
            <ArrowRight className="ml-2 h-5 w-5" />
          </Button>
        </div>
      </div>
    </section>
  );
};

export default CafesSection;
