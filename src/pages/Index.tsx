import { useState, useEffect, useRef } from "react";
import Icon from "@/components/ui/icon";

const NAV_LINKS = [
  { href: "#home", label: "Главная" },
  { href: "#about", label: "О нас" },
  { href: "#services", label: "Услуги" },
  { href: "#portfolio", label: "Портфолио" },
  { href: "#process", label: "Как работаем" },
  { href: "#promo", label: "Акции" },
  { href: "#contacts", label: "Контакты" },
];

const SERVICES = [
  { icon: "Sparkles", title: "Полировка кузова", desc: "Устранение царапин, голограмм и дефектов ЛКП. Возврат зеркального блеска.", price: "от 8 000 ₽", tag: "Популярное" },
  { icon: "Shield", title: "Керамическое покрытие", desc: "Нано-защита на 3–5 лет. Гидрофобный эффект и защита от UV-излучения.", price: "от 25 000 ₽", tag: "Хит" },
  { icon: "Droplets", title: "Химчистка салона", desc: "Глубокая очистка всех поверхностей, удаление стойких запахов и пятен.", price: "от 5 000 ₽", tag: null },
  { icon: "Car", title: "Детейлинг-мойка", desc: "Ручная мойка с обработкой порогов, колёсных арок и скрытых полостей.", price: "от 3 000 ₽", tag: null },
  { icon: "Zap", title: "Бронирование плёнкой", desc: "PPF-плёнка на капот, бампер или весь автомобиль. Защита от сколов.", price: "от 15 000 ₽", tag: "Новинка" },
  { icon: "Star", title: "Комплексный детейлинг", desc: "Полный цикл: мойка, полировка, химчистка, озонирование, защитное покрытие.", price: "от 40 000 ₽", tag: "VIP" },
];

const PORTFOLIO_ITEMS = [
  { car: "BMW 5 Series", service: "Полировка + керамика", result: "−95% царапин", colorBefore: "#9ca3af", colorAfter: "#0d9488" },
  { car: "Mercedes GLC", service: "PPF + тонировка", result: "Защита 5 лет", colorBefore: "#6b7280", colorAfter: "#f97316" },
  { car: "Porsche Cayenne", service: "Комплексный детейлинг", result: "Как из салона", colorBefore: "#d1d5db", colorAfter: "#14b8a6" },
  { car: "Toyota Camry", service: "Химчистка + озон", result: "Полное обновление", colorBefore: "#4b5563", colorAfter: "#fb923c" },
];

const STEPS = [
  { num: "01", icon: "PhoneCall", title: "Онлайн-запись", desc: "Выбираете услугу, дату и удобное время через форму на сайте" },
  { num: "02", icon: "ClipboardCheck", title: "Осмотр авто", desc: "Мастер осматривает автомобиль и составляет детальный план работ" },
  { num: "03", icon: "Wrench", title: "Выполнение работ", desc: "Работаем аккуратно с применением профессиональной химии и оборудования" },
  { num: "04", icon: "CheckCircle", title: "Приёмка и выдача", desc: "Показываем результат, проводим финальную проверку качества" },
];

const PROMOS = [
  { badge: "−20%", title: "Первый визит", desc: "Скидка 20% на любую услугу для новых клиентов. Действует до конца месяца.", bg: "#0d9488" },
  { badge: "2+1", title: "Комплекс выгоды", desc: "При заказе мойки + полировки химчистка салона в подарок.", bg: "#f97316" },
  { badge: "VIP", title: "Абонемент", desc: "8 ручных моек по цене 6. Закрепляем персонального мастера.", bg: "#0f172a" },
];

const TIMES = ["09:00", "10:00", "11:00", "12:00", "13:00", "14:00", "15:00", "16:00", "17:00", "18:00", "19:00", "20:00"];
const DAY_NAMES = ["вс", "пн", "вт", "ср", "чт", "пт", "сб"];
const MONTH_NAMES = ["янв", "фев", "мар", "апр", "май", "июн", "июл", "авг", "сен", "окт", "ноя", "дек"];

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

