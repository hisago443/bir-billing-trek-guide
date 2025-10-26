-- Enable RLS on all public tables
ALTER TABLE public.activities ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.treks ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.accommodations ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.bookings ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.cafes ENABLE ROW LEVEL SECURITY;

-- Create public read policies for all tables (they're public information for tourism)
CREATE POLICY "Public can view activities" ON public.activities FOR SELECT USING (true);
CREATE POLICY "Public can view treks" ON public.treks FOR SELECT USING (true);
CREATE POLICY "Public can view accommodations" ON public.accommodations FOR SELECT USING (true);
CREATE POLICY "Public can view bookings" ON public.bookings FOR SELECT USING (true);
CREATE POLICY "Public can view cafes" ON public.cafes FOR SELECT USING (true);