"use client";

import { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { Eye, EyeOff, Lock, Mail, AlertCircle } from "lucide-react";
import { brand } from "@/lib/tokens";

export default function AdminLoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState<string>(brand.admin.email);
  const [password, setPassword] = useState<string>(brand.admin.defaultPassword);
  const [showPw, setShowPw] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    const res = await signIn("credentials", {
      email,
      password,
      redirect: false,
    });

    setLoading(false);

    if (res?.ok) {
      router.push("/admin");
      router.refresh();
    } else {
      setError("Invalid email or password. Please try again.");
    }
  };

  return (
    <div className="min-h-screen bg-brand-surface flex items-center justify-center px-5">
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="w-full max-w-sm"
      >
        {/* Brand */}
        <div className="text-center mb-10">
          <p className="font-heading text-3xl font-semibold text-brand-primary">{brand.name}</p>
          <p className="text-xs font-body text-brand-text-muted mt-1 tracking-widest uppercase">
            Admin Panel
          </p>
        </div>

        {/* Card */}
        <div className="bg-white border border-brand-border rounded-3xl p-8 shadow-sm">
          <h1 className="font-heading text-2xl font-semibold text-brand-text mb-6 text-center">
            Sign In
          </h1>

          {error && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              className="flex items-center gap-2 bg-red-50 border border-red-200 text-red-700 text-sm font-body px-4 py-3 rounded-xl mb-5"
            >
              <AlertCircle size={15} className="flex-shrink-0" />
              {error}
            </motion.div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Email */}
            <div>
              <label className="text-xs font-body font-medium text-brand-text-muted block mb-1.5">
                Email
              </label>
              <div className="relative">
                <Mail size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-brand-text-muted" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="w-full pl-10 pr-4 py-3.5 border border-brand-border rounded-xl text-sm font-body bg-brand-surface outline-none focus:border-brand-accent transition-colors"
                  placeholder="admin@banathaleema.com"
                />
              </div>
            </div>

            {/* Password */}
            <div>
              <label className="text-xs font-body font-medium text-brand-text-muted block mb-1.5">
                Password
              </label>
              <div className="relative">
                <Lock size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-brand-text-muted" />
                <input
                  type={showPw ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="w-full pl-10 pr-12 py-3.5 border border-brand-border rounded-xl text-sm font-body bg-brand-surface outline-none focus:border-brand-accent transition-colors"
                />
                <button
                  type="button"
                  onClick={() => setShowPw((s) => !s)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-brand-text-muted hover:text-brand-text transition-colors min-h-0 min-w-0 p-1"
                >
                  {showPw ? <EyeOff size={15} /> : <Eye size={15} />}
                </button>
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-4 bg-brand-primary text-white text-sm font-body font-semibold rounded-xl hover:bg-brand-accent transition-colors disabled:opacity-60 active:scale-95 min-h-0 mt-2"
            >
              {loading ? "Signing in..." : "Sign In to Admin"}
            </button>
          </form>

          <div className="mt-6 p-4 bg-brand-muted rounded-xl">
            <p className="text-xs font-body text-brand-text-muted text-center">
              Default: <span className="font-medium text-brand-text">{brand.admin.email}</span>
              <br />
              Password: <span className="font-medium text-brand-text">{brand.admin.defaultPassword}</span>
            </p>
          </div>
        </div>

        <p className="text-center text-xs font-body text-brand-text-muted mt-6">
          &larr;{" "}
          <a href="/" className="hover:text-brand-text transition-colors underline underline-offset-2">
            Back to store
          </a>
        </p>
      </motion.div>
    </div>
  );
}
