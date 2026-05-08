import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import taxiHero from "@/assets/taxi-img.jpg";
import taxiStreet from "@/assets/taxi-street.jpg";
import { useEffect, useState } from "react";
import { sanityClient } from "@/lib/sanity";
import { createImageUrlBuilder } from "@sanity/image-url";
import { PortableText } from "@portabletext/react";

const builder = createImageUrlBuilder(sanityClient);
const urlFor = (source: any) => builder.image(source);

const fadeUp = { hidden: { opacity: 0, y: 30 }, visible: { opacity: 1, y: 0 } };

const Taxi = () => {
  const [data, setData] = useState<any>(null);

  const portableTextComponents = {
    list: {
      bullet: ({ children }: any) => (
        <ul className="list-disc pl-6 space-y-3 text-gray-700">
          {children}
        </ul>
      ),
    },

    listItem: {
      bullet: ({ children }: any) => (
        <li className="text-md leading-relaxed">
          {children}
        </li>
      ),
    },
  };

  useEffect(() => {
    window.scrollTo(0, 0);

    sanityClient
      .fetch(`*[_type == "taxiDriverLicenseTrainingPage"][0]`)
      .then((res) => setData(res))
      .catch(console.error);

  }, []);

  return (
    <>
      <Navbar />

      {/* Hero Section */}
      <motion.section
        className="relative h-[70vh] flex items-center justify-center bg-center bg-cover"
        style={{
          backgroundImage: data?.heroImage
            ? `url(${urlFor(data.heroImage).url()})`
            : "none",
        }}

        initial="hidden"
        animate="visible"
        variants={{ hidden: { opacity: 0 }, visible: { opacity: 1, transition: { duration: 1 } } }}
      >
        <div className="absolute inset-0 bg-black/60"></div>
        <div className="relative z-10 text-center text-white px-6">
          <motion.h1
            className="text-5xl md:text-6xl font-bold mb-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.8 }}
          >
            {data?.heroTitle}
          </motion.h1>
          <motion.p
            className="text-lg md:text-xl max-w-3xl mx-auto"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.8 }}
          >
            {data?.heroSubtitle}
          </motion.p>
        </div>
      </motion.section>

      {/* Intro Section */}
      <motion.section
        className="py-20 bg-muted/20"
        variants={fadeUp}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.7 }}
      >
        <div className="container mx-auto px-6 md:px-12 space-y-6 text-center">
          <h2 className="text-4xl font-bold mb-4 text-primary">
            {data?.introTitle}
          </h2>


          <div className="max-w-4xl mx-auto">
            {data?.introDescription?.map((para: string, index: number) => (
              <p
                key={index}
                className="text-lg text-gray-700 mb-4 whitespace-pre-line"
              >
                {para}
              </p>
            ))}
          </div>

          {data?.introImage && (
            <motion.img
              src={urlFor(data.introImage).url()}
              alt={data?.introTitle}
              className="mx-auto rounded-2xl shadow-lg w-full md:w-3/4"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7 }}
              viewport={{ once: true }}
            />
          )}
        </div>
      </motion.section>

      {/* Requirements Section */}
      {data?.contentSections?.map((section: any, index: number) => (
        <motion.section
          key={index}
          className="py-20 bg-white"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.7 }}
        >
          <div
            className={`container mx-auto px-6 md:px-12 grid md:grid-cols-2 gap-12 items-center ${section?.imagePosition === "left" ? "md:flex-row-reverse" : ""
              }`}
          >

            {/* TEXT */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.7 }}
            >
              <h2 className="text-3xl font-bold text-primary mb-6">
                {section?.title}
              </h2>

              {/* POINTS */}
              <ul className="list-disc ml-6 text-lg text-gray-700 space-y-3">
                {section?.points?.map((point: string, i: number) => (
                  <li key={i}>{point}</li>
                ))}
              </ul>
            </motion.div>

            {/* IMAGE */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <img
                src={urlFor(section?.image).url()}
                alt={section?.title}
                className="rounded-2xl shadow-lg w-full"
              />
            </motion.div>
          </div>
        </motion.section>
      ))}

      {/* Driving Test Section */}
      {data?.highlightSections?.map((section: any, index: number) => (
        <motion.section
          key={index}
          className="py-20 bg-muted/30"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.7 }}
        >
          <div className="container mx-auto px-6 md:px-12">

            {/* BIG CENTER TITLE */}
            <h2 className="text-4xl font-bold text-center mb-12 text-primary">
              {section?.title}
            </h2>

            <div className="grid md:grid-cols-2 gap-12 items-center">

              {/* TEXT */}
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.7 }}
              >

                {/* DESCRIPTION */}
                <div className="text-lg text-gray-700 ">
                  <PortableText value={section?.description} />
                </div>

                {/* BULLET POINTS */}
                <div
                  className="
    prose prose-md max-w-none
    prose-p:text-gray-700
    prose-li:text-gray-700
    prose-ul:list-disc
    prose-ul:pl-6
    prose-ul:space-y-3
  "
                >
                  <PortableText
                    value={section?.points}
                    components={portableTextComponents}
                  />                </div>
              </motion.div>

              {/* IMAGE */}
              <motion.div
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.7 }}
              >
                <img
                  src={urlFor(section?.image).url()}
                  alt={section?.title}
                  className="rounded-2xl shadow-lg w-full"
                />
              </motion.div>
            </div>
          </div>
        </motion.section>
      ))}

      {/* CTA Section */}
      <motion.section
        className="py-20 bg-primary text-white text-center"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
        viewport={{ once: true }}
      >
        <h2 className="text-4xl font-bold mb-6">Boka din första körlektion idag!</h2>
        <p className="text-lg mb-8 max-w-4xl mx-auto">
          Du ska visa att du kan köra fordonet på ett trafiksäkert sätt, köra ekonomiskt och miljövänligt samt följa alla trafikregler. Sinnesnärvaro och omdömesförmåga är viktiga, särskilt i svåra trafiksituationer och risksituationer.
          Boka din första körlektion hos oss idag och ta steget mot din nya karriär som taxiförare!
        </p>

        <Link
          to="/kontakt"
          className="inline-block bg-white text-primary font-semibold px-10 py-4 rounded-lg shadow-lg hover:scale-105 transition-all duration-300"
        >
          Kontakta oss
        </Link>
      </motion.section>

      <Footer />
    </>
  );
};

export default Taxi;



