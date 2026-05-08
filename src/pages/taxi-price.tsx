import { Link } from 'react-router-dom';
import { Check } from 'lucide-react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import heroBg from '@/assets/taxi-img.jpg'; // Use same hero background
import { useEffect,useState } from 'react';
import { sanityClient } from '@/lib/sanity';

import { createImageUrlBuilder } from '@sanity/image-url';

const builder = createImageUrlBuilder(sanityClient);
const urlFor = (source: any) => builder.image(source);

const TaxiPrice = () => {
  const [data, setData] = useState<any>(null);
useEffect(() => {
  window.scrollTo(0, 0);

  sanityClient
    .fetch(`*[_type == "taxiDriverLicensePricingPage"][0]`)
    .then((res) => setData(res))
    .catch(console.error);

}, []);

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      {/* Hero Section */}
      <section
        className="relative h-[70vh] pt-20 md:pt-32 flex items-center justify-center text-center text-white overflow-hidden"
        style={{
            backgroundImage: data?.heroImage
            ? `url(${urlFor(data.heroImage).url()})`
            : 'none',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      >
        <div className="absolute inset-0 bg-black/60 z-0" aria-hidden="true"></div>
        <div className="relative z-10 max-w-3xl px-6">
          <h1 className="text-4xl md:text-6xl font-extrabold mb-4">
             {data?.heroTitle}
          </h1>
          <p className="text-base md:text-lg text-gray-200">
 {data?.heroSubtitle}
          </p>
        </div>
      </section>

      {/* Taxi Prices Section */}
      <section className="py-20 bg-muted/10">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-10">
             {data?.pricingSectionTitle}
          </h2>

          <div className="max-w-md mx-auto bg-card rounded-2xl p-8 shadow-lg text-center">
             {data?.pricingCards?.map((card: any, index: number) => (
              <div
                key={index}
                className={`bg-card rounded-2xl p-8 shadow-lg text-center relative transition-all duration-300 hover:shadow-2xl ${card?.popular
                    ? 'border-2 border-primary scale-105'
                    : ''
                  }`}
              >
                {card?.popular && (
                  <span className="absolute top-4 right-4 bg-primary text-white text-xs px-3 py-1 rounded-full">
                    Populär
                  </span>
                )}

                <h3 className="text-2xl font-semibold mb-2">
                  {card?.title}
                </h3>

                <p className="text-base text-muted-foreground mb-4">
                  {card?.duration}
                </p>

                <p className="text-4xl font-bold text-primary mb-6">
                  {card?.price}
                </p>

                <ul className="space-y-3 text-left text-muted-foreground">
                  {card?.features?.map((feature: string, i: number) => (
                    <li
                      key={i}
                      className="flex items-start gap-2"
                    >
                      <Check className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />

                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}

          </div>


          {/* Info Text */}
          <div className="max-w-3xl mx-auto mt-12 text-center text-muted-foreground">
            <p>
              {data?.bottomDescription}
                          </p>
          </div>
        </div>
      </section>

      {/* ✅ CTA Section */}
      <section className="py-20 bg-primary text-white text-center ">

        <div className="relative z-10 max-w-3xl mx-auto px-6">
          <h2 className="text-4xl font-extrabold mb-4"> {data?.ctaTitle}</h2>
          <p className="text-lg mb-8 text-gray-200">
            {data?.ctaSubtitle}
          </p>
          <Link
            to="/kontakt"
            className="inline-block bg-white text-primary font-semibold px-8 py-4 rounded-lg shadow-md hover:scale-105 hover:bg-gray-100 transition-transform duration-300"
          >
            Kontakta oss
          </Link>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default TaxiPrice;




