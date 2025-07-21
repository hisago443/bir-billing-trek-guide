import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import { Card, CardContent, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

const TrekDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [trek, setTrek] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchTrek = async () => {
      try {
        setLoading(true);
        const res = await fetch(`/api/treks/${id}`);
        if (!res.ok) throw new Error('Trek not found');
        const data = await res.json();
        setTrek(data);
      } catch (err: any) {
        setError(err.message || 'Error fetching trek');
      } finally {
        setLoading(false);
      }
    };
    if (id) fetchTrek();
  }, [id]);

  if (loading) return <div className="min-h-screen flex items-center justify-center">Loading...</div>;
  if (error) return <div className="min-h-screen flex items-center justify-center text-red-500">{error}</div>;
  if (!trek) return <div className="min-h-screen flex items-center justify-center text-muted-foreground">Trek not found.</div>;

  return (
    <div className="min-h-screen flex flex-col">
      <Navigation />
      <main className="flex-1 container mx-auto px-4 py-12">
        <Button variant="outline" className="mb-6" onClick={() => navigate(-1)}>
          &larr; Back to Treks
        </Button>
        <Card className="max-w-3xl mx-auto overflow-hidden">
          {trek.photos && trek.photos.length > 0 && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
              {trek.photos.map((url: string, idx: number) => (
                <img
                  key={idx}
                  src={url}
                  alt={trek.name}
                  className="w-full h-64 object-cover rounded"
                />
              ))}
            </div>
          )}
          <CardContent className="p-6">
            <CardTitle className="text-2xl mb-2">{trek.name}</CardTitle>
            {trek.difficulty && (
              <span className="text-xs bg-gray-100 rounded px-2 py-1 mr-2">{trek.difficulty}</span>
            )}
            {trek.duration && (
              <span className="text-primary font-semibold ml-2">{trek.duration}</span>
            )}
            <CardDescription className="mt-4 mb-2">
              {trek.starting_point && trek.ending_point && (
                <span>Route: {trek.starting_point} → {trek.ending_point}</span>
              )}
              {trek.distance && (
                <span className="ml-2">| Distance: {trek.distance}</span>
              )}
              {trek.elevation_gain && (
                <span className="ml-2">| Elevation: {trek.elevation_gain}</span>
              )}
            </CardDescription>
            {trek.best_season && (
              <div className="mb-2">Best Season: {trek.best_season}</div>
            )}
            {trek.highlights && trek.highlights.length > 0 && (
              <div className="mb-2">
                <span className="font-semibold">Highlights:</span> {trek.highlights.join(', ')}
              </div>
            )}
            {trek.description && (
              <p className="mb-4">{trek.description}</p>
            )}
            {trek.contact_info && (
              <div className="mb-2">Contact: {trek.contact_info}</div>
            )}
          </CardContent>
        </Card>
      </main>
      <Footer />
    </div>
  );
};

export default TrekDetail; 