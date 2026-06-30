import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { updateCredits } from "../redux/userSlice.js";
import {
  generateNotesApi,
  downloadPdf,
  getSingleNoteApi,
} from "../services/api.js";
import Form from "../components/Form.jsx";
import MermaidSetup from "../components/MermaidSetup.jsx";
import ReChartSetup from "../components/ReChartSetup.jsx";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

function Notes() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { userData } = useSelector((state) => state.user);

  const [searchParams] = useSearchParams();
  const noteId = searchParams.get("id");

  const [generatedNotes, setGeneratedNotes] = useState(null);
  const [loading, setLoading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [error, setError] = useState("");

  const credits = userData?.credits;

  // Fetches the previous chat history if an ID exists in the URL
  useEffect(() => {
    const fetchExistingNote = async () => {
      if (noteId) {
        setLoading(true);
        setError("");
        try {
          const data = await getSingleNoteApi(noteId);
          // Assuming your backend returns { content: {...}, topic: "..." }
          setGeneratedNotes(data.content);
        } catch (err) {
          setError("Failed to load this note. It may have been deleted.");
        } finally {
          setLoading(false);
        }
      } else {
        setGeneratedNotes(null);
      }
    };
    fetchExistingNote();
  }, [noteId]);

  // Loading bar animation
  useEffect(() => {
    let interval;
    if (loading && !noteId) {
      setProgress(10);
      interval = setInterval(() => {
        setProgress((prev) => {
          if (prev >= 90) {
            clearInterval(interval);
            return 90;
          }
          return prev + 15;
        });
      }, 600);
    } else {
      setProgress(0);
    }
    return () => clearInterval(interval);
  }, [loading, noteId]);

  const handleGenerate = async (formData) => {
    setLoading(true);
    setError("");
    setGeneratedNotes(null);

    try {
      const responseData = await generateNotesApi(formData);
      if (responseData.success) {
        setProgress(100);
        setGeneratedNotes(responseData.data);
        dispatch(updateCredits(responseData.remainingCredits));

        navigate(`/notes?id=${responseData.noteId}`, { replace: true });
      }
    } catch (err) {
      setError(
        err.response?.data?.message ||
          "Failed to generate notes. Please check credits or try again."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#0f1117] text-white px-6 py-8 font-sans selection:bg-indigo-500/30">
      <motion.header
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-7xl mx-auto flex justify-between items-center bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl px-8 py-5 sticky top-0 z-50"
      >
        <div onClick={() => navigate("/")} className="cursor-pointer">
          <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
            ExamNotes AI
          </h1>
          <p className="text-gray-400 text-sm mt-1 font-medium">
            Professional AI Study Suite
          </p>
        </div>

        <div className="flex gap-4">
          <div className="hidden md:flex bg-white/5 border border-white/10 rounded-full px-4 py-2 items-center gap-2">
            <span className="text-xs text-gray-400 uppercase tracking-widest">
              Balance:
            </span>
            <span className="font-bold text-blue-400">💎 {credits ?? 0}</span>
          </div>

          <button
            onClick={() => {
              setGeneratedNotes(null);
              navigate("/notes");
            }}
            className="px-6 py-2 rounded-full bg-blue-600 text-white font-bold hover:bg-blue-500 transition-all shadow-lg active:scale-95"
          >
            + New Chat
          </button>

          <button
            onClick={() => navigate("/history")}
            className="px-6 py-2 rounded-full bg-white text-black font-bold hover:bg-indigo-50 transition-all shadow-lg active:scale-95"
          >
            My Library
          </button>
        </div>
      </motion.header>

      <main className="max-w-5xl mx-auto mt-10">
        {!noteId && !generatedNotes && (
          <Form onSubmit={handleGenerate} loading={loading} />
        )}

        <AnimatePresence>
          {loading && !noteId && (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              className="mt-8 bg-white/5 border border-white/10 rounded-2xl p-6"
            >
              <div className="flex justify-between items-end mb-3">
                <div>
                  <h4 className="text-blue-400 font-bold">AI Processing...</h4>
                </div>
                <span className="text-2xl font-black text-white">
                  {progress}%
                </span>
              </div>
              <div className="w-full bg-black/40 rounded-full h-3 border border-white/5 overflow-hidden">
                <motion.div
                  className="bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-500 h-full"
                  initial={{ width: 0 }}
                  animate={{ width: `${progress}%` }}
                />
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {error && (
          <div className="mt-8 bg-red-500/10 border border-red-500/20 text-red-400 rounded-xl p-4 text-center font-bold">
            ⚠️ {error}
          </div>
        )}

        <AnimatePresence>
          {generatedNotes && (
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              className="mt-10 bg-white rounded-3xl shadow-[0_20px_50px_rgba(0,0,0,0.3)] overflow-hidden text-gray-800"
            >
              <div className="bg-slate-900 text-white p-8">
                <div className="grid md:grid-cols-2 gap-8 items-center">
                  <div>
                    <span className="text-blue-400 text-xs font-bold uppercase tracking-widest">
                      Analysis Result
                    </span>
                    <h2 className="text-4xl font-black mb-4">
                      Exam Intelligence
                    </h2>
                    <div className="inline-flex items-center gap-3 bg-white/10 rounded-xl p-4 border border-white/10">
                      <span className="text-3xl">🔥</span>
                      <div>
                        <p className="text-xs text-gray-400 uppercase">
                          Importance Score
                        </p>
                        <p className="text-xl font-bold tracking-tighter text-yellow-400">
                          {generatedNotes.importance || "High"}
                        </p>
                      </div>
                    </div>
                  </div>

                  {generatedNotes.chartData &&
                    generatedNotes.chartData.dataPoints?.length > 0 && (
                      <div className="bg-white/5 rounded-2xl p-4">
                        <ReChartSetup data={generatedNotes.chartData} />
                      </div>
                    )}
                </div>
              </div>

              <div className="p-8 lg:p-12">
                <div className="grid md:grid-cols-2 gap-6 mb-12">
                  {generatedNotes.shortQuestions?.length > 0 && (
                    <div className="bg-indigo-50 border border-indigo-100 rounded-2xl p-6">
                      <h4 className="text-indigo-800 font-black mb-4 flex items-center gap-2">
                        <div className="w-2 h-6 bg-indigo-600 rounded-full"></div>
                        Short Questions
                      </h4>
                      <ul className="space-y-3">
                        {generatedNotes.shortQuestions.map((q, i) => (
                          <li
                            key={i}
                            className="text-sm font-medium text-slate-700 flex gap-2"
                          >
                            <span className="text-indigo-400 font-bold">
                              {i + 1}.
                            </span>{" "}
                            {q}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {generatedNotes.longQuestions?.length > 0 && (
                    <div className="bg-purple-50 border border-purple-100 rounded-2xl p-6">
                      <h4 className="text-purple-800 font-black mb-4 flex items-center gap-2">
                        <div className="w-2 h-6 bg-purple-600 rounded-full"></div>
                        Long Questions
                      </h4>
                      <ul className="space-y-3">
                        {generatedNotes.longQuestions.map((q, i) => (
                          <li
                            key={i}
                            className="text-sm font-medium text-slate-700 flex gap-2"
                          >
                            <span className="text-purple-400 font-bold">
                              {i + 1}.
                            </span>{" "}
                            {q}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>

                <div className="flex items-center justify-between mb-8 pb-4 border-b border-gray-100">
                  <h3 className="text-3xl font-black text-slate-800">
                    Detailed Notes
                  </h3>
                  <div className="flex gap-2">
                    <button
                      onClick={() => downloadPdf(generatedNotes)}
                      className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-sm font-bold shadow-md hover:shadow-lg transition-all duration-300 flex items-center gap-2"
                    >
                      📄 Download PDF
                    </button>
                  </div>
                </div>

                <article className="prose prose-indigo prose-lg max-w-none prose-headings:font-black prose-p:text-slate-600 prose-li:text-slate-600">
                  <ReactMarkdown remarkPlugins={[remarkGfm]}>
                    {generatedNotes.notes}
                  </ReactMarkdown>
                </article>

                {generatedNotes.mermaidChart && (
                  <div className="mt-16 pt-16 border-t border-gray-100">
                    <div className="text-center mb-8">
                      <span className="bg-indigo-100 text-indigo-700 px-4 py-1 rounded-full text-xs font-black uppercase tracking-widest">
                        Visual Concept Map
                      </span>
                      <h3 className="text-2xl font-black text-slate-800 mt-2">
                        Diagrammatic Representation
                      </h3>
                    </div>
                    <MermaidSetup diagram={generatedNotes.mermaidChart} />
                  </div>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      <footer className="max-w-5xl mx-auto mt-20 text-center text-gray-500 text-xs pb-10">
        Built with ExamNotes AI Engine • Professional Study Documentation
      </footer>
    </div>
  );
}
export default Notes;
