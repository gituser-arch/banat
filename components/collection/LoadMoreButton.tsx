"use client";

import { motion } from "framer-motion";
import { Loader2 } from "lucide-react";

type Props = {
  onLoadMore: () => void;
  loading: boolean;
  hasMore: boolean;
  loaded: number;
  total: number;
};

export default function LoadMoreButton({ onLoadMore, loading, hasMore, loaded, total }: Props) {
  if (!hasMore) {
    return (
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="text-center text-sm font-body text-brand-text-muted py-8"
      >
        You&apos;ve seen all {total} products
      </motion.p>
    );
  }

  return (
    <div className="flex flex-col items-center gap-3 py-4">
      <p className="text-xs font-body text-brand-text-muted">
        Showing {loaded} of {total} products
      </p>
      <button
        onClick={onLoadMore}
        disabled={loading}
        className="w-full max-w-sm py-4 border border-brand-primary text-brand-primary text-sm font-body font-semibold rounded-2xl hover:bg-brand-primary hover:text-white transition-all active:scale-95 disabled:opacity-50 flex items-center justify-center gap-2 min-h-0"
      >
        {loading ? (
          <>
            <Loader2 size={16} className="animate-spin" />
            Loading...
          </>
        ) : (
          "Load More"
        )}
      </button>
    </div>
  );
}
