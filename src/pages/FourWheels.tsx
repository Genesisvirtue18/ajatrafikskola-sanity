import { useNavigate } from "react-router-dom";
import { motion, useScroll, useTransform } from "framer-motion";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import heroImg from "@/assets/im.jpg";
import { useEffect, useState } from "react";
import { sanityClient } from "@/lib/sanity";
import { createImageUrlBuilder } from "@sanity/image-url";

// PNG ICONS
import carIcon from "@/assets/car.png";
import taxiIcon from "@/assets/car.png";

export default function FourWheels() {
  const navigate = useNavigate();
  const { scrollY } = useScroll();
  const builder = createImageUrlBuilder(sanityClient);
  const urlFor = (source: any) => builder.image(source);

  const [data, setData] = useState<any>(null);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const ySlow = useTransform(scrollY, [0, 500], [0, -40]);
  const yMedium = useTransform(scrollY, [0, 500], [0, -80]);
  const yFast = useTransform(scrollY, [0, 500], [0, -120]);

  useEffect(() => {
    sanityClient
      .fetch(`*[_type == "fourWheel"][0]`)
      .then(setData);
  }, []);

  // const options = [
  //   {
  //     id: 1,
  //     title: "Bilutbildning",
  //     path: "/korkort/bil",
  //     knowMorePath: "/korkort/bil",
  //     pricesPath: "/priser/bil",
  //     icon: carIcon,
  //     description:
  //       "Vår bilutbildning är skapad för dig som vill ta körkort tryggt, säkert och effektivt. Med erfarna lärare och personligt upplägg hjälper vi dig hela vägen till ditt körkort.",
  //   },
  //   {
  //     id: 2,
  //     title: "Taxiförarutbildning",
  //     path: "/korkort/taxi",
  //     knowMorePath: "/korkort/taxi",
  //     pricesPath: "/priser/taxi",
  //     icon: taxiIcon,
  //     description:
  //       "Drömmer du om att arbeta som taxiförare? Vår utbildning ger dig alla kunskaper du behöver – från trafiksäkerhet och lagstiftning till service och yrkesmässig körning.",
  //   },
  // ];

  if (!data) return null;

  return (
    <>
      <Navbar />

      {/* HERO */}
      <section className="relative w-full h-[45vh] md:h-[60vh] overflow-hidden">
        <img
          src={
            data?.bannerImage
              ? urlFor(data.bannerImage).url()
              : heroImg
          }
          alt="4 Wheels Hero"
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

      {/* MAIN */}
      <section className="relative min-h-screen bg-gradient-to-b from-white via-gray-50 to-white text-gray-900 py-24 px-8 md:px-20 overflow-hidden">

        {/* (your bubble animations stay exactly same) */}

        {/* COURSE CARDS */}
        <div className="relative grid grid-cols-1 sm:grid-cols-2 gap-10 max-w-6xl mx-auto z-10">
         {data?.cards?.map((card: any, index: number) => (
  <motion.div
    key={index}
    initial={{ opacity: 0, y: 40 }}
    whileInView={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.6, delay: index * 0.2 }}
    viewport={{ once: true }}
    className="bg-white/90 backdrop-blur-sm border border-gray-100 rounded-2xl shadow-xl hover:shadow-2xl p-8 flex flex-col items-center text-center transition-all duration-300 hover:-translate-y-1"
  >
    {/* ICON (keep static) */}
    <img
      src={index === 0 ? carIcon : taxiIcon}
      className="w-14 h-14 mb-4"
    />

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

        {/* WHY CHOOSE */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="max-w-4xl mx-auto mt-24 text-center text-gray-700 leading-relaxed relative z-10"
        >
          <h2 className="text-3xl font-semibold text-[#68b143] mb-6">
            Varför välja AJA Trafikskola?
          </h2>
          <p className="text-gray-600 text-lg">
            Hos oss får du köra i moderna bilar: manuell växellåda i vår Audi Q2 och
            automatväxlat i våra Volvo V60 och Volvo XC40.
          </p>
        </motion.div>
      </section>

      <Footer />
    </>
  );
}




