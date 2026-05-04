import { useState } from "react";
import { Mail, Send, CheckCircle2 } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

// NOTE: Replace with your real endpoint (e.g., Next.js /api/contact or a server URL)
const ENDPOINT = "/api/contact";

function FloatingInput({
  label,
  type = "text",
  name,
}: {
  label: string;
  type?: string;
  name: string;
}) {
  return (
    <div className="relative">
      <input
        name={name}
        type={type}
        required
        className="peer w-full px-4 pt-6 pb-2 rounded-lg bg-[#0f172a] border border-white/10 focus:border-purple-500 outline-none placeholder-transparent"
        placeholder={label}
      />
      <label className="absolute left-4 top-2 text-xs text-gray-400 transition-all peer-placeholder-shown:top-3.5 peer-placeholder-shown:text-sm peer-placeholder-shown:text-gray-500 peer-focus:top-2 peer-focus:text-xs peer-focus:text-purple-400">
        {label}
      </label>
    </div>
  );
}

function FloatingTextarea({ label, name }: { label: string; name: string }) {
  return (
    <div className="relative">
      <textarea
        name={name}
        required
        rows={4}
        className="peer w-full px-4 pt-6 pb-2 rounded-lg bg-[#0f172a] border border-white/10 focus:border-purple-500 outline-none placeholder-transparent"
        placeholder={label}
      />
      <label className="absolute left-4 top-2 text-xs text-gray-400 transition-all peer-placeholder-shown:top-3.5 peer-placeholder-shown:text-sm peer-placeholder-shown:text-gray-500 peer-focus:top-2 peer-focus:text-xs peer-focus:text-purple-400">
        {label}
      </label>
    </div>
  );
}

export default function ContactSection() {
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [spot, setSpot] = useState({ x: 0, y: 0 });

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    setSuccess(false);

    const form = e.currentTarget;
    const data = Object.fromEntries(new FormData(form).entries());

    try {
      const res = await fetch(ENDPOINT, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (!res.ok) throw new Error("Request failed");

      form.reset();
      setSuccess(true);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  }

  return (
    <section
      onMouseMove={(e) => {
        const rect = (e.currentTarget as HTMLElement).getBoundingClientRect();
        setSpot({ x: e.clientX - rect.left, y: e.clientY - rect.top });
      }}
      className="relative h-screen w-full bg-[#020617] text-white overflow-hidden flex items-center"
    >
      {/* Spotlight (mouse follow) */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background: `radial-gradient(400px at ${spot.x}px ${spot.y}px, rgba(124,58,237,0.25), transparent 60%)`,
        }}
      />

      {/* ambient gradient */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_30%,rgba(124,58,237,0.15),transparent_40%),radial-gradient(circle_at_70%_70%,rgba(59,130,246,0.15),transparent_40%)]" />

      <div className="relative max-w-5xl mx-auto px-6 w-full grid md:grid-cols-2 gap-12 items-center">
        {/* left */}
        <motion.div
          initial={{ opacity: 0, x: -40 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
        >
          <p className="text-purple-400 mb-4">Contact</p>
          <h2 className="text-3xl md:text-5xl font-bold mb-6 leading-tight">
            Let’s build something <br /> great together.
          </h2>
          <p className="text-gray-400 mb-8">
            Send a message and we’ll get back to you.
          </p>
          <div className="flex items-center gap-3 text-gray-300">
            <Mail className="w-5 h-5 text-purple-400" />
            <span>hello@operino.com</span>
          </div>
        </motion.div>

        {/* form */}
        <motion.form
          onSubmit={onSubmit}
          initial={{ opacity: 0, x: 40 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          className="relative p-6 rounded-2xl bg-white/5 backdrop-blur border border-white/10"
        >
          <div className="space-y-4">
            <FloatingInput name="name" label="Your name" />
            <FloatingInput name="email" type="email" label="Your email" />
            <FloatingTextarea name="message" label="Your message" />

            <button
              disabled={loading}
              className="w-full flex items-center justify-center gap-2 py-3 rounded-lg bg-gradient-to-r from-purple-600 to-blue-500 hover:opacity-90 transition"
            >
              {loading ? (
                "Sending..."
              ) : (
                <>
                  <Send className="w-4 h-4" /> Send Message
                </>
              )}
            </button>
          </div>

          {/* success animation */}
          <AnimatePresence>
            {success && (
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
                className="absolute inset-0 flex flex-col items-center justify-center bg-[#020617]/90 rounded-2xl"
              >
                <CheckCircle2 className="w-12 h-12 text-green-400 mb-4" />
                <p className="text-lg">Message Sent!</p>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.form>
      </div>
    </section>
  );
}

/*
Backend Example (Next.js API Route):

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).end();

  const { name, email, message } = req.body;

  // Example using Resend / Nodemailer / any email service
  // await sendEmail({ name, email, message });

  return res.status(200).json({ success: true });
}
*/
