import React, { useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import FilterBar from '@/components/FilterBar';
import { supabase } from '@/integrations/supabase/client';
import { Database } from '@/integrations/supabase/types';
import { useNavigate } from 'react-router-dom';
import { Star } from 'lucide-react';

type Accommodation = Database['public']['Tables']['accommodations']['Row'];

const Accommodations: React.FC = () => {
  const [accommodations, setAccommodations] = useState<Accommodation[]>([]);
  const [filteredAccommodations, setFilteredAccommodations] = useState<Accommodation[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [locationFilter, setLocationFilter] = useState('all');
  const [typeFilter, setTypeFilter] = useState('all');
  const navigate = useNavigate();

  const locations = ['Bir', 'Billing', 'Barot', 'Gunher', 'Gharnala'];
  const types = ['Hotel', 'Resort', 'Hostel', 'Guest House', 'Homestay', 'Camping', 'Cottage', 'Villa'];

  const formatLocation = (location: any): string => {
    if (!location) return 'Location not specified';
    if (typeof location === 'string') return location;
    if (typeof location === 'object' && 'lat' in location && 'lng' in location) {
      return `Location: (${location.lat}, ${location.lng})`;
    }
    return 'Location not specified';
  };

  useEffect(() => {
    const fetchAccommodations = async () => {
      setLoading(true);
      const { data, error } = await supabase
        .from('accommodations')
        .select('*')
        .order('created_at', { ascending: false });
      if (!error && data) {
        setAccommodations(data);
        setFilteredAccommodations(data);
      }
      setLoading(false);
    };
    fetchAccommodations();
  }, []);

  useEffect(() => {
    let filtered = accommodations;

    if (searchQuery) {
      filtered = filtered.filter((acc) =>
        acc.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        acc.description?.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    if (locationFilter !== 'all') {
      filtered = filtered.filter((acc) => {
        const location = formatLocation(acc.location);
        return location.includes(locationFilter);
      });
    }

    if (typeFilter !== 'all') {
      filtered = filtered.filter((acc) => acc.type === typeFilter);
    }

    setFilteredAccommodations(filtered);
  }, [searchQuery, locationFilter, typeFilter, accommodations]);

  return (
    <div className="min-h-screen flex flex-col">
      <Navigation />
      <main className="flex-1 container mx-auto px-4 py-12">
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-2">Accommodations</h1>
          <p className="text-muted-foreground">Find your perfect stay in the Himalayas</p>
        </div>

        <FilterBar
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
          locationFilter={locationFilter}
          onLocationChange={setLocationFilter}
          locations={locations}
          additionalFilters={
            <div className="w-full md:w-48">
              <Select value={typeFilter} onValueChange={setTypeFilter}>
                <SelectTrigger>
                  <SelectValue placeholder="All Types" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Types</SelectItem>
                  {types.map((type) => (
                    <SelectItem key={type} value={type}>
                      {type}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          }
        />

        {loading ? (
          <div className="text-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto"></div>
            <p className="mt-4 text-muted-foreground">Loading accommodations...</p>
          </div>
        ) : filteredAccommodations.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-muted-foreground">No accommodations found matching your criteria.</p>
          </div>
        ) : (
          <>
            <div className="mb-4 text-sm text-muted-foreground">
              Showing {filteredAccommodations.length} {filteredAccommodations.length === 1 ? 'property' : 'properties'}
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredAccommodations.map((acc) => (
                <Card
                  key={acc.id}
                  className="listing-card cursor-pointer group"
                  onClick={() => navigate(`/accommodations/${acc.id}`)}
                >
                  {acc.photos && acc.photos.length > 0 && (
                    <div className="relative h-48 overflow-hidden">
                      <img
                        src={acc.photos[0]}
                        alt={acc.name}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                      />
                      <div className="absolute top-2 right-2">
                        <Badge variant="secondary" className="bg-background/90">
                          {formatLocation(acc.location)}
                        </Badge>
                      </div>
                    </div>
                  )}
                  <CardContent className="p-4">
                    <div className="flex justify-between items-start mb-2">
                      <CardTitle className="text-lg group-hover:text-primary transition-colors">
                        {acc.name}
                      </CardTitle>
                      {acc.type && (
                        <Badge variant="outline" className="ml-2 shrink-0">
                          {acc.type}
                        </Badge>
                      )}
                    </div>
                    {acc.rating && (
                      <div className="flex items-center gap-1 mb-2">
                        <Star className="h-4 w-4 fill-accent text-accent" />
                        <span className="text-sm font-medium">{acc.rating}</span>
                      </div>
                    )}
                    {acc.price_range && (
                      <p className="text-primary font-semibold mb-2">{acc.price_range}</p>
                    )}
                    {acc.amenities && acc.amenities.length > 0 && (
                      <div className="flex flex-wrap gap-1 mb-2">
                        {acc.amenities.slice(0, 3).map((amenity, idx) => (
                          <Badge key={idx} variant="secondary" className="text-xs">
                            {amenity}
                          </Badge>
                        ))}
                        {acc.amenities.length > 3 && (
                          <Badge variant="secondary" className="text-xs">
                            +{acc.amenities.length - 3}
                          </Badge>
                        )}
                      </div>
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

export default Accommodations; 