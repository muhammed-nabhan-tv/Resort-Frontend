// "use client";

// import { useState } from "react";
// import { useRouter } from "next/navigation";
// import {
//   Compass,
//   Mail,
//   Lock,
//   User,
//   ArrowRight,
//   CheckCircle2,
//   Eye,
//   EyeOff,
//   Zap,
// } from "lucide-react";

// export default function LoginPage() {
//   const router = useRouter();
//   const [tab, setTab] = useState<"login" | "signup">("login");
//   const [showPassword, setShowPassword] = useState(false);

//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [name, setName] = useState("");

//   const [toast, setToast] = useState<string | null>(null);
//   const [isSubmitting, setIsSubmitting] = useState(false);

//   // Instant Demo User Login (join without backend)
//   const handleDemoLogin = () => {
//     setIsSubmitting(true);
//     setToast("Authenticated as Demo User (Alex Morgan)!");
//     setTimeout(() => {
//       router.push("/profile");
//     }, 700);
//   };

//   const handleSubmit = (e: React.FormEvent) => {
//     e.preventDefault();
//     setIsSubmitting(true);
//     if (tab === "signup") {
//       setToast(`Account created for ${name || "Traveler"}!`);
//     } else {
//       setToast("Logged in successfully! Redirecting...");
//     }
//     setTimeout(() => {
//       router.push("/bookings");
//     }, 800);
//   };

//   return (
//     <div className="w-full max-w-[420px] bg-white rounded-3xl shadow-2xl border border-slate-200/90 overflow-hidden animate-fade-in">
//       {/* Top Header Card */}
//       <div className="bg-gradient-to-r from-[#0a2560] to-[#1444a8] p-6 text-white text-center">
//         <div className="w-11 h-11 rounded-2xl bg-white/10 backdrop-blur-md flex items-center justify-center mx-auto mb-2.5 border border-white/20">
//           <Compass className="w-6 h-6 text-[#ff4b38]" />
//         </div>
//         <h1 className="text-xl font-black tracking-tight">
//           Stay<span className="text-[#ff4b38]">Up</span> Stays
//         </h1>
//         <p className="text-xs text-blue-100 mt-1">
//           {tab === "login" ? "Sign in to access your bookings & perks" : "Create your account for member savings"}
//         </p>
//       </div>

//       <div className="p-6 sm:p-7 space-y-5">
//         {/* Toast Notification */}
//         {toast && (
//           <div className="p-3 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-bold flex items-center gap-2 animate-fade-in">
//             <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
//             <span>{toast}</span>
//           </div>
//         )}

//         {/* 1-CLICK INSTANT DEMO USER BUTTON (Join without backend) */}
//         <div className="bg-blue-50/80 rounded-2xl p-3.5 border border-blue-100 text-center">
//           <span className="text-[11px] font-bold text-slate-500 block mb-2 uppercase tracking-wider">
//             Fast Preview Mode
//           </span>
//           <button
//             type="button"
//             onClick={handleDemoLogin}
//             disabled={isSubmitting}
//             className="w-full py-3 px-4 rounded-xl bg-[#0a2560] hover:bg-[#1444a8] text-white font-black text-sm transition-all shadow-md flex items-center justify-center gap-2 cursor-pointer active:scale-98"
//           >
//             <Zap className="w-4 h-4 text-[#ff4b38]" />
//             <span>Instant Demo User Login</span>
//           </button>
//           <span className="text-[10px] text-slate-400 mt-1.5 block">
//             One-click entry without backend or password
//           </span>
//         </div>

//         {/* Divider */}
//         <div className="relative flex items-center justify-center">
//           <div className="border-t border-slate-200 w-full" />
//           <span className="bg-white px-3 text-[11px] font-bold text-slate-400 uppercase tracking-wider shrink-0">
//             Or Use Credentials
//           </span>
//         </div>

