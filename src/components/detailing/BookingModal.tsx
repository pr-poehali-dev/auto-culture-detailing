import { useNavigate } from "react-router-dom";
import Icon from "@/components/ui/icon";
import { LOGO_URL } from "@/lib/detailing-data";

const TG_URL = "https://functions.poehali.dev/271787e5-fcae-4b1f-9abd-a763fd8592b7";

interface BookingModalProps {
  bookingOpen: boolean;
  onClose: () => void;
  bookingDone: boolean;
  setBookingDone: (v: boolean) => void;
  name: string;
  setName: (v: string) => void;
  phone: string;
  setPhone: (v: string) => void;
}

export default function BookingModal({
  bookingOpen, onClose,
  setBookingDone,
  name, setName,
  phone, setPhone,
}: BookingModalProps) {
  const navigate = useNavigate();
  if (!bookingOpen) return null;

  const handleSubmit = async () => {
    if (!name || !phone) return;
    try {
      await fetch(TG_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ type: "booking", name, phone }),
      });
    } catch (e) { console.error(e); }
    setBookingDone(true);
    onClose();
    navigate("/thanks");
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={onClose} />
      <div className="relative bg-white rounded-2xl shadow-2xl w-full max-w-md animate-scale-in">
        <div className="px-6 py-4 flex items-center justify-between rounded-t-2xl" style={{ borderBottom: "1px solid #f1f5f9" }}>
          <div className="flex items-center gap-3">
            <img src={LOGO_URL} alt="Автокультура" className="h-8 w-auto object-contain" />
            <h3 className="font-display text-xl font-bold" style={{ color: "#1A1A1A" }}>Онлайн-запись</h3>
          </div>
          <button onClick={onClose} className="p-2 rounded-lg transition-colors hover:bg-gray-100">
            <Icon name="X" size={20} style={{ color: "#64748b" }} />
          </button>
        </div>

        <div className="p-6">
          <div>
            <p className="text-sm mb-5" style={{ color: "#64748b" }}>Оставьте имя и номер телефона — мы свяжемся и запишем вас в удобное время</p>
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
            </div>
            <button onClick={handleSubmit} disabled={!name || !phone}
              className="w-full py-3.5 rounded-xl font-semibold transition-all text-white"
              style={{ background: name && phone ? "#E03A2F" : "#e2e8f0", color: name && phone ? "white" : "#94a3b8", cursor: name && phone ? "pointer" : "not-allowed" }}>
              Записаться
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}