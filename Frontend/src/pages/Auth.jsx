import React, { useState } from "react";
import { motion } from "framer-motion";
import { FcGoogle } from "react-icons/fc";
import { auth, provider } from "../utils/firebase";
import { signInWithPopup, signOut } from "firebase/auth";
import axios from "axios";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setUserData } from "../redux/userSlice";

const featureIcons = {
  credits: "💎",
  notes: "📝",
  project: "📁",
  charts: "📊",
  pdf: "📄",
};

function Auth() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [isAuthenticating, setIsAuthenticating] = useState(false);

  const handleGoogleAuth = async () => {
    if (isAuthenticating) return;
    let popupSuccess = false;

    try {
      setIsAuthenticating(true);
      try {
        await signOut(auth);
      } catch (signOutErr) {
        // Safe to ignore
      }

      provider.setCustomParameters({ prompt: "select_account" });
      const response = await signInWithPopup(auth, provider);

      if (response && response.user) {
        popupSuccess = true;
        const User = response.user;

        const result = await axios.post(
          `${import.meta.env.VITE_BACKEND_URL}/auth/google`,
          { name: User.displayName, email: User.email },
          { withCredentials: true }
        );

        dispatch(setUserData(result.data));
        navigate("/");
      }
    } catch (err) {
      if (popupSuccess) {
        alert(
          `Backend Server Error: ${err.response?.data?.message || err.message}`
        );
      } else if (err.code === "auth/popup-blocked") {
        alert(
          "Your browser blocked the login popup window. Please allow popups for this site!"
        );
      } else if (
        err.code === "auth/popup-closed-by-user" ||
        err.code === "auth/cancelled-popup-request"
      ) {
        // Silently handle user closing the popup intentionally
        console.log("User closed the popup.");
      } else {
        alert("An error occurred during sign-in: " + err.message);
      }
    } finally {
      setIsAuthenticating(false);
    }
  };

  return (
    <div className="min-h-screen overflow-hidden bg-white text-black px-8">
      <motion.header
        initial={{ opacity: 0, y: -15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.5 }}
        className="max-w-7xl mx-auto mt-8 rounded-2xl bg-black/80 backdrop-blur-xl px-8 py-6 shadow-[0_20px_45px_rgba(0,0,0,0.6)]"
      >
        <h1 className="text-2xl font-bold bg-gradient-to-r from-white via-gray-300 to-white bg-clip-text text-transparent">
          ExamNotes AI
        </h1>
        <p className="text-sm text-gray-300 mt-1">
          AI-powered exam oriented notes & revision
        </p>
      </motion.header>

      <main className="max-w-7xl mx-auto py-10 grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
        <motion.div
          initial={{ opacity: 0, x: -60 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7 }}
        >
          <h1 className="text-5xl lg:text-6xl font-extrabold leading-tight bg-gradient-to-br from-black/90 via-black/60 to-black/90 bg-clip-text text-transparent">
            Unlock Smart
            <br /> AI Notes
          </h1>

          <motion.button
            onClick={handleGoogleAuth}
            disabled={isAuthenticating}
            whileHover={!isAuthenticating ? { scale: 1.02 } : {}}
            whileTap={!isAuthenticating ? { scale: 0.98 } : {}}
            className={`mt-10 px-10 py-3 rounded-xl flex items-center gap-3 bg-gradient-to-br from-black/90 via-black/80 to-black/90 border border-white/10 text-white font-semibold text-lg shadow-[0_25px_60px_rgba(0,0,0,0.7)] transition-all ${
              isAuthenticating
                ? "opacity-50 cursor-not-allowed"
                : "cursor-pointer hover:opacity-95"
            }`}
          >
            <FcGoogle size={22} />
            {isAuthenticating ? "Logging you in..." : "Continue With Google"}
          </motion.button>

          <p className="mt-6 max-w-xl text-lg bg-gradient-to-br from-gray-700 via-gray-500 to-gray-700 bg-clip-text text-transparent">
            You get <span className="font-semibold">100 FREE Credits</span> to
            create exam notes, project notes, charts, graphs and download clean
            PDFs instantly using AI.
          </p>
          <p className="text-sm text-gray-500 mt-2">
            Start with 100 free credits • Upgrade anytime for more credits •
            Instant Access
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
          <Feature
            icon={featureIcons.credits}
            title="100 Free Credits"
            des="Start with 100 credits to generate notes without paying"
          />
          <Feature
            icon={featureIcons.notes}
            title="Exam Notes"
            des="High-yield revision-ready exam oriented notes"
          />
          <Feature
            icon={featureIcons.project}
            title="Project Notes"
            des="Well Structured documents for assignments & projects"
          />
          <Feature
            icon={featureIcons.charts}
            title="Charts and Graphs"
            des="Auto Generated diagrams, charts and flow graphs"
          />
          <Feature
            icon={featureIcons.pdf}
            title="Free PDF download"
            des="Download clean, Printable PDFs"
          />
        </div>
      </main>
    </div>
  );
}

function Feature({ icon, title, des }) {
  return (
    <motion.div
      whileHover={{ y: -12, rotateX: 8, rotateY: -8, scale: 1.07 }}
      transition={{ type: "spring", stiffness: 200, damping: 18 }}
      className="relative rounded-2xl p-6 bg-gradient-to-br from-black/90 via-black/80 to-black/90 backdrop-blur-2xl border border-white/10 shadow-[0_30px_80px_rgba(0,0,0,0.7)] text-white"
      style={{ transformStyle: "preserve-3d" }}
    >
      <div className="relative z-10" style={{ transform: "translateZ(30px)" }}>
        <div className="text-4xl mb-3">{icon}</div>
        <h3 className="text-lg font-semibold mb-2">{title}</h3>
        <p className="text-gray-300 text-sm leading-relaxed">{des}</p>
      </div>
    </motion.div>
  );
}

export default Auth;
