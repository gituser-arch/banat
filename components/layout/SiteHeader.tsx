"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { Search, Heart, User, ShoppingBag, Menu } from "lucide-react";
import { brand } from "@/lib/tokens";
import SearchOverlay from "@/components/search/SearchOverlay";

export default function SiteHeader() {
  const [searchOpen, setSearchOpen] = useState(false);
  const [cartCount] = useState(0);
  const [wishlistCount] = useState(0);
  const { scrollY } = useScroll();
  const headerBg = useTransform(
    scrollY,
    [0, 80],
    ["rgba(250,250,249,0)", "rgba(250,250,249,0.97)"]
  );
  const headerShadow = useTransform(
    scrollY,
    [0, 80],
    ["0 0 0 rgba(0,0,0,0)", "0 1px 16px rgba(0,0,0,0.06)"]
  );

  // Prevent body scroll when search is open
  useEffect(() => {
    if (searchOpen) document.body.style.overflow = "hidden";
    else document.body.style.overflow = "";
    return () => { document.body.style.overflow = ""; };
  }, [searchOpen]);

  return (
    <>
      <motion.header
        style={{ backgroundColor: headerBg, boxShadow: headerShadow }}
        className="fixed top-0 left-0 right-0 z-40 backdrop-blur-md"
      >
        <div className="max-w-7xl mx-auto px-4 h-14 flex items-center justify-between gap-2">
          {/* Logo */}
          <Link href="/" className="flex-shrink-0 min-h-0 min-w-0">
            <span className="font-heading text-xl font-semibold tracking-tight text-brand-primary leading-none">
              {brand.name}
            </span>
          </Link>

          {/* Right icons */}
          <div className="flex items-center gap-0.5">
            {/* Search */}
            <button
              onClick={() => setSearchOpen(true)}
              aria-label="Search"
              className="relative p-2.5 rounded-full hover:bg-brand-muted transition-colors"
            >
              <Search size={20} strokeWidth={1.5} />
            </button>

            {/* Wishlist */}
            <Link
              href="/wishlist"
              aria-label={`Wishlist (${wishlistCount} items)`}
              className="relative p-2.5 rounded-full hover:bg-brand-muted transition-colors"
            >
              <Heart size={20} strokeWidth={1.5} />
              {wishlistCount > 0 && (
                <span className="absolute top-1 right-1 bg-brand-accent text-white text-[9px] font-bold w-4 h-4 rounded-full flex items-center justify-center">
                  {wishlistCount}
                </span>
              )}
            </Link>

            {/* Account / Admin */}
            <Link
              href="/admin"
              aria-label="Admin Portal"
              title="Admin Portal"
              className="relative p-2.5 rounded-full hover:bg-brand-muted transition-colors"
            >
              <User size={20} strokeWidth={1.5} />
            </Link>

            {/* Cart */}
            <Link
              href="/cart"
              aria-label={`Cart (${cartCount} items)`}
              className="relative p-2.5 rounded-full hover:bg-brand-muted transition-colors"
            >
              <ShoppingBag size={20} strokeWidth={1.5} />
              {cartCount > 0 && (
                <span className="absolute top-1 right-1 bg-brand-primary text-white text-[9px] font-bold w-4 h-4 rounded-full flex items-center justify-center">
                  {cartCount}
                </span>
              )}
            </Link>
          </div>
        </div>
      </motion.header>

      <SearchOverlay isOpen={searchOpen} onClose={() => setSearchOpen(false)} />
    </>
  );
}
