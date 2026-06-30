import React from "react";
import logo from "../assets/logo.png";
import { useNavigate } from "react-router-dom";

function Footer() {
  const navigate = useNavigate();

  return (
    <footer className="w-full bg-black text-gray-300 rounded-xl px-4 py-2 mt-2">
      <div className="flex flex-col md:flex-row justify-between gap-3">
        {/* Brand */}
        <div>
          <div className="flex items-center gap-2">
            <img src={logo} className="w-7 h-7" />

            <span className="text-white text-base font-semibold">
              ExamNotes <span className="text-blue-400">AI</span>
            </span>
          </div>

          <p className="mt-1 text-xs text-gray-400 max-w-sm">
            ExamNotes AI helps students generate exam-focused notes, revision
            material, diagrams and printable PDFs using AI.
          </p>
        </div>

        {/* Links */}
        <div>
          <h2 className="text-white font-bold text-sm mb-1">Quick Links</h2>

          <div className="flex flex-col gap-1 text-sm">
            <span
              onClick={() => navigate("/notes")}
              className="text-blue-400 font-bold cursor-pointer hover:text-blue-300"
            >
              Notes
            </span>

            <span
              onClick={() => navigate("/history")}
              className="text-blue-400 font-bold cursor-pointer hover:text-blue-300"
            >
              History
            </span>
          </div>
        </div>
      </div>

      <div className="mt-2 pt-1 border-t border-gray-800 text-center text-[10px] text-gray-500">
        © 2026 ExamNotes AI. All rights reserved.
      </div>
    </footer>
  );
}

export default Footer;
