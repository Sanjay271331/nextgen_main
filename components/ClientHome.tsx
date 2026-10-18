"use client";

import { useState, useEffect } from "react";
import { ref, onValue } from "firebase/database";
import { db } from "../lib/firebase";
import IntroAnimation from "./IntroAnimation";
import Navigation from "./Navigation";
import ScrollJourney from "./ScrollJourney";
import DomainsSection from "./DomainsSection";
import OrbitalEventFlow from "./OrbitalEventFlow";
import FooterFAQ from "./FooterFAQ";
import RulesModal from "./RulesModal";
import { motion } from "framer-motion";
import { ChevronRight } from "lucide-react";

export default function ClientHome({ content: initialContent, buttons: initialButtons, events: initialEvents, domains: initialDomains, faqs: initialFaqs }: any) {
  const [introDone, setIntroDone] = useState(false);
  const [isRulesOpen, setIsRulesOpen] = useState(false);

  // Real-time states initialized with server-side props
  const [content, setContent] = useState(initialContent || {});
  const [buttons, setButtons] = useState(initialButtons || {});
  const [events, setEvents] = useState(initialEvents || []);
  const [domains, setDomains] = useState(initialDomains || []);
  const [faqs, setFaqs] = useState(initialFaqs || []);

  useEffect(() => {
    // Return early if Firebase is not configured (graceful degradation)
    if (!process.env.NEXT_PUBLIC_FIREBASE_DATABASE_URL) return;

    const cmsRef = ref(db, 'cms');
    const unsubscribe = onValue(cmsRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        if (data.content) setContent(data.content);
        if (data.buttons) setButtons(data.buttons);
        if (data.events) setEvents(Object.values(data.events));
        if (data.domains) setDomains(Object.values(data.domains));
        if (data.faqs) setFaqs(Object.values(data.faqs));
      }
    });

    return () => unsubscribe();
  }, []);

  const submitPptUrl = 'https://submisions.vercel.app/';

  return (
    <div className="relative min-h-screen bg-[#02050A]">
      <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden">
        <div className="absolute inset-0 bg-grid-pattern opacity-50" />
        <motion.div 
          className="absolute top-[10%] left-[-10%] w-[50vw] h-[50vw] max-w-[800px] max-h-[800px] bg-blue-900/10 rounded-full blur-3xl md:blur-[120px]"
          animate={{ x: [0, 50, 0], y: [0, 30, 0] }}
          transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div 
          className="absolute bottom-[-10%] right-[-10%] w-[60vw] h-[60vw] max-w-[1000px] max-h-[1000px] bg-[#0A1C36]/30 rounded-full blur-3xl md:blur-[120px]"
          animate={{ x: [0, -50, 0], y: [0, -30, 0] }}
          transition={{ duration: 25, repeat: Infinity, ease: "easeInOut", delay: 2 }}
        />
        <motion.div 
          className="absolute top-[50%] left-[20%] w-[40vw] h-[40vw] max-w-[600px] max-h-[600px] bg-[#e84e1b]/5 rounded-full blur-3xl md:blur-[100px]"
          animate={{ scale: [1, 1.1, 1], opacity: [0.3, 0.5, 0.3] }}
          transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
        />
        <div className="absolute inset-0 bg-noise mix-blend-overlay opacity-30" />
      </div>

      {!introDone && <IntroAnimation onComplete={() => setIntroDone(true)} content={content} />}
      
      <div className={`transition-opacity duration-1000 ${introDone ? 'opacity-100' : 'opacity-0 h-screen overflow-hidden'} relative z-10`}>
        <Navigation />
        
        <main className="relative bg-transparent">
          <ScrollJourney content={content} />
          
          <div className="relative z-20">
            <DomainsSection content={content} domains={domains} />
            
            <div className="w-full flex flex-col sm:flex-row justify-center items-center gap-4 sm:gap-6 pb-24 pt-8 relative z-30 px-4">
              <a 
                href={submitPptUrl} 
                target="_self"
                rel="noopener noreferrer"
                className="group flex items-center justify-center gap-4 bg-[#e84e1b] hover:bg-[#d64312] text-white px-6 sm:px-10 py-4 sm:py-5 rounded-full font-black tracking-[0.15em] sm:tracking-[0.2em] uppercase transition-all shadow-[0_0_40px_rgba(232,78,27,0.4)] hover:shadow-[0_0_60px_rgba(232,78,27,0.6)] hover:scale-105 text-xs sm:text-base w-full sm:w-auto text-center"
              >
                <span>SUBMIT YOUR IDEA</span>
                <ChevronRight size={24} className="group-hover:translate-x-2 transition-transform" />
              </a>


              <button 
                onClick={() => setIsRulesOpen(true)}
                className="group flex items-center justify-center gap-2 bg-transparent border border-blue-500/50 hover:bg-blue-900/40 text-blue-300 hover:text-white px-6 sm:px-10 py-4 sm:py-5 rounded-full font-bold tracking-[0.15em] sm:tracking-[0.2em] uppercase transition-all text-xs sm:text-base w-full sm:w-auto text-center"
              >
                READ THE RULES
              </button>
            </div>

            <OrbitalEventFlow events={events} />
            <FooterFAQ faqs={faqs} content={content} openRules={() => setIsRulesOpen(true)} />
          </div>
        </main>
      </div>
      
      <RulesModal isOpen={isRulesOpen} onClose={() => setIsRulesOpen(false)} />
    </div>
  );
}
