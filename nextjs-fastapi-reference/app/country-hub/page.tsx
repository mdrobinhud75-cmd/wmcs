"use client";

import React, { useState } from "react";
import { usePipelineStore } from "../../store/usePipelineStore";
import GlobeCanvas from "../../components/GlobeCanvas";

const SAMPLE_COUNTRIES = [
  { code: "US", name: "United States", motto: "West-Coast Cyber delta groundings", color: "#FF6B35", genres: ["Dance Pop", "Hip-Hop"] },
  { code: "KR", name: "South Korea", motto: "K-Pop Dynamic Synth-Chamber", color: "#FF4ECD", genres: ["K-Pop", "Chamber-Bass"] },
  { code: "BR", name: "Brazil", motto: "Favela-Industrial & Bossa-Granular", color: "#2E7D32", genres: ["Favela Funk", "Samba-Bass"] }
];

export default function CountryHubPage() {
  const [selectedCountry, setSelectedCountry] = useState(SAMPLE_COUNTRIES[0]);
  const [selectedScenario, setSelectedScenario] = useState<string | null>(null);
  const [isDnaLocked, setIsDnaLocked] = useState(false);
  const [isEmotionLocked, setIsEmotionLocked] = useState(false);

  // Zustand Store linkage
  const { initializePipeline, resolveHumanGate } = usePipelineStore();

  const handleSelectCode = (code: string) => {
    if (isDnaLocked) return;
    const match = SAMPLE_COUNTRIES.find(c => c.code === code);
    if (match) {
      setSelectedCountry(match);
    }
  };

  const handleLockDNA = () => {
    setIsDnaLocked(true);
    initializePipeline(
      selectedCountry.code, 
      selectedCountry.genres[0], 
      `${selectedCountry.code}-SUBGENRE-PURE`
    );
  };

  const handleLockEmotion = (scenName: string) => {
    setSelectedScenario(scenName);
    setIsEmotionLocked(true);
    resolveHumanGate(scenName);
  };

  const accentColorsMap = SAMPLE_COUNTRIES.reduce((acc, c) => ({ ...acc, [c.code]: c.color }), {});

  return (
    <main className="min-h-screen bg-[#0A0B10] text-gray-200 p-8 font-sans">
      <div className="max-w-6xl mx-auto space-y-8">
        
        {/* Page title */}
        <header className="border-b border-white/5 pb-4">
          <span className="text-[10px] font-mono tracking-widest text-[#00F5FF] uppercase font-bold">
            LEVEL 02: COUNTRY DNA SPACE
          </span>
          <h1 className="text-3xl font-display font-extrabold text-white mt-1">Country Hub Registry Portal</h1>
        </header>

        {/* Workspace layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* Globe selection - 3D project canvas */}
          <div className="lg:col-span-4 bg-white/[0.02] border border-white/5 p-6 rounded-2xl flex flex-col items-center justify-between">
            <h3 className="text-xs font-mono text-gray-400 uppercase tracking-widest border-b border-white/5 pb-2 w-full text-center mb-4">
              Globe Navigation Radar
            </h3>
            <GlobeCanvas 
              selectedCode={selectedCountry.code} 
              onSelectCountry={handleSelectCode}
              accentColors={accentColorsMap}
            />
            <div className="flex gap-2.5 mt-6 flex-wrap justify-center">
              {SAMPLE_COUNTRIES.map((c) => (
                <button
                  key={c.code}
                  disabled={isDnaLocked}
                  onClick={() => setSelectedCountry(c)}
                  style={{ borderColor: selectedCountry.code === c.code ? c.color : "transparent" }}
                  className={`px-3.5 py-1.5 rounded-lg text-xs font-mono border transition ${
                    selectedCountry.code === c.code ? "bg-white/10 text-white font-bold" : "bg-white/5 text-gray-400 hover:text-white"
                  }`}
                >
                  {c.code}
                </button>
              ))}
            </div>
          </div>

          {/* Configuration and Brief controls */}
          <div className="lg:col-span-8 space-y-6">
            <div className="bg-white/[0.02] border border-white/5 p-6 rounded-2xl space-y-6">
              <div className="flex justify-between items-center pb-3 border-b border-white/5">
                <div>
                  <h2 className="text-xl font-bold text-white font-display">{selectedCountry.name} Core Database</h2>
                  <p className="text-xs font-mono text-gray-400 mt-1">{selectedCountry.motto}</p>
                </div>

                {!isDnaLocked ? (
                  <button
                    onClick={handleLockDNA}
                    className="bg-gradient-to-r from-[#00F5FF] to-indigo-500 hover:from-[#00F5FF] text-black font-mono font-bold text-xs px-4 py-2 rounded-xl"
                  >
                    LOCK COUNTRY DNA
                  </button>
                ) : (
                  <span className="bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs px-4 py-2 font-mono rounded-xl">
                    DNA SEQUENCE SEALED
                  </span>
                )}
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
                <div className="bg-white/[0.01] border border-white/5 p-4 rounded-xl leading-relaxed">
                  <span className="text-gray-500 text-[10px] uppercase font-bold block mb-1">CVA Ethno-Rules:</span>
                  - Hook must arrive within the first 20 seconds.<br/>
                  - Every verse line must contain a Concrete Photographable noun.
                </div>
                <div className="bg-white/[0.01] border border-white/5 p-4 rounded-xl leading-relaxed">
                  <span className="text-gray-500 text-[10px] uppercase font-bold block mb-1">Vocal metrics Target:</span>
                  - Max Martin dynamic density standard (92% pass check threshold requirement).
                </div>
              </div>
            </div>

            {/* Level 2.3 Emotion selector */}
            {isDnaLocked && (
              <div className="bg-white/[0.02] border border-white/5 p-6 rounded-2xl space-y-6">
                <div>
                  <h2 className="text-xl font-bold text-white font-display">Level 2.3: Subgenre Precision Brief</h2>
                  <p className="text-xs text-gray-400 mt-1">Irreducible human selector (Type C Micro-Emotion scenario gate)</p>
                </div>

                {!isEmotionLocked ? (
                  <div className="space-y-3">
                    {[
                      { name: "Midnight Confession", desc: "Quiet rain, muted electric keys, whispering lowpass chords" },
                      { name: "Cyber Riot", desc: "Abrasive mechanical snaps, 16th-note transient shaker rolls" }
                    ].map((scen) => (
                      <button
                        key={scen.name}
                        onClick={() => handleLockEmotion(scen.name)}
                        className="w-full text-left p-4 rounded-xl border border-white/5 bg-white/[0.01] hover:bg-white/[0.03] transition flex justify-between items-center"
                      >
                        <div>
                          <span className="font-bold text-xs text-white block">{scen.name}</span>
                          <span className="text-xs text-gray-400 block mt-1">{scen.desc}</span>
                        </div>
                        <span className="text-xs text-cyan-400 font-mono">LOCK VECTOR &gt;</span>
                      </button>
                    ))}
                  </div>
                ) : (
                  <div className="p-4 bg-[#00F5FF]/5 border border-[#00F5FF]/10 rounded-xl space-y-2 font-mono text-xs">
                    <span className="text-[10px] text-[#00F5FF] font-bold block">SUBGENRE_DNA_BRIEF COMPILED</span>
                    <p className="text-white mt-1">SEALED VECTOR: {selectedScenario}</p>
                    <p className="text-gray-400 mt-1">Unique Production ID: {selectedCountry.code}-DPOP-{selectedScenario?.toUpperCase().replace(/\s+/g, "-")}</p>
                  </div>
                )}
              </div>
            )}

          </div>

        </div>

      </div>
    </main>
  );
}
