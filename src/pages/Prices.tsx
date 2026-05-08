import { Check } from 'lucide-react';
import { Link } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { useEffect,useState } from 'react';
import { sanityClient } from '@/lib/sanity';
import { createImageUrlBuilder } from '@sanity/image-url';

const builder = createImageUrlBuilder(sanityClient);
const urlFor = (source: any) => builder.image(source);


const Prices = () => {
    const [data, setData] = useState<any>(null);

    useEffect(() => {
    window.scrollTo(0, 0);

    sanityClient
      .fetch(`*[_type == "generalPricingPage"][0]`)
      .then((res) => setData(res))
      .catch(console.error);

  }, []);

  const packages = [
    {
      name: 'Körlektion Bil',
      price: '595',
      unit: 'kr/lektion',
      features: [
        '40 minuters körlektion',
        'Erfaren trafiklärare',
        'Modernt fordon',
        'Flexibla tider',
        'Upphämtning ingår',
      ],
      popular: false,
    },
    {
      name: 'RISK 1 Bil',
      price: '600 kr',
      unit: '',
      features: [
        '3.5 timmar utbildning',
        'Max 12 deltagare',
        'Gruppövningar',
        'Certifikat ingår',
        'Fika inkluderat',
      ],
      popular: false,
    },
    {
      name: 'RISK 1 & 2 Bil',
      price: '2500 kr',
      unit: '',
      features: [
        '7 timmar utbildning',
        'Praktiska och teoretiska moment',
        'Simulatorträning',
        'Certifikat ingår',
        'Lunch inkluderad',
      ],
      popular: true,
    },
    {
      name: 'RISK 1 MC',
      price: '699 kr',
      oldPrice: '900 kr',
      unit: '',
      features: [
        '3.5 timmar utbildning',
        'MC-specifik säkerhet',
        'Gruppdiskussioner',
        'Certifikat ingår',
        'Fika inkluderat',
      ],
      popular: false,
    },
    {
      name: 'RISK 2 MC',
      price: '3300 kr',
      unit: '',
      features: [
        '3.5 timmar utbildning',
        'Praktisk MC-träning',
        'Bromstekniker',
        'Certifikat ingår',
        'Lunch inkluderad',
      ],
      popular: false,
    },
    {
      name: 'Handledarkurs',
      price: '399 kr (per deltagare)',
      unit: '',
      features: [
        '3.5 timmar kurs',
        'Pedagogisk utbildning',
        'Kursmaterial ingår',
        'Handledarintyg',
        'Giltigt i 5 år',
      ],
      popular: false,
    },
  ];

  return (
    <div className="min-h-screen">
      <Navbar />

      {/* Hero */}
      <section className="pt-32 pb-20 bg-gradient-to-br from-secondary to-secondary/80 text-white">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-5xl md:text-6xl font-bold mb-6">  {data?.heroTitle}</h1>
          <p className="text-xl max-w-2xl mx-auto">
            {data?.heroSubtitle}
          </p>
        </div>
      </section>

      {/* Pricing Cards */}
       <section className="py-20 bg-background">
        <div className="container mx-auto px-4">

          {data?.pricingSectionTitle && (
            <h2 className="text-4xl font-bold text-center mb-14">
              {data?.pricingSectionTitle}
            </h2>
          )}

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">

            {data?.pricingCards?.map((card: any, index: number) => (
              <div
                key={index}
                className={`relative bg-card rounded-2xl p-8 shadow-lg transition-all duration-300 hover:-translate-y-2 ${
                  card?.popular ? 'ring-2 ring-primary' : ''
                }`}
              >

                {/* POPULAR BADGE */}
                {card?.popular && (
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-primary text-white px-4 py-1 rounded-full text-sm font-semibold">
                    Populär
                  </div>
                )}

                {/* TITLE */}
                <h3 className="text-2xl font-bold mb-4">
                  {card?.title}
                </h3>

                {/* PRICE */}
                <div className="mb-6">

                  {card?.oldPrice && (
                    <span className="line-through text-muted-foreground mr-2">
                      {card?.oldPrice}
                    </span>
                  )}

                  <span className="text-4xl font-bold text-primary">
                    {card?.price}
                  </span>
                </div>

                {/* FEATURES */}
                <ul className="space-y-3 mb-8">
                  {card?.features?.map((feature: string, i: number) => (
                    <li key={i} className="flex items-start gap-2">
                      <Check className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />

                      <span className="text-gray-700">
                        {feature}
                      </span>
                    </li>
                  ))}
                </ul>

                {/* BUTTON */}
                {card?.buttonText && (
                  <a
                    href={card?.buttonLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`block text-center py-3 px-6 rounded-full font-semibold transition-all ${
                      card?.popular
                        ? 'bg-primary text-white hover:bg-primary/90'
                        : 'bg-secondary text-white hover:bg-secondary/90'
                    }`}
                  >
                    {card?.buttonText}
                  </a>
                )}
              </div>
            ))}

          </div>
        </div>
      </section>


      <Footer />
    </div>
  );
};

export default Prices;

