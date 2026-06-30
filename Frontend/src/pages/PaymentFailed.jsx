import React from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

function PaymentFailed() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-[#0f1117] flex items-center justify-center p-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white/5 border border-white/10 p-10 rounded-3xl text-center max-w-md w-full shadow-2xl"
      >
        <div className="w-20 h-20 bg-red-500/20 text-red-400 rounded-full flex items-center justify-center mx-auto mb-6 text-4xl font-black">
          !
        </div>
        <h2 className="text-3xl font-bold text-white mb-2">Payment Failed</h2>
        <p className="text-gray-400 mb-8">
          Something went wrong with the transaction. No charges were made to
          your account.
        </p>
        <button
          onClick={() => navigate("/price")}
          className="w-full py-3 bg-white/10 border border-white/20 text-white font-bold rounded-xl hover:bg-white/20 transition-all"
        >
          Try Again
        </button>
      </motion.div>
    </div>
  );
}

export default PaymentFailed;
