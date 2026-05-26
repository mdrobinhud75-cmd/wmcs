"use client";

import React, { useRef, useEffect, useState } from "react";

interface GlobePoint {
  code: string;
  name: string;
  color: string;
  phi: number;
  theta: number;
  baseX: number;
  baseY: number;
  baseZ: number;
}

interface GlobeCanvasProps {
  selectedCode: string;
  onSelectCountry: (code: string) => void;
  accentColors: Record<string, string>;
}

export default function GlobeCanvas({ selectedCode, onSelectCountry, accentColors }: GlobeCanvasProps) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const rotationRef = useRef<number>(0);
  const [hoveredName, setHoveredName] = useState<string | null>(null);

  // Approximate longitude/latitude offsets for 3D pinning
  const countriesCoordList = [
    { code: "US", name: "United States", lat: 37, lon: -120 },
    { code: "KR", name: "South Korea", lat: 36, lon: 127 },
    { code: "BR", name: "Brazil", lat: -14, lon: -51 },
    { code: "JP", name: "Japan", lat: 35, lon: 138 },
    { code: "ZA", name: "South Africa", lat: -30, lon: 25 },
    { code: "NG", name: "Nigeria", lat: 9, lon: 8 },
    { code: "IN", name: "India", lat: 20, lon: 78 },
    { code: "GB", name: "United Kingdom", lat: 55, lon: -3 },
    { code: "CO", name: "Colombia", lat: 4, lon: -72 },
    { code: "ES", name: "Spain", lat: 40, lon: -3 },
    { code: "FR", name: "France", lat: 46, lon: 2 }
  ];

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const radius = 100;
    let animationId: number;

    const points: GlobePoint[] = countriesCoordList.map(c => {
      const phi = (90 - c.lat) * Math.PI / 180;
      const theta = (c.lon + 180) * Math.PI / 180;
      return {
        code: c.code,
        name: c.name,
        color: accentColors[c.code] || "#00F5FF",
        phi,
        theta,
        baseX: radius * Math.sin(phi) * Math.cos(theta),
        baseY: radius * Math.cos(phi),
        baseZ: radius * Math.sin(phi) * Math.sin(theta)
      };
    });

    const render = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      const cx = canvas.width / 2;
      const cy = canvas.height / 2;

      rotationRef.current += 0.006;
      const rot = rotationRef.current;

      // Draw glass sphere bounds
      ctx.beginPath();
      ctx.arc(cx, cy, radius, 0, Math.PI * 2);
      ctx.fillStyle = "rgba(4, 5, 8, 0.9)";
      ctx.strokeStyle = "rgba(255, 255, 255, 0.08)";
      ctx.lineWidth = 1.5;
      ctx.fill();
      ctx.stroke();

      // Draw latitude wires
      for (let i = -3; i <= 3; i++) {
        const h = radius * (i / 4);
        const r = Math.sqrt(radius * radius - h * h);
        ctx.beginPath();
        ctx.ellipse(cx, cy + h, r, r * 0.18, 0, 0, Math.PI * 2);
        ctx.strokeStyle = "rgba(255, 255, 255, 0.03)";
        ctx.stroke();
      }

      // Draw rotating longitude wires
      for (let j = 0; j < 4; j++) {
        const thetaAngle = (j / 4) * Math.PI * 2 + rot;
        ctx.beginPath();
        ctx.ellipse(cx, cy, radius * Math.sin(thetaAngle), radius, 0, 0, Math.PI * 2);
        ctx.strokeStyle = "rgba(0, 245, 255, 0.02)";
        ctx.stroke();
      }

      // Project 3D points to 2D screen
      const projected = points.map(p => {
        const rotatedTheta = p.theta + rot;
        const x3d = radius * Math.sin(p.phi) * Math.cos(rotatedTheta);
        const y3d = radius * Math.cos(p.phi);
        const z3d = radius * Math.sin(p.phi) * Math.sin(rotatedTheta);

        return {
          code: p.code,
          name: p.name,
          color: p.color,
          x2d: cx + x3d,
          y2d: cy + y3d,
          z3d,
          isFront: z3d > -20
        };
      });

      // Render back nodes first
      projected.sort((a, b) => a.z3d - b.z3d);

      projected.forEach(p => {
        if (!p.isFront) return;

        // Draw pin ring aura
        ctx.beginPath();
        ctx.arc(p.x2d, p.y2d, 6, 0, Math.PI * 2);
        ctx.fillStyle = `${p.color}25`;
        ctx.fill();

        // Core dot
        ctx.beginPath();
        ctx.arc(p.x2d, p.y2d, 3, 0, Math.PI * 2);
        ctx.fillStyle = p.color;
        ctx.fill();

        // Label for selected node
        if (p.code === selectedCode) {
          ctx.beginPath();
          ctx.arc(p.x2d, p.y2d, 10, 0, Math.PI * 2);
          ctx.strokeStyle = p.color;
          ctx.lineWidth = 1;
          ctx.stroke();

          ctx.fillStyle = "#FFFFFF";
          ctx.font = "bold 8px monospace";
          ctx.fillText(p.code, p.x2d + 12, p.y2d + 3);
        }
      });

      animationId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animationId);
    };
  }, [selectedCode, accentColors]);

  return (
    <div className="flex flex-col items-center">
      <canvas
        ref={canvasRef}
        width={220}
        height={220}
        className="rounded-full shadow-2xl tracking-normal"
      />
      <div className="mt-4 text-[10px] font-mono text-gray-400 select-none bg-black/45 border border-white/5 py-1 px-3 rounded-full">
        CAMERA ANGLE STATUS: <span className="text-[#00F5FF]">ROTATING (3D)</span>
      </div>
    </div>
  );
}
