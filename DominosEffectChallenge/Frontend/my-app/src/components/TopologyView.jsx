import React, { useRef, useEffect, useState, useCallback } from 'react';
import ForceGraph2D from 'react-force-graph-2d';

const NODE_WIDTH = 180;
const NODE_HEIGHT = 70;
const RADIUS = 12;

const COLORS = {
    bg: '#02040a',
    grid: 'rgba(59, 130, 246, 0.05)',
    healthy: {
        fill: 'rgba(15, 23, 42, 0.9)',
        border: '#3b82f6',
        text: '#bfdbfe',
        secondary: '#1e293b',
        accent: '#3b82f6',
        status: 'OPERATIONAL'
    },
    warning: {
        fill: 'rgba(42, 18, 5, 0.9)',
        border: '#f97316',
        text: '#fed7aa',
        secondary: '#431407',
        accent: '#f97316',
        shadow: '#f97316',
        status: 'DEGRADED'
    },
    critical: {
        fill: 'rgba(47, 8, 8, 0.9)',
        border: '#ef4444',
        text: '#fecaca',
        secondary: '#450a0a',
        accent: '#ef4444',
        shadow: '#ef4444',
        status: 'CRITICAL FAILURE'
    }
};

const TopologyView = ({ graphData, healthMap }) => {
    const containerRef = useRef(null);
    const fgRef = useRef();
    const [dimensions, setDimensions] = useState({ width: 800, height: 600 });
    const [isDagMode, setIsDagMode] = useState(true);

    useEffect(() => {
        const resizeObserver = new ResizeObserver((entries) => {
            for (const entry of entries) {
                const { width, height } = entry.contentRect;
                setDimensions({ width, height });
            }
        });
        if (containerRef.current) resizeObserver.observe(containerRef.current);
        return () => resizeObserver.disconnect();
    }, []);

    const handleNodeDragEnd = node => {
        if (node) {
            // Pin the node to its new position
            node.fx = node.x;
            node.fy = node.y;
        }
    };

    const handleNodeClick = node => {
        // Unpin node on click
        if (node) {
            node.fx = undefined;
            node.fy = undefined;
        }
    };

    const paintNode = useCallback((node, ctx, globalScale) => {
        const status = healthMap[node.id] || 'healthy';
        const theme = COLORS[status];
        const x = node.x - NODE_WIDTH / 2;
        const y = node.y - NODE_HEIGHT / 2;

        // Node Shadow (only for warning/critical)
        if (status !== 'healthy') {
            ctx.shadowBlur = 30;
            ctx.shadowColor = theme.shadow;
        }

        // Node Background (Glassmorphism effect)
        ctx.beginPath();
        ctx.fillStyle = theme.fill;
        ctx.strokeStyle = theme.border;
        ctx.lineWidth = status === 'healthy' ? 1 : 2;
        ctx.roundRect(x, y, NODE_WIDTH, NODE_HEIGHT, RADIUS);
        ctx.fill();
        ctx.stroke();

        // Reset shadow
        ctx.shadowBlur = 0;

        // Left Accent Bar
        ctx.beginPath();
        ctx.fillStyle = theme.accent;
        ctx.roundRect(x, y, 6, NODE_HEIGHT, {
            topLeft: RADIUS,
            bottomLeft: RADIUS,
            topRight: 0,
            bottomRight: 0
        });
        ctx.fill();

        // Node Content
        if (globalScale > 0.3) {
            // Service ID
            ctx.font = `bold ${14}px "Plus Jakarta Sans", "Inter", sans-serif`;
            ctx.textAlign = 'left';
            ctx.textBaseline = 'middle';
            ctx.fillStyle = '#ffffff';
            ctx.fillText(node.id.toUpperCase(), x + 20, y + 22);

            // Status Label
            ctx.font = `600 ${9}px "JetBrains Mono", monospace`;
            ctx.fillStyle = theme.text;
            ctx.globalAlpha = 0.8;
            ctx.fillText(theme.status, x + 20, y + 42);
            ctx.globalAlpha = 1.0;

            // Pulse indicator for healthy nodes (subtle)
            if (status === 'healthy') {
                const pulse = (Math.sin(Date.now() / 1000) + 1) / 2;
                ctx.beginPath();
                ctx.fillStyle = `rgba(16, 185, 129, ${0.2 + pulse * 0.3})`;
                ctx.arc(x + NODE_WIDTH - 20, y + 22, 4, 0, 2 * Math.PI);
                ctx.fill();
            }

            // Pin indicator
            if (node.fx !== undefined) {
                ctx.beginPath();
                ctx.fillStyle = '#6366f1';
                ctx.arc(x + NODE_WIDTH - 20, y + NODE_HEIGHT - 15, 3, 0, 2 * Math.PI);
                ctx.fill();
            }
        }
    }, [healthMap]);

    return (
        <div ref={containerRef} className="relative z-10 w-full h-full">
            <div className="absolute top-4 right-4 z-40">
                <button
                    onClick={() => setIsDagMode(!isDagMode)}
                    className="bg-black/60 hover:bg-black/80 backdrop-blur-md px-4 py-2 rounded-xl border border-white/10 text-[10px] font-bold uppercase tracking-widest text-slate-300 transition-all flex items-center gap-2 group"
                >
                    <div className={`w-2 h-2 rounded-full ${isDagMode ? 'bg-indigo-500' : 'bg-slate-500'}`}></div>
                    Layout: {isDagMode ? 'Structured (DAG)' : 'Free Motion'}
                </button>
            </div>

            <ForceGraph2D
                ref={fgRef}
                width={dimensions.width}
                height={dimensions.height}
                graphData={graphData}
                dagMode={isDagMode ? "lr" : null}
                dagLevelDistance={200}
                backgroundColor="rgba(0,0,0,0)"
                nodeCanvasObject={paintNode}
                linkColor={() => '#1e293b'}
                linkWidth={1.5}
                linkDirectionalParticles={2}
                linkDirectionalParticleSpeed={0.005}
                linkDirectionalParticleColor={(link) => healthMap[link.target.id] ? '#ef4444' : '#3b82f6'}
                d3AlphaDecay={0.02}
                cooldownTicks={100}
                enableNodeDrag={true}
                onNodeDragEnd={handleNodeDragEnd}
                onNodeClick={handleNodeClick}
                nodePointerAreaPaint={(node, color, ctx) => {
                    ctx.beginPath();
                    ctx.rect(node.x - NODE_WIDTH / 2, node.y - NODE_HEIGHT / 2, NODE_WIDTH, NODE_HEIGHT);
                    ctx.fillStyle = color;
                    ctx.fill();
                }}
            />
        </div>
    );
};

export default TopologyView;
