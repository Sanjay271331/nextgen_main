"use client";

import { motion } from "framer-motion";

export default function AboutHighlights({ content }: any) {
  const primaryHighlights = [
    { label: "Prize Pool", value: content?.highlights?.prize },
    { label: "Domains", value: content?.highlights?.domains },
    { label: "Problem", value: content?.highlights?.problem },
    { label: "Venue", value: content?.highlights?.venue },
    { label: "Team Size", value: content?.highlights?.team },
    { label: "Duration", value: content?.highlights?.duration },
  ];

  const subCards = [
    "Open to All Branches",
    "Real-World Problems",
    "Learn & Grow",
    "Launch Your Ideas"
  ];

  return (
    <section id="about" className="py-24 bg-transparent relative z-20">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Intro Texts */}
        <div className="flex flex-col gap-16 mb-32">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            className="text-center max-w-4xl mx-auto"
          >
            <h2 className="text-3xl font-black text-blue-400 mb-6 uppercase tracking-widest">{content?.about?.mindmesh_title}</h2>
            <p className="text-gray-300 text-lg md:text-xl leading-relaxed font-light">
              {content?.about?.mindmesh_desc}
            </p>
          </motion.div>
          
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            className="text-center max-w-4xl mx-auto"
          >
            <h2 className="text-3xl font-black text-[#e84e1b] mb-6 uppercase tracking-widest">{content?.about?.nextgen_title}</h2>
            <p className="text-gray-300 text-lg md:text-xl leading-relaxed font-light">
              {content?.about?.nextgen_desc}
            </p>
          </motion.div>
        </div>

        {/* Highlights UI */}
        <div className="relative pt-12">
          {/* Central Focus */}
          <div className="flex justify-center items-center mb-16 relative z-10">
            <motion.div 
              className="bg-[#02050A] border border-blue-500/30 shadow-[0_0_50px_rgba(32,81,145,0.3)] rounded-full px-12 py-6 text-center"
              whileHover={{ scale: 1.05, boxShadow: "0 0 80px rgba(32,81,145,0.6)" }}
            >
              <h3 className="text-3xl md:text-5xl font-black text-transparent bg-clip-text bg-gradient-to-r from-blue-300 to-blue-100 uppercase tracking-wider">
                {content?.highlights?.date}
              </h3>
            </motion.div>
          </div>

          {/* Surrounding Cards */}
          <div className="grid grid-cols-2 md:grid-cols-3 gap-6 relative z-10 mb-12">
            {primaryHighlights.map((h, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="bg-[#0A1C36]/50 backdrop-blur-md p-6 rounded-xl border border-[#163B6E] text-center hover:bg-[#0F284C] transition-all hover:-translate-y-2 hover:shadow-[0_10px_30px_rgba(22,59,110,0.5)] group"
              >
                <div className="text-sm text-blue-400 mb-2 uppercase tracking-widest group-hover:text-blue-300">{h.label}</div>
                <div className="text-xl md:text-2xl font-bold text-gray-100 group-hover:text-white">{h.value}</div>
              </motion.div>
            ))}
          </div>

          {/* Sub Cards */}
          <div className="flex flex-wrap justify-center gap-4 relative z-10">
            {subCards.map((sub, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.4 + (i * 0.1) }}
                className="bg-[#02050A] px-6 py-3 rounded-full border border-gray-700/50 text-gray-400 text-sm font-semibold tracking-wider hover:border-blue-500 hover:text-blue-400 transition-colors cursor-default"
              >
                {sub}
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
