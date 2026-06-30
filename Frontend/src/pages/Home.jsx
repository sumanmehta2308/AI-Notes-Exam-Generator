import React from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import NavBar from "../components/NavBar";
import Footer from "../components/Footer";
import img from "../assets/img1.png";

const featureIcons = {
  notes: "📚",
  project: "📁",
  charts: "📊",
  pdf: "📥",
};

function Home() {
  const navigate = useNavigate();
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.15 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "out" } },
  };

  return (
    // Locked viewport screen to prevent native browser scrolling
    <div className="relative min-h-screen bg-white text-black flex flex-col px-4 md:px-8 overflow-x-hidden overflow-y-auto md:overflow-hidden">
      {/* Top Section: Header Navbar */}
      <div>
        <NavBar />
      </div>

      {/* Main Container: Pulled closer to the top with minimized vertical padding */}
      <div className="flex-1 max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-2 gap-6 items-center py-6 md:py-2">
        {/* Left Side Content */}
        <motion.div
          initial="hidden"
          animate="visible"
          variants={containerVariants}
          className="flex flex-col items-start text-left"
        >
          <motion.h1
            variants={itemVariants}
            className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight bg-gradient-to-br from-black via-gray-700 to-black/90 bg-clip-text text-transparent leading-tight"
          >
            Create Smart <br />
            <span className="bg-gradient-to-r from-gray-900 via-gray-600 to-gray-900 bg-clip-text">
              AI Notes
            </span>{" "}
            In Seconds
          </motion.h1>

          <motion.p
            variants={itemVariants}
            className="mt-4 text-base text-gray-600 max-w-lg leading-relaxed"
          >
            Generate exam-focused notes, project documentation, auto-layout flow
            diagrams, and revision-ready content using artificial
            intelligence—built faster, cleaner, and smarter.
          </motion.p>

          <motion.button
            variants={itemVariants}
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => navigate("/notes")}
            // onClick={() => navigate("/dashboard")}
            className="mt-6 px-8 py-3 rounded-xl bg-gradient-to-br from-black/95 via-black/80 to-black/95 border border-white/10 text-white font-semibold text-sm shadow-[0_15px_40px_rgba(0,0,0,0.25)] cursor-pointer hover:opacity-95 transition-opacity"
          >
            Get Started Free
          </motion.button>
        </motion.div>

        {/* Right Side Image Showcase */}
        <motion.div
          initial={{ opacity: 0, x: 40, scale: 0.95 }}
          animate={{ opacity: 1, x: 0, scale: 1 }}
          transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
          className="relative w-full flex justify-center lg:justify-end max-h-[38vh] lg:max-h-full overflow-hidden"
        >
          <div className="relative rounded-2xl p-1.5 bg-gradient-to-br from-black/5 to-black/10 border border-black/5 shadow-[0_20px_50px_rgba(0,0,0,0.12)]">
            <img
              src={img}
              alt="ExamNotes AI Tool Preview"
              className="w-full max-w-[440px] max-h-[32vh] lg:max-h-[42vh] h-auto rounded-xl object-cover"
            />
          </div>
        </motion.div>
      </div>

      {/* Feature Grid Area */}
      <section className="max-w-7xl mx-auto w-full border-t border-gray-100 pt-2 pb-1 flex justify-center">
        {/* <section className="relative min-h-screen bg-white text-black flex flex-col px-6 md:px-12 overflow-y-auto"> */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 w-full justify-items-center">
          <Feature
            icon={featureIcons.notes}
            title="Exam Notes"
            des="Generate smart exam notes with important topics, key concepts, summaries, and revision points to help students prepare faster and improve learning efficiency."
          />

          <Feature
            icon={featureIcons.project}
            title="Projects"
            des="Create professional project documents with proper structure, explanations, ideas, and organized content that supports academic work and practical development requirements."
          />

          <Feature
            icon={featureIcons.charts}
            title="Charts & Graphs"
            des="Convert complex information into simple charts, graphs, and visual diagrams that make concepts easier to understand and improve overall clarity."
          />

          <Feature
            icon={featureIcons.pdf}
            title="PDF Downloads"
            des="Download clean and well-formatted PDF files for easy reading, offline access, sharing, and managing important study materials efficiently."
          />
        </div>
      </section>
      {/* Expanded Footer Buffer Space to give you plenty of structural room */}
      <div className="w-full">
        <Footer />
      </div>
    </div>
  );
}
// Compact, Professional, Fixed-Height Tile with Larger Content Focus
function Feature({ icon, title, des }) {
  return (
    <motion.div
      whileHover={{ y: -5, scale: 1.01 }}
      transition={{ type: "spring", stiffness: 300, damping: 25 }}
      className="relative w-full max-w-[220px] rounded-xl p-4 bg-gradient-to-br from-black/95 via-black/85 to-black/95 border border-white/10 shadow-[0_12px_24px_rgba(0,0,0,0.3)] text-white flex flex-col gap-2 overflow-hidden"
    >
      {/* Header */}
      <div className="flex items-center gap-2 w-full">
        <span className="text-3xl select-none">{icon}</span>

        <h3 className="text-base sm:text-lg font-bold text-white tracking-wide leading-tight">
          {title}
        </h3>
      </div>

      {/* Description */}
      <p className="text-gray-300  sm:text-[14px] leading-5 font-normal">
        {des}
      </p>
    </motion.div>
  );
}
export default Home;
