-- Drop existing policies if they exist
DROP POLICY IF EXISTS "Public can view destinations" ON public.destinations;
DROP POLICY IF EXISTS "Public can view vehicle rentals" ON public.vehicle_rentals;
DROP POLICY IF EXISTS "Public can view taxi services" ON public.taxi_services;
DROP POLICY IF EXISTS "Public can view articles" ON public.articles;

-- Recreate public read access policies
CREATE POLICY "Public can view destinations" ON public.destinations FOR SELECT USING (true);
CREATE POLICY "Public can view vehicle rentals" ON public.vehicle_rentals FOR SELECT USING (true);
CREATE POLICY "Public can view taxi services" ON public.taxi_services FOR SELECT USING (true);
CREATE POLICY "Public can view articles" ON public.articles FOR SELECT USING (true);