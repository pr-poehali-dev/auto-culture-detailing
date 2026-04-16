import { useRef, useState, useEffect, useCallback } from "react";
import Icon from "@/components/ui/icon";
import { SERVICES, PORTFOLIO_ITEMS, STEPS, PROMOS, LOGO_URL, PHONE, PHONE_HREF, ADDRESS, WORKING_HOURS, TG_PERSONAL, TG_GROUP } from "@/lib/detailing-data";

function useInView(threshold = 0.15) {
  const ref = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setInView(true); obs.disconnect(); } },
      { threshold }
    );
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, [threshold]);
  return { ref, inView };
}

function AnimSection({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  const { ref, inView } = useInView();
  return (
    <div ref={ref} className={`transition-all duration-700 ${inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"} ${className}`}>
      {children}
    </div>
  );
}

const TG_URL = "https://functions.poehali.dev/271787e5-fcae-4b1f-9abd-a763fd8592b7";

interface SectionsProps {
  onBooking: (service?: string) => void;
}

function QuickForm() {
  const [qName, setQName] = useState("");
  const [qPhone, setQPhone] = useState("");
  const [qService, setQService] = useState("");
  const [qComment, setQComment] = useState("");
  const [qSending, setQSending] = useState(false);
  const [qDone, setQDone] = useState(false);

  const handleSend = useCallback(async () => {
    if (!qName || !qPhone) return;
    setQSending(true);
    try {
      await fetch(TG_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ type: "quick", name: qName, phone: qPhone, service: qService || "—", comment: qComment || "—" }),
      });
    } catch (e) { console.error(e); }
    setQSending(false);
    setQDone(true);
  }, [qName, qPhone, qService, qComment]);

  if (qDone) {
    return (
      <div className="text-center py-8">
        <div className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4" style={{ background: "rgba(224,58,47,0.1)" }}>
          <Icon name="CheckCircle" size={32} style={{ color: "#E03A2F" }} />
        </div>
        <h4 className="font-display text-xl font-bold mb-2" style={{ color: "#1A1A1A" }}>Заявка отправлена!</h4>
        <p className="text-sm" style={{ color: "#64748b" }}>Перезвоним вам в течение 15 минут</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <input type="text" value={qName} onChange={e => setQName(e.target.value)} placeholder="Ваше имя *"
        className="w-full rounded-xl px-4 py-3 text-sm focus:outline-none transition-colors bg-white"
        style={{ border: "2px solid #e2e8f0" }}
        onFocus={e => (e.target.style.borderColor = "#E03A2F")}
        onBlur={e => (e.target.style.borderColor = "#e2e8f0")} />
      <input type="tel" value={qPhone} onChange={e => setQPhone(e.target.value)} placeholder="+7 (___) ___-__-__ *"
        className="w-full rounded-xl px-4 py-3 text-sm focus:outline-none transition-colors bg-white"
        style={{ border: "2px solid #e2e8f0" }}
        onFocus={e => (e.target.style.borderColor = "#E03A2F")}
        onBlur={e => (e.target.style.borderColor = "#e2e8f0")} />
      <select value={qService} onChange={e => setQService(e.target.value)}
        className="w-full rounded-xl px-4 py-3 text-sm focus:outline-none transition-colors bg-white"
        style={{ border: "2px solid #e2e8f0", color: qService ? "#1A1A1A" : "#94a3b8" }}>
        <option value="">Выберите услугу</option>
        {SERVICES.map(s => <option key={s.title} value={s.title} style={{ color: "#1A1A1A" }}>{s.title}</option>)}
      </select>
      <textarea value={qComment} onChange={e => setQComment(e.target.value)} placeholder="Комментарий (необязательно)" rows={3}
        className="w-full rounded-xl px-4 py-3 text-sm focus:outline-none transition-colors bg-white resize-none"
        style={{ border: "2px solid #e2e8f0" }}
        onFocus={e => (e.target.style.borderColor = "#E03A2F")}
        onBlur={e => (e.target.style.borderColor = "#e2e8f0")} />
      <button onClick={handleSend} disabled={!qName || !qPhone || qSending}
        className="w-full text-white font-semibold py-3.5 rounded-xl transition-all"
        style={{ background: qName && qPhone ? "#E03A2F" : "#e2e8f0", color: qName && qPhone ? "white" : "#94a3b8", cursor: qName && qPhone ? "pointer" : "not-allowed" }}>
        {qSending ? "Отправка..." : "Отправить заявку"}
      </button>
      <p className="text-xs text-center" style={{ color: "#94a3b8" }}>
        Нажимая кнопку, вы соглашаетесь с политикой обработки данных
      </p>
    </div>
  );
}

