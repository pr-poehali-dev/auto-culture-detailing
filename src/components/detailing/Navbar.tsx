import { useState, useEffect } from "react";
import Icon from "@/components/ui/icon";
import { NAV_LINKS, LOGO_URL, PHONE, PHONE_HREF, ADDRESS, TG_GROUP } from "@/lib/detailing-data";

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
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? "bg-white/95 backdrop-blur-md shadow-sm" : "bg-transparent"}`}>
      {/* Верхняя строка — адрес и Telegram */}
      <div className={`transition-all duration-300 ${scrolled ? "hidden" : "block"}`}
        style={{ background: "rgba(0,0,0,0.35)", borderBottom: "1px solid rgba(255,255,255,0.08)" }}>
        <div className="container mx-auto px-4 py-1.5 flex items-center justify-between">
          <div className="flex items-center gap-1.5 text-xs" style={{ color: "rgba(255,255,255,0.7)" }}>
            <Icon name="MapPin" size={12} />
            {ADDRESS}
          </div>
          <a href={TG_GROUP} target="_blank" rel="noopener noreferrer"
            className="flex items-center gap-1.5 text-xs transition-colors hover:text-blue-300"
            style={{ color: "rgba(255,255,255,0.7)" }}>
            <Icon name="Send" size={12} />
            Telegram-канал
          </a>
        </div>
      </div>
      <div className={`container mx-auto px-4 flex items-center justify-between ${scrolled ? "py-3" : "py-4"}`}>
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
          <a href={PHONE_HREF}
            className="hidden md:flex items-center gap-1.5 text-sm font-semibold transition-colors hover:text-red-600"
            style={{ color: scrolled ? "#1A1A1A" : "white" }}>
            <Icon name="Phone" size={15} />
            {PHONE}
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