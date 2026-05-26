import React, { useState } from "react";
import { AgentInfo, AgentStatus } from "../types";
import { Cpu, ShieldAlert, Wifi, HardDrive, RefreshCcw, Power, Check, Terminal } from "lucide-react";

interface MonitorProps {
  onAddLog: (type: string, name: string, message: string, status: string) => void;
}

export default function Monitor({ onAddLog }: MonitorProps) {
  // Detailed metadata for all 17 core agent nodes
  const [agents, setAgents] = useState<AgentInfo[]>([
    { id: "01", name: "Agent 01", role: "Country Research Authority", status: "PASS", progress: 100, currentTask: "Idle (Brief Cached)", latencyMs: 24, outputLog: ["Extracted Core US-West Coast rhythm models.", "Validating CVA country limits...", "Database soft lock verified."] },
    { id: "02", name: "Agent 02", role: "Genre Intelligence Inspector", status: "PASS", progress: 100, currentTask: "Idle (Data Sync)", latencyMs: 18, outputLog: ["Genre bounds check: Hip-Hop, Electro-Folk", "BPM subsets verified <140 steps", "Structure schemas synced."] },
    { id: "03", name: "Agent 03", role: "Subgenre DNA Specialist", status: "PASS", progress: 100, currentTask: "Idle (Lock Applied)", latencyMs: 31, outputLog: ["Subgenre code loaded: US-UNDERGROUND", "Vocabulary array: 30+ keywords verified", "Hook constraints pass."] },
    { id: "04", name: "Agent 04", role: "Lyrics Engineering Engine", status: "IDLE", progress: 0, currentTask: "Awaiting pipeline init", latencyMs: 215, outputLog: ["Awaiting strategic brief anchor signal."] },
    { id: "05", name: "Agent 05", role: "Title Engineering Architect", status: "IDLE", progress: 0, currentTask: "Awaiting pipeline init", latencyMs: 94, outputLog: ["Title generator index primed."] },
    { id: "06", name: "Agent 06", role: "Music Style Blueprint Model", status: "IDLE", progress: 0, currentTask: "Awaiting pipeline init", latencyMs: 110, outputLog: ["Production arrangement layers idle."] },
    { id: "07", name: "Agent 07", role: "10-Pillar Song Auditor", status: "IDLE", progress: 0, currentTask: "Awaiting convergence gate", latencyMs: 312, outputLog: ["CVA 10-criteria weights map parsed."] },
    { id: "08", name: "Agent 08", role: "Video Concept Creator", status: "IDLE", progress: 0, currentTask: "Awaiting QA step completion", latencyMs: 260, outputLog: ["Storyboards matrix array ready."] },
    { id: "09", name: "Agent 09", role: "Video Frame Prompters", status: "IDLE", progress: 0, currentTask: "Awaiting concept lock", latencyMs: 140, outputLog: ["Diffusion weights model loaded."] },
    { id: "10", name: "Agent 10", role: "Thumbnail Illustrator", status: "IDLE", progress: 0, currentTask: "Awaiting concept lock", latencyMs: 198, outputLog: ["Illustration styles registry static."] },
    { id: "11", name: "Agent 11", role: "SEO Metadata Packager", status: "IDLE", progress: 0, currentTask: "Awaiting distribution wave", latencyMs: 56, outputLog: ["Dynamic keyword indexing idle."] },
    { id: "12", name: "Agent 12", role: "Platform Automation Deployer", status: "IDLE", progress: 0, currentTask: "Awaiting human authorization", latencyMs: 405, outputLog: ["API socket headers dry mock."] },
    { id: "13", name: "Agent 13", role: "Catalog Immutable Archiver", status: "PASS", progress: 100, currentTask: "Monitoring active cache", latencyMs: 20, outputLog: ["Serial allocation state synced.", "SQLite database mirrors aligned."] },
    { id: "14", name: "Agent 14", role: "Underground Radar Scanner", status: "ACTIVE", progress: 65, currentTask: "Scanning Saturday underground charts", latencyMs: 512, outputLog: ["Fetching charts from lagos-underground...", "Trend deviation detected (+14.2% Gqom)"] },
    { id: "15", name: "Agent 15", role: "Session Replay memory Fabric", status: "PASS", progress: 100, currentTask: "Monitoring states stream", latencyMs: 15, outputLog: ["State buffer synced at 0Hz frequency."] },
    { id: "16", name: "Agent 16", role: "Video Asset Compiling Editor", status: "IDLE", progress: 0, currentTask: "Awaiting video layout files", latencyMs: 180, outputLog: ["Framer layouts engine static."] },
    { id: "17", name: "Agent 17", role: "Human Override Triage Supervisor", status: "ACTIVE", progress: 100, currentTask: "Monitoring escalation bus", latencyMs: 8, outputLog: ["No active high-stakes blockage queues.", "SLA timing counts: 0sec."] }
  ]);

  const [selectedAgentId, setSelectedAgentId] = useState<string>("01");
  const activeAgent = agents.find(a => a.id === selectedAgentId) || agents[0];

  const handleToggleState = (id: string) => {
    setAgents(prev => prev.map(a => {
      if (a.id === id) {
        const nextStatus: AgentStatus = a.status === "ACTIVE" ? "PASS" : "ACTIVE";
        onAddLog("AGE", "MANUAL_STATE_OVERRIDE", `${a.name} overridden to state: ${nextStatus}. System updated.`, "WARNING");
        return {
          ...a,
          status: nextStatus,
          currentTask: nextStatus === "ACTIVE" ? "Manual triage trigger" : "Awaiting sync"
        };
      }
      return a;
    }));
  };

  return (
    <div className="space-y-6">
      {/* Network health panel */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="glass-panel p-4.5 rounded-xl flex items-center gap-4 border-cyan-500/10">
          <div className="w-10 h-10 rounded-xl bg-cyan-500/10 flex items-center justify-center text-cyan-400">
            <Wifi className="w-5 h-5" />
          </div>
          <div>
            <h4 className="text-xs font-mono text-gray-400">AI PROV ROUTER (LiteLLM)</h4>
            <p className="text-sm font-sans font-semibold text-white mt-0.5">3-Stream Failover Activated</p>
          </div>
        </div>

        <div className="glass-panel p-4.5 rounded-xl flex items-center gap-4">
          <div className="w-10 h-10 rounded-xl bg-purple-500/10 flex items-center justify-center text-purple-400">
            <Cpu className="w-5 h-5" />
          </div>
          <div>
            <h4 className="text-xs font-mono text-gray-400">AVERAGE MODEL LATENCY</h4>
            <p className="text-sm font-sans font-semibold text-white mt-0.5">142ms Response Cycle</p>
          </div>
        </div>

        <div className="glass-panel p-4.5 rounded-xl flex items-center gap-4 border-emerald-500/10">
          <div className="w-10 h-10 rounded-xl bg-emerald-500/10 flex items-center justify-center text-emerald-400">
            <HardDrive className="w-5 h-5" />
          </div>
          <div>
            <h4 className="text-xs font-mono text-gray-400">MEMORY GRAPH FABRIC</h4>
            <p className="text-sm font-sans font-semibold text-white mt-0.5">Neo4j + Redis Hot Persistent</p>
          </div>
        </div>
      </div>

      {/* Grid structure displaying the 17 agents */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* The 17 Agents Grid */}
        <div className="lg:col-span-2 space-y-4">
          <div className="flex justify-between items-center px-1">
            <h3 className="font-display font-semibold text-lg text-white">Sovereign 17-Agent Grid</h3>
            <span className="text-xs font-mono text-gray-400">Select any node for diagnostic inspection</span>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-3.5">
            {agents.map((agent) => {
              const isSelected = selectedAgentId === agent.id;
              
              let statusBg = "bg-gray-500/15 text-gray-400 border-white/5";
              let dotBg = "bg-gray-500";
              if (agent.status === "PASS") {
                statusBg = "bg-emerald-500/10 text-emerald-300 border-emerald-500/15";
                dotBg = "bg-emerald-400 shadow-[0_0_8px_#10b981]";
              } else if (agent.status === "ACTIVE") {
                statusBg = "bg-cyan-500/10 text-cyan-300 border-cyan-500/20";
                dotBg = "bg-cyan-400 animate-pulse shadow-[0_0_10px_#22d3ee]";
              } else if (agent.status === "FAIL" || agent.status === "BLOCK") {
                statusBg = "bg-rose-500/10 text-rose-300 border-rose-500/25";
                dotBg = "bg-rose-500 animate-ping";
              }

              return (
                <div
                  key={agent.id}
                  onClick={() => setSelectedAgentId(agent.id)}
                  className={`p-4 rounded-2xl cursor-pointer transition-all duration-200 border relative ${
                    isSelected 
                      ? "bg-white/10 border-cyan-400/40 glow-cyan scale-[1.02]" 
                      : "bg-white/[0.02] border-white/5 hover:border-white/10"
                  }`}
                >
                  <div className="flex justify-between items-center">
                    <span className="text-[11px] font-mono text-gray-500">Node {agent.id}</span>
                    <span className={`w-2 h-2 rounded-full ${dotBg}`} />
                  </div>

                  <h4 className="font-display font-medium text-sm text-white mt-2 truncate">
                    {agent.name}
                  </h4>
                  <p className="text-[10px] text-gray-400 mt-0.5 truncate">{agent.role}</p>

                  <div className="flex justify-between items-center mt-4">
                    <span className={`text-[9px] font-mono font-medium px-2 py-0.5 rounded-full border ${statusBg}`}>
                      {agent.status}
                    </span>
                    <span className="text-[10px] text-gray-500 font-mono">{agent.latencyMs}ms</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Selected Agent Inspector */}
        <div className="glass-panel p-5 rounded-2xl flex flex-col justify-between h-[450px]">
          <div className="space-y-4">
            <div className="pb-3 border-b border-white/5">
              <span className="text-[10px] font-mono text-cyan-400 uppercase">Interactive Triage Inspector</span>
              <h3 className="font-display font-bold text-xl text-white mt-1">
                {activeAgent.name}: {activeAgent.role}
              </h3>
            </div>

            {/* Stats Block */}
            <div className="grid grid-cols-2 gap-3 text-xs font-mono">
              <div className="p-2.5 bg-white/[0.01] border border-white/5 rounded-xl">
                <span className="text-gray-500 block text-[10px]">CURRENT ASSIGN:</span>
                <span className="text-white mt-1 block font-sans truncate">{activeAgent.currentTask}</span>
              </div>
              <div className="p-2.5 bg-white/[0.01] border border-white/5 rounded-xl">
                <span className="text-gray-500 block text-[10px]">AVG LATENCY:</span>
                <span className="text-cyan-400 mt-1 block">{activeAgent.latencyMs}ms</span>
              </div>
            </div>

            {/* Stream monitor terminal */}
            <div className="rounded-xl bg-black/60 p-3.5 border border-white/5 font-mono text-[11px] leading-relaxed relative flex flex-col h-44 overflow-y-auto">
              <div className="text-gray-500 pb-1.5 border-b border-white/5 flex items-center justify-between">
                <span className="flex items-center gap-1.5"><Terminal className="w-3.5 h-3.5" /> Output logs stream</span>
                <span className="text-[9px] text-emerald-400">ACTIVE</span>
              </div>
              <div className="space-y-1.5 mt-2.5 flex-1 pr-1 text-gray-300">
                {activeAgent.outputLog.map((line, idx) => (
                  <p key={idx} className="leading-normal">&gt; {line}</p>
                ))}
              </div>
            </div>
          </div>

          {/* Action Toggle Triage buttons */}
          <div className="pt-4 border-t border-white/5 flex gap-2">
            <button
              onClick={() => handleToggleState(activeAgent.id)}
              className="flex-1 flex items-center justify-center gap-2 bg-gradient-to-r from-cyan-500/20 to-indigo-500/10 hover:from-cyan-400/30 hover:to-indigo-400/20 text-cyan-300 hover:text-white border border-cyan-400/20 p-2.5 rounded-xl text-xs font-semibold cursor-pointer select-none"
            >
              <Power className="w-3.5 h-3.5" />
              <span>Toggle Status</span>
            </button>
            <button
              onClick={() => {
                onAddLog("AGE", "MANUAL_REBOOT", `Manual instruction trigger reboot on node: ${activeAgent.name}. Refreshing pipeline cache.`, "INFO");
                alert(`Manual cycle reboot sent to ${activeAgent.name}. State cache cleared successful.`);
              }}
              className="bg-white/5 hover:bg-white/10 border border-white/10 text-white p-2.5 rounded-xl text-xs flex items-center justify-center cursor-pointer"
              title="Manual Override Reboot"
            >
              <RefreshCcw className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

      </div>
    </div>
  );
}
