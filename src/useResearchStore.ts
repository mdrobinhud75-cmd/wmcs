import { create } from "zustand";
import { CountryDNA } from "./types";
import { COUNTRIES } from "./data";

export interface ResearchState {
  currentLevel: "level_2_1" | "level_2_2" | "level_2_3";
  selectedCountry: CountryDNA | null;
  selectedGenre: string;
  selectedSubgenre: string;
  
  // Running statuses
  isAgent01Running: boolean;
  isAgent02Running: boolean;
  isAgent03Running: boolean;
  
  // Outputs of agents representing contracts stored in MEMORY_TIER_2 (Google Drive)
  agent01Output: {
    status: "ARTIFACT_LOCKED" | "IDLE";
    countryCode: string;
    motto: string;
    identityAnchor: string;
    hardRules: string[];
    timestamp: string;
  } | null;

  agent02Output: {
    status: "ARTIFACT_LOCKED" | "IDLE";
    countryCode: string;
    genreCode: string;
    bpmRange: string;
    structuralRules: string[];
    timestamp: string;
  } | null;

  agent03Output: {
    status: "ARTIFACT_LOCKED" | "IDLE";
    countryCode: string;
    genreCode: string;
    subgenre: string;
    uniqueProductionIdentifier: string;
    vocabularyCluster: string[];
    subgenreSpec: string;
    timestamp: string;
  } | null;

  pipelineState: "IDLE" | "AGENT01_RUNNING" | "AGENT01_COMPLETE" | "AGENT02_RUNNING" | "AGENT02_COMPLETE" | "AGENT03_RUNNING" | "WAITING_EMOTION" | "PIPELINE_LOCKED";
  
  // Emotion Gate
  selectedEmotion: string | null;
  isEmotionLocked: boolean;
  
  // Animations and diagnostics
  goldSealActive: boolean;
  errorMessage: string | null;
  shellLogs: string[];

  // Actions
  setCountry: (code: string) => void;
  setGenre: (genre: string) => void;
  setSubgenre: (subg: string) => void;
  setLevel: (lvl: "level_2_1" | "level_2_2" | "level_2_3") => void;
  triggerAgent01: () => Promise<void>;
  triggerAgent02: () => Promise<void>;
  triggerAgent03: () => Promise<void>;
  lockMicroEmotion: (emotion: string) => Promise<void>;
  reset: () => void;
  addLog: (msg: string) => void;
}

