import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { MapPin, Clock, Mountain, ArrowRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { activities } from '@/data/siteData';
import { Badge } from '@/components/ui/badge';

const ActivitiesSection = () => {
  const navigate = useNavigate();

  return (
    <section className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <Mountain className="h-12 w-12 text-primary mx-auto mb-4" />
          <h2 className="text-4xl font-bold mb-4 text-foreground">Things to Do</h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Adventure awaits! From paragliding to meditation, discover experiences that make Bir Billing unforgettable.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {activities.map((activity) => (
            <Card key={activity.id} className="group overflow-hidden hover:shadow-xl transition-all duration-300">
              <div className="relative h-48 overflow-hidden">
                <img 
                  src={activity.image} 
                  alt={activity.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute top-3 left-3">
                  <Badge className="bg-primary">{activity.difficulty}</Badge>
                </div>
                <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-black/70 to-transparent p-4">
                  <span className="text-white font-bold text-xl">{activity.price}</span>
                </div>
              </div>
              
              <CardContent className="p-5">
                <h3 className="font-bold text-lg mb-2">{activity.name}</h3>
                <p className="text-muted-foreground text-sm mb-4 line-clamp-2">{activity.description}</p>
                
                <div className="flex items-center gap-4 text-sm text-muted-foreground mb-4">
                  <div className="flex items-center gap-1">
                    <Clock className="h-4 w-4" />
                    <span>{activity.duration}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <MapPin className="h-4 w-4" />
                    <span className="truncate">{activity.location}</span>
                  </div>
                </div>
                
                <Button className="w-full">Book Now</Button>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="text-center mt-10">
          <Button variant="outline" size="lg" onClick={() => navigate('/activities')}>
            View All Activities
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </div>
      </div>
    </section>
  );
};

export default ActivitiesSection;
