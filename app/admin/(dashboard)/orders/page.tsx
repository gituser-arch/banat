import Link from "next/link";
import { getOrders } from "@/lib/db";
import { formatPrice } from "@/lib/utils";
import { ChevronRight, ShoppingCart } from "lucide-react";
import OrderStatusBadge from "./OrderStatusBadge";

export default async function AdminOrdersPage() {
  const orders = await getOrders();

  return (
    <div className="space-y-5">
      {/* Header */}
      <div className="flex items-center justify-between gap-3">
        <div>
          <h1 className="font-heading text-3xl font-semibold text-brand-text">Orders</h1>
          <p className="text-sm font-body text-brand-text-muted mt-1">{orders.length} total orders</p>
        </div>
      </div>

      {/* Orders List */}
      <div className="bg-white border border-brand-border rounded-2xl overflow-hidden">
        {orders.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-20 text-center px-5">
            <ShoppingCart size={40} className="text-brand-border mb-4" />
            <p className="font-body font-medium text-brand-text-muted">No orders found</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full min-w-[640px]">
              <thead>
                <tr className="border-b border-brand-border text-left">
                  {["Order #", "Customer", "Items", "Payment", "Status", "Total", ""].map((h) => (
                    <th
                      key={h}
                      className="px-5 py-3 text-xs font-body font-semibold text-brand-text-muted uppercase tracking-wider"
                    >
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-brand-border">
                {orders.map((order) => (
                  <tr key={order.id} className="hover:bg-brand-muted/40 transition-colors group">
                    <td className="px-5 py-4 font-body font-semibold text-sm text-brand-text">
                      <Link href={`/admin/orders/${order.id}`} className="hover:underline">
                        {order.orderNumber}
                      </Link>
                      <p className="text-[11px] font-normal text-brand-text-muted">
                        {new Date(order.createdAt).toLocaleDateString("en-AE", {
                          day: "numeric",
                          month: "short",
                          year: "numeric",
                        })}
                      </p>
                    </td>
                    <td className="px-5 py-4">
                      <p className="text-sm font-body font-medium text-brand-text">
                        {order.customer.fullName}
                      </p>
                      <p className="text-xs font-body text-brand-text-muted">{order.customer.city}, {order.customer.emirate}</p>
                    </td>
                    <td className="px-5 py-4 text-sm font-body text-brand-text-muted">
                      {order.items.length} item{order.items.length > 1 ? "s" : ""}
                    </td>
                    <td className="px-5 py-4 text-xs font-body uppercase font-semibold text-brand-text-muted">
                      {order.paymentMethod}
                    </td>
                    <td className="px-5 py-4">
                      <OrderStatusBadge status={order.status} />
                    </td>
                    <td className="px-5 py-4 text-sm font-body font-semibold text-brand-text">
                      {formatPrice(order.total, order.currency)}
                    </td>
                    <td className="px-5 py-4 text-right">
                      <Link
                        href={`/admin/orders/${order.id}`}
                        className="inline-flex p-2 rounded-lg hover:bg-brand-muted transition-colors text-brand-text-muted hover:text-brand-text min-h-0 min-w-0"
                      >
                        <ChevronRight size={16} />
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
