"use client";

import { motion, AnimatePresence } from "framer-motion";
import { X, Check } from "lucide-react";

export type SortOption = {
  label: string;
  value: string;
};

const SORT_OPTIONS: SortOption[] = [
  { label: "Featured", value: "featured" },
  { label: "Newest First", value: "newest" },
  { label: "Price: Low to High", value: "price_asc" },
  { label: "Price: High to Low", value: "price_desc" },
  { label: "Best Selling", value: "best_selling" },
  { label: "Most Reviewed", value: "most_reviewed" },
  { label: "Top Rated", value: "top_rated" },
];

type Props = {
  isOpen: boolean;
  onClose: () => void;
  selected: string;
  onSelect: (value: string) => void;
};

export default function SortSheet({ isOpen, onClose, selected, onSelect }: Props) {
  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 z-40 bg-black/30 backdrop-blur-sm"
          />
          <motion.div
            initial={{ y: "100%" }}
            animate={{ y: 0 }}
            exit={{ y: "100%" }}
            transition={{ type: "spring", damping: 30, stiffness: 300 }}
            className="fixed bottom-0 left-0 right-0 z-50 bg-brand-surface rounded-t-3xl pb-safe"
          >
            {/* Handle */}
            <div className="flex justify-center pt-3 pb-2">
              <div className="w-10 h-1 bg-brand-border rounded-full" />
            </div>

            {/* Header */}
            <div className="flex items-center justify-between px-5 py-3 border-b border-brand-border">
              <h2 className="font-heading text-xl font-semibold">Sort By</h2>
              <button
                onClick={onClose}
                aria-label="Close sort"
                className="p-2 -mr-2 text-brand-text-muted hover:text-brand-text transition-colors min-h-0 min-w-0"
              >
                <X size={20} />
              </button>
            </div>

            {/* Options */}
            <div className="py-2 px-2">
              {SORT_OPTIONS.map((opt) => (
                <button
                  key={opt.value}
                  onClick={() => { onSelect(opt.value); onClose(); }}
                  className="w-full flex items-center justify-between px-4 py-4 rounded-2xl text-left hover:bg-brand-muted transition-colors min-h-0"
                >
                  <span
                    className={`text-sm font-body ${
                      selected === opt.value ? "font-semibold text-brand-primary" : "text-brand-text"
                    }`}
                  >
                    {opt.label}
                  </span>
                  {selected === opt.value && (
                    <Check size={16} className="text-brand-accent flex-shrink-0" />
                  )}
                </button>
              ))}
            </div>

            <div className="h-6" />
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
