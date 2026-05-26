import React, { useState, useEffect, useRef } from "react";
import { useResearchStore } from "../useResearchStore";
import { usePipelineStore } from "../store";
import { COUNTRIES } from "../data";
import GenreTree from "./GenreTree";
import { 
  Globe, 
  Lock, 
  Unlock, 
  Compass, 
  Cpu, 
  Terminal, 
  Check, 
  HelpCircle, 
  Sparkles, 
  Layers, 
  ChevronDown, 
  ChevronUp, 
  Sliders, 
  Flame, 
  Activity, 
  Radio, 
  Award, 
  CheckCircle2, 
  Database, 
  Workflow, 
  ArrowRight,
  ShieldAlert,
  Fingerprint
} from "lucide-react";

export default function CountryHub() {
  const {
    currentLevel,
    selectedCountry,
    selectedGenre,
    selectedSubgenre,
    isAgent01Running,
    isAgent02Running,
    isAgent03Running,
    agent01Output,
    agent02Output,
    agent03Output,
    pipelineState,
    selectedEmotion,
    isEmotionLocked,
    goldSealActive,
    errorMessage,
    shellLogs,
    setCountry,
    setLevel,
    triggerAgent01,
    triggerAgent02,
    triggerAgent03,
    lockMicroEmotion,
    reset,
    addLog
  } = useResearchStore();

  const pipeline = usePipelineStore();

  // Selected Accordion Section (Level 2.1)
  const [openSection, setOpenSection] = useState<number>(0);

  // Canvas-based 3D globe coordinates
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [rotation, setRotation] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const dragStart = useRef({ x: 0, y: 0 });

  // Synced local states for Visual Maps
  const [elasticSlider, setElasticSlider] = useState<number>(50); // Emotional Spectrum Map

  // Seeding micro-emotions for Level 2.3 select cards (precisely 5 options)
  const MICRO_EMOTION_CARDS = selectedCountry?.code === "KR" ? [
    {
      id: "kr_han_revenge",
      name: "한의 복수 (Reclaimed Han - Silent Fury)",
      category: "Pain-To-Power",
      desc: "Deep Han heartache paired with powerful cinematic string stabs and aggressive trap rhythms, converting restrained pain into raw dominance."
    },
    {
      id: "kr_heung_liberation",
      name: "흥의 해방 (Reclaimed Heung - Kinetic Liberation)",
      category: "Dopamine-High",
      desc: "High-voltage kinetic groove, unleashing heung energy to reclaim stage presence and total acoustic authority."
    },
    {
      id: "kr_dok_venom",
      name: "독기 (Dokhye - Venomous Sovereign Strike)",
      category: "Aggressive Focus",
      desc: "An intense, hyper-focused performance drive fueled by unyielding traditional Gayageum cascades over thick sub-basses."
    },
    {
      id: "kr_jeong_bond",
      name: "정의 폭발 (Reclaimed Jeong - Bond of Power)",
      category: "Ancestral Anthem",
      desc: "Rhythmic ancestral string pickups colliding with sharp modern synth leads, asserting the unbreakable bond of collective power."
    },
    {
      id: "kr_han_rebirth",
      name: "환희의 부활 (Ethereal Rebirth of Han)",
      category: "Ethereal Ascent",
      desc: "Grand choral vocal stacks that soar majestically through heavy parallel compression grids, announcing ultimate triumph."
    }
  ] : selectedCountry?.code === "GB" ? [
    {
      id: "uk_estate_resonance",
      name: "Concrete Estate Resonance (Underground Grievance)",
      category: "Class Defiance",
      desc: "Gritty London drill beats overlaying a heavy organ pad, expressing raw housing-estate struggle and unfiltered class pride."
    },
    {
      id: "uk_grime_rebellion",
      name: "Cyber-Grime Overdrive (Spitfire Rebellion)",
      category: "Socio-Realist Rebel",
      desc: "Fast-tempo metallic sine stabs pulsing under hyper-syncopated high-hats, projecting aggressive street truth and resistance."
    },
    {
      id: "uk_industrial_catharsis",
      name: "Industrial Estate Catharsis (Thameside Gloom)",
      category: "Gloom-To-Grit",
      desc: "Low-passed analog string loops filtering in ambient fog to paint gray sky-gazing, capturing class-conscious hope and factory-gloom release."
    },
    {
      id: "uk_midnight_haze",
      name: "Midnight Pavements Wave (Sovereign Haze)",
      category: "System Haze",
      desc: "Dark atmospheric garage syncopations driving deep sub-bass glides to frame midnight alley walks and working-class defiance."
    },
    {
      id: "uk_underground_spitfire",
      name: "Underground Dialect Defiance (Authentic Spitfire)",
      category: "Acoustic Rebellion",
      desc: "Abrasive spoken-word deliveries pushing back against mass-manufactured pop with absolute accent and dialect autonomy."
    }
  ] : selectedCountry?.code === "IN" ? [
    {
      id: "in_virah_longing",
      name: "विराग और विरह (Virah Longing)",
      category: "Virah (Longing)",
      desc: "Slow haunting sitar sweeps and low-frequency cello drones capturing absolute devotion mixed with the agony of being close yet unreachable."
    },
    {
      id: "in_aalaap_tears",
      name: "आलाप अश्रु (Aalaap Tears)",
      category: "Melodic Peak",
      desc: "Deep soaring vocal alaaps detailing sorrow through intricate meend steps, piercing the soul in the first 15 seconds without words."
    },
    {
      id: "in_barsaat_tadap",
      name: "बरसात की तड़प (Tadap of the Rain)",
      category: "Yaman Resonance",
      desc: "Raindrop-like santoor picking overlaid with Raga Yaman scale constraints, expressing gorgeous, warm, yet painful midnight isolation."
    },
    {
      id: "in_yado_ka_saya",
      name: "यादों का साया (Shadow of Remembered Touch)",
      category: "Bhairavi Haze",
      desc: "Low dynamic wind textures layered with traditional dhol rhythms and a solitary flute, highlighting the deep chill of unfulfilled ties."
    },
    {
      id: "in_mohabbat_defiance",
      name: "मोहब्बत की बगावत (Defiance of Devotion)",
      category: "Anthemic Devotion",
      desc: "Unapologetic Urdu-influenced vocal lines supported by broad orchestral strings, asserting working-class devotion against barriers."
    }
  ] : [
    {
      id: "us_sunset_strip",
      name: "Sunset Strip Catharsis (Reclaimed Blues)",
      category: "Organic Nostalgia",
      desc: "Deep cultural blues-heartache paired with modern aggressive electronic sub-bass and syncopated percussion ticks."
    },
    {
      id: "us_utopian_rise",
      name: "Utopian Transcendence (Cinematic Dawn)",
      category: "Anthemic Ascent",
      desc: "Cinematic, shimmering chords driving anthemic choral textures, raising peak emotional frequency."
    },
    {
      id: "us_ind_rebellion",
      name: "Underground Rebellion (Gritty Grit)",
      category: "Industrial Lows",
      desc: "Industrial synth bassline coupled with raw, un-autotuned vocal takes that challenge standard commercial pop norms."
    },
    {
      id: "us_ethereal_retro",
      name: "Ethereal Nostalgia (Washed Waves)",
      category: "Synth Dream",
      desc: "Vintage, cozy analog pads combined with intimate, whispered vocal hooklines and soft acoustic strumming."
    },
    {
      id: "us_savage_euphoria",
      name: "Savage Euphoria (Brass Drops)",
      category: "Peak Highs",
      desc: "Dopamine-fueled brass hooks forcing aggressive drops and highly syncopated high-transient tempos."
    }
  ];

  // Instrumentations Stack (Level 2.2)
  const getInstrumentationStack = () => {
    if (selectedCountry?.code === "KR") {
      return {
        mandatory: ["Traditional Gayageum (Zither)", "Traditional Daegeum (Bamboo Flute)", "Korean Buk (Chamber Bass Drum)"],
        expected: ["Super-charged Lead Synths", "808 Sub Boom Glares", "High Transient Snare Snaps", "Pre-Chorus Stretched Pitch risers"],
        optional: ["LFO-modulated Vocal Glitches", "Granular White-noise sidechain sweeps", "Acoustic Haegeum echoes"]
      };
    }
    if (selectedCountry?.code === "GB") {
      return {
        mandatory: ["Sliding 808 sub-bass bends", "Tape saturated industrial strings", "Vocal drill accent grunts"],
        expected: ["140BPM triplet-modulated metal hats", "Socio-realistic concrete lyrics sampler", "Analogue tape-warbled synth arrays"],
        optional: ["Underground rain & siren environment FX", "Local dialect pitch multiplier", "Overdriven kick shelf sidechain"]
      };
    }
    if (selectedCountry?.code === "IN") {
      return {
        mandatory: ["Classical Sitar virtual model (with microtonal meend/slides)", "Traditional Dhol and Tabla high-transient percussion", "Cinematic Orchestral Violin sections panned extra wide"],
        expected: ["Vocal Alaap ornamentations (gamak, murki, meend annotations)", "Soft acoustic Santoor/Kanun picking arrays", "Deep sub-harmonic synth bass pads to ground the Raga"],
        optional: ["Indian Bansuri wood-flute dynamic overlay", "Bilingual Urdu/Hindi wordplay vocal dubs", "Ambient monsoon season environment recordings"]
      };
    }
    return {
      mandatory: ["Acoustic Slide Resonator Guitar", "Folk Banjo Pluckers"],
      expected: ["Tight Euro-Synth modules", "Heavy Compressed Kick drops", "Polished 3-part vocal arrays", "Dampened Cowbell ticks"],
      optional: ["Vinyl static dust saturator", "Lush tape flange warbles", "Spring reverb echoes"]
    };
  };

  const instrumentStack = getInstrumentationStack();

  // 3D canvas rotate simulation
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animId: number;
    let autoRotation = 0;

    const render = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      const cx = canvas.width / 2;
      const cy = canvas.height / 2;
      const r = 95;

      const actRotX = rotation.x + (isDragging ? 0 : autoRotation * 0.4);
      const actRotY = rotation.y;

      // Draw background sky glows
      ctx.fillStyle = "rgba(10, 11, 16, 0.6)";
      ctx.beginPath();
      ctx.arc(cx, cy, r, 0, Math.PI * 2);
      ctx.fill();

      // Outer glow boundary
      ctx.strokeStyle = "rgba(0, 245, 255, 0.15)";
      ctx.lineWidth = 1.5;
      ctx.stroke();

      // Drawing latitude parallels and longitude meridians
      ctx.strokeStyle = "rgba(255, 255, 255, 0.04)";
      ctx.lineWidth = 0.8;
      
      // Latitude Parallels
      for (let i = -3; i <= 3; i++) {
        const latLat = (i * Math.PI) / 8;
        const radR = r * Math.cos(latLat);
        const latY = cy + r * Math.sin(latLat) * Math.sin(actRotY);
        const latH = r * Math.sin(latLat) * Math.cos(actRotY);
        
        ctx.beginPath();
        // Simple perspective ellipse projection
        ctx.ellipse(cx, cy + latH, radR, radR * 0.25, 0, 0, Math.PI * 2);
        ctx.stroke();
      }

      // Longitude Meridians
      for (let i = 0; i < 8; i++) {
        const meridianAngle = (i * Math.PI) / 4 + actRotX;
        const widthProj = r * Math.sin(meridianAngle);
        
        ctx.beginPath();
        ctx.ellipse(cx, cy, widthProj, r, 0, 0, Math.PI * 2);
        ctx.stroke();
      }

      // Render Country Coordinate Nodes
      COUNTRIES.forEach((c) => {
        // Project arbitrary geographic angles to 3D sphere coordinate
        const lat = c.code === "KR" ? 0.6 : c.code === "US" ? 0.3 : c.code === "ZA" ? -0.5 : c.code === "JP" ? 0.55 : -0.2;
        const lon = c.code === "KR" ? 1.2 : c.code === "US" ? -1.5 : c.code === "ZA" ? 0.5 : c.code === "JP" ? 1.35 : -0.1;

        const relLon = lon - actRotX;
        const relLat = lat - actRotY;

        // Hidden in coordinate depth projection hemisphere (back of globe)
        const cosDepth = Math.cos(relLon) * Math.cos(relLat);
        if (cosDepth < 0.1) return;

        const xNorm = Math.sin(relLon) * Math.cos(relLat);
        const yNorm = Math.sin(relLat);

        const nodeX = cx + xNorm * r;
        const nodeY = cy - yNorm * r;

        const isCurrentSelected = selectedCountry?.code === c.code;

        // Draw selection pulse ring
        if (isCurrentSelected) {
          ctx.strokeStyle = "#00F5FF";
          ctx.lineWidth = 1;
          ctx.beginPath();
          ctx.arc(nodeX, nodeY, 9 + Math.abs(Math.sin(autoRotation * 3) * 6), 0, Math.PI * 2);
          ctx.stroke();
        }

        // Specific node vector
        ctx.fillStyle = isCurrentSelected ? "#00F5FF" : "rgba(255, 255, 255, 0.45)";
        ctx.beginPath();
        ctx.arc(nodeX, nodeY, isCurrentSelected ? 5 : 3, 0, Math.PI * 2);
        ctx.fill();

        // Label layout
        ctx.fillStyle = isCurrentSelected ? "#FFF" : "rgba(255, 255, 255, 0.35)";
        ctx.font = isCurrentSelected ? "bold 9.5px monospace" : "8px monospace";
        ctx.fillText(c.code, nodeX + 7, nodeY + 3);
      });

      if (!isDragging) {
        autoRotation += 0.015;
      }
      animId = requestAnimationFrame(render);
    };

    render();
    return () => cancelAnimationFrame(animId);
  }, [rotation, isDragging, selectedCountry]);

  // Drag listeners
  const handleMouseDown = (e: React.MouseEvent<HTMLCanvasElement>) => {
    setIsDragging(true);
    dragStart.current = { x: e.clientX, y: e.clientY };
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLCanvasElement>) => {
    if (!isDragging) return;
    const dx = e.clientX - dragStart.current.x;
    const dy = e.clientY - dragStart.current.y;
    setRotation(prev => ({
      x: prev.x + dx * 0.007,
      y: Math.max(-Math.PI / 3, Math.min(Math.PI / 3, prev.y - dy * 0.007))
    }));
    dragStart.current = { x: e.clientX, y: e.clientY };
  };

  const handleMouseUpOrLeave = () => {
    setIsDragging(false);
  };

  // Synced executors
  const triggerCountryProfiler = async () => {
    // 1. Spark store local
    await triggerAgent01();
    
    // 2. Sync to global pipelinestore
    const output = useResearchStore.getState().agent01Output;
    if (output) {
      if (!pipeline.activeProject) {
        pipeline.initializePipeline(selectedCountry?.code || "KR", selectedGenre, selectedSubgenre);
      }
      pipeline.setAgentStatus("01", "PASS");
      pipeline.setAgentProgress("01", 100, `Country DNA Package LOCKED - Regional profile signed`);
      pipeline.appendStreamLog(`[01-RESEARCH] AUTONOMOUS PASS: Stored contract_ic_01_country_dna_${selectedCountry?.code}.json to Google Drive MEMORY_TIER_2`);
    }
  };

  const triggerGenreProfiler = async () => {
    // 1. Spark store local
    await triggerAgent02();

    // 2. Sync to global pipelinestore
    const output = useResearchStore.getState().agent02Output;
    if (output) {
      pipeline.setAgentStatus("02", "PASS");
      pipeline.setAgentProgress("02", 100, `Genre Intelligence Complete - BPM range narrowed to ${output.bpmRange}`);
      pipeline.appendStreamLog(`[02-GENRE] AUTONOMOUS PASS: Stored contract_ic_02_genre_brief_${selectedCountry?.code}_${selectedGenre.toLowerCase().replace(/\s+/g, "_")}.json to Google Drive MEMORY_TIER_2`);
    }
  };

  const triggerSubgenreProfiler = async () => {
    // 1. Spark store local
    await triggerAgent03();

    // 2. Sync to global pipelinestore
    const output = useResearchStore.getState().agent03Output;
    if (output) {
      pipeline.setAgentStatus("03", "PASS");
      pipeline.setAgentProgress("03", 100, `Subgenre Breeding Brief Compiled - WAITING FOR Micro-emotion`);
      pipeline.appendStreamLog(`[03-SUBGENRE] AUTONOMOUS PASS: Formulated breeding index. Triggering Irreducible Human selection Gate.`);
      // Spawn human gate inside core pipeline
      const emotionOptions = MICRO_EMOTION_CARDS.map(c => c.name);
      pipeline.triggerHumanGate("emotion", emotionOptions);
    }
  };

  const lockEmotionSovereign = async (emotionName: string) => {
    // 1. Local lock
    await lockMicroEmotion(emotionName);

    // 2. Resolve human gate in global pipeline store
    pipeline.resolveHumanGate(emotionName);
    pipeline.appendStreamLog(`[TYPE C LOCKED] Micro-Emotion: "${emotionName}". Custom breeder brief compiled.`);
  };

  // Expandable DNA Accordion specifications list (7 logical sections)
  const ACCORDION_SECTIONS = [
    {
      title: "1. Identity Anchor & Cultural Narrative",
      icon: Award,
      content: selectedCountry?.identityStatement || ""
    },
    {
      title: "2. CVA Constitutional Hard Rules",
      icon: ShieldAlert,
      content: selectedCountry?.hardRules.join(" \n\n ") || ""
    },
    {
      title: "3. 9-Point Charting Benchmarks",
      icon: CheckCircle2,
      content: selectedCountry?.benchmarks.join(" \n\n ") || ""
    },
    {
      title: "4. Sonic DNA Fingerprint",
      icon: Fingerprint,
      content: selectedCountry?.sonicDNAString || ""
    },
    {
      title: "5. Vocal Spread & Geometry Structures",
      icon: Sliders,
      content: selectedCountry?.code === "KR" 
        ? "HR-KR-03: Minimum 4-part thick vocal stacks panned wide with alternate panning maps, centered leads with heavy sidechain attenuation."
        : selectedCountry?.code === "GB"
        ? "HR-UK-03: Chorus 3-4s pacing cuts. Bridge requires a 10+ second single take without fast cuts."
        : selectedCountry?.code === "IN"
        ? "HR-IN-02: Vocal ornamentations (gamak, meend, or murki) indicated clearly through deliberate/traditional phrasing steps."
        : "HR-USA-03: Strict -18dB de-essed whispers, wide dual backing backing and center compression."
    },
    {
      title: "6. Dynamic Mastering Peak Tolerances",
      icon: Activity,
      content: "Secure -14 LUFS integrated output limits, with maximal -1.0dB True Peak digital floor guard. Enforces safe high-transient tempos and bypasses standard radio flattening plugins."
    },
    {
      title: "7. Drive Sync & Redis Checkpoints",
      icon: Database,
      content: `Simulated secure directories active:\n- Google Drive (MEMORY_TIER_2): path ./gdrive_memory_tier_2/\n- Session Cache (Redis): path ./redis_session_memory/\n- Invariants INV-01 and INV-09 are actively verified inside the Express core backend.`
    }
  ];

  return (
    <div className="space-y-6 select-none relative pb-10">

      {/* DOPAMINE GOLD SEAL ACCENT OVERLAY */}
      {goldSealActive && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-md z-50 flex items-center justify-center animate-fade-in">
          <div className="relative p-10 bg-gradient-to-b from-[#181206] to-[#0A0B10] border border-yellow-500/20 rounded-3xl text-center space-y-6 max-w-sm shadow-[0_0_80px_rgba(234,179,8,0.15)] animate-scale-up">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(234,179,8,0.06),transparent_60%)] pointer-events-none" />
            
            {/* Spinning gold rings */}
            <div className="relative w-28 h-28 mx-auto flex items-center justify-center">
              <div className="absolute inset-0 border-2 border-dashed border-yellow-500/30 rounded-full animate-spin [animation-duration:12s]" />
              <div className="absolute w-24 h-24 border border-yellow-500/10 rounded-full" />
              <div className="absolute w-20 h-20 border-2 border-double border-yellow-400/40 rounded-full animate-pulse" />
              <Award className="w-10 h-10 text-yellow-400 drop-shadow-[0_0_15px_rgba(234,179,8,0.5)]" />
            </div>

            <div className="space-y-2 relative">
              <span className="text-[10px] font-mono tracking-widest text-yellow-400 block font-bold uppercase">
                CONTRACT CONSTITUTIONALLY APPROVED
              </span>
              <h3 className="font-display font-extrabold text-xl text-white tracking-tight">
                GOLD SEAL LOCKED
              </h3>
              <p className="text-[11px] text-gray-400 font-mono italic max-w-[280px] mx-auto">
                "Verified artifact securely synced to Google Drive folder MEMORY_TIER_2 & Session Checkpoint written."
              </p>
            </div>
            
            <div className="w-16 h-0.5 bg-yellow-500/20 mx-auto" />
            
            <span className="text-[9px] font-mono text-gray-500 block uppercase">
              COSMIC COMPLIANT SAGA GATES ACTIVE
            </span>
          </div>
        </div>
      )}

      {/* Header Banner - Neon Glassmorphism */}
      <div 
        className="p-6.5 rounded-3xl transition-all duration-500 border relative overflow-hidden backdrop-blur-xl"
        style={{
          borderColor: selectedCountry ? `${selectedCountry.accentColor}35` : "rgba(255, 255, 255, 0.05)",
          background: `linear-gradient(135deg, ${selectedCountry ? selectedCountry.accentColor : '#00F5FF'}0a, rgba(10, 11, 16, 0.95))`
        }}
      >
        <div className="absolute top-[-10%] right-[-10%] p-8 opacity-[0.015] text-white pointer-events-none select-none">
          <Globe className="w-80 h-80" />
        </div>

        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <span 
                className="w-2.5 h-2.5 rounded-full animate-ping shrink-0"
                style={{ backgroundColor: selectedCountry ? selectedCountry.accentColor : "#00F5FF" }}
              />
              <span className="text-[10px] font-mono tracking-widest text-[#00F5FF] uppercase font-bold">
                Cultural Hub Space Node - {currentLevel.toUpperCase().replace("_", ". ")}
              </span>
            </div>
            <h2 className="font-display font-extrabold text-3xl text-white tracking-tight flex items-center gap-2.5">
              <span>{selectedCountry?.name || "South Korea"} Hub Core</span>
              {agent01Output && <Award className="w-6 h-6 text-yellow-400 drop-shadow-[0_0_8px_rgba(234,179,8,0.4)]" />}
            </h2>
            <p className="text-[11px] font-mono leading-relaxed" style={{ color: selectedCountry?.accentColor || "#00F5FF" }}>
              GOVERNANCE: {selectedCountry?.motto || "Performance Dominance Core"}
            </p>
          </div>

          {/* Quick country selection grid pins */}
          <div className="flex bg-black/40 p-1.5 rounded-2xl border border-white/5 select-none">
            {COUNTRIES.map((c) => (
              <button
                key={c.code}
                onClick={() => setCountry(c.code)}
                className={`px-4.5 py-2 rounded-xl text-xs font-mono transition-all duration-300 font-bold select-none cursor-pointer ${
                  selectedCountry?.code === c.code
                    ? "text-black bg-gradient-to-r"
                    : "text-gray-400 hover:text-white hover:bg-white/5"
                }`}
                style={{
                  background: selectedCountry?.code === c.code 
                    ? `linear-gradient(135deg, ${c.accentColor}, #FFF)` 
                    : undefined,
                  boxShadow: selectedCountry?.code === c.code 
                    ? `0 0 15px ${c.accentColor}40` 
                    : undefined
                }}
              >
                {c.code}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Level 2 Sub-Nav Section Buttons - Glowing Tabs */}
      <div className="grid grid-cols-3 bg-white/[0.02] border border-white/5 p-1.5 rounded-2xl">
        <button
          onClick={() => setLevel("level_2_1")}
          className={`flex items-center justify-center gap-2 py-3 rounded-xl font-mono text-[11px] font-bold tracking-wider transition cursor-pointer ${
            currentLevel === "level_2_1"
              ? "bg-[#00F5FF]/10 text-[#00F5FF] border border-[#00F5FF]/20 shadow-[0_0_15px_rgba(0,245,255,0.08)]"
              : "text-gray-400 hover:text-white"
          }`}
        >
          <Globe className="w-4 h-4 shrink-0" />
          <span className="hidden sm:inline">Level 2.1: Country DNA Accordion</span>
          <span className="sm:hidden">2.1 Country</span>
        </button>

        <button
          onClick={() => {
            if (!agent01Output) {
              addLog("[BLOCK ENGINE] Navigation denied. Invariant constraint: Please complete and Lock Level 2.1 Country DNA profile first.");
              return;
            }
            setLevel("level_2_2");
          }}
          className={`flex items-center justify-center gap-2 py-3 rounded-xl font-mono text-[11px] font-bold tracking-wider transition ${
            !agent01Output ? "opacity-40 cursor-not-allowed" : "cursor-pointer"
          } ${
            currentLevel === "level_2_2"
              ? "bg-[#00F5FF]/10 text-[#00F5FF] border border-[#00F5FF]/20 shadow-[0_0_15px_rgba(0,245,255,0.08)]"
              : "text-gray-400 hover:text-white"
          }`}
        >
          <Layers className="w-4 h-4 shrink-0" />
          <span className="hidden sm:inline">Level 2.2: Genre Tree Explorer</span>
          <span className="sm:hidden">2.2 Genre Tree</span>
        </button>

        <button
          onClick={() => {
            if (!agent02Output) {
              addLog("[BLOCK ENGINE] Navigation denied. Invariant constraint: Please formulate and Lock Level 2.2 Genre specifications first.");
              return;
            }
            setLevel("level_2_3");
          }}
          className={`flex items-center justify-center gap-2 py-3 rounded-xl font-mono text-[11px] font-bold tracking-wider transition ${
            !agent02Output ? "opacity-40 cursor-not-allowed" : "cursor-pointer"
          } ${
            currentLevel === "level_2_3"
              ? "bg-[#00F5FF]/10 text-[#00F5FF] border border-[#00F5FF]/20 shadow-[0_0_15px_rgba(0,245,255,0.08)]"
              : "text-gray-400 hover:text-white"
          }`}
        >
          <Flame className="w-4 h-4 shrink-0" />
          <span className="hidden sm:inline">Level 2.3: Subgenre Deep Dive</span>
          <span className="sm:hidden">2.3 Soul Seal</span>
        </button>
      </div>

      {errorMessage && (
        <div className="bg-red-500/10 border border-red-500/20 rounded-2xl p-4 flex items-start gap-3.5">
          <ShieldAlert className="w-5 h-5 text-red-400 shrink-0 mt-0.5" />
          <div className="space-y-1">
            <h4 className="text-xs font-mono font-bold text-red-400">INVARIANT SAFETY BLOCK ENGAGED</h4>
            <p className="text-[11px] text-gray-300 leading-normal">{errorMessage}</p>
          </div>
        </div>
      )}

      {/* Main Pages Conditional Renderer */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        
        {/* LEFT COLUMN COMMON TO LEVEL 2.1 & 2.3 for structural balance */}
        <div className="lg:col-span-4 flex flex-col gap-6">
          
          {/* Globe representation card - interactive Canvas rotate */}
          <div className="glass-panel p-5 rounded-3xl flex flex-col items-center justify-between min-h-[380px]">
            <div className="w-full pb-3 border-b border-white/5 mb-3 flex items-center justify-between">
              <span className="font-mono text-[10px] text-gray-400 uppercase tracking-widest font-semibold flex items-center gap-1.5">
                <Compass className="w-3.5 h-3.5 text-[#00F5FF]" />
                3D Coordinate Sphere
              </span>
              <span className="text-[9px] text-[#00F5FF] font-mono flex items-center gap-1 animate-pulse">
                <span className="w-1.5 h-1.5 rounded-full bg-[#00F5FF]" />
                ORBITAL ACTIVE
              </span>
            </div>

            <div className="relative cursor-grab active:cursor-grabbing my-2">
              <canvas
                ref={canvasRef}
                width={210}
                height={210}
                onMouseDown={handleMouseDown}
                onMouseMove={handleMouseMove}
                onMouseUp={handleMouseUpOrLeave}
                onMouseLeave={handleMouseUpOrLeave}
                className="block mx-auto rounded-full"
              />
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-44 h-44 border border-white/[0.01] rounded-full pointer-events-none" />
            </div>

            <p className="text-[10px] text-gray-500 font-mono text-center leading-normal max-w-[210px] mt-2">
              Interactive navigation sphere. Drag coordinates to locate grid systems. Select anchors above.
            </p>
          </div>

          {/* Local Intelligence Output Logger */}
          <div className="glass-panel p-5 rounded-3xl space-y-3.5 min-h-[220px] flex flex-col justify-between">
            <h3 className="font-mono text-[10px] uppercase text-[#00F5FF] tracking-wider font-semibold flex items-center gap-1.5 border-b border-white/5 pb-2.5">
              <Terminal className="w-3.5 h-3.5 animate-pulse" />
              Sovereign Shell Logs
            </h3>
            <div className="bg-[#050608] p-4 rounded-2xl border border-white/5 flex-1 font-mono text-[10.5px] text-gray-400 overflow-y-auto space-y-2 h-[150px] leading-relaxed custom-scrollbar max-h-[170px] select-text">
              {shellLogs.map((log, idx) => (
                <div key={idx} className="border-l border-white/10 pl-2 leading-tight">
                  {log}
                </div>
              ))}
            </div>
          </div>

        </div>

        {/* RIGHT COLUMN DYNAMIC CONTENT PANEL */}
        <div className="lg:col-span-8">

          {/* PAGE 1: LEVEL 2.1 COUNTRY INTERACTIVE ACCORDION */}
          {currentLevel === "level_2_1" && (
            <div className="space-y-6">
              
              {/* Agent Trigger Header Card */}
              <div className="glass-panel p-6 rounded-3xl space-y-5">
                <div className="pb-3 border-b border-white/5 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                  <div className="space-y-1">
                    <h3 className="font-display font-semibold text-lg text-white flex items-center gap-2">
                      <Cpu className="w-5 h-5 text-cyan-400" />
                      <span>Agent 01: Regional DNA Profiler</span>
                    </h3>
                    <p className="text-[10px] text-gray-400">Pulls Identity Anchors and extracts the precisely 3+ Hard Rules parameters</p>
                  </div>

                  {!agent01Output ? (
                    <button
                      onClick={triggerCountryProfiler}
                      disabled={isAgent01Running}
                      className="bg-gradient-to-r from-[#00F5FF] to-indigo-500 hover:from-[#00F5FF] hover:to-indigo-400 text-black font-extrabold font-mono text-xs px-5 py-3 rounded-2xl flex items-center gap-2 shadow-[0_0_15px_rgba(0,245,255,0.25)] stroke-black cursor-pointer transform hover:scale-105 active:scale-95 transition-all"
                    >
                      {isAgent01Running ? (
                        <>
                          <span className="w-3.5 h-3.5 border-2 border-dashed border-black rounded-full animate-spin" />
                          <span>RUNNING WORKER...</span>
                        </>
                      ) : (
                        <>
                          <Lock className="w-3.5 h-3.5 stroke-[2.5]" />
                          <span>LOCK COUNTRY DNA</span>
                        </>
                      )}
                    </button>
                  ) : (
                    <div className="flex items-center gap-2 bg-emerald-500/10 border border-emerald-500/20 rounded-2xl px-4 py-2 text-xs text-emerald-400 font-mono font-bold animate-pulse">
                      <Check className="w-4 h-4 shrink-0 stroke-[2.5]" />
                      <span>DNA LOCKED & VALIDATED</span>
                    </div>
                  )}
                </div>

                <div className="flex items-center gap-3 bg-white/[0.01] border border-white/5 p-4 rounded-2xl text-[11px] text-gray-400 leading-normal">
                  <HelpCircle className="w-5 h-5 text-gray-500 shrink-0" />
                  <p className="font-sans leading-relaxed">
                    Agent 01 performs autonomous geo-musicological validation. It locks the geographical anchor and registers it with <strong>MEMORY_TIER_2 (Google Drive)</strong>. This satisfies invariant and cryptographic sequences.
                  </p>
                </div>
              </div>

              {/* 7-Section Expandable Accordion Component */}
              <div className="glass-panel p-6 rounded-3xl space-y-4">
                <span className="text-[9.5px] font-mono text-[#00F5FF] block uppercase tracking-widest font-bold">
                  EXPANDABLE 7-SECTION CULTURAL DNA ACCORDION:
                </span>
                
                <div className="space-y-2">
                  {ACCORDION_SECTIONS.map((sec, idx) => {
                    const isOpen = openSection === idx;
                    const Icon = sec.icon;
                    return (
                      <div 
                        key={idx}
                        className={`border rounded-2xl transition-all duration-300 ${
                          isOpen 
                            ? "bg-[#0E0F15] border-cyan-500/25 shadow-[0_0_15px_rgba(0,245,255,0.03)]" 
                            : "bg-white/[0.01] border-white/5"
                        }`}
                      >
                        <button
                          onClick={() => setOpenSection(isOpen ? -1 : idx)}
                          className="w-full text-left p-4.5 flex justify-between items-center gap-4 cursor-pointer"
                        >
                          <div className="flex items-center gap-3 font-mono text-[11.5px] text-gray-200 hover:text-[#00F5FF] transition font-bold">
                            <Icon className={`w-4 class h-4 filter-cyan ${isOpen ? "text-[#00F5FF]" : "text-gray-400"}`} />
                            <span>{sec.title}</span>
                          </div>
                          {isOpen ? (
                            <ChevronUp className="w-4 h-4 text-gray-500" />
                          ) : (
                            <ChevronDown className="w-4 h-4 text-gray-400" />
                          )}
                        </button>

                        {isOpen && (
                          <div className="px-5.5 pb-5.5 text-[11.5px] leading-relaxed text-gray-300 font-sans border-t border-white/5 pt-3.5 whitespace-pre-line select-text">
                            {sec.content}
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Transition to next phase warning helper */}
              {agent01Output && (
                <div className="flex justify-end animate-fade-in select-none">
                  <button
                    onClick={() => setLevel("level_2_2")}
                    className="group bg-indigo-600/20 hover:bg-[#00F5FF]/10 text-white border border-[#00F5FF]/10 hover:border-[#00F5FF]/30 font-mono text-[10px] px-5 py-3 rounded-2xl flex items-center gap-2 font-bold cursor-pointer transition-all"
                  >
                    <span>PROCEED TO LEVEL 2.2 GENRE TREE</span>
                    <ArrowRight className="w-3.5 h-3.5 text-[#00F5FF] group-hover:translate-x-1.5 transition-transform" />
                  </button>
                </div>
              )}

            </div>
          )}

          {/* PAGE 2: LEVEL 2.2 GENRE INTRICACY GRAPH / D3.JS INTERACTIVE NODE */}
          {currentLevel === "level_2_2" && (
            <div className="space-y-6">
              
              {/* Core Agent 02 Controller */}
              <div className="glass-panel p-6 rounded-3xl space-y-4">
                <div className="pb-3 border-b border-white/5 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                  <div className="space-y-1">
                    <h3 className="font-display font-semibold text-lg text-white flex items-center gap-2">
                      <Cpu className="w-5 h-5 text-purple-400" />
                      <span>Agent 02: Genre Intelligence Node</span>
                    </h3>
                    <p className="text-[10px] text-gray-400">Verifies CVA requirements, narrows BPM indices, and isolates structural maps</p>
                  </div>

                  {!agent02Output ? (
                    <button
                      onClick={triggerGenreProfiler}
                      disabled={isAgent02Running}
                      className="bg-gradient-to-r from-purple-500 to-indigo-500 hover:from-purple-400 hover:to-indigo-400 text-white font-extrabold font-mono text-xs px-5 py-3 rounded-2xl flex items-center gap-2 shadow-lg cursor-pointer transform hover:scale-105 active:scale-95 transition-all"
                    >
                      {isAgent02Running ? (
                        <>
                          <span className="w-3.5 h-3.5 border-2 border-dashed border-white rounded-full animate-spin" />
                          <span>RUNNING WORKER...</span>
                        </>
                      ) : (
                        <>
                          <Lock className="w-3.5 h-3.5" />
                          <span>LOCK GENRE BENCHMARKS</span>
                        </>
                      )}
                    </button>
                  ) : (
                    <div className="flex items-center gap-2 bg-emerald-500/10 border border-emerald-500/20 rounded-2xl px-4 py-2 text-xs text-emerald-400 font-mono font-bold animate-pulse">
                      <Check className="w-4 h-4 shrink-0 stroke-[2.5]" />
                      <span>GENRE BOUNDS LOCKED</span>
                    </div>
                  )}
                </div>

                <div className="flex items-center gap-3 bg-[#0A0B10]/40 border border-white/5 p-4 rounded-2xl text-[11px] text-gray-400">
                  <HelpCircle className="w-5 h-5 text-gray-500 shrink-0" />
                  <p className="font-sans leading-relaxed">
                    Under Invariant INV-01, Agent 02 cannot execute without validating that <code>contract_ic_01_country_dna</code> is locked. Clicking LOCK parses structural K-pop rules (such as HR-KR-01 Pre-Chorus).
                  </p>
                </div>
              </div>

              {/* Main D3 Tree rendering wrapper */}
              <GenreTree />

              {/* Component: Elastic Emotional Map (Horizontal Spectrum) */}
              <div className="glass-panel p-6 rounded-3xl space-y-4">
                <div className="flex justify-between items-center border-b border-white/5 pb-2">
                  <span className="text-[9.5px] font-mono text-[#00F5FF] block uppercase tracking-widest font-bold">
                    Interactive Emotional Spectrum Map:
                  </span>
                  <span className="font-mono text-[9px] text-[#FF4ECD] font-bold">
                    {elasticSlider < 40 ? "Han (Restrained Fury)" : elasticSlider < 70 ? "Jeong (Ancestral Core)" : "Heung (Dynamic Liberation)"}
                  </span>
                </div>
                
                <p className="text-[11px] text-gray-400 font-sans leading-relaxed leading-normal">
                  The emotional frequency coordinate indexes active sonic values. Drag core levels to balance static sorrow with kinetic dopamine energy drop thresholds.
                </p>

                <div className="space-y-3 pt-2">
                  <div className="flex justify-between text-[9px] font-mono text-gray-500 uppercase">
                    <span>Sorrow / Han</span>
                    <span>Tension / Jeong</span>
                    <span>Kinetic / Heung</span>
                  </div>

                  <input 
                    type="range" 
                    min="1" 
                    max="100" 
                    value={elasticSlider}
                    onChange={(e) => setElasticSlider(parseInt(e.target.value))}
                    className="w-full accent-[#00F5FF] h-1.5 bg-black/40 rounded-lg appearance-none cursor-pointer border border-white/10"
                  />

                  <div className="flex justify-between items-center text-[10px] font-mono">
                    <span className="text-gray-500">BOUND_NOMINAL:</span>
                    <span className="text-[#00F5FF] font-bold">{elasticSlider}% Vector Frequency</span>
                  </div>
                </div>
              </div>

              {/* Component: 3-Tier Dynamic Instrumentation Stack */}
              <div className="glass-panel p-6 rounded-3xl space-y-4">
                <span className="text-[9.5px] font-mono text-[#00F5FF] block uppercase tracking-widest font-bold border-b border-white/5 pb-2">
                  3-Tier Sovereign Instrumentation Stack:
                </span>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-3.5">
                  
                  {/* Tier 1: Mandatory */}
                  <div className="bg-rose-500/[0.02] border border-rose-500/10 p-4.5 rounded-2xl space-y-3">
                    <span className="text-[10px] font-mono text-rose-400 font-bold uppercase tracking-wider block flex items-center gap-1.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-rose-500 animate-pulse" />
                      Critical Ethnological
                    </span>
                    <div className="text-[11px] text-gray-300 space-y-2">
                      {instrumentStack.mandatory.map((ins, idx) => (
                        <div key={idx} className="bg-black/20 p-2 rounded border border-rose-500/5 leading-tight">
                          • {ins}
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Tier 2: Expected */}
                  <div className="bg-purple-500/[0.02] border border-purple-500/10 p-4.5 rounded-2xl space-y-3">
                    <span className="text-[10px] font-mono text-purple-400 font-bold uppercase tracking-wider block flex items-center gap-1.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-purple-500" />
                      Expected Standard
                    </span>
                    <div className="text-[11px] text-gray-300 space-y-2">
                      {instrumentStack.expected.map((ins, idx) => (
                        <div key={idx} className="bg-black/20 p-2 rounded border border-purple-500/5 leading-tight">
                          • {ins}
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Tier 3: Optional */}
                  <div className="bg-cyan-500/[0.02] border border-cyan-500/10 p-4.5 rounded-2xl space-y-3">
                    <span className="text-[10px] font-mono text-cyan-400 font-bold uppercase tracking-wider block flex items-center gap-1.5">
                      <Activity className="w-3.5 h-3.5 text-cyan-400" />
                      Granular Ornaments
                    </span>
                    <div className="text-[11px] text-gray-300 space-y-2">
                      {instrumentStack.optional.map((ins, idx) => (
                        <div key={idx} className="bg-black/20 p-2 rounded border border-cyan-500/5 leading-tight">
                          • {ins}
                        </div>
                      ))}
                    </div>
                  </div>

                </div>
              </div>

              {/* Proceed to 2.3 */}
              {agent02Output && (
                <div className="flex justify-end animate-fade-in select-none">
                  <button
                    onClick={() => setLevel("level_2_3")}
                    className="group bg-indigo-600/20 hover:bg-[#00F5FF]/10 text-white border border-[#00F5FF]/10 hover:border-[#00F5FF]/30 font-mono text-[10px] px-5 py-3 rounded-2xl flex items-center gap-2 font-bold cursor-pointer transition-all"
                  >
                    <span>PROCEED TO LEVEL 2.3 HEART EMBEDDING</span>
                    <ArrowRight className="w-3.5 h-3.5 text-[#00F5FF] group-hover:translate-x-1.5 transition-transform" />
                  </button>
                </div>
              )}

            </div>
          )}

          {/* PAGE 3: LEVEL 2.3 MICRO-EMOTION SELECTOR & SPEC BRIEF CONVERGENCE */}
          {currentLevel === "level_2_3" && (
            <div className="space-y-6 animate-fade-in">
              
              {/* Agent 03 Sparker card */}
              <div className="glass-panel p-6 rounded-3xl space-y-5">
                <div className="pb-3 border-b border-white/5 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                  <div className="space-y-1">
                    <h3 className="font-display font-semibold text-lg text-white flex items-center gap-2">
                      <Cpu className="w-5 h-5 text-yellow-400" />
                      <span>Agent 03: Subgenre DNA Specialist</span>
                    </h3>
                    <p className="text-[10px] text-gray-400">Identifies the Unique Production Fingerprints and establishes Vocabulary Clusters</p>
                  </div>

                  {!agent03Output ? (
                    <button
                      onClick={triggerSubgenreProfiler}
                      disabled={isAgent03Running}
                      className="bg-gradient-to-r from-yellow-500 to-amber-600 hover:from-yellow-400 hover:to-amber-500 text-black font-extrabold font-mono text-xs px-5 py-3 rounded-2xl flex items-center gap-2 shadow-lg cursor-pointer transform hover:scale-105 active:scale-95 transition-all"
                    >
                      {isAgent03Running ? (
                        <>
                          <span className="w-3.5 h-3.5 border-2 border-dashed border-black rounded-full animate-spin" />
                          <span>PULLING SUBGENRE SPECS...</span>
                        </>
                      ) : (
                        <>
                          <Unlock className="w-3.5 h-3.5" />
                          <span>COMPILE BREEDING SUBGENRE DNA</span>
                        </>
                      )}
                    </button>
                  ) : (
                    <div className="flex items-center gap-2 bg-emerald-500/10 border border-emerald-500/20 rounded-2xl px-4 py-2 text-xs text-emerald-400 font-mono font-bold animate-pulse">
                      <Check className="w-4 h-4 shrink-0 stroke-[2.5]" />
                      <span>SUBGENRE_DNA_BRIEF COMPILED</span>
                    </div>
                  )}
                </div>

                <div className="flex items-center gap-3 bg-[#0A0B10]/40 border border-white/5 p-4 rounded-2xl text-[11px] text-gray-400 leading-relaxed font-sans">
                  <HelpCircle className="w-5 h-5 text-gray-500 shrink-0" />
                  <p>
                    Agent 03 merges the country parameters with the genre constraints. Once generated, the pipeline enters a <code>WAITING</code> state at the <strong>Irreducible Human Selector Gate</strong>.
                  </p>
                </div>
              </div>

              {/* Waiting status indicator if breeder brief is open but emotion is not chosen yet */}
              {agent03Output && !isEmotionLocked && (
                <div className="bg-yellow-500/10 border border-yellow-500/20 rounded-3xl p-5 flex items-start gap-3 w-full animate-pulse select-none">
                  <Sliders className="w-5 h-5 text-yellow-400 shrink-0 mt-0.5" />
                  <div className="space-y-1">
                    <span className="font-mono text-[9px] text-yellow-400 tracking-wider uppercase font-bold block">
                      CORE SEQUENCE: PIPELINE_IN_WAITING_STATE
                    </span>
                    <h4 className="text-xs font-sans font-bold text-white">IRREDUCIBLE HUMAN CHOICE LOCK MANDATORY</h4>
                    <p className="text-[11px] text-gray-300 leading-normal font-sans">
                      Autonomy sequence successfully ran 80% technical tasks. The pipeline is locked in WAITING state at Step 5. You must manually select exactly 1 of the 5 micro-emotion scenario vector cards below to lock the DNA package.
                    </p>
                  </div>
                </div>
              )}

              {/* Card option list - precisely 5 scenario cards */}
              {agent03Output && (
                <div className="space-y-5">
                  <div className="glass-panel p-6 rounded-3xl space-y-4">
                    <span className="text-[10px] font-mono text-[#00F5FF] block uppercase tracking-widest font-bold pb-2.5 border-b border-white/5">
                      CHOOSE 1 OF 5 MICRO-EMOTION SOUL CHANNELS:
                    </span>

                    <div className="space-y-2.5">
                      {MICRO_EMOTION_CARDS.map((card) => {
                        const isChosen = selectedEmotion === card.name;
                        return (
                          <button
                            key={card.id}
                            disabled={isEmotionLocked}
                            onClick={() => lockEmotionSovereign(card.name)}
                            className={`w-full text-left p-4.5 rounded-2xl border transition-all duration-300 flex justify-between items-center gap-4 ${
                              isEmotionLocked && !isChosen ? "opacity-45 cursor-not-allowed" : "cursor-pointer"
                            } ${
                              isChosen
                                ? "bg-[#00F5FF]/5 border-[#00F5FF]/40 text-white shadow-[0_0_20px_rgba(0,245,255,0.05)]"
                                : "bg-white/[0.01] border-white/5 text-gray-400 hover:bg-white/[0.02] hover:text-white"
                            }`}
                          >
                            <div className="space-y-1.5 leading-normal max-w-xl">
                              <span className={`font-mono text-[9px] uppercase font-bold px-2 py-0.5 rounded ${isChosen ? 'bg-[#00F5FF]/10 text-[#00F5FF]' : 'bg-white/5 text-gray-500'}`}>
                                {card.category}
                              </span>
                              <span className={`font-bold text-xs.5 block ${isChosen ? "text-[#00F5FF]" : "text-gray-200"}`}>
                                {card.name}
                              </span>
                              <span className="text-[10.5px] text-gray-400 block font-normal leading-relaxed">{card.desc}</span>
                            </div>

                            <div className="w-5.5 h-5.5 rounded-full border flex items-center justify-center shrink-0" style={{
                              borderColor: isChosen ? "#00F5FF" : "rgba(255, 255, 255, 0.1)"
                            }}>
                              {isChosen && <div className="w-3 h-3 rounded-full bg-[#00F5FF] shadow-[0_0_8px_rgba(0,245,255,0.8)]" />}
                            </div>
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  {/* Complete brief display when LOCKED */}
                  {isEmotionLocked && (
                    <div className="glass-panel p-6.5 rounded-3xl space-y-6.5 animate-scale-up select-text">
                      <div className="flex items-center gap-3.5 border-b border-white/5 pb-4">
                        <Award className="w-5.5 h-5.5 text-yellow-400 drop-shadow-[0_0_15px_rgba(234,179,8,0.4)]" />
                        <div>
                          <span className="font-mono text-[9px] text-[#00F5FF] block tracking-wide font-bold uppercase">
                            CULTURAL SUBGENRE_DNA_BRIEF: LOCKED_STATE
                          </span>
                          <span className="text-sm.5 font-sans font-bold text-gray-200">
                            {selectedEmotion} Core System Embedded
                          </span>
                        </div>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4.5 font-mono text-[10.5px] leading-relaxed">
                        
                        <div className="space-y-2 bg-[#050608] border border-white/5 p-4 rounded-2xl">
                          <span className="text-[9px] text-gray-500 block font-bold uppercase tracking-widest flex items-center gap-1">
                            <Activity className="w-3 h-3 text-[#00F5FF]" />
                            Unique Production Identifier:
                          </span>
                          <span className="text-[#00F5FF] font-bold block bg-black/40 p-2.5 rounded border border-cyan-500/10 leading-normal">
                            {agent03Output?.uniqueProductionIdentifier}
                          </span>
                        </div>

                        <div className="space-y-2 bg-[#050608] border border-white/5 p-4 rounded-2xl">
                          <span className="text-[9px] text-gray-500 block font-bold uppercase tracking-widest flex items-center gap-1">
                            <Database className="w-3 h-3 text-[#00F5FF]" />
                            Vocabulary Cluster (Sovereign 30 Korean Target words):
                          </span>
                          <div className="flex flex-wrap gap-1.5 pt-1.5 overflow-y-auto max-h-[140px] custom-scrollbar pr-1">
                            {agent03Output?.vocabularyCluster.map((w, idx) => (
                              <span key={idx} className="bg-purple-500/10 border border-purple-500/20 text-purple-300 text-[10px] px-2.5 py-0.5 rounded-full font-bold font-mono">
                                {w}
                              </span>
                            ))}
                          </div>
                        </div>

                      </div>

                      {/* Technical specifications and guidelines compliance */}
                      <div className="bg-white/[0.01]/30 border border-emerald-500/15 text-[11.5px] p-4.5 rounded-2xl space-y-2 leading-relaxed font-sans text-gray-300">
                        <span className="font-mono text-[10px] text-emerald-400 font-bold uppercase tracking-wider block flex items-center gap-1.5">
                          <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                          PIPELINE_LOCKED AND CONSTITUTION COMPLIANT
                        </span>
                        <p>
                          With both regional DNA parameters parsed and the micro-emotion selected:
                        </p>
                        <ul className="list-disc list-inside space-y-1.5 pl-2 pt-1 text-gray-400">
                          <li>The Country Specific hard rule triggers (Pre-Chorus Validation) have achieving <strong>PIPELINE_LOCKED</strong> status.</li>
                          <li>Contract outputs are preserved inside Google Drive folders.</li>
                          <li>Checkpoint states are securely registered in database caches.</li>
                        </ul>
                      </div>

                      <div className="pt-2.5 flex items-center gap-2.5 select-none">
                        <button
                          onClick={reset}
                          className="bg-black/40 hover:bg-white/5 border border-white/10 text-gray-400 hover:text-white font-mono text-[10px] px-4 py-3 rounded-2xl font-bold cursor-pointer transition"
                        >
                          RESET PIPELINE STEP
                        </button>

                        <button
                          onClick={() => {
                            // Navigate to studio (Level 03 Workspace)
                            const sidebarEl = document.querySelector('[data-page-link="studio"]') as HTMLButtonElement;
                            if (sidebarEl) sidebarEl.click();
                          }}
                          className="flex-1 bg-gradient-to-r from-purple-500 to-[#FF4ECD] hover:from-purple-400 hover:to-[#FF4ECD]/90 text-white border border-transparent font-mono text-[10px] px-5 py-3 rounded-2xl flex items-center justify-center gap-2 font-bold cursor-pointer transition transform hover:scale-[1.02] active:scale-95"
                        >
                          <span>PROCEED TO LEVEL 03: PIPELINE STUDIO</span>
                          <ArrowRight className="w-3.5 h-3.5 shrink-0" />
                        </button>
                      </div>

                    </div>
                  )}

                </div>
              )}

            </div>
          )}

        </div>

      </div>

    </div>
  );
}
