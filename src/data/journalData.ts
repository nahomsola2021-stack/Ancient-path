export interface JournalArticle {
  id: string;
  slug: string;
  title: string;
  subtitle: string;
  excerpt: string;
  category: 'Culture & Faith' | 'Nature & Wildlife' | 'Food & Coffee' | 'Travel Guide' | 'Heritage';
  author: {
    name: string;
    role: string;
    avatar: string;
  };
  publishedDate: string;
  readTime: string;
  coverImage: string;
  gallery?: string[];
  tags: string[];
  content: {
    introduction: string;
    sections: {
      heading: string;
      paragraphs: string[];
      quote?: string;
      image?: string;
      imageCaption?: string;
    }[];
    conclusion: string;
    practicalTips?: string[];
  };
  relatedTourIds: string[];
  relatedDestIds: string[];
}

export const JOURNAL_ARTICLES: JournalArticle[] = [
  {
    id: 'art-1',
    slug: 'living-sacred-stone-lalibela',
    title: 'The Living Sacred Stone: A Pilgrimage to Lalibela’s Rock-Hewn Sanctuaries',
    subtitle: 'Beyond the architectural wonder lies a vibrant, unbroken 800-year-old spiritual tradition.',
    excerpt: 'Carved deep into the crimson basalt of northern Ethiopia, the eleven monolithic churches of Lalibela are not museum relics—they are living sanctuaries where ancient Ge’ez chants still echo at dawn.',
    category: 'Culture & Faith',
    author: {
      name: 'Yared Tesfaye',
      role: 'Senior Cultural Historian & Expedition Lead',
      avatar: 'https://res.cloudinary.com/dw1ohipim/image/upload/v1786278172/as7xi2mnhrlbebkhre3u.webp'
    },
    publishedDate: 'November 14, 2025',
    readTime: '6 min read',
    coverImage: 'https://res.cloudinary.com/dw1ohipim/image/upload/v1786278172/as7xi2mnhrlbebkhre3u.webp',
    gallery: [
      'https://res.cloudinary.com/dw1ohipim/image/upload/v1779822099/qyixdzyiuzdtchgou8i1.webp',
      'https://res.cloudinary.com/dw1ohipim/image/upload/v1779822099/qyixdzyiuzdtchgou8i1.webp'
    ],
    tags: ['Lalibela', 'UNESCO Heritage', 'Orthodox Faith', 'Architecture', 'Highlands'],
    content: {
      introduction: 'To stand on the cliff edge overlooking Bete Giyorgis (the Church of St. George) in Lalibela is to witness human devotion carved directly into the planet itself. As morning mist rises over the Lasta Mountains, the sound of wooden prayer sticks tapping against stone reverberates through subterranean rock trenches.',
      sections: [
        {
          heading: 'King Lalibela’s Vision of the New Jerusalem',
          paragraphs: [
            'In the late 12th and early 13th centuries, when Muslim conquests made pilgrimage to Jerusalem increasingly hazardous for Christian pilgrims from the Horn of Africa, King Lalibela envisioned a sacred New Jerusalem nestled high within Ethiopia’s highland fortress.',
            'Unlike European cathedrals built stone upon stone rising toward the heavens, Lalibela’s master craftsmen excavated downward. They chiseled massive trenches into solid red volcanic tuff, isolating monolithic blocks before carving ornate doors, windows, colonnades, barrel vaults, and intricate drainage systems from the interior out.'
          ],
          quote: '“They were not built from the ground up; they were liberated from the heart of the mountain.”',
          image: 'https://res.cloudinary.com/dw1ohipim/image/upload/v1779822099/qyixdzyiuzdtchgou8i1.webp',
          imageCaption: 'The cruciform roof of Bete Giyorgis flush with the surrounding rock surface.'
        },
        {
          heading: 'A Living Sanctuary of Daily Worship',
          paragraphs: [
            'What separates Lalibela from ancient architectural monuments elsewhere in the world is its uninterrupted continuity. These churches are not preserved ruins; they are active houses of prayer where white-robed hermits study illuminated manuscripts in Ge’ez and priests bless devotees with 800-year-old brass and silver crosses.',
            'Visiting at dawn during morning liturgy reveals a sensory world of burning frankincense, low polyphonic chanting, and candlelight flickering off subterranean walls smoothed by centuries of pilgrim footsteps.'
          ]
        },
        {
          heading: 'Experiencing the Surrounding Highlands',
          paragraphs: [
            'While the eleven central churches command worldwide acclaim, a truly meaningful visit encompasses the wider mountain landscape. A mule trek or hike up to the mountaintop monastery of Asheten Maryam (nearly 4,000 meters above sea level) offers panoramic vistas of the Great Rift escarpments, while rural hamlets welcome travelers for slow, hospitable coffee ceremonies.'
          ]
        }
      ],
      conclusion: 'Lalibela reminds us that travel at its best is not about checking off monuments, but experiencing how faith, geography, and human resilience weave together into an indelible living culture.',
      practicalTips: [
        'Wear slip-on shoes or shoes with easily loosened laces, as shoes must be removed before stepping onto sacred rugs inside the churches.',
        'Carry a light white cotton scarf or shawl to drape over shoulders respectfully.',
        'Allow at least 2 full days in Lalibela to explore both the northern and eastern church clusters at a peaceful, contemplative pace.'
      ]
    },
    relatedTourIds: ['ancient-kingdoms', 'lalibela-sacred'],
    relatedDestIds: ['lalibela', 'addis-ababa']
  },
  {
    id: 'art-2',
    slug: 'buna-and-frankincense-coffee-ceremony',
    title: 'Buna & Frankincense: The Ancient Art and Soul of the Ethiopian Coffee Ceremony',
    subtitle: 'Why the ritual of roasting, brewing, and sharing coffee remains Ethiopia’s most sacred social bond.',
    excerpt: 'In Ethiopia, coffee is never grabbed on the go. It is a slow, multi-act communal gathering that transforms green beans, glowing charcoal embers, and fragrant incense into a celebration of kinship.',
    category: 'Food & Coffee',
    author: {
      name: 'Selamawit Bekele',
      role: 'Culinary Anthropologist & Guide',
      avatar: 'https://res.cloudinary.com/dw1ohipim/image/upload/v1787826760/c8quno827nlzuo7in9tb.jpg'
    },
    publishedDate: 'December 02, 2025',
    readTime: '5 min read',
    coverImage: 'https://res.cloudinary.com/dw1ohipim/image/upload/v1787826760/c8quno827nlzuo7in9tb.jpg',
    tags: ['Coffee', 'Buna Ceremony', 'Culture', 'Gastronomy', 'Addis Ababa'],
    content: {
      introduction: 'According to legend, a 9th-century goat herder named Kaldi in the southwestern highlands of Kaffa noticed his goats dancing with boundless vitality after grazing on bright red berries. Whether truth or myth, Ethiopia is undisputed as the botanical and cultural birthplace of Coffea arabica.',
      sections: [
        {
          heading: 'Setting the Sacred Stage: Fresh Grass and Frankincense',
          paragraphs: [
            'The coffee ceremony (known locally as “Buna”) begins with preparation of the space. Fresh, fragrant green rushes (ketema grass) are spread across the floor to symbolize nature, welcoming hospitality, and renewal. A small charcoal brazier is lit, and tears of frankincense resin are placed upon the coals, enveloping the room in rich, meditative smoke.',
            'The hostess washes raw green coffee beans before roasting them gently in a shallow, long-handled metal pan over the embers. As the beans darken and release their aromatic oils, the hostess walks the pan around the room, inviting each guest to cup the rich aroma toward their face with a gentle wave of the hand.'
          ],
          quote: '“Buna dabo naw” — an Amharic saying meaning “Coffee is our bread.” It is sustenance for both the body and the community.',
          image: 'https://res.cloudinary.com/dw1ohipim/image/upload/v1787827539/vbvdrtn2rsdmo9yshoya.jpg',
          imageCaption: 'Roasting green arabica beans over glowing embers.'
        },
        {
          heading: 'The Jebena and the Three Rounds of Blessing',
          paragraphs: [
            'The freshly roasted beans are ground by hand using a heavy wooden mortar and pestle (muket and zenezena). The fragrant coffee grounds are transferred into a traditional spherical clay pot with a slender neck and spout called a jebena.',
            'Water is brought to a boil, and the coffee is brewed gently. When poured from a height into small handleless ceramic cups (sini) without disturbing the grounds at the base, the coffee is rich, silky, and topped with a golden crema.',
            'A complete ceremony consists of three distinct rounds, each carrying symbolic meaning: Abol (the first and strongest round, representing serious conversation), Tona (the second round, bringing relaxation), and Bereka (the third round, delivering blessings of health and fortune upon the household and guests).'
          ]
        }
      ],
      conclusion: 'In our fast-paced modern world, taking an hour to sit together on grass, smelling frankincense and savoring fresh coffee is a profound reminder of the art of unhurried human connection.',
      practicalTips: [
        'Never decline the first cup (Abol) when invited into an Ethiopian home; it is the ultimate expression of friendship and respect.',
        'Coffee is often served alongside freshly popped popcorn (fetfet) or roasted barley and chickpeas (kolo).',
        'Sugar is customary, and in some rural regions like Kaffa or Harar, a pinch of salt or a sprig of rue herb (tena adam) is added for herbal balance.'
      ]
    },
    relatedTourIds: ['addis-gateway', 'ancient-kingdoms', 'landscapes-lakes'],
    relatedDestIds: ['addis-ababa', 'harar', 'arba-minch']
  },
  {
    id: 'art-3',
    slug: 'trekking-roof-of-africa-simien-mountains',
    title: 'High Above the Clouds: Trekking Among the Endemic Wildlife of the Simien Mountains',
    subtitle: 'Escarpments, 1,000-meter sheer precipices, and the gentle social lives of Gelada baboons.',
    excerpt: 'Rising to over 4,500 meters, the Simien Mountains form the dramatic "Roof of Africa"—a wonderland of jagged volcanic peaks, giant lobelias, and rare endemic species found nowhere else on Earth.',
    category: 'Nature & Wildlife',
    author: {
      name: 'Daniel Alemayehu',
      role: 'High-Altitude Wilderness Specialist',
      avatar: 'https://res.cloudinary.com/dw1ohipim/image/upload/v1784106148/nagiymokhyrtp8vm41ki.jpg'
    },
    publishedDate: 'January 10, 2026',
    readTime: '7 min read',
    coverImage: 'https://res.cloudinary.com/dw1ohipim/image/upload/v1787827787/qnsslbibqvypbirf5kli.jpg',
    tags: ['Simien Mountains', 'Trekking', 'Gelada Baboons', 'Highlands', 'Wildlife'],
    content: {
      introduction: 'Millions of years of volcanic eruptions followed by relentless geological erosion have sculpted the Simien massif into one of the most awe-inspiring mountain landscapes on Earth. Gazing across the precipice at Sankaber or Imet Gogo, jagged spires pierce through billowing sea clouds stretching all the way to the horizon.',
      sections: [
        {
          heading: 'Sitting in the Midst of Gelada Troops',
          paragraphs: [
            'Unlike their predatory cousins elsewhere on the continent, the Gelada baboons (Theropithecus gelada) are gentle, ground-dwelling grass-eaters. Often referred to as "bleeding-heart monkeys" due to the vivid crimson patch of bare skin on their chests, they spend their days grazing in large, sociable herds numbering up to 400 individuals.',
            'Trekking quietly into their midst is a tranquil experience. Because they do not fear humans who approach respectfully with local park scouts, you can sit within meters as mothers groom infants, elders groom each other in synchronized harmony, and youngsters somersault through highland tussocks.'
          ],
          quote: '“Watching sunset over a 1,000-meter drop while hundreds of Geladas chatter softly around you is an experience that stays with you forever.”',
          image: 'https://res.cloudinary.com/dw1ohipim/image/upload/v1784106148/nagiymokhyrtp8vm41ki.jpg',
          imageCaption: 'Endemic Geladas grazing peacefully along the high Simien escarpment.'
        },
        {
          heading: 'The Guardians of the High Crags: Walia Ibex & Ethiopian Wolf',
          paragraphs: [
            'Ascending higher toward Chennek and Mount Ras Dejen (4,550m), the flora shifts into surreal afro-alpine vegetation dominated by prehistoric Giant Lobelias (Lobelia rhynchopetalum) that stand like statues in the mist.',
            'Here on steep rock ledges, keen eyes can spot the endangered Walia Ibex—a majestic mountain goat with curved horns that was once on the brink of extinction but is now recovering thanks to dedicated community conservation efforts. In the alpine plateaus, the rare Ethiopian Wolf may be seen hunting highland grass rats at dawn.'
          ]
        }
      ],
      conclusion: 'The Simien Mountains offer dramatic high-altitude wilderness paired with wildlife encounters that are intimate, peaceful, and visually extraordinary.',
      practicalTips: [
        'Bring warm thermal base layers and windproof outerwear; temperatures drop sharply below freezing at high-altitude mountain camps once the sun sets.',
        'High-SPF sunscreen and polarized sunglasses are essential due to intense high-elevation solar radiation.',
        'Take your time acclimatizing for a day in Gondar (2,133m) before ascending into the park.'
      ]
    },
    relatedTourIds: ['ancient-kingdoms'],
    relatedDestIds: ['simien-mountains', 'gondar']
  },
  {
    id: 'art-4',
    slug: 'walled-city-of-harar-jugol',
    title: 'The Walled Sanctuary of Harar: Jugol’s 99 Mosques, Peace, and Nighttime Hyena Traditions',
    subtitle: 'Stepping into a 1,000-year-old eastern sanctuary of vibrant colors, coffee, and ancient coexistence.',
    excerpt: 'Surrounded by ancient 16th-century stone ramparts, Harar Jugol is considered the fourth holiest city in Islam—a labyrinth of 368 narrow alleys, vibrant spice markets, and a unique nightly bond with wild hyenas.',
    category: 'Heritage',
    author: {
      name: 'Yared Tesfaye',
      role: 'Senior Cultural Historian',
      avatar: 'https://res.cloudinary.com/dw1ohipim/image/upload/v1787829001/vdsdw78hakjuouamvers.jpg'
    },
    publishedDate: 'February 08, 2026',
    readTime: '6 min read',
    coverImage: 'https://res.cloudinary.com/dw1ohipim/image/upload/v1784496024/ywsf1mxm5sdpsb8znls6.jpg',
    tags: ['Harar', 'UNESCO Walled City', 'Islamic Heritage', 'Eastern Ethiopia', 'Hyena Men'],
    content: {
      introduction: 'Harar feels like nowhere else in the Horn of Africa. Perched on a hilltop in eastern Ethiopia, this historic walled city has stood for a millennium as an independent trading crossroads linking the African interior with the Arabian Peninsula and the Indian Ocean trade routes.',
      sections: [
        {
          heading: 'Behind the Five Historic Gates of Jugol',
          paragraphs: [
            'Stepping through one of the five ancient gates of Harar Jugol is like entering another century. Inside a dense area of less than one square kilometer, 82 historic mosques and 102 sacred shrines are tucked into pastel-painted alleys.',
            'Traditional Harari houses (Gegar) are architectural masterpieces of interior harmony. Their sunken living rooms are lined with handcrafted niches displaying ornamental bowls, Persian rugs, and ceremonial woven baskets (mesob), reflecting centuries of sophisticated mercantile culture.'
          ],
          quote: '“In Harar, every doorway has a color, and every alleyway has a story whispered across centuries.”'
        },
        {
          heading: 'The Nightly Pact with Wild Hyenas',
          paragraphs: [
            'As twilight descends outside the historic gates, one of the world’s most remarkable traditions takes place. For generations, Harari "hyena men" have maintained an amicable bond with wild spotted hyenas that roam the surrounding hills.',
            'Calling them by individual names, the hyena master feeds scraps of meat from short wooden sticks held between his teeth. Far from a circus spectacle, this tradition originated centuries ago as a practical pact of peaceful coexistence, keeping the city safe and clean while honoring wildlife.'
          ]
        }
      ],
      conclusion: 'Harar is a city that enchants through sensory richness—the smell of freshly roasted Harari longberry coffee, the clatter of silver jewelry in market alleys, and the peaceful evening call to prayer echoing from ancient minarets.',
      practicalTips: [
        'Wear comfortable walking shoes with good grip on cobblestones.',
        'Harar is an easy 1-hour scenic drive from Dire Dawa International Airport, which has frequent daily flights from Addis Ababa.',
        'Support local women’s weaving cooperatives by purchasing authentic hand-woven Harari baskets.'
      ]
    },
    relatedTourIds: ['rift-to-harar'],
    relatedDestIds: ['harar', 'addis-ababa']
  },
  {
    id: 'art-5',
    slug: 'practical-guide-seasons-altitude-ethiopia',
    title: 'A Traveler’s Practical Handbook: Seasons, High Altitude, and What to Expect in Ethiopia',
    subtitle: 'Essential advice from our local team on visas, packing, weather rhythms, and respectful etiquette.',
    excerpt: 'From understanding highland microclimates to navigating domestic flight networks and local currency, here is everything you need to know before embarking on your Ethiopian expedition.',
    category: 'Travel Guide',
    author: {
      name: 'Selamawit Bekele',
      role: 'Head of Expedition Logistics',
      avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=200&q=80'
    },
    publishedDate: 'February 20, 2026',
    readTime: '8 min read',
    coverImage: 'https://res.cloudinary.com/dw1ohipim/image/upload/v1784491401/gwxhfwpl9c3hn8x1j77e.jpg',
    tags: ['Practical Guide', 'Weather', 'Visas', 'Packing', 'Health'],
    content: {
      introduction: 'Planning a trip to Ethiopia is an exciting endeavor that rewards preparation. Because Ethiopia’s geography ranges from mountain peaks at 4,500m to salt depressions below sea level, knowing what to anticipate makes all the difference.',
      sections: [
        {
          heading: 'The Seasons: When is the Best Time to Travel?',
          paragraphs: [
            'Ethiopia’s primary dry travel season extends from October through May. October and November are particularly breathtaking, as the hills remain emerald green from late summer rains and yellow Meskel daisies carpet the highland valleys.',
            'January brings the famous Timkat (Epiphany) celebrations, when cities like Gondar and Lalibela fill with colorful processions, sacred replicas of the Ark of the Covenant, and joyous chanting. September features Meskel (Finding of the True Cross), celebrated with massive ceremonial bonfires across city squares.'
          ]
        },
        {
          heading: 'Understanding Highland Altitude and Acclimatization',
          paragraphs: [
            'Addis Ababa sits at 2,355 meters (7,726 feet) above sea level, making it the third-highest capital city in the world. Lalibela is at 2,500m, and the Simien Mountains reach over 3,000m.',
            'We always design our itineraries with a gentle first 24 hours to allow your body to adjust naturally. Drink plenty of water, avoid excessive physical exertion on day one, and savor the crisp, unpolluted mountain air.'
          ]
        },
        {
          heading: 'Visas, Currency, and Payments',
          paragraphs: [
            'Most international passport holders can obtain an official eVisa through the government portal (evisa.gov.et) in 3–5 business days. Ensure your passport has at least six months validity.',
            'The currency is the Ethiopian Birr (ETB). While credit cards are widely accepted at major luxury hotels in Addis Ababa, cash is necessary for local markets, craft purchases, and tipping. ATMs are readily available in all provincial towns.'
          ]
        }
      ],
      conclusion: 'Ethiopia welcomes visitors with legendary warmth. With a thoughtful itinerary and local guidance, your journey will be comfortable, enriching, and unforgettable.',
      practicalTips: [
        'Pack layers: warm fleece/jacket for evenings and light breathable cotton for daytime sun.',
        'Sturdy walking shoes with ankle support are essential for historical sites and mountain walks.',
        'Carry a universal travel adapter (Type C/F plugs are standard).'
      ]
    },
    relatedTourIds: ['ancient-kingdoms', 'addis-gateway', 'landscapes-lakes'],
    relatedDestIds: ['addis-ababa', 'lalibela', 'gondar', 'simien-mountains']
  }
];
