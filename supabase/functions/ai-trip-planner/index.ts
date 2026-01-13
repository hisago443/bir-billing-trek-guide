import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { days, people, budget, travelStyle, interests, accommodation } = await req.json();
    
    const LOVABLE_API_KEY = Deno.env.get("LOVABLE_API_KEY");
    if (!LOVABLE_API_KEY) {
      throw new Error("LOVABLE_API_KEY is not configured");
    }

    const systemPrompt = `You are an expert travel planner for Bir Billing, Himachal Pradesh, India - the paragliding capital of India. You create personalized, detailed day-by-day itineraries based on user preferences.

IMPORTANT CONTEXT ABOUT BIR BILLING:
- Bir Billing is famous for paragliding, trekking, Tibetan monasteries, cafes, and peaceful mountain stays
- Key activities: Tandem Paragliding (₹2,500-3,500), Trekking, Monastery Tours, Mountain Biking, Camping, Yoga Retreats
- Popular destinations: Bir Landing Site, Billing Takeoff Point, Rajgundha Valley, Barot Valley, Tibetan Colony
- Best cafes: June 16, Gliders Pizzeria, Silver Linings, Garden Cafe, Northern Cafe, Musafir Cafe
- Accommodation types: Hostels (₹599-2,000), Homestays (₹800-1,500), Guesthouses (₹1,500-3,000), Resorts (₹3,500-6,000), Camping (₹1,200-2,500)

OUTPUT FORMAT - Return a JSON object with this structure:
{
  "title": "Your Trip Title",
  "summary": "Brief 2-3 sentence overview",
  "days": [
    {
      "day": 1,
      "theme": "Arrival & Exploration",
      "activities": [
        {
          "time": "10:00 AM",
          "activity": "Activity name",
          "description": "Brief description",
          "location": "Location name",
          "cost": "₹amount or Free",
          "duration": "2 hours"
        }
      ],
      "meals": {
        "breakfast": { "place": "Cafe name", "suggestion": "Dish recommendation" },
        "lunch": { "place": "Cafe name", "suggestion": "Dish recommendation" },
        "dinner": { "place": "Cafe name", "suggestion": "Dish recommendation" }
      },
      "accommodation": { "name": "Hotel/Hostel name", "type": "Type", "price": "₹amount" }
    }
  ],
  "totalBudget": {
    "accommodation": "₹amount",
    "activities": "₹amount",
    "food": "₹amount",
    "transport": "₹amount",
    "total": "₹amount"
  },
  "tips": ["Tip 1", "Tip 2", "Tip 3"]
}

Create realistic, actionable itineraries with actual places and accurate pricing for Bir Billing.`;

    const userPrompt = `Create a ${days}-day trip itinerary for ${people} ${people === '1' ? 'person' : 'people'} visiting Bir Billing.

Preferences:
- Budget Level: ${budget}
- Travel Style: ${travelStyle}
- Interests: ${interests.join(', ')}
- Accommodation Type: ${accommodation}

Please create a detailed day-by-day itinerary with specific times, places, and estimated costs. Make it realistic and practical.`;

    const response = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${LOVABLE_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "google/gemini-3-flash-preview",
        messages: [
          { role: "system", content: systemPrompt },
          { role: "user", content: userPrompt },
        ],
        stream: true,
      }),
    });

    if (!response.ok) {
      if (response.status === 429) {
        return new Response(JSON.stringify({ error: "Rate limits exceeded, please try again later." }), {
          status: 429,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }
      if (response.status === 402) {
        return new Response(JSON.stringify({ error: "AI service temporarily unavailable. Please try again later." }), {
          status: 402,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }
      const errorText = await response.text();
      console.error("AI gateway error:", response.status, errorText);
      return new Response(JSON.stringify({ error: "Failed to generate itinerary" }), {
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    return new Response(response.body, {
      headers: { ...corsHeaders, "Content-Type": "text/event-stream" },
    });
  } catch (error) {
    console.error("AI Trip Planner error:", error);
    return new Response(JSON.stringify({ error: error instanceof Error ? error.message : "Unknown error" }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});
