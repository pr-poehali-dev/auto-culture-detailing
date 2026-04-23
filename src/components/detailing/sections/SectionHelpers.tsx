import { useRef, useState, useEffect, useCallback } from "react";
import Icon from "@/components/ui/icon";
import { SERVICES } from "@/lib/detailing-data";

export function useInView(threshold = 0.15) {
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

export function AnimSection({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  const { ref, inView } = useInView();
  return (
    <div ref={ref} className={`transition-all duration-700 ${inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"} ${className}`}>
      {children}
    </div>
  );
}

export const TG_URL = "https://functions.poehali.dev/271787e5-fcae-4b1f-9abd-a763fd8592b7";

export function QuickForm() {
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

export function Lightbox({ src, onClose }: { src: string; onClose: () => void }) {
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") onClose(); };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [onClose]);

  return (
    <div className="fixed inset-0 z-[999] flex items-center justify-center p-4"
      style={{ background: "rgba(0,0,0,0.9)" }}
      onClick={onClose}>
      <button className="absolute top-4 right-4 text-white p-2 rounded-full transition-all hover:bg-white/20"
        onClick={onClose}>
        <Icon name="X" size={28} />
      </button>
      <img src={src} alt="" className="max-w-full max-h-[90vh] rounded-xl object-contain shadow-2xl"
        onClick={e => e.stopPropagation()} />
    </div>
  );
}
