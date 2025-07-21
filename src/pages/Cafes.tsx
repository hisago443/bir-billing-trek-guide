import React, { useEffect, useState } from 'react';
import { Card, CardContent, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import { useNavigate } from 'react-router-dom';

const Cafes: React.FC = () => {
  const [cafes, setCafes] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCafes = async () => {
      try {
        setLoading(true);
        const res = await fetch('/api/cafes');
        if (!res.ok) throw new Error('Failed to fetch cafes');
        const data = await res.json();
        setCafes(data);
      } catch (err: any) {
        setError(err.message || 'Error fetching cafes');
      } finally {
        setLoading(false);
      }
    };
    fetchCafes();
  }, []);

  return (
    <div className="min-h-screen flex flex-col">
      <Navigation />
      <main className="flex-1 container mx-auto px-4 py-12">
        <h1 className="text-3xl font-bold mb-8 text-center">Cafes in Bir Billing</h1>
        {loading ? (
          <div className="text-center">Loading...</div>
        ) : error ? (
          <div className="text-center text-red-500">{error}</div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {cafes.map((cafe) => (
              <Card
                key={cafe.id}
                className="hover:shadow-lg transition-shadow duration-300 overflow-hidden cursor-pointer"
                onClick={() => navigate(`/cafes/${cafe.id}`)}
              >
                <img
                  src={cafe.image}
                  alt={cafe.name}
                  className="w-full h-48 object-cover"
                />
                <CardContent className="p-4">
                  <div className="flex justify-between items-center mb-2">
                    <CardTitle className="text-lg">{cafe.name}</CardTitle>
                    <span className="text-xs bg-gray-100 rounded px-2 py-1 ml-2">{cafe.cuisine}</span>
                  </div>
                  <CardDescription className="mb-2">
                    {cafe.location}
                  </CardDescription>
                  <div className="mb-2 text-muted-foreground text-sm">{cafe.usp}</div>
                  <Button size="sm" className="mt-2 bg-primary hover:bg-primary/90" disabled>
                    View Details
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </main>
      <Footer />
    </div>
  );
};

export default Cafes; 