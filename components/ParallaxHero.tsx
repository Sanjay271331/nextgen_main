"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef, useEffect, useState } from "react";

export default function ParallaxHero({ content, links }: any) {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"]
  });

  // Smooth cinematic fade to dark blue as user scrolls
  const backgroundOverlay = useTransform(
    scrollYProgress,
    [0, 0.8],
    ["rgba(2, 5, 10, 0)", "rgba(2, 5, 10, 1)"]
  );

  const yText = useTransform(scrollYProgress, [0, 1], [0, 250]);
  const opacityText = useTransform(scrollYProgress, [0, 0.6], [1, 0]);

  // Initial black fade out
  const [isMounted, setIsMounted] = useState(false);
  useEffect(() => {
    setIsMounted(true);
  }, []);

  return (
    <motion.section 
      ref={ref}
      className="relative h-screen flex items-center justify-center overflow-hidden"
      style={{
        backgroundImage: "url('/images/hero-clean-bg.jpg')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundAttachment: "fixed"
      }}
    >
      {/* Initial Black Fade Out */}
      <motion.div 
        className="absolute inset-0 z-30 bg-black pointer-events-none"
        initial={{ opacity: 1 }}
        animate={{ opacity: isMounted ? 0 : 1 }}
        transition={{ duration: 1.5, ease: "easeOut" }}
      />

      {/* Dynamic gradient overlay to ensure text pops and blends into the next section */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#02050A]/40 via-transparent to-[#02050A]" />
      
      {/* Scroll darkening overlay */}
      <motion.div 
        className="absolute inset-0 z-0 pointer-events-none" 
        style={{ backgroundColor: backgroundOverlay }}
      />

      <motion.div 
        style={{ y: yText, opacity: opacityText }}
        className="relative z-10 text-center px-4 flex flex-col items-center justify-center w-full -mt-20"
      >
        
        {/* THE MIND MESH */}
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.5 }}
          className="text-4xl md:text-7xl font-black uppercase tracking-wider mb-2 drop-shadow-[0_10px_20px_rgba(0,0,0,0.8)]"
          style={{
            backgroundImage: "linear-gradient(to bottom, #f8f9fa 0%, #ced4da 40%, #6c757d 60%, #adb5bd 100%)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
          }}
        >
          THE MIND MESH
        </motion.h2>

        {/* PRESENTS */}
        <motion.h3 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1 }}
          className="text-sm md:text-xl font-black text-[#e84e1b] mb-4 tracking-[0.4em] uppercase drop-shadow-[0_2px_10px_rgba(232,78,27,0.8)]"
        >
          PRESENTS
        </motion.h3>
        
        {/* NEXTGEN */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.2, delay: 1.5, ease: "easeOut" }}
          className="flex items-center justify-center leading-none"
        >
          <span 
            className="text-6xl md:text-[9rem] font-black uppercase tracking-tighter drop-shadow-[0_10px_20px_rgba(0,0,0,0.8)]"
            style={{
              backgroundImage: "linear-gradient(to bottom, #ffffff 0%, #e9ecef 40%, #adb5bd 60%, #dee2e6 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}
          >
            NEXT
          </span>
          <span 
            className="text-6xl md:text-[9rem] font-black uppercase tracking-tighter drop-shadow-[0_10px_30px_rgba(232,78,27,0.5)] text-[#e84e1b]"
            style={{
              backgroundImage: "linear-gradient(to bottom, #ff8a66 0%, #e84e1b 50%, #b33911 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}
          >
            GEN
          </span>
        </motion.div>

        {/* BUILDATHON */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.2, delay: 1.7, ease: "easeOut" }}
          className="leading-none mt-2"
        >
          <span 
            className="text-5xl md:text-[7rem] font-black uppercase tracking-tight drop-shadow-[0_10px_20px_rgba(0,0,0,0.8)]"
            style={{
              backgroundImage: "linear-gradient(to bottom, #ffffff 0%, #e9ecef 40%, #adb5bd 60%, #dee2e6 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}
          >
            BUILDATHON
          </span>
        </motion.div>

        {/* CHAPTER - 2 */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 2.2 }}
          className="mt-6 text-xl md:text-3xl font-black text-[#e84e1b] tracking-[0.3em] uppercase drop-shadow-[0_2px_10px_rgba(232,78,27,0.8)]"
          style={{
            backgroundImage: "linear-gradient(to bottom, #ff8a66 0%, #e84e1b 100%)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
          }}
        >
          CHAPTER - 2
        </motion.div>

        {/* Registrations Closed Notice */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 2.5 }}
          className="mt-6 text-xl sm:text-2xl md:text-3xl lg:text-4xl font-black tracking-[0.25em] sm:tracking-[0.3em] text-[#e84e1b] uppercase text-center drop-shadow-[0_0_30px_rgba(232,78,27,0.85)]"
        >
          REGISTRATIONS CLOSED
        </motion.p>
        
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 3 }}
          className="mt-16 flex flex-col items-center justify-center text-blue-400 opacity-80 hover:opacity-100 transition-opacity"
        >
          <span className="text-xs font-bold tracking-[0.3em] uppercase mb-4 text-blue-300">Scroll to Explore</span>
          <div className="w-8 h-12 border-2 border-blue-400/50 rounded-full flex justify-center pt-2">
            <motion.div 
              className="w-1 h-2 bg-blue-400 rounded-full shadow-[0_0_10px_#60A5FA]"
              animate={{ y: [0, 16, 0], opacity: [1, 0, 1] }}
              transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
            />
          </div>
        </motion.div>
      </motion.div>
    </motion.section>
  );
}
