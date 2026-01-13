import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Sparkles, Calendar, Users, X, Wallet, Heart, Loader2, MapPin, Clock, ChevronDown, ChevronUp } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { Badge } from '@/components/ui/badge';
import { ScrollArea } from '@/components/ui/scroll-area';

const CHAT_URL = `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/ai-trip-planner`;

interface TripDay {
  day: number;
  theme: string;
  activities: {
    time: string;
    activity: string;
    description: string;
    location: string;
    cost: string;
    duration: string;
  }[];
  meals: {
    breakfast: { place: string; suggestion: string };
    lunch: { place: string; suggestion: string };
    dinner: { place: string; suggestion: string };
  };
  accommodation: { name: string; type: string; price: string };
}

interface TripPlan {
  title: string;
  summary: string;
  days: TripDay[];
  totalBudget: {
    accommodation: string;
    activities: string;
    food: string;
    transport: string;
    total: string;
  };
  tips: string[];
}

const CompactAIPlanner = ({ onClose }: { onClose?: () => void }) => {
  const [days, setDays] = useState('3');
  const [people, setPeople] = useState('2');
  const [budget, setBudget] = useState<'budget' | 'mid-range' | 'luxury'>('mid-range');
  const [travelStyle, setTravelStyle] = useState<'adventure' | 'relaxed' | 'cultural' | 'mixed'>('mixed');
  const [interests, setInterests] = useState<string[]>(['Paragliding']);
  const [accommodation, setAccommodation] = useState<'hostel' | 'homestay' | 'hotel' | 'camping'>('hotel');
  const [isLoading, setIsLoading] = useState(false);
  const [tripPlan, setTripPlan] = useState<TripPlan | null>(null);
  const [streamingContent, setStreamingContent] = useState('');
  const [expandedDay, setExpandedDay] = useState<number | null>(1);
  const { toast } = useToast();

  const interestOptions = ['Paragliding', 'Trekking', 'Monasteries', 'Cafes', 'Yoga', 'Photography', 'Camping', 'Local Food'];
  const budgetOptions = [
    { value: 'budget', label: 'Budget', icon: '💰' },
    { value: 'mid-range', label: 'Mid-Range', icon: '💵' },
    { value: 'luxury', label: 'Luxury', icon: '💎' },
  ];
  const styleOptions = [
    { value: 'adventure', label: 'Adventure', icon: '🪂' },
    { value: 'relaxed', label: 'Relaxed', icon: '🧘' },
    { value: 'cultural', label: 'Cultural', icon: '🏛️' },
    { value: 'mixed', label: 'Mixed', icon: '✨' },
  ];
  const accommodationOptions = [
    { value: 'hostel', label: 'Hostel' },
    { value: 'homestay', label: 'Homestay' },
    { value: 'hotel', label: 'Hotel' },
    { value: 'camping', label: 'Camping' },
  ];

  const toggleInterest = (interest: string) => {
    setInterests(prev => 
      prev.includes(interest) 
        ? prev.filter(i => i !== interest)
        : [...prev, interest]
    );
  };

  const handlePlan = async () => {
    if (interests.length === 0) {
      toast({
        title: "Please select interests",
        description: "Select at least one interest to generate your itinerary",
        variant: "destructive"
      });
      return;
    }

    setIsLoading(true);
    setStreamingContent('');
    setTripPlan(null);

    try {
      const resp = await fetch(CHAT_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY}`,
        },
        body: JSON.stringify({ days, people, budget, travelStyle, interests, accommodation }),
      });

      if (resp.status === 429) {
        toast({
          title: "Too many requests",
          description: "Please wait a moment and try again.",
          variant: "destructive"
        });
        setIsLoading(false);
        return;
      }

      if (resp.status === 402) {
        toast({
          title: "Service temporarily unavailable",
          description: "AI service is busy. Please try again later.",
          variant: "destructive"
        });
        setIsLoading(false);
        return;
      }

      if (!resp.ok || !resp.body) {
        throw new Error("Failed to start stream");
      }

      const reader = resp.body.getReader();
      const decoder = new TextDecoder();
      let textBuffer = "";
      let fullContent = "";
      let streamDone = false;

      while (!streamDone) {
        const { done, value } = await reader.read();
        if (done) break;
        textBuffer += decoder.decode(value, { stream: true });

        let newlineIndex: number;
        while ((newlineIndex = textBuffer.indexOf("\n")) !== -1) {
          let line = textBuffer.slice(0, newlineIndex);
          textBuffer = textBuffer.slice(newlineIndex + 1);

          if (line.endsWith("\r")) line = line.slice(0, -1);
          if (line.startsWith(":") || line.trim() === "") continue;
          if (!line.startsWith("data: ")) continue;

          const jsonStr = line.slice(6).trim();
          if (jsonStr === "[DONE]") {
            streamDone = true;
            break;
          }

          try {
            const parsed = JSON.parse(jsonStr);
            const content = parsed.choices?.[0]?.delta?.content as string | undefined;
            if (content) {
              fullContent += content;
              setStreamingContent(fullContent);
            }
          } catch {
            textBuffer = line + "\n" + textBuffer;
            break;
          }
        }
      }

      // Try to parse the JSON from the content
      const jsonMatch = fullContent.match(/\{[\s\S]*\}/);
      if (jsonMatch) {
        try {
          const plan = JSON.parse(jsonMatch[0]);
          setTripPlan(plan);
          toast({
            title: "Itinerary Generated! 🎉",
            description: `Your ${days}-day Bir Billing adventure is ready!`,
          });
        } catch (e) {
          console.error("Failed to parse trip plan:", e);
          toast({
            title: "Generated with formatting issues",
            description: "We generated a plan but had trouble parsing it. See the raw output below.",
          });
        }
      }

    } catch (error) {
      console.error("AI Planner error:", error);
      toast({
        title: "Failed to generate",
        description: "Something went wrong. Please try again.",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

  const resetPlanner = () => {
    setTripPlan(null);
    setStreamingContent('');
  };

  if (tripPlan) {
    return (
      <Card className="shadow-2xl border-2 border-primary/20 max-h-[85vh] flex flex-col bg-background/95 backdrop-blur-lg">
        <CardHeader className="pb-2 flex-shrink-0">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Sparkles className="h-5 w-5 text-primary" />
              <CardTitle className="text-lg">{tripPlan.title}</CardTitle>
            </div>
            {onClose && (
              <Button variant="ghost" size="icon" className="h-8 w-8" onClick={onClose}>
                <X className="h-4 w-4" />
              </Button>
            )}
          </div>
          <p className="text-sm text-muted-foreground mt-1">{tripPlan.summary}</p>
        </CardHeader>
        <ScrollArea className="flex-1 px-4">
          <CardContent className="pt-2 pb-4 px-0 space-y-4">
            {/* Days */}
            {tripPlan.days.map((day) => (
              <div key={day.day} className="border rounded-lg overflow-hidden">
                <button
                  onClick={() => setExpandedDay(expandedDay === day.day ? null : day.day)}
                  className="w-full flex items-center justify-between p-3 bg-muted/50 hover:bg-muted transition-colors"
                >
                  <div className="flex items-center gap-2">
                    <Badge variant="secondary" className="rounded-full">Day {day.day}</Badge>
                    <span className="font-medium text-sm">{day.theme}</span>
                  </div>
                  {expandedDay === day.day ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
                </button>
                {expandedDay === day.day && (
                  <div className="p-3 space-y-3">
                    {day.activities.map((activity, idx) => (
                      <div key={idx} className="flex gap-3 text-sm">
                        <div className="text-xs text-muted-foreground w-16 flex-shrink-0">{activity.time}</div>
                        <div className="flex-1">
                          <p className="font-medium">{activity.activity}</p>
                          <p className="text-muted-foreground text-xs">{activity.description}</p>
                          <div className="flex items-center gap-3 mt-1 text-xs text-muted-foreground">
                            <span className="flex items-center gap-1"><MapPin className="h-3 w-3" /> {activity.location}</span>
                            <span className="flex items-center gap-1"><Clock className="h-3 w-3" /> {activity.duration}</span>
                            <span className="text-primary font-medium">{activity.cost}</span>
                          </div>
                        </div>
                      </div>
                    ))}
                    <div className="border-t pt-2 mt-2">
                      <p className="text-xs font-medium mb-1">Meals</p>
                      <div className="grid grid-cols-3 gap-2 text-xs">
                        <div><span className="text-muted-foreground">Breakfast:</span> {day.meals.breakfast.place}</div>
                        <div><span className="text-muted-foreground">Lunch:</span> {day.meals.lunch.place}</div>
                        <div><span className="text-muted-foreground">Dinner:</span> {day.meals.dinner.place}</div>
                      </div>
                    </div>
                    <div className="text-xs">
                      <span className="text-muted-foreground">Stay:</span> {day.accommodation.name} ({day.accommodation.type}) - {day.accommodation.price}
                    </div>
                  </div>
                )}
              </div>
            ))}

            {/* Budget Summary */}
            <div className="bg-primary/5 rounded-lg p-3">
              <p className="text-sm font-medium mb-2">Estimated Budget</p>
              <div className="grid grid-cols-2 gap-2 text-xs">
                <div className="flex justify-between"><span>Accommodation:</span> <span>{tripPlan.totalBudget.accommodation}</span></div>
                <div className="flex justify-between"><span>Activities:</span> <span>{tripPlan.totalBudget.activities}</span></div>
                <div className="flex justify-between"><span>Food:</span> <span>{tripPlan.totalBudget.food}</span></div>
                <div className="flex justify-between"><span>Transport:</span> <span>{tripPlan.totalBudget.transport}</span></div>
              </div>
              <div className="border-t mt-2 pt-2 flex justify-between text-sm font-bold">
                <span>Total:</span> <span className="text-primary">{tripPlan.totalBudget.total}</span>
              </div>
            </div>

            {/* Tips */}
            <div>
              <p className="text-sm font-medium mb-2">Pro Tips</p>
              <ul className="text-xs space-y-1">
                {tripPlan.tips.map((tip, idx) => (
                  <li key={idx} className="flex items-start gap-2">
                    <span className="text-primary">•</span>
                    <span className="text-muted-foreground">{tip}</span>
                  </li>
                ))}
              </ul>
            </div>

            <Button onClick={resetPlanner} variant="outline" className="w-full">
              Plan Another Trip
            </Button>
          </CardContent>
        </ScrollArea>
      </Card>
    );
  }

  return (
    <Card className="shadow-2xl border-2 border-primary/20 max-h-[85vh] overflow-y-auto bg-background/95 backdrop-blur-lg">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="p-2 rounded-full bg-primary/10">
              <Sparkles className="h-5 w-5 text-primary" />
            </div>
            <div>
              <CardTitle className="text-lg">AI Trip Planner</CardTitle>
              <p className="text-xs text-muted-foreground">Powered by AI</p>
            </div>
          </div>
          {onClose && (
            <Button variant="ghost" size="icon" className="h-8 w-8" onClick={onClose}>
              <X className="h-4 w-4" />
            </Button>
          )}
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Days & People */}
        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className="text-xs font-medium mb-1.5 flex items-center gap-1">
              <Calendar className="h-3 w-3" />
              Days
            </label>
            <Input 
              type="number" 
              value={days}
              onChange={(e) => setDays(e.target.value)}
              min="1"
              max="14"
              className="h-9"
            />
          </div>
          <div>
            <label className="text-xs font-medium mb-1.5 flex items-center gap-1">
              <Users className="h-3 w-3" />
              People
            </label>
            <Input 
              type="number"
              value={people}
              onChange={(e) => setPeople(e.target.value)}
              min="1"
              max="20"
              className="h-9"
            />
          </div>
        </div>

        {/* Budget */}
        <div>
          <label className="text-xs font-medium mb-1.5 flex items-center gap-1">
            <Wallet className="h-3 w-3" />
            Budget Level
          </label>
          <div className="grid grid-cols-3 gap-2">
            {budgetOptions.map((option) => (
              <button
                key={option.value}
                onClick={() => setBudget(option.value as any)}
                className={`p-2 rounded-lg border text-xs font-medium transition-all ${
                  budget === option.value 
                    ? 'bg-primary text-primary-foreground border-primary' 
                    : 'bg-muted/50 hover:bg-muted border-transparent'
                }`}
              >
                <span className="block text-base mb-0.5">{option.icon}</span>
                {option.label}
              </button>
            ))}
          </div>
        </div>

        {/* Travel Style */}
        <div>
          <label className="text-xs font-medium mb-1.5 flex items-center gap-1">
            <Heart className="h-3 w-3" />
            Travel Style
          </label>
          <div className="grid grid-cols-4 gap-2">
            {styleOptions.map((option) => (
              <button
                key={option.value}
                onClick={() => setTravelStyle(option.value as any)}
                className={`p-2 rounded-lg border text-xs font-medium transition-all ${
                  travelStyle === option.value 
                    ? 'bg-primary text-primary-foreground border-primary' 
                    : 'bg-muted/50 hover:bg-muted border-transparent'
                }`}
              >
                <span className="block text-base mb-0.5">{option.icon}</span>
                {option.label}
              </button>
            ))}
          </div>
        </div>

        {/* Interests */}
        <div>
          <label className="text-xs font-medium mb-1.5">Interests</label>
          <div className="flex flex-wrap gap-1.5">
            {interestOptions.map((interest) => (
              <Badge
                key={interest}
                variant={interests.includes(interest) ? "default" : "outline"}
                className="cursor-pointer hover:opacity-80 transition-opacity text-xs"
                onClick={() => toggleInterest(interest)}
              >
                {interest}
              </Badge>
            ))}
          </div>
        </div>

        {/* Accommodation */}
        <div>
          <label className="text-xs font-medium mb-1.5">Accommodation</label>
          <div className="grid grid-cols-4 gap-2">
            {accommodationOptions.map((option) => (
              <button
                key={option.value}
                onClick={() => setAccommodation(option.value as any)}
                className={`p-2 rounded-lg border text-xs font-medium transition-all ${
                  accommodation === option.value 
                    ? 'bg-primary text-primary-foreground border-primary' 
                    : 'bg-muted/50 hover:bg-muted border-transparent'
                }`}
              >
                {option.label}
              </button>
            ))}
          </div>
        </div>

        {/* Streaming Content */}
        {isLoading && streamingContent && (
          <div className="bg-muted/50 rounded-lg p-3 max-h-32 overflow-y-auto">
            <p className="text-xs text-muted-foreground whitespace-pre-wrap">{streamingContent.slice(0, 500)}...</p>
          </div>
        )}

        <Button 
          onClick={handlePlan} 
          disabled={isLoading}
          className="w-full h-10 text-sm font-semibold"
        >
          {isLoading ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Creating Your Perfect Trip...
            </>
          ) : (
            <>
              <Sparkles className="mr-2 h-4 w-4" />
              Generate AI Itinerary
            </>
          )}
        </Button>
      </CardContent>
    </Card>
  );
};

export default CompactAIPlanner;
