// Bil.tsx
import { Check } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { motion } from 'framer-motion';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import heroBg from '@/assets/im.jpg';
import car1 from '@/assets/car1.jpg';
import car2 from '@/assets/car2.jpg';
import car3 from '@/assets/car3.jpg';
import { useEffect } from 'react';
import { useState } from "react";
import { sanityClient } from "@/lib/sanity";
import imageUrlBuilder from "@sanity/image-url";





const fadeInUp = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8 } },
};

const Bil = () => {
  const [data, setData] = useState<any>(null);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // External links (from client's spec)
  const blickpunktenUrl = 'https://blickpunkten.se/';
  const transportstyrelsenUrl =
    'https://www.transportstyrelsen.se/sv/vagtrafik/e-tjanster-och-blanketter/blanketter-for-vagtrafik/korkort/privatperson/ansok-om-korkortstillstand-grupp-i/';

  const builder = imageUrlBuilder(sanityClient);
  const urlFor = (source: any) => builder.image(source);

  useEffect(() => {
    sanityClient
      .fetch(`*[_type == "bDriving"][0]`)
      .then(setData);
  }, []);

  if (!data) return null;
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Helmet>
        <title>Körkort B i Stockholm | AJA Trafikskola</title>
        <meta
          name="description"
          content="Ta körkort B hos AJA Trafikskola i Stockholm. Professionella körlektioner, intensivkurser och moderna bilar för en trygg körkortsutbildning."
        />
        <meta name="robots" content="index, follow" />
        <meta property="og:type" content="website" />
        <meta property="og:title" content="Körkort B i Stockholm | AJA Trafikskola" />
        <meta
          property="og:description"
          content="Ta körkort B hos AJA Trafikskola i Stockholm. Professionella körlektioner, intensivkurser och moderna bilar för en trygg körkortsutbildning."
        />
        <meta property="og:image" content="/logo.png" />
      </Helmet>
      <Navbar />

      {/* ðŸ Hero Section */}
      <section
        className="relative h-[70vh] flex items-center justify-center text-center text-white overflow-hidden"
        style={{
          backgroundImage: data?.heroImage
            ? `url(${urlFor(data.heroImage).url()})`
            : "",
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      >
        <div className="absolute inset-0 bg-black/60" />
        <motion.div
          className="relative z-10 max-w-3xl px-6"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
        >
          <h1 className="text-4xl md:text-6xl font-extrabold mb-4 ">
            {data?.heroTitle}
          </h1>
          <p className="text-lg text-white">
            {data?.heroSubtitle}
          </p>
        </motion.div>
      </section>

      {/* ðŸš— Introduction */}
      <section className="py-20 bg-muted/20 overflow-hidden">
        <div className="container mx-auto px-4 grid md:grid-cols-2 gap-12 items-center">
          <motion.div
            className="relative"
            initial="hidden"
            whileInView="visible"
            variants={fadeInUp}
            viewport={{ once: true }}
          >
            <img
              src={urlFor(data?.introImage).url()}
              alt="Körlektion"
              className="rounded-[3rem_1rem_3rem_1rem] shadow-lg w-full object-cover hover:scale-105 transition-transform duration-500"
            />
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            variants={fadeInUp}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl font-bold mb-4 text-primary">  {data?.introTitle}</h2>
            <p className="text-gray-700 mb-6 whitespace-pre-line">
              {data?.introDescription}
            </p>
            <ul className="space-y-2 text-gray-700">
              {data?.introPoints?.map((item: string, index: number) => (
                <li key={index} className="flex gap-2 items-start">
                  <Check className="w-5 h-5 text-primary mt-1" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </motion.div>
        </div>
      </section>

      {/* ðŸš¦ Intensive Course */}
      <section className="py-20 bg-white overflow-hidden">
        <div className="container mx-auto px-4 grid md:grid-cols-2 gap-12 items-center">
          <motion.div
            className="order-2 md:order-1"
            initial="hidden"
            whileInView="visible"
            variants={fadeInUp}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl font-bold mb-4 text-primary">{data?.intensiveTitle}</h2>
            <p className="text-gray-700 mb-6 whitespace-pre-line">
              {data?.intensiveDescription}
            </p>
            <ul className="space-y-2 text-gray-700">
              {[
                'Snabb och fokuserad utbildning',
                'Teori och körning i kombination',
                'Perfekt för dig som vill ta körkort intensivt',
              ].map((item, index) => (
                <li key={index} className="flex gap-2 items-start">
                  <Check className="w-5 h-5 text-primary mt-1" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </motion.div>

          <motion.div
            className="order-1 md:order-2 relative"
            initial="hidden"
            whileInView="visible"
            variants={fadeInUp}
            viewport={{ once: true }}
          >
            <img
              src={car2}
              alt="Intensivkurs"
              className="rounded-[2rem_3rem_1rem_3rem] shadow-lg w-full object-cover hover:scale-105 transition-transform duration-500"
            />
          </motion.div>
        </div>
      </section>

      {/* ðŸ“ Practice Driving Locations */}
      <section className="py-20 bg-muted/20 text-center overflow-hidden">
        <motion.div
          className="container mx-auto px-4"
          initial="hidden"
          whileInView="visible"
          variants={fadeInUp}
          viewport={{ once: true }}
        >
          {/* ✅ TITLE */}
          <h2 className="text-3xl md:text-4xl font-bold mb-10 text-primary">
            {data?.practiceTitle}
          </h2>

          {/* ✅ DESCRIPTION */}
          <p className="text-gray-700 max-w-2xl mx-auto mb-12 whitespace-pre-line">
            {data?.practiceDescription}
          </p>

          {/* ✅ LOCATIONS */}
          <div className="grid md:grid-cols-3 gap-8">
            {(data?.locations || []).map((loc: any, index: number) => (
              <motion.div
                key={index}
                className="bg-card p-4 rounded-2xl shadow-md hover:shadow-xl transition-shadow duration-500"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.2, duration: 0.8 }}
              >
                <h3 className="font-semibold text-xl mb-3 text-primary">
                  {loc.title}
                </h3>

                <iframe
                  src={loc.mapUrl}
                  className="w-full h-56 rounded-xl"
                  loading="lazy"
                />

                {/* OPTIONAL BUTTON */}
                {loc.buttonLink && (
                  <a
                    href={loc.buttonLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-block mt-3 text-sm text-primary font-medium"
                  >
                    {loc.buttonText || "Open in Maps"}
                  </a>
                )}
              </motion.div>
            ))}
          </div>
        </motion.div>
      </section>

      {/* =========================
          NEW: Side-by-side templates
         ========================= */}
      <section className="py-20 bg-muted/20 overflow-hidden">
        <div className="container mx-auto px-4">

          {/* ✅ SECTION TITLE */}
          <motion.h2
            className="text-3xl font-bold mb-8 text-primary text-center"
            initial="hidden"
            whileInView="visible"
            variants={fadeInUp}
            viewport={{ once: true }}
          >
            {data?.requirements?.sectionTitle}
          </motion.h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">

            {/* ================= LEFT CARD ================= */}
            <motion.div
              className="bg-white rounded-2xl shadow-lg p-8"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <h3 className="text-2xl font-semibold mb-4">
                {data?.requirements?.practice?.title}
              </h3>

              <ul className="list-disc list-inside space-y-2 text-gray-700 mb-6">
                {(data?.requirements?.practice?.points || []).map(
                  (item: string, index: number) => (
                    <li key={index}>{item}</li>
                  )
                )}
              </ul>

              <div className="flex flex-col sm:flex-row gap-3">
                {data?.requirements?.practice?.button1Link && (
                  <a
                    href={data?.requirements?.practice?.button1Link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-block px-5 py-3 bg-[#000] text-white rounded-lg text-sm font-semibold hover:bg-primary/90 transition"
                  >
                    {data?.requirements?.practice?.button1Text}
                  </a>
                )}

                {data?.requirements?.practice?.button2Link && (
                  <a
                    href={data?.requirements?.practice?.button2Link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-block px-5 py-3 border border-primary text-primary rounded-lg text-sm font-semibold hover:bg-primary/5 transition"
                  >
                    {data?.requirements?.practice?.button2Text}
                  </a>
                )}
              </div>
            </motion.div>

            {/* ================= RIGHT CARD ================= */}
            <motion.div
              className="bg-white rounded-2xl shadow-lg p-8"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              viewport={{ once: true }}
            >
              <h3 className="text-2xl font-semibold mb-4">
                {data?.requirements?.license?.title}
              </h3>

              <ul className="list-disc list-inside space-y-2 text-gray-700 mb-6">
                {(data?.requirements?.license?.points || []).map(
                  (item: string, index: number) => (
                    <li key={index}>{item}</li>
                  )
                )}
              </ul>

              <div className="flex gap-3">
                {data?.requirements?.license?.button1Link && (
                  <a
                    href={data?.requirements?.license?.button1Link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-block px-5 py-3 bg-[#000] text-white rounded-lg text-sm font-semibold hover:bg-primary/90 transition"
                  >
                    {data?.requirements?.license?.button1Text}
                  </a>
                )}

                {data?.requirements?.license?.button2Link && (
                  <a
                    href={data?.requirements?.license?.button2Link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-block px-5 py-3 border border-primary text-primary rounded-lg text-sm font-semibold hover:bg-primary/5 transition"
                  >
                    {data?.requirements?.license?.button2Text}
                  </a>
                )}
              </div>
            </motion.div>

          </div>
        </div>
      </section>


      {/* ðŸŽ“ Study Theory & Book Lessons */}
      <section
        className="relative py-24 text-center text-white overflow-hidden"
        style={{
          backgroundImage: data?.theoryImage
      ? `url(${urlFor(data.theoryImage).url()})`
      : "",
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      >
        <div className="absolute inset-0 bg-black/70" />
        <motion.div
          className="relative z-10 max-w-4xl mx-auto px-6"
          initial="hidden"
          whileInView="visible"
          variants={fadeInUp}
          viewport={{ once: true }}
        >
          <h2 className="text-4xl font-extrabold mb-6">
           {data?.theoryTitle}
          </h2>

          <p className="text-lg leading-relaxed text-gray-200 mb-6">
            {data?.theoryIntro}
          </p>

          {/* Terms & Conditions in bullet points */}
          <div className="text-left text-gray-200 mb-8 max-w-xl mx-auto">
            <span className="font-semibold text-white mb-2 inline-block">
               {data?.theorySubTitle}
            </span>
            <ul className="list-disc list-inside space-y-2 mt-2">
            {(data?.theoryPoints || []).map((item: string, index: number) => (
          <li key={index}>{item}</li>
        ))}
                    </ul>
          </div>

          <p className="text-lg text-gray-200 mb-8">
             {data?.theoryBottomText}
          </p>

          <Link
            to="https://www.trafikskolaonline.se/sv/skola/aja/ "
            className="inline-block bg-primary text-white font-semibold px-8 py-4 rounded-lg shadow-md hover:scale-105 transition-transform duration-300"
          >
            Börja din körresa
          </Link>
        </motion.div>
      </section>

      {/* ðŸ’¬ CTA */}
      <section className="py-20 bg-primary text-white text-center">
        <motion.div
          className="relative z-10 max-w-3xl mx-auto px-6"
          initial="hidden"
          whileInView="visible"
          variants={fadeInUp}
          viewport={{ once: true }}
        >
          <h2 className="text-4xl font-extrabold mb-4">
            {data?.ctaTitle}
          </h2>

          <p className="text-lg mb-8 text-white/90 whitespace-pre-line">
            {data?.ctaSubtitle}
          </p>

          {data?.ctaButtonLink && (
            <a
              href={data.ctaButtonLink}
              className="inline-block bg-white text-primary font-semibold px-8 py-4 rounded-lg shadow-md hover:scale-105 transition-transform duration-300"
            >
              {data?.ctaButtonText}
            </a>
          )}
        </motion.div>
      </section>

      <Footer />
    </div>
  );
};

export default Bil;




