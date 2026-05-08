import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useEffect, useState } from "react";
import Preloader from "./components/Preloader";
import Index from "./pages/Index";
import RiskCar from "./pages/RiskCar";
import RiskMC from "./pages/RiskMC";
import Supervisor from "./pages/Supervisor";
import Prices from "./pages/Prices";
import About from "./pages/About";
import Contact from "./pages/Contact";
import NotFound from "./pages/NotFound";
import Bill from "./pages/bill-price";
import Taxi from "./pages/taxi-price";
import MC from "./pages/mc-price";
import Moped from "./pages/moped-price";
import Mope from "./pages/Moped-service";
import MTC from "./pages/mc-service";
import Tax from "./pages/Taxi-service";
import Bil from "./pages/Bil-service";
import Gallery from "./pages/gallery";
import Courses from "./pages/Courses";
import FourWheels from "./pages/FourWheels";
import TwoWheels from "./pages/TwoWheels";
import Risk2Car from "./pages/kombokurs-bil";
import Risk2MC from "./pages/risk2mc";
import Inskrivningsavtal from "./pages/Inskrivningsavtal";
import Kombokurs from "./pages/kombokurs-mc";
const queryClient = new QueryClient();

const App = () => {
  const [showPreloader, setShowPreloader] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowPreloader(false);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        {showPreloader && <Preloader />}
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/kurser/riskettan" element={<RiskCar />} />
            <Route path="/kurser/riskettan-mc" element={<RiskMC />} />
            <Route path="/kurser/handledarkurs" element={<Supervisor />} />
            <Route path="/priser/bil" element={<Bill />} /> {/* New Route for Bill Prices */}
            {/* Add more routes as needed */}
            <Route path="/priser/taxi" element={<Taxi />} /> {/* New Route for Taxi Prices */}
            <Route path="/priser/mc" element={<MC />} /> {/* New Route for MC Prices */}
             <Route path="/priser/moped" element={<Moped />} />
            <Route path="/korkort/moped" element={<Mope />} />
            <Route path="/korkort/bil" element={<Bil />} />
            <Route path="/korkort/mc" element={<MTC />} />
            <Route path="/korkort/taxi" element={<Tax />} />
            <Route path="/priser" element={<Prices />} />
            <Route path="/om-oss" element={<About />} />
            <Route path="/kontakt" element={<Contact />} />
            <Route path="/galleri" element={<Gallery />} />
            <Route path="/kurser" element={<Courses />} />
            <Route path="/4-hjul" element={<FourWheels />} />
            <Route path="/2-hjul" element={<TwoWheels />} />
            <Route path="/kurser/risktva-bil" element={<Risk2Car />} />
            <Route path="/kurser/risktva-mc" element={<Risk2MC />} />
            <Route path="/inskrivningsavtal" element={<Inskrivningsavtal />} />
            <Route path="/kurser/kombokurs-mc" element={<Kombokurs />} />
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;



