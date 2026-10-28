
import React, { useEffect, useRef, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  collection,
  getDocs,
  query,
  orderBy,
  limit,
} from 'firebase/firestore';
import {
  ArrowRight,
  MapPin,
  Compass,
  Star,
  ChevronLeft,
  ChevronRight,
  Loader2,
} from 'lucide-react';

import { db } from '../config/firebase';
import { TourPackage } from '../types';
import { SEO } from '../components/SEO';

interface HomePageProps {
  onPlanWithTour: (tour: TourPackage) => void;
  savedTourIds: string[];
  onToggleSaveTour: (tourId: string) => void;
  onSelectTourModal: (tour: TourPackage) => void;
  onOpenBooking: () => void;
}

interface FeaturedItem {
  id: string;
  name?: string;
  title?: string;
  image?: string;
  route?: string;
  daysCount?: number;
  [key: string]: unknown;
}

const HERO_SLIDES = [
  {
    image:
      'https://res.cloudinary.com/dw1ohipim/image/upload/f_auto,q_auto,w_1600/v1789937596/ebenwalotmbgiqszetie.jpg',
    kicker: 'THE NORTHERN CIRCUIT',
    title: 'The Ancient Kingdoms',
    subtitle:
      'Discover the historic heart of Ethiopia through rock-hewn churches, royal castles, and dramatic mountain landscapes.',
  },
  {
    image:
      'https://res.cloudinary.com/dw1ohipim/image/upload/f_auto,q_auto,w_1600/v1789937854/qqoecq1zq0gh0ixocyrw.jpg',
    kicker: 'THE OMO VALLEY',
    title: 'Living Traditions',
    subtitle:
      'Immerse yourself in vibrant cultures on our premier African safari tours through the extraordinary valleys of the south.',
  },
  {
    image:
      'https://res.cloudinary.com/dw1ohipim/image/upload/f_auto,q_auto,w_1600/v1789938018/mhnlbosuyl5sfwq5r8jb.jpg',
    kicker: 'SIMIEN MOUNTAINS',
    title: 'The Roof of Africa',
    subtitle:
      'Trek through breathtaking escarpments and encounter endemic high-altitude species found nowhere else on earth.',
  },
];

const DISCOVERY_CATEGORIES = [
  {
    name: 'Mountains',
    icon: '⛰️',
    image:
      'https://res.cloudinary.com/dw1ohipim/image/upload/f_auto,q_auto,w_1600/v1789936924/luss2axnhw8imchwkjnx.jpg',
  },
  {
    name: 'History',
    icon: '🏛️',
    image:
      'https://res.cloudinary.com/dw1ohipim/image/upload/f_auto,q_auto,w_1600/v1789847792/nf8qzfajx1mucoyykiip.jpg',
  },
  {
    name: 'Wildlife',
    icon: '🦁',
    image:
      'https://res.cloudinary.com/dw1ohipim/image/upload/f_auto,q_auto,w_1600/v1789937912/irewwcnxjwy2utnuxqqi.avif',
  },
  {
    name: 'Culture',
    icon: '🏺',
    image:
      'https://res.cloudinary.com/dw1ohipim/image/upload/f_auto,q_auto,w_1600/v1789937754/ctzbwpnlytehkv6zznb5.jpg',
  },
];

const VISUAL_STORY = [
  {
    title: 'ANCIENT HISTORY',
    image:
      'https://res.cloudinary.com/dw1ohipim/image/upload/f_auto,q_auto,w_1600/v1789938241/n79pjzdjboazxhpumypb.jpg',
  },
  {
    title: 'WILD LANDSCAPES',
    image:
      'https://res.cloudinary.com/dw1ohipim/image/upload/f_auto,q_auto,w_1600/v1789938293/eafsz4kczfgeihwegsmr.jpg',
  },
];