//         {/* Tab Switcher */}
//         <div className="flex p-1 bg-slate-100 rounded-xl text-xs font-bold">
//           <button
//             type="button"
//             onClick={() => setTab("login")}
//             className={`flex-1 py-2 rounded-lg transition-all cursor-pointer ${
//               tab === "login"
//                 ? "bg-white text-slate-900 shadow-xs"
//                 : "text-slate-500 hover:text-slate-900"
//             }`}
//           >
//             Sign In
//           </button>
//           <button
//             type="button"
//             onClick={() => setTab("signup")}
//             className={`flex-1 py-2 rounded-lg transition-all cursor-pointer ${
//               tab === "signup"
//                 ? "bg-white text-slate-900 shadow-xs"
//                 : "text-slate-500 hover:text-slate-900"
//             }`}
//           >
//             Register
//           </button>
//         </div>

//         {/* Standard Form */}
//         <form onSubmit={handleSubmit} className="space-y-3.5">
//           {tab === "signup" && (
//             <div>
//               <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
//                 Full Name
//               </label>
//               <div className="relative">
//                 <User className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
//                 <input
//                   type="text"
//                   required
//                   placeholder="Alex Morgan"
//                   value={name}
//                   onChange={(e) => setName(e.target.value)}
//                   className="w-full pl-9 pr-3 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm font-semibold text-slate-900 focus:outline-hidden focus:border-[#0a2560] focus:bg-white"
//                 />
//               </div>
//             </div>
//           )}

//           <div>
//             <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
//               Email Address
//             </label>
//             <div className="relative">
//               <Mail className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
//               <input
//                 type="email"
//                 required
//                 placeholder="alex.morgan@example.com"
//                 value={email}
//                 onChange={(e) => setEmail(e.target.value)}
//                 className="w-full pl-9 pr-3 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm font-semibold text-slate-900 focus:outline-hidden focus:border-[#0a2560] focus:bg-white"
//               />
//             </div>
//           </div>

//           <div>
//             <div className="flex items-center justify-between mb-1">
//               <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider">
//                 Password
//               </label>
//               {tab === "login" && (
//                 <button
//                   type="button"
//                   onClick={() => setToast("Reset link sent to registered email")}
//                   className="text-[11px] font-bold text-[#ff4b38] hover:underline cursor-pointer"
//                 >
//                   Forgot?
//                 </button>
//               )}
//             </div>
//             <div className="relative">
//               <Lock className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
//               <input
//                 type={showPassword ? "text" : "password"}
//                 required
//                 placeholder="••••••••••••"
//                 value={password}
//                 onChange={(e) => setPassword(e.target.value)}
//                 className="w-full pl-9 pr-10 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm font-semibold text-slate-900 focus:outline-hidden focus:border-[#0a2560] focus:bg-white"
//               />
//               <button
//                 type="button"
//                 onClick={() => setShowPassword(!showPassword)}
//                 className="absolute right-3 top-3 text-slate-400 hover:text-slate-600 cursor-pointer"
//               >
//                 {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
//               </button>
//             </div>
//           </div>

//           <button
//             type="submit"
//             disabled={isSubmitting}
//             className="w-full mt-2 py-3.5 px-4 rounded-xl bg-[#e52823] hover:bg-[#cc201b] text-white font-black text-sm tracking-wide shadow-lg shadow-red-600/30 transition-all flex items-center justify-center gap-2 cursor-pointer active:scale-98"
//           >
//             <span>{tab === "login" ? "Sign In" : "Create Account"}</span>
//             <ArrowRight className="w-4 h-4" />
//           </button>
//         </form>
//       </div>
//     </div>
//   );
// }


"use client";

import { useState, type FormEvent } from "react";
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
  LoaderCircle,
  ShieldCheck,
} from "lucide-react";

const API_URL = (
  process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000"
).replace(/\/$/, "");

type AuthTab = "login" | "signup";
type UserRole = "CUSTOMER" | "OWNER";
type AuthStep = "form" | "otp";

