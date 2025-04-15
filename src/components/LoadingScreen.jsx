// src/components/LoadingScreen.jsx

import React from "react";
import { motion } from "framer-motion";
import { FaSpinner } from "react-icons/fa";

const LoadingScreen = () => {
  return (
    <motion.div
      style={styles.container}
      initial={{ opacity: 1 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 1 }}
    >
      {/* Glowing Ring Animation */}
      <motion.div
        style={styles.glowRing}
        animate={{ rotate: 360 }}
        transition={{
          repeat: Infinity,
          duration: 2,
          ease: "linear",
        }}
      >
        {/* Loading Icon Animation */}
        <motion.div
          style={styles.loadingIcon}
          animate={{ rotate: [0, 360] }}
          transition={{
            repeat: Infinity,
            duration: 1,
            ease: "linear",
          }}
        >
           <FaSpinner style={styles.loadingIcon} />
        </motion.div>
      </motion.div>

      {/* Animated Loading Text */}
      <motion.div
        style={styles.loadingText}
        animate={{ opacity: [0.5, 1, 0.5] }}
        transition={{
          repeat: Infinity,
          duration: 1.5,
          ease: "easeInOut",
        }}
      >
        Loading your experience...
      </motion.div>
    </motion.div>
  );
};

const styles = {
  container: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    height: "100vh",
    backgroundColor: "#111827", // Dark background for contrast
    fontFamily: "sans-serif",
  },
  glowRing: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    width: "6rem",
    height: "6rem",
    border: "5px solid rgba(255, 165, 0, 0.5)", // Orange glow color
    borderRadius: "50%",
    marginBottom: "1.5rem",
    boxShadow: "0 0 15px rgba(255, 165, 0, 0.6)", // Subtle outer glow
  },
  loadingIcon: {
    fontSize: "2.5rem",
    color: "#FFA500", // Bright orange color
    animation: "spin 3s linear infinite", 
  },
  loadingText: {
    fontSize: "1.2rem",
    color: "#F3F4F6", // Light gray text color
    letterSpacing: "0.05em",
  },
};

export default LoadingScreen;
