import { create } from "zustand";

/**
 * World Music Champion System (WMCS v3.0)
 * Master Zustand Pipeline State Store for Next.js App Router Integration
 * 
 * Enforces the Constitutional State Machine:
 * - Autonomy Framework (80% tech automation / 20% irreducible human decisions)
 * - Convergence Gating (Parallel execution of lyrics/title/production)
 * - Monotonic progression barriers
 */

export type AgentStatus = "IDLE" | "ACTIVE" | "PASS" | "RETRY" | "BLOCK" | "FAIL";

export interface CountryDNA {
  code: string;
  name: string;
  accentColor: string;
  motto: string;
  identityStatement: string;
  sonicDNAString: string;
  genres: string[];
  hardRules: string[];
  benchmarks: string[];
}

export interface SongProject {
  id: string;
  serialNumber?: string;
  title: string;
  countryCode: string;
  genreCode: string;
  subgenreCode: string;
  emotion: string;
  bpm: number;
  status: "RESEARCHING" | "WAITING_CREATIVE_LOCK" | "CREATING" | "QA_GATING" | "WAITING_UPLOAD_AUTH" | "COMPLETED" | "FAILED";
  timestamp: string;
}

export interface PipelineState {
  currentPhase: "Idle" | "Research" | "Creation" | "QA" | "Visuals" | "Archive";
  currentStepIndex: number;
  overallProgress: number;
  totalScore: number;
  targetCountry: CountryDNA | null;
  targetGenre: string;
  targetSubgenre: string;
  selectedEmotion: string | null;
  selectedTitle: string | null;
  
  // 17-agent nodes tracking
  agentStatuses: Record<string, AgentStatus>;
  promptStreamLogs: string[];
  showHumanGate: boolean;
  humanGateType: "emotion" | "title" | "upload" | null;
  gateOptions: string[];

  // Core Actions
  initializePipeline: (countryCode: string, genre: string, subgenre: string) => void;
  setAgentStatus: (id: string, status: AgentStatus) => void;
  appendStreamLog: (log: string) => void;
  triggerHumanGate: (type: "emotion" | "title" | "upload", options: string[]) => void;
  resolveHumanGate: (selection: string) => void;
  resetPipeline: () => void;
}

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
  
  promptStreamLogs: [
    "[SOVEREIGN OS v3.0] Central Command initialized.",
    "[CONSTITUTION SECURITY] Level 1 Autonomy active. 80-20 limits locked."
  ],

  showHumanGate: false,
  humanGateType: null,
  gateOptions: [],

  initializePipeline: (countryCode, genre, subgenre) => {
    set({
      currentPhase: "Research",
      currentStepIndex: 1,
      targetCountry: {
        code: countryCode,
        name: countryCode === "US" ? "United States" : "South Korea",
        accentColor: countryCode === "US" ? "#FF6B35" : "#FF4ECD",
        motto: "Sovereign node initialized",
        identityStatement: "Modular synthetic grooves combined with acoustic variables",
        sonicDNAString: "High transient click 808s, rhythmic vocal compression",
        genres: [genre],
        hardRules: ["Hook must arrive within 20s", "Must contain concrete noun per line"],
        benchmarks: ["Billboard Hot 100 proximity metrics"]
      },
      targetGenre: genre,
      targetSubgenre: subgenre,
      overallProgress: 5,
      promptStreamLogs: [
        `[PE-001] Main sequence booted for target region ${countryCode}`,
        `[SAGE INTAKE] Locked targets genre: ${genre} // Subgenre: ${subgenre}`,
        `[AGENT 01] Running cultural ethnomusicology scans...`
      ]
    });
  },

  setAgentStatus: (id, status) => {
    set(state => ({
      agentStatuses: { ...state.agentStatuses, [id]: status }
    }));
  },

  appendStreamLog: (log) => {
    set(state => ({
      promptStreamLogs: [...state.promptStreamLogs.slice(-100), `[${new Date().toLocaleTimeString()}] ${log}`]
    }));
  },

  triggerHumanGate: (type, options) => {
    set({
      showHumanGate: true,
      humanGateType: type,
      gateOptions: options
    });
  },

  resolveHumanGate: (selection) => {
    const { humanGateType } = get();
    if (humanGateType === "emotion") {
      set({
        selectedEmotion: selection,
        showHumanGate: false,
        humanGateType: null,
        currentPhase: "Creation"
      });
      get().appendStreamLog(`[HUMAN L1 ACCEPTED] Emotion locked: "${selection}". Spawning Agent 04/05/06.`);
    } else if (humanGateType === "title") {
      set({
        selectedTitle: selection,
        showHumanGate: false,
        humanGateType: null
      });
      get().appendStreamLog(`[HUMAN L1 ACCEPTED] Title locked: "${selection}". Releasing Agent 07 Auditer.`);
    } else if (humanGateType === "upload") {
      set({
        showHumanGate: false,
        humanGateType: null,
        currentPhase: "Archive",
        overallProgress: 100
      });
      get().appendStreamLog("[HUMAN L1 ACCEPTED] Platform Release Key approved.");
    }
  },

  resetPipeline: () => {
    set({
      currentPhase: "Idle",
      currentStepIndex: 0,
      overallProgress: 0,
      targetCountry: null,
      targetGenre: "",
      targetSubgenre: "",
      selectedEmotion: null,
      selectedTitle: null,
      showHumanGate: false,
      humanGateType: null
    });
  }
}));
