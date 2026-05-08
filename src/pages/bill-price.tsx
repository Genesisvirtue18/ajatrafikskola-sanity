// import { Check } from 'lucide-react';
// import { Link } from 'react-router-dom';
// import Navbar from '@/components/Navbar';
// import Footer from '@/components/Footer';
// import heroBg from '@/assets/im.jpg';
// import { useEffect,useState } from 'react';
// import { sanityClient } from '@/lib/sanity';
// import { createImageUrlBuilder } from '@sanity/image-url';

// const BillPrice = () => {
//   const builder = createImageUrlBuilder(sanityClient);
// const urlFor = (source: any) => builder.image(source);
//   const [data, setData] = useState<any>(null);

//   useEffect(() => {
//     window.scrollTo(0, 0);
//   }, []);



//   const lessonsCards = [
//     {
//       title: '2 st körlektioner',
//       desc: 'á 40 minuter',
//       price: '1 240 kr',
//       url: 'https://www.trafikskolaonline.se/sv/skola/aja/ehandel/10391/',
//     },
//     {
//       title: '2 st helg körlektioner',
//       desc: 'á 40 minuter',
//       price: '1 340 kr',
//       url: 'https://www.trafikskolaonline.se/sv/skola/aja/ehandel/10414/',
//     },
//     {
//       title: '6 st körlektioner',
//       desc: 'á 40 minuter',
//       price: '3 600 kr',
//       url: 'https://www.trafikskolaonline.se/sv/skola/aja/ehandel/10398/',
//     },
//     {
//       title: '10 st körlektioner',
//       desc: 'á 40 minuter',
//       price: '5 700 kr',
//       url: 'https://www.trafikskolaonline.se/sv/skola/aja/ehandel/10394/',
//     },
//     {
//       title: '20 st körlektioner',
//       desc: 'á 40 minuter',
//       price: '10 500 kr',
//       url: 'https://www.trafikskolaonline.se/sv/skola/aja/ehandel/10417/',
//     },
//     {
//       title: 'Teorifrågor (online)',
//       desc: 'Teorifrågor på svenska/engelska',
//       price: '500 kr',
//       url: 'https://www.trafikskolaonline.se/sv/skola/aja/ehandel/10402/',
//     },
//   ];

//   const packages = [
//     {
//       name: 'Aja paket 1',
//       features: [
//         '10 st körlektioner á 40 minuter',
//         'Teorifrågor (online) med obegränsade tester',
//         'Körkortsboken',
//         'Gröna körhäftet',
//       ],
//       url: 'https://www.trafikskolaonline.se/sv/skola/aja/ehandel/10400/',
//     },
//     {
//       name: 'Aja paket 2',
//       features: [
//         '20 st körlektioner á 40 minuter',
//         'Teorifrågor (online) med obegränsade tester',
//         'Körkortsboken',
//         'Gröna körhäftet',
//         'Riskutbildning del 1 (Riskettan)',
//         'Riskutbildning del 2 (Halkbana)',
//       ],
//       url: 'https://www.trafikskolaonline.se/sv/skola/aja/ehandel/10420/',
//     },
//     {
//       name: 'Intensivpaket',
//       features: [
//         '40 st körlektioner á 40 minuter',
//         'Teorifrågor (online) med obegränsade tester',
//         'Körkortsboken',
//         'Gröna körhäftet',
//         'Riskutbildning del 1 (Riskettan)',
//         'Riskutbildning del 2 (Halkbana)',
//         'Lånebil + 40 minuter uppvärmning',
//       ],
//       url: 'https://www.trafikskolaonline.se/sv/skola/aja/ehandel/10419/',
//       popular: true,
//     },
//   ];

