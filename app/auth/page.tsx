// app/auth/page.tsx
"use client";
import { useState } from "react";
import { signIn } from "@/lib/auth-client";
import { AlertCircle, Clock } from "lucide-react";

export default function AuthPage() {
  const [loading, setLoading] = useState(false);
  const [formError, setFormError] = useState<string | null>(null);

  const handleGoogleLogin = async () => {
    if (loading) return;
    setLoading(true);
    setFormError(null);
    try {
      await signIn.social({
        provider: "google",
        callbackURL: "/auth/redirect",
      });
    } catch (error) {
      console.error(error);
      setFormError("Google sign-in failed. Please try again.");
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen flex items-center justify-center px-4">
      <div
        className="w-full max-w-sm flex flex-col items-center rounded-xl px-9 py-10"
        style={{ background: "white", border: "0.5px solid #E0D5C8" }}
      >
        <div
          className="w-12 h-12 flex items-center justify-center rounded-xl mb-5"
          style={{ background: "#F5EDE3", border: "0.5px solid #D4B896" }}
        >
          <Clock size={22} style={{ color: "#745A27" }} />
        </div>

        <h1 className="text-xl font-medium tracking-[0.22em] mb-1" style={{ color: "#745A27" }}>
          AURUM
        </h1>
        <p className="text-[11px] tracking-[0.12em] uppercase mb-8" style={{ color: "#9E9185" }}>
          Management Access Suite
        </p>

        <div className="w-full h-px mb-8" style={{ background: "#E8DDD0" }} />

        <div className="w-full mb-1">
          <h2 className="text-sm font-medium" style={{ color: "#3A2F22" }}>
            Sign in to continue
          </h2>
        </div>
        <div className="w-full mb-5">
          <p className="text-xs" style={{ color: "#9E9185" }}>
            Admin access only — use your organisation Google account.
          </p>
        </div>

        {formError && (
          <div
            role="alert"
            aria-live="assertive"
            className="w-full flex items-center gap-2 rounded-lg px-3 py-2 mb-4 text-xs"
            style={{ background: "#FCEBEB", border: "0.5px solid #F09595", color: "#791F1F" }}
          >
            <AlertCircle size={14} style={{ color: "#A32D2D", flexShrink: 0 }} />
            {formError}
          </div>
        )}
        <button
          onClick={handleGoogleLogin}
          disabled={loading}
          className="w-full flex items-center justify-center gap-2.5 rounded-lg text-sm font-medium tracking-wide transition-all duration-200 disabled:opacity-60 disabled:cursor-not-allowed active:scale-[0.99]"
          style={{
            padding: "11px 20px",
            border: "0.5px solid #D4B896",
            background: loading ? "#F5EDE3" : "#FFF8F3",
            color: "#3A2F22",
          }}
          onMouseEnter={(e) => { if (!loading) (e.currentTarget as HTMLButtonElement).style.background = "#F5EDE3"; }}
          onMouseLeave={(e) => { if (!loading) (e.currentTarget as HTMLButtonElement).style.background = "#FFF8F3"; }}
        >
          {loading ? (
            <svg className="animate-spin" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#745A27" strokeWidth="2" strokeLinecap="round">
              <path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83" />
            </svg>
          ) : (
            <GoogleIcon />
          )}
          {loading ? "Signing in…" : "Sign in with Google"}
        </button>

        <p className="mt-6 text-center text-[11px] leading-relaxed" style={{ color: "#B5A898" }}>
          By signing in you agree to AURUM&apos;s terms of use.
          <br />
          Authorised personnel only.
        </p>
      </div>
    </main>
  );
}

function GoogleIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 18 18" fill="none" aria-hidden="true">
      <path d="M17.64 9.2c0-.637-.057-1.251-.164-1.84H9v3.481h4.844c-.209 1.125-.843 2.078-1.796 2.717v2.258h2.908C16.658 14.013 17.64 11.705 17.64 9.2z" fill="#4285F4"/>
      <path d="M9 18c2.43 0 4.467-.806 5.956-2.18l-2.908-2.259c-.806.54-1.837.86-3.048.86-2.344 0-4.328-1.584-5.036-3.711H.957v2.332A8.997 8.997 0 0 0 9 18z" fill="#34A853"/>
      <path d="M3.964 10.71A5.41 5.41 0 0 1 3.682 9c0-.593.102-1.17.282-1.71V4.958H.957A8.996 8.996 0 0 0 0 9c0 1.452.348 2.827.957 4.042l3.007-2.332z" fill="#FBBC05"/>
      <path d="M9 3.58c1.321 0 2.508.454 3.44 1.345l2.582-2.58C13.463.891 11.426 0 9 0A8.997 8.997 0 0 0 .957 4.958L3.964 7.29C4.672 5.163 6.656 3.58 9 3.58z" fill="#EA4335"/>
    </svg>
  );
}