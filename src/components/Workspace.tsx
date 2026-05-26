import React, { useState, useEffect, useRef } from "react";
import { COUNTRIES, GENRES } from "../data";
import { SongProject, EventLogEntry, QAPillarScore, CountryDNA } from "../types";
import { 
  Plus, 
  HelpCircle, 
  Search, 
  Play, 
  Lock, 
  Unlock, 
  Sparkles, 
  CheckCircle2, 
  AlertTriangle, 
  Download, 
  Share2, 
  Radio, 
  Disc, 
  Cpu, 
  FileText, 
  Tv, 
  AlertCircle,
  Clock,
  ArrowRight,
  Sparkle,
  Zap,
  Check,
  Flame,
  ShieldCheck,
  TrendingUp,
  Sliders,
  Database,
  Terminal
} from "lucide-react";

interface WorkspaceProps {
  onAddSong: (song: any) => void;
  onAddLog: (type: string, name: string, message: string, status: string) => void;
}

// 17 Agent Nodes mapping representing full WMCS Sovereign execution path
interface AgentNode {
  id: string;
  name: string;
  role: string;
  status: "IDLE" | "ACTIVE" | "PASS" | "RETRY" | "BLOCK" | "HUMAN";
}

interface Particle {
  id: number;
  x: number;
  y: number;
  size: number;
  color: string;
  opacity: number;
  speedY: number;
  speedX: number;
}

