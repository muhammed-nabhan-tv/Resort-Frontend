import Link from "next/link";
import { Compass } from "lucide-react";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-slate-950 flex flex-col justify-between relative overflow-hidden">
      {/* Subtle ambient lighting */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[350px] bg-blue-600/15 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 right-10 w-96 h-96 bg-red-600/15 rounded-full blur-3xl pointer-events-none" />

      {/* Minimal Header */}
      <header className="relative z-10 w-full max-w-5xl mx-auto px-6 py-6 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2.5 group">
          <div className="w-10 h-10 rounded-2xl bg-[#0a2560] flex items-center justify-center text-white shadow-md group-hover:scale-105 transition-transform">
            <Compass className="w-6 h-6 text-[#ff4b38]" />
          </div>
          <span className="text-2xl font-black tracking-tight text-white">
            Stay<span className="text-[#ff4b38]">Up</span>
          </span>
        </Link>
        <Link
          href="/"
          className="text-xs sm:text-sm font-bold text-slate-300 hover:text-white transition-colors"
        >
          ← Back to Stays
        </Link>
      </header>

      {/* Main Auth Content */}
      <main className="relative z-10 flex-1 flex items-center justify-center px-4 py-8">
        {children}
      </main>

      {/* Minimal Footer */}
      <footer className="relative z-10 py-4 text-center text-xs text-slate-500">
        © 2026 StayUp. Verified Resort Booking Platform.
      </footer>
    </div>
  );
}
