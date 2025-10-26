import { useEffect, useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Bike, Phone, MapPin, Check } from 'lucide-react';

interface VehicleRental {
  id: string;
  provider_name: string;
  vehicle_type: string;
  vehicle_model: string;
  price_per_day: string;
  contact_number: string;
  location: string;
  features: string[];
}

const RentalsSection = () => {
  const [rentals, setRentals] = useState<VehicleRental[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchRentals = async () => {
      const { data, error } = await supabase
        .from('vehicle_rentals')
        .select('*')
        .order('price_per_day');
      
      if (!error && data) {
        setRentals(data);
      }
      setLoading(false);
    };
    
    fetchRentals();
  }, []);

  if (loading) return null;

  return (
    <section className="py-20 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <Bike className="h-12 w-12 text-primary mx-auto mb-4" />
          <h2 className="text-4xl font-bold mb-4 text-foreground">Rent a Bike or Scooter</h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Explore Bir Billing at your own pace with our trusted rental partners
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {rentals.map((rental) => (
            <Card key={rental.id} className="hover:shadow-lg transition-shadow duration-300">
              <CardHeader>
                <div className="flex items-start justify-between mb-2">
                  <div>
                    <CardTitle className="text-xl">{rental.vehicle_model}</CardTitle>
                    <p className="text-sm text-muted-foreground mt-1">{rental.provider_name}</p>
                  </div>
                  <div className="bg-primary/10 px-3 py-1 rounded-full">
                    <span className="text-sm font-semibold text-primary capitalize">{rental.vehicle_type}</span>
                  </div>
                </div>
                <div className="text-2xl font-bold text-primary">{rental.price_per_day}/day</div>
              </CardHeader>
              
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  {rental.features?.map((feature, idx) => (
                    <div key={idx} className="flex items-center gap-2 text-sm">
                      <Check className="h-4 w-4 text-primary flex-shrink-0" />
                      <span>{feature}</span>
                    </div>
                  ))}
                </div>

                <div className="pt-4 border-t space-y-2">
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <MapPin className="h-4 w-4" />
                    <span>{rental.location}</span>
                  </div>
                  <Button 
                    className="w-full"
                    onClick={() => window.open(`tel:${rental.contact_number}`, '_self')}
                  >
                    <Phone className="h-4 w-4 mr-2" />
                    Call {rental.contact_number}
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default RentalsSection;