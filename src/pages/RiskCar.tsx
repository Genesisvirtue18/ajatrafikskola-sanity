import { CheckCircle } from 'lucide-react';
import { motion } from 'framer-motion';
import { Helmet } from 'react-helmet-async';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import heroBg1 from '@/assets/car17.jpg';
import risk1Img from '@/assets/risk1.jpg';
import { useEffect } from 'react';
import { useState } from "react";
import { sanityClient } from "@/lib/sanity";
import imageUrlBuilder from "@sanity/image-url";

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8 } },
};

const Risk1Bil = () => {
  const builder = imageUrlBuilder(sanityClient);
  const urlFor = (source: any) => builder.image(source);
  const [data, setData] = useState<any>(null);


  useEffect(() => window.scrollTo(0, 0), []);

  useEffect(() => {
    window.scrollTo(0, 0);

    sanityClient
      .fetch(`*[_type == "riskEducationPage"][0]`)
      .then(setData);
  }, []);

  if (!data) return null;

  return (
    <div className="min-h-screen bg-background">
      <Helmet>
        <title>Riskettan Bil i Stockholm | AJA Trafikskola</title>
        <meta
          name="description"
          content="Boka Riskettan för bil hos AJA Trafikskola. Obligatorisk riskutbildning för körkort B i Stockholm."
        />
        <meta name="robots" content="index, follow" />
        <meta property="og:type" content="website" />
        <meta property="og:title" content="Riskettan Bil i Stockholm | AJA Trafikskola" />
        <meta
          property="og:description"
          content="Boka Riskettan för bil hos AJA Trafikskola. Obligatorisk riskutbildning för körkort B i Stockholm."
        />
        <meta property="og:image" content="/logo.png" />
      </Helmet>
      <Navbar />

      {/* HERO */}
      <section
        className="relative h-[28rem] flex items-center justify-center text-center text-white"
        style={{
          backgroundImage: data?.heroImage
            ? `url(${urlFor(data.heroImage).url()})`
            : "",
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      >
        <div className="absolute inset-0 bg-black/60" />
        <div className="relative z-10 px-6">
          <h1 className="text-4xl md:text-6xl font-extrabold mb-4">
            {data?.heroTitle}
          </h1>
          <p className="text-lg text-gray-200 max-w-2xl mx-auto">
            {data?.heroSubtitle}
          </p>
        </div>
      </section>

      {/* CONTENT */}
    <section className="py-20 bg-muted/10">
  <div className="container mx-auto px-4 max-w-5xl">

    {/* IMAGE + INTRO */}
    <motion.div
      variants={fadeUp}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      className="grid md:grid-cols-2 gap-12 items-center mb-20"
    >
      <img
        src={data?.sectionImage ? urlFor(data.sectionImage).url() : ""}
        alt="Risk 1 bil"
        className="rounded-2xl shadow-lg w-full"
      />

      <div>
        <h2 className="text-3xl font-bold mb-4">
          {data?.sectionTitle}
        </h2>

        {/* ✅ FIXED PARAGRAPHS */}
        {data?.sectionDescription?.map((para: string, i: number) => (
          <p
            key={i}
            className="text-muted-foreground text-lg mb-4 whitespace-pre-line"
          >
            {para}
          </p>
        ))}
      </div>
    </motion.div>

    {/* INFO BOXES (DYNAMIC) */}
    <motion.div
      variants={fadeUp}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      className="grid md:grid-cols-2 gap-10"
    >
      {(data?.infoCards || []).map((card: any, index: number) => (
        <div key={index} className="bg-card p-8 rounded-2xl shadow">
          <h3 className="text-2xl font-bold mb-6 text-primary">
            {card.title}
          </h3>

          <ul className="space-y-3 text-muted-foreground text-lg">
            {(card.points || []).map((item: string, i: number) => (
              <li key={i}>• {item}</li>
            ))}
          </ul>
        </div>
      ))}
    </motion.div>

    {/* CTA */}
    <div className="mt-20 bg-muted/40 p-10 rounded-2xl text-center shadow-lg">
      <h3 className="text-3xl font-bold mb-4">
        {data?.ctaTitle}
      </h3>

      <p className="text-muted-foreground text-lg max-w-2xl mx-auto mb-8 whitespace-pre-line">
        {data?.ctaSubtitle}
      </p>

                <a
              href="https://www.trafikskolaonline.se/sv/skola/aja/kurser/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center bg-black text-white px-12 py-4 rounded-lg font-semibold text-lg hover:bg-black/90 transition-transform hover:scale-105"
            >
              BOKA
            </a>
    </div>

  </div>
</section>

      <Footer />
    </div>
  );
};

export default Risk1Bil;

