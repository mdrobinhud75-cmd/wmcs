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

export interface GenreBrief {
  code: string;
  name: string;
  bpmRange: string;
  instrumentation: string[];
  subgenres: string[];
}

export interface SubgenreBrief {
  code: string;
  name: string;
  hookPatterns: string[];
  vocabularyCluster: string[];
  arrangementBlueprint: string;
}

export type AgentStatus = 'IDLE' | 'ACTIVE' | 'PASS' | 'RETRY' | 'BLOCK' | 'FAIL';

export interface AgentInfo {
  id: string;
  name: string;
  role: string;
  status: AgentStatus;
  progress: number;
  currentTask: string;
  latencyMs: number;
  outputLog: string[];
}

export interface QAPillarScore {
  name: string;
  score: number;
  description: string;
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
  status: 'RESEARCHING' | 'WAITING_CREATIVE_LOCK' | 'CREATING' | 'QA_GATING' | 'WAITING_UPLOAD_AUTH' | 'COMPLETED' | 'FAILED';
  qaTotalScore?: number;
  lyrics?: {
    sections: { type: string; lines: string[] }[];
    hookWordCount: number;
    validated: boolean;
  };
  productionBlueprint?: {
    key: string;
    instrumentationSequence: string[];
    dynamicArc: string[];
  };
  titlesList?: { title: string; score: number; conflictChecked: boolean }[];
  qaReport?: {
    totalScore: number;
    pillarScores: QAPillarScore[];
    prescriptions: string[];
    hardRulePassed: boolean;
    cycleCount: number;
  };
  visualPackage?: {
    videoType: string;
    concept: string;
    prompt: string;
    thumbnailUrl: string;
  };
  seoPack?: {
    tags: string[];
    description: string;
    assignedSerial: string;
  };
  timestamp: string;
}

export interface EventLogEntry {
  id: string;
  timestamp: string;
  type: 'PE' | 'AE' | 'AGE' | 'ESC' | 'IE';
  eventName: string;
  pipelineId: string;
  message: string;
  status: 'INFO' | 'SUCCESS' | 'WARNING' | 'ALERT' | 'GOLD';
}
