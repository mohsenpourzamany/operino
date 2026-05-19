import React, { useState, useEffect } from "react";
import opichat from "../assets/Photos/Opi-Chat-1.png";
const WHATSAPP_NUMBER = "97156317297";
const WHATSAPP_MESSAGE = "سلام! می‌خوام با پشتیبانی Operino صحبت کنم.";

const WhatsAppWidget: React.FC = () => {
  const [, setHovered] = useState(false);
  const [clicked, setClicked] = useState(false);
  const [showTooltip, setShowTooltip] = useState(false);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [pulseCount, setPulseCount] = useState(0);

  // Show tooltip after 3 seconds automatically
  useEffect(() => {
    const t = setTimeout(() => setShowTooltip(true), 3000);
    return () => clearTimeout(t);
  }, []);

  // Hide tooltip after 6 seconds
  useEffect(() => {
    if (showTooltip) {
      const t = setTimeout(() => setShowTooltip(false), 6000);
      return () => clearTimeout(t);
    }
  }, [showTooltip]);

  const handleClick = () => {
    setClicked(true);
    const url = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(WHATSAPP_MESSAGE)}`;
    window.open(url, "_blank");
    setTimeout(() => setClicked(false), 1000);
  };

  return (
    <>
      <style>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px) rotate(-2deg); }
          50%       { transform: translateY(-10px) rotate(2deg); }
        }
        @keyframes floatHovered {
          0%, 100% { transform: translateY(0px) rotate(-3deg) scale(1.08); }
          50%       { transform: translateY(-14px) rotate(3deg) scale(1.08); }
        }
        @keyframes ripple {
          0%   { transform: scale(1); opacity: 0.6; }
          100% { transform: scale(2.8); opacity: 0; }
        }
        @keyframes ripple2 {
          0%   { transform: scale(1); opacity: 0.4; }
          100% { transform: scale(3.4); opacity: 0; }
        }
        @keyframes tooltipSlide {
          from { opacity: 0; transform: translateX(12px) translateY(-50%); }
          to   { opacity: 1; transform: translateX(0px) translateY(-50%); }
        }
        @keyframes tooltipOut {
          from { opacity: 1; transform: translateX(0px) translateY(-50%); }
          to   { opacity: 0; transform: translateX(12px) translateY(-50%); }
        }
        @keyframes waBounce {
          0%, 100% { transform: scale(1) rotate(0deg); }
          25%       { transform: scale(1.2) rotate(-10deg); }
          75%       { transform: scale(1.2) rotate(10deg); }
        }
        @keyframes clickPop {
          0%   { transform: scale(1); }
          40%  { transform: scale(0.88); }
          70%  { transform: scale(1.12); }
          100% { transform: scale(1); }
        }
        @keyframes glowPulse {
          0%, 100% { box-shadow: 0 0 0 0 rgba(37,211,102,0.4); }
          50%       { box-shadow: 0 0 28px 8px rgba(37,211,102,0.15); }
        }
        @keyframes dotBlink {
          0%, 100% { opacity: 1; }
          50%       { opacity: 0.3; }
        }
        @keyframes textShimmer {
          0%   { background-position: -200% center; }
          100% { background-position: 200% center; }
        }

        .wa-robot {
          animation: float 4s ease-in-out infinite;
          cursor: pointer;
          filter: drop-shadow(0 12px 32px rgba(124,92,252,0.5));
          transition: filter 0.3s ease;
        }
        .wa-robot:hover {
          animation: floatHovered 3s ease-in-out infinite;
          filter: drop-shadow(0 20px 48px rgba(124,92,252,0.7)) drop-shadow(0 0 24px rgba(37,211,102,0.4));
        }
        .wa-robot.clicked {
          animation: clickPop 0.4s ease forwards;
        }

        .wa-ripple-1 {
          animation: ripple 2s ease-out infinite;
        }
        .wa-ripple-2 {
          animation: ripple2 2s ease-out 0.6s infinite;
        }

        .wa-badge {
          animation: waBounce 2s ease-in-out infinite, glowPulse 2s ease-in-out infinite;
          transition: transform 0.2s ease;
        }
        .wa-badge:hover {
          animation: none;
          transform: scale(1.2) rotate(-5deg);
        }

        .wa-tooltip {
          animation: tooltipSlide 0.4s ease forwards;
        }
        .wa-tooltip-out {
          animation: tooltipOut 0.4s ease forwards;
        }

        .online-dot {
          animation: dotBlink 1.5s ease-in-out infinite;
        }

        .tooltip-text {
          background: linear-gradient(90deg, #fff, #a78bfa, #7c5cfc, #a78bfa, #fff);
          background-size: 200% auto;
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          animation: textShimmer 3s linear infinite;
        }
      `}</style>

      {/* Fixed container — bottom-left */}
      <div className="fixed bottom-6 right-6 z-9999 flex flex-col items-end">
        {/* Tooltip bubble */}
        {showTooltip && (
          <div
            className="wa-tooltip mb-3 ml-2 flex flex-col gap-1 rounded-2xl border border-white/15 bg-[#0d0b1f]/95 px-4 py-3 shadow-2xl backdrop-blur-md"
            style={{ minWidth: 200, position: "relative", top: 0, left: 0 }}
          >
            {/* Arrow */}
            <div className="absolute -bottom-2 left-8 h-4 w-4 rotate-45 rounded-sm border-b border-r border-white/15 bg-[#0d0b1f]/95" />

            <div className="flex items-center gap-2">
              <div className="online-dot h-2 w-2 rounded-full bg-[#25d366]" />
              <span className="text-[11px] font-semibold text-[#25d366]">
                Online — پاسخ سریع
              </span>
            </div>
            <p className="tooltip-text text-[13px] font-bold">
              Can I Help you ? 👋
            </p>
            <p className="text-[11px] text-gray-400 leading-snug">
              Click on me to start a conversation on
              <br />
              WhatsApp
            </p>
          </div>
        )}

        {/* Robot wrapper */}
        <div className="relative flex items-end justify-start">
          {/* Ripple rings behind robot */}
          <div className="pointer-events-none absolute bottom-4 left-1/2 -translate-x-1/2 h-20 w-20 rounded-full bg-[#25d366]/20 wa-ripple-1" />
          <div className="pointer-events-none absolute bottom-4 left-1/2 -translate-x-1/2 h-20 w-20 rounded-full bg-[#7c5cfc]/15 wa-ripple-2" />

          {/* Glow under robot */}
          <div className="pointer-events-none absolute -bottom-3 left-1/2 h-8 w-32 -translate-x-1/2 rounded-full bg-[#7c5cfc]/30 blur-xl" />

          {/* Robot image */}
          <img
            src={opichat}
            alt="Operino Support"
            onClick={handleClick}
            onMouseEnter={() => {
              setHovered(true);
              setShowTooltip(true);
            }}
            onMouseLeave={() => setHovered(false)}
            className={`wa-robot relative z-10 w-[clamp(80px,10vw,110px)] select-none ${clicked ? "clicked" : ""}`}
          />

          {/* WhatsApp badge on top-right of robot */}
          {/* <div
            onClick={handleClick}
            className="wa-badge absolute -right-3 top-2 z-20 flex h-9 w-9 cursor-pointer items-center justify-center rounded-full bg-[#25d366] shadow-lg"
            style={{ boxShadow: "0 4px 20px rgba(37,211,102,0.5)" }}
          >
            <svg viewBox="0 0 24 24" className="h-5 w-5 fill-white">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
            </svg>
          </div> */}

          {/* Online indicator dot */}
          <div className="absolute bottom-6 right-0 z-20 flex items-center gap-1 rounded-full bg-[#0d0b1f]/90 px-2 py-1 text-[9px] font-semibold shadow-lg border border-white/10">
            <div className="online-dot h-1.5 w-1.5 rounded-full bg-[#25d366]" />
            <span className="text-[#25d366]">آنلاین</span>
          </div>
        </div>
      </div>
    </>
  );
};

export default WhatsAppWidget;
