import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import heroAbout from "@/assets/car1.jpg";
import { X } from "lucide-react";
import { sanityClient } from "@/lib/sanity";
import { createImageUrlBuilder } from "@sanity/image-url";

/* ---- IMAGES (UNCHANGED) ---- */
// Car
import car1 from "@/assets/gallery/car1.jpg";
import car2 from "@/assets/gallery/car2.jpg";
import car3 from "@/assets/gallery/car3.jpg";
import car4 from "@/assets/gallery/car4.jpg";
import car5 from "@/assets/gallery/car5.jpg";
import car6 from "@/assets/gallery/car6.jpg";
import car7 from "@/assets/gallery/car7.jpg";
import car8 from "@/assets/gallery/car8.jpg";
import car9 from "@/assets/gallery/car9.jpg";
import car10 from "@/assets/gallery/car10.jpg";
import car11 from "@/assets/gallery/car11.jpg";
import car12 from "@/assets/gallery/car12.jpg";
import car13 from "@/assets/gallery/car13.jpg";
import car14 from "@/assets/gallery/car14.jpg";
import car15 from "@/assets/gallery/car15.jpg";
import car16 from "@/assets/gallery/car16.jpg";
import car17 from "@/assets/gallery/car17.jpg";

// Motorcycle
import mc1 from "@/assets/gallery/mc1.jpg";
import mc2 from "@/assets/gallery/mc2.jpg";
import mc3 from "@/assets/gallery/mc3.jpg";
import mc4 from "@/assets/gallery/mc4.jpg";
import mc5 from "@/assets/gallery/mc5.jpg";
import mc6 from "@/assets/gallery/mc6.jpg";
import mc7 from "@/assets/gallery/mc7.jpg";
import mc8 from "@/assets/gallery/mc8.jpg";
import mc9 from "@/assets/gallery/mc9.jpg";
import mc10 from "@/assets/gallery/mc10.jpg";
import mc11 from "@/assets/gallery/mc11.jpg";
import mc12 from "@/assets/gallery/mc12.jpg";
import mc13 from "@/assets/gallery/mc13.jpg";
import mc14 from "@/assets/gallery/mc14.jpg";
import mc15 from "@/assets/gallery/mc15.jpg";
import mc16 from "@/assets/gallery/mc16.jpg";
import mc17 from "@/assets/gallery/mc17.jpg";
import mc18 from "@/assets/gallery/mc18.jpg";
import mc19 from "@/assets/gallery/mc19.jpg";
import mc20 from "@/assets/gallery/mc20.jpg";
import mc21 from "@/assets/gallery/mc21.jpg";
import mc22 from "@/assets/gallery/mc22.jpg";
import mc23 from "@/assets/gallery/mc23.jpg";
import mc24 from "@/assets/gallery/mc24.jpg";
import mc25 from "@/assets/gallery/mc25.jpg";
import mc26 from "@/assets/gallery/mc26.jpg";
import mc27 from "@/assets/gallery/mc27.jpg";
import mc28 from "@/assets/gallery/mc28.jpg";

// Moped
import moped1 from "@/assets/gallery/moped1.jpg";
import moped2 from "@/assets/gallery/moped2.jpg";
import moped3 from "@/assets/gallery/moped3.jpg";
import moped4 from "@/assets/gallery/moped4.jpg";
import moped5 from "@/assets/gallery/moped5.jpg";
import moped6 from "@/assets/gallery/moped6.jpg";

// Taxi
import taxi1 from "@/assets/gallery/taxi1.jpg";
import taxi2 from "@/assets/gallery/taxi2.jpg";

/* ---- COLLECTION ---- */
// const allImages = [
//   ...[car1,car2,car3,car4,car5,car6,car7,car8,car9,car10,car11,car12,car13,car14,car15,car16,car17].map(src=>({src,category:"Car"})),
//   ...[mc1,mc2,mc3,mc4,mc5,mc6,mc7,mc8,mc9,mc10,mc11,mc12,mc13,mc14,mc15,mc16,mc17,mc18,mc19,mc20,mc21,mc22,mc23,mc24,mc25,mc26,mc27,mc28].map(src=>({src,category:"Motorcycle"})),
//   ...[moped1,moped2,moped3,moped4,moped5,moped6].map(src=>({src,category:"Moped"})),
//   ...[taxi1,taxi2].map(src=>({src,category:"Taxi"})),
// ];



// const filters = [
//   { label: "ALLA", category: "All" },
//   { label: "BIL", category: "Car" },
//   { label: "MOTORCYKEL", category: "Motorcycle" },
//   { label: "MOPED", category: "Moped" },
// ];

const filters = [
  { label: "ALLA", category: "All" },
  { label: "BIL", category: "bil" },
  { label: "MOTORCYKEL", category: "motorcycle" },
  { label: "MOPED", category: "moped" },
];

