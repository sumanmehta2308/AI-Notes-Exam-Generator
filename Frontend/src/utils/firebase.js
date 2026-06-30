import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

const firebaseConfig = {
  // Pulls the API key securely from your local environment variables
  apiKey: import.meta.env.VITE_FIREBASE_APIKEY,
  authDomain: "examnotes-b9a3f.firebaseapp.com",
  projectId: "examnotes-b9a3f",
  storageBucket: "examnotes-b9a3f.firebasestorage.app",
  messagingSenderId: "810189679686",
  appId: "1:810189679686:web:ffe85fecb5d72f07436e47",
};

// Initialize Firebase App Instance
const app = initializeApp(firebaseConfig);

// Initialize and export Auth instances for your Auth.jsx component
const auth = getAuth(app);
const provider = new GoogleAuthProvider();
export { auth, provider };
