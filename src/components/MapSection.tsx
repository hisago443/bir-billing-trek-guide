
import React from 'react';
import { MapPin, Compass, Info, Filter } from 'lucide-react';
import { Button } from '@/components/ui/button';

const MapSection = () => {
  return (
    <section className="py-16 bg-muted">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-start mb-8">
          <div>
            <h2 className="section-title">Interactive Map</h2>
            <p className="text-muted-foreground max-w-2xl mb-6">
              Navigate Bir Billing with our detailed interactive map. Find accommodations, restaurants, attractions and adventure activities with ease.
            </p>
          </div>
          
          <div className="flex space-x-3 mt-4 md:mt-0">
            <Button variant="outline" size="sm">
              <Filter className="h-4 w-4 mr-2" />
              Filters
            </Button>
            <Button variant="outline" size="sm">
              <Compass className="h-4 w-4 mr-2" />
              Routes
            </Button>
            <Button variant="outline" size="sm">
              <Info className="h-4 w-4 mr-2" />
              Legend
            </Button>
          </div>
        </div>

        <div className="map-container relative">
          {/* This is a placeholder for the actual map integration */}
          <div className="absolute inset-0 bg-gray-200 flex items-center justify-center">
            <div className="text-center">
              <MapPin className="h-12 w-12 text-primary mx-auto mb-4" />
              <p className="text-foreground text-lg font-medium">Interactive Map Coming Soon</p>
              <p className="text-muted-foreground">We're working on integrating our detailed maps feature</p>
            </div>
          </div>
          
          {/* Map overlay with points of interest */}
          <div className="absolute top-4 right-4 z-10 bg-card p-3 rounded-lg shadow-lg">
            <h4 className="font-medium text-sm mb-2">Points of Interest</h4>
            <div className="space-y-2 text-sm">
              <div className="flex items-center">
                <div className="w-3 h-3 rounded-full bg-primary mr-2"></div>
                <span>Paragliding Take-off</span>
              </div>
              <div className="flex items-center">
                <div className="w-3 h-3 rounded-full bg-secondary mr-2"></div>
                <span>Accommodations</span>
              </div>
              <div className="flex items-center">
                <div className="w-3 h-3 rounded-full bg-accent mr-2"></div>
                <span>Restaurants</span>
              </div>
              <div className="flex items-center">
                <div className="w-3 h-3 rounded-full bg-destructive mr-2"></div>
                <span>Monasteries</span>
              </div>
            </div>
          </div>
        </div>
        
        <div className="mt-6 text-center">
          <Button className="bg-primary hover:bg-primary/90">
            Explore Full Map
            <MapPin className="ml-2 h-4 w-4" />
          </Button>
        </div>
      </div>
    </section>
  );
};

export default MapSection;
