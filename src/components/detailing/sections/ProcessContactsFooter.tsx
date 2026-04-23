import Icon from "@/components/ui/icon";
import { SERVICES, STEPS, PROMOS, LOGO_URL, PHONE, PHONE_HREF, ADDRESS, WORKING_HOURS, TG_PERSONAL, TG_GROUP } from "@/lib/detailing-data";
import { AnimSection, QuickForm } from "./SectionHelpers";

interface Props {
  onBooking: (service?: string) => void;
}

export default function ProcessContactsFooter({ onBooking }: Props) {
  return (
    <>
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
                {SERVICES.map(s => (
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