//   const otherPrices = [
//     { item: 'Riskutbildning del 1 (Riskettan)', price: '600 kr' },
//     { item: 'Riskutbildning del 2 (Halkbana)', price: '1 900 kr' },
//     { item: 'Handledarkurs / introduktionskurs (per deltagare)', price: '399 kr' },
//     { item: 'Lånebil till körprov bokat via oss', price: '1 600 kr' },
//     { item: 'Teorifrågor (online) med obegränsade tester', price: '500 kr' },
//     { item: 'Körkortsboken', price: '450 kr' },
//     { item: 'Driving licence book', price: '600 kr' },
//     { item: 'Körhäftet', price: '200 kr' },
//     { item: 'Driving handbook', price: '250 kr' },
//     { item: 'Vägmärken / road signs', price: '75 kr' },
//   ];

//   return (
//     <div className="min-h-screen bg-background">
//       <Navbar />

//       {/* Hero */}
//       <section
//         className="relative h-[60vh] md:h-[70vh] pt-24 flex items-center justify-center text-center text-white"
//         style={{
//           backgroundImage: `url(${heroBg})`,
//           backgroundSize: 'cover',
//           backgroundPosition: 'center',
//         }}
//       >
//         <div className="absolute inset-0 bg-black/60" />
//         <div className="relative z-10 max-w-3xl px-4">
//           <h1 className="text-3xl md:text-6xl font-extrabold mb-4">
//             Priser B-körkort för personbil
//           </h1>
//           <p className="text-gray-200 text-sm md:text-base">
//             Våra aktuella priser för körlektioner och paket
//           </p>
//         </div>
//       </section>

//       <section className="py-16 md:py-20 bg-muted/10">
//         <div className="container mx-auto px-4">

//           {/* Körlektioner */}
//           <h2 className="text-2xl md:text-3xl font-bold text-center mb-8">
//             Körlektioner
//           </h2>

//           <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
//             {lessonsCards.map((card, idx) => (
//               <div
//                 key={idx}
//                 className="bg-card rounded-2xl p-6 shadow flex flex-col justify-between"
//               >
//                 <div>
//                   <h3 className="text-lg font-semibold mb-1">{card.title}</h3>
//                   <p className="text-sm text-muted-foreground mb-3">
//                     {card.desc}
//                   </p>
//                   <div className="text-xl font-bold mb-4 text-primary">{card.price}</div>
//                 </div>

//                 {card.url && (
//                   <a
//                     href={card.url}
//                     target="_blank"
//                     rel="noopener noreferrer"
//                     className="w-full sm:w-24 mx-auto text-center bg-black text-white py-2 rounded-md text-sm font-semibold hover:bg-black/90 transition"
//                   >
//                     KÖP
//                   </a>
//                 )}
//               </div>
//             ))}
//           </div>

//           {/* Körkortspaket */}
//           <h2 className="text-2xl md:text-3xl font-bold text-center my-14 ">
//             Körkortspaket
//           </h2>

//           <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
//             {packages.map((pkg, index) => (
//               <div
//                 key={index}
//                 className={`relative bg-card rounded-2xl p-6 shadow ${
//                   pkg.popular ? 'ring-2 ring-primary' : ''
//                 }`}
//               >
//                 {pkg.popular && (
//                   <span className="absolute -top-4 left-1/2 -translate-x-1/2 bg-primary text-white px-3 py-1 rounded-full text-xs">
//                     Populär
//                   </span>
//                 )}

//                 <h3 className="text-xl font-semibold text-center mb-4">
//                   {pkg.name}
//                 </h3>

//                 <ul className="space-y-2 mb-6">
//                   {pkg.features.map((f, i) => (
//                     <li key={i} className="flex gap-3 text-sm">
//                       <Check className="w-5 h-5 text-primary mt-1" />
//                       <span>{f}</span>
//                     </li>
//                   ))}
//                 </ul>

//                 <div className="flex flex-col sm:flex-row gap-3">
//                   <a
//                     href={pkg.url}
//                     target="_blank"
//                     rel="noopener noreferrer"
//                     className="flex-1 text-center bg-black text-white py-2 rounded-md text-sm font-semibold"
//                   >
//                     KÖP
//                   </a>

