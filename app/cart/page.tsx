import Link from "next/link";
import AnnouncementBar from "@/components/layout/AnnouncementBar";
import SiteHeader from "@/components/layout/SiteHeader";
import SiteFooter from "@/components/layout/SiteFooter";
import { ShoppingBag, ArrowLeft } from "lucide-react";

export default function CartPage() {
  return (
    <div className="min-h-screen bg-brand-surface flex flex-col justify-between">
      <div>
        <AnnouncementBar />
        <SiteHeader />

        <div className="pt-24 pb-16 px-4 max-w-7xl mx-auto text-center">
          <div className="w-16 h-16 bg-brand-muted rounded-full flex items-center justify-center mx-auto mb-4">
            <ShoppingBag size={28} className="text-brand-text-muted" />
          </div>
          <h1 className="font-heading text-3xl font-semibold text-brand-text mb-2">
            Your Shopping Bag is Empty
          </h1>
          <p className="text-sm font-body text-brand-text-muted mb-6">
            Discover our latest Pakistani churidar collection and add items to your cart.
          </p>
          <Link
            href="/collections/churidar-suits"
            className="inline-flex items-center gap-2 px-6 py-3.5 bg-brand-primary text-white text-sm font-body font-semibold rounded-2xl hover:bg-brand-accent transition-colors"
          >
            <ArrowLeft size={16} /> Continue Shopping
          </Link>
        </div>
      </div>

      <SiteFooter />
    </div>
  );
}
