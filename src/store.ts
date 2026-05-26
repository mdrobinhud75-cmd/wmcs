import { create } from "zustand";
import { CountryDNA, SongProject, EventLogEntry, AgentStatus, AgentInfo, QAPillarScore } from "./types";
import { COUNTRIES } from "./data";

export interface PipelineState {
  currentPhase: "Idle" | "Research" | "Creation" | "QA" | "Visuals" | "Archive";
  currentStepIndex: number;
  overallProgress: number; // 0 to 100
  totalScore: number; // calculated QA score
  targetCountry: CountryDNA | null;
  targetGenre: string;
  targetSubgenre: string;
  selectedEmotion: string | null;
  selectedTitle: string | null;
  
  // 17 Agents state represent
  agentStatuses: Record<string, AgentStatus>;
  agentData: Record<string, AgentInfo>;

  // Streaming buffers
  promptStreamLogs: string[];
  currentStreamingText: string;
  isStreaming: boolean;

  // Human inputs gateway
  showHumanGate: boolean;
  humanGateType: "emotion" | "title" | "upload" | null;
  gateOptions: string[];
  uploadAuthString: string;

  // Active compiled objects
  activeProject: SongProject | null;
  historicalProjects: SongProject[];

  // Countdown timer in seconds
  countdownSeconds: number;

  // Actions
  initializePipeline: (countryCode: string, genre: string, category: string) => void;
  resetPipeline: () => void;
  setAgentStatus: (id: string, status: AgentStatus) => void;
  setAgentProgress: (id: string, prog: number, task: string) => void;
  appendStreamLog: (log: string) => void;
  setStreamingText: (text: string) => void;
  setIsStreaming: (val: boolean) => void;
  triggerHumanGate: (type: "emotion" | "title" | "upload", options: string[]) => void;
  resolveHumanGate: (selection: string) => void;
  updateScore: (score: number) => void;
  updateOverallProgress: () => void;
  setCountdownSeconds: (secs: number) => void;
  resumeSessionFromCache: () => void;
  runAutoTaskSimulation: (onLogAdded: (type: string, name: string, msg: string, status: string) => void) => void;
}

