import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Star, Phone, Clock, Shield, Award, ChevronRight, Wind, Mountain } from 'lucide-react';
import { paraglidingCompanies } from '@/data/siteData';
import { Link } from 'react-router-dom';

const ParaglidingSection = () => {
  return (
    <section className="py-16 bg-gradient-to-b from-background to-muted/30">
      <div className="container px-4">
        {/* Section Header */}
        <div className="text-center mb-12">
          <Badge variant="outline" className="mb-4 px-4 py-1">
            <Wind className="w-3 h-3 mr-1" /> World-Class Flying
          </Badge>
          <h2 className="text-4xl font-bold mb-4">
            Paragliding in <span className="text-primary">Bir Billing</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Fly with the best! Choose from certified operators with thousands of safe flights. 
            All companies are verified and insured.
          </p>
        </div>

        {/* Featured Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
          {[
            { value: '2,400m', label: 'Takeoff Altitude', icon: Mountain },
            { value: '25-35 min', label: 'Flight Duration', icon: Clock },
            { value: '100%', label: 'Safety Record', icon: Shield },
            { value: 'World #2', label: 'Paragliding Site', icon: Award },
          ].map((stat, index) => (
            <div key={index} className="bg-card rounded-xl p-4 text-center border shadow-sm">
              <stat.icon className="w-6 h-6 mx-auto mb-2 text-primary" />
              <div className="text-2xl font-bold">{stat.value}</div>
              <div className="text-xs text-muted-foreground">{stat.label}</div>
            </div>
          ))}
        </div>

        {/* Companies Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {paraglidingCompanies.map((company) => (
            <Card key={company.id} className="overflow-hidden hover:shadow-xl transition-all duration-300 group">
              <div className="relative h-48 overflow-hidden">
                <img 
                  src={company.image} 
                  alt={company.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
                <div className="absolute top-3 right-3">
                  <Badge className="bg-white/90 text-foreground shadow-lg">
                    <Star className="w-3 h-3 mr-1 fill-yellow-400 text-yellow-400" />
                    {company.rating}
                  </Badge>
                </div>
                <div className="absolute bottom-3 left-3 right-3">
                  <h3 className="text-white font-bold text-xl mb-1">{company.name}</h3>
                  <p className="text-white/80 text-sm">{company.experience} Experience • {company.flights_completed} Flights</p>
                </div>
              </div>
              <CardContent className="p-4">
                <p className="text-muted-foreground text-sm mb-4 line-clamp-2">{company.description}</p>
                
                {/* Packages */}
                <div className="space-y-2 mb-4">
                  {company.packages.map((pkg, idx) => (
                    <div key={idx} className="flex items-center justify-between text-sm bg-muted/50 rounded-lg px-3 py-2">
                      <div>
                        <span className="font-medium">{pkg.name}</span>
                        <span className="text-muted-foreground ml-2 text-xs">({pkg.duration})</span>
                      </div>
                      <span className="font-bold text-primary">{pkg.price}</span>
                    </div>
                  ))}
                </div>

                {/* Features */}
                <div className="flex flex-wrap gap-1 mb-4">
                  {company.features.slice(0, 4).map((feature, idx) => (
                    <Badge key={idx} variant="outline" className="text-xs">
                      {feature}
                    </Badge>
                  ))}
                </div>

                {/* Actions */}
                <div className="flex gap-2">
                  <Button asChild className="flex-1" size="sm">
                    <a href={`tel:${company.phone}`}>
                      <Phone className="w-4 h-4 mr-1" />
                      Book Now
                    </a>
                  </Button>
                  <Button variant="outline" size="sm" asChild>
                    <a href={`https://${company.website}`} target="_blank" rel="noopener noreferrer">
                      Website
                    </a>
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* CTA */}
        <div className="mt-12 text-center">
          <Link to="/activities">
            <Button size="lg" className="px-8">
              View All Adventure Activities
              <ChevronRight className="w-4 h-4 ml-1" />
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default ParaglidingSection;
