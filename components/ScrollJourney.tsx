"use client";

import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import { useRef } from "react";

export default function ScrollJourney({ content }: any) {
  const containerRef = useRef(null);
  
  // Total scroll length for the journey
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  // Smooth progress for fluid animations
  const progress = useSpring(scrollYProgress, { stiffness: 40, damping: 15, mass: 0.5 });

  /* --- 1. BACKGROUND --- */
  // Darken the background city as user scrolls
  const bgOverlay = useTransform(progress, 
    [0, 0.1, 1], 
    ["rgba(2,5,10,0)", "rgba(2,5,10,0.85)", "rgba(2,5,10,0.95)"]
  );

  /* --- 2. THE LIGHT ORB --- */
  const orbOpacity = useTransform(progress, [0, 0.05, 0.1], [0, 0.8, 1]);
  
  // Path points (based on storyboard percentages):
  const orbX = useTransform(progress, 
    [0, 0.1, 0.2, 0.3, 0.4, 0.5, 0.6, 0.7, 1], 
    ["50%", "50%", "50%", "15%", "15%", "85%", "85%", "50%", "50%"]
  );
  
  const orbY = useTransform(progress, 
    [0, 0.1, 0.2, 0.3, 0.4, 0.5, 0.6, 0.7, 1], 
    ["65%", "65%", "65%", "50%", "50%", "70%", "70%", "85%", "85%"]
  );

  /* --- 3. TEXT SECTIONS OPACITY --- */
  // Hero Text
  const heroOpacity = useTransform(progress, [0, 0.1], [1, 0]);
  const heroY = useTransform(progress, [0, 0.1], [0, -50]);

  // Mind Mesh Intro
  const mmOpacity = useTransform(progress, [0.25, 0.3, 0.4, 0.45], [0, 1, 1, 0]);
  const mmY = useTransform(progress, [0.25, 0.3, 0.4, 0.45], [20, 0, 0, -20]);

  // NextGen Intro
  const ngOpacity = useTransform(progress, [0.45, 0.5, 0.6, 0.65], [0, 1, 1, 0]);
  const ngY = useTransform(progress, [0.45, 0.5, 0.6, 0.65], [20, 0, 0, -20]);

  // Highlights
  const hlOpacity = useTransform(progress, [0.65, 0.7, 1], [0, 1, 1]);
  const hlY = useTransform(progress, [0.65, 0.7], [30, 0]);

  // Highlights Internal Elements
  const primaryHighlights = [
    { label: "Prize Pool", value: content?.prize || '₹11,00,000 Prize Pool' },
    { label: "Domains", value: content?.domains || '5 Domains' },
    { label: "Problem", value: content?.problem || 'Open Problem Statement' },
    { label: "Venue", value: content?.venue || 'VVCE Campus' },
    { label: "Team Size", value: content?.team || '2-4 Members' },
    { label: "Duration", value: content?.duration || '24-Hour Hackathon' },
  ];

  return (
    <section ref={containerRef} className="relative bg-[#02050A]" style={{ height: "400vh" }}>
      {/* SCROLL ANCHORS */}
      <div id="hero" className="absolute top-0 w-full" style={{ height: "1px" }} />
      <div id="about" className="absolute top-[100vh] w-full" style={{ height: "1px" }} />
      
      {/* STICKY CONTAINER */}
      <div className="sticky top-0 h-screen w-full overflow-hidden flex items-center justify-center">
        
        {/* Background Image */}
        <div 
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: "url('/images/hero-clean-bg.jpg')" }}
        />
        
        {/* Darkening Overlay */}
        <motion.div 
          className="absolute inset-0 pointer-events-none" 
          style={{ backgroundColor: bgOverlay }} 
        />

        {/* --- THE LIGHT ORB (Very Small version) --- */}
        <motion.div 
          className="absolute w-[8px] h-[8px] bg-white rounded-full pointer-events-none z-10"
          style={{
            top: orbY,
            left: orbX,
            x: "-50%",
            y: "-50%",
            opacity: orbOpacity,
            boxShadow: "0 0 20px 10px rgba(255, 180, 100, 0.6), 0 0 60px 30px rgba(255, 150, 50, 0.3)"
          }}
        />


        {/* --- CONTENT LAYERS --- */}
        <div className="relative w-full max-w-7xl px-4 z-20 h-full flex flex-col justify-center items-center pointer-events-none">
          
          {/* 1. HERO TEXT (Cleaned up, matching reference image exactly) */}
          <motion.div 
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-col items-center w-full md:mt-8 lg:mt-12"
            style={{ opacity: heroOpacity, y: heroY }}
          >
            {/* THE MIND MESH */}
            <h2 className="text-3xl md:text-5xl font-bold uppercase tracking-[0.2em] mb-3 text-gray-200"
                style={{
                  background: "linear-gradient(to bottom, #ffffff, #a3a3a3)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent"
                }}>
              THE MIND MESH
            </h2>
            
            {/* PRESENTS */}
            <h3 className="text-xs md:text-sm font-semibold text-[#e84e1b] tracking-[0.4em] uppercase mb-4">
              PRESENTS
            </h3>
            
            {/* NEXTGEN */}
            <div className="flex items-center justify-center leading-none mt-2">
              <span className="text-6xl md:text-[8rem] font-bold uppercase tracking-tight"
                    style={{
                      background: "linear-gradient(to bottom, #ffffff, #d4d4d4)",
                      WebkitBackgroundClip: "text",
                      WebkitTextFillColor: "transparent"
                    }}>
                NEXT
              </span>
              <span className="text-6xl md:text-[8rem] font-bold uppercase tracking-tight text-[#e84e1b]">
                GEN
              </span>
            </div>
            
            {/* BUILDATHON */}
            <div className="leading-none mt-1">
              <span className="text-5xl md:text-[6.5rem] font-bold uppercase tracking-tight"
                    style={{
                      background: "linear-gradient(to bottom, #ffffff, #d4d4d4)",
                      WebkitBackgroundClip: "text",
                      WebkitTextFillColor: "transparent"
                    }}>
                BUILDATHON
              </span>
            </div>
            
            {/* CHAPTER - 2 */}
            <div className="flex items-center gap-4 mt-8">
              <div className="h-[1px] w-12 bg-gray-500" />
              <div className="text-sm md:text-base font-semibold text-gray-300 tracking-[0.3em] uppercase">
                CHAPTER <span className="text-[#e84e1b]">2</span>
              </div>
              <div className="h-[1px] w-12 bg-gray-500" />
            </div>

            {/* Registrations Closed Notice */}
            <p className="mt-6 text-xl sm:text-2xl md:text-3xl lg:text-4xl font-black tracking-[0.25em] sm:tracking-[0.3em] text-[#e84e1b] uppercase text-center drop-shadow-[0_0_30px_rgba(232,78,27,0.85)]">
              REGISTRATIONS CLOSED
            </p>
          </motion.div>

          {/* 2. MIND MESH INTRO (Clean, readable layout) */}
          <motion.div 
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-center max-w-3xl w-full px-4"
            style={{ opacity: mmOpacity, y: mmY }}
          >
            <h2 className="text-2xl md:text-4xl font-semibold text-white mb-6 uppercase tracking-[0.1em]">THE MIND MESH</h2>
            <p className="text-gray-300 text-sm md:text-base leading-loose font-normal">
              The Mind Mesh is a multidisciplinary innovation club at Vidyavardhaka College of Engineering, Mysuru, bringing together students from diverse fields to learn, share knowledge, exchange ideas, and build together. We believe in the power of collective minds, where collaboration fuels curiosity, innovation, and limitless intelligence.
            </p>
          </motion.div>

          {/* 3. NEXTGEN INTRO (Clean, readable layout) */}
          <motion.div 
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-center max-w-3xl w-full px-4"
            style={{ opacity: ngOpacity, y: ngY }}
          >
            <h2 className="text-2xl md:text-4xl font-semibold text-white mb-6 uppercase tracking-[0.1em]">NEXTGEN BUILDATHON</h2>
            <h3 className="text-sm md:text-base font-semibold text-[#e84e1b] mb-4 tracking-[0.2em] uppercase">CHAPTER 2</h3>
            <p className="text-gray-300 text-sm md:text-base leading-loose font-normal">
              NextGen Build-a-thon 2026 — Chapter 2 is The Mind Mesh’s flagship event, A 24-hour National-Level Hackathon, bringing together students who are passionate about technology, innovation, and creating meaningful solutions. More than a competition, it is a platform for young builders to turn ideas into action, challenge conventional thinking, collaborate with like-minded minds, and experience the process of building under pressure. It is where curiosity becomes creation, and creators take their next step forward.
            </p>
          </motion.div>

          {/* 4. HIGHLIGHTS (Cinematic Reference Design - Updated) */}
          <motion.div 
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-7xl px-4 md:px-6 pointer-events-auto h-[100dvh] lg:h-auto flex flex-col justify-center pt-20 pb-4 lg:pt-0 lg:pb-0"
            style={{ opacity: hlOpacity, y: hlY }}
          >
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 md:gap-8 lg:gap-12 items-center w-full max-h-full overflow-y-auto no-scrollbar">
              
              {/* Center Element (Date) - Moved to top on mobile */}
              <div className="order-1 lg:order-2 flex justify-center mt-4 lg:mt-0">
                <div className="flex flex-col items-center justify-center p-2 lg:p-8 text-center relative scale-90 sm:scale-100">
                  <div className="text-3xl md:text-5xl font-serif text-white mb-2">26<span className="text-lg md:text-2xl">th</span> & 27<span className="text-lg md:text-2xl">th</span></div>
                  <div className="text-4xl md:text-6xl font-serif text-white tracking-widest uppercase leading-none">NOVEMBER</div>
                  <div className="text-4xl md:text-6xl font-serif text-white tracking-widest mt-1 leading-none">2026</div>
                  
                  <div className="w-12 md:w-20 h-[2px] bg-[#ea580c] my-4 md:my-6" />
                  
                  <div className="text-[10px] md:text-sm text-gray-200 tracking-[0.2em] md:tracking-[0.3em] uppercase whitespace-nowrap font-bold">NEXT GEN BUILDATHON</div>
                  <div className="text-[10px] md:text-sm text-gray-400 tracking-[0.1em] md:tracking-[0.2em] uppercase mt-2 whitespace-nowrap">— CHAPTER 2 —</div>
                </div>
              </div>

              {/* Left Column (Mobile layout: grid with 2 cols, Desktop: flex col) */}
              <div className="order-2 lg:order-1 flex flex-col gap-6 lg:gap-10 px-2 lg:px-0">
                <div className="pl-4 lg:pl-0 border-l-[3px] border-[#ea580c] lg:border-none lg:text-center flex flex-col justify-center">
                  <div className="text-sm md:text-lg text-white tracking-widest uppercase mb-1 lg:mb-2 font-bold">PRIZE POOL</div>
                  <div className="text-3xl md:text-5xl font-serif text-[#ea580c]">₹1,00,000</div>
                </div>
                
                <div className="pl-4 lg:pl-0 border-l-[3px] border-[#ea580c] lg:border-none lg:text-center flex flex-col justify-center">
                  <div className="text-sm md:text-lg text-white tracking-widest uppercase mb-1 lg:mb-2 font-bold">OPEN PROBLEM STATEMENT</div>
                  <div className="text-xs md:text-base text-[#ea580c]">Solve real-world challenges</div>
                </div>
                
                <div className="pl-4 lg:pl-0 border-l-[3px] border-[#ea580c] lg:border-none lg:text-center flex flex-col justify-center">
                  <div className="text-sm md:text-lg text-white tracking-widest uppercase mb-1 lg:mb-2 font-bold">2—4 MEMBERS</div>
                  <div className="text-xs md:text-base text-[#ea580c]">Form your team</div>
                </div>
              </div>

              {/* Right Column */}
              <div className="order-3 lg:order-3 flex flex-col gap-6 lg:gap-10 px-2 lg:px-0 mb-8 lg:mb-0">
                <div className="pl-4 lg:pl-0 border-l-[3px] border-[#ea580c] lg:border-none lg:text-center flex flex-col justify-center">
                  <div className="text-sm md:text-lg text-white tracking-widest uppercase mb-1 lg:mb-2 font-bold">5 DOMAINS</div>
                  <div className="text-xs md:text-base text-[#ea580c]">Explore. Build. Innovate.</div>
                </div>
                
                <div className="pl-4 lg:pl-0 border-l-[3px] border-[#ea580c] lg:border-none lg:text-center flex flex-col justify-center">
                  <div className="text-sm md:text-lg text-white tracking-widest uppercase mb-1 lg:mb-2 font-bold">VENUE</div>
                  <div className="text-xs md:text-base text-[#ea580c] leading-relaxed">Kempegowda Sports Complex,<br/>VVCE Campus</div>
                </div>
                
                <div className="pl-4 lg:pl-0 border-l-[3px] border-[#ea580c] lg:border-none lg:text-center flex flex-col justify-center">
                  <div className="text-sm md:text-lg text-white tracking-widest uppercase mb-1 lg:mb-2 font-bold">24-HOUR HACKATHON</div>
                  <div className="text-xs md:text-base text-[#ea580c]">Build beyond limits</div>
                </div>
              </div>

            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
