export const buildPrompt = ({
  topic,
  description,
  classLevel,
  examType,
  revisionNotes,
  includeDiagram,
  includeCharts,
}) => {
  return `
[SYSTEM ROLE]
You are an expert academic professor and examination specialist. Generate accurate, structured, and highly professional exam-oriented study notes.

[TARGET INFORMATION]
Topic: "${topic}"
Description/Context: "${description || "No specific context provided."}"
Level: ${classLevel || "Advanced University Level"}
Exam Type: ${examType || "Standard Examination"}

Objective:
${
  revisionNotes
    ? "Create concise revision-focused notes with high-value exam points."
    : "Create detailed conceptual notes with proper explanation."
}

[STRICT OUTPUT RULE]
Return ONLY a valid JSON object. Do not add explanations or text outside the JSON.

{
  "importance": "⭐⭐⭐⭐⭐",
  "shortQuestions": ["Question 1", "Question 2", "Question 3"],
  "longQuestions": ["Descriptive Q1", "Descriptive Q2"],
  "diagramQuestion": "Describe the required diagram.",
  "mermaidChart": "Generate valid Mermaid syntax only.",
  "chartData": {
    "chartType": "bar",
    "title": "Chart Title",
    "dataPoints": [{ "name": "Category", "value": 0 }]
  },
  "notes": "Complete markdown study notes."
}

[MERMAID DIAGRAM RULE]
${
  includeDiagram
    ? `Generate STRICTLY valid Mermaid flowchart syntax inside "mermaidChart".
RULES for Mermaid:
1. Always start with 'graph TD' or 'graph LR'.
2. Node text MUST be wrapped in brackets and quotes. Example: A["Indo-Gangetic Plains"] --> B["Deccan"]
3. NO floating text, NO unescaped characters, NO spaces outside of brackets.
4. Keep the diagram logic simple and structurally valid.`
    : `Return "mermaidChart": ""`
}
[CHART RULE]
${
  includeCharts
    ? `Generate Recharts compatible chart data.`
    : `Return empty dataPoints array.`
}

[NOTES FORMAT]
The notes field must contain:
# Main Topic
## Executive Definition
## Core Concepts
## Advantages
## Disadvantages
## Applications
## Exam Important Points
Use markdown headings, **bold** text, and bullet points.
Generate the JSON now.
`;
};
