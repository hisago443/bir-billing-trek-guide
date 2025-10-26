
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "@/hooks/use-theme";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import Accommodations from "./pages/Accommodations";
import Treks from "./pages/Treks";
import Cafes from "./pages/Cafes";
import Activities from "./pages/Activities";
import Explore from "./pages/Explore";
import { lazy, Suspense } from "react";

const queryClient = new QueryClient();

const AccommodationDetail = lazy(() => import("./pages/AccommodationDetail"));
const TrekDetail = lazy(() => import("./pages/TrekDetail"));
const CafeDetail = lazy(() => import("./pages/CafeDetail"));
const DestinationDetail = lazy(() => import("./pages/DestinationDetail"));

const App = () => (
  <QueryClientProvider client={queryClient}>
    <ThemeProvider defaultTheme="light">
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/explore" element={<Explore />} />
            <Route path="/accommodations" element={<Accommodations />} />
            <Route path="/accommodations/:id" element={
              <Suspense fallback={<div>Loading...</div>}>
                <AccommodationDetail />
              </Suspense>
            } />
            <Route path="/activities" element={<Activities />} />
            <Route path="/treks" element={<Treks />} />
            <Route path="/treks/:id" element={
              <Suspense fallback={<div>Loading...</div>}>
                <TrekDetail />
              </Suspense>
            } />
            <Route path="/cafes" element={<Cafes />} />
            <Route path="/cafes/:id" element={
              <Suspense fallback={<div>Loading...</div>}>
                <CafeDetail />
              </Suspense>
            } />
            <Route path="/destinations/:slug" element={
              <Suspense fallback={<div>Loading...</div>}>
                <DestinationDetail />
              </Suspense>
            } />
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </ThemeProvider>
  </QueryClientProvider>
);

export default App;