//                   <Link
//                     to="/inskrivningsavtal"
//                     className="flex-1 text-center border border-primary text-primary py-2 rounded-md text-sm font-semibold hover:bg-primary hover:text-white transition"
//                   >
//                     Inskrivningsavtal
//                   </Link>
//                 </div>
//               </div>
//             ))}
//           </div>

//           {/* Betalningsmetoder */}
//           <div className="mt-16 bg-card p-6 md:p-8 rounded-2xl shadow">
//             <h2 className="text-xl md:text-2xl font-bold text-center mb-4">
//               Betalningsmetoder
//             </h2>

//             <p className="text-center text-muted-foreground max-w-2xl mx-auto text-sm md:text-base">
//               Hos oss kan du betala med Swish eller betalkort, men du kan också välja
//               att delbetala din körkortsutbildning – helt räntefritt i upp till 24 månader.
//             </p>

//             <p className="text-center text-muted-foreground mt-3">
//               Vi samarbetar med Klarna, Resursbank & Qliro.
//             </p>

//             <p className="text-center text-muted-foreground mt-3">
//               Vi hjälper dig gärna att hitta den betalningslösning som passar dig bäst.
//             </p>
//           </div>

//           {/* Övriga priser */}
//           <div className="mt-12">
//             <h2 className="text-xl md:text-3xl font-bold mb-6 text-center ">
//               Övriga priser
//             </h2>

//             <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//               {otherPrices.map((item, index) => (
//                 <div
//                   key={index}
//                   className="flex justify-between items-center bg-card rounded-lg p-4 shadow-sm"
//                 >
//                   <span className="text-sm md:text-base">{item.item}</span>
//                   <span className="font-semibold text-primary">{item.price}</span>
//                 </div>
//               ))}
//             </div>
//           </div>

//           {/* CTA */}
//           <div className="mt-12 text-center">
//             <a
//               href="https://www.trafikskolaonline.se/sv/skola/aja/ehandel"
//               target="_blank"
//               rel="noopener noreferrer"
//               className="inline-block bg-primary text-white px-8 py-3 rounded-lg font-semibold w-full sm:w-auto"
//             >
//               E-handel
//             </a>
//           </div>

//         </div>
//       </section>
// {/* FINAL CTA */}
//       <section className="py-20 bg-primary text-white text-center">
//         <div className="max-w-3xl mx-auto px-6">
//           <h2 className="text-4xl font-extrabold mb-4">
//             Redo att ta ditt B-körkort?
//           </h2>
//           <p className="text-lg mb-8 text-gray-200">
//             Kontakta oss eller välj ett paket som passar dig bäst
//           </p>
//           <Link
//             to="/kontakt"
//             className="inline-block bg-white text-primary font-semibold px-8 py-4 rounded-lg hover:scale-105 transition"
//           >
//             Kontakta oss
//           </Link>
//         </div>
//       </section>
//       <Footer />
//     </div>
//   );
// };

// export default BillPrice;




import { Check } from 'lucide-react';
import { Link } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { useEffect, useState } from 'react';
import { sanityClient } from '@/lib/sanity';
import { createImageUrlBuilder } from '@sanity/image-url';

const builder = createImageUrlBuilder(sanityClient);
const urlFor = (source: any) => builder.image(source);

