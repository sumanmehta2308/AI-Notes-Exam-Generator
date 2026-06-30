import React, { useEffect } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { getCurrentUser } from "../services/api";

function PaymentSuccess() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    // Re-fetch user details to update the Redux store with the newly added credits
    getCurrentUser(dispatch);
  }, [dispatch]);

  return (
    <div className="min-h-screen bg-[#0f1117] flex items-center justify-center p-6">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="bg-white/5 border border-white/10 p-10 rounded-3xl text-center max-w-md w-full shadow-2xl"
      >
        <div className="w-20 h-20 bg-green-500/20 text-green-400 rounded-full flex items-center justify-center mx-auto mb-6 text-4xl">
          ✓
        </div>
        <h2 className="text-3xl font-bold text-white mb-2">
          Payment Successful!
        </h2>
        <p className="text-gray-400 mb-8">
          Your credits have been securely added to your account. You can now
          continue generating premium notes.
        </p>
        <button
          onClick={() => navigate("/notes")}
          className="w-full py-3 bg-gradient-to-r from-green-400 to-emerald-500 text-black font-bold rounded-xl hover:opacity-90 transition-opacity"
        >
          Go to Generator
        </button>
      </motion.div>
    </div>
  );
}

export default PaymentSuccess;
