import { Link } from "react-router-dom";
import { Facebook, Instagram, Phone, Mail, MapPin } from "lucide-react";
import ajaLogo from "@/assets/logo-white.png";
import footerBg from "@/assets/footer-bg.webp";
import tiktokIcon from "@/assets/tiktok.png";

const Footer = () => {
  return (
    <footer className="relative bg-secondary/95 text-white overflow-hidden">
      {/* Background */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: `url(${footerBg})` }}
      ></div>
      <div className="absolute inset-0 bg-black/85"></div>

      <div className="relative container mx-auto px-6 py-16">

        {/* GRID */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12">

          {/* COLUMN 1 – RECEPTION */}
          <div>
            <img
              src={ajaLogo}
              alt="AJA Trafikskola"
              className="h-20 mb-6 brightness-110"
            />

            <h3 className="text-lg font-semibold mb-4">Reception</h3>

            <ul className="space-y-3 text-gray-300 text-sm">
              <li className="font-medium text-white">November – mars</li>
              <li>Mån – tor: 09.00 – 17.00</li>
              <li>Fre: 09.00 – 13.00</li>

              <li className="pt-3 font-medium text-white">April – oktober</li>
              <li>Mån – tor: 09.00 – 18.00</li>
              <li className="text-xs text-gray-400">
                Lunchstängt: 12.20 – 13.10
              </li>
              <li>Fre: 09.00 – 13.00</li>
            </ul>
          </div>

          {/* COLUMN 2 – KÖRLEKTIONER + ADRESS */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Körlektioner</h3>
            <ul className="space-y-2 text-gray-300 text-sm">
              <li>Mån – Fre: 08.00 – 17.50</li>
              <li>Lör – Sön: 08.30 – 16.15</li>
            </ul>

            <h3 className="text-lg font-semibold mt-8 mb-4">Adress</h3>
<a
  href="https://www.google.com/maps/search/?api=1&query=Agnesbergsvägen+21,+424+38+Agnesberg"
  target="_blank"
  rel="noopener noreferrer"
  className="flex items-start gap-2 text-gray-300 text-sm leading-relaxed hover:text-primary transition cursor-pointer"
>
  <MapPin className="w-5 h-5 text-primary mt-1" />
  <p>
    Agnesbergsvägen 21 <br />
    424 38 Agnesberg
  </p>
</a>

          </div>

          {/* COLUMN 3 – KONTAKT + BETALNING */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Kontakt</h3>
            <ul className="space-y-3 text-gray-300 text-sm">
              <li className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-primary" />
                <a href="tel:0313309040" className="hover:text-primary transition">
                  031 330 90 40
                </a>
              </li>

              <li className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-primary" />
                <a href="tel:0769117790" className="hover:text-primary transition">
                  076-911 77 90
                </a>
              </li>

              <li className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-primary" />
                <a
                  href="mailto:Ajatrafikskola@hotmail.com"
                  className="hover:text-primary transition break-all"
                >
                  Ajatrafikskola@hotmail.com
                </a>
              </li>
            </ul>

            <h3 className="text-lg font-semibold mt-8 mb-4">
              Betalningsmetoder
            </h3>
            <ul className="space-y-2 text-gray-300 text-sm">
              <li>Swish: <span className="font-medium">123 263 65 20</span></li>
              <li>Bankgiro: <span className="font-medium">562-5660</span></li>
              <li>Resursbank / Klarna / Qliro</li>
            </ul>
          </div>

          {/* COLUMN 4 – LINKS + SOCIALS */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Viktiga Länkar</h3>
            <ul className="space-y-2 text-gray-300 text-sm">
              <li>
                <a
                  href="https://www.trafikskolaonline.se/sv"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-primary transition"
                >
                  Jag är elev
                </a>
              </li>

              <li>
                <Link
  to="/inskrivningsavtal"
  className="hover:text-primary transition"
>
  Inskrivningsavtal
</Link>
              </li>

              <li>
                <a
                  href="https://blickpunkten.se/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-primary transition"
                >
                  Synundersökning
                </a>
              </li>

              <li>
                <a
                  href="https://www.transportstyrelsen.se/sv/vagtrafik/e-tjanster-och-blanketter/blanketter-for-vagtrafik/korkort/privatperson/ansok-om-korkortstillstand-grupp-i/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-primary transition"
                >
                  Körkortstillstånd
                </a>
              </li>

              <li>
                <a
                  href="https://www.transportstyrelsen.se/sv/vagtrafik/korkort/ta-korkort/handledarskap-och-ovningskorning/handledare/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-primary transition"
                >
                  Handledarskap
                </a>
              </li>

              <li>
                <a
                  href="https://fp.trafikverket.se/Boka/ng/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-primary transition"
                >
                  Boka prov
                </a>
              </li>

             
            </ul>

            {/* SOCIALS */}
            <h3 className="text-lg font-semibold mt-8 mb-4">Sociala Medier</h3>
            <div className="flex gap-4 mt-2">
              <a
                href="https://www.instagram.com/ajatrafikskola/"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center hover:bg-primary transition hover:scale-110"
              >
                <Instagram className="w-5 h-5" />
              </a>

              <a
                href="https://www.facebook.com/people/AJA-Trafikskola/100063522162432/"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center hover:bg-primary transition hover:scale-110"
              >
                <Facebook className="w-5 h-5" />
              </a>

              <a
                href="https://www.tiktok.com/@ajatrafikskola_gbg"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center hover:bg-primary transition hover:scale-110"
              >
                <img src={tiktokIcon} alt="TikTok" className="w-5 h-5" />
              </a>
            </div>
          </div>
        </div>

        {/* BOTTOM BAR */}
        <div className="border-t border-white/10 mt-12 pt-8 text-center text-gray-400 text-sm">
          &copy; {new Date().getFullYear()} AJA Trafikskola. Alla rättigheter förbehållna.
          <br />
          Drivs av{" "}
          <a
            href="https://genesisvirtue.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-primary hover:underline"
          >
            Genesis Virtue
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
