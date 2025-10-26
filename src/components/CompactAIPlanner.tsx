import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Sparkles, Calendar, Users, X } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const CompactAIPlanner = ({ onClose }: { onClose?: () => void }) => {
  const [days, setDays] = useState('3');
  const [people, setPeople] = useState('2');
  const [interests, setInterests] = useState('');
  const { toast } = useToast();

  const handlePlan = () => {
    toast({
      title: "Planning your trip!",
      description: `Creating a ${days}-day itinerary for ${people} people...`,
    });
  };

  return (
    <Card className="shadow-xl border-2 border-primary/20">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Sparkles className="h-5 w-5 text-primary" />
            <CardTitle className="text-lg">AI Trip Planner</CardTitle>
          </div>
          {onClose && (
            <Button variant="ghost" size="icon" className="h-8 w-8" onClick={onClose}>
              <X className="h-4 w-4" />
            </Button>
          )}
        </div>
      </CardHeader>
      <CardContent className="space-y-3">
        <div>
          <label className="text-xs font-medium mb-1 flex items-center gap-1">
            <Calendar className="h-3 w-3" />
            Days
          </label>
          <Input 
            type="number" 
            value={days}
            onChange={(e) => setDays(e.target.value)}
            placeholder="3"
            className="h-9"
          />
        </div>
        <div>
          <label className="text-xs font-medium mb-1 flex items-center gap-1">
            <Users className="h-3 w-3" />
            People
          </label>
          <Input 
            type="number"
            value={people}
            onChange={(e) => setPeople(e.target.value)}
            placeholder="2"
            className="h-9"
          />
        </div>
        <div>
          <label className="text-xs font-medium mb-1">Interests</label>
          <Input 
            value={interests}
            onChange={(e) => setInterests(e.target.value)}
            placeholder="Adventure, cafes..."
            className="h-9"
          />
        </div>
        <Button onClick={handlePlan} className="w-full h-9 text-sm">
          <Sparkles className="mr-2 h-4 w-4" />
          Generate Plan
        </Button>
      </CardContent>
    </Card>
  );
};

export default CompactAIPlanner;