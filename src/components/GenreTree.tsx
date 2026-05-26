import React, { useEffect, useRef, useState } from "react";
import * as d3 from "d3";
import { useResearchStore } from "../useResearchStore";
import { Sliders, Music, Zap, Layers } from "lucide-react";

interface TreeNode {
  name: string;
  type: "root" | "genre" | "subgenre";
  description?: string;
  code?: string;
  children?: TreeNode[];
}

export default function GenreTree() {
  const { selectedCountry, selectedGenre, selectedSubgenre, setGenre, setSubgenre } = useResearchStore();
  const svgRef = useRef<SVGSVGElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);
  
  const [dimensions, setDimensions] = useState({ width: 500, height: 350 });
  const [activeNodeName, setActiveNodeName] = useState<string>("");

  // Resize listener
  useEffect(() => {
    if (!containerRef.current) return;
    const observer = new ResizeObserver((entries) => {
      if (!entries || entries.length === 0) return;
      const { width } = entries[0].contentRect;
      setDimensions({
        width: Math.max(width, 350),
        height: 380
      });
    });
    observer.observe(containerRef.current);
    return () => observer.disconnect();
  }, []);

  // Formulate tree data based on selected country
  const getTreeData = (): TreeNode => {
    const countryName = selectedCountry?.name || "Global";
    
    if (selectedCountry?.code === "KR") {
      return {
        name: `${countryName} Performance Hub`,
        type: "root",
        children: [
          {
            name: "K-Pop Maximalism",
            type: "genre",
            code: "K-Pop",
            description: "High BPM synthetic leads with orchestral parallel string sections",
            children: [
              { name: "K-Pop Dark Concept", type: "subgenre", description: "Heavy parallel compression orchestral-trap fusion with energetic unison explosion focus." },
              { name: "Hyper-R&B maximalist", type: "subgenre", description: "Maximalist neon synth structures with complex 7-part vocal stack harmonies." },
              { name: "Sovereign Warrior Stride", type: "subgenre", description: "Aggressive brass hooks pushing traditional acoustic Gayageum cascades over massive 808 subs." }
            ]
          },
          {
            name: "Gukak Fusion",
            type: "genre",
            code: "Gukak-Fusion",
            description: "Traditional Korean Court traditional structures blended with high-frequency electronic drums",
            children: [
              { name: "Pansori Core", type: "subgenre", description: "Monotonal raw traditional vocals intersecting modular synth chords." },
              { name: "Gayageum Granular Electro", type: "subgenre", description: "Pentatonic granular site sweeps coupled with industrial sidechains." }
            ]
          }
        ]
      };
    }

    // Default or US tree
    return {
      name: `${countryName} West-Coast Hub`,
      type: "root",
      children: [
        {
          name: "Dance Pop Core",
          type: "genre",
          code: "Dance Pop",
          description: "Tightly engineered modular synthetic grooves with high dynamic floor bounds",
          children: [
            { name: "US-DPOP-COMMERCIAL", type: "subgenre", description: "Top 40 maximum stereowidth synth hook with sibilance dynamic shelfs." },
            { name: "US-DPOP-UNDERGROUND", type: "subgenre", description: "Abrasive distorted bass loops coupled with vintage tape saturations." },
            { name: "US-DPOP-CHAMBER", type: "subgenre", description: "Lush classic woodblocks with modular Rhodes loops panned wide." }
          ]
        },
        {
          name: "Electro-Folk Fusion",
          type: "genre",
          code: "Electro-Folk",
          description: "Traditional acoustic slide pickings layered under high transient clicking 808s",
          children: [
            { name: "Delta Cyber-Blues", type: "subgenre", description: "Gritty acoustic slide guitar, low pass 850Hz filters, and click trap beats." },
            { name: "Neo-Grunge Modular", type: "subgenre", description: "Distorted guitar transients layered with clinical -48dB de-essed vocals." }
          ]
        }
      ]
    };
  };

  const treeData = getTreeData();

  useEffect(() => {
    if (!svgRef.current) return;

    // Clear previous elements
    d3.select(svgRef.current).selectAll("*").remove();

    const svg = d3.select(svgRef.current);
    const { width, height } = dimensions;

    // Margin configurations
    const margin = { top: 20, right: 100, bottom: 20, left: 100 };
    const innerWidth = width - margin.left - margin.right;
    const innerHeight = height - margin.top - margin.bottom;

    // Declare D3 radial tree or horizontal tree layout
    const treemap = d3.tree<TreeNode>().size([innerHeight, innerWidth]);

    // Construct hierarchy and compute coordinates
    const rootNode = d3.hierarchy<TreeNode>(treeData);
    const treeComputed = treemap(rootNode);

    const g = svg
      .append("g")
      .attr("transform", `translate(${margin.left}, ${margin.top})`);

    // Add glowing filter for neon lines
    const defs = svg.append("defs");
    
    const glowFilter = defs
      .append("filter")
      .attr("id", "neon-glow")
      .attr("x", "-20%")
      .attr("y", "-20%")
      .attr("width", "140%")
      .attr("height", "140%");
      
    glowFilter
      .append("feGaussianBlur")
      .attr("stdDeviation", "4")
      .attr("result", "blur");
      
    glowFilter
      .append("feMerge")
      .append("feMergeNode")
      .attr("in", "blur");
      
    glowFilter.select("feMerge").append("feMergeNode").attr("in", "SourceGraphic");

    // Render tree linking lines (curves)
    g.selectAll(".link")
      .data(treeComputed.links())
      .enter()
      .append("path")
      .attr("class", "link")
      .attr("fill", "none")
      .attr("stroke", (d) => {
        // Dynamic coloring depending on selection
        const isGenreSelected = d.target.data.code === selectedGenre || d.target.data.name === selectedSubgenre;
        return isGenreSelected ? "#00F5FF" : "rgba(255, 255, 255, 0.08)";
      })
      .attr("stroke-width", (d) => {
        const isSelected = d.target.data.code === selectedGenre || d.target.data.name === selectedSubgenre;
        return isSelected ? "2.5px" : "1.5px";
      })
      .style("filter", (d) => {
        const isSelected = d.target.data.code === selectedGenre || d.target.data.name === selectedSubgenre;
        return isSelected ? "url(#neon-glow)" : "none";
      })
      .attr("d", d3.linkHorizontal<any, d3.HierarchyPointNode<TreeNode>>()
        .x((d) => d.y)
        .y((d) => d.x) as any
      )
      .style("opacity", 0)
      .transition()
      .duration(600)
      .style("opacity", 1);

    // Compute node layers
    const node = g
      .selectAll(".node")
      .data(treeComputed.descendants())
      .enter()
      .append("g")
      .attr("class", "node")
      .attr("transform", (d) => `translate(${d.y},${d.x})`)
      .style("cursor", "pointer")
      .on("click", (event, d) => {
        setActiveNodeName(d.data.name);
        if (d.data.type === "genre" && d.data.code) {
          setGenre(d.data.code);
        } else if (d.data.type === "subgenre") {
          setSubgenre(d.data.name);
        }
      });

    // Outer interactive neon circles
    node
      .append("circle")
      .attr("r", (d) => (d.data.type === "root" ? 10 : d.data.type === "genre" ? 7.5 : 6))
      .attr("fill", (d) => {
        if (d.data.type === "root") return "#FF4ECD";
        if (d.data.type === "genre") {
          return d.data.code === selectedGenre ? "#00F5FF" : "#1F2937";
        }
        return d.data.name === selectedSubgenre ? "#00F5FF" : "#111827";
      })
      .attr("stroke", (d) => {
        if (d.data.type === "root") return "rgba(255,78,205,0.4)";
        if (d.data.type === "genre") {
          return d.data.code === selectedGenre ? "#00F5FF" : "rgba(255, 255, 255, 0.2)";
        }
        return d.data.name === selectedSubgenre ? "#00F5FF" : "rgba(255, 255, 255, 0.1)";
      })
      .attr("stroke-width", "1.5px")
      .style("filter", (d) => {
        const isSel = (d.data.type === "genre" && d.data.code === selectedGenre) ||
                      (d.data.type === "subgenre" && d.data.name === selectedSubgenre);
        return isSel ? "url(#neon-glow)" : "none";
      })
      .style("opacity", 0)
      .transition()
      .duration(600)
      .style("opacity", 1);

    // Dynamic inner dot pulsing for active selections
    node
      .filter((d) => (d.data.type === "genre" && d.data.code === selectedGenre) ||
                     (d.data.type === "subgenre" && d.data.name === selectedSubgenre))
      .append("circle")
      .attr("r", 2.5)
      .attr("fill", "#040508")
      .style("opacity", 0)
      .transition()
      .duration(600)
      .style("opacity", 1);

    // Node text labels
    node
      .append("text")
      .attr("dy", ".31em")
      .attr("x", (d) => (d.children ? -14 : 14))
      .attr("text-anchor", (d) => (d.children ? "end" : "start"))
      .text((d) => d.data.name)
      .attr("fill", (d) => {
        if (d.data.type === "root") return "#FFF";
        const isSelected = (d.data.type === "genre" && d.data.code === selectedGenre) ||
                           (d.data.type === "subgenre" && d.data.name === selectedSubgenre);
        return isSelected ? "#00F5FF" : "rgba(255, 255, 255, 0.65)";
      })
      .style("font-size", (d) => (d.data.type === "root" ? "10.5px" : "10px"))
      .style("font-family", "monospace")
      .style("font-weight", (d) => {
        const isSelected = (d.data.type === "genre" && d.data.code === selectedGenre) ||
                           (d.data.type === "subgenre" && d.data.name === selectedSubgenre);
        return isSelected ? "bold" : "normal";
      })
      .style("text-shadow", (d) => {
        const isSelected = (d.data.type === "genre" && d.data.code === selectedGenre) ||
                           (d.data.type === "subgenre" && d.data.name === selectedSubgenre);
        return isSelected ? "0 0 8px rgba(0,245,255,0.4)" : "none";
      })
      .style("opacity", 0)
      .transition()
      .duration(600)
      .style("opacity", 1);

  }, [dimensions, selectedCountry, selectedGenre, selectedSubgenre]);

  // Find info describing active selection
  const getSelectedInfoDescription = () => {
    if (selectedSubgenre.includes("Dark")) {
      return {
        title: "K-Pop Dark Concept Spec",
        desc: "Orchestral strings colliding with modular trap rhythms. Highly cinematic, intense power concept with unyielding Gayageum runs.",
        speed: "128 - 145 BPM Core Bounds",
        level: "Level 2.2 Active Protocol"
      };
    }
    return {
      title: "Active Selection Node",
      desc: "Synchronized taxonomic data parsed successfully. Verified CVA acoustic and harmonic tolerances.",
      speed: "115 - 135 BPM Target Span",
      level: "Structural Integration Nominals"
    };
  };

  const selectedSpec = getSelectedInfoDescription();

  return (
    <div className="bg-black/40 border border-white/5 rounded-2xl p-5 flex flex-col justify-between h-full min-h-[460px] relative overflow-hidden" ref={containerRef}>
      <div className="absolute top-0 right-0 p-3 opacity-[0.02] text-[#00F5FF] pointer-events-none">
        <Layers className="w-48 h-48" />
      </div>

      <div className="flex items-center justify-between border-b border-white/5 pb-3">
        <span className="font-mono text-[10px] text-gray-400 tracking-widest uppercase font-semibold flex items-center gap-1.5">
          <Music className="w-3.5 h-3.5 text-[#00F5FF]" />
          D3.js Genre Tree Mapping
        </span>
        <span className="text-[9px] text-[#00F5FF] font-mono border border-[#00F5FF]/10 bg-[#00F5FF]/5 rounded-md px-2 py-0.5">
          Level 2.2 Tree
        </span>
      </div>

      {/* D3 Graph Area */}
      <div className="flex-1 my-3 flex items-center justify-center min-h-[280px]">
        <svg
          ref={svgRef}
          width={dimensions.width}
          height={dimensions.height}
          className="mx-auto block"
        />
      </div>

      {/* Selected Metadata Display Footer */}
      <div className="bg-[#0A0B10] p-4.5 rounded-xl border border-[#00F5FF]/10 mt-2 space-y-3">
        <div className="flex items-center justify-between">
          <h4 className="text-xs font-mono font-bold text-[#00F5FF] flex items-center gap-2">
            <Zap className="w-3.5 h-3.5 animate-pulse" />
            {selectedSpec.title}
          </h4>
          <span className="text-[9px] font-mono text-gray-500">{selectedSpec.speed}</span>
        </div>
        <p className="text-[11px] font-sans text-gray-300 leading-relaxed leading-normal">
          Currently Mapping: <strong className="text-white font-mono">{selectedGenre}</strong> / <strong className="text-[#00F5FF] font-mono">{selectedSubgenre}</strong>. {selectedSpec.desc}
        </p>
      </div>
    </div>
  );
}