const INITIAL_NODES = {
  "01": { id: "01", name: "Country Research", role: "Agent 01 (Research)", status: "IDLE" as AgentStatus, progress: 0, currentTask: "Awaiting ignition", latencyMs: 12, outputLog: [] },
  "02": { id: "02", name: "Genre Intelligence", role: "Agent 02 (Genre)", status: "IDLE" as AgentStatus, progress: 0, currentTask: "Awaiting ignition", latencyMs: 15, outputLog: [] },
  "03": { id: "03", name: "Subgenre DNA Specialist", role: "Agent 03 (Briefing)", status: "IDLE" as AgentStatus, progress: 0, currentTask: "Awaiting ignition", latencyMs: 22, outputLog: [] },
  "04": { id: "04", name: "Lyrics Engineering", role: "Agent 04 (Lyrics)", status: "IDLE" as AgentStatus, progress: 0, currentTask: "Awaiting ignition", latencyMs: 140, outputLog: [] },
  "05": { id: "05", name: "Title Engine", role: "Agent 05 (Titles)", status: "IDLE" as AgentStatus, progress: 0, currentTask: "Awaiting ignition", latencyMs: 45, outputLog: [] },
  "06": { id: "06", name: "Music Style Blueprint", role: "Agent 06 (Music)", status: "IDLE" as AgentStatus, progress: 0, currentTask: "Awaiting ignition", latencyMs: 95, outputLog: [] },
  "07": { id: "07", name: "10-Pillar Auditor", role: "Agent 07 (QA Gate)", status: "IDLE" as AgentStatus, progress: 0, currentTask: "Awaiting ignition", latencyMs: 185, outputLog: [] },
  "08": { id: "08", name: "Video Concept Creator", role: "Agent 08 (Visuals)", status: "IDLE" as AgentStatus, progress: 0, currentTask: "Awaiting ignition", latencyMs: 50, outputLog: [] },
  "09": { id: "09", name: "Video Prompt Engine", role: "Agent 09 (Storyboards)", status: "IDLE" as AgentStatus, progress: 0, currentTask: "Awaiting ignition", latencyMs: 35, outputLog: [] },
  "10": { id: "10", name: "Thumbnail Illustrator", role: "Agent 10 (Graphics)", status: "IDLE" as AgentStatus, progress: 0, currentTask: "Awaiting ignition", latencyMs: 110, outputLog: [] },
  "11": { id: "11", name: "SEO Metadata Packager", role: "Agent 11 (SEO Core)", status: "IDLE" as AgentStatus, progress: 0, currentTask: "Awaiting ignition", latencyMs: 18, outputLog: [] },
  "12": { id: "12", name: "Platform Deployer", role: "Agent 12 (Upload)", status: "IDLE" as AgentStatus, progress: 0, currentTask: "Awaiting ignition", latencyMs: 25, outputLog: [] },
  "13": { id: "13", name: "Catalog Archiver", role: "Agent 13 (Google Sync)", status: "IDLE" as AgentStatus, progress: 0, currentTask: "Awaiting ignition", latencyMs: 8, outputLog: [] },
  "14": { id: "14", name: "Underground Radar", role: "Agent 14 (Music trends Scan)", status: "ACTIVE" as AgentStatus, progress: 100, currentTask: "Scanning live charts", latencyMs: 44, outputLog: [] },
  "15": { id: "15", name: "Memory Fabric Sync", role: "Agent 15 (Context recall)", status: "PASS" as AgentStatus, progress: 100, currentTask: "Indexing cache blocks", latencyMs: 4, outputLog: [] },
  "16": { id: "16", name: "Video Layout Editor", role: "Agent 16 (Render)", status: "IDLE" as AgentStatus, progress: 0, currentTask: "Awaiting ignition", latencyMs: 70, outputLog: [] },
  "17": { id: "17", name: "Human Supervisor", role: "Agent 17 (Triage & Gate)", status: "ACTIVE" as AgentStatus, progress: 100, currentTask: "Awaiting human overrides", latencyMs: 2, outputLog: [] }
};

