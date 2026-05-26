import React from "react";

interface RadarPillar {
  name: string;
  score: number;
  description: string;
}

interface QARadarChartProps {
  pillars: RadarPillar[];
  size?: number;
}

export default function QARadarChart({ pillars, size = 260 }: QARadarChartProps) {
  // Ensure we always have exactly 10 pillars
  const fallbackPillars: RadarPillar[] = [
    { name: "Hook Power", score: 9, description: "Catches ears immediately" },
    { name: "Emotional Impact", score: 8, description: "Vocal frequency authenticity" },
    { name: "Authenticity", score: 8, description: "No generic 'world fusion' dilution" },
    { name: "Pronunciation & Tone", score: 9, description: "Syllable weight & cadence" },
    { name: "Dynamic Arc", score: 8, description: "Energy change ratio across blueprint" },
    { name: "Vocabulary Density", score: 9, description: "30-word cluster representation" },
    { name: "Cliché Counter", score: 10, description: "Absence of overused pop idioms" },
    { name: "Specificity Score", score: 8, description: "Concrete photographable noun markers" },
    { name: "Structured Alignment", score: 9, description: "Traditional verses/chores sync" },
    { name: "Sonic Spatial Balance", score: 8, description: "Sub-bass headroom controls" }
  ];

  const activePillars = pillars.length === 10 ? pillars : fallbackPillars;
  
  const center = size / 2;
  const radius = (size / 2) - 30;
  const numPillars = 10;

  // Calculate coordinates for a given pillar index and value (1-10 scale)
  const getCoordinates = (index: number, scoreValue: number) => {
    const angle = (Math.PI * 2 / numPillars) * index - Math.PI / 2;
    // Scale score to fit radius length
    const distance = (scoreValue / 10) * radius;
    const x = center + distance * Math.cos(angle);
    const y = center + distance * Math.sin(angle);
    return { x, y };
  };

  // Build grid circles/polygons represents scoring tiers: 2, 4, 6, 8 (threshold), 10 (perfect)
  const gridLevels = [2, 4, 6, 8, 10];

  // Path for the active score area
  const points = activePillars.map((p, idx) => {
    const { x, y } = getCoordinates(idx, p.score);
    return `${x},${y}`;
  }).join(" ");

  return (
    <div className="flex flex-col items-center justify-center p-2 rounded-2xl bg-black/40 border border-white/5 relative overflow-hidden">
      
      {/* Background neon glows */}
      <div className="absolute w-24 h-24 rounded-full bg-emerald-500/10 blur-xl top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none" />

      <svg width={size} height={size} className="overflow-visible select-none drop-shadow-[0_0_15px_rgba(0,245,255,0.05)]">
        {/* Draw concentric polygons for background grid */}
        {gridLevels.map((lvl) => {
          const gridPoints = Array.from({ length: numPillars }).map((_, idx) => {
            const { x, y } = getCoordinates(idx, lvl);
            return `${x},${y}`;
          }).join(" ");
          
          const isPassThreshold = lvl === 8;

          return (
            <polygon
              key={lvl}
              points={gridPoints}
              fill="none"
              stroke={isPassThreshold ? "rgba(16, 185, 129, 0.45)" : "rgba(255, 255, 255, 0.08)"}
              strokeWidth={isPassThreshold ? "1.5" : "1"}
              strokeDasharray={lvl % 4 === 0 ? undefined : "2 2"}
              className={isPassThreshold ? "animate-pulse" : ""}
            />
          );
        })}

        {/* Draw radial axis lines outward from center */}
        {activePillars.map((_, idx) => {
          const outerCoor = getCoordinates(idx, 10);
          return (
            <line
              key={idx}
              x1={center}
              y1={center}
              x2={outerCoor.x}
              y2={outerCoor.y}
              stroke="rgba(255, 255, 255, 0.08)"
              strokeWidth="1"
            />
          );
        })}

        {/* Core Filled Score Area representing current Song Package Status */}
        <polygon
          points={points}
          fill="rgba(0, 245, 255, 0.15)"
          stroke="#00F5FF"
          strokeWidth="2.5"
          className="transition-all duration-500"
          style={{ filter: "drop-shadow(0 0 4px rgba(0,245,255,0.4))" }}
        />

        {/* Render highlight node dots for each score point */}
        {activePillars.map((p, idx) => {
          const { x, y } = getCoordinates(idx, p.score);
          const isHighValue = p.score >= 8;
          return (
            <g key={idx}>
              <circle
                cx={x}
                cy={y}
                r={isHighValue ? "4" : "3"}
                fill={isHighValue ? "#10B981" : "#00F5FF"}
                stroke="#040508"
                strokeWidth="1.5"
                className="transition-all duration-300 hover:scale-150 cursor-pointer"
              />
              {/* Score Value text inside plot node */}
              <text
                x={x}
                y={y - 8}
                fontSize="8"
                fontWeight="bold"
                textAnchor="middle"
                fill={isHighValue ? "#34D399" : "#00F5FF"}
                className="font-mono text-[8px]"
              >
                {p.score}
              </text>
            </g>
          );
        })}

        {/* Small Labels representing 10 discrete indicators */}
        {activePillars.map((p, idx) => {
          const outerCoor = getCoordinates(idx, 10);
          // Adjust labels anchors relative to coordinates quadrant
          const angle = (Math.PI * 2 / numPillars) * idx - Math.PI / 2;
          const labelDist = radius + 15;
          const lx = center + labelDist * Math.cos(angle);
          const ly = center + labelDist * Math.sin(angle);
          
          let textAnchor = "middle";
          if (Math.cos(angle) > 0.2) textAnchor = "start";
          if (Math.cos(angle) < -0.2) textAnchor = "end";

          // Shorten tags to fit
          const labelMap: Record<string, string> = {
            "Hook Power": "Hook Pow.",
            "Emotional Impact": "Impact",
            "Authenticity": "Authentic",
            "Pronunciation & Tone": "Phonetics",
            "Dynamic Arc": "Dyn. Arc",
            "Vocabulary Density": "Voc. Dens.",
            "Cliché Counter": "Cliché",
            "Specificity Score": "Specif.",
            "Structured Alignment": "Align",
            "Sonic Spatial Balance": "Sonic Bal."
          };

          return (
            <text
              key={idx}
              x={lx}
              y={ly + 4}
              fontSize="8"
              fill="rgba(156, 163, 175, 0.95)"
              textAnchor={textAnchor}
              className="font-mono text-[8px] uppercase tracking-wider"
              id={`radar-label-${idx}`}
            >
              {labelMap[p.name] || p.name.substring(0, 8)}
            </text>
          );
        })}
      </svg>

      <div className="flex gap-4 mt-2 justify-between w-full border-t border-white/5 pt-2 px-1 font-mono text-[9px] text-gray-500">
        <div className="flex items-center gap-1">
          <span className="w-1.5 h-1.5 rounded-full bg-cyan-400" />
          <span>Active Score</span>
        </div>
        <div className="flex items-center gap-1">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
          <span>Target (8+) Pass Tier</span>
        </div>
      </div>
    </div>
  );
}
