import { useState, useEffect } from "react";
import Icon from "@/components/ui/icon";
import { NAV_LINKS, LOGO_URL } from "@/lib/detailing-data";

interface NavbarProps {
  onBooking: () => void;
}

export default function Navbar({ onBooking }: NavbarProps) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? "bg-white/95 backdrop-blur-md shadow-sm py-3" : "bg-transparent py-5"}`}>
      <div className="container mx-auto px-4 flex items-center justify-between">
        <a href="#home" className="flex items-center">
          <img
            src={LOGO_URL}
            alt="Автокультура"
            className="h-12 w-auto object-contain"
            style={{ filter: scrolled ? "none" : "brightness(0) invert(1)" }}
          />
        </a>

        <nav className="hidden lg:flex items-center gap-6">
          {NAV_LINKS.map(l => (
            <a key={l.href} href={l.href}
              className="text-sm font-medium transition-colors hover:text-red-600"
              style={{ color: scrolled ? "rgba(26,26,26,0.7)" : "rgba(255,255,255,0.8)" }}>
              {l.label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <a href="tel:+79001234567"
            className="hidden md:flex items-center gap-1.5 text-sm font-semibold transition-colors hover:text-red-600"
            style={{ color: scrolled ? "#1A1A1A" : "white" }}>
            <Icon name="Phone" size={15} />
            +7 (900) 123-45-67
          </a>
          <button onClick={onBooking}
            className="text-white text-sm font-semibold px-4 py-2 rounded-lg transition-all hidden md:block"
            style={{ background: "#E03A2F" }}>
            Записаться
          </button>
          <button onClick={() => setMenuOpen(!menuOpen)}
            className="lg:hidden p-2"
            style={{ color: scrolled ? "#1A1A1A" : "white" }}>
            <Icon name={menuOpen ? "X" : "Menu"} size={22} />
          </button>
        </div>
      </div>

      {menuOpen && (
        <div className="lg:hidden bg-white border-t shadow-lg">
          <div className="container mx-auto px-4 py-4 flex flex-col gap-3">
            {NAV_LINKS.map(l => (
              <a key={l.href} href={l.href} onClick={() => setMenuOpen(false)}
                className="py-2 text-sm font-medium border-b border-gray-50 last:border-0"
                style={{ color: "rgba(15,23,42,0.8)" }}>
                {l.label}
              </a>
            ))}
            <button onClick={() => { onBooking(); setMenuOpen(false); }}
              className="mt-2 text-white font-semibold py-3 rounded-lg"
              style={{ background: "#E03A2F" }}>
              Записаться онлайн
            </button>
          </div>
        </div>
      )}
    </header>
  );
}
