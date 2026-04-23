import Icon from "@/components/ui/icon";
import { SERVICES, PORTFOLIO_ITEMS } from "@/lib/detailing-data";
import { AnimSection } from "./SectionHelpers";

interface Props {
  onBooking: (service?: string) => void;
  setLightbox: (src: string) => void;
}

export default function ServicesPortfolio({ onBooking, setLightbox }: Props) {
  return (
    <>
      {/* SERVICES */}
      <section id="services" className="py-24" style={{ background: "#f8fafc" }}>
        <div className="container mx-auto px-4">
          <AnimSection className="text-center mb-14">
            <div className="inline-flex items-center gap-2 text-xs font-semibold px-3 py-1.5 rounded-full mb-4" style={{ background: "rgba(224,58,47,0.1)", color: "#E03A2F" }}>
              Услуги
            </div>
            <h2 className="font-display text-4xl lg:text-5xl font-bold mb-4" style={{ color: "#1A1A1A" }}>
              ЧТО МЫ <span style={{ color: "#E03A2F" }}>ПРЕДЛАГАЕМ</span>
            </h2>
            <p style={{ color: "#64748b" }} className="max-w-xl mx-auto">
              Полный спектр услуг для защиты и восстановления вашего автомобиля
            </p>
          </AnimSection>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {SERVICES.map((s) => (
              <AnimSection key={s.title}>
                <div className="bg-white rounded-2xl p-6 shadow-sm border card-hover h-full flex flex-col relative overflow-hidden" style={{ borderColor: "#f1f5f9" }}>
                  {s.tag && (
                    <span className="absolute top-4 right-4 text-xs font-bold px-2.5 py-1 rounded-full text-white"
                      style={{ background: (s.tag === "Хит" || s.tag === "VIP") ? "#4A4A4A" : "#E03A2F" }}>
                      {s.tag}
                    </span>
                  )}
                  <div className="w-12 h-12 rounded-xl flex items-center justify-center mb-4" style={{ background: "rgba(224,58,47,0.1)" }}>
                    <Icon name={s.icon} size={24} style={{ color: "#E03A2F" }} />
                  </div>
                  <h3 className="font-display text-xl font-bold mb-2" style={{ color: "#1A1A1A" }}>{s.title}</h3>
                  <p className="text-sm leading-relaxed flex-1 mb-4" style={{ color: "#64748b" }}>{s.desc}</p>
                  <div className="flex items-center justify-between mt-auto pt-4 border-t" style={{ borderColor: "#f8fafc" }}>
                    <span className="font-display text-lg font-bold" style={{ color: "#E03A2F" }}>{s.price}</span>
                    <button onClick={() => onBooking(s.title)}
                      className="text-sm font-semibold px-4 py-2 rounded-lg border transition-all hover:text-white"
                      style={{ color: "#E03A2F", borderColor: "#E03A2F" }}
                      onMouseOver={e => { (e.target as HTMLElement).style.background = "#E03A2F"; (e.target as HTMLElement).style.color = "white"; }}
                      onMouseOut={e => { (e.target as HTMLElement).style.background = "transparent"; (e.target as HTMLElement).style.color = "#E03A2F"; }}>
                      Записаться
                    </button>
                  </div>
                </div>
              </AnimSection>
            ))}
          </div>
        </div>
      </section>

      {/* PORTFOLIO */}
      <section id="portfolio" className="py-24 bg-white">
        <div className="container mx-auto px-4">
          <AnimSection className="text-center mb-14">
            <div className="inline-flex items-center gap-2 text-xs font-semibold px-3 py-1.5 rounded-full mb-4" style={{ background: "rgba(74,74,74,0.1)", color: "#4A4A4A" }}>
              Портфолио
            </div>
            <h2 className="font-display text-4xl lg:text-5xl font-bold mb-4" style={{ color: "#1A1A1A" }}>
              НАШИ <span style={{ color: "#4A4A4A" }}>РАБОТЫ</span>
            </h2>
            <p style={{ color: "#64748b" }} className="max-w-xl mx-auto">До и после — наглядные результаты нашей работы</p>
          </AnimSection>

          <div className="grid md:grid-cols-2 gap-6">
            {PORTFOLIO_ITEMS.map((item, i) => (
              <AnimSection key={i}>
                <div className="rounded-2xl overflow-hidden border card-hover" style={{ borderColor: "#f1f5f9" }}>
                  {"photoSingle" in item && item.photoSingle ? (
                    <div className="relative h-48 overflow-hidden">
                      <img src={item.photoSingle} alt={item.car} className="w-full h-full object-cover cursor-zoom-in transition-transform hover:scale-105"
                        onClick={() => setLightbox((item as { photoSingle: string }).photoSingle)} />
                    </div>
                  ) : (
                  <div className="grid grid-cols-2 h-48">
                    <div className="flex items-center justify-center relative overflow-hidden" style={{ background: ("colorBefore" in item ? item.colorBefore : undefined) ?? "#9ca3af" }}>
                      <div className="absolute top-3 left-3 text-white text-xs px-2 py-1 rounded font-medium z-10" style={{ background: "rgba(0,0,0,0.5)" }}>До</div>
                      {"photoBefore" in item && item.photoBefore
                        ? <img src={item.photoBefore as string} alt="До" className="w-full h-full object-cover cursor-zoom-in transition-transform hover:scale-105"
                            onClick={() => setLightbox(item.photoBefore as string)} />
                        : <Icon name="Car" size={48} style={{ color: "rgba(255,255,255,0.4)" }} />}
                    </div>
                    <div className="flex items-center justify-center relative overflow-hidden" style={{ background: ("colorAfter" in item ? item.colorAfter : undefined) ?? "#E03A2F" }}>
                      <div className="absolute top-3 right-3 text-xs px-2 py-1 rounded font-semibold z-10" style={{ background: "rgba(255,255,255,0.9)", color: "#1A1A1A" }}>После</div>
                      {"photoAfter" in item && item.photoAfter
                        ? <img src={item.photoAfter as string} alt="После" className="w-full h-full object-cover cursor-zoom-in transition-transform hover:scale-105"
                            onClick={() => setLightbox(item.photoAfter as string)} />
                        : <Icon name="Sparkles" size={48} style={{ color: "rgba(255,255,255,0.6)" }} />}
                    </div>
                  </div>
                  )}
                  <div className="p-5 bg-white">
                    <div className="flex items-center justify-between">
                      <div>
                        <h4 className="font-display text-lg font-bold" style={{ color: "#1A1A1A" }}>{item.car}</h4>
                        <p className="text-sm" style={{ color: "#64748b" }}>{item.service}</p>
                      </div>
                      <span className="text-xs font-semibold px-3 py-1.5 rounded-full" style={{ background: "rgba(224,58,47,0.1)", color: "#E03A2F" }}>
                        {item.result}
                      </span>
                    </div>
                  </div>
                </div>
              </AnimSection>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