const BillPrice = () => {
  const [data, setData] = useState<any>(null);

  useEffect(() => {
    window.scrollTo(0, 0);

    sanityClient
      .fetch(`*[_type == "bDrivingPricesPage"][0]`)
      .then((res) => setData(res))
      .catch(console.error);
  }, []);

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      {/* HERO */}
      <section
        className="relative h-[60vh] md:h-[70vh] pt-24 flex items-center justify-center text-center text-white"
        style={{
          backgroundImage: `url(${
            data?.heroImage ? urlFor(data.heroImage).url() : ''
          })`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      >
        <div className="absolute inset-0 bg-black/60" />

        <div className="relative z-10 max-w-3xl px-4">
          <h1 className="text-3xl md:text-6xl font-extrabold mb-4">
            {data?.heroTitle}
          </h1>

          <p className="text-gray-200 text-sm md:text-base">
            {data?.heroSubtitle}
          </p>
        </div>
      </section>

      <section className="py-16 md:py-20 bg-muted/10">
        <div className="container mx-auto px-4">

          {/* LESSONS */}
          <h2 className="text-2xl md:text-3xl font-bold text-center mb-8">
            {data?.lessonSectionTitle}
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {data?.lessonCards?.map((card: any, idx: number) => (
              <div
                key={idx}
                className="bg-card rounded-2xl p-6 shadow flex flex-col justify-between"
              >
                <div>
                  <h3 className="text-lg font-semibold mb-1">
                    {card.title}
                  </h3>

                  <p className="text-sm text-muted-foreground mb-3">
                    {card.duration}
                  </p>

                  <div className="text-xl font-bold mb-4 text-primary">
                    {card.price}
                  </div>
                </div>

                {card.buttonLink && (
                  <a
                    href={card.buttonLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full sm:w-24 mx-auto text-center bg-black text-white py-2 rounded-md text-sm font-semibold hover:bg-black/90 transition"
                  >
                    {card.buttonText}
                  </a>
                )}
              </div>
            ))}
          </div>

          {/* PACKAGE SECTION */}
          <h2 className="text-2xl md:text-3xl font-bold text-center my-14">
            {data?.packageSectionTitle}
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {data?.packageCards?.map((pkg: any, index: number) => (
              <div
                key={index}
                className={`relative bg-card rounded-2xl p-6 shadow ${
                  pkg.popular ? 'ring-2 ring-primary' : ''
                }`}
              >
                {pkg.popular && (
                  <span className="absolute -top-4 left-1/2 -translate-x-1/2 bg-primary text-white px-3 py-1 rounded-full text-xs">
                    Populär
                  </span>
                )}

                <h3 className="text-xl font-semibold text-center mb-4">
                  {pkg.title}
                </h3>

                <ul className="space-y-2 mb-6">
                  {pkg.features?.map((feature: string, i: number) => (
                    <li key={i} className="flex gap-3 text-sm">
                      <Check className="w-5 h-5 text-primary mt-1" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>

                <div className="flex flex-col sm:flex-row gap-3">
                  <a
                    href={pkg.button1Link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 text-center bg-black text-white py-2 rounded-md text-sm font-semibold"
                  >
                    {pkg.button1Text}
                  </a>

                  <a
                    href={pkg.button2Link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 text-center border border-primary text-primary py-2 rounded-md text-sm font-semibold hover:bg-primary hover:text-white transition"
                  >
                    {pkg.button2Text}
                  </a>
                </div>
              </div>
            ))}
          </div>

          {/* PAYMENT SECTION */}
          <div className="mt-16 bg-card p-6 md:p-8 rounded-2xl shadow">
            <h2 className="text-xl md:text-2xl font-bold text-center mb-4">
              {data?.paymentTitle}
            </h2>

            <div className="space-y-3">
              {data?.paymentDescriptions?.map(
                (text: string, index: number) => (
                  <p
                    key={index}
                    className="text-center text-muted-foreground text-sm md:text-base"
                  >
                    {text}
                  </p>
                )
              )}
            </div>
          </div>

          {/* OTHER PRICES */}
          <div className="mt-12">
            <h2 className="text-xl md:text-3xl font-bold mb-6 text-center">
              {data?.otherPricesTitle}
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {data?.otherPrices?.map((item: any, index: number) => (
                <div
                  key={index}
                  className="flex justify-between items-center bg-card rounded-lg p-4 shadow-sm"
                >
                  <span className="text-sm md:text-base">
                    {item.title}
                  </span>

                  <span className="font-semibold text-primary">
                    {item.price}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* CTA BUTTON */}
          <div className="mt-12 text-center">
            <a
              href="https://www.trafikskolaonline.se/sv/skola/aja/ehandel"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block bg-primary text-white px-8 py-3 rounded-lg font-semibold w-full sm:w-auto"
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

export default BillPrice;