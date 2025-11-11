import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import { Card, CardContent, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { supabase } from '@/integrations/supabase/client';
import { Database } from '@/integrations/supabase/types';
import { MapPin, Star, Wifi, Phone, Mail, Globe } from 'lucide-react';

type Accommodation = Database['public']['Tables']['accommodations']['Row'];

const AccommodationDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [accommodation, setAccommodation] = useState<Accommodation | null>(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchAccommodation = async () => {
      if (!id) return;
      
      setLoading(true);
      const { data, error } = await supabase
        .from('accommodations')
        .select('*')
        .eq('id', parseInt(id))
        .single();
      
      if (!error && data) {
        setAccommodation(data);
      }
      setLoading(false);
    };
    
    fetchAccommodation();
  }, [id]);

  const formatLocation = (location: any): string => {
    if (!location) return 'Location not specified';
    if (typeof location === 'string') return location;
    if (typeof location === 'object' && 'lat' in location && 'lng' in location) {
      return `Coordinates: (${location.lat}, ${location.lng})`;
    }
    return 'Location not specified';
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    );
  }
  
  if (!accommodation) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navigation />
        <div className="flex-1 flex items-center justify-center">
          <div className="text-center">
            <h2 className="text-2xl font-bold mb-4">Accommodation not found</h2>
            <Button onClick={() => navigate('/accommodations')}>Browse Accommodations</Button>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Navigation />
      
      {/* Hero Section with Photos */}
      {accommodation.photos && accommodation.photos.length > 0 && (
        <div className="relative h-[60vh] overflow-hidden">
          <img
            src={accommodation.photos[0]}
            alt={accommodation.name}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
          <div className="absolute bottom-0 left-0 right-0 container mx-auto px-4 pb-12">
            <Button 
              variant="ghost" 
              className="text-white mb-4 hover:bg-white/20"
              onClick={() => navigate('/accommodations')}
            >
              ← Back to Accommodations
            </Button>
            <div className="flex items-center gap-3 mb-3">
              {accommodation.type && (
                <Badge className="bg-primary text-primary-foreground">
                  {accommodation.type}
                </Badge>
              )}
              {accommodation.rating && (
                <div className="flex items-center gap-1 text-white">
                  <Star className="h-5 w-5 fill-yellow-400 text-yellow-400" />
                  <span className="font-semibold">{accommodation.rating}</span>
                </div>
              )}
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
              {accommodation.name}
            </h1>
            <div className="flex items-center text-white/90 gap-2">
              <MapPin className="h-5 w-5" />
              <span className="text-lg">{formatLocation(accommodation.location)}</span>
            </div>
          </div>
        </div>
      )}

      {/* Content */}
      <main className="flex-1 container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Photo Gallery */}
            {accommodation.photos && accommodation.photos.length > 1 && (
              <Card>
                <CardContent className="p-6">
                  <h2 className="text-2xl font-bold mb-4">Gallery</h2>
                  <div className="grid grid-cols-2 gap-4">
                    {accommodation.photos.slice(1).map((photo, idx) => (
                      <img
                        key={idx}
                        src={photo}
                        alt={`${accommodation.name} ${idx + 2}`}
                        className="w-full h-48 object-cover rounded-lg"
                      />
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Description */}
            {accommodation.description && (
              <Card>
                <CardContent className="p-6">
                  <h2 className="text-2xl font-bold mb-4">About</h2>
                  <p className="text-muted-foreground leading-relaxed">
                    {accommodation.description}
                  </p>
                </CardContent>
              </Card>
            )}

            {/* Amenities */}
            {accommodation.amenities && accommodation.amenities.length > 0 && (
              <Card>
                <CardContent className="p-6">
                  <h2 className="text-2xl font-bold mb-4">Amenities</h2>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                    {accommodation.amenities.map((amenity, idx) => (
                      <div key={idx} className="flex items-center gap-2 p-3 bg-primary/5 rounded-lg">
                        <Wifi className="h-4 w-4 text-primary" />
                        <span className="text-sm font-medium">{amenity}</span>
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
                {accommodation.price_range && (
                  <div>
                    <h3 className="font-semibold mb-2">Price Range</h3>
                    <p className="text-2xl font-bold text-primary">{accommodation.price_range}</p>
                    <p className="text-sm text-muted-foreground">per night</p>
                  </div>
                )}

                {accommodation.phone && (
                  <div className="space-y-2 pt-4 border-t">
                    <h3 className="font-semibold mb-3">Contact Information</h3>
                    <div className="flex items-center gap-2 text-sm">
                      <Phone className="h-4 w-4 text-primary" />
                      <span>{accommodation.phone}</span>
                    </div>
                    {accommodation.email && (
                      <div className="flex items-center gap-2 text-sm">
                        <Mail className="h-4 w-4 text-primary" />
                        <span>{accommodation.email}</span>
                      </div>
                    )}
                  </div>
                )}

                {accommodation.website && (
                  <Button className="w-full" size="lg" asChild>
                    <a href={accommodation.website} target="_blank" rel="noopener noreferrer">
                      Visit Website
                    </a>
                  </Button>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default AccommodationDetail; 