import { motion } from 'framer-motion';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import heroBg1 from '@/assets/img6.jpg';
import risk1Img from '@/assets/img3.jpg';
import risk2Img from '@/assets/img7.jpg';
import { useEffect, useState } from 'react';
import { createImageUrlBuilder } from '@sanity/image-url';
import { PortableText } from '@portabletext/react';
import { sanityClient } from '@/lib/sanity';


const builder = createImageUrlBuilder(sanityClient);
const urlFor = (source: any) => builder.image(source);

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8 } },
};



const portableTextComponents = {
  block: {
    normal: ({ children }: any) => (
      <p className="mb-5 text-lg leading-[1.9] text-muted-foreground">
        {children}
      </p>
    ),
  },

  list: {
    bullet: ({ children }: any) => (
      <ul className="list-disc pl-8 mt-3 mb-5 space-y-1">
        {children}
      </ul>
    ),
  },

  listItem: {
    bullet: ({ children }: any) => (
      <li className="text-lg leading-[1.9] text-muted-foreground">
        {children}
      </li>
    ),
  },

  marks: {
    strong: ({ children }: any) => (
      <strong className="font-bold text-foreground">
        {children}
      </strong>
    ),
  },
};

const KombokursMC = () => {
  const [data, setData] = useState<any>(null);

  useEffect(() => {
    window.scrollTo(0, 0);

    sanityClient
      .fetch(`*[_type == "motorcycleRiskCombinationCoursePage"][0]`)
      .then((res) => setData(res))
      .catch(console.error);
  }, []);


  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      {/* HERO */}
      <section
        className="relative h-[28rem] flex items-center justify-center text-center text-white"
        style={{
          backgroundImage: data?.heroImage
            ? `url(${urlFor(data.heroImage).url()})`
            : 'none',
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

          {/* INTRO */}
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              {data?.introTitle}
            </h2>
            <div className="text-muted-foreground text-lg max-w-3xl mx-auto space-y-4">
              {data?.introDescription?.map(
                (text: string, index: number) => (
                  <p key={index}>{text}</p>
                )
              )}
            </div>
          </motion.div>

          {/* IMAGES */}
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid md:grid-cols-2 gap-12 items-center mb-20"
          >
            {data?.galleryImages?.map(
              (image: any, index: number) => (
                <img
                  key={index}
                  src={urlFor(image).url()}
                  alt={`Gallery ${index + 1}`}
                  className="rounded-2xl shadow-lg w-full"
                />
              )
            )}
          </motion.div>
        {data?.courseSections?.map(
  (section: any, index: number) => (
    <motion.div
      key={index}
      variants={fadeUp}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      className=""
    >
      <h3 className="text-2xl font-bold mb-4 leading-tight">
        {section?.title}
      </h3>

      <div
        className="
          max-w-none
          text-2xl
          leading-[1.9]
          text-muted-foreground
          space-y-2
        "
      >
        <PortableText
          value={section?.description}
          components={portableTextComponents}
        />
      </div>
    </motion.div>
  )
)}

          {/* INFO BOXES */}
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid md:grid-cols-2 gap-10"
          >
            {/* BRA ATT VETA */}
            {data?.infoCards?.map(
              (card: any, index: number) => (
                <div
                  key={index}
                  className="bg-card p-8 rounded-2xl shadow"
                >
                  <h3 className="text-2xl font-bold mb-6 text-primary">
                    {card?.title}
                  </h3>

                  <ul className="space-y-3 text-muted-foreground text-lg">
                    {card?.points?.map(
                      (point: string, i: number) => (
                        <li key={i}>• {point}</li>
                      )
                    )}
                  </ul>
                </div>
              )
            )}
          </motion.div>

          {/* CTA */}
          <div className="mt-20 bg-muted/40 p-10 rounded-2xl text-center shadow-lg">
            <h3 className="text-3xl font-bold mb-4">
              {data?.ctaTitle}
            </h3>

            <p className="text-muted-foreground text-lg max-w-2xl mx-auto mb-8">
              {data?.ctaSubtitle}
            </p>

            <a
              href="https://www.trafikskolaonline.se/sv/skola/aja/kurser/?courseTypeFilter=KOMBOKURS+MC+%28MELLAN%2FTUNG%29"
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

export default KombokursMC;