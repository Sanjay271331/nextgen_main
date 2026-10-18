"use client";

import { motion } from "framer-motion";

export default function EventFlow({ events }: any) {
  return (
    <section id="event-flow" className="py-24 bg-[#0a1128]">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-4xl md:text-5xl font-black text-center text-white mb-16 uppercase tracking-widest">
          Event Flow
        </h2>

        <div className="relative border-l-4 border-blue-900 ml-4 md:ml-12 space-y-12">
          {events.map((ev: any, index: number) => {
            const isActive = ev.is_active;
            
            return (
              <motion.div 
                key={ev.id}
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.2 }}
                className="relative pl-8 md:pl-12"
              >
                {/* Timeline Dot */}
                <div 
                  className={`absolute -left-[14px] top-1.5 w-6 h-6 rounded-full border-4 border-[#0a1128] ${
                    isActive ? 'bg-[#e84e1b] shadow-[0_0_20px_#e84e1b]' : 'bg-blue-600'
                  }`} 
                />
                
                <div className={`p-6 rounded-xl border ${
                  isActive ? 'bg-[#122a4f] border-[#e84e1b] shadow-[0_0_30px_rgba(232,78,27,0.2)]' : 'bg-[#121e42] border-blue-800'
                }`}>
                  <h3 className={`text-2xl font-bold mb-2 ${isActive ? 'text-[#e84e1b]' : 'text-white'}`}>
                    {ev.stage_name}
                  </h3>
                  <div className="text-blue-300 font-mono">
                    {new Date(ev.date_time).toLocaleString('en-US', {
                      weekday: 'short', month: 'long', day: 'numeric', hour: '2-digit', minute:'2-digit'
                    })}
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
