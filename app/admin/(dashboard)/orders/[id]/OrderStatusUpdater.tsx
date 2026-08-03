"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import type { OrderStatus } from "@/types/order";
import { Loader2 } from "lucide-react";

type Props = {
  orderId: string;
  currentStatus: OrderStatus;
};

const ALL_STATUSES: OrderStatus[] = [
  "pending",
  "confirmed",
  "processing",
  "shipped",
  "delivered",
  "cancelled",
  "refunded",
];

export default function OrderStatusUpdater({ orderId, currentStatus }: Props) {
  const router = useRouter();
  const [status, setStatus] = useState<OrderStatus>(currentStatus);
  const [loading, setLoading] = useState(false);

  const handleChange = async (newStatus: OrderStatus) => {
    setStatus(newStatus);
    setLoading(true);

    await fetch(`/api/orders/${orderId}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ status: newStatus }),
    });

    setLoading(false);
    router.refresh();
  };

  return (
    <div className="flex items-center gap-2">
      <span className="text-xs font-body text-brand-text-muted">Status:</span>
      <div className="relative">
        <select
          value={status}
          onChange={(e) => handleChange(e.target.value as OrderStatus)}
          disabled={loading}
          className="px-3 py-2 bg-white border border-brand-border rounded-xl text-xs font-body font-semibold capitalize outline-none focus:border-brand-accent transition-colors disabled:opacity-50"
        >
          {ALL_STATUSES.map((st) => (
            <option key={st} value={st}>
              {st}
            </option>
          ))}
        </select>
        {loading && (
          <Loader2 size={12} className="animate-spin absolute right-2 top-1/2 -translate-y-1/2 text-brand-text-muted" />
        )}
      </div>
    </div>
  );
}
