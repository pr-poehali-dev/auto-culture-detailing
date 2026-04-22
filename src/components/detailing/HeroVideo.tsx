import { useEffect, useRef, useState } from "react";
import Icon from "@/components/ui/icon";

interface YTPlayer {
  unMute: () => void;
  mute: () => void;
  setVolume: (v: number) => void;
  destroy: () => void;
}

declare global {
  interface Window {
    YT: { Player: new (el: HTMLElement, opts: object) => YTPlayer };
    onYouTubeIframeAPIReady: () => void;
  }
}

export default function HeroVideo() {
  const containerRef = useRef<HTMLDivElement>(null);
  const playerRef = useRef<YTPlayer | null>(null);
  const [muted, setMuted] = useState(true);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const initPlayer = () => {
      if (!containerRef.current) return;
      playerRef.current = new window.YT.Player(containerRef.current, {
        videoId: "PB0hnkEMSH4",
        playerVars: {
          autoplay: 1,
          mute: 1,
          loop: 1,
          playlist: "PB0hnkEMSH4",
          controls: 0,
          showinfo: 0,
          rel: 0,
          modestbranding: 1,
          iv_load_policy: 3,
          disablekb: 1,
          fs: 0,
          playsinline: 1,
        },
        events: {
          onReady: () => setReady(true),
        },
      });
    };

    if (window.YT && window.YT.Player) {
      initPlayer();
    } else {
      const tag = document.createElement("script");
      tag.src = "https://www.youtube.com/iframe_api";
      document.head.appendChild(tag);
      window.onYouTubeIframeAPIReady = initPlayer;
    }

    return () => {
      if (playerRef.current?.destroy) playerRef.current.destroy();
    };
  }, []);

  const toggleMute = () => {
    if (!playerRef.current) return;
    if (muted) {
      playerRef.current.unMute();
      playerRef.current.setVolume(80);
    } else {
      playerRef.current.mute();
    }
    setMuted(!muted);
  };

  return (
    <div className="relative w-full h-80 rounded-3xl overflow-hidden" style={{ border: "1px solid rgba(224,58,47,0.2)" }}>
      {/* YouTube плеер */}
      <div ref={containerRef} className="absolute inset-0 w-full h-full" style={{ pointerEvents: "none" }} />

      {/* Градиент снизу */}
      <div className="absolute inset-0" style={{ pointerEvents: "none", background: "linear-gradient(to top, rgba(0,0,0,0.35) 0%, transparent 50%)" }} />

      {/* Кнопка звука */}
      {ready && (
        <button
          onClick={toggleMute}
          className="absolute bottom-3 right-3 z-10 flex items-center gap-1.5 text-white text-xs font-semibold px-3 py-2 rounded-xl transition-all hover:scale-105 active:scale-95"
          style={{ background: "rgba(0,0,0,0.55)", backdropFilter: "blur(8px)", border: "1px solid rgba(255,255,255,0.15)", pointerEvents: "auto" }}
        >
          <Icon name={muted ? "VolumeX" : "Volume2"} size={14} />
          {muted ? "Включить звук" : "Выключить"}
        </button>
      )}
    </div>
  );
}
