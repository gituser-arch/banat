"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { signOut } from "next-auth/react";
import { motion } from "framer-motion";
import {
  LayoutDashboard,
  Package,
  ShoppingCart,
  LogOut,
  ExternalLink,
  Menu,
  X,
} from "lucide-react";
import { brand } from "@/lib/tokens";
import { useState } from "react";

const NAV = [
  { href: "/admin", label: "Dashboard", icon: LayoutDashboard, exact: true },
  { href: "/admin/products", label: "Products", icon: Package, exact: false },
  { href: "/admin/orders", label: "Orders", icon: ShoppingCart, exact: false },
];

export default function AdminSidebar() {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);

  const isActive = (href: string, exact: boolean) =>
    exact ? pathname === href : pathname.startsWith(href);

  const SidebarContent = () => (
    <div className="flex flex-col h-full">
      {/* Logo */}
      <div className="px-6 py-6 border-b border-brand-border flex-shrink-0">
        <p className="font-heading text-xl font-semibold text-brand-primary">{brand.name}</p>
        <p className="text-xs font-body text-brand-text-muted mt-0.5">Admin Panel</p>
      </div>

      {/* Nav */}
      <nav className="flex-1 px-3 py-4 space-y-1 overflow-y-auto">
        {/* Highlighted Add Product CTA */}
        <div className="mb-4 pb-3 border-b border-brand-border">
          <Link
            href="/admin/products/new"
            onClick={() => setMobileOpen(false)}
            className="flex items-center justify-center gap-2 px-4 py-3 bg-gradient-to-r from-amber-600 via-brand-accent to-amber-600 text-white text-sm font-body font-bold rounded-xl shadow-md shadow-amber-500/20 hover:shadow-amber-500/35 hover:scale-[1.02] active:scale-95 transition-all min-h-0 ring-1 ring-amber-300/40"
          >
            <span>+ Add New Product</span>
          </Link>
        </div>

        {NAV.map(({ href, label, icon: Icon, exact }) => (
          <Link
            key={href}
            href={href}
            onClick={() => setMobileOpen(false)}
            className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-body font-medium transition-all min-h-0 ${
              isActive(href, exact)
                ? "bg-brand-primary text-white"
                : "text-brand-text-muted hover:bg-brand-muted hover:text-brand-text"
            }`}
          >
            <Icon size={18} strokeWidth={1.5} />
            {label}
            {isActive(href, exact) && (
              <motion.div
                layoutId="admin-nav-indicator"
                className="ml-auto w-1.5 h-1.5 rounded-full bg-brand-accent"
              />
            )}
          </Link>
        ))}
      </nav>

      {/* Footer */}
      <div className="px-3 py-4 border-t border-brand-border flex-shrink-0 space-y-1">
        <Link
          href="/"
          target="_blank"
          className="flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-body text-brand-text-muted hover:bg-brand-muted hover:text-brand-text transition-colors min-h-0"
        >
          <ExternalLink size={16} strokeWidth={1.5} />
          View Store
        </Link>
        <button
          onClick={() => signOut({ callbackUrl: "/admin/login" })}
          className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-body text-red-500 hover:bg-red-50 transition-colors min-h-0"
        >
          <LogOut size={16} strokeWidth={1.5} />
          Sign Out
        </button>
      </div>
    </div>
  );

  return (
    <>
      {/* Desktop Sidebar */}
      <aside className="hidden md:flex flex-col w-64 flex-shrink-0 h-screen sticky top-0 bg-white border-r border-brand-border">
        <SidebarContent />
      </aside>

      {/* Mobile: Top Bar */}
      <div className="md:hidden flex items-center justify-between px-4 py-3 bg-white border-b border-brand-border sticky top-0 z-40">
        <p className="font-heading text-lg font-semibold text-brand-primary">{brand.name}</p>
        <button
          onClick={() => setMobileOpen(true)}
          className="p-2 text-brand-text min-h-0 min-w-0"
        >
          <Menu size={20} />
        </button>
      </div>

      {/* Mobile Drawer */}
      {mobileOpen && (
        <div className="fixed inset-0 z-50 md:hidden">
          <div
            className="absolute inset-0 bg-black/40"
            onClick={() => setMobileOpen(false)}
          />
          <motion.div
            initial={{ x: "-100%" }}
            animate={{ x: 0 }}
            exit={{ x: "-100%" }}
            transition={{ type: "spring", damping: 30, stiffness: 300 }}
            className="absolute left-0 top-0 bottom-0 w-72 bg-white shadow-xl"
          >
            <button
              onClick={() => setMobileOpen(false)}
              className="absolute top-4 right-4 p-2 min-h-0 min-w-0"
            >
              <X size={20} />
            </button>
            <SidebarContent />
          </motion.div>
        </div>
      )}
    </>
  );
}
