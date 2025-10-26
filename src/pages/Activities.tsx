import React, { useEffect, useState } from 'react';
import { Card, CardContent, CardTitle, CardDescription } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import FilterBar from '@/components/FilterBar';
import { supabase } from '@/integrations/supabase/client';
import { Database } from '@/integrations/supabase/types';
import { Calendar, Clock, MapPin, Phone, Mail, Globe, TrendingUp } from 'lucide-react';

type Activity = Database['public']['Tables']['activities']['Row'];

const Activities: React.FC = () => {
  const [activities, setActivities] = useState<Activity[]>([]);
  const [filteredActivities, setFilteredActivities] = useState<Activity[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [locationFilter, setLocationFilter] = useState('all');
  const [typeFilter, setTypeFilter] = useState('all');

  const locations = ['Bir', 'Billing', 'Barot', 'Gunher', 'Gharnala'];
  const activityTypes = ['Paragliding', 'Trekking', 'Mountain Biking', 'Rock Climbing', 'Rafting', 'Fishing', 'Yoga & Wellness', 'Camping'];

  useEffect(() => {
    const fetchActivities = async () => {
      setLoading(true);
      const { data, error } = await supabase
        .from('activities')
        .select('*')
        .order('created_at', { ascending: false });
      
      if (!error && data) {
        setActivities(data);
        setFilteredActivities(data);
      }
      setLoading(false);
    };
    fetchActivities();
  }, []);

  useEffect(() => {
    let filtered = activities;

    if (searchQuery) {
      filtered = filtered.filter((activity) =>
        activity.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        activity.description?.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    if (locationFilter !== 'all') {
      filtered = filtered.filter((activity) => activity.location === locationFilter);
    }

    if (typeFilter !== 'all') {
      filtered = filtered.filter((activity) => activity.name.includes(typeFilter));
    }

    setFilteredActivities(filtered);
  }, [searchQuery, locationFilter, typeFilter, activities]);

  const getDifficultyColor = (difficulty: string | null) => {
    if (!difficulty) return 'secondary';
    const lower = difficulty.toLowerCase();
    if (lower.includes('easy') || lower.includes('beginner')) return 'default';
    if (lower.includes('moderate')) return 'secondary';
    if (lower.includes('difficult') || lower.includes('advanced')) return 'destructive';
    return 'secondary';
  };

  const parseContactInfo = (contactInfo: any) => {
    if (typeof contactInfo === 'string') {
      try {
        return JSON.parse(contactInfo);
      } catch {
        return {};
      }
    }
    return contactInfo || {};
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navigation />
      <main className="flex-1 container mx-auto px-4 py-12">
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-2">Adventure Activities</h1>
          <p className="text-muted-foreground">Experience thrilling adventures in the Himalayas</p>
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
                  <SelectValue placeholder="All Activities" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Activities</SelectItem>
                  {activityTypes.map((type) => (
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
            <p className="mt-4 text-muted-foreground">Loading activities...</p>
          </div>
        ) : filteredActivities.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-muted-foreground">No activities found matching your criteria.</p>
          </div>
        ) : (
          <>
            <div className="mb-4 text-sm text-muted-foreground">
              Showing {filteredActivities.length} {filteredActivities.length === 1 ? 'activity' : 'activities'}
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredActivities.map((activity) => (
                <Card key={activity.id} className="listing-card overflow-hidden">
                  {activity.photos && activity.photos.length > 0 && (
                    <div className="relative h-48 overflow-hidden">
                      <img
                        src={activity.photos[0]}
                        alt={activity.name}
                        className="w-full h-full object-cover hover:scale-110 transition-transform duration-300"
                      />
                      <div className="absolute top-2 right-2">
                        <Badge variant="secondary" className="bg-background/90">
                          <MapPin className="h-3 w-3 mr-1" />
                          {String(activity.location)}
                        </Badge>
                      </div>
                    </div>
                  )}
                  <CardContent className="p-4">
                    <CardTitle className="text-lg mb-3">{activity.name}</CardTitle>
                    
                    {activity.description && (
                      <p className="text-sm text-muted-foreground mb-3 line-clamp-3">
                        {activity.description}
                      </p>
                    )}

                    {activity.price && (
                      <p className="text-primary font-semibold mb-3">{activity.price}</p>
                    )}

                    {activity.booking_link && (
                      <Button className="w-full" asChild>
                        <a href={activity.booking_link} target="_blank" rel="noopener noreferrer">
                          Book Now
                        </a>
                      </Button>
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

export default Activities;
