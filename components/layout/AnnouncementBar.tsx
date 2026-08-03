"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, ChevronLeft, ChevronRight } from "lucide-react";

const MESSAGES = [
  "✨ Free Shipping on all orders above AED 150",
  "📦 Cash on Delivery available across UAE",
  "↩️ Easy 7-day hassle-free returns",
];

const DISMISSED_KEY = "bh_announcement_dismissed";

export default function AnnouncementBar() {
  const [visible, setVisible] = useState(false);
  const [msgIndex, setMsgIndex] = useState(0);

  useEffect(() => {
    const dismissed = sessionStorage.getItem(DISMISSED_KEY);
    if (!dismissed) setVisible(true);

    const interval = setInterval(() => {
      setMsgIndex((i) => (i + 1) % MESSAGES.length);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  const dismiss = () => {
    sessionStorage.setItem(DISMISSED_KEY, "1");
    setVisible(false);
  };

  const prev = () => setMsgIndex((i) => (i - 1 + MESSAGES.length) % MESSAGES.length);
  const next = () => setMsgIndex((i) => (i + 1) % MESSAGES.length);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ height: 0, opacity: 0 }}
          animate={{ height: "auto", opacity: 1 }}
          exit={{ height: 0, opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="bg-brand-primary text-white overflow-hidden"
        >
          <div className="flex items-center justify-between px-3 py-2 max-w-7xl mx-auto">
            <button
              onClick={prev}
              aria-label="Previous announcement"
              className="p-1 opacity-60 hover:opacity-100 transition-opacity min-h-0 min-w-0"
            >
              <ChevronLeft size={14} />
            </button>

            <AnimatePresence mode="wait">
              <motion.p
                key={msgIndex}
                initial={{ opacity: 0, y: 4 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -4 }}
                transition={{ duration: 0.2 }}
                className="text-xs font-body tracking-wide text-center flex-1 px-2"
              >
                {MESSAGES[msgIndex]}
              </motion.p>
            </AnimatePresence>

            <div className="flex items-center gap-1">
              <button
                onClick={next}
                aria-label="Next announcement"
                className="p-1 opacity-60 hover:opacity-100 transition-opacity min-h-0 min-w-0"
              >
                <ChevronRight size={14} />
              </button>
              <button
                onClick={dismiss}
                aria-label="Dismiss announcement"
                className="p-1 opacity-60 hover:opacity-100 transition-opacity min-h-0 min-w-0 ml-1"
              >
                <X size={14} />
              </button>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
