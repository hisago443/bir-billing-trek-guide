import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import { Card, CardContent, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { supabase } from '@/integrations/supabase/client';
import { Database } from '@/integrations/supabase/types';
import { MapPin, Clock, Utensils, Phone, Star } from 'lucide-react';

type Cafe = Database['public']['Tables']['cafes']['Row'];

const CafeDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [cafe, setCafe] = useState<Cafe | null>(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCafe = async () => {
      if (!id) return;
      
      setLoading(true);
      const { data, error } = await supabase
        .from('cafes')
        .select('*')
        .eq('id', parseInt(id))
        .single();
      
      if (!error && data) {
        setCafe(data);
      }
      setLoading(false);
    };
    
    fetchCafe();
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    );
  }
  
  if (!cafe) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navigation />
        <div className="flex-1 flex items-center justify-center">
          <div className="text-center">
            <h2 className="text-2xl font-bold mb-4">Cafe not found</h2>
            <Button onClick={() => navigate('/cafes')}>Browse Cafes</Button>
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
      {cafe.photos && cafe.photos.length > 0 && (
        <div className="relative h-[60vh] overflow-hidden">
          <img
            src={cafe.photos[0]}
            alt={cafe.name}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
          <div className="absolute bottom-0 left-0 right-0 container mx-auto px-4 pb-12">
            <Button 
              variant="ghost" 
              className="text-white mb-4 hover:bg-white/20"
              onClick={() => navigate('/cafes')}
            >
              ← Back to Cafes
            </Button>
            {cafe.cuisine && cafe.cuisine.length > 0 && (
              <div className="flex gap-2 mb-3">
                {cafe.cuisine.map((type, idx) => (
                  <Badge key={idx} className="bg-primary text-primary-foreground">
                    {type}
                  </Badge>
                ))}
              </div>
            )}
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
              {cafe.name}
            </h1>
            <div className="flex flex-wrap gap-4 text-white/90">
              {cafe.location && (
                <div className="flex items-center gap-2">
                  <MapPin className="h-5 w-5" />
                  <span>{cafe.location}</span>
                </div>
              )}
              {cafe.hours && (
                <div className="flex items-center gap-2">
                  <Clock className="h-5 w-5" />
                  <span>{cafe.hours}</span>
                </div>
              )}
              {cafe.rating && (
                <div className="flex items-center gap-2">
                  <Star className="h-5 w-5 fill-yellow-400 text-yellow-400" />
                  <span>{cafe.rating}</span>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Content */}
      <main className="flex-1 container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {cafe.description && (
              <Card>
                <CardContent className="p-8">
                  <h2 className="text-2xl font-bold mb-4">About</h2>
                  <p className="text-muted-foreground leading-relaxed">
                    {cafe.description}
                  </p>
                </CardContent>
              </Card>
            )}

            {cafe.photos && cafe.photos.length > 1 && (
              <Card>
                <CardContent className="p-6">
                  <h2 className="text-2xl font-bold mb-4">Gallery</h2>
                  <div className="grid grid-cols-2 gap-4">
                    {cafe.photos.slice(1).map((photo, idx) => (
                      <img
                        key={idx}
                        src={photo}
                        alt={`${cafe.name} ${idx + 2}`}
                        className="w-full h-48 object-cover rounded-lg"
                      />
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
                {cafe.price && (
                  <div>
                    <h3 className="font-semibold mb-2">Price Range</h3>
                    <p className="text-xl font-bold text-primary">{cafe.price}</p>
                  </div>
                )}

                <div className="pt-4 border-t space-y-3">
                  <h3 className="font-semibold">Information</h3>
                  {cafe.hours && (
                    <div className="flex items-start gap-2">
                      <Clock className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                      <div>
                        <p className="text-sm text-muted-foreground">Hours</p>
                        <p className="font-medium">{cafe.hours}</p>
                      </div>
                    </div>
                  )}
                  {cafe.location && (
                    <div className="flex items-start gap-2">
                      <MapPin className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                      <div>
                        <p className="text-sm text-muted-foreground">Location</p>
                        <p className="font-medium">{cafe.location}</p>
                      </div>
                    </div>
                  )}
                  {cafe.phone && (
                    <div className="flex items-start gap-2">
                      <Phone className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                      <div>
                        <p className="text-sm text-muted-foreground">Contact</p>
                        <p className="font-medium">{cafe.phone}</p>
                      </div>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default CafeDetail; 