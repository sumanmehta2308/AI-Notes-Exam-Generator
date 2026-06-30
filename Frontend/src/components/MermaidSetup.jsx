import React, { useEffect, useRef } from "react";
import mermaid from "mermaid";

mermaid.initialize({
  startOnLoad: false,
  theme: "default",
});

const cleanMermaidChart = (diagram) => {
  if (!diagram) return "";

  // Clean up escape characters and normalize newlines
  let clean = diagram.replace(/\\r?\\n/g, "\n").replace(/\\"/g, '"');

  // Ensure the string starts with a valid Mermaid declaration
  if (
    !clean.trim().startsWith("graph") &&
    !clean.trim().startsWith("pie") &&
    !clean.trim().startsWith("sequenceDiagram")
  ) {
    clean = `graph TD\n${clean}`;
  }

  return clean;
};

function MermaidSetup({ diagram }) {
  const containerRef = useRef(null);

  useEffect(() => {
    if (!diagram || !containerRef.current) return;

    const renderDiagram = async () => {
      try {
        containerRef.current.innerHTML = "";

        // Generate a valid, unique ID for Mermaid to render into
        const uniqueId = `mermaid-${Math.random()
          .toString(36)
          .substring(2, 9)}`;
        const safeChart = cleanMermaidChart(diagram);

        // Render the SVG and inject it into the DOM
        const { svg } = await mermaid.render(uniqueId, safeChart);

        if (containerRef.current) {
          containerRef.current.innerHTML = svg;
        }
      } catch (error) {
        console.error("Mermaid rendering error:", error);
        if (containerRef.current) {
          containerRef.current.innerHTML = `<p class="text-red-500 text-sm">Failed to render diagram.</p>`;
        }
      }
    };

    renderDiagram();
  }, [diagram]);

  return (
    <div
      className="bg-white border border-gray-200 rounded-lg p-4 overflow-x-auto flex justify-center w-full my-6 shadow-sm"
      ref={containerRef}
    />
  );
}

export default MermaidSetup;