export default function PageSections({ onBooking }: SectionsProps) {
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
                <span style={{ color: "#E03A2F" }}>ДОСТОИН</span><br />
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
                <div className="w-full h-80 rounded-3xl border flex items-center justify-center overflow-hidden"
                  style={{ background: "linear-gradient(135deg, rgba(224,58,47,0.3), rgba(224,58,47,0.05))", borderColor: "rgba(224,58,47,0.2)" }}>
                  <div className="text-center">
                    <div className="w-32 h-32 rounded-full flex items-center justify-center mx-auto mb-4 animate-float"
                      style={{ background: "rgba(224,58,47,0.2)" }}>
                      <Icon name="Car" size={64} style={{ color: "#E03A2F" }} />
                    </div>
                    <p className="text-sm" style={{ color: "rgba(255,255,255,0.4)" }}>Портфолио работ</p>
                  </div>
                </div>

                <div className="absolute -top-4 -right-4 bg-white rounded-xl p-3 shadow-2xl flex items-center gap-2 animate-float" style={{ animationDelay: "0.2s" }}>
                  <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ background: "rgba(74,74,74,0.1)" }}>
                    <Icon name="Star" size={16} style={{ color: "#4A4A4A" }} />
                  </div>
                  <div>
                    <div className="text-xs font-bold" style={{ color: "#1A1A1A" }}>4.9 / 5.0</div>
                    <div className="text-[10px]" style={{ color: "#64748b" }}>500+ отзывов</div>
                  </div>
                </div>

                <div className="absolute -bottom-4 -left-4 bg-white rounded-xl p-3 shadow-2xl animate-float" style={{ animationDelay: "0.5s" }}>
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ background: "rgba(224,58,47,0.1)" }}>
                      <Icon name="CheckCircle" size={16} style={{ color: "#E03A2F" }} />
                    </div>
                    <div>
                      <div className="text-xs font-bold" style={{ color: "#1A1A1A" }}>Готово!</div>
                      <div className="text-[10px]" style={{ color: "#64748b" }}>BMW 5 Series</div>
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
                Используем только сертифицированные профессиональные материалы ведущих мировых брендов. Каждый мастер проходит регулярную аттестацию.
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
                  <div className="grid grid-cols-2 h-48">
                    <div className="flex items-center justify-center relative" style={{ background: item.colorBefore }}>
                      <div className="absolute top-3 left-3 text-white text-xs px-2 py-1 rounded font-medium" style={{ background: "rgba(0,0,0,0.5)" }}>До</div>
                      <Icon name="Car" size={48} style={{ color: "rgba(255,255,255,0.4)" }} />
                    </div>
                    <div className="flex items-center justify-center relative" style={{ background: item.colorAfter }}>
                      <div className="absolute top-3 right-3 text-xs px-2 py-1 rounded font-semibold" style={{ background: "rgba(255,255,255,0.9)", color: "#1A1A1A" }}>После</div>
                      <Icon name="Sparkles" size={48} style={{ color: "rgba(255,255,255,0.6)" }} />
                    </div>
                  </div>
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

      {/* PROCESS */}
      <section id="process" className="py-24 relative overflow-hidden" style={{ background: "#1A1A1A" }}>
        <div className="absolute inset-0">
          <div className="absolute top-0 right-0 w-96 h-96 rounded-full blur-3xl" style={{ background: "rgba(224,58,47,0.1)" }} />
          <div className="absolute bottom-0 left-0 w-72 h-72 rounded-full blur-3xl" style={{ background: "rgba(74,74,74,0.1)" }} />
        </div>
        <div className="container mx-auto px-4 relative z-10">
          <AnimSection className="text-center mb-14">
            <div className="inline-flex items-center gap-2 text-xs font-semibold px-3 py-1.5 rounded-full mb-4" style={{ background: "rgba(255,255,255,0.1)", color: "white" }}>
              Как мы работаем
            </div>
            <h2 className="font-display text-4xl lg:text-5xl font-bold text-white mb-4">
              4 ШАГА ДО<br />
              <span style={{ color: "#E03A2F" }}>ИДЕАЛЬНОГО АВТО</span>
            </h2>
          </AnimSection>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {STEPS.map((step) => (
              <AnimSection key={step.num}>
                <div className="rounded-2xl p-6 hover:bg-white/10 transition-all" style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.1)" }}>
                  <div className="font-display text-5xl font-bold mb-3 leading-none" style={{ color: "rgba(224,58,47,0.2)" }}>{step.num}</div>
                  <div className="w-10 h-10 rounded-xl flex items-center justify-center mb-4" style={{ background: "rgba(224,58,47,0.2)" }}>
                    <Icon name={step.icon} size={20} style={{ color: "#E03A2F" }} />
                  </div>
                  <h3 className="font-display text-lg font-bold text-white mb-2">{step.title}</h3>
                  <p className="text-sm leading-relaxed" style={{ color: "rgba(255,255,255,0.5)" }}>{step.desc}</p>
                </div>
              </AnimSection>
            ))}
          </div>

          <AnimSection className="text-center mt-12">
            <button onClick={() => onBooking()}
              className="text-white font-semibold px-10 py-4 rounded-xl transition-all inline-flex items-center gap-2 text-base"
              style={{ background: "#E03A2F" }}>
              <Icon name="Calendar" size={18} />
              Записаться прямо сейчас
            </button>
          </AnimSection>
        </div>
      </section>

      {/* PROMO */}
      <section id="promo" className="py-24" style={{ background: "#f8fafc" }}>
        <div className="container mx-auto px-4">
          <AnimSection className="text-center mb-14">
            <div className="inline-flex items-center gap-2 text-xs font-semibold px-3 py-1.5 rounded-full mb-4" style={{ background: "rgba(74,74,74,0.1)", color: "#4A4A4A" }}>
              Акции
            </div>
            <h2 className="font-display text-4xl lg:text-5xl font-bold mb-4" style={{ color: "#1A1A1A" }}>
              СПЕЦИАЛЬНЫЕ <span style={{ color: "#4A4A4A" }}>ПРЕДЛОЖЕНИЯ</span>
            </h2>
          </AnimSection>

          <div className="grid md:grid-cols-3 gap-6">
            {PROMOS.map((p) => (
              <AnimSection key={p.title}>
                <div className="rounded-2xl p-8 text-white h-full flex flex-col card-hover" style={{ background: p.bg }}>
                  <div className="font-display text-5xl font-bold mb-4 opacity-90">{p.badge}</div>
                  <h3 className="font-display text-2xl font-bold mb-3">{p.title}</h3>
                  <p className="text-sm leading-relaxed flex-1 mb-6" style={{ color: "rgba(255,255,255,0.7)" }}>{p.desc}</p>
                  <button onClick={() => onBooking()}
                    className="border-2 text-white font-semibold py-3 rounded-xl transition-all text-sm w-full hover:bg-white/20"
                    style={{ borderColor: "rgba(255,255,255,0.4)" }}>
                    Воспользоваться
                  </button>
                </div>
              </AnimSection>
            ))}
          </div>
        </div>
      </section>

      {/* CONTACTS */}
      <section id="contacts" className="py-24 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-16">
            <AnimSection>
              <div className="inline-flex items-center gap-2 text-xs font-semibold px-3 py-1.5 rounded-full mb-4" style={{ background: "rgba(224,58,47,0.1)", color: "#E03A2F" }}>
                Контакты
              </div>
              <h2 className="font-display text-4xl lg:text-5xl font-bold leading-tight mb-8" style={{ color: "#1A1A1A" }}>
                ГОТОВЫ ВАС<br />
                <span style={{ color: "#E03A2F" }}>ПРИНЯТЬ</span>
              </h2>

              <div className="space-y-4">
                {[
                  { icon: "Phone", label: "Телефон", val: PHONE, href: PHONE_HREF },
                  { icon: "Send", label: "Telegram (написать)", val: "@Artem_Autoculture", href: TG_PERSONAL },
                  { icon: "MapPin", label: "Адрес студии", val: ADDRESS, href: "#" },
                  { icon: "Clock", label: "Режим работы", val: WORKING_HOURS, href: null },
                ].map(({ icon, label, val, href }) => (
                  <div key={label} className="flex items-center gap-4 p-4 rounded-xl transition-colors hover:bg-red-50" style={{ background: "#f8fafc" }}>
                    <div className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0" style={{ background: "rgba(224,58,47,0.1)" }}>
                      <Icon name={icon} size={18} style={{ color: "#E03A2F" }} />
                    </div>
                    <div>
                      <div className="text-xs font-medium" style={{ color: "#94a3b8" }}>{label}</div>
                      {href ? (
                        <a href={href} className="font-semibold hover:text-red-600 transition-colors" style={{ color: "#1A1A1A" }}>{val}</a>
                      ) : (
                        <div className="font-semibold" style={{ color: "#1A1A1A" }}>{val}</div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </AnimSection>

            <AnimSection>
              <div className="rounded-2xl p-8" style={{ background: "#f8fafc" }}>
                <h3 className="font-display text-2xl font-bold mb-2" style={{ color: "#1A1A1A" }}>Быстрая заявка</h3>
                <p className="text-sm mb-6" style={{ color: "#64748b" }}>Оставьте контакты — перезвоним в течение 15 минут</p>
                <QuickForm />
              </div>
            </AnimSection>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="py-12 text-white" style={{ background: "#1A1A1A" }}>
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-3 gap-8 mb-8">
            <div>
              <div className="mb-4">
                <img
                  src={LOGO_URL}
                  alt="Автокультура"
                  className="h-14 w-auto object-contain"
                  style={{ filter: "brightness(0) invert(1)" }}
                />
              </div>
              <p className="text-sm leading-relaxed" style={{ color: "rgba(255,255,255,0.5)" }}>
                Профессиональный автодетейлинг. Возвращаем автомобилю заводской блеск.
              </p>
            </div>
            <div>
              <h4 className="font-display text-sm font-bold uppercase tracking-wider mb-4" style={{ color: "rgba(255,255,255,0.4)" }}>Услуги</h4>
              <div className="space-y-2">
                {SERVICES.slice(0, 4).map(s => (
                  <div key={s.title} className="text-sm cursor-pointer transition-colors hover:text-red-400" style={{ color: "rgba(255,255,255,0.5)" }}>{s.title}</div>
                ))}
              </div>
            </div>
            <div>
              <h4 className="font-display text-sm font-bold uppercase tracking-wider mb-4" style={{ color: "rgba(255,255,255,0.4)" }}>Контакты</h4>
              <div className="space-y-2 text-sm" style={{ color: "rgba(255,255,255,0.5)" }}>
                <div>{PHONE}</div>
                <div>{ADDRESS}</div>
                <div>{WORKING_HOURS}</div>
                <a href={TG_GROUP} target="_blank" rel="noopener noreferrer"
                  className="flex items-center gap-1.5 hover:text-blue-400 transition-colors pt-1">
                  <Icon name="Send" size={13} />
                  Наш Telegram-канал
                </a>
              </div>
            </div>
          </div>
          <div className="flex flex-col md:flex-row justify-between items-center gap-3 pt-6" style={{ borderTop: "1px solid rgba(255,255,255,0.1)" }}>
            <p className="text-sm" style={{ color: "rgba(255,255,255,0.3)" }}>© 2024 Автокультура. Все права защищены.</p>
            <button onClick={() => onBooking()}
              className="text-white text-sm font-semibold px-6 py-2.5 rounded-lg transition-all"
              style={{ background: "#E03A2F" }}>
              Записаться онлайн
            </button>
          </div>
        </div>
      </footer>
    </>
  );
}