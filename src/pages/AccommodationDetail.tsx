import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import { Card, CardContent, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

const AccommodationDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [accommodation, setAccommodation] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchAccommodation = async () => {
      try {
        setLoading(true);
        const res = await fetch(`/api/accommodations/${id}`);
        if (!res.ok) throw new Error('Accommodation not found');
        const data = await res.json();
        setAccommodation(data);
      } catch (err: any) {
        setError(err.message || 'Error fetching accommodation');
      } finally {
        setLoading(false);
      }
    };
    if (id) fetchAccommodation();
  }, [id]);

  if (loading) return <div className="min-h-screen flex items-center justify-center">Loading...</div>;
  if (error) return <div className="min-h-screen flex items-center justify-center text-red-500">{error}</div>;
  if (!accommodation) return <div className="min-h-screen flex items-center justify-center text-muted-foreground">Accommodation not found.</div>;

  return (
    <div className="min-h-screen flex flex-col">
      <Navigation />
      <main className="flex-1 container mx-auto px-4 py-12">
        <Button variant="outline" className="mb-6" onClick={() => navigate(-1)}>
          &larr; Back to Accommodations
        </Button>
        <Card className="max-w-3xl mx-auto overflow-hidden">
          {accommodation.photos && accommodation.photos.length > 0 && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
              {accommodation.photos.map((url: string, idx: number) => (
                <img
                  key={idx}
                  src={url}
                  alt={accommodation.name}
                  className="w-full h-64 object-cover rounded"
                />
              ))}
            </div>
          )}
          <CardContent className="p-6">
            <CardTitle className="text-2xl mb-2">{accommodation.name}</CardTitle>
            {accommodation.type && (
              <span className="text-xs bg-gray-100 rounded px-2 py-1 mr-2">{accommodation.type}</span>
            )}
            {accommodation.price_range && (
              <span className="text-primary font-semibold ml-2">{accommodation.price_range}</span>
            )}
            <CardDescription className="mt-4 mb-2">
              {accommodation.location && typeof accommodation.location === 'object' && 'lat' in accommodation.location && 'lng' in accommodation.location
                ? `Location: (${accommodation.location.lat}, ${accommodation.location.lng})`
                : accommodation.location ? String(accommodation.location) : 'Location not specified'}
            </CardDescription>
            {accommodation.description && (
              <p className="mb-4">{accommodation.description}</p>
            )}
            {accommodation.contact_info && (
              <div className="mb-2">Contact: {accommodation.contact_info}</div>
            )}
            {accommodation.booking_link && (
              <Button asChild className="mt-2 bg-primary hover:bg-primary/90">
                <a href={accommodation.booking_link} target="_blank" rel="noopener noreferrer">
                  Book Now
                </a>
              </Button>
            )}
          </CardContent>
        </Card>
      </main>
      <Footer />
    </div>
  );
};

export default AccommodationDetail; 