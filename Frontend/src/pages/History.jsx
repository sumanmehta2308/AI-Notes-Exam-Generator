import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { motion, AnimatePresence } from "framer-motion";
import { getHistoryApi, deleteHistoryApi } from "../services/api.js";

function History() {
  const navigate = useNavigate();
  const { userData } = useSelector((state) => state.user);
  const credits = userData?.credits || 0;

  const [historyNotes, setHistoryNotes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // NEW: State for the success message
  const [successMessage, setSuccessMessage] = useState("");

  const handleDelete = async (e, id) => {
    e.stopPropagation();
    try {
      await deleteHistoryApi(id);
      setHistoryNotes((prev) => prev.filter((note) => note._id !== id));

      // NEW: Show the success message and hide it after 3 seconds
      setSuccessMessage("History deleted successfully!");
      setTimeout(() => {
        setSuccessMessage("");
      }, 3000);
    } catch (err) {
      console.error("Delete Error:", err);
      alert("Failed to delete note. Check console for details.");
    }
  };

  useEffect(() => {
    const fetchHistory = async () => {
      try {
        const response = await getHistoryApi();
        if (response.success) {
          setHistoryNotes(response.data);
        }
      } catch (err) {
        setError("Failed to load history.");
      } finally {
        setLoading(false);
      }
    };
    fetchHistory();
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-black text-white px-6 py-8">
      <header className="max-w-7xl mx-auto flex justify-between items-center mb-10">
        <h1
          onClick={() => navigate("/")}
          className="text-3xl font-semibold cursor-pointer hover:text-gray-300"
        >
          ⬅ Back to Generator
        </h1>
        <div className="px-4 py-2 rounded-full border border-white/20 bg-white/5 text-sm">
          💎 {credits} Credits
        </div>
      </header>

      <main className="max-w-5xl mx-auto">
        <h2 className="text-2xl font-semibold mb-6 border-b border-white/20 pb-2">
          Your Saved Notes
        </h2>

        {/* NEW: Animated Success Banner */}
        <AnimatePresence>
          {successMessage && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="mb-6 p-4 bg-green-500/20 border border-green-500/30 text-green-400 rounded-xl text-center font-bold"
            >
              ✓ {successMessage}
            </motion.div>
          )}
        </AnimatePresence>

        {loading ? (
          <p className="text-gray-400">Loading your academic history...</p>
        ) : error ? (
          <p className="text-red-400">{error}</p>
        ) : historyNotes.length === 0 ? (
          <p className="text-gray-500 italic">
            You haven't generated any notes yet.
          </p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {historyNotes.map((note, index) => (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                key={note._id}
                onClick={() => navigate(`/notes?id=${note._id}`)}
                className="bg-white/10 border border-white/20 rounded-xl p-5 hover:bg-white/15 transition cursor-pointer relative"
              >
                <div className="flex justify-between items-start mb-3">
                  <h3 className="text-xl font-medium text-green-400">
                    {note.topic}
                  </h3>
                  <span className="text-xs text-gray-500 bg-black/40 px-2 py-1 rounded-md">
                    {new Date(note.createdAt).toLocaleDateString()}
                  </span>
                </div>

                <div className="text-sm text-gray-300 space-y-1 mb-4">
                  <p>
                    <strong>Class:</strong> {note.classLevel || "N/A"}
                  </p>
                  <p>
                    <strong>Exam:</strong> {note.examType || "N/A"}
                  </p>
                </div>

                <div className="text-gray-400 text-sm italic">
                  Notes generated successfully.
                </div>

                <button
                  onClick={(e) => handleDelete(e, note._id)}
                  className="absolute bottom-4 right-4 px-4 py-2 rounded-lg bg-red-500/20 border border-red-400/30 text-red-400 hover:bg-red-500 hover:text-white transition font-medium text-sm"
                >
                  Delete
                </button>
              </motion.div>
            ))}
          </div>
        )}
      </main>
    </div>
  );
}
export default History;
