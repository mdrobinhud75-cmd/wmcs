import React, { useState } from "react";
import { Shield, Key, FolderSync, AlertTriangle, ArrowRight, Sparkles, CheckCircle } from "lucide-react";

interface LoginGateProps {
  onLoginSuccess: (email: string, name: string) => void;
}

export default function LoginGate({ onLoginSuccess }: LoginGateProps) {
  const [isAuthenticating, setIsAuthenticating] = useState(false);
  const [authStep, setAuthStep] = useState(0);
  const [errorSim, setErrorSim] = useState<string | null>(null);

  const authSequence = [
    { text: "Redirecting to accounts.google.com/o/oauth2...", delay: 600 },
    { text: "Exchanging cryptographic authorization code (JWT)...", delay: 900 },
    { text: "Verifying signature protocols with auth-service node cluster...", delay: 800 },
    { text: "Acquiring transient Access + Refresh tokens...", delay: 700 },
    { text: "Synchronizing isolated sandbox with Google Drive (WMCS_Archive)...", delay: 1000 },
    { text: "Securing local Redis state workspace for L1 Creator...", delay: 500 }
  ];

  const handleStartGoogleOAuth = () => {
    setIsAuthenticating(true);
    setAuthStep(0);
    setErrorSim(null);

    const runStep = (idx: number) => {
      if (idx >= authSequence.length) {
        setTimeout(() => {
          onLoginSuccess("mdrobinhud75@gmail.com", "Robin Hud (L1 Creator)");
        }, 400);
        return;
      }

      setTimeout(() => {
        setAuthStep(idx + 1);
        runStep(idx + 1);
      }, authSequence[idx].delay);
    };

    runStep(0);
  };

  // Mock flags for country particles
  const floatingFlags = [
    { flag: "🇰🇷", label: "K-Pop Deep DNA", x: "12%", y: "15%", pulse: true, color: "rgba(0, 245, 255, 0.4)" },
    { flag: "🇺🇸", label: "West Coast Trap", x: "82%", y: "22%", pulse: false, color: "rgba(99, 102, 241, 0.4)" },
    { flag: "🇳🇬", label: "Lagos Afrobeats", x: "10%", y: "78%", pulse: true, color: "rgba(16, 185, 129, 0.4)" },
    { flag: "🇨🇴", label: "Electro-Salsa Rhythm", x: "78%", y: "75%", pulse: false, color: "rgba(245, 158, 11, 0.4)" },
    { flag: "🇮🇳", label: "Indie-Chamber Cinematic", x: "48%", y: "85%", pulse: true, color: "rgba(236, 72, 153, 0.4)" },
  ];

  return (
    <div className="min-h-screen bg-[#040508] text-gray-100 flex items-center justify-center relative overflow-hidden font-sans w-full p-4 select-none">
      
      {/* Immersive Starry and Laser Background Grid */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.01)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.01)_1px,transparent_1px)] bg-[size:24px_24px] pointer-events-none" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-[radial-gradient(circle_at_center,rgba(0,245,255,0.035),transparent_65%)] pointer-events-none blur-3xl" />
      
      {/* Floating Country-Flag Particles (Animated backdrops) */}
      {floatingFlags.map((item, idx) => (
        <div
          key={idx}
          className={`absolute hidden md:flex items-center gap-2.5 px-3 py-2 rounded-2xl bg-white/[0.01] border border-white/5 backdrop-blur-[2px] transition duration-500`}
          style={{
            left: item.x,
            top: item.y,
            boxShadow: `0 0 20px ${item.color}`,
          }}
        >
          <span className="text-xl filter drop-shadow">{item.flag}</span>
          <div className="text-left leading-none">
            <span className="text-[9px] text-gray-500 font-mono tracking-wider block uppercase">DNA ENGINE</span>
            <span className="text-[10px] text-gray-300 font-medium block mt-0.5">{item.label}</span>
          </div>
          {item.pulse && (
            <span className="absolute -top-1 -right-1 w-2 h-2 rounded-full bg-cyan-400 animate-ping" />
          )}
        </div>
      ))}

      {/* Main Glassmorphic Auth Panel */}
      <div className="w-full max-w-lg bg-[#0A0B10]/95 border border-white/10 p-8 rounded-3xl shadow-[0_20px_50px_rgba(0,0,0,0.8)] backdrop-blur-xl relative overflow-hidden space-y-6">
        
        {/* Glowing border effects */}
        <div className="absolute top-0 left-1/4 right-1/4 h-[2px] bg-gradient-to-r from-transparent via-cyan-400 to-transparent" />
        <div className="absolute top-0 right-0 w-32 h-32 bg-[#FF4ECD]/5 blur-2xl pointer-events-none" />
        
        <div className="text-center space-y-2">
          {/* Decorative Shield Emblem */}
          <div className="mx-auto w-12 h-12 rounded-2xl bg-gradient-to-tr from-cyan-400/20 to-pink-500/10 p-[1px] flex items-center justify-center mb-4">
            <div className="w-full h-full rounded-[15px] bg-[#040508] flex items-center justify-center text-[#00F5FF]">
              <Shield className="w-5 h-5 animate-pulse" />
            </div>
          </div>

          <h1 className="font-display font-extrabold text-2xl tracking-wider text-white">
            WORLD MUSIC CHAMPION SYSTEM
          </h1>
          <p className="text-xs text-gray-400 tracking-widest font-mono uppercase text-cyan-400">
            Sovereign Decent. Creative Intelligence OS
          </p>
        </div>

        <div className="h-px bg-white/5" />

        {/* Security and G-Drive details bullet metrics */}
        <div className="space-y-3 p-4 rounded-2xl bg-white/[0.01] border border-white/5 text-xs text-gray-400">
          <div className="flex items-start gap-3">
            <FolderSync className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
            <div>
              <span className="font-semibold text-white block">Immutable Google Drive Sync</span>
              <p className="text-[11px] text-gray-500 leading-relaxed mt-0.5">
                Authenticating mounts a secure sync gateway automatically storing versioned production assets under user-isolated G-Drive buckets.
              </p>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <Key className="w-4 h-4 text-[#00F5FF] shrink-0 mt-0.5" />
            <div>
              <span className="font-semibold text-white block">Cryptographic Secure JWT Store</span>
              <p className="text-[11px] text-gray-500 leading-relaxed mt-0.5">
                Passwordless architecture. Authentication utilizes cryptographically signed JSON Web Tokens for highest security protocol bounds.
              </p>
            </div>
          </div>
        </div>

        {/* Interactive Google OAuth Button / Progress states */}
        <div className="space-y-4">
          {!isAuthenticating ? (
            <button
              onClick={handleStartGoogleOAuth}
              className="w-full bg-white text-black hover:bg-gray-100 font-sans font-bold py-3.5 px-6 rounded-2xl transition duration-200 cursor-pointer flex items-center justify-center gap-3 shadow-lg transform active:scale-95 text-sm"
              id="btn-google-oauth-trigger"
            >
              {/* Google stylized vector icon */}
              <svg className="w-4.5 h-4.5 shrink-0" viewBox="0 0 24 24">
                <path
                  fill="#EA4335"
                  d="M12.24 10.285V14.4h6.887c-.275 1.565-1.88 4.604-6.887 4.604-4.33 0-7.859-3.578-7.859-8s3.53-8 7.859-8c2.46 0 4.105 1.025 5.047 1.926l3.227-3.107C18.28 1.944 15.44 1 12.24 1c-6.075 0-11 4.925-11 11s4.925 11 11 11c6.34 0 10.56-4.462 10.56-10.75 0-.725-.075-1.275-.175-1.965h-10.385z"
                />
              </svg>
              <span>Continue with Google Account</span>
            </button>
          ) : (
            <div className="space-y-2 p-4.5 bg-black/60 rounded-2xl border border-cyan-500/20 font-mono text-[11px] leading-relaxed">
              <div className="flex items-center justify-between pb-2 border-b border-white/5 mb-2">
                <p className="text-gray-400 font-semibold flex items-center gap-1.5 uppercase tracking-wide">
                  <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-ping" />
                  AUTHENTICATION PROTOCOL STACK
                </p>
                <p className="text-cyan-400">{Math.round((authStep / authSequence.length) * 100)}%</p>
              </div>

              {/* Staggered progress steps details output */}
              <div className="space-y-1 text-gray-300">
                {authSequence.slice(0, authStep + 1).map((s, idx) => {
                  const isCurrent = idx === authStep;
                  return (
                    <div key={idx} className="flex gap-2 items-center">
                      <span className={isCurrent ? "text-cyan-400 animate-pulse" : "text-emerald-400"}>
                        {isCurrent ? "▶" : "✓"}
                      </span>
                      <p className={isCurrent ? "text-white font-medium" : "text-gray-500"}>
                        {s.text}
                      </p>
                    </div>
                  );
                })}
              </div>

              {/* Progress bar spacer */}
              <div className="w-full bg-white/5 rounded-full h-1 mt-3 overflow-hidden">
                <div 
                  className="bg-[#00F5FF] h-1 rounded-full transition-all duration-300"
                  style={{ width: `${(authStep / authSequence.length) * 100}%` }}
                />
              </div>
            </div>
          )}
        </div>

        <div className="text-center">
          <p className="text-[10px] text-gray-600 font-mono">
            SECURE SANDBOX AGENT LAYER — DECENTRALIZED LITELLM ROUTER ACTIVE
          </p>
        </div>

      </div>
    </div>
  );
}
