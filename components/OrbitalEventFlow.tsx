"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";

export default function OrbitalEventFlow({ events: _deprecatedEvents }: any) {
  // Helper to determine the active event ID based on current real-time
  const getActiveIdByTime = () => {
    const now = new Date();
    const year = now.getFullYear();
    const currentTime = now.getTime();

    // Event timestamps
    const t_ev1 = new Date(year, 8, 18, 17, 0, 0).getTime();   // 18th Sept 5 PM (month 8 is Sept)
    const t_ev2 = new Date(year, 9, 3, 10, 0, 0).getTime();    // 3rd Oct 10 AM (month 9 is Oct)
    const t_ev4 = new Date(year, 9, 19, 0, 0, 0).getTime();    // 19th Oct 12 AM (PPT submission start)
    const t_ev5 = new Date(year, 9, 20, 23, 59, 59).getTime(); // 20th Oct 11:59 PM (PPT deadline)
    const t_ev6 = new Date(year, 9, 28, 16, 0, 0).getTime();   // 28th Oct 4 PM (Shortlist announcement)
    const t_ev7 = new Date(year, 9, 30, 23, 59, 59).getTime(); // 30th Oct 11:59 PM (Payment deadline)
    const t_ev8 = new Date(year, 10, 26, 9, 0, 0).getTime();   // 26th Nov 9 AM (Offline hackathon)

    if (currentTime >= t_ev8) return 'ev8';
    if (currentTime >= t_ev7) return 'ev7';
    if (currentTime >= t_ev6) return 'ev6';
    if (currentTime >= t_ev5) return 'ev5';
    if (currentTime >= t_ev4) return 'ev4'; // 19th Oct 12 AM onwards
    if (currentTime >= t_ev2) return 'ev2'; // 3rd Oct 10 AM to 19th Oct 12 AM
    if (currentTime >= t_ev1) return 'ev1'; // 18th Sept 5 PM to 3rd Oct 10 AM
    return 'ev1';
  };

  const [activeId, setActiveId] = useState<string>('ev2');

  useEffect(() => {
    const updateActive = () => {
      setActiveId(getActiveIdByTime());
    };

    updateActive();
    const interval = setInterval(updateActive, 1000);
    return () => clearInterval(interval);
  }, []);

  const events = [
    { id: 'ev1', stage_name: "Registration starts", date_time: "18th September 5 PM" },
    { id: 'ev2', stage_name: "PPT Template Announcement", date_time: "3rd October 10 AM" },
    { id: 'ev3', stage_name: "Registration closes", date_time: "19th October 12 AM" },
    { id: 'ev4', stage_name: "PPT submission Start date", date_time: "19th October 12 AM" },
    { id: 'ev5', stage_name: "PPT deadline", date_time: "20th October 11:59 PM" },
    { id: 'ev6', stage_name: "Shortlist announcement", date_time: "28th October 4 PM" },
    { id: 'ev7', stage_name: "Payment deadline After shortlisting", date_time: "30th October 11:59 PM" },
    { id: 'ev8', stage_name: "Offline hackathon", date_time: "26th & 27th November" },
  ];

  // Orbital Geometry Constants
  const viewBoxWidth = 1200;
  const viewBoxHeight = 1200;
  // Adjusted radius and center to keep curve strictly on the left 20% of the screen
  // This prevents mobile overflow and leaves 80% width for the event cards
  const cx = -349;
  const cy = viewBoxHeight / 2;
  const r = 610;

  // Arc boundaries
  const startAngleDeg = -55;
  const endAngleDeg = 55;
  const startAngleRad = startAngleDeg * (Math.PI / 180);
  const endAngleRad = endAngleDeg * (Math.PI / 180);

  // Path calculations for SVG
  const startX = cx + r * Math.cos(startAngleRad);
  const startY = cy + r * Math.sin(startAngleRad);
  const endX = cx + r * Math.cos(endAngleRad);
  const endY = cy + r * Math.sin(endAngleRad);

  // Extend path slightly beyond nodes for aesthetic
  const extStartRad = (startAngleDeg - 10) * (Math.PI / 180);
  const extEndRad = (endAngleDeg + 10) * (Math.PI / 180);
  const bgPath = `M ${cx + r * Math.cos(extStartRad)} ${cy + r * Math.sin(extStartRad)} A ${r} ${r} 0 0 1 ${cx + r * Math.cos(extEndRad)} ${cy + r * Math.sin(extEndRad)}`;

  return (
    <section id="timeline" className="py-32 bg-transparent relative z-20 overflow-hidden">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative">

        <div className="text-right mb-20 md:mb-32 relative z-30">
          <h2 className="text-sm md:text-base font-semibold text-gray-400 uppercase tracking-[0.4em] mb-4">
            Next Gen Buildathon
          </h2>
          <h2 className="text-5xl md:text-7xl font-black uppercase tracking-widest text-transparent bg-clip-text bg-gradient-to-r from-gray-100 to-gray-400 drop-shadow-[0_0_20px_rgba(255,255,255,0.1)]">
            EVENT FLOW
          </h2>
        </div>

        {/* The true Orbital Area */}
        <div className="relative w-full aspect-[2/3] md:aspect-square lg:aspect-[4/3] max-h-[1400px] min-h-[1100px] mt-10">

          {/* Orbital SVG Background Ring */}
          <svg viewBox={`0 0 ${viewBoxWidth} ${viewBoxHeight}`} preserveAspectRatio="none" className="absolute inset-0 w-full h-full pointer-events-none z-0">
            {/* Faint Outer Ring */}
            <path d={`M ${cx + (r + 50) * Math.cos(extStartRad)} ${cy + (r + 50) * Math.sin(extStartRad)} A ${r + 50} ${r + 50} 0 0 1 ${cx + (r + 50) * Math.cos(extEndRad)} ${cy + (r + 50) * Math.sin(extEndRad)}`} fill="none" stroke="rgba(37, 99, 235, 0.05)" strokeWidth="1" />

            {/* Core Orbital Path - Exactly intersecting the nodes */}
            <path d={bgPath} fill="none" stroke="rgba(37, 99, 235, 0.2)" strokeWidth="3" />

            {/* Inner Faint Ring */}
            <path d={`M ${cx + (r - 50) * Math.cos(extStartRad)} ${cy + (r - 50) * Math.sin(extStartRad)} A ${r - 50} ${r - 50} 0 0 1 ${cx + (r - 50) * Math.cos(extEndRad)} ${cy + (r - 50) * Math.sin(extEndRad)}`} fill="none" stroke="rgba(37, 99, 235, 0.05)" strokeWidth="1" />
          </svg>

          {/* Absolute HTML Layout Container corresponding exactly to SVG coordinates */}
          <div className="absolute inset-0 z-10">
            {events.map((ev, index) => {
              const isActive = ev.id === activeId;

              // Calculate radial position
              const angleDeg = startAngleDeg + (endAngleDeg - startAngleDeg) * (index / (events.length - 1 || 1));
              const angleRad = angleDeg * (Math.PI / 180);

              const x = cx + r * Math.cos(angleRad);
              const y = cy + r * Math.sin(angleRad);

              // Map (X, Y) to percentages of viewBox for responsive absolute positioning
              const leftPercent = ((x / viewBoxWidth) * 100).toFixed(3);
              const topPercent = ((y / viewBoxHeight) * 100).toFixed(3);

              return (
                <motion.div
                  key={ev.id}
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{ delay: index * 0.1, duration: 0.6 }}
                  className="absolute flex items-center group"
                  // Anchor strictly to the right side so it never overflows horizontally on mobile
                  style={{
                    left: `${leftPercent}%`,
                    right: '0%',
                    top: `${topPercent}%`,
                    transform: 'translate(-28px, -50%)', // Center the 56px (w-14) orb exactly on the line
                  }}
                >

                  {/* The Orb Node on the exact curve */}
                  <div className="relative shrink-0">
                    <div className={`w-14 h-14 rounded-full flex items-center justify-center font-bold text-lg border-2 backdrop-blur-md transition-all duration-500 z-10 ${isActive
                        ? 'border-[#ff9d5c] text-[#ff9d5c] bg-[#02050A]/80 shadow-[0_0_30px_rgba(255,157,92,0.4)]'
                        : 'border-[#163B6E] text-gray-400 bg-[#061121]/50 group-hover:border-blue-400 group-hover:text-blue-300'
                      }`}>
                      0{index + 1}
                    </div>
                    {/* Glowing dot on active */}
                    {isActive && (
                      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-4 h-4 bg-[#ff9d5c] rounded-full shadow-[0_0_20px_#ff9d5c] z-20" />
                    )}
                  </div>

                  {/* Connecting Line - Connecting node outward to card */}
                  <div className={`w-6 sm:w-12 h-[2px] shrink-0 transition-colors duration-500 ${isActive ? 'bg-gradient-to-r from-[#ff9d5c] to-[#0F284C]' : 'bg-[#163B6E]'}`} />

                  {/* Glassmorphic Info Panel (Fanning outward) */}
                  <div className={`flex-1 px-6 py-5 md:px-8 md:py-6 rounded-2xl md:rounded-3xl border backdrop-blur-xl transition-all duration-500 flex flex-col justify-center gap-1 ${isActive
                      ? 'bg-[#0F284C]/80 border-[#ff9d5c]/50 shadow-[0_0_40px_rgba(255,157,92,0.15)]'
                      : 'bg-[#061121]/50 border-[#163B6E]/40 hover:bg-[#0A1C36]/70 hover:border-blue-500/50 hover:shadow-[0_10px_30px_rgba(59,130,246,0.1)]'
                    }`}>
                    <h3 className={`text-base md:text-xl font-bold tracking-wide transition-colors ${isActive ? 'text-white' : 'text-gray-200'}`}>
                      {ev.stage_name}
                    </h3>
                    <div className={`text-xs md:text-base font-light ${isActive ? 'text-[#ff9d5c]/80' : 'text-gray-400'}`}>
                      {ev.date_time}
                    </div>
                  </div>

                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
