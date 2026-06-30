import React, { useEffect, useState } from "react";
import { Route, Routes, Navigate } from "react-router-dom";
import Home from "./pages/Home.jsx";
import Auth from "./pages/Auth.jsx";
import Notes from "./pages/Notes.jsx";
import Price from "./pages/Price.jsx";
import History from "./pages/History.jsx";
import PaymentSuccess from "./pages/PaymentSuccess.jsx"; // ADDED IMPORT
import PaymentFailed from "./pages/PaymentFailed.jsx"; // ADDED IMPORT
import { getCurrentUser } from "./services/api.js";
import { useDispatch, useSelector } from "react-redux";

function App() {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true);

  const { userData } = useSelector((state) => state.user);

  useEffect(() => {
    const fetchUser = async () => {
      await getCurrentUser(dispatch);
      setLoading(false);
    };

    fetchUser();
  }, [dispatch]);

  if (loading) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center text-white">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-400"></div>
        <span className="ml-3 italic text-gray-500">
          Verifying session token...
        </span>
      </div>
    );
  }

  const isAuthenticated = userData && (userData._id || userData.email);

  return (
    <Routes>
      <Route
        path="/"
        element={isAuthenticated ? <Home /> : <Navigate to="/auth" replace />}
      />
      <Route
        path="/auth"
        element={isAuthenticated ? <Navigate to="/" replace /> : <Auth />}
      />
      <Route
        path="/history"
        element={
          isAuthenticated ? <History /> : <Navigate to="/auth" replace />
        }
      />
      <Route
        path="/notes"
        element={isAuthenticated ? <Notes /> : <Navigate to="/auth" replace />}
      />
      <Route
        path="/price"
        element={isAuthenticated ? <Price /> : <Navigate to="/auth" replace />}
      />

      {/* NEW PAYMENT ROUTES ADDED */}
      <Route
        path="/payment-success"
        element={
          isAuthenticated ? <PaymentSuccess /> : <Navigate to="/auth" replace />
        }
      />
      <Route
        path="/payment-failed"
        element={
          isAuthenticated ? <PaymentFailed /> : <Navigate to="/auth" replace />
        }
      />

      <Route
        path="*"
        element={<Navigate to={isAuthenticated ? "/" : "/auth"} replace />}
      />
    </Routes>
  );
}

export default App;
