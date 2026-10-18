import codecs

code = r\"\"\"\"use client\";

import { useState, useEffect } from \"react\";
import { Menu, X, ChevronRight, Megaphone, ExternalLink } from \"lucide-react\";
import { motion, AnimatePresence } from \"framer-motion\";
import { fetchAnnouncements } from \"../app/actions\";

export default function Navigation({ cta }: any) {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  
  // Announcements State
  const [isAnnouncementsOpen, setIsAnnouncementsOpen] = useState(false);
  const [announcements, setAnnouncements] = useState<any[]>([]);
  const [loadingAnnouncements, setLoadingAnnouncements] = useState(false);

  // Track scroll to hide CTA button
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 100);
    };
    window.addEventListener(\"scroll\", handleScroll);
    return () => window.removeEventListener(\"scroll\", handleScroll);
  }, []);

  // Fetch announcements when panel opens
  useEffect(() => {
    if (isAnnouncementsOpen) {
      setLoadingAnnouncements(true);
      fetchAnnouncements().then(data => {
        setAnnouncements(data || []);
        setLoadingAnnouncements(false);
      });
    }
  }, [isAnnouncementsOpen]);

  // Use the CTA url from CMS, fallback to '#' if none provided
  const targetUrl = cta?.url || \"#\";

  return (
    <>
      <motion.nav 
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ type: \"spring\", bounce: 0, duration: 1 }}
        className=\"fixed top-0 left-0 w-full z-50 px-4 py-6\"
      >
        <div className=\"max-w-7xl mx-auto relative\">
          <div className=\"backdrop-blur-md bg-[#02050A]/60 border border-[#1e3a8a]/30 rounded-full px-6 py-3 flex items-center justify-between shadow-[0_0_30px_rgba(30,58,138,0.15)] relative z-50\">
            
            {/* Left: Hamburger & Logo */}
            <div className=\"flex items-center gap-4\">
              <button 
                className=\"text-white p-2 hover:text-[#e84e1b] transition-colors\"
                onClick={() => setIsOpen(true)}
              >
                <Menu size={24} />
              </button>
              
              <div className=\"flex items-center gap-2\">
                <span className=\"font-serif font-black text-xl text-white tracking-widest uppercase\">Mind<span className=\"text-transparent bg-clip-text bg-gradient-to-r from-[#1e3a8a] to-[#ea580c]\">Mesh</span></span>
              </div>
            </div>

            {/* Desktop Menu */}
            <div className=\"hidden md:flex items-center gap-8\">
              <button onClick={() => setIsAnnouncementsOpen(!isAnnouncementsOpen)} className={\lex items-center gap-2 text-xs font-bold tracking-[0.2em] transition-colors uppercase \\}>
                <Megaphone size={16} className={isAnnouncementsOpen ? 'animate-pulse' : ''} />
                Announcements
              </button>
              <button onClick={() => document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' })} className=\"text-xs font-semibold tracking-[0.2em] text-[#9CA3AF] hover:text-white transition-colors uppercase\">About</button>
              <button onClick={() => document.getElementById('domains')?.scrollIntoView({ behavior: 'smooth' })} className=\"text-xs font-semibold tracking-[0.2em] text-[#9CA3AF] hover:text-white transition-colors uppercase\">Domains</button>
              <button onClick={() => document.getElementById('timeline')?.scrollIntoView({ behavior: 'smooth' })} className=\"text-xs font-semibold tracking-[0.2em] text-[#9CA3AF] hover:text-white transition-colors uppercase\">Timeline</button>
              <button onClick={() => document.getElementById('faq')?.scrollIntoView({ behavior: 'smooth' })} className=\"text-xs font-semibold tracking-[0.2em] text-[#9CA3AF] hover:text-white transition-colors uppercase\">FAQ</button>
            </div>

            {/* Right: Register Now (Hides on Scroll & Mobile) */}
            <div className=\"hidden md:flex items-center\" style={{ minWidth: \"160px\", justifyContent: \"flex-end\" }}>
              <AnimatePresence>
                {!isScrolled && (
                  <motion.a 
                    href={targetUrl} 
                    target={targetUrl.startsWith('http') ? \"_blank\" : \"_self\"}
                    rel=\"noopener noreferrer\"
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    transition={{ duration: 0.2 }}
                    className=\"group flex items-center gap-2 border border-[#e84e1b]/50 text-[#ff9d5c] hover:bg-[#e84e1b]/10 px-4 py-2 sm:px-6 rounded-full font-bold transition-all text-xs sm:text-sm tracking-widest uppercase whitespace-nowrap\"
                  >
                    {cta?.label || \"Register Now\"}
                    <ChevronRight size={16} className=\"group-hover:translate-x-1 transition-transform\" />
                  </motion.a>
                )}
              </AnimatePresence>
            </div>
            
            {/* Mobile Announcements Icon */}
            <div className=\"md:hidden flex items-center\">
              <button onClick={() => setIsAnnouncementsOpen(!isAnnouncementsOpen)} className={\p-2 transition-colors \\}>
                <Megaphone size={20} className={isAnnouncementsOpen ? 'animate-pulse' : ''} />
              </button>
            </div>

          </div>

          {/* ANNOUNCEMENTS DROPDOWN PANEL */}
          <AnimatePresence>
            {isAnnouncementsOpen && (
              <motion.div 
                initial={{ opacity: 0, y: -20, scaleY: 0.95 }}
                animate={{ opacity: 1, y: 0, scaleY: 1 }}
                exit={{ opacity: 0, y: -20, scaleY: 0.95 }}
                transition={{ duration: 0.3, ease: \"easeOut\" }}
                className=\"absolute top-[80px] left-0 w-full z-40 origin-top\"
              >
                <div className=\"bg-[#061121]/95 backdrop-blur-2xl border border-blue-900/50 rounded-3xl p-6 md:p-10 shadow-[0_20px_50px_rgba(2,5,10,0.8)] mx-2 md:mx-0\">
                  <div className=\"flex justify-between items-start mb-8 border-b border-blue-900/30 pb-6\">
                    <div>
                      <h4 className=\"text-xs font-bold text-orange-400 tracking-[0.3em] uppercase mb-1 flex items-center gap-2\">
                        <span className=\"w-2 h-2 rounded-full bg-orange-500 animate-pulse\"></span>
                        Transmission Log
                      </h4>
                      <h2 className=\"text-2xl md:text-3xl font-black text-white tracking-widest uppercase\">Announcements</h2>
                    </div>
                    <button onClick={() => setIsAnnouncementsOpen(false)} className=\"text-gray-400 hover:text-white p-2 bg-white/5 rounded-full transition-colors\">
                      <X size={24} />
                    </button>
                  </div>

                  {loadingAnnouncements ? (
                    <div className=\"flex justify-center py-10\">
                      <div className=\"w-8 h-8 border-2 border-orange-500 border-t-transparent rounded-full animate-spin\"></div>
                    </div>
                  ) : announcements.length === 0 ? (
                    <div className=\"text-center py-10\">
                      <Megaphone size={48} className=\"mx-auto text-gray-700 mb-4 opacity-50\" />
                      <p className=\"text-gray-500 font-medium tracking-wide\">No active announcements at this time.</p>
                    </div>
                  ) : (
                    <div className=\"flex overflow-x-auto pb-6 gap-6 snap-x hide-scrollbar\" style={{ scrollbarWidth: 'none' }}>
                      {announcements.map((ann, idx) => (
                        <motion.div 
                          key={ann.id}
                          initial={{ opacity: 0, x: 20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: idx * 0.1 }}
                          className=\"min-w-[280px] md:min-w-[350px] max-w-[400px] flex-shrink-0 snap-start bg-[#02050A] border border-blue-900/30 rounded-2xl p-6 flex flex-col h-full hover:border-orange-500/30 transition-colors group\"
                        >
                          <div className=\"text-xs font-black text-orange-400 tracking-widest uppercase mb-3 bg-orange-500/10 w-fit px-3 py-1 rounded-full border border-orange-500/20\">
                            {ann.date}
                          </div>
                          <h3 className=\"text-lg font-bold text-white mb-3 leading-snug group-hover:text-blue-300 transition-colors\">{ann.title}</h3>
                          <p className=\"text-sm text-gray-400 mb-6 leading-relaxed flex-grow\">{ann.desc}</p>
                          
                          {ann.btnText && ann.btnUrl && (
                            <div className=\"mt-auto pt-4 border-t border-blue-900/20\">
                              <a 
                                href={ann.btnUrl} 
                                target={ann.btnUrl.startsWith('http') ? \"_blank\" : \"_self\"}
                                rel=\"noopener noreferrer\"
                                className=\"inline-flex items-center gap-2 text-xs font-bold text-orange-400 hover:text-orange-300 uppercase tracking-widest transition-colors\"
                              >
                                {ann.btnText} <ExternalLink size={14} />
                              </a>
                            </div>
                          )}
                        </motion.div>
                      ))}
                    </div>
                  )}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </motion.nav>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.div 
            initial={{ opacity: 0, x: '-100%' }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: '-100%' }}
            transition={{ type: \"spring\", bounce: 0, duration: 0.6 }}
            className=\"fixed inset-0 z-[100] bg-[#02050A] flex flex-col px-6 py-8\"
          >
            <div className=\"flex justify-between items-center mb-12\">
              <span className=\"font-serif font-black text-xl text-white tracking-widest uppercase\">Menu</span>
              <button onClick={() => setIsOpen(false)} className=\"text-white p-2 bg-white/5 rounded-full\">
                <X size={24} />
              </button>
            </div>

            <div className=\"flex flex-col gap-8 flex-grow\">
              <button onClick={() => { setIsOpen(false); setIsAnnouncementsOpen(true); }} className=\"text-left text-2xl font-black tracking-widest text-orange-400 hover:text-orange-300 transition-colors uppercase flex items-center gap-4\">
                <Megaphone size={24} /> Announcements
              </button>
              <button onClick={() => { setIsOpen(false); document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' }) }} className=\"text-left text-2xl font-black tracking-widest text-[#9CA3AF] hover:text-white transition-colors uppercase\">About</button>
              <button onClick={() => { setIsOpen(false); document.getElementById('domains')?.scrollIntoView({ behavior: 'smooth' }) }} className=\"text-left text-2xl font-black tracking-widest text-[#9CA3AF] hover:text-white transition-colors uppercase\">Domains</button>
              <button onClick={() => { setIsOpen(false); document.getElementById('timeline')?.scrollIntoView({ behavior: 'smooth' }) }} className=\"text-left text-2xl font-black tracking-widest text-[#9CA3AF] hover:text-white transition-colors uppercase\">Timeline</button>
              <button onClick={() => { setIsOpen(false); document.getElementById('faq')?.scrollIntoView({ behavior: 'smooth' }) }} className=\"text-left text-2xl font-black tracking-widest text-[#9CA3AF] hover:text-white transition-colors uppercase\">FAQ</button>
              
              <div className=\"mt-auto\">
                <a 
                  href={targetUrl} 
                  target={targetUrl.startsWith('http') ? \"_blank\" : \"_self\"}
                  rel=\"noopener noreferrer\"
                  onClick={() => setIsOpen(false)}
                  className=\"w-full flex justify-center items-center gap-2 bg-[#e84e1b] hover:bg-[#d64312] text-white px-6 py-4 rounded-xl font-bold tracking-widest uppercase transition-colors\"
                >
                  {cta?.label || \"Register Team\"}
                </a>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
      
      <style jsx global>{\
        .hide-scrollbar::-webkit-scrollbar {
          display: none;
        }
      \}</style>
    </>
  );
}
\"\"\"

with codecs.open('c:/nxt__website/components/Navigation.tsx', 'w', 'utf-8') as f:
    f.write(code)
print('Fixed!')
