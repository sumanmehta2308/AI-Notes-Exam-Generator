import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import logo from "../assets/logo.png";
import { setUserData } from "../redux/userSlice";

function NavBar() {
  const { userData } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const credits = userData?.credits;

  const [showProfile, setShowProfile] = useState(false);
  const [showCredits, setShowCredits] = useState(false);

  const handleSignOut = async () => {
    setShowProfile(false);
    try {
      await axios.get(`${import.meta.env.VITE_BACKEND_URL}/auth/logout`, {
        withCredentials: true,
      });
    } catch (error) {
      console.error("Backend logout ping failed:", error);
    } finally {
      dispatch(setUserData(null));
      navigate("/auth");
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: -15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 1.5 }}
      className="relative z-20 mx-4 mt-4 rounded-2xl bg-gradient-to-br from-black/90 via-black/80 to-black/90 backdrop-blur-2xl border border-white/10 shadow-[0_22px_55px_rgba(0,0,0,0.75)] flex items-center justify-between px-6 py-3"
    >
      <div className="flex items-center gap-3">
        <img src={logo} alt="examnotes" className="w-9 h-9" />
        <span className="text-lg hidden md:block font-semibold text-white">
          ExamNotes <span className="text-gray-400">AI</span>
        </span>
      </div>

      <div className="flex items-center gap-6 relative">
        <div className="relative">
          <motion.div
            onClick={() => {
              setShowCredits(!showCredits);
              setShowProfile(false);
            }}
            whileHover={{ scale: 1.07 }}
            whileTap={{ scale: 0.97 }}
            className="flex items-center gap-1 px-4 py-2 rounded-full border border-white/20 text-white text-sm shadow-md cursor-pointer"
          >
            <span className="text-xl">💎</span>
            <span>{credits || 0}</span>
            <motion.span
              whileHover={{ scale: 0.97 }}
              className="ml-2 h-5 w-5 flex items-center justify-center rounded-full bg-white text-xs font-bold text-black"
            >
              ➕
            </motion.span>
          </motion.div>

          <AnimatePresence>
            {showCredits && (
              <motion.div
                initial={{ opacity: 0, y: -10, scale: 0.95 }}
                animate={{ opacity: 1, y: 10, scale: 1 }}
                exit={{ opacity: 0, y: -10, scale: 0.95 }}
                transition={{ duration: 0.3 }}
                className="absolute right-0 mt-2 w-64 rounded-2xl bg-black/90 backdrop-blur-xl border border-white/10 p-4 text-white z-30"
              >
                <h4 className="font-semibold mb-2">Buy Credits</h4>
                <p className="text-sm text-gray-300 mb-4">
                  Use Credits to generate AI Notes, Diagrams & PDFs.
                </p>
                <button
                  onClick={() => {
                    setShowCredits(false);
                    navigate("/price");
                  }}
                  className="w-full py-2 rounded-lg bg-gradient-to-br from-white to-gray-200 text-black font-semibold hover:opacity-90 transition-opacity"
                >
                  Buy More Credits
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        <div className="relative">
          <motion.div
            onClick={() => {
              setShowProfile(!showProfile);
              setShowCredits(false);
            }}
            whileHover={{ scale: 1.07 }}
            whileTap={{ scale: 0.97 }}
            className="flex items-center justify-center w-10 h-10 rounded-full border border-white/20 text-white text-sm shadow-md cursor-pointer bg-white/5 hover:bg-white/10 transition-colors"
          >
            <span className="text-lg font-medium">
              {userData?.name ? userData.name.slice(0, 1).toUpperCase() : "U"}
            </span>
          </motion.div>

          <AnimatePresence>
            {showProfile && (
              <motion.div
                initial={{ opacity: 0, y: -10, scale: 0.95 }}
                animate={{ opacity: 1, y: 10, scale: 1 }}
                exit={{ opacity: 0, y: -10, scale: 0.95 }}
                transition={{ duration: 0.3 }}
                className="absolute right-0 mt-2 w-64 rounded-2xl bg-black/90 backdrop-blur-xl border border-white/10 p-4 text-white z-30"
              >
                <div className="border-b border-white/10 pb-3 mb-3">
                  <p className="text-xs text-gray-400">Signed in as</p>
                  <p className="font-semibold truncate">
                    {userData?.name || "User Name"}
                  </p>
                  <p className="text-xs text-gray-400 truncate">
                    {userData?.email || "user@example.com"}
                  </p>
                </div>

                <div className="flex flex-col gap-1">
                  <MenuItem
                    text="History"
                    onClick={() => {
                      setShowProfile(false);
                      navigate("/history"); // FIXED TYPO HERE
                    }}
                  />
                  <MenuItem text="Sign out" red onClick={handleSignOut} />
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </motion.div>
  );
}

function MenuItem({ onClick, text, red }) {
  return (
    <div
      onClick={onClick}
      className={`p-2 rounded-lg cursor-pointer text-sm font-medium transition-colors duration-200
        ${
          red
            ? "text-red-400 hover:bg-red-500/20"
            : "text-gray-300 hover:bg-white/10 hover:text-white"
        }`}
    >
      {text}
    </div>
  );
}

export default NavBar;
