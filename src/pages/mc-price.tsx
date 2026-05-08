import { Link } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import heroBg from '@/assets/motorcycle-training.jpg';
import { useEffect, useState } from 'react';
import { Check } from "lucide-react";
import { sanityClient } from '@/lib/sanity';
import { createImageUrlBuilder } from '@sanity/image-url';


const builder = createImageUrlBuilder(sanityClient);
const urlFor = (source: any) => builder.image(source);

const McPrice = () => {
  const [data, setData] = useState<any>(null);

  useEffect(() => {
    window.scrollTo(0, 0);

    sanityClient
      .fetch(`*[_type == "motorcycleLicensePricingPage"][0]`)
      .then((res) => setData(res))
      .catch(console.error);

  }, []);
  // MC lesson products
  const lessons = [
    {
      title: 'Trafik lektion',
      time: '1 x 75 minuter',
      price: '1 595 kr',
      link: 'https://www.trafikskolaonline.se/sv/skola/aja/ehandel/10412/'
    },
    {
      title: 'Bana lektion',
      time: '2 x 75 minuter',
      price: '3 190 kr',
      link: 'https://www.trafikskolaonline.se/sv/skola/aja/ehandel/10643/'
    },
    {
      title: '5 st körlektioner',
      time: 'á 75 minuter',
      price: '7 400 kr',
      old: '7 975 kr',
      link: 'https://www.trafikskolaonline.se/sv/skola/aja/ehandel/10430/'
    },
    {
      title: '8 st körlektioner',
      time: 'á 75 minuter',
      price: '11 680 kr',
      old: '12 760 kr',
      link: 'https://www.trafikskolaonline.se/sv/skola/aja/ehandel/10431/'
    },
    {
      title: '10 st körlektioner',
      time: 'á 75 minuter',
      price: '14 500 kr',
      old: '15 950 kr',
      link: 'https://www.trafikskolaonline.se/sv/skola/aja/ehandel/10432/'
    },
    {
      title: 'Teorifrågor (online)',
      time: 'Teorifrågor på svenska',
      price: '500 kr',
      link: 'https://www.trafikskolaonline.se/sv/skola/aja/ehandel/10450/'
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      {/* HERO */}
      <section
        className="relative h-[70vh] pt-20 md:pt-32 flex items-center justify-center text-center text-white"
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
          <h1 className="text-4xl md:text-6xl font-extrabold mb-4">
            {data?.heroTitle}          </h1>
          <p className="text-base md:text-lg text-gray-200">
            {data?.heroSubtitle}
          </p>
        </div>
      </section>

      {/* KÖRLEKTIONER */}
      <section className="py-20 bg-muted/10">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
            {data?.lessonSectionTitle}
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {data?.lessonCards?.map((item: any, i: number) => (
              <div
                key={i}
                className="bg-card rounded-2xl p-6 shadow flex flex-col justify-between text-center"
              >
                <div>
                  <h3 className="text-lg font-semibold mb-1">
                    {item?.title}
                  </h3>

                  <p className="text-sm text-muted-foreground mb-2">
                    {item?.duration}
                  </p>

                  {item?.oldPrice && (
                    <p className="line-through text-sm text-gray-400">
                      {item?.oldPrice}
                    </p>
                  )}

                  <p className="text-2xl font-bold mb-4 text-primary">
                    {item?.price}
                  </p>

                  <p className="text-xs text-muted-foreground mb-4">
                    Aja Trafikskola
                  </p>
                </div>

                {item?.buttonLink && (
                  <a
                    href={item?.buttonLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full sm:w-24 mx-auto text-center bg-black text-white py-2 rounded-md text-sm font-semibold hover:bg-black/90 transition"
                  >
                    {item?.buttonText}
                  </a>
                )}
              </div>
            ))}
          </div>

          {/* KÖRKORTSPAKET */}
          <h2 className="text-3xl md:text-4xl font-bold text-center mt-20 mb-12">
            {data?.packageSectionTitle}
          </h2>

          <div className="max-w-5xl mx-auto grid md:grid-cols-2 gap-8">
            {data?.packageCards?.map((pkg: any, index: number) => (
              <div
                key={index}
                className="bg-card rounded-2xl p-8 shadow"
              >
                <h3 className="text-2xl font-semibold mb-6 text-primary text-center">
                  {pkg?.title}
                </h3>

                <ul className="space-y-3 mb-8">
                  {pkg?.features?.map((feature: string, i: number) => (
                    <li key={i} className="flex gap-3 text-sm">
                      <Check className="w-5 h-5 text-primary mt-0.5" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>

                <div className="flex flex-col sm:flex-row gap-3">

                  <a
                    href={pkg?.button1Link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 text-center bg-black text-white py-2 rounded-md text-sm font-semibold"
                  >
                    {pkg?.button1Text}
                  </a>

                  <a
                    href={pkg?.button2Link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 text-center border border-primary text-primary py-2 rounded-md text-sm font-semibold hover:bg-primary hover:text-white transition"
                  >
                    {pkg?.button2Text}
                  </a>
                </div>
              </div>
            ))}
          </div>



          {/* BETALNINGSMETODER */}
          <div className="max-w-3xl mx-auto mt-20 text-center">
            <h3 className="text-2xl font-bold mb-6">
              {data?.paymentTitle}
            </h3>
            <div className="space-y-4 whitespace-pre-line">
              {data?.paymentDescriptions?.map((text: string, i: number) => (
                <p
                  key={i}
                  className="text-muted-foreground"
                >
                  {text}
                </p>
              ))}
            </div>      
                </div>

          {/* Övriga Priser */}
           <h2 className="text-3xl md:text-4xl font-bold text-center mt-20 mb-12">  {data?.otherPricesTitle}</h2> 
             <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {data?.otherPrices?.map((item: any, index: number) => (
              <div
                key={index}
                className="flex justify-between items-center bg-white rounded-xl p-5 shadow-sm hover:shadow-md transition"
              >
                <div className="flex flex-col">
                  <span className="font-medium">
                    {item?.title}
                  </span>

                  {item?.oldPrice && (
                    <span className="line-through text-gray-400 text-sm">
                      {item?.oldPrice}
                    </span>
                  )}
                </div>

                <span className="font-semibold text-[#67b043]">
                  {item?.price}
                </span>
              </div>
            ))}
          </div>

          {/* CTA E-HANDEL */}
          <div className="text-center mt-12">
            <a
              href="https://www.trafikskolaonline.se/sv/skola/aja/ehandel"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block bg-primary text-white font-semibold px-8 py-4 rounded-lg hover:bg-primary/90 transition"
            >
              E-handel
            </a>
          </div>
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

export default McPrice;




