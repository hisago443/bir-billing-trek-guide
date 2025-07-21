import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import { Card, CardContent, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

const CafeDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [cafe, setCafe] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCafe = async () => {
      try {
        setLoading(true);
        const res = await fetch(`/api/cafes/${id}`);
        if (!res.ok) throw new Error('Cafe not found');
        const data = await res.json();
        setCafe(data);
      } catch (err: any) {
        setError(err.message || 'Error fetching cafe');
      } finally {
        setLoading(false);
      }
    };
    if (id) fetchCafe();
  }, [id]);

  if (loading) return <div className="min-h-screen flex items-center justify-center">Loading...</div>;
  if (error) return <div className="min-h-screen flex items-center justify-center text-red-500">{error}</div>;
  if (!cafe) return <div className="min-h-screen flex items-center justify-center text-muted-foreground">Cafe not found.</div>;

  return (
    <div className="min-h-screen flex flex-col">
      <Navigation />
      <main className="flex-1 container mx-auto px-4 py-12">
        <Button variant="outline" className="mb-6" onClick={() => navigate(-1)}>
          &larr; Back to Cafes
        </Button>
        <Card className="max-w-3xl mx-auto overflow-hidden">
          {cafe.image && (
            <img
              src={cafe.image}
              alt={cafe.name}
              className="w-full h-64 object-cover rounded"
            />
          )}
          <CardContent className="p-6">
            <CardTitle className="text-2xl mb-2">{cafe.name}</CardTitle>
            {cafe.cuisine && (
              <span className="text-xs bg-gray-100 rounded px-2 py-1 mr-2">{cafe.cuisine}</span>
            )}
            <CardDescription className="mt-4 mb-2">
              {cafe.location}
            </CardDescription>
            {cafe.usp && (
              <div className="mb-2 text-muted-foreground">{cafe.usp}</div>
            )}
          </CardContent>
        </Card>
      </main>
      <Footer />
    </div>
  );
};

export default CafeDetail; 