import { Check } from 'lucide-react';
import { Link } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import heroBg from '@/assets/moped1.jpg';
import { useEffect,useState } from 'react';
import { sanityClient } from '@/lib/sanity';
import { createImageUrlBuilder } from '@sanity/image-url';

const builder = createImageUrlBuilder(sanityClient);
const urlFor = (source: any) => builder.image(source);


const MopedPrice = () => {
    const [data, setData] = useState<any>(null);

  useEffect(() => {
    window.scrollTo(0, 0);

    sanityClient
      .fetch(`*[_type == "mopedLicensePricingPage"][0]`)
      .then((res) => setData(res))
      .catch(console.error);
  }, []);

  const packageMoped = {
    name: 'Mopedkurs',
    oldPrice: '4 995',
    price: '3 995 Kr',
  
    features: [
      '4 timmars övningskörning',
      '8 timmars teoriutbildning',
      'Teorifrågor (online) med obegränsade tester',
      'Bokpaket',
      'Lån av utrustning',
    ],
  };

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

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
            {data?.heroTitle}
          </h1>
          <p className="text-base md:text-lg text-gray-200">
              {data?.heroSubtitle}
          </p>
        </div>
      </section>

      {/* PACKAGE */}
      <section className="py-20 bg-muted/10">
        <div className="container mx-auto px-4">

          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
             {data?.courseSectionTitle}
          </h2>

          {/* CENTERED CARD */}
           <div className="max-w-xl mx-auto bg-card rounded-2xl p-8 shadow-lg text-center">

            <h3 className="text-2xl font-semibold mb-3 text-primary">
              {data?.courseCard?.title}
            </h3>

            <div className="mb-6">

              {data?.courseCard?.oldPrice && (
                <p className="line-through text-muted-foreground text-sm mb-1">
                  {data?.courseCard?.oldPrice}
                </p>
              )}

              <p className="text-4xl font-bold text-primary">
                {data?.courseCard?.price}
              </p>
            </div>

            {/* FEATURES */}
            <ul className="space-y-3 text-left text-muted-foreground mb-8">
              {data?.courseCard?.features?.map(
                (feature: string, index: number) => (
                  <li key={index} className="flex items-start gap-3">
                    <Check className="w-5 h-5 text-primary mt-1" />
                    <span>{feature}</span>
                  </li>
                )
              )}
            </ul>

            {/* BUTTONS */}
            <div className="flex justify-center gap-4 flex-wrap">

              {data?.courseCard?.button1Text && (
                <a
                  href={data?.courseCard?.button1Link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-32 bg-black text-white py-2 rounded-md text-sm font-semibold hover:bg-black/90 transition"
                >
                  {data?.courseCard?.button1Text}
                </a>
              )}

              {data?.courseCard?.button2Text && (
                <a
                  href={data?.courseCard?.button2Link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-40 text-center border border-primary text-primary py-2 rounded-md text-sm font-semibold hover:bg-primary hover:text-white transition"
                >
                  {data?.courseCard?.button2Text}
                </a>
              )}
            </div>

            {/* EXTRA INFO */}
            <div className="mt-8 text-sm text-muted-foreground leading-relaxed">

              {data?.courseCard?.bottomText && (
                <p className="mb-2">
                  {data?.courseCard?.bottomText}
                </p>
              )}

              {data?.courseCard?.extraPriceText && (
                <p className="font-semibold">
                  {data?.courseCard?.extraPriceText}
                </p>
              )}
            </div>
          </div>

          {/* PAYMENT METHODS */}
          <div className="max-w-3xl mx-auto mt-16 text-center">
            <h3 className="text-2xl font-bold mb-6">
               {data?.paymentTitle}
            </h3>

           <div className="space-y-4 whitespace-pre-line">
              {data?.paymentDescriptions?.map(
                (text: string, index: number) => (
                  <p
                    key={index}
                    className="text-muted-foreground"
                  >
                    {text}
                  </p>
                )
              )}
            </div>
          </div>

        </div>
      </section>

      {/* CTA */}
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

export default MopedPrice;




