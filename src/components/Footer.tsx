import { Link } from "react-router-dom";
// import { Facebook, Instagram, Phone, Mail, MapPin } from "lucide-react";
import ajaLogo from "@/assets/logo-white.png";
import footerBg from "@/assets/footer-bg.webp";
import tiktokIcon from "@/assets/tiktok.png";
import { useEffect, useState } from "react";
import { getFooter } from "@/lib/getFooter";
import {
  Facebook,
  Instagram,
  Youtube,
  Twitter,
  Linkedin,
  Phone,
  Mail,
  MapPin
} from "lucide-react";

export const iconMap: Record<string, any> = {
  Facebook,
  Instagram,
  Youtube,
  Twitter,
  Linkedin,
};

const Footer = () => {
  const [footerData, setFooterData] = useState<any>(null);
  

  useEffect(() => {
    const loadFooter = async () => {
      const data = await getFooter();
      setFooterData(data);
    };

    loadFooter();
  }, []);

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
              src={footerData?.logo?.asset?.url}
              alt="Logo"
              className="h-20 mb-6 brightness-110"
            />

            <h3 className="text-lg font-semibold mb-4">Reception</h3>

        <ul className="text-gray-300 text-sm">
  {footerData?.receptionPeriods?.map(
    (period: any, periodIndex: number) => (
      <div
        key={period.periodTitle}
        className={periodIndex > 0 ? "mt-6" : ""}
      >
        <li className="font-medium text-white mb-2">
          {period.periodTitle}
        </li>

        {period.hours?.map((hour: any, index: number) => (
          <li
            key={index}
            className={`mb-1 ${
              hour.isNote
                ? "text-xs text-gray-400"
                : ""
            }`}
          >
            {hour.text}
          </li>
        ))}
      </div>
    )
  )}
</ul>
          </div>

          {/* COLUMN 2 – KÖRLEKTIONER + ADRESS */}
         <div>
  {/* Driving Lessons */}
  <h3 className="text-lg font-semibold mb-4">
    {footerData?.lessonTitle}
  </h3>

  <ul className="text-gray-300 text-sm">
    {footerData?.lessonPeriods?.map(
      (period: any, periodIndex: number) => (
        <li
          key={period.periodTitle}
          className={periodIndex > 0 ? "mt-6" : ""}
        >
          <div className="font-medium text-white mb-2">
            {period.periodTitle}
          </div>

          <ul className="space-y-1">
            {period.hours?.map(
              (hour: any, index: number) => (
                <li
                  key={index}
                  className={
                    hour.isNote
                      ? "text-xs text-gray-400"
                      : ""
                  }
                >
                  {hour.text}
                </li>
              )
            )}
          </ul>
        </li>
      )
    )}
  </ul>

  {/* Address */}
  <h3 className="text-lg font-semibold mt-8 mb-4">
    {footerData?.addressTitle}
  </h3>

  <a
    href={footerData?.googleMapLink}
    target="_blank"
    rel="noopener noreferrer"
    className="flex items-start gap-2 text-gray-300 text-sm leading-relaxed hover:text-primary transition cursor-pointer"
  >
    <MapPin className="w-5 h-5 text-primary mt-1 flex-shrink-0" />

    <p className="whitespace-pre-line">
      {footerData?.address}
    </p>
  </a>
</div>

          {/* COLUMN 3 – KONTAKT + BETALNING */}
         <div>
  {/* Contact */}
  <h3 className="text-lg font-semibold mb-4">
    {footerData?.contactTitle}
  </h3>

  <ul className="space-y-3 text-gray-300 text-sm">
    {footerData?.phoneNumbers?.map(
      (item: any, index: number) => (
        <li
          key={index}
          className="flex items-center gap-2"
        >
          <Phone className="w-4 h-4 text-primary flex-shrink-0" />

          <a
            href={`tel:${item.number}`}
            className="hover:text-primary transition"
          >
            {item.number}
          </a>
        </li>
      )
    )}

    {footerData?.email && (
      <li className="flex items-center gap-2">
        <Mail className="w-4 h-4 text-primary flex-shrink-0" />

        <a
          href={`mailto:${footerData.email}`}
          className="hover:text-primary transition break-all"
        >
          {footerData.email}
        </a>
      </li>
    )}
  </ul>

  {/* Payment Methods */}
  <h3 className="text-lg font-semibold mt-8 mb-4">
    {footerData?.paymentTitle}
  </h3>

  <ul className="space-y-2 text-gray-300 text-sm">
    {footerData?.paymentMethods?.map(
      (item: any, index: number) => (
        <li key={index}>
          {item.text}
        </li>
      )
    )}
  </ul>
</div>

          {/* COLUMN 4 – LINKS + SOCIALS */}
      <div>
  {/* Important Links */}
  <h3 className="text-lg font-semibold mb-4">
    {footerData?.importantLinksTitle}
  </h3>

  <ul className="space-y-2 text-gray-300 text-sm">
    {footerData?.importantLinks?.map(
      (link: any, index: number) => {
        const isExternal =
          link.link?.startsWith("http");

        return (
          <li key={index}>
            {isExternal ? (
              <a
                href={link.link}
                target={
                  link.openInNewTab
                    ? "_blank"
                    : "_self"
                }
                rel="noopener noreferrer"
                className="hover:text-primary transition"
              >
                {link.title}
              </a>
            ) : (
              <Link
                to={link.link}
                className="hover:text-primary transition"
              >
                {link.title}
              </Link>
            )}
          </li>
        );
      }
    )}
  </ul>

  {/* SOCIALS */}
  <h3 className="text-lg font-semibold mt-8 mb-4">
    {footerData?.socialTitle}
  </h3>

  <div className="flex gap-4 mt-2">
    {footerData?.socialLinks?.map(
      (item: any, index: number) => {
        const Icon =
          item.iconType === "lucide"
            ? iconMap[item.iconName]
            : null;

        return (
          <a
            key={index}
            href={item.url}
            target="_blank"
            rel="noopener noreferrer"
            className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center hover:bg-primary transition hover:scale-110"
          >
            {item.iconType === "lucide" &&
              Icon && (
                <Icon className="w-5 h-5" />
              )}

            {item.iconType === "image" &&
              item.iconImage?.asset?.url && (
                <img
                  src={
                    item.iconImage.asset.url
                  }
                  alt=""
                  className="w-5 h-5 object-contain"
                />
              )}
          </a>
        );
      }
    )}
  </div>
</div>

        </div>

        {/* BOTTOM BAR */}
      <div className="border-t border-white/10 mt-12 pt-8 text-center text-gray-400 text-sm">
  {footerData?.copyrightText}

  <br />

  <a
    href={footerData?.poweredByLink}
    target="_blank"
    rel="noopener noreferrer"
    className="text-primary hover:underline"
  >
    {footerData?.poweredByText}
  </a>
</div>
      </div>
    </footer>
  );
};

export default Footer;
