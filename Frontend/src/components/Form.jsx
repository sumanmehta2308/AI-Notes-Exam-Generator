import React, { useState } from "react";
import { motion } from "framer-motion";

function Form({ onSubmit, loading }) {
  const [topic, setTopic] = useState("");
  const [description, setDescription] = useState(""); // New Field
  const [classLevel, setClassLevel] = useState("");
  const [examType, setExamType] = useState("");

  const [revisionNotes, setRevisionNotes] = useState(false);
  const [includeDiagram, setIncludeDiagram] = useState(false);
  const [includeChart, setIncludeChart] = useState(false);
  const [formError, setFormError] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    setFormError("");

    if (!topic.trim()) {
      setFormError("Please Enter the Topic");
      return;
    }

    onSubmit({
      topic,
      description, // Added to payload
      classLevel,
      examType,
      revisionNotes,
      includeDiagram,
      includeCharts: includeChart,
    });
  };

  return (
    <div className="w-full">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full bg-white/10 border border-white/20 rounded-2xl p-6 space-y-5"
      >
        <h2 className="text-2xl text-white text-center font-medium">
          Create Learning Content
        </h2>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="text-white text-sm font-semibold mb-2 block">
              Topic / Subject
            </label>

            <input
              className="w-full px-5 py-4 rounded-xl bg-black/40 border border-white/20 text-white text-base placeholder-gray-300 outline-none focus:border-blue-400 transition"
              placeholder="Example: DBMS Normalization, Operating System Deadlock, Java Collections, React Hooks"
              value={topic}
              onChange={(e) => setTopic(e.target.value)}
              required
            />
          </div>

          <div>
            <label className="text-white text-sm font-semibold mb-2 block">
              Additional Instructions
            </label>

            <textarea
              className="w-full px-5 py-4 rounded-xl bg-black/40 border border-white/20 text-white text-base placeholder-gray-300 outline-none focus:border-blue-400 transition min-h-[130px] resize-none"
              placeholder="Example: Explain concepts with diagrams, real-world examples, algorithms, interview points, advantages and disadvantages"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div>
              <label className="text-white text-sm font-semibold mb-2 block">
                Academic Level
              </label>

              <input
                className="w-full px-5 py-4 rounded-xl bg-black/40 border border-white/20 text-white placeholder-gray-300 outline-none focus:border-blue-400 transition"
                placeholder="Example: MCA 2nd Year, B.Tech CSE, Final Year"
                value={classLevel}
                onChange={(e) => setClassLevel(e.target.value)}
              />
            </div>

            <div>
              <label className="text-white text-sm font-semibold mb-2 block">
                Preparation Goal
              </label>

              <input
                className="w-full px-5 py-4 rounded-xl bg-black/40 border border-white/20 text-white placeholder-gray-300 outline-none focus:border-blue-400 transition"
                placeholder="Example: Semester Exam, Placement, Interview Preparation"
                value={examType}
                onChange={(e) => setExamType(e.target.value)}
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <button
              type="button"
              onClick={() => setRevisionNotes(!revisionNotes)}
              className="flex items-center justify-center gap-3 py-4 rounded-xl border border-white/20 bg-white/5 text-white hover:bg-white/10 transition"
            >
              <span
                className={`w-11 h-6 rounded-full p-1 ${
                  revisionNotes ? "bg-green-400" : "bg-gray-600"
                }`}
              >
                <span
                  className={`block w-4 h-4 bg-white rounded-full transition ${
                    revisionNotes ? "translate-x-5" : ""
                  }`}
                />
              </span>

              <span className="font-medium">Revision Mode</span>
            </button>

            <button
              type="button"
              onClick={() => setIncludeDiagram(!includeDiagram)}
              className="flex items-center justify-center gap-3 py-4 rounded-xl border border-white/20 bg-white/5 text-white hover:bg-white/10 transition"
            >
              <span
                className={`w-11 h-6 rounded-full p-1 ${
                  includeDiagram ? "bg-green-400" : "bg-gray-600"
                }`}
              >
                <span
                  className={`block w-4 h-4 bg-white rounded-full transition ${
                    includeDiagram ? "translate-x-5" : ""
                  }`}
                />
              </span>

              <span className="font-medium">Generate Diagrams</span>
            </button>

            <button
              type="button"
              onClick={() => setIncludeChart(!includeChart)}
              className="flex items-center justify-center gap-3 py-4 rounded-xl border border-white/20 bg-white/5 text-white hover:bg-white/10 transition"
            >
              <span
                className={`w-11 h-6 rounded-full p-1 ${
                  includeChart ? "bg-green-400" : "bg-gray-600"
                }`}
              >
                <span
                  className={`block w-4 h-4 bg-white rounded-full transition ${
                    includeChart ? "translate-x-5" : ""
                  }`}
                />
              </span>

              <span className="font-medium">Add Charts</span>
            </button>
          </div>

          {formError && (
            <p className="text-red-400 text-center font-medium">{formError}</p>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full py-4 rounded-xl bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 text-white text-lg font-bold shadow-xl hover:scale-[1.02] transition disabled:bg-gray-500"
          >
            {loading
              ? "Generating AI Notes..."
              : "Generate Professional AI Notes"}
          </button>
        </form>
      </motion.div>
    </div>
  );
}

export default Form;
