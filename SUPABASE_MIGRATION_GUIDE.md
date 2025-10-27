# Supabase Migration Guide

## How to Run SQL Migrations in Supabase

Follow these steps to manually run SQL migrations in your Supabase project:

### Step 1: Access Your Supabase Dashboard
1. Go to [https://supabase.com](https://supabase.com)
2. Log in to your account
3. Select your project from the dashboard

### Step 2: Navigate to SQL Editor
1. In the left sidebar, click on **"SQL Editor"**
2. Click on **"New query"** button to create a new SQL query

### Step 3: Prepare and Run the Migration

#### Option A: Using the SQL Editor Interface
1. Copy the SQL code from the migration files (provided below)
2. Paste it into the SQL editor
3. Click **"Run"** button (or press `Ctrl+Enter` / `Cmd+Enter`)
4. Check for any errors in the output panel at the bottom
5. If successful, you'll see a success message

#### Option B: Using Supabase CLI (Advanced)
```bash
# Install Supabase CLI
npm install -g supabase

# Login to Supabase
supabase login

# Link to your project
supabase link --project-ref YOUR_PROJECT_REF

# Run migrations
supabase db push
```

---

## Complete SQL Migration Code

Copy and paste the following SQL code into your Supabase SQL Editor:

```sql
-- ============================================
-- BIR BILLING WEBSITE - COMPLETE DATABASE SETUP
-- ============================================

-- ============================================
-- 1. CREATE TABLES (if they don't exist)
-- ============================================

-- Destinations table
CREATE TABLE IF NOT EXISTS destinations (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  tagline TEXT,
  description TEXT,
  hero_image TEXT,
  best_time_to_visit TEXT,
  activities TEXT[],
  full_article TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Articles table
CREATE TABLE IF NOT EXISTS articles (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  excerpt TEXT,
  content TEXT,
  featured_image TEXT,
  category TEXT,
  author TEXT,
  read_time INTEGER,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Accommodations table
CREATE TABLE IF NOT EXISTS accommodations (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  location TEXT NOT NULL,
  type TEXT,
  rating DECIMAL(2,1),
  price TEXT,
  image TEXT,
  description TEXT,
  amenities TEXT[],
  contact TEXT,
  website TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Cafes table
CREATE TABLE IF NOT EXISTS cafes (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  location TEXT NOT NULL,
  description TEXT,
  cuisine TEXT[],
  price TEXT,
  hours TEXT,
  image TEXT,
  rating DECIMAL(2,1),
  contact TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Activities table
CREATE TABLE IF NOT EXISTS activities (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  description TEXT,
  location TEXT,
  price TEXT,
  duration TEXT,
  difficulty TEXT,
  image TEXT,
  booking_link TEXT,
  contact TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Treks table
CREATE TABLE IF NOT EXISTS treks (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  description TEXT,
  difficulty TEXT,
  duration TEXT,
  distance TEXT,
  best_season TEXT,
  starting_point TEXT,
  image TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- ============================================
-- 2. CLEAR EXISTING DATA
-- ============================================

TRUNCATE destinations CASCADE;
TRUNCATE articles CASCADE;
TRUNCATE accommodations CASCADE;
TRUNCATE cafes CASCADE;
TRUNCATE activities CASCADE;
TRUNCATE treks CASCADE;

-- ============================================
-- 3. INSERT DESTINATIONS DATA
-- ============================================

INSERT INTO destinations (name, slug, tagline, description, hero_image, best_time_to_visit, activities, full_article) VALUES

('Bir Billing', 'bir-billing', 'The Paragliding Capital of India', 'Bir Billing is renowned as one of the best paragliding sites in the world, offering breathtaking Himalayan views and excellent flying conditions year-round.', 'https://images.unsplash.com/photo-1595074474374-3dae9c2e0076', 'October to June', ARRAY['Paragliding', 'Meditation', 'Cafes', 'Monasteries'], 
'# Bir Billing: The Paragliding Capital of India

Nestled in the Kangra district of Himachal Pradesh, Bir Billing has emerged as one of the world''s premier paragliding destinations. At an elevation of 2,400 meters, Billing serves as the take-off site, while Bir, at 1,400 meters, is the landing zone.

## The Paragliding Experience

The flight from Billing to Bir offers an unparalleled experience. As you soar through the Himalayan skies, the valley below reveals a patchwork of green fields, traditional villages, and winding rivers. The flight typically lasts 20-30 minutes, though experienced pilots can extend this significantly using thermal currents.

### Best Time to Fly

- **October to November**: Crystal clear skies and stable conditions
- **March to June**: Excellent thermals for extended flights
- **July to September**: Monsoon season - flights are limited

## Beyond Paragliding

While paragliding is the main attraction, Bir offers much more:

### Tibetan Culture
The settlement of Tibetan refugees has created a unique cultural blend. Visit the:
- Chokling Monastery
- Deer Park Institute
- Tibetan Colony with authentic handicrafts

### Cafes and Cuisine
Bir has transformed into a cafe haven:
- Israeli cuisine brought by travelers
- Traditional Tibetan momos and thukpa
- Italian wood-fired pizzas
- Organic cafes with mountain views

### Meditation and Wellness
Several meditation centers offer:
- Vipassana courses
- Yoga retreats
- Sound healing sessions
- Tibetan healing practices

## Getting There

- **By Air**: Gaggal Airport (60 km) near Dharamshala
- **By Rail**: Pathankot Railway Station (140 km)
- **By Road**: Regular buses from Delhi, Chandigarh, and Manali

## Accommodation

Options range from:
- Budget guesthouses (₹500-1000/night)
- Mid-range hotels (₹1500-3000/night)
- Luxury resorts (₹4000+/night)

## Local Tips

1. Book paragliding in advance during peak season
2. Carry warm clothing - mornings can be chilly
3. Try the local cafes - each has its own personality
4. Respect the local Tibetan culture
5. Stay hydrated at higher altitudes'),

('Barot Valley', 'barot', 'Hidden Himalayan Paradise', 'A pristine valley perfect for nature lovers, offering trout fishing, camping, and serene landscapes away from tourist crowds.', 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4', 'March to November', ARRAY['Trekking', 'Camping', 'Fishing', 'Photography'],
'# Barot Valley: Himachal''s Best-Kept Secret

Tucked away in the Mandi district, Barot Valley remains one of Himachal''s most pristine and least commercialized destinations. This hidden gem, located at 6,000 feet, offers a perfect retreat for those seeking peace in nature''s lap.

## Natural Beauty

The Uhl River flows through the valley, creating a mesmerizing soundscape. Dense deodar and pine forests surround the area, home to diverse wildlife including the Himalayan black bear, musk deer, and various bird species.

## Activities

### Trout Fishing
Barot is famous for:
- Natural trout breeding grounds
- Catch and release programs
- Fishing permits available from local authorities
- Best season: March to June

### Trekking Routes
Popular treks include:
- **Barot to Billing Trek**: 2-3 days through pristine forests
- **Manali to Barot Trek**: 5-6 days adventure
- **Day hikes**: Multiple options for beginners

### Camping
- Riverside camping spots
- Forest camping (with permissions)
- Organized camping groups available
- Bonfire evenings under starlit skies

## Historical Significance

The Shanan Power House, built in 1932, was one of Asia''s first hydroelectric projects. The colonial-era architecture and the tunnel system are worth exploring.

## Local Culture

- Traditional Kullu architecture
- Apple orchards and farms
- Local festivals celebrating harvest
- Warm hospitality of mountain people

## Accommodation

Limited but charming options:
- HPPWD Rest House
- Local homestays
- Small guesthouses
- Camping sites

## How to Reach

- **From Bir**: 60 km via Joginder Nagar (2-3 hours)
- **From Mandi**: 65 km (2.5 hours)
- Road conditions vary; check during monsoon

## Best Time to Visit

- **Spring (March-May)**: Flowers bloom, perfect weather
- **Summer (June-August)**: Escape the heat, some rain
- **Autumn (September-November)**: Clear skies, pleasant temperature
- **Winter (December-February)**: Snowfall, limited access

## Travel Tips

1. Limited mobile connectivity - inform family in advance
2. Carry cash - minimal ATM facilities
3. Book accommodation in advance
4. Respect local customs and environment
5. Carry warm clothing year-round'),

('Rajgundha', 'rajgundha', 'Village Above the Clouds', 'A remote village offering stunning sunset views, traditional Himachali culture, and the starting point for the famous Rajgundha-Bir trek.', 'https://images.unsplash.com/photo-1545389336-cf090694435e', 'April to October', ARRAY['Trekking', 'Photography', 'Village Life', 'Camping'],
'# Rajgundha: Chasing Sunsets at the Village Above Clouds

Perched at 8,500 feet in the Dhauladhar ranges, Rajgundha is a destination that lives up to its mystique. This remote village, accessible only by a challenging trek, offers experiences that few places can match.

## The Legendary Sunsets

Rajgundha is famous for what locals call "the landing sunset" - a phenomenon where the sun appears to land on the mountain peaks before disappearing. The sky transforms through shades of gold, orange, pink, and purple, creating a spectacle that has inspired countless travelers.

### Best Viewing Points

- **Village meadows**: Open fields with 360-degree views
- **Camping sites**: Stay overnight to catch sunrise too
- **Ridge top**: 20-minute walk for elevated perspective

## The Trek

### Billing to Rajgundha
- **Distance**: 12 km
- **Time**: 5-7 hours
- **Difficulty**: Moderate to challenging
- **Elevation gain**: 1,200 meters

The trail passes through:
1. Oak and rhododendron forests
2. Mountain streams and waterfalls
3. Meadows with grazing sheep
4. Traditional shepherd huts

### Rajgundha to Bir
- **Distance**: 15 km
- **Time**: 6-8 hours
- **Difficulty**: Moderate
- **Mostly descent**

## Village Life

Rajgundha offers authentic Himalayan experiences:

### Traditional Culture
- Only about 15-20 families live here
- Agriculture and shepherding lifestyle
- Warm hospitality despite limited resources
- Traditional Gaddi culture and customs

### Facilities
- Basic homestays with home-cooked meals
- No electricity (solar panels in some homes)
- Mobile network is spotty
- Simple, authentic accommodation

## Camping Experience

Many trekkers prefer camping:
- Designated camping meadows
- Star-gazing opportunities
- Bonfire evenings
- Carry own equipment or arrange with guides

## Wildlife and Nature

The area is rich in:
- Himalayan birds including monals
- Wildflowers in spring and summer
- Medicinal herbs
- Rhododendron forests (spectacular in bloom)

## Essential Information

### What to Carry
- Warm clothing (even in summer)
- Rain gear
- Torch/headlamp
- Basic first aid
- Sufficient water and snacks
- Power bank (limited charging)

### Trek Permits
- No special permits required
- Register at Billing before starting
- Go with a guide if inexperienced

### Best Season
- **April-June**: Pleasant weather, clear views
- **September-October**: Post-monsoon clarity, comfortable
- **Avoid**: July-August (heavy rain, leeches)

## Photography Tips

1. Golden hour before sunset is magical
2. Wide-angle lens for landscapes
3. Telephoto for village details
4. Protect gear from moisture
5. Capture village life respectfully

## Responsible Tourism

- Carry back all waste
- Respect local customs
- Don''t disturb wildlife
- Support local homestays
- Minimize plastic use

## Nearby Attractions

Combine with:
- Billing paragliding
- Bir monasteries and cafes
- Barot Valley
- Dharamshala

## The Experience

Rajgundha isn''t just a destination; it''s a journey back in time. Here, life moves at nature''s pace. There''s no WiFi to distract, no traffic to disturb, just mountains, clouds, and the simple rhythm of village life. As you watch the sun set over the Dhauladhar ranges, you''ll understand why travelers speak of this place in hushed, reverent tones.'),

('Baragaon', 'baragaon', 'Gateway to Gunehr', 'A charming village known for its apple orchards and as the base for exploring the Gunehr region.', 'https://images.unsplash.com/photo-1548625361-794c1dd0c78b', 'March to October', ARRAY['Hiking', 'Village Tours', 'Apple Orchards', 'Photography'],
'# Baragaon: The Apple Orchard Village

Baragaon serves as the gateway to the pristine Gunehr region, offering a perfect blend of accessibility and rural charm. Located at a moderate altitude, this village is becoming increasingly popular among travelers seeking authentic Himalayan experiences without extreme trekking.

## Apple Orchards

Baragaon is surrounded by lush apple orchards:
- Best visiting time: April-May (blooming season)
- September-October (harvest season)
- Farm tours and interactions with farmers
- Fresh apple products and cider

## Village Architecture

The village showcases traditional Himachali construction:
- Stone and wood houses with slate roofs
- Traditional courtyards and pathways
- Small temples with intricate woodwork
- Agricultural terraces on hillsides

## Local Experiences

### Homestays
- Authentic village homes
- Home-cooked traditional meals
- Interaction with local families
- Learn about rural Himalayan life

### Activities
- Nature walks through orchards
- Village exploration
- Photography opportunities
- Bird watching
- Cultural exchanges

## Nearby Attractions

### Gunehr Valley
- 8 km from Baragaon
- Day trek or jeep ride
- Untouched landscapes
- Fewer tourists

### Gharnala
- Starting point for treks
- 12 km from Baragaon
- Beautiful meadows

## Getting There

- From Bir: 25 km by road
- From Barot: 40 km
- Road conditions: Generally good

## Accommodation

- Multiple homestays
- Small guesthouses
- Budget-friendly options
- Advance booking recommended during peak season

## Best Time to Visit

- **Spring**: Blooming orchards, pleasant weather
- **Summer**: Escape the heat, harvest fruits
- **Autumn**: Apple harvest, clear skies
- **Winter**: Snowfall (limited access)'),

('Gunehr Valley', 'gunehr', 'Unexplored Mountain Beauty', 'A pristine valley offering solitude, natural beauty, and traditional mountain life away from commercial tourism.', 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4', 'April to October', ARRAY['Trekking', 'Camping', 'Photography', 'Nature Walks'],
'# Gunehr: The Unexplored Paradise

Gunehr remains one of the most untouched valleys in the region, known only to serious trekkers and adventure enthusiasts. This pristine area offers what commercial destinations have lost - absolute tranquility and unspoiled natural beauty.

## The Landscape

Dense forests of:
- Oak and rhododendron
- Pine and deodar
- Bamboo groves in lower regions

Natural features:
- Crystal-clear mountain streams
- Hidden waterfalls
- Alpine meadows
- Snow peaks visible from clearings

## Trek Routes

### Gunehr Exploration Trek
- Base: Baragaon or Billing
- Duration: 2-3 days
- Difficulty: Moderate
- Camping required

### Circuit Treks
- Combine with Barot
- 5-7 day adventures
- For experienced trekkers
- Guide highly recommended

## Wildlife

Rich biodiversity:
- Himalayan birds including pheasants
- Deer and wild boar
- Occasional leopard sightings
- Numerous butterfly species

## Village Life

Few settlements scattered across:
- Very basic amenities
- Warm but shy locals
- Agriculture and animal husbandry
- Limited connectivity

## What Makes It Special

- Virtually no tourist infrastructure
- Complete solitude
- Pristine environment
- Night skies free from light pollution
- Authentic wilderness experience

## Important Considerations

### Preparation Required
- Self-sufficient camping gear
- Food supplies
- Water purification
- First aid kit
- Navigation tools

### Safety
- Go with experienced guides
- Inform someone about plans
- Check weather forecasts
- Be prepared for emergencies
- Limited rescue accessibility

### Permits
- Currently no permits required
- Check with local authorities
- Register at starting point

## Best Season

- **May-June**: Post-snow, lush greenery
- **September-October**: Clear weather, comfortable
- **Avoid**: Monsoon and winter

## Responsible Travel

Essential for pristine areas:
- Leave no trace principles
- Carry back all waste
- Don''t disturb wildlife
- Respect any locals encountered
- Minimal campfire impact

## Photography

Opportunities include:
- Untouched landscapes
- Wildlife in natural habitat
- Milky Way and star trails
- Macro photography of flora
- Sunrise/sunset from peaks'),

('Gharnala', 'gharnala', 'Trek Base Village', 'A small hamlet serving as the starting point for several treks and offering authentic mountain experiences.', 'https://images.unsplash.com/photo-1540979388789-6cee28a1cdc9', 'April to October', ARRAY['Trekking', 'Camping', 'Local Culture', 'Nature'],
'# Gharnala: Where Treks Begin

Gharnala is a small, picturesque hamlet that has quietly become an important base for trekkers exploring the lesser-known trails of the region. Its strategic location and minimal commercialization make it perfect for those seeking authentic mountain experiences.

## Location and Access

- Elevation: ~6,500 feet
- From Bir: 35 km
- From Barot: 45 km
- Road conditions: Challenging but manageable

## Trek Starting Point

Gharnala serves as base for:

### Multiple Trek Routes
- To Rajgundha via alternative routes
- To Gunehr Valley
- To Barot via mountain trails
- Day hikes to nearby peaks

### Why Start from Gharnala?
- Less crowded than Billing
- Lower starting altitude (easier acclimatization)
- Authentic village experience
- Knowledgeable local guides

## Village Characteristics

### Infrastructure
- Very limited facilities
- 2-3 small homestays
- No restaurants or shops
- Bring essentials from Bir or Barot

### Community
- Small population
- Agriculture-based economy
- Traditional lifestyle
- Welcoming but not tourist-oriented

## Accommodation

Options are basic:
- Homestays with family hosts
- Home-cooked meals
- Shared facilities
- Book in advance through local guides

## What to Do

### Pre-Trek Preparation
- Rest and acclimatize
- Arrange guides and porters
- Stock up on supplies
- Check weather and trail conditions

### Day Activities
- Village walks
- Interact with locals
- Visit nearby temples
- Short nature trails

### Cultural Experience
- Traditional Himachali homes
- Local festivals (if timing aligns)
- Agricultural practices
- Daily village life

## Essential Information

### What to Bring
- All trekking equipment
- Food supplies (limited local availability)
- Medicine and first aid
- Cash (no ATMs)
- Warm clothing

### Mobile Network
- Limited or no connectivity
- BSNL may work intermittently
- Inform family before arrival

### Weather
- Can change rapidly
- Nights are cold year-round
- Check forecasts before arrival
- Be prepared for rain

## Nearby Points

### Sacred Sites
- Small local temples
- Mountain shrines
- Meditation spots

### Natural Attractions
- Mountain streams
- Forest trails
- Viewpoints
- Waterfalls (seasonal)

## Best Time to Visit

- **Pre-monsoon (April-June)**: Ideal for trekking
- **Post-monsoon (September-October)**: Clear views
- **Avoid**: Monsoon season (July-August)
- **Winter**: Heavy snow, accessibility issues

## Local Tips

1. Respect the simple lifestyle
2. Learn a few Hindi/Pahari phrases
3. Be patient with basic facilities
4. Support local homestays
5. Follow local customs
6. Don''t expect luxury

## The Gharnala Experience

Gharnala represents what mountain tourism should be - simple, sustainable, and authentic. Here, you won''t find fancy cafes or boutique hotels. Instead, you''ll find mountain people living as they have for generations, forests unmarred by development, and trails that few have walked. It''s a place for those who understand that the best adventures often begin at the most unassuming locations.');

-- ============================================
-- 4. INSERT ARTICLES DATA
-- ============================================

INSERT INTO articles (title, slug, excerpt, content, featured_image, category, author, read_time) VALUES

('Tatavani Hot Springs: Nature''s Healing Waters', 'tatavani-hot-springs', 'Discover the therapeutic hot springs hidden in the Himalayas, known for their healing properties and serene surroundings.', 
'# Tatavani Hot Springs: A Himalayan Healing Experience

Hidden in the mountains near Karsog, about 100 km from Bir, the Tatavani Hot Springs offer a unique combination of natural beauty and therapeutic benefits that have attracted pilgrims and travelers for centuries.

## The Springs

### Natural Formation
The hot springs emerge from deep within the earth, maintaining a constant temperature of around 45-50°C (113-122°F) throughout the year. The water is rich in sulfur and minerals believed to have healing properties.

### Facilities
- Separate bathing areas for men and women
- Basic changing rooms
- Open-air and enclosed pools
- Natural stone formations create sitting areas

## Therapeutic Benefits

The mineral-rich waters are believed to help with:
- Joint pain and arthritis
- Skin conditions
- Muscle relaxation
- Stress relief
- Improved circulation

## The Journey

### Getting There
- **From Bir**: 100 km, 4-5 hours drive
- **From Mandi**: 60 km, 2-3 hours
- **Road**: Scenic but winding mountain roads

### Route Highlights
- Views of Himachal countryside
- Traditional villages en route
- Apple orchards
- River valleys

## What to Expect

### The Setting
- Surrounded by mountains
- River flowing nearby
- Forest area with walking trails
- Basic but clean facilities

### Crowd Levels
- Weekdays: Relatively quiet
- Weekends: Moderate crowds
- Religious festivals: Can be busy
- Best visited: Early mornings or late afternoons

## Nearby Attractions

### Kamakhya Devi Temple
- Located at the hot springs complex
- Ancient temple dedicated to goddess
- Religious significance
- Architecture worth seeing

### Karsog Valley
- Beautiful valley region
- Apple orchards
- Traditional villages
- Additional temples and sites

### Trekking Routes
- Multiple trails in surrounding area
- From easy walks to challenging treks
- Local guides available
- Combine with hot spring visit

## Practical Information

### Entry and Timings
- Small entry fee
- Usually open from dawn to dusk
- Check local timings before visiting
- May have modified hours during festivals

### What to Bring
- Swimwear (modest)
- Towel
- Change of clothes
- Flip-flops
- Toiletries for post-bath

### Accommodation
- Basic guesthouses nearby
- Homestays in surrounding villages
- Better options in Karsog (8 km)
- Can be combined with day trip from Bir

### Food
- Simple local food available
- Limited options near springs
- Better to eat in Karsog
- Carry snacks if traveling from far

## Best Time to Visit

### Year-Round Destination
- **Winter (December-February)**: Most relaxing in hot water, cold mountain air
- **Spring (March-May)**: Pleasant weather all around
- **Monsoon (June-September)**: Beautiful but roads may be tricky
- **Autumn (October-November)**: Comfortable temperatures, clear skies

## Health and Safety

### Before You Bathe
- Don''t enter if you have open wounds
- Consult doctor if you have heart conditions
- Avoid if pregnant (check with doctor)
- Not recommended for very young children

### While Bathing
- Start with 10-15 minutes
- Drink water to stay hydrated
- Don''t stay in too long (max 30 minutes)
- Exit if you feel uncomfortable

### Hygiene
- Bathe before entering pools
- Respect separate bathing areas
- Keep facilities clean
- Follow local customs

## Cultural Aspects

### Religious Significance
- Considered sacred by locals
- Temple rituals performed
- Pilgrimage site
- Respect religious sentiments

### Local Etiquette
- Modest clothing
- Quiet behavior
- Photography restrictions in certain areas
- Follow local guidance

## Making It Part of Your Trip

### Combined Itineraries

**Option 1: Bir-Tatavani Day Trip**
- Early morning start from Bir
- 10-11 AM: Reach Tatavani
- Bathe and relax
- Lunch at Karsog
- Evening return to Bir

**Option 2: Extended Karsog Valley Tour**
- Day 1: Bir to Tatavani
- Afternoon: Hot springs
- Evening: Stay in Karsog
- Day 2: Explore Karsog Valley
- Day 3: Return to Bir

**Option 3: Trek Circuit**
- Combine with Barot visit
- Hot springs as relaxation point
- Multi-day exploration of region

## Photography

### Great Shots
- Steam rising from pools
- Mountain backdrop
- Temple architecture
- Local people and culture
- Surrounding nature

### Considerations
- Ask permission for people shots
- Respect privacy in bathing areas
- No photography inside changing rooms
- Best light: Early morning, late afternoon

## Environmental Responsibility

- Don''t pollute the springs
- Use biodegradable soap (if any)
- Dispose waste properly
- Respect natural formations
- Support local economy

## Local Tips from Regulars

1. Visit on weekdays for quieter experience
2. Early morning is most peaceful
3. Combine with Kamakhya temple visit
4. Try local food in Karsog
5. Hire local guides for trekking
6. Respect the sacred nature of the place
7. Don''t rush - allow time to relax

## The Experience

Tatavani isn''t just about hot springs; it''s about experiencing the Himalayas from a different perspective. As you soak in the warm, mineral-rich waters with cold mountain air on your face and snow peaks in the distance, you''ll understand why people have been making this journey for generations. It''s healing that goes beyond the physical - it''s a balm for the soul.', 
'https://images.unsplash.com/photo-1544161515-4ab6ce6db874', 'Wellness', 'Travel Team', 8),

('Baijnath Temple: Ancient Heritage', 'baijnath-temple', 'Explore the magnificent 13th-century Shiva temple, a masterpiece of medieval architecture and devotion.', 
'# Baijnath Temple: Where History Meets Devotion

Located in Baijnath town, about 50 km from Bir Billing, this ancient temple complex is one of the finest examples of medieval North Indian temple architecture and an important pilgrimage site dedicated to Lord Shiva as Vaidyanath (the Lord of Physicians).

## Historical Significance

### Ancient Origins
- **Built**: 1204 AD
- **Dynasty**: Katyuri Dynasty
- **Architecture**: Nagara style
- **Status**: Protected monument (Archaeological Survey of India)

### Historical Context
The temple was constructed during a period of great artistic and cultural flowering in the Himalayan regions. The inscriptions found here provide valuable insights into medieval history, trade routes, and cultural practices.

## Architectural Marvel

### Main Structure
- **Material**: Local gray stone
- **Style**: Classic North Indian shikhara (spire)
- **Intricate carvings**: Deities, mythological scenes, geometric patterns
- **Main sanctum**: Houses a stone Shiva lingam

### Key Features

**Entrance Mandapa**
- Beautifully carved pillars
- Lotus ceiling designs
- Images of various deities

**Main Shrine**
- Garbhagriha (sanctum sanctorum)
- Ancient Shiva lingam
- Nandi bull facing the shrine
- Atmospheric interior

**Exterior Carvings**
- Panels depicting stories from Hindu mythology
- Celestial beings (apsaras)
- Floral and geometric motifs
- Remarkably preserved despite centuries

### Unique Elements
- Artistic blend of various schools
- Influence of Kashmiri and local styles
- Innovative stone-joining techniques
- Earthquake-resistant traditional design

## Religious Importance

### Deity
Vaidyanath (Lord Shiva as divine physician):
- Worshipped for healing
- Especially important during Shivratri
- One of 12 Jyotirlingas (claimed by some traditions)

### Rituals
- Daily puja ceremonies
- Special observances during Shivratri
- Traditional abhishekam (ritual bathing of deity)
- Continuous worship for over 800 years

## Festivals and Events

### Maha Shivaratri
- Most important festival
- Devotees from across region
- Night-long ceremonies
- Temple beautifully decorated

### Regular Observances
- Monday worship (special for Shiva)
- Shravan month celebrations
- Full moon ceremonies

## Exploring the Complex

### What to See

**The Temple**
- Allow 1-2 hours minimum
- Early morning for fewer crowds
- Evening aarti (prayer ceremony)

**Adjacent Structures**
- Smaller shrines
- Ancient water tank
- Archaeological finds display

**Surroundings**
- River Binwa nearby
- Mountain views
- Town exploration

## Nearby Attractions

### Palampur (15 km)
- Tea gardens
- Neugal Khad
- More temples and monasteries

### Andretta (20 km)
- Artist village
- Pottery
- Art galleries

### Dharamshala (55 km)
- Tibetan culture
- Dalai Lama temple
- McLeod Ganj

## Practical Information

### Timings
- **Morning**: 6:00 AM - 12:00 PM
- **Evening**: 2:00 PM - 9:00 PM
- Best time: Early morning or evening aarti

### Entry
- No entry fee
- Dress modestly
- Remove shoes before entering
- Photography rules vary (ask priests)

### Getting There

**From Bir Billing**
- Distance: 50 km
- Time: 1.5-2 hours
- Road: Good condition

**From Dharamshala**
- Distance: 55 km
- Via Palampur
- Scenic route

**Public Transport**
- Buses from major towns
- Taxis available
- Local transport in Baijnath town

### Where to Stay

**Baijnath**
- Basic hotels and guesthouses
- Dharamshala available nearby

**Better Options**
- Palampur (more choices)
- Dharamshala
- Can be day trip from Bir

### Dining
- Simple local restaurants
- Traditional Himachali food
- Vegetarian preferred near temple
- Better options in Palampur

## Best Time to Visit

### Year-Round Destination
- **Summer (March-June)**: Pleasant, ideal for sightseeing
- **Monsoon (July-September)**: Lush but wet
- **Autumn (October-November)**: Clear views, comfortable
- **Winter (December-February)**: Cold but beautiful, fewer tourists

### Special Times
- Maha Shivaratri: Most atmospheric but crowded
- Monsoon: Greenery beautiful but travel challenging
- Early mornings: Peaceful, good light for photography

## Temple Etiquette

### Dos
- Dress modestly (cover shoulders and knees)
- Remove shoes outside
- Be quiet and respectful
- Photography okay outside (check inside)
- Join aarti if you wish

### Don''ts
- No leather items inside
- Avoid visiting during menstruation (traditional rule)
- Don''t touch deity without permission
- No smoking or alcohol nearby
- Respect worshippers

## Photography

### Best Shots
- Temple spire against sky
- Detailed carvings
- Interior during aarti
- Surrounding landscape
- Sunrise/sunset lighting

### Tips
- Ask permission for interior shots
- Respect "no photography" signs
- Best light: Golden hours
- Wide angle for architecture
- Macro for carving details

## Combining with Bir Trip

### Itinerary Ideas

**Day Trip from Bir**
- Morning: Drive to Baijnath (1.5 hrs)
- 10 AM-12 PM: Temple visit
- Lunch: Palampur
- Afternoon: Tea gardens
- Return: Evening to Bir

**Extended Tour**
- Day 1: Bir activities
- Day 2: Baijnath, Palampur, Andretta
- Day 3: Return via Dharamshala
- 3-4 days: Complete circuit

## For History Enthusiasts

### Learning More
- Archaeological Survey of India signboards
- Local guides (unofficial but knowledgeable)
- Museum in temple complex
- Photography of inscriptions

### Comparative Temples
- Similar architecture in region
- Katarmal Sun Temple (Uttarakhand)
- Jageshwar temples
- Understanding medieval period

## The Baijnath Experience

Visiting Baijnath is like stepping into a history book. The temple has witnessed nearly a millennium of prayers, festivals, and human devotion. The artisans who carved these stones centuries ago would be proud to know their work still inspires awe. Whether you come as a pilgrim, history buff, or simply a curious traveler, Baijnath offers a profound connection to India''s ancient spiritual and artistic heritage.

## Essential Tips

1. Start early to avoid crowds
2. Hire a local guide for deeper understanding
3. Combine with Palampur tea gardens
4. Wear comfortable walking shoes
5. Carry water and sun protection
6. Respect the living religious tradition
7. Allow time to absorb the atmosphere
8. Don''t rush - this isn''t just a photo stop

The Baijnath Temple isn''t just an ancient structure; it''s a living testament to the enduring power of faith, the brilliance of medieval craftsmanship, and the continuity of cultural traditions. Taking the time to truly experience it will add immeasurable depth to your journey through Himachal Pradesh.', 
'https://images.unsplash.com/photo-1582407947304-fd86f028f716', 'Culture', 'Travel Team', 10),

('Monasteries of Bir: Spiritual Journey', 'bir-monasteries', 'A guide to the beautiful Tibetan Buddhist monasteries around Bir, offering peace and spiritual insights.', 
'# The Monasteries of Bir: A Spiritual Journey

Bir''s unique character is shaped significantly by its thriving Tibetan Buddhist community. Following the Tibetan diaspora, several important monasteries and learning centers have been established here, making it a significant spiritual destination.

## Major Monasteries

### Chokling Monastery
**The Heart of Bir''s Buddhist Community**

- **Tradition**: Nyingma school
- **Founded**: 1960s
- **Architecture**: Traditional Tibetan style
- **Highlight**: Beautiful prayer hall with intricate thangkas

**What to Experience:**
- Morning and evening prayers (6 AM and 5 PM)
- Butter lamp offerings
- Large prayer wheels
- Peaceful meditation in courtyards
- Interaction with monks (if welcomed)

### Dzongsar Khyentse Chokyi Lodro Institute
**A Center for Buddhist Learning**

- **Focus**: Shedra (monastic college)
- **Education**: Buddhist philosophy and texts
- **Students**: Monks from various regions
- **Special**: Debates and discussions

**Visiting:**
- More formal than other monasteries
- Respectful silence appreciated
- Special ceremonies on Buddhist festivals
- May require permission for photography

### Palpung Sherabling Monastery
**The Magnificent Complex**

Located near Baijnath (can be combined trip):
- **Size**: One of largest in the region
- **School**: Kagyu tradition
- **Architecture**: Stunning modern Tibetan design
- **Features**: Golden statues, murals, library

**Highlights:**
- Main temple with massive Buddha statue
- Monastic college with hundreds of monks
- Annual festivals and ceremonies
- Tai Situ Rinpoche''s seat

### Deer Park Institute
**Where Buddhism Meets Academia**

- **Nature**: Educational institution
- **Focus**: Buddhist studies, philosophy, arts
- **Programs**: Courses for international students
- **Library**: Excellent collection of texts
- **Visitors**: Welcome for programs and library

## Understanding Tibetan Buddhism

### The Traditions
- **Nyingma**: Oldest school, "ancient ones"
- **Kagyu**: Emphasis on meditation
- **Gelug**: Scholarly tradition
- **Sakya**: Combines various approaches

### Key Concepts
- **Compassion**: Central to all practices
- **Meditation**: Various forms and techniques
- **Karma**: Actions and consequences
- **Dharma**: The teachings
- **Sangha**: Community of practitioners

## Experiencing Monastic Life

### Prayer Times
Most monasteries follow similar schedules:
- **Dawn (5-6 AM)**: Morning prayers
- **Evening (5-6 PM)**: Evening prayers
- **Special days**: Additional ceremonies

### Visitor Etiquette

**Dos:**
- Dress modestly
- Walk clockwise around stupas and temples
- Remove shoes when required
- Sit lower than monks
- Be quiet in prayer halls
- Ask permission for photos
- Respect prayer times

**Don''ts:**
- Don''t point feet toward altars
- Don''t touch sacred objects
- Don''t interrupt prayers
- No flash photography
- Don''t wear hats inside
- Avoid visiting during retreat times

## Festivals and Celebrations

### Losar (Tibetan New Year)
- Usually February/March
- Elaborate ceremonies
- Masked dances (Cham)
- Special foods and decorations
- Three days of celebrations

### Guru Rinpoche Birthday
- July (10th day of 5th month)
- Important for Nyingma tradition
- Special prayers and offerings
- Community gatherings

### Monlam (Great Prayer Festival)
- Prayers for world peace
- Varies by monastery
- Often after Losar

## Learning Opportunities

### Short Courses
Several monasteries offer:
- Introduction to Buddhism
- Meditation workshops
- Tibetan language basics
- Buddhist philosophy

### Longer Programs
For serious students:
- Deer Park Institute courses
- Monastic education (with commitment)
- Meditation retreats
- Philosophy studies

### Meditation and Mindfulness
- Drop-in meditation sessions
- Vipassana courses
- Sound healing
- Yoga combined with Buddhist philosophy

## Tibetan Culture in Bir

### The Community
- Refugees and their descendants
- Preservation of Tibetan culture
- Traditional arts and crafts
- Educational institutions

### Cultural Experiences
- Thangka painting workshops
- Tibetan cooking classes
- Language exchange
- Cultural programs

### Handicrafts
- Tibetan carpets
- Prayer flags
- Singing bowls
- Traditional jewelry
- Religious artifacts

## Volunteering Opportunities

Several organizations welcome volunteers:
- Teaching English to monks
- Library assistance
- Event organization
- Construction and maintenance
- Cultural exchange programs

## Practical Information

### Best Times to Visit

**For Prayers:**
- Early morning (before sunrise)
- Late afternoon/evening
- Special full moon days

**For Festivals:**
- Check Tibetan calendar
- Book accommodation early
- Losar is most spectacular

**For Learning:**
- Deer Park: Check course schedules
- Many courses start in spring or autumn

### Photography
- Always ask permission
- Often okay outside
- Usually restricted during prayers
- Never with flash
- Respect sacred images

### Dress Code
- Cover shoulders and knees
- Remove hats inside
- Take off shoes when entering
- Warm clothes for early morning

## Combining Monastery Visits

### Half-Day Tour
- Morning: Chokling Monastery prayers
- Late morning: Dzongsar Institute
- Lunch: Tibetan restaurant
- Afternoon: Deer Park Institute

### Full-Day Extended Tour
- Early morning: Chokling Monastery
- Breakfast: Tibetan cafe
- Mid-morning: Deer Park
- Lunch: Traditional Tibetan meal
- Afternoon: Drive to Palpung (30 km)
- Evening: Return to Bir

### Spiritual Immersion
- Week-long stay in Bir
- Attend daily prayers
- Take a short course
- Practice meditation
- Volunteer work
- Deep cultural exchange

## Food and Hospitality

### Monastery Food
- Simple vegetarian meals
- Butter tea tradition
- Often offered to visitors
- Wholesome and healthy

### Tibetan Cuisine in Bir
- Momos (dumplings)
- Thukpa (noodle soup)
- Tingmo (steamed bread)
- Butter tea
- Various stews and curries

## Books and Resources

### Recommended Reading
- "The Art of Happiness" (Dalai Lama)
- "What the Buddha Taught"
- "The Tibetan Book of Living and Dying"
- Monastery-specific texts

### Local Resources
- Deer Park library
- Monastery bookshops
- English texts available
- Ask monks for recommendations

## Supporting the Community

### How to Help
- Buy authentic handicrafts
- Eat at Tibetan restaurants
- Donate to monasteries
- Enroll in paid courses
- Volunteer your time
- Spread awareness

### Responsible Tourism
- Respect religious practices
- Don''t treat monasteries as just tourist sites
- Be genuine in interactions
- Support legitimate causes
- Understand the political situation

## The Refugee Story

### Understanding the Context
- 1959 Tibetan uprising
- Exile to India
- Preservation of culture
- Current challenges
- Hope for the future

### Sensitivity
- Political topics can be sensitive
- Listen more than you speak
- Respect their situation
- Appreciate their resilience
- Support their cause thoughtfully

## Beyond Tourism

Visiting these monasteries isn''t just about checking boxes on a sightseeing itinerary. It''s an opportunity to:
- Experience living Buddhism
- Learn about impermanence and compassion
- Find moments of peace
- Connect with a resilient community
- Gain new perspectives on life
- Support cultural preservation

## Personal Reflections

Many visitors report that their monastery experiences in Bir were transformative:
- Finding unexpected peace
- Rethinking priorities
- Experiencing genuine compassion
- Learning mindfulness
- Making lasting connections

## Final Thoughts

The monasteries of Bir offer something increasingly rare in our modern world - authentic spaces for reflection, learning, and spiritual growth. Whether you come as a curious tourist, a serious spiritual seeker, or somewhere in between, approach these sacred spaces with respect and openness. The monks and nuns have preserved their traditions under incredibly difficult circumstances. Their doors are open, their teachings accessible, and their welcome genuine.

Take off your shoes, quiet your mind, and step into a world where ancient wisdom still guides daily life. You might just discover that the peace you find in these monasteries is something you can carry with you long after you leave.', 
'https://images.unsplash.com/photo-1590736969955-71cc94901144', 'Culture', 'Travel Team', 12);

-- ============================================
-- 5. INSERT COMPREHENSIVE LISTINGS DATA
-- ============================================

-- Accommodations
INSERT INTO accommodations (name, location, type, rating, price, image, description, amenities, contact, website) VALUES
('The Himalayan Village', 'Bir', 'Resort', 4.5, '₹4000-8000', 'https://images.unsplash.com/photo-1542314831-068cd1dbfeeb', 'Luxury resort with stunning mountain views and modern amenities', ARRAY['WiFi', 'Restaurant', 'Parking', 'Mountain View', 'Garden'], '+91-1234567890', 'http://example.com'),
('Zostel Bir', 'Bir', 'Hostel', 4.3, '₹500-1500', 'https://images.unsplash.com/photo-1555854877-bab0e564b8d5', 'Popular backpacker hostel with vibrant atmosphere', ARRAY['WiFi', 'Cafe', 'Common Area', 'Events'], '+91-1234567891', 'http://zostel.com'),
('June 16 Guest House', 'Bir', 'Guesthouse', 4.4, '₹1200-2500', 'https://images.unsplash.com/photo-1564501049412-61c2a3083791', 'Cozy guesthouse run by friendly hosts', ARRAY['WiFi', 'Garden', 'Home Cooked Meals', 'Parking'], '+91-1234567892', 'http://example.com'),
('Panchvati Cottage', 'Billing', 'Cottage', 4.2, '₹2000-3500', 'https://images.unsplash.com/photo-1568495248636-6432b97bd949', 'Mountain cottages near paragliding take-off site', ARRAY['Mountain View', 'Bonfire', 'Parking'], '+91-1234567893', 'http://example.com'),
('Barot Valley Homestay', 'Barot', 'Homestay', 4.6, '₹800-1500', 'https://images.unsplash.com/photo-1523217582562-09d0def993a6', 'Traditional homestay in pristine Barot valley', ARRAY['Home Cooked Meals', 'River View', 'Trekking Guide', 'Fishing'], '+91-1234567894', NULL),
('Rajgundha Meadows Camp', 'Rajgundha', 'Camping', 4.7, '₹1500-2500', 'https://images.unsplash.com/photo-1504280390367-361c6d9f38f4', 'Camping experience with stunning sunset views', ARRAY['Bonfire', 'Meals Included', 'Guide Service', 'Stargazing'], '+91-1234567895', NULL),
('Silver Birch Camps', 'Bir', 'Camping', 4.1, '₹1000-2000', 'https://images.unsplash.com/photo-1478131143081-80f7f84ca84d', 'Comfortable camping near Bir landing site', ARRAY['Tents', 'Meals', 'Activities', 'Bonfire'], '+91-1234567896', 'http://example.com'),
('Gunehr Valley Hut', 'Gunehr', 'Basic Hut', 3.8, '₹500-800', 'https://images.unsplash.com/photo-1469474968028-56623f02e42e', 'Basic mountain shelter for trekkers', ARRAY['Basic Amenities', 'Mountain View'], '+91-1234567897', NULL);

-- Cafes
INSERT INTO cafes (name, location, description, cuisine, price, hours, image, rating, contact) VALUES
('Garden Cafe', 'Bir', 'Popular cafe with beautiful garden setting and great coffee', ARRAY['Italian', 'Israeli', 'Indian', 'Continental'], '₹200-500', '8 AM - 10 PM', 'https://images.unsplash.com/photo-1554118811-1e0d58224f24', 4.5, '+91-1234567898'),
('Cafe Illiterati', 'Bir', 'Bookstore cafe with mountain views and organic food', ARRAY['European', 'Organic', 'Vegan'], '₹250-600', '8 AM - 9 PM', 'https://images.unsplash.com/photo-1445116572660-236099ec97a0', 4.6, '+91-1234567899'),
('The 4 Tables Project', 'Bir', 'Intimate cafe focused on quality over quantity', ARRAY['Italian', 'Continental'], '₹300-700', '9 AM - 8 PM', 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4', 4.7, '+91-1234567900'),
('Avva Bistro', 'Bir', 'Fusion food with Israeli and Indian flavors', ARRAY['Israeli', 'Mediterranean', 'Indian'], '₹250-550', '8 AM - 10 PM', 'https://images.unsplash.com/photo-1466978913421-dad2ebd01d17', 4.4, '+91-1234567901'),
('Vairagi Cafe', 'Bir', 'Spiritual cafe with meditation space and healthy food', ARRAY['Organic', 'Vegan', 'Indian'], '₹150-400', '7 AM - 9 PM', 'https://images.unsplash.com/photo-1559925393-8be0ec4767c8', 4.3, '+91-1234567902'),
('Barot Dhaba', 'Barot', 'Traditional Himachali food by the riverside', ARRAY['North Indian', 'Himachali'], '₹100-300', '7 AM - 10 PM', 'https://images.unsplash.com/photo-1552566626-52f8b828add9', 4.2, '+91-1234567903'),
('Bir Landing Cafe', 'Bir Landing Site', 'Quick bites and refreshments at landing site', ARRAY['Snacks', 'Indian', 'Beverages'], '₹100-250', '9 AM - 7 PM', 'https://images.unsplash.com/photo-1559339352-11d035aa65de', 4.0, '+91-1234567904');

-- Activities (Paragliding Companies and other activities)
INSERT INTO activities (name, description, location, price, duration, difficulty, image, booking_link, contact) VALUES
('Billing Paragliding', 'Professional tandem paragliding from Billing take-off site', 'Billing to Bir', '₹2500-3500', '20-30 minutes', 'Beginner', 'https://images.unsplash.com/photo-1595074474374-3dae9c2e0076', 'http://example.com/book', '+91-1234567905'),
('Himalayan Wings Paragliding', 'Experienced pilots, best equipment, video included', 'Billing', '₹3000-4000', '25-35 minutes', 'Beginner', 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4', 'http://example.com/book', '+91-1234567906'),
('Sky High Adventures', 'Paragliding with acrobatic maneuvers option', 'Billing', '₹3500-5000', '30-45 minutes', 'Beginner to Advanced', 'https://images.unsplash.com/photo-1540206395-68808572332f', 'http://example.com/book', '+91-1234567907'),
('Bir Billing Flyers', 'Long flights, thermal soaring experiences', 'Billing', '₹3000-6000', '30-90 minutes', 'Beginner to Intermediate', 'https://images.unsplash.com/photo-1564936281991-3587a6cdda88', 'http://example.com/book', '+91-1234567908'),
('Paragliding School Bir', 'Learn to fly - courses from 3 to 28 days', 'Bir', '₹15000-80000', '3-28 days', 'All Levels', 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4', 'http://example.com/book', '+91-1234567909'),
('Mountain Biking Trails', 'Guided mountain biking through scenic trails', 'Bir', '₹1500-3000', '3-5 hours', 'Intermediate', 'https://images.unsplash.com/photo-1511994477422-b69e44bd4ea9', 'http://example.com/book', '+91-1234567910'),
('Barot Trout Fishing', 'Fishing permits and guided trout fishing', 'Barot', '₹500-1500', '4-8 hours', 'Easy', 'https://images.unsplash.com/photo-1583212292454-1fe6229603b7', NULL, '+91-1234567911'),
('Rajgundha Trek', 'Guided trek from Billing to Rajgundha with camping', 'Billing to Rajgundha', '₹3000-5000', '2 days', 'Moderate', 'https://images.unsplash.com/photo-1551632811-561732d1e306', 'http://example.com/book', '+91-1234567912'),
('Yoga and Meditation Retreat', 'Week-long yoga and meditation programs', 'Bir', '₹20000-40000', '7 days', 'All Levels', 'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b', 'http://example.com/book', '+91-1234567913'),
('Monastery Cultural Tour', 'Guided tour of Bir''s monasteries and Tibetan culture', 'Bir', '₹800-1500', '4-6 hours', 'Easy', 'https://images.unsplash.com/photo-1590736969955-71cc94901144', NULL, '+91-1234567914');

-- Treks
INSERT INTO treks (name, description, difficulty, duration, distance, best_season, starting_point, image) VALUES
('Rajgundha Trek via Billing', 'Popular trek from Billing to the beautiful Rajgundha meadows', 'Moderate', '1-2 days', '12 km', 'April to October', 'Billing', 'https://images.unsplash.com/photo-1551632811-561732d1e306'),
('Barot to Billing Trek', 'Challenging multi-day trek through pristine forests', 'Challenging', '3-4 days', '35 km', 'May to October', 'Barot', 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b'),
('Bir to Barot Valley Trek', 'Scenic trek connecting two beautiful valleys', 'Moderate', '2-3 days', '25 km', 'April to November', 'Bir', 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4'),
('Gunehr Exploration Trek', 'Off-beat trek to unexplored Gunehr valley', 'Moderate to Challenging', '2-3 days', '20 km', 'May to October', 'Baragaon', 'https://images.unsplash.com/photo-1519904981063-b0cf448d479e'),
('Gharnala Day Trek', 'Easy day trek around Gharnala with beautiful views', 'Easy', '4-6 hours', '8 km', 'March to November', 'Gharnala', 'https://images.unsplash.com/photo-1454496522488-7a8e488e8606'),
('Billing Peak Trek', 'Short but steep trek to the Billing peak', 'Moderate', '3-4 hours', '5 km', 'April to October', 'Billing', 'https://images.unsplash.com/photo-1486870591958-9b9d0d1dda99');

-- ============================================
-- 6. CREATE INDEXES FOR BETTER PERFORMANCE
-- ============================================

CREATE INDEX IF NOT EXISTS idx_destinations_slug ON destinations(slug);
CREATE INDEX IF NOT EXISTS idx_articles_slug ON articles(slug);
CREATE INDEX IF NOT EXISTS idx_accommodations_location ON accommodations(location);
CREATE INDEX IF NOT EXISTS idx_cafes_location ON cafes(location);
CREATE INDEX IF NOT EXISTS idx_activities_location ON activities(location);

-- ============================================
-- 7. ENABLE ROW LEVEL SECURITY (Optional but recommended)
-- ============================================

ALTER TABLE destinations ENABLE ROW LEVEL SECURITY;
ALTER TABLE articles ENABLE ROW LEVEL SECURITY;
ALTER TABLE accommodations ENABLE ROW LEVEL SECURITY;
ALTER TABLE cafes ENABLE ROW LEVEL SECURITY;
ALTER TABLE activities ENABLE ROW LEVEL SECURITY;
ALTER TABLE treks ENABLE ROW LEVEL SECURITY;

-- Create policies for public read access
CREATE POLICY "Public read access for destinations" ON destinations FOR SELECT USING (true);
CREATE POLICY "Public read access for articles" ON articles FOR SELECT USING (true);
CREATE POLICY "Public read access for accommodations" ON accommodations FOR SELECT USING (true);
CREATE POLICY "Public read access for cafes" ON cafes FOR SELECT USING (true);
CREATE POLICY "Public read access for activities" ON activities FOR SELECT USING (true);
CREATE POLICY "Public read access for treks" ON treks FOR SELECT USING (true);

-- ============================================
-- MIGRATION COMPLETE
-- ============================================
```

## After Running the Migration

1. **Verify the data**: Go to "Table Editor" in Supabase dashboard to see if tables are populated
2. **Check for errors**: Any errors will be shown in the SQL editor output panel
3. **Test your website**: Refresh your application to see the new data

## Troubleshooting

### If you get "table already exists" errors:
- The IF NOT EXISTS clauses should prevent this
- If it still occurs, you can skip the CREATE TABLE section

### If you get permission errors:
- Make sure you're using the "SQL Editor" (not the terminal)
- You must be the project owner or have appropriate permissions

### If data doesn't appear:
- Check the browser console for errors
- Verify the table names in your code match those in the database
- Check if RLS (Row Level Security) policies are working

### If you need to redo the migration:
- Run the TRUNCATE commands first to clear existing data
- Then run the INSERT commands again

## Important Notes

1. **This will clear existing data** in the affected tables - backup first if needed
2. **The images use placeholder URLs** - you may want to replace them with your own images
3. **Phone numbers and websites are examples** - update with real contact information
4. **Prices are in INR** - adjust if needed for your target market
5. **All data is sample data** - customize based on real businesses and locations

## Next Steps After Migration

1. Replace placeholder images with real photos
2. Update contact information with actual phone numbers and websites
3. Add more listings based on real businesses
4. Keep the data updated regularly
5. Consider adding an admin panel for easy updates
