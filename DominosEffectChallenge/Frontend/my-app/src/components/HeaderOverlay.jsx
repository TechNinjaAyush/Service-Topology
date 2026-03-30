import React from 'react';
import { GitBranch, Activity, Server, LayoutTemplate } from 'lucide-react';

const HeaderOverlay = () => {
    return (
        <div className="absolute top-8 left-8 z-30 pointer-events-none">
            <div className="flex flex-col gap-6">
                {/* Main Branding */}
                <div className="bg-[#02040a]/90 backdrop-blur-2xl p-5 rounded-2xl border border-white/10 shadow-[0_20px_50px_rgba(0,0,0,0.3)] flex items-center gap-5 pointer-events-auto">
                    <div className="p-3 bg-blue-500/10 rounded-xl border border-blue-500/20 shadow-inner group transition-all hover:bg-blue-500/20">
                        <GitBranch className="w-6 h-6 text-blue-400 group-hover:scale-110 transition-transform" />
                    </div>
                    <div className="flex flex-col">
                        <h1 className="font-black text-xl text-white tracking-widest uppercase">System Dependency Mesh</h1>
                        <div className="flex items-center gap-3 mt-1.5 text-[10px] text-emerald-400 font-mono font-black uppercase tracking-widest">
                            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse shadow-[0_0_8px_rgba(16,185,129,0.8)]"></span>
                            Live Microservice Observability
                        </div>
                    </div>
                </div>

                {/* Legend */}
                <div className="bg-[#02040a]/80 backdrop-blur-2xl p-4 rounded-xl border border-white/5 shadow-2xl flex flex-wrap items-center gap-6 pointer-events-auto">
                    <div className="flex items-center gap-2">
                        <div className="w-3 h-3 rounded-sm bg-[#3b82f6]"></div>
                        <span className="text-[10px] font-mono text-slate-400 font-black uppercase tracking-widest">Healthy</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <div className="w-3 h-3 rounded-sm bg-[#f97316]"></div>
                        <span className="text-[10px] font-mono text-slate-400 font-black uppercase tracking-widest">Degraded</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <div className="w-3 h-3 rounded-sm bg-[#ef4444]"></div>
                        <span className="text-[10px] font-mono text-slate-400 font-black uppercase tracking-widest">Critical</span>
                    </div>
                    <div className="h-4 w-px bg-white/10 mx-1"></div>
                    <div className="flex items-center gap-2">
                        <LayoutTemplate className="w-3.5 h-3.5 text-slate-500" />
                        <span className="text-[10px] font-mono text-slate-400 font-black uppercase tracking-widest">DAG Layout</span>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default HeaderOverlay;
