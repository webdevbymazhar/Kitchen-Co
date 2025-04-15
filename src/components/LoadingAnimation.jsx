// src/components/LoadingAnimation.jsx

import React from 'react';
import { motion } from 'framer-motion';

const LoadingAnimation = () => {
  return (
    <div style={styles.container}>
      {/* Chef Hat Animation */}
      <motion.div
        style={styles.chefHatContainer}
        animate={{ rotate: [0, 10, -10, 0], y: [0, -5, 0] }}
        transition={{
          duration: 1.5,
          repeat: Infinity,
          ease: 'easeInOut'
        }}
      >
        🍳 {/* Replace with an actual chef hat icon if available */}
      </motion.div>

      {/* Loading Text */}
      <motion.div
        style={styles.loadingText}
        animate={{ opacity: [0.5, 1, 0.5] }}
        transition={{
          duration: 1.5,
          repeat: Infinity,
          ease: 'easeInOut'
        }}
      >
        Loading Your Delicious Experience...
      </motion.div>
    </div>
  );
};

const styles = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100vh',
    backgroundColor: '#FFFAF0',
    color: '#333',
    fontFamily: 'sans-serif',
  },
  chefHatContainer: {
    fontSize: '4rem',
    marginBottom: '1rem',
  },
  loadingText: {
    fontSize: '1.2rem',
    fontWeight: 'bold',
    color: '#333',
  },
};

export default LoadingAnimation;
