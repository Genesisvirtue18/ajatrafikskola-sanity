import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import {
  Image,
  Info,
  Phone,
  Link2,
  Menu,
  X,
  ChevronDown,
  BookOpen,
  ShoppingBag,
} from "lucide-react";
import ajaLogo from "@/assets/logo-white.png";

import carPng from "@/assets/car1.png";
import bikePng from "@/assets/motorcycle1.png";

const Navbar = () => {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [isLinksOpen, setIsLinksOpen] = useState(false);
  const location = useLocation();

  const toggleDrawer = () => setIsDrawerOpen(!isDrawerOpen);
  const isActive = (path) => location.pathname === path;

  const topNavItems = [
    { name: "4 hjul", path: "/4-hjul", iconPng: carPng },
    { name: "2 hjul", path: "/2-hjul", iconPng: bikePng },
    { name: "Kurser", path: "/kurser", icon: <BookOpen size={16} /> },
    {
      name: "E-handel",
      href: "https://www.trafikskolaonline.se/sv/skola/aja/",
      icon: <ShoppingBag size={16} />,
    },
    { name: "Galleri", path: "/galleri", icon: <Image size={16} /> },
  ];

  const drawerItems = [
    { name: "Om oss", path: "/om-oss", icon: <Info size={18} /> },
    { name: "Kontakt", path: "/kontakt", icon: <Phone size={18} /> },
  ];

  const linkDropdownItems = [
    { name: "Jag är elev", href: "https://www.trafikskolaonline.se/sv" },
    { name: "Inskrivningsavtal", path: "/inskrivningsavtal" },
    { name: "Synundersökning", href: "https://blickpunkten.se/" },
    {
      name: "Körkortstillstånd",
      href:
        "https://www.transportstyrelsen.se/sv/vagtrafik/e-tjanster-och-blanketter/blanketter-for-vagtrafik/korkort/privatperson/ansok-om-korkortstillstand-grupp-i/",
    },
    {
      name: "Handledarskap",
      href:
        "https://www.transportstyrelsen.se/sv/vagtrafik/korkort/ta-korkort/handledarskap-och-ovningskorning/handledare/",
    },
    { name: "Boka prov", href: "https://fp.trafikverket.se/Boka/ng/" },
  ];

  return (
    <header className="fixed top-0 left-0 w-full z-50 text-white shadow-md">
      {/* TOP TABS */}
      <div className="bg-[#2b2b2b] pt-2">
        <div className="flex w-full px-2 md:justify-center md:gap-2">
          {topNavItems.map((item) =>
            item.href ? (
              <a
                key={item.name}
                href={item.href}
                target="_blank"
                rel="noopener noreferrer"
                className="
                  flex-1 md:flex-none
                  flex items-center justify-center gap-2
                  h-9 md:h-10
                  px-1 md:px-5
                  text-[11px] sm:text-xs md:text-sm
                  font-medium
                  border border-[#3c3c3c]
                  rounded-t-md
                  bg-[#333333] text-gray-200
                  hover:bg-[#3c3c3c]
                "
              >
                {item.iconPng ? (
                  <img
                    src={item.iconPng}
                    className="w-3.5 h-3.5 md:w-4 md:h-4 object-contain"
                  />
                ) : (
                  item.icon
                )}
                <span className="truncate">{item.name}</span>
              </a>
            ) : (
              <Link
                key={item.name}
                to={item.path}
                className={`
                  flex-1 md:flex-none
                  flex items-center justify-center gap-2
                  h-9 md:h-10
                  px-1 md:px-5
                  text-[11px] sm:text-xs md:text-sm
                  font-medium
                  border border-[#3c3c3c]
                  rounded-t-md
                  ${
                    isActive(item.path)
                      ? "bg-[#3c3c3c] text-white"
                      : "bg-[#333333] text-gray-200 hover:bg-[#3c3c3c]"
                  }
                `}
              >
                {item.iconPng ? (
                  <img
                    src={item.iconPng}
                    className="w-3.5 h-3.5 md:w-4 md:h-4 object-contain"
                  />
                ) : (
                  item.icon
                )}
                <span className="truncate">{item.name}</span>
              </Link>
            )
          )}
        </div>
      </div>

      {/* LOGO BAR */}
      <div className="flex justify-between items-center px-4 py-3 bg-black/20 backdrop-blur-sm">
        <Link to="/">
          <img src={ajaLogo} className="h-9" />
        </Link>

        <button
          onClick={toggleDrawer}
          className="text-[#68b143] hover:text-[#5aa13a]"
        >
          {isDrawerOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* OVERLAY */}
      {isDrawerOpen && (
        <div
          className="fixed inset-0 bg-black/40 z-40"
          onClick={toggleDrawer}
        />
      )}

      {/* DRAWER */}
      <div
        className={`fixed top-0 right-0 h-full w-64 bg-[#191b1a] z-50 transform transition-transform ${
          isDrawerOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex justify-end px-6 py-4 border-b border-gray-700">
          <button onClick={toggleDrawer} className="text-[#68b143]">
            <X size={26} />
          </button>
        </div>

        <div className="flex flex-col px-6 pt-8 space-y-5">
          {drawerItems.map((item) => (
            <Link
              key={item.name}
              to={item.path}
              onClick={() => setIsDrawerOpen(false)}
              className="flex items-center gap-3 text-[#68b143] hover:text-white"
            >
              {item.icon}
              {item.name}
            </Link>
          ))}

          {/* LINKS DROPDOWN */}
          <div>
            <button
              onClick={() => setIsLinksOpen(!isLinksOpen)}
              className="flex justify-between w-full text-[#68b143] hover:text-white"
            >
              <div className="flex items-center gap-3">
                <Link2 size={18} />
                Länkar
              </div>
              <ChevronDown
                size={18}
                className={`transition ${isLinksOpen ? "rotate-180" : ""}`}
              />
            </button>

            {isLinksOpen && (
              <div className="mt-3 ml-6 flex flex-col gap-3">
                {linkDropdownItems.map((link) =>
                  link.path ? (
                    <Link
                      key={link.name}
                      to={link.path}
                      onClick={() => setIsDrawerOpen(false)}
                      className="text-sm text-gray-300 hover:text-[#68b143]"
                    >
                      {link.name}
                    </Link>
                  ) : (
                    <a
                      key={link.name}
                      href={link.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sm text-gray-300 hover:text-[#68b143]"
                    >
                      {link.name}
                    </a>
                  )
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;

