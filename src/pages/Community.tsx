import React, { useState } from 'react';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { MessageCircle, Users, Send } from 'lucide-react';

const Community = () => {
  const [message, setMessage] = useState('');

  const chatCategories = [
    {
      id: 'pilots',
      name: 'Pilots Chat',
      description: 'Connect with fellow paragliding pilots',
      icon: '🪂',
      members: 234
    },
    {
      id: 'travelers',
      name: 'Travelers',
      description: 'Share tips and experiences',
      icon: '🎒',
      members: 456
    },
    {
      id: 'local-guides',
      name: 'Local Guides',
      description: 'Get advice from locals',
      icon: '🗺️',
      members: 89
    },
    {
      id: 'accommodation',
      name: 'Accommodation',
      description: 'Discuss stays and hotels',
      icon: '🏨',
      members: 178
    },
    {
      id: 'trekking',
      name: 'Trekking & Hiking',
      description: 'Plan your next trek',
      icon: '⛰️',
      members: 312
    },
    {
      id: 'food',
      name: 'Food & Cafes',
      description: 'Share dining experiences',
      icon: '☕',
      members: 267
    }
  ];

  const sampleMessages = [
    { user: 'Amit Kumar', message: 'Best season to visit is October-November for perfect flying conditions!', time: '2h ago' },
    { user: 'Sarah Lee', message: 'Anyone interested in a group trek to Rajgundha this weekend?', time: '4h ago' },
    { user: 'Rahul Sharma', message: 'Just landed at Bir after an amazing 45-minute flight from Billing!', time: '6h ago' },
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <Navigation />
      <main className="flex-1 pt-16">
        <div className="container mx-auto px-4 py-12">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <h1 className="text-4xl font-bold mb-4">Join Our Community</h1>
              <p className="text-muted-foreground text-lg">
                Connect with pilots, travelers, and locals. Share experiences, get tips, and plan adventures together.
              </p>
            </div>

            <Tabs defaultValue="pilots" className="w-full">
              <TabsList className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 w-full mb-8">
                {chatCategories.map(category => (
                  <TabsTrigger key={category.id} value={category.id} className="text-xs md:text-sm">
                    <span className="mr-1">{category.icon}</span>
                    <span className="hidden md:inline">{category.name}</span>
                  </TabsTrigger>
                ))}
              </TabsList>

              {chatCategories.map(category => (
                <TabsContent key={category.id} value={category.id}>
                  <div className="grid md:grid-cols-[300px_1fr] gap-6">
                    {/* Category Info Sidebar */}
                    <Card className="p-6 h-fit">
                      <div className="text-4xl mb-4 text-center">{category.icon}</div>
                      <h3 className="font-semibold text-xl mb-2">{category.name}</h3>
                      <p className="text-muted-foreground text-sm mb-4">{category.description}</p>
                      <div className="flex items-center text-sm text-muted-foreground">
                        <Users className="h-4 w-4 mr-2" />
                        {category.members} members
                      </div>
                    </Card>

                    {/* Chat Area */}
                    <Card className="p-6 flex flex-col h-[600px]">
                      <div className="flex items-center justify-between mb-6 pb-4 border-b border-border">
                        <h3 className="font-semibold text-lg flex items-center">
                          <MessageCircle className="h-5 w-5 mr-2 text-primary" />
                          {category.name}
                        </h3>
                      </div>

                      {/* Messages */}
                      <div className="flex-1 overflow-y-auto space-y-4 mb-4">
                        {sampleMessages.map((msg, idx) => (
                          <div key={idx} className="bg-muted p-4 rounded-lg">
                            <div className="flex justify-between items-start mb-2">
                              <span className="font-medium text-sm">{msg.user}</span>
                              <span className="text-xs text-muted-foreground">{msg.time}</span>
                            </div>
                            <p className="text-sm">{msg.message}</p>
                          </div>
                        ))}
                        <div className="text-center py-8 text-muted-foreground">
                          <MessageCircle className="h-12 w-12 mx-auto mb-3 opacity-50" />
                          <p className="text-sm">Chat functionality coming soon!</p>
                          <p className="text-xs mt-2">Real-time messaging will be available shortly</p>
                        </div>
                      </div>

                      {/* Message Input */}
                      <div className="flex gap-2 pt-4 border-t border-border">
                        <Input
                          placeholder="Type your message..."
                          value={message}
                          onChange={(e) => setMessage(e.target.value)}
                          disabled
                          className="flex-1"
                        />
                        <Button disabled>
                          <Send className="h-4 w-4" />
                        </Button>
                      </div>
                    </Card>
                  </div>
                </TabsContent>
              ))}
            </Tabs>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Community;
