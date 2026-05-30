import { useEffect, useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { sanityClient } from "@/lib/sanity";
import { createImageUrlBuilder } from "@sanity/image-url";
import { PortableText } from "@portabletext/react";

const builder = createImageUrlBuilder(sanityClient);
const urlFor = (source) => builder.image(source);

const Inskrivningsavtal = () => {
  const [data, setData] = useState(null);

  useEffect(() => {
    window.scrollTo(0, 0);

    sanityClient
      .fetch(`*[_type == "privacyPolicyAgreementPage"][0]`)
      .then((res) => setData(res))
      .catch(console.error);
  }, []);

  return (
    <>
      <Navbar />

      {/* HERO */}
      {/* HERO */}
      <section className="relative h-[45vh] flex items-center justify-center text-center text-white">
        <div
          className="absolute inset-0 bg-center bg-cover"
          style={{
            backgroundImage: data?.heroImage
              ? `url(${urlFor(data.heroImage).url()})`
              : "none",
            backgroundAttachment: "fixed",
          }}
        />

        <div className="absolute inset-0 bg-black/60" />

        <div className="relative z-10 px-4">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            {data?.heroTitle}
          </h1>

          <p className="text-xl max-w-2xl mx-auto">
            {data?.heroSubtitle}
          </p>
        </div>
      </section>

      {/* CONTENT */}
      <section className="py-12 md:py-16 bg-background">
        <div className="container mx-auto px-4 max-w-4xl space-y-20 text-gray-700 leading-8 text-base md:text-lg">
          <br />
          {data?.policySections?.map((section, index) => (
            <div
              key={index}
              className="space-y-6 mb-20 text-gray-700 leading-8 text-base md:text-lg"
            >

              {/* TITLE */}
              <h2 className="text-xl md:text-2xl font-semibold text-primary uppercase">
                {section?.title}
              </h2>

              {/* DESCRIPTION */}
              {section?.description && (
                <div className="space-y-4">
                  <PortableText value={section.description} />
                </div>
              )}

              {/* SUB HEADING */}
              {section?.subHeading && (
                <h3 className="text-lg md:text-xl">
                  {section.subHeading}
                </h3>
              )}

              {/* BULLET POINTS */}
              {section?.bulletPoints && (
                <div
                  className="
    max-w-none
    text-lg
    leading-8
    text-gray-700
  "
                >
                  <PortableText
                    value={section.bulletPoints}
                    components={{
                      list: {
                        bullet: ({ children }) => (
                          <ul className="list-disc pl-8 space-y-6">
                            {children}
                          </ul>
                        ),
                      },

                      listItem: {
                        bullet: ({ children }) => (
                          <li className="text-black text-xl leading-9">
                            {children}
                          </li>
                        ),
                      },

                      block: {
                        normal: ({ children }) => (
                          <p className="text-lg leading-9 text-gray-700 mt-3">
                            {children}
                          </p>
                        ),
                      },

                      marks: {
                        strong: ({ children }) => (
                          <strong className="font-bold text-black">
                            {children}
                          </strong>
                        ),
                      },
                    }}
                  />
                </div>
              )}

            </div>
          ))}


          {/* <Block title="INLEDNING">
            Den 25:e maj 2018 infördes dataskyddslagstiftningen GDPR, som är framtagen för att skydda dig som privatperson. Det är viktigt för oss att de personuppgifter som samlas in om dig lagras och behandlas på ett säkert sätt och i enlighet med gällande lagstiftning. Denna integritetspolicy förklarar hur vi på Aja Trafikskola AB behandlar dina personuppgifter. Policyn gäller för dig som skriver in dig som kund hos oss, använder våra tjänster, besöker vår webbplats, använder våra formulär eller på annat sätt är i kontakt med oss.
          </Block>
          <br />
          <br />
          <Block title="VILKA PERSONUPPGIFTER SAMLAR VI IN OM DIG?">
            Personuppgifter samlas in direkt eller indirekt från dig, när du anmäler dig till en utbildning hos oss, skapar ett konto, kontaktar oss via e-post, webbformulär eller telefon. Dina adressuppgifter uppdaterar vi automatiskt från folkbokföringsregistret.
            <br />
            <br />
            <ul className="list-disc pl-6 space-y-2 font-bold">
              <li>Namn, adress, telefonnummer</li>
              <li>Personnummer</li>
              <li>E-postadress</li>
              <li>Användarinformation som du väljer att lämna till oss</li>
            </ul>

          </Block>
          <br />
          <br />

          <Block title="FÖR VILKA ÄNDAMÅL ANVÄNDER VI DINA PERSONUPPGIFTER?">
            Ändamålet med behandlingen av dina personuppgifter är för att säkerhetsställa vem du är, administrera din utbildning och kunna kontakta dig. Vi är skyldiga att rapportera viss genomförd utbildning till Transportstyrelsen och för bokning av till exempel förarprov behöver vi dela information med Trafikverket.
            <br />
            <br />
            Den information vi samlar in från dig använder vi i synnerhet till:
            <br />
            <br />
            <ul className="list-disc pl-6 space-y-2 font-bold ">
              <li>Kontakta dig via e-post eller telefonnummer som du angett i kontaktformulär.</li>
              <li>Skriva in dig på våra kurser och utbildningar i Trafikskola Online.</li>
              <li>Uppfylla Transportstyrelsens krav på att föra elevregister och utbildningskort.</li>
              <li>Rapportera in uppgifter om kurser till Transportstyrelsen.</li>
              <li>Anmäla dig till trafikverket för förarprov och teoriprov.</li>
              <li>Ekonomisk administration.</li>
            </ul>
          </Block>
          <br />
          <br />

          <Block title="HUR LÄNGE SPARAR VI DINA PERSONUPPGIFTER?">
            Vi behandlar och lagrar dina personuppgifter endast så länge som det krävs för att vi ska kunna administrera tjänster och utbildningar för dig, eller så länge som vi behöver enligt lag.
          </Block>
          <br />
          <br />

          <Block title="HUR SKYDDAR VI DINA PERSONUPPGIFTER?">
            Endast personal som ska uträtta en specifik uppgift, till exempel bokning av kurser, körlektioner eller hantering av fakturor, får tillgång till din personliga information.
          </Block>
          <br />
          <br />

          <Block title="DINA RÄTTIGHETER">

            <ul className="list-disc pl-6 space-y-2font-semibold">
              <li>INFORMATION OM VILKA PERSONUPPGIFTER VI HAR OM DIG</li>
              <p> Du har rätt till att få information om vilka personuppgifter vi har sparade om dig. Om du har tillgång till Trafikskola Online kan du själv ta ut en rapport om vilka uppgifter vi har sparat om dig.</p>
              <br />
              <br />
              <li>RÄTTELSE AV PERSONUPPGIFTER</li>
              <p> Du har rätt att begära att felaktiga uppgifter om dig rättas till.</p>
              <br />
              <br />
              <li>RADERING AV PERSONUPPGIFTER</li>
              <p>Du har rätt att begära att dina personuppgifter ska raderas om du anser att det saknas rättslig grund för behandling av personuppgifter eller om det saknas skäl för fortsatt behandling av dina personuppgifter.
                Vi kan vara tvungna att behålla dina personuppgifter om det behövs för att uppfylla rättsliga förpliktelser enligt lag (till exempel bokföringslagen).</p>
            </ul>
          </Block>
          <br />
          <br />

          <Block title="UPPTAGNING OCH PUBLICERING AV LJUD, BILD OCH FILM">
            Vi dokumenterar regelbundet vår verksamhet genom upptagning av ljud, bild och film. Det kan därför förekomma fotografering och/eller upptagning av ljud eller film inom Aja Trafikskolas verksamhet. Upptaget material kan distribueras till utbildningsdeltagare för att ge möjlighet att i efterhand återge en utbildning. Upptaget material kan också användas i informations- och marknadsföringssyfte genom publicering, till exempel i trycksaker, på Aja Trafikskolas hemsida och i sociala medier. Aja Trafikskola kan inte hållas ansvarig för om andra deltagare genomför upptagning av bild, film eller ljud vid distansutbildning via digitala verktyg.
          </Block>
          <br />
          <br />

          <Block title="Priser och Betalning">
            Aktuella priser hittar du på vår webbplats. Priserna kan komma att ändras under utbildningens gång, det påverkar dock inte redan betalda paket. På Aja tar vi förskottsbetalning och du kan betala med bankkort, kontant och Swish. Vi erbjuder även delbetalning via Klarna och Resursbanken.
            <br />
            <br />
            Om eleven väljer att bryta sitt paket och avbryta sin utbildning, förbehåller Aja Trafikskola AB sig rätten att ta ut en avgift på 10 % för återstående körlektioner i administrativa avgifter, notera att eventuella rabatter samt kostnad för teori online ej betalas tillbaka.
          </Block>
          <br />
          <br />

          <Block title="Fakturering">
            Aja Trafikskola AB tillämpar fakturabetalning till företag för de produkter och tjänster som kunden köper och som inte betalas vid kurs eller köptillfället. Fakturan skickas till den adress som kunden uppgett vid inskrivningen. Det är upp till kunden att informera om förändrade adressuppgifter. Betalningsvillkor är 10 dagar.
          </Block>
          <br />
          <br />

          <Block title="Avbokningsregler">
            Avbokning och återbud kan lämnas i första hand via telefon men du kan även avboka dina tider själv på Trafikskola Online med hjälp av dina inloggningsuppgifter, notera att avbokningar och bokningar via telefon måste kontrolleras via Trafikskolaonline.se av eleven. För avbokning av körlektion, avboka senast kl.12.00 helgfri vardag innan din bokade körlektion. Om du blivit akut sjuk debiteras din bokning men krediteras vid uppvisande av läkarintyg från läkare inom en (1) vecka. Notera att eleven inte kan lämna sjukintyg för flera lektioner i rad utan måste avboka framåt tills tillfrisknande. Vid akut sjukdom skall en sjukanmälan till trafikskolan per telefon upprättas. Kan intyg visas blir du som elev således inte debiterings skyldig för lektionen som missats pga. sjukdom. Notera att om man som elev har vetskap om långvarig sjukdom/skada, måste man avboka samtliga lektioner som man har inbokat framöver, detta ansvarar du som elev själv för.
          </Block>
          <br />
          <br />

          <Block title="Kontakt med statliga myndigheter">
            Notera att Aja Trafikskola AB inte är en del av den statliga sektorn som driver Transportstyrelsen och Trafikverket. Eleven ansvarar således själv för att ta del av regler som sköts av den statliga sektorn och att man uppfyllt deras villkor inför övningskörning och prov.
          </Block>
          <br />
          <br />

          <Block title="Upphovsrätt och nyttjanderätt">
            Allt material är skyddat av lagen om upphovsrätt.
          </Block>
          <br />
          <br />

          <Block title="Friskrivning från ansvar">
            Aja Trafikskola AB tar inte ansvar för avgifter som kan tillkomma vid påminnelse eller inkassokrav om kunden ej uppgett rätt adress eller uppdaterat oss med rätt uppgifter.
          </Block>
          <br />
          <br />

          <Block title="Vid eventuell tvist">
            Kommer Aja Trafikskola AB göra allt för att du som kund skall bli nöjd. Skulle vi misslyckas med detta skall du som kund i första hand vända dig till trafikskolans huvudkontor på Agnesbergsvägen 21, 42438 Agnesberg.
          </Block>
          <br />
          <br />

          <Block title="Acceptera avtalsvillkor">
            Genom att skriva in dig på Aja Trafikskola AB blir du kund och användare av våra tjänster och accepterar därmed dessa avtalsvillkor.
          </Block>
          <br />
          <br />

          <Block title="Personligt konto via Trafikskola Online">
            Ditt konto är personligt. Inloggning och lösenord skall användas av dig, du har själv ansvar för att skydda detta. Aja Trafikskola AB är inte ansvariga för eventuell skada som uppstått om någon annan utomstående loggar in och använder ditt konto. Som kund har du tillgång till Trafikskola Online och dess tjänster under hela din utbildning och ansvarar själv för att hålla reda på dina på- och avbokningar. Aja Trafikskola AB förbehåller sig rätten att stänga av kontot vid missbruk av tjänsten.
          </Block>
          <br />
          <br />

          <Block title="FÖRÄNDRING I VÅR INTEGRITETSPOLICY">
            Vi kan i framtiden behöva göra ändringar i vår integritetspolicy. Det är därför viktigt att du regelbundet kontrollerar den senaste versionen av denna policy på vår webbplats. Om vi ändrar denna integritetspolicy på ett sätt som påverkar hur vi använder dina personuppgifter kommer vi att underrätta dig om vilka åtgärder du kan vidta till följd av dessa ändringar.
          </Block>
          <br />
          <br />

          <Block title="KONTAKTA OSS">
            Har du frågor eller synpunkter om vår policy eller vår hantering av dina personuppgifter är du välkommen att kontakta oss. Du kan även kontakta Integritetsskyddsmyndigheten för mer information om GDPR , www.imy.se
            <br />
            <br />
            Aja Trafikskola AB
            Telefon:{" "}
            <a href="tel:0313309040" className="text-primary font-semibold">
              031 330 90 40
            </a>
            <br />
            E-post:{" "}
            <a
              href="mailto:Ajatrafikskola@hotmail.com"
              className="text-primary font-semibold"
            >
              Ajatrafikskola@hotmail.com
            </a>
            <br />
            Mer info:{" "}
            <a
              href="https://www.imy.se"
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary font-semibold"
            >
              www.imy.se
            </a>
          </Block> */}
        </div>
      </section>
      <br />
      <Footer />
    </>
  );
};

/* Reusable block */
const Block = ({ title, children }) => (
  <div className="space-y-6">
    <h2 className="text-xl md:text-2xl font-semibold text-primary">
      {title}
    </h2>
    <div className="space-y-4">{children}</div>
  </div>
);


export default Inskrivningsavtal;

