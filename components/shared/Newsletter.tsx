"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Send, CheckCircle2 } from "lucide-react";
import { brand } from "@/lib/tokens";

export default function Newsletter() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setLoading(true);
    await new Promise((r) => setTimeout(r, 800)); // simulate
    setSubmitted(true);
    setLoading(false);
  };

  return (
    <section className="bg-brand-primary text-white px-5 py-14 md:py-20">
      <div className="max-w-lg mx-auto text-center">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <p className="text-xs font-body tracking-[0.2em] text-brand-accent uppercase mb-3">
            Exclusive Access
          </p>
          <h2 className="font-heading text-3xl md:text-4xl font-light mb-2">
            Join the {brand.name} Circle
          </h2>
          <p className="text-sm font-body text-white/60 mb-8 leading-relaxed">
            Be the first to know about new arrivals, exclusive offers, and styling inspiration delivered to your inbox.
          </p>

          {submitted ? (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="flex flex-col items-center gap-3"
            >
              <CheckCircle2 size={40} className="text-brand-accent" />
              <p className="font-body font-medium text-white/90">
                You&apos;re on the list! We&apos;ll be in touch soon.
              </p>
            </motion.div>
          ) : (
            <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-2.5">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                placeholder="your@email.com"
                className="flex-1 px-5 py-4 rounded-2xl bg-white/10 border border-white/20 text-white placeholder:text-white/40 text-sm font-body outline-none focus:border-brand-accent transition-colors"
              />
              <button
                type="submit"
                disabled={loading}
                className="flex items-center justify-center gap-2 px-6 py-4 bg-brand-accent text-white text-sm font-body font-semibold rounded-2xl hover:bg-white hover:text-brand-primary transition-all active:scale-95 disabled:opacity-60 flex-shrink-0 min-h-0"
              >
                {loading ? (
                  <span className="animate-pulse">...</span>
                ) : (
                  <>
                    <Send size={15} />
                    Subscribe
                  </>
                )}
              </button>
            </form>
          )}
        </motion.div>
      </div>
    </section>
  );
}
