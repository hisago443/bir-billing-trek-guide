import React, { useEffect, useRef, useState } from 'react';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { MapPin } from 'lucide-react';

const Map = () => {
  const mapContainer = useRef<HTMLDivElement>(null);
  const map = useRef<mapboxgl.Map | null>(null);
  const [mapboxToken, setMapboxToken] = useState('');
  const [tokenSubmitted, setTokenSubmitted] = useState(false);

  useEffect(() => {
    if (!mapContainer.current || !tokenSubmitted || !mapboxToken) return;

    mapboxgl.accessToken = mapboxToken;
    
    map.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: 'mapbox://styles/mapbox/outdoors-v12',
      center: [76.7234, 32.0537], // Bir Billing coordinates
      zoom: 12,
      pitch: 45,
    });

    // Add navigation controls
    map.current.addControl(
      new mapboxgl.NavigationControl({
        visualizePitch: true,
      }),
      'top-right'
    );

    // Add markers for key locations
    const locations = [
      { name: 'Bir Landing Site', coords: [76.7234, 32.0537] },
      { name: 'Billing Takeoff Site', coords: [76.7394, 32.0961] },
      { name: 'Barot Valley', coords: [77.1166, 31.9666] },
      { name: 'Rajgundha', coords: [77.2166, 32.0833] },
    ];

    locations.forEach(location => {
      new mapboxgl.Marker({ color: '#2b7652' })
        .setLngLat(location.coords as [number, number])
        .setPopup(new mapboxgl.Popup().setHTML(`<h3 class="font-semibold">${location.name}</h3>`))
        .addTo(map.current!);
    });

    return () => {
      map.current?.remove();
    };
  }, [tokenSubmitted, mapboxToken]);

  const handleTokenSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (mapboxToken.trim()) {
      setTokenSubmitted(true);
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navigation />
      <main className="flex-1 pt-16">
        <div className="container mx-auto px-4 py-8">
          <div className="mb-8">
            <h1 className="text-4xl font-bold mb-4">Interactive Map of Bir Billing</h1>
            <p className="text-muted-foreground">
              Explore all the locations, accommodations, cafes, and activities in the Bir Billing region.
            </p>
          </div>

          {!tokenSubmitted ? (
            <div className="max-w-xl mx-auto bg-card p-8 rounded-lg shadow-lg">
              <div className="flex items-center justify-center mb-6">
                <MapPin className="h-12 w-12 text-primary" />
              </div>
              <h2 className="text-2xl font-semibold mb-4 text-center">Enter Mapbox Access Token</h2>
              <p className="text-muted-foreground mb-6 text-center">
                To display the interactive map, please enter your Mapbox public token. 
                You can get one for free at <a href="https://mapbox.com" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">mapbox.com</a>
              </p>
              <form onSubmit={handleTokenSubmit} className="space-y-4">
                <Input
                  type="text"
                  placeholder="pk.eyJ1IjoiZXhhbXBsZS..."
                  value={mapboxToken}
                  onChange={(e) => setMapboxToken(e.target.value)}
                  className="w-full"
                />
                <Button type="submit" className="w-full">
                  Load Map
                </Button>
              </form>
            </div>
          ) : (
            <div className="relative w-full h-[calc(100vh-280px)] rounded-xl overflow-hidden shadow-2xl border border-border">
              <div ref={mapContainer} className="absolute inset-0" />
            </div>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Map;
