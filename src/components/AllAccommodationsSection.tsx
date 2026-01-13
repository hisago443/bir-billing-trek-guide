import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Star, Phone, MapPin, ChevronRight, Wifi, Building2, Home, Tent, BedDouble } from 'lucide-react';
import { accommodations } from '@/data/siteData';
import { Link } from 'react-router-dom';

const typeIcons: Record<string, React.ReactNode> = {
  'Resort': <Building2 className="w-4 h-4" />,
  'Hostel': <BedDouble className="w-4 h-4" />,
  'Homestay': <Home className="w-4 h-4" />,
  'Guesthouse': <Building2 className="w-4 h-4" />,
  'Camping': <Tent className="w-4 h-4" />,
};

const AllAccommodationsSection = () => {
  return (
    <section className="py-16">
      <div className="container px-4">
        {/* Section Header */}
        <div className="text-center mb-12">
          <Badge variant="outline" className="mb-4 px-4 py-1">
            <Home className="w-3 h-3 mr-1" /> Places to Stay
          </Badge>
          <h2 className="text-4xl font-bold mb-4">
            Hotels & <span className="text-primary">Accommodations</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            From budget-friendly hostels to luxury resorts, find the perfect place to rest 
            after your adventures in Bir Billing.
          </p>
        </div>

        {/* Accommodations Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {accommodations.map((place) => (
            <Card key={place.id} className="overflow-hidden hover:shadow-xl transition-all duration-300 group">
              <div className="relative h-48 overflow-hidden">
                <img 
                  src={place.image} 
                  alt={place.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
                <div className="absolute top-3 left-3">
                  <Badge className="bg-primary/90 text-primary-foreground">
                    {typeIcons[place.type] || <Building2 className="w-4 h-4" />}
                    <span className="ml-1">{place.type}</span>
                  </Badge>
                </div>
                <div className="absolute top-3 right-3">
                  <Badge className="bg-white/90 text-foreground shadow-lg">
                    <Star className="w-3 h-3 mr-1 fill-yellow-400 text-yellow-400" />
                    {place.rating}
                  </Badge>
                </div>
                <div className="absolute bottom-3 left-3 right-3">
                  <h3 className="text-white font-bold text-xl mb-1">{place.name}</h3>
                  <div className="flex items-center text-white/80 text-sm">
                    <MapPin className="w-3 h-3 mr-1" />
                    {place.location}
                  </div>
                </div>
              </div>
              <CardContent className="p-4">
                <p className="text-muted-foreground text-sm mb-3 line-clamp-2">{place.description}</p>
                
                {/* Amenities */}
                <div className="flex flex-wrap gap-1 mb-4">
                  {place.amenities.slice(0, 4).map((amenity, idx) => (
                    <Badge key={idx} variant="outline" className="text-xs">
                      {amenity}
                    </Badge>
                  ))}
                  {place.amenities.length > 4 && (
                    <Badge variant="outline" className="text-xs">+{place.amenities.length - 4}</Badge>
                  )}
                </div>

                {/* Price & Actions */}
                <div className="flex items-center justify-between">
                  <div>
                    <span className="text-lg font-bold text-primary">{place.price}</span>
                    <span className="text-xs text-muted-foreground">/night</span>
                  </div>
                  <div className="flex gap-2">
                    <Button size="sm" asChild>
                      <a href={`tel:${place.phone}`}>
                        <Phone className="w-3 h-3 mr-1" />
                        Book
                      </a>
                    </Button>
                    <Button size="sm" variant="outline" asChild>
                      <Link to={`/accommodations/${place.id}`}>
                        Details
                      </Link>
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* CTA */}
        <div className="mt-10 text-center">
          <Link to="/accommodations">
            <Button size="lg">
              View All Accommodations
              <ChevronRight className="w-4 h-4 ml-1" />
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default AllAccommodationsSection;
