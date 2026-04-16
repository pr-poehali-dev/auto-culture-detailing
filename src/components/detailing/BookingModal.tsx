import { useState } from "react";
import Icon from "@/components/ui/icon";
import { SERVICES, TIMES, DAY_NAMES, MONTH_NAMES, LOGO_URL } from "@/lib/detailing-data";

const TG_URL = "https://functions.poehali.dev/271787e5-fcae-4b1f-9abd-a763fd8592b7";

interface BookingModalProps {
  bookingOpen: boolean;
  onClose: () => void;
  selectedService: string;
  setSelectedService: (v: string) => void;
  selectedDate: string;
  setSelectedDate: (v: string) => void;
  selectedTime: string;
  setSelectedTime: (v: string) => void;
  bookingStep: number;
  setBookingStep: (v: number) => void;
  bookingDone: boolean;
  setBookingDone: (v: boolean) => void;
  name: string;
  setName: (v: string) => void;
  phone: string;
  setPhone: (v: string) => void;
  dates: Date[];
}

export default function BookingModal({
  bookingOpen, onClose,
  selectedService, setSelectedService,
  selectedDate, setSelectedDate,
  selectedTime, setSelectedTime,
  bookingStep, setBookingStep,
  bookingDone, setBookingDone,
  name, setName,
  phone, setPhone,
  dates,
}: BookingModalProps) {
  const [car, setCar] = useState("");
  const [sending, setSending] = useState(false);

  if (!bookingOpen) return null;

  const handleSubmit = async () => {
    if (!name || !phone) return;
    setSending(true);
    try {
      await fetch(TG_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          type: "booking",
          name,
          phone,
          service: selectedService,
          date: selectedDate
            ? new Date(selectedDate).toLocaleDateString("ru-RU", { day: "numeric", month: "long", weekday: "long" })
            : "—",
          time: selectedTime,
          car: car || "—",
        }),
      });
    } catch (e) { console.error(e); }
    setSending(false);
    setBookingDone(true);
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={onClose} />
      <div className="relative bg-white rounded-2xl shadow-2xl w-full max-w-lg max-h-[90vh] overflow-y-auto animate-scale-in">
        <div className="sticky top-0 bg-white px-6 py-4 flex items-center justify-between rounded-t-2xl z-10" style={{ borderBottom: "1px solid #f1f5f9" }}>
          <div className="flex items-center gap-3">
            <img src={LOGO_URL} alt="Автокультура" className="h-8 w-auto object-contain" />
            <div>
              <h3 className="font-display text-xl font-bold" style={{ color: "#1A1A1A" }}>Онлайн-запись</h3>
              {!bookingDone && (
                <div className="flex items-center gap-1 mt-1">
                  {[1, 2, 3].map(s => (
                    <div key={s} className="h-1 rounded-full transition-all"
                      style={{
                        width: s === bookingStep ? "2rem" : "1rem",
                        background: s <= bookingStep ? "#E03A2F" : "#e2e8f0"
                      }} />
                  ))}
                  <span className="text-xs ml-2" style={{ color: "#94a3b8" }}>Шаг {bookingStep} из 3</span>
                </div>
              )}
            </div>
          </div>
          <button onClick={onClose} className="p-2 rounded-lg transition-colors hover:bg-gray-100">
            <Icon name="X" size={20} style={{ color: "#64748b" }} />
          </button>
        </div>

        <div className="p-6">
          {bookingDone ? (
            <div className="text-center py-8">
              <div className="w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4" style={{ background: "rgba(224,58,47,0.1)" }}>
                <Icon name="CheckCircle" size={40} style={{ color: "#E03A2F" }} />
              </div>
              <h4 className="font-display text-2xl font-bold mb-2" style={{ color: "#1A1A1A" }}>Запись создана!</h4>
              <p className="mb-1" style={{ color: "#64748b" }}><strong>{selectedService}</strong></p>
              <p className="text-sm mb-1" style={{ color: "#64748b" }}>
                {selectedDate && new Date(selectedDate).toLocaleDateString("ru-RU", { day: "numeric", month: "long" })} в {selectedTime}
              </p>
              <p className="text-sm mb-6" style={{ color: "#64748b" }}>Мы позвоним вам для подтверждения</p>
              <button onClick={onClose}
                className="text-white font-semibold px-8 py-3 rounded-xl transition-all"
                style={{ background: "#E03A2F" }}>
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
                    style={{ borderColor: selectedService === s.title ? "#E03A2F" : "#f1f5f9", background: selectedService === s.title ? "rgba(13,148,136,0.04)" : "white" }}>
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 rounded-lg flex items-center justify-center"
                        style={{ background: selectedService === s.title ? "#E03A2F" : "#f1f5f9" }}>
                        <Icon name={s.icon} size={16} style={{ color: selectedService === s.title ? "white" : "#64748b" }} />
                      </div>
                      <div>
                        <div className="font-semibold text-sm" style={{ color: "#1A1A1A" }}>{s.title}</div>
                        <div className="text-xs" style={{ color: "#94a3b8" }}>{s.price}</div>
                      </div>
                    </div>
                    {selectedService === s.title && <Icon name="Check" size={18} style={{ color: "#E03A2F" }} />}
                  </button>
                ))}
              </div>
              <button onClick={() => selectedService && setBookingStep(2)} disabled={!selectedService}
                className="w-full mt-5 py-3.5 rounded-xl font-semibold transition-all text-white"
                style={{ background: selectedService ? "#E03A2F" : "#e2e8f0", color: selectedService ? "white" : "#94a3b8", cursor: selectedService ? "pointer" : "not-allowed" }}>
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
                      style={{ borderColor: isSelected ? "#E03A2F" : "#f1f5f9", background: isSelected ? "#E03A2F" : "white", color: isSelected ? "white" : "#1A1A1A" }}>
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
                    style={{ borderColor: selectedTime === t ? "#E03A2F" : "#f1f5f9", background: selectedTime === t ? "#E03A2F" : "white", color: selectedTime === t ? "white" : "#1A1A1A" }}>
                    {t}
                  </button>
                ))}
              </div>
              <div className="flex gap-3">
                <button onClick={() => setBookingStep(1)}
                  className="flex-1 py-3.5 rounded-xl font-semibold border-2 transition-all"
                  style={{ borderColor: "#e2e8f0", color: "#1A1A1A" }}>
                  ← Назад
                </button>
                <button onClick={() => selectedDate && selectedTime && setBookingStep(3)} disabled={!selectedDate || !selectedTime}
                  className="flex-1 py-3.5 rounded-xl font-semibold transition-all"
                  style={{ background: selectedDate && selectedTime ? "#E03A2F" : "#e2e8f0", color: selectedDate && selectedTime ? "white" : "#94a3b8", cursor: selectedDate && selectedTime ? "pointer" : "not-allowed" }}>
                  Далее →
                </button>
              </div>
            </div>
          ) : (
            <div>
              <p className="text-sm font-medium mb-4" style={{ color: "#64748b" }}>Ваши контакты</p>
              <div className="rounded-xl p-4 mb-5 space-y-1" style={{ background: "rgba(224,58,47,0.05)" }}>
                <div className="flex items-center gap-2 text-sm">
                  <Icon name="Sparkles" size={14} style={{ color: "#E03A2F" }} />
                  <span className="font-semibold" style={{ color: "#1A1A1A" }}>{selectedService}</span>
                </div>
                <div className="flex items-center gap-2 text-sm" style={{ color: "#64748b" }}>
                  <Icon name="Calendar" size={14} style={{ color: "#E03A2F" }} />
                  {selectedDate && new Date(selectedDate).toLocaleDateString("ru-RU", { weekday: "long", day: "numeric", month: "long" })} в {selectedTime}
                </div>
              </div>
              <div className="space-y-3 mb-5">
                <input type="text" value={name} onChange={e => setName(e.target.value)} placeholder="Ваше имя *"
                  className="w-full rounded-xl px-4 py-3 text-sm focus:outline-none bg-white"
                  style={{ border: "2px solid #e2e8f0" }}
                  onFocus={e => (e.target.style.borderColor = "#E03A2F")}
                  onBlur={e => (e.target.style.borderColor = "#e2e8f0")} />
                <input type="tel" value={phone} onChange={e => setPhone(e.target.value)} placeholder="+7 (___) ___-__-__ *"
                  className="w-full rounded-xl px-4 py-3 text-sm focus:outline-none bg-white"
                  style={{ border: "2px solid #e2e8f0" }}
                  onFocus={e => (e.target.style.borderColor = "#E03A2F")}
                  onBlur={e => (e.target.style.borderColor = "#e2e8f0")} />
                <input type="text" value={car} onChange={e => setCar(e.target.value)} placeholder="Марка и модель авто"
                  className="w-full rounded-xl px-4 py-3 text-sm focus:outline-none bg-white"
                  style={{ border: "2px solid #e2e8f0" }}
                  onFocus={e => (e.target.style.borderColor = "#E03A2F")}
                  onBlur={e => (e.target.style.borderColor = "#e2e8f0")} />
              </div>
              <div className="flex gap-3">
                <button onClick={() => setBookingStep(2)}
                  className="flex-1 py-3.5 rounded-xl font-semibold border-2 transition-all"
                  style={{ borderColor: "#e2e8f0", color: "#1A1A1A" }}>
                  ← Назад
                </button>
                <button onClick={handleSubmit} disabled={!name || !phone || sending}
                  className="flex-1 py-3.5 rounded-xl font-semibold transition-all"
                  style={{ background: name && phone ? "#E03A2F" : "#e2e8f0", color: name && phone ? "white" : "#94a3b8", cursor: name && phone ? "pointer" : "not-allowed" }}>
                  {sending ? "Отправка..." : "Записаться!"}
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}