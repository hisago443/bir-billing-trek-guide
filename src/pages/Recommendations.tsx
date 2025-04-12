
import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Skeleton } from '@/components/ui/skeleton';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';

// Mock function to simulate a backend API call with cursor-based pagination
const fetchRecommendations = async (cursor: string | null) => {
  // In a real implementation, you would pass the cursor to your backend API
  console.log("Fetching with cursor:", cursor);
  
  // Simulate network delay
  await new Promise(resolve => setTimeout(resolve, 800));
  
  // Mock data
  const allData = [
    { id: '1', activity: 'Paragliding at Billing', time: '8:30 AM', day: 'Day 1', description: 'Experience the thrill of flying' },
    { id: '2', activity: 'Lunch at Landing Site Cafe', time: '12:00 PM', day: 'Day 1', description: 'Quick refreshments' },
    { id: '3', activity: 'Hike to Billing', time: '2:00 PM', day: 'Day 1', description: 'Scenic uphill trek' },
    { id: '4', activity: 'Dinner and overnight stay', time: '7:00 PM', day: 'Day 1', description: "At Colonel's Resort" },
    { id: '5', activity: 'Breakfast', time: '7:00 AM', day: 'Day 2', description: 'At accommodation' },
    { id: '6', activity: 'Mountain Biking', time: '8:30 AM', day: 'Day 2', description: 'Through forest trails' },
    { id: '7', activity: 'Lunch at Four Tables', time: '1:00 PM', day: 'Day 2', description: 'Refuel with great food' },
    { id: '8', activity: 'Rappelling', time: '3:00 PM', day: 'Day 2', description: 'Adventure activity with guides' },
    { id: '9', activity: 'Farewell dinner', time: '7:00 PM', day: 'Day 2', description: 'At Musafir Restaurant' },
    { id: '10', activity: 'Souvenir Shopping', time: '10:00 AM', day: 'Day 3', description: 'Get mementos from local shops' },
  ];
  
  // Number of items per page
  const limit = 3;
  
  // Find the starting index based on cursor
  let startIndex = 0;
  if (cursor) {
    const cursorIndex = allData.findIndex(item => item.id === cursor);
    startIndex = cursorIndex !== -1 ? cursorIndex + 1 : 0;
  }
  
  // Get data for current page
  const items = allData.slice(startIndex, startIndex + limit);
  
  // Generate next cursor
  const nextCursor = items.length === limit ? items[items.length - 1].id : null;
  
  // Generate previous cursor (in a real implementation, you might store previous cursors)
  const prevCursor = startIndex > 0 ? allData[Math.max(0, startIndex - limit)].id : null;
  
  return {
    items,
    nextCursor,
    prevCursor,
    hasMore: nextCursor !== null
  };
};

const Recommendations = () => {
  const [cursor, setCursor] = useState<string | null>(null);
  const [prevCursors, setPrevCursors] = useState<string[]>([]);
  
  const { data, isLoading, isPreviousData } = useQuery({
    queryKey: ['recommendations', cursor],
    queryFn: () => fetchRecommendations(cursor),
    keepPreviousData: true,
  });
  
  const handleNextPage = () => {
    if (data?.nextCursor) {
      setPrevCursors(prev => [...prev, cursor as string]);
      setCursor(data.nextCursor);
    }
  };
  
  const handlePrevPage = () => {
    const prevCursor = prevCursors.pop();
    setPrevCursors([...prevCursors]);
    setCursor(prevCursor || null);
  };
  
  return (
    <div className="min-h-screen flex flex-col">
      <Navigation />
      <main className="flex-1 container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-8">Adventure Recommendations</h1>
        
        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Cursor-Based Pagination Example</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground mb-4">
              This example demonstrates cursor-based pagination that would work with a backend API.
              In a real application, the cursor would be passed to your backend service.
            </p>
            
            <ScrollArea className="h-[400px] rounded-md border">
              {isLoading ? (
                <div className="p-4 space-y-4">
                  {Array(3).fill(0).map((_, i) => (
                    <div key={i} className="space-y-2">
                      <Skeleton className="h-5 w-2/3" />
                      <Skeleton className="h-4 w-full" />
                      <Skeleton className="h-4 w-4/5" />
                    </div>
                  ))}
                </div>
              ) : (
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Day</TableHead>
                      <TableHead>Time</TableHead>
                      <TableHead>Activity</TableHead>
                      <TableHead>Description</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {data?.items.map((item) => (
                      <TableRow key={item.id}>
                        <TableCell>{item.day}</TableCell>
                        <TableCell>{item.time}</TableCell>
                        <TableCell className="font-medium">{item.activity}</TableCell>
                        <TableCell>{item.description}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              )}
            </ScrollArea>
            
            <div className="flex justify-between mt-4">
              <Button
                variant="outline"
                onClick={handlePrevPage}
                disabled={prevCursors.length === 0 || isLoading}
              >
                <ChevronLeft className="mr-2 h-4 w-4" />
                Previous
              </Button>
              
              <Button
                variant="outline"
                onClick={handleNextPage}
                disabled={!data?.hasMore || isLoading || isPreviousData}
              >
                Next
                <ChevronRight className="ml-2 h-4 w-4" />
              </Button>
            </div>
          </CardContent>
        </Card>
      </main>
      <Footer />
    </div>
  );
};

export default Recommendations;
