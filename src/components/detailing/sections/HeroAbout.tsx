import Icon from "@/components/ui/icon";
import { LOGO_URL } from "@/lib/detailing-data";
import { AnimSection } from "./SectionHelpers";

interface Props {
  onBooking: (service?: string) => void;
}

export default function HeroAbout({ onBooking }: Props) {
  return (
    <>
      {/* HERO */}
      <section id="home" className="relative min-h-screen flex items-center overflow-hidden" style={{ background: "#1A1A1A" }}>
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-32 -right-32 w-96 h-96 rounded-full blur-3xl animate-float" style={{ background: "rgba(224,58,47,0.2)" }} />
          <div className="absolute bottom-0 -left-32 w-80 h-80 rounded-full blur-3xl animate-float" style={{ background: "rgba(74,74,74,0.25)", animationDelay: "0.7s" }} />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full blur-3xl" style={{ background: "rgba(224,58,47,0.05)" }} />
          <div className="absolute inset-0 opacity-5"
            style={{ backgroundImage: "linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)", backgroundSize: "60px 60px" }} />
        </div>

        <div className="container mx-auto px-4 pt-24 pb-16 relative z-10">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="mb-6 animate-fade-in-up">
                <img
                  src={LOGO_URL}
                  alt="Автокультура"
                  className="h-20 w-auto object-contain"
                  style={{ filter: "brightness(0) invert(1)" }}
                />
              </div>
              <div className="inline-flex items-center gap-2 border text-xs font-semibold px-3 py-1.5 rounded-full mb-6 animate-fade-in-up"
                style={{ background: "rgba(224,58,47,0.2)", color: "#E03A2F", borderColor: "rgba(224,58,47,0.3)" }}>
                <span className="w-1.5 h-1.5 rounded-full animate-pulse" style={{ background: "#E03A2F" }} />
                Профессиональный детейлинг
              </div>
              <h1 className="font-display text-5xl md:text-6xl lg:text-7xl font-bold text-white leading-tight mb-6 animate-fade-in-up" style={{ animationDelay: "0.1s" }}>
                ВАШ АВТОМОБИЛЬ<br />
                <span style={{ color: "#E03A2F" }}>ДОСТОИН </span>
                ЛУЧШЕГО
              </h1>
              <p className="text-lg font-light leading-relaxed mb-8 max-w-md animate-fade-in-up" style={{ color: "rgba(255,255,255,0.6)", animationDelay: "0.2s" }}>
                Возвращаем автомобилю первоначальный лоск. Профессиональный подход, современное оборудование и качественные материалы, гарантия результата.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 animate-fade-in-up" style={{ animationDelay: "0.3s" }}>
                <button onClick={() => onBooking()}
                  className="text-white font-semibold px-8 py-4 rounded-xl transition-all flex items-center justify-center gap-2 text-base"
                  style={{ background: "#E03A2F" }}>
                  <Icon name="Calendar" size={18} />
                  Записаться онлайн
                </button>
                <a href="#services"
                  className="border font-semibold px-8 py-4 rounded-xl transition-all flex items-center justify-center gap-2 text-base text-white"
                  style={{ borderColor: "rgba(255,255,255,0.3)" }}>
                  Наши услуги
                  <Icon name="ArrowRight" size={18} />
                </a>
              </div>

              <div className="grid grid-cols-3 gap-6 mt-12 pt-8 border-t animate-fade-in-up" style={{ borderColor: "rgba(255,255,255,0.1)", animationDelay: "0.4s" }}>
                {[["500+", "Довольных клиентов"], ["7 лет", "На рынке"], ["100%", "Гарантия"]].map(([n, l]) => (
                  <div key={n}>
                    <div className="font-display text-3xl font-bold mb-1" style={{ color: "#E03A2F" }}>{n}</div>
                    <div className="text-xs font-medium" style={{ color: "rgba(255,255,255,0.5)" }}>{l}</div>
                  </div>
                ))}
              </div>
            </div>

            <div className="relative hidden lg:flex items-center justify-center animate-scale-in" style={{ animationDelay: "0.3s" }}>
              <div className="relative w-full max-w-lg">
                <div className="w-full rounded-3xl overflow-hidden shadow-2xl" style={{ border: "1px solid rgba(224,58,47,0.2)", aspectRatio: "1/1" }}>
                  <img
                    src="https://i.ibb.co/hxP4Myxb/IMG-9120.png"
                    alt="Профессиональный детейлинг"
                    className="w-full h-full object-contain"
                  />
                  <div className="absolute inset-0 rounded-3xl" style={{ background: "linear-gradient(to top, rgba(0,0,0,0.25) 0%, transparent 50%)" }} />
                </div>

                <div className="absolute -bottom-4 -left-4 bg-white rounded-xl p-3 shadow-2xl animate-float" style={{ animationDelay: "0.5s" }}>
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ background: "rgba(224,58,47,0.1)" }}>
                      <Icon name="CheckCircle" size={16} style={{ color: "#E03A2F" }} />
                    </div>
                    <div>
                      <div className="text-xs font-bold" style={{ color: "#1A1A1A" }}>Готово!</div>
                      <div className="text-[10px]" style={{ color: "#64748b" }}>JAC T9</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="absolute bottom-0 left-0 right-0 h-16 bg-white" style={{ clipPath: "polygon(0 100%, 100% 100%, 100% 0)" }} />
      </section>

      {/* ABOUT */}
      <section id="about" className="py-24 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <AnimSection>
              <div className="relative">
                <div className="rounded-3xl p-10 h-80 flex items-center justify-center" style={{ background: "linear-gradient(135deg, rgba(13,148,136,0.08), rgba(249,115,22,0.04))" }}>
                  <div className="grid grid-cols-2 gap-4 w-full">
                    {[
                      { icon: "Award", label: "Опытные мастера", color: "#E03A2F" },
                      { icon: "MapPin", label: "Студия в центре", color: "#4A4A4A" },
                      { icon: "Wrench", label: "Проф. оборудование", color: "#E03A2F" },
                      { icon: "ShieldCheck", label: "Гарантия на работы", color: "#4A4A4A" },
                    ].map(({ icon, label, color }) => (
                      <div key={label} className="bg-white rounded-2xl p-5 shadow-sm flex flex-col items-center gap-2 text-center">
                        <Icon name={icon} size={28} style={{ color }} />
                        <span className="text-sm font-semibold" style={{ color: "#1A1A1A" }}>{label}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </AnimSection>

            <AnimSection>
              <div className="inline-flex items-center gap-2 text-xs font-semibold px-3 py-1.5 rounded-full mb-4" style={{ background: "rgba(224,58,47,0.1)", color: "#E03A2F" }}>
                О студии
              </div>
              <h2 className="font-display text-4xl lg:text-5xl font-bold leading-tight mb-6" style={{ color: "#1A1A1A" }}>
                ТВОЯ МАШИНА<br />
                <span style={{ color: "#E03A2F" }}>МОЖЕТ БОЛЬШЕ.</span><br />
                МЫ ПОКАЖЕМ.
              </h2>
              <p className="leading-relaxed mb-4" style={{ color: "#64748b" }}>
                Автокультура — профессиональная студия детейлинга в Красноярске. Работаем с автомобилями любого класса: от городских машин до премиальных авто.
              </p>
              <p className="leading-relaxed mb-8" style={{ color: "#64748b" }}>
                Для нас детейлинг — это честная работа на результат, за который нам не стыдно. Приезжайте к нам и убедитесь в этом сами!
              </p>
              <div className="flex flex-wrap gap-3">
                {["Сертифицированные мастера", "Проф. материалы", "Гарантия на работы", "Фотоотчёт"].map(tag => (
                  <span key={tag} className="text-sm px-4 py-1.5 rounded-full font-medium" style={{ background: "#f1f5f9", color: "#475569" }}>
                    {tag}
                  </span>
                ))}
              </div>
            </AnimSection>
          </div>
        </div>
      </section>
    </>
  );
}
