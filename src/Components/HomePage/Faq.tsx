import { useState, useRef, useEffect } from "react";

interface FAQItem {
  question: string;
  answer: string;
}

const faqs: FAQItem[] = [
  {
    question: "What is Operino?",
    answer:
      "Operino is an AI-powered customer engagement platform that lets you deploy intelligent agents across your channels — Instagram, WhatsApp, website chat, and more. It handles conversations, captures leads, and books appointments automatically, 24/7.",
  },
  {
    question: "Can I handoff conversations to humans?",
    answer:
      "Absolutely. You can set custom rules so that when a conversation reaches a certain complexity or a customer requests it, the AI hands off seamlessly to a live agent — with full context and history included.",
  },
  {
    question: "How does the AI agent work?",
    answer:
      "You train your AI agent by providing information about your business, products, FAQs, and tone of voice. The agent uses this knowledge to respond accurately to customer inquiries, guide users through flows, and escalate when needed.",
  },
  {
    question: "Is my data secure?",
    answer:
      "Yes. All data is encrypted at rest and in transit using AES-256 and TLS 1.3. We are GDPR-compliant and do not share your data with third parties. You can request data deletion at any time from your account settings.",
  },
  {
    question: "Which channels are supported?",
    answer:
      "Operino currently supports Instagram DMs, WhatsApp Business, Website Chat widget, and Facebook Messenger. Telegram and SMS integrations are coming soon and available in early access.",
  },
  {
    question: "Can I cancel anytime?",
    answer:
      "Yes, you can cancel your subscription at any time from your account dashboard — no questions asked, no cancellation fees. Your plan stays active until the end of the current billing period.",
  },
];

function FAQCard({ item, index }: { item: FAQItem; index: number }) {
  const [open, setOpen] = useState(false);
  const [visible, setVisible] = useState(false);
  const contentRef = useRef<HTMLDivElement>(null);
  const [height, setHeight] = useState(0);

  useEffect(() => {
    setTimeout(() => setVisible(true), 80 + index * 90);
  }, [index]);

  useEffect(() => {
    if (contentRef.current) {
      setHeight(open ? contentRef.current.scrollHeight : 0);
    }
  }, [open]);

  return (
    <div
      onClick={() => setOpen(!open)}
      style={{
        background: open
          ? "linear-gradient(145deg,#16143a,#0f0d28)"
          : "linear-gradient(145deg,#111126,#0c0c1e)",
        border: open
          ? "1px solid rgba(124,92,252,0.45)"
          : "1px solid rgba(255,255,255,0.08)",
        borderRadius: 12,
        padding: "0",
        cursor: "pointer",
        transform: visible ? "translateY(0)" : "translateY(20px)",
        opacity: visible ? 1 : 0,
        transition:
          "transform 0.5s cubic-bezier(.4,0,.2,1), opacity 0.5s ease, border-color 0.3s ease, background 0.3s ease, box-shadow 0.3s ease",
        boxShadow: open
          ? "0 8px 32px rgba(124,92,252,0.2)"
          : "0 2px 12px rgba(0,0,0,0.25)",
        overflow: "hidden",
        position: "relative",
      }}
    >
      {/* glow when open */}
      {open && (
        <div
          style={{
            position: "absolute",
            top: -30,
            right: -30,
            width: 100,
            height: 100,
            background:
              "radial-gradient(circle, rgba(124,92,252,0.18) 0%, transparent 70%)",
            pointerEvents: "none",
          }}
        />
      )}

      {/* Question row */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "16px 18px",
          gap: 16,
        }}
      >
        <span
          style={{
            fontSize: 13.5,
            fontWeight: open ? 600 : 500,
            color: open ? "white" : "rgba(255,255,255,0.75)",
            lineHeight: 1.4,
            transition: "color 0.25s",
          }}
        >
          {item.question}
        </span>

        {/* Icon */}
        <div
          style={{
            width: 28,
            height: 28,
            borderRadius: 8,
            flexShrink: 0,
            background: open
              ? "rgba(124,92,252,0.2)"
              : "rgba(255,255,255,0.05)",
            border: open
              ? "1px solid rgba(124,92,252,0.4)"
              : "1px solid rgba(255,255,255,0.1)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            transition: "all 0.3s ease",
          }}
        >
          <svg
            width="13"
            height="13"
            viewBox="0 0 24 24"
            fill="none"
            stroke={open ? "#a78bfa" : "rgba(255,255,255,0.4)"}
            strokeWidth="2.5"
            strokeLinecap="round"
            style={{
              transform: open ? "rotate(45deg)" : "rotate(0deg)",
              transition:
                "transform 0.35s cubic-bezier(.4,0,.2,1), stroke 0.25s",
            }}
          >
            <line x1="12" y1="5" x2="12" y2="19" />
            <line x1="5" y1="12" x2="19" y2="12" />
          </svg>
        </div>
      </div>

      {/* Answer */}
      <div
        style={{
          height,
          overflow: "hidden",
          transition: "height 0.4s cubic-bezier(.4,0,.2,1)",
        }}
      >
        <div ref={contentRef}>
          <div style={{ padding: "0 18px 18px", paddingTop: 2 }}>
            <div
              style={{
                width: "100%",
                height: 1,
                background: "rgba(124,92,252,0.15)",
                marginBottom: 14,
              }}
            />
            <p
              style={{
                margin: 0,
                fontSize: 12.5,
                color: "rgba(255,255,255,0.5)",
                lineHeight: 1.75,
              }}
            >
              {item.answer}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function FAQ() {
  const [titleVisible, setTitleVisible] = useState(false);
  useEffect(() => {
    setTimeout(() => setTitleVisible(true), 50);
  }, []);

  const left = faqs.filter((_, i) => i % 2 === 0);
  const right = faqs.filter((_, i) => i % 2 !== 0);

  return (
    <div
      style={{
        width: "100%",
        minHeight: "50vh",
        background: "#09091a",
        padding: "0px 24px",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: 48,
        fontFamily: "'Inter', sans-serif",
      }}
    >
      <style>{`
        * { box-sizing: border-box; }
      `}</style>

      {/* Title */}
      <div
        style={{
          textAlign: "center",
          transform: titleVisible ? "translateY(0)" : "translateY(16px)",
          opacity: titleVisible ? 1 : 0,
          transition: "all 0.6s ease",
        }}
      >
        <h2
          style={{
            margin: 0,
            fontSize: 28,
            fontWeight: 800,
            color: "white",
            letterSpacing: "-0.4px",
          }}
        >
          Frequently asked questions
        </h2>
      </div>

      {/* Grid */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: 14,
          maxWidth: 900,
          width: "100%",
        }}
      >
        {/* Left col */}
        <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
          {left.map((item) => (
            <FAQCard
              key={item.question}
              item={item}
              index={faqs.indexOf(item)}
            />
          ))}
        </div>
        {/* Right col */}
        <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
          {right.map((item) => (
            <FAQCard
              key={item.question}
              item={item}
              index={faqs.indexOf(item)}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
