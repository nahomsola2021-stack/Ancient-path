export type ActiveTab = 
  | 'home'
  | 'tours'
  | 'destinations'
  | 'experiences'
  | 'journal'
  | 'about'
  | 'planner'
  | 'info'
  | 'faq'
  | 'contact';

export type TourCategory = 'signature' | 'flexible';

export interface ItineraryDay {
  day: number | string;
  title: string;
  description: string;
  highlights?: string[];
  location?: string;
  meals?: string;
  accommodation?: string;
}

export interface TourPackage {
  id: string;
  title: string;
  category: TourCategory;
  duration: string;
  daysCount: number;
  route: string;
  summary: string;
  overview: string;
  image: string;
  gallery: string[];
  highlights: string[];
  suggestedJourney: ItineraryDay[];
  bestSuitedTo: string;
  canBeCustomized: boolean;
  options?: {
    title: string;
    description: string;
    points: string[];
  }[];
  extensions?: string[];
  priceEstimate?: string;
  difficulty?: 'Easy' | 'Moderate' | 'Active';
  groupType?: string;
  inclusions?: string[];
  exclusions?: string[];
  accommodationType?: string;
  transportType?: string;
}

export interface Destination {
  id: string;
  name: string;
  tagline: string;
  region: 'North' | 'South' | 'East' | 'Central';
  summary: string;
  fullDescription: string;
  highlights: string[];
  image: string;
  gallery: string[];
  bestTimeToVisit: string;
  altitude: string;
  climate: string;
  coordinates: { x: number; y: number }; // Percentage on Ethiopia map
  connectedTourIds: string[];
}

export interface ExperiencePillar {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  iconName: string;
  image: string;
  keyAspects: string[];
  fullNarrative?: string;
  topDestinations?: string[];
  recommendedTourIds?: string[];
}

export interface TravelStyle {
  id: string;
  title: string;
  description: string;
  iconName: string;
  image: string;
}

export interface FAQItem {
  id: string;
  question: string;
  answer: string;
  category: 'General' | 'Booking & Customization' | 'Preparation' | 'Logistics';
}

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

export interface CustomJourneyState {
  selectedDestinations: string[];
  durationDays: number;
  travelDates: string;
  travelersCount: number;
  travelStyles: string[];
  travelStyleType: 'Private' | 'Couple' | 'Family' | 'Small Group';
  name: string;
  email: string;
  phone: string;
  specialRequests: string;
  approxBudget?: string;
}


