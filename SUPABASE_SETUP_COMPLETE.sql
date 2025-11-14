-- ============================================
-- BIR BILLING COMPLETE DATABASE SETUP
-- ============================================
-- This is a complete SQL script with ALL data
-- Run this in Supabase SQL Editor to populate your database
-- ============================================

-- Clean up existing data
TRUNCATE TABLE destinations, articles, accommodations, cafes, treks, vehicle_rentals, taxi_services CASCADE;

-- ============================================
-- DESTINATIONS TABLE
-- ============================================

INSERT INTO destinations (name, slug, tagline, description, hero_image, best_time_to_visit, activities) VALUES
('Bir Billing', 'bir-billing', 'Paragliding Capital of India', 'Experience the thrill of paragliding in the world-famous Bir Billing, known for its perfect conditions and breathtaking Himalayan views.', 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?auto=format&fit=crop&w=1200', 'March to June, September to November', ARRAY['Paragliding', 'Trekking', 'Meditation', 'Monasteries', 'Cafes']),

('Barot Valley', 'barot-valley', 'Hidden Paradise', 'A pristine valley surrounded by dense forests, crystal-clear rivers, and snow-capped peaks. Perfect for nature lovers and adventure seekers.', 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?auto=format&fit=crop&w=1200', 'April to October', ARRAY['Trekking', 'Trout Fishing', 'Camping', 'Photography', 'River Crossing']),

('Rajgundha', 'rajgundha', 'Alpine Meadow Haven', 'A beautiful meadow village offering stunning views of the Dhauladhar range. Ideal base for treks to Bara Bhangal and Thamsar Pass.', 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=1200', 'May to October', ARRAY['Trekking', 'Camping', 'Photography', 'Village Tourism', 'Stargazing']),

('Gunehr Valley', 'gunehr-valley', 'Offbeat Himalayan Gem', 'An untouched valley with lush green landscapes, traditional villages, and ancient temples. Perfect for those seeking solitude.', 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?auto=format&fit=crop&w=1200', 'May to September', ARRAY['Trekking', 'Village Tourism', 'Photography', 'Nature Walks', 'Temple Visits']),

('Gharnala', 'gharnala', 'Serene Mountain Village', 'A peaceful hamlet nestled in the mountains, offering authentic Himachali culture and stunning panoramic views.', 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?auto=format&fit=crop&w=1200', 'April to November', ARRAY['Village Tourism', 'Photography', 'Hiking', 'Cultural Experience', 'Bird Watching']),

('Baragaon', 'baragaon', 'Gateway to Wilderness', 'A charming village serving as the base for numerous treks and offering glimpses of traditional mountain life.', 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?auto=format&fit=crop&w=1200', 'March to November', ARRAY['Trekking', 'Village Tourism', 'Photography', 'Nature Walks', 'Camping']);

-- ============================================
-- ARTICLES TABLE
-- ============================================

INSERT INTO articles (title, slug, excerpt, content, featured_image, category, author, published_at) VALUES
('Ultimate Guide to Paragliding in Bir Billing', 'paragliding-guide-bir-billing', 'Everything you need to know about paragliding in the world''s second-best paragliding site.', 'Bir Billing is renowned as one of the best paragliding sites in the world. Located in Himachal Pradesh, this destination attracts adventure enthusiasts from across the globe...', 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?auto=format&fit=crop&w=800', 'Adventure', 'Travel Team', NOW()),

('Thamsar Pass Trek: Complete Guide', 'thamsar-pass-trek-guide', 'A comprehensive guide to one of the most scenic treks in Himachal Pradesh.', 'The Thamsar Pass trek is a stunning high-altitude adventure that takes you through alpine meadows, dense forests, and offers spectacular views of the Dhauladhar range. Starting from Billing, this 3-4 day trek reaches an altitude of 3,700 meters...', 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=800', 'Trekking', 'Adventure Team', NOW()),

('Exploring Palachak: A Hidden Himalayan Gem', 'palachak-hidden-gem', 'Discover the untouched beauty of Palachak meadows and its surrounding trails.', 'Palachak is a pristine meadow located above Billing, offering breathtaking views and serene camping spots. This lesser-known destination is perfect for those seeking solitude away from crowded tourist spots...', 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?auto=format&fit=crop&w=800', 'Trekking', 'Mountain Guide', NOW()),

('Bada Bhangal Trek: Journey to the Shepherd Valley', 'bada-bhangal-trek', 'An epic 8-day trek through one of the most remote and beautiful valleys in the Himalayas.', 'The Bada Bhangal trek is not for the faint-hearted. This challenging 8-9 day journey takes you through some of the most spectacular and remote landscapes in Himachal Pradesh. Starting from Billing, the trail passes through Rajgundha, Palachak, and crosses the Thamsar Pass...', 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?auto=format&fit=crop&w=800', 'Trekking', 'Trek Leader', NOW()),

('Baijnath Temple: Ancient Shiva Temple of Himachal', 'baijnath-temple-guide', 'Explore the 13th-century Baijnath Temple, a masterpiece of ancient Indian architecture.', 'Located just 40km from Bir, the Baijnath Temple is a stunning example of Nagara-style architecture dating back to 1204 AD. Dedicated to Lord Shiva as Vaidyanath (the Lord of Physicians), this temple attracts devotees and architecture enthusiasts alike...', 'https://images.unsplash.com/photo-1548013146-72479768bada?auto=format&fit=crop&w=800', 'Culture', 'Heritage Team', NOW()),

('Monasteries of Bir: A Spiritual Journey', 'monasteries-bir-spiritual-guide', 'Discover the peaceful Tibetan monasteries and their rich cultural heritage.', 'Bir is home to several beautiful Tibetan monasteries, making it a significant center for Tibetan Buddhism. The Chokling Monastery, Bir Tea Factory Monastery, and Deer Park Institute are must-visit places for those seeking spiritual enrichment...', 'https://images.unsplash.com/photo-1544967082-d9d25d867d66?auto=format&fit=crop&w=800', 'Spirituality', 'Cultural Guide', NOW()),

('Meditation and Yoga in Bir: Finding Inner Peace', 'meditation-yoga-bir', 'A guide to yoga retreats, meditation centers, and wellness experiences in Bir.', 'Bir has evolved into a hub for meditation and yoga enthusiasts. The serene environment, combined with Tibetan Buddhist influence, creates the perfect atmosphere for spiritual practices. Numerous centers offer courses in Vipassana, Tibetan meditation, and various yoga styles...', 'https://images.unsplash.com/photo-1506126613408-eca07ce68773?auto=format&fit=crop&w=800', 'Wellness', 'Wellness Team', NOW()),

('Artist Community of Bir: Where Creativity Thrives', 'artist-community-bir', 'Explore the vibrant artist community and creative spaces in Bir Billing.', 'Bir has attracted artists, musicians, and creative souls from around the world. The village is dotted with art galleries, music studios, and creative spaces where artists collaborate and showcase their work. From live music performances to art workshops, Bir''s creative scene is thriving...', 'https://images.unsplash.com/photo-1460661419201-fd4cecdf8a8b?auto=format&fit=crop&w=800', 'Culture', 'Arts Team', NOW()),

('Nightlife and Parties in Bir: Mountain Vibes', 'nightlife-parties-bir', 'Experience the unique nightlife and party scene in the mountains of Bir Billing.', 'While Bir maintains its peaceful charm during the day, the evenings come alive with a unique mountain party scene. Cozy cafes transform into music venues, hosting live bands, DJ nights, and cultural performances. The combination of international travelers, artists, and adventure enthusiasts creates a vibrant social atmosphere...', 'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?auto=format&fit=crop&w=800', 'Lifestyle', 'Travel Team', NOW()),

('Tatavani Hot Springs: Natural Healing Waters', 'tatavani-hot-springs', 'Visit the therapeutic hot springs near Bir for a rejuvenating experience.', 'Located about 60km from Bir, Tatavani hot springs are known for their therapeutic properties. These natural sulphur springs are believed to have healing powers and attract visitors seeking relief from various ailments...', 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?auto=format&fit=crop&w=800', 'Wellness', 'Travel Team', NOW() - INTERVAL '2 days');

-- ============================================
-- ACCOMMODATIONS TABLE
-- ============================================

INSERT INTO accommodations (name, type, location, price_per_night, rating, description, amenities, image_url, phone, email, website) VALUES
('The Hosteller Bir', 'Hostel', 'Bir', 600, 4.5, 'Social hostel with stunning mountain views, common areas, and organized activities.', ARRAY['WiFi', 'Common Kitchen', 'Cafe', 'Events', 'Terrace'], 'https://images.unsplash.com/photo-1555854877-bab0e564b8d5?auto=format&fit=crop&w=800', '+91-9876543210', 'bir@thehosteller.com', 'https://thehosteller.com'),

('Zostel Bir', 'Hostel', 'Bir', 550, 4.6, 'Popular backpacker hostel with vibrant community and amazing views.', ARRAY['WiFi', 'Cafe', 'Common Areas', 'Activities', 'Parking'], 'https://images.unsplash.com/photo-1555854877-bab0e564b8d5?auto=format&fit=crop&w=800', '+91-9876543211', 'bir@zostel.com', 'https://zostel.com'),

('Tashi Guesthouse', 'Guesthouse', 'Bir', 1200, 4.3, 'Cozy Tibetan-style guesthouse with home-cooked meals and warm hospitality.', ARRAY['WiFi', 'Home-cooked Meals', 'Garden', 'Mountain Views'], 'https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=800', '+91-9876543212', 'tashi@email.com', NULL),

('Mountain View Homestay', 'Homestay', 'Billing', 1500, 4.7, 'Traditional homestay experience with panoramic Himalayan views.', ARRAY['WiFi', 'Local Cuisine', 'Bonfire', 'Trekking Guide'], 'https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=800', '+91-9876543213', 'mountainview@email.com', NULL),

('Bir Boutique Hotel', 'Hotel', 'Bir', 3500, 4.8, 'Luxury boutique hotel with modern amenities and traditional Himachali architecture.', ARRAY['WiFi', 'Restaurant', 'Spa', 'Room Service', 'Parking'], 'https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=800', '+91-9876543214', 'info@birboutique.com', 'https://birboutique.com'),

('Eco Camp Bir', 'Camp', 'Bir', 2000, 4.4, 'Eco-friendly camping with comfortable tents and nature experiences.', ARRAY['Camping', 'Bonfire', 'Meals Included', 'Nature Walks'], 'https://images.unsplash.com/photo-1478131143081-80f7f84ca84d?auto=format&fit=crop&w=800', '+91-9876543215', 'ecocamp@email.com', NULL),

('Silver Lining Homestay', 'Homestay', 'Bir Colony', 1800, 4.6, 'Peaceful homestay with organic garden and yoga deck.', ARRAY['WiFi', 'Organic Meals', 'Yoga Space', 'Library'], 'https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=800', '+91-9876543216', 'silverlining@email.com', NULL),

('Backpackers Villa', 'Hostel', 'Bir Landing Site', 700, 4.2, 'Budget-friendly hostel right at the landing site with great vibes.', ARRAY['WiFi', 'Common Kitchen', 'Terrace', 'Parking'], 'https://images.unsplash.com/photo-1555854877-bab0e564b8d5?auto=format&fit=crop&w=800', '+91-9876543217', 'backpackersvilla@email.com', NULL),

('Himalayan Nest', 'Guesthouse', 'Billing Road', 2200, 4.5, 'Comfortable guesthouse with restaurant and valley views.', ARRAY['WiFi', 'Restaurant', 'Parking', 'Garden'], 'https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=800', '+91-9876543218', 'himalayannest@email.com', NULL);

-- ============================================
-- CAFES TABLE
-- ============================================

INSERT INTO cafes (name, location, cuisine_type, description, opening_hours, image_url, phone, rating) VALUES
('Garden Cafe', 'Bir Landing Site', 'Multi-cuisine', 'Popular spot with great food, music, and stunning valley views.', '8:00 AM - 10:00 PM', 'https://images.unsplash.com/photo-1554118811-1e0d58224f24?auto=format&fit=crop&w=800', '+91-9876543220', 4.6),

('June 16', 'Bir Colony', 'Cafe', 'Cozy cafe known for wood-fired pizzas and artisan coffee.', '9:00 AM - 11:00 PM', 'https://images.unsplash.com/photo-1554118811-1e0d58224f24?auto=format&fit=crop&w=800', '+91-9876543221', 4.7),

('Silver Linings Cafe', 'Bir Colony', 'Continental', 'Beautiful garden cafe with healthy food options and great ambiance.', '8:00 AM - 10:00 PM', 'https://images.unsplash.com/photo-1554118811-1e0d58224f24?auto=format&fit=crop&w=800', '+91-9876543222', 4.5),

('4 Tables Restaurant', 'Bir', 'Israeli, Italian', 'Intimate restaurant serving authentic Israeli and Italian cuisine.', '11:00 AM - 10:00 PM', 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=800', '+91-9876543223', 4.8),

('Avva''s Cafe', 'Bir', 'Bakery, Cafe', 'Artisan bakery with fresh breads, pastries, and excellent coffee.', '7:30 AM - 9:00 PM', 'https://images.unsplash.com/photo-1554118811-1e0d58224f24?auto=format&fit=crop&w=800', '+91-9876543224', 4.6),

('Vairagi Cafe', 'Bir Colony', 'Indian, Continental', 'Hippie-style cafe with live music, art, and delicious food.', '9:00 AM - 11:00 PM', 'https://images.unsplash.com/photo-1554118811-1e0d58224f24?auto=format&fit=crop&w=800', '+91-9876543225', 4.4),

('Bir Tea Factory Cafe', 'Chowgan', 'Tea House', 'Charming tea cafe overlooking tea gardens with local snacks.', '8:00 AM - 7:00 PM', 'https://images.unsplash.com/photo-1559056199-641a0ac8b55e?auto=format&fit=crop&w=800', '+91-9876543226', 4.3),

('Himalayan Pizza', 'Bir Landing', 'Italian', 'Best wood-fired pizzas in town with stunning mountain views.', '11:00 AM - 10:00 PM', 'https://images.unsplash.com/photo-1513104890138-7c749659a591?auto=format&fit=crop&w=800', '+91-9876543227', 4.7),

('The Laughing Buddha Cafe', 'Bir Colony', 'Tibetan, Chinese', 'Authentic Tibetan cuisine in a peaceful garden setting.', '9:00 AM - 9:00 PM', 'https://images.unsplash.com/photo-1554118811-1e0d58224f24?auto=format&fit=crop&w=800', '+91-9876543228', 4.5),

('Gliders Inn', 'Bir Landing', 'Multi-cuisine', 'Pilot''s favorite spot with great food and flying stories.', '8:00 AM - 10:00 PM', 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=800', '+91-9876543229', 4.6);

-- ============================================
-- VEHICLE RENTALS TABLE
-- ============================================

INSERT INTO vehicle_rentals (provider_name, vehicle_type, vehicle_model, price_per_day, contact_number, location, features) VALUES
('Bir Bike Rentals', 'Bike', 'Royal Enfield Classic 350', 1200, '+91-9876543230', 'Bir Main Market', ARRAY['Helmet Included', 'Full Insurance', '24/7 Support', 'Free Delivery']),

('Mountain Riders', 'Bike', 'Royal Enfield Himalayan', 1500, '+91-9876543231', 'Bir Colony', ARRAY['Helmet Included', 'Riding Jackets', 'Route Maps', 'Breakdown Support']),

('Eco Scooters Bir', 'Scooter', 'Honda Activa', 600, '+91-9876543232', 'Bir Landing Site', ARRAY['Helmet Included', 'Insurance', 'Fuel Efficient', 'Easy to Ride']),

('Adventure Wheels', 'Bike', 'KTM Duke 200', 1400, '+91-9876543233', 'Billing Road', ARRAY['Sports Bike', 'Full Gear Available', 'Insurance', '24/7 Support']),

('Green Valley Scooters', 'Scooter', 'TVS Jupiter', 550, '+91-9876543234', 'Bir Market', ARRAY['Helmet Included', 'Insurance', 'Pick-up/Drop', 'Affordable']),

('Himalayan Bike Tours', 'Bike', 'Royal Enfield Thunderbird', 1300, '+91-9876543235', 'Bir Colony', ARRAY['Helmet Included', 'Touring Ready', 'Support Vehicle', 'Route Planning']),

('Quick Rent Bir', 'Scooter', 'Honda Dio', 500, '+91-9876543236', 'Bir Main Road', ARRAY['Budget Friendly', 'Helmet Included', 'Easy Booking', 'Good Condition']),

('Mountain Scooters', 'Scooter', 'Vespa', 800, '+91-9876543237', 'Bir Landing', ARRAY['Stylish', 'Helmet Included', 'Insurance', 'Comfortable']),

('Royal Rides Bir', 'Bike', 'Royal Enfield Interceptor', 1600, '+91-9876543238', 'Bir Colony', ARRAY['Premium Bike', 'Full Gear', 'Insurance', 'Roadside Assistance']),

('Budget Bikes', 'Bike', 'Bajaj Pulsar 150', 800, '+91-9876543239', 'Bir Market', ARRAY['Affordable', 'Helmet Included', 'Good Mileage', 'Well Maintained']);

-- ============================================
-- VERIFY DATA
-- ============================================

SELECT 'Destinations' as table_name, COUNT(*) as records FROM destinations
UNION ALL
SELECT 'Articles', COUNT(*) FROM articles
UNION ALL
SELECT 'Accommodations', COUNT(*) FROM accommodations
UNION ALL
SELECT 'Cafes', COUNT(*) FROM cafes
UNION ALL
SELECT 'Vehicle Rentals', COUNT(*) FROM vehicle_rentals;
