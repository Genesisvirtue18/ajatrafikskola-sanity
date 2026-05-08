// import { useState, useEffect } from 'react';
// import { MapPin, Phone, Mail, Clock, Send } from 'lucide-react';
// import { toast } from 'sonner';
// import { Helmet } from 'react-helmet-async';
// import Navbar from '@/components/Navbar';
// import Footer from '@/components/Footer';
// import { Button } from '@/components/ui/button';
// import { Input } from '@/components/ui/input';
// import { Textarea } from '@/components/ui/textarea';
// import { sanityClient } from '@/lib/sanity';
// import imageUrlBuilder from '@sanity/image-url';

// const builder = imageUrlBuilder(sanityClient);
// const urlFor = (source: any) => builder.image(source);

// const Contact = () => {

//   const [data, setData] = useState<any>(null);

//   const [formData, setFormData] = useState({
//     name: '',
//     email: '',
//     phone: '',
//     message: '',
//   });

//   const handleSubmit = (e: React.FormEvent) => {
//     e.preventDefault();
//     toast.success('Tack för ditt meddelande! Vi återkommer så snart som möjligt.');
//     setFormData({ name: '', email: '', phone: '', message: '' });
//   };

//   const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
//     setFormData({
//       ...formData,
//       [e.target.name]: e.target.value,
//     });
//   };

//   // ---------------------------
//   // FIX: ALWAYS SCROLL TO TOP
//   // ---------------------------
//   useEffect(() => {
//     window.scrollTo(0, 0);
//   }, []);

//   return (
//     <div className="min-h-screen">
//       <Helmet>
//         <title>Kontakta AJA Trafikskola | Trafikskola i Stockholm</title>
//         <meta
//           name="description"
//           content="Kontakta AJA Trafikskola i Stockholm för körlektioner, kurser och bokningar."
//         />
//         <meta name="robots" content="index, follow" />
//         <meta property="og:type" content="website" />
//         <meta property="og:title" content="Kontakta AJA Trafikskola | Trafikskola i Stockholm" />
//         <meta
//           property="og:description"
//           content="Kontakta AJA Trafikskola i Stockholm för körlektioner, kurser och bokningar."
//         />
//         <meta property="og:image" content="/logo.png" />
//       </Helmet>
//       <Navbar />


//       {/* Hero Section with Background Image */}
//       <section className="relative h-[60vh] flex items-center justify-center text-center text-white">
//         {/* Background Image */}
//         <div
//           className="absolute inset-0 bg-[url('https://www.jycircuit.net/wp-content/uploads/2022/12/contact.jpg')] bg-cover bg-center"
//           style={{
//             backgroundAttachment: "fixed", // parallax effect
//           }}
//         ></div>

//         {/* Black Overlay */}
//         <div className="absolute inset-0 bg-black/60"></div>

//         {/* Content */}
//         <div className="relative z-10 px-4">
//           <h1 className="text-5xl md:text-6xl font-bold mb-4">Kontakta oss</h1>
//           <p className="text-xl max-w-2xl mx-auto">
//             Vi finns här för att hjälpa dig — tveka inte att höra av dig!
//           </p>
//         </div>
//       </section>


//       {/* Contact Content */}
//       <section className="py-20 bg-background">
//         <div className="container mx-auto px-4">
//           <div className="grid lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
//             {/* Contact Info */}
//             <div>
//               <h2 className="text-3xl font-bold mb-8">Kontaktinformation</h2>

//               <div className="space-y-6 mb-12">
//                 <div className="flex items-start gap-4 bg-card p-6 rounded-lg shadow-lg">
//                   <MapPin className="w-6 h-6 text-primary flex-shrink-0 mt-1" />
//                   <div>
//                     <h3 className="font-semibold text-lg mb-2">Adress</h3>
//                     <p className="text-muted-foreground">
//                       Agnesbergsvägen 21 <br />
//                       424 38 Agnesberg
//                     </p>
//                   </div>
//                 </div>

//                 <div className="flex items-start gap-4 bg-card p-6 rounded-lg shadow-lg">
//                   <Phone className="w-6 h-6 text-primary flex-shrink-0 mt-1" />
//                   <div>
//                     <h3 className="font-semibold text-lg mb-2">Telefonummer</h3>
//                     <a href="tel:+46313309040" className="text-muted-foreground hover:text-primary transition-colors">
//                       031-330 90 40<br />
//                       076-911 77 90
//                     </a>
//                   </div>
//                 </div>

//                 <div className="flex items-start gap-4 bg-card p-6 rounded-lg shadow-lg">
//                   <Mail className="w-6 h-6 text-primary flex-shrink-0 mt-1" />
//                   <div>
//                     <h3 className="font-semibold text-lg mb-2">E-post</h3>
//                     <a href="mailto:Ajatrafikskola@hotmail.com" className="text-muted-foreground hover:text-primary transition-colors">
//                       Ajatrafikskola@hotmail.com
//                     </a>
//                   </div>
//                 </div>

