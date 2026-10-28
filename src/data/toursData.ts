import { TourPackage } from '../types';

export const TOURS_DATA: TourPackage[] = [
  {
    id: 'ancient-kingdoms',
    title: 'The Ancient Kingdoms of Ethiopia',
    category: 'historical',
    duration: '14 Days',
    daysCount: 14,
    route: 'Addis Ababa • Lalibela • Gondar • Simien Mountains • Bahir Dar',
    summary: 'Travel through the heart of Ethiopia’s northern highlands, where ancient kingdoms, remarkable churches, mountain landscapes and living traditions come together.',
    overview: `Travel through the heart of Ethiopia's northern highlands, where ancient kingdoms, remarkable churches, mountain landscapes and living traditions come together.
Begin in Addis Ababa before flying north to Lalibela and its extraordinary rock-hewn churches. Continue to Gondar, once the capital of the Ethiopian empire, then spend time among the dramatic landscapes of the Simien Mountains.
Your journey ends around Lake Tana and Bahir Dar, where ancient monasteries and lakeside communities offer another perspective on Ethiopia's long history.`,
    image: 'https://res.cloudinary.com/dw1ohipim/image/upload/f_auto,q_auto,w_1600/v1784044758/ohuohsbdy66wnnbgc6zw.jpg',
    gallery: [
      'https://images.unsplash.com/photo-1588668214407-6ea9a6d8c272?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1609873834199-4d6b5e0c52f6?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1516426122078-c23e76319801?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1000&q=80'
    ],
    highlights: [
      'Discover Addis Ababa and modern Ethiopian life',
      'Explore Lalibela’s remarkable rock-hewn churches',
      'Experience Gondar’s royal heritage and medieval castles',
      'Spend two nights in the dramatic Simien Mountains',
      'Look for endemic gelada monkeys grazing in highlands',
      'Experience the tranquil landscapes around Lake Tana',
      'Visit historic island monasteries by private boat',
      'Enjoy Ethiopian food, coffee ceremonies and local hospitality'
    ],
    groupType: 'Private (2–8 guests) or Custom Group',
    accommodationType: 'Hand-selected boutique lodges, heritage highland hotels & luxury city properties',
    transportType: 'Private 4WD Land Cruisers, private motorized Lake Tana boat, scheduled domestic flights',
    inclusions: [
      '13 nights accommodation in boutique lodges, mountain retreats and premium hotels',
      'All internal scheduled domestic flights within Ethiopia (Addis – Lalibela, Gondar – Addis)',
      'Private modern 4x4 Land Cruiser with dedicated professional driver',
      'Licensed English-speaking Senior Expedition Guide throughout the circuit',
      'Expert local community guides and historical guardians at all UNESCO sites',
      'All national park entry fees, Simien scout escorts, and church admission fees',
      'Private boat excursion across Lake Tana to Zege Peninsula monasteries',
      'Daily breakfast, welcome dinner in Addis Ababa, and all meals during Simien trek',
      'Traditional Ethiopian coffee roasting ceremony & cultural experiences',
      'Continuous bottled mineral water and light snacks during overland excursions',
      '24/7 dedicated on-the-ground concierge support'
    ],
    exclusions: [
      'International round-trip transatlantic / intercontinental airfare',
      'Ethiopian tourist eVisa processing fees',
      'Comprehensive travel, medical, and evacuation insurance (mandatory)',
      'Discretionary gratuities for guides, drivers, boat captains, and lodge staff',
      'Personal expenses, laundry, and alcoholic beverages beyond curated tastings'
    ],
    suggestedJourney: [
      {
        day: 1,
        title: 'Arrive in Addis Ababa',
        description: 'Welcome to Ethiopia. Settle into Addis Ababa, enjoy a relaxing evening at your boutique accommodation, and meet your dedicated local team and private expedition host.',
        location: 'Addis Ababa',
        meals: 'Dinner included',
        accommodation: 'Sheraton Addis / Hyatt Regency / Boutique Villa'
      },
      {
        day: 2,
        title: 'Discover Addis Ababa',
        description: 'Explore the National Museum (home of Lucy), important historical landmarks, and the vibrant neighborhoods that give the city its unique character. Along the way, begin to understand Ethiopia’s history, culinary heritage, and modern identity.',
        location: 'Addis Ababa',
        meals: 'Breakfast & Lunch included',
        accommodation: 'Sheraton Addis / Hyatt Regency'
      },
      {
        day: 3,
        title: 'Fly to Lalibela',
        description: 'Travel north on a scenic domestic flight to Lalibela. Settle into your mountain lodge with sweeping views across the Lasta highlands.',
        location: 'Lalibela',
        meals: 'Breakfast & Dinner',
        accommodation: 'Mezena Lodge / Sora Lodge'
      },
      {
        day: 4,
        title: 'Lalibela’s Rock-Hewn Churches',
        description: 'Explore the extraordinary churches carved directly into the living red volcanic rock, learning about the history, living faith, architectural marvels, and craftsmanship behind them, including iconic Bete Giyorgis.',
        location: 'Lalibela',
        meals: 'Breakfast & Dinner',
        accommodation: 'Mezena Lodge / Sora Lodge'
      },
      {
        day: 5,
        title: 'Lalibela Beyond the Churches',
        description: 'Take time to experience the town and surrounding highland communities, with opportunities to witness rural life, taste local cuisine, visit Asheten Maryam monastery, and see another side of Lalibela beyond its famous monuments.',
        location: 'Lalibela',
        meals: 'Breakfast & Dinner',
        accommodation: 'Mezena Lodge / Sora Lodge'
      },
      {
        day: 6,
        title: 'Lalibela to Gondar',
        description: 'Continue overland or via brief flight to Gondar, the famed 17th-century royal capital of Emperor Fasilides.',
        location: 'Gondar',
        meals: 'Breakfast & Dinner',
        accommodation: 'Goha Hotel / Gondar Hills Resort'
      },
      {
        day: 7,
        title: 'Gondar Royal Enclosure',
        description: 'Explore Gondar’s fairy-tale stone castles in the Royal Enclosure, Fasilides’ historic bath, and the ceiling of 80 painted cherubs at Debre Berhan Selassie Church.',
        location: 'Gondar',
        meals: 'Breakfast & Dinner',
        accommodation: 'Goha Hotel / Gondar Hills Resort'
      },
      {
        day: 8,
        title: 'Gondar to the Simien Mountains',
        description: 'Travel into the Simien highlands where the landscape changes dramatically into sweeping escarpments and towering pinnacle peaks.',
        location: 'Simien Mountains',
        meals: 'All meals included (Full Board)',
        accommodation: 'Limalimo Lodge / Simien Lodge'
      },
      {
        day: 9,
        title: 'Simien Mountains National Park',
        description: 'Spend a full day among the mountains, searching for endemic gelada monkey troops, exploring dramatic viewpoints like Jinbar Waterfall, and enjoying some of Africa’s most spectacular scenery.',
        location: 'Simien Mountains',
        meals: 'All meals included (Full Board)',
        accommodation: 'Limalimo Lodge / Simien Lodge'
      },
      {
        day: 10,
        title: 'Simien Mountains to Gondar',
        description: 'Return to Gondar for a relaxed evening and traditional dinner accompanied by local Azmari musicians.',
        location: 'Gondar',
        meals: 'Breakfast & Dinner',
        accommodation: 'Gondar Hills Resort'
      },
      {
        day: 11,
        title: 'Gondar to Bahir Dar',
        description: 'Travel south toward Bahir Dar and the palm-fringed southern shores of Lake Tana.',
        location: 'Bahir Dar',
        meals: 'Breakfast & Dinner',
        accommodation: 'Kuriftu Resort & Spa Lake Tana / Avanti Blue Nile'
      },
      {
        day: 12,
        title: 'Lake Tana Monasteries & Blue Nile Falls',
        description: 'Take a private boat journey across Lake Tana to visit centuries-old island monasteries, marvel at medieval frescoes, and visit the historic Blue Nile Falls (Tis Abay).',
        location: 'Bahir Dar & Lake Tana',
        meals: 'Breakfast & Lunch',
        accommodation: 'Kuriftu Resort & Spa Lake Tana'
      },
      {
        day: 13,
        title: 'Bahir Dar to Addis Ababa',
        description: 'Fly back to Addis Ababa for your final celebratory evening in Ethiopia, exploring specialty coffee roasters and artisan workshops.',
        location: 'Addis Ababa',
        meals: 'Breakfast & Farewell Celebration Dinner',
        accommodation: 'Sheraton Addis / Hyatt Regency'
      },
      {
        day: 14,
        title: 'Departure',
        description: 'Transfer to Bole International Airport for your onward international flight with unforgettable memories of the ancient path.',
        location: 'Addis Ababa',
        meals: 'Breakfast',
        accommodation: 'Day room / Airport transfer'
      }
    ],
    bestSuitedTo: 'First-time visitors, history lovers, culture enthusiasts, photographers and travelers looking for a well-rounded introduction to northern Ethiopia.',
    canBeCustomized: true,
    priceEstimate: 'Custom Luxury Quotation',
    difficulty: 'Moderate'
  },
  {
    id: 'landscapes-lakes',
    title: 'Landscapes, Lakes & Living Cultures',
    category: 'wildlife',
    duration: '14 Days',
    daysCount: 14,
    route: 'Addis Ababa • Rift Valley • Bale Mountains • Arba Minch • Omo Valley',
    summary: 'Travel south from Addis Ababa through some of Ethiopia’s most varied landscapes, combining Rift Valley lakes, the alpine Bale highlands, and southern cultural encounters.',
    overview: `Travel south from Addis Ababa through some of Ethiopia's most varied landscapes.
This journey combines the lakes and volcanic landscapes of the Rift Valley with the highlands of Bale and the cultural diversity of southern Ethiopia.
There is time for nature, wildlife and local encounters without turning the journey into a race from one destination to the next.`,
    image: 'https://res.cloudinary.com/dw1ohipim/image/upload/f_auto,q_auto,w_1600/v1786277685/koljczs1kdgfy1myq0qq.jpg',
    gallery: [
      'https://images.unsplash.com/photo-1544735716-392fe2489ffa?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1528164344705-475426879c0d?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1516426122078-c23e76319801?auto=format&fit=crop&w=1000&q=80'
    ],
    highlights: [
      'Experience Ethiopia’s Great Rift Valley',
      'Relax around the shores of Lake Langano',
      'Discover the pristine wilderness of the Bale Mountains',
      'Stay at the legendary Argash Lodge',
      'Explore southern landscapes, endemic wildlife and cloud forests',
      'Visit Arba Minch and take a boat safari on Lake Chamo',
      'Experience local communities and vibrant weekly markets',
      'Discover the deep cultural heritage and diversity of the Omo Valley',
      'Travel through changing landscapes from cool highlands to warm lowlands'
    ],
    groupType: 'Private (2–8 guests) or Custom Group',
    accommodationType: 'Eco-wilderness lodges, lakeside resorts & luxury safari tents',
    transportType: 'Specially outfitted 4WD Land Cruisers & private motorized lake boats',
    inclusions: [
      '13 nights premium lodge and resort accommodation',
      'Private 4x4 safari-equipped expedition vehicle with experienced bush driver',
      'Certified English-speaking senior naturalist & cultural anthropologist guide',
      'All national park fees (Bale, Nechisar) and wildlife tracking scout permits',
      'Lake Chamo private boat safari with local ranger',
      'Ethical, respectful community visits across Dorze and Omo Valley villages',
      'All meals throughout Bale Mountains and Omo Valley expeditions',
      'Daily bottled spring water and trail hydration packs',
      'Addis Ababa airport transfers and domestic flight arrangements where requested'
    ],
    exclusions: [
      'International transatlantic airfare',
      'eVisa fees and medical evacuation insurance',
      'Tips and personal discretionary gratuities',
      'Alcoholic drinks beyond complimentary meals'
    ],
    suggestedJourney: [
      { day: 1, title: 'Addis Ababa', description: 'Arrival and warm welcome to Ethiopia. Transfer to your luxury hotel and rest.', location: 'Addis Ababa', meals: 'Dinner', accommodation: 'Hyatt Regency Addis' },
      { day: 2, title: 'Addis Ababa Cultural Tour', description: 'Explore the capital through its history, culture, vibrant food scene, and traditional coffee.', location: 'Addis Ababa', meals: 'Breakfast & Lunch', accommodation: 'Hyatt Regency Addis' },
      { day: 3, title: 'Addis Ababa to Lake Langano', description: 'Leave the city behind and enter the scenic Rift Valley. Spend a relaxing afternoon beside Lake Langano.', location: 'Lake Langano', meals: 'Breakfast & Dinner', accommodation: 'Hara Langano Eco Lodge / Sabana Resort' },
      { day: 4, title: 'Rift Valley to Bale Mountains', description: 'Continue through changing landscapes rising toward the afro-alpine Bale highlands.', location: 'Bale Mountains', meals: 'Full Board', accommodation: 'Bale Mountain Lodge / Kitchona Eco Lodge' },
      { day: 5, title: 'Bale Mountains Sanetti Plateau', description: 'Begin exploring one of Ethiopia’s most critical highland ecosystems, searching for the rare Ethiopian Wolf.', location: 'Bale Mountains', meals: 'Full Board', accommodation: 'Bale Mountain Lodge' },
      { day: 6, title: 'Harenna Cloud Forest', description: 'A full day to experience the Sanetti Plateau, search for wild forest coffee, and hike scenic cloud trails.', location: 'Bale Mountains', meals: 'Full Board', accommodation: 'Bale Mountain Lodge' },
      { day: 7, title: 'Argash Lodge & Sidama Region', description: 'Enjoy a slower day surrounded by nature, aromatic flora, and indigenous coffee plantations at Argash Lodge.', location: 'Sidama & Yirgalem', meals: 'Full Board', accommodation: 'Aregash Lodge' },
      { day: 8, title: 'Journey South to Arba Minch', description: 'Continue toward southern Ethiopia, passing through fertile rural communities and changing scenery.', location: 'Arba Minch', meals: 'Breakfast & Dinner', accommodation: 'Paradise Lodge / Haile Resort Arba Minch' },
      { day: 9, title: 'Arba Minch & Dorze Highlands', description: 'Discover Arba Minch, explore the bamboo beehive dwellings of the Dorze weaving community in Chencha.', location: 'Arba Minch', meals: 'Breakfast & Dinner', accommodation: 'Paradise Lodge Arba Minch' },
      { day: 10, title: 'Lake Chamo Boat Safari', description: 'Explore Lake Chamo on a private boat safari observing giant Nile crocodiles, hippos, and abundant waterbirds.', location: 'Lake Chamo', meals: 'Breakfast & Lunch', accommodation: 'Paradise Lodge Arba Minch' },
      { day: 11, title: 'Toward the Omo Valley', description: 'Travel deeper into southern Ethiopia into the heartland of ancient tribal traditions (Turmi / Jinka).', location: 'Omo Valley', meals: 'Full Board', accommodation: 'Buska Lodge / Eco Omo Lodge' },
      { day: 12, title: 'Omo Valley Cultural Encounter', description: 'Meet local communities with respectful local guides to learn about traditions, livelihoods, and everyday life.', location: 'Omo Valley', meals: 'Full Board', accommodation: 'Buska Lodge' },
      { day: 13, title: 'Omo Valley River & Markets', description: 'Continue exploring the region with unhurried time for cultural experiences, local markets, and riverside sunsets.', location: 'Omo Valley', meals: 'Full Board', accommodation: 'Buska Lodge' },
      { day: 14, title: 'Return to Addis Ababa / Departure', description: 'Fly from Arba Minch or Jinka to Addis Ababa for final shopping and international departure.', location: 'Addis Ababa', meals: 'Breakfast', accommodation: 'Day room / Airport transfer' }
    ],
    bestSuitedTo: 'Nature lovers, photographers, wildlife enthusiasts and travelers interested in culture and community experiences.',
    canBeCustomized: true,
    priceEstimate: 'Custom Luxury Quotation',
    difficulty: 'Moderate'
  },
  {
    id: 'rift-to-harar',
    title: 'From the Rift Valley to Harar',
    category: 'cultural',
    duration: '14 Days',
    daysCount: 14,
    route: 'Addis Ababa • Rift Valley • Awash • Afar • Dire Dawa • Harar',
    summary: 'Discover an eastern Ethiopia of dramatic contrasts—from volcanic terrain and dry savannah lowlands to Dire Dawa and the ancient walled city of Harar.',
    overview: `Discover an eastern Ethiopia that feels very different from the northern highlands.
Travel through the Rift Valley toward the landscapes of Afar, then continue to Dire Dawa and the ancient walled city of Harar.
This is a journey of changing landscapes, cultures and histories—from volcanic terrain and dry lowlands to one of Ethiopia's most distinctive historic cities.`,
    image: 'https://res.cloudinary.com/dw1ohipim/image/upload/f_auto,q_auto,w_1600/v1784496024/ywsf1mxm5sdpsb8znls6.jpg',
    gallery: [
      'https://images.unsplash.com/photo-1584646098378-0874589d76b1?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1509316975850-ff9c5deb0cd9?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1547471080-7cc2caa01a7e?auto=format&fit=crop&w=1000&q=80'
    ],
    highlights: [
      'Explore the Great Rift Valley geological wonders',
      'Experience the wildlife and waterfalls around Awash National Park',
      'Discover the striking volcanic terrain of the Afar region',
      'Travel through the diverse landscapes of eastern Ethiopia',
      'Experience Dire Dawa’s historic French-colonial railway heritage',
      'Explore Harar’s historic UNESCO walled old city (Jugol)',
      'Visit traditional markets, spice stalls and craft neighborhoods',
      'Learn about Harari culture and traditional architecture',
      'Experience Harar’s famous evening hyena feeding tradition'
    ],
    groupType: 'Private (2–8 guests) or Custom Group',
    accommodationType: 'Historic Harari heritage guesthouses, safari lodges & colonial boutique hotels',
    transportType: '4WD overland vehicles & scheduled domestic flights',
    inclusions: [
      '13 nights accommodation across unique regional lodges and heritage guesthouses',
      'Private overland transportation throughout with experienced desert driver',
      'Certified English-speaking cultural expedition lead & specialist Harari historian',
      'All entry permits, Awash National Park fees, and museum admissions',
      'Nightly Hyena feeding master session in Harar',
      'All breakfasts and indicated regional dinners',
      'Domestic flight arrangements connecting Dire Dawa and Addis Ababa',
      '24/7 dedicated support team'
    ],
    exclusions: [
      'International flights and tourist visas',
      'Travel insurance and medical coverage',
      'Gratuities and incidental personal items'
    ],
    suggestedJourney: [
      { day: 1, title: 'Addis Ababa', description: 'Arrival and welcome to Ethiopia. Settle into the city.', location: 'Addis Ababa', meals: 'Dinner', accommodation: 'Boutique Hotel Addis' },
      { day: 2, title: 'Addis Ababa Overview', description: 'Explore the capital and gain an introduction to Ethiopia’s history and contemporary life.', location: 'Addis Ababa', meals: 'Breakfast & Lunch', accommodation: 'Boutique Hotel Addis' },
      { day: 3, title: 'Addis Ababa to the Rift Valley', description: 'Begin the journey east into the Great Rift Valley, viewing volcanic crater lakes.', location: 'Rift Valley', meals: 'Breakfast & Dinner', accommodation: 'Doho Lodge / Awash Falls Lodge' },
      { day: 4, title: 'Awash National Park', description: 'Discover the landscape, Awash River gorge, and wildlife around Awash National Park.', location: 'Awash', meals: 'Full Board', accommodation: 'Awash Falls Lodge' },
      { day: 5, title: 'Awash to Afar', description: 'Continue toward the distinctive, vast landscapes of the Afar region.', location: 'Afar', meals: 'Full Board', accommodation: 'Semera Hotel / Desert Lodge' },
      { day: 6, title: 'Afar Geothermal Experience', description: 'Spend time learning about the region, its unique geothermal environment, and its pastoral communities.', location: 'Afar', meals: 'Full Board', accommodation: 'Semera Hotel / Desert Lodge' },
      { day: 7, title: 'Eastern Ethiopia to Dire Dawa', description: 'Continue across the changing landscapes toward the historic railway hub of Dire Dawa.', location: 'Dire Dawa', meals: 'Breakfast & Dinner', accommodation: 'Ras Hotel / Triangle Hotel' },
      { day: 8, title: 'Dire Dawa Franco-Ethiopian Heritage', description: 'Explore the city’s historic train station, French colonial architecture, markets, and multicultural character.', location: 'Dire Dawa', meals: 'Breakfast & Dinner', accommodation: 'Ras Hotel Dire Dawa' },
      { day: 9, title: 'Dire Dawa to Harar Jugol', description: 'Travel into the hills to Harar and enter one of Islam’s most sacred historic cities.', location: 'Harar', meals: 'Breakfast & Dinner', accommodation: 'Rawda Heritage Guesthouse / Grand Gato' },
      { day: 10, title: 'Harar Old City (UNESCO)', description: 'Explore the ancient walls, 368 narrow alleys, traditional Harari houses (Gegar), and bustling spice markets.', location: 'Harar', meals: 'Breakfast & Lunch', accommodation: 'Rawda Heritage Guesthouse' },
      { day: 11, title: 'Harari Culture & Hyena Ritual', description: 'Discover local food, traditions, intricate crafts, and witness the nightly hyena men ritual at dusk.', location: 'Harar', meals: 'Breakfast & Dinner', accommodation: 'Rawda Heritage Guesthouse' },
      { day: 12, title: 'Harar Coffee Mills & Countryside', description: 'Continue exploring the city, historic coffee mills, and surrounding scenic hill viewpoints.', location: 'Harar', meals: 'Breakfast & Dinner', accommodation: 'Rawda Heritage Guesthouse' },
      { day: 13, title: 'Dire Dawa to Addis Ababa', description: 'Fly from Dire Dawa back to Addis Ababa for farewell celebratory dinner.', location: 'Addis Ababa', meals: 'Breakfast & Dinner', accommodation: 'Sheraton Addis' },
      { day: 14, title: 'Departure', description: 'Transfer to airport for your onward international journey.', location: 'Addis Ababa', meals: 'Breakfast', accommodation: 'Airport transfer' }
    ],
    bestSuitedTo: 'Repeat visitors, photographers, history and culture enthusiasts, and adventurous travelers.',
    canBeCustomized: true,
    priceEstimate: 'Custom Luxury Quotation',
    difficulty: 'Active'
  },
  {
    id: 'addis-gateway',
    title: 'Addis: The Gateway Experience',
    category: 'cultural',
    duration: '1–3 Days',
    daysCount: 3,
    route: 'Addis Ababa',
    summary: 'A curated short experience in the bustling heart of Ethiopia, from national treasures and mountain lookouts to authentic culinary and coffee culture.',
    overview: `Addis Ababa is more than a starting point.
It is where ancient traditions meet a rapidly changing Africa. It is a city of museums, churches, markets, coffee houses, restaurants, neighborhoods and people from every corner of Ethiopia.
Choose one day for the essential highlights, or stay longer and experience the city at a deeper pace.`,
    image: 'https://res.cloudinary.com/dw1ohipim/image/upload/f_auto,q_auto,w_1600/v1784498995/cnvov2obdlcjwmjako5t.jpg',
    gallery: [
      'https://images.unsplash.com/photo-1547471080-7cc2caa01a7e?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?auto=format&fit=crop&w=1000&q=80'
    ],
    highlights: [
      'National Museum and 3.2-million-year-old Lucy',
      'Holy Trinity Cathedral and imperial tombs',
      'Panoramic sunset from Mount Entoto',
      'Merkato & artisan coffee roasting houses',
      'Curated dining & live traditional jazz and music'
    ],
    groupType: 'Private (1–6 guests)',
    accommodationType: 'Luxury 5-star hotel in central Addis Ababa',
    transportType: 'Private air-conditioned executive vehicle with dedicated driver',
    inclusions: [
      'All private ground transfers in executive vehicles with dedicated chauffeur',
      'Certified English-speaking cultural historian guide',
      'All museum and monument admission tickets (National Museum, Trinity Cathedral, Entoto)',
      'Authentic three-round Ethiopian coffee tasting ceremony',
      'Curated lunch tasting traditional injera and gourmet wots',
      'Airport meet-and-greet assistance on arrival and departure'
    ],
    exclusions: [
      'International airfare',
      'Personal purchases and alcoholic beverages outside scheduled tastings',
      'Driver and guide gratuities'
    ],
    options: [
      {
        title: '1 Day — Addis Essentials',
        description: 'A focused introduction to the capital.',
        points: ['National Museum and Lucy', 'Trinity Cathedral', 'Mount Entoto views', 'Key city landmarks', 'Authentic Ethiopian coffee ceremony']
      },
      {
        title: '2 Days — Addis Through Ethiopian Eyes',
        description: 'Go beyond the main attractions and explore Ethiopia’s history, culture and everyday life.',
        points: ['National Museum & Lucy', 'Historic Addis walking tour', 'Entoto eucalyptus forests', 'Local artisan neighborhoods', 'Traditional markets', 'Coffee culture & local food tasting']
      },
      {
        title: '3 Days — Taste & Experience Addis',
        description: 'Take your time with the city. Add food, markets, coffee, local neighborhoods and an evening cultural experience.',
        points: ['All 2-day highlights', 'Culinary market walkthrough with private chef', 'Specialty coffee cupping workshop', 'Contemporary art galleries & Ethio-jazz evening']
      }
    ],
    extensions: ['Lalibela', 'Gondar & Simien Mountains', 'Bahir Dar', 'Arba Minch & Southern Ethiopia'],
    suggestedJourney: [
      { day: 1, title: 'Addis Essentials', description: 'National Museum, Trinity Cathedral, Entoto overlook, and introductory coffee experience.', location: 'Addis Ababa', meals: 'Lunch included' },
      { day: 2, title: 'Through Ethiopian Eyes', description: 'Merkato exploration, craft cooperatives, historic Piassa neighborhood, and traditional injera feast.', location: 'Addis Ababa', meals: 'Breakfast & Lunch' },
      { day: 3, title: 'Taste & Experience', description: 'Art galleries, specialty micro-roasters, and evening Ethio-jazz club performance.', location: 'Addis Ababa', meals: 'Breakfast & Dinner' }
    ],
    bestSuitedTo: 'Stopovers, first-time visitors, business travelers, short stays and travelers beginning or ending a longer Ethiopian journey.',
    canBeCustomized: true,
    priceEstimate: 'Custom Flexible Escape',
    difficulty: 'Easy'
  },
  {
    id: 'lalibela-sacred',
    title: 'Lalibela: Journey into the Sacred',
    category: 'historical',
    duration: '3–4 Days',
    daysCount: 4,
    route: 'Lalibela',
    summary: 'An immersive encounter with the eleven world-famous rock-hewn monolithic churches and the living spirituality of the highland community.',
    overview: `Few places in Ethiopia leave such a lasting impression as Lalibela.
The famous churches are only part of the experience. The deeper story is found in the people, faith, traditions and landscapes surrounding them.`,
    image: 'https://res.cloudinary.com/dw1ohipim/image/upload/f_auto,q_auto,w_1600/v1784495589/aoqqqn9eer5tndnloz9b.jpg',
    gallery: [
      'https://images.unsplash.com/photo-1588668214407-6ea9a6d8c272?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1565008447742-97f6f38c985c?auto=format&fit=crop&w=1000&q=80'
    ],
    highlights: [
      'Iconic Bete Giyorgis (Church of St. George) carved from the earth',
      'Northern & Eastern church clusters connected by rock trenches',
      'Atmospheric Orthodox morning prayers & chanting',
      'Highland walk to Asheten Maryam Monastery',
      'Authentic community coffee ceremony in a traditional Lasta home'
    ],
    groupType: 'Private (1–6 guests)',
    accommodationType: 'Highland boutique lodge with mountain valley views',
    transportType: 'Private 4WD vehicle and scheduled domestic flights from Addis Ababa',
    inclusions: [
      '3 nights accommodation at premium boutique lodge (Mezena or Sora Lodge)',
      'Scheduled return domestic flights (Addis Ababa – Lalibela – Addis Ababa)',
      'Private 4WD Land Cruiser and driver for all local excursions and airport transfers',
      'Certified Senior Lalibela heritage guide and ecclesiastical liaison',
      'Full UNESCO site entry passes for all 11 rock-hewn monolithic churches',
      'Highland excursion to Asheten Maryam Monastery',
      'Daily breakfasts, welcome dinner, and family coffee ceremony experience',
      '24/7 dedicated support'
    ],
    exclusions: [
      'International flights and visas',
      'Travel and health insurance',
      'Personal gratuities'
    ],
    options: [
      {
        title: '3 Days — Lalibela Discovery',
        description: 'The core sacred exploration.',
        points: [
          'Day 1: Fly from Addis Ababa to Lalibela and settle into the town.',
          'Day 2: Explore the remarkable rock-hewn churches and learn about their history and spiritual importance.',
          'Day 3: Continue discovering Lalibela and its surrounding communities before returning to Addis Ababa.'
        ]
      },
      {
        title: '4 Days — Lalibela Deeper Journey',
        description: 'A slower, unhurried mountain immersion.',
        points: [
          'Take everything from the three-day experience and add another day to slow down, explore additional highland mountain monasteries (such as Yemrehanna Kristos or Asheten Maryam) and spend more time experiencing local life.'
        ]
      }
    ],
    extensions: ['Lalibela → Gondar → Simien Mountains → Bahir Dar → Addis Ababa'],
    suggestedJourney: [
      { day: 1, title: 'Arrival & Northern Cluster', description: 'Fly from Addis Ababa to Lalibela. Afternoon visit to the northern cluster of rock-hewn churches.', location: 'Lalibela', meals: 'Dinner' },
      { day: 2, title: 'Saint George & Eastern Cluster', description: 'Cross-shaped Bete Giyorgis and the subterranean tunnels of the eastern cluster.', location: 'Lalibela', meals: 'Breakfast & Dinner' },
      { day: 3, title: 'Asheten Maryam & Local Life', description: 'Scenic mountain ascent to Asheten Maryam monastery, followed by a warm family coffee gathering.', location: 'Lalibela', meals: 'Breakfast & Dinner' },
      { day: 4, title: 'Yemrehanna Kristos & Departure', description: 'Excursion to the built-up cave church of Yemrehanna Kristos, returning to Addis Ababa in the late afternoon.', location: 'Lalibela', meals: 'Breakfast' }
    ],
    bestSuitedTo: 'History lovers, culture enthusiasts, photographers, architecture enthusiasts and travelers interested in Ethiopian Christianity.',
    canBeCustomized: true,
    priceEstimate: 'Custom Flexible Escape',
    difficulty: 'Moderate'
  },
  {
    id: 'southbound-lakes',
    title: 'Southbound: Lakes, Landscapes & Culture',
    category: 'wildlife',
    duration: '3–4 Days',
    daysCount: 4,
    route: 'Rift Valley • Arba Minch',
    summary: 'A short escape into southern Ethiopia, traveling through Great Rift Valley lakes, the Dorze highland village, and boat safaris on Lake Chamo.',
    overview: `A short journey into southern Ethiopia, beginning with the landscapes of the Rift Valley and continuing toward Arba Minch.
This is an ideal option when you want to leave Addis Ababa behind and experience a different side of the country without committing to a long southern expedition.`,
    image: 'https://res.cloudinary.com/dw1ohipim/image/upload/f_auto,q_auto,w_1600/v1784106274/nlvqbudc71mxacel7y6y.jpg',
    gallery: [
      'https://images.unsplash.com/photo-1544735716-392fe2489ffa?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1000&q=80'
    ],
    highlights: [
      'Scenic drive through the Great Rift Valley lake basin',
      'Boat safari on Lake Chamo to see crocodiles and hippos',
      'Dorze elephant-shaped bamboo house village & weaving craft',
      'Tasting traditional kocho (false banana bread)',
      'Panoramic Rift Valley escarpment views'
    ],
    groupType: 'Private (1–6 guests)',
    accommodationType: 'Lakeside cliff resort overlooking Lake Chamo and Lake Abaya',
    transportType: 'Private 4WD Land Cruiser and domestic flight options',
    inclusions: [
      '3 nights accommodation at Paradise Lodge Arba Minch or Haile Resort',
      'Private 4WD vehicle and professional driver throughout',
      'Certified English-speaking southern naturalist guide',
      'Private motorized boat safari on Lake Chamo',
      'Dorze village cultural excursion with local elders and weavers',
      'All park entrance permits and local community fees',
      'Daily breakfasts and welcome lakeside dinner'
    ],
    exclusions: [
      'International flights and visas',
      'Personal discretionary gratuities and beverages'
    ],
    options: [
      {
        title: '3 Days — Arba Minch Escape',
        description: 'The swift southern overview.',
        points: [
          'Day 1: Travel south from Addis Ababa through the Rift Valley.',
          'Day 2: Explore Arba Minch and the surrounding lakes and landscapes.',
          'Day 3: Continue the southern experience before returning toward Addis Ababa.'
        ]
      },
      {
        title: '4 Days — Southern Ethiopia Discovery',
        description: 'An extended southern retreat.',
        points: [
          'Stay an extra night and allow more time for nature, local communities, lakes and the tranquil landscapes around Arba Minch.'
        ]
      }
    ],
    extensions: ['Omo Valley', 'Bale Mountains', 'Rift Valley Lakes', 'Argash Lodge'],
    suggestedJourney: [
      { day: 1, title: 'Addis to Rift Valley & Arba Minch', description: 'Scenic drive southward past Rift Valley lakes and lush plantations to Arba Minch.', location: 'Arba Minch', meals: 'Dinner' },
      { day: 2, title: 'Lake Chamo & Dorze Highlands', description: 'Morning boat safari across Lake Chamo, afternoon ascent to the Dorze weaving community.', location: 'Arba Minch & Chencha', meals: 'Breakfast & Dinner' },
      { day: 3, title: 'Nechisar Plains & Forest Walks', description: 'Explore groundwater forest springs and savannah vistas.', location: 'Arba Minch', meals: 'Breakfast & Dinner' },
      { day: 4, title: 'Return Journey', description: 'Morning lakeside breakfast, visiting a roadside fruit market, returning to Addis Ababa.', location: 'Addis Ababa', meals: 'Breakfast' }
    ],
    bestSuitedTo: 'Nature lovers, photographers, couples, short-stay travelers and anyone looking for an easy introduction to southern Ethiopia.',
    canBeCustomized: true,
    priceEstimate: 'Custom Flexible Escape',
    difficulty: 'Easy'
  },
  
  // NEW ADDITIONS WITH FULL PREMIUM SCHEMA

  {
    id: 'omo-valley-tribes',
    title: 'Living Cultures of the Omo Valley',
    category: 'cultural',
    duration: '7 Days',
    daysCount: 7,
    route: 'Arba Minch • Jinka • Turmi • Omorate',
    summary: 'A deep dive into the extraordinary cultural mosaic of southern Ethiopia, meeting the diverse indigenous communities of the Omo Valley.',
    overview: `A deep dive into the extraordinary cultural mosaic of southern Ethiopia.
Journey into the Lower Omo Valley to meet indigenous communities who have preserved their ancient ways of life for millennia.
From the lip-plates of the Mursi to the vibrant body painting of the Karo and the famous Bull Jumping ceremonies of the Hamer, this expedition offers an unparalleled anthropological experience.`,
    image: 'https://res.cloudinary.com/dw1ohipim/image/upload/f_auto,q_auto,w_1600/v1789939716/b3jegopdotjurptpxtsr.jpg',
    gallery: [
      'https://images.unsplash.com/photo-1544735716-392fe2489ffa?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1528164344705-475426879c0d?auto=format&fit=crop&w=1000&q=80'
    ],
    highlights: [
      'Visit the Mursi and Hamer communities',
      'Attend a traditional Bull Jumping ceremony (timing dependent)',
      'Explore vibrant local markets in Key Afer or Dimeka',
      'Cross the Omo River in traditional dugout canoes to visit the Dassanech',
      'Experience the incredible body-painting art of the Karo tribe'
    ],
    groupType: 'Private Expedition (2–6 guests)',
    accommodationType: 'Best available eco-lodges and comfortable tented camps',
    transportType: 'Specialized 4WD Land Cruisers built for rough terrain',
    inclusions: [
      '6 nights accommodation in eco-lodges (Eco Omo Lodge, Buska Lodge)',
      'Domestic flights (Addis Ababa – Arba Minch / Jinka – Addis Ababa)',
      'Private 4WD Land Cruiser with specialist off-road driver',
      'Expert cultural guide who speaks local tribal dialects',
      'All village entrance fees and photography permits',
      'All meals throughout the expedition',
      'Dugout canoe crossing on the Omo River'
    ],
    exclusions: [
      'International flights',
      'Individual tips for photographs in villages (provided guidance on etiquette)',
      'Alcoholic beverages'
    ],
    suggestedJourney: [
      { day: 1, title: 'Fly to Arba Minch & Lake Chamo', description: 'Fly from Addis Ababa. Afternoon boat safari on Lake Chamo.', location: 'Arba Minch', meals: 'Dinner' },
      { day: 2, title: 'Arba Minch to Jinka', description: 'Drive via Key Afer market to Jinka. Visit the South Omo Research Center.', location: 'Jinka', meals: 'Full Board' },
      { day: 3, title: 'Mago National Park & Mursi Village', description: 'Enter Mago National Park to meet the Mursi people, known for their lip plates.', location: 'Jinka', meals: 'Full Board' },
      { day: 4, title: 'Jinka to Turmi', description: 'Drive to Turmi, the heartland of the Hamer tribe. Visit a Hamer village in the afternoon.', location: 'Turmi', meals: 'Full Board' },
      { day: 5, title: 'Omorate & The Dassanech', description: 'Drive to the Kenyan border town of Omorate. Cross the Omo River to visit the Dassanech tribe.', location: 'Turmi', meals: 'Full Board' },
      { day: 6, title: 'Karo Tribe & Local Markets', description: 'Visit the Karo people overlooking the Omo River, famous for intricate body painting.', location: 'Turmi', meals: 'Full Board' },
      { day: 7, title: 'Return to Addis Ababa', description: 'Drive to Jinka or Arba Minch for your flight back to the capital.', location: 'Addis Ababa', meals: 'Breakfast' }
    ],
    bestSuitedTo: 'Anthropology enthusiasts, cultural explorers, and portrait photographers seeking deep human connection.',
    canBeCustomized: true,
    priceEstimate: 'Custom Expedition Pricing',
    difficulty: 'Challenging (Remote terrain & basic infrastructure)'
  },
  {
    id: 'danakil-depression',
    title: 'Expedition to the Danakil Depression',
    category: 'adventure',
    duration: '4 Days',
    daysCount: 4,
    route: 'Mekelle • Erta Ale • Dallol',
    summary: 'Venture into one of the most extreme and otherworldly landscapes on Earth, featuring active volcanoes and neon sulfur springs.',
    overview: `An expedition into one of the most extreme, remote, and visually stunning landscapes on Earth.
The Danakil Depression sits more than 100 meters below sea level. Witness the bubbling lava lake of Erta Ale at night, walk across the alien-like neon sulfur springs of Dallol, and watch endless camel caravans crossing the vast salt flats.`,
    image: 'https://res.cloudinary.com/dw1ohipim/image/upload/f_auto,q_auto,w_1600/v1789847728/kl3tame6jps5xw3zqsau.jpg',
    gallery: [
      'https://images.unsplash.com/photo-1521255562725-b8830b5030ae?auto=format&fit=crop&w=1000&q=80'
    ],
    highlights: [
      'Hike to the active Erta Ale volcano crater at night',
      'Explore the neon-colored Dallol sulfur springs',
      'Visit traditional Afar salt mines and camel caravans',
      'Sleep under the stars in the desert',
      'Swim in the buoyant hypersaline waters of Lake Afrera'
    ],
    groupType: 'Small Group Expedition (Max 12) or Private Expedition',
    accommodationType: 'Open-air camping under the stars & basic local guesthouses',
    transportType: 'Convoy of 4WD Land Cruisers',
    inclusions: [
      'Domestic flights (Addis Ababa – Mekelle – Addis Ababa)',
      'Fully equipped 4WD vehicles (minimum 2 vehicles per group for safety)',
      'Professional expedition leader, local Afar guides, and mandatory armed scouts',
      'Expedition cook providing all meals and unlimited bottled water',
      'Camping equipment (mattresses, sleeping bags)',
      'All regional permits and entrance fees'
    ],
    exclusions: [
      'International flights',
      'Personal trekking gear (headlamps, sturdy boots)',
      'Travel insurance covering remote area evacuation (strictly required)'
    ],
    suggestedJourney: [
      { day: 1, title: 'Mekelle to Hamela & Erta Ale', description: 'Drive from Mekelle into the depression. Evening hike up the shield volcano to camp near the bubbling lava lake.', location: 'Erta Ale Volcano', meals: 'Lunch & Dinner' },
      { day: 2, title: 'Sunrise at Erta Ale to Lake Afrera', description: 'Descend the volcano at dawn. Drive to Lake Afrera to float in the salt waters and view local salt mining.', location: 'Lake Afrera / Abala', meals: 'Full Board' },
      { day: 3, title: 'Dallol Sulfur Springs & Salt Flats', description: 'Drive to the Dallol region to witness the incredible neon-colored hydrothermal fields and endless salt pans.', location: 'Dallol', meals: 'Full Board' },
      { day: 4, title: 'Camel Caravans & Return to Mekelle', description: 'Watch the traditional camel caravans depart across the salt desert before ascending back to Mekelle for your flight.', location: 'Mekelle', meals: 'Breakfast & Lunch' }
    ],
    bestSuitedTo: 'Thrill-seekers, landscape photographers, and extreme environment adventurers who do not mind basic camping conditions.',
    canBeCustomized: false, // Group safety logistics limit heavy customization
    priceEstimate: 'Fixed Expedition Rate',
    difficulty: 'Strenuous (Extreme heat, basic camping)'
  },
  {
    id: 'bale-mountains-wildlife',
    title: 'Wildlife of the Bale Mountains',
    category: 'wildlife',
    duration: '5 Days',
    daysCount: 5,
    route: 'Addis Ababa • Dinsho • Sanetti Plateau • Harenna Forest',
    summary: 'Trek through the afro-alpine moorlands and mystical Harenna Forest to spot the rare Ethiopian Wolf and endemic highland bird species.',
    overview: `A pure wilderness escape into the largest tract of afro-alpine habitat in Africa.
The Bale Mountains offer some of the best wildlife viewing in Ethiopia. Ascend the spectacular Sanetti Plateau to search for the critically endangered Ethiopian Wolf, then descend into the mist-shrouded, moss-draped Harenna Cloud Forest.`,
    image: 'https://res.cloudinary.com/dw1ohipim/image/upload/f_auto,q_auto,w_1600/v1789937912/irewwcnxjwy2utnuxqqi.avif',
    gallery: [
      'https://images.unsplash.com/photo-1627916962323-eb34d2847582?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=1000&q=80'
    ],
    highlights: [
      'High success rate of spotting the highly endangered Ethiopian Wolf',
      'Drive across the breathtaking Sanetti Plateau at 4,000 meters',
      'Explore the dense, moss-draped Harenna Cloud Forest',
      'Excellent birdwatching featuring endemic highland species',
      'Spot Mountain Nyala and Menelik’s Bushbuck near Dinsho'
    ],
    groupType: 'Private (1–6 guests)',
    accommodationType: 'Premium eco-wilderness lodge',
    transportType: 'Private 4WD Land Cruiser',
    inclusions: [
      '4 nights accommodation at Bale Mountain Lodge or similar',
      'Private 4WD vehicle and driver from Addis Ababa',
      'Expert wildlife guide and ornithologist',
      'All Bale Mountains National Park entrance fees and scout fees',
      'All meals while in the national park',
      'Guided walks through the Harenna Forest and Sanetti Plateau'
    ],
    exclusions: [
      'International flights',
      'Beverages and gratuities'
    ],
    suggestedJourney: [
      { day: 1, title: 'Addis Ababa to Bale Mountains', description: 'Depart the capital, driving south into the Rift Valley and up into the cool highlands of the Bale Mountains. Stop at Dinsho HQ to spot Mountain Nyala.', location: 'Bale Mountains', meals: 'Dinner' },
      { day: 2, title: 'The Sanetti Plateau & Ethiopian Wolves', description: 'Spend the day driving and walking across the high-altitude Sanetti Plateau, the best place on earth to see the Ethiopian Wolf.', location: 'Bale Mountains', meals: 'Full Board' },
      { day: 3, title: 'Harenna Cloud Forest', description: 'Descend from the plateau into the dense, ancient Harenna Forest. Walk among giant heather trees draped in moss and look for Bale monkeys.', location: 'Bale Mountains', meals: 'Full Board' },
      { day: 4, title: 'Wildlife Walks & Birding', description: 'A flexible day tailored to your interests—either deeper forest walks, waterfall hikes, or dedicated bird watching for endemics.', location: 'Bale Mountains', meals: 'Full Board' },
      { day: 5, title: 'Return to Addis Ababa', description: 'Enjoy a final mountain breakfast before the scenic drive back to Addis Ababa, arriving in the late afternoon.', location: 'Addis Ababa', meals: 'Breakfast' }
    ],
    bestSuitedTo: 'Wildlife lovers, bird watchers, hikers, and nature photographers looking for pristine wilderness.',
    canBeCustomized: true,
    priceEstimate: 'Custom Premium Rate',
    difficulty: 'Moderate'
  }
];
