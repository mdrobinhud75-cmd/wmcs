import React, { useState, useEffect, useRef } from "react";
import { 
  Zap, 
  Shield, 
  ShieldCheck, 
  Cpu, 
  Clock, 
  Check, 
  Lock, 
  AlertTriangle, 
  Heart, 
  Play, 
  RotateCcw, 
  Sparkles, 
  Layers, 
  Globe, 
  Terminal, 
  ArrowRight, 
  Music,
  UserCheck,
  Disc,
  QrCode,
  FileCheck2,
  ListFilter
} from "lucide-react";
import { SongProject, EventLogEntry, AgentStatus } from "../types";
import { COUNTRIES } from "../data";
import { usePipelineStore } from "../store";
import QARadarChart from "./QARadarChart";

interface DashboardProps {
  songs: SongProject[];
  recentLogs: EventLogEntry[];
  onStartNewPipeline: () => void;
  onSelectProject: (id: string) => void;
  tokenAllocations: { a: number; b: number; c: number };
}

export default function Dashboard({ 
  songs, 
  recentLogs, 
  onStartNewPipeline, 
  onSelectProject,
  tokenAllocations 
}: DashboardProps) {
  const store = usePipelineStore();
  const terminalBottomRef = useRef<HTMLDivElement | null>(null);

  // States for local selector modals and tabs
  const [selectedCountryTab, setSelectedCountryTab] = useState(COUNTRIES[0]); // USA default
  const [selectedGenreInput, setSelectedGenreInput] = useState("Dance Pop");
  const [selectedCategoryInput, setSelectedCategoryInput] = useState("USA Dance Pop");

  // Dynamic radar pillars and active prescriptions for interactive feedback
  const [radarPillars, setRadarPillars] = useState<any[]>([]);
  const [activePrescriptions, setActivePrescriptions] = useState<string[]>([
    "System standby. Core parameters loaded.",
    "Awaiting active track packaging and audit clearance."
  ]);

  // Track if a pipeline run simulation is currently active
  const [simulationActive, setSimulationActive] = useState(false);
  const [simStep, setSimStep] = useState(0);

  // Search filter for 21 countries
  const [searchQuery, setSearchQuery] = useState("");

  // Countdown second-by-second ticker
  useEffect(() => {
    const timer = setInterval(() => {
      if (store.countdownSeconds > 0) {
        store.setCountdownSeconds(store.countdownSeconds - 1);
      }
    }, 1000);
    return () => clearInterval(timer);
  }, [store.countdownSeconds]);

  // Keep terminal logs scrolled to bottom
  useEffect(() => {
    if (terminalBottomRef.current) {
      terminalBottomRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [store.promptStreamLogs, store.currentStreamingText]);

  // Handle countdown representation
  const formatCountdown = (totalSeconds: number) => {
    const hours = Math.floor(totalSeconds / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = totalSeconds % 60;
    return `${hours.toString().padStart(2, "0")}:${minutes.toString().padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`;
  };

  const filteredCountries = COUNTRIES.filter(c => 
    c.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
    c.code.toLowerCase().includes(searchQuery.toLowerCase()) ||
    c.motto.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Auto-fill form inputs when country card clicked
  const handleCountryCardClick = (country: typeof COUNTRIES[0]) => {
    setSelectedCountryTab(country);
    if (country.genres && country.genres.length > 0) {
      setSelectedGenreInput(country.genres[0]);
    }
    // Set a matching category
    setSelectedCategoryInput(`${country.name} National Standard`);
  };

  // Start Pipeline Simulation!
  const handleStartPipelineSimulation = () => {
    // Save state context checkpoint
    store.initializePipeline(selectedCountryTab.code, selectedGenreInput, selectedCategoryInput);
    setSimulationActive(true);
    setSimStep(1);

    // Initial sequential step triggered automatically in the store!
    // It will emit event PE-001 automatically
    triggerSimStep(1);
  };

  // Orchestrated step sequencer for 17 Agents Saga model
  const triggerSimStep = (step: number) => {
    const delay = 1800;

    if (step === 1) {
      // Seq Agent 01: Country Research
      store.setAgentStatus("01", "ACTIVE");
      store.setAgentProgress("01", 35, "Parsing United States local constitution registries...");
      store.appendStreamLog("[Agent 01 - Country Research] ACTIVE: Analyzing cultural constraints & statutory regulations...");

      // Initialize radar chart with clean placeholder outline
      setRadarPillars([]);

      setTimeout(() => {
        store.setAgentStatus("01", "PASS");
        store.setAgentProgress("01", 100, "Statutory laws aligned.");
        store.appendStreamLog(`[Agent 01 - Country Research] PASS: Retrieved 3 non-negotiable Hard Rules.`);
        selectedCountryTab.hardRules.forEach(rule => {
          store.appendStreamLog(`   * HARD VALUE VERIFICATION: ${rule}`);
        });

        // Advance to Agent 02
        setSimStep(2);
        triggerSimStep(2);
      }, delay);
    } 
    
    else if (step === 2) {
      // Seq Agent 02: Genre Intelligence
      store.setAgentStatus("02", "ACTIVE");
      store.setAgentProgress("02", 40, "Filtering sonic tempo metrics and benchmarks...");
      store.appendStreamLog("[Agent 02 - Genre Intelligence] ACTIVE: Narrowing creative space... Checking target competition models.");

      setTimeout(() => {
        store.setAgentStatus("02", "PASS");
        store.setAgentProgress("02", 100, "Composition metrics loaded.");
        store.appendStreamLog(`[Agent 02 - Genre Intelligence] PASS: 9 real-world standards loaded (Classic, Modern, Global).`);
        selectedCountryTab.benchmarks.forEach(b => {
          store.appendStreamLog(`   * BENCHMARK TARGET: ${b}`);
        });

        // Advance to Agent 03
        setSimStep(3);
        triggerSimStep(3);
      }, delay);
    } 
    
    else if (step === 3) {
      // Seq Agent 03: Subgenre DNA Specialist
      store.setAgentStatus("03", "ACTIVE");
      store.setAgentProgress("03", 50, "Synthesizing hybrid arrangement briefs...");
      store.appendStreamLog("[Agent 03 - Subgenre DNA Specialist] ACTIVE: Compiling arrangement map & sonic identifier coordinates.");

      setTimeout(() => {
        store.setAgentStatus("03", "PASS");
        store.setAgentProgress("03", 100, "Brief compiled. Awaiting Human Gateway.");
        store.appendStreamLog(`[Agent 03 - Subgenre DNA Specialist] PASS: Structural document generated.`);
        store.appendStreamLog(`   * SONIC DNA: ${selectedCountryTab.sonicDNAString}`);
        store.appendStreamLog(`[PE-002 STATUS] Sequencer paused at Irreducible Human Gate.`);

        // Present exactly 5 country-specific scenario emotions!
        const countryEmotionsMap: Record<string, string[]> = {
          US: ["Sunset Strip Catharsis", "Post-Static Breakthrough", "Desert Horizon Dawn", "Neon Rain Release", "Shattered Mirrors Ascent"],
          KR: ["한의 복수 (Reclaimed Han - Silent Fury)", "흥의 해방 (Reclaimed Heung - Kinetic Liberation)", "독기 (Dokhye - Venomous Sovereign Strike)", "정의 폭발 (Reclaimed Jeong - Bond of Power)", "환희의 부활 (Ethereal Rebirth of Han)"],
          BR: ["Favela Heat Carnival", "Bossa Solitude Chill", "Amazonian Tribal Rhythm", "Samba-Jazz vintage dynamic", "Heavy industrial escape"]
        };
        const emotionOptions = countryEmotionsMap[selectedCountryTab.code] || [
          "Ethereal Nostalgia",
          "Neon Cyber Rebellion",
          "Chamber Minimalist Pride",
          "Midnight Solitude Chill",
          "Hyper-Pop maximalist joy"
        ];
        
        store.setAgentStatus("17", "ACTIVE");
        store.triggerHumanGate("emotion", emotionOptions);
      }, delay);
    }
  };

  // Trigger Creation: Parallel Fan-out of Agent 04, 05, and 06
  const resumeToCreationPhase = (emotion: string) => {
    setSimStep(4);
    store.setAgentStatus("04", "ACTIVE");
    store.setAgentStatus("05", "ACTIVE");
    store.setAgentStatus("06", "ACTIVE");

    store.setAgentProgress("04", 30, "Applying 30-word vocabulary cluster patterns...");
    store.setAgentProgress("05", 25, "Generating 25 memorability-scored titles...");
    store.setAgentProgress("06", 45, "Framing 10-section production arrangement key structure...");

    store.appendStreamLog(`[Agent 04 - Lyrics] ACTIVE: Injecting concrete photographable imagery for "${emotion}" vector.`);
    store.appendStreamLog(`[Agent 05 - Title Engine] ACTIVE: Cross-checking brand databases for name collision limits...`);
    store.appendStreamLog(`[Agent 06 - Music Blueprint] ACTIVE: Scribing BPM chord progression voicing maps...`);

    const creationDelay = 2200;

    setTimeout(() => {
      store.setAgentStatus("04", "PASS");
      store.setAgentStatus("06", "PASS");

      store.setAgentProgress("04", 100, "Lyrics generated with Rule V-01 validation.");
      store.setAgentProgress("06", 100, "BPM, Key, and 10-section dynamic arc exported.");

      store.appendStreamLog(`[Agent 04 - Lyrics] PASS: 10 structural sections compiled successfully. Solid nouns count: 18.`);
      store.appendStreamLog(`[Agent 06 - Music Style] PASS: Export complete. Base layout set to 122BPM over G Melodic Minor.`);
      
      // Stop for Gate 2: Final Title Selection
      store.setAgentProgress("05", 90, "Holding on top title candidates...");
      store.appendStreamLog(`[Agent 05 - Titles] PASS: Candidate design checks complete. Awaiting Human Title Approval.`);

      const countryTitlesMap: Record<string, string[]> = {
        US: [
          "Risen (The Awakening)",
          "Unshackling the Night",
          "Catharsis Beats",
          "Breath of the Phoenix"
        ],
        KR: [
          "Glitch in the Seoul",
          "Neon Dynasties Spark",
          "Celestial Heritage Drift"
        ]
      };
      const titleOptions = countryTitlesMap[selectedCountryTab.code] || [
        "Sovereign Anthem Shift",
        "Ecodesign Rhythm Waves",
        "Chronos Fusion Wave"
      ];

      store.triggerHumanGate("title", titleOptions);
    }, creationDelay);
  };

  // Trigger Convergence Gate: Agent 07 Audits the composite package
  const resumeToQAGatePhase = (title: string) => {
    setSimStep(5);
    store.setAgentStatus("07", "ACTIVE");
    store.setAgentProgress("07", 20, "Synthesizing full composite song package...");
    store.appendStreamLog(`[PE-003 CONVERGENCE TRIGGER] Song Package compiled. Triggering 10-Pillar QA Audit.`);

    const qaDelay = 2500;

    setTimeout(() => {
      // Step 9 (QA Gate first cycle fail) if country is USA
      if (selectedCountryTab.code === "US") {
        store.updateScore(58);
        store.setAgentStatus("07", "FAIL");
        store.setAgentProgress("07", 50, "CVA warning: Vocabulary Cluster Density failed threshold.");

        // update prescription with failure
        setActivePrescriptions([
          "[CRITICAL WARNING] HR-USA-02 violation: Deficient Concrete Images in verse layout.",
          "[PRESCRIPTION] Prescribing injection of US-regional photographable nouns from Vocabulary Cluster ('rise', 'static', 'mirrors', 'neon lights', 'city sky').",
          "[SUPERVISOR] Auto-revising lyrics grid via Agent 04. Engaging retry cycle 2..."
        ]);

        // sets radar chart with deformed de-scoped scores
        const failPillars = [
          { name: "Hook Power", score: 9, description: "" },
          { name: "Emotional Impact", score: 6, description: "" },
          { name: "Authenticity", score: 7, description: "" },
          { name: "Pronunciation & Tone", score: 8, description: "" },
          { name: "Dynamic Arc", score: 8, description: "" },
          { name: "Vocabulary Density", score: 4, description: "" }, // FAIL !
          { name: "Cliché Counter", score: 5, description: "" },     // FAIL !
          { name: "Specificity Score", score: 4, description: "" },  // FAIL !
          { name: "Structured Alignment", score: 9, description: "" },
          { name: "Sonic Spatial Balance", score: 8, description: "" }
        ];
        setRadarPillars(failPillars);

        store.appendStreamLog(`[Agent 07 - QA Auditor] ALERT: 10-Pillar Audit FAIL on Lyrical Specificity Core!`);
        store.appendStreamLog(`   * Diagnostic composite score: 58/70 (Pass threshold is 65/70).`);
        store.appendStreamLog(`   * Rule HR-USA-02 violation: Missing concrete photographable visual anchors.`);
        store.appendStreamLog(`[Agent 17 - Human Supervisor] AUTONOMOUS RETRY ENGAGED. Issuing corrective prescriptions...`);

        // Wait another 3000ms to simulate autonomous retry execution
        setTimeout(() => {
          store.setAgentStatus("04", "ACTIVE");
          store.appendStreamLog(`[Agent 04 - Lyrics] Re-synthesizing lyrical schema. Injecting concrete Vocabulary Cluster words: 'mirrors', 'neon', 'city sky'...`);
          
          setTimeout(() => {
            store.setAgentStatus("04", "PASS");
            store.setAgentStatus("07", "ACTIVE");
            store.setAgentProgress("07", 80, "Diagnostics validation recalculated... PASS.");

            const finalScore = 67; // Passes the 65+/70 threshold!
            store.updateScore(finalScore);
            store.setAgentStatus("07", "PASS");
            store.setAgentProgress("07", 100, "Audit passed: 67/70");

            setActivePrescriptions([
              "✓ HR-USA-02 Resolved (9/10). Injected concrete photographable nouns: 'neon boulevard', 'glass mirrors', 'city sky'.",
              "✓ HR-USA-03 Cliché count compliant (10/10). No overused pop tropes.",
              "✓ HR-USA-01 Hook checked (9/10). Commercial intro length < 20 seconds.",
              "✓ Dance Pop Subgenre specs checked. 0.5-beat total silence before final hook repetition verified."
            ]);

            const passPillars = [
              { name: "Hook Power", score: 9, description: "" },
              { name: "Emotional Impact", score: 10, description: "" },
              { name: "Authenticity", score: 9, description: "" },
              { name: "Pronunciation & Tone", score: 9, description: "" },
              { name: "Dynamic Arc", score: 9, description: "" },
              { name: "Vocabulary Density", score: 9, description: "" }, // RESOLVED !
              { name: "Cliché Counter", score: 10, description: "" },   // RESOLVED !
              { name: "Specificity Score", score: 9, description: "" }, // RESOLVED !
              { name: "Structured Alignment", score: 10, description: "" },
              { name: "Sonic Spatial Balance", score: 10, description: "" }
            ];
            setRadarPillars(passPillars);

            store.appendStreamLog(`[Agent 07 - QA Auditor] PASS: 10-Pillar Audit completed with rating 67/70 (Exceeds 65 threshold).`);
            store.appendStreamLog(`   * Hook Power: 9/10 // Emotional Impact: 10/10 // Authenticity: 9/10 // Specificity: 9/10`);
            store.appendStreamLog(`   * All Country Hard Rules (HR-USA-01, HR-USA-02, HR-USA-03) verified: COMPLIANT.`);
            store.appendStreamLog(`[PE-004 TRANSMISSION] Emission event active. Delivering assets to platform media channels...`);

            resumeToVisualsPhase();
          }, 1800);
        }, 2200);

      } else {
        // Fallback for other regions
        const finalScore = 94; 
        store.updateScore(finalScore);
        store.setAgentStatus("07", "PASS");
        store.setAgentProgress("07", 100, "Audit completed. Score: 94/100.");
        
        store.appendStreamLog(`[Agent 07 - QA Auditor] PASS: 10-Pillar Audit cleared standard! No Hard Rules violated.`);
        store.appendStreamLog(`   * Hook Power: 9/10 // Emotional Impact: 10/10 // Authenticity: 9/10`);
        store.appendStreamLog(`[PE-005 TRANSMISSION] Emission event active. Delivering assets to media channels...`);

        const standardPillars = [
          { name: "Hook Power", score: 9, description: "" },
          { name: "Emotional Impact", score: 9, description: "" },
          { name: "Authenticity", score: 9, description: "" },
          { name: "Pronunciation & Tone", score: 9, description: "" },
          { name: "Dynamic Arc", score: 9, description: "" },
          { name: "Vocabulary Density", score: 9, description: "" },
          { name: "Cliché Counter", score: 9, description: "" },
          { name: "Specificity Score", score: 9, description: "" },
          { name: "Structured Alignment", score: 9, description: "" },
          { name: "Sonic Spatial Balance", score: 9, description: "" }
        ];
        setRadarPillars(standardPillars);
        setActivePrescriptions([
          "✓ Multi-vocal dynamic range within target spec.",
          "✓ Symmetrical verse structure checked."
        ]);

        resumeToVisualsPhase();
      }
    }, qaDelay);
  };

  const resumeToVisualsPhase = () => {
    setSimStep(6);
    store.setAgentStatus("08", "ACTIVE");
    store.setAgentStatus("09", "ACTIVE");
    store.setAgentStatus("10", "ACTIVE");
    store.setAgentStatus("11", "ACTIVE");
    store.setAgentStatus("12", "ACTIVE");
    store.setAgentStatus("16", "ACTIVE");

    store.setAgentProgress("08", 40, "Drafting scene-by-scene script guidelines...");
    store.setAgentProgress("11", 50, "Packaging 5-layer descriptive tags & search matrices...");
    store.setAgentProgress("16", 30, "Optimizing canvas visual overlays for 15s viral moment...");

    store.appendStreamLog(`[Agent 08 - Video Concept] ACTIVE: Timestamps mapped for 15-second viral hooks.`);
    store.appendStreamLog(`[Agent 11 - SEO Core] ACTIVE: Tuning tags for YouTube, Spotify, and TikTok search weightings.`);
    store.appendStreamLog(`[Agent 16 - Video Layout Editor] ACTIVE: Framing rapid aesthetic kinetic alignments.`);

    const visualDelay = 2200;

    setTimeout(() => {
      store.setAgentStatus("08", "PASS");
      store.setAgentStatus("09", "PASS");
      store.setAgentStatus("10", "PASS");
      store.setAgentStatus("11", "PASS");
      store.setAgentStatus("16", "PASS");
      
      store.setAgentProgress("08", 100, "Storyboard Concept finalized.");
      store.setAgentProgress("11", 100, "Metadata mapped.");
      store.setAgentProgress("16", 100, "Splicing overlays passed.");

      store.appendStreamLog(`[Agent 08] PASS. Structural Scene Outline exported.`);
      store.appendStreamLog(`[Agent 10] PASS. High-impact album artwork and thumbnails compiled.`);
      store.appendStreamLog(`[Agent 11] PASS. Title descriptions and cross-tagging metrics compiled.`);
      store.appendStreamLog(`[Agent 16] PASS. Video frame transitions calibrated.`);
      
      // Stop for Gate 3: Final Upload Authorization
      store.setAgentStatus("12", "ACTIVE");
      store.setAgentProgress("12", 90, "Holding release protocols. Awaiting Human Signature...");
      store.appendStreamLog(`[IRREDUCIBLE HUMAN GATE ALERT] Please input/authorize Release Key code to dump assets and synchronize catalog archives.`);
      store.triggerHumanGate("upload", []);
    }, visualDelay);
  };

  // Final Sequence: Agent 13 assigns serial and archives
  const resumeToArchivePhase = (authString: string) => {
    setSimStep(7);
    store.setAgentStatus("12", "PASS");
    store.setAgentProgress("12", 100, "Assets distributed.");
    store.setAgentStatus("13", "ACTIVE");
    store.setAgentProgress("13", 50, "Synchronizing cryptographically signed folders to G-Drive...");

    const archiveDelay = 2000;

    setTimeout(() => {
      store.setAgentStatus("13", "PASS");
      store.setAgentProgress("13", 100, "Zipped archive synchronizations complete.");
      
      // Formulate unique cryptographic Serial Format
      const serialSn = `WMCS-${selectedCountryTab.code}-DPOP-2026-N${Math.floor(Math.random() * 8000) + 1000}`;

      // Emit completed song to outer system catalog
      const generatedSong = {
        id: store.activeProject?.id || `proj_${Date.now()}`,
        serialNumber: serialSn,
        title: store.selectedTitle || "Risen (The Awakening)",
        countryCode: selectedCountryTab.code,
        genreCode: selectedGenreInput,
        subgenreCode: selectedCountryTab.genres[0] || "Contemporary Synth",
        emotion: store.selectedEmotion || "Post-Static Breakthrough",
        bpm: 122,
        qaTotalScore: store.totalScore || 94,
        platformUrls: { YouTube: "https://youtube.com/watch?v=wmcs-live", Spotify: "https://spotify.com/track/wmcs-live" },
        version: "v3.0.0",
        tags: ["World Champion", selectedGenreInput, store.selectedEmotion || "Catharsis"]
      };

      // Push to catalog
      fetch("/api/v1/catalog", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(generatedSong)
      })
      .then(() => {
        // Log event emission to back-end logs list
        fetch("/api/v1/logs", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            type: "PE",
            eventName: "SYSTEM_MATURITY_LEVEL_1",
            message: `LEVEL 1 SUCCESS - Released title "${generatedSong.title}" onto world catalogs. Serial: ${serialSn}`
          })
        });
        
        onStartNewPipeline(); // ensures outer state redirect
        setSimulationActive(false);
        setSimStep(0);
      })
      .catch(err => {
        console.error(err);
        onStartNewPipeline();
        setSimulationActive(false);
        setSimStep(0);
      });
    }, archiveDelay);
  };

  // Coordinate human selections
  const handleSelectOptionAndAdvance = (option: string) => {
    const previousGateType = store.humanGateType;
    store.resolveHumanGate(option);
    
    if (previousGateType === "emotion" && simStep === 3) {
      resumeToCreationPhase(option);
    } else if (previousGateType === "title" && simStep === 4) {
      resumeToQAGatePhase(option);
    }
  };

  const handleAuthSubmitAndAdvance = (code: string) => {
    store.resolveHumanGate(code);
    resumeToArchivePhase(code);
  };

  // State resume memory triggers (Agent 15/16)
  const handleZustandCacheRestore = () => {
    store.resumeSessionFromCache();
    setSimulationActive(true);
    setSimStep(4);
    
    // Auto launch Title Selection gate to prove high restoration responsiveness
    setTimeout(() => {
      store.triggerHumanGate("title", ["West Coast Cyber-Wave", "Delta Bass Rebellion", "Neon Highway Overdrive"]);
    }, 1000);
  };

  // 17 connected Agent Nodes array representation
  const activeNodes = Object.values(store.agentData);

  return (
    <div className="space-y-6 @container">
      
      {/* 17-AGENT PROGRESS RAIL (Persistent Horizontal Top Navigation Bar Wrapper) */}
      <section className="bg-[#0A0B10]/95 border border-white/10 rounded-2xl p-4 shadow-[0_4px_30px_rgba(0,0,0,0.5)] backdrop-blur-xl" id="pipeline-progress-rail-panel">
        <div className="flex flex-col md:flex-row md:items-center justify-between pb-3 border-b border-white/5 mb-3.5 gap-2">
          <div className="flex items-center gap-2">
            <div className="h-2 w-2 rounded-full bg-cyan-400 animate-ping" />
            <h2 className="font-mono text-xs font-bold tracking-widest text-cyan-300 uppercase">
              17-AGENT CONNECTED PIPELINE RAIL (SOVEREIGN ENGINE)
            </h2>
          </div>
          <div className="flex flex-wrap items-center gap-3.5 font-mono text-[9px] text-gray-500">
            <div className="flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded-full bg-[#00F5FF] shadow-[0_0_8px_rgba(0,245,255,0.7)] animate-pulse" />
              <span className="text-gray-300">Active</span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded-full bg-[#10B981] shadow-[0_0_8px_rgba(16,185,129,0.7)]" />
              <span className="text-gray-300">Pass</span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded-full bg-amber-400 shadow-[0_0_8px_rgba(245,158,11,0.7)] animate-bounce" />
              <span className="text-gray-300">Awaiting Human</span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded-full bg-rose-500 shadow-[0_0_8px_rgba(239,68,68,0.7)]" />
              <span className="text-gray-300">Block / Fail</span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded-full bg-gray-700" />
              <span className="text-gray-500">Idle</span>
            </div>
          </div>
        </div>

        {/* The 17 dynamic interactive graphical nodes layout */}
        <div className="grid grid-cols-6 sm:grid-cols-9 md:grid-cols-17 gap-2">
          {activeNodes.map((node) => {
            // Map individual statuses to high-fidelity neon colors
            let statusStyle = "bg-gray-800 border-white/5 text-gray-500";
            if (node.status === "ACTIVE") {
              statusStyle = "bg-cyan-500/20 border-cyan-400 text-[#00F5FF] shadow-[0_0_12px_rgba(0,245,255,0.5)] animate-pulse font-bold";
            } else if (node.status === "PASS") {
              statusStyle = "bg-emerald-500/20 border-emerald-400 text-[#10B981] shadow-[0_0_10px_rgba(16,185,129,0.4)] font-bold";
            } else if (node.status === "BLOCK" || node.status === "FAIL") {
              statusStyle = "bg-rose-500/20 border-rose-400 text-rose-400 shadow-[0_0_10px_rgba(244,63,94,0.4)] animate-bounce";
            } else if (node.status === "RETRY") {
              statusStyle = "bg-amber-500/20 border-amber-400 text-amber-300 shadow-[0_0_8px_rgba(245,158,11,0.3)] animate-pulse";
            } else if (store.showHumanGate && node.id === "17") {
              statusStyle = "bg-amber-500/20 border-amber-400 text-amber-400 shadow-[0_0_15px_rgba(245,158,11,0.7)] animate-bounce font-extrabold";
            }

            return (
              <div 
                key={node.id} 
                className={`p-2 border rounded-xl flex flex-col items-center justify-between text-center transition-all duration-300 select-none group relative ${statusStyle}`}
                title={`${node.name}: ${node.currentTask}`}
              >
                <span className="text-[10px] font-mono leading-none block">{node.id}</span>
                <span className="text-[7.5px] tracking-tight font-mono mt-1 opacity-70 block overflow-hidden text-ellipsis whitespace-nowrap w-full">
                  {node.name.split(" ")[0]}
                </span>

                {/* Micro-scale visual progress lines bar inside indicators */}
                <div className="w-full bg-white/5 rounded-full h-[2px] mt-1.5 overflow-hidden">
                  <div 
                    className="bg-current h-full" 
                    style={{ width: `${node.progress}%` }}
                  />
                </div>

                {/* Extended float tooltips on rail hover */}
                <div className="absolute top-12 left-1/2 -translate-x-1/2 pointer-events-none opacity-0 group-hover:opacity-100 transition-all duration-200 bg-[#0A0B10] border border-white/10 p-2.5 rounded-lg text-[10px] font-mono text-left z-50 shadow-2xl w-48 leading-relaxed">
                  <p className="text-cyan-400 font-bold block">{node.role}</p>
                  <p className="text-white font-medium mt-1">{node.name}</p>
                  <p className="text-gray-400 mt-1">Status: <span className="text-current font-bold">{node.status}</span></p>
                  <p className="text-gray-500 mt-0.5">Task: {node.currentTask}</p>
                  <p className="text-gray-500 mt-0.5">Progress: {node.progress}% // {node.latencyMs}ms</p>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* CORE 3-COLUMN SPATIAL LAYOUT ARCHITECTURE */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-stretch">
        
        {/* LEFT COLUMN (25%): CountryIntelligencePanel */}
        <div className="lg:col-span-3 flex flex-col space-y-5">
          <section className="bg-[#0A0B10]/80 border border-white/10 rounded-2xl p-5 shadow-lg flex-1 flex flex-col justify-between" id="country-intelligence-panel">
            <div className="space-y-4">
              <div className="flex items-center justify-between pb-2 border-b border-white/5">
                <div className="flex items-center gap-2">
                  <Globe className="w-4.5 h-4.5 text-cyan-400" />
                  <h3 className="font-display font-bold text-sm text-white tracking-wide uppercase">
                    REGIONS DNA (21)
                  </h3>
                </div>
                <span className="font-mono text-[9px] text-gray-400 bg-white/5 px-2 py-0.5 rounded-full font-bold">
                  Level 02
                </span>
              </div>

              {/* Advanced search filter inputs box to query 21 regions */}
              <div className="relative">
                <input
                  type="text"
                  placeholder="Filter regions..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full bg-black/40 border border-white/10 rounded-xl px-3.5 py-2 text-xs font-mono text-white placeholder-gray-500 focus:outline-none focus:border-cyan-400/50"
                  id="country-selector-search"
                />
              </div>

              {/* Scrollable list containing cards representing all 21 regions */}
              <div className="space-y-2 max-h-[340px] overflow-y-auto pr-1">
                {filteredCountries.map((c) => {
                  const isSelected = selectedCountryTab.code === c.code;
                  return (
                    <button
                      key={c.code}
                      onClick={() => handleCountryCardClick(c)}
                      className={`w-full flex items-center justify-between p-2.5 rounded-xl text-left border cursor-pointer select-none transition-all duration-200 ${
                        isSelected 
                          ? "bg-white/5 text-white" 
                          : "bg-white/[0.01] border-transparent text-gray-400 hover:bg-white/[0.03] hover:text-white"
                      }`}
                      style={{
                        borderColor: isSelected ? `${c.accentColor}35` : undefined,
                        borderLeftWidth: isSelected ? "3px" : "1px",
                        borderLeftColor: isSelected ? c.accentColor : undefined
                      }}
                    >
                      <div className="truncate leading-normal pr-1 flex-1">
                        <span className="text-xs font-semibold block truncate">{c.name}</span>
                        <span className="text-[9px] text-gray-500 block leading-tight mt-0.5 font-mono truncate uppercase">
                          {c.motto}
                        </span>
                      </div>
                      <span 
                        className="text-[10px] font-mono px-2 py-0.5 rounded font-bold uppercase shrink-0"
                        style={{
                          backgroundColor: `${c.accentColor}12`,
                          color: c.accentColor
                        }}
                      >
                        {c.code}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* STICKY ALERT DETAIL: Dynamic CVA regulatory constraints mapped dynamically */}
            <div className="mt-4 pt-4 border-t border-white/5 space-y-3">
              <div className="flex items-center gap-2">
                <Shield className="w-4 h-4 text-rose-400 animate-pulse" />
                <h4 className="font-mono text-[10px] font-bold text-rose-300 uppercase tracking-widest leading-none">
                  STICKY ALERTS: REGULATOR RULES
                </h4>
              </div>
              <p className="text-[10.5px] text-gray-400 italic">
                Active regulatory boundaries for <span className="font-semibold" style={{ color: selectedCountryTab.accentColor }}>{selectedCountryTab.name}</span>:
              </p>

              <div className="space-y-2">
                {selectedCountryTab.hardRules.map((rule, idx) => (
                  <div 
                    key={idx}
                    className="p-2.5 rounded-xl border bg-rose-500/[0.02] border-rose-500/10 text-[10px] leading-relaxed text-gray-300"
                  >
                    <span className="text-[9px] font-mono text-rose-400 block mb-0.5 uppercase tracking-wide">
                      AUDIT CONSTRAINT CR-{selectedCountryTab.code}-0{idx + 1}
                    </span>
                    {rule}
                  </div>
                ))}
              </div>
            </div>
          </section>
        </div>

        {/* CENTER COLUMN (50%): ActiveAgentWorkspace */}
        <div className="lg:col-span-6 flex flex-col space-y-5">
          <section className="bg-[#0A0B10]/80 border border-white/10 rounded-2xl p-5 shadow-lg flex-1 flex flex-col justify-between" id="active-agent-workspace">
            
            {/* Stage title configuration header */}
            <div className="flex justify-between items-center pb-2 border-b border-white/5">
              <div className="flex items-center gap-2">
                <Cpu className="w-5 h-5 text-cyan-400" />
                <h3 className="font-display font-extrabold text-sm text-white uppercase tracking-wide">
                  ACTIVE AGENT WORKSPACE PROTOCOL
                </h3>
              </div>
              <div className="flex items-center gap-2">
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
                <span className="font-mono text-[9.5px] uppercase text-[#00E676] font-bold">
                  NOMINAL ACTIVE WORKSPACE
                </span>
              </div>
            </div>

            {/* If pipeline is not active, present an elegant initialization screen */}
            {!simulationActive && !store.activeProject && (
              <div className="my-auto py-8 text-center space-y-5.5 px-4">
                <div className="mx-auto w-12 h-12 rounded-full bg-[#00F5FF]/10 flex items-center justify-center text-cyan-400 border border-cyan-400/25">
                  <Play className="w-5.5 h-5.5 fill-current ml-0.5 animate-pulse" />
                </div>
                <div className="max-w-md mx-auto space-y-2">
                  <h4 className="font-display font-bold text-white text-base">
                    IGNITE THE WORLD CHAMPION ENGINE
                  </h4>
                  <p className="text-xs text-gray-400 leading-relaxed">
                    Select a target country from the left panel, customize the song parameters, and initiate the autonomous 18-step CVA process.
                  </p>
                </div>

                {/* Mini configuration parameters form */}
                <div className="max-w-sm mx-auto p-4 bg-black/40 rounded-2xl border border-white/5 space-y-3.5 text-left text-xs leading-normal">
                  <div>
                    <label className="font-mono text-[9px] text-gray-500 block uppercase mb-1">
                      Target Country DNA Code
                    </label>
                    <div className="flex items-center gap-2 px-3 py-2 bg-white/[0.02] border border-white/5 rounded-xl font-mono font-bold text-white">
                      <span className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: selectedCountryTab.accentColor }} />
                      <span>{selectedCountryTab.name} ({selectedCountryTab.code})</span>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-3.5">
                    <div>
                      <label className="font-mono text-[9px] text-gray-500 block uppercase mb-1">
                        Dynamic Genre Code
                      </label>
                      <input
                        type="text"
                        value={selectedGenreInput}
                        onChange={(e) => setSelectedGenreInput(e.target.value)}
                        className="w-full bg-white/[0.02] border border-white/5 rounded-xl px-3 py-1.5 text-xs text-white uppercase font-mono focus:outline-none focus:border-cyan-400/50"
                      />
                    </div>
                    <div>
                      <label className="font-mono text-[9px] text-gray-500 block uppercase mb-1">
                        Subgenre/Category Code
                      </label>
                      <input
                        type="text"
                        value={selectedCategoryInput}
                        onChange={(e) => setSelectedCategoryInput(e.target.value)}
                        className="w-full bg-white/[0.02] border border-white/5 rounded-xl px-3 py-1.5 text-xs text-white uppercase font-mono focus:outline-none focus:border-cyan-400/50"
                      />
                    </div>
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
                  <button
                    onClick={handleStartPipelineSimulation}
                    className="w-full sm:w-auto bg-gradient-to-r from-cyan-400 to-indigo-500 hover:from-cyan-300 hover:to-indigo-400 text-black font-mono font-bold text-xs py-3 px-6 rounded-xl transition duration-150 shadow-[0_0_15px_rgba(0,245,255,0.2)] cursor-pointer"
                  >
                    START PRODUCTION LOOP (SAGA RUN v3.0)
                  </button>
                  <button
                    onClick={handleZustandCacheRestore}
                    className="w-full sm:w-auto bg-white/5 border border-white/10 hover:bg-white/10 text-white font-mono text-xs py-3 px-5 rounded-xl transition duration-150 cursor-pointer"
                  >
                    RESTORE REDIS HOT MEMORY
                  </button>
                </div>
              </div>
            )}

            {/* If pipeline simulation has active, show streaming terminal & active progress */}
            {(simulationActive || store.activeProject) && (
              <div className="flex-1 flex flex-col space-y-4 justify-between mt-3.5">
                
                {/* Active song detail card header */}
                <div className="p-3 rounded-2xl border border-[#00F5FF]/15 bg-[#00F5FF]/[0.02] flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2">
                  <div className="space-y-1 leading-normal">
                    <span className="text-[9px] font-mono bg-[#00F5FF]/15 text-cyan-300 px-2 py-0.5 rounded font-bold uppercase tracking-wider">
                      ACTIVE SAGA PACKAGE
                    </span>
                    <h4 className="text-sm font-semibold text-white mt-1">
                      {store.selectedTitle || "PENDING CREATIVE DECISION LOCKS..."}
                    </h4>
                  </div>
                  <div className="text-right font-mono text-[10px] text-gray-400 space-y-0.5">
                    <p>PHASE: <span className="text-cyan-400 font-bold">{store.currentPhase.toUpperCase()}</span></p>
                    <p>EMOTION: <span className="text-indigo-400">{store.selectedEmotion || "PENDING"}</span></p>
                  </div>
                </div>

                {/* THE STREAMING TERMINAL: monospace font panel showing logs character-by-character */}
                <div className="flex-1 bg-[#040508] rounded-2xl border border-white/5 p-4.5 font-mono text-[11px] leading-relaxed text-gray-300 overflow-y-auto max-h-[290px] min-h-[180px] shadow-inner relative flex flex-col justify-between">
                  <div className="absolute top-3 right-3 text-white/[0.02] pointer-events-none select-none">
                    <Terminal className="w-32 h-32" />
                  </div>

                  <div className="space-y-1.5">
                    {store.promptStreamLogs.map((log, idx) => (
                      <p key={idx} className={log.includes("[HUMAN") || log.includes("GATE") ? "text-amber-400 font-semibold" : ""}>
                        <span className="text-gray-500 mr-1.5">&gt;</span>
                        {log}
                      </p>
                    ))}
                    {/* Character accumulation cursor container */}
                    {store.isStreaming && (
                      <p className="text-[#00F5FF]">
                        <span className="text-gray-500 mr-1.5">&gt;</span>
                        {store.currentStreamingText}
                        <span className="w-1.5 h-3 bg-[#00F5FF] ml-0.5 inline-block animate-pulse align-middle" />
                      </p>
                    )}
                  </div>
                  <div ref={terminalBottomRef} />
                </div>

                {/* INTEGRATED GATES MODALS (Render inline to keep user focused inside dashboard columns!) */}
                {store.showHumanGate && store.humanGateType === "emotion" && (
                  <div className="p-4 rounded-2xl border border-amber-400/25 bg-amber-500/[0.02] shadow-[0_0_20px_rgba(245,158,11,0.06)] space-y-3.5">
                    <div className="flex items-center gap-2">
                      <Sparkles className="w-4 h-4 text-amber-400 animate-bounce" />
                      <h4 className="font-mono text-[11px] font-extrabold text-amber-300 uppercase tracking-widest leading-none">
                        IRREDUCIBLE HUMAN GATE: MICRO-EMOTION FOCUS LOCK
                      </h4>
                    </div>
                    <p className="text-[11px] text-gray-400 leading-normal">
                      Select and authorize the emotional center vector. This parameters instructs Agents 04, 05, and 06:
                    </p>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                      {store.gateOptions.map((opt) => (
                        <button
                          key={opt}
                          onClick={() => handleSelectOptionAndAdvance(opt)}
                          className="px-3 py-2 bg-black/40 border border-white/5 rounded-xl text-left text-xs text-gray-300 hover:text-white hover:border-amber-400/40 hover:bg-amber-400/[0.02] cursor-pointer"
                        >
                          <span className="text-amber-400 inline mr-1 font-bold">▶</span>
                          {opt}
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {store.showHumanGate && store.humanGateType === "title" && (
                  <div className="p-4 rounded-2xl border border-amber-400/25 bg-amber-500/[0.02] shadow-[0_0_20px_rgba(245,158,11,0.06)] space-y-3.5">
                    <div className="flex items-center gap-2">
                      <Sparkles className="w-4 h-4 text-amber-400 animate-bounce" />
                      <h4 className="font-mono text-[11px] font-extrabold text-amber-300 uppercase tracking-widest leading-none">
                        IRREDUCIBLE HUMAN GATE: FINAL SONG TITLE LOCK
                      </h4>
                    </div>
                    <p className="text-[11px] text-gray-400 leading-normal">
                      Select from the top 3 AI generated title designs mapped and checked for trademark/conflict limits on copyright registries:
                    </p>

                    <div className="space-y-2">
                      {store.gateOptions.map((opt) => (
                        <button
                          key={opt}
                          onClick={() => handleSelectOptionAndAdvance(opt)}
                          className="w-full px-3 py-2.5 bg-black/40 border border-white/5 rounded-xl text-left text-xs text-gray-300 hover:text-white hover:border-amber-400/40 hover:bg-amber-400/[0.02] cursor-pointer flex items-center justify-between"
                        >
                          <span>{opt}</span>
                          <span className="text-[9px] font-mono text-cyan-400 bg-cyan-950/20 px-2 py-0.5 rounded font-bold">
                            94% Salience
                          </span>
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {store.showHumanGate && store.humanGateType === "upload" && (
                  <div className="p-4 rounded-2xl border border-amber-400/25 bg-amber-500/[0.02] shadow-[0_0_20px_rgba(245,158,11,0.06)] space-y-3.5">
                    <div className="flex items-center gap-2">
                      <Lock className="w-4 h-4 text-amber-400 animate-bounce" />
                      <h4 className="font-mono text-[11px] font-extrabold text-amber-300 uppercase tracking-widest leading-none">
                        IRREDUCIBLE HUMAN GATE: FINAL PLATFORM DISTRIBUTION RELEASE SIGNATURE
                      </h4>
                    </div>
                    <p className="text-[11px] text-gray-400 leading-normal">
                      The package has cleared 10-Pillar medical-grade audit rules. Enter your secure Human Authorization String to release the song onto Spotify, YouTube, and TikTok:
                    </p>

                    <form 
                      onSubmit={(e) => {
                        e.preventDefault();
                        const val = (e.currentTarget.elements.namedItem("authCode") as HTMLInputElement).value;
                        if (val) handleAuthSubmitAndAdvance(val);
                      }}
                      className="flex gap-2"
                    >
                      <input
                        type="text"
                        name="authCode"
                        placeholder="e.g. AUTH-WMCS-2026-RELEASE-SECURE"
                        defaultValue="AUTH-WMCS-2026-RELEASE-SECURE"
                        className="flex-1 bg-black/40 border border-white/10 rounded-xl px-3.5 py-2 text-xs font-mono text-white placeholder-gray-500 focus:outline-none focus:border-amber-400"
                      />
                      <button
                        type="submit"
                        className="bg-[#00F5FF] hover:bg-cyan-400 text-black font-semibold px-4 rounded-xl text-xs font-mono cursor-pointer"
                      >
                        AUTHORIZE
                      </button>
                    </form>
                  </div>
                )}

                {/* Reset or run status controller bottom bar */}
                <div className="pt-3 border-t border-white/5 flex items-center justify-between">
                  <button
                    onClick={() => {
                      setSimulationActive(false);
                      store.resetPipeline();
                    }}
                    className="flex items-center gap-1.5 px-3.5 py-1.5 bg-white/5 border border-white/10 hover:bg-white/10 rounded-lg text-[10px] font-mono text-gray-300 cursor-pointer"
                  >
                    <RotateCcw className="w-3.5 h-3.5" />
                    <span>ABORT / RESET</span>
                  </button>
                  <p className="text-[9.5px] font-mono text-gray-500">
                    SAGA SESSION RUN NUMBER: <span className="text-gray-300">#90142_KR</span>
                  </p>
                </div>

              </div>
            )}

          </section>
        </div>

        {/* RIGHT COLUMN (25%): QualityDashboard (Radar Chart & Countdown Timer) */}
        <div className="lg:col-span-3 flex flex-col space-y-5">
          <section className="bg-[#0A0B10]/80 border border-white/10 rounded-2xl p-5 shadow-lg flex-1 flex flex-col justify-between" id="quality-dashboard-panel">
            
            {/* The Competition Countdown Timer */}
            <div className="space-y-3 pb-4 border-b border-white/5">
              <div className="flex items-center justify-between text-xs font-mono">
                <div className="flex items-center gap-1.5 text-cyan-300">
                  <Clock className="w-4 h-4" />
                  <span className="font-bold tracking-wide">COMPETITION COUNTDOWN</span>
                </div>
                <span className="text-rose-400 animate-pulse font-bold font-mono">LIVE CLOCK</span>
              </div>

              <div className="p-3.5 rounded-2xl bg-gradient-to-r from-rose-950/15 to-[#0A0B10] border border-rose-500/10 text-center relative overflow-hidden">
                <span className="text-[10px] font-mono text-rose-300 uppercase tracking-widest block font-bold">
                  International AI Music Challenge 2026
                </span>
                <span className="font-mono text-xl font-extrabold text-rose-400 block mt-1.5 tracking-wider">
                  {formatCountdown(store.countdownSeconds)}
                </span>
                <span className="text-[8px] font-mono text-gray-500 block mt-1 uppercase">
                  SUBMISSION WINDOW 25% RANGE CLOSES PROXIMITY
                </span>
              </div>
            </div>

            {/* Render 10-Pillar Radar Chart in real-time */}
            <div className="space-y-4 flex-1 flex flex-col justify-center">
              <div className="flex items-center justify-between pt-2">
                <div className="flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 text-emerald-400" />
                  <h4 className="font-mono text-xs font-bold text-white uppercase tracking-wider leading-none">
                    10-PILLAR AUDIT RADAR
                  </h4>
                </div>
                <span className="font-mono text-[9px] text-[#00E676] bg-emerald-950/30 px-2 py-0.5 rounded font-bold">
                  SCORE: {store.totalScore && store.totalScore > 0 ? (selectedCountryTab.code === "US" ? `${store.totalScore}/70` : `${store.totalScore}%`) : "AWAITING"}
                </span>
              </div>

              {/* The SVG Radar Canvas */}
              <div className="mx-auto my-auto py-2">
                <QARadarChart pillars={radarPillars} size={210} />
              </div>
            </div>

            <div className="pt-4 border-t border-white/5 space-y-2.5">
              <h5 className="font-mono text-[9.5px] font-bold text-gray-400 uppercase tracking-wider">
                ACTIVE AUDIT PRESCRIPTIONS:
              </h5>
              <div className="space-y-2 text-[10px] text-gray-400 leading-normal max-h-[130px] overflow-y-auto">
                {activePrescriptions.map((prescription, idx) => {
                  const isAlert = prescription.includes("[CRITICAL") || prescription.includes("[FAIL") || prescription.includes("[PRESCRIPTION");
                  return (
                    <div key={idx} className="flex gap-2 items-start leading-relaxed">
                      <span className={isAlert ? "text-rose-400 shrink-0 font-bold" : "text-emerald-400 shrink-0"}>
                        {isAlert ? "▶" : "✓"}
                      </span>
                      <p className={isAlert ? "text-gray-300 font-mono text-[9.5px]" : "text-gray-400"}>
                        {prescription}
                      </p>
                    </div>
                  );
                })}
              </div>
            </div>

          </section>
        </div>

      </div>

    </div>
  );
}
