"use client";

import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";
import { useEffect } from "react";

interface RulesModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function RulesModal({ isOpen, onClose }: RulesModalProps) {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => { document.body.style.overflow = "unset"; };
  }, [isOpen]);

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/80 backdrop-blur-sm z-[100]"
            onClick={onClose}
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }} animate={{ opacity: 1, scale: 1, y: 0 }} exit={{ opacity: 0, scale: 0.95, y: 20 }}
            className="fixed inset-4 md:inset-10 lg:inset-20 z-[101] flex flex-col bg-[#061121] border border-blue-900/50 rounded-2xl md:rounded-3xl shadow-2xl overflow-hidden"
          >
            <div className="flex items-center justify-between p-6 md:p-8 border-b border-blue-900/30 bg-[#02050A]">
              <h2 className="text-lg md:text-2xl font-black text-white tracking-widest uppercase">
                Registration, PPT Submission & Shortlisting Rules
              </h2>
              <button onClick={onClose} className="p-2 text-gray-400 hover:text-white bg-white/5 hover:bg-white/10 rounded-full transition-colors">
                <X size={24} />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto p-6 md:p-10 hide-scrollbar" style={{ scrollbarWidth: 'thin', scrollbarColor: '#1e3a8a transparent' }}>
              <div className="max-w-4xl mx-auto space-y-12 text-gray-300">
                <section>
                  <h3 className="text-xl md:text-2xl font-bold text-orange-400 mb-6 border-b border-orange-500/20 pb-2">Registration</h3>
                  <div className="space-y-6">
                    <div><h4 className="text-base md:text-lg font-bold text-white">1. Registration Opens</h4><p className="mt-1 leading-relaxed text-gray-400">Registration begins on 18 September 2026 at 8:00 AM.</p></div>
                    <div><h4 className="text-base md:text-lg font-bold text-white">2. Team Size & Composition</h4><p className="mt-1 leading-relaxed text-gray-400">Each team must have a minimum of 2 members and a maximum of 4 members. Teams can include participants from different colleges, branches, and courses, including Engineering, MCA, BCA, and other eligible courses.</p></div>
                    <div><h4 className="text-base md:text-lg font-bold text-white">3. Team Name</h4><p className="mt-1 leading-relaxed text-gray-400">A team name is compulsory and cannot be changed after registration. Please check the team name carefully before submitting.</p></div>
                    <div><h4 className="text-base md:text-lg font-bold text-white">4. Choose Your Domain</h4><p className="mt-1 leading-relaxed text-gray-400">Each team must select one domain during registration. The selected domain will be considered the team's domain for the hackathon.</p></div>
                    <div><h4 className="text-base md:text-lg font-bold text-white">5. Email ID</h4><p className="mt-1 leading-relaxed text-gray-400">The same email ID cannot be used for more than one team registration. The registration form will prevent submission if an already-used email ID is entered.</p></div>
                    <div><h4 className="text-base md:text-lg font-bold text-white">6. Open Problem Statement</h4><p className="mt-1 leading-relaxed text-gray-400">Teams must choose one domain, but they are free to identify and work on any problem statement within their selected domain.</p></div>
                    <div><h4 className="text-base md:text-lg font-bold text-white">7. Registration Confirmation</h4><p className="mt-1 leading-relaxed text-gray-400">A registration confirmation email will be sent to the email ID provided during registration after successful submission.</p></div>
                    <div><h4 className="text-base md:text-lg font-bold text-white">8. Registration Deadline</h4><p className="mt-1 leading-relaxed text-gray-400">Registration closes on 18 October 2026 at 12:00 PM.</p></div>
                  </div>
                </section>
                <section>
                  <h3 className="text-xl md:text-2xl font-bold text-orange-400 mb-6 border-b border-orange-500/20 pb-2">PPT Submission</h3>
                  <div className="space-y-6">
                    <div><h4 className="text-base md:text-lg font-bold text-white">1. PPT Submission Begins</h4><p className="mt-1 leading-relaxed text-gray-400">PPT submission begins on 18 October 2026 at 1:00 PM.</p></div>
                    <div><h4 className="text-base md:text-lg font-bold text-white">2. One PPT Per Team</h4><p className="mt-1 leading-relaxed text-gray-400">Only one PPT is allowed per team. The team leader must submit the PPT on behalf of the entire team.</p></div>
                    <div><h4 className="text-base md:text-lg font-bold text-white">3. Domain Consistency</h4><p className="mt-1 leading-relaxed text-gray-400">The domain selected during registration cannot be changed. The PPT must be based on the same domain selected during registration.</p></div>
                    <div><h4 className="text-base md:text-lg font-bold text-white">4. PPT Submission Deadline</h4><p className="mt-1 leading-relaxed text-gray-400">The final deadline for PPT submission is 20 October 2026 at 11:59 PM.</p></div>
                    <div><h4 className="text-base md:text-lg font-bold text-white">5. PPT Template</h4><p className="mt-1 leading-relaxed text-gray-400">The official PPT template will be available in the website's Announcements section from 25 September 2026. Further PPT submission guidelines will be provided along with the template.</p></div>
                  </div>
                </section>
                <section>
                  <h3 className="text-xl md:text-2xl font-bold text-orange-400 mb-6 border-b border-orange-500/20 pb-2">Shortlisting & Payment</h3>
                  <div className="space-y-6">
                    <div><h4 className="text-base md:text-lg font-bold text-white">1. Shortlisting Announcement</h4><p className="mt-1 leading-relaxed text-gray-400">The list of shortlisted teams will be published on the official website and will also be sent to the email ID provided during registration on 28 October 2026 at 4:00 PM.</p></div>
                    <div><h4 className="text-base md:text-lg font-bold text-white">2. Payment for Shortlisted Teams</h4><p className="mt-1 leading-relaxed text-gray-400">Only officially shortlisted teams are required to pay the ₹900 registration fee per team. Payment instructions will be sent separately to the registered email ID.</p></div>
                    <div><h4 className="text-base md:text-lg font-bold text-white">3. Payment Deadline</h4><p className="mt-1 leading-relaxed text-gray-400">The payment must be completed by 30 October 2026 at 11:59 PM.</p></div>
                    <div><h4 className="text-base md:text-lg font-bold text-white">4. Waiting List & Payment Failure</h4><p className="mt-1 leading-relaxed text-gray-400">If a shortlisted team fails to complete the payment within the specified deadline, its slot will be forfeited, and teams on the waiting list may be given an opportunity to participate.</p></div>
                    <div><h4 className="text-base md:text-lg font-bold text-white">5. Offline Hackathon Eligibility</h4><p className="mt-1 leading-relaxed text-gray-400">Only teams that are officially shortlisted and complete the required payment within the deadline will be eligible to participate in the offline hackathon on 26–27 November 2026.</p></div>
                    <div><h4 className="text-base md:text-lg font-bold text-white">6. Official Communication</h4><p className="mt-1 leading-relaxed text-gray-400">Important updates regarding registration, PPT submission, shortlisting, payment, and the offline hackathon will be communicated through the official website and the registered email ID.</p></div>
                  </div>
                </section>
              </div>
            </div>
            <div className="p-4 md:p-6 border-t border-blue-900/30 bg-[#02050A] flex justify-end">
              <button onClick={onClose} className="px-6 py-2 md:px-8 md:py-3 bg-[#e84e1b] hover:bg-[#d64312] text-white font-bold tracking-widest uppercase rounded-full transition-colors text-sm md:text-base">
                Close Rules
              </button>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
