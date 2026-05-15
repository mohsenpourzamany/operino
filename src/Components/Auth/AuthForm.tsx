import React, { useState } from "react";

interface Props {
  mode: "login" | "register";
  onModeChange: (m: "login" | "register") => void;
}

const InputField: React.FC<{
  label: string; placeholder: string; type?: string;
  icon: string; value: string; onChange: (v: string) => void;
  extra?: React.ReactNode;
}> = ({ label, placeholder, type = "text", icon, value, onChange, extra }) => {
  const [showPass, setShowPass] = useState(false);
  const [focused, setFocused] = useState(false);
  const isPassword = type === "password";

  return (
    <div>
      <div className="mb-1.5 flex items-center justify-between">
        <label className="text-[13px] font-semibold text-gray-200">{label}</label>
        {extra}
      </div>
      <div className={`relative flex items-center rounded-xl border bg-white/4 transition-all duration-200 ${
        focused ? "border-[#7c5cfc] shadow-[0_0_0_3px_rgba(124,92,252,0.15)]" : "border-white/10 hover:border-white/20"
      }`}>
        <span className="pl-3.5 text-gray-500 text-sm flex-shrink-0">{icon}</span>
        <input
          type={isPassword && showPass ? "text" : type}
          placeholder={placeholder}
          value={value}
          onChange={e => onChange(e.target.value)}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          className="flex-1 bg-transparent px-3 py-3 text-[13px] text-white placeholder-gray-600 outline-none"
        />
        {isPassword && (
          <button type="button" onClick={() => setShowPass(s => !s)}
            className="pr-3.5 text-gray-500 hover:text-gray-300 transition-colors text-sm">
            {showPass ? "🙈" : "👁️"}
          </button>
        )}
      </div>
    </div>
  );
};

const SocialBtn: React.FC<{ icon: string; label: string }> = ({ icon, label }) => (
  <button className="flex flex-1 items-center justify-center gap-2 rounded-xl border border-white/10 bg-white/4 px-3 py-2.5 text-[12px] font-semibold text-gray-300 transition-all hover:border-[#7c5cfc]/40 hover:bg-[#7c5cfc]/08 hover:text-white hover:-translate-y-0.5">
    <span className="text-base">{icon}</span> {label}
  </button>
);

