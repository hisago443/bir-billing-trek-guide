import React, { useEffect, useState } from 'react';
import { Card, CardContent, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import FilterBar from '@/components/FilterBar';
import { useNavigate } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import { Database } from '@/integrations/supabase/types';

type Cafe = Database['public']['Tables']['cafes']['Row'];

const Cafes: React.FC = () => {
  const [cafes, setCafes] = useState<Cafe[]>([]);
  const [filteredCafes, setFilteredCafes] = useState<Cafe[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [locationFilter, setLocationFilter] = useState('all');
  const navigate = useNavigate();

  const locations = ['Bir', 'Billing', 'Barot', 'Gunher', 'Gharnala'];

  useEffect(() => {
    const fetchCafes = async () => {
      setLoading(true);
      const { data, error } = await supabase
        .from('cafes')
        .select('*')
        .order('created_at', { ascending: false });
      
      if (!error && data) {
        setCafes(data);
        setFilteredCafes(data);
      }
      setLoading(false);
    };
    fetchCafes();
  }, []);

  useEffect(() => {
    let filtered = cafes;

    // Apply search filter
    if (searchQuery) {
      filtered = filtered.filter((cafe) =>
        cafe.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        cafe.description?.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    // Apply location filter
    if (locationFilter !== 'all') {
      filtered = filtered.filter((cafe) => cafe.location === locationFilter);
    }

    setFilteredCafes(filtered);
  }, [searchQuery, locationFilter, cafes]);

  return (
    <div className="min-h-screen flex flex-col">
      <Navigation />
      <main className="flex-1 container mx-auto px-4 py-12">
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-2">Cafes & Restaurants</h1>
          <p className="text-muted-foreground">Discover the best dining experiences across Bir Billing region</p>
        </div>

        <FilterBar
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
          locationFilter={locationFilter}
          onLocationChange={setLocationFilter}
          locations={locations}
        />

        {loading ? (
          <div className="text-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto"></div>
            <p className="mt-4 text-muted-foreground">Loading cafes...</p>
          </div>
        ) : filteredCafes.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-muted-foreground">No cafes found matching your criteria.</p>
          </div>
        ) : (
          <>
            <div className="mb-4 text-sm text-muted-foreground">
              Showing {filteredCafes.length} {filteredCafes.length === 1 ? 'cafe' : 'cafes'}
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredCafes.map((cafe) => (
                <Card
                  key={cafe.id}
                  className="listing-card cursor-pointer group"
                  onClick={() => navigate(`/cafes/${cafe.id}`)}
                >
                  {cafe.photos && cafe.photos.length > 0 && (
                    <div className="relative h-48 overflow-hidden">
                      <img
                        src={cafe.photos[0]}
                        alt={cafe.name}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                      />
                      <div className="absolute top-2 right-2">
                        <Badge variant="secondary" className="bg-background/90">
                          {cafe.location}
                        </Badge>
                      </div>
                    </div>
                  )}
                  <CardContent className="p-4">
                    <div className="flex justify-between items-start mb-2">
                      <CardTitle className="text-lg group-hover:text-primary transition-colors">
                        {cafe.name}
                      </CardTitle>
                      {cafe.cuisine && cafe.cuisine.length > 0 && (
                        <Badge variant="outline" className="ml-2 shrink-0">
                          {cafe.cuisine[0]}
                        </Badge>
                      )}
                    </div>
                    {cafe.description && (
                      <p className="text-sm text-muted-foreground mb-3 line-clamp-2">
                        {cafe.description}
                      </p>
                    )}
                    {cafe.price && (
                      <p className="text-sm font-medium text-primary mb-2">
                        {cafe.price}
                      </p>
                    )}
                    {cafe.hours && (
                      <p className="text-xs text-muted-foreground">
                        {cafe.hours}
                      </p>
                    )}
                  </CardContent>
                </Card>
              ))}
            </div>
          </>
        )}
      </main>
      <Footer />
    </div>
  );
};

export default Cafes; 