export default function Index() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [bookingOpen, setBookingOpen] = useState(false);
  const [selectedService, setSelectedService] = useState("");
  const [selectedDate, setSelectedDate] = useState("");
  const [selectedTime, setSelectedTime] = useState("");
  const [bookingStep, setBookingStep] = useState(1);
  const [bookingDone, setBookingDone] = useState(false);
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const openBooking = (service = "") => {
    setSelectedService(service);
    setBookingStep(1);
    setBookingDone(false);
    setName("");
    setPhone("");
    setSelectedDate("");
    setSelectedTime("");
    setBookingOpen(true);
  };

  const today = new Date();
  const dates = Array.from({ length: 14 }, (_, i) => {
    const d = new Date(today);
    d.setDate(today.getDate() + i + 1);
    return d;
  });

  return (
    <div className="min-h-screen bg-white font-body overflow-x-hidden">

      {/* NAVBAR */}
      <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? "bg-white/95 backdrop-blur-md shadow-sm py-3" : "bg-transparent py-5"}`}>
        <div className="container mx-auto px-4 flex items-center justify-between">
          <a href="#home" className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-md flex items-center justify-center" style={{ background: "#0d9488" }}>
              <Icon name="Car" size={18} className="text-white" />
            </div>
            <span className="font-display text-xl font-bold tracking-wide" style={{ color: "#0f172a" }}>
              АВТО<span style={{ color: "#0d9488" }}>КУЛЬТУРА</span>
            </span>
          </a>

          <nav className="hidden lg:flex items-center gap-6">
            {NAV_LINKS.map(l => (
              <a key={l.href} href={l.href}
                className="text-sm font-medium transition-colors hover:text-teal-600"
                style={{ color: scrolled ? "rgba(15,23,42,0.7)" : "rgba(255,255,255,0.8)" }}>
                {l.label}
              </a>
            ))}
          </nav>

          <div className="flex items-center gap-3">
            <a href="tel:+79001234567"
              className="hidden md:flex items-center gap-1.5 text-sm font-semibold transition-colors hover:text-teal-600"
              style={{ color: scrolled ? "#0f172a" : "white" }}>
              <Icon name="Phone" size={15} />
              +7 (900) 123-45-67
            </a>
            <button onClick={() => openBooking()}
              className="text-white text-sm font-semibold px-4 py-2 rounded-lg transition-all hidden md:block"
              style={{ background: "#0d9488" }}>
              Записаться
            </button>
            <button onClick={() => setMenuOpen(!menuOpen)}
              className="lg:hidden p-2"
              style={{ color: scrolled ? "#0f172a" : "white" }}>
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
              <button onClick={() => { openBooking(); setMenuOpen(false); }}
                className="mt-2 text-white font-semibold py-3 rounded-lg"
                style={{ background: "#0d9488" }}>
                Записаться онлайн
              </button>
            </div>
          </div>
        )}
      </header>

      {/* HERO */}
      <section id="home" className="relative min-h-screen flex items-center overflow-hidden" style={{ background: "#0f172a" }}>
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-32 -right-32 w-96 h-96 rounded-full blur-3xl animate-float" style={{ background: "rgba(13,148,136,0.2)" }} />
          <div className="absolute bottom-0 -left-32 w-80 h-80 rounded-full blur-3xl animate-float" style={{ background: "rgba(249,115,22,0.15)", animationDelay: "0.7s" }} />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full blur-3xl" style={{ background: "rgba(13,148,136,0.05)" }} />
          <div className="absolute inset-0 opacity-5"
            style={{ backgroundImage: "linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)", backgroundSize: "60px 60px" }} />
        </div>

        <div className="container mx-auto px-4 pt-24 pb-16 relative z-10">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="inline-flex items-center gap-2 border text-xs font-semibold px-3 py-1.5 rounded-full mb-6 animate-fade-in-up"
                style={{ background: "rgba(13,148,136,0.2)", color: "#2dd4bf", borderColor: "rgba(13,148,136,0.3)" }}>
                <span className="w-1.5 h-1.5 rounded-full animate-pulse" style={{ background: "#2dd4bf" }} />
                Профессиональный детейлинг
              </div>
              <h1 className="font-display text-5xl md:text-6xl lg:text-7xl font-bold text-white leading-tight mb-6 animate-fade-in-up" style={{ animationDelay: "0.1s" }}>
                БЛЕСК<br />
                <span style={{ color: "#2dd4bf" }}>ВАШЕГО</span><br />
                АВТО
              </h1>
              <p className="text-lg font-light leading-relaxed mb-8 max-w-md animate-fade-in-up" style={{ color: "rgba(255,255,255,0.6)", animationDelay: "0.2s" }}>
                Возвращаем автомобилю заводской вид. Профессиональная химия, современное оборудование, гарантия результата.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 animate-fade-in-up" style={{ animationDelay: "0.3s" }}>
                <button onClick={() => openBooking()}
                  className="text-white font-semibold px-8 py-4 rounded-xl transition-all flex items-center justify-center gap-2 text-base"
                  style={{ background: "#0d9488" }}>
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
                    <div className="font-display text-3xl font-bold mb-1" style={{ color: "#2dd4bf" }}>{n}</div>
                    <div className="text-xs font-medium" style={{ color: "rgba(255,255,255,0.5)" }}>{l}</div>
                  </div>
                ))}
              </div>
            </div>

            <div className="relative hidden lg:flex items-center justify-center animate-scale-in" style={{ animationDelay: "0.3s" }}>
              <div className="relative w-full max-w-lg">
                <div className="w-full h-80 rounded-3xl border flex items-center justify-center overflow-hidden"
                  style={{ background: "linear-gradient(135deg, rgba(13,148,136,0.3), rgba(13,148,136,0.05))", borderColor: "rgba(13,148,136,0.2)" }}>
                  <div className="text-center">
                    <div className="w-32 h-32 rounded-full flex items-center justify-center mx-auto mb-4 animate-float"
                      style={{ background: "rgba(13,148,136,0.2)" }}>
                      <Icon name="Car" size={64} className="text-teal-400" />
                    </div>
                    <p className="text-sm" style={{ color: "rgba(255,255,255,0.4)" }}>Портфолио работ</p>
                  </div>
                </div>

                <div className="absolute -top-4 -right-4 bg-white rounded-xl p-3 shadow-2xl flex items-center gap-2 animate-float" style={{ animationDelay: "0.2s" }}>
                  <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ background: "rgba(249,115,22,0.1)" }}>
                    <Icon name="Star" size={16} style={{ color: "#f97316" }} />
                  </div>
                  <div>
                    <div className="text-xs font-bold" style={{ color: "#0f172a" }}>4.9 / 5.0</div>
                    <div className="text-[10px]" style={{ color: "#64748b" }}>500+ отзывов</div>
                  </div>
                </div>

                <div className="absolute -bottom-4 -left-4 bg-white rounded-xl p-3 shadow-2xl animate-float" style={{ animationDelay: "0.5s" }}>
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ background: "rgba(13,148,136,0.1)" }}>
                      <Icon name="CheckCircle" size={16} style={{ color: "#0d9488" }} />
                    </div>
                    <div>
                      <div className="text-xs font-bold" style={{ color: "#0f172a" }}>Готово!</div>
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
                      { icon: "Award", label: "7 лет опыта", color: "#0d9488" },
                      { icon: "Users", label: "15 мастеров", color: "#f97316" },
                      { icon: "MapPin", label: "2 студии", color: "#0d9488" },
                      { icon: "Wrench", label: "Проф. оборудование", color: "#f97316" },
                    ].map(({ icon, label, color }) => (
                      <div key={label} className="bg-white rounded-2xl p-5 shadow-sm flex flex-col items-center gap-2 text-center">
                        <Icon name={icon} size={28} style={{ color }} />
                        <span className="text-sm font-semibold" style={{ color: "#0f172a" }}>{label}</span>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="absolute -bottom-4 -right-4 w-24 h-24 rounded-2xl flex items-center justify-center shadow-xl" style={{ background: "#f97316" }}>
                  <div className="text-center text-white">
                    <div className="font-display text-2xl font-bold">№1</div>
                    <div className="text-[10px] font-medium opacity-90">в городе</div>
                  </div>
                </div>
              </div>
            </AnimSection>

            <AnimSection>
              <div className="inline-flex items-center gap-2 text-xs font-semibold px-3 py-1.5 rounded-full mb-4" style={{ background: "rgba(13,148,136,0.1)", color: "#0d9488" }}>
                О студии
              </div>
              <h2 className="font-display text-4xl lg:text-5xl font-bold leading-tight mb-6" style={{ color: "#0f172a" }}>
                МЫ ДЕЛАЕМ<br />
                <span style={{ color: "#0d9488" }}>БОЛЬШЕ,</span> ЧЕМ<br />
                ПРОСТО МОЙКУ
              </h2>
              <p className="leading-relaxed mb-4" style={{ color: "#64748b" }}>
                DetailPro — это профессиональная студия автодетейлинга с 7-летней историей. Мы работаем с автомобилями любого класса: от семейных седанов до суперкаров.
              </p>
              <p className="leading-relaxed mb-8" style={{ color: "#64748b" }}>
                Используем только сертифицированную химию и материалы ведущих мировых брендов. Каждый мастер проходит ежегодную аттестацию.
              </p>
              <div className="flex flex-wrap gap-3">
                {["Сертифицированные мастера", "Профи химия", "Гарантия на работы", "Фотоотчёт"].map(tag => (
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
            <div className="inline-flex items-center gap-2 text-xs font-semibold px-3 py-1.5 rounded-full mb-4" style={{ background: "rgba(13,148,136,0.1)", color: "#0d9488" }}>
              Услуги
            </div>
            <h2 className="font-display text-4xl lg:text-5xl font-bold mb-4" style={{ color: "#0f172a" }}>
              ЧТО МЫ <span style={{ color: "#0d9488" }}>ПРЕДЛАГАЕМ</span>
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
                      style={{ background: (s.tag === "Хит" || s.tag === "VIP") ? "#f97316" : "#0d9488" }}>
                      {s.tag}
                    </span>
                  )}
                  <div className="w-12 h-12 rounded-xl flex items-center justify-center mb-4" style={{ background: "rgba(13,148,136,0.1)" }}>
                    <Icon name={s.icon} size={24} style={{ color: "#0d9488" }} />
                  </div>
                  <h3 className="font-display text-xl font-bold mb-2" style={{ color: "#0f172a" }}>{s.title}</h3>
                  <p className="text-sm leading-relaxed flex-1 mb-4" style={{ color: "#64748b" }}>{s.desc}</p>
                  <div className="flex items-center justify-between mt-auto pt-4 border-t" style={{ borderColor: "#f8fafc" }}>
                    <span className="font-display text-lg font-bold" style={{ color: "#0d9488" }}>{s.price}</span>
                    <button onClick={() => openBooking(s.title)}
                      className="text-sm font-semibold px-4 py-2 rounded-lg border transition-all hover:text-white"
                      style={{ color: "#0d9488", borderColor: "#0d9488" }}
                      onMouseOver={e => { (e.target as HTMLElement).style.background = "#0d9488"; (e.target as HTMLElement).style.color = "white"; }}
                      onMouseOut={e => { (e.target as HTMLElement).style.background = "transparent"; (e.target as HTMLElement).style.color = "#0d9488"; }}>
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
            <div className="inline-flex items-center gap-2 text-xs font-semibold px-3 py-1.5 rounded-full mb-4" style={{ background: "rgba(249,115,22,0.1)", color: "#f97316" }}>
              Портфолио
            </div>
            <h2 className="font-display text-4xl lg:text-5xl font-bold mb-4" style={{ color: "#0f172a" }}>
              НАШИ <span style={{ color: "#f97316" }}>РАБОТЫ</span>
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
                      <div className="absolute top-3 right-3 text-xs px-2 py-1 rounded font-semibold" style={{ background: "rgba(255,255,255,0.9)", color: "#0f172a" }}>После</div>
                      <Icon name="Sparkles" size={48} style={{ color: "rgba(255,255,255,0.6)" }} />
                    </div>
                  </div>
                  <div className="p-5 bg-white">
                    <div className="flex items-center justify-between">
                      <div>
                        <h4 className="font-display text-lg font-bold" style={{ color: "#0f172a" }}>{item.car}</h4>
                        <p className="text-sm" style={{ color: "#64748b" }}>{item.service}</p>
                      </div>
                      <span className="text-xs font-semibold px-3 py-1.5 rounded-full" style={{ background: "rgba(13,148,136,0.1)", color: "#0d9488" }}>
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
      <section id="process" className="py-24 relative overflow-hidden" style={{ background: "#0f172a" }}>
        <div className="absolute inset-0">
          <div className="absolute top-0 right-0 w-96 h-96 rounded-full blur-3xl" style={{ background: "rgba(13,148,136,0.1)" }} />
          <div className="absolute bottom-0 left-0 w-72 h-72 rounded-full blur-3xl" style={{ background: "rgba(249,115,22,0.1)" }} />
        </div>
        <div className="container mx-auto px-4 relative z-10">
          <AnimSection className="text-center mb-14">
            <div className="inline-flex items-center gap-2 text-xs font-semibold px-3 py-1.5 rounded-full mb-4" style={{ background: "rgba(255,255,255,0.1)", color: "white" }}>
              Как мы работаем
            </div>
            <h2 className="font-display text-4xl lg:text-5xl font-bold text-white mb-4">
              4 ШАГА ДО<br />
              <span style={{ color: "#2dd4bf" }}>ИДЕАЛЬНОГО АВТО</span>
            </h2>
          </AnimSection>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {STEPS.map((step) => (
              <AnimSection key={step.num}>
                <div className="rounded-2xl p-6 hover:bg-white/10 transition-all" style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.1)" }}>
                  <div className="font-display text-5xl font-bold mb-3 leading-none" style={{ color: "rgba(13,148,136,0.2)" }}>{step.num}</div>
                  <div className="w-10 h-10 rounded-xl flex items-center justify-center mb-4" style={{ background: "rgba(13,148,136,0.2)" }}>
                    <Icon name={step.icon} size={20} style={{ color: "#2dd4bf" }} />
                  </div>
                  <h3 className="font-display text-lg font-bold text-white mb-2">{step.title}</h3>
                  <p className="text-sm leading-relaxed" style={{ color: "rgba(255,255,255,0.5)" }}>{step.desc}</p>
                </div>
              </AnimSection>
            ))}
          </div>

          <AnimSection className="text-center mt-12">
            <button onClick={() => openBooking()}
              className="text-white font-semibold px-10 py-4 rounded-xl transition-all inline-flex items-center gap-2 text-base"
              style={{ background: "#0d9488" }}>
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
            <div className="inline-flex items-center gap-2 text-xs font-semibold px-3 py-1.5 rounded-full mb-4" style={{ background: "rgba(249,115,22,0.1)", color: "#f97316" }}>
              Акции
            </div>
            <h2 className="font-display text-4xl lg:text-5xl font-bold mb-4" style={{ color: "#0f172a" }}>
              СПЕЦИАЛЬНЫЕ <span style={{ color: "#f97316" }}>ПРЕДЛОЖЕНИЯ</span>
            </h2>
          </AnimSection>

          <div className="grid md:grid-cols-3 gap-6">
            {PROMOS.map((p) => (
              <AnimSection key={p.title}>
                <div className="rounded-2xl p-8 text-white h-full flex flex-col card-hover" style={{ background: p.bg }}>
                  <div className="font-display text-5xl font-bold mb-4 opacity-90">{p.badge}</div>
                  <h3 className="font-display text-2xl font-bold mb-3">{p.title}</h3>
                  <p className="text-sm leading-relaxed flex-1 mb-6" style={{ color: "rgba(255,255,255,0.7)" }}>{p.desc}</p>
                  <button onClick={() => openBooking()}
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
              <div className="inline-flex items-center gap-2 text-xs font-semibold px-3 py-1.5 rounded-full mb-4" style={{ background: "rgba(13,148,136,0.1)", color: "#0d9488" }}>
                Контакты
              </div>
              <h2 className="font-display text-4xl lg:text-5xl font-bold leading-tight mb-8" style={{ color: "#0f172a" }}>
                ГОТОВЫ ВАС<br />
                <span style={{ color: "#0d9488" }}>ПРИНЯТЬ</span>
              </h2>

              <div className="space-y-4">
                {[
                  { icon: "Phone", label: "Телефон", val: "+7 (900) 123-45-67", href: "tel:+79001234567" },
                  { icon: "MessageCircle", label: "WhatsApp / Telegram", val: "@detailpro", href: "#" },
                  { icon: "MapPin", label: "Адрес студии", val: "ул. Автомобильная, 15", href: "#" },
                  { icon: "Clock", label: "Режим работы", val: "Ежедневно 8:00 — 21:00", href: null },
                ].map(({ icon, label, val, href }) => (
                  <div key={label} className="flex items-center gap-4 p-4 rounded-xl transition-colors hover:bg-teal-50" style={{ background: "#f8fafc" }}>
                    <div className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0" style={{ background: "rgba(13,148,136,0.1)" }}>
                      <Icon name={icon} size={18} style={{ color: "#0d9488" }} />
                    </div>
                    <div>
                      <div className="text-xs font-medium" style={{ color: "#94a3b8" }}>{label}</div>
                      {href ? (
                        <a href={href} className="font-semibold hover:text-teal-600 transition-colors" style={{ color: "#0f172a" }}>{val}</a>
                      ) : (
                        <div className="font-semibold" style={{ color: "#0f172a" }}>{val}</div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </AnimSection>

            <AnimSection>
              <div className="rounded-2xl p-8" style={{ background: "#f8fafc" }}>
                <h3 className="font-display text-2xl font-bold mb-2" style={{ color: "#0f172a" }}>Быстрая заявка</h3>
                <p className="text-sm mb-6" style={{ color: "#64748b" }}>Оставьте контакты — перезвоним в течение 15 минут</p>
                <div className="space-y-4">
                  <input type="text" placeholder="Ваше имя"
                    className="w-full rounded-xl px-4 py-3 text-sm focus:outline-none transition-colors bg-white"
                    style={{ border: "2px solid #e2e8f0" }}
                    onFocus={e => (e.target.style.borderColor = "#0d9488")}
                    onBlur={e => (e.target.style.borderColor = "#e2e8f0")} />
                  <input type="tel" placeholder="+7 (___) ___-__-__"
                    className="w-full rounded-xl px-4 py-3 text-sm focus:outline-none transition-colors bg-white"
                    style={{ border: "2px solid #e2e8f0" }}
                    onFocus={e => (e.target.style.borderColor = "#0d9488")}
                    onBlur={e => (e.target.style.borderColor = "#e2e8f0")} />
                  <select className="w-full rounded-xl px-4 py-3 text-sm focus:outline-none transition-colors bg-white"
                    style={{ border: "2px solid #e2e8f0", color: "#94a3b8" }}>
                    <option value="">Выберите услугу</option>
                    {SERVICES.map(s => <option key={s.title} value={s.title} style={{ color: "#0f172a" }}>{s.title}</option>)}
                  </select>
                  <textarea placeholder="Комментарий (необязательно)" rows={3}
                    className="w-full rounded-xl px-4 py-3 text-sm focus:outline-none transition-colors bg-white resize-none"
                    style={{ border: "2px solid #e2e8f0" }}
                    onFocus={e => (e.target.style.borderColor = "#0d9488")}
                    onBlur={e => (e.target.style.borderColor = "#e2e8f0")} />
                  <button className="w-full text-white font-semibold py-3.5 rounded-xl transition-all"
                    style={{ background: "#0d9488" }}>
                    Отправить заявку
                  </button>
                  <p className="text-xs text-center" style={{ color: "#94a3b8" }}>
                    Нажимая кнопку, вы соглашаетесь с политикой обработки данных
                  </p>
                </div>
              </div>
            </AnimSection>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="py-12 text-white" style={{ background: "#0f172a" }}>
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-3 gap-8 mb-8">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <div className="w-8 h-8 rounded-md flex items-center justify-center" style={{ background: "#0d9488" }}>
                  <Icon name="Car" size={18} className="text-white" />
                </div>
                <span className="font-display text-xl font-bold">АВТО<span style={{ color: "#2dd4bf" }}>КУЛЬТУРА</span></span>
              </div>
              <p className="text-sm leading-relaxed" style={{ color: "rgba(255,255,255,0.5)" }}>
                Профессиональный автодетейлинг. Возвращаем автомобилю заводской блеск.
              </p>
            </div>
            <div>
              <h4 className="font-display text-sm font-bold uppercase tracking-wider mb-4" style={{ color: "rgba(255,255,255,0.4)" }}>Услуги</h4>
              <div className="space-y-2">
                {SERVICES.slice(0, 4).map(s => (
                  <div key={s.title} className="text-sm cursor-pointer transition-colors hover:text-teal-400" style={{ color: "rgba(255,255,255,0.5)" }}>{s.title}</div>
                ))}
              </div>
            </div>
            <div>
              <h4 className="font-display text-sm font-bold uppercase tracking-wider mb-4" style={{ color: "rgba(255,255,255,0.4)" }}>Контакты</h4>
              <div className="space-y-2 text-sm" style={{ color: "rgba(255,255,255,0.5)" }}>
                <div>+7 (900) 123-45-67</div>
                <div>ул. Автомобильная, 15</div>
                <div>Ежедневно 8:00 — 21:00</div>
              </div>
            </div>
          </div>
          <div className="flex flex-col md:flex-row justify-between items-center gap-3 pt-6" style={{ borderTop: "1px solid rgba(255,255,255,0.1)" }}>
            <p className="text-sm" style={{ color: "rgba(255,255,255,0.3)" }}>© 2024 Автокультура. Все права защищены.</p>
            <button onClick={() => openBooking()}
              className="text-white text-sm font-semibold px-6 py-2.5 rounded-lg transition-all"
              style={{ background: "#0d9488" }}>
              Записаться онлайн
            </button>
          </div>
        </div>
      </footer>

      {/* BOOKING MODAL */}
      {bookingOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={() => setBookingOpen(false)} />
          <div className="relative bg-white rounded-2xl shadow-2xl w-full max-w-lg max-h-[90vh] overflow-y-auto animate-scale-in">
            <div className="sticky top-0 bg-white px-6 py-4 flex items-center justify-between rounded-t-2xl z-10" style={{ borderBottom: "1px solid #f1f5f9" }}>
              <div>
                <h3 className="font-display text-xl font-bold" style={{ color: "#0f172a" }}>Онлайн-запись</h3>
                {!bookingDone && (
                  <div className="flex items-center gap-1 mt-1">
                    {[1, 2, 3].map(s => (
                      <div key={s} className="h-1 rounded-full transition-all"
                        style={{
                          width: s === bookingStep ? "2rem" : "1rem",
                          background: s <= bookingStep ? "#0d9488" : "#e2e8f0"
                        }} />
                    ))}
                    <span className="text-xs ml-2" style={{ color: "#94a3b8" }}>Шаг {bookingStep} из 3</span>
                  </div>
                )}
              </div>
              <button onClick={() => setBookingOpen(false)} className="p-2 rounded-lg transition-colors hover:bg-gray-100">
                <Icon name="X" size={20} style={{ color: "#64748b" }} />
              </button>
            </div>

            <div className="p-6">
              {bookingDone ? (
                <div className="text-center py-8">
                  <div className="w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4" style={{ background: "rgba(13,148,136,0.1)" }}>
                    <Icon name="CheckCircle" size={40} style={{ color: "#0d9488" }} />
                  </div>
                  <h4 className="font-display text-2xl font-bold mb-2" style={{ color: "#0f172a" }}>Запись создана!</h4>
                  <p className="mb-1" style={{ color: "#64748b" }}><strong>{selectedService}</strong></p>
                  <p className="text-sm mb-1" style={{ color: "#64748b" }}>
                    {selectedDate && new Date(selectedDate).toLocaleDateString("ru-RU", { day: "numeric", month: "long" })} в {selectedTime}
                  </p>
                  <p className="text-sm mb-6" style={{ color: "#64748b" }}>Мы позвоним вам для подтверждения</p>
                  <button onClick={() => setBookingOpen(false)}
                    className="text-white font-semibold px-8 py-3 rounded-xl transition-all"
                    style={{ background: "#0d9488" }}>
                    Отлично!
                  </button>
                </div>
              ) : bookingStep === 1 ? (
                <div>
                  <p className="text-sm font-medium mb-4" style={{ color: "#64748b" }}>Выберите услугу</p>
                  <div className="space-y-2">
                    {SERVICES.map(s => (
                      <button key={s.title} onClick={() => setSelectedService(s.title)}
                        className="w-full flex items-center justify-between p-4 rounded-xl border-2 transition-all text-left"
                        style={{ borderColor: selectedService === s.title ? "#0d9488" : "#f1f5f9", background: selectedService === s.title ? "rgba(13,148,136,0.04)" : "white" }}>
                        <div className="flex items-center gap-3">
                          <div className="w-9 h-9 rounded-lg flex items-center justify-center"
                            style={{ background: selectedService === s.title ? "#0d9488" : "#f1f5f9" }}>
                            <Icon name={s.icon} size={16} style={{ color: selectedService === s.title ? "white" : "#64748b" }} />
                          </div>
                          <div>
                            <div className="font-semibold text-sm" style={{ color: "#0f172a" }}>{s.title}</div>
                            <div className="text-xs" style={{ color: "#94a3b8" }}>{s.price}</div>
                          </div>
                        </div>
                        {selectedService === s.title && <Icon name="Check" size={18} style={{ color: "#0d9488" }} />}
                      </button>
                    ))}
                  </div>
                  <button onClick={() => selectedService && setBookingStep(2)} disabled={!selectedService}
                    className="w-full mt-5 py-3.5 rounded-xl font-semibold transition-all text-white"
                    style={{ background: selectedService ? "#0d9488" : "#e2e8f0", color: selectedService ? "white" : "#94a3b8", cursor: selectedService ? "pointer" : "not-allowed" }}>
                    Далее →
                  </button>
                </div>
              ) : bookingStep === 2 ? (
                <div>
                  <p className="text-sm font-medium mb-4" style={{ color: "#64748b" }}>Выберите дату и время</p>
                  <p className="text-xs font-semibold uppercase tracking-wider mb-3" style={{ color: "#94a3b8" }}>Дата</p>
                  <div className="flex gap-2 overflow-x-auto pb-2 mb-5">
                    {dates.map(d => {
                      const iso = d.toISOString().split("T")[0];
                      const isSelected = selectedDate === iso;
                      return (
                        <button key={iso} onClick={() => setSelectedDate(iso)}
                          className="flex-shrink-0 flex flex-col items-center p-3 rounded-xl border-2 min-w-[60px] transition-all"
                          style={{ borderColor: isSelected ? "#0d9488" : "#f1f5f9", background: isSelected ? "#0d9488" : "white", color: isSelected ? "white" : "#0f172a" }}>
                          <span className="text-[10px] font-medium uppercase">{DAY_NAMES[d.getDay()]}</span>
                          <span className="font-display text-lg font-bold leading-none my-0.5">{d.getDate()}</span>
                          <span className="text-[10px]">{MONTH_NAMES[d.getMonth()]}</span>
                        </button>
                      );
                    })}
                  </div>
                  <p className="text-xs font-semibold uppercase tracking-wider mb-3" style={{ color: "#94a3b8" }}>Время</p>
                  <div className="grid grid-cols-4 gap-2 mb-5">
                    {TIMES.map(t => (
                      <button key={t} onClick={() => setSelectedTime(t)}
                        className="py-2.5 rounded-xl text-sm font-semibold border-2 transition-all"
                        style={{ borderColor: selectedTime === t ? "#0d9488" : "#f1f5f9", background: selectedTime === t ? "#0d9488" : "white", color: selectedTime === t ? "white" : "#0f172a" }}>
                        {t}
                      </button>
                    ))}
                  </div>
                  <div className="flex gap-3">
                    <button onClick={() => setBookingStep(1)}
                      className="flex-1 py-3.5 rounded-xl font-semibold border-2 transition-all"
                      style={{ borderColor: "#e2e8f0", color: "#0f172a" }}>
                      ← Назад
                    </button>
                    <button onClick={() => selectedDate && selectedTime && setBookingStep(3)} disabled={!selectedDate || !selectedTime}
                      className="flex-1 py-3.5 rounded-xl font-semibold transition-all"
                      style={{ background: selectedDate && selectedTime ? "#0d9488" : "#e2e8f0", color: selectedDate && selectedTime ? "white" : "#94a3b8", cursor: selectedDate && selectedTime ? "pointer" : "not-allowed" }}>
                      Далее →
                    </button>
                  </div>
                </div>
              ) : (
                <div>
                  <p className="text-sm font-medium mb-4" style={{ color: "#64748b" }}>Ваши контакты</p>
                  <div className="rounded-xl p-4 mb-5 space-y-1" style={{ background: "rgba(13,148,136,0.05)" }}>
                    <div className="flex items-center gap-2 text-sm">
                      <Icon name="Sparkles" size={14} style={{ color: "#0d9488" }} />
                      <span className="font-semibold" style={{ color: "#0f172a" }}>{selectedService}</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm" style={{ color: "#64748b" }}>
                      <Icon name="Calendar" size={14} style={{ color: "#0d9488" }} />
                      {selectedDate && new Date(selectedDate).toLocaleDateString("ru-RU", { weekday: "long", day: "numeric", month: "long" })} в {selectedTime}
                    </div>
                  </div>
                  <div className="space-y-3 mb-5">
                    <input type="text" value={name} onChange={e => setName(e.target.value)} placeholder="Ваше имя *"
                      className="w-full rounded-xl px-4 py-3 text-sm focus:outline-none bg-white"
                      style={{ border: "2px solid #e2e8f0" }}
                      onFocus={e => (e.target.style.borderColor = "#0d9488")}
                      onBlur={e => (e.target.style.borderColor = "#e2e8f0")} />
                    <input type="tel" value={phone} onChange={e => setPhone(e.target.value)} placeholder="+7 (___) ___-__-__ *"
                      className="w-full rounded-xl px-4 py-3 text-sm focus:outline-none bg-white"
                      style={{ border: "2px solid #e2e8f0" }}
                      onFocus={e => (e.target.style.borderColor = "#0d9488")}
                      onBlur={e => (e.target.style.borderColor = "#e2e8f0")} />
                    <input type="text" placeholder="Марка и модель авто"
                      className="w-full rounded-xl px-4 py-3 text-sm focus:outline-none bg-white"
                      style={{ border: "2px solid #e2e8f0" }}
                      onFocus={e => (e.target.style.borderColor = "#0d9488")}
                      onBlur={e => (e.target.style.borderColor = "#e2e8f0")} />
                  </div>
                  <div className="flex gap-3">
                    <button onClick={() => setBookingStep(2)}
                      className="flex-1 py-3.5 rounded-xl font-semibold border-2 transition-all"
                      style={{ borderColor: "#e2e8f0", color: "#0f172a" }}>
                      ← Назад
                    </button>
                    <button onClick={() => { if (name && phone) { setBookingDone(true); } }} disabled={!name || !phone}
                      className="flex-1 py-3.5 rounded-xl font-semibold transition-all"
                      style={{ background: name && phone ? "#0d9488" : "#e2e8f0", color: name && phone ? "white" : "#94a3b8", cursor: name && phone ? "pointer" : "not-allowed" }}>
                      Записаться!
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Floating CTA */}
      <div className="fixed bottom-6 right-6 z-40">
        <button onClick={() => openBooking()}
          className="text-white font-semibold px-5 py-3 rounded-full shadow-2xl transition-all flex items-center gap-2 text-sm"
          style={{ background: "#0d9488" }}>
          <Icon name="Calendar" size={16} />
          Записаться
        </button>
      </div>
    </div>
  );
}