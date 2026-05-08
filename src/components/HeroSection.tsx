import { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { Star, ChevronLeft, ChevronRight } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import heroBg1 from '@/assets/im.jpg';
import heroBg2 from '@/assets/hero.jpg';
import heroBg3 from '@/assets/footer-bg.webp';
import { sanityClient } from "@/lib/sanity";
import { createImageUrlBuilder } from "@sanity/image-url";

const HeroSection = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const heroRef = useRef<HTMLElement>(null);
  const [slides, setSlides] = useState<any[]>([]);
  const safeSlides = slides.length ? slides : [];
const builder = createImageUrlBuilder(sanityClient);
const urlFor = (source: any) => builder.image(source);
const currentImage = safeSlides[currentSlide]?.image;
const nextImage = safeSlides[(currentSlide + 1) % safeSlides.length]?.image;


  // const slides = [
  //   {
  //     image: heroBg1,
  //     title: 'Körkort i Göteborg',
  //     subtitle: 'Förverkliga din körkortsdröm med Aja Trafikskola i Göteborg - bil, MC och moped för en trygg och rolig körupplevelse!',
  //     number: '01',
  //   },
  //   {
  //     image: heroBg2,
  //     title: 'Professionell\nKörkortsutbildning',
  //     subtitle: 'Vi erbjuder personlig och flexibel utbildning för alla nivåer.',
  //     number: '02',
  //   },
  //   {
  //     image: heroBg3,
  //     title: 'Din framgång är vårt mål',
  //     subtitle: 'Med över 20 års erfarenhet hjälper vi dig nå ditt körkort.',
  //     number: '03',
  //   },
  // ];


  useEffect(() => {
  sanityClient
    .fetch(`*[_type == "hero"][0]{slides}`)
    .then((res) => {
      if (res?.slides) {
        setSlides(res.slides);
      }
    });
}, []);
  useEffect(() => {
    const interval = setInterval(() => {
      handleSlideChange((prev) => (prev + 1) % slides.length);
    }, 7000);

    return () => clearInterval(interval);
  }, [slides.length]);

  const handleSlideChange = (newSlideOrFunction: number | ((prev: number) => number)) => {
    setIsTransitioning(true);
    setTimeout(() => {
      if (typeof newSlideOrFunction === 'function') {
        setCurrentSlide(newSlideOrFunction);
      } else {
        setCurrentSlide(newSlideOrFunction);
      }
      setTimeout(() => setIsTransitioning(false), 100);
    }, 300);
  };

  const nextSlide = () => {
    handleSlideChange((prev) => (prev + 1) % slides.length);
  };

  const prevSlide = () => {
    handleSlideChange((prev) => (prev - 1 + slides.length) % slides.length);
  };

  const handleScrollExplore = () => {
    const nextSection = heroRef.current?.nextElementSibling;
    if (nextSection) {
      nextSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  useEffect(() => {
    const handleScroll = () => {
      if (heroRef.current) {
        const scrolled = window.scrollY;
        const heroHeight = heroRef.current.offsetHeight;
        const parallaxElements = heroRef.current.querySelectorAll('.parallax-bg');
        
        parallaxElements.forEach((el) => {
          const element = el as HTMLElement;
          const speed = 0.5;
          element.style.transform = `translateY(${scrolled * speed}px)`;
        });
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <section ref={heroRef} className="relative h-screen overflow-hidden bg-secondary">
      {/* Background Images Carousel with Crossfade */}
      <AnimatePresence mode="wait">
        <motion.div
          key={currentSlide}
          initial={{ opacity: 0, scale: 1.05 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          transition={{ duration: 1.5, ease: [0.43, 0.13, 0.23, 0.96] }}
          className="absolute inset-0"
        >
          <div
            className="parallax-bg absolute inset-0 w-full h-full bg-cover bg-center"
            style={{
backgroundImage: currentImage
  ? `url(${urlFor(currentImage).url()})`
  : "none",            }}
          >
            {/* Dark Overlay */}
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1 }}
              className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/60 to-black/40"
            />
          </div>
        </motion.div>
      </AnimatePresence>

      {/* Left Side - Vertical Pagination Dots */}
      <div className="absolute left-8 lg:left-12 top-1/2 -translate-y-1/2 z-20 flex flex-col gap-4">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentSlide(index)}
            className={`w-3 h-3 rounded-full border-2 transition-all duration-300 ${
              index === currentSlide
                ? 'bg-primary border-primary scale-125'
                : 'bg-transparent border-white/40 hover:border-primary hover:scale-110'
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>

      {/* Bottom Left - Scroll to Explore */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.5, duration: 0.8 }}
        onClick={handleScrollExplore}
        className="hidden md:flex absolute bottom-12 left-8 lg:left-12 z-20 items-center gap-4 text-white border border-white/30 px-6 py-3 backdrop-blur-sm bg-black/20 cursor-pointer group"
        >
        <div className="w-6 h-9 border-2 border-white/40 rounded-full flex items-start justify-center p-1.5 group-hover:border-primary transition-colors">
          <motion.div 
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
            className="w-1 h-2 bg-white/60 rounded-full group-hover:bg-primary"
          />
        </div>
        <span className="text-xs uppercase tracking-[0.2em] font-medium">
          Scroll to<br />Explore
        </span>
      </motion.div>

      {/* Content - Center */}
      <div className="relative h-full container mx-auto px-4 lg:px-16 flex items-center justify-center">
        <div className="max-w-4xl text-center">
          {/* Main Title */}
          <AnimatePresence mode="wait">
            <motion.h1
              key={`title-${currentSlide}`}
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -40 }}
              transition={{ duration: 0.8, delay: 0.3, ease: [0.43, 0.13, 0.23, 0.96] }}
              className="text-5xl md:text-6xl lg:text-8xl font-serif font-light text-white mb-6 leading-[1.1] whitespace-pre-line"
            >
             {safeSlides[currentSlide]?.title}
            </motion.h1>
          </AnimatePresence>

          {/* Subtitle */}
          <AnimatePresence mode="wait">
            <motion.p
              key={`subtitle-${currentSlide}`}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -30 }}
              transition={{ duration: 0.8, delay: 0.5, ease: [0.43, 0.13, 0.23, 0.96] }}
              className="text-lg md:text-xl text-white/90 mb-12 max-w-2xl mx-auto"
            >
              {slides[currentSlide]?.subtitle}
            </motion.p>
          </AnimatePresence>

 
  {/* CTA BUTTONS - ONLY PART UPDATED */}
<motion.div
  initial={{ opacity: 0, y: 20 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.8, delay: 0.7 }}
  className="flex flex-col items-center"
>
  {/* Top row */}
  <div className="flex gap-3 justify-center">
    
    {/* Kontakta oss */}
    <Link
      to="/kontakt"
      className="
        inline-flex items-center justify-center
        px-5 py-2
        sm:px-8 sm:py-4
        border border-white/30 sm:border-2 sm:border-white/40
        text-white uppercase tracking-wider
        text-xs sm:text-sm font-semibold
        hover:bg-white/10 hover:border-primary
        transition-all
      "
    >
      Kontakta oss
    </Link>

    {/* E-handel */}
    <a
      href="https://www.trafikskolaonline.se/sv/skola/aja/"
      target="_blank"
      rel="noopener noreferrer"
      className="
        inline-flex items-center justify-center
        px-5 py-2
        sm:px-8 sm:py-4
        bg-primary sm:bg-primary
        border border-primary sm:border-0
        text-white uppercase tracking-wider
        text-xs sm:text-sm font-semibold
        hover:bg-primary/90
        transition-all
      "
    >
      E-handel
    </a>

  </div>

  {/* Gallery button */}
  <Link
    to="/galleri"
    className="
      mt-3 sm:mt-4
      inline-flex items-center justify-center
      px-5 py-2
      sm:px-6 sm:py-3
      border border-white/30
      text-white uppercase tracking-wider
      text-xs sm:text-sm
      hover:bg-white/10 hover:border-primary
      transition-all
    "
  >
    Galleri
  </Link>

</motion.div>



        </div>
      </div>

      {/* Right Side - Slide Numbers & Thumbnails */}
      <motion.div 
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 1, duration: 0.8 }}
        className="absolute right-8 lg:right-12 top-1/2 -translate-y-1/2 z-20 hidden lg:block"
      >
        {/* Slide Numbers */}
        <div className="flex flex-col gap-8 mb-8">
          {slides.map((slide, index) => (
            <motion.button
              key={index}
              onClick={() => handleSlideChange(index)}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              className={`text-right transition-all duration-500 ${
                index === currentSlide
                  ? 'text-primary text-6xl font-bold'
                  : 'text-white/30 text-4xl font-light hover:text-white/60'
              }`}
            >
              {slide.number}.
            </motion.button>
          ))}
        </div>

        {/* Thumbnail Navigation */}
        <div className="flex flex-col items-end gap-4 mt-12">
          <div className="flex items-center gap-3">
            <button
              onClick={prevSlide}
              className="w-10 h-10 border border-white/30 hover:border-primary hover:bg-primary/10 transition-all flex items-center justify-center group"
              aria-label="Previous slide"
            >
              <ChevronLeft className="w-5 h-5 text-white/70 group-hover:text-primary" />
            </button>
            <button
              onClick={nextSlide}
              className="w-10 h-10 border border-white/30 hover:border-primary hover:bg-primary/10 transition-all flex items-center justify-center group"
              aria-label="Next slide"
            >
              <ChevronRight className="w-5 h-5 text-white/70 group-hover:text-primary" />
            </button>
          </div>
          
          {/* Next Slide Thumbnail */}
          <div className="w-24 h-16 overflow-hidden border-2 border-white/30 hover:border-primary transition-all cursor-pointer group" onClick={nextSlide}>
            <img 
              src={nextImage ? urlFor(nextImage).url() : ""}
              alt="Next slide"
              className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
            />
          </div>
        </div>
      </motion.div>

      {/* Bottom Center - Star Ratings */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.2, duration: 0.8 }}
    className="hidden md:flex absolute bottom-12 left-1/2 -translate-x-1/2 z-20 items-center gap-4 text-white backdrop-blur-sm bg-black/20 px-8 py-4 border border-white/20"
>
        <div className="flex gap-1">
          {[1, 2, 3, 4, 5].map((star) => (
            <motion.div
              key={star}
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 1.2 + star * 0.1, duration: 0.3 }}
            >
              <Star className="w-5 h-5 fill-primary text-primary" />
            </motion.div>
          ))}
        </div>
        <div className="w-px h-6 bg-white/30"></div>
        <span className="text-lg font-bold">5.0</span>
        <div className="w-px h-6 bg-white/30"></div>
        <span className="text-sm uppercase tracking-wider">800+ Reviews</span>
      </motion.div>
    </section>
  );
};

export default HeroSection;
