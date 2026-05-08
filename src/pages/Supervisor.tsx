import { Link } from 'react-router-dom';
import { CheckCircle } from 'lucide-react';
import { motion } from 'framer-motion';
import { Helmet } from 'react-helmet-async';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import heroBg2 from '@/assets/hero-bg.webp';
import seminarImg from '@/assets/class.jpeg';
import seatbeltImg from '@/assets/woman-closing-her-seat-belt.jpg';
import instructorImg from '@/assets/learning.jpg';
import { useEffect, useState } from 'react';

import { sanityClient } from '@/lib/sanity';
import { createImageUrlBuilder } from "@sanity/image-url";

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: 'easeOut' } },
};

const Supervisor = () => {
  const builder = createImageUrlBuilder(sanityClient);
  const [data, setData] = useState<any>(null);
  const urlFor = (source: any) => builder.image(source);
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);


  useEffect(() => {
    window.scrollTo(0, 0);

    sanityClient
      .fetch(`*[_type == "supervisorCoursePage"][0]`)
      .then((res) => setData(res));
  }, []);

  return (
    <div className="min-h-screen bg-background">
      <Helmet>
        <title>Handledarkurs i Stockholm | AJA Trafikskola</title>
        <meta
          name="description"
          content="Handledarkurs för privat övningskörning i Stockholm. Lär dig regler, ansvar och säker körning."
        />
        <meta name="robots" content="index, follow" />
        <meta property="og:type" content="website" />
        <meta property="og:title" content="Handledarkurs i Stockholm | AJA Trafikskola" />
        <meta
          property="og:description"
          content="Handledarkurs för privat övningskörning i Stockholm. Lär dig regler, ansvar och säker körning."
        />
        <meta property="og:image" content="/logo.png" />
      </Helmet>
      <Navbar />

      {/* HERO */}
      <section
        className="relative h-[28rem] flex items-center justify-center"
        style={{
          backgroundImage: `url(${data?.heroImage ? urlFor(data.heroImage).url() : ''
            })`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      >
        <div className="absolute inset-0 bg-black/60" />
        <div className="relative z-10 text-center text-white px-6">
          <h1 className="text-4xl md:text-6xl font-extrabold mb-3">
            {data?.heroTitle}
          </h1>
          <p className="text-lg md:text-xl max-w-2xl mx-auto text-gray-200">
            {data?.heroSubtitle}
          </p>
        </div>
      </section>

      {/* CONTENT */}
      <section className="py-20 bg-muted/10">
        <div className="container mx-auto px-4 max-w-6xl">

          {/* INTRO */}
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="text-center mb-14"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              {data?.introTitle}
            </h2>
            <p className="text-muted-foreground max-w-3xl mx-auto text-lg">
              {data?.introDescription}
            </p>
          </motion.div>

          {/* IMAGES */}
          <div className="grid md:grid-cols-3 gap-6 mb-16">
            {data?.galleryImages?.map((img: any, i: number) => (
              <motion.img
                key={i}
                variants={fadeUp}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                src={urlFor(img).url()}
                className="rounded-2xl shadow-lg w-full object-cover h-44 md:h-56"
              />
            ))}
          </div>

          {/* REQUIREMENTS – STUDENT & SUPERVISOR (ABOVE) */}
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid md:grid-cols-2 gap-10 mb-16"
          >
            {data?.requirementCards?.map((card: any, index: number) => (
              <div key={index} className="bg-card p-8 rounded-2xl shadow">

                <h3 className="text-2xl font-bold mb-6">
                  {card.title}
                </h3>

                <ul className="space-y-3 text-muted-foreground mb-6 text-lg">
                  {card.points?.map((point: string, i: number) => (
                    <li key={i}>• {point}</li>
                  ))}
                </ul>

                <div className="flex gap-4 flex-wrap">

                  {card.button1Text && (
                    <a
                      href={card.button1Link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex-1 text-center bg-black text-white py-2 rounded-md text-sm font-semibold"
                    >
                      {card.button1Text}
                    </a>
                  )}

                  {card.button2Text && (
                    <a
                      href={card.button2Link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex-1 text-center border border-primary text-primary py-2 rounded-md text-sm font-semibold hover:bg-primary hover:text-white transition"
                    >
                      {card.button2Text}
                    </a>
                  )}

                </div>
              </div>
            ))}
          </motion.div>

          {/* LEARNING + GOOD TO KNOW (SIDE BY SIDE) */}
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid md:grid-cols-2 gap-10"
          >
            {data?.infoCards?.map((card: any, index: number) => (
              <div key={index} className="bg-card p-8 rounded-2xl shadow">

                <h3 className="text-2xl font-bold mb-6">
                  {card.title}
                </h3>

                <ul className="space-y-3 text-muted-foreground text-lg">
                  {card.points?.map((item: string, i: number) => (
                    <li key={i} className="flex items-start gap-3">
                      <CheckCircle className="w-5 h-5 text-primary mt-1" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>

              </div>
            ))}
          </motion.div>

        </div>
      </section>
      {/* CTA */}
      <div className="mt-20 bg-muted/40 p-10 rounded-2xl text-center shadow-lg">
        <h3 className="text-3xl font-bold mb-4">
          {data?.ctaTitle}
        </h3>

        <p className="text-muted-foreground text-lg max-w-2xl mx-auto mb-8">
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

      <Footer />
    </div>
  );
};

export default Supervisor;