//                 <div className="flex items-start gap-4 bg-card p-6 rounded-lg shadow-lg">
//                   <Clock className="w-6 h-6 text-primary flex-shrink-0 mt-1" />
//                   <div>
//                     <h3 className="font-semibold text-lg mb-2">Reception</h3>
//                     <div className="text-muted-foreground space-y-1">
//                       <p>Mån – Tor: 09.00 – 18.00
//                         (Lunchstängt: 12.25 – 13.25)
//                         Fredag: 09.00 – 13.00</p>

//                     </div>
//                   </div>
//                 </div>
//               </div>

//               {/* WhatsApp Button */}
//               {/* <a
//                 href="https://wa.me/46123456789"
//                 target="_blank"
//                 rel="noopener noreferrer"
//                 className="inline-flex items-center gap-2 px-6 py-3 bg-[#25D366] text-white rounded-full font-semibold hover:bg-[#20BA5A] transition-all"
//               >
//                 <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
//                   <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
//                 </svg>
//                 Chatta med oss på WhatsApp
//               </a> */}
//             </div>

//             {/* Contact Form */}
//             <div className="bg-card p-8 rounded-lg shadow-lg">
//               <h2 className="text-3xl font-bold mb-6">Skicka ett meddelande</h2>
//               <form onSubmit={handleSubmit} className="space-y-6">
//                 <div>
//                   <label htmlFor="name" className="block text-sm font-medium mb-2">
//                     Namn *
//                   </label>
//                   <Input
//                     id="name"
//                     name="name"
//                     type="text"
//                     required
//                     value={formData.name}
//                     onChange={handleChange}
//                     placeholder="Ditt namn"
//                     className="w-full"
//                   />
//                 </div>

//                 <div>
//                   <label htmlFor="email" className="block text-sm font-medium mb-2">
//                     E-post *
//                   </label>
//                   <Input
//                     id="email"
//                     name="email"
//                     type="email"
//                     required
//                     value={formData.email}
//                     onChange={handleChange}
//                     placeholder="epost@exempel.se"
//                     className="w-full"
//                   />
//                 </div>

//                 <div>
//                   <label htmlFor="phone" className="block text-sm font-medium mb-2">
//                     Telefonummer
//                   </label>
//                   <Input
//                     id="phone"
//                     name="phone"
//                     type="tel"
//                     value={formData.phone}
//                     onChange={handleChange}
//                     placeholder=" 070-000 00 00"
//                     className="w-full"
//                   />
//                 </div>

//                 <div>
//                   <label htmlFor="message" className="block text-sm font-medium mb-2">
//                     Meddelande *
//                   </label>
//                   <Textarea
//                     id="message"
//                     name="message"
//                     required
//                     value={formData.message}
//                     onChange={handleChange}
//                     placeholder="Skriv ditt meddelande här..."
//                     rows={6}
//                     className="w-full"
//                   />
//                 </div>

//                 <Button
//                   type="submit"
//                   className="w-full bg-primary text-primary-foreground hover:bg-primary/90 hover-green-glow py-6 text-lg"
//                 >
//                   <Send className="w-5 h-5 mr-2" />
//                   Skicka meddelande
//                 </Button>
//               </form>
//             </div>
//           </div>

//           {/* Map */}
//           <div className="mt-16 max-w-6xl mx-auto">
//             <h2 className="text-3xl font-bold mb-6 text-center">Hitta till oss</h2>
//             <div className="bg-card rounded-lg shadow-lg overflow-hidden h-96">
//               <iframe
//                 src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2126.705227211089!2d12.011409776547685!3d57.78938083332097!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x464ff5701f824d1b%3A0xeb8a18b4c8b1f8a2!2sAgnesbergsv%C3%A4gen%2021%2C%20424%2038%20Agnesberg%2C%20Sweden!5e0!3m2!1sen!2sin!4v1760730561934!5m2!1sen!2sin"
//                 width="100%"
//                 height="100%"
//                 style={{ border: 0 }}
//                 allowFullScreen
//                 loading="lazy"
//                 referrerPolicy="no-referrer-when-downgrade"
//                 title="AJA Trafikskola Location"
//               ></iframe>
//             </div>
//           </div>
//         </div>
//       </section>

//       <Footer />
//     </div>
//   );
// };

// export default Contact;

import { useState, useEffect } from 'react';
import { MapPin, Phone, Mail, Clock, Send } from 'lucide-react';
import { toast } from 'sonner';
import { Helmet } from 'react-helmet-async';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';

import { sanityClient } from '@/lib/sanity';
import imageUrlBuilder from '@sanity/image-url';

