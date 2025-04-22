document.addEventListener('DOMContentLoaded', function() {
    // Graph dimensions
    const width = document.getElementById('interest-graph').clientWidth;
    const height = document.getElementById('interest-graph').clientHeight;

    // Create SVG
    const svg = d3.select('#interest-graph')
        .append('svg')
        .attr('width', width)
        .attr('height', height);

    // Create a group for zoom
    const g = svg.append('g');

    // Create zoom behavior
    const zoom = d3.zoom()
        .scaleExtent([0.1, 4])
        .on('zoom', (event) => {
            g.attr('transform', event.transform);
        });

    // Apply zoom to SVG
    svg.call(zoom);

    // Initialize the simulation
    const simulation = d3.forceSimulation()
        .force('link', d3.forceLink().id(d => d.id).distance(100))
        .force('charge', d3.forceManyBody().strength(-300))
        .force('center', d3.forceCenter(width / 2, height / 2))
        .force('collide', d3.forceCollide().radius(d => d.radius * 1.2));

    // Load the graph data
    fetch('/assets/js/graph-data.json')
        .then(response => response.json())
        .then(data => {
            createGraph(data);
        })
        .catch(error => {
            console.error('Error loading graph data:', error);
            // If unable to load external data, generate from Jekyll collections
            generateGraphFromJekyll();
        });

    function generateGraphFromJekyll() {
        // Get all interest nodes from the document
        const interestElements = document.querySelectorAll('[data-interest-slug]');
        const nodes = [];
        const links = [];
        const nodeMap = {};

        // Create nodes
        interestElements.forEach(el => {
            const node = {
                id: el.dataset.interestSlug,
                name: el.dataset.interestTitle,
                status: el.dataset.interestStatus || 'active',
                date: el.dataset.interestDate || '',
                emoji: el.dataset.interestEmoji || '📌',
                radius: 30
            };
            nodes.push(node);
            nodeMap[node.id] = node;
        });

        // Create links
        interestElements.forEach(el => {
            const sourceId = el.dataset.interestSlug;
            const connections = el.dataset.interestConnections;

            if (connections) {
                connections.split(',').forEach(targetId => {
                    targetId = targetId.trim();
                    if (nodeMap[targetId]) {
                        links.push({
                            source: sourceId,
                            target: targetId
                        });
                    }
                });
            }
        });

        createGraph({ nodes, links });
    }

    function createGraph(graph) {
        // Ensure all nodes have appropriate values
        graph.nodes.forEach(node => {
            node.radius = node.radius || 30;
            node.status = node.status || 'active';
        });

        // Create the links
        const link = g.append('g')
            .attr('class', 'links')
            .selectAll('line')
            .data(graph.links)
            .enter()
            .append('line')
            .attr('class', 'link')
            .attr('stroke-width', 2);

        // Create the nodes
        const node = g.append('g')
            .attr('class', 'nodes')
            .selectAll('.node')
            .data(graph.nodes)
            .enter()
            .append('g')
            .attr('class', 'node')
            .call(d3.drag()
                .on('start', dragstarted)
                .on('drag', dragged)
                .on('end', dragended));

        // Add circles to the nodes
        node.append('circle')
            .attr('r', d => d.radius)
            .attr('fill', d => {
                if (d.status === 'recent') return '#ff85a2';
                if (d.status === 'active') return '#4fc4b6';
                return '#c3c3c3'; // inactive
            });

        // Add emojis to the nodes
        node.append('text')
            .attr('dy', '.3em')
            .text(d => d.emoji || '📌')
            .attr('font-size', d => d.radius * 0.8)
            .attr('text-anchor', 'middle');

        // Add labels to the nodes
        node.append('text')
            .attr('dy', d => d.radius + 20)
            .text(d => d.name)
            .attr('font-size', '12px')
            .attr('text-anchor', 'middle');

        // Add title tooltips
        node.append('title')
            .text(d => `${d.name}${d.date ? ' (' + d.date + ')' : ''}`);

        // Handle node click to navigate
        node.on('click', function(event, d) {
            if (d.url) {
                window.location.href = d.url;
            } else {
                // Try to construct URL from slug
                window.location.href = `/interests/${d.id}/`;
            }
        });

        // Update simulation with the graph data
        simulation
            .nodes(graph.nodes)
            .on('tick', ticked);

        simulation.force('link')
            .links(graph.links);

        // Tick function to update positions
        function ticked() {
            link
                .attr('x1', d => d.source.x)
                .attr('y1', d => d.source.y)
                .attr('x2', d => d.target.x)
                .attr('y2', d => d.target.y);

            node
                .attr('transform', d => `translate(${d.x},${d.y})`);
        }

        // Zoom controls
        document.getElementById('zoom-in').addEventListener('click', () => {
            svg.transition().call(zoom.scaleBy, 1.3);
        });

        document.getElementById('zoom-out').addEventListener('click', () => {
            svg.transition().call(zoom.scaleBy, 0.7);
        });

        document.getElementById('reset').addEventListener('click', () => {
            svg.transition().call(zoom.transform, d3.zoomIdentity);
        });
    }

    // Drag functions
    function dragstarted(event, d) {
        if (!event.active) simulation.alphaTarget(0.3).restart();
        d.fx = d.x;
        d.fy = d.y;
    }

    function dragged(event, d) {
        d.fx = event.x;
        d.fy = event.y;
    }

    function dragended(event, d) {
        if (!event.active) simulation.alphaTarget(0);
        d.fx = null;
        d.fy = null;
    }
});
