"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import {
  Compass,
  Mail,
  Lock,
  User,
  ArrowRight,
  CheckCircle2,
  Eye,
  EyeOff,
  Zap,
} from "lucide-react";

export default function LoginPage() {
  const router = useRouter();
  const [tab, setTab] = useState<"login" | "signup">("login");
  const [showPassword, setShowPassword] = useState(false);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");

  const [toast, setToast] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Instant Demo User Login (join without backend)
  const handleDemoLogin = () => {
    setIsSubmitting(true);
    setToast("Authenticated as Demo User (Alex Morgan)!");
    setTimeout(() => {
      router.push("/profile");
    }, 700);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    if (tab === "signup") {
      setToast(`Account created for ${name || "Traveler"}!`);
    } else {
      setToast("Logged in successfully! Redirecting...");
    }
    setTimeout(() => {
      router.push("/bookings");
    }, 800);
  };

  return (
    <div className="w-full max-w-[420px] bg-white rounded-3xl shadow-2xl border border-slate-200/90 overflow-hidden animate-fade-in">
      {/* Top Header Card */}
      <div className="bg-gradient-to-r from-[#0a2560] to-[#1444a8] p-6 text-white text-center">
        <div className="w-11 h-11 rounded-2xl bg-white/10 backdrop-blur-md flex items-center justify-center mx-auto mb-2.5 border border-white/20">
          <Compass className="w-6 h-6 text-[#ff4b38]" />
        </div>
        <h1 className="text-xl font-black tracking-tight">
          Stay<span className="text-[#ff4b38]">Up</span> Stays
        </h1>
        <p className="text-xs text-blue-100 mt-1">
          {tab === "login" ? "Sign in to access your bookings & perks" : "Create your account for member savings"}
        </p>
      </div>

      <div className="p-6 sm:p-7 space-y-5">
        {/* Toast Notification */}
        {toast && (
          <div className="p-3 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-bold flex items-center gap-2 animate-fade-in">
            <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
            <span>{toast}</span>
          </div>
        )}

        {/* 1-CLICK INSTANT DEMO USER BUTTON (Join without backend) */}
        <div className="bg-blue-50/80 rounded-2xl p-3.5 border border-blue-100 text-center">
          <span className="text-[11px] font-bold text-slate-500 block mb-2 uppercase tracking-wider">
            Fast Preview Mode
          </span>
          <button
            type="button"
            onClick={handleDemoLogin}
            disabled={isSubmitting}
            className="w-full py-3 px-4 rounded-xl bg-[#0a2560] hover:bg-[#1444a8] text-white font-black text-sm transition-all shadow-md flex items-center justify-center gap-2 cursor-pointer active:scale-98"
          >
            <Zap className="w-4 h-4 text-[#ff4b38]" />
            <span>Instant Demo User Login</span>
          </button>
          <span className="text-[10px] text-slate-400 mt-1.5 block">
            One-click entry without backend or password
          </span>
        </div>

        {/* Divider */}
        <div className="relative flex items-center justify-center">
          <div className="border-t border-slate-200 w-full" />
          <span className="bg-white px-3 text-[11px] font-bold text-slate-400 uppercase tracking-wider shrink-0">
            Or Use Credentials
          </span>
        </div>

        {/* Tab Switcher */}
        <div className="flex p-1 bg-slate-100 rounded-xl text-xs font-bold">
          <button
            type="button"
            onClick={() => setTab("login")}
            className={`flex-1 py-2 rounded-lg transition-all cursor-pointer ${
              tab === "login"
                ? "bg-white text-slate-900 shadow-xs"
                : "text-slate-500 hover:text-slate-900"
            }`}
          >
            Sign In
          </button>
          <button
            type="button"
            onClick={() => setTab("signup")}
            className={`flex-1 py-2 rounded-lg transition-all cursor-pointer ${
              tab === "signup"
                ? "bg-white text-slate-900 shadow-xs"
                : "text-slate-500 hover:text-slate-900"
            }`}
          >
            Register
          </button>
        </div>

        {/* Standard Form */}
        <form onSubmit={handleSubmit} className="space-y-3.5">
          {tab === "signup" && (
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                Full Name
              </label>
              <div className="relative">
                <User className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                <input
                  type="text"
                  required
                  placeholder="Alex Morgan"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full pl-9 pr-3 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm font-semibold text-slate-900 focus:outline-hidden focus:border-[#0a2560] focus:bg-white"
                />
              </div>
            </div>
          )}

          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
              Email Address
            </label>
            <div className="relative">
              <Mail className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
              <input
                type="email"
                required
                placeholder="alex.morgan@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full pl-9 pr-3 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm font-semibold text-slate-900 focus:outline-hidden focus:border-[#0a2560] focus:bg-white"
              />
            </div>
          </div>

          <div>
            <div className="flex items-center justify-between mb-1">
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider">
                Password
              </label>
              {tab === "login" && (
                <button
                  type="button"
                  onClick={() => setToast("Reset link sent to registered email")}
                  className="text-[11px] font-bold text-[#ff4b38] hover:underline cursor-pointer"
                >
                  Forgot?
                </button>
              )}
            </div>
            <div className="relative">
              <Lock className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
              <input
                type={showPassword ? "text" : "password"}
                required
                placeholder="••••••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full pl-9 pr-10 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm font-semibold text-slate-900 focus:outline-hidden focus:border-[#0a2560] focus:bg-white"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-3 text-slate-400 hover:text-slate-600 cursor-pointer"
              >
                {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full mt-2 py-3.5 px-4 rounded-xl bg-[#e52823] hover:bg-[#cc201b] text-white font-black text-sm tracking-wide shadow-lg shadow-red-600/30 transition-all flex items-center justify-center gap-2 cursor-pointer active:scale-98"
          >
            <span>{tab === "login" ? "Sign In" : "Create Account"}</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </form>
      </div>
    </div>
  );
}
