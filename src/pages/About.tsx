import { useEffect,useState } from "react";
import { motion } from "framer-motion";
import { Helmet } from "react-helmet-async";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
// import heroAbout from "@/assets/car1.jpg";
import { Link } from "react-router-dom";

// import rihamImg from "@/assets/Riham.jpg";
// import hassanImg from "@/assets/hassan.jpg";
// import martinImg from "@/assets/Martin.jpg";
// import najatImg from "@/assets/najat.jpg";

import teamImg from "@/assets/team.jpg";
import { sanityClient } from "@/lib/sanity";
import { createImageUrlBuilder } from "@sanity/image-url";

const builder = createImageUrlBuilder(sanityClient);
const urlFor = (source: any) => builder.image(source);

// ---------------------------
// TEAM DATA
// ---------------------------
// const teamMembers = [
//   {
//     name: "Riham Ali",
//     role: "Trafikskolechef • Utbildningsledare • Trafiklärare",
//     languages: "Talar svenska, engelska & arabiska",
//     image: rihamImg,
//   },
//   {
//     name: "Hassan Ebrahem",
//     role: "Utbildningsledare • Trafiklärare • MC lärare",
//     languages: "Talar svenska & arabiska",
//     image: hassanImg,
//   },
//   {
//     name: "Martin Stojanovski",
//     role: "Trafiklärare • MC lärare",
//     languages: "Talar svenska, engelska & makedonska",
//     image: martinImg,
//   },
//   {
//     name: "Najat Ibrahim",
//     role: "Trafiklärare",
//     languages: "Talar svenska & arabiska",
//     image: najatImg,
//   },
//   {
//     name: "Erika Torell",
//     role: "Trafiklärare",
//     languages: "Talar svenska & engelska",
//     image: null,
//   },
//   {
//     name: "Shirin Selim",
//     role: "Trafiklärare",
//     languages: "Talar svenska, engelska, arabiska & persiska",
//     image: null,
//   },
// ];



const About = () => {
  const [data, setData] = useState<any>(null);

  useEffect(() => {
    window.scrollTo(0, 0);

    sanityClient
      .fetch(`*[_type == "aboutPage"][0]`)
      .then((res) => setData(res))
      .catch(console.error);

  }, []);

  // SPLIT TEAM MEMBERS
  const owners = data?.teamMembers?.slice(0, 2) || [];
  const instructors = data?.teamMembers?.slice(2) || [];

  return (
    <>
      <Helmet>
        <title>Om AJA Trafikskola | Trafikskola i Stockholm</title>
        <meta
          name="description"
          content="Lär känna AJA Trafikskola och våra erfarna trafiklärare i Stockholm."
        />
        <meta name="robots" content="index, follow" />
        <meta property="og:type" content="website" />
        <meta property="og:title" content="Om AJA Trafikskola | Trafikskola i Stockholm" />
        <meta
          property="og:description"
          content="Lär känna AJA Trafikskola och våra erfarna trafiklärare i Stockholm."
        />
        <meta property="og:image" content="/logo.png" />
      </Helmet>
      <Navbar />

      {/* HERO */}
      <section
        className="relative h-[60vh] flex items-center justify-center bg-cover bg-center"
                style={{
          backgroundImage: data?.heroImage
            ? `url(${urlFor(data.heroImage).url()})`
            : "none",
        }}

      >
        <div className="absolute inset-0 bg-black/60" />
        <motion.div
          className="relative z-10 max-w-3xl px-6 text-center text-white"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9 }}
        >
          <h1 className="text-4xl md:text-5xl font-extrabold mb-3">
            {data?.heroTitle}
          </h1>
          <p className="text-lg md:text-xl text-gray-200">
           {data?.heroSubtitle}
          </p>
        </motion.div>
      </section>

      {/* TEAM */}
    {/* TEAM */}
