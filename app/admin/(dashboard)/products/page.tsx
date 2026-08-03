import Link from "next/link";
import Image from "next/image";
import { getProducts } from "@/lib/db";
import { formatPrice } from "@/lib/utils";
import { Plus, Edit2, Trash2, Package } from "lucide-react";
import DeleteProductButton from "./DeleteProductButton";

export default async function AdminProductsPage() {
  const products = await getProducts();

  return (
    <div className="space-y-5">
      {/* Header */}
      <div className="flex items-center justify-between gap-3">
        <div>
          <h1 className="font-heading text-3xl font-semibold text-brand-text">Products</h1>
          <p className="text-sm font-body text-brand-text-muted mt-1">{products.length} total products</p>
        </div>
        <Link
          href="/admin/products/new"
          className="flex items-center gap-2 px-5 py-3 bg-gradient-to-r from-amber-600 via-brand-accent to-amber-600 text-white text-sm font-body font-bold rounded-xl shadow-lg shadow-amber-500/25 hover:shadow-amber-500/40 hover:scale-[1.02] active:scale-95 transition-all min-h-0 ring-2 ring-amber-400/50"
        >
          <Plus size={18} strokeWidth={2.5} />
          <span>+ Add Product</span>
        </Link>
      </div>

      {/* Table */}
      <div className="bg-white border border-brand-border rounded-2xl overflow-hidden">
        {products.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-20 text-center px-5">
            <Package size={40} className="text-brand-border mb-4" />
            <p className="font-body font-medium text-brand-text-muted">No products yet</p>
            <Link
              href="/admin/products/new"
              className="mt-4 text-sm font-body text-brand-accent hover:underline"
            >
              Add your first product →
            </Link>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full min-w-[640px]">
              <thead>
                <tr className="border-b border-brand-border">
                  {["Product", "Category", "Price", "Stock", "Status", ""].map((h) => (
                    <th
                      key={h}
                      className="text-left px-5 py-3 text-xs font-body font-semibold text-brand-text-muted uppercase tracking-wider"
                    >
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-brand-border">
                {products.map((product) => (
                  <tr key={product.id} className="hover:bg-brand-muted/40 transition-colors group">
                    {/* Product */}
                    <td className="px-5 py-4">
                      <div className="flex items-center gap-3">
                        <div className="relative w-12 h-14 rounded-xl overflow-hidden bg-brand-muted flex-shrink-0">
                          {product.images[0] && (
                            <Image
                              src={product.images[0]}
                              alt={product.name}
                              fill
                              className="object-cover"
                              sizes="48px"
                            />
                          )}
                        </div>
                        <div className="min-w-0">
                          <p className="text-sm font-body font-medium text-brand-text line-clamp-1">
                            {product.name}
                          </p>
                          <p className="text-xs font-body text-brand-text-muted mt-0.5">
                            {product.fabric}
                          </p>
                        </div>
                      </div>
                    </td>
                    {/* Category */}
                    <td className="px-5 py-4">
                      <span className="text-sm font-body text-brand-text-muted">{product.category}</span>
                    </td>
                    {/* Price */}
                    <td className="px-5 py-4">
                      <div>
                        <p className="text-sm font-body font-semibold text-brand-text">
                          {formatPrice(product.price, product.currency)}
                        </p>
                        {product.originalPrice > product.price && (
                          <p className="text-xs font-body text-brand-text-muted line-through">
                            {formatPrice(product.originalPrice, product.currency)}
                          </p>
                        )}
                      </div>
                    </td>
                    {/* Stock */}
                    <td className="px-5 py-4">
                      <span
                        className={`text-xs font-body font-medium px-2 py-0.5 rounded-full ${
                          product.inStock
                            ? "bg-green-100 text-green-700"
                            : "bg-red-100 text-red-700"
                        }`}
                      >
                        {product.inStock ? `${product.stockCount} in stock` : "Out of stock"}
                      </span>
                    </td>
                    {/* Status */}
                    <td className="px-5 py-4">
                      <div className="flex gap-1.5">
                        {product.isNew && (
                          <span className="text-[10px] font-body font-bold px-1.5 py-0.5 bg-brand-primary text-white rounded-md">
                            NEW
                          </span>
                        )}
                        {product.isBestSeller && (
                          <span className="text-[10px] font-body font-bold px-1.5 py-0.5 bg-brand-accent text-white rounded-md">
                            BS
                          </span>
                        )}
                        {product.isFeatured && (
                          <span className="text-[10px] font-body font-bold px-1.5 py-0.5 bg-blue-500 text-white rounded-md">
                            FT
                          </span>
                        )}
                      </div>
                    </td>
                    {/* Actions */}
                    <td className="px-5 py-4">
                      <div className="flex items-center gap-1.5">
                        <Link
                          href={`/admin/products/${product.id}`}
                          className="p-2 rounded-lg hover:bg-brand-muted transition-colors text-brand-text-muted hover:text-brand-text min-h-0 min-w-0"
                          title="Edit"
                        >
                          <Edit2 size={14} />
                        </Link>
                        <DeleteProductButton productId={product.id} productName={product.name} />
                      </div>
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
