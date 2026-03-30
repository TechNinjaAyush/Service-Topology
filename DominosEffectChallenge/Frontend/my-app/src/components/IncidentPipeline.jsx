import React from 'react';
import { Activity, GitBranch, Zap, Server, Radio, Layers, Clock, Shield, AlertTriangle } from 'lucide-react';

const IncidentPipeline = ({ events }) => {
    return (
        <div className="h-[50vh] lg:h-auto w-full lg:w-[450px] relative z-20 flex flex-col bg-[#02040a]/80 backdrop-blur-3xl border-l border-white/10">
            {/* Header */}
            <div className="p-5 border-b border-white/5 flex justify-between items-center bg-slate-900/40">
                <div className="flex items-center gap-3">
                    <Activity className="w-5 h-5 text-indigo-400" />
                    <span className="font-bold text-sm uppercase tracking-[0.2em] text-slate-100">Live Incident Stream</span>
                </div>
                <div className="flex items-center gap-2">
                    <span className="text-[10px] font-mono text-slate-500 uppercase">Live Feed</span>
                    <Radio className="w-4 h-4 text-red-500 animate-pulse" />
                </div>
            </div>

            {/* Events List */}
            <div className="flex-1 overflow-y-auto p-5 space-y-5 custom-scrollbar">
                {events.length === 0 ? (
                    <div className="h-full flex flex-col items-center justify-center text-slate-700 gap-4">
                        <Server className="w-16 h-16 opacity-5" />
                        <p className="text-xs font-mono uppercase tracking-[0.3em] opacity-30">System Nominal - Scanning...</p>
                    </div>
                ) : (
                    events.map((evt, idx) => (
                        <div key={idx} className="bg-slate-900/40 border border-white/5 p-5 rounded-2xl hover:bg-slate-900/60 transition-all border-l-4 border-l-red-500 group shadow-[0_8px_30px_rgb(0,0,0,0.12)]">
                            <div className="flex justify-between items-start mb-4">
                                <div className="flex items-center gap-3">
                                    <div className="p-2 bg-red-900/20 rounded-lg border border-red-900/40 group-hover:scale-110 transition-transform">
                                        <Zap className="w-5 h-5 text-red-500" />
                                    </div>
                                    <div>
                                        <h3 className="text-sm font-black text-white uppercase tracking-tight">{evt.Root || evt.root}</h3>
                                        <div className="flex items-center gap-2 mt-1">
                                            <Clock className="w-3 h-3 text-slate-500" />
                                            <p className="text-[10px] text-slate-500 font-mono">
                                                {evt.Time ? new Date(evt.Time).toLocaleTimeString() : new Date().toLocaleTimeString()}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                                <div className="p-2 bg-indigo-500/10 rounded-full">
                                    <Shield className="w-4 h-4 text-indigo-400/60" />
                                </div>
                            </div>

                            {/* RCA CARD */}
                            <div className="mb-4 bg-gradient-to-br from-indigo-500/10 to-transparent border border-indigo-500/20 rounded-xl p-4 relative overflow-hidden">
                                <div className="flex items-center gap-2 mb-2">
                                    <Layers className="w-3.5 h-3.5 text-indigo-400" />
                                    <span className="text-[10px] text-indigo-300 uppercase font-black tracking-widest">Root Cause Analysis</span>
                                </div>
                                <p className="text-[12px] text-slate-300 leading-relaxed font-medium italic">
                                    "{evt.rca || "Propagating incident detected. Identifying origin pattern..."}"
                                </p>
                            </div>

                            {/* METRICS GRID */}
                            <div className="grid grid-cols-2 gap-3">
                                <div className="bg-black/60 rounded-xl p-3 border border-white/5 flex flex-col items-center">
                                    <p className="text-[9px] text-slate-500 uppercase font-bold mb-1 tracking-widest">Blast Radius</p>
                                    <p className="text-lg font-mono text-orange-400 font-black">
                                        {(evt.FailedNodes || evt.failednodes || []).length}
                                    </p>
                                    <p className="text-[8px] text-slate-600 uppercase">Impacted Nodes</p>
                                </div>
                                <div className="bg-black/60 rounded-xl p-3 border border-white/5 flex flex-col items-center">
                                    <p className="text-[9px] text-slate-500 uppercase font-bold mb-1 tracking-widest">Severity</p>
                                    <p className="text-lg font-mono text-red-400 font-black uppercase">High</p>
                                    <p className="text-[8px] text-slate-600 uppercase">Cascading</p>
                                </div>
                            </div>

                            {/* TAGS */}
                            {(evt.FailedNodes || evt.failednodes) && (
                                <div className="mt-4 flex flex-wrap gap-1.5 border-t border-white/5 pt-4">
                                    {(evt.FailedNodes || evt.failednodes).map((node, i) => (
                                        <span key={i} className="text-[9px] px-2 py-0.5 rounded-full bg-slate-800 text-slate-300 border border-white/10 font-medium">
                                            {node}
                                        </span>
                                    ))}
                                </div>
                            )}
                        </div>
                    ))
                )}
            </div>

            {/* Footer */}
            <div className="p-5 bg-slate-900/50 border-t border-white/5 flex justify-between items-center text-[10px] font-mono text-slate-500">
                <span className="flex items-center gap-2">
                    <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></div>
                    NODE: US-EAST-01
                </span>
                <span className="text-emerald-500 font-bold uppercase tracking-widest">System Secure</span>
            </div>
        </div>
    );
};

export default IncidentPipeline;
