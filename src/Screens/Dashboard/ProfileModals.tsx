import React, { useState, useEffect, useRef } from "react";

// ─── Shared helpers ────────────────────────────────────────────────────────
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const Toggle: React.FC<{ on: boolean; onChange: () => void }> = ({
  on,
  onChange,
}) => (
  <button
    onClick={onChange}
    className={`relative h-5 w-9 rounded-full transition-all duration-300 flex-shrink-0 ${on ? "bg-[#7c5cfc]" : "bg-white/15"}`}
  >
    <div
      className={`absolute top-0.5 h-4 w-4 rounded-full bg-white shadow transition-all duration-300 ${on ? "left-4" : "left-0.5"}`}
    />
  </button>
);

const Select: React.FC<{
  value: string;
  options: string[];
  onChange: (v: string) => void;
}> = ({ value, options, onChange }) => {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const h = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node))
        setOpen(false);
    };
    document.addEventListener("mousedown", h);
    return () => document.removeEventListener("mousedown", h);
  }, []);
  return (
    <div ref={ref} className="relative">
      <button
        onClick={() => setOpen((o) => !o)}
        className="flex w-full items-center justify-between rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-[12px] text-white hover:border-[#7c5cfc]/40 transition-all"
      >
        <span>{value}</span>
        <span className="text-gray-500 text-xs ml-2">▾</span>
      </button>
      {open && (
        <div className="absolute left-0 top-full z-50 mt-1 w-full overflow-hidden rounded-xl border border-white/10 bg-[#0f0d1f] shadow-2xl">
          {options.map((o) => (
            <div
              key={o}
              onClick={() => {
                onChange(o);
                setOpen(false);
              }}
              className={`cursor-pointer px-3 py-2 text-[12px] hover:bg-[#7c5cfc]/15 ${value === o ? "text-[#a78bfa] font-semibold" : "text-gray-400"}`}
            >
              {o}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

const ModalShell: React.FC<{
  title: string;
  subtitle: string;
  onClose: () => void;
  children: React.ReactNode;
}> = ({ title, subtitle, onClose, children }) => {
  const modalRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const h = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", h);
    return () => document.removeEventListener("keydown", h);
  }, [onClose]);

  return (
    <>
      <style>{`
        @keyframes modalBg { from{opacity:0} to{opacity:1} }
        @keyframes modalSlide { from{opacity:0;transform:scale(0.94) translateY(16px)} to{opacity:1;transform:scale(1) translateY(0)} }
        .modal-bg { animation: modalBg 0.25s ease forwards; }
        .modal-card { animation: modalSlide 0.3s cubic-bezier(0.34,1.1,0.64,1) forwards; }
        .modal-scroll::-webkit-scrollbar { width: 4px; }
        .modal-scroll::-webkit-scrollbar-thumb { background: rgba(124,92,252,0.25); border-radius: 4px; }
        .ms-input:focus { outline: none; border-color: rgba(124,92,252,0.6); box-shadow: 0 0 0 3px rgba(124,92,252,0.1); }
        .ms-row { transition: background 0.18s ease; border-bottom: 1px solid rgba(255,255,255,0.05); }
        .ms-row:hover { background: rgba(124,92,252,0.06); }
        .ms-save { position:relative; overflow:hidden; transition: transform 0.2s ease, box-shadow 0.2s ease, background 0.2s ease; }
        .ms-save:hover { transform: translateY(-2px); box-shadow: 0 6px 20px rgba(124,92,252,0.45); background: #6b4ce0 !important; }
        @keyframes shimmer { 0%{transform:translateX(-100%) skewX(-15deg)} 100%{transform:translateX(300%) skewX(-15deg)} }
        .ms-save::after { content:''; position:absolute; top:0; left:0; width:30%; height:100%; background:linear-gradient(90deg,transparent,rgba(255,255,255,0.15),transparent); transform:translateX(-100%) skewX(-15deg); }
        .ms-save:hover::after { animation: shimmer 0.55s ease forwards; }
        @keyframes checkPop { 0%{transform:scale(0)} 70%{transform:scale(1.2)} 100%{transform:scale(1)} }
        .check-pop { animation: checkPop 0.35s ease forwards; }
        .ms-tab { transition: color 0.2s ease, border-color 0.2s ease; }
        .ms-card { border: 1px solid rgba(255,255,255,0.07); transition: border-color 0.2s ease; }
        .ms-card:hover { border-color: rgba(124,92,252,0.25); }
        .prog-bar { background: linear-gradient(90deg,#7c5cfc,#a78bfa); border-radius:4px; height:6px; transition:width 1s ease; }
      `}</style>

      {/* Backdrop */}
      <div
        className="modal-bg fixed inset-0 z-[9998] bg-black/70 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Card */}
      <div
        ref={modalRef}
        className="modal-card fixed inset-0 z-9999 flex items-center justify-center p-4"
      >
        <div
          className="relative flex h-[85vh] w-full max-w-215 flex-col overflow-hidden rounded-3xl border border-white/10 bg-[#0c0a1e] shadow-[0_32px_80px_rgba(0,0,0,0.7),0_0_0_1px_rgba(124,92,252,0.15)]"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Ambient glow */}
          <div className="pointer-events-none absolute left-[-20%] top-[-20%] h-75 w-75 rounded-full bg-[#7c5cfc] opacity-[0.06] blur-[100px]" />

          {/* Header */}
          <div className="flex shrink-0 items-center justify-between border-b border-white/8 px-6 py-4">
            <div>
              <h2 className="font-['Syne'] text-[18px] font-bold text-white">
                {title}
              </h2>
              <p className="mt-0.5 text-[12px] text-gray-500">{subtitle}</p>
            </div>
            <button
              onClick={onClose}
              className="flex h-8 w-8 items-center justify-center rounded-xl border border-white/10 text-gray-500 hover:border-[#7c5cfc]/50 hover:text-white transition-all text-lg"
            >
              ✕
            </button>
          </div>

          {/* Scrollable body */}
          <div className="modal-scroll flex-1 overflow-y-auto">{children}</div>
        </div>
      </div>
    </>
  );
};

// ─── MY PROFILE ────────────────────────────────────────────────────────────
export const MyProfileModal: React.FC<{ onClose: () => void }> = ({
  onClose,
}) => {
  const [activeTab, setActiveTab] = useState("Profile");
  const [name, setName] = useState("Mohsen");
  const [email] = useState("mohsen@example.com");
  const [bio, setBio] = useState(
    "Building AI solutions that empower teams to work smarter.",
  );
  const [location, setLocation] = useState("Tehran, Iran");
  const [website, setWebsite] = useState("https://mohsen.dev");
  const [saved, setSaved] = useState(false);

  const tabs = ["Profile", "Preferences", "Security"];

  return (
    <ModalShell
      title="My Profile"
      subtitle="View and update your personal information and preferences."
      onClose={onClose}
    >
      {/* Tabs */}
      <div className="flex gap-0 border-b border-white/8 px-6">
        {tabs.map((t) => (
          <button
            key={t}
            onClick={() => setActiveTab(t)}
            className={`ms-tab pb-3 pr-6 pt-3 text-[13px] font-semibold border-b-2 ${activeTab === t ? "border-[#7c5cfc] text-white" : "border-transparent text-gray-500 hover:text-gray-300"}`}
          >
            {t}
          </button>
        ))}
      </div>

      <div className="flex gap-0 p-6">
        {/* Main content */}
        <div className="flex-1 pr-6">
          {/* Profile Info */}
          <div className="ms-card mb-5 rounded-2xl bg-white/3 p-5">
            <h3 className="mb-1 text-[14px] font-bold text-white">
              Profile Information
            </h3>
            <p className="mb-4 text-[11px] text-gray-500">
              Manage your personal information.
            </p>
            <div className="flex gap-5">
              {/* Avatar */}
              <div className="shrink-0">
                <div className="relative">
                  <div className="flex h-20 w-20 items-center justify-center rounded-full bg-[#7c5cfc] text-[28px] font-bold text-white ring-4 ring-[#7c5cfc]/30">
                    M
                  </div>
                  <button className="absolute bottom-0 right-0 flex h-6 w-6 items-center justify-center rounded-full bg-[#0c0a1e] border border-white/20 text-gray-400 hover:text-white text-sm transition-all">
                    📷
                  </button>
                </div>
                <p className="mt-1.5 text-center text-[9px] text-gray-600">
                  JPG, PNG or GIF.
                  <br />
                  Max size 2MB.
                </p>
              </div>
              {/* Fields */}
              <div className="flex-1 grid grid-cols-2 gap-3">
                <div>
                  <label className="mb-1 block text-[11px] font-semibold text-gray-400">
                    Full Name
                  </label>
                  <input
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="ms-input w-full rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-[13px] text-white transition-all"
                  />
                </div>
                <div>
                  <label className="mb-1 block text-[11px] font-semibold text-gray-400">
                    Email Address
                  </label>
                  <div className="flex items-center gap-2 rounded-xl border border-white/10 bg-white/5 px-3 py-2">
                    <span className="flex-1 text-[13px] text-gray-400">
                      {email}
                    </span>
                    <span className="rounded-full bg-emerald-500/15 px-2 py-0.5 text-[9px] font-bold text-emerald-400">
                      Verified
                    </span>
                  </div>
                </div>
                <div className="col-span-2">
                  <label className="mb-1 block text-[11px] font-semibold text-gray-400">
                    Bio
                  </label>
                  <textarea
                    value={bio}
                    onChange={(e) => setBio(e.target.value)}
                    rows={2}
                    className="ms-input w-full resize-none rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-[13px] text-white transition-all"
                  />
                  <p className="mt-0.5 text-right text-[10px] text-gray-600">
                    {bio.length} / 160
                  </p>
                </div>
                <div>
                  <label className="mb-1 block text-[11px] font-semibold text-gray-400">
                    Location
                  </label>
                  <div className="flex items-center gap-2 rounded-xl border border-white/10 bg-white/5 px-3 py-2">
                    <span className="text-sm">📍</span>
                    <input
                      value={location}
                      onChange={(e) => setLocation(e.target.value)}
                      className="flex-1 bg-transparent text-[13px] text-white outline-none"
                    />
                  </div>
                </div>
                <div>
                  <label className="mb-1 block text-[11px] font-semibold text-gray-400">
                    Website
                  </label>
                  <div className="flex items-center gap-2 rounded-xl border border-white/10 bg-white/5 px-3 py-2">
                    <span className="text-sm">🔗</span>
                    <input
                      value={website}
                      onChange={(e) => setWebsite(e.target.value)}
                      className="flex-1 bg-transparent text-[13px] text-white outline-none"
                    />
                  </div>
                </div>
              </div>
            </div>
            <div className="mt-4 flex justify-end">
              {saved ? (
                <div className="check-pop flex items-center gap-2 rounded-xl bg-emerald-500/20 px-4 py-2 text-[12px] font-bold text-emerald-400">
                  ✓ Saved!
                </div>
              ) : (
                <button
                  onClick={() => {
                    setSaved(true);
                    setTimeout(() => setSaved(false), 2000);
                  }}
                  className="ms-save rounded-xl bg-[#7c5cfc] px-5 py-2 text-[13px] font-bold text-white"
                >
                  Save Changes
                </button>
              )}
            </div>
          </div>

          {/* Connected Accounts */}
          <div className="ms-card mb-5 rounded-2xl bg-white/3 p-5">
            <h3 className="mb-1 text-[14px] font-bold text-white">
              Connected Accounts
            </h3>
            <p className="mb-4 text-[11px] text-gray-500">
              Manage accounts connected to your profile.
            </p>
            {[
              { icon: "🇬", name: "Google", user: "mohsen@example.com" },
              { icon: "⬛", name: "GitHub", user: "mohsen-dev" },
            ].map((a, i) => (
              <div
                key={i}
                className="ms-row flex items-center justify-between rounded-xl px-3 py-2.5"
              >
                <div className="flex items-center gap-2.5">
                  <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-white/8 text-lg">
                    {a.icon}
                  </div>
                  <div>
                    <p className="text-[12px] font-semibold text-white">
                      {a.name}
                    </p>
                    <p className="text-[10px] text-gray-500">{a.user}</p>
                  </div>
                </div>
                <button className="rounded-lg border border-white/12 bg-white/5 px-3 py-1 text-[11px] font-semibold text-gray-300 hover:text-white transition-all">
                  Disconnect
                </button>
              </div>
            ))}
          </div>

          {/* Delete Account */}
          <div className="rounded-2xl border border-red-500/20 bg-red-500/05 p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-[13px] font-bold text-white">
                  Delete Account
                </p>
                <p className="text-[11px] text-gray-500">
                  Permanently delete your account and all of your data.
                </p>
              </div>
              <button className="rounded-xl border border-red-500/40 bg-red-500/10 px-4 py-2 text-[12px] font-bold text-red-400 hover:bg-red-500/20 transition-all">
                Delete My Account
              </button>
            </div>
          </div>
        </div>

        {/* Right panel */}
        <div className="w-55 shrink-0 flex flex-col gap-4">
          {/* Membership */}
          <div className="ms-card rounded-2xl bg-white/3 p-4">
            <p className="mb-3 text-[13px] font-bold text-white">Membership</p>
            <div className="rounded-xl border border-[#7c5cfc]/30 bg-[#7c5cfc]/08 p-3 mb-3">
              <div className="flex items-center justify-between mb-1">
                <div className="flex items-center gap-1.5">
                  <span>👑</span>
                  <span className="text-[12px] font-bold text-white">
                    Pro Plan
                  </span>
                </div>
                <span className="rounded-full bg-emerald-500/15 px-2 py-0.5 text-[9px] font-bold text-emerald-400">
                  Active
                </span>
              </div>
              <p className="text-[11px] text-gray-400 mb-2">
                12,450 / 20,000 Credits used
              </p>
              <div className="h-1.5 overflow-hidden rounded-full bg-white/10">
                <div className="prog-bar" style={{ width: "62%" }} />
              </div>
              {[
                "Unlimited conversations",
                "Up to 25 members",
                "Advanced integrations",
                "Priority support",
              ].map((f, i) => (
                <div key={i} className="mt-1.5 flex items-center gap-1.5">
                  <span className="text-emerald-400 text-xs">✓</span>
                  <span className="text-[10px] text-gray-400">{f}</span>
                </div>
              ))}
            </div>
            <button className="w-full rounded-xl border border-white/10 bg-white/5 py-2 text-[11px] font-semibold text-gray-300 hover:text-white transition-all">
              Manage Subscription
            </button>
          </div>
          {/* Account Status */}
          <div className="ms-card rounded-2xl bg-white/3 p-4">
            <p className="mb-3 text-[13px] font-bold text-white">
              Account Status
            </p>
            {[
              { l: "Email verified", v: "Verified", c: "#22c55e" },
              { l: "Two-factor authentication", v: "Enabled", c: "#22c55e" },
              { l: "Account status", v: "Active", c: "#22c55e" },
            ].map((s, i) => (
              <div
                key={i}
                className="flex items-center justify-between py-1.5 border-b border-white/5"
              >
                <span className="text-[11px] text-gray-500">{s.l}</span>
                <span
                  className="rounded-full px-2 py-0.5 text-[9px] font-bold"
                  style={{ background: `${s.c}20`, color: s.c }}
                >
                  {s.v}
                </span>
              </div>
            ))}
          </div>
          {/* Help */}
          <div className="ms-card rounded-2xl bg-white/3 p-4">
            <p className="mb-2 text-[13px] font-bold text-white">Help</p>
            {[
              { icon: "📖", l: "View documentation" },
              { icon: "🎧", l: "Contact support" },
            ].map((h, i) => (
              <div
                key={i}
                className="flex items-center justify-between py-1.5 cursor-pointer hover:text-[#a78bfa] transition-colors"
              >
                <div className="flex items-center gap-2">
                  <span>{h.icon}</span>
                  <span className="text-[11px] text-gray-400">{h.l}</span>
                </div>
                <span className="text-gray-600 text-xs">↗</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </ModalShell>
  );
};

// ─── ACCOUNT SETTINGS ──────────────────────────────────────────────────────
export const AccountSettingsModal: React.FC<{ onClose: () => void }> = ({
  onClose,
}) => {
  const [activeTab, setActiveTab] = useState("Account");
  const [fullName, setFullName] = useState("Mohsen");
  const [username, setUsername] = useState("mohsen.dev");
  const [lang, setLang] = useState("English");
  const [tz, setTz] = useState("(GMT+03:30) Tehran");
  const [theme, setTheme] = useState("Dark");
  const [dashboard, setDashboard] = useState("Overview");
  const [dateFormat, setDateFormat] = useState("YYYY-MM-DD");
  const [emailPrefs, setEmailPrefs] = useState([true, true, true, false]);
  const [saved, setSaved] = useState(false);

  return (
    <ModalShell
      title="Account Settings"
      subtitle="Manage your account preferences, security, and personal settings."
      onClose={onClose}
    >
      <div className="flex gap-0 border-b border-white/8 px-6">
        {[
          "Account",
          "Billing",
          "Security",
          "Sessions",
          "Connected Accounts",
        ].map((t) => (
          <button
            key={t}
            onClick={() => setActiveTab(t)}
            className={`ms-tab pb-3 pr-5 pt-3 text-[12px] font-semibold border-b-2 whitespace-nowrap ${activeTab === t ? "border-[#7c5cfc] text-white" : "border-transparent text-gray-500 hover:text-gray-300"}`}
          >
            {t}
          </button>
        ))}
      </div>

      <div className="flex gap-0 p-6">
        <div className="flex-1 pr-6">
          {/* Account Information */}
          <div className="ms-card mb-4 rounded-2xl bg-white/3 p-5">
            <h3 className="mb-1 text-[14px] font-bold text-white">
              Account Information
            </h3>
            <p className="mb-4 text-[11px] text-gray-500">
              Update your basic account details and preferences.
            </p>
            <div className="flex gap-5">
              <div className="shrink-0">
                <div className="relative">
                  <div className="flex h-16 w-16 items-center justify-center rounded-full bg-[#7c5cfc] text-[22px] font-bold text-white ring-3 ring-[#7c5cfc]/30">
                    M
                  </div>
                  <button className="absolute bottom-0 right-0 flex h-5 w-5 items-center justify-center rounded-full bg-[#0c0a1e] border border-white/20 text-[10px] text-gray-400 hover:text-white">
                    📷
                  </button>
                </div>
                <p className="mt-1 text-center text-[9px] text-gray-600">
                  JPG, PNG or GIF.
                  <br />
                  Max size 2MB.
                </p>
              </div>
              <div className="flex-1 grid grid-cols-2 gap-3">
                <div>
                  <label className="mb-1 block text-[11px] font-semibold text-gray-400">
                    Full Name
                  </label>
                  <input
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    className="ms-input w-full rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-[12px] text-white transition-all"
                  />
                </div>
                <div>
                  <label className="mb-1 block text-[11px] font-semibold text-gray-400">
                    Email Address
                  </label>
                  <div className="flex items-center gap-1.5 rounded-xl border border-white/10 bg-white/5 px-3 py-2">
                    <span className="flex-1 text-[12px] text-gray-400">
                      mohsen@example.com
                    </span>
                    <span className="rounded-full bg-emerald-500/15 px-1.5 py-0.5 text-[9px] font-bold text-emerald-400">
                      Verified
                    </span>
                  </div>
                </div>
                <div>
                  <label className="mb-1 block text-[11px] font-semibold text-gray-400">
                    Username
                  </label>
                  <input
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    className="ms-input w-full rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-[12px] text-white transition-all"
                  />
                  <p className="mt-0.5 text-[10px] text-gray-600">
                    This is your unique public username.
                  </p>
                </div>
                <div>
                  <label className="mb-1 block text-[11px] font-semibold text-gray-400">
                    Language
                  </label>
                  <Select
                    value={lang}
                    options={["English", "Persian", "Arabic", "French"]}
                    onChange={setLang}
                  />
                </div>
                <div className="col-span-2">
                  <label className="mb-1 block text-[11px] font-semibold text-gray-400">
                    Timezone
                  </label>
                  <Select
                    value={tz}
                    options={[
                      "(GMT+03:30) Tehran",
                      "(GMT+00:00) UTC",
                      "(GMT-05:00) New York",
                    ]}
                    onChange={setTz}
                  />
                </div>
              </div>
            </div>
            <div className="mt-4 flex justify-end">
              {saved ? (
                <div className="check-pop flex items-center gap-2 rounded-xl bg-emerald-500/20 px-4 py-2 text-[12px] font-bold text-emerald-400">
                  ✓ Saved!
                </div>
              ) : (
                <button
                  onClick={() => {
                    setSaved(true);
                    setTimeout(() => setSaved(false), 2000);
                  }}
                  className="ms-save rounded-xl bg-[#7c5cfc] px-5 py-2 text-[12px] font-bold text-white"
                >
                  Save Changes
                </button>
              )}
            </div>
          </div>

          {/* Email Preferences */}
          <div className="ms-card mb-4 rounded-2xl bg-white/3 p-5">
            <h3 className="mb-1 text-[14px] font-bold text-white">
              Email Preferences
            </h3>
            <p className="mb-3 text-[11px] text-gray-500">
              Choose which emails you want to receive from us.
            </p>
            {[
              {
                l: "Product updates",
                d: "Receive emails about new features and improvements.",
              },
              {
                l: "Weekly summary",
                d: "Get a weekly summary of your account activity.",
              },
              {
                l: "Tips & best practices",
                d: "Receive tips to get the most out of Operino.",
              },
              {
                l: "Marketing & offers",
                d: "Receive occasional offers and promotional emails.",
              },
            ].map((p, i) => (
              <div
                key={i}
                className="ms-row flex items-center gap-3 rounded-xl px-3 py-2.5"
              >
                <input
                  type="checkbox"
                  checked={emailPrefs[i]}
                  onChange={() =>
                    setEmailPrefs((prev) => {
                      const n = [...prev];
                      n[i] = !n[i];
                      return n;
                    })
                  }
                  className="h-4 w-4 rounded border-white/20 accent-[#7c5cfc]"
                />
                <div>
                  <p className="text-[12px] font-semibold text-white">{p.l}</p>
                  <p className="text-[10px] text-gray-500">{p.d}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Personal Preferences */}
          <div className="ms-card rounded-2xl bg-white/3 p-5">
            <h3 className="mb-1 text-[14px] font-bold text-white">
              Personal Preferences
            </h3>
            <p className="mb-3 text-[11px] text-gray-500">
              Customize your account experience.
            </p>
            {[
              {
                icon: "🎨",
                l: "Theme",
                d: "Choose your preferred theme.",
                v: theme,
                opts: ["Dark", "Light", "System"],
                set: setTheme,
              },
              {
                icon: "📊",
                l: "Default dashboard",
                d: "Select your default landing dashboard.",
                v: dashboard,
                opts: ["Overview", "Analytics", "Conversations"],
                set: setDashboard,
              },
              {
                icon: "📅",
                l: "Date format",
                d: "Choose how dates are displayed.",
                v: dateFormat,
                opts: ["YYYY-MM-DD", "DD/MM/YYYY", "MM-DD-YYYY"],
                set: setDateFormat,
              },
            ].map((p, i) => (
              <div
                key={i}
                className="ms-row flex items-center justify-between rounded-xl px-3 py-2.5"
              >
                <div className="flex items-center gap-2.5">
                  <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-[#7c5cfc]/15 text-sm">
                    {p.icon}
                  </div>
                  <div>
                    <p className="text-[12px] font-semibold text-white">
                      {p.l}
                    </p>
                    <p className="text-[10px] text-gray-500">{p.d}</p>
                  </div>
                </div>
                <div className="w-36">
                  <Select value={p.v} options={p.opts} onChange={p.set} />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right panel */}
        <div className="w-50 shrink-0 flex flex-col gap-4">
          <div className="ms-card rounded-2xl bg-white/3 p-4">
            <p className="mb-3 text-[13px] font-bold text-white">
              Security Overview
            </p>
            {[
              {
                l: "Password",
                v: "Last changed 12 days ago",
                action: "Change",
              },
              {
                l: "Two-factor authentication",
                v: "Enabled",
                badge: "#22c55e",
              },
              { l: "Recovery email", v: "Verified", badge: "#22c55e" },
              { l: "Login notifications", v: "Enabled", badge: "#22c55e" },
            ].map((s, i) => (
              <div
                key={i}
                className="flex items-center justify-between py-2 border-b border-white/5"
              >
                <span className="text-[11px] text-gray-500">{s.l}</span>
                {s.action ? (
                  <button className="text-[10px] font-semibold text-[#a78bfa] hover:text-[#c4b5fd]">
                    {s.action}
                  </button>
                ) : (
                  <span
                    className="rounded-full px-1.5 py-0.5 text-[9px] font-bold"
                    style={{ background: `${s.badge}20`, color: s.badge }}
                  >
                    {s.v}
                  </span>
                )}
              </div>
            ))}
            <button className="mt-2 text-[11px] font-semibold text-[#a78bfa] hover:text-[#c4b5fd] transition-colors">
              View all security settings →
            </button>
          </div>
          <div className="ms-card rounded-2xl bg-white/3 p-4">
            <p className="mb-2 text-[13px] font-bold text-white">
              Account Status
            </p>
            {[
              { l: "Account status", v: "Active", c: "#22c55e" },
              { l: "Member since", v: "May 15, 2024" },
              { l: "Account ID", v: "acc_8f3d2a7e4b1c" },
            ].map((s, i) => (
              <div
                key={i}
                className="flex items-center justify-between py-1.5 border-b border-white/5"
              >
                <span className="text-[10px] text-gray-500">{s.l}</span>
                {s.c ? (
                  <span
                    className="rounded-full px-1.5 py-0.5 text-[9px] font-bold"
                    style={{ background: `${s.c}20`, color: s.c }}
                  >
                    {s.v}
                  </span>
                ) : (
                  <span className="text-[10px] font-mono text-gray-400">
                    {s.v}
                  </span>
                )}
              </div>
            ))}
          </div>
          <div className="ms-card rounded-2xl bg-white/3 p-4">
            <p className="mb-2 text-[13px] font-bold text-white">
              Help & Support
            </p>
            {[
              "View documentation",
              "Contact support",
              "Privacy policy",
              "Terms of service",
            ].map((h, i) => (
              <div
                key={i}
                className="flex cursor-pointer items-center justify-between py-1.5 hover:text-[#a78bfa] transition-colors"
              >
                <span className="text-[11px] text-gray-400">{h}</span>
                <span className="text-gray-600 text-xs">↗</span>
              </div>
            ))}
          </div>
          <div className="rounded-2xl border border-red-500/20 bg-red-500/05 p-4">
            <p className="mb-1 text-[12px] font-bold text-red-400">
              Delete Account
            </p>
            <p className="mb-2 text-[10px] text-gray-500">
              Permanently delete your account and all of your data.
            </p>
            <button className="w-full rounded-lg border border-red-500/30 bg-red-500/10 py-1.5 text-[11px] font-bold text-red-400 hover:bg-red-500/20 transition-all">
              Delete My Account
            </button>
          </div>
        </div>
      </div>
    </ModalShell>
  );
};

// ─── BILLING & SUBSCRIPTION ────────────────────────────────────────────────
export const BillingModal: React.FC<{ onClose: () => void }> = ({
  onClose,
}) => {
  const [activeTab, setActiveTab] = useState("Subscription");
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const invoices = [
    {
      date: "May 15, 2024",
      desc: "Pro Plan – Monthly",
      amount: "$29.00",
      status: "Paid",
    },
    {
      date: "Apr 15, 2024",
      desc: "Pro Plan – Monthly",
      amount: "$29.00",
      status: "Paid",
    },
    {
      date: "Mar 15, 2024",
      desc: "Pro Plan – Monthly",
      amount: "$29.00",
      status: "Paid",
    },
  ];

  return (
    <ModalShell
      title="Billing & Subscription"
      subtitle="Manage your subscription, payment methods, and invoices."
      onClose={onClose}
    >
      <div className="flex gap-0 border-b border-white/8 px-6">
        {["Subscription", "Payment Methods", "Invoices", "Billing History"].map(
          (t) => (
            <button
              key={t}
              onClick={() => setActiveTab(t)}
              className={`ms-tab pb-3 pr-5 pt-3 text-[12px] font-semibold border-b-2 whitespace-nowrap ${activeTab === t ? "border-[#7c5cfc] text-white" : "border-transparent text-gray-500 hover:text-gray-300"}`}
            >
              {t}
            </button>
          ),
        )}
      </div>

      <div className="flex gap-0 p-6">
        <div className="flex-1 pr-6">
          {/* Current Subscription */}
          <div className="ms-card mb-4 rounded-2xl bg-white/3 p-5">
            <h3 className="mb-1 text-[14px] font-bold text-white">
              Current Subscription
            </h3>
            <p className="mb-4 text-[11px] text-gray-500">
              Here are the details of your current plan.
            </p>
            <div className="flex gap-4">
              <div className="flex-1 rounded-2xl border border-[#7c5cfc]/30 bg-[#7c5cfc]/08 p-4">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <span>👑</span>
                    <span className="text-[15px] font-bold text-white">
                      Pro Plan
                    </span>
                  </div>
                  <span className="rounded-full bg-emerald-500/15 px-2 py-0.5 text-[10px] font-bold text-emerald-400">
                    Active
                  </span>
                </div>
                <p className="text-[28px] font-bold text-white mb-1">
                  $29{" "}
                  <span className="text-[13px] font-normal text-gray-400">
                    / month
                  </span>
                </p>
                <p className="text-[11px] text-gray-500 mb-3">
                  Billed monthly • Next billing on Jun 15, 2024
                </p>
                <button className="w-full rounded-xl border border-white/15 bg-white/5 py-2 text-[12px] font-semibold text-gray-300 hover:text-white transition-all">
                  Manage Subscription
                </button>
              </div>
              <div className="flex-1">
                <p className="mb-2 text-[12px] font-bold text-white">
                  Plan Includes
                </p>
                {[
                  "Unlimited conversations",
                  "Up to 25 members",
                  "Advanced integrations",
                  "Priority support",
                  "Custom AI employee training",
                  "API access",
                ].map((f, i) => (
                  <div key={i} className="mb-1.5 flex items-center gap-2">
                    <span className="text-emerald-400 text-xs">✓</span>
                    <span className="text-[11px] text-gray-300">{f}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Billing Cycle */}
          <div className="ms-card mb-4 rounded-2xl bg-white/3 p-5">
            <h3 className="mb-1 text-[14px] font-bold text-white">
              Billing Cycle
            </h3>
            <p className="mb-4 text-[11px] text-gray-500">
              Your next payment will be automatically processed.
            </p>
            <div className="grid grid-cols-3 gap-3 mb-3">
              {[
                { icon: "📅", l: "Next billing date", v: "Jun 15, 2024" },
                { icon: "🔄", l: "Billing period", v: "Monthly" },
                {
                  icon: "💳",
                  l: "Amount",
                  v: "$29.00 USD\n+ applicable taxes",
                },
              ].map((b, i) => (
                <div
                  key={i}
                  className="rounded-xl border border-white/8 bg-white/4 px-3 py-3"
                >
                  <div className="flex items-center gap-1.5 mb-1">
                    <span className="text-base">{b.icon}</span>
                    <p className="text-[10px] text-gray-500">{b.l}</p>
                  </div>
                  <p className="text-[12px] font-bold text-white whitespace-pre-line">
                    {b.v}
                  </p>
                </div>
              ))}
            </div>
            <div className="flex items-center gap-2 rounded-xl border border-white/8 bg-white/3 px-3 py-2">
              <span className="text-sm">ℹ️</span>
              <p className="text-[11px] text-gray-400">
                You will be notified via email before each billing cycle.
              </p>
            </div>
          </div>

          {/* Add-ons */}
          <div className="ms-card rounded-2xl bg-white/3 p-5">
            <h3 className="mb-1 text-[14px] font-bold text-white">Add-ons</h3>
            <p className="mb-3 text-[11px] text-gray-500">
              Enhance your plan with additional features.
            </p>
            {[
              {
                icon: "👥",
                l: "Extra Members",
                price: "$5 / member / month",
                usage: "5 members",
                cost: "$25.00 / month",
              },
              {
                icon: "💾",
                l: "Additional Storage",
                price: "$10 / 100 GB / month",
                usage: "100 GB",
                cost: "$10.00 / month",
              },
            ].map((a, i) => (
              <div
                key={i}
                className="ms-row flex items-center justify-between rounded-xl px-3 py-3"
              >
                <div className="flex items-center gap-2.5">
                  <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-[#7c5cfc]/15 text-base">
                    {a.icon}
                  </div>
                  <div>
                    <p className="text-[12px] font-semibold text-white">
                      {a.l}
                    </p>
                    <p className="text-[10px] text-gray-500">{a.price}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-[11px] font-semibold text-white">
                    {a.usage}
                  </p>
                  <p className="text-[10px] text-gray-500">{a.cost}</p>
                </div>
                <button className="ml-4 rounded-xl border border-white/12 bg-white/5 px-3 py-1.5 text-[11px] font-semibold text-gray-300 hover:text-white transition-all">
                  Manage
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Right panel */}
        <div className="w-[200px] flex-shrink-0 flex flex-col gap-4">
          <div className="ms-card rounded-2xl bg-white/3 p-4">
            <p className="mb-3 text-[13px] font-bold text-white">
              Usage Summary
            </p>
            <p className="mb-1 text-[11px] text-gray-500">
              Your usage this billing cycle.
            </p>
            <div className="mb-2">
              <div className="flex justify-between mb-0.5">
                <span className="text-[11px] text-gray-400">Credits used</span>
                <span className="text-[11px] font-bold text-[#a78bfa]">
                  12,450 / 20,000
                </span>
              </div>
              <div className="h-1.5 overflow-hidden rounded-full bg-white/10">
                <div className="prog-bar" style={{ width: "62%" }} />
              </div>
            </div>
            {[
              { l: "Conversations", v: "8,230" },
              { l: "AI Employees", v: "15 / 25" },
              { l: "Storage", v: "24.6 GB / 100 GB" },
              { l: "API Requests", v: "120,000 / 500,000" },
            ].map((s, i) => (
              <div
                key={i}
                className="flex justify-between py-1 border-b border-white/5"
              >
                <span className="text-[10px] text-gray-500">{s.l}</span>
                <span className="text-[10px] font-semibold text-white">
                  {s.v}
                </span>
              </div>
            ))}
            <button className="mt-2 text-[11px] font-semibold text-[#a78bfa] hover:text-[#c4b5fd]">
              View Usage & Limits
            </button>
          </div>
          <div className="ms-card rounded-2xl bg-white/3 p-4">
            <p className="mb-2 text-[13px] font-bold text-white">
              Primary Payment Method
            </p>
            <div className="flex items-center gap-2 rounded-xl border border-white/8 bg-white/4 p-3 mb-2">
              <div className="flex h-8 w-12 items-center justify-center rounded-lg bg-white/10 text-[10px] font-bold text-blue-400">
                VISA
              </div>
              <div>
                <p className="text-[11px] font-semibold text-white">
                  Visa ending in 4242
                </p>
                <p className="text-[10px] text-gray-500">Expires 06 / 2026</p>
              </div>
              <span className="ml-auto rounded-full bg-[#7c5cfc]/20 px-1.5 py-0.5 text-[9px] font-bold text-[#a78bfa]">
                Primary
              </span>
            </div>
            <button className="w-full rounded-xl border border-white/10 bg-white/5 py-1.5 text-[11px] font-semibold text-gray-300 hover:text-white transition-all">
              Update Payment Method
            </button>
          </div>
          <div className="ms-card rounded-2xl bg-white/3 p-4">
            <p className="mb-2 text-[13px] font-bold text-white">Need Help?</p>
            {["View billing FAQ", "Contact support"].map((h, i) => (
              <div
                key={i}
                className="flex cursor-pointer items-center justify-between py-1.5"
              >
                <span className="text-[11px] text-gray-400">{h}</span>
                <span className="text-gray-600 text-xs">↗</span>
              </div>
            ))}
          </div>
          {/* Upgrade CTA */}
          <div className="rounded-2xl border border-[#7c5cfc]/30 bg-[#7c5cfc]/08 p-4">
            <p className="mb-1 text-[12px] font-bold text-white">
              Upgrade to scale
              <br />
              your business
            </p>
            <p className="mb-3 text-[10px] text-gray-500">
              Get more features, higher limits, and priority support.
            </p>
            <button className="w-full rounded-xl bg-[#7c5cfc] py-2 text-[11px] font-bold text-white hover:bg-[#6b4ce0] transition-all">
              Upgrade Plan
            </button>
          </div>
        </div>
      </div>
    </ModalShell>
  );
};

// ─── USAGE & LIMITS ────────────────────────────────────────────────────────
export const UsageLimitsModal: React.FC<{ onClose: () => void }> = ({
  onClose,
}) => {
  const [activeTab, setActiveTab] = useState("Overview");

  const features = [
    {
      icon: "💬",
      l: "Conversations",
      sub: "AI chat interactions",
      used: 8230,
      limit: "Unlimited",
      pct: 0,
      color: "#7c5cfc",
    },
    {
      icon: "🤖",
      l: "AI Employees",
      sub: "Active AI employees",
      used: 15,
      limit: 25,
      pct: 60,
      color: "#3b82f6",
    },
    {
      icon: "💾",
      l: "Storage",
      sub: "Knowledge base storage",
      used: "24.6 GB",
      limit: "100 GB",
      pct: 24.6,
      color: "#22c55e",
    },
    {
      icon: "🔌",
      l: "API Requests",
      sub: "API calls made",
      used: "120,000",
      limit: "500,000",
      pct: 24,
      color: "#f97316",
    },
    {
      icon: "⚡",
      l: "Automations",
      sub: "Workflow executions",
      used: 1230,
      limit: 10000,
      pct: 12.3,
      color: "#a78bfa",
    },
    {
      icon: "🧠",
      l: "Custom AI Training",
      sub: "Training minutes",
      used: "180 min",
      limit: "500 min",
      pct: 36,
      color: "#ec4899",
    },
  ];

  const limits = [
    { l: "Credits Limit", sub: "Monthly credit usage limit", v: "20,000" },
    { l: "Storage Limit", sub: "Knowledge base storage limit", v: "100 GB" },
    {
      l: "API Requests Limit",
      sub: "Monthly API requests limit",
      v: "500,000",
    },
    { l: "AI Employees Limit", sub: "Maximum active AI employees", v: "25" },
    {
      l: "Custom AI Training Limit",
      sub: "Monthly training minutes limit",
      v: "500 min",
    },
  ];

  return (
    <ModalShell
      title="Usage & Limits"
      subtitle="Monitor your usage and manage limits for your workspace."
      onClose={onClose}
    >
      <div className="flex items-center justify-between border-b border-white/8 px-6">
        <div className="flex">
          {["Overview", "Limits", "Usage History", "Alerts"].map((t) => (
            <button
              key={t}
              onClick={() => setActiveTab(t)}
              className={`ms-tab pb-3 pr-5 pt-3 text-[12px] font-semibold border-b-2 whitespace-nowrap ${activeTab === t ? "border-[#7c5cfc] text-white" : "border-transparent text-gray-500 hover:text-gray-300"}`}
            >
              {t}
            </button>
          ))}
        </div>
        <div className="flex items-center gap-2 rounded-xl border border-white/10 bg-white/5 px-3 py-1.5 text-[11px] text-gray-400 cursor-pointer">
          📅 May 15 – Jun 15, 2024 ▾
        </div>
      </div>

      <div className="flex gap-0 p-6">
        <div className="flex-1 pr-6">
          {/* Overall Usage */}
          <div className="ms-card mb-4 rounded-2xl bg-white/3 p-5">
            <h3 className="mb-4 text-[14px] font-bold text-white">
              Overall Usage
            </h3>
            <div className="flex items-center gap-6">
              {/* Donut */}
              <div className="relative flex-shrink-0">
                <svg
                  viewBox="0 0 100 100"
                  className="h-[100px] w-[100px] -rotate-90"
                >
                  <circle
                    cx="50"
                    cy="50"
                    r="38"
                    fill="none"
                    stroke="rgba(255,255,255,0.06)"
                    strokeWidth="12"
                  />
                  <circle
                    cx="50"
                    cy="50"
                    r="38"
                    fill="none"
                    stroke="#7c5cfc"
                    strokeWidth="12"
                    strokeDasharray="148 239"
                    strokeDashoffset="0"
                  />
                </svg>
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                  <span className="text-[18px] font-bold text-white">62%</span>
                  <span className="text-[9px] text-gray-500">Used</span>
                </div>
              </div>
              <div className="flex-1">
                <p className="mb-2 text-[12px] text-gray-400">
                  You've used{" "}
                  <span className="font-bold text-[#a78bfa]">12,450</span> of
                  20,000 credits
                </p>
                <div className="h-2 overflow-hidden rounded-full bg-white/10 mb-2">
                  <div
                    className="h-full rounded-full bg-gradient-to-r from-[#7c5cfc] to-[#a78bfa]"
                    style={{ width: "62%" }}
                  />
                </div>
                <div className="flex items-center gap-4">
                  {[
                    { c: "#7c5cfc", l: "Used", v: "12,450 (62%)" },
                    { c: "#ffffff20", l: "Remaining", v: "7,550 (38%)" },
                  ].map((s, i) => (
                    <div key={i} className="flex items-center gap-2">
                      <div
                        className="h-2.5 w-2.5 rounded-full"
                        style={{ background: s.c }}
                      />
                      <span className="text-[11px] text-gray-400">{s.l}</span>
                      <span className="text-[11px] font-semibold text-white">
                        {s.v}
                      </span>
                    </div>
                  ))}
                </div>
                <p className="mt-2 text-[11px] text-gray-500">
                  Resets on{" "}
                  <span className="text-white font-semibold">Jun 15, 2024</span>{" "}
                  (26 days left)
                </p>
              </div>
            </div>
          </div>

          {/* Usage by Feature */}
          <div className="ms-card rounded-2xl bg-white/3 overflow-hidden">
            <div className="border-b border-white/8 px-5 py-3">
              <h3 className="text-[14px] font-bold text-white">
                Usage by Feature
              </h3>
              <p className="text-[11px] text-gray-500">
                Breakdown of your usage across different features.
              </p>
            </div>
            <div
              className="grid border-b border-white/8 px-5 py-2 text-[10px] font-semibold text-gray-600"
              style={{ gridTemplateColumns: "1fr 80px 100px 1fr" }}
            >
              <span>Feature</span>
              <span>Used</span>
              <span>Limit</span>
              <span>Usage</span>
            </div>
            {features.map((f, i) => (
              <div
                key={i}
                className="ms-row grid items-center px-5 py-2.5"
                style={{ gridTemplateColumns: "1fr 80px 100px 1fr" }}
              >
                <div className="flex items-center gap-2">
                  <div
                    className="flex h-7 w-7 items-center justify-center rounded-lg text-sm"
                    style={{ background: `${f.color}20` }}
                  >
                    {f.icon}
                  </div>
                  <div>
                    <p className="text-[11px] font-semibold text-white">
                      {f.l}
                    </p>
                    <p className="text-[9px] text-gray-600">{f.sub}</p>
                  </div>
                </div>
                <span className="text-[11px] text-white">
                  {f.used.toLocaleString()}
                </span>
                <span className="text-[11px] text-gray-500">
                  {f.limit.toLocaleString()}
                </span>
                <div className="pr-4">
                  {f.pct > 0 ? (
                    <>
                      <div className="h-1.5 overflow-hidden rounded-full bg-white/10 mb-0.5">
                        <div
                          className="h-full rounded-full"
                          style={{ width: `${f.pct}%`, background: f.color }}
                        />
                      </div>
                      <span className="text-[10px] text-gray-500">
                        {f.pct}%
                      </span>
                    </>
                  ) : (
                    <span className="text-[11px] text-gray-600">—</span>
                  )}
                </div>
              </div>
            ))}
            <button className="flex w-full items-center justify-center gap-1 border-t border-white/8 py-3 text-[12px] font-semibold text-[#a78bfa] hover:text-[#c4b5fd]">
              View all limits →
            </button>
          </div>
        </div>

        {/* Right panel */}
        <div className="w-[200px] flex-shrink-0 flex flex-col gap-4">
          <div className="ms-card rounded-2xl bg-white/3 p-4">
            <p className="mb-3 text-[13px] font-bold text-white">
              Credits Usage
            </p>
            {/* Mini chart */}
            <svg viewBox="0 0 100 50" className="w-full mb-2">
              <defs>
                <linearGradient id="cg" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#7c5cfc" stopOpacity="0.3" />
                  <stop offset="100%" stopColor="#7c5cfc" stopOpacity="0" />
                </linearGradient>
              </defs>
              <polygon
                fill="url(#cg)"
                points="0,50 10,42 20,38 30,32 40,28 50,22 60,20 70,18 80,15 90,12 100,10 100,50"
              />
              <polyline
                fill="none"
                stroke="#7c5cfc"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
                points="0,42 10,38 20,34 30,28 40,24 50,20 60,18 70,15 80,12 90,10 100,8"
              />
            </svg>
            <div className="flex justify-between text-[9px] text-gray-600 mb-2">
              <span>May 15</span>
              <span>Jun 15</span>
            </div>
            <p className="text-right text-[11px] font-bold text-[#a78bfa]">
              12,450
            </p>
          </div>

          <div className="ms-card rounded-2xl bg-white/3 p-4">
            <p className="mb-3 text-[13px] font-bold text-white">
              Limits Summary
            </p>
            {limits.map((l, i) => (
              <div
                key={i}
                className="ms-row flex items-center justify-between py-2"
              >
                <div>
                  <p className="text-[10px] font-semibold text-white">{l.l}</p>
                  <p className="text-[9px] text-gray-600">{l.sub}</p>
                </div>
                <div className="flex items-center gap-1.5 shrink-0 ml-2">
                  <span className="text-[10px] font-bold text-white">
                    {l.v}
                  </span>
                  <button className="text-[10px] font-semibold text-[#a78bfa] hover:text-[#c4b5fd]">
                    Manage
                  </button>
                </div>
              </div>
            ))}
          </div>

          <div className="rounded-2xl border border-[#7c5cfc]/25 bg-[#7c5cfc]/08 p-4">
            <p className="mb-1 text-[12px] font-bold text-white">
              Stay in control
            </p>
            <p className="mb-3 text-[10px] text-gray-500">
              Set custom alerts to be notified when you're approaching your
              limits.
            </p>
            <button className="w-full rounded-xl bg-[#7c5cfc] py-2 text-[11px] font-bold text-white hover:bg-[#6b4ce0] transition-all">
              Manage Alerts
            </button>
          </div>
        </div>
      </div>
    </ModalShell>
  );
};

// ─── MANAGER ───────────────────────────────────────────────────────────────
export type ModalType = "profile" | "account" | "billing" | "usage" | null;

export const ProfileModalManager: React.FC<{
  modal: ModalType;
  onClose: () => void;
}> = ({ modal, onClose }) => {
  if (!modal) return null;
  if (modal === "profile") return <MyProfileModal onClose={onClose} />;
  if (modal === "account") return <AccountSettingsModal onClose={onClose} />;
  if (modal === "billing") return <BillingModal onClose={onClose} />;
  if (modal === "usage") return <UsageLimitsModal onClose={onClose} />;
  return null;
};
