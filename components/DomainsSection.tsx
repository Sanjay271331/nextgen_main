"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown } from "lucide-react";

export default function DomainsSection({ content, domains: _deprecatedDomains }: any) {
  
  const domains = [
    {
      id: "dom1", number: "01", title: "NEXTGEN",
      description: (
        <div className="space-y-4">
          <p className="font-bold text-[#D8A48F] uppercase tracking-widest text-base">Building Tomorrow, Today</p>
          <p>A space for emerging, advanced, and futuristic technologies that are shaping the next generation of innovation. Participants can explore fields such as Quantum Computing, Cybersecurity, Space Technology, Defence Technology, Semiconductor Technology & VLSI, Advanced Computing, Nanotechnology, Autonomous Systems, Advanced Manufacturing, Future Mobility, AR/VR, Digital Communication, Photonics, Neurotechnology, Human-Computer Interaction, Geospatial Technology, and other emerging technologies to develop innovative solutions for challenges of the future.</p>
          <p>The problem statement does not have to be limited to the examples listed above. Any idea or problem statement based on an emerging or futuristic technology can be explored under this domain.</p>
        </div>
      )
    },
    {
      id: "dom2", number: "02", title: "ARTIFICIAL INTELLIGENCE & INTELLIGENT SYSTEMS",
      description: (
        <p>A software-focused domain dedicated to building intelligent systems that can learn, understand, reason, predict, and adapt. Participants can explore Machine Learning, Generative AI, Natural Language Processing, Computer Vision, Deep Learning, AI Agents, Recommendation Systems, Predictive Analytics, Speech & Audio Intelligence, Intelligent Automation, Decision Support Systems, Multimodal AI, Knowledge Systems, and other AI-driven applications to solve real-world problems.</p>
      )
    },
    {
      id: "dom3", number: "03", title: "IoT & EMBEDDED SYSTEMS",
      description: (
        <p>A domain where hardware, software, sensors, connectivity, and intelligent devices come together to create solutions that interact with the physical world. Explore IoT, embedded systems, smart devices, sensor networks, automation, edge computing, real-time systems, industrial systems, connected vehicles, smart homes, smart infrastructure, wearable devices, environmental monitoring, and other connected hardware solutions.</p>
      )
    },
    {
      id: "dom4", number: "04", title: "FINTECH",
      description: (
        <div className="space-y-4">
          <p className="font-bold text-[#D8A48F] uppercase tracking-widest text-base">Financial Technology</p>
          <p>A technology-driven domain focused on transforming the way financial services are created, accessed, managed, and secured. Explore digital payments, digital banking, financial management, lending and credit, investment and wealth management, insurance technology, fraud detection, financial cybersecurity, risk management, financial inclusion, RegTech, digital identity, blockchain-based finance, personal finance, and other technology-enabled financial solutions.</p>
        </div>
      )
    },
    {
      id: "dom5", number: "05", title: "SUSTAINABLE INNOVATION",
      description: (
        <p>A domain focused on using innovation and technology to build a more sustainable, resilient, and environmentally responsible future. Explore challenges across climate action, renewable energy, waste management, recycling, water conservation, sustainable agriculture, rural development, food security, biodiversity and wildlife conservation, sustainable transportation, green buildings, sustainable cities and urban management, circular economy, resource efficiency, pollution control, environmental monitoring, disaster resilience, and other areas of sustainable development.</p>
      )
    }
  ];

  const [openId, setOpenId] = useState<string | null>(domains[0].id);

  const toggle = (id: string) => {
    setOpenId(openId === id ? null : id);
  };

  return (
    <section id="domains" className="pt-56 pb-32 bg-transparent relative z-20 overflow-hidden">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* 1. Pre-Motto Statement (Cinematic Unified Quote) */}
        <div className="relative text-center max-w-5xl mx-auto mb-40 px-4">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 1.2, ease: "easeOut" }}
            className="relative z-10 flex flex-col items-center"
          >
            <h1 className="font-serif text-2xl md:text-3xl lg:text-4xl text-white tracking-[0.05em] leading-[1.6] md:leading-[1.8] uppercase font-bold drop-shadow-md max-w-4xl">
              Every domain has its own path, but<br />
              only one will rise as the <span className="text-[#D8A48F]">Ultimate Champion.</span>
            </h1>
            
            <div className="w-12 h-[1px] bg-[#D8A48F]/50 my-6 md:my-8" />
            
            <p className="text-xs md:text-sm lg:text-base text-gray-300 font-medium tracking-[0.15em] md:tracking-[0.2em] leading-relaxed uppercase max-w-3xl">
              What awaits beyond the final checkpoint is something<br className="hidden md:block" />
              you'll have to experience yourself.
            </p>
          </motion.div>
        </div>

        {/* DOMAINS SECTION HEADER */}
        <div className="text-center mb-16">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}
            className="text-3xl md:text-5xl font-black text-white uppercase tracking-widest mb-6"
          >
            DOMAINS
          </motion.h2>
          <motion.h3 
            initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6, delay: 0.2 }}
            className="text-base md:text-lg font-bold text-gray-300 uppercase tracking-widest max-w-2xl mx-auto"
          >
            Choose your domain wisely—it defines your journey to the championship.
          </motion.h3>
        </div>

        {/* 2. Interactive Accordion Domain Cards */}
        <div className="space-y-4 mb-40">
          {domains.map((domain, i) => {
            const isOpen = openId === domain.id;
            return (
              <motion.div 
                key={domain.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className={`border rounded-2xl overflow-hidden transition-all duration-300 backdrop-blur-md ${
                  isOpen 
                    ? 'bg-[#0A1C36]/80 border-[#ff9d5c]/50 shadow-[0_0_30px_rgba(255,157,92,0.1)]' 
                    : 'bg-[#061121]/50 border-[#163B6E]/40 hover:bg-[#0A1C36]/60 hover:border-blue-500/50'
                }`}
              >
                <button
                  className="w-full px-6 py-6 md:px-8 md:py-8 text-left flex justify-between items-center focus:outline-none group"
                  onClick={() => toggle(domain.id)}
                >
                  <div className="flex items-center gap-6">
                    <span className={`text-2xl md:text-3xl font-black font-mono transition-colors ${isOpen ? 'text-[#ff9d5c]' : 'text-[#163B6E] group-hover:text-blue-400'}`}>
                      {domain.number}
                    </span>
                    <span className={`text-lg md:text-xl font-bold tracking-widest uppercase transition-colors ${isOpen ? 'text-white' : 'text-gray-300 group-hover:text-gray-100'}`}>
                      {domain.title}
                    </span>
                  </div>
                  <ChevronDown 
                    className={`w-6 h-6 text-blue-400 transition-transform duration-300 shrink-0 ${isOpen ? 'rotate-180 text-[#ff9d5c]' : ''}`}
                  />
                </button>
                
                <AnimatePresence>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.4, ease: "easeInOut" }}
                    >
                      <div className="px-6 md:px-8 pb-8 pt-0 text-gray-400 text-sm md:text-base leading-loose font-light border-t border-[#163B6E]/20 mt-2 pt-6">
                        {domain.description}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}
        </div>

        {/* POST-DOMAIN STATEMENTS */}
        <div className="flex flex-col items-center text-center space-y-24 border-t border-[#163B6E]/20 pt-32 relative z-10">

          <motion.h2 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 1, ease: "easeOut", delay: 0.2 }}
            className="text-xl md:text-2xl font-semibold text-transparent bg-clip-text bg-gradient-to-r from-[#facc15] to-[#e84e1b] uppercase tracking-[0.15em] leading-loose drop-shadow-[0_0_20px_rgba(232,78,27,0.3)] max-w-4xl"
          >
            EVERY DOMAIN WILL CELEBRATE ITS CHAMPIONS, BUT ONLY ONE WILL RISE ABOVE THEM ALL.
          </motion.h2>

          <motion.div 
            initial={{ opacity: 0, scale: 0.98, y: 30 }}
            whileInView={{ opacity: 1, scale: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 1.2, ease: "easeOut", delay: 0.4 }}
            className="p-8 md:p-12 w-full max-w-4xl mx-auto border border-white/10 bg-[#02050A]/40 rounded-[2rem] backdrop-blur-3xl shadow-[inset_0_1px_20px_rgba(255,255,255,0.03),_0_20px_50px_rgba(0,0,0,0.5)]"
          >
            <h3 className="text-lg md:text-xl font-bold text-white uppercase tracking-widest mb-6">
              BUILD YOUR WAY
            </h3>
            <p className="text-sm md:text-base text-gray-300 leading-loose font-light tracking-[0.1em] text-center">
              Build your idea with software, hardware, or a combination of both—it's your choice, depending on the domain you choose and the problem you aim to solve.
            </p>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
