"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import {
  X,
  Compass,
  Mail,
  Lock,
  Phone,
  User,
  ArrowRight,
  ShieldCheck,
  Building2,
  CheckCircle2,
} from "lucide-react";

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  defaultTab?: "login" | "signup";
}

export function AuthModal({ isOpen, onClose, defaultTab = "login" }: AuthModalProps) {
  const router = useRouter();
  const [tab, setTab] = useState<"login" | "signup">(defaultTab);
  const [authMethod, setAuthMethod] = useState<"email" | "phone">("phone");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  if (!isOpen) return null;

  const handleQuickLogin = () => {
    setToastMessage("Logged in as Alex Morgan (Customer)!");
    setTimeout(() => {
      onClose();
      router.push("/profile");
    }, 800);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setToastMessage(`Welcome back${name ? `, ${name}` : ""}! Successfully authenticated.`);
    setTimeout(() => {
      onClose();
      router.push("/bookings");
    }, 1000);
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="relative w-full max-w-md bg-white rounded-3xl shadow-2xl border border-slate-200 overflow-hidden animate-in fade-in zoom-in-95 duration-200">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-full text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors z-10"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Top Header Banner */}
        <div className="bg-gradient-to-r from-[#0a2560] to-[#1444a8] p-6 text-white text-center">
          <div className="w-12 h-12 rounded-2xl bg-white/10 backdrop-blur-md flex items-center justify-center mx-auto mb-2 border border-white/20">
            <Compass className="w-6 h-6 text-[#ff4b38]" />
          </div>
          <h2 className="text-xl font-black tracking-tight">
            Stay<span className="text-[#ff4b38]">Up</span> Stays
          </h2>
          <p className="text-xs text-blue-100 mt-0.5">
            Sign up to get instant discounts up to 70% & earn StayUp Money
          </p>
        </div>

        {/* Tabs: Login vs Sign Up */}
        <div className="flex border-b border-slate-200 bg-slate-50/50">
          <button
            type="button"
            onClick={() => setTab("login")}
            className={`flex-1 py-3 text-xs font-bold tracking-wider uppercase transition-colors ${
              tab === "login"
                ? "text-[#0a2560] border-b-2 border-[#0a2560] bg-white"
                : "text-slate-400 hover:text-slate-700"
            }`}
          >
            Sign In
          </button>
          <button
            type="button"
            onClick={() => setTab("signup")}
            className={`flex-1 py-3 text-xs font-bold tracking-wider uppercase transition-colors ${
              tab === "signup"
                ? "text-[#0a2560] border-b-2 border-[#0a2560] bg-white"
                : "text-slate-400 hover:text-slate-700"
            }`}
          >
            Create Account
          </button>
        </div>

        <div className="p-6 space-y-5">
          {toastMessage && (
            <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-3 text-xs font-bold text-emerald-800 flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-600" />
              <span>{toastMessage}</span>
            </div>
          )}

          {/* Quick Demo Login (User Only) */}
          <div className="bg-blue-50/80 rounded-2xl p-3 border border-blue-100 text-center">
            <button
              type="button"
              onClick={handleQuickLogin}
              className="w-full py-2.5 px-4 rounded-xl bg-[#0a2560] hover:bg-[#1444a8] text-white font-bold text-xs transition-all shadow-sm flex items-center justify-center gap-2 cursor-pointer"
            >
              <User className="w-4 h-4 text-[#ff4b38]" />
              <span>Instant Demo User Login (Alex Morgan)</span>
            </button>
            <span className="text-[10px] text-slate-400 mt-1 block">
              Join instantly without backend credentials
            </span>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            {tab === "signup" && (
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">Your Full Name</label>
                <div className="relative">
                  <User className="w-5 h-5 text-slate-400 absolute left-3.5 top-3.5" />
                  <input
                    type="text"
                    required
                    placeholder="e.g. Alex Morgan"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full pl-11 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-base font-semibold focus:outline-hidden focus:border-[#0a2560] focus:bg-white"
                  />
                </div>
              </div>
            )}

            <div>
              <div className="flex items-center justify-between mb-1">
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider">Mobile Number or Email</label>
                <button
                  type="button"
                  onClick={() => setAuthMethod(authMethod === "phone" ? "email" : "phone")}
                  className="text-xs text-blue-600 font-bold hover:underline cursor-pointer"
                >
                  Use {authMethod === "phone" ? "Email" : "Phone"} instead
                </button>
              </div>

              {authMethod === "phone" ? (
                <div className="flex gap-2">
                  <div className="px-3.5 py-3 bg-slate-100 border border-slate-200 rounded-xl font-bold text-slate-800 text-base">
                    +91
                  </div>
                  <input
                    type="tel"
                    required
                    placeholder="Enter mobile number"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="flex-1 px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-base font-semibold focus:outline-hidden focus:border-[#0a2560] focus:bg-white"
                  />
                </div>
              ) : (
                <div className="relative">
                  <Mail className="w-5 h-5 text-slate-400 absolute left-3.5 top-3.5" />
                  <input
                    type="email"
                    required
                    placeholder="you@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full pl-11 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-base font-semibold focus:outline-hidden focus:border-[#0a2560] focus:bg-white"
                  />
                </div>
              )}
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">Password</label>
              <div className="relative">
                <Lock className="w-5 h-5 text-slate-400 absolute left-3.5 top-3.5" />
                <input
                  type="password"
                  required
                  placeholder="••••••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full pl-11 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-base font-semibold focus:outline-hidden focus:border-[#0a2560] focus:bg-white"
                />
              </div>
            </div>

            <button
              type="submit"
              className="w-full py-4 rounded-2xl bg-[#e52823] hover:bg-[#cc201b] text-white font-black text-base shadow-lg shadow-red-500/30 transition-all flex items-center justify-center gap-2 cursor-pointer mt-3 active:scale-98"
            >
              <span>{tab === "login" ? "Sign In to StayUp" : "Create Account & Get Stays"}</span>
              <ArrowRight className="w-5 h-5" />
            </button>
          </form>

          <p className="text-xs text-center text-slate-400">
            By continuing, you agree to StayUp&apos;s Terms of Service and Privacy Policy.
          </p>
        </div>
      </div>
    </div>
  );
}
