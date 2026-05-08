import { useNavigate } from "react-router-dom";
import { motion, useScroll, useTransform } from "framer-motion";
import { Bike } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import heroVideo from "@/assets/two.mp4"; // <-- VIDEO IMPORT
import { useEffect } from "react";
import mcIcon from "@/assets/motorcycle.png";      // custom motorcycle icon
import mopedIcon from "@/assets/moped.png"; // custom moped icon
import { useState } from "react";
import { sanityClient } from "@/lib/sanity";


export default function TwoWheels() {
  const navigate = useNavigate();
  const { scrollY } = useScroll();
  const [data, setData] = useState<any>(null);

  useEffect(() => {
    sanityClient
      .fetch(`*[_type == "twoWheel"][0]{
      bannerTitle,
      bannerSubtitle,
      "videoUrl": bannerVideo.asset->url,
      cards
    }`)
      .then(setData);
  }, []);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // ðŸŒ¿ Parallax layers for bubbles
  const ySlow = useTransform(scrollY, [0, 500], [0, -40]);
  const yMedium = useTransform(scrollY, [0, 500], [0, -80]);
  const yFast = useTransform(scrollY, [0, 500], [0, -120]);

  const options = [
    {
      id: 1,
      title: "Motorcykel (A1, A2, A)",
      path: "/korkort/mc",
      knowMorePath: "/korkort/mc",
      pricesPath: "/priser/mc",
      icon: <img src={mcIcon} alt="MC icon" className="w-12 h-12 object-contain" />,
      description:
        "Ta ditt MC-körkort med oss! Lär dig köra säkert, hantera olika väglag och utveckla din körteknik med hjälp av våra erfarna MC-lärare.",
    },
    {
      id: 2,
      title: "Moped (AM)",
      path: "/korkort/moped",
      knowMorePath: "/korkort/moped",
      pricesPath: "/priser/moped",
      icon: <img src={mopedIcon} alt="Moped icon" className="w-12 h-12 object-contain" />,
      description:
        "Vår mopedutbildning hjälper dig att snabbt och säkert få ditt AM-körkort. Perfekt för unga förare som vill börja köra självständigt i trafiken.",
    },
  ];

  if (!data) return null;

  return (
    <>
      <Navbar />

      {/* ðŸŒŸ VIDEO HERO SECTION */}
      <section className="relative w-full h-[60vh] md:h-[70vh] overflow-hidden">

        {/* Background Video */}
        <video
          src={data?.videoUrl || heroVideo}
          autoPlay
          loop
          muted
          playsInline
          className="absolute inset-0 w-full h-full object-cover"
        />

        {/* Dark Overlay */}
        <div className="absolute inset-0 bg-black/40 backdrop-blur-[1px]"></div>

        {/* Heading Content */}
        <div className="relative z-10 h-full flex flex-col justify-center items-center text-center px-4">
          <h1 className="text-white text-4xl md:text-6xl font-bold drop-shadow-xl">
            {data?.bannerTitle}
          </h1>
          <p className="text-gray-200 text-lg md:text-xl mt-4 max-w-2xl">
            {data?.bannerSubtitle}
          </p>
        </div>
      </section>

      {/* ðŸŒ¿ MAIN CONTENT */}
      <section className="relative min-h-screen bg-gradient-to-b from-white via-gray-50 to-white text-gray-900 py-24 px-8 md:px-20 overflow-hidden">

        {/* ðŸŒ¸ Animated Floating & Glowing Bubbles */}
        <div className="absolute inset-0 overflow-hidden z-0">
          {/* Slow Bubbles */}
          <motion.div style={{ y: ySlow }}>
            {[...Array(5)].map((_, i) => (
              <motion.div
                key={`slow-${i}`}
                className="absolute rounded-full bg-[#68b143]/20 blur-2xl"
                style={{
                  width: `${Math.random() * 160 + 80}px`,
                  height: `${Math.random() * 160 + 80}px`,
                  top: `${Math.random() * 100}%`,
                  left: `${Math.random() * 100}%`,
                }}
                animate={{
                  y: [0, -60, 0],
                  opacity: [0.5, 0.8, 0.5],
                }}
                transition={{
                  duration: Math.random() * 8 + 8,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
                whileHover={{
                  scale: 1.2,
                  boxShadow: "0 0 25px 10px rgba(104,177,67,0.3)",
                }}
              />
            ))}
          </motion.div>

          {/* Medium Bubbles */}
          <motion.div style={{ y: yMedium }}>
            {[...Array(6)].map((_, i) => (
              <motion.div
                key={`medium-${i}`}
                className="absolute rounded-full bg-[#68b143]/30 blur-xl"
                style={{
                  width: `${Math.random() * 100 + 50}px`,
                  height: `${Math.random() * 100 + 50}px`,
                  top: `${Math.random() * 100}%`,
                  left: `${Math.random() * 100}%`,
                }}
                animate={{
                  y: [0, -80, 0],
                  opacity: [0.4, 0.9, 0.4],
                }}
                transition={{
                  duration: Math.random() * 6 + 6,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
                whileHover={{
                  scale: 1.3,
                  boxShadow: "0 0 25px 12px rgba(104,177,67,0.4)",
                }}
              />
            ))}
          </motion.div>

          {/* Fast Bubbles */}
          <motion.div style={{ y: yFast }}>
            {[...Array(10)].map((_, i) => (
              <motion.div
                key={`fast-${i}`}
                className="absolute rounded-full bg-[#68b143]/40 blur-lg"
                style={{
                  width: `${Math.random() * 60 + 20}px`,
                  height: `${Math.random() * 60 + 20}px`,
                  top: `${Math.random() * 100}%`,
                  left: `${Math.random() * 100}%`,
                }}
                animate={{
                  y: [0, -100, 0],
                  opacity: [0.6, 0.9, 0.6],
                }}
                transition={{
                  duration: Math.random() * 5 + 4,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
                whileHover={{
                  scale: 1.4,
                  boxShadow: "0 0 35px 15px rgba(104,177,67,0.5)",
                }}
              />
            ))}
          </motion.div>
        </div>

        {/* ðŸï¸ Course Cards */}
        <div className="relative grid grid-cols-1 sm:grid-cols-2 gap-10 max-w-6xl mx-auto z-10">
          {data?.cards?.map((card: any, index: number) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.6,
                delay: index * 0.2,
                ease: "easeOut",
              }}
              viewport={{ once: true }}
              className="bg-white/90 backdrop-blur-sm border border-gray-100 rounded-2xl shadow-xl hover:shadow-2xl p-8 flex flex-col items-center text-center transition-all duration-300 hover:-translate-y-1"
            >
              {/* ICON STATIC */}
              <div className="text-[#68b143] mb-4">
                {index === 0 ? (
                  <img src={mcIcon} className="w-12 h-12" />
                ) : (
                  <img src={mopedIcon} className="w-12 h-12" />
                )}
              </div>

              <h2 className="text-2xl font-semibold mb-3 text-gray-900">
                {card.title}
              </h2>

              <p className="text-gray-600 mb-8 leading-relaxed">
                {card.description}
              </p>

              <div className="flex flex-wrap justify-center gap-3">
                <button
                  onClick={() => {
                    if (card.button1Link?.startsWith("http")) {
                      window.open(card.button1Link, "_blank");
                    } else {
                      navigate(card.button1Link);
                    }
                  }}
                  className="bg-white text-[#68b143] border border-[#68b143] px-5 py-2 rounded-lg text-sm shadow-sm hover:scale-105 hover:bg-[#68b143] hover:text-white transition-all font-medium"
                >
                  {card.button1Text}
                </button>

                <button
                  onClick={() => {
                    if (card.button2Link?.startsWith("http")) {
                      window.open(card.button2Link, "_blank");
                    } else {
                      navigate(card.button2Link);
                    }
                  }}
                  className="bg-[#000] text-white px-5 py-2 rounded-lg text-sm shadow-sm hover:scale-105 hover:bg-[#7EC15C] transition-all font-medium"
                >
                  {card.button2Text}
                </button>
              </div>
            </motion.div>
          ))}
        </div>

        {/* ðŸŒ Why Choose Section */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          viewport={{ once: true }}
          className="max-w-4xl mx-auto mt-24 text-center text-gray-700 leading-relaxed relative z-10"
        >
          <h2 className="text-3xl font-semibold text-[#68b143] mb-6">
            Varför välja AJA Trafikskola?
          </h2>
          <p className="text-gray-600 text-lg">
            Med våra MC- och mopedutbildningar får du professionell handledning, moderna fordon
            och lektioner anpassade efter dina mål. Vi hjälper dig utveckla din körteknik och
            förstå riskerna i trafiken – för en säker och rolig körupplevelse.
          </p>
        </motion.div>
      </section>

      <Footer />
    </>
  );
}




