import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { supabase } from '@/integrations/supabase/client';
import { Database } from '@/integrations/supabase/types';
import { MapPin, Calendar, TrendingUp, Mountain } from 'lucide-react';

type Trek = Database['public']['Tables']['treks']['Row'];

const TrekDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [trek, setTrek] = useState<Trek | null>(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchTrek = async () => {
      if (!id) return;
      
      setLoading(true);
      const { data, error } = await supabase
        .from('treks')
        .select('*')
        .eq('id', id)
        .single();
      
      if (!error && data) {
        setTrek(data);
      }
      setLoading(false);
    };
    
    fetchTrek();
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    );
  }
  
  if (!trek) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navigation />
        <div className="flex-1 flex items-center justify-center">
          <div className="text-center">
            <h2 className="text-2xl font-bold mb-4">Trek not found</h2>
            <Button onClick={() => navigate('/treks')}>Browse Treks</Button>
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
      {trek.photos && trek.photos.length > 0 && (
        <div className="relative h-[60vh] overflow-hidden">
          <img
            src={trek.photos[0]}
            alt={trek.name}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
          <div className="absolute bottom-0 left-0 right-0 container mx-auto px-4 pb-12">
            <Button 
              variant="ghost" 
              className="text-white mb-4 hover:bg-white/20"
              onClick={() => navigate('/treks')}
            >
              ← Back to Treks
            </Button>
            {trek.difficulty && (
              <Badge className="mb-3 bg-primary text-primary-foreground">
                {trek.difficulty}
              </Badge>
            )}
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
              {trek.name}
            </h1>
            <div className="flex flex-wrap gap-4 text-white/90">
              {trek.duration && (
                <div className="flex items-center gap-2">
                  <Calendar className="h-5 w-5" />
                  <span>{trek.duration}</span>
                </div>
              )}
              {trek.distance && (
                <div className="flex items-center gap-2">
                  <MapPin className="h-5 w-5" />
                  <span>{trek.distance}</span>
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
            {trek.description && (
              <Card>
                <CardContent className="p-8">
                  <h2 className="text-2xl font-bold mb-4">About This Trek</h2>
                  <p className="text-muted-foreground leading-relaxed">
                    {trek.description}
                  </p>
                </CardContent>
              </Card>
            )}

            {trek.photos && trek.photos.length > 1 && (
              <Card>
                <CardContent className="p-6">
                  <h2 className="text-2xl font-bold mb-4">Gallery</h2>
                  <div className="grid grid-cols-2 gap-4">
                    {trek.photos.slice(1).map((photo, idx) => (
                      <img
                        key={idx}
                        src={photo}
                        alt={`${trek.name} ${idx + 2}`}
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
                <div>
                  <h3 className="font-semibold mb-3">Trek Details</h3>
                  <div className="space-y-3">
                    {trek.start_point && (
                      <div>
                        <p className="text-sm text-muted-foreground">Starting Point</p>
                        <p className="font-medium">{trek.start_point}</p>
                      </div>
                    )}
                    {trek.end_point && (
                      <div>
                        <p className="text-sm text-muted-foreground">Ending Point</p>
                        <p className="font-medium">{trek.end_point}</p>
                      </div>
                    )}
                    {trek.distance && (
                      <div>
                        <p className="text-sm text-muted-foreground">Distance</p>
                        <p className="font-medium">{trek.distance}</p>
                      </div>
                    )}
                    {trek.difficulty && (
                      <div>
                        <p className="text-sm text-muted-foreground">Difficulty</p>
                        <p className="font-medium">{trek.difficulty}</p>
                      </div>
                    )}
                  </div>
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

export default TrekDetail; 