const INSPIRATION_STORIES = [
  {
    title: '7 DAYS IN NORTHERN ETHIOPIA',
    img: 'https://res.cloudinary.com/dw1ohipim/image/upload/f_auto,q_auto,w_1600/v1789939440/osppvgvrh0q4v7tqsint.jpg',
  },
  {
    title: 'THE LAND OF THE SIMIEN',
    img: 'https://res.cloudinary.com/dw1ohipim/image/upload/f_auto,q_auto,w_1600/v1789936924/luss2axnhw8imchwkjnx.jpg',
  },
  {
    title: 'DISCOVERING THE OMO VALLEY',
    img: 'https://res.cloudinary.com/dw1ohipim/image/upload/f_auto,q_auto,w_1600/v1789842989/eqggz7yvayg8ufaacdju.avif',
  },
];

const BENEFITS = [
  { title: 'LOCAL EXPERTS', subtitle: 'Born and raised in Ethiopia' },
  { title: 'AUTHENTIC ROUTES', subtitle: 'Beyond the tourist trails' },
  { title: 'PRIVATE JOURNEYS', subtitle: 'Your pace, your interests' },
  { title: '24/7 SUPPORT', subtitle: 'Always here for you' },
];

const CLOUDINARY_HOST =
  'https://res.cloudinary.com/dw1ohipim/';

function isCloudinaryImage(url: string): boolean {
  return url.startsWith(CLOUDINARY_HOST);
}

/**
 * Reuse Cloudinary's automatic format and quality optimization,
 * but request only the width needed for each image.
 */
function cloudinaryImage(url: string, width: number): string {
  if (!isCloudinaryImage(url)) return url;

  return url.replace(/w_\d+/, `w_${width}`);
}

function responsiveSrcSet(url: string): string | undefined {
  if (!isCloudinaryImage(url)) return undefined;

  return [480, 768, 1200, 1600]
    .map((width) => `${cloudinaryImage(url, width)} ${width}w`)
    .join(', ');
}

interface OptimizedImageProps {
  src: string;
  alt: string;
  className?: string;
  sizes?: string;
  priority?: boolean;
  width?: number;
  height?: number;
}

function OptimizedImage({
  src,
  alt,
  className = '',
  sizes = '100vw',
  priority = false,
  width = 1200,
  height = 800,
}: OptimizedImageProps) {
  return (
    <img
      src={cloudinaryImage(src, width)}
      srcSet={responsiveSrcSet(src)}
      sizes={sizes}
      alt={alt}
      width={width}
      height={height}
      loading={priority ? 'eager' : 'lazy'}
      fetchPriority={priority ? 'high' : 'auto'}
      decoding="async"
      className={className}
    />
  );
}

