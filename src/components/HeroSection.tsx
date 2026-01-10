import React from 'react';
import { ArrowRight, MapPin, Mountain, Wind, TreePine, Calendar, Star, Users } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

const HeroSection = () => {
  const stats = [
    { icon: Wind, value: '2000+', label: 'Flights/Year' },
    { icon: Mountain, value: '2400m', label: 'Altitude' },
    { icon: Star, value: '4.9', label: 'Rating' },
    { icon: Users, value: '50K+', label: 'Happy Visitors' },
  ];

  const adventures = [
    { 
      title: 'Paragliding', 
      image: 'https://images.unsplash.com/photo-1503220317375-aaad61436b1b?q=80&w=800&auto=format&fit=crop',
      link: '/activities',
      price: 'From ₹2,500'
    },
    { 
      title: 'Trekking', 
      image: 'https://images.unsplash.com/photo-1551632811-561732d1e306?q=80&w=800&auto=format&fit=crop',
      link: '/treks',
      price: 'From ₹1,500'
    },
    { 
      title: 'Camping', 
      image: 'https://images.unsplash.com/photo-1504280390367-361c6d9f38f4?q=80&w=800&auto=format&fit=crop',
      link: '/accommodations',
      price: 'From ₹1,200'
    },
  ];

  return (
    <div className="relative min-h-screen w-full overflow-hidden">
      {/* Hero Video/Image Background */}
      <div className="absolute inset-0 z-0">
        <img 
          src="https://images.unsplash.com/photo-1503220317375-aaad61436b1b?q=80&w=2070&auto=format&fit=crop" 
          alt="Paragliding over Bir Billing with Himalayan backdrop" 
          className="w-full h-full object-cover"
        />
        <div className="hero-overlay"></div>
      </div>
      
      {/* Animated Background Elements */}
      <div className="absolute inset-0 z-[1] overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-64 h-64 bg-primary/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-40 right-20 w-96 h-96 bg-secondary/20 rounded-full blur-3xl animate-pulse" style={{animationDelay: '1s'}}></div>
      </div>
      
      {/* Hero Content */}
      <div className="relative z-10 min-h-screen flex flex-col">
        {/* Main Hero Content */}
        <div className="flex-1 container flex flex-col justify-center items-center text-white text-center px-4 pt-24 pb-8">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-md border border-white/20 mb-6 animate-fade-in">
            <MapPin className="w-4 h-4 text-secondary" />
            <span className="text-sm font-medium">Himachal Pradesh, India</span>
          </div>
          
          <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold tracking-tight mb-4 animate-fade-in">
            Bir Billing
          </h1>
          
          <p className="text-xl sm:text-2xl md:text-3xl font-light max-w-3xl mb-4 animate-fade-in" style={{animationDelay: '0.1s'}}>
            Paragliding Capital of India
          </p>
          
          <p className="text-base sm:text-lg text-white/80 max-w-2xl mb-8 animate-fade-in" style={{animationDelay: '0.2s'}}>
            Experience world-class paragliding, breathtaking treks, serene monasteries, and authentic Himalayan hospitality in one magical destination.
          </p>
          
          {/* CTA Buttons */}
          <div className="flex flex-wrap gap-4 justify-center mb-12 animate-fade-in" style={{animationDelay: '0.3s'}}>
            <Link to="/activities">
              <Button 
                size="lg" 
                className="bg-secondary hover:bg-secondary/90 text-secondary-foreground font-semibold px-8 py-6 text-lg shadow-2xl hover:shadow-secondary/25 hover:scale-105 transition-all duration-300"
              >
                Book Paragliding
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
            <Link to="/explore">
              <Button 
                size="lg" 
                variant="outline" 
                className="bg-white/10 backdrop-blur-md hover:bg-white/20 border-white/30 text-white font-semibold px-8 py-6 text-lg hover:scale-105 transition-all duration-300"
              >
                Explore Destinations
              </Button>
            </Link>
          </div>

          {/* Stats Section */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 w-full max-w-3xl animate-fade-in" style={{animationDelay: '0.4s'}}>
            {stats.map((stat, index) => (
              <div key={index} className="stat-card">
                <stat.icon className="w-5 h-5 mx-auto mb-2 text-secondary" />
                <div className="text-2xl md:text-3xl font-bold">{stat.value}</div>
                <div className="text-xs md:text-sm text-white/70">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Quick Adventure Cards */}
        <div className="container px-4 pb-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 max-w-4xl mx-auto animate-fade-in" style={{animationDelay: '0.5s'}}>
            {adventures.map((adventure, index) => (
              <Link key={index} to={adventure.link} className="group">
                <div className="relative h-32 md:h-40 rounded-xl overflow-hidden cursor-pointer">
                  <img 
                    src={adventure.image} 
                    alt={adventure.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent"></div>
                  <div className="absolute bottom-0 left-0 right-0 p-4">
                    <h3 className="text-white font-bold text-lg">{adventure.title}</h3>
                    <p className="text-secondary text-sm font-semibold">{adventure.price}</p>
                  </div>
                  <div className="absolute top-3 right-3 bg-white/20 backdrop-blur-md rounded-full p-2 opacity-0 group-hover:opacity-100 transition-opacity">
                    <ArrowRight className="w-4 h-4 text-white" />
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="pb-6 flex justify-center animate-bounce">
          <div className="w-6 h-10 border-2 border-white/50 rounded-full flex items-start justify-center p-2">
            <div className="w-1.5 h-3 bg-white/70 rounded-full"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