export const usePipelineStore = create<PipelineState>((set, get) => ({
  currentPhase: "Idle",
  currentStepIndex: 0,
  overallProgress: 0,
  totalScore: 0,
  targetCountry: null,
  targetGenre: "",
  targetSubgenre: "",
  selectedEmotion: null,
  selectedTitle: null,
  
  agentStatuses: {
    "01": "IDLE", "02": "IDLE", "03": "IDLE", "04": "IDLE", "05": "IDLE",
    "06": "IDLE", "07": "IDLE", "08": "IDLE", "09": "IDLE", "10": "IDLE",
    "11": "IDLE", "12": "IDLE", "13": "IDLE", "14": "ACTIVE", "15": "PASS",
    "16": "IDLE", "17": "ACTIVE"
  },
  agentData: INITIAL_NODES,

  promptStreamLogs: [
    "[SYSTEM INITIALIZED] Welcome to WMCS Command Shell. Operational Protocol v3.0 loaded.",
    "[CONSTITUTION SECURITY] Level 1 Autonomy engaged. 80% Agent Sequence / 20% Irreducible Human Gate active.",
    "[STATUS] Awaiting Target Context intake to trigger step SEQUENCE."
  ],
  currentStreamingText: "",
  isStreaming: false,

  showHumanGate: false,
  humanGateType: null,
  gateOptions: [],
  uploadAuthString: "",

  activeProject: null,
  historicalProjects: [],

  countdownSeconds: 1032, // Remaining for the Competition Submission Window

  initializePipeline: (countryCode: string, genre: string, category: string) => {
    const country = COUNTRIES.find(c => c.code === countryCode) || COUNTRIES[0];
    const newProject: SongProject = {
      id: `proj_${Date.now()}`,
      title: "PENDING_CREATIVE_LOCK",
      countryCode,
      genreCode: genre,
      subgenreCode: country.genres[0] || "Contemporary Pop",
      emotion: "",
      bpm: 120,
      status: "RESEARCHING",
      timestamp: new Date().toISOString()
    };

    // Reset statuses
    const resetStatuses = { ...get().agentStatuses };
    Object.keys(resetStatuses).forEach(k => {
      if (!["14", "15", "17"].includes(k)) {
        resetStatuses[k] = "IDLE";
      }
    });

    const refreshedAgentData = { ...get().agentData };
    Object.keys(refreshedAgentData).forEach(k => {
      if (!["14", "15", "17"].includes(k)) {
        refreshedAgentData[k] = {
          ...refreshedAgentData[k],
          status: "IDLE" as AgentStatus,
          progress: 0,
          currentTask: "Awaiting pipeline ignition"
        };
      }
    });

    set({
      currentPhase: "Research",
      currentStepIndex: 1,
      targetCountry: country,
      targetGenre: genre,
      targetSubgenre: category,
      selectedEmotion: null,
      selectedTitle: null,
      agentStatuses: resetStatuses,
      agentData: refreshedAgentData,
      overallProgress: 5,
      activeProject: newProject,
      showHumanGate: false,
      humanGateType: null,
      gateOptions: [],
      promptStreamLogs: [
        `[PE-001 INITIALIZED] Pipeline ignited for target region: ${country.name} (${country.code})`,
        `[GENRE STACK] Standard set to: ${genre} // Category set to: ${category}`,
        `[CVA CONFIG] Critical Hard Rules loaded: ${country.hardRules.length} country rules mapped.`,
        `[SAGA TRIGGER] Sequentially booting Phase A: Research Layer (Agents 01 -> 02 -> 03)...`
      ]
    });
  },

  resetPipeline: () => {
    set({
      currentPhase: "Idle",
      currentStepIndex: 0,
      overallProgress: 0,
      totalScore: 0,
      targetCountry: null,
      targetGenre: "",
      targetSubgenre: "",
      selectedEmotion: null,
      selectedTitle: null,
      agentStatuses: {
        "01": "IDLE", "02": "IDLE", "03": "IDLE", "04": "IDLE", "05": "IDLE",
        "06": "IDLE", "07": "IDLE", "08": "IDLE", "09": "IDLE", "10": "IDLE",
        "11": "IDLE", "12": "IDLE", "13": "IDLE", "14": "ACTIVE", "15": "PASS",
        "16": "IDLE", "17": "ACTIVE"
      },
      agentData: INITIAL_NODES,
      showHumanGate: false,
      humanGateType: null,
      gateOptions: [],
      promptStreamLogs: [
        "[SYSTEM RESET] Sovereign OS back to pristine state.",
        "[STATUS] Awaiting Target Context intake to trigger step SEQUENCE."
      ],
      currentStreamingText: "",
      activeProject: null
    });
  },

  setAgentStatus: (id: string, status: AgentStatus) => {
    set(state => {
      const updatedStatuses = { ...state.agentStatuses, [id]: status };
      const updatedAgentData = {
        ...state.agentData,
        [id]: { ...state.agentData[id], status }
      };
      return {
        agentStatuses: updatedStatuses,
        agentData: updatedAgentData
      };
    });
    get().updateOverallProgress();
  },

  setAgentProgress: (id: string, progress: number, currentTask: string) => {
    set(state => {
      const updatedAgentData = {
        ...state.agentData,
        [id]: { ...state.agentData[id], progress, currentTask }
      };
      return { agentData: updatedAgentData };
    });
  },

  appendStreamLog: (log: string) => {
    set(state => {
      const logs = [...state.promptStreamLogs, log];
      if (logs.length > 150) logs.shift();
      return { promptStreamLogs: logs };
    });
  },

  setStreamingText: (text: string) => {
    set({ currentStreamingText: text });
  },

  setIsStreaming: (isStreaming: boolean) => {
    set({ isStreaming });
  },

  triggerHumanGate: (type: "emotion" | "title" | "upload", options: string[]) => {
    set({
      showHumanGate: true,
      humanGateType: type,
      gateOptions: options
    });
  },

  resolveHumanGate: (selection: string) => {
    const { humanGateType, activeProject, targetCountry } = get();
    if (!activeProject) return;

    if (humanGateType === "emotion") {
      const updatedPrj: SongProject = {
        ...activeProject,
        emotion: selection,
        status: "CREATING"
      };
      set({
        selectedEmotion: selection,
        showHumanGate: false,
        humanGateType: null,
        activeProject: updatedPrj,
        currentPhase: "Creation"
      });
      get().appendStreamLog(`[HUMAN INTEGRATION LOCKED] Micro-Emotion Selected: "${selection}". Soul vector locked.`);
      get().appendStreamLog(`[PE-002 FAN-OUT] Instantly spawning Parallel Creation Layer (Agents 04, 05, and 06) simultaneously...`);
    } else if (humanGateType === "title") {
      const updatedPrj: SongProject = {
        ...activeProject,
        title: selection,
        status: "QA_GATING"
      };
      set({
        selectedTitle: selection,
        showHumanGate: false,
        humanGateType: null,
        activeProject: updatedPrj
      });
      get().appendStreamLog(`[HUMAN INTEGRATION LOCKED] Final Song Title approved: "${selection}". Trademark/neutrality check passed.`);
      get().appendStreamLog(`[PE-003 SYNCHRONIZED CONVERGENCE] CREATION_SYNC_READY received from all creation units. Engaging Agent 07 (Quality Gate Auditor).`);
    } else if (humanGateType === "upload") {
      const serialSn = `WMCS-${targetCountry?.code || "GL"}-${activeProject.genreCode.toUpperCase().replace(/[^A-Z]/g, "")}-2026-00${Math.floor(Math.random() * 90) + 10}`;
      const completedPrj: SongProject = {
        ...activeProject,
        serialNumber: serialSn,
        status: "COMPLETED",
        qaTotalScore: get().totalScore || 94
      };
      set({
        showHumanGate: false,
        humanGateType: null,
        activeProject: completedPrj,
        currentPhase: "Archive",
        overallProgress: 100
      });
      get().appendStreamLog(`[HUMAN INTEGRATION LOCKED] Platform Release Authorization key verified: "${selection}". Launch sequence engaged!`);
      get().appendStreamLog(`[SYSTEM MATURITY REACHED] LEVEL 1 (Constitutionally Governed) status achieved.`);
      get().appendStreamLog(`[ARCHIVE SUCCESS] Serial registered: "${serialSn}". Google Drive sync validated. Artist Statement drafted.`);
    }
  },

  updateScore: (score: number) => {
    set({ totalScore: score });
  },

  updateOverallProgress: () => {
    // Weighted progress calculation based on active agent status
    const statuses = get().agentStatuses;
    let weightSum = 0;
    let completedCount = 0;

    Object.keys(statuses).forEach((id) => {
      // 14, 15, 17 are auxiliary persistent
      if (["14", "15", "17"].includes(id)) return;
      weightSum += 1;
      if (statuses[id] === "PASS" || statuses[id] === "FAIL") {
        completedCount += 1;
      } else if (statuses[id] === "ACTIVE") {
        completedCount += 0.5;
      }
    });

    const progressPercentage = Math.round((completedCount / weightSum) * 90) + 5; // offset 5% base
    set({ overallProgress: Math.min(100, progressPercentage) });
  },

  setCountdownSeconds: (secs: number) => {
    set({ countdownSeconds: secs });
  },

  resumeSessionFromCache: () => {
    // Reconstruct cache details representing Agent 15/16 memory fabric sync
    const country = COUNTRIES.find(c => c.code === "KR") || COUNTRIES[1];
    const resumedProject: SongProject = {
      id: "proj_9934KR",
      title: "Midnight Seoul Reflection",
      countryCode: "KR",
      genreCode: "K-Pop",
      subgenreCode: "KR-ELEVATED",
      emotion: "Ethereal Nostalgia",
      bpm: 114,
      status: "WAITING_CREATIVE_LOCK",
      timestamp: new Date().toISOString()
    };

    const restoredStatuses: Record<string, AgentStatus> = {
      "01": "PASS",
      "02": "PASS",
      "03": "PASS",
      "04": "ACTIVE",
      "05": "PASS",
      "06": "ACTIVE",
      "07": "IDLE",
      "08": "IDLE",
      "09": "IDLE",
      "10": "IDLE",
      "11": "IDLE",
      "12": "IDLE",
      "13": "PASS",
      "14": "ACTIVE",
      "15": "PASS",
      "16": "IDLE",
      "17": "ACTIVE"
    };

    set({
      currentPhase: "Creation",
      currentStepIndex: 4,
      overallProgress: 45,
      targetCountry: country,
      targetGenre: "K-Pop",
      targetSubgenre: "KR-ELEVATED",
      selectedEmotion: "Ethereal Nostalgia",
      selectedTitle: null,
      agentStatuses: restoredStatuses,
      activeProject: resumedProject,
      promptStreamLogs: [
        "[AGENT 15 RECOVERY ENGAGED] Reconstructing episodic context block...",
        "[REDIS RECOVERY] Session token identified. Decrypting state variables...",
        "[G-DRIVE CLOUD] Drive checksum correct. Matching schema index.",
        "[SUCCESS] Context recovered! Resuming from intermediate creation state."
      ],
      currentStreamingText: ""
    });
  },

  // Beautiful simulation loop coordinating the agents character-by-character
  runAutoTaskSimulation: (onLogAdded: (type: string, name: string, msg: string, status: string) => void) => {
    const state = get();
    const { activeProject, targetCountry, targetGenre, targetSubgenre } = state;
    if (!activeProject || !targetCountry) return;

    const delayMultiplier = 1400;

    // Helper to stream character-by-character to the prompt output shell
    const streamToTerminal = (text: string, onComplete: () => void) => {
      set({ isStreaming: true });
      let currentIdx = 0;
      const interval = setInterval(() => {
        const partial = text.substring(0, currentIdx + 4);
        set({ currentStreamingText: partial });
        currentIdx += 4;
        if (currentIdx >= text.length) {
          clearInterval(interval);
          set({
            isStreaming: false,
            currentStreamingText: ""
          });
          onComplete();
        }
      }, 10);
    };

    // Sequential Phase A: Research Layer
    // Steps coordinator
    const runResearchA1 = () => {
      set({ currentPhase: "Research" });
      get().setAgentStatus("01", "ACTIVE");
      get().setAgentProgress("01", 35, "Scanning geographic database and regulatory maps...");
      onLogAdded("PE", "AGENT_01_IGNITED", "Agent 01 (Country Research) ignited.", "INFO");

      setTimeout(() => {
        get().setAgentProgress("01", 85, "Extracting identity anchors and constitutional constraints...");
        get().appendStreamLog(`[01-RESEARCHER] Loading local structural guidelines for country code: ${targetCountry.code}...`);
        
        setTimeout(() => {
          get().setAgentStatus("01", "PASS");
          get().setAgentProgress("01", 100, "Research completed. Anchors recorded.");
          get().appendStreamLog(`[01-RESEARCH] PASS. Anchor: "${targetCountry.motto}". Hard Rules extracted:`);
          targetCountry.hardRules.forEach((rule) => {
            get().appendStreamLog(`   -> ${rule}`);
          });
          onLogAdded("PE", "AGENT_01_PASS", `Agent 01 completed research for ${targetCountry.name}.`, "SUCCESS");

          // Trigger A2
          runResearchA2();
        }, delayMultiplier);
      }, delayMultiplier);
    };

    const runResearchA2 = () => {
      get().setAgentStatus("02", "ACTIVE");
      get().setAgentProgress("02", 40, `Querying real-world benchmarks for genre: ${targetGenre}...`);
      
      setTimeout(() => {
        get().setAgentProgress("02", 90, "Sorting musicological competition targets...");
        get().appendStreamLog(`[02-GENRE] Pulling target standards... Identified Classic/Modern benchmarks.`);
        
        setTimeout(() => {
          get().setAgentStatus("02", "PASS");
          get().setAgentProgress("02", 100, "Benchmarks isolated.");
          get().appendStreamLog(`[02-GENRE] PASS. Cultural Benchmarks isolated:`);
          targetCountry.benchmarks.forEach((bench) => {
            get().appendStreamLog(`   -> ${bench}`);
          });
          onLogAdded("PE", "AGENT_02_PASS", `Agent 02 completed benchmarks parsing for ${targetGenre}.`, "SUCCESS");

          // Trigger A3
          runResearchA3();
        }, delayMultiplier);
      }, delayMultiplier);
    };

    const runResearchA3 = () => {
      get().setAgentStatus("03", "ACTIVE");
      get().setAgentProgress("03", 50, "Generating detailed Subgenre DNA structural brief...");

      setTimeout(() => {
        get().setAgentProgress("03", 95, "Synthesizing scenario emotions...");
        get().appendStreamLog(`[03-DNA] Formulating hybrid composition architecture.`);
        
        setTimeout(() => {
          get().setAgentStatus("03", "PASS");
          get().setAgentProgress("03", 100, "Subgenre brief compiled. Pushing Human Gate.");
          get().appendStreamLog(`[03-DNA] PASS. Subgenre brief formulated. Integrated Sonic Fingerprint: "${targetCountry.sonicDNAString}"`);
          
          // Trigger Human Gate for Micro-Emotions
          const countryEmotionsMap: Record<string, string[]> = {
            US: ["Sunset Strip Catharsis", "Post-Static Breakthrough", "Desert Horizon Dawn", "Neon Rain Release", "Shattered Mirrors Ascent"],
            KR: ["한의 복수 (Reclaimed Han - Silent Fury)", "흥의 해방 (Reclaimed Heung - Kinetic Liberation)", "독기 (Dokhye - Venomous Sovereign Strike)", "정의 폭발 (Reclaimed Jeong - Bond of Power)", "환희의 부활 (Ethereal Rebirth of Han)"],
            BR: ["Favela Heat Carnival", "Bossa Solitude Chill", "Amazonian Tribal Rhythm", "Samba-Jazz vintage dynamic", "Heavy industrial escape"],
            JP: ["Shibuya Neon Glitter", "Anime-Core nostalgic overdrive", "Zen minimalistic flow", "Retro-Synth chiptune bliss", "Gagaku ritual mystery"],
            ZA: ["Log-Drum Deep spiritualism", "Zulu choral pride", "Pretoria Afro-house joy", "Late-night Soweto energy", "Kwaito street celebration"],
            NG: ["Lagos Afrobeats high-vibe", "Highlife organic warmth", "Gbedu dynamic street swag", "Pidgin spiritual gratitude", "Afro-fusion romantic glow"],
            GB: ["London Drill heavy grit", "Socio-realist concrete poetry", "Midnight garage haze", "Cyber-grime rapid attack", "Industrial estate focus"]
          };
          const options = countryEmotionsMap[targetCountry.code] || ["Cyber Kinetic Joy", "Ambient Retro Melancholy", "Warm Organic Heritage", "Aggressive Electro Protest", "Ethereal Sacred Stasis"];
          
          set({ currentStepIndex: 2 });
          get().triggerHumanGate("emotion", options);
          get().appendStreamLog(`[IRREDUCIBLE HUMAN GATE ALERT] Please select 1 of 5 scenario-based Micro-Emotions to stamp the song's creative core.`);
          onLogAdded("AGE", "HUMAN_GATE_TRIGGERED", "Awaiting human selection on Micro-Emotion.", "ALERT");
        }, delayMultiplier);
      }, delayMultiplier);
    };

    // Parallel Phase B: Creation Layer (called after human selects emotion)
    // We will initiate the creation simulation inside Dashboard component upon trigger!
    
    // Let's call the initial igniter
    runResearchA1();
  }
}));