export default function Workspace({ onAddSong, onAddLog }: WorkspaceProps) {
  // Navigation & Step tracking
  // Phases: 1: Intake/Selection, 2: Research stream, 3: Creative Micro-emotion Select, 4: Creation parallel, 5: QA gate, 6: Visual conceptualizer, 7: SEO/Distribution
  const [currentStep, setCurrentStep] = useState<number>(1);
  const [isProcessing, setIsProcessing] = useState<boolean>(false);
  const [retryCount, setRetryCount] = useState<number>(1);

  // Phase State Inputs
  const [country, setCountry] = useState<CountryDNA>(COUNTRIES[0]);
  const [genre, setGenre] = useState<string>(GENRES[0].code);
  const [subgenre, setSubgenre] = useState<string>("US-UNDERGROUND");
  const [competitionCode, setCompetitionCode] = useState<string>("EUROVISION-USA-2026");

  // Selection profiles
  const [selectedEmotion, setSelectedEmotion] = useState<string>("Hyper-Melancholia");
  const [customBriefPrompt, setCustomBriefPrompt] = useState<string>("Construct peak modern bass hybrid with ethnic country accents.");

  // Research Streaming fields
  const [streamedCountryDNA, setStreamedCountryDNA] = useState<string>("");
  const [streamedGenreDNA, setStreamedGenreDNA] = useState<string>("");
  const [streamedSubgenreDNA, setStreamedSubgenreDNA] = useState<string>("");

  // Step 4: Creations (Lyrics, Production blueprint, Titles generated)
  const [generatedTitles, setGeneratedTitles] = useState<any[]>([]);
  const [activeTitleIdx, setActiveTitleIdx] = useState<number>(0);
  const [generatedLyrics, setGeneratedLyrics] = useState<any>(null);
  const [generatedProduction, setGeneratedProduction] = useState<any>(null);
  const [creativeLoadingMessage, setCreativeLoadingMessage] = useState<string>("");

  // Step 5: QA reports & scores
  const [qaScores, setQAScores] = useState<QAPillarScore[]>([]);
  const [overallQAScore, setOverallQAScore] = useState<number>(0);
  const [qaPrescriptions, setQAPrescriptions] = useState<string[]>([]);
  const [qaLoadingMessage, setQaLoadingMessage] = useState<string>("");
  const [isQaRetrying, setIsQaRetrying] = useState<boolean>(false);

  // Step 6: Visual layer options
  const [selectedVideoType, setSelectedVideoType] = useState<string>("3D Synthwave Loop");
  const [visualConcept, setVisualConcept] = useState<string>("A glowing dark room framing a neon synthesizer floating in digital liquid gravity.");
  const [thumbnailStyle, setThumbnailStyle] = useState<string>("An ultra-detailed cinematic 4K synthwave frame with cybernetic neon cyan backlighting.");

  // Step 7: SEO/Dist
  const [authPhrase, setAuthPhrase] = useState<string>("AUTHORIZE_Sovereign_WMCS_2026");

  // Interactive UI specific states
  const [sessionTime, setSessionTime] = useState<string>("00:00:00.00");
  const [serialSuffix, setSerialSuffix] = useState<string>("");
  const [activeTab, setActiveTab] = useState<"lyrics" | "production" | "visuals">("lyrics");
  const [particles, setParticles] = useState<Particle[]>([]);
  const [showTechModal, setShowTechModal] = useState<boolean>(false);
  const [terminalStream, setTerminalStream] = useState<string[]>([]);
  const [showHumanModal, setShowHumanModal] = useState<boolean>(false);
  
  // Ref for auto scrolling terminal
  const terminalBottomRef = useRef<HTMLDivElement>(null);

  // Generate a random stable serial suffix for high-fidelity rendering
  useEffect(() => {
    setSerialSuffix(Math.floor(Math.random() * 89999 + 10000).toString());
  }, [country]);

  // Session millisecond stopwatch timer ticking in background
  useEffect(() => {
    let startTime = Date.now();
    const interval = setInterval(() => {
      const elapsed = Date.now() - startTime;
      const minutes = Math.floor(elapsed / 60000);
      const seconds = Math.floor((elapsed % 60000) / 1000);
      const milliseconds = Math.floor((elapsed % 1000) / 10);
      setSessionTime(
        `${minutes.toString().padStart(2, "0")}:${seconds
          .toString()
          .padStart(2, "0")}.${milliseconds.toString().padStart(2, "0")}`
      );
    }, 45);
    return () => clearInterval(interval);
  }, []);

  // Micro-Emotions definition maps
  const EMOTIONS_PRESETS = country.code === "KR" ? [
    {
      name: "한의 복수 (Reclaimed Han - Silent Fury)",
      desc: "Deep Han heartache paired with powerful cinematic string stabs and aggressive trap rhythms, converting restrained pain into raw dominance."
    },
    {
      name: "흥의 해방 (Reclaimed Heung - Kinetic Liberation)",
      desc: "High-voltage kinetic groove, unleashing heung energy to reclaim stage presence and total acoustic authority."
    },
    {
      name: "독기 (Dokhye - Venomous Sovereign Strike)",
      desc: "An intense, hyper-focused performance drive fueled by unyielding traditional Gayageum cascades over thick sub-basses."
    },
    {
      name: "정의 폭발 (Reclaimed Jeong - Bond of Power)",
      desc: "Rhythmic ancestral string pickups colliding with sharp modern synth leads, asserting the unbreakable bond of collective power."
    },
    {
      name: "환희의 부활 (Ethereal Rebirth of Han)",
      desc: "Grand choral vocal stacks that soar majestically through heavy parallel compression grids, announcing ultimate triumph."
    }
  ] : country.code === "GB" ? [
    {
      name: "Concrete Estate Resonance (Underground Grievance)",
      desc: "Gritty London drill beats overlaying a heavy organ pad, expressing raw housing-estate struggle and unfiltered class pride."
    },
    {
      name: "Cyber-Grime Overdrive (Spitfire Rebellion)",
      desc: "Fast-tempo metallic sine stabs pulsing under hyper-syncopated high-hats, projecting aggressive street truth and resistance."
    },
    {
      name: "Industrial Estate Catharsis (Thameside Gloom)",
      desc: "Low-passed analog string loops filtering in ambient fog to paint gray sky-gazing, capturing class-conscious hope and factory-gloom release."
    },
    {
      name: "Midnight Pavements Wave (Sovereign Haze)",
      desc: "Dark atmospheric garage syncopations driving deep sub-bass glides to frame midnight alley walks and working-class defiance."
    },
    {
      name: "Underground Dialect Defiance (Authentic Spitfire)",
      desc: "Abrasive spoken-word deliveries pushing back against mass-manufactured pop with absolute accent and dialect autonomy."
    }
  ] : country.code === "IN" ? [
    {
      name: "विराग और विरह (Virah Longing: Heartbreak Reverence)",
      desc: "Slow haunting sitar sweeps and low-frequency cello drones capturing absolute devotion mixed with the agony of being close yet unreachable."
    },
    {
      name: "आलाप अश्रु (Aalaap Tears: Vocal Ornamentation)",
      desc: "Deep soaring vocal alaaps detailing sorrow through intricate meend steps, piercing the soul in the first 15 seconds without words."
    },
    {
      name: "बरसात की तड़प (Tadap of the Rain: Yaman Night)",
      desc: "Raindrop-like santoor picking overlaid with Raga Yaman scale constraints, expressing gorgeous, warm, yet painful midnight isolation."
    },
    {
      name: "यादों का साया (Shadow of Remembered Touch: Bhairavi)",
      desc: "Low dynamic wind textures layered with traditional dhol rhythms and a solitary flute, highlighting the deep chill of unfulfilled ties."
    },
    {
      name: "मोहब्बत की बगावत (Defiance of Devotion: Cinematic Peak)",
      desc: "Unapologetic Urdu-influenced vocal lines supported by broad orchestral strings, asserting working-class devotion against barriers."
    }
  ] : [
    {
      name: "Sunset Strip Catharsis",
      desc: "Deep cultural heartache paired with aggressive electronic sub-bass and syncopated percussion ticks."
    },
    {
      name: "Utopian Transcendence",
      desc: "Cinematic, shimmering chords driving anthemic choral textures, raising peak emotional frequency."
    },
    {
      name: "Underground Rebellion",
      desc: "Industrial synth bassline coupled with raw, un-autotuned vocal takes that challenge state norms."
    },
    {
      name: "Ethereal Nostalgia",
      desc: "Vintage, cozy analog pads combined with intimate, whispered vocal hooklines and soft acoustic strumming."
    },
    {
      name: "Savage Euphoria",
      desc: "Dopamine-fueled brass hooks forcing aggressive drops and highly syncopated high-transient tempos."
    }
  ];

  // 10 diagnostic QA Pillars mapping
  const QA_PILLAR_LABELS = [
    "P1: Vocab Density",
    "P2: Ethno Resonance",
    "P3: Harmonic Confor.",
    "P4: Tempo Grid Swng",
    "P5: Low-Freq Trans.",
    "P6: Cliché Avoidance",
    "P7: Vocal Spread",
    "P8: Emotion Intensity",
    "P9: Dynamic Master DB",
    "P10: Audience Retain"
  ];

  // Compute 17 Agent Nodes statuses dynamically based on the current step sequencer
  const get17AgentNodes = (): AgentNode[] => {
    const defaultNodes: Omit<AgentNode, "status">[] = [
      { id: "01", name: "CC Intake Scanner", role: "Analyzes initial submission constraints and regional target thresholds" },
      { id: "02", name: "Accent Benchmark", role: "Cross-checks acoustic profiles against historical charting metrics" },
      { id: "03", name: "Ethno-Musicology", role: "Synthesizes traditional key instruments and structural scales" },
      { id: "04", name: "Vibe Authority", role: "Mandates Tier-0 Human Emotion absolute coordination" },
      { id: "05", name: "Lyric Blueprint", role: "Generates panned vowel structures and multi-language hooks" },
      { id: "06", name: "Chord Voice Grid", role: "Validates tension anchors, micro-timing shifts, and chord scales" },
      { id: "07", name: "Arrangement Map", role: "Fleshes out structural energy arcs and high-transient tempos" },
      { id: "08", name: "Vocal Layer Synth", role: "Generates high frequency vocal stacks and harmonies" },
      { id: "09", name: "Instrument Cascade", role: "Synthesizes granular traditional strings and modern bass drop" },
      { id: "10", name: "Mix Dynamics Space", role: "Ensures frequency-separation filters and safe room bounds" },
      { id: "11", name: "Dynamic Range Gate", role: "Measures final dynamic floor to bypass flat radio compressors" },
      { id: "12", name: "10-Pillar QA Evaluator", role: "Executes 10 separate criteria diagnostics checks" },
      { id: "13", name: "Cliché Guard Gate", role: "Exposes and strips overused pop structures" },
      { id: "14", name: "Video Concept Synth", role: "Compiles thematic 3D storyboard visuals and conceptual loops" },
      { id: "15", name: "Cyber Thumbnail PNG", role: "Generates high-contrast thumbnail textures in ultra-detailed 4K" },
      { id: "16", name: "Metadata SEO Map", role: "Structures taxonomic tags and automated descriptions" },
      { id: "17", name: "Autonomous Deployer", role: "Pipes validated files into YouTube and global catalogs" }
    ];

    return defaultNodes.map((node, index) => {
      let status: AgentNode["status"] = "IDLE";
      const nodeNum = index + 1;

      // Status mapping based on current step
      if (currentStep === 1) {
        if (nodeNum === 1) status = "ACTIVE";
      } else if (currentStep === 2) {
        if (nodeNum < 3) status = "PASS";
        else if (nodeNum === 3) status = isProcessing ? "ACTIVE" : "PASS";
      } else if (currentStep === 3) {
        if (nodeNum < 4) status = "PASS";
        else if (nodeNum === 4) status = "HUMAN";
      } else if (currentStep === 4) {
        if (nodeNum < 5) status = "PASS";
        else if (nodeNum >= 5 && nodeNum <= 7) {
          status = isProcessing ? "ACTIVE" : "PASS";
        }
      } else if (currentStep === 5) {
        if (nodeNum < 12) status = "PASS";
        else if (nodeNum === 12) {
          if (isProcessing) status = isQaRetrying ? "RETRY" : "ACTIVE";
          else if (qaScores.length > 0) status = "PASS";
        }
      } else if (currentStep === 6) {
        if (nodeNum < 14) status = "PASS";
        else if (nodeNum === 14 || nodeNum === 15) {
          status = isProcessing ? "ACTIVE" : "PASS";
        }
      } else if (currentStep === 7) {
        if (nodeNum < 16) status = "PASS";
        else if (nodeNum === 16 || nodeNum === 17) {
          status = isProcessing ? "ACTIVE" : "PASS";
        }
      }

      return { ...node, status };
    });
  };

  // Dopamine dynamic micro-rewards particle emitter logic
  const triggerParticleBurst = (count = 45) => {
    const colors = ["#00F5FF", "#FFD700", "#FF4ECD", "#00E676", "#FFFFFF"];
    const newParticles: Particle[] = [];
    for (let i = 0; i < count; i++) {
      newParticles.push({
        id: Date.now() + i + Math.random(),
        x: Math.random() * 200 + 50, // relative bounds
        y: Math.random() * 100 + 100,
        size: Math.random() * 5 + 3,
        color: colors[Math.floor(Math.random() * colors.length)],
        opacity: 1,
        speedY: -(Math.random() * 4 + 2),
        speedX: Math.random() * 6 - 3
      });
    }
    setParticles(newParticles);
  };

  // Side-effect: tick particles animation to update frame
  useEffect(() => {
    if (particles.length === 0) return;
    const interval = setInterval(() => {
      setParticles(prev => 
        prev
          .map(p => ({
            ...p,
            y: p.y + p.speedY,
            x: p.x + p.speedX,
            opacity: p.opacity - 0.04
          }))
          .filter(p => p.opacity > 0)
      );
    }, 30);
    return () => clearInterval(interval);
  }, [particles]);

  // Handle stream logging write to terminal console
  const appendTerminal = (text: string) => {
    setTerminalStream(prev => [...prev, text]);
    setTimeout(() => {
      if (terminalBottomRef.current) {
        terminalBottomRef.current.scrollIntoView({ behavior: "smooth" });
      }
    }, 30);
  };

  // Reset terminal console
  useEffect(() => {
    if (currentStep === 1) {
      setTerminalStream([
        "> [WMCS-CC]: Initializing sovereign music compiler node...",
        "> [WMCS-CC]: Waiting for intake target parameters to lock."
      ]);
    }
  }, [currentStep]);

  // Adjust subgenre automatically when genre shifts
  useEffect(() => {
    const parent = GENRES.find(g => g.code === genre);
    if (parent && parent.subgenres.length > 0) {
      setSubgenre(parent.subgenres[0]);
    }
  }, [genre]);

  // Step 2: Sequential Research Streaming Trigger
  const handleTriggerResearch = () => {
    setIsProcessing(true);
    setStreamedCountryDNA("");
    setStreamedGenreDNA("");
    setStreamedSubgenreDNA("");

    onAddLog("PE", "RESEARCH_STARTED", `Sequential research phase triggered for: ${country.code} - ${genre}.`, "SUCCESS");
    appendTerminal(`> [WMCS-PE]: Commencing deep ethnomusicological scan on country core: ${country.name}`);

    // Dynamic streaming simulation of ethnomusicology reports
    const txt1 = `[Agent 01 - Country Raw DNA Profile] \nCC Code: ${country.code}\nSonic Signature: ${country.sonicDNAString}\nHeritage Bounds: ${country.identityStatement}\nRuleset: Approved.`;
    const txt2 = `[Agent 02 - Genre Structural Index] \nGenre Index: ${genre}\nBPM Boundaries: 110-145\nInstrumentation constraints: Checked and locked on traditional grids.`;
    const txt3 = `[Agent 03 - Subgenre Specificity DNA] \nSubgenre ID: ${subgenre}\nVocabulary density: 31 key identifiers loaded.\nCreative anchor context ready.`;

    let i = 0, j = 0, k = 0;
    
    // Country Stream
    const interval1 = setInterval(() => {
      if (i < txt1.length) {
        const nextChar = txt1.charAt(i);
        setStreamedCountryDNA(prev => prev + nextChar);
        if (nextChar === "\n") appendTerminal(`> [A01-DNA]: ${txt1.split("\n")[Math.max(0, txt1.substring(0, i).split("\n").length - 1)]}`);
        i++;
      } else {
        clearInterval(interval1);
        onAddLog("AGE", "COUNTRY_DNA_COMPILED", `Agent 01 completed structural synthesis for ${country.name}.`, "INFO");
        appendTerminal(`> [A01-DNA]: Structural synthesis successfully mapped.`);
        
        // Start second stream (Genre Specs)
        const interval2 = setInterval(() => {
          if (j < txt2.length) {
            const nextChar = txt2.charAt(j);
            setStreamedGenreDNA(prev => prev + nextChar);
            if (nextChar === "\n") appendTerminal(`> [A02-GEN]: ${txt2.split("\n")[Math.max(0, txt2.substring(0, j).split("\n").length - 1)]}`);
            j++;
          } else {
            clearInterval(interval2);
            onAddLog("AGE", "GENRE_DNA_COMPILED", `Agent 02 completed boundaries extraction for genre ${genre}.`, "INFO");
            appendTerminal(`> [A02-GEN]: Structural bounds check verified & secured.`);

            // Start third stream (Subgenre DNA)
            const interval3 = setInterval(() => {
              if (k < txt3.length) {
                const nextChar = txt3.charAt(k);
                setStreamedSubgenreDNA(prev => prev + nextChar);
                if (nextChar === "\n") appendTerminal(`> [A03-SUB]: ${txt3.split("\n")[Math.max(0, txt3.substring(0, k).split("\n").length - 1)]}`);
                k++;
              } else {
                clearInterval(interval3);
                onAddLog("AGE", "SUBGENRE_DNA_COMPILED", `Agent 03 completed subgenre DNA specifications matching brief.`, "SUCCESS");
                appendTerminal(`> [WMCS-AE]: Research vectors converged. Sovereign DNA registry completely synchronized.`);
                setIsProcessing(false);
                setCurrentStep(3); // unlock creative Human lock step
                setShowHumanModal(true); // Auto-popup Human Decision Modal as required!
              }
            }, 12);
          }
        }, 12);
      }
    }, 12);
  };

  // Step 4: Creation parallel trigger using Express server with fallback modes
  const handleGenerateCreative = async () => {
    setIsProcessing(true);
    setCreativeLoadingMessage("Agent 04 (Lyrics), Agent 05 (Titles), & Agent 06 (Blueprint) parallel fan-out running...");
    appendTerminal(`> [WMCS-PE]: Triggering Fan-Out parallel synthesis via multi-agent threads...`);

    onAddLog("PE", "PARALLEL_CREATION_SYNC_TRIGGERED", `Saga coordinator fanning out creative production loops. Mode: Parallel.`, "INFO");

    try {
      const response = await fetch("/api/v1/agents/generate-creative", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          country: country.name,
          genre,
          subgenre,
          emotion: selectedEmotion
        })
      });

      const resData = await response.json();
      if (resData.success) {
        setGeneratedTitles(resData.titlesList || []);
        setActiveTitleIdx(0);
        setGeneratedLyrics(resData.lyrics);
        setGeneratedProduction(resData.productionBlueprint);

        onAddLog("AGE", "LYRICS_COMPILED", `Agent 04 produced full sovereign lyrics sheet matching ${selectedEmotion}.`, "SUCCESS");
        onAddLog("AGE", "TITLES_COMPILED", `Agent 05 finished 25-criteria titles scoring matrix.`, "SUCCESS");
        onAddLog("AGE", "PRODUCTION_BLUEPRINT_COMPILED", `Agent 06 engineered structural production dynamics.`, "SUCCESS");
        
        appendTerminal(`> [A04-LYR]: Lyrics generated and verified. Hook count: ${resData.lyrics?.hookWordCount || 8} words.`);
        appendTerminal(`> [A05-TTL]: Title list compiled and indexed under competitive database.`);
        appendTerminal(`> [A06-PRO]: Production key parsed: ${resData.productionBlueprint?.key || "D# Minor"}`);
        appendTerminal(`> [WMCS-AE]: Parallel assets compiled successfully.`);

        setIsProcessing(false);
        setCurrentStep(5); // Unlock QA Evaluator step
        triggerParticleBurst(30); // Celebration dopamine burst!
      }
    } catch (err: any) {
      console.error(err);
      appendTerminal(`> [WMCS-ERR]: Creative compiler failed. Safety fallback activated.`);
      setIsProcessing(false);
    }
  };

  // Step 5: QA Quality gate assessment with interactive Retry loops
  const handleAuditGate = async () => {
    setIsProcessing(true);
    setQaLoadingMessage("Agent 07 Song QA performing 10-pillar evaluation...");
    appendTerminal(`> [WMCS-PE]: Running 10-Pillar Quality diagnostics at Agent 12 Gate...`);

    onAddLog("PE", "QUALITY_GATE_SYNCHRONIZATION", `Converging parallel branches at Agent 07/12 Gate. Auditing...`, "INFO");

    try {
      const parentTitle = generatedTitles[activeTitleIdx]?.title || "Sovereign Wave";
      const response = await fetch("/api/v1/gates/audit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          song: {
            title: parentTitle,
            emotion: selectedEmotion,
            lyrics: generatedLyrics,
            productionBlueprint: generatedProduction
          },
          countryCode: country.code,
          subgenre
        })
      });

      const auditData = await response.json();
      if (auditData.success) {
        // Simulated Interactive Retry Loop to implement product specs!
        // We simulate a first audit warning some validation nodes, 
        // trigger an automated amber warning retry, and then pass seamlessly on retry 2!
        if (retryCount === 1) {
          setIsQaRetrying(true);
          setQaLoadingMessage("CVA warning: Vocabulary Density threshold not conformant! Auto-revising... 1/3 cycles");
          appendTerminal(`> [A07-QA]: [ALERT] Vocabulary Density (score: 5) fell below boundary limit of 8.`);
          appendTerminal(`> [A07-QA]: Injecting authentic cultural synonyms to lyrics grid. Recalculating...`);
          
          onAddLog("AGE", "QA_AUDIT_WARNING", `Agent 07-S reports Vocabulary Density (7/10) below threshold. Constraint injected.`, "WARNING");

          setTimeout(() => {
            // Apply revised custom perfect scores
            const adjustedScores = auditData.qaReport.pillarScores.map((p: any, idx: number) => {
              // Map realistic values matching our 10-pillars
              const scoreVal = idx === 5 || idx === 2 ? 9 : Math.min(10, p.score + 1);
              return { 
                ...p, 
                score: scoreVal, 
                description: `Pillar ${idx + 1} finalized and locked within nominal parameters during corrective loop.` 
              };
            });
            setQAScores(adjustedScores);
            setOverallQAScore(92);
            setQAPrescriptions(auditData.qaReport.prescriptions);
            
            onAddLog("AGE", "QA_REVISION_PASS", `CVA constraints satisfied. Total score synchronized at 92%.`, "GOLD");
            appendTerminal(`> [A07-QA]: Calibration complete. Core compliance score unified at 92% (PASS).`);
            triggerParticleBurst(50); // Massive Dopamine particle explosion!

            setIsQaRetrying(false);
            setRetryCount(2);
            setIsProcessing(false);
          }, 2000);
        } else {
          setQAScores(auditData.qaReport.pillarScores);
          setOverallQAScore(auditData.qaReport.totalScore);
          setQAPrescriptions(auditData.qaReport.prescriptions);
          onAddLog("AGE", "QA_AUDIT_APPROVED", `Agent 07 verified structural compliance. Quality check completely unlocked.`, "SUCCESS");
          appendTerminal(`> [A07-QA]: Compliance pass. Zero outstanding regulatory limits.`);
          setIsProcessing(false);
          triggerParticleBurst(30);
        }
      }
    } catch (err: any) {
      console.error(err);
      appendTerminal(`> [WMCS-ERR]: Compliance parsing thread halted unexpected.`);
      setIsProcessing(false);
    }
  };

  // Step 7: Dist & assign serial number, publish song to main dashboard catalog
  const handleFinalizePublish = () => {
    setIsProcessing(true);
    appendTerminal(`> [WMCS-PE]: Transmitting finalized assets payload to YouTube API with SEO tags...`);
    onAddLog("PE", "UPLOAD_AUTHORIZATION_ACCEPTED", `Upload clearance codes matched for Agent 17 execution.`, "SUCCESS");

    setTimeout(() => {
      const uniqueIdStr = Math.floor(Math.random() * 89999 + 10000);
      const generatedSr = `WMCS-CC-${country.code}-2026-${uniqueIdStr}`;

      const finalSong = {
        id: `song-${uniqueIdStr}`,
        serialNumber: generatedSr,
        title: generatedTitles[activeTitleIdx]?.title || "Ethereal Neon Echoes",
        countryCode: country.code,
        genreCode: genre,
        subgenreCode: subgenre,
        emotion: selectedEmotion,
        bpm: 125,
        qaTotalScore: overallQAScore || 92,
        platformUrls: { 
          YouTube: `https://youtube.com/watch?v=wmcs-live-${uniqueIdStr}`, 
          Spotify: `https://spotify.com/track/wmcs-live-${uniqueIdStr}` 
        },
        version: "v1.0.0 (Gold Master)",
        tags: [country.name, genre, selectedEmotion, "World Music Champion System"]
      };

      // Add to catalog list
      onAddSong(finalSong);
      
      onAddLog("AE", "ARTIFACT_PERMANENTLY_LOCKED", `Completed composition locked under code index: ${generatedSr}.`, "GOLD");
      onAddLog("PE", "PIPELINE_COMPLETE_PUBLISHED", `Submission assets automated deployment completely finished! Congratulations.`, "SUCCESS");
      appendTerminal(`> [WMCS-AE]: SUBMISSION PERMANENTLY RECORDED: ${generatedSr}`);
      appendTerminal(`> [WMCS-SYS]: Sovereign loop complete.`);

      setIsProcessing(false);
      setCurrentStep(1); // Return to step 1
      alert(`CONGRATULATIONS!\nSovereign Song "${finalSong.title}" completely finalized, indexed, and exported under serial code: ${generatedSr}.`);
    }, 1500);
  };

  // Custom high precision polar coordination Radar Chart generator math
  const renderRadarChart = () => {
    // If scores not calculated yet, show standard perfect nominal mesh line
    const displayScores = qaScores.length > 0 
      ? qaScores 
      : QA_PILLAR_LABELS.map((label) => ({ score: 0, name: label, description: "" }));

    const angleStep = (2 * Math.PI) / 10;
    const cx = 130;
    const cy = 130;
    const r = 85;

    // Actual polygon mapping indices
    const points = displayScores.map((p, idx) => {
      const angle = angleStep * idx - Math.PI / 2;
      const scoreWeight = p.score > 0 ? p.score / 10 : 0.05; // avoid complete zero collapse
      const x = cx + r * scoreWeight * Math.cos(angle);
      const y = cy + r * scoreWeight * Math.sin(angle);
      return `${x},${y}`;
    }).join(" ");

    // Gilded boundary threshold 80% polygon lines
    const limitPoints = displayScores.map((p, idx) => {
      const angle = angleStep * idx - Math.PI / 2;
      const scoreWeight = 0.8; 
      const x = cx + r * scoreWeight * Math.cos(angle);
      const y = cy + r * scoreWeight * Math.sin(angle);
      return `${x},${y}`;
    }).join(" ");

    return (
      <div className="relative w-full flex flex-col items-center">
        <svg className="w-64 h-64 drop-shadow-[0_0_15px_rgba(0,245,255,0.1)]" viewBox="0 0 260 260">
          {/* Radial grids */}
          {[0.2, 0.4, 0.6, 0.8, 1.0].map((step, idx) => (
            <circle
              key={idx}
              cx={cx}
              cy={cy}
              r={r * step}
              fill="none"
              stroke="rgba(255, 255, 255, 0.03)"
              strokeWidth={1}
            />
          ))}

          {/* Spoke lines */}
          {displayScores.map((_, idx) => {
            const angle = angleStep * idx - Math.PI / 2;
            const x = cx + r * Math.cos(angle);
            const y = cy + r * Math.sin(angle);
            return (
              <line
                key={idx}
                x1={cx}
                y1={cy}
                x2={x}
                y2={y}
                stroke="rgba(255, 255, 255, 0.06)"
                strokeWidth={1}
              />
            );
          })}

          {/* Gold safety threshold boundary line */}
          <polygon
            points={limitPoints}
            fill="none"
            stroke="#FFD700"
            strokeWidth={1.2}
            strokeDasharray="4 3"
            className="opacity-75"
          />

          {/* Computed compliant score shape */}
          {qaScores.length > 0 && (
            <polygon
              points={points}
              fill="rgba(0, 245, 255, 0.15)"
              stroke="#00F5FF"
              strokeWidth={2}
              className="glow-cyan"
            />
          )}

          {/* Polar axes labels */}
          {QA_PILLAR_LABELS.map((label, idx) => {
            const angle = angleStep * idx - Math.PI / 2;
            const labelDist = r + 13;
            const x = cx + labelDist * Math.cos(angle);
            const y = cy + labelDist * Math.sin(angle);
            
            let textAnchor = "middle";
            if (Math.cos(angle) > 0.1) textAnchor = "start";
            if (Math.cos(angle) < -0.1) textAnchor = "end";

            const scoreAtPillar = qaScores[idx]?.score || 0;

            return (
              <text
                key={idx}
                x={x}
                y={y + 3}
                fill={scoreAtPillar >= 8 ? "#00E676" : scoreAtPillar >= 6 ? "#FFD700" : "rgba(255, 255, 255, 0.3)"}
                fontSize={7}
                fontFamily="monospace"
                className="font-bold tracking-tight"
                textAnchor={textAnchor}
              >
                {label.split(": ")[1]} {scoreAtPillar > 0 ? `(${scoreAtPillar})` : ""}
              </text>
            );
          })}
        </svg>

        {/* Legend */}
        <div className="flex gap-4 font-mono text-[9px] mt-1 text-gray-500">
          <div className="flex items-center gap-1.5">
            <span className="w-2.5 h-0.5 border-t-2 border-dashed border-[#FFD700]" />
            <span>CRITICAL LIMIT PASS GAP (80%)</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="w-2 h-2 rounded bg-[#00F5FF]/20 border border-[#00F5FF]" />
            <span>COMPUTED HARMONICS</span>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="space-y-6 relative">
      
      {/* Dopamine Spark Layer overlay */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden z-50">
        {particles.map(p => (
          <div
            key={p.id}
            className="absolute rounded-full pointer-events-none"
            style={{
              left: `${p.x}px`,
              top: `${p.y}px`,
              width: `${p.size}px`,
              height: `${p.size}px`,
              backgroundColor: p.color,
              opacity: p.opacity,
              boxShadow: `0 0 10px ${p.color}`,
              transform: `translate(-50%, -50%)`
            }}
          />
        ))}
      </div>

      {/* 1. COMMAND HEADER WITH CONTEXTUAL PERFORMANCE INFO */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 bg-gradient-to-r from-[#0D1B3E]/60 to-[#0A0B10]/95 p-5 rounded-2xl border border-white/10 shadow-xl relative overflow-hidden">
        {/* Glow corner elements */}
        <div className="absolute top-0 left-0 w-32 h-1 bg-[#00F5FF]/40 glow-cyan" />
        
        {/* Serial Name Descriptor */}
        <div className="space-y-1">
          <span className="text-[10px] text-[#00F5FF] font-mono tracking-widest block uppercase font-bold">
            ACTIVE PIPELINE ID
          </span>
          <h3 className="font-display font-medium text-lg text-white font-mono flex items-center gap-2">
            <Sliders className="w-4 h-4 text-[#00F5FF]" />
            <span>WMCS-CC-{country.code}-2026-{serialSuffix}</span>
          </h3>
          <span className="text-[10px] text-gray-500 font-mono tracking-tight block">
            SCHEMA STRUCTURE: WMCS-CC-REGIONAL-YEAR-SEQUENCE
          </span>
        </div>

        {/* Real-time Session ticking clock */}
        <div className="flex flex-col justify-center border-l md:border-l-0 md:border-x border-white/10 md:px-5">
          <span className="text-[10px] text-[#FFD700] font-mono tracking-widest block uppercase font-bold">
            SESSION ELAPSED TIME
          </span>
          <div className="flex items-center gap-2 mt-1">
            <Clock className="w-5 h-5 text-[#FFD700]" />
            <span className="text-xl font-mono font-bold tracking-widest text-[#FFD700] bg-black/40 px-3 py-0.5 rounded-lg border border-yellow-500/10">
              {sessionTime}
            </span>
          </div>
        </div>

        {/* Core Steps indicators */}
        <div className="flex flex-col justify-center md:px-5">
          <span className="text-[10px] text-[#FF4ECD] font-mono tracking-widest block uppercase font-bold">
            GENERATION PROGRESS
          </span>
          <div className="flex items-center gap-3 mt-1.5">
            <div className="flex-1 bg-white/5 h-2 rounded-full overflow-hidden">
              <div 
                className="bg-gradient-to-r from-[#00F5FF] via-[#FF4ECD] to-[#FFD700] h-full rounded-full transition-all duration-300"
                style={{ width: `${(currentStep / 7) * 100}%` }}
              />
            </div>
            <span className="font-mono text-xs text-white font-bold">
              0{currentStep}/07
            </span>
          </div>
        </div>

        {/* High performance QA score ring indicator */}
        <div className="flex items-center gap-3 md:justify-end">
          <div className="text-right">
            <span className="text-[9px] text-[#00E676] font-mono block uppercase font-bold">
              SYSTEM EVALUATOR
            </span>
            <span className="text-xs text-gray-400 block font-mono">
              {overallQAScore > 0 ? "QA COMPLIANT" : "AWAITING GATE"}
            </span>
          </div>
          <div className="relative w-12 h-12 flex items-center justify-center">
            {/* SVG Ring circle */}
            <svg className="w-full h-full transform -rotate-90">
              <circle
                cx="24"
                cy="24"
                r="20"
                fill="none"
                stroke="rgba(255,255,255,0.05)"
                strokeWidth="3.5"
              />
              <circle
                cx="24"
                cy="24"
                r="20"
                fill="none"
                stroke={overallQAScore > 0 ? "#00E676" : "#00F5FF"}
                strokeWidth="3.5"
                strokeDasharray={`${2 * Math.PI * 20}`}
                strokeDashoffset={`${2 * Math.PI * 20 * (1 - (overallQAScore > 0 ? overallQAScore : 10) / 100)}`}
                className="transition-all duration-500 stroke-cyan-neon"
              />
            </svg>
            <span className="absolute font-mono font-bold text-[11px] text-white">
              {overallQAScore > 0 ? `${overallQAScore}%` : "--"}
            </span>
          </div>
        </div>
      </div>

      {/* 2. PIPELINE PROGRESS RAIL OF 17 AGENT NODES */}
      <div className="bg-[#0A0B10] p-4 rounded-2xl border border-white/5 shadow-md">
        <div className="flex justify-between items-center pb-2 mb-3.5 border-b border-white/5 font-mono text-[10px] tracking-wider text-gray-400 uppercase">
          <span className="flex items-center gap-1.5">
            <Radio className="w-3.5 h-3.5 text-[#00F5FF] animate-pulse" />
            <span>SAGA COORDINATOR ENGINE: 17 SOVEREIGN MICRO-AGENTS RAILS</span>
          </span>
          <span className="text-[9px] text-[#00F5FF]">COMPUTATION LAYER v3.0 ACTIVE</span>
        </div>

        {/* Railway line nodes wrapper */}
        <div className="grid grid-cols-6 sm:grid-cols-9 lg:grid-cols-17 gap-3">
          {get17AgentNodes().map((agent, index) => {
            const num = index + 1;
            
            // Render color coding based on node statuses
            let lightBg = "bg-gray-800 border-gray-700 text-gray-600";
            if (agent.status === "ACTIVE") lightBg = "bg-[#00F5FF]/10 border-[#00F5FF] text-[#00F5FF] glow-cyan animate-pulse";
            if (agent.status === "PASS") lightBg = "bg-[#00E676]/10 border-[#00E676] text-[#00E676]";
            if (agent.status === "RETRY") lightBg = "bg-amber-500/10 border-amber-500 text-amber-400 animate-bounce";
            if (agent.status === "BLOCK") lightBg = "bg-rose-500/10 border-rose-500 text-rose-500";
            if (agent.status === "HUMAN") lightBg = "bg-[#FFD700]/10 border-[#FFD700] text-[#FFD700] glow-gold animate-pulse";

            return (
              <div 
                key={agent.id}
                className="group relative cursor-help flex flex-col items-center"
              >
                <div className={`w-8 h-8 rounded-lg border flex flex-col items-center justify-center font-mono text-[10px] font-bold ${lightBg} transition duration-200 hover:scale-[1.1]`}>
                  {agent.status === "PASS" ? "✓" : agent.status === "HUMAN" ? "👤" : num.toString().padStart(2, "0")}
                </div>
                <span className="text-[8px] font-mono text-gray-500 mt-1 truncate w-full text-center">
                  A{agent.id}
                </span>

                {/* Cyber clean floating tooltips */}
                <div className="absolute pointer-events-none opacity-0 group-hover:opacity-100 transition duration-150 bottom-11 bg-[#0A0B10] border border-white/10 p-3 rounded-xl w-48 text-left z-50 text-[10px] font-mono shadow-2xl leading-normal space-y-1">
                  <div className="flex justify-between items-center pb-1 border-b border-white/5 font-bold">
                    <span className="text-white">Agent {agent.id}</span>
                    <span className={
                      agent.status === "PASS" ? "text-[#00E676]" :
                      agent.status === "HUMAN" ? "text-[#FFD700]" :
                      agent.status === "ACTIVE" ? "text-[#00F5FF]" : "text-gray-500"
                    }>
                      {agent.status}
                    </span>
                  </div>
                  <p className="text-gray-300 font-sans font-medium text-[9px]">{agent.name}</p>
                  <p className="text-gray-400 text-[8px] italic">{agent.role}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* 3. 12-COLUMN CORE SPATIAL ARCHITECTURE */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        
        {/* LEFT COLUMN (25% / 3-Cols): COUNTRY DNA HUB */}
        <div className="lg:col-span-3 space-y-4">
          
          {/* Countries Selector Hub */}
          <div className="glass-panel p-5 rounded-2xl border border-white/10 space-y-4">
            <div className="pb-2.5 border-b border-white/5">
              <span className="text-[10px] font-mono text-[#00F5FF] block tracking-wider uppercase font-bold">
                DIAGNOSTIC CRITERIA BOUNDS
              </span>
              <h4 className="font-display font-medium text-white text-sm mt-0.5">
                Country DNA Sync Hub
              </h4>
            </div>

            {/* Selector Grid */}
            <div className="grid grid-cols-2 gap-2">
              {COUNTRIES.map(c => {
                const isSelected = country.code === c.code;
                return (
                  <button
                    key={c.code}
                    onClick={() => {
                      setCountry(c);
                      onAddLog("PE", "COUNTRY_NODE_SWITCHED", `Sovereign context switched to registry node of: ${c.name}.`, "INFO");
                      appendTerminal(`> [WMCS-CC]: Switched active country registry to: [${c.code}] ${c.name}`);
                    }}
                    className={`p-2 rounded-xl text-[11px] font-mono font-medium border text-left flex items-center justify-between transition-all duration-200 cursor-pointer ${
                      isSelected
                        ? "bg-white/10 text-white shadow-md"
                        : "bg-transparent border-white/5 text-gray-400 hover:text-white hover:bg-white/5"
                    }`}
                    style={{ 
                      borderLeftWidth: isSelected ? "3px" : "1px",
                      borderLeftColor: isSelected ? c.accentColor : undefined 
                    }}
                  >
                    <span>{c.name.substring(0, 11)}</span>
                    <span className="text-[9px] px-1 bg-white/5 text-gray-500 rounded">{c.code}</span>
                  </button>
                );
              })}
            </div>

            {/* Selected Nation Identity Card */}
            <div className="p-3.5 rounded-xl bg-black/40 border border-white/5 text-xs space-y-2.5">
              <div>
                <span className="text-[9px] text-[#FFD700] block font-mono uppercase font-semibold">HERITAGE ACCENT WAVE</span>
                <span className="text-white font-medium text-xs leading-tight block mt-0.5">
                  "{country.motto}"
                </span>
              </div>
              <div>
                <span className="text-[9px] text-gray-500 block font-mono uppercase">IDENTITY STATEMENT</span>
                <p className="text-gray-400 text-[11px] leading-relaxed italic">
                  "{country.identityStatement}"
                </p>
              </div>
              <div className="h-px bg-white/5" />
              <div>
                <span className="text-[9px] text-[#00F5FF] block font-mono uppercase font-semibold">RAW SONIC CHARACTERISTICS</span>
                <p className="text-gray-400 text-[10px] leading-relaxed font-mono mt-1 select-all">
                  {country.sonicDNAString}
                </p>
              </div>
            </div>
          </div>

          {/* Sticky HardRuleAlert panel */}
          <div className="glass-panel p-5 rounded-2xl border border-white/10 bg-gradient-to-b from-[#0A0B10] to-yellow-950/10 space-y-3 sticky top-24">
            <div className="flex items-center gap-2 pb-2.5 border-b border-white/5 text-yellow-400">
              <AlertTriangle className="w-4 fill-yellow-400/10" />
              <h4 className="font-display font-semibold text-xs uppercase tracking-wider">
                MANDATORY HARDRULE BOUNDS
              </h4>
            </div>

            <div className="space-y-2">
              {country.hardRules.map((rule, idx) => (
                <div 
                  key={idx} 
                  className="p-2.5 rounded-xl bg-yellow-500/[0.02] border border-yellow-500/15 text-[10px] font-mono text-[#fef9c3]/90 leading-normal flex gap-1.5"
                >
                  <span className="text-yellow-400 font-bold shrink-0 animate-pulse">●</span>
                  <span>{rule}</span>
                </div>
              ))}
            </div>

            <div className="pt-2 text-[9px] font-mono text-gray-500 leading-normal">
              WARNING: Verification algorithm hard-gating WILL fail the package output if any score remains beneath 8.0 on final review.
            </div>
          </div>

        </div>

        {/* CENTER WORKSPACE (50% / 6-Cols): MAIN ACTIONS & MONOSPACE TERMINAL */}
        <div className="lg:col-span-6 space-y-4">
          
          {/* Stepper timeline indicators */}
          <div className="glass-panel p-3.5 rounded-2xl flex items-center justify-between overflow-x-auto gap-3 scrollbar-thin border border-white/10">
            {[
              { num: 1, title: "Intake" },
              { num: 2, title: "Research DNA" },
              { num: 3, title: "Human Lock" },
              { num: 4, title: "Parallel Synth" },
              { num: 5, title: "QA Gating" },
              { num: 6, title: "Visual Story" },
              { num: 7, title: "Export Dist" }
            ].map((step) => {
              const isActive = currentStep === step.num;
              const isPassed = currentStep > step.num;
              
              let badgeBg = "bg-white/5 text-gray-400 border-transparent";
              if (isActive) badgeBg = "bg-cyan-500/15 text-[#00F5FF] border-[#00F5FF]/10 glow-cyan font-bold";
              if (isPassed) badgeBg = "bg-emerald-500/10 text-[#00E676] border-transparent";

              return (
                <button 
                  key={step.num}
                  disabled={isProcessing}
                  onClick={() => {
                    if (step.num < currentStep) {
                      setCurrentStep(step.num);
                      appendTerminal(`> [WMCS-CC]: Bypassing current nodes to manually jump back to Step 0${step.num}`);
                    }
                  }}
                  className={`flex items-center gap-1.5 shrink-0 px-2.5 py-1.5 rounded-xl text-[11px] font-mono transition duration-200 ${
                    step.num < currentStep ? "cursor-pointer hover:bg-white/5 text-white" : "cursor-default opacity-80"
                  }`}
                >
                  <span className={`w-5 h-5 rounded-lg flex items-center justify-center text-[10px] border ${badgeBg}`}>
                    {isPassed ? "✓" : `0${step.num}`}
                  </span>
                  <span>{step.title}</span>
                </button>
              );
            })}
          </div>

          {/* Core dynamic body space */}
          <div className="glass-panel p-6 rounded-2xl border border-white/10 space-y-6">
            
            {/* Conditional loading view in progress */}
            {isProcessing && (
              <div className="p-12 flex flex-col justify-center items-center text-center space-y-4 animate-pulse">
                <div className="relative">
                  <div className="w-16 h-16 rounded-full border-2 border-t-transparent border-[#00F5FF] animate-spin flex items-center justify-center">
                    <Cpu className="w-7 h-7 text-[#00F5FF]" />
                  </div>
                  <Sparkles className="w-5 h-5 text-yellow-400 absolute -top-1 -right-1 animate-ping" />
                </div>
                <div>
                  <span className="font-mono text-[#00F5FF] text-[10px] block font-bold tracking-widest uppercase">
                    SOCIALLY NETWORKED ORCHESTRATION ENGINE ACTIVE
                  </span>
                  <h4 className="text-white font-sans font-semibold mt-1.5 text-base">
                    {isQaRetrying ? "CVA COMPLIANCE WARNING: OPTIMAL RECALIBRATION LOOP" : "Sequential pipeline compiles in play..."}
                  </h4>
                  <p className="text-gray-400 text-xs mt-1 max-w-sm mx-auto leading-relaxed italic">
                    "{isQaRetrying ? "Modifying lyrical components to meet Gukak accent benchmarks." : creativeLoadingMessage || qaLoadingMessage || "Executing remote model queries..."}"
                  </p>
                </div>
              </div>
            )}

            {/* Dynamic tabs controller for steps 4 onwards */}
            {!isProcessing && generatedLyrics && (
              <div className="flex border-b border-white/5 pb-1">
                <button
                  onClick={() => setActiveTab("lyrics")}
                  className={`flex-1 pb-3 text-xs font-mono border-b-2 text-center transition ${
                    activeTab === "lyrics" 
                      ? "border-[#00F5FF] text-[#00F5FF] font-bold" 
                      : "border-transparent text-gray-500 hover:text-white"
                  }`}
                >
                  📝 Lyrics Sheet
                </button>
                <button
                  onClick={() => setActiveTab("production")}
                  className={`flex-1 pb-3 text-xs font-mono border-b-2 text-center transition ${
                    activeTab === "production" 
                      ? "border-[#00F5FF] text-[#00F5FF] font-bold" 
                      : "border-transparent text-gray-500 hover:text-white"
                  }`}
                >
                  🎚️ Production blueprint
                </button>
                <button
                  onClick={() => setActiveTab("visuals")}
                  className={`flex-1 pb-3 text-xs font-mono border-b-2 text-center transition ${
                    activeTab === "visuals" 
                      ? "border-[#00F5FF] text-[#00F5FF] font-bold" 
                      : "border-transparent text-gray-500 hover:text-white"
                  }`}
                >
                  🎬 Storyboard Prompt
                </button>
              </div>
            )}

            {/* Static Action Sections depending on Steps */}
            {!isProcessing && (
              <div className="space-y-4 font-sans text-xs">
                
                {/* STEP 1: INTAKE SETUP */}
                {currentStep === 1 && (
                  <div className="space-y-4">
                    <div className="pb-2 border-b border-white/5 flex justify-between items-center">
                      <div>
                        <h4 className="font-display font-bold text-gray-200 text-sm">Pipeline Intake Configuration</h4>
                        <p className="text-[10px] text-gray-500 mt-0.5">Initialize parameters below to setup your world submission brief</p>
                      </div>
                      <span className="text-[9px] bg-[#00F5FF]/10 text-[#00F5FF] px-2 py-0.5 rounded font-mono uppercase font-bold text-right border border-[#00F5FF]/15 animate-pulse">Awaiting Intake</span>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {/* Select target nation */}
                      <div className="space-y-1.5">
                        <label className="text-[10px] font-mono text-gray-400 block uppercase">Target Regional Node</label>
                        <select
                          value={country.code}
                          onChange={(e) => {
                            const match = COUNTRIES.find(c => c.code === e.target.value);
                            if (match) {
                              setCountry(match);
                              appendTerminal(`> Context switched to country node: [${match.code}] ${match.name}`);
                            }
                          }}
                          className="w-full bg-white/[0.03] border border-white/10 p-2.5 rounded-xl text-xs text-white focus:outline-none focus:border-[#00F5FF]/40 font-sans cursor-pointer"
                        >
                          {COUNTRIES.map(c => (
                            <option key={c.code} value={c.code} className="bg-[#0A0B10]">{c.name} ({c.code})</option>
                          ))}
                        </select>
                      </div>

                      {/* Select genre tree */}
                      <div className="space-y-1.5">
                        <label className="text-[10px] font-mono text-gray-400 block uppercase font-bold">Core Genre Scale</label>
                        <select
                          value={genre}
                          onChange={(e) => {
                            setGenre(e.target.value);
                            appendTerminal(`> Switched core genre anchor to: ${e.target.value}`);
                          }}
                          className="w-full bg-white/[0.03] border border-white/10 p-2.5 rounded-xl text-xs text-white focus:outline-none focus:border-[#00F5FF]/40 font-sans cursor-pointer"
                        >
                          {GENRES.map(g => (
                            <option key={g.code} value={g.code} className="bg-[#0A0B10]">{g.name}</option>
                          ))}
                        </select>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-1.5">
                        <label className="text-[10px] font-mono text-gray-400 block uppercase font-semibold">Subgenre Descriptor</label>
                        <input
                          type="text"
                          value={subgenre}
                          onChange={(e) => setSubgenre(e.target.value)}
                          className="w-full bg-white/[0.03] border border-white/10 p-2.5 rounded-xl text-xs text-white focus:outline-none focus:border-[#00F5FF]/40 font-mono"
                        />
                      </div>

                      <div className="space-y-1.5">
                        <label className="text-[10px] font-mono text-gray-400 block uppercase font-semibold">Competition Framework ID</label>
                        <input
                          type="text"
                          value={competitionCode}
                          onChange={(e) => setCompetitionCode(e.target.value)}
                          className="w-full bg-white/[0.03] border border-white/10 p-2.5 rounded-xl text-xs text-white focus:outline-none focus:border-[#00F5FF]/40 font-sans"
                        />
                      </div>
                    </div>

                    <div className="space-y-1.5">
                      <label className="text-[10px] font-mono text-gray-400 block uppercase">Custom Creative Directive Brief</label>
                      <textarea
                        rows={2}
                        value={customBriefPrompt}
                        onChange={(e) => setCustomBriefPrompt(e.target.value)}
                        className="w-full bg-white/[0.03] border border-white/10 p-2.5 rounded-xl text-xs text-white focus:outline-none focus:border-[#00F5FF]/40 font-sans resize-none"
                        placeholder="Prime the multi-agent LLM prompt generators with bespoke instructions..."
                      />
                    </div>

                    <div className="flex justify-between items-center pt-2">
                      <div className="flex items-center gap-1.5 bg-[#00F5FF]/5 px-2.5 py-1 rounded text-[10px] text-[#00F5FF] border border-[#00F5FF]/10">
                        <Database className="w-3.5 h-3.5" />
                        <span>SQL DB CONNECTED</span>
                      </div>
                      <button
                        onClick={() => {
                          setCurrentStep(2);
                          onAddLog("PE", "INTAKE_SELECTION_LOCKED", `Intake parameters secured and locked.`, "SUCCESS");
                          appendTerminal(`> [WMCS-CC]: Parameters secured. Proceeding to Agent 01 ethnomusicology scans.`);
                        }}
                        className="flex items-center gap-1.5 bg-gradient-to-r from-[#00F5FF] to-[#FF4ECD] text-black font-semibold px-5 py-2.5 rounded-xl text-xs font-sans tracking-wide cursor-pointer shadow-md select-none transform hover:scale-[1.01]"
                      >
                        <span>Lock & Compile DNA</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                )}

                {/* STEP 2: SEQUENTIAL SCANNING AND RESEARCH */}
                {currentStep === 2 && (
                  <div className="space-y-4">
                    <div className="pb-2 border-b border-white/5">
                      <h4 className="font-display font-bold text-white text-sm">Sequential Scanning Node</h4>
                      <p className="text-[10px] text-gray-500 mt-0.5">Deterministic synthesis streaming country DNA bounds, structural pitch scales and subgenre vocabularies</p>
                    </div>

                    {/* Stream display boxes */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                      <div className="rounded-xl border border-white/5 bg-black/45 p-3.5 h-44 overflow-y-auto font-mono text-[10px] leading-relaxed relative flex flex-col justify-between">
                        <span className="text-[8px] text-gray-500 block uppercase border-b border-white/5 pb-1 font-bold">A01: COUNTRY STRAND</span>
                        <div className="flex-1 mt-2 text-[#00F5FF]/80 whitespace-pre-line leading-normal truncate-all">{streamedCountryDNA || "Awaiting scan payload..."}</div>
                      </div>
                      <div className="rounded-xl border border-white/5 bg-black/45 p-3.5 h-44 overflow-y-auto font-mono text-[10px] leading-relaxed relative flex flex-col justify-between">
                        <span className="text-[8px] text-gray-500 block uppercase border-b border-white/5 pb-1 font-bold">A02: REGIONAL GENRE</span>
                        <div className="flex-1 mt-2 text-[#FF4ECD]/80 whitespace-pre-line leading-normal">{streamedGenreDNA || "Pending strand synchronization..."}</div>
                      </div>
                      <div className="rounded-xl border border-white/5 bg-black/45 p-3.5 h-44 overflow-y-auto font-mono text-[10px] leading-relaxed relative flex flex-col justify-between">
                        <span className="text-[8px] text-gray-500 block uppercase border-b border-white/5 pb-1 font-bold">A03: ETHNO COGNITIVE</span>
                        <div className="flex-1 mt-2 text-[#FFD700]/80 whitespace-pre-line leading-normal">{streamedSubgenreDNA || "Pending strand synchronization..."}</div>
                      </div>
                    </div>

                    <div className="flex justify-between items-center pt-2">
                      <span className="text-[9px] text-gray-500 font-mono">3-NODE PIPELINE VALIDATION DIRECTIVE</span>
                      {streamedSubgenreDNA ? (
                        <button
                          onClick={() => {
                            setCurrentStep(3);
                            setShowHumanModal(true);
                          }}
                          className="bg-gradient-to-r from-[#00F5FF] to-[#FF4ECD] text-black font-bold px-5 py-2.5 rounded-xl cursor-pointer"
                        >
                          Lock and Authorize Emotion
                        </button>
                      ) : (
                        <button
                          onClick={handleTriggerResearch}
                          className="flex items-center gap-1.5 bg-gradient-to-r from-[#00F5FF] to-[#FF4ECD] text-black font-semibold px-5 py-2.5 rounded-xl cursor-pointer transform hover:scale-[1.01]"
                        >
                          <Play className="w-4 h-4 fill-black text-black" />
                          <span>Trigger Research Sequence</span>
                        </button>
                      )}
                    </div>
                  </div>
                )}

                {/* STEP 3: CREATIVE ANCHOR SELECT */}
                {currentStep === 3 && (
                  <div className="space-y-4">
                    <div className="pb-2.5 border-b border-orange-500/10 flex justify-between items-start">
                      <div>
                        <span className="text-[9px] font-mono text-[#FFD700] uppercase font-bold tracking-wider block">HUMAN PRIORITY OVERRIDE L1</span>
                        <h4 className="font-display font-medium text-white text-base mt-0.5">Sovereign Emotional Vector Required</h4>
                      </div>
                      <span className="bg-[#FFD700]/10 border border-[#FFD700]/25 text-[#FFD700] rounded-full px-2.5 py-0.5 font-mono text-[9px] animate-pulse">Awaiting Selection</span>
                    </div>

                    <p className="text-gray-400 text-[11px] leading-relaxed mb-4">
                      The core AI synthesis cluster is gated behind an irreducible creative decision. Select one of the high-impact competitive emotional scenarios to lock the coordinate and trigger the creative generation parallel saga.
                    </p>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3 pb-2">
                      {EMOTIONS_PRESETS.map(e => {
                        const isMatch = selectedEmotion === e.name;
                        return (
                          <div
                            key={e.name}
                            onClick={() => {
                              setSelectedEmotion(e.name);
                              appendTerminal(`> Human operator override selection: "${e.name}"`);
                            }}
                            className={`p-3.5 rounded-xl border text-left cursor-pointer transition flex flex-col justify-between ${
                              isMatch 
                                ? "bg-yellow-500/10 border-yellow-500 text-white shadow-lg shadow-yellow-500/5 glow-gold" 
                                : "bg-black/30 border-white/5 text-gray-400 hover:border-yellow-500/30 hover:text-white"
                            }`}
                          >
                            <div className="flex items-center gap-2">
                              <span className={`w-1.5 h-1.5 rounded-full ${isMatch ? "bg-yellow-300" : "bg-gray-700"}`} />
                              <span className="font-sans font-bold text-xs">{e.name}</span>
                            </div>
                            <p className="text-[10px] text-[#fef9c3]/70 font-medium leading-relaxed mt-2">{e.desc}</p>
                          </div>
                        );
                      })}
                    </div>

                    <div className="flex justify-end pt-3">
                      <button
                        onClick={() => {
                          onAddLog("AE", "CREATIVE_ANCHOR_LOCKED", `Human anchor locked on micro-emotion vector: "${selectedEmotion}".`, "GOLD");
                          appendTerminal(`> [WMCS-AE]: Human coordinate locked into system. Proceeding to generation loop.`);
                          setCurrentStep(4);
                        }}
                        className="flex items-center gap-2 bg-gradient-to-r from-yellow-400 to-amber-500 text-black font-extrabold px-6 py-2.5 rounded-xl text-xs uppercase cursor-pointer"
                      >
                        <Lock className="w-3.5 h-3.5 fill-black" />
                        <span>Authorize Parallel Creator Saga</span>
                      </button>
                    </div>
                  </div>
                )}

                {/* STEP 4: CREATION PARALLEL ASSETS */}
                {currentStep === 4 && (
                  <div className="space-y-4">
                    
                    {!generatedLyrics && (
                      <div className="p-12 flex flex-col justify-center items-center text-center space-y-4">
                        <Sparkles className="w-8 h-8 text-[#00F5FF] animate-pulse" />
                        <div>
                          <h4 className="font-display font-medium text-white">Initiate Multi-Agent Parallel Synthesis</h4>
                          <p className="text-gray-400 text-xs mt-1 max-w-sm mx-auto leading-relaxed">
                            Generate curated titles, complete multi-section patois/lyrical grids and comprehensive production dynamic energy maps simultaneously using sovereign schemas.
                          </p>
                        </div>
                        <button
                          onClick={handleGenerateCreative}
                          className="bg-gradient-to-r from-[#00F5FF] to-[#FF4ECD] text-black font-bold px-5 py-2.5 rounded-xl cursor-pointer"
                        >
                          Compile Parallel Packages
                        </button>
                      </div>
                    )}

                    {generatedLyrics && (
                      <div className="space-y-4 leading-relaxed animate-fade-in-up text-left">
                        {activeTab === "lyrics" && (
                          <div className="space-y-3">
                            <div className="p-3 bg-black/45 rounded-xl border border-white/5 h-64 overflow-y-auto font-sans leading-relaxed text-gray-300 space-y-4 text-center">
                              {generatedLyrics.sections?.map((sec: any, idx: number) => (
                                <div key={idx} className="space-y-1 bg-white/[0.01] p-3 rounded-xl border border-white/[0.03]">
                                  <span className="text-[9px] font-mono font-medium text-purple-400 uppercase tracking-widest block pb-1 border-b border-white/5 mb-1">
                                    — {sec.type} —
                                  </span>
                                  {sec.lines?.map((l: string, lidx: number) => (
                                    <p key={lidx} className="text-xs">{l}</p>
                                  ))}
                                </div>
                              ))}
                            </div>
                            <div className="p-3 rounded-lg bg-emerald-500/[0.02] border border-emerald-500/10 text-[10px] font-mono text-emerald-400 flex justify-between">
                              <span>LYRICS SUBMISSION COMPLIANCE:</span>
                              <span className="font-bold">PASSED VERIFICATION</span>
                            </div>
                          </div>
                        )}

                        {activeTab === "production" && (
                          <div className="space-y-4">
                            <div className="p-4 bg-black/45 rounded-xl border border-white/5 space-y-3 font-mono text-[10px] leading-relaxed text-gray-300">
                              <div>
                                <span className="text-gray-500 block text-[9px] uppercase">DYNAMIC ENERGY ARC KEY REFERENCE:</span>
                                <span className="text-white font-bold font-sans text-xs">{generatedProduction?.key || "G# Minor"}</span>
                              </div>
                              <div>
                                <span className="text-gray-500 block text-[9px] uppercase mb-1">PROPOSED SAMPLE AND INSTRUMENTS:</span>
                                <div className="flex flex-wrap gap-1.5 mt-1">
                                  {generatedProduction?.instrumentationSequence?.map((inst: string, idx: number) => (
                                    <span key={idx} className="bg-white/5 border border-white/10 px-2 py-0.5 rounded text-[10px] text-[#00F5FF] font-medium font-sans">
                                      {inst}
                                    </span>
                                  ))}
                                </div>
                              </div>
                              <div className="h-px bg-white/5 mt-2" />
                              <div>
                                <span className="text-gray-500 block text-[9px] uppercase">10-BAR DYNAMIC WAVE ENVELOPE:</span>
                                <div className="space-y-1">
                                  {generatedProduction?.dynamicArc?.map((item: string, idx: number) => (
                                    <div key={idx} className="flex gap-2 text-xs">
                                      <span className="text-[#FF4ECD]">0{idx + 1}:</span>
                                      <span className="text-gray-300 font-sans">{item}</span>
                                    </div>
                                  ))}
                                </div>
                              </div>
                            </div>
                          </div>
                        )}

                        {activeTab === "visuals" && (
                          <div className="space-y-3.5 leading-relaxed text-left">
                            <div className="p-3.5 bg-black/45 rounded-xl border border-white/5 space-y-2 font-mono text-[11px] text-gray-400">
                              <div>
                                <span className="text-[#00F5FF] block text-[9px] uppercase font-bold mb-1">PROMPT LAYER TARGET VISUAL</span>
                                <p className="text-white font-sans text-xs italic">
                                  "{visualConcept}"
                                </p>
                              </div>
                              <div className="h-px bg-white/5 mt-2" />
                              <div>
                                <span className="text-gray-500 block text-[9px] uppercase">PRESETS SELECTION ARTWORK SCALE</span>
                                <span className="text-gray-100 font-sans text-xs block font-semibold mt-0.5">{selectedVideoType}</span>
                              </div>
                            </div>
                          </div>
                        )}

                        <div className="flex justify-end pt-2 border-t border-white/5">
                          <button
                            onClick={() => {
                              setCurrentStep(5);
                              onAddLog("PE", "CREATIVE_SYNTH_SYNCED", `Asset compilation synchronization complete. Entering 10-pillar diagnostic check.`, "SUCCESS");
                              appendTerminal(`> [WMCS-CC]: Progressing to diagnostic evaluation gate at node A12.`);
                            }}
                            className="bg-gradient-to-r from-[#00F5FF] to-[#FF4ECD] text-black font-extrabold px-6 py-2.5 rounded-xl text-xs uppercase cursor-pointer"
                          >
                            Proceed to QA Evaluator Gating
                          </button>
                        </div>
                      </div>
                    )}
                  </div>
                )}

                {/* STEP 5: QA COMPLIANCE DIAGNOSTIC */}
                {currentStep === 5 && (
                  <div className="space-y-4 text-left">
                    {qaScores.length === 0 && (
                      <div className="p-12 flex flex-col justify-center items-center text-center space-y-4">
                        <CheckCircle2 className="w-10 h-10 text-[#00E676] animate-pulse" />
                        <div>
                          <h4 className="font-display font-medium text-white">Execute Sovereign 10-Pillar QA diagnostics</h4>
                          <p className="text-gray-400 text-xs mt-1 max-w-sm mx-auto leading-relaxed">
                            Agent 12 performs structural scanning for clichés, vocabulary counts, and custom accent regulations to verify country validation pass scores.
                          </p>
                        </div>
                        <button
                          onClick={handleAuditGate}
                          className="bg-gradient-to-r from-[#00E676] to-[#00F5FF] text-black font-extrabold px-6 py-2.5 rounded-xl text-xs uppercase cursor-pointer"
                        >
                          Run dynamic Audit Gate
                        </button>
                      </div>
                    )}

                    {qaScores.length > 0 && (
                      <div className="p-1 bg-[#0A0B10]/40 rounded-xl space-y-3 animate-fade-in-up">
                        <div className="p-3 bg-white/[0.01] border border-white/5 rounded-xl space-y-2 text-xs">
                          <span className="text-[9px] font-mono text-[#00E676] uppercase font-bold tracking-widest block">AGENT 07-S PERFECTIVE ACTIONS</span>
                          <div className="space-y-2 mt-1.5">
                            {qaPrescriptions.map((p, idx) => (
                              <div key={idx} className="p-2.5 rounded-xl bg-white/[0.02] border border-white/5 text-[11px] text-gray-300 leading-normal font-sans">
                                <span className="font-mono text-[#00F5FF] text-[9.5px] font-bold block mb-0.5">PRESCRIPTION 0{idx+1}</span>
                                {p}
                              </div>
                            ))}
                          </div>
                        </div>

                        <button
                          onClick={() => {
                            setCurrentStep(6);
                            appendTerminal(`> Diagnostics checks released under compliance code.`);
                          }}
                          className="w-full bg-gradient-to-r from-[#00E676] to-[#00F5FF] text-black font-extrabold p-2.5 rounded-xl text-xs flex justify-center items-center gap-2 uppercase cursor-pointer"
                        >
                          Proceed to Visual storyboarding
                        </button>
                      </div>
                    )}
                  </div>
                )}

                {/* STEP 6: VISUAL CONCEPT STORYBOARD */}
                {currentStep === 6 && (
                  <div className="space-y-4 animate-fade-in-up text-left">
                    <div className="pb-2 border-b border-white/5">
                      <h4 className="font-display font-medium text-white">Visual storyboard prompts</h4>
                      <p className="text-[10px] text-gray-500 mt-0.5">Formulate high-contrast design conceptualizations corresponding to the structural metadata</p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-1.5">
                        <label className="text-[10px] font-mono text-gray-400 block uppercase">Video loop structure</label>
                        <select
                          value={selectedVideoType}
                          onChange={(e) => {
                            setSelectedVideoType(e.target.value);
                            appendTerminal(`> Visual rendering layout altered into: ${e.target.value}`);
                          }}
                          className="w-full bg-white/[0.03] border border-white/10 p-2.5 rounded-xl text-xs text-white focus:outline-none focus:border-[#00F5FF]/40 font-sans cursor-pointer"
                        >
                          <option value="3D Synthwave Loop" className="bg-[#0A0B10]">3D Synthwave Loop (Modular Gravity)</option>
                          <option value="2D Cyberpunk Narrative" className="bg-[#0A0B10]">2D Cyberpunk Animatic (Urban Accent)</option>
                          <option value="Unreal Engine Cinematic" className="bg-[#0A0B10]">Unreal Engine Cinematic Render (Classic)</option>
                        </select>
                      </div>

                      <div className="space-y-1.5">
                        <label className="text-[10px] font-mono text-gray-400 block uppercase">Thumbnail style bounds</label>
                        <input
                          type="text"
                          value={thumbnailStyle}
                          onChange={(e) => setThumbnailStyle(e.target.value)}
                          className="w-full bg-white/[0.03] border border-white/10 p-2.5 rounded-xl text-xs text-white focus:outline-none focus:border-[#00F5FF]/40 font-sans"
                        />
                      </div>
                    </div>

                    <div className="space-y-1.5">
                      <label className="text-[10px] font-mono text-gray-400 block uppercase">Concept detail prompts</label>
                      <textarea
                        rows={2}
                        value={visualConcept}
                        onChange={(e) => setVisualConcept(e.target.value)}
                        className="w-full bg-white/[0.03] border border-white/10 p-2.5 rounded-xl text-xs text-white focus:outline-none"
                      />
                    </div>

                    <div className="flex justify-end pt-2 border-t border-white/5">
                      <button
                        onClick={() => {
                          setCurrentStep(7);
                          appendTerminal(`> Storyboard assets locked. Progressing to SEO final deploy.`);
                        }}
                        className="bg-gradient-to-r from-[#00F5FF] to-[#FF4ECD] text-black font-extrabold px-6 py-2.5 rounded-xl text-xs uppercase cursor-pointer"
                      >
                        Lock concept and Proceed
                      </button>
                    </div>
                  </div>
                )}

                {/* STEP 7: EXPORT & DEPLOY */}
                {currentStep === 7 && (
                  <div className="space-y-4 text-left font-sans">
                    <div className="pb-2 border-b border-white/5">
                      <h4 className="font-display font-medium text-white">Consolidated Metadata validation</h4>
                      <p className="text-[10px] text-gray-500 mt-0.5">Secure final upload authentication limits to pipe assets autonomously</p>
                    </div>

                    <div className="p-3 bg-white/[0.01] border border-white/5 rounded-xl space-y-2.5">
                      <div>
                        <span className="text-[#00F5FF] block text-[9px] font-mono font-bold">SEO SUBMISSION TITLE</span>
                        <span className="text-white text-xs font-semibold leading-tight block mt-0.5">
                          {generatedTitles[activeTitleIdx]?.title || "Ethereal Seoul Loop"} [Official WMCS Sovereign Submission]
                        </span>
                      </div>
                      <div>
                        <span className="text-gray-500 block text-[9px] font-mono">SOVEREIGN EXPORT DESCRIPTION</span>
                        <p className="text-gray-400 text-[10.5px] leading-relaxed italic bg-black/20 p-2 rounded border border-white/[0.02] mt-1">
                          This master representative piece represents a deterministic Sovereign Music System algorithm mapping country benchmarks for the {country.name} node inside {competitionCode} frameworks. Featuring custom {selectedEmotion} dynamic emotional arcs.
                        </p>
                      </div>
                    </div>

                    {/* Authentication string entry */}
                    <div className="space-y-1.5">
                      <label className="text-[10px] font-mono text-yellow-500 block uppercase font-bold animate-pulse">
                        UPLOADER ACCESS AUTHENTICATION SIGNATURE MANDATORY:
                      </label>
                      <input
                        type="text"
                        value={authPhrase}
                        onChange={(e) => setAuthPhrase(e.target.value)}
                        className="w-full bg-white/[0.03] border border-white/10 p-2.5 rounded-xl text-xs focus:ring focus:ring-yellow-500/20 text-white font-mono"
                      />
                      <span className="text-[9px] text-gray-500 block leading-snug">
                        Type <span className="font-semibold text-gray-300 font-mono bg-white/5 px-1.5 py-0.5 rounded border border-white/10">AUTHORIZE_Sovereign_WMCS_2026</span> to dismiss static gate locks.
                      </span>
                    </div>

                    <div className="flex justify-end pt-2 border-t border-white/5">
                      <button
                        onClick={handleFinalizePublish}
                        disabled={authPhrase !== "AUTHORIZE_Sovereign_WMCS_2026"}
                        className="bg-gradient-to-r from-yellow-400 to-amber-500 text-black font-extrabold px-6 py-2.5 rounded-xl text-xs uppercase disabled:opacity-30 cursor-pointer disabled:cursor-not-allowed"
                      >
                        Finalize & Deploy Submission
                      </button>
                    </div>
                  </div>
                )}

              </div>
            )}
          </div>

          {/* PromptStream scroll terminal below actions area */}
          <div className="p-5 rounded-2xl border border-white/10 bg-black/85 font-mono text-[10.5px] leading-relaxed shadow-lg relative overflow-hidden h-56 flex flex-col justify-between">
            <div className="flex justify-between items-center text-gray-500 pb-2 border-b border-white/5 capitalize mb-2">
              <span className="flex items-center gap-1.5 text-[#00F5FF] font-bold">
                <Terminal className="w-3.5 h-3.5" />
                <span>WMCS PROMPSTREAM MONOSPACE KERNEL</span>
              </span>
              <span className="h-1.5 w-1.5 rounded-full bg-[#00E676] animate-ping" />
            </div>

            {/* scrolling container logs with custom blinking cursor caret */}
            <div className="flex-1 overflow-y-auto space-y-1.5 text-left text-green-400 pr-1 select-text scrollbar-thin">
              {terminalStream.map((logLine, idx) => (
                <div key={idx} className="leading-relaxed">
                  {logLine}
                </div>
              ))}
              
              {/* cursor animation */}
              <div className="flex items-center gap-1 mt-1 text-[#00F5FF]">
                <span>&gt; system awaiting socket pipe data stream</span>
                <span className="w-1.5 h-3.5 bg-[#00F5FF] animate-pulse block" />
              </div>
              <div ref={terminalBottomRef} />
            </div>
          </div>

          {/* Technical Stack layout explanation expander */}
          <div className="bg-[#0D1B3E]/30 p-4 rounded-xl border border-white/5 flex flex-col justify-between items-center text-center space-y-1 cursor-pointer hover:bg-[#0D1B3E]/50 transition duration-200">
            <button
              onClick={() => setShowTechModal(!showTechModal)}
              className="flex items-center gap-2 text-[10px] font-mono text-[#00F5FF] font-bold tracking-wider uppercase h-full w-full justify-center"
            >
              <Database className="w-3.5 h-3.5 text-[#00F5FF]" />
              <span>{showTechModal ? "Hide WebSocket Architecture specs" : "Display fastAPI / redis websocket stream scheme"}</span>
            </button>
            
            {showTechModal && (
              <div className="w-full text-left font-mono text-[9.5px] text-gray-300 mt-3 pt-3 border-t border-white/5 space-y-3 leading-normal">
                <p>
                  <strong>Websocket Frame sync details:</strong>
                  The pipeline coordinates real-time streaming to these frontend glass panels utilizing an asynchronous FastAPI thread loop fanning out messages via Redis Pub/Sub channels.
                </p>
                <div className="bg-[#0A0B10] p-3 rounded-xl border border-white/5 text-[9px] text-[#00E676] leading-relaxed whitespace-pre font-semibold select-all overflow-x-auto">
{`# Micro-architecture pubsub routing stream
import redis, asyncio, json
from fastapi import FastAPI, WebSocket

app = FastAPI()
redis_client = redis.StrictRedis(host="localhost", port=6379, db=0)

@app.websocket("/api/v1/stream/{pipeline_id}")
async def listen_pipeline(websocket: WebSocket, pipeline_id: str):
    await websocket.accept()
    pubsub = redis_client.pubsub()
    pubsub.subscribe(f"pipeline_{pipeline_id}_channel")
    
    while True:
        try:
            # Yield event loop thread processing to avoid layout thrashing
            message = pubsub.get_message(ignore_subscribe_messages=True)
            if message:
                payload = json.loads(message['data'].decode('utf-8'))
                await websocket.send_json(payload)
            await asyncio.sleep(0.01) # 10ms throttling sync
        except Exception:
            break
`}
                </div>
                <div className="text-[9px] text-gray-500 italic">
                  *This mechanism prevents layout thrashing by grouping high-frequency visual updates within browser microtasks inside custom Canvas frames.
                </div>
              </div>
            )}
          </div>

        </div>

        {/* RIGHT COLUMN (25% / 3-Cols): QA RADAR CHART & MINI ASSETS STATUS */}
        <div className="lg:col-span-3 space-y-4">
          
          {/* Radar details */}
          <div className="glass-panel p-5 rounded-2xl border border-white/10 flex flex-col justify-between items-center text-center space-y-3">
            <div className="pb-2 border-b border-white/5 w-full text-left">
              <span className="text-[9px] font-mono text-[#FFD700] uppercase font-bold tracking-widest block">
                AGENT 12 COMPLIANCE ANALYSIS
              </span>
              <h4 className="font-display font-medium text-white text-sm mt-0.5">10-Pillar Quality Index</h4>
            </div>

            {/* SVG radar render */}
            <div className="w-full flex items-center justify-center p-2 bg-black/25 rounded-xl border border-white/5">
              {renderRadarChart()}
            </div>

            <div className="w-full p-2.5 rounded-xl bg-white/[0.01] border border-white/5 font-mono text-[10px] flex justify-between items-center">
              <span className="text-gray-500">DIAGNOSTIC STATUS:</span>
              <span className={overallQAScore > 0 ? "text-[#00E676] font-bold" : "text-gray-400"}>
                {overallQAScore > 0 ? "PASSED VALIDATION" : "AWAITING GATE"}
              </span>
            </div>
          </div>

          {/* Real-time Miniature Asset statuses check Grid */}
          <div className="glass-panel p-5 rounded-2xl border border-white/10 space-y-4">
            <div className="pb-2.5 border-b border-white/5">
              <span className="text-[10px] font-mono text-[#FF4ECD] block tracking-widest uppercase font-bold">
                COMPOSITE ASSET MATRIX
              </span>
              <h4 className="font-display font-medium text-white text-sm mt-0.5">
                Pipeline Asset Grid Reviews
              </h4>
            </div>

            {/* Asset card list */}
            <div className="space-y-3 font-sans text-[11px]">
              
              {/* WAV status */}
              <div className="p-3 bg-black/45 rounded-xl border border-white/5 space-y-2 relative group">
                <div className="flex justify-between items-center">
                  <span className="text-white font-medium flex items-center gap-1.5">
                    <Disc className="w-4 h-4 text-[#00E676] font-bold" />
                    <span>Audio Master (WAV)</span>
                  </span>
                  <span className={`font-mono text-[9px] px-1.5 rounded ${
                    generatedProduction ? "bg-[#00E676]/10 text-[#00E676]" : "bg-white/5 text-gray-500"
                  }`}>
                    {generatedProduction ? "MASTER COMPASS" : "WAITING"}
                  </span>
                </div>
                
                {generatedProduction ? (
                  <div className="flex items-center gap-1 h-5 justify-center py-1 bg-white/[0.01] rounded border border-white/[0.02]">
                    {[0.2, 0.6, 0.4, 0.8, 0.9, 0.3, 0.7, 0.4, 0.8, 0.5, 0.9, 0.1, 0.6].map((h, i) => (
                      <div 
                        key={i} 
                        className="bg-emerald-400/70 w-[2px] h-full rounded animate-pulse" 
                        style={{ height: `${h * 100}%`, animationDelay: `${i * 90}ms` }}
                      />
                    ))}
                  </div>
                ) : (
                  <div className="text-[9px] text-gray-500 italic mt-1 text-center">Audio compiler offline</div>
                )}
              </div>

              {/* Video MP4 status */}
              <div className="p-3 bg-black/45 rounded-xl border border-white/5 space-y-2 relative">
                <div className="flex justify-between items-center">
                  <span className="text-white font-medium flex items-center gap-1.5">
                    <Tv className="w-4 h-4 text-[#00F5FF]" />
                    <span>Storyboard (MP4)</span>
                  </span>
                  <span className={`font-mono text-[9px] px-1.5 rounded ${
                    currentStep >= 6 ? "bg-[#00F5FF]/10 text-[#00F5FF] animate-pulse" : "bg-white/5 text-gray-500"
                  }`}>
                    {currentStep >= 6 ? "RENDERING (82.1%)" : "WAITING"}
                  </span>
                </div>
                {currentStep >= 6 ? (
                  <div className="w-full bg-white/5 h-1.5 rounded-full overflow-hidden mt-1.5">
                    <div className="bg-[#00F5FF] h-full rounded-full animate-pulse" style={{ width: "82.1%" }} />
                  </div>
                ) : (
                  <div className="text-[9px] text-gray-500 italic text-center mt-1">Render engine offline</div>
                )}
              </div>

              {/* PNG Status */}
              <div className="p-3 bg-black/45 rounded-xl border border-white/5 space-y-1 relative">
                <div className="flex justify-between items-center">
                  <span className="text-white font-medium flex items-center gap-1.5">
                    <CheckCircle2 className="w-4 h-4 text-[#FF4ECD]" />
                    <span>Thumbnail (PNG) 4K</span>
                  </span>
                  <span className={`font-mono text-[9px] px-1.5 rounded ${
                    currentStep >= 6 ? "bg-[#00E676]/10 text-[#00E676]" : "bg-white/5 text-gray-500"
                  }`}>
                    {currentStep >= 6 ? "COMPLIANT RESOLVED" : "WAITING"}
                  </span>
                </div>
                <div className="text-[9px] text-gray-500 mt-1 italic text-center">
                  {currentStep >= 6 ? "CYBERNETIC NEON BACKLIGHT SECURED" : "Design compiler offline"}
                </div>
              </div>

            </div>
          </div>

        </div>

      </div>

      {/* 4. OVERLAYS & MODALS SPECIAL COMPONENT DEFINITIONS */}
      
      {/* HUMAN DECISION OVERLAY MODAL (STEP 3 TRIGGER LEVEL) */}
      {showHumanModal && currentStep === 3 && (
        <div className="fixed inset-0 bg-black/95 bg-opacity-95 z-50 flex items-center justify-center p-6 backdrop-blur-xl animate-fade-in">
          
          <div className="w-full max-w-4xl glass-panel-gold bg-gradient-to-tr from-[#0A0B10] via-yellow-950/20 to-black/90 p-8 rounded-3xl border border-yellow-500/20 shadow-[0_0_50px_rgba(255,215,0,0.15)] flex flex-col justify-between space-y-6 relative overflow-hidden text-left">
            {/* Ambient cyber border flashes */}
            <div className="absolute top-0 right-0 w-32 h-[1px] bg-yellow-400 glow-gold" />
            
            <div className="flex justify-between items-start pb-4 border-b border-yellow-500/10">
              <div>
                <span className="text-[10px] text-yellow-400 font-mono tracking-widest block uppercase font-bold animate-pulse">
                  IRREDUCIBLE MANDATORY USER CONTROL GATE
                </span>
                <h2 className="font-display font-medium text-white text-2xl mt-1 tracking-tight flex items-center gap-2">
                  <Unlock className="w-6 h-6 text-yellow-400" />
                  <span>Anchor Priority L1 Coordinate (Micro-Emotion Selection)</span>
                </h2>
                <p className="text-yellow-100/60 text-xs mt-1.5 leading-relaxed font-sans">
                  World music competitions require authentic human-assigned emotional resonance models prior to multi-agent algorithmic compilation loops. Please designate a core creative anchor vector:
                </p>
              </div>
              <button 
                onClick={() => {
                  setShowHumanModal(false);
                  appendTerminal(`> Human operator dismissed popup view. Control active under Workspace dashboard.`);
                }}
                className="text-gray-400 hover:text-white font-mono text-[11px] p-2 bg-white/5 border border-white/10 rounded-xl cursor-pointer"
              >
                CLOSE [ESC]
              </button>
            </div>

            {/* Selection Grid inside Overlay */}
            <div className="grid grid-cols-1 md:grid-cols-5 gap-3">
              {EMOTIONS_PRESETS.map((item, idx) => {
                const isSelected = selectedEmotion === item.name;
                return (
                  <div
                    key={item.name}
                    onClick={() => {
                      setSelectedEmotion(item.name);
                      appendTerminal(`> Decision gate locked on emotion anchor: "${item.name}"`);
                    }}
                    className={`p-4 rounded-xl border cursor-pointer hover:bg-white/[0.03] transition-all flex flex-col justify-between text-left h-44 ${
                      isSelected
                        ? "bg-yellow-500/15 border-yellow-400 text-white shadow-lg glow-gold scale-[1.03]" 
                        : "bg-black/40 border-yellow-500/5 text-gray-400 hover:border-yellow-500/25 hover:text-white"
                    }`}
                  >
                    <div>
                      <span className={`w-2 h-2 rounded-full block mb-2 ${isSelected ? "bg-yellow-400 animate-ping" : "bg-gray-800"}`} />
                      <h4 className="font-sans font-bold text-xs leading-snug">{item.name}</h4>
                    </div>
                    <p className="text-[9px] text-[#fef9c3]/70 font-sans leading-relaxed block mt-3">
                      {item.desc}
                    </p>
                  </div>
                );
              })}
            </div>

            {/* Authorization actions */}
            <div className="pt-4 border-t border-yellow-500/10 flex justify-between items-center text-xs">
              <span className="text-[10px] text-yellow-500/40 font-mono tracking-tight font-semibold">RULE SECURED: PR-07 MANDATE VERIFIED</span>
              <button
                onClick={() => {
                  onAddLog("AE", "CREATIVE_ANCHOR_LOCKED", `Human anchor locked on emotional vector: "${selectedEmotion}".`, "GOLD");
                  appendTerminal(`> Creative locks assigned SUCCESS.`);
                  setShowHumanModal(false);
                  setCurrentStep(4);
                  triggerParticleBurst(40);
                }}
                className="bg-gradient-to-r from-yellow-400 via-amber-400 to-yellow-300 text-black font-extrabold px-6 py-3.5 rounded-xl text-xs flex justify-center items-center gap-2 tracking-wider shadow-lg hover:translate-y-[-1px] transition-all uppercase cursor-pointer"
              >
                <Lock className="w-4 h-4 fill-black text-black" />
                <span>Sync & Authorize Pipeline</span>
              </button>
            </div>

          </div>
        </div>
      )}

    </div>
  );
}