const AuthForm: React.FC<Props> = ({ mode, onModeChange }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [company, setCompany] = useState("");
  const [loading, setLoading] = useState(false);
  const [done, setDone] = useState(false);
  const [animKey, setAnimKey] = useState(0);

  const handleModeChange = (m: "login" | "register") => {
    setAnimKey(k => k + 1);
    onModeChange(m);
    setDone(false);
    setEmail(""); setPassword(""); setName(""); setCompany("");
  };

  const handleSubmit = () => {
    setLoading(true);
    setTimeout(() => { setLoading(false); setDone(true); }, 1500);
  };

  return (
    <>
      <style>{`
        @keyframes fadeUp { from{opacity:0;transform:translateY(18px);}to{opacity:1;transform:translateY(0);} }
        .af-fade { animation: fadeUp 0.5s ease forwards; }

        @keyframes tabSlide { from{opacity:0;transform:translateY(10px);}to{opacity:1;transform:translateY(0);} }
        .tab-content { animation: tabSlide 0.4s ease forwards; }

        .tab-indicator {
          position:absolute; bottom:0; height:2px;
          background:linear-gradient(90deg,#7c5cfc,#a78bfa);
          border-radius:2px;
          transition:left 0.35s cubic-bezier(0.34,1.56,0.64,1), width 0.35s ease;
        }

        .submit-btn {
          position:relative; overflow:hidden;
          transition:transform 0.22s ease, box-shadow 0.22s ease, background 0.22s ease;
        }
        .submit-btn:hover:not(:disabled) { transform:translateY(-2px); box-shadow:0 8px 28px rgba(124,92,252,0.5); background:#6b4ce0!important; }
        .submit-btn:active:not(:disabled) { transform:translateY(0); }
        @keyframes shimmer { 0%{transform:translateX(-100%) skewX(-15deg);}100%{transform:translateX(300%) skewX(-15deg);} }
        .submit-btn::after { content:''; position:absolute; top:0; left:0; width:30%; height:100%; background:linear-gradient(90deg,transparent,rgba(255,255,255,0.15),transparent); transform:translateX(-100%) skewX(-15deg); }
        .submit-btn:hover:not(:disabled)::after { animation:shimmer 0.55s ease forwards; }

        @keyframes spin { to{transform:rotate(360deg);} }
        .spinner { animation:spin 0.8s linear infinite; display:inline-block; }

        @keyframes checkPop { 0%{transform:scale(0);}70%{transform:scale(1.2);}100%{transform:scale(1);} }
        .check-pop { animation:checkPop 0.4s ease forwards; }

        @keyframes successGlow { 0%,100%{box-shadow:0 0 0 0 rgba(52,211,153,0);}50%{box-shadow:0 0 20px 4px rgba(52,211,153,0.25);} }
        .success-glow { animation:successGlow 2s ease-in-out infinite; }
      `}</style>

      <div className="flex h-full w-full flex-col justify-center px-[clamp(24px,5vw,52px)] py-[clamp(24px,4vw,40px)]"
        style={{ fontFamily: "'DM Sans', sans-serif" }}>

        {/* Tab switcher */}
        <div className="relative mb-8 flex border-b border-white/10">
          <div className="tab-indicator" style={{
            left: mode === "login" ? "0%" : "50%",
            width: "50%",
          }} />
          {(["login", "register"] as const).map(m => (
            <button key={m} onClick={() => handleModeChange(m)}
              className={`flex-1 pb-3 text-[14px] font-semibold transition-colors duration-250 ${
                mode === m ? "text-white" : "text-gray-500 hover:text-gray-300"
              }`}>
              {m === "login" ? "Log In" : "Create Account"}
            </button>
          ))}
        </div>

        {/* Form content */}
        <div key={`form-${animKey}`} className="tab-content flex flex-col gap-5">
          {/* Heading */}
          <div>
            <h2 className="text-[clamp(18px,2.5vw,24px)] font-bold text-white">
              {mode === "login" ? "Welcome back 👋" : "👋 Create your account"}
            </h2>
            <p className="mt-1 text-[13px] text-gray-400">
              {mode === "login"
                ? "Log in to continue to your Operino workspace."
                : "Start building powerful AI agents for your business."}
            </p>
          </div>

          {/* Fields */}
          <div className="flex flex-col gap-3">
            {mode === "register" && (
              <InputField label="Full name" placeholder="John Doe" icon="👤" value={name} onChange={setName} />
            )}
            <InputField
              label={mode === "login" ? "Email address" : "Work email"}
              placeholder="you@company.com" type="email" icon="✉️"
              value={email} onChange={setEmail}
            />
            <InputField
              label="Password" placeholder="••••••••••••••" type="password" icon="🔒"
              value={password} onChange={setPassword}
              extra={mode === "login" ? (
                <button className="text-[12px] font-semibold text-[#a78bfa] hover:text-[#c4b5fd] transition-colors">
                  Forgot password?
                </button>
              ) : undefined}
            />
            {mode === "register" && (
              <InputField label="Company name (optional)" placeholder="Your company name" icon="🏢" value={company} onChange={setCompany} />
            )}
          </div>

          {/* Submit */}
          {done ? (
            <div className="check-pop success-glow flex items-center justify-center gap-2 rounded-xl bg-emerald-500/20 py-3.5 text-[14px] font-bold text-emerald-400 ring-1 ring-emerald-500/30">
              ✓ {mode === "login" ? "Logged in!" : "Account created!"}
            </div>
          ) : (
            <button onClick={handleSubmit} disabled={loading}
              className="submit-btn flex items-center justify-center gap-2 rounded-xl bg-[#7c5cfc] py-3.5 text-[14px] font-bold text-white disabled:opacity-70">
              {loading ? (
                <><span className="spinner">⟳</span> Processing...</>
              ) : (
                <>{mode === "login" ? "Access Dashboard" : "Create AI Workspace"} <span>→</span></>
              )}
            </button>
          )}

          {/* Divider */}
          <div className="flex items-center gap-3">
            <div className="flex-1 border-t border-white/10" />
            <span className="text-[11px] text-gray-600">{mode === "login" ? "or continue with" : "or sign up with"}</span>
            <div className="flex-1 border-t border-white/10" />
          </div>

          {/* Social */}
          <div className="flex gap-2">
            <SocialBtn icon="🇬" label="Google" />
            <SocialBtn icon="⚫" label="GitHub" />
            <SocialBtn icon="🪟" label="Microsoft" />
          </div>

          {/* Trust / security note */}
          {mode === "login" ? (
            <div className="flex items-center gap-3 rounded-xl border border-white/8 bg-white/4 p-3">
              <span className="text-lg">🛡️</span>
              <div>
                <p className="text-[12px] font-semibold text-white">Your data is encrypted and protected</p>
                <p className="text-[11px] text-gray-500">We never share your information with anyone.</p>
              </div>
            </div>
          ) : (
            <div className="grid grid-cols-3 gap-2">
              {[
                { icon: "💳", text: "No credit card required" },
                { icon: "⚡", text: "Setup in under 3 minutes" },
                { icon: "🛡️", text: "Trusted by growing teams" },
              ].map((b, i) => (
                <div key={i} className="flex flex-col items-center gap-1 rounded-xl border border-white/8 bg-white/4 p-2.5 text-center">
                  <span className="text-base">{b.icon}</span>
                  <p className="text-[10px] text-gray-500 leading-snug">{b.text}</p>
                </div>
              ))}
            </div>
          )}

          {/* Switch mode link */}
          <p className="text-center text-[12px] text-gray-500">
            {mode === "login" ? "Don't have an account?" : "Already have an account?"}
            {" "}
            <button onClick={() => handleModeChange(mode === "login" ? "register" : "login")}
              className="font-semibold text-[#a78bfa] hover:text-[#c4b5fd] transition-colors">
              {mode === "login" ? "Create account" : "Log in"} →
            </button>
          </p>
        </div>
      </div>
    </>
  );
};

export default AuthForm;
