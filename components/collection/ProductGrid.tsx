"use client";

import { motion } from "framer-motion";
import type { Product } from "@/types/product";
import ProductCard from "./ProductCard";
import ProductCardSkeleton from "./ProductCardSkeleton";

type Props = {
  products: Product[];
  loading?: boolean;
};

export default function ProductGrid({ products, loading = false }: Props) {
  if (loading) {
    return (
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 md:gap-5">
        {Array.from({ length: 8 }).map((_, i) => (
          <ProductCardSkeleton key={i} />
        ))}
      </div>
    );
  }

  if (products.length === 0) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center py-20 px-6"
      >
        <p className="font-heading text-3xl font-light text-brand-text-muted mb-2">
          No products found
        </p>
        <p className="text-sm font-body text-brand-text-muted">
          Try adjusting your filters or browse our full collection.
        </p>
      </motion.div>
    );
  }

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 md:gap-5">
      {products.map((product, i) => (
        <ProductCard key={product.id} product={product} index={i} />
      ))}
    </div>
  );
}