const Gallery = () => {
  // const [activeFilter, setActiveFilter] = useState("All");
  // const [selectedIndex, setSelectedIndex] = useState(null);
  const builder = createImageUrlBuilder(sanityClient);
const urlFor = (source: any) => builder.image(source);
const [data, setData] = useState<any>(null);
const [activeFilter, setActiveFilter] = useState("All");
const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
const allImages = data?.images || [];

useEffect(() => {
  sanityClient
    .fetch(`*[_type == "gallery"][0]{
      title,
      subtitle,
      bannerImage,
      images[]{
        image,
        category
      }
    }`)
    .then(setData);
}, []);

  // const filteredImages =
  //   activeFilter === "All"
  //     ? allImages
  //     : allImages.filter((img) => img.category === activeFilter);

  const filteredImages =
  activeFilter === "All"
    ? allImages
    : allImages.filter(
        (img: any) =>
          img.category?.toLowerCase() === activeFilter.toLowerCase()
      );

  /* Keyboard */
  useEffect(() => {
    const handleKey = (e) => {
      if (e.key === "Escape") setSelectedIndex(null);
      if (e.key === "ArrowRight" && selectedIndex !== null)
        setSelectedIndex((prev) => (prev + 1) % filteredImages.length);
      if (e.key === "ArrowLeft" && selectedIndex !== null)
        setSelectedIndex(
          (prev) =>
            (prev - 1 + filteredImages.length) % filteredImages.length
        );
    };

    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [selectedIndex, filteredImages.length]);

  if (!data) return null;
  return (
    <>
      <Navbar />

      {/* HERO */}
      <section
        className="relative h-[40vh] md:h-[50vh] flex items-center justify-center bg-cover bg-center"
      style={{
  backgroundImage: data?.bannerImage
    ? `url(${urlFor(data.bannerImage).url()})`
    : `url(${heroAbout})`
}}
      >
        <div className="absolute inset-0 bg-black/60" />
        <motion.div
          className="relative z-10 text-center text-white max-w-3xl px-6"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <h1 className="text-4xl font-extrabold mb-3">{data?.title}</h1>
          <p className="text-lg text-gray-200">
           {data?.subtitle}
          </p>
        </motion.div>
      </section>

      {/* FILTER */}
      <section className="py-8 bg-muted/20">
        <div className="container mx-auto text-center">
          <div className="flex flex-wrap justify-center gap-4">
            {filters.map((f) => (
              <button
                key={f.category}
                onClick={() => setActiveFilter(f.category)}
                className={`px-6 py-2 rounded-md font-semibold transition ${
                  activeFilter === f.category
                    ? "bg-primary text-white shadow-lg"
                    : "bg-white text-primary border border-primary hover:bg-primary hover:text-white"
                }`}
              >
                {f.label}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* GRID */}
      <section className="py-10">
        <div className="container mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {filteredImages.map((img, i) => (
            <div
              key={i}
              onClick={() => setSelectedIndex(i)}
              className="rounded-xl overflow-hidden shadow cursor-pointer hover:shadow-xl transition"
            >
              <img
                src={
    img.image
      ? urlFor(img.image).url()
      : ""
  }
                className="w-full h-60 object-cover hover:scale-105 transition duration-500"
              />
            </div>
          ))}
        </div>
      </section>

      {/* LIGHTBOX */}
      <AnimatePresence>
        {selectedIndex !== null && (
          <motion.div
            className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            {/* CLOSE */}
            <button
              className="absolute top-6 right-6 text-white hover:scale-110 transition"
              onClick={() => setSelectedIndex(null)}
            >
              <X size={32} />
            </button>

            {/* COUNTER */}
            <div className="absolute top-6 left-6 text-white text-sm bg-black/60 px-3 py-1 rounded-full">
              {selectedIndex + 1} / {filteredImages.length}
            </div>

            {/* IMAGE (MOBILE SWIPE ENABLED) */}
            <motion.img
              key={filteredImages[selectedIndex].src}
              src={urlFor(filteredImages[selectedIndex]?.image).url()}
              drag="x"
              dragConstraints={{ left: 0, right: 0 }}
              onDragEnd={(e, info) => {
                if (info.offset.x > 120) {
                  setSelectedIndex(
                    (prev) =>
                      (prev - 1 + filteredImages.length) %
                      filteredImages.length
                  );
                } else if (info.offset.x < -120) {
                  setSelectedIndex(
                    (prev) => (prev + 1) % filteredImages.length
                  );
                }
              }}
              className="max-h-[90vh] max-w-[90vw] object-contain rounded-2xl shadow-2xl cursor-grab active:cursor-grabbing"
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
            />

            {/* DESKTOP ARROWS */}
            <button
              className="hidden md:flex absolute left-6 text-white text-6xl hover:scale-110 transition"
              onClick={() =>
                setSelectedIndex(
                  (prev) =>
                    (prev - 1 + filteredImages.length) %
                    filteredImages.length
                )
              }
            >
              ‹
            </button>

            <button
              className="hidden md:flex absolute right-6 text-white text-6xl hover:scale-110 transition"
              onClick={() =>
                setSelectedIndex(
                  (prev) => (prev + 1) % filteredImages.length
                )
              }
            >
              ›
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      <Footer />
    </>
  );
};

export default Gallery;

