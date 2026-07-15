import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Icon from "@/components/ui/icon";
import { LOGO_URL, PHONE, PHONE_HREF, TG_GROUP, WORKING_HOURS } from "@/lib/detailing-data";
import { reachGoal } from "@/lib/metrika";

export default function Thanks() {
  const navigate = useNavigate();

  useEffect(() => {
    reachGoal("lead_submitted");
  }, []);

  return (
    <div className="min-h-screen flex items-center justify-center font-body px-4" style={{ background: "#1A1A1A" }}>
      <div className="max-w-md w-full text-center">
        <img src={LOGO_URL} alt="Автокультура" className="h-12 w-auto object-contain mx-auto mb-8" />

        <div className="w-24 h-24 rounded-full flex items-center justify-center mx-auto mb-6" style={{ background: "rgba(224,58,47,0.15)" }}>
          <Icon name="CheckCircle" size={52} style={{ color: "#E03A2F" }} />
        </div>

        <h1 className="font-display text-3xl lg:text-4xl font-bold text-white mb-4">
          Спасибо за заявку!
        </h1>
        <p className="text-base mb-10" style={{ color: "rgba(255,255,255,0.6)" }}>
          Мы получили ваши данные и перезвоним в течение 15 минут,<br />
          чтобы подтвердить детали и удобное время.
        </p>

        <div className="rounded-2xl p-6 mb-8 text-left space-y-4" style={{ background: "#232323" }}>
          <a href={PHONE_HREF} className="flex items-center gap-3 transition-opacity hover:opacity-80">
            <div className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0" style={{ background: "rgba(224,58,47,0.15)" }}>
              <Icon name="Phone" size={18} style={{ color: "#E03A2F" }} />
            </div>
            <div>
              <p className="text-xs" style={{ color: "rgba(255,255,255,0.5)" }}>Телефон</p>
              <p className="text-sm font-semibold text-white">{PHONE}</p>
            </div>
          </a>
          <a href={TG_GROUP} target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 transition-opacity hover:opacity-80">
            <div className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0" style={{ background: "rgba(224,58,47,0.15)" }}>
              <Icon name="Send" size={18} style={{ color: "#E03A2F" }} />
            </div>
            <div>
              <p className="text-xs" style={{ color: "rgba(255,255,255,0.5)" }}>Telegram-канал</p>
              <p className="text-sm font-semibold text-white">@Autoculture24</p>
            </div>
          </a>
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0" style={{ background: "rgba(224,58,47,0.15)" }}>
              <Icon name="Clock" size={18} style={{ color: "#E03A2F" }} />
            </div>
            <div>
              <p className="text-xs" style={{ color: "rgba(255,255,255,0.5)" }}>Режим работы</p>
              <p className="text-sm font-semibold text-white">{WORKING_HOURS}</p>
            </div>
          </div>
        </div>

        <button onClick={() => navigate("/")}
          className="w-full text-white font-semibold py-3.5 rounded-xl transition-all hover:opacity-90"
          style={{ background: "#E03A2F" }}>
          Вернуться на главную
        </button>
      </div>
    </div>
  );
}