import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import mcHero from "@/assets/motorcycle-training.jpg";
import mcParked from "@/assets/img7.jpg";
import mcRoad from "@/assets/img6 - Copy.jpg";
import mcTraining from "@/assets/img3.jpg";
import { useEffect,useState } from "react";

import { sanityClient } from "@/lib/sanity";
import { createImageUrlBuilder } from "@sanity/image-url";

const builder = createImageUrlBuilder(sanityClient);
const urlFor = (source: any) => builder.image(source);

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0 },
};

const MCService = () => {
   const [data, setData] = useState<any>(null);

  useEffect(() => {
    window.scrollTo(0, 0);

    sanityClient
      .fetch(`*[_type == "motorcycleDrivingLicensePage"][0]`)
      .then((res) => setData(res))
      .catch(console.error);

  }, []);

  return (
    <>
      <Helmet>
        <title>MC Körkort i Stockholm | AJA Trafikskola</title>
        <meta
          name="description"
          content="Ta MC-körkort (A1, A2, A) hos AJA Trafikskola. Erfarna instruktörer och professionell MC-utbildning i Stockholm."
        />
        <meta name="robots" content="index, follow" />
        <meta property="og:type" content="website" />
        <meta property="og:title" content="MC Körkort i Stockholm | AJA Trafikskola" />
        <meta
          property="og:description"
          content="Ta MC-körkort (A1, A2, A) hos AJA Trafikskola. Erfarna instruktörer och professionell MC-utbildning i Stockholm."
        />
        <meta property="og:image" content="/logo.png" />
      </Helmet>
      <Navbar />

      {/* HERO */}
      <motion.section
        className="relative h-[75vh] flex items-center justify-center bg-cover bg-center"
                style={{
          backgroundImage: data?.heroImage
            ? `url(${urlFor(data.heroImage).url()})`
            : "none",
        }}

        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.9 }}
      >
        <div className="absolute inset-0 bg-black/60" />
        <div className="relative z-10 text-center text-white px-6">
          <h1 className="text-5xl md:text-6xl font-bold mb-4">
             {data?.heroTitle}
          </h1>
          <p className="text-lg md:text-xl max-w-3xl mx-auto">
            {data?.heroSubtitle}
          </p>
        </div>
      </motion.section>

      {/* TOP INFO BOXES */}
        <section className="py-16 bg-muted/10">
        <div className="container mx-auto px-6 md:px-12 grid md:grid-cols-2 gap-10">

          {data?.requirementsCards?.map((card: any, index: number) => (
            <div
              key={index}
              className="bg-card shadow-lg p-8 rounded-2xl"
            >
              <h2 className="text-3xl font-bold mb-4 text-primary">
                {card?.title}
              </h2>

              <ul className="list-disc ml-6 space-y-3 text-muted-foreground">
                {card?.points?.map((point: string, i: number) => (
                  <li key={i}>{point}</li>
                ))}
              </ul>

              <div className="mt-6 flex gap-4">
                {card?.button1Text && (
                  <a
                    href={card?.button1Link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 text-center bg-black text-white py-2 rounded-md text-sm font-semibold hover:bg-black/90"
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
            </div>
          ))}

        </div>
      </section>


      {/* INTRO */}
       {data?.contentSections?.map((section: any, index: number) => (
        <motion.section
          key={index}
          className={`py-20 ${index % 2 === 0 ? "bg-muted/20" : "bg-white"}`}
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          <div
            className={`container mx-auto px-6 md:px-12 grid md:grid-cols-2 gap-12 items-center`}
          >

            {/* IMAGE LEFT */}
            {section?.imagePosition === "left" && (
              <>
                <img
                  src={urlFor(section?.image).url()}
                  alt={section?.title}
                  className="rounded-2xl shadow-lg w-full"
                />

                <div className="space-y-6">
                  <h2 className="text-4xl font-bold text-primary">
                    {section?.title}
                  </h2>

                  {section?.description?.map((para: string, i: number) => (
                    <p
                      key={i}
                      className="text-muted-foreground text-lg whitespace-pre-line"
                    >
                      {para}
                    </p>
                  ))}
                </div>
              </>
            )}

            {/* IMAGE RIGHT */}
            {section?.imagePosition === "right" && (
              <>
                <div className="space-y-6">
                  <h2 className="text-4xl font-bold text-primary">
                    {section?.title}
                  </h2>

                  {section?.description?.map((para: string, i: number) => (
                    <p
                      key={i}
                      className="text-muted-foreground text-lg whitespace-pre-line"
                    >
                      {para}
                    </p>
                  ))}
                </div>

                <img
                  src={urlFor(section?.image).url()}
                  alt={section?.title}
                  className="rounded-2xl shadow-lg w-full"
                />
              </>
            )}

          </div>
        </motion.section>
      ))}


      {/* CTA */}
      <section className="py-20 bg-primary text-white text-center">
        <h2 className="text-4xl font-bold mb-4">
           {data?.ctaTitle}
        </h2>
        <p className="text-lg mb-6 max-w-3xl mx-auto">
           {data?.ctaSubtitle}
        </p>

        <a
          href="https://www.trafikskolaonline.se/sv/skola/aja/"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-block bg-white text-primary font-semibold px-8 py-3 rounded-lg hover:scale-105 transition"
        >
          E-handel
        </a>
      </section>

      <Footer />
    </>
  );
};

export default MCService;




