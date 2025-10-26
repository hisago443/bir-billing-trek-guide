-- Create destinations table for top attractions (Barot, Gunehar, Gharnala, Rajgundha)
CREATE TABLE IF NOT EXISTS public.destinations (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  slug text UNIQUE NOT NULL,
  tagline text,
  description text,
  full_article text,
  hero_image text,
  gallery_images text[],
  location jsonb,
  best_time_to_visit text,
  how_to_reach text,
  activities text[],
  nearby_attractions text[],
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Create vehicle rentals table (bikes, scooters)
CREATE TABLE IF NOT EXISTS public.vehicle_rentals (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  provider_name text NOT NULL,
  vehicle_type text NOT NULL, -- 'bike', 'scooter', 'car'
  vehicle_model text,
  price_per_day text,
  contact_number text NOT NULL,
  whatsapp_number text,
  location text,
  available_vehicles integer,
  features text[],
  created_at timestamptz DEFAULT now()
);

-- Create taxi services table
CREATE TABLE IF NOT EXISTS public.taxi_services (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  driver_name text NOT NULL,
  contact_number text NOT NULL,
  whatsapp_number text,
  vehicle_type text,
  seating_capacity integer,
  price_range text,
  areas_covered text[],
  languages_spoken text[],
  rating numeric(2,1),
  created_at timestamptz DEFAULT now()
);

-- Create articles table for themed content
CREATE TABLE IF NOT EXISTS public.articles (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  slug text UNIQUE NOT NULL,
  excerpt text,
  content text NOT NULL,
  featured_image text,
  category text, -- 'guide', 'story', 'tips', 'sunset', 'culture'
  author text,
  published_at timestamptz DEFAULT now(),
  created_at timestamptz DEFAULT now()
);

-- Update accommodations table structure
ALTER TABLE public.accommodations 
  ADD COLUMN IF NOT EXISTS phone text,
  ADD COLUMN IF NOT EXISTS email text,
  ADD COLUMN IF NOT EXISTS website text,
  ADD COLUMN IF NOT EXISTS description text,
  ADD COLUMN IF NOT EXISTS photos text[],
  ADD COLUMN IF NOT EXISTS price_range text,
  ADD COLUMN IF NOT EXISTS created_at timestamptz DEFAULT now();

-- Update cafes table structure  
ALTER TABLE public.cafes
  ADD COLUMN IF NOT EXISTS phone text,
  ADD COLUMN IF NOT EXISTS description text,
  ADD COLUMN IF NOT EXISTS photos text[],
  ADD COLUMN IF NOT EXISTS instagram text,
  ADD COLUMN IF NOT EXISTS menu_highlights text[],
  ADD COLUMN IF NOT EXISTS vibe text,
  ADD COLUMN IF NOT EXISTS created_at timestamptz DEFAULT now();

-- Enable RLS on new tables
ALTER TABLE public.destinations ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.vehicle_rentals ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.taxi_services ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.articles ENABLE ROW LEVEL SECURITY;

-- Public read access policies
CREATE POLICY "Public can view destinations" ON public.destinations FOR SELECT USING (true);
CREATE POLICY "Public can view vehicle rentals" ON public.vehicle_rentals FOR SELECT USING (true);
CREATE POLICY "Public can view taxi services" ON public.taxi_services FOR SELECT USING (true);
CREATE POLICY "Public can view articles" ON public.articles FOR SELECT USING (true);

-- Insert top 4 destinations
INSERT INTO public.destinations (name, slug, tagline, description, hero_image, best_time_to_visit, activities) VALUES
('Barot Valley', 'barot-valley', 'Hidden Himalayan Paradise', 'A pristine valley offering tranquility, lush forests, and the melodious Uhl River. Perfect for those seeking an offbeat escape into nature.', 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4', 'March to June, September to November', ARRAY['Trekking', 'Trout Fishing', 'Nature Walks', 'Camping', 'Photography']),
('Gunehar Waterfall', 'gunehar-waterfall', 'Nature''s Hidden Cascade', 'A beautiful waterfall nestled in Gunehar village, offering a refreshing trek through pine forests and stunning mountain views.', 'https://images.unsplash.com/photo-1511593358241-7eea1f3c84e5', 'April to October', ARRAY['Waterfall Trek', 'Photography', 'Picnicking', 'Bird Watching']),
('Rajgundha', 'rajgundha', 'Sunset Paradise', 'A serene village offering breathtaking sunset views over the Dhauladhar range. A perfect destination for trekkers and nature lovers.', 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4', 'April to June, September to November', ARRAY['Sunset Viewing', 'Trekking', 'Camping', 'Village Tourism', 'Mountain Photography']),
('Billing', 'billing', 'Paragliding Capital', 'The world-famous paragliding take-off site at 2400m altitude, offering spectacular aerial views and adrenaline-pumping adventures.', 'https://images.unsplash.com/photo-1469854523086-cc02fe5d8800', 'September to November, March to May', ARRAY['Paragliding', 'Camping', 'Mountain Biking', 'Trekking', 'Star Gazing']);

-- Insert vehicle rental services
INSERT INTO public.vehicle_rentals (provider_name, vehicle_type, vehicle_model, price_per_day, contact_number, location, features) VALUES
('Go Bikes Bir', 'bike', 'Royal Enfield Classic 350', '₹1,200', '+91-88007-79391', 'Bir Tibetan Colony', ARRAY['Helmet included', 'Free pickup', '24/7 support', 'Insurance covered']),
('Go Bikes Bir', 'scooter', 'Honda Activa', '₹500', '+91-88007-79391', 'Bir Tibetan Colony', ARRAY['Helmet included', 'Fuel efficient', 'Easy to ride']),
('Rentrip Bir', 'bike', 'Royal Enfield Himalayan', '₹1,500', '+91-88007-79391', 'Bir Market', ARRAY['Adventure ready', 'Helmet & gloves', 'Breakdown support']);

-- Insert taxi services
INSERT INTO public.taxi_services (driver_name, contact_number, vehicle_type, seating_capacity, areas_covered, languages_spoken) VALUES
('Local Bir Taxi Service', '+91-98765-43210', 'Innova', 7, ARRAY['Bir', 'Billing', 'Barot', 'Dharamshala', 'Airport'], ARRAY['Hindi', 'English', 'Punjabi']),
('Himalayan Cab Service', '+91-98160-12345', 'Sedan', 4, ARRAY['Bir', 'Billing', 'Rajgundha', 'Palampur'], ARRAY['Hindi', 'English']);

-- Insert sample articles
INSERT INTO public.articles (title, slug, excerpt, content, category, featured_image) VALUES
('The Ultimate Guide to Bir Billing', 'ultimate-guide-bir-billing', 'Everything you need to know about visiting the Paragliding Capital of India', 'Bir Billing, nestled in the Kangra district of Himachal Pradesh, has emerged as one of India''s premier adventure and wellness destinations. Known globally as Asia''s paragliding capital, this twin village offers much more than just aerial thrills. The peaceful Bir village, with its Tibetan monasteries and spiritual vibe, contrasts beautifully with the adrenaline-charged atmosphere of Billing, the take-off site perched at 2,400 meters. Visitors come here not just for the 30-minute paragliding flights offering panoramic Dhauladhar mountain views, but also for the vibrant cafe culture, ancient Buddhist monasteries, forest trails, and the unique blend of Himachali and Tibetan cultures.', 'guide', 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4'),
('Chasing Sunsets in Rajgundha', 'rajgundha-sunset-guide', 'Experience the most spectacular sunset views in the Himalayas', 'Rajgundha village sits like a crown jewel at the edge of the Dhauladhar range, offering some of the most breathtaking sunset views in all of Himachal Pradesh. As the sun descends behind the snow-capped peaks, the entire valley is painted in hues of gold, orange, and purple. The trek to Rajgundha from Bir takes about 4-5 hours through oak and rhododendron forests, crossing streams and meadows. The village itself is a small settlement with a handful of homestays where you can experience authentic mountain hospitality. The best time to catch the sunset is from the meadow above the village, where 360-degree views await.', 'story', 'https://images.unsplash.com/photo-1495616811223-4d98c6e9c869');

-- Update sample cafe data
UPDATE public.cafes SET 
  phone = '+91-98765-00001',
  description = 'A charming garden cafe with Israeli and continental cuisine, perfect ambiance for digital nomads',
  menu_highlights = ARRAY['Shakshuka', 'Hummus Platter', 'Fresh Pasta', 'Smoothie Bowls'],
  vibe = 'Relaxed, Green, Co-working friendly'
WHERE id = 1;

UPDATE public.cafes SET
  phone = '+91-98765-00002', 
  description = 'Popular rooftop cafe known for its coffee, bakery items and stunning mountain views',
  menu_highlights = ARRAY['Artisan Coffee', 'Wood-fired Pizza', 'Homemade Cakes', 'Tibetan Dishes'],
  vibe = 'Cozy, Artistic, Mountain Views'
WHERE id = 2;