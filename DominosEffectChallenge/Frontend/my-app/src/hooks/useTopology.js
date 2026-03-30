import { useState, useEffect, useCallback } from 'react';

export const useTopology = (url) => {
    const [graphData, setGraphData] = useState({ nodes: [], links: [] });
    const [events, setEvents] = useState([]);
    const [healthMap, setHealthMap] = useState({});

    const processInitialGraph = useCallback((payload) => {
        const rawNodes = payload.nodes || [];
        const rawEdges = payload.edges || [];

        const nodes = rawNodes.map(node => ({
            id: node.id,
            group: 'core'
        }));

        const links = rawEdges.map(edge => ({
            source: edge.from,
            target: edge.to
        }));

        setGraphData({ nodes, links });
    }, []);

    const handleFailureEvent = useCallback((payload) => {
        // Add to logs
        setEvents((prev) => [payload, ...prev].slice(0, 50));

        // Update visual graph health
        const newHealth = {};
        const root = payload.Root || payload.root;
        const failedNodes = payload.FailedNodes || payload.failednodes || [];

        if (root) newHealth[root] = 'critical';
        failedNodes.forEach(node => newHealth[node] = 'warning');

        setHealthMap(prev => ({ ...prev, ...newHealth }));

        // Clear visual warning markers after 8 seconds
        setTimeout(() => {
            setHealthMap(prev => {
                const next = { ...prev };
                delete next[root];
                failedNodes.forEach(n => delete next[n]);
                return next;
            });
        }, 8000);
    }, []);

    useEffect(() => {
        const eventSource = new EventSource(url);

        eventSource.onmessage = (event) => {
            try {
                const payload = JSON.parse(event.data);
                console.log("Incoming Payload:", payload);

                if (payload.type === 'initial_graph') {
                    processInitialGraph(payload);
                } else {
                    handleFailureEvent(payload);
                }
            } catch (err) {
                console.error("Error parsing JSON", err);
            }
        };
        return () => eventSource.close();
    }, [url, processInitialGraph, handleFailureEvent]);

    return { graphData, events, healthMap };
};
