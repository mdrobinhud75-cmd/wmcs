import React, { useState } from "react";
import { SongProject } from "../types";
import { Search, Filter, Download, ExternalLink, Calendar, Plus, CheckCircle2, AlertCircle, RefreshCcw } from "lucide-react";

interface CatalogProps {
  catalog: any[];
  onSelectProject: (id: string) => void;
}

export default function Catalog({ catalog, onSelectProject }: CatalogProps) {
  const [searchTerm, setSearchTerm] = useState("");
  const [filterCountry, setFilterCountry] = useState("ALL");
  const [filterGenre, setFilterGenre] = useState("ALL");
  const [filterScore, setFilterScore] = useState("ALL");

  // Filter Logic
  const filteredCatalog = catalog.filter((song) => {
    const matchesSearch = song.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          (song.serialNumber && song.serialNumber.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchesCountry = filterCountry === "ALL" || song.countryCode === filterCountry;
    const matchesGenre = filterGenre === "ALL" || song.genreCode === filterGenre;
    
    let matchesScore = true;
    if (filterScore === "HIGH") {
      matchesScore = (song.qaTotalScore || 90) >= 90;
    } else if (filterScore === "MID") {
      matchesScore = (song.qaTotalScore || 90) < 90 && (song.qaTotalScore || 90) >= 80;
    }

    return matchesSearch && matchesCountry && matchesGenre && matchesScore;
  });

  const triggerExport = (serialNumber: string) => {
    alert(`Export trigger initialized for: ${serialNumber}.\nDownloading composite song brief structure & lyrics into dynamic zip package.`);
  };

  return (
    <div className="space-y-6">
      {/* Header and Filter panel */}
      <div className="glass-panel p-5 rounded-2xl space-y-4">
        <div className="flex flex-col md:flex-row justify-between md:items-center gap-4">
          <div>
            <h2 className="font-display font-bold text-2xl text-white tracking-tight">Catalog Explorer</h2>
            <p className="text-xs text-gray-400 mt-1 uppercase font-mono">
              Immutable institutional song history assets cached from server google drive
            </p>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-xs font-mono text-gray-400 font-semibold uppercase">Drive Connection Status:</span>
            <span className="bg-emerald-500/10 text-emerald-400 text-[10px] font-mono px-2 py-0.5 rounded border border-emerald-500/20">
              SYNCHRONIZED (LATEST)
            </span>
          </div>
        </div>

        {/* Filters Matrix Grid */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-3">
          {/* Search bar */}
          <div className="relative">
            <Search className="absolute left-3 top-2.5 w-4.5 h-4.5 text-gray-500" />
            <input
              type="text"
              placeholder="Search by Title or Serial..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full bg-white/[0.03] border border-white/5 pl-10 pr-4 py-2 rounded-xl text-sm text-white focus:outline-none focus:border-cyan-400/40 font-sans"
            />
          </div>

          {/* Country Selection Filter */}
          <div className="flex items-center gap-2 bg-white/[0.01] border border-white/5 px-3 py-1 rounded-xl text-sm">
            <span className="text-gray-500 text-xs font-sans">Country:</span>
            <select
              value={filterCountry}
              onChange={(e) => setFilterCountry(e.target.value)}
              className="bg-transparent text-white font-sans text-xs focus:outline-none w-full cursor-pointer"
            >
              <option value="ALL">All Nodes</option>
              <option value="US">US (United States)</option>
              <option value="KR">KR (South Korea)</option>
              <option value="BR">BR (Brazil)</option>
              <option value="ZA">ZA (South Africa)</option>
              <option value="NG">NG (Nigeria)</option>
            </select>
          </div>

          {/* Genre Selection Filter */}
          <div className="flex items-center gap-2 bg-white/[0.01] border border-white/5 px-3 py-1 rounded-xl text-sm">
            <span className="text-gray-500 text-xs font-sans">Genre:</span>
            <select
              value={filterGenre}
              onChange={(e) => setFilterGenre(e.target.value)}
              className="bg-transparent text-white font-sans text-xs focus:outline-none w-full cursor-pointer"
            >
              <option value="ALL">All Genres</option>
              <option value="K-Pop">K-Pop Maximalism</option>
              <option value="Hip-Hop">Hip-Hop / West Coast</option>
              <option value="Favela Funk">Favela Funk</option>
              <option value="Amapiano">Amapiano Deep</option>
            </select>
          </div>

          {/* Audit Score Filter */}
          <div className="flex items-center gap-2 bg-white/[0.01] border border-white/5 px-3 py-1 rounded-xl text-sm">
            <span className="text-gray-500 text-xs font-sans">Audit Grade:</span>
            <select
              value={filterScore}
              onChange={(e) => setFilterScore(e.target.value)}
              className="bg-transparent text-white font-sans text-xs focus:outline-none w-full cursor-pointer"
            >
              <option value="ALL">Any Grade</option>
              <option value="HIGH">Gold Grade (Score &ge; 90)</option>
              <option value="MID">Authentic Grade (Score 80-89)</option>
            </select>
          </div>
        </div>
      </div>

      {/* Catalog Listing Table */}
      <div className="glass-panel rounded-2xl overflow-hidden border border-white/5">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-sm">
            <thead>
              <tr className="border-b border-white/10 bg-white/[0.02] font-mono text-gray-400 text-xs uppercase tracking-widest">
                <th className="p-4">Serial Number</th>
                <th className="p-4">Composition Title</th>
                <th className="p-4">Global Node</th>
                <th className="p-4">Vibe Direction</th>
                <th className="p-4">QA Total Score</th>
                <th className="p-4 text-right">Operation Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {filteredCatalog.map((song, idx) => {
                const badgeColor = song.qaTotalScore >= 90 ? "text-yellow-400 bg-yellow-500/10 border-yellow-400/20" : "text-cyan-400 bg-cyan-500/10 border-cyan-400/20";
                
                return (
                  <tr key={idx} className="hover:bg-white/[0.02] transition-all duration-150">
                    {/* Serial */}
                    <td className="p-4 font-mono text-xs text-white">
                      <span>{song.serialNumber || `WMCS-2026-UN-${Math.floor(Math.random()*10000)}`}</span>
                    </td>
                    
                    {/* Title */}
                    <td className="p-4 font-medium text-white max-w-xs truncate font-sans">
                      {song.title}
                    </td>

                    {/* Node / Country Code */}
                    <td className="p-4 font-mono text-xs text-gray-300">
                      <span className="bg-white/5 px-2 py-0.5 rounded border border-white/5 text-[10px] uppercase">
                        {song.countryCode} — {song.genreCode}
                      </span>
                    </td>

                    {/* Vibe / Emotion */}
                    <td className="p-4 font-sans text-xs text-gray-400">
                      {song.emotion}
                    </td>

                    {/* QA score */}
                    <td className="p-4 font-mono">
                      <span className={`px-2 py-0.5 rounded-full border text-[11px] font-bold ${badgeColor}`}>
                        {song.qaTotalScore || 90}%
                      </span>
                    </td>

                    {/* Operation */}
                    <td className="p-4 text-right space-x-2">
                      <button 
                        onClick={() => triggerExport(song.serialNumber)}
                        className="p-1 px-2 text-[11px] font-mono rounded bg-cyan-500/15 text-cyan-300 hover:bg-cyan-500/30 transition cursor-pointer"
                        title="Download ZIP"
                      >
                        EXPORT ZIP
                      </button>
                    </td>
                  </tr>
                );
              })}

              {filteredCatalog.length === 0 && (
                <tr>
                  <td colSpan={6} className="p-8 text-center text-gray-500 font-sans">
                    No matching sovereign creations found in local partition database memory.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
export {};
