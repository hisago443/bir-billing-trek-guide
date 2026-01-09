import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Car, Phone, Users, MapPin, Languages } from 'lucide-react';
import { taxiServices } from '@/data/siteData';

const TaxiServices = () => {
  return (
    <section className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <Car className="h-12 w-12 text-primary mx-auto mb-4" />
          <h2 className="text-4xl font-bold mb-4 text-foreground">Taxi & Cab Services</h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Reliable transportation for your journeys around Bir Billing and beyond
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
          {taxiServices.map((taxi) => (
            <Card key={taxi.id} className="hover:shadow-lg transition-shadow duration-300">
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div>
                    <CardTitle className="text-xl">{taxi.driver_name}</CardTitle>
                    <div className="flex items-center gap-2 mt-2 text-muted-foreground">
                      <Car className="h-4 w-4" />
                      <span className="text-sm">{taxi.vehicle_type}</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-1 bg-primary/10 px-3 py-1 rounded-full">
                    <Users className="h-4 w-4 text-primary" />
                    <span className="text-sm font-semibold text-primary">{taxi.seating_capacity} seats</span>
                  </div>
                </div>
              </CardHeader>
              
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  <div>
                    <div className="flex items-center gap-2 text-sm font-medium mb-2">
                      <MapPin className="h-4 w-4 text-primary" />
                      <span>Areas Covered</span>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {taxi.areas_covered?.map((area, idx) => (
                        <span key={idx} className="text-xs px-2 py-1 bg-primary/10 text-primary rounded">
                          {area}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div>
                    <div className="flex items-center gap-2 text-sm font-medium mb-2">
                      <Languages className="h-4 w-4 text-primary" />
                      <span>Languages</span>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {taxi.languages_spoken?.map((lang, idx) => (
                        <span key={idx} className="text-xs px-2 py-1 bg-muted text-muted-foreground rounded">
                          {lang}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                <Button 
                  className="w-full"
                  onClick={() => window.open(`tel:${taxi.contact_number}`, '_self')}
                >
                  <Phone className="h-4 w-4 mr-2" />
                  Call {taxi.contact_number}
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TaxiServices;
