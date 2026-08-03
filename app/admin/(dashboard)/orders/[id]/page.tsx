import { getOrderById } from "@/lib/db";
import { notFound } from "next/navigation";
import { formatPrice } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, User, MapPin, Phone, Mail } from "lucide-react";
import OrderStatusUpdater from "./OrderStatusUpdater";

type Params = { params: Promise<{ id: string }> };

export default async function OrderDetailPage({ params }: Params) {
  const { id } = await params;
  const order = await getOrderById(id);

  if (!order) {
    notFound();
  }

  return (
    <div className="space-y-6 max-w-4xl">
      {/* Top Header */}
      <div>
        <Link
          href="/admin/orders"
          className="inline-flex items-center gap-1.5 text-xs font-body text-brand-text-muted hover:text-brand-text mb-3"
        >
          <ArrowLeft size={14} /> Back to orders
        </Link>
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <h1 className="font-heading text-3xl font-semibold text-brand-text">
              Order {order.orderNumber}
            </h1>
            <p className="text-xs font-body text-brand-text-muted mt-1">
              Placed on {new Date(order.createdAt).toLocaleString("en-AE", { dateStyle: "long", timeStyle: "short" })}
            </p>
          </div>
          <OrderStatusUpdater orderId={order.id} currentStatus={order.status} />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        {/* Order Items (2 cols) */}
        <div className="md:col-span-2 space-y-4">
          <div className="bg-white border border-brand-border rounded-2xl p-5">
            <h2 className="font-body font-semibold text-brand-text mb-4 text-sm">Order Items</h2>
            <div className="divide-y divide-brand-border">
              {order.items.map((item, idx) => (
                <div key={idx} className="py-3.5 flex items-center gap-4 first:pt-0 last:pb-0">
                  <div className="relative w-14 h-16 rounded-xl bg-brand-muted overflow-hidden flex-shrink-0">
                    <Image
                      src={item.productImage || "/product-teal.png"}
                      alt={item.productName}
                      fill
                      className="object-cover object-top"
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-body font-medium text-brand-text line-clamp-1">
                      {item.productName}
                    </p>
                    <p className="text-xs font-body text-brand-text-muted mt-0.5">
                      Colour: {item.colour} | Size: {item.size}
                    </p>
                    <p className="text-xs font-body text-brand-text-muted mt-0.5">
                      Qty: {item.quantity} × {formatPrice(item.price, item.currency)}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-body font-semibold text-brand-text">
                      {formatPrice(item.price * item.quantity, item.currency)}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            {/* Summary */}
            <div className="border-t border-brand-border mt-5 pt-4 space-y-2 text-sm font-body">
              <div className="flex justify-between text-brand-text-muted">
                <span>Subtotal</span>
                <span>{formatPrice(order.subtotal, order.currency)}</span>
              </div>
              <div className="flex justify-between text-brand-text-muted">
                <span>Shipping</span>
                <span>{order.shippingCost === 0 ? "Free" : formatPrice(order.shippingCost, order.currency)}</span>
              </div>
              {order.discount > 0 && (
                <div className="flex justify-between text-emerald-600">
                  <span>Discount</span>
                  <span>-{formatPrice(order.discount, order.currency)}</span>
                </div>
              )}
              <div className="flex justify-between font-semibold text-brand-text text-base pt-2 border-t border-brand-border">
                <span>Total</span>
                <span>{formatPrice(order.total, order.currency)}</span>
              </div>
            </div>
          </div>

          {order.notes && (
            <div className="bg-amber-50 border border-amber-200 rounded-2xl p-4 text-xs font-body text-amber-900">
              <span className="font-semibold block mb-1">Customer Note:</span>
              {order.notes}
            </div>
          )}
        </div>

        {/* Customer & Shipping Details (1 col) */}
        <div className="space-y-4">
          <div className="bg-white border border-brand-border rounded-2xl p-5 space-y-4">
            <h2 className="font-body font-semibold text-brand-text text-sm">Customer Info</h2>

            <div className="flex items-start gap-3">
              <User size={16} className="text-brand-text-muted mt-0.5 flex-shrink-0" />
              <div>
                <p className="text-sm font-body font-medium text-brand-text">
                  {order.customer.fullName}
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <Phone size={16} className="text-brand-text-muted mt-0.5 flex-shrink-0" />
              <div>
                <p className="text-sm font-body text-brand-text">{order.customer.phone}</p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <Mail size={16} className="text-brand-text-muted mt-0.5 flex-shrink-0" />
              <div>
                <p className="text-sm font-body text-brand-text">{order.customer.email}</p>
              </div>
            </div>

            <hr className="border-brand-border" />

            <h2 className="font-body font-semibold text-brand-text text-sm">Shipping Address</h2>
            <div className="flex items-start gap-3">
              <MapPin size={16} className="text-brand-text-muted mt-0.5 flex-shrink-0" />
              <div className="text-sm font-body text-brand-text space-y-0.5">
                <p>{order.customer.addressLine1}</p>
                {order.customer.addressLine2 && <p>{order.customer.addressLine2}</p>}
                <p>{order.customer.city}, {order.customer.emirate}</p>
                <p>{order.customer.country}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
