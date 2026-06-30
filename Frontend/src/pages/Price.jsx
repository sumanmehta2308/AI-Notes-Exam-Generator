import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { motion } from "framer-motion";
import { updateCredits } from "../redux/userSlice.js";
import { api, getTransactionHistoryApi } from "../services/api.js";

function Price() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { userData } = useSelector((state) => state.user);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [transactions, setTransactions] = useState([]);

  const plans = [
    { id: "basic", name: "Starter", price: "₹100", amount: 100, credits: 50 },
    { id: "pro", name: "Pro Plan", price: "₹200", amount: 200, credits: 80 },
    {
      id: "premium",
      name: "Premium",
      price: "₹500",
      amount: 500,
      credits: 300,
    },
  ];

  // Load Razorpay script
  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://checkout.razorpay.com/v1/checkout.js";
    script.async = true;
    document.body.appendChild(script);
  }, []);

  // Fetch transaction history
  useEffect(() => {
    const fetchTxHistory = async () => {
      try {
        const res = await getTransactionHistoryApi();
        if (res.success) {
          setTransactions(res.data);
        }
      } catch (err) {
        console.error("Failed to load transaction history");
      }
    };
    fetchTxHistory();
  }, []);

  const handlePurchase = async (amount) => {
    setLoading(true);
    setMessage("");

    if (!window.Razorpay) {
      setMessage("Payment gateway is loading. Please wait a moment.");
      setLoading(false);
      return;
    }

    try {
      const { data: orderData } = await api.post("/credit/order", { amount });

      if (!orderData.success) {
        setMessage("Failed to initialize payment.");
        setLoading(false);
        return;
      }

      const options = {
        key: import.meta.env.VITE_RAZORPAY_KEY_ID,
        amount: orderData.amount,
        currency: "INR",
        name: "ExamNotes AI",
        description: "AI Generation Credits",
        order_id: orderData.orderId,
        handler: async function (response) {
          try {
            const verifyRes = await api.post("/credit/verify", {
              razorpay_order_id: response.razorpay_order_id,
              razorpay_payment_id: response.razorpay_payment_id,
              razorpay_signature: response.razorpay_signature,
              creditsToAdd: orderData.creditsToAdd,
            });

            if (verifyRes.data.success) {
              dispatch(updateCredits(verifyRes.data.newBalance));
              navigate("/payment-success");
            } else {
              navigate("/payment-failed");
            }
          } catch (error) {
            navigate("/payment-failed");
          }
        },
        prefill: {
          name: userData?.name || "User",
          email: userData?.email || "",
        },
        theme: { color: "#4f46e5" },
      };

      const razorpayInstance = new window.Razorpay(options);
      razorpayInstance.on("payment.failed", () => navigate("/payment-failed"));
      razorpayInstance.open();
    } catch (error) {
      setMessage(error.response?.data?.message || "Transaction failed.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-black text-white px-6 py-8">
      <header className="max-w-7xl mx-auto flex justify-between items-center mb-10">
        <h1
          onClick={() => navigate(-1)}
          className="text-3xl font-semibold cursor-pointer hover:text-gray-300"
        >
          ⬅ Go Back
        </h1>
        <div className="px-5 py-2 rounded-full border border-white/20 bg-white/5">
          💎 Current Credits:{" "}
          <span className="font-bold text-green-400">
            {userData?.credits || 0}
          </span>
        </div>
      </header>

      <main className="max-w-5xl mx-auto text-center">
        <h2 className="text-4xl font-bold mb-4">Top Up Your Credits</h2>
        {message && (
          <div className="mb-6 bg-red-500/20 text-red-400 border border-red-500/30 py-3 rounded-xl">
            {message}
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {plans.map((plan) => (
            <motion.div
              key={plan.id}
              className="bg-white/10 border border-white/20 rounded-2xl p-8 flex flex-col items-center"
            >
              <h3 className="text-2xl font-semibold mb-2">{plan.name}</h3>
              <div className="text-4xl font-bold text-blue-400 mb-6">
                {plan.price}
              </div>
              <button
                disabled={loading}
                onClick={() => handlePurchase(plan.amount)}
                className="w-full py-3 rounded-xl bg-white text-black font-semibold"
              >
                {loading ? "Processing..." : "Buy Now"}
              </button>
            </motion.div>
          ))}
        </div>

        {/* Transaction History Table */}
        <div className="mt-16 text-left">
          <h3 className="text-2xl font-bold mb-6 border-b border-white/10 pb-2">
            Billing History
          </h3>
          {transactions.length === 0 ? (
            <p className="text-gray-500 italic">No transactions yet.</p>
          ) : (
            <div className="bg-white/5 border border-white/10 rounded-2xl overflow-hidden">
              <table className="w-full text-sm text-left text-gray-300">
                <thead className="bg-white/10 text-white uppercase text-xs">
                  <tr>
                    <th className="px-6 py-4">Date</th>
                    <th className="px-6 py-4">Amount</th>
                    <th className="px-6 py-4">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {transactions.map((tx) => (
                    <tr key={tx._id} className="border-t border-white/5">
                      <td className="px-6 py-4">
                        {new Date(tx.createdAt).toLocaleDateString()}
                      </td>
                      <td className="px-6 py-4 font-semibold text-white">
                        ₹{tx.amount}
                      </td>
                      <td className="px-6 py-4">
                        <span
                          className={`px-2 py-1 rounded text-xs font-bold ${
                            tx.status === "success"
                              ? "text-green-400"
                              : "text-red-400"
                          }`}
                        >
                          {tx.status.toUpperCase()}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
export default Price;
