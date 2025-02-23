"use client";

import { useRef, useEffect, useState } from "react";
import * as d3 from "d3";
import NoteViewer from "./NoteViewer";

interface Node {
  id: string;
  title: string;
  x?: number;
  y?: number;
  fx?: number | null;
  fy?: number | null;
}

interface Link {
  source: string;
  target: string;
}

interface GraphVisualizationProps {
  nodes: Node[];
  links: Link[];
  availableNotes: { id: number; title: string }[];
}

export default function GraphVisualization({
  nodes,
  links,
  availableNotes,
}: GraphVisualizationProps) {
  const svgRef = useRef<SVGSVGElement>(null);
  const [selectedNode, setSelectedNode] = useState<Node | null>(null);

  useEffect(() => {
    if (!svgRef.current) return;

    const width = 800;
    const height = 600;
    const nodeRadius = 15;
    const minX = nodeRadius;
    const maxX = width - nodeRadius;
    const minY = nodeRadius;
    const maxY = height - nodeRadius;

    const svg = d3
      .select(svgRef.current)
      .attr("width", width)
      .attr("height", height);
    svg.selectAll("*").remove();

    const simulation = d3
      .forceSimulation<Node>(nodes)
      .force(
        "link",
        d3
          .forceLink<Link, Node>(links)
          .id((d) => d.id)
          .distance(150)
      )
      .force("charge", d3.forceManyBody().strength(-300))
      .force("center", d3.forceCenter(width / 2, height / 2))
      .force("collide", d3.forceCollide(nodeRadius + 5));

    const linkElements = svg
      .append("g")
      .attr("class", "links")
      .selectAll("line")
      .data(links)
      .enter()
      .append("line")
      .attr("stroke", "#999")
      .attr("stroke-width", 2);

    const nodeElements = svg
      .append("g")
      .attr("class", "nodes")
      .selectAll("circle")
      .data(nodes)
      .enter()
      .append("circle")
      .attr("r", nodeRadius)
      .attr("fill", "#69b3a2")
      .call(
        d3
          .drag<SVGCircleElement, Node>()
          .on("start", (event, d) => {
            if (!event.active) simulation.alphaTarget(0.3).restart();
            d.fx = d.x;
            d.fy = d.y;
          })
          .on("drag", (event, d) => {
            d.fx = event.x;
            d.fy = event.y;
          })
          .on("end", (event, d) => {
            if (!event.active) simulation.alphaTarget(0);
            d.fx = null;
            d.fy = null;
          })
      )
      .on("click", (event, d) => {
        setSelectedNode(d);
      });

    const labelElements = svg
      .append("g")
      .attr("class", "labels")
      .selectAll("text")
      .data(nodes)
      .enter()
      .append("text")
      .attr("text-anchor", "middle")
      .attr("dy", 4)
      .text((d) => d.title)
      .attr("font-size", "12px")
      .attr("fill", "#333");

    simulation.on("tick", () => {
      nodeElements
        .attr("cx", (d) => {
          d.x = Math.max(minX, Math.min(maxX, d.x!));
          return d.x;
        })
        .attr("cy", (d) => {
          d.y = Math.max(minY, Math.min(maxY, d.y!));
          return d.y;
        });

      linkElements
        .attr("x1", (d) => (d.source as Node).x!)
        .attr("y1", (d) => (d.source as Node).y!)
        .attr("x2", (d) => (d.target as Node).x!)
        .attr("y2", (d) => (d.target as Node).y!);

      labelElements.attr("x", (d) => d.x!).attr("y", (d) => d.y!);
    });
  }, [nodes, links]);

  return (
    <div className="relative">
      <svg ref={svgRef} className="border rounded-md" />
      {selectedNode && (
        <div className="absolute top-4 right-4 bg-white shadow-lg rounded p-4 w-64">
          <button
            onClick={() => setSelectedNode(null)}
            className="text-sm text-blue-500 hover:underline mb-2"
          >
            Close
          </button>
          <NoteViewer
            noteId={selectedNode.id}
            noteTitle={selectedNode.title}
            availableNotes={availableNotes}
          />
        </div>
      )}
    </div>
  );
}
