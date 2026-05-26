import React, { useState, useEffect } from "react";
import Sidebar from "./components/Sidebar";
import Dashboard from "./components/Dashboard";
import Workspace from "./components/Workspace";
import Monitor from "./components/Monitor";
import Catalog from "./components/Catalog";
import CountryHub from "./components/CountryHub";
import AdminPanel from "./components/AdminPanel";
import LoginGate from "./components/LoginGate";
import { SongProject, EventLogEntry } from "./types";
import { User, Shield, HelpCircle, HardDriveUpload, Check, Heart, Bell, LogOut } from "lucide-react";

export default function App() {
  const [activePage, setActivePage] = useState<string>("dashboard");
  
  // Google OAuth Logged in identity configurations from state hooked into localStorage
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(() => {
    return localStorage.getItem("wmcs_logged_in") === "true";
  });
  const [userNick, setUserNick] = useState<string>(() => {
    return localStorage.getItem("wmcs_user_nick") || "Robin Hud (L1 Creator)";
  });
  const [userEmail, setUserEmail] = useState<string>(() => {
    return localStorage.getItem("wmcs_user_email") || "mdrobinhud75@gmail.com";
  });

  const handleLoginSuccess = (email: string, nick: string) => {
    localStorage.setItem("wmcs_logged_in", "true");
    localStorage.setItem("wmcs_user_email", email);
    localStorage.setItem("wmcs_user_nick", nick);
    setUserEmail(email);
    setUserNick(nick);
    setIsLoggedIn(true);
    handleAddLog("IE", "GOOGLE_OAUTH_SUCCESS", `Google OAuth handshake complete. Syncing storage paths.`, "SUCCESS");
  };

  const handleSignOut = () => {
    localStorage.removeItem("wmcs_logged_in");
    setIsLoggedIn(false);
  };
  
  // Consolidated global song catalog state loaded from server/memory
  const [songs, setSongs] = useState<SongProject[]>([]);
  const [recentLogs, setRecentLogs] = useState<EventLogEntry[]>([]);
  
  // Global simulated token counters
  const [tokenAllocations, setTokenAllocations] = useState({ a: 140, b: 290, c: 90 });

  // Load initial logs & completed catalog values from server
  const fetchLogs = async () => {
    try {
      const res = await fetch("/api/v1/logs");
      const data = await res.json();
      setRecentLogs(data.eventLog || []);
    } catch (err) {
      console.warn("Failed REST polling for logs:", err);
    }
  };

  const fetchCatalog = async () => {
    try {
      const res = await fetch("/api/v1/catalog");
      const data = await res.json();
      setSongs(data.catalog || []);
    } catch (err) {
      console.warn("Failed REST polling for catalog:", err);
    }
  };

  useEffect(() => {
    fetchLogs();
    fetchCatalog();
    // Poll logs occasionally to show real-time stream sync on Mission Control
    const interval = setInterval(() => {
      fetchLogs();
      fetchCatalog();
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  // Post new event logs
  const handleAddLog = async (type: string, name: string, message: string, status: string) => {
    try {
      const response = await fetch("/api/v1/logs", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ type, eventName: name, message, status })
      });
      const data = await response.json();
      setRecentLogs(prev => [data, ...prev]);
    } catch (err) {
      console.error(err);
    }
  };

  // Add newly generated World Champion song to catalog memory on server
  const handleAddSong = async (song: any) => {
    try {
      await fetch("/api/v1/catalog", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(song)
      });
      fetchCatalog();
    } catch (err) {
      console.error(err);
    }
  };

  // Switch specifically to creative workspace
  const handleSelectProject = (projectId: string) => {
    setActivePage("studio");
  };

  if (!isLoggedIn) {
    return <LoginGate onLoginSuccess={handleLoginSuccess} />;
  }

  return (
    <div className="bg-[#040508] min-h-screen text-gray-100 font-sans relative overflow-hidden flex">
      
      {/* Visual background ambient grids */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.01)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.01)_1px,transparent_1px)] bg-[size:32px_32px] pointer-events-none" />
      <div className="absolute top-[-30%] left-[-10%] w-[80%] h-[60%] bg-[radial-gradient(ellipse_at_center,rgba(0,245,255,0.05),transparent_60%)] pointer-events-none blur-3xl" />
      <div className="absolute bottom-[-20%] right-[-15%] w-[60%] h-[50%] bg-[radial-gradient(ellipse_at_center,rgba(99,102,241,0.05),transparent_55%)] pointer-events-none blur-3xl" />

      {/* Persistent Left Sidebar Navigation */}
      <Sidebar 
        activePage={activePage} 
        setActivePage={setActivePage} 
        urgentNotifications={activePage === 'admin' ? 0 : 1}
      />

      {/* Content Frame */}
      <div className="flex-1 pl-72 min-h-screen flex flex-col justify-between">
        
        {/* Top workspace navigation bar */}
        <header className="h-[74px] border-b border-white/[0.04] px-8 flex items-center justify-between sticky top-0 bg-[#040508]/80 backdrop-blur-md z-30">
          {/* Breadcrumbs mapping */}
          <div className="flex items-center gap-2 font-mono text-[11px] tracking-widest text-gray-500 uppercase">
            <span className="hover:text-white transition duration-150 cursor-pointer" onClick={() => setActivePage("dashboard")}>
              Sovereign Operating System
            </span>
            <span>/</span>
            <span className="text-white font-medium">
              {activePage === "dashboard" ? "Command center" : activePage.toUpperCase()}
            </span>
          </div>

          {/* User ID profile information */}
          <div className="flex items-center gap-6">
            {/* Sync diagnostics */}
            <div className="hidden md:flex items-center gap-2 bg-emerald-500/[0.03] border border-emerald-500/10 rounded-full px-3 py-1 font-mono text-[10px] text-emerald-400">
              <Check className="w-3 h-3" />
              <span>G-DRIVE IMMUTABLE CLOUD LOCK</span>
            </div>

            {/* Profile widget */}
            <div className="flex items-center gap-3 bg-white/[0.02] border border-white/5 pl-2.5 pr-4 py-1.5 rounded-xl text-xs font-sans relative group">
              <div className="w-7 h-7 rounded-lg bg-cyan-400/10 text-cyan-400 border border-cyan-400/25 flex items-center justify-center font-bold">
                <User className="w-4 h-4" />
              </div>
              <div className="text-left font-sans">
                <span className="text-white block font-semibold leading-none">{userNick}</span>
                <span className="text-[10px] text-gray-500 block mt-0.5 font-mono">{userEmail}</span>
              </div>
              
              {/* Interactive Sign out popup / action overlay */}
              <button
                onClick={handleSignOut}
                className="ml-2 p-1.5 rounded bg-white/5 hover:bg-rose-500/10 hover:text-rose-400 transition text-gray-400 cursor-pointer"
                title="Disconnect Google OAuth"
              >
                <LogOut className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </header>

        {/* Dynamic Page Views rendering */}
        <main className="p-8 flex-1 overflow-y-auto max-w-7xl w-full mx-auto">
          {activePage === "dashboard" && (
            <Dashboard 
              songs={songs} 
              recentLogs={recentLogs} 
              onStartNewPipeline={() => setActivePage("studio")} 
              onSelectProject={handleSelectProject}
              tokenAllocations={tokenAllocations}
            />
          )}

          {activePage === "studio" && (
            <Workspace 
              onAddSong={handleAddSong} 
              onAddLog={handleAddLog} 
            />
          )}

          {activePage === "monitor" && (
            <Monitor 
              onAddLog={handleAddLog} 
            />
          )}

          {activePage === "catalog" && (
            <Catalog 
              catalog={songs} 
              onSelectProject={handleSelectProject} 
            />
          )}

          {activePage === "countryhub" && (
            <CountryHub />
          )}

          {activePage === "admin" && (
            <AdminPanel 
              tokenAllocations={tokenAllocations} 
              onSetTokens={setTokenAllocations} 
              onAddLog={handleAddLog} 
            />
          )}
        </main>

        {/* Consolidated sovereign system footer */}
        <footer className="h-12 border-t border-white/[0.03] flex items-center justify-between px-8 text-[11px] font-mono text-gray-500">
          <span>WORLD MUSIC CHAMPION SYSTEM — 2026</span>
          <div className="flex gap-4">
            <span className="flex items-center gap-1.5"><Heart className="w-3.5 h-3.5 text-rose-500 fill-rose-500" /> Human absolute authority Tier 0 locked</span>
          </div>
        </footer>

      </div>

    </div>
  );
}
