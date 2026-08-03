import { getProducts } from "@/lib/db";
import { getOrders } from "@/lib/db";
import { formatPrice } from "@/lib/utils";
import Link from "next/link";
import { Package, ShoppingCart, TrendingUp, DollarSign, ChevronRight } from "lucide-react";

const STATUS_COLORS: Record<string, string> = {
  pending: "bg-yellow-100 text-yellow-700",
  confirmed: "bg-blue-100 text-blue-700",
  processing: "bg-purple-100 text-purple-700",
  shipped: "bg-cyan-100 text-cyan-700",
  delivered: "bg-green-100 text-green-700",
  cancelled: "bg-red-100 text-red-700",
  refunded: "bg-gray-100 text-gray-700",
};

function StatCard({
  title,
  value,
  sub,
  icon: Icon,
  accent = false,
}: {
  title: string;
  value: string;
  sub: string;
  icon: React.ElementType;
  accent?: boolean;
}) {
  return (
    <div className={`rounded-2xl p-5 ${accent ? "bg-brand-primary text-white" : "bg-white border border-brand-border"}`}>
      <div className="flex items-start justify-between mb-4">
        <p className={`text-xs font-body font-medium uppercase tracking-wider ${accent ? "text-white/60" : "text-brand-text-muted"}`}>
          {title}
        </p>
        <div className={`p-2 rounded-xl ${accent ? "bg-white/10" : "bg-brand-muted"}`}>
          <Icon size={16} className={accent ? "text-brand-accent" : "text-brand-text-muted"} strokeWidth={1.5} />
        </div>
      </div>
      <p className={`font-heading text-3xl font-semibold mb-1 ${accent ? "text-white" : "text-brand-text"}`}>
        {value}
      </p>
      <p className={`text-xs font-body ${accent ? "text-white/50" : "text-brand-text-muted"}`}>{sub}</p>
    </div>
  );
}

export default async function AdminDashboardPage() {
  const [products, orders] = await Promise.all([getProducts(), getOrders()]);

  const totalRevenue = orders
    .filter((o) => o.status !== "cancelled" && o.status !== "refunded")
    .reduce((sum, o) => sum + o.total, 0);

  const pendingOrders = orders.filter((o) => o.status === "pending").length;
  const inStockProducts = products.filter((p) => p.inStock).length;
  const recentOrders = orders.slice(0, 5);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-heading text-3xl font-semibold text-brand-text">Dashboard</h1>
        <p className="text-sm font-body text-brand-text-muted mt-1">
          Welcome back — here&apos;s what&apos;s happening today.
        </p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 md:gap-4">
        <StatCard
          title="Total Revenue"
          value={formatPrice(totalRevenue)}
          sub={`${orders.length} total orders`}
          icon={DollarSign}
          accent
        />
        <StatCard
          title="Pending Orders"
          value={String(pendingOrders)}
          sub="Awaiting confirmation"
          icon={ShoppingCart}
        />
        <StatCard
          title="Products"
          value={String(products.length)}
          sub={`${inStockProducts} in stock`}
          icon={Package}
        />
        <StatCard
          title="Avg. Order Value"
          value={orders.length ? formatPrice(Math.round(totalRevenue / orders.length)) : "AED 0"}
          sub="Per successful order"
          icon={TrendingUp}
        />
      </div>

      {/* Recent Orders */}
      <div className="bg-white border border-brand-border rounded-2xl overflow-hidden">
        <div className="flex items-center justify-between px-5 py-4 border-b border-brand-border">
          <h2 className="font-body font-semibold text-brand-text">Recent Orders</h2>
          <Link
            href="/admin/orders"
            className="text-xs font-body text-brand-accent hover:underline flex items-center gap-1 min-h-0"
          >
            View all <ChevronRight size={12} />
          </Link>
        </div>
        <div className="divide-y divide-brand-border">
          {recentOrders.map((order) => (
            <Link
              key={order.id}
              href={`/admin/orders/${order.id}`}
              className="flex items-center justify-between px-5 py-4 hover:bg-brand-muted/50 transition-colors group"
            >
              <div className="min-w-0">
                <p className="text-sm font-body font-medium text-brand-text">
                  {order.orderNumber}
                </p>
                <p className="text-xs font-body text-brand-text-muted mt-0.5 truncate">
                  {order.customer.fullName} · {order.items.length} item{order.items.length > 1 ? "s" : ""}
                </p>
              </div>
              <div className="flex items-center gap-3 flex-shrink-0 ml-3">
                <span
                  className={`text-xs font-body font-medium px-2 py-0.5 rounded-full capitalize ${STATUS_COLORS[order.status]}`}
                >
                  {order.status}
                </span>
                <span className="text-sm font-body font-semibold text-brand-text">
                  {formatPrice(order.total, order.currency)}
                </span>
                <ChevronRight
                  size={14}
                  className="text-brand-text-muted opacity-0 group-hover:opacity-100 transition-opacity"
                />
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