export const HomePage: React.FC<HomePageProps> = ({
  onOpenBooking,
}) => {
  const navigate = useNavigate();
  const pageRef = useRef<HTMLDivElement>(null);

  const [featuredTours, setFeaturedTours] = useState<FeaturedItem[]>([]);
  const [featuredDestinations, setFeaturedDestinations] = useState<
    FeaturedItem[]
  >([]);
  const [isLoading, setIsLoading] = useState(true);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [dataError, setDataError] = useState(false);

  // Load homepage data concurrently. Use one-time reads for content
  // that does not need continuous real-time updates.
  useEffect(() => {
    let cancelled = false;

    async function loadHomepageData() {
      try {
        const toursQuery = query(
          collection(db, 'tours'),
          orderBy('createdAt', 'desc'),
          limit(4)
        );

        const destinationsQuery = query(
          collection(db, 'destinations'),
          orderBy('createdAt', 'desc'),
          limit(5)
        );

        const [toursSnapshot, destinationsSnapshot] =
          await Promise.all([
            getDocs(toursQuery),
            getDocs(destinationsQuery),
          ]);

        if (cancelled) return;

        setFeaturedTours(
          toursSnapshot.docs.map((document) => ({
            ...document.data(),
            id: document.id,
          })) as FeaturedItem[]
        );

        setFeaturedDestinations(
          destinationsSnapshot.docs.map((document) => ({
            ...document.data(),
            id: document.id,
          })) as FeaturedItem[]
        );
      } catch (error) {
        console.error('Unable to load homepage content:', error);

        if (!cancelled) {
          setDataError(true);
        }
      } finally {
        if (!cancelled) {
          setIsLoading(false);
        }
      }
    }

    void loadHomepageData();

    return () => {
      cancelled = true;
    };
  }, []);

  // Preload the next hero image separately. Only one hero image
  // is rendered in the DOM at a time.
  useEffect(() => {
    const nextIndex = (currentSlide + 1) % HERO_SLIDES.length;
    const nextImage = new Image();

    nextImage.decoding = 'async';
    nextImage.src = cloudinaryImage(
      HERO_SLIDES[nextIndex].image,
      1200
    );
  }, [currentSlide]);

  // Pause the slideshow in background tabs and honor reduced motion.
  useEffect(() => {
    const motionQuery = window.matchMedia(
      '(prefers-reduced-motion: reduce)'
    );

    if (motionQuery.matches) return;

    const timer = window.setInterval(() => {
      if (document.visibilityState !== 'visible') return;

      setCurrentSlide((previous) => (
        previous + 1
      ) % HERO_SLIDES.length);
    }, 6000);

    return () => window.clearInterval(timer);
  }, []);

  // Reveal sections only as they enter the viewport.
  useEffect(() => {
    const root = pageRef.current;
    if (!root) return;

    const elements = root.querySelectorAll('.scroll-reveal');

    if (
      window.matchMedia('(prefers-reduced-motion: reduce)').matches ||
      !('IntersectionObserver' in window)
    ) {
      elements.forEach((element) => {
        element.classList.remove('opacity-0', 'translate-y-12');
        element.classList.add('opacity-100', 'translate-y-0');
      });

      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;

          entry.target.classList.remove(
            'opacity-0',
            'translate-y-12'
          );
          entry.target.classList.add(
            'opacity-100',
            'translate-y-0'
          );

          observer.unobserve(entry.target);
        });
      },
      {
        threshold: 0.05,
        rootMargin: '0px 0px 100px 0px',
      }
    );

    elements.forEach((element) => observer.observe(element));

    return () => observer.disconnect();
  }, []);

  const nextSlide = () => {
    setCurrentSlide((previous) => (
      previous + 1
    ) % HERO_SLIDES.length);
  };

  const prevSlide = () => {
    setCurrentSlide((previous) => (
      previous - 1 + HERO_SLIDES.length
    ) % HERO_SLIDES.length);
  };

  const activeSlide = HERO_SLIDES[currentSlide];

  return (
    <div
      ref={pageRef}
      className="min-h-screen overflow-hidden bg-[#FDFBF7] font-sans text-[#1A1A1A]"
    >
      <SEO
        title="Premier Ethiopian Travel Agency & Tours"
        description="Experience the magic of the Horn of Africa with Ancient Path, a premier Ethiopian travel agency offering historical expeditions and breathtaking African safari tours."
        keywords="ethiopian travel agency, african safari tours, ancient path ethiopia, ethiopia travel"
      />

      {/* 1. HERO */}

      <section className="relative -mt-16 flex min-h-[650px] h-[100svh] max-h-[1000px] w-full items-center overflow-hidden bg-black lg:-mt-24">
        <div className="absolute inset-0">
          <OptimizedImage
            key={activeSlide.image}
            src={activeSlide.image}
            alt="Discover Ethiopia's historic landscapes"
            priority
            width={1600}
            height={1000}
            sizes="100vw"
            className="h-full w-full object-cover brightness-[0.65]"
          />

          <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/40 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
        </div>

        <div className="relative z-10 mx-auto mt-20 w-full max-w-[1400px] px-4 md:mt-24 md:px-8">
          <div key={currentSlide} className="max-w-3xl">
            <span
              className="mb-6 inline-block text-[10px] font-bold uppercase tracking-[0.3em] text-[#B85C38] md:text-xs"
            >
              {activeSlide.kicker}
            </span>

            <h1
              className="mb-8 font-serif text-5xl leading-[1.05] tracking-tight text-white drop-shadow-lg md:text-7xl lg:text-[5.5rem]"
            >
              {activeSlide.title}
            </h1>

            <p className="mb-10 max-w-2xl text-lg font-light leading-relaxed text-gray-300 md:mb-12 md:text-2xl">
              {activeSlide.subtitle}
            </p>

            <div className="flex flex-col items-center gap-4 sm:flex-row sm:gap-5">
              <button
                onClick={() => navigate('/tours')}
                className="group flex w-full items-center justify-center gap-3 bg-white px-10 py-5 text-xs font-bold uppercase tracking-widest text-black shadow-2xl transition-colors hover:bg-gray-200 sm:w-auto"
              >
                <span>Explore Journeys</span>
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </button>

              <button
                onClick={onOpenBooking}
                className="w-full border border-white/50 px-10 py-5 text-xs font-bold uppercase tracking-widest text-white transition-colors hover:bg-white hover:text-black sm:w-auto"
              >
                Book Your Expedition
              </button>
            </div>
          </div>
        </div>

        <div className="absolute bottom-8 left-0 z-20 w-full md:bottom-10">
          <div className="mx-auto flex max-w-[1400px] flex-col justify-between gap-6 px-4 md:flex-row md:items-end md:px-8">
            <div className="flex items-center gap-3">
              <button
                onClick={prevSlide}
                aria-label="Previous slide"
                className="flex h-12 w-12 items-center justify-center rounded-full border border-white/30 text-white transition-colors hover:bg-white hover:text-black"
              >
                <ChevronLeft className="h-5 w-5" />
              </button>

              <button
                onClick={nextSlide}
                aria-label="Next slide"
                className="flex h-12 w-12 items-center justify-center rounded-full border border-white/30 text-white transition-colors hover:bg-white hover:text-black"
              >
                <ChevronRight className="h-5 w-5" />
              </button>
            </div>

            <div className="flex w-full items-center gap-6 md:w-auto">
              <span className="font-serif text-lg text-white">
                0{currentSlide + 1}
                <span className="mx-1 text-sm text-white/40">/</span>
                <span className="text-sm text-white/40">
                  0{HERO_SLIDES.length}
                </span>
              </span>

              <div className="relative h-[2px] flex-1 overflow-hidden bg-white/20 md:w-48 md:flex-none">
                <div
                  key={currentSlide}
                  className="absolute left-0 top-0 h-full bg-[#B85C38] hero-progress"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. QUICK DISCOVERY */}

      <section className="mx-auto max-w-[1400px] px-4 py-20 md:px-8 md:py-24">
        <p className="scroll-reveal mb-8 translate-y-12 text-center text-gray-500 opacity-0 transition-all duration-700">
          As a dedicated <strong>Ethiopian travel agency</strong>, we craft
          authentic experiences that connect you deeply with the land and
          its people.
        </p>

        <h2 className="scroll-reveal mb-12 translate-y-12 text-center text-xs font-bold uppercase tracking-[0.25em] text-[#B85C38] opacity-0 transition-all duration-700 md:mb-16">
          Choose Your Experience
        </h2>

        <div className="grid grid-cols-2 gap-4 md:grid-cols-4 md:gap-8">
          {DISCOVERY_CATEGORIES.map((category, index) => (
            <div
              key={category.name}
              className="group scroll-reveal relative h-56 translate-y-12 cursor-pointer overflow-hidden rounded-xl opacity-0 transition-all duration-700 md:h-80"
              style={{ transitionDelay: `${index * 75}ms` }}
            >
              <OptimizedImage
                src={category.image}
                alt={category.name}
                width={600}
                height={800}
                sizes="(max-width: 767px) 50vw, 25vw"
                className="h-full w-full object-cover transition-transform duration-700 motion-safe:group-hover:scale-105"
              />

              <div className="absolute inset-0 bg-black/40 transition-colors duration-300 group-hover:bg-black/20" />

              <div className="absolute inset-0 flex flex-col items-center justify-center text-white">
                <span className="mb-4 text-4xl">{category.icon}</span>
                <span className="text-center text-xs font-bold uppercase tracking-widest md:text-sm">
                  {category.name}
                </span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 3. FEATURED DESTINATIONS */}

      <section className="mx-auto max-w-[1400px] border-t border-gray-200 px-4 py-20 md:px-8 md:py-24">
        <div className="scroll-reveal mb-12 translate-y-12 opacity-0 transition-all duration-700 md:mb-16">
          <span className="mb-4 block text-xs font-bold uppercase tracking-[0.2em] text-[#B85C38]">
            Iconic Regions
          </span>

          <h2 className="font-serif text-4xl text-[#1A1A1A] md:text-6xl">
            Places That Stay With You
          </h2>
        </div>

        {isLoading ? (
          <div className="flex flex-col items-center justify-center py-20 text-gray-400">
            <Loader2 className="mb-4 h-10 w-10 animate-spin text-[#B85C38]" />
            <p className="text-sm font-bold uppercase tracking-widest">
              Loading Regions...
            </p>
          </div>
        ) : featuredDestinations.length === 0 ? (
          <p className="py-12 text-center text-gray-500">
            {dataError
              ? 'Regions could not be loaded. Please try again later.'
              : 'Destinations will be available soon.'}
          </p>
        ) : (
          <div className="grid h-auto grid-cols-1 gap-4 md:h-[800px] md:grid-cols-4 md:grid-rows-2 md:gap-6">
            {featuredDestinations.map((destination, index) => {
              const isLarge = index === 0;

              return (
                <Link
                  key={destination.id}
                  to={`/destinations/${destination.id}`}
                  className={`group scroll-reveal relative translate-y-12 overflow-hidden rounded-2xl opacity-0 transition-all duration-700 ${
                    isLarge
                      ? 'h-[400px] md:col-span-2 md:row-span-2 md:h-full'
                      : 'h-[280px] md:col-span-1 md:row-span-1 md:h-full'
                  }`}
                >
                  {destination.image && (
                    <OptimizedImage
                      src={destination.image}
                      alt={destination.name || 'Explore Ethiopia'}
                      width={isLarge ? 1200 : 600}
                      height={isLarge ? 1200 : 600}
                      sizes={
                        isLarge
                          ? '(max-width: 767px) 100vw, 50vw'
                          : '(max-width: 767px) 100vw, 25vw'
                      }
                      className="h-full w-full object-cover transition-transform duration-700 motion-safe:group-hover:scale-105"
                    />
                  )}

                  <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent opacity-80 transition-opacity duration-300 group-hover:opacity-100" />

                  <div className="absolute bottom-6 left-6 right-6 md:bottom-8 md:left-8">
                    <h3
                      className={`mb-3 font-serif text-white ${
                        isLarge
                          ? 'text-4xl md:text-6xl'
                          : 'text-3xl'
                      }`}
                    >
                      {destination.name}
                    </h3>

                    <span className="inline-flex items-center text-xs font-bold uppercase tracking-widest text-[#B85C38]">
                      Explore Region
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </span>
                  </div>
                </Link>
              );
            })}
          </div>
        )}
      </section>

      {/* 4. FEATURED TOURS */}

      <section className="border-t border-gray-200 bg-white px-4 py-20 md:px-8 md:py-32">
        <div className="mx-auto max-w-[1400px]">
          <div className="scroll-reveal mb-12 flex translate-y-12 items-end justify-between gap-4 opacity-0 transition-all duration-700 md:mb-16">
            <div>
              <span className="mb-4 block text-xs font-bold uppercase tracking-[0.2em] text-[#B85C38]">
                Handpicked Itineraries
              </span>

              <h2 className="font-serif text-4xl text-[#1A1A1A] md:text-6xl">
                Curated Journeys
              </h2>
            </div>

            <Link
              to="/tours"
              className="hidden items-center border-b border-black pb-1 text-xs font-bold uppercase tracking-widest transition-colors hover:border-[#B85C38] hover:text-[#B85C38] md:flex"
            >
              View All Tours
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </div>

          {isLoading ? (
            <div className="flex flex-col items-center justify-center py-20 text-gray-400">
              <Loader2 className="mb-4 h-10 w-10 animate-spin text-[#B85C38]" />
              <p className="text-sm font-bold uppercase tracking-widest">
                Loading Journeys...
              </p>
            </div>
          ) : featuredTours.length === 0 ? (
            <p className="py-16 text-center text-gray-500">
              {dataError
                ? 'Journeys could not be loaded. Please try again later.'
                : 'No journeys available right now.'}
            </p>
          ) : (
            <div className="grid grid-cols-1 gap-10 md:grid-cols-2 lg:gap-16">
              {featuredTours.map((tour) => (
                <Link
                  key={tour.id}
                  to={`/tours/${tour.id}`}
                  className="group scroll-reveal block translate-y-12 opacity-0 transition-all duration-700"
                >
                  <div className="relative mb-8 h-[320px] overflow-hidden rounded-2xl md:h-[450px]">
                    {tour.image && (
                      <OptimizedImage
                        src={tour.image}
                        alt={tour.title || 'Ethiopian tour'}
                        width={1000}
                        height={700}
                        sizes="(max-width: 767px) 100vw, 50vw"
                        className="h-full w-full object-cover transition-transform duration-700 motion-safe:group-hover:scale-105"
                      />
                    )}

                    <div className="absolute left-6 top-6 rounded-sm bg-white px-4 py-2 text-[10px] font-bold uppercase tracking-widest shadow-lg">
                      {tour.daysCount || 1} Days
                    </div>
                  </div>

                  <div className="pr-4">
                    <h3 className="mb-3 line-clamp-1 font-serif text-3xl transition-colors group-hover:text-[#B85C38] md:text-4xl">
                      {tour.title}
                    </h3>

                    <div className="flex items-center text-xs font-bold uppercase tracking-widest text-gray-500">
                      <MapPin className="mr-2 h-4 w-4 text-[#B85C38]" />
                      {tour.route || 'Ethiopia'}
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          )}

          <Link
            to="/tours"
            className="mt-12 flex items-center justify-center rounded-lg border border-black py-4 text-xs font-bold uppercase tracking-widest transition-colors hover:bg-black hover:text-white md:hidden"
          >
            View All Tours
          </Link>
        </div>
      </section>

      {/* 5. VISUAL ETHIOPIA STORY */}

      <section className="w-full bg-black">
        {VISUAL_STORY.map((story) => (
          <div
            key={story.title}
            className="relative flex h-[70vh] w-full items-center justify-center overflow-hidden md:h-[90vh]"
          >
            <div className="absolute inset-0">
              <OptimizedImage
                src={story.image}
                alt={story.title}
                width={1600}
                height={1000}
                sizes="100vw"
                className="h-full w-full object-cover opacity-50"
              />
            </div>

            <h2 className="scroll-reveal relative z-10 translate-y-12 px-4 text-center font-serif text-5xl uppercase text-white opacity-0 drop-shadow-2xl transition-all duration-700 md:text-8xl">
              {story.title}
            </h2>
          </div>
        ))}
      </section>

      {/* 6. WHY TRAVEL WITH US */}

      <section className="border-b border-gray-200 bg-[#FDFBF7] px-4 py-20 md:px-8 md:py-24">
        <div className="mx-auto grid max-w-[1400px] grid-cols-2 gap-10 md:grid-cols-4 md:gap-8">
          {BENEFITS.map((benefit) => (
            <div
              key={benefit.title}
              className="scroll-reveal translate-y-12 text-center opacity-0 transition-all duration-700"
            >
              <Compass className="mx-auto mb-6 h-10 w-10 text-[#B85C38]" />

              <h3 className="mb-2 text-sm font-bold uppercase tracking-widest">
                {benefit.title}
              </h3>

              <p className="text-sm font-light text-gray-500">
                {benefit.subtitle}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* 7. TRAVEL INSPIRATION */}

      <section className="bg-white px-4 py-20 md:px-8 md:py-32">
        <div className="mx-auto max-w-[1400px]">
          <span className="scroll-reveal mb-4 block translate-y-12 text-center text-xs font-bold uppercase tracking-[0.2em] text-[#B85C38] opacity-0 transition-all duration-700">
            Journal &amp; Field Notes
          </span>

          <h2 className="scroll-reveal mb-12 translate-y-12 text-center font-serif text-4xl text-[#1A1A1A] opacity-0 transition-all duration-700 md:mb-16 md:text-6xl">
            Travel Inspiration
          </h2>

          <div className="grid grid-cols-1 gap-8 md:grid-cols-3 md:gap-10">
            {INSPIRATION_STORIES.map((story) => (
              <article
                key={story.title}
                className="group scroll-reveal translate-y-12 opacity-0 transition-all duration-700"
              >
                <div className="relative mb-6 h-72 overflow-hidden rounded-2xl">
                  <OptimizedImage
                    src={story.img}
                    alt={story.title}
                    width={800}
                    height={600}
                    sizes="(max-width: 767px) 100vw, 33vw"
                    className="h-full w-full object-cover transition-transform duration-700 motion-safe:group-hover:scale-105"
                  />
                </div>

                <h3 className="text-sm font-bold leading-relaxed tracking-widest text-gray-800 transition-colors group-hover:text-[#B85C38] md:text-base">
                  {story.title}
                </h3>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* 8. TESTIMONIALS */}

      <section className="border-t border-gray-200 bg-[#FDFBF7] px-4 py-20 md:px-8 md:py-32">
        <div className="scroll-reveal mx-auto max-w-5xl translate-y-12 text-center opacity-0 transition-all duration-700">
          <Star className="mx-auto mb-10 h-10 w-10 text-[#B85C38]" />

          <h2 className="mb-12 font-serif text-3xl leading-relaxed text-[#1A1A1A] md:text-5xl">
            "We were looking for an authentic experience, not a pre-packaged
            tour. The attention to detail and local knowledge provided was
            beyond our expectations."
          </h2>

          <p className="text-xs font-bold uppercase tracking-[0.2em] text-gray-500">
            Sarah &amp; James, UK
          </p>
        </div>
      </section>

      {/* 9. FINAL BOOKING SECTION */}

      <section className="relative flex h-[70vh] min-h-[500px] w-full items-center justify-center overflow-hidden bg-black">
        <div className="absolute inset-0">
          <OptimizedImage
            src="https://res.cloudinary.com/dw1ohipim/image/upload/f_auto,q_auto,w_1600/v1789842587/tdxfdqwvdwbuzh3uuus6.jpg"
            alt="Ethiopian landscapes"
            width={1600}
            height={1000}
            sizes="100vw"
            className="h-full w-full object-cover brightness-[0.40]"
          />
        </div>

        <div className="scroll-reveal relative z-10 translate-y-12 px-4 text-center opacity-0 transition-all duration-700">
          <span className="mb-6 block text-xs font-bold uppercase tracking-[0.3em] text-[#B85C38]">
            Begin Your Adventure
          </span>

          <h2 className="mb-8 font-serif text-4xl text-white md:text-7xl">
            READY TO DISCOVER ETHIOPIA?
          </h2>

          <p className="mx-auto mb-12 max-w-xl text-lg font-light text-white/80">
            Tell us what you want to experience. We'll help create the
            journey.
          </p>

          <button
            onClick={onOpenBooking}
            className="rounded-sm bg-white px-12 py-5 text-xs font-bold uppercase tracking-widest text-black shadow-2xl transition-colors hover:bg-gray-200"
          >
            Book Journey
          </button>
        </div>
      </section>

      {/* Lightweight animation styles */}

      <style>{`
        @keyframes heroProgress {
          from { width: 0; }
          to { width: 100%; }
        }

        .hero-progress {
          animation: heroProgress 6s linear forwards;
        }

        @media (prefers-reduced-motion: reduce) {
          .hero-progress {
            animation: none;
            width: 100%;
          }

          .scroll-reveal {
            transition: none !important;
          }
        }
      `}</style>
    </div>
  );
};

export default HomePage;
