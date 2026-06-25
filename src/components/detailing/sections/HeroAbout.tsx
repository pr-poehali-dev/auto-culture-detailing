import Icon from "@/components/ui/icon";
import { LOGO_URL, TG_PERSONAL } from "@/lib/detailing-data";
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

              <div className="inline-flex items-center gap-2 border text-xs font-semibold px-3 py-1.5 rounded-full mb-4 animate-fade-in-up"
                style={{ background: "rgba(224,58,47,0.2)", color: "#E03A2F", borderColor: "rgba(224,58,47,0.3)" }}>
                <span className="w-1.5 h-1.5 rounded-full animate-pulse" style={{ background: "#E03A2F" }} />
                Профессиональный детейлинг
              </div>
              <h1 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold text-white leading-tight mb-6 animate-fade-in-up" style={{ animationDelay: "0.1s" }}>
                РЕМОНТ ВМЯТИН, РЕСТАВРАЦИЯ СКОЛОВ НА ЛКП, ПОЛИРОВКА, БРОНЕПЛЕНКИ{" "}
                <span style={{ color: "#E03A2F" }}>В КРАСНОЯРСКЕ</span>
              </h1>

              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-xl mb-4 mt-8 animate-fade-in-up"
                style={{ background: "rgba(255,255,255,0.08)", border: "1px solid rgba(255,255,255,0.15)" }}>
                <span className="text-sm font-light" style={{ color: "rgba(255,255,255,0.7)" }}>Скидка 10% на любую услугу для новых клиентов</span>
              </div>
              <div className="flex flex-col sm:flex-row gap-4 animate-fade-in-up" style={{ animationDelay: "0.3s" }}>
                <button onClick={() => onBooking()}
                  className="text-white font-semibold px-8 py-4 rounded-xl transition-all flex items-center justify-center gap-2 text-base"
                  style={{ background: "#E03A2F" }}>
                  <Icon name="Tag" size={18} />
                  Получить скидку
                </button>
                <a href="#services"
                  className="border font-semibold px-8 py-4 rounded-xl transition-all flex items-center justify-center gap-2 text-base text-white"
                  style={{ borderColor: "rgba(255,255,255,0.3)" }}>
                  Наши услуги
                  <Icon name="ArrowRight" size={18} />
                </a>
              </div>

              <div className="grid grid-cols-3 gap-6 mt-12 pt-8 border-t animate-fade-in-up" style={{ borderColor: "rgba(255,255,255,0.1)", animationDelay: "0.4s" }}>
                {[["2000+", "Довольных клиентов"], ["7 лет", "На рынке"], ["100%", "Гарантия"]].map(([n, l]) => (
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

                <div className="absolute -bottom-5 left-1/2 -translate-x-1/2 rounded-xl px-5 py-2.5 shadow-2xl animate-float whitespace-nowrap" style={{ background: "#E03A2F", animationDelay: "0.5s" }}>
                  <div className="flex items-center gap-2">
                    <Icon name="Tag" size={16} style={{ color: "#fff" }} />
                    <span className="text-sm font-bold text-white">ЦЕНЫ НИЖЕ РЫНКА НА 20%</span>
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
          <AnimSection>
            <div className="text-center mb-12">
              <div className="inline-flex items-center gap-2 text-xs font-semibold px-3 py-1.5 rounded-full mb-4" style={{ background: "rgba(224,58,47,0.1)", color: "#E03A2F" }}>
                О студии
              </div>
              <h2 className="font-display text-4xl lg:text-5xl font-bold leading-tight" style={{ color: "#1A1A1A" }}>
                НАШИ <span style={{ color: "#E03A2F" }}>ПРЕИМУЩЕСТВА</span>
              </h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[
                { icon: "Award", title: "Мастера с опытом от 5 лет", desc: "Видят поведение металла на любых марках машин, от тонкого металла свежих «китайцев» до жесткого металла немецкого премиума, что позволяет им ювелирно выпрямить вмятину любой сложности." },
                { icon: "Wrench", title: "Проф. инструмент", desc: "Более 100 видов специнструмента позволяют работать по разным технологиям, как снаружи детали, без разбора, так и через технологические отверстия. Как итог мы исправляем сложные вмятины на рёбрах, кантах и в труднодоступных местах." },
                { icon: "Sparkles", title: "Премиум материалы", desc: "Используем только профессиональную химию и премиальную керамику, за счёт чего достигаем идеального покрытия. Дешёвые составы, пасты, замазки не используем принципиально." },
              ].map(({ icon, title, desc }) => (
                <div key={title} className="rounded-2xl p-7" style={{ background: "#f8fafc", borderTop: "3px solid #E03A2F" }}>
                  <div className="w-11 h-11 rounded-xl flex items-center justify-center mb-4" style={{ background: "rgba(224,58,47,0.1)" }}>
                    <Icon name={icon} size={22} style={{ color: "#E03A2F" }} />
                  </div>
                  <div className="font-semibold mb-2" style={{ color: "#1A1A1A" }}>{title}</div>
                  <p className="text-sm leading-relaxed" style={{ color: "#64748b" }}>{desc}</p>
                </div>
              ))}
            </div>
          </AnimSection>
        </div>
      </section>

      {/* ОЦЕНКА ПО ФОТО */}
      <section className="py-20" style={{ background: "#1A1A1A" }}>
        <div className="container mx-auto px-4">
          <AnimSection>
            <div className="max-w-5xl mx-auto flex flex-col lg:flex-row items-center gap-12">
              {/* Левая часть */}
              <div className="flex-1 text-center lg:text-left">
                <h2 className="font-display text-4xl lg:text-5xl font-bold text-white leading-tight mb-4">
                  Оценим стоимость<br />
                  <span style={{ color: "#E03A2F" }}>ремонта по фото</span>
                </h2>
                <p className="text-lg mb-10" style={{ color: "rgba(255,255,255,0.6)" }}>
                  Отправьте фото дефекта в Telegram или MAX — ответим в течение 15 минут
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start items-center">
                  <a href={TG_PERSONAL} target="_blank" rel="noopener noreferrer"
                    className="flex items-center gap-2 px-6 py-3 rounded-xl font-semibold text-white transition-opacity hover:opacity-90"
                    style={{ background: "#229ED9", minWidth: 160 }}>
                    <Icon name="Send" size={18} />
                    Telegram
                  </a>
                  <a href="https://max.ru/u/f9LHodD0cOKCDZiYPrfAzwKgdhgWjSUpfeHNOsVDtYXmjbeC9sAWi9JH2Xo" target="_blank" rel="noopener noreferrer"
                    className="flex items-center justify-center gap-2 px-6 py-3 rounded-xl font-semibold text-white transition-opacity hover:opacity-90"
                    style={{ background: "#7B2FBE", minWidth: 160 }}>
                    MAX
                  </a>
                </div>
              </div>
              {/* Правая часть — фото */}
              <div className="flex-shrink-0 w-72 lg:w-80">
                <img
                  src="https://cdn.poehali.dev/projects/b7be89c6-98d3-4f92-87a9-f9ec436b4c39/bucket/0335264a-eb36-42eb-b2e0-00557fcd13f9.jpg"
                  alt="Оценка ремонта по фото в Telegram"
                  className="w-full drop-shadow-2xl"
                />
              </div>
            </div>
          </AnimSection>
        </div>
      </section>
    </>
  );
}