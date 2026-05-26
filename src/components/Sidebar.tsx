import React, { useState, useEffect } from "react";
import { 
  Tv, 
  Activity, 
  Disc, 
  Sparkles, 
  ShieldAlert, 
  Globe2,
  Lock,
  Compass,
  Layers,
  Flame,
  Radio
} from "lucide-react";

interface SidebarProps {
  activePage: string;
  setActivePage: (page: string) => void;
  urgentNotifications: number;
}

export default function Sidebar({ activePage, setActivePage, urgentNotifications }: SidebarProps) {
  // Let's model all 9 primary system levels
  const menuItems = [
    { id: "dashboard", label: "Mission Control", desc: "Level 01: System Status", icon: Tv, badge: null },
    { id: "countryhub", label: "Cultural Hubs", desc: "Level 02: Country DNA", icon: Globe2, badge: "21+" },
    { id: "studio", label: "Pipeline Studio", desc: "Level 03: Creation Loop", icon: Sparkles, badge: "ACTIVE" },
    { id: "monitor", label: "17-Agent Rail", desc: "Level 04: Realtime Telemetry", icon: Activity, badge: null },
    { id: "catalog", label: "Catalog Archive", desc: "Level 05: Immutable Index", icon: Disc, badge: null },
    { id: "admin", label: "Agent Supervisor", desc: "Level 06: Human Gate overrides", icon: ShieldAlert, badge: urgentNotifications > 0 ? `${urgentNotifications} REQ` : null }
  ];

  // 17-agent nodes telemetry state sequence
  // We model their status to pulse / PASS matching the Monitor page, or trigger organic telemetry blips!
  const [nodes, setNodes] = useState([
    { id: "01", name: "Country Research", status: "PASS" },
    { id: "02", name: "Genre Intelligence", status: "PASS" },
    { id: "03", name: "Subgenre DNA Specialist", status: "PASS" },
    { id: "04", name: "Lyrics Engineering", status: "IDLE" },
    { id: "05", name: "Title Engine", status: "IDLE" },
    { id: "06", name: "Music Style Blueprint", status: "IDLE" },
    { id: "07", name: "10-Pillar auditor", status: "IDLE" },
    { id: "08", name: "Video Concept Creator", status: "IDLE" },
    { id: "09", name: "Video Prompt Engine", status: "IDLE" },
    { id: "10", name: "Thumbnail Illustrator", status: "IDLE" },
    { id: "11", name: "SEO Metadata Packager", status: "IDLE" },
    { id: "12", name: "Platform Deployer", status: "IDLE" },
    { id: "13", name: "Catalog Archiver", status: "PASS" },
    { id: "14", name: "Underground Radar", status: "ACTIVE" },
    { id: "15", name: "Memory Fabric Sync", status: "PASS" },
    { id: "16", name: "Video Layout Editor", status: "IDLE" },
    { id: "17", name: "Human Supervisor", status: "ACTIVE" }
  ]);

  // Adjust active status based on which page we are on
  useEffect(() => {
    if (activePage === "studio") {
      // In the studio, the creation modules are live!
      setNodes(prev => prev.map(n => {
        if (["04", "05", "06", "07"].includes(n.id)) {
          return { ...n, status: "ACTIVE" };
        }
        return n;
      }));
    } else {
      setNodes(prev => prev.map(n => {
        if (["04", "05", "06", "07"].includes(n.id)) {
          return { ...n, status: "IDLE" };
        }
        return n;
      }));
    }
  }, [activePage]);

  // Simulate subtle hot-reloading telemetry blips organically every few seconds
  useEffect(() => {
    const timer = setInterval(() => {
      setNodes(prev => prev.map(n => {
        // Occasionally let the active scanner (Agent 14) pulse or blip
        if (n.id === "14") {
          return { ...n, status: Math.random() > 0.3 ? "ACTIVE" : "PASS" };
        }
        return n;
      }));
    }, 3500);
    return () => clearInterval(timer);
  }, []);

  return (
    <aside className="w-72 glass-panel h-screen fixed left-0 top-0 z-40 flex flex-col justify-between py-6 px-4 border-r border-white/10 bg-[#0A0B10]/95 shadow-[8px_0_30px_rgba(0,0,0,0.6)] backdrop-blur-xl">
      <div>
        {/* Brand System Logo */}
        <div className="flex items-center gap-3 px-3 mb-6.5 select-none hover:opacity-90 transition cursor-pointer" onClick={() => setActivePage("dashboard")}>
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-[#00F5FF] to-[#FF4ECD] p-[1.5px] shadow-[0_0_15px_rgba(0,245,255,0.3)]">
            <div className="w-full h-full rounded-[9px] bg-[#040508] flex items-center justify-center">
              <span className="font-display font-extrabold text-white text-lg tracking-tighter">W</span>
            </div>
          </div>
          <div className="text-left font-sans">
            <h1 className="font-display font-bold text-white tracking-wider text-[15px] leading-none">WMCS ENGINE</h1>
            <span className="text-[9px] text-[#00F5FF] uppercase tracking-widest font-mono font-medium block mt-1">Sovereign OS v3.0</span>
          </div>
        </div>

        {/* 9 System Levels Nav Menu */}
        <div className="space-y-1">
          <span className="text-[9px] font-mono tracking-widest text-gray-500 block px-3 uppercase mb-1.5">
            Decentralized Levels
          </span>
          <nav className="space-y-1">
            {menuItems.map((item) => {
              const Icon = item.icon;
              const isActive = activePage === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => setActivePage(item.id)}
                  className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl transition-all duration-200 cursor-pointer text-left select-none group border ${
                    isActive 
                      ? "bg-white/10 text-white font-medium border-white/10 shadow-[inset_1px_1px_5px_rgba(255,255,255,0.05)] translate-x-1"
                      : "text-gray-400 hover:bg-white/[0.03] hover:text-white border-transparent"
                  }`}
                >
                  <div className="flex items-center gap-3 truncate">
                    <div className={`p-1.5 rounded-lg transition-colors ${
                      isActive ? "bg-cyan-500/10 text-cyan-300" : "bg-white/[0.02] text-gray-500 group-hover:text-white"
                    }`}>
                      <Icon className="w-4 h-4 shrink-0" />
                    </div>
                    <div className="truncate leading-normal">
                      <span className="text-xs font-semibold block">{item.label}</span>
                      <span className="text-[9px] text-gray-500 block leading-tight mt-0.5 font-mono">{item.desc}</span>
                    </div>
                  </div>
                  {item.badge && (
                    <span className={`text-[8.5px] font-mono font-medium px-2 py-0.5 rounded-full ${
                      item.badge.includes("REQ") 
                        ? "bg-amber-500/25 text-amber-300 animate-pulse border border-amber-500/30"
                        : item.badge === "ACTIVE"
                          ? "bg-[#FF4ECD]/20 text-[#FF4ECD] border border-[#FF4ECD]/30"
                          : "bg-white/5 text-gray-300"
                    }`}>
                      {item.badge}
                    </span>
                  )}
                </button>
              );
            })}
          </nav>
        </div>
      </div>

      {/* Mini Pipeline Rail Panel: 17 Multi-agent live nodes matrix */}
      <div className="px-1 space-y-2 mt-4">
        <div className="flex items-center justify-between px-1">
          <span className="text-[9px] font-mono tracking-widest text-[#00F5FF] block uppercase font-semibold">
            17-Agent Rail Telemetry
          </span>
          <span className="h-1 w-1 rounded-full bg-emerald-400 animate-ping" />
        </div>

        <div className="bg-black/60 p-3 rounded-xl border border-white/5 space-y-2.5">
          {/* Node dot grid layout */}
          <div className="grid grid-cols-6 gap-2">
            {nodes.map((node) => {
              let dotClass = "bg-gray-500 border-white/5";
              if (node.status === "PASS") {
                dotClass = "bg-[#00E676] shadow-[0_0_8px_rgba(0,230,118,0.7)] border-emerald-500/20";
              } else if (node.status === "ACTIVE") {
                dotClass = "bg-[#00F5FF] animate-pulse shadow-[0_0_10px_rgba(0,245,255,0.8)] border-cyan-400/30";
              } else if (node.status === "FAIL" || node.status === "BLOCK") {
                dotClass = "bg-rose-500 animate-ping border-rose-500/30";
              }

              return (
                <div
                  key={node.id}
                  className="flex flex-col items-center justify-center cursor-pointer select-none relative group/node"
                  onClick={() => setActivePage("monitor")}
                >
                  <div className={`w-3.5 h-3.5 rounded-full border ${dotClass} transition-all duration-300 hover:scale-125`} />
                  <span className="text-[8px] font-mono text-gray-500 mt-1 leading-none">{node.id}</span>
                  
                  {/* Floating Micro-tooltip inside rail */}
                  <div className="absolute bottom-8 left-1/2 -translate-x-1/2 pointer-events-none opacity-0 group-hover/node:opacity-100 transition-opacity bg-black/95 border border-white/10 px-2 py-1 rounded text-[9px] text-white font-mono whitespace-nowrap z-50 shadow-2xl">
                    <span className="text-cyan-400 font-bold">Node {node.id}:</span> {node.name} ({node.status})
                  </div>
                </div>
              );
            })}
          </div>

          <div className="flex justify-between items-center text-[9px] font-mono text-gray-400 border-t border-white/5 pt-2">
            <span>RAIL INTEGRITY:</span>
            <span className="text-[#00E676] font-bold">NOMINAL (100%)</span>
          </div>
        </div>
      </div>

      {/* Footer Branding Info */}
      <div className="px-1 pt-3">
        <div className="p-3 rounded-xl bg-white/[0.02] border border-white/10 text-[10.5px] font-mono text-gray-400 space-y-1.5 leading-normal">
          <div className="flex justify-between">
            <span>CORE STATUS:</span>
            <span className="text-[#00E676] font-bold">ONLINE</span>
          </div>
          <div className="flex justify-between">
            <span>SYS LATENCY:</span>
            <span className="text-[#00F5FF]">14ms</span>
          </div>
          <div className="flex justify-between">
            <span>VERSION:</span>
            <span className="text-[#FF4ECD]">v3.0 CVA-2026</span>
          </div>
        </div>
      </div>
    </aside>
  );
}
