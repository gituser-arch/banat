"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Search, TrendingUp, Clock } from "lucide-react";

const POPULAR = [
  "Embroidered Suits",
  "Eid Collection",
  "Bridal Sets",
  "Cotton Churidars",
  "Party Wear",
  "Georgette",
];

type Props = {
  isOpen: boolean;
  onClose: () => void;
};

export default function SearchOverlay({ isOpen, onClose }: Props) {
  const [query, setQuery] = useState("");
  const [recent] = useState<string[]>(["Navy Churidar", "Mirror Work"]);

  const filtered = POPULAR.filter((p) =>
    query ? p.toLowerCase().includes(query.toLowerCase()) : true
  );

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          className="fixed inset-0 z-50 bg-brand-surface flex flex-col"
        >
          {/* Header */}
          <div className="flex items-center gap-3 px-4 py-3 border-b border-brand-border">
            <Search size={18} className="text-brand-text-muted flex-shrink-0" />
            <input
              autoFocus
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search churidars, fabrics, occasions..."
              className="flex-1 bg-transparent text-brand-text text-sm outline-none placeholder:text-brand-text-muted font-body"
            />
            <button
              onClick={() => { setQuery(""); onClose(); }}
              aria-label="Close search"
              className="p-1.5 text-brand-text-muted hover:text-brand-text transition-colors min-h-0 min-w-0"
            >
              <X size={20} />
            </button>
          </div>

          {/* Content */}
          <div className="flex-1 overflow-y-auto px-4 py-5 space-y-6">
            {/* Recent */}
            {!query && recent.length > 0 && (
              <div>
                <div className="flex items-center gap-2 mb-3">
                  <Clock size={14} className="text-brand-text-muted" />
                  <span className="text-xs font-body font-medium text-brand-text-muted uppercase tracking-wider">
                    Recent
                  </span>
                </div>
                <div className="flex flex-wrap gap-2">
                  {recent.map((r) => (
                    <button
                      key={r}
                      onClick={() => setQuery(r)}
                      className="px-3 py-1.5 text-sm font-body bg-brand-muted rounded-full text-brand-text hover:bg-brand-border transition-colors min-h-0"
                    >
                      {r}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Popular / Results */}
            <div>
              <div className="flex items-center gap-2 mb-3">
                <TrendingUp size={14} className="text-brand-accent" />
                <span className="text-xs font-body font-medium text-brand-text-muted uppercase tracking-wider">
                  {query ? "Results" : "Popular Searches"}
                </span>
              </div>
              <div className="flex flex-wrap gap-2">
                {filtered.map((item) => (
                  <button
                    key={item}
                    onClick={() => setQuery(item)}
                    className="px-3 py-1.5 text-sm font-body border border-brand-border rounded-full text-brand-text hover:border-brand-accent hover:text-brand-accent transition-colors min-h-0"
                  >
                    {item}
                  </button>
                ))}
                {filtered.length === 0 && query && (
                  <p className="text-sm text-brand-text-muted font-body">
                    No results for &ldquo;{query}&rdquo;
                  </p>
                )}
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
