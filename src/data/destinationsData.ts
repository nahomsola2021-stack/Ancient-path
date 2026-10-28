import { Destination } from '../types';

export const DESTINATIONS_DATA: Destination[] = [
  {
    id: 'addis-ababa',
    name: 'Addis Ababa',
    tagline: 'The Heart of Modern Ethiopia',
    region: 'Central',
    summary: 'The capital brings together Ethiopia’s history, politics, culture, food and everyday life. Where many journeys begin, but it deserves more than a quick stop.',
    fullDescription: 'Addis Ababa is where many journeys begin, but it deserves more than a quick stop. The capital brings together Ethiopia’s history, politics, culture, food and everyday life. Visit museums and historic sites, walk through local neighborhoods, explore markets, enjoy Ethiopian coffee and discover a city that is constantly changing.',
    highlights: ['National Museum & Lucy', 'Mount Entoto', 'Holy Trinity Cathedral', 'Merkato & Shola Markets', 'Traditional Coffee Ceremonies', 'Local Neighborhoods', 'Gastronomic Scene'],
    image: 'https://res.cloudinary.com/dw1ohipim/image/upload/f_auto,q_auto,w_1600/v1787780651/wsusxdpkh0zrwseqeovu.webp',
    gallery: [
      'https://images.unsplash.com/photo-1547471080-7cc2caa01a7e?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1607681034540-2c46cc71896d?auto=format&fit=crop&w=1000&q=80'
    ],
    bestTimeToVisit: 'October to May (Dry & pleasant highland sun)',
    altitude: '2,355 m (7,726 ft)',
    climate: 'Subtropical highland climate, mild days and cool refreshing evenings',
    coordinates: { x: 50, y: 53 },
    connectedTourIds: ['ancient-kingdoms', 'landscapes-lakes', 'rift-to-harar', 'addis-gateway']
  },
  {
    id: 'lalibela',
    name: 'Lalibela',
    tagline: 'A Sacred Landscape',
    region: 'North',
    summary: 'Home to some of Ethiopia’s most extraordinary architectural and spiritual treasures, with eleven monolithic rock-hewn churches carved directly from the earth.',
    fullDescription: 'Lalibela is home to some of Ethiopia’s most extraordinary architectural and spiritual treasures. Its famous rock-hewn churches were carved directly from the earth and remain active places of worship. But Lalibela is more than its churches. The surrounding landscapes, communities and living traditions make the destination worth experiencing slowly.',
    highlights: ['Rock-hewn monolithic churches', 'Church of Saint George (Bete Giyorgis)', 'Ethiopian Orthodox tradition & chants', 'Highland rural communities', 'Asheten Maryam Monastery', 'Sunset over Lasta Mountains'],
    image: 'https://res.cloudinary.com/dw1ohipim/image/upload/f_auto,q_auto,w_1600/v1784044760/uaxjuqytkud5kywfxamz.jpg',
    gallery: [
      'https://images.unsplash.com/photo-1588668214407-6ea9a6d8c272?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1565008447742-97f6f38c985c?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1544735716-392fe2489ffa?auto=format&fit=crop&w=1000&q=80'
    ],
    bestTimeToVisit: 'October to April (especially during Genna and Timkat festivals)',
    altitude: '2,500 m (8,200 ft)',
    climate: 'Crisp mountain air, warm sunny afternoons, cool star-filled nights',
    coordinates: { x: 53, y: 35 },
    connectedTourIds: ['ancient-kingdoms', 'lalibela-sacred']
  },
  {
    id: 'gondar',
    name: 'Gondar',
    tagline: 'The Royal Capital',
    region: 'North',
    summary: 'Once the center of Ethiopian imperial power, boasting medieval castles, ornate churches with painted angels, and a lively highland atmosphere.',
    fullDescription: 'Gondar was once the center of Ethiopian imperial power. Its castles, churches and historic sites provide a window into a fascinating period of Ethiopian history. Today, Gondar combines this royal heritage with a lively modern city and access to the Simien Mountains.',
    highlights: ['Fasil Ghebbi (Royal Enclosure)', 'Debre Berhan Selassie Church', 'Fasilides’ Bath', 'Kuskuam Palaces', 'Imperial Ethiopian history', 'Azmari traditional music houses'],
    image: 'https://res.cloudinary.com/dw1ohipim/image/upload/f_auto,q_auto,w_1600/v1786286004/zmtnjnikbbfhqz06ea5j.jpg',
    gallery: [
      'https://images.unsplash.com/photo-1609873834199-4d6b5e0c52f6?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1578632767115-351597cf2477?auto=format&fit=crop&w=1000&q=80'
    ],
    bestTimeToVisit: 'October to March (Famous for Timkat celebration in January)',
    altitude: '2,133 m (7,000 ft)',
    climate: 'Pleasantly warm days, crisp evenings',
    coordinates: { x: 44, y: 32 },
    connectedTourIds: ['ancient-kingdoms']
  },
  {
    id: 'simien-mountains',
    name: 'Simien Mountains',
    tagline: 'Where the Highlands Meet the Sky',
    region: 'North',
    summary: 'Dramatic cliffs, deep valleys and high plateaus forming the "Roof of Africa", home to endemic gelada monkeys, Walia ibex, and panoramic escarpments.',
    fullDescription: 'The Simien Mountains are among Ethiopia’s most spectacular landscapes. Dramatic cliffs, deep valleys and high plateaus create an environment unlike anywhere else in the country. The mountains are also home to endemic wildlife, including the famous gelada.',
    highlights: ['Endemic Gelada Monkeys grazing in troops', 'Jinbar Waterfall & 500m gorge', 'Ras Dejen (Ethiopia’s highest peak)', 'Highland mountain trekking', 'Dramatic escarpments and cloud forests'],
    image: 'https://res.cloudinary.com/dw1ohipim/image/upload/f_auto,q_auto,w_1600/v1784105008/im1uicc6wrntebbhqmpt.jpg',
    gallery: [
      'https://images.unsplash.com/photo-1516426122078-c23e76319801?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1544735716-392fe2489ffa?auto=format&fit=crop&w=1000&q=80'
    ],
    bestTimeToVisit: 'October to April (Lush wildflowers in Oct-Nov, crisp clear skies Dec-Feb)',
    altitude: '3,000 m to 4,550 m (9,800 – 14,900 ft)',
    climate: 'Cool alpine highland climate, brisk winds, cold overnight temperatures',
    coordinates: { x: 47, y: 28 },
    connectedTourIds: ['ancient-kingdoms']
  },
  {
    id: 'bahir-dar',
    name: 'Bahir Dar & Lake Tana',
    tagline: 'Life Around the Lake',
    region: 'North',
    summary: 'A palm-lined tropical city on the shores of Lake Tana, the source of the Blue Nile, dotted with century-old island monasteries and serene boat journeys.',
    fullDescription: 'Bahir Dar sits on the shores of Lake Tana, Ethiopia’s largest lake. The lake’s islands and shores are home to historic monasteries, communities and landscapes that have played an important role in Ethiopian history. A boat journey across Lake Tana offers a slower and more peaceful side of Ethiopia.',
    highlights: ['Lake Tana island monasteries (Ura Kidane Mehret)', 'Blue Nile Falls (Tis Abay)', 'Traditional papyrus tankwa boats', 'Pelican and waterbird watching', 'Lakeside sunset promenades'],
    image: 'https://res.cloudinary.com/dw1ohipim/image/upload/f_auto,q_auto,w_1600/v1786277684/ejs4hjczvizttiqkkvcm.jpg',
    gallery: [
      'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1473496169904-658ba7c44d8a?auto=format&fit=crop&w=1000&q=80'
    ],
    bestTimeToVisit: 'September to May (Waterfalls at peak after rains in Oct-Dec)',
    altitude: '1,800 m (5,900 ft)',
    climate: 'Mild tropical lake climate, warm and breezy',
    coordinates: { x: 42, y: 39 },
    connectedTourIds: ['ancient-kingdoms']
  },
  {
    id: 'bale-mountains',
    name: 'Bale Mountains',
    tagline: 'Wild Ethiopia',
    region: 'South',
    summary: 'A pristine wilderness of afro-alpine plateaus, misty Harenna cloud forest, and the last stronghold of the rare Ethiopian Wolf and Mountain Nyala.',
    fullDescription: 'The Bale Mountains offer some of Ethiopia’s most beautiful highland landscapes and important wildlife habitats. Open plateaus, forests, valleys and volcanic landscapes create an extraordinary environment for exploration. It is a destination for travelers who enjoy nature, wildlife, photography and walking.',
    highlights: ['Sanetti Plateau (4,000m afro-alpine expanse)', 'Rare Ethiopian Wolf tracking', 'Harenna Cloud Forest & wild coffee', 'Mountain Nyala and Menelik’s Bushbuck', 'Tullu Dimtu summit'],
    image: 'https://res.cloudinary.com/dw1ohipim/image/upload/f_auto,q_auto,w_1600/v1784492255/a3eewtmcpuy861vaemtj.jpg',
    gallery: [
      'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1000&q=80'
    ],
    bestTimeToVisit: 'November to April (Dry conditions for trekking and wildlife spotting)',
    altitude: '3,100 m to 4,377 m (10,170 – 14,360 ft)',
    climate: 'Montane afro-alpine, rapid weather shifts, invigorating crisp breezes',
    coordinates: { x: 62, y: 65 },
    connectedTourIds: ['landscapes-lakes']
  },
  {
    id: 'arba-minch',
    name: 'Arba Minch',
    tagline: 'Lakes, Forests & Southern Landscapes',
    region: 'South',
    summary: 'Gateway to the Great Rift Valley lakes of Chamo and Abaya, the bamboo beehive huts of the Dorze highlands, and lush Nechisar National Park.',
    fullDescription: 'Arba Minch is a gateway to southern Ethiopia and the landscapes of the Rift Valley. With lakes, forests, mountains and nearby communities, the area offers a completely different perspective from the northern highlands.',
    highlights: ['Lake Chamo boat safari & giant Nile crocodiles', 'Dorze highland village & weaving culture', 'Bridge of God between Abaya and Chamo', 'Nechisar National Park plains', 'Scenic banana and fruit orchards'],
    image: 'https://res.cloudinary.com/dw1ohipim/image/upload/f_auto,q_auto,w_1600/v1787781174/mavbqpbw9hmoghvvxmn1.jpg',
    gallery: [
      'https://images.unsplash.com/photo-1544735716-392fe2489ffa?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1516426122078-c23e76319801?auto=format&fit=crop&w=1000&q=80'
    ],
    bestTimeToVisit: 'September to May',
    altitude: '1,285 m (4,215 ft)',
    climate: 'Warm tropical valley climate with refreshing lake breezes',
    coordinates: { x: 46, y: 72 },
    connectedTourIds: ['landscapes-lakes', 'southbound-lakes']
  },
  {
    id: 'omo-valley',
    name: 'Omo Valley',
    tagline: 'Living Cultures',
    region: 'South',
    summary: 'A cradle of human diversity where age-old pastoral traditions, intricate body artistry, and communal ways of life thrive along the Omo River.',
    fullDescription: 'The Omo Valley is one of Ethiopia’s most culturally diverse regions. Travel here is about meeting people, learning about different traditions and understanding communities within the context of their environment and way of life. We approach cultural encounters with respect and care, recognizing that communities are not tourist attractions—they are people’s homes and lives.',
    highlights: ['Hamar, Mursi, Karo & Dassanech communities', 'Weekly tribal markets (Key Afer, Dimeka)', 'Traditional pottery & beadwork', 'Respectful, unhurried cultural immersion', 'Sunset over the Omo River'],
    image: 'https://res.cloudinary.com/dw1ohipim/image/upload/f_auto,q_auto,w_1600/v1784491632/dwsvrs4uaemasr1zuvcn.jpg',
    gallery: [
      'https://images.unsplash.com/photo-1528164344705-475426879c0d?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1516426122078-c23e76319801?auto=format&fit=crop&w=1000&q=80'
    ],
    bestTimeToVisit: 'June to September & December to March',
    altitude: '400 m to 900 m (1,300 – 2,950 ft)',
    climate: 'Warm, semi-arid savannah with pleasant evenings',
    coordinates: { x: 38, y: 82 },
    connectedTourIds: ['landscapes-lakes']
  },
  {
    id: 'harar',
    name: 'Harar',
    tagline: 'The Ancient City of the East',
    region: 'East',
    summary: 'The holy walled city with 368 winding alleyways, colorful Harari heritage houses, fragrant spice bazaars, and the centuries-old hyena feeding tradition.',
    fullDescription: 'Harar is one of Ethiopia’s most distinctive historic cities. Behind its ancient walls are narrow streets, colorful houses, traditional markets and a rich cultural heritage shaped by centuries of trade and exchange. Harar offers a very different experience from the northern highlands and is particularly rewarding for travelers interested in history, culture and photography.',
    highlights: ['Jugol Walled City (UNESCO)', 'Nightly Hyena Men feeding ritual', 'Arthur Rimbaud Cultural Center', 'Traditional Harari Gey Gar houses', 'Spice markets and coffee mills'],
    image: 'https://res.cloudinary.com/dw1ohipim/image/upload/f_auto,q_auto,w_1600/v1784496024/ywsf1mxm5sdpsb8znls6.jpg',
    gallery: [
      'https://images.unsplash.com/photo-1584646098378-0874589d76b1?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1544735716-392fe2489ffa?auto=format&fit=crop&w=1000&q=80'
    ],
    bestTimeToVisit: 'September to May',
    altitude: '1,885 m (6,184 ft)',
    climate: 'Mild, sunny eastern highland climate with comfortable nights',
    coordinates: { x: 74, y: 50 },
    connectedTourIds: ['rift-to-harar']
  },
  {
    id: 'afar',
    name: 'Afar',
    tagline: 'A Different Ethiopia',
    region: 'East',
    summary: 'A dramatic, otherworldly landscape of active volcanoes, glowing lava lakes, vast salt pans, and nomadic pastoralists living in the geological Rift.',
    fullDescription: 'The Afar region reveals another side of the country—vast, dry landscapes, volcanic terrain and communities whose lives have long been shaped by one of Ethiopia’s most challenging environments. It is a destination for travelers looking for dramatic scenery and a deeper sense of Ethiopia’s geographic and cultural diversity.',
    highlights: ['Erta Ale active shield volcano', 'Dallol hydrothermal sulfur terraces', 'Lake Assal salt mining & camel caravans', 'Afar nomadic pastoralist culture', 'Great Rift Valley tectonic faults'],
    image: 'https://res.cloudinary.com/dw1ohipim/image/upload/f_auto,q_auto,w_1600/v1787781329/be3eg4w88o9ajmem6nvn.jpg',
    gallery: [
      'https://images.unsplash.com/photo-1509316975850-ff9c5deb0cd9?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?auto=format&fit=crop&w=1000&q=80'
    ],
    bestTimeToVisit: 'November to February (Coolest months for Danakil expedition)',
    altitude: '-125 m (below sea level) to 1,000 m',
    climate: 'Arid desert climate with warm to hot sunny days and open starry skies',
    coordinates: { x: 67, y: 34 },
    connectedTourIds: ['rift-to-harar']
  }
];

