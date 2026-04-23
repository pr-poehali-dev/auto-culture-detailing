import { useState } from "react";
import { Lightbox } from "./sections/SectionHelpers";
import HeroAbout from "./sections/HeroAbout";
import ServicesPortfolio from "./sections/ServicesPortfolio";
import ProcessContactsFooter from "./sections/ProcessContactsFooter";

interface SectionsProps {
  onBooking: (service?: string) => void;
}

export default function PageSections({ onBooking }: SectionsProps) {
  const [lightbox, setLightbox] = useState<string | null>(null);
  return (
    <>
      {lightbox && <Lightbox src={lightbox} onClose={() => setLightbox(null)} />}
      <HeroAbout onBooking={onBooking} />
      <ServicesPortfolio onBooking={onBooking} setLightbox={setLightbox} />
      <ProcessContactsFooter onBooking={onBooking} />
    </>
  );
}