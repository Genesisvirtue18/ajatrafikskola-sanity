import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Helmet } from "react-helmet-async";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import heroVideo from "@/assets/moped.mp4";
import { useEffect } from "react";
import { useState } from "react";
import { sanityClient } from "@/lib/sanity";

// REAL ICONS
import carIcon from "@/assets/car.png";
import bikeIcon from "@/assets/motorcycle.png";
import usersIcon from "@/assets/open-book.png";
import mopedIcon from "@/assets/moped.png";



const getCourseIcon = (iconType: string) => {
  switch (iconType) {
    case "book":
      return usersIcon;

    case "bike":
      return bikeIcon;

    case "moped":
      return mopedIcon;

    default:
      return carIcon;
  }
};

export default function Courses() {
  const navigate = useNavigate();
  const [data, setData] = useState<any>(null);

  useEffect(() => {
    sanityClient
      .fetch(`*[_type == "courses"][0]{
      bannerTitle,
      bannerSubtitle,
      "videoUrl": bannerVideo.asset->url,
      sectionTitle,
      sectionSubtitle,
      courses
    }`)
      .then(setData);
  }, []);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const courses = [
    // FIRST LINE
    {
      id: 1,
      title: "Kombokurs bil",
      price: "2500 kr",
      duration: "7 timmar",
      oldPrice: null,
      icon: carIcon,
      description:
        "Kombinerad riskutbildning del 1 och 2 för bil. Både teori och halkkörning utförs som en komplett utbildning.",
      readMorePath: "/kurser/risktva-bil",
      bookingLinks: [
        {
          label: "Boka",
          url: "https://www.trafikskolaonline.se/sv/skola/aja/kurser/?courseTypeFilter=KOMBOKURS+BIL",
        },
      ],
    },
    {
      id: 2,
      title: "Risk 1 Bil",
      price: "600 kr",
      duration: "3.5 timmar",
      oldPrice: null,
      icon: carIcon,
      description:
        "Riskutbildning del 1 för bil är ett obligatoriskt moment som ger dig kunskap om riskbeteenden, alkohol, droger och trötthet.",
      readMorePath: "/kurser/riskettan",
      bookingLinks: [
        {
          label: "Boka",
          url: "https://www.trafikskolaonline.se/sv/skola/aja/kurser/?courseFilter=RISK+1+BIL",
        },
      ],
    },
    {
      id: 3,
      title: "Handledarkurs",
      price: "399 kr/deltagare",
      duration: "3.5 timmar",
      oldPrice: null,
      icon: usersIcon,
      description:
        "Handledarkursen är obligatorisk för dig som vill övningsköra privat. Lär dig regler, säkerhet och ansvar.",
      readMorePath: "/kurser/handledarkurs",
      bookingLinks: [
        {
          label: "Boka",
          url: "https://www.trafikskolaonline.se/sv/skola/aja/kurser/?courseFilter=HANDLEDARKURS",
        },
      ],
    },

    // SECOND LINE
    {
      id: 4,
      title: "Kombokurs MC",
      price: "3999 kr",
      duration: "9,5 timmar",
      oldPrice: null,
      icon: bikeIcon,
      description:
        "Kombinerad riskutbildning del 1 och 2 för MC. både teori och praktisk körning utförs som en komplett utbildning",
      readMorePath: "/kurser/kombokurs-mc",
      bookingLinks: [
        {
          label: "Boka",
          url: "https://www.trafikskolaonline.se/sv/skola/aja/kurser/?courseTypeFilter=KOMBOKURS+MC+%28MELLAN%2FTUNG%29",
        },
      ],
    },
    {
      id: 5,
      title: "Risk 1 MC",
      price: "699 kr",
      duration: "3.5 timmar",
      oldPrice: "900 kr",
      icon: bikeIcon,
      description:
        "Riskutbildning del 1 för MC fokuserar på riskbedömning, beteende och säkerhet för motorcyklister.",
      readMorePath: "/kurser/riskettan-mc",
      bookingLinks: [
        {
          label: "Boka",
          url: "https://www.trafikskolaonline.se/sv/skola/aja/kurser/?courseFilter=RISK+1+MC",
        },
      ],
    },
    {
      id: 6,
      title: "Risk 2 MC",
      price: "3300 kr",
      duration: "4.5 timmar",
      oldPrice: null,
      icon: bikeIcon,
      description:
        "Riskutbildning del 2 för MC är den praktiska delen där du tränar på olika väglag och riskfyllda situationer.",
      readMorePath: "/kurser/risktva-mc",
      bookingLinks: [
        {
          label: "Boka",
          url: "https://www.trafikskolaonline.se/sv/skola/aja/kurser/?courseTypeFilter=RISK+2+MC+%28MELLAN%2FTUNG%29",
        },
      ],
    },

    // THIRD LINE
    {
      id: 7,
      title: "Mopedkurs",
      price: "Info kommer snart!",
      oldPrice: null,
      icon: mopedIcon,
      description:
        "Mopedkursen är den obligatoriska utbildningen för AM-körkort. Utbildningen innehåller både teori och praktisk körning och fokuserar på trafikregler, säkerhet, riskmedvetenhet och ansvarsfullt körsätt i trafiken.",
      readMorePath: "/korkort/moped",
      bookingLinks: [],
    },
  ];

  if (!data) return null;
  return (
    <>
      <Helmet>
        <title>Körkortskurser i Stockholm | Riskettan & Handledarkurs</title>
        <meta
          name="description"
          content="Boka riskettan, riskutbildning, handledarkurs och andra körkortskurser hos AJA Trafikskola i Stockholm."
        />
        <meta name="robots" content="index, follow" />
        <meta property="og:type" content="website" />
        <meta property="og:title" content="Körkortskurser i Stockholm | Riskettan & Handledarkurs" />
        <meta
          property="og:description"
          content="Boka riskettan, riskutbildning, handledarkurs och andra körkortskurser hos AJA Trafikskola i Stockholm."
        />
        <meta property="og:image" content="/logo.png" />
      </Helmet>
      <Navbar />

      {/* HERO VIDEO */}
      <section className="relative w-full h-[40vh] md:h-[65vh] overflow-hidden">
        <video
          src={data?.videoUrl || heroVideo}
          autoPlay
          loop
          muted
          playsInline
          className="absolute inset-0 w-full h-full object-cover"
        />

        <div className="absolute inset-0 bg-black/40 backdrop-blur-[1px]" />

        <div className="relative z-10 h-full flex flex-col justify-center items-center text-center px-4">
          <h1 className="text-white text-4xl md:text-6xl font-bold drop-shadow-xl">
            {data?.bannerTitle}
          </h1>
          <p className="text-gray-200 text-lg md:text-xl mt-4 max-w-2xl">
            {data?.bannerSubtitle}
          </p>
        </div>
      </section>

      {/* COURSES */}
      <section className="min-h-screen bg-white text-gray-900 py-20 px-6 md:px-20">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-[#68b143] mb-3">
            {data?.sectionTitle}
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            {data?.sectionSubtitle}
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10 max-w-7xl mx-auto">
          {data?.courses?.map((course: any, index: number) => (
            <motion.div
              key={index}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.98 }}
              className="bg-white border border-gray-200 rounded-2xl shadow-md p-8 flex flex-col items-center text-center hover:shadow-xl transition-all duration-300"
            >
              {/* ICON (keep static logic) */}
              <img
  src={getCourseIcon(course.iconType)}
  className="w-14 h-14 object-contain mb-4"
/>

              <h2 className="text-xl font-semibold mb-2">
                {course.title}
              </h2>

              {course.oldPrice && (
                <p className="text-gray-400 line-through text-sm">
                  {course.oldPrice}
                </p>
              )}

              <p className="text-2xl font-bold text-[#68b143]">
                {course.price}
              </p>

              <p className="text-sm text-gray-500 mb-3">
                {course.duration}
              </p>

              <p className="text-gray-600 mb-6">
                {course.description}
              </p>

              <div className="flex flex-wrap gap-2 mt-auto justify-center">

                {/* READ MORE */}
                <button
                  onClick={() => {
                    if (course.button1Link.startsWith('http')) {
                      window.open(course.button1Link, '_blank');
                    } else {
                      navigate(course.button1Link);
                    }
                  }} className="px-4 py-2 border border-[#68b143] text-[#68b143] text-sm font-medium rounded-lg hover:bg-[#68b143] hover:text-white transition-all"
                >
                  {course.button1Text}
                </button>

                {/* BOOK */}
                {course.button2Link && course.button2Text && (
                  <button
                    onClick={() => {
                      if (course.button2Link.startsWith("http")) {
                        window.open(course.button2Link, "_blank");
                      } else {
                        navigate(course.button2Link);
                      }
                    }}
                    className="px-4 py-2 bg-black text-white text-sm font-medium rounded-lg hover:scale-105 transition-all"
                  >
                    {course.button2Text}
                  </button>
                )}

              </div>
            </motion.div>
          ))}
        </div>
      </section>
      <Footer />
    </>
  );
}