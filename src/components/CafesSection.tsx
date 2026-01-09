import { ArrowRight, MapPin, Clock, Coffee, Star } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { useNavigate } from 'react-router-dom';
import { cafes } from '@/data/siteData';

const CafesSection = () => {
  const navigate = useNavigate();
  const featuredCafes = cafes.slice(0, 4);

  return (
    <section className="py-16 container mx-auto px-4 bg-muted/30">
      <h2 className="text-3xl font-bold mb-4 text-center">Cafes & Restaurants</h2>
      <p className="text-muted-foreground max-w-2xl mb-10 mx-auto text-center">
        Discover delightful dining experiences in Bir Billing, from cozy cafes with mountain views to authentic local cuisine.
      </p>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {featuredCafes.map((cafe) => (
          <Card 
            key={cafe.id} 
            className="overflow-hidden shadow-md hover:shadow-lg transition-shadow duration-300 cursor-pointer"
            onClick={() => navigate(`/cafes/${cafe.id}`)}
          >
            <div className="relative">
              <img 
                src={cafe.image} 
                alt={cafe.name}
                className="w-full h-48 object-cover"
              />
              <div className="absolute top-2 right-2">
                <Badge variant="secondary" className="bg-card/80 backdrop-blur-sm">
                  {cafe.price}
                </Badge>
              </div>
              <div className="absolute bottom-2 right-2 flex items-center bg-black/60 px-2 py-1 rounded">
                <Star className="h-3 w-3 fill-yellow-400 text-yellow-400 mr-1" />
                <span className="text-white text-xs font-medium">{cafe.rating}</span>
              </div>
            </div>
            
            <CardContent className="p-4">
              <h3 className="font-bold text-lg mb-2">{cafe.name}</h3>
              
              <div className="flex items-center text-sm text-muted-foreground mb-2">
                <MapPin className="h-3 w-3 mr-1" />
                <span className="truncate">{cafe.location}</span>
              </div>
              
              <div className="flex items-center text-sm text-muted-foreground mb-3">
                <Clock className="h-3 w-3 mr-1" />
                <span>{cafe.hours}</span>
              </div>
              
              <div className="flex flex-wrap gap-2 mb-3">
                {cafe.cuisine.slice(0, 2).map((type, index) => (
                  <Badge key={index} variant="outline" className="text-xs">
                    <Coffee className="h-3 w-3 mr-1" />
                    {type}
                  </Badge>
                ))}
              </div>
              
              <p className="text-sm text-muted-foreground line-clamp-2 mb-3">
                {cafe.description}
              </p>
              
              <Button size="sm" className="w-full bg-primary hover:bg-primary/90">
                View Details
              </Button>
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
