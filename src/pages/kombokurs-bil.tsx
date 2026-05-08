import { motion } from 'framer-motion';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import heroBg1 from '@/assets/car17.jpg';
import risk1Img from '@/assets/risk1.jpg';
import risk2Img from '@/assets/risk2.jpg';
import { useEffect,useState } from 'react';
import { sanityClient } from '@/lib/sanity';
import imageUrlBuilder from '@sanity/image-url';

const builder = imageUrlBuilder(sanityClient);
const urlFor = (source: any) => builder.image(source);


const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8 } },
};

const Risk1and2Bil = () => {
  const [data, setData] = useState<any>(null);

  useEffect(() => {

    window.scrollTo(0, 0);

    sanityClient
      .fetch(`*[_type == "riskOneAndTwoEducationPage"][0]`)
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
           <img
              src={urlFor(data?.topLeftImage).url()}
              alt="Riskutbildning del 1"
              className="rounded-2xl shadow-lg w-full"
            />

            <img
              src={urlFor(data?.topRightImage).url()}
              alt="Riskutbildning del 2"
              className="rounded-2xl shadow-lg w-full"
            />
          </motion.div>

          {/* DEL 1 */}
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="mb-16"
          >
            <h3 className="text-2xl font-bold mb-4">
               {data?.riskOneTitle}
            </h3>

         <div className="space-y-4 whitespace-pre-line">

              {data?.riskOneDescription?.map(
                (text: string, index: number) => (
                  <p
                    key={index}
                    className="text-muted-foreground text-lg"
                  >
                    {text}
                  </p>
                )
              )}

            </div>

          
          </motion.div>

          {/* DEL 2 */}
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="mb-20"
          >
            <h3 className="text-2xl font-bold mb-4">
              {data?.riskTwoTitle}
            </h3>

             <div className="space-y-4 whitespace-pre-line">

              {data?.riskTwoDescription?.map(
                (text: string, index: number) => (
                  <p
                    key={index}
                    className="text-muted-foreground text-lg"
                  >
                    {text}
                  </p>
                )
              )}

            </div>
          </motion.div>

          {/* INFO BOXES */}
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid md:grid-cols-2 gap-10"
          >
  {data?.infoCards?.map((card: any, index: number) => (

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
            ))}
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

export default Risk1and2Bil;