<section className="py-20 bg-white">
  <div className="container mx-auto px-4 text-center">

    <motion.h2
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7 }}
      viewport={{ once: true }}
      className="text-3xl md:text-4xl font-bold text-primary mb-4"
    >
      {data?.teamSectionTitle}
    </motion.h2>

    <p className="text-muted-foreground mb-10 max-w-2xl mx-auto">
      {data?.teamSectionSubtitle}
    </p>

    {/* OWNERS */}
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 max-w-4xl mx-auto mb-14">

      {owners.map((m: any, i: number) => (
        <motion.div
          key={i}
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          whileHover={{ scale: 1.03 }}
          transition={{ duration: 0.6, delay: i * 0.1 }}
          viewport={{ once: true }}
        >
          <Card className="rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-all">

            <div className="w-full h-80 overflow-hidden">

              {m?.image ? (
                <img
                  src={urlFor(m.image).url()}
                  alt={m.name}
                  className="w-full h-full object-cover object-top transition-transform duration-700 hover:scale-105"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center bg-muted text-muted-foreground text-sm italic">
                  Bild kommer snart
                </div>
              )}

            </div>

            <CardContent className="p-5">
              <h3 className="text-xl font-semibold text-primary mb-1">
                {m?.name}
              </h3>

              <p className="text-sm text-muted-foreground mb-1">
                {m?.role}
              </p>

              <p className="text-xs text-muted-foreground italic">
                {m?.languages}
              </p>
            </CardContent>

          </Card>
        </motion.div>
      ))}

    </div>

    {/* INSTRUCTORS */}
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 max-w-7xl mx-auto">

      {instructors.map((m: any, i: number) => (
        <motion.div
          key={i}
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          whileHover={{ scale: 1.03 }}
          transition={{ duration: 0.6, delay: i * 0.1 }}
          viewport={{ once: true }}
        >
          <Card className="rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-all">

            <div className="w-full h-72 overflow-hidden">

              {m?.image ? (
                <img
                  src={urlFor(m.image).url()}
                  alt={m.name}
                  className="w-full h-full object-cover object-top transition-transform duration-700 hover:scale-105"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center bg-muted text-muted-foreground text-sm italic">
                  Bild kommer snart
                </div>
              )}

            </div>

            <CardContent className="p-5">
              <h3 className="text-lg font-semibold text-primary mb-1">
                {m?.name}
              </h3>

              <p className="text-sm text-muted-foreground mb-1">
                {m?.role}
              </p>

              <p className="text-xs text-muted-foreground italic">
                {m?.languages}
              </p>
            </CardContent>

          </Card>
        </motion.div>
      ))}

    </div>

  </div>
</section>

      {/* PASSION & VISION */}
      <section className="py-20 bg-muted/20">
        <div className="container mx-auto px-4 grid md:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="space-y-6"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-primary">
              Vår passion och vision
            </h2>
            <p className="text-lg text-muted-foreground">
              På AJA Trafikskola brinner vi för att skapa säkra och
              ansvarsfulla förare – inte bara för körprovet, utan för livet.
            </p>
            <p className="text-base text-muted-foreground">
              Varje elev är unik, därför anpassar vi utbildningen efter dina
              behov och din takt.
            </p>
          </motion.div>

          <motion.div
            className="flex justify-center"
            animate={{ y: [0, -10, 0] }}
            transition={{ repeat: Infinity, duration: 6, ease: "easeInOut" }}
          >
            <div className="w-full max-w-[520px] h-[360px] md:h-[440px] rounded-[50%_40%_50%_60%/60%_40%_50%_50%] overflow-hidden shadow-2xl">
              <img
                src={teamImg}
                alt="AJA Team"
                className="w-full h-full object-cover"
              />
            </div>
          </motion.div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-primary text-white text-center">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Redo att börja din resa mot körkortet?
          </h2>
          <p className="text-lg mb-6">
            Kontakta oss så hjälper vi dig komma igång.
          </p>
          <Link to="/kontakt">
  <Button
    className="bg-white text-primary px-8 py-3 rounded-lg shadow 
               hover:scale-105 hover:bg-gray-100 transition-transform font-semibold"
  >
    Kontakta oss
  </Button>
</Link>

        </motion.div>
      </section>

      <Footer />
    </>
  );
};

export default About;



