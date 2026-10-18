"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";

export default function IntroAnimation({ onComplete, content }: { onComplete: () => void, content: any }) {
  const [phase, setPhase] = useState("playing"); // 'playing' | 'converging'

  useEffect(() => {
    // Phase transition timings according to strict 0-5s rules
    const convergeTimer = setTimeout(() => {
      setPhase("converging"); // Triggers at exactly 5.0s
    }, 5000);

    const completeTimer = setTimeout(() => {
      onComplete(); // Removes component after converge animation completes
    }, 5500);

    return () => {
      clearTimeout(convergeTimer);
      clearTimeout(completeTimer);
    };
  }, [onComplete]);

  // Variant A: Deep Blue
  const bgColors = {
    solid: "rgba(2, 10, 26, 1)", // #020A1A
    transparent: "rgba(2, 10, 26, 0)",
  };

  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 z-50 flex flex-col items-center justify-center overflow-hidden w-[100vw] h-[100dvh]"
        initial={{ backgroundColor: bgColors.solid }}
        animate={{ backgroundColor: phase === "converging" ? bgColors.transparent : bgColors.solid }}
        transition={{ duration: 0.5, ease: "easeInOut" }}
      >
        
        {/* Central Radial Glow (Subtle pulse at rest) */}
        <motion.div
          className="absolute inset-0 flex items-center justify-center pointer-events-none"
          animate={
            phase === "converging"
              ? { opacity: 0 }
              : { scale: [1, 1.05, 1], opacity: [0.6, 0.8, 0.6] }
          }
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
        >
          <div className="w-[clamp(300px,60vw,800px)] h-[clamp(300px,60vw,800px)] rounded-full bg-[radial-gradient(circle_at_center,rgba(29,78,216,0.15)_0%,transparent_60%)]" />
        </motion.div>

        {/* Converge Light Explosion */}
        <AnimatePresence>
          {phase === "converging" && (
            <motion.div 
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#facc15] blur-[30px] mix-blend-screen pointer-events-none z-20"
              initial={{ width: "10px", height: "10px", opacity: 1 }}
              animate={{ width: "150vw", height: "150vw", opacity: 0 }}
              transition={{ duration: 0.6, ease: "easeOut" }}
            />
          )}
        </AnimatePresence>

        {/* Main Composition (Centered tightly as one unit) */}
        <motion.div 
          className="relative z-10 flex flex-col items-center justify-center w-full h-full max-w-[1400px] px-[clamp(1rem,4vw,4rem)]"
          animate={
            phase === "converging" 
              ? { scale: 0, opacity: 0, filter: "brightness(2) blur(10px)" } 
              : { scale: 1, opacity: 1, filter: "brightness(1) blur(0px)" }
          }
          transition={{ duration: 0.4, ease: "easeIn" }}
        >
          
          {/* 1. Header Row (0.5s - 1.8s) */}
          <div className="flex w-full justify-between items-center mb-[clamp(1.5rem,4vh,3rem)]">
            {/* Left Emblem (VVCE) */}
            <motion.img 
              src="/vvce-emblem.png" 
              alt="VVCE"
              className="w-[clamp(50px,10vw,100px)] h-[clamp(50px,10vw,100px)] object-contain bg-white rounded-full p-[clamp(6px,1vw,10px)] shadow-[0_0_20px_rgba(255,255,255,0.15)]"
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ type: "spring", bounce: 0.4, duration: 0.8, delay: 0.5 }}
            />
            
            {/* Center Title Block */}
            <div className="flex flex-col items-center text-center px-4 flex-grow">
              <motion.h1 
                className="font-serif font-bold text-[#F8F9FA] text-[clamp(10px,1.8vw,24px)] tracking-wide leading-tight"
                initial={{ y: 15, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.6, delay: 0.8 }}
              >
                {content?.college_name || 'VIDHYAVARDHAKA COLLEGE OF ENGINEERING'}
              </motion.h1>
              <motion.p 
                className="font-serif text-[#9CA3AF] font-light tracking-wider text-[clamp(7px,1.2vw,14px)] mt-[clamp(2px,1vh,8px)] max-w-[90%]"
                initial={{ y: 15, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.6, delay: 1.0 }}
              >
                Autonomous Institute affiliated to VTU, Belagavi Accredited by NBA NAAC with 'A' Grade, Gokulum 3rd stage, Mysuru–570002
              </motion.p>
            </div>

            {/* Right Emblem (EEE) */}
            <motion.img 
              src="/eee-dept-emblem.png" 
              alt="EEE Dept"
              className="w-[clamp(50px,10vw,100px)] h-[clamp(50px,10vw,100px)] object-contain bg-white rounded-full p-[clamp(6px,1vw,10px)] shadow-[0_0_20px_rgba(255,255,255,0.15)]"
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ type: "spring", bounce: 0.4, duration: 0.8, delay: 0.6 }}
            />
          </div>

          {/* 2. THE MIND MESH PRESENTS (1.8s - 2.8s) */}
          <div className="flex flex-col items-center justify-center mb-[clamp(2rem,5vh,4rem)]">
            <motion.div 
              className="font-black text-[#1e3a8a] text-[clamp(20px,4vw,44px)] tracking-[0.2em] drop-shadow-[0_0_15px_rgba(30,58,138,0.4)] text-center uppercase" 
              initial={{ y: 20, opacity: 0 }} 
              animate={{ y: 0, opacity: 1 }} 
              transition={{ duration: 0.8, delay: 1.8 }}
            >
              {/* Mobile exactly as it was */}
              <span className="md:hidden">THE MIND MESH PRESENTS</span>
              
              {/* Desktop split into two lines with smaller 'PRESENTS' */}
              <div className="hidden md:flex flex-col items-center gap-2">
                <span>THE MIND MESH</span>
                <span className="text-[clamp(18px,2.5vw,34px)] tracking-[0.3em]">PRESENTS</span>
              </div>
            </motion.div>
          </div>

          {/* 3. Arrow + Wordmark Group (Scaled down ~20%) */}
          <div className="flex flex-col items-center">
            
            {/* Chevrons locking together */}
            <div className="relative w-[clamp(80px,14vw,160px)] h-[clamp(60px,10.5vw,120px)] mb-[clamp(1rem,3vh,2.5rem)]">
              <motion.svg 
                width="100%" height="100%" viewBox="0 0 145 120" fill="none"
                className="absolute inset-0 drop-shadow-[0_0_15px_rgba(234,88,12,0.2)]"
              >
                {/* Rear Chevron (Navy) */}
                <motion.path 
                  d="M 20 30 L 45 30 L 75 60 L 45 90 L 20 90 L 50 60 Z" 
                  fill="#1e3a8a"
                  initial={{ x: -80, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ duration: 0.6, ease: "easeOut", delay: 2.8 }}
                />
                {/* Front Chevron (Orange-to-Gold Gradient) */}
                <defs>
                  <linearGradient id="orangeGold" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#facc15" />
                    <stop offset="50%" stopColor="#ea580c" />
                    <stop offset="100%" stopColor="#9a3412" />
                  </linearGradient>
                </defs>
                <motion.path 
                  d="M 40 10 L 75 10 L 125 60 L 75 110 L 40 110 L 90 60 Z" 
                  fill="url(#orangeGold)"
                  initial={{ x: 80, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ duration: 0.6, ease: "easeOut", delay: 2.8 }}
                />
              </motion.svg>
            </div>

            {/* Wordmarks snapping into place */}
            <motion.div className="flex flex-col items-center">
              {/* NEXTGEN with Bicolor X */}
              <motion.div 
                className="flex items-center text-[clamp(35px,7.2vw,88px)] font-black uppercase leading-none tracking-tight"
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ type: "spring", bounce: 0.2, duration: 0.5, delay: 3.2 }}
              >
                <span className="text-[#1e3a8a]">NE</span>
                <span 
                  style={{ 
                    background: 'linear-gradient(to right, #1e3a8a 50%, #ea580c 50%)', 
                    WebkitBackgroundClip: 'text', 
                    color: 'transparent' 
                  }}
                >
                  X
                </span>
                <span className="text-[#ea580c]">T</span>
                <span className="text-[#ea580c]">GEN</span>
              </motion.div>

              {/* {content?.title_buildathon || 'BUILD-A-THON'} */}
              <motion.div
                className="text-[clamp(12px,2.8vw,30px)] font-black text-[#ea580c] tracking-[0.4em] uppercase mt-[clamp(0.4rem,1.2vh,0.8rem)] drop-shadow-[0_2px_4px_rgba(0,0,0,0.5)]"
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ type: "spring", bounce: 0.2, duration: 0.5, delay: 3.28 }}
              >
                {content?.title_buildathon || 'BUILD-A-THON'}
              </motion.div>

              {/* 2026 · CHAPTER 02 */}
              <motion.div
                className="flex items-center justify-center gap-[clamp(0.4rem,1.2vw,1.2rem)] text-[clamp(10px,1.4vw,17px)] font-bold text-[#1e3a8a] tracking-[0.5em] uppercase mt-[clamp(0.8rem,2.4vh,1.6rem)]"
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ type: "spring", bounce: 0.2, duration: 0.5, delay: 3.36 }}
              >
                <span>{content?.title_sub || "2026 • CHAPTER 02"}</span>
              </motion.div>
            </motion.div>

          </div>

        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}

