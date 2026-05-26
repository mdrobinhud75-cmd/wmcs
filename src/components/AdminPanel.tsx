import React, { useState } from "react";
import { 
  ShieldCheck, 
  Database, 
  FileText, 
  AlertTriangle, 
  Key, 
  Sliders, 
  RefreshCw, 
  Send, 
  Check, 
  HardDrive, 
  Layers, 
  FolderSync, 
  Network, 
  Zap, 
  CloudLightning,
  Flame,
  Globe2
} from "lucide-react";

interface AdminProps {
  tokenAllocations: { a: number; b: number; c: number };
  onSetTokens: React.Dispatch<React.SetStateAction<{ a: number; b: number; c: number }>>;
  onAddLog: (type: string, name: string, message: string, status: string) => void;
}

export default function AdminPanel({ tokenAllocations, onSetTokens, onAddLog }: AdminProps) {
  const [promptVersion, setPromptVersion] = useState("v4.1.2 sovereign");
  const [activePreset, setActivePreset] = useState("COMPETITION_OPTIMIZED");
  const [modelTemp, setModelTemp] = useState(0.1);
  const [isSyncing, setIsSyncing] = useState(false);
  
  // Interactive database mock states
  const [dbStats, setDbStats] = useState({
    postgresKeys: 1405,
    redisKeys: 83,
    qdrantEmbeddings: 1290,
    neo4jIndices: 489,
    gdriveFiles: 42
  });

  const [dbStatus, setDbStatus] = useState<Record<string, "ONLINE" | "BUSY" | "SYNCED">>({
    postgres: "ONLINE",
    redis: "ONLINE",
    qdrant: "ONLINE",
    neo4j: "ONLINE",
    gdrive: "SYNCED"
  });

  const handleApplyPreset = () => {
    setIsSyncing(true);
    setTimeout(() => {
      setIsSyncing(false);
      onAddLog("IE", "SOVEREIGN_PRESET_UPDATE", `System orchestration weights update to: ${activePreset}. Temperature locked at ${modelTemp}.`, "GOLD");
      alert(`System-wide parameters updated to model: ${activePreset}!`);
    }, 1200);
  };

  const handleTriggerDbAction = (dbKey: string, actionName: string) => {
    setDbStatus(prev => ({ ...prev, [dbKey]: "BUSY" }));
    onAddLog("IE", `DB_${dbKey.toUpperCase()}_ACTION`, `Executing database cluster operation: ${actionName}...`, "INFO");

    setTimeout(() => {
      setDbStatus(prev => ({ ...prev, [dbKey]: "ONLINE" }));
      
      // Update sizes randomly as simulated progression
      setDbStats(prev => {
        const update: any = { ...prev };
        if (dbKey === "redis") {
          update.redisKeys += Math.floor(Math.random() * 5 + 1);
        } else if (dbKey === "qdrant") {
          update.qdrantEmbeddings += Math.floor(Math.random() * 10 + 2);
        } else if (dbKey === "neo4j") {
          update.neo4jIndices += Math.floor(Math.random() * 8 + 1);
        } else if (dbKey === "gdrive") {
          update.gdriveFiles += 1;
        }
        return update;
      });

      onAddLog("IE", `DB_${dbKey.toUpperCase()}_COMPLETE`, `Database action '${actionName}' completed with nominal latency metrics.`, "SUCCESS");
      alert(`Database Action Complete: Successfully completed '${actionName}'!`);
    }, 1000);
  };

  return (
    <div className="space-y-6">
      {/* Top Warning disclaimer */}
      <div className="bg-amber-500/10 border border-amber-500/20 p-4.5 rounded-2xl flex gap-3 text-sm text-gray-300">
        <AlertTriangle className="w-5 h-5 text-amber-400 shrink-0 mt-0.5 animate-pulse" />
        <div>
          <span className="font-semibold text-white block mb-0.5">High-Stakes Domain Supervisor System</span>
          Changes applied in this workspace are global and override standard autonamous agent rules. Use creative clearance codes with caution.
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

        {/* Console 1: Hot Prompt Versioning */}
        <div className="glass-panel p-6 rounded-2xl space-y-4">
          <h3 className="font-display font-semibold text-lg text-white flex items-center gap-2 pb-2 border-b border-white/5">
            <FileText className="w-5 h-5 text-cyan-400" />
            <span>Prompt Engine Registry</span>
          </h3>

          <div className="space-y-4 text-xs font-mono">
            <div>
              <span className="text-gray-500 block mb-1 text-[10px]">CURRENT SYSTEM TEMPLATE VER:</span>
              <div className="flex gap-2">
                <input
                  type="text"
                  value={promptVersion}
                  onChange={(e) => setPromptVersion(e.target.value)}
                  className="flex-1 bg-white/[0.03] border border-white/5 px-3 py-2 rounded-lg text-white text-xs select-none lowercase"
                />
                <button
                  onClick={() => {
                    onAddLog("AE", "PROMPT_ENGINE_ROLLBACK", `System prompt version updated manually to: ${promptVersion}. Keys verified.`, "WARNING");
                    alert(`Prompt firmware synced to ${promptVersion}.`);
                  }}
                  className="bg-cyan-500/15 border border-cyan-400/20 px-3 py-1 text-[11px] font-mono rounded-lg hover:bg-cyan-500/20 cursor-pointer text-cyan-300 select-none font-bold"
                >
                  Hot Sync
                </button>
              </div>
            </div>

            <div>
              <span className="text-gray-500 block mb-1.5 text-[10px]">AI MODEL SELECTION ROUTING (LiteLLM Tiers):</span>
              <div className="p-3 bg-white/[0.01] border border-white/5 rounded-xl space-y-2 text-[11px]">
                <div className="flex justify-between text-gray-400">
                  <span>Tier A (Research / Country):</span>
                  <span className="text-white">gemini-3.5-flash (Standard)</span>
                </div>
                <div className="flex justify-between text-gray-400">
                  <span>Tier B (Creation / lyrics):</span>
                  <span className="text-white">gemini-3.1-pro-preview</span>
                </div>
                <div className="flex justify-between text-gray-400 text-yellow-400 font-bold">
                  <span>Tier C (QA / 10-Pillars Evaluators):</span>
                  <span>gemini-3.1-pro-preview (Temperature Locked 0.1)</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Console 2: Performance Control & Presets */}
        <div className="glass-panel p-6 rounded-2xl h-full flex flex-col justify-between">
          <div className="space-y-4">
            <h3 className="font-display font-semibold text-lg text-white flex items-center gap-2 pb-2 border-b border-white/5">
              <Sliders className="w-5 h-5 text-purple-400" />
              <span>Orchestrator Settings</span>
            </h3>

            {/* Presets options */}
            <div className="space-y-3.5 text-xs">
              <div>
                <span className="text-gray-500 font-mono text-[10px] block mb-1.5 uppercase">Audit Validation Preset</span>
                <div className="grid grid-cols-2 gap-2 font-sans text-xs">
                  {[
                    { id: "COMPETITION_OPTIMIZED", label: "Competition Optimized", desc: "Heavy weighted anchors for micro-melodies" },
                    { id: "AUTONOMOUS_PASSIVE", label: "Autonomous Pass", desc: "Soft-check guidelines bypasses hard lock cycles" }
                  ].map((p) => (
                    <button
                      key={p.id}
                      onClick={() => setActivePreset(p.id)}
                      className={`p-3 rounded-xl border text-left cursor-pointer transition ${
                        activePreset === p.id
                          ? "bg-purple-500/10 border-purple-400/30 text-white"
                          : "bg-white/[0.01] border-white/5 text-gray-400 hover:text-white"
                      }`}
                    >
                      <span className="font-semibold block">{p.label}</span>
                      <span className="text-[10px] text-gray-500 mt-0.5 leading-normal block">{p.desc}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Temperature adjuster */}
              <div>
                <div className="flex justify-between text-[10px] font-mono text-gray-500 mb-1">
                  <span>QA TEMPERATURE REGULATOR:</span>
                  <span className="text-cyan-400">{modelTemp}</span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="1.0"
                  step="0.05"
                  value={modelTemp}
                  onChange={(e) => setModelTemp(parseFloat(e.target.value))}
                  className="w-full accent-cyan-400 h-1 bg-white/5 rounded-full cursor-pointer appearance-none"
                />
              </div>
            </div>
          </div>

          <button
            onClick={handleApplyPreset}
            disabled={isSyncing}
            className="w-full bg-gradient-to-r from-cyan-400 to-indigo-500 hover:from-cyan-300 hover:to-indigo-400 text-black font-semibold p-2.5 rounded-xl text-xs flex items-center justify-center gap-1.5 cursor-pointer mt-4 shadow-lg select-none disabled:opacity-55"
          >
            {isSyncing ? (
              <>
                <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                <span>SYNCING WEIGHT CONFIGS...</span>
              </>
            ) : (
              <>
                <Send className="w-3.5 h-3.5 stroke-[2.5px]" />
                <span>APPLY ORCHESTRATOR PARAMETERS</span>
              </>
            )}
          </button>
        </div>

      </div>

      {/* Database control section - Memory-Native Database and Storage Specification */}
      <div className="glass-panel p-6 rounded-2xl space-y-6">
        <div className="pb-3 border-b border-white/5 flex flex-col md:flex-row md:items-center justify-between gap-3">
          <div>
            <div className="flex items-center gap-2">
              <Database className="w-5 h-5 text-emerald-400" />
              <h3 className="font-display font-semibold text-base text-white">
                Memory-Native Database & Storage Specification
              </h3>
            </div>
            <p className="text-[10px] text-gray-500 mt-0.5">
              Visualizing the multi-tier hybrid telemetry and immutable backup system of the WMCS ecosystem.
            </p>
          </div>
          <div className="hidden sm:flex items-center gap-1.5 bg-emerald-500/10 border border-emerald-500/15 rounded-lg px-2.5 py-1 text-[10px] font-mono text-emerald-400">
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>FABRIC HEALTH CONFORMANT</span>
          </div>
        </div>

        {/* PostgreSQL Relational Schemas Overview */}
        <div className="space-y-3">
          <span className="text-[10px] font-mono text-[#00F5FF] block tracking-wider uppercase font-semibold">
            RELATIONAL TABLES INTEGRATION (POSTGRESQL / SUPABASE)
          </span>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-3 text-xs">
            {[
              { table: "Users", icon: "👤", desc: "Authenticated accounts & licensing tiers", records: 3 },
              { table: "Sessions/Pipelines", icon: "🔄", desc: "Durable active sequencer states", records: 2 },
              { table: "Agent_Runs", icon: "🤖", desc: "Aggregated PASS/RETRY executions log", records: 172 },
              { table: "DNA Packages", icon: "🧬", desc: "Versioned cultural, genre & subgenre facts", records: 21 },
              { table: "Catalog (Songs)", icon: "🎵", desc: "Official sovereign system of records", records: 8 }
            ].map((t) => (
              <div key={t.table} className="p-3 bg-white/[0.01] border border-white/5 rounded-xl hover:border-white/10 transition leading-normal">
                <span className="text-sm block filter drop-shadow">{t.icon}</span>
                <span className="font-semibold text-white block mt-1.5 font-display truncate">{t.table}</span>
                <p className="text-[9px] text-gray-500 leading-normal mt-0.5">{t.desc}</p>
                <div className="mt-3 flex justify-between font-mono text-[9px] text-gray-400 bg-white/5 px-2 py-0.5 rounded">
                  <span>RECORDS:</span>
                  <span className="text-[#00F5FF] font-bold">{t.records}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* 4-Layer Memory Fabric */}
        <div className="space-y-3 pt-2">
          <span className="text-[10px] font-mono text-[#FF4ECD] block tracking-wider uppercase font-semibold">
            4-LAYER COMPRESSED SYSTEM MEMORY FABRIC
          </span>
          
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            {/* Layer 1 Redis */}
            <div className="p-4 rounded-xl bg-gradient-to-b from-[#111827]/40 to-black/60 border border-white/5 space-y-3 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-24 h-1 bg-[#00F5FF]/10" />
              <div className="flex md:flex-col lg:flex-row lg:items-center justify-between gap-2 border-b border-white/5 pb-2">
                <div className="flex items-center gap-1.5 text-[#00F5FF]">
                  <Zap className="w-4 h-4" />
                  <span className="font-mono text-[11px] font-bold">L1: Redis Hot Store</span>
                </div>
                <span className={`text-[9px] font-mono font-bold px-1.5 py-0.5 rounded ${
                  dbStatus.redis === "BUSY" ? "bg-yellow-500/10 text-yellow-500" : "bg-emerald-500/10 text-emerald-400"
                }`}>
                  {dbStatus.redis}
                </span>
              </div>
              <p className="text-[10px] text-gray-400 leading-normal">
                Transient pipeline contexts & <span className="font-mono text-[9.5px] bg-white/5 px-1 rounded text-red-300">CONTINUE_FROM</span> session-resume tokens for immediate sub-millisecond restoration.
              </p>
              <div className="flex items-center justify-between pt-1">
                <span className="text-[9px] font-mono text-gray-500">KEYS: {dbStats.redisKeys}</span>
                <button
                  disabled={dbStatus.redis === "BUSY"}
                  onClick={() => handleTriggerDbAction("redis", "Purge and Flush Transient Keys")}
                  className="px-2 py-1 text-[9px] font-mono font-bold text-cyan-400 hover:text-white bg-white/5 hover:bg-cyan-500/20 border border-cyan-400/10 rounded cursor-pointer select-none"
                >
                  Clear Hot Cache
                </button>
              </div>
            </div>

            {/* Layer 2 PostgreSQL */}
            <div className="p-4 rounded-xl bg-gradient-to-b from-[#111827]/40 to-black/60 border border-white/5 space-y-3 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-24 h-1 bg-teal-500/10" />
              <div className="flex md:flex-col lg:flex-row lg:items-center justify-between gap-2 border-b border-white/5 pb-2">
                <div className="flex items-center gap-1.5 text-teal-400">
                  <Database className="w-4 h-4" />
                  <span className="font-mono text-[11px] font-bold">L2: Postgres Ephemeral</span>
                </div>
                <span className="bg-emerald-500/10 text-emerald-400 text-[9px] font-mono font-bold px-1.5 py-0.5 rounded">
                  ONLINE
                </span>
              </div>
              <p className="text-[10px] text-gray-400 leading-normal">
                Episodic log tracking agent execution flows, manual human decisions overrides, and historic compliance audit scores.
              </p>
              <div className="flex items-center justify-between pt-1">
                <span className="text-[9px] font-mono text-gray-500">ROWS: {dbStats.postgresKeys}</span>
                <span className="text-[9px] text-gray-500 font-mono">AUTONOMOUS</span>
              </div>
            </div>

            {/* Layer 3 Qdrant Vector DB */}
            <div className="p-4 rounded-xl bg-gradient-to-b from-[#111827]/40 to-black/60 border border-white/5 space-y-3 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-24 h-1 bg-[#FF4ECD]/10" />
              <div className="flex md:flex-col lg:flex-row lg:items-center justify-between gap-2 border-b border-white/5 pb-2">
                <div className="flex items-center gap-1.5 text-[#FF4ECD]">
                  <CloudLightning className="w-4 h-4" />
                  <span className="font-mono text-[11px] font-bold">L3: Qdrant Vector</span>
                </div>
                <span className={`text-[9px] font-mono font-bold px-1.5 py-0.5 rounded ${
                  dbStatus.qdrant === "BUSY" ? "bg-yellow-500/10 text-yellow-500" : "bg-emerald-500/10 text-emerald-400"
                }`}>
                  {dbStatus.qdrant}
                </span>
              </div>
              <p className="text-[10px] text-gray-400 leading-normal">
                Semantic memory vectors stores storing lyrics benchmarks, successful briefs, and previous competition scoring grids.
              </p>
              <div className="flex items-center justify-between pt-1">
                <span className="text-[9px] font-mono text-gray-500">EMBEDS: {dbStats.qdrantEmbeddings}</span>
                <button
                  disabled={dbStatus.qdrant === "BUSY"}
                  onClick={() => handleTriggerDbAction("qdrant", "Rebuild Embedding Index Clusters")}
                  className="px-2 py-1 text-[9px] font-mono font-bold text-[#FF4ECD] hover:text-white bg-white/5 hover:bg-[#FF4ECD]/20 border border-[#FF4ECD]/10 rounded cursor-pointer select-none"
                >
                  Recalculate RAG
                </button>
              </div>
            </div>

            {/* Layer 4 Neo4j Graph DB */}
            <div className="p-4 rounded-xl bg-gradient-to-b from-[#111827]/40 to-black/60 border border-white/5 space-y-3 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-24 h-1 bg-amber-500/10" />
              <div className="flex md:flex-col lg:flex-row lg:items-center justify-between gap-2 border-b border-white/5 pb-2">
                <div className="flex items-center gap-1.5 text-amber-400">
                  <Network className="w-4 h-4" />
                  <span className="font-mono text-[11px] font-bold">L4: Neo4j Graph Store</span>
                </div>
                <span className={`text-[9px] font-mono font-bold px-1.5 py-0.5 rounded ${
                  dbStatus.neo4j === "BUSY" ? "bg-yellow-500/10 text-yellow-500" : "bg-emerald-500/10 text-emerald-400"
                }`}>
                  {dbStatus.neo4j}
                </span>
              </div>
              <p className="text-[10px] text-gray-400 leading-normal">
                Structural Graph modeling relation patterns between cultural regions, genres, competition parameters, and chart dynamics.
              </p>
              <div className="flex items-center justify-between pt-1">
                <span className="text-[9px] font-mono text-gray-500">EDGES: {dbStats.neo4jIndices}</span>
                <button
                  disabled={dbStatus.neo4j === "BUSY"}
                  onClick={() => handleTriggerDbAction("neo4j", "Remap Graph Structural Interconnections")}
                  className="px-2 py-1 text-[9px] font-mono font-bold text-amber-400 hover:text-white bg-white/5 hover:bg-amber-500/15 border border-amber-500/10 rounded cursor-pointer select-none"
                >
                  Re-Graph Map
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Source of Truth - Google Drive Sync Setup */}
        <div className="bg-black/35 rounded-xl border border-white/5 p-4.5 text-xs flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-start gap-3.5 leading-normal">
            <div className="w-9 h-9 rounded-xl bg-blue-500/10 flex items-center justify-center text-blue-400 shrink-0">
              <FolderSync className="w-5 h-5" />
            </div>
            <div>
              <span className="font-semibold text-white block">Immutable Platform Sync Source of Truth</span>
              <p className="text-gray-400 text-[11px] leading-relaxed mt-0.5">
                Every validated song pipeline automatically compiles folder trees under <span className="text-[#00F5FF] font-mono">Google Drive/WMCS_Archive/{"{Year}"}/{"{Region}"}/{"{Serial}"}/</span> containing the finalized lyrics, audio blueprints, generated artworks and platform logs.
              </p>
            </div>
          </div>
          <div className="flex items-center gap-3 shrink-0 w-full md:w-auto">
            <div className="text-right font-mono text-[10px] text-gray-500 hidden md:block">
              <span>SYNC FILES: {dbStats.gdriveFiles}</span>
            </div>
            <button
              disabled={dbStatus.gdrive === "BUSY"}
              onClick={() => handleTriggerDbAction("gdrive", "Re-sync Immutable Google Drive Folder Structure")}
              className="w-full md:w-auto bg-white/5 hover:bg-white/10 text-white font-mono border border-white/10 px-4 py-2 rounded-xl text-xs flex items-center justify-center gap-2 cursor-pointer select-none"
            >
              <RefreshCw className={`w-3.5 h-3.5 ${dbStatus.gdrive === "BUSY" ? "animate-spin" : ""}`} />
              <span>Force G-Drive Sync</span>
            </button>
          </div>
        </div>

      </div>

    </div>
  );
}
export {};
