import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import heroMoped from '@/assets/moped1.jpg';
import mopedTheory from '@/assets/moped5.jpg';
import mopedAM from '@/assets/moped-AM.jpg';
import { sanityClient } from '@/lib/sanity';
import { createImageUrlBuilder } from '@sanity/image-url';

const builder = createImageUrlBuilder(sanityClient);
const urlFor = (source: any) => builder.image(source);

const fadeInUp = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: 'easeOut' } },
};

const MopedService = () => {
  const [data, setData] = useState<any>(null);

  useEffect(() => {
    window.scrollTo(0, 0);

    sanityClient
      .fetch(`*[_type == "amMopedLicensePage"][0]`)
      .then((res) => setData(res))
      .catch(console.error);
  }, []);

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Helmet>
        <title>Moped Körkort AM | AJA Trafikskola Stockholm</title>
        <meta
          name="description"
          content="Ta AM-körkort och mopedutbildning hos AJA Trafikskola i Stockholm. Teori och praktik för säker körning."
        />
        <meta name="robots" content="index, follow" />
        <meta property="og:type" content="website" />
        <meta property="og:title" content="Moped Körkort AM | AJA Trafikskola Stockholm" />
        <meta
          property="og:description"
          content="Ta AM-körkort och mopedutbildning hos AJA Trafikskola i Stockholm. Teori och praktik för säker körning."
        />
        <meta property="og:image" content="/logo.png" />
      </Helmet>
      <Navbar />

      {/* HERO */}
      <section
        className="relative h-[75vh] flex items-center justify-center text-center text-white"
        style={{
          backgroundImage: data?.heroImage
            ? `url(${urlFor(data.heroImage).url()})`
            : 'none',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      >
        <div className="absolute inset-0 bg-black/60" />
        <div className="relative z-10 max-w-3xl px-6">
          <h1 className="text-4xl md:text-6xl font-extrabold mb-6">
            {data?.heroTitle}
          </h1>
          <p className="text-lg md:text-xl text-gray-200">
            {data?.heroSubtitle}
          </p>
        </div>
      </section>

      {/* INTRO SECTION */}
      <section className="py-20 bg-muted/10">
        <div className="container mx-auto px-4 grid md:grid-cols-2 gap-14 items-center">
          <motion.div
            initial="hidden"
            whileInView="visible"
            variants={fadeInUp}
            viewport={{ once: true }}
          >
            <img
              src={
                data?.introImage
                  ? urlFor(data.introImage).url()
                  : ''
              }
              alt="Moped theory"
              className="rounded-2xl shadow-lg w-full object-cover"
            />
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            variants={fadeInUp}
            viewport={{ once: true }}
            className="bg-card p-8 rounded-2xl shadow"
          >
            <h2 className="text-3xl font-bold mb-6 text-primary">
              {data?.introTitle}
            </h2>

            <div className="space-y-5 whitespace-pre-line">
              {data?.introDescriptions?.map(
                (paragraph: string, index: number) => (
                  <p
                    key={index}
                    className="text-muted-foreground text-lg"
                  >
                    {paragraph}
                  </p>
                )
              )}
            </div>
          </motion.div>
        </div>
      </section>

      {/* REQUIREMENTS */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4 grid md:grid-cols-3 gap-10">

          {/* CARD 1 */}
          {data?.infoCards?.map((card: any, index: number) => (
            <div
              key={index}
              className="bg-card p-8 rounded-2xl shadow"
            >
              <h3 className="text-2xl font-bold mb-6 text-primary">
                {card?.title}
              </h3>

              <ul className="space-y-3 text-muted-foreground text-lg mb-6">
                {card?.points?.map(
                  (point: string, i: number) => (
                    <li key={i}>• {point}</li>
                  )
                )}
              </ul>

              {(card?.button1Text || card?.button2Text) && (
                <div className="flex gap-4 flex-wrap">

                  {card?.button1Text && (
                    <a
                      href={card?.button1Link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex-1 text-center bg-black text-white py-2 rounded-md text-sm font-semibold"
                    >
                      {card?.button1Text}
                    </a>
                  )}

                  {card?.button2Text && (
                    <a
                      href={card?.button2Link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex-1 text-center border border-primary text-primary py-2 rounded-md text-sm font-semibold hover:bg-primary hover:text-white transition"
                    >
                      {card?.button2Text}
                    </a>
                  )}
                </div>
              )}
            </div>
          ))}

        </div>
      </section>

      {/* AM SECTION */}
      <section className="py-20 bg-muted/10">
        <div className="container mx-auto px-4 grid md:grid-cols-2 gap-14 items-center">
          <motion.div
            initial="hidden"
            whileInView="visible"
            variants={fadeInUp}
            viewport={{ once: true }}
          >
            <img
              src={
                data?.secondSectionImage
                  ? urlFor(data.secondSectionImage).url()
                  : ''
              }
              alt="AM license"
              className="rounded-2xl shadow-lg w-full object-cover"
            />
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            variants={fadeInUp}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl font-bold mb-6 text-primary">
              {data?.secondSectionTitle}
            </h2>

              <div className="mb-8">
              <h4 className="text-xl font-semibold mb-4">
                {data?.secondSectionPointsTitle}
              </h4>

              <ul className="space-y-3 text-muted-foreground text-lg">

                {data?.secondSectionPoints?.map(
                  (point: string, index: number) => (
                    <li key={index}>• {point}</li>
                  )
                )}
              </ul>
            </div>
  {data?.secondSectionButtonText && (
              <a
                href={data?.secondSectionButtonLink}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block bg-primary text-white font-semibold px-10 py-4 rounded-lg hover:bg-primary/90 transition"
              >
                {data?.secondSectionButtonText}
              </a>
            )}


            {/* <a
              href="https://www.trafikskolaonline.se/sv/skola/aja/kurser"
              target="_blank"
              className="inline-block bg-primary text-white font-semibold px-10 py-4 rounded-lg hover:bg-primary/90 transition"
            >
              Boka nu
            </a> */}
          </motion.div>
        </div>
      </section>
      {/* FINAL CTA */}
      <section className="py-20 bg-primary text-white text-center">
        <div className="max-w-3xl mx-auto px-6">
          <h2 className="text-4xl font-extrabold mb-4">
             {data?.ctaTitle}
          </h2>
          <p className="text-lg mb-8 text-gray-200">
            {data?.ctaSubtitle}
          </p>
          <Link
            to="/kontakt"
            className="inline-block bg-white text-primary font-semibold px-8 py-4 rounded-lg hover:scale-105 transition"
          >
            Kontakta oss
          </Link>
        </div>
      </section>
      <Footer />
    </div>
  );
};

export default MopedService;




