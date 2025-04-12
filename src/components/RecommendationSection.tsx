
import React, { useState } from 'react';
import { ArrowRight, Calendar, Users, Mountain, Clock } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

const RecommendationSection = () => {
  const [userPreferences, setUserPreferences] = useState({
    days: 2,
    people: 'couple',
    interest: 'adventure',
  });

  // Activity type definitions with day property explicitly marked as optional
  type DayActivity = {
    day?: string;
    time: string;
    activity: string;
    description: string;
  };

  type InterestActivities = {
    title: string;
    activities: DayActivity[];
  };

  const recommendations = {
    oneDay: {
      adventure: {
        title: 'Adventure Day Trip',
        activities: [
          { time: '7:00 AM', activity: 'Breakfast at Silver Lining Cafe', description: 'Start with a hearty breakfast and coffee' },
          { time: '8:30 AM', activity: 'Paragliding at Billing', description: 'Tandem paragliding experience with certified pilots' },
          { time: '12:00 PM', activity: 'Lunch at Garden Cafe', description: 'Enjoy local cuisine with mountain views' },
          { time: '2:00 PM', activity: 'Mountain Biking', description: 'Guided mountain biking adventure through forest trails' },
          { time: '5:00 PM', activity: 'Sunset at Billing Sunset Point', description: 'Witness spectacular Himalayan sunset' },
          { time: '7:00 PM', activity: 'Dinner at Musafir Restaurant', description: 'Traditional Himachali dinner experience' }
        ]
      },
      culture: {
        title: 'Cultural Exploration',
        activities: [
          { time: '8:00 AM', activity: 'Breakfast at Gliders Rooftop', description: 'Start with mountain views and fresh breakfast' },
          { time: '9:30 AM', activity: 'Visit Deer Park Institute', description: 'Center for study of classical Indian wisdom traditions' },
          { time: '11:30 AM', activity: 'Explore Chokling Monastery', description: 'Beautiful monastery with traditional architecture' },
          { time: '1:00 PM', activity: 'Lunch at Nyingma Kitchen', description: 'Authentic Tibetan cuisine' },
          { time: '3:00 PM', activity: 'Bir Tea Gardens', description: 'Walk through scenic tea plantations' },
          { time: '5:00 PM', activity: 'Sunset at Billing', description: 'Enjoy panoramic mountain views' },
          { time: '7:30 PM', activity: 'Dinner at Four Tables', description: 'Fusion cuisine in cozy setting' }
        ]
      },
      relaxation: {
        title: 'Relaxation Retreat',
        activities: [
          { time: '8:00 AM', activity: 'Morning Yoga at Deer Park', description: 'Guided yoga session in serene surroundings' },
          { time: '9:30 AM', activity: 'Breakfast at June 16 Cafe', description: 'Organic breakfast options' },
          { time: '11:00 AM', activity: 'Meditation Session', description: 'Guided meditation at a local center' },
          { time: '1:00 PM', activity: 'Lunch at Garden Cafe', description: 'Healthy meal with garden views' },
          { time: '3:00 PM', activity: 'Nature Walk', description: 'Gentle hike through pine forests' },
          { time: '5:00 PM', activity: 'Tea at Hangout Cafe', description: 'Relaxing evening tea with mountain views' },
          { time: '7:00 PM', activity: 'Dinner at Nyingma Kitchen', description: 'Calming dinner experience with traditional food' }
        ]
      }
    },
    twoDays: {
      adventure: {
        title: '2-Day Adventure Package',
        activities: [
          { day: 'Day 1', time: '7:00 AM', activity: 'Breakfast at Silver Lining Cafe', description: 'Fuel up for adventure' },
          { day: 'Day 1', time: '8:30 AM', activity: 'Paragliding at Billing', description: 'Experience the thrill of flying' },
          { day: 'Day 1', time: '12:00 PM', activity: 'Lunch at Landing Site Cafe', description: 'Quick refreshments' },
          { day: 'Day 1', time: '2:00 PM', activity: 'Hike to Billing', description: 'Scenic uphill trek' },
          { day: 'Day 1', time: '7:00 PM', activity: 'Dinner and overnight stay', description: "At Colonel's Resort" },
          { day: 'Day 2', time: '7:00 AM', activity: 'Breakfast', description: 'At accommodation' },
          { day: 'Day 2', time: '8:30 AM', activity: 'Mountain Biking', description: 'Through forest trails' },
          { day: 'Day 2', time: '1:00 PM', activity: 'Lunch at Four Tables', description: 'Refuel with great food' },
          { day: 'Day 2', time: '3:00 PM', activity: 'Rappelling', description: 'Adventure activity with guides' },
          { day: 'Day 2', time: '7:00 PM', activity: 'Farewell dinner', description: 'At Musafir Restaurant' }
        ]
      },
      culture: {
        title: '2-Day Cultural Immersion',
        activities: [
          { day: 'Day 1', time: '8:00 AM', activity: 'Breakfast at Gliders Rooftop', description: 'Start with local cuisine' },
          { day: 'Day 1', time: '9:30 AM', activity: 'Chokling Monastery', description: 'Learn about Buddhist traditions' },
          { day: 'Day 1', time: '1:00 PM', activity: 'Lunch at Nyingma Kitchen', description: 'Traditional Tibetan cuisine' },
          { day: 'Day 1', time: '3:00 PM', activity: 'Sherab Ling Monastery', description: 'Visit impressive monastery complex' },
          { day: 'Day 1', time: '7:00 PM', activity: 'Dinner and overnight stay', description: 'At Himalayan Nest Homestay' },
          { day: 'Day 2', time: '7:30 AM', activity: 'Breakfast', description: 'At accommodation' },
          { day: 'Day 2', time: '9:00 AM', activity: 'Deer Park Institute', description: 'Study of classical Indian wisdom' },
          { day: 'Day 2', time: '12:30 PM', activity: 'Lunch at Garden Cafe', description: 'Organic local meal' },
          { day: 'Day 2', time: '2:30 PM', activity: 'Local Handicraft Shopping', description: 'Explore Tibetan Handicraft Center' },
          { day: 'Day 2', time: '5:00 PM', activity: 'Tea Gardens Tour', description: 'Learn about tea production' },
          { day: 'Day 2', time: '7:30 PM', activity: 'Cultural dinner', description: 'With traditional music at Four Tables' }
        ]
      },
      relaxation: {
        title: '2-Day Wellness Retreat',
        activities: [
          { day: 'Day 1', time: '7:00 AM', activity: 'Morning Yoga', description: 'Start the day with rejuvenation' },
          { day: 'Day 1', time: '8:30 AM', activity: 'Breakfast at June 16 Cafe', description: 'Healthy organic options' },
          { day: 'Day 1', time: '10:00 AM', activity: 'Guided Meditation', description: 'At Deer Park Institute' },
          { day: 'Day 1', time: '1:00 PM', activity: 'Lunch at Garden Cafe', description: 'Farm-to-table experience' },
          { day: 'Day 1', time: '3:00 PM', activity: 'Nature Walk', description: 'Through pine forests and tea gardens' },
          { day: 'Day 1', time: '7:00 PM', activity: 'Dinner and overnight stay', description: "At The Monk's Retreat" },
          { day: 'Day 2', time: '6:30 AM', activity: 'Sunrise Meditation', description: 'Peaceful morning practice' },
          { day: 'Day 2', time: '8:00 AM', activity: 'Breakfast', description: 'At accommodation' },
          { day: 'Day 2', time: '10:00 AM', activity: 'Ayurvedic Massage', description: 'Rejuvenating body treatment' },
          { day: 'Day 2', time: '1:00 PM', activity: 'Lunch at Nyingma Kitchen', description: 'Balanced, healthy meal' },
          { day: 'Day 2', time: '3:00 PM', activity: 'Pottery Workshop', description: 'Mindful creative activity' },
          { day: 'Day 2', time: '6:00 PM', activity: 'Farewell dinner', description: 'At Silver Lining Cafe' }
        ]
      }
    }
  };

  // Determine which recommendation set to display based on current preferences
  const currentRecommendation = userPreferences.days === 1 
    ? recommendations.oneDay[userPreferences.interest as keyof typeof recommendations.oneDay]
    : recommendations.twoDays[userPreferences.interest as keyof typeof recommendations.twoDays];

  return (
    <section className="py-16 bg-muted">
      <div className="container mx-auto px-4">
        <div className="text-center mb-10">
          <h2 className="text-3xl font-bold mb-4">AI Travel Recommendations</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Get personalized itineraries based on your preferences. Our AI analyzes weather, crowd levels, and your interests to create the perfect Bir Billing experience.
          </p>
        </div>
        
        {/* Preference Selectors */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-10 max-w-3xl mx-auto">
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center mb-2">
                <Calendar className="h-5 w-5 text-primary mr-2" />
                <h3 className="font-medium">Duration</h3>
              </div>
              <Tabs defaultValue="2" onValueChange={(value) => setUserPreferences({...userPreferences, days: Number(value)})}>
                <TabsList className="grid grid-cols-2">
                  <TabsTrigger value="1">1 Day</TabsTrigger>
                  <TabsTrigger value="2">2 Days</TabsTrigger>
                </TabsList>
              </Tabs>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center mb-2">
                <Users className="h-5 w-5 text-primary mr-2" />
                <h3 className="font-medium">Group Type</h3>
              </div>
              <Tabs defaultValue="couple" onValueChange={(value) => setUserPreferences({...userPreferences, people: value})}>
                <TabsList className="grid grid-cols-3">
                  <TabsTrigger value="solo">Solo</TabsTrigger>
                  <TabsTrigger value="couple">Couple</TabsTrigger>
                  <TabsTrigger value="family">Family</TabsTrigger>
                </TabsList>
              </Tabs>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center mb-2">
                <Mountain className="h-5 w-5 text-primary mr-2" />
                <h3 className="font-medium">Main Interest</h3>
              </div>
              <Tabs defaultValue="adventure" onValueChange={(value) => setUserPreferences({...userPreferences, interest: value})}>
                <TabsList className="grid grid-cols-3">
                  <TabsTrigger value="adventure">Adventure</TabsTrigger>
                  <TabsTrigger value="culture">Culture</TabsTrigger>
                  <TabsTrigger value="relaxation">Relax</TabsTrigger>
                </TabsList>
              </Tabs>
            </CardContent>
          </Card>
        </div>
        
        {/* Recommendations */}
        <Card className="bg-card shadow-lg max-w-4xl mx-auto">
          <CardContent className="p-6">
            <h3 className="text-2xl font-bold mb-4">{currentRecommendation.title}</h3>
            <div className="space-y-4">
              {currentRecommendation.activities.map((item: DayActivity, index: number) => (
                <div key={index} className="flex">
                  <div className="mr-4 flex flex-col items-center">
                    <div className="rounded-full bg-primary w-8 h-8 flex items-center justify-center text-white text-sm">
                      {index + 1}
                    </div>
                    {index < currentRecommendation.activities.length - 1 && (
                      <div className="w-0.5 h-full bg-muted mt-1"></div>
                    )}
                  </div>
                  <div className="flex-1 pb-4">
                    <div className="flex items-start justify-between">
                      <div>
                        <h4 className="font-bold">{item.activity}</h4>
                        <p className="text-sm text-muted-foreground">{item.description}</p>
                      </div>
                      <div className="flex items-center text-sm">
                        {item.day && (
                          <span className="text-secondary font-medium mr-2">{item.day}</span>
                        )}
                        <Clock className="h-3 w-3 text-muted-foreground mr-1" />
                        <span className="text-muted-foreground">{item.time}</span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            
            <div className="mt-6 flex justify-center">
              <Button className="bg-primary hover:bg-primary/90">
                Save This Itinerary
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  );
};

export default RecommendationSection;
