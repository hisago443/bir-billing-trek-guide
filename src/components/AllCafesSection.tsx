import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Star, Clock, Phone, MapPin, ChevronRight, Coffee, UtensilsCrossed } from 'lucide-react';
import { cafes } from '@/data/siteData';
import { Link } from 'react-router-dom';

const AllCafesSection = () => {
  return (
    <section className="py-16 bg-muted/30">
      <div className="container px-4">
        {/* Section Header */}
        <div className="text-center mb-12">
          <Badge variant="outline" className="mb-4 px-4 py-1">
            <Coffee className="w-3 h-3 mr-1" /> Cafe Culture
          </Badge>
          <h2 className="text-4xl font-bold mb-4">
            Cafes & <span className="text-primary">Restaurants</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            From wood-fired pizzas to authentic Tibetan momos, Bir's cafe scene is legendary. 
            Explore all the amazing places to eat and drink.
          </p>
        </div>

        {/* Cafes Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {cafes.map((cafe) => (
            <Card key={cafe.id} className="overflow-hidden hover:shadow-lg transition-all duration-300 group">
              <div className="relative h-40 overflow-hidden">
                <img 
                  src={cafe.image} 
                  alt={cafe.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                <div className="absolute top-2 right-2">
                  <Badge className="bg-white/90 text-foreground text-xs">
                    <Star className="w-3 h-3 mr-0.5 fill-yellow-400 text-yellow-400" />
                    {cafe.rating}
                  </Badge>
                </div>
                <div className="absolute top-2 left-2">
                  <Badge variant="secondary" className="text-xs">{cafe.price}</Badge>
                </div>
                <div className="absolute bottom-2 left-2 right-2">
                  <h3 className="text-white font-bold text-lg">{cafe.name}</h3>
                </div>
              </div>
              <CardContent className="p-3">
                <div className="flex items-center gap-1 text-xs text-muted-foreground mb-2">
                  <Clock className="w-3 h-3" />
                  <span>{cafe.hours}</span>
                </div>
                <div className="flex items-center gap-1 text-xs text-muted-foreground mb-2">
                  <MapPin className="w-3 h-3" />
                  <span className="truncate">{cafe.location}</span>
                </div>
                <div className="flex flex-wrap gap-1 mb-3">
                  {cafe.cuisine.slice(0, 2).map((type, idx) => (
                    <Badge key={idx} variant="outline" className="text-xs">
                      {type}
                    </Badge>
                  ))}
                </div>
                <div className="flex gap-2">
                  <Button size="sm" className="flex-1" asChild>
                    <a href={`tel:${cafe.phone}`}>
                      <Phone className="w-3 h-3 mr-1" />
                      Call
                    </a>
                  </Button>
                  <Button size="sm" variant="outline" asChild>
                    <Link to={`/cafes/${cafe.id}`}>
                      View
                    </Link>
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* CTA */}
        <div className="mt-10 text-center">
          <Link to="/cafes">
            <Button variant="outline" size="lg">
              <UtensilsCrossed className="w-4 h-4 mr-2" />
              Explore All Cafes
              <ChevronRight className="w-4 h-4 ml-1" />
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default AllCafesSection;
