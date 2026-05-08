import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import Navbar from '@/components/Navbar';
import HeroSection from '@/components/HeroSection';
import Footer from '@/components/Footer';
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import imgPlaceholder1 from '@/assets/img1.jpg';
import imgPlaceholder2 from '@/assets/img5.jpg';
import imgPlaceholder3 from '@/assets/img2.jpg';
import imgWhyChoose from '@/assets/img7.jpg';
import imgHighQuality from '@/assets/img3.jpg';
import imgMultilingual from '@/assets/img4.jpg';
import imgContact from '@/assets/footer-bg.webp';
import carIcon from '@/assets/car.png';
import mcIcon from "@/assets/motorcycle.png";
import mopedIcon from "@/assets/moped.png";
import bookIcon from "@/assets/open-book.png";
import { sanityClient } from "@/lib/sanity";
import { createImageUrlBuilder } from "@sanity/image-url";


const Index = () => {
  const builder = createImageUrlBuilder(sanityClient);
  const [sections, setSections] = useState<any[]>([]);
  const urlFor = (source: any) => builder.image(source);
  const getDriving = sections.find(s => s._type === "getDriving");
  const whyChoose = sections.find(s => s._type === "whyChoose");
  const highQuality = sections.find(s => s._type === "highQuality");
  const multilingual = sections.find(s => s._type === "multilingual");
  const contact = sections.find(s => s._type === "contactSection");


  useEffect(() => {
    sanityClient
      .fetch(`*[_type == "homepage"][0]{sections}`)
      .then((res) => {
        if (res?.sections) {
          setSections(res.sections);
        }
      });
  }, []);

  useEffect(() => {
    const observerOptions = {
      threshold: 0.1,
      rootMargin: '0px 0px -100px 0px',
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
        }
      });
    }, observerOptions);

    document.querySelectorAll('.scroll-fade-in').forEach((el) => {
      observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  return (
    <div className="min-h-screen">
      <Helmet>
        <title>AJA Trafikskola | Körkort, MC & Moped i Stockholm</title>
        <meta
          name="description"
          content="AJA Trafikskola erbjuder körlektioner, intensivkurser, handledarkurser och MC-utbildningar i Stockholm. Ta ditt körkort snabbt och tryggt."
        />
        <meta name="robots" content="index, follow" />
        <meta property="og:type" content="website" />
        <meta property="og:title" content="AJA Trafikskola | Körkort, MC & Moped i Stockholm" />
        <meta
          property="og:description"
          content="AJA Trafikskola erbjuder körlektioner, intensivkurser, handledarkurser och MC-utbildningar i Stockholm. Ta ditt körkort snabbt och tryggt."
        />
        <meta property="og:image" content="/logo.png" />
      </Helmet>
      <Navbar />
      <HeroSection />

      {/* 1️⃣ Get a Driving License */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-12 items-center scroll-fade-in">
            <div className="space-y-6">
              <h2 className="text-4xl font-bold">{getDriving?.title}</h2>
              <p className="text-lg text-muted-foreground">
                {getDriving?.description1}
              </p>
              <p className="text-lg text-muted-foreground">
                {getDriving?.description2}
              </p>
              <Link
                to="/om-oss"
                className="inline-block px-6 py-3 bg-primary text-white font-semibold rounded-sm hover:bg-primary/90 transition-all"
              >
                Om oss
              </Link>
            </div>
            <div className="grid grid-cols-3 gap-4">
              {/* <img src={imgPlaceholder1} alt="Körkort 1" className="rounded-lg shadow-lg" />
              <img src={imgPlaceholder2} alt="Körkort 2" className="rounded-lg shadow-lg" />
              <img src={imgPlaceholder3} alt="Körkort 3" className="rounded-lg shadow-lg" /> */}
              <img  src={
    getDriving?.images?.[0]
      ? urlFor(getDriving.images[0]).url()
      : imgPlaceholder1
  } />
              <img src={getDriving?.images?.[1] ? urlFor(getDriving.images[1]).url() : imgPlaceholder2} />
<img src={getDriving?.images?.[2] ? urlFor(getDriving.images[2]).url() : imgPlaceholder3} />
            </div>
          </div>
        </div>
      </section>

      {/* 2️⃣ Why Choose */}
      <section className="py-20 scroll-fade-in bg-muted/30">
        <div className="container mx-auto px-4 grid md:grid-cols-12 gap-12 items-center">

          {/* Left Image Collage */}
          <div className="md:col-span-6 relative flex items-center justify-center">
            {/* Decorative Blur Circle */}
            <div className="absolute -top-10 -left-10 w-40 h-40 bg-primary/20 rounded-full blur-3xl"></div>

            {/* Main Image Stack */}
            <div className="relative">
              <img
                src={
                  whyChoose?.image1
                    ? urlFor(whyChoose.image1).url()
                    : imgContact
                }
                alt="Handledarkurs Göteborg"
                className="rounded-2xl shadow-2xl w-80 md:w-[420px] h-[280px] object-cover transform rotate-[-3deg]"
              />
              <img
                src={
                  whyChoose?.image2
                    ? urlFor(whyChoose.image2).url()
                    : imgWhyChoose
                }
                alt="Körlektioner AJA"
                className="rounded-2xl shadow-2xl w-72 md:w-[380px] h-[260px] object-cover absolute top-24 -right-12 transform rotate-[4deg] border-4 border-white"
              />

              {/* Success Card (Floating Animation) */}
              <div className="absolute bottom-4 left-4 bg-white/70 backdrop-blur-md border border-white/30 shadow-lg rounded-xl p-5 w-64 animate-float-slow">
                <div className="flex items-center gap-1 text-yellow-400">
                  ★ ★ ★ ★ ☆
                </div>
                <h3 className="text-lg font-semibold text-primary mt-1">{whyChoose?.satisfactionText}</h3>
                <p className="text-sm text-gray-700 leading-snug">

                </p>
              </div>
            </div>
          </div>

          {/* Right Text Content */}
          <div className="md:col-span-6 space-y-6 mt-20 sm:mt-96 md:mt-0">
            <h2 className="text-3xl sm:text-4xl font-bold leading-tight">
              {whyChoose?.title}
            </h2>

            <p className="text-base sm:text-lg text-muted-foreground">
              {whyChoose?.description1}
            </p>

            <p className="text-base sm:text-lg text-muted-foreground">
              {whyChoose?.description2}
            </p>

            <Link
              to="/kontakt"
              className="inline-block px-6 py-3 bg-primary text-white font-semibold rounded-md shadow-md hover:scale-105 hover:bg-primary/90 transition-all"
            >
              Kontakta oss
            </Link>
          </div>
        </div>
      </section>

      {/* 3️⃣ High Quality Training */}
      <section className="relative py-20 bg-background scroll-fade-in overflow-hidden">
        {/* Decorative shapes */}
        <div className="absolute top-0 left-0 w-64 h-64 bg-primary/20 rounded-full -translate-x-1/2 -translate-y-1/2"></div>
        <div className="absolute bottom-0 right-0 w-72 h-72 bg-primary/10 rounded-full translate-x-1/3 translate-y-1/3"></div>

        <div className="container mx-auto px-4 relative z-10">
          <div className="flex flex-col md:flex-row items-center md:items-start gap-12">

            {/* Left Content */}
            <div className="md:w-1/2 space-y-8">
              <h2 className="text-4xl md:text-5xl font-bold max-w-lg">
               {highQuality?.title}
              </h2>
              <p className="text-lg text-muted-foreground max-w-md">
               {highQuality?.description}
              </p>

              {/* Updated clickable symbol cards */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">

                {/* Car */}
                <Link
                  to="/4-hjul"
                  className="flex flex-col items-center p-4 bg-white dark:bg-card rounded-xl shadow-2xl 
                       transform hover:-translate-y-2 hover:scale-105 transition-all duration-300 cursor-pointer"
                >
                  <img src={carIcon} alt="Bil icon" className="w-14 h-14 mb-2" />
                  <h3 className="text-lg font-semibold">Bil/Taxi</h3>
                </Link>

                {/* Motorcycle */}
                <Link
                  to="/2-hjul"
                  className="flex flex-col items-center p-4 bg-white dark:bg-card rounded-xl shadow-2xl 
                       transform hover:-translate-y-2 hover:scale-105 transition-all duration-300 cursor-pointer"
                >
                  <img src={mcIcon} alt="MC icon" className="w-14 h-14 mb-2" />
                  <h3 className="text-lg font-semibold">Motorcykel/Moped</h3>
                </Link>
                {/* Updated Button */}
                <Link
                  to="/kurser"
                  className="flex flex-col items-center p-4 bg-white dark:bg-card rounded-xl shadow-2xl
             transform hover:-translate-y-2 hover:scale-105 transition-all duration-300 cursor-pointer
             w-full max-w-[220px] mx-auto"
                >
                  <img src={bookIcon} alt="Kurser icon" className="w-14 h-14 mb-2" />
                  <h3 className="text-lg font-semibold">Kurser</h3>
                </Link>
              </div>
            </div>
            {/* Right Image */}
            <div className="md:w-1/2 relative">
              <img
             src={
  highQuality?.image
    ? urlFor(highQuality.image).url()
    : imgHighQuality
}
                alt="Kvalitetsträning"
                className="rounded-3xl shadow-2xl w-full object-cover"
              />

              {/* Slanted Overlay Card */}
              <div className="absolute -bottom-12 left-1/2 transform -translate-x-1/2 rotate-3 
                        bg-primary text-white p-6 rounded-xl shadow-2xl flex flex-col 
                        items-center space-y-2 w-64 hover:scale-105 transition-all duration-300">
                <h3 className="text-lg font-semibold">{highQuality?.priceCardTitle}</h3>
                <p className="text-sm text-center">
                 {highQuality?.priceCardDescription}
                </p>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 4️⃣ Customized Multilingual Training */}
      <section className="relative py-20 overflow-hidden scroll-fade-in bg-background">
        <div className="container mx-auto px-4 grid md:grid-cols-12 gap-12 items-center relative">

          {/* Left Image with gradient streaks, floating badges & bubbles */}
          <div className="relative md:col-span-7 flex justify-center items-center">

            {/* Curved Gradient Streaks */}
            <div className="absolute w-80 h-80 bg-gradient-to-tr from-primary/40 via-pink-300/20 to-transparent rounded-full filter blur-3xl animate-streak-slow -top-12 -left-16"></div>
            <div className="absolute w-72 h-72 bg-gradient-to-tr from-blue-400/30 via-purple-400/20 to-transparent rounded-full filter blur-3xl animate-streak-slow delay-1000 top-20 right-0"></div>

            {/* Main Image */}
            <img
              src={
  multilingual?.image
    ? urlFor(multilingual.image).url()
    : imgMultilingual
}
              alt="Flerspråkig träning"
              className="rounded-2xl shadow-2xl w-full md:max-w-md object-cover animate-float-smooth z-10 transition-transform duration-500 hover:scale-105"
            />

            {/* Floating Languages Badge */}
            <div className="absolute bottom-6 left-6 bg-gradient-to-r from-primary/80 to-primary/50 text-white rounded-xl px-5 py-3 flex items-center gap-4 shadow-2xl backdrop-blur-sm transition-transform duration-500 hover:scale-110 animate-float-slow z-20">
              <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
              </svg>
              <div>
                <p className="text-sm font-semibold">{multilingual?.badgeTitle}</p>
                <p className="text-xs">{multilingual?.languages?.join(", ")}</p>
              </div>
            </div>

            {/* Floating Bubbles */}
            <div className="absolute w-6 h-6 bg-primary rounded-full opacity-70 top-10 left-10 animate-bounce-slow z-0"></div>
            <div className="absolute w-4 h-4 bg-yellow-400 rounded-full opacity-50 top-32 left-20 animate-bounce-slow delay-1000 z-0"></div>
            <div className="absolute w-5 h-5 bg-red-400 rounded-full opacity-60 top-20 right-20 animate-bounce-slow delay-2000 z-0"></div>
            <div className="absolute w-3 h-3 bg-blue-400 rounded-full opacity-50 top-40 right-10 animate-bounce-slow delay-3000 z-0"></div>
          </div>

          {/* Right Text Panel with glassmorphic effect */}
          <div className="md:col-span-5 bg-black/60 backdrop-blur-md p-8 rounded-2xl flex flex-col justify-center space-y-5 shadow-2xl hover:shadow-3xl transition-shadow duration-300">
            <h2 className="text-3xl md:text-4xl font-bold leading-tight text-white">
            {multilingual?.title}
            </h2>
            <p className="text-base md:text-lg leading-relaxed text-white/90">
            {multilingual?.description1}
            </p>
            <p className="text-base md:text-lg leading-relaxed text-white/90">
             {multilingual?.description2}
            </p>
          </div>

        </div>
      </section>

      {/* 5️⃣ Contact / Book Test Lesson */}
      <section className="relative py-24 bg-primary text-white overflow-hidden">
        {/* Decorative floating gradient orbs */}
        <div className="absolute top-0 left-1/4 w-40 h-40 bg-gradient-to-tr from-yellow-400/30 via-pink-400/20 to-purple-400/10 rounded-full filter blur-3xl animate-orb float-delay-0"></div>
        <div className="absolute bottom-10 right-1/4 w-32 h-32 bg-gradient-to-br from-blue-400/20 via-indigo-400/10 to-transparent rounded-full filter blur-3xl animate-orb float-delay-1"></div>
        <div className="absolute top-1/3 right-10 w-24 h-24 bg-gradient-to-tl from-green-400/20 via-teal-400/10 to-transparent rounded-full filter blur-3xl animate-orb float-delay-2"></div>

        <div className="container mx-auto px-4 text-center relative z-10 space-y-10">
          {/* Heading & Subtext */}
          <h2 className="text-4xl md:text-5xl font-bold max-w-4xl mx-auto animate-fade-up">
          {contact?.title}
          </h2>
          <p className="text-lg max-w-2xl mx-auto animate-fade-up delay-200 leading-relaxed text-white/90">
           {contact?.description}
                     </p>

          {/* Call-to-action Button */}
          <Link
            to="https://www.trafikskolaonline.se/sv/skola/aja/ehandel/"
            className="inline-block px-10 py-4 bg-white text-primary rounded-xl font-semibold shadow-lg hover:scale-105 hover:bg-white/90 transition-all duration-300 animate-fade-up delay-400"
          >
            Boka din lektion idag!
          </Link>

          {/* Opening Hours Card */}
          {/* <div className="mt-12 bg-white/20 backdrop-blur-md rounded-3xl p-10 max-w-xl mx-auto shadow-2xl transform hover:scale-105 transition-all duration-300 animate-fade-up delay-600">
      <h3 className="text-xl font-semibold mb-4 text-white">Ändrade öppettider under veckorna 30–32</h3>
      <p>Måndag–Torsdag: Receptionen är öppen till 16:30</p>
      <p>Fredagar: Öppet till 13:00</p>
    </div> */}

          {/* Image with floating badge */}
          <div className="mt-12 max-w-3xl mx-auto relative animate-fade-up delay-800">
            <img
             src={
  contact?.image
    ? urlFor(contact.image).url()
    : imgContact
}
              alt="Kontakta AJA"
              className="rounded-3xl shadow-2xl w-full object-cover hover:scale-105 transition-transform duration-500 z-10"
            />
            <div className="absolute -top-6 right-6 bg-yellow-400 text-primary font-semibold px-4 py-2 rounded-full shadow-xl animate-float-slow z-20">
              Nyhet!
            </div>

            {/* Floating Bubbles around image */}
            <div className="absolute w-4 h-4 bg-white/60 rounded-full top-10 left-10 animate-bubble float-delay-0"></div>
            <div className="absolute w-3 h-3 bg-yellow-300/50 rounded-full bottom-12 right-14 animate-bubble float-delay-1"></div>
            <div className="absolute w-5 h-5 bg-pink-400/40 rounded-full top-20 right-24 animate-bubble float-delay-2"></div>
          </div>
        </div>
      </section>
      <Footer />
    </div>
  );
};

export default Index;