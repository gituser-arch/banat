import { getProductBySlug } from "@/lib/db";
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import AnnouncementBar from "@/components/layout/AnnouncementBar";
import SiteHeader from "@/components/layout/SiteHeader";
import SiteFooter from "@/components/layout/SiteFooter";
import Newsletter from "@/components/shared/Newsletter";
import { brand } from "@/lib/tokens";
import { formatPrice, discountPercent } from "@/lib/utils";
import { Star, ShieldCheck, Truck, RefreshCw, Heart, ShoppingBag, ArrowLeft } from "lucide-react";

type Props = { params: Promise<{ slug: string }> };

export default async function ProductDetailPage({ params }: Props) {
  const { slug } = await params;
  const product = await getProductBySlug(slug);

  if (!product) {
    notFound();
  }

  const discount = discountPercent(product.originalPrice, product.price);

  return (
    <div className="min-h-screen bg-brand-surface">
      <AnnouncementBar />
      <SiteHeader />

      <div className="pt-20 pb-16 px-4 max-w-7xl mx-auto">
        {/* Breadcrumb */}
        <div className="mb-6">
          <Link
            href="/collections/churidar-suits"
            className="inline-flex items-center gap-1.5 text-xs font-body text-brand-text-muted hover:text-brand-text transition-colors"
          >
            <ArrowLeft size={14} /> Back to Churidar Suits
          </Link>
        </div>

        {/* Grid Layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
          {/* Left: Product Images */}
          <div className="space-y-4">
            <div className="relative aspect-[3/4] rounded-3xl overflow-hidden bg-brand-muted">
              <Image
                src={product.images[0] || "/product-teal.png"}
                alt={product.name}
                fill
                priority
                className="object-cover object-top"
                sizes="(max-width: 768px) 100vw, 50vw"
              />
              {discount > 0 && (
                <span className="absolute top-4 left-4 bg-red-500 text-white text-xs font-body font-semibold px-3 py-1 rounded-full">
                  -{discount}% OFF
                </span>
              )}
            </div>

            {/* Thumbnail row */}
            {product.images.length > 1 && (
              <div className="flex gap-3 overflow-x-auto pb-2">
                {product.images.map((img, i) => (
                  <div
                    key={i}
                    className="relative w-20 h-24 rounded-xl overflow-hidden bg-brand-muted flex-shrink-0 border-2 border-brand-primary"
                  >
                    <Image src={img} alt="" fill className="object-cover" />
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Right: Product Details & Actions */}
          <div className="space-y-6">
            <div>
              <p className="text-xs font-body font-semibold text-brand-accent uppercase tracking-widest mb-1">
                {brand.name}
              </p>
              <h1 className="font-heading text-3xl md:text-4xl font-semibold text-brand-text mb-2">
                {product.name}
              </h1>

              {/* Rating */}
              <div className="flex items-center gap-2">
                <div className="flex">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star
                      key={i}
                      size={14}
                      className={
                        i < Math.floor(product.rating)
                          ? "fill-brand-accent text-brand-accent"
                          : "text-brand-border fill-brand-border"
                      }
                    />
                  ))}
                </div>
                <span className="text-xs font-body font-medium text-brand-text">
                  {product.rating}
                </span>
                <span className="text-xs font-body text-brand-text-muted">
                  ({product.reviewCount} reviews)
                </span>
              </div>
            </div>

            {/* Pricing */}
            <div className="flex items-baseline gap-3">
              <span className="text-2xl font-body font-semibold text-brand-text">
                {formatPrice(product.price, product.currency)}
              </span>
              {product.originalPrice > product.price && (
                <span className="text-base font-body text-brand-text-muted line-through">
                  {formatPrice(product.originalPrice, product.currency)}
                </span>
              )}
              <span className="text-xs font-body text-brand-text-muted">(Incl. VAT)</span>
            </div>

            <p className="text-sm font-body text-brand-text-muted leading-relaxed">
              {product.description}
            </p>

            <hr className="border-brand-border" />

            {/* Colour Selector */}
            {product.colours.length > 0 && (
              <div>
                <label className="block text-xs font-body font-semibold text-brand-text uppercase tracking-wider mb-2">
                  Colour: <span className="font-normal text-brand-text-muted">{product.colours[0]?.name}</span>
                </label>
                <div className="flex gap-2.5">
                  {product.colours.map(({ name, hex }) => (
                    <button
                      key={name}
                      title={name}
                      className="w-8 h-8 rounded-full border-2 border-brand-primary p-0.5 min-h-0 min-w-0"
                    >
                      <div className="w-full h-full rounded-full" style={{ backgroundColor: hex }} />
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Size Selector */}
            {product.sizes.length > 0 && (
              <div>
                <div className="flex justify-between items-center mb-2">
                  <label className="text-xs font-body font-semibold text-brand-text uppercase tracking-wider">
                    Select Size
                  </label>
                  <button className="text-xs font-body text-brand-accent hover:underline">
                    Size Guide
                  </button>
                </div>
                <div className="flex flex-wrap gap-2">
                  {product.sizes.map((s) => (
                    <button
                      key={s}
                      className="w-12 h-11 border border-brand-border rounded-xl text-xs font-body font-semibold hover:border-brand-primary transition-colors min-h-0 min-w-0"
                    >
                      {s}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Action Buttons */}
            <div className="flex gap-3 pt-2">
              <button className="flex-1 py-4 bg-brand-primary text-white text-sm font-body font-semibold rounded-2xl hover:bg-brand-accent transition-colors flex items-center justify-center gap-2 min-h-0">
                <ShoppingBag size={18} />
                Add to Shopping Bag
              </button>
              <button
                aria-label="Add to Wishlist"
                className="p-4 border border-brand-border rounded-2xl hover:border-brand-primary transition-colors min-h-0 min-w-0"
              >
                <Heart size={20} strokeWidth={1.5} />
              </button>
            </div>

            {/* Trust Badges */}
            <div className="grid grid-cols-3 gap-2 pt-4 border-t border-brand-border text-center">
              <div className="p-3 bg-brand-muted rounded-2xl">
                <Truck size={18} className="mx-auto mb-1 text-brand-accent" />
                <p className="text-[11px] font-body font-semibold text-brand-text">Express Delivery</p>
                <p className="text-[10px] font-body text-brand-text-muted">Across UAE</p>
              </div>
              <div className="p-3 bg-brand-muted rounded-2xl">
                <ShieldCheck size={18} className="mx-auto mb-1 text-brand-accent" />
                <p className="text-[11px] font-body font-semibold text-brand-text">100% Authentic</p>
                <p className="text-[10px] font-body text-brand-text-muted">Pakistani Craft</p>
              </div>
              <div className="p-3 bg-brand-muted rounded-2xl">
                <RefreshCw size={18} className="mx-auto mb-1 text-brand-accent" />
                <p className="text-[11px] font-body font-semibold text-brand-text">7-Day Returns</p>
                <p className="text-[10px] font-body text-brand-text-muted">Easy & Free</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Newsletter />
      <SiteFooter />
    </div>
  );
}
