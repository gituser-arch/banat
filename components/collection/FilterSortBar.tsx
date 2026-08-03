"use client";

import { motion } from "framer-motion";
import { SlidersHorizontal, ArrowUpDown } from "lucide-react";

type Props = {
  onFilterClick: () => void;
  onSortClick: () => void;
  activeFilterCount: number;
  sortLabel: string;
};

export default function FilterSortBar({
  onFilterClick,
  onSortClick,
  activeFilterCount,
  sortLabel,
}: Props) {
  return (
    <motion.div
      initial={{ opacity: 0, y: -8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: 0.1 }}
      className="sticky top-14 z-30 bg-brand-surface/95 backdrop-blur-md border-b border-brand-border"
    >
      <div className="max-w-7xl mx-auto px-4 py-2.5 flex gap-2">
        {/* Filter Button */}
        <button
          onClick={onFilterClick}
          className="flex-1 flex items-center justify-center gap-2 py-3 border border-brand-border rounded-2xl text-sm font-body font-medium hover:border-brand-primary hover:bg-brand-muted transition-all active:scale-95 relative"
        >
          <SlidersHorizontal size={16} strokeWidth={1.5} />
          <span>Filter</span>
          {activeFilterCount > 0 && (
            <span className="absolute top-1.5 right-2.5 bg-brand-accent text-white text-[9px] font-bold w-4 h-4 rounded-full flex items-center justify-center">
              {activeFilterCount}
            </span>
          )}
        </button>

        {/* Sort Button */}
        <button
          onClick={onSortClick}
          className="flex-1 flex items-center justify-center gap-2 py-3 border border-brand-border rounded-2xl text-sm font-body font-medium hover:border-brand-primary hover:bg-brand-muted transition-all active:scale-95"
        >
          <ArrowUpDown size={16} strokeWidth={1.5} />
          <span className="truncate max-w-24">{sortLabel}</span>
        </button>
      </div>
    </motion.div>
  );
}
