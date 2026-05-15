import React, { useState, useRef } from "react";
import AuthLeft from "../Components/Auth/AuthLeft";
import AuthForm from "../Components/Auth/AuthForm";

const AuthPage: React.FC = () => {
  const [mode, setMode] = useState<"login" | "register">("login");
  const [mouse, setMouse] = useState({ x: 50, y: 50 });
  const ref = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setMouse({
      x: ((e.clientX - rect.left) / rect.width) * 100,
      y: ((e.clientY - rect.top) / rect.height) * 100,
    });
  };

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Syne:wght@700;800&family=DM+Sans:wght@400;500;600;700&display=swap');
        .auth-page { font-family:'DM Sans',sans-serif; }

        /* Grid background */
        .auth-grid {
          position:absolute; inset:0;
          background-image:
            linear-gradient(rgba(124,92,252,0.04) 1px, transparent 1px),
            linear-gradient(90deg, rgba(124,92,252,0.04) 1px, transparent 1px);
          background-size:48px 48px;
        }

        /* Right card slide */
        @keyframes cardSlideIn {
          from{opacity:0;transform:translateX(30px);}
          to{opacity:1;transform:translateX(0);}
        }
        .card-slide { animation:cardSlideIn 0.7s cubic-bezier(0.34,1.2,0.64,1) forwards; }

        /* Floating particles in bg */
        .bg-particle {
          position:absolute; border-radius:50%;
          background:rgba(124,92,252,0.4);
          animation:bgFloat ease-in-out infinite;
        }
        @keyframes bgFloat {
          0%,100%{transform:translateY(0) scale(1); opacity:0.3;}
          50%{transform:translateY(-20px) scale(1.2); opacity:0.7;}
        }

        /* Card glow on hover */
        .form-card {
          transition:box-shadow 0.4s ease;
        }
        .form-card:hover {
          box-shadow:0 0 60px rgba(124,92,252,0.12), 0 32px 80px rgba(0,0,0,0.5);
        }

        /* Scrollbar */
        .auth-scroll::-webkit-scrollbar { width:4px; }
        .auth-scroll::-webkit-scrollbar-thumb { background:rgba(124,92,252,0.25); border-radius:4px; }
      `}</style>

      <div
        ref={ref}
        onMouseMove={handleMouseMove}
        className="auth-page relative flex min-h-screen w-full items-center justify-center overflow-hidden bg-[#07050f] px-4 py-8"
      >
        {/* Grid */}
        <div className="auth-grid" />

        {/* Global mouse spotlight */}
        <div
          className="pointer-events-none absolute inset-0 z-0"
          style={{
            background: `radial-gradient(700px circle at ${mouse.x}% ${mouse.y}%, rgba(124,92,252,0.07), transparent 60%)`,
          }}
        />

        {/* Floating particles */}
        {[...Array(6)].map((_, i) => (
          <div
            key={i}
            className="bg-particle"
            style={{
              width: `${4 + i * 2}px`,
              height: `${4 + i * 2}px`,
              top: `${10 + i * 14}%`,
              left: `${5 + i * 13}%`,
              animationDuration: `${4 + i * 1.5}s`,
              animationDelay: `${i * 0.7}s`,
            }}
          />
        ))}

        {/* Main container */}
        <div className="relative z-10 w-full max-w-275">
          <div
            className="flex flex-col overflow-hidden rounded-3xl border border-white/8 shadow-[0_32px_80px_rgba(0,0,0,0.6)] lg:flex-row"
            style={{ minHeight: "clamp(560px, 85vh, 820px)" }}
          >
            {/* Left panel */}
            <div className="relative flex-1 bg-linear-to-br from-[#0d0920] via-[#0a0718] to-[#07050f]">
              <AuthLeft mode={mode} />
            </div>

            {/* Divider */}
            <div className="hidden w-px bg-linear-to-b from-transparent via-white/10 to-transparent lg:block" />

            {/* Right panel: Form */}
            <div className="auth-scroll form-card relative w-full overflow-y-auto bg-[#0c0a1e] lg:w-120 lg:shrink-0">
              {/* Subtle inner glow */}
              <div
                className="pointer-events-none absolute inset-0"
                style={{
                  background: `radial-gradient(400px circle at ${mouse.x}% ${mouse.y}%, rgba(124,92,252,0.06), transparent 65%)`,
                }}
              />
              <div className="relative z-10 h-full">
                <AuthForm mode={mode} onModeChange={setMode} />
              </div>
            </div>
          </div>

          {/* Bottom note */}
          <p className="mt-4 text-center text-[11px] text-gray-700">
            By continuing, you agree to our{" "}
            <span className="text-gray-500 hover:text-[#a78bfa] cursor-pointer transition-colors">
              Terms of Service
            </span>{" "}
            and{" "}
            <span className="text-gray-500 hover:text-[#a78bfa] cursor-pointer transition-colors">
              Privacy Policy
            </span>
          </p>
        </div>
      </div>
    </>
  );
};

export default AuthPage;
