"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function FooterFAQ({ faqs: _deprecatedFaqs, content, openRules }: any) {

  const faqs = [
    { id: 'faq-1', question: '1. What is NextGen Buildathon 2026?', answer: 'NextGen Buildathon 2026 is a 24-hour national-level buildathon where participants build innovative solutions across multiple technology domains.' },
    { id: 'faq-2', question: '2. When and where is the buildathon?', answer: 'The buildathon will be held on 26–27 November 2026 at VVCE, Mysuru, Karnataka.' },
    { id: 'faq-3', question: '3. Who can participate?', answer: 'Students from colleges and universities across India can participate.' },
    { id: 'faq-4', question: '4. What is the team size?', answer: 'Each team must have 2–4 members.' },
    { id: 'faq-5', question: '5. Is there any registration fee?', answer: 'No. Registration is free. Shortlisted teams will be required to pay ₹899 to confirm their participation.' },
    { id: 'faq-6', question: '6. Are problem statements provided by the organizers?', answer: 'No. Participants must identify and build their own problem statement and solution within a suitable domain.' },
    { id: 'faq-7', question: '7. What are the available domains?', answer: 'The five domains are NextGen, AI & Intelligent Systems, IoT & Embedded Systems, FinTech, and Sustainable Innovation.' },
    { id: 'faq-8', question: '8. Can we build a hardware project?', answer: 'Yes. Software, hardware, or hybrid projects are allowed, as long as they align with the selected domain.' },
    { id: 'faq-9', question: '9. Can students from different branches form a team?', answer: 'Yes. Interdisciplinary teams are welcome and encouraged.' },
    { id: 'faq-10', question: '10. Can we use any technology or programming language?', answer: 'Yes. Teams are free to choose the technologies, frameworks, and tools best suited to their solution.' },
    { id: 'faq-11', question: '11. Can we use AI tools while building our project?', answer: 'AI tools may be used according to the official event rules. Teams must understand and take responsibility for their implementation.' },
    { id: 'faq-12', question: '12. What happens after registration?', answer: 'Registered teams will go through the shortlisting process. Shortlisted teams will receive further instructions to confirm their participation.' },
    { id: 'faq-13', question: '13. What is the Domain Debate Championship?', answer: 'It is a special final-round challenge where shortlisted representatives from each domain compete through three rounds of discussion and reasoning.' },
    { id: 'faq-14', question: '14. What is the prize pool?', answer: 'The total prize pool is ₹1,00,000, including overall and domain-level prizes.' },
    { id: 'faq-15', question: '15. What will the judges evaluate?', answer: 'Projects will be evaluated based on factors such as innovation, problem relevance, technical implementation, functionality, feasibility, impact, and presentation.' }
  ];

  const [openId, setOpenId] = useState<string | null>(faqs[0].id);

  const toggle = (id: string) => {
    setOpenId(openId === id ? null : id);
  };

  return (
    <>
      <div id="faq" className="max-w-6xl mx-auto px-4 py-24 border-t border-blue-900/30">
        <div className="flex flex-col gap-12">
          <div className="w-full text-center">
            <h2 className="text-3xl font-black text-white uppercase tracking-widest mb-2">FAQ</h2>
            <h3 className="text-xl text-blue-300 font-bold mb-10">Got Questions?</h3>
          </div>

          <div className="w-full space-y-4">
            {faqs && faqs.length > 0 ? (
              faqs.map((faq: any) => (
                <div
                  key={faq.id}
                  className="border border-blue-900/30 bg-[#061121]/50 rounded-2xl overflow-hidden transition-all hover:border-orange-500/30"
                >
                  <button
                    className="w-full px-6 py-5 flex items-center justify-between text-left focus:outline-none"
                    onClick={() => toggle(faq.id)}
                  >
                    <span className="font-bold text-gray-200">{faq.question}</span>
                    <ChevronDown
                      className={`text-orange-400 transition-transform duration-300 ${openId === faq.id ? "rotate-180" : ""}`}
                      size={20}
                    />
                  </button>
                  <AnimatePresence>
                    {openId === faq.id && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3 }}
                      >
                        <div className="px-6 pb-5 text-gray-400 text-sm leading-relaxed border-t border-blue-900/20 pt-4">
                          {faq.answer}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              ))
            ) : (
              <p className="text-center text-gray-500 text-sm">No FAQs available at the moment.</p>
            )}
          </div>

          {/* Simple Clean Contact Text Block */}
          <div id="contact" className="w-full text-center mt-12 mb-8 scroll-mt-28">
            <div className="bg-[#061121] inline-block px-8 py-10 md:px-16 md:py-12 rounded-[2rem] border border-blue-900/50 shadow-[0_0_30px_rgba(22,59,110,0.2)]">
              <div className="flex flex-col items-center gap-4">
                <h4 className="text-lg md:text-xl font-black text-white tracking-[0.2em] uppercase">
                  FOR ANY QUERIES OR ASSISTANCE
                </h4>
                <p className="text-sm md:text-base font-bold text-gray-400 tracking-widest uppercase">
                  REACH OUT TO US AT:{' '}
                  <a
                    href="mailto:themindmeshvvce@gmail.com"
                    className="text-orange-400 hover:text-orange-300 transition-all duration-300 hover:drop-shadow-[0_0_8px_rgba(234,88,12,0.8)] hover:underline inline-block mt-2 sm:mt-0 lowercase"
                  >
                    themindmeshvvce@gmail.com
                  </a>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <footer className="border-t border-blue-900/30 bg-[#02050A] pt-20 pb-10 relative z-20">
        <div className="max-w-6xl mx-auto px-4">

          <div className="grid grid-cols-1 md:grid-cols-4 gap-12 lg:gap-16 mb-16">

            {/* 1. Brand & Socials & Email */}
            <div className="flex flex-col gap-8">
              <span className="font-serif font-black text-3xl text-white tracking-widest uppercase">
                Mind<span className="text-[#D8A48F]">Mesh</span>
              </span>

              <div>
                <h4 className="text-xs font-bold text-blue-300 uppercase tracking-widest mb-3 border-b border-blue-900/30 pb-2">Email</h4>
                <a href="mailto:themindmeshvvce@gmail.com" className="text-sm text-gray-300 hover:text-orange-400 transition-colors tracking-wide font-medium">themindmeshvvce@gmail.com</a>
              </div>

              <div>
                <h4 className="text-xs font-bold text-blue-300 uppercase tracking-widest mb-3 border-b border-blue-900/30 pb-2">Social Links</h4>
                <ul className="space-y-3 text-sm text-gray-300 font-medium">
                  <li>
                    <a href="https://www.instagram.com/mind_mesh_vvce" target="_blank" rel="noopener noreferrer" className="block py-2 hover:text-orange-400 transition-colors">Instagram — MindMesh VVCE</a>
                  </li>
                  <li>
                    <a href="https://www.instagram.com/next_gen_buildathon" target="_blank" rel="noopener noreferrer" className="block py-2 hover:text-orange-400 transition-colors">Instagram — NextGen Buildathon</a>
                  </li>
                  <li>
                    <a href="https://www.linkedin.com/company/the-mind-mesh/" target="_blank" rel="noopener noreferrer" className="block py-2 hover:text-orange-400 transition-colors">LinkedIn</a>
                  </li>
                </ul>
              </div>
            </div>

            {/* 2. Quick Links */}
            <div className="flex flex-col gap-4">
              <h4 className="text-sm font-bold text-[#D8A48F] uppercase tracking-widest border-b border-blue-900/30 pb-2">Quick Links</h4>
              <ul className="space-y-3 text-sm text-gray-400 font-medium tracking-wide">
                <li><button onClick={() => document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' })} className="block py-2 w-full text-left hover:text-white transition-colors">About</button></li>
                <li><button onClick={() => document.getElementById('domains')?.scrollIntoView({ behavior: 'smooth' })} className="block py-2 w-full text-left hover:text-white transition-colors">Domains</button></li>
                <li><button onClick={() => document.getElementById('timeline')?.scrollIntoView({ behavior: 'smooth' })} className="block py-2 w-full text-left hover:text-white transition-colors">Timeline</button></li>
                <li><button onClick={openRules} className="block py-2 w-full text-left hover:text-white transition-colors">Rules</button></li>
                <li><button onClick={() => document.getElementById('faq')?.scrollIntoView({ behavior: 'smooth' })} className="block py-2 w-full text-left hover:text-white transition-colors">FAQ</button></li>
                <li><button onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })} className="block py-2 w-full text-left hover:text-white transition-colors">Contact Us</button></li>
                <li className="pt-2"><a href="/privacy-policy.pdf" target="_blank" rel="noopener noreferrer" className="block py-2 w-full text-left text-blue-300 hover:text-white transition-colors">Policy</a></li>
                <li><a href="/terms-and-conditions.pdf" target="_blank" rel="noopener noreferrer" className="block py-2 w-full text-left text-blue-300 hover:text-white transition-colors">Terms & Conditions</a></li>
              </ul>
            </div>

            {/* 3. Student Coordinators */}
            <div className="md:col-span-2 flex flex-col gap-4">
              <h4 className="text-sm font-bold text-[#D8A48F] uppercase tracking-widest border-b border-blue-900/30 pb-2">Student Coordinators</h4>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-12 gap-y-5 text-sm font-medium tracking-wide mt-2">
                <div className="flex justify-between items-center sm:items-start lg:items-center sm:flex-col lg:flex-row border-b border-blue-900/10 pb-2 sm:pb-0 sm:border-0">
                  <span className="text-blue-100">Likhitha C K</span>
                  <a href="tel:+918904125495" className="inline-block py-2 text-orange-400 hover:text-orange-300 transition-colors">+91 89041 25495</a>
                </div>
                <div className="flex justify-between items-center sm:items-start lg:items-center sm:flex-col lg:flex-row border-b border-blue-900/10 pb-2 sm:pb-0 sm:border-0">
                  <span className="text-blue-100">Satvik T H</span>
                  <a href="tel:+917411504338" className="inline-block py-2 text-orange-400 hover:text-orange-300 transition-colors">+91 74115 04338</a>
                </div>
                <div className="flex justify-between items-center sm:items-start lg:items-center sm:flex-col lg:flex-row border-b border-blue-900/10 pb-2 sm:pb-0 sm:border-0">
                  <span className="text-blue-100">Sanjay A</span>
                  <a href="tel:+919448404451" className="inline-block py-2 text-orange-400 hover:text-orange-300 transition-colors">+91 94484 04451</a>
                </div>
                <div className="flex justify-between items-center sm:items-start lg:items-center sm:flex-col lg:flex-row border-b border-blue-900/10 pb-2 sm:pb-0 sm:border-0">
                  <span className="text-blue-100">Shree Priya N S</span>
                  <a href="tel:+919632978754" className="inline-block py-2 text-orange-400 hover:text-orange-300 transition-colors">+91 96329 78754</a>
                </div>
                <div className="flex justify-between items-center sm:items-start lg:items-center sm:flex-col lg:flex-row border-b border-blue-900/10 pb-2 sm:pb-0 sm:border-0">
                  <span className="text-blue-100">Rakesh</span>
                  <a href="tel:+917411747496" className="inline-block py-2 text-orange-400 hover:text-orange-300 transition-colors">+91 74117 47496</a>
                </div>
                <div className="flex justify-between items-center sm:items-start lg:items-center sm:flex-col lg:flex-row border-b border-blue-900/10 pb-2 sm:pb-0 sm:border-0">
                  <span className="text-blue-100">Sameeksha GM</span>
                  <a href="tel:+918073613057" className="inline-block py-2 text-orange-400 hover:text-orange-300 transition-colors">+91 80736 13057</a>
                </div>
              </div>
            </div>

          </div>

          <div className="text-center text-xs text-gray-600 font-bold tracking-widest uppercase border-t border-blue-900/30 pt-8">
            © 2026 NextGen Build-a-thon. All rights reserved.
          </div>
        </div>
      </footer>
    </>
  );
}