export const useResearchStore = create<ResearchState>((set, get) => ({
  currentLevel: "level_2_1",
  selectedCountry: COUNTRIES.find(c => c.code === "KR") || COUNTRIES[0], // Start with South Korea as seeding default
  selectedGenre: "K-Pop",
  selectedSubgenre: "K-Pop Dark Concept",
  
  isAgent01Running: false,
  isAgent02Running: false,
  isAgent03Running: false,
  
  agent01Output: null,
  agent02Output: null,
  agent03Output: null,
  
  pipelineState: "IDLE",
  selectedEmotion: null,
  isEmotionLocked: false,
  goldSealActive: false,
  errorMessage: null,
  shellLogs: [
    "[RESEARCH INITIALIZED] System ready. Constitutional Handoff and Level 2.1-2.3 Active.",
    "[CULTURAL CORE] Loaded default seeding target: South Korea."
  ],

  setCountry: (code: string) => {
    const matched = COUNTRIES.find(c => c.code === code) || COUNTRIES[0];
    const defaultGenre = matched.code === "KR" ? "K-Pop" : (matched.genres[0] || "");
    const defaultSub = matched.code === "KR" ? "K-Pop Dark Concept" : `${matched.code} Contemporary Dual`;
    
    set({
      selectedCountry: matched,
      selectedGenre: defaultGenre,
      selectedSubgenre: defaultSub,
      agent01Output: null,
      agent02Output: null,
      agent03Output: null,
      selectedEmotion: null,
      isEmotionLocked: false,
      pipelineState: "IDLE"
    });
    get().addLog(`[NODE CONNECTOR] Switched geographical anchor to [${matched.code}] ${matched.name}. Reset state variables.`);
  },

  setGenre: (genre: string) => {
    set({ selectedGenre: genre });
    get().addLog(`[GENRE MATRIX] Focused tuning parameters to profile: ${genre}.`);
  },

  setSubgenre: (subg: string) => {
    set({ selectedSubgenre: subg });
    get().addLog(`[SUBGENRE SPACE] Targeted active subgenre scale: ${subg}.`);
  },

  setLevel: (lvl: "level_2_1" | "level_2_2" | "level_2_3") => {
    set({ currentLevel: lvl });
    get().addLog(`[UI_NAVIGATION] Stepped workspace view to: ${lvl.toUpperCase().replace("_", ". ")}.`);
  },

  addLog: (msg: string) => {
    const timestamp = new Date().toLocaleTimeString();
    set(state => ({
      shellLogs: [`[${timestamp}] ${msg}`, ...state.shellLogs.slice(0, 45)]
    }));
  },

  triggerAgent01: async () => {
    const { selectedCountry } = get();
    if (!selectedCountry) return;

    set({ isAgent01Running: true, errorMessage: null, pipelineState: "AGENT01_RUNNING" });
    get().addLog(`[AGENT 01] Sparking Regional DNA Profiler worker for: [${selectedCountry.code}]`);

    try {
      const response = await fetch("/api/v1/research/agent01", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ countryCode: selectedCountry.code })
      });
      const data = await response.json();

      if (response.ok && data.success) {
        set({
          agent01Output: data.package,
          isAgent01Running: false,
          pipelineState: "AGENT01_COMPLETE",
          goldSealActive: true
        });
        get().addLog(`[AGENT 01 -> PASS] Country DNA package locked! Cached to G-DRIVE: ${data.filename}`);
        get().addLog(`[IDENTITY ANCHOR] "${data.package.identityAnchor}"`);
        data.package.hardRules.forEach((rule: string) => {
          get().addLog(`   -> Rule Verification: ${rule}`);
        });

        // Trigger dopamine visual clear
        setTimeout(() => set({ goldSealActive: false }), 2000);
      } else {
        throw new Error(data.error || "Failed Country Research call");
      }
    } catch (err: any) {
      set({ isAgent01Running: false, pipelineState: "IDLE", errorMessage: err.message });
      get().addLog(`[AGENT 01 -> BLOCK] Critical failure executing country profiler: ${err.message}`);
    }
  },

  triggerAgent02: async () => {
    const { selectedCountry, selectedGenre } = get();
    if (!selectedCountry) return;

    set({ isAgent02Running: true, errorMessage: null, pipelineState: "AGENT02_RUNNING" });
    get().addLog(`[AGENT 02] Launching Genre Intelligence worker for: ${selectedGenre}`);

    try {
      const response = await fetch("/api/v1/research/agent02", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ countryCode: selectedCountry.code, genreCode: selectedGenre })
      });
      const data = await response.json();

      if (response.ok && data.success) {
        set({
          agent02Output: data.package,
          isAgent02Running: false,
          pipelineState: "AGENT02_COMPLETE",
          goldSealActive: true
        });
        get().addLog(`[AGENT 02 -> PASS] Genre brief successfully extracted! Saved to G-DRIVE: ${data.filename}`);
        get().addLog(`[BPM RANGE DETECT] Tuned spec bounds: ${data.package.bpmRange}`);
        data.package.structuralRules.forEach((rule: string) => {
          get().addLog(`   -> Structural Rule: ${rule}`);
        });

        // Trigger dopamine visual clear
        setTimeout(() => set({ goldSealActive: false }), 2000);
      } else {
        throw new Error(data.error || "Failed Genre Intelligence call");
      }
    } catch (err: any) {
      set({ isAgent02Running: false, pipelineState: "AGENT01_COMPLETE", errorMessage: err.message });
      get().addLog(`[AGENT 02 -> BLOCK] Invariant Block: ${err.message}`);
    }
  },

  triggerAgent03: async () => {
    const { selectedCountry, selectedGenre, selectedSubgenre } = get();
    if (!selectedCountry) return;

    set({ isAgent03Running: true, errorMessage: null, pipelineState: "AGENT03_RUNNING" });
    get().addLog(`[AGENT 03] Engaging Subgenre DNA Specialist for blueprint: ${selectedSubgenre}`);

    try {
      const response = await fetch("/api/v1/research/agent03", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          countryCode: selectedCountry.code,
          genreCode: selectedGenre,
          subgenreCode: selectedSubgenre
        })
      });
      const data = await response.json();

      if (response.ok && data.success) {
        set({
          agent03Output: data.package,
          isAgent03Running: false,
          pipelineState: "WAITING_EMOTION",
          goldSealActive: true
        });
        get().addLog(`[AGENT 03 -> PASS] Subgenre DNA locked. Formulated raw sonic cluster! G-DRIVE: ${data.filename}`);
        get().addLog(`[FINGERPRINT] "${data.package.uniqueProductionIdentifier}"`);

        // Trigger dopamine visual clear
        setTimeout(() => set({ goldSealActive: false }), 2000);
      } else {
        throw new Error(data.error || "Failed Subgenre DNA call");
      }
    } catch (err: any) {
      set({ isAgent03Running: false, pipelineState: "AGENT02_COMPLETE", errorMessage: err.message });
      get().addLog(`[AGENT 03 -> BLOCK] Invariant Block: ${err.message}`);
    }
  },

  lockMicroEmotion: async (emotion: string) => {
    set({ selectedEmotion: emotion, isEmotionLocked: true, pipelineState: "PIPELINE_LOCKED", goldSealActive: true });
    get().addLog(`[TYPE C LOCK] Human selected locked emotion: "${emotion}". Complete Level 2 Handoff sequence.`);
    get().addLog(`[PIPELINE LOCKED] Level 2 Research completes. Creation loop fan-out is fully ready!`);
    
    setTimeout(() => set({ goldSealActive: false }), 2000);
  },

  reset: () => {
    set({
      currentLevel: "level_2_1",
      agent01Output: null,
      agent02Output: null,
      agent03Output: null,
      pipelineState: "IDLE",
      selectedEmotion: null,
      isEmotionLocked: false,
      goldSealActive: false,
      errorMessage: null
    });
    get().addLog("[SYSTEM RESET] Restored Level 2 research variables to pristine state.");
  }
}));