const builder = imageUrlBuilder(sanityClient);
const urlFor = (source: any) => builder.image(source);

const Contact = () => {

  const [data, setData] = useState<any>(null);

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: '',
  });

  useEffect(() => {
    window.scrollTo(0, 0);

    sanityClient
      .fetch(`*[_type == "contactPage"][0]`)
      .then((res) => setData(res))
      .catch(console.error);

  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    toast.success(
      'Tack för ditt meddelande! Vi återkommer så snart som möjligt.'
    );

    setFormData({
      name: '',
      email: '',
      phone: '',
      message: '',
    });
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const getIcon = (type: string) => {
    switch (type) {
      case 'address':
        return <MapPin className="w-6 h-6 text-primary flex-shrink-0 mt-1" />;

      case 'phone':
        return <Phone className="w-6 h-6 text-primary flex-shrink-0 mt-1" />;

      case 'email':
        return <Mail className="w-6 h-6 text-primary flex-shrink-0 mt-1" />;

      case 'reception':
        return <Clock className="w-6 h-6 text-primary flex-shrink-0 mt-1" />;

      default:
        return null;
    }
  };

  const getHeading = (type: string) => {
    switch (type) {
      case 'address':
        return 'Adress';

      case 'phone':
        return 'Telefonnummer';

      case 'email':
        return 'E-post';

      case 'reception':
        return 'Reception';

      default:
        return '';
    }
  };

  return (
    <div className="min-h-screen">

      <Helmet>
        <title>Kontakta oss | AJA Trafikskola</title>
      </Helmet>

      <Navbar />

      {/* HERO SECTION */}
      <section className="relative h-[60vh] flex items-center justify-center text-center text-white">

        {/* BACKGROUND IMAGE */}
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: data?.heroImage
              ? `url(${urlFor(data.heroImage).url()})`
              : 'none',
            backgroundAttachment: 'fixed',
          }}
        />

        {/* OVERLAY */}
        <div className="absolute inset-0 bg-black/60" />

        {/* CONTENT */}
        <div className="relative z-10 px-4">
          <h1 className="text-5xl md:text-6xl font-bold mb-4">
            {data?.heroTitle}
          </h1>

          <p className="text-xl max-w-2xl mx-auto">
            {data?.heroSubtitle}
          </p>
        </div>
      </section>

      {/* CONTACT CONTENT */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4">

          <div className="grid lg:grid-cols-2 gap-12 max-w-6xl mx-auto">

            {/* LEFT SIDE */}
            <div>

              <h2 className="text-3xl font-bold mb-8">
                {data?.contactInfoTitle}
              </h2>

              <div className="space-y-6 mb-12">

                {data?.contactCards?.map((card: any, index: number) => (

                  <div
                    key={index}
                    className="flex items-start gap-4 bg-card p-6 rounded-lg shadow-lg"
                  >

                    {getIcon(card?.type)}

                    <div>

                      <h3 className="font-semibold text-lg mb-2">
                        {getHeading(card?.type)}
                      </h3>

                      <div className="text-muted-foreground space-y-1">

                        {card?.content?.map(
                          (item: string, i: number) => (
                            <p key={i}>{item}</p>
                          )
                        )}

                      </div>

                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* CONTACT FORM */}
            <div className="bg-card p-8 rounded-lg shadow-lg">

              <h2 className="text-3xl font-bold mb-6">
                Skicka ett meddelande
              </h2>

              <form onSubmit={handleSubmit} className="space-y-6">

                <div>
                  <label className="block text-sm font-medium mb-2">
                    Namn *
                  </label>

                  <Input
                    name="name"
                    type="text"
                    required
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Ditt namn"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">
                    E-post *
                  </label>

                  <Input
                    name="email"
                    type="email"
                    required
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="epost@exempel.se"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">
                    Telefonnummer
                  </label>

                  <Input
                    name="phone"
                    type="tel"
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder="070-000 00 00"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">
                    Meddelande *
                  </label>

                  <Textarea
                    name="message"
                    required
                    value={formData.message}
                    onChange={handleChange}
                    placeholder="Skriv ditt meddelande här..."
                    rows={6}
                  />
                </div>

                <Button
                  type="submit"
                  className="w-full bg-primary hover:bg-primary/90 py-6 text-lg"
                >
                  <Send className="w-5 h-5 mr-2" />
                  Skicka meddelande
                </Button>

              </form>
            </div>
          </div>

          {/* MAP SECTION */}
          <div className="mt-16 max-w-6xl mx-auto">

            <h2 className="text-3xl font-bold mb-6 text-center">
              {data?.mapSectionTitle}
            </h2>

            <div className="bg-card rounded-lg shadow-lg overflow-hidden h-96">

              <iframe
                src={data?.googleMapEmbedUrl}
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="AJA Trafikskola Location"
              />

            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Contact;
