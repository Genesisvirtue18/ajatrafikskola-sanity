import { useEffect, useState } from 'react';

const Preloader = () => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Hide preloader after 2 seconds
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  if (!isLoading) return null;

  return (
    <div className="preloader">
      <div className="flex flex-col items-center gap-6">
        <div className="preloader-spinner"></div>
        <div className="text-primary-foreground text-xl font-semibold tracking-wider">
          AJA TRAFIKSKOLA
        </div>
      </div>
    </div>
  );
};

export default Preloader;
