"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Trash2 } from "lucide-react";

type Props = { productId: string; productName: string };

export default function DeleteProductButton({ productId, productName }: Props) {
  const router = useRouter();
  const [confirming, setConfirming] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleDelete = async () => {
    setLoading(true);
    await fetch(`/api/products/${productId}`, { method: "DELETE" });
    setLoading(false);
    router.refresh();
  };

  if (confirming) {
    return (
      <div className="flex items-center gap-1">
        <button
          onClick={handleDelete}
          disabled={loading}
          className="text-xs font-body font-semibold px-2 py-1.5 bg-red-500 text-white rounded-lg hover:bg-red-600 disabled:opacity-50 min-h-0"
        >
          {loading ? "..." : "Yes"}
        </button>
        <button
          onClick={() => setConfirming(false)}
          className="text-xs font-body px-2 py-1.5 bg-brand-muted rounded-lg min-h-0"
        >
          No
        </button>
      </div>
    );
  }

  return (
    <button
      onClick={() => setConfirming(true)}
      title={`Delete ${productName}`}
      className="p-2 rounded-lg hover:bg-red-50 transition-colors text-brand-text-muted hover:text-red-500 min-h-0 min-w-0"
    >
      <Trash2 size={14} />
    </button>
  );
}
