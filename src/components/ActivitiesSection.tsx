import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { MapPin, Clock, Mountain, ArrowRight, Zap, Star, Users } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { activities } from '@/data/siteData';
import { Badge } from '@/components/ui/badge';

const ActivitiesSection = () => {
  const navigate = useNavigate();

  const getDifficultyColor = (difficulty: string) => {
    switch(difficulty.toLowerCase()) {
      case 'easy': return 'bg-green-500';
      case 'moderate': return 'bg-yellow-500';
      case 'challenging': return 'bg-orange-500';
      case 'difficult': return 'bg-red-500';
      default: return 'bg-primary';
    }
  };

  return (
    <section className="py-24 bg-gradient-to-b from-background to-muted/30">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-secondary/10 text-secondary mb-4">
            <Zap className="h-4 w-4" />
            <span className="text-sm font-semibold">Adventures Await</span>
          </div>
          <h2 className="section-title">Things to Do</h2>
          <p className="section-subtitle">
            Adventure awaits! From world-class paragliding to peaceful meditation, discover experiences that make Bir Billing unforgettable.
          </p>
        </div>

        {/* Featured Activity - Paragliding */}
        <div className="mb-12">
          <div className="relative rounded-2xl overflow-hidden group cursor-pointer" onClick={() => navigate('/activities')}>
            <div className="h-[400px] md:h-[500px]">
              <img 
                src="https://images.unsplash.com/photo-1503220317375-aaad61436b1b?q=80&w=2070&auto=format&fit=crop"
                alt="Paragliding in Bir Billing"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
              />
            </div>
            <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/50 to-transparent"></div>
            <div className="absolute inset-0 flex items-center">
              <div className="px-8 md:px-16 max-w-2xl">
                <Badge className="bg-secondary text-secondary-foreground mb-4">Most Popular</Badge>
                <h3 className="text-4xl md:text-5xl font-bold text-white mb-4">Paragliding Experience</h3>
                <p className="text-white/90 text-lg mb-6">
                  Soar like a bird over the majestic Dhauladhar range. Bir Billing is ranked as the 2nd best paragliding site in the world!
                </p>
                <div className="flex flex-wrap gap-4 mb-6">
                  <div className="flex items-center gap-2 text-white/80">
                    <Clock className="h-5 w-5" />
                    <span>20-30 min flight</span>
                  </div>
                  <div className="flex items-center gap-2 text-white/80">
                    <MapPin className="h-5 w-5" />
                    <span>Billing Takeoff</span>
                  </div>
                  <div className="flex items-center gap-2 text-white/80">
                    <Star className="h-5 w-5 text-yellow-400" />
                    <span>4.9 Rating</span>
                  </div>
                </div>
                <Button size="lg" className="bg-secondary hover:bg-secondary/90 text-secondary-foreground">
                  Book from ₹2,500
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </div>
            </div>
          </div>
        </div>

        {/* Activity Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {activities.slice(1).map((activity) => (
            <Card key={activity.id} className="group overflow-hidden hover:shadow-xl transition-all duration-300 border-0 bg-card hover:-translate-y-1">
              <div className="relative h-52 overflow-hidden">
                <img 
                  src={activity.image} 
                  alt={activity.name}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute top-3 left-3">
                  <Badge className={`${getDifficultyColor(activity.difficulty)} text-white border-0`}>
                    {activity.difficulty}
                  </Badge>
                </div>
                <div className="absolute top-3 right-3">
                  <div className="bg-white/90 backdrop-blur-sm rounded-full px-3 py-1 text-sm font-bold text-primary">
                    {activity.price}
                  </div>
                </div>
              </div>
              
              <CardContent className="p-5">
                <h3 className="font-bold text-lg mb-2 group-hover:text-primary transition-colors">{activity.name}</h3>
                <p className="text-muted-foreground text-sm mb-4 line-clamp-2">{activity.description}</p>
                
                <div className="flex items-center gap-4 text-sm text-muted-foreground mb-4">
                  <div className="flex items-center gap-1.5">
                    <Clock className="h-4 w-4 text-primary" />
                    <span>{activity.duration}</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <Users className="h-4 w-4 text-primary" />
                    <span>All ages</span>
                  </div>
                </div>
                
                <Button className="w-full premium-button" onClick={() => navigate('/activities')}>
                  Book Now
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="text-center mt-14">
          <Button variant="outline" size="lg" onClick={() => navigate('/activities')} className="px-8 py-6 text-base">
            View All Activities
            <ArrowRight className="ml-2 h-5 w-5" />
          </Button>
        </div>
      </div>
    </section>
  );
};

export default ActivitiesSection;
