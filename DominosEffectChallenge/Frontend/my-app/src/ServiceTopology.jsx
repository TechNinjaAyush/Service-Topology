import React from 'react';
import { useTopology } from './hooks/useTopology';
import TopologyView from './components/TopologyView';
import IncidentPipeline from './components/IncidentPipeline';
import HeaderOverlay from './components/HeaderOverlay';

const ServiceTopology = () => {
  const { graphData, events, healthMap } = useTopology('http://localhost:8080/service');

  return (
    <div className="flex flex-col lg:flex-row h-screen w-full bg-[#02040a] text-white overflow-hidden relative selection:bg-blue-500/30">

      {/* BACKGROUND GRID (DYNAMIC) */}
      <div className="absolute inset-0 z-0 pointer-events-none opacity-20"
        style={{
          backgroundImage: `
            linear-gradient(to right, rgba(59, 130, 246, 0.05) 1px, transparent 1px), 
            linear-gradient(to bottom, rgba(59, 130, 246, 0.05) 1px, transparent 1px)
          `,
          backgroundSize: '40px 40px'
        }}
      />

      {/* AMBIENT BACKGROUND GLOW */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-blue-500/5 rounded-full blur-[160px] pointer-events-none" />

      {/* TOP OVERLAYS: BRANDING & LEGEND */}
      <HeaderOverlay />

      {/* LEFT CONTENT: LIVE TOPOLOGY MESH */}
      <div className="relative z-10 flex-1 w-full border-r border-white/5 group">
        <TopologyView graphData={graphData} healthMap={healthMap} />

        {/* HUD ELEMENTS */}
        <div className="absolute bottom-6 left-6 z-20 flex items-center gap-6 text-[9px] font-mono text-slate-500 bg-black/40 backdrop-blur-md px-4 py-2 rounded-full border border-white/5">
          <div className="flex items-center gap-2">
            <span className="w-1 h-1 rounded-full bg-blue-500"></span>
            LATENCY_AVG: 24ms
          </div>
          <div className="flex items-center gap-2">
            <span className="w-1 h-1 rounded-full bg-emerald-500"></span>
            THROUGHPUT: 1.2k req/s
          </div>
        </div>
      </div>

      {/* RIGHT CONTENT: INCIDENT PIPELINE */}
      <IncidentPipeline events={events} />

    </div>
  );
};

export default ServiceTopology;