type ApiResponse = {
  success?: boolean;
  message?: string;
  data?: {
    email?: string;
    name?: string;
    isVerified?: boolean;
    accessToken?: string;
    user?: {
      id: string;
      name: string;
      email: string;
      role: string;
      phone?: string | null;
    };
  };
};

async function apiRequest(
  endpoint: string,
  body: Record<string, string>
): Promise<ApiResponse> {
  const response = await fetch(`${API_URL}/api/auth/${endpoint}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
    body: JSON.stringify(body),
  });

  const result = (await response.json().catch(() => ({}))) as ApiResponse;

  if (!response.ok) {
    throw new Error(
      result.message || `Request failed with status ${response.status}`
    );
  }

  return result;
}

export default function LoginPage() {
  const router = useRouter();

  const [tab, setTab] = useState<AuthTab>("login");
  const [step, setStep] = useState<AuthStep>("form");
  const [showPassword, setShowPassword] = useState(false);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phone, setPhone] = useState("");
  const [role, setRole] = useState<UserRole>("CUSTOMER");
  const [otp, setOtp] = useState("");

  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const changeTab = (nextTab: AuthTab) => {
    setTab(nextTab);
    setStep("form");
    setMessage("");
    setError("");
    setOtp("");
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError("");
    setMessage("");
    setIsSubmitting(true);

    try {
      if (tab === "signup") {
        const result = await apiRequest("register", {
          name: name.trim(),
          email: email.trim().toLowerCase(),
          password,
          role,
          ...(phone.trim() ? { phone: phone.trim() } : {}),
        });

        setStep("otp");
        setMessage(
          result.message ||
          "Registration started. Check your email for the verification code."
        );
      } else {
        const result = await apiRequest("login", {
          email: email.trim().toLowerCase(),
          password,
        });

        if (!result.data?.accessToken || !result.data.user) {
          throw new Error("The server did not return the expected login data.");
        }

        // Keep the access token for this browser tab.
        // The refresh token remains in the HTTP-only cookie.
        sessionStorage.setItem("accessToken", result.data.accessToken);
        sessionStorage.setItem(
          "user",
          JSON.stringify(result.data.user)
        );

        setMessage(result.message || "Login successful!");

        router.push("/bookings");
      }
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "Something went wrong."
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleVerifyOtp = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError("");
    setMessage("");
    setIsSubmitting(true);

    try {
      const result = await apiRequest("verify-otp", {
        email: email.trim().toLowerCase(),
        otp: otp.trim(),
      });

      if (!result.data?.accessToken || !result.data.user) {
        throw new Error(
          "Email verification succeeded, but the expected login data was not returned."
        );
      }

      sessionStorage.setItem("accessToken", result.data.accessToken);
      sessionStorage.setItem("user", JSON.stringify(result.data.user));

      setMessage(result.message || "Email verified successfully!");
      router.push("/bookings");
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "OTP verification failed."
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleResendOtp = async () => {
    setError("");
    setMessage("");
    setIsSubmitting(true);

    try {
      const result = await apiRequest("resend-otp", {
        email: email.trim().toLowerCase(),
      });

      setMessage(result.message || "A new verification code was sent.");
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "Unable to resend the code."
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="w-full max-w-[420px] overflow-hidden rounded-3xl border border-slate-200/90 bg-white shadow-2xl animate-fade-in">
      <div className="bg-gradient-to-r from-[#0a2560] to-[#1444a8] p-6 text-center text-white">
        <div className="mx-auto mb-2.5 flex h-11 w-11 items-center justify-center rounded-2xl border border-white/20 bg-white/10">
          <Compass className="h-6 w-6 text-[#ff4b38]" />
        </div>

        <h1 className="text-xl font-black tracking-tight">
          Stay<span className="text-[#ff4b38]">Up</span> Stays
        </h1>

        <p className="mt-1 text-xs text-blue-100">
          {step === "otp"
            ? "Verify your email to activate your account"
            : tab === "login"
              ? "Sign in to access your bookings and perks"
              : "Create your account and start exploring"}
        </p>
      </div>

      <div className="space-y-5 p-6 sm:p-7">
        {message && (
          <div
            role="status"
            className="flex items-start gap-2 rounded-xl border border-emerald-200 bg-emerald-50 p-3 text-xs font-semibold text-emerald-800"
          >
            <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0" />
            <span>{message}</span>
          </div>
        )}

        {error && (
          <div
            role="alert"
            className="rounded-xl border border-red-200 bg-red-50 p-3 text-sm text-red-700"
          >
            {error}
          </div>
        )}

        {step === "form" ? (
          <>
            <div className="flex rounded-xl bg-slate-100 p-1 text-xs font-bold">
              <button
                type="button"
                onClick={() => changeTab("login")}
                className={`flex-1 rounded-lg py-2 transition-all ${tab === "login"
                    ? "bg-white text-slate-900 shadow-sm"
                    : "text-slate-500 hover:text-slate-900"
                  }`}
              >
                Sign In
              </button>

              <button
                type="button"
                onClick={() => changeTab("signup")}
                className={`flex-1 rounded-lg py-2 transition-all ${tab === "signup"
                    ? "bg-white text-slate-900 shadow-sm"
                    : "text-slate-500 hover:text-slate-900"
                  }`}
              >
                Register
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-3.5">
              {tab === "signup" && (
                <>
                  <div>
                    <label
                      htmlFor="name"
                      className="mb-1 block text-xs font-bold uppercase tracking-wider text-slate-700"
                    >
                      Full Name
                    </label>
                    <div className="relative">
                      <User className="absolute left-3 top-3 h-4 w-4 text-slate-400" />
                      <input
                        id="name"
                        type="text"
                        required
                        autoComplete="name"
                        placeholder="Your full name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="w-full rounded-xl border border-slate-200 bg-slate-50 py-2.5 pl-9 pr-3 text-sm text-slate-900 focus:border-[#0a2560] focus:bg-white focus:outline-none"
                      />
                    </div>
                  </div>

                  <div>
                    <label
                      htmlFor="phone"
                      className="mb-1 block text-xs font-bold uppercase tracking-wider text-slate-700"
                    >
                      Phone Number (Optional)
                    </label>
                    <input
                      id="phone"
                      type="tel"
                      autoComplete="tel"
                      placeholder="Your phone number"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      className="w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-2.5 text-sm text-slate-900 focus:border-[#0a2560] focus:bg-white focus:outline-none"
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="role"
                      className="mb-1 block text-xs font-bold uppercase tracking-wider text-slate-700"
                    >
                      Account Type
                    </label>
                    <select
                      id="role"
                      value={role}
                      onChange={(e) => setRole(e.target.value as UserRole)}
                      className="w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-2.5 text-sm text-slate-900 focus:border-[#0a2560] focus:outline-none"
                    >
                      <option value="CUSTOMER">Customer — Book resorts</option>
                      <option value="OWNER">Resort Owner</option>
                    </select>
                  </div>
                </>
              )}

              <div>
                <label
                  htmlFor="email"
                  className="mb-1 block text-xs font-bold uppercase tracking-wider text-slate-700"
                >
                  Email Address
                </label>
                <div className="relative">
                  <Mail className="absolute left-3 top-3 h-4 w-4 text-slate-400" />
                  <input
                    id="email"
                    type="email"
                    required
                    autoComplete="email"
                    placeholder="you@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full rounded-xl border border-slate-200 bg-slate-50 py-2.5 pl-9 pr-3 text-sm text-slate-900 focus:border-[#0a2560] focus:bg-white focus:outline-none"
                  />
                </div>
              </div>

              <div>
                <label
                  htmlFor="password"
                  className="mb-1 block text-xs font-bold uppercase tracking-wider text-slate-700"
                >
                  Password
                </label>
                <div className="relative">
                  <Lock className="absolute left-3 top-3 h-4 w-4 text-slate-400" />
                  <input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    required
                    autoComplete={
                      tab === "login" ? "current-password" : "new-password"
                    }
                    placeholder="Enter your password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full rounded-xl border border-slate-200 bg-slate-50 py-2.5 pl-9 pr-10 text-sm text-slate-900 focus:border-[#0a2560] focus:bg-white focus:outline-none"
                  />
                  <button
                    type="button"
                    aria-label={showPassword ? "Hide password" : "Show password"}
                    onClick={() => setShowPassword((previous) => !previous)}
                    className="absolute right-3 top-3 text-slate-400 hover:text-slate-600"
                  >
                    {showPassword ? (
                      <EyeOff className="h-4 w-4" />
                    ) : (
                      <Eye className="h-4 w-4" />
                    )}
                  </button>
                </div>
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="mt-2 flex w-full items-center justify-center gap-2 rounded-xl bg-[#e52823] px-4 py-3.5 text-sm font-black tracking-wide text-white shadow-lg shadow-red-600/30 transition-all hover:bg-[#cc201b] disabled:cursor-not-allowed disabled:opacity-60"
              >
                {isSubmitting ? (
                  <LoaderCircle className="h-4 w-4 animate-spin" />
                ) : (
                  <>
                    <span>
                      {tab === "login" ? "Sign In" : "Create Account"}
                    </span>
                    <ArrowRight className="h-4 w-4" />
                  </>
                )}
              </button>
            </form>
          </>
        ) : (
          <form onSubmit={handleVerifyOtp} className="space-y-4">
            <div className="flex items-center gap-3 rounded-xl bg-blue-50 p-3">
              <ShieldCheck className="h-6 w-6 shrink-0 text-[#1444a8]" />
              <p className="text-sm text-slate-700">
                Enter the six-digit verification code sent to{" "}
                <strong className="break-all">{email}</strong>.
              </p>
            </div>

            <div>
              <label
                htmlFor="otp"
                className="mb-1 block text-xs font-bold uppercase tracking-wider text-slate-700"
              >
                Verification Code
              </label>
              <input
                id="otp"
                type="text"
                inputMode="numeric"
                autoComplete="one-time-code"
                pattern="[0-9]{6}"
                maxLength={6}
                required
                placeholder="123456"
                value={otp}
                onChange={(e) =>
                  setOtp(e.target.value.replace(/\D/g, "").slice(0, 6))
                }
                className="w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-3 text-center text-xl font-bold tracking-[0.5em] text-slate-900 focus:border-[#0a2560] focus:outline-none"
              />
            </div>

            <button
              type="submit"
              disabled={isSubmitting || otp.length !== 6}
              className="flex w-full items-center justify-center gap-2 rounded-xl bg-[#e52823] px-4 py-3.5 text-sm font-black text-white transition-all hover:bg-[#cc201b] disabled:cursor-not-allowed disabled:opacity-60"
            >
              {isSubmitting ? (
                <LoaderCircle className="h-4 w-4 animate-spin" />
              ) : (
                <>
                  Verify Email
                  <ArrowRight className="h-4 w-4" />
                </>
              )}
            </button>

            <button
              type="button"
              disabled={isSubmitting}
              onClick={handleResendOtp}
              className="w-full text-sm font-bold text-[#1444a8] hover:underline disabled:opacity-60"
            >
              Resend verification code
            </button>

            <button
              type="button"
              disabled={isSubmitting}
              onClick={() => {
                setStep("form");
                setError("");
                setMessage("");
              }}
              className="w-full text-sm text-slate-500 hover:text-slate-800"
            >
              Back to registration
            </button>
          </form>
        )}
      </div>
    </div>
  );
}

