"use client";
import { useEffect, useState } from "react";
import { ref, onValue, set, push, remove, update } from "firebase/database";
import { db } from "../../lib/firebase";

// Fallback data
const fallbackContent = {
  title_1: "BUILD", title_2: "THE FUTURE",
  mindmesh_desc: "Join the ultimate 24-hour hackathon...",
  intro_desc: "NextGen Build-a-thon brings together...",
  stats_desc: "24 Hours - 50+ Teams - ?1,00,000+ Prizes",
  prize_pool: "?1,00,000+",
  about_1: "Push your limits...", about_2: "Collaborate...",
  team: "2-4 Members", duration: "24-Hour Hackathon", venue: "VVCE Campus",
  footer_coord1_name: "Yash", footer_coord1_phone: "+91 9113636746",
  footer_coord2_name: "Navaneeth", footer_coord2_phone: "+91 7204703252",
  footer_email: "navanieti.ece@nie.ac.in", footer_copyright: "- 2026 NextGen..."
};

export default function AdminPortal() {
  const [content, setContent] = useState<any>({});
  const [buttons, setButtons] = useState<any>({});
  const [events, setEvents] = useState<any[]>([]);
  const [domains, setDomains] = useState<any[]>([]);
  const [faqs, setFaqs] = useState<any[]>([]);
  const [announcements, setAnnouncements] = useState<any[]>([]);
  const [messages, setMessages] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Form states
  const [localContent, setLocalContent] = useState<any>({});
  const [btnLabel, setBtnLabel] = useState("REGISTER YOUR TEAM");
  const [btnUrl, setBtnUrl] = useState("#");

  useEffect(() => {
    // Ensure Firebase is configured
    if (!process.env.NEXT_PUBLIC_FIREBASE_DATABASE_URL) {
      setError("Firebase configuration is missing. Please add your credentials to .env.local");
      setLoading(false);
      return;
    }

    const cmsRef = ref(db, 'cms');
    const unsubscribe = onValue(cmsRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        setContent(data.content || fallbackContent);
        setLocalContent(data.content || fallbackContent);
        setButtons(data.buttons || {});
        setBtnLabel(data.buttons?.main_cta?.label || "REGISTER YOUR TEAM");
        setBtnUrl(data.buttons?.main_cta?.url || "#");
        setEvents(data.events ? Object.values(data.events) : []);
        setDomains(data.domains ? Object.values(data.domains) : []);
        setFaqs(data.faqs ? Object.values(data.faqs) : []);
        setAnnouncements(data.announcements ? Object.values(data.announcements) : []);
        setMessages(data.messages ? Object.values(data.messages) : []);
      } else {
        // Initialize DB if empty
        setLocalContent(fallbackContent);
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const handleSaveGlobalSettings = async () => {
    setSaving(true);
    try {
      await update(ref(db, 'cms'), {
        content: localContent,
        buttons: { main_cta: { label: btnLabel, url: btnUrl } }
      });
      alert('All global settings saved successfully!');
    } catch (e: any) {
      alert("Error saving: " + e.message);
    }
    setSaving(false);
  };

  // Generic Helpers
  const addItem = async (path: string, item: any) => {
    const newItemRef = push(ref(db, `cms/${path}`));
    await set(newItemRef, { ...item, id: newItemRef.key });
  };
  const deleteItem = async (path: string, id: string) => {
    await remove(ref(db, `cms/${path}/${id}`));
  };

  const setEventActive = async (id: string) => {
    const updates: any = {};
    events.forEach(ev => {
      updates[`cms/events/${ev.id}/is_active`] = (ev.id === id);
    });
    await update(ref(db), updates);
  };

  if (error) {
    return (
      <div className="min-h-screen bg-[#02050A] text-white p-10 flex items-center justify-center">
        <div className="bg-red-900/20 border border-red-500/50 p-6 rounded-xl max-w-lg text-center">
          <h2 className="text-xl font-bold text-red-500 mb-4">Database Connection Required</h2>
          <p className="text-red-300">{error}</p>
        </div>
      </div>
    );
  }

  if (loading) return <div className="p-10 text-white">Loading Admin Portal...</div>;

  return (
    <div className="min-h-screen bg-[#02050A] text-white p-4 sm:p-10 font-sans">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl sm:text-4xl font-black tracking-widest uppercase mb-10 text-transparent bg-clip-text bg-gradient-to-r from-[#1e3a8a] to-[#ea580c]">
          NextGen CMS Admin
        </h1>

        {/* STICKY SAVE HEADER */}
        <div className="sticky top-0 z-50 bg-[#02050A]/90 backdrop-blur-md p-4 sm:p-6 mb-10 rounded-2xl border border-blue-900/50 shadow-2xl flex flex-col sm:flex-row justify-between items-center gap-4">
          <div className="flex gap-4 w-full sm:w-auto">
            <button 
              onClick={() => window.location.href = '/'} 
              className="flex-1 sm:flex-none px-6 py-3 bg-[#061121] border border-blue-900 hover:bg-[#163B6E] text-blue-300 font-bold rounded-xl transition-all"
            >
              Back to Site
            </button>
            <button 
              onClick={handleSaveGlobalSettings}
              disabled={saving}
              className="flex-1 sm:flex-none px-8 py-3 bg-green-600 hover:bg-green-500 text-white font-black tracking-widest uppercase rounded-xl shadow-[0_0_20px_rgba(22,163,74,0.4)] hover:shadow-[0_0_30px_rgba(22,163,74,0.6)] transition-all disabled:opacity-50"
            >
              {saving ? "SAVING..." : "SAVE ALL CHANGES"}
            </button>
          </div>
          <p className="text-xs text-gray-500 text-center sm:text-right">Hit "Save All Changes" to publish your edits to the live site instantly.</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 mb-10">
          {/* SECTION 1: GLOBAL SETTINGS */}
          <div className="bg-[#061121] p-6 rounded-2xl border border-blue-900/50 flex flex-col gap-8">
            
            {/* Hero / Landing Page */}
            <div>
              <h2 className="text-xl font-bold mb-6 text-blue-300 border-b border-blue-900/50 pb-2 flex justify-between items-center">
                Hero & Landing Page
              </h2>
              <div className="space-y-4">
                {[
                  { key: 'title_1', label: 'Main Title 1', placeholder: 'BUILD' },
                  { key: 'title_2', label: 'Main Title 2', placeholder: 'THE FUTURE' },
                  { key: 'mindmesh_desc', label: 'Hero Subtext', placeholder: 'Join the ultimate 24-hour hackathon...' },
                  { key: 'intro_desc', label: 'Intro Paragraph', placeholder: 'NextGen Build-a-thon brings together...' },
                  { key: 'stats_desc', label: 'Stats Banner', placeholder: '24 Hours - 50+ Teams - ?1,00,000+ Prizes' },
                  { key: 'prize_pool', label: 'Prize Pool Highlight', placeholder: '?1,00,000+' }
                ].map(item => (
                  <div key={item.key} className="flex flex-col gap-2">
                    <label className="text-sm text-gray-400 font-bold">{item.label}</label>
                    <textarea 
                      value={localContent[item.key] || ""} 
                      onChange={(e) => setLocalContent({ ...localContent, [item.key]: e.target.value })}
                      placeholder={item.placeholder}
                      className="w-full bg-[#02050A] border border-gray-700 rounded-lg p-3 text-sm focus:border-blue-500 outline-none resize-none"
                      rows={item.key.includes('desc') ? 3 : 1}
                    />
                  </div>
                ))}
              </div>
            </div>

            {/* Key Information */}
            <div>
              <h2 className="text-xl font-bold mb-6 text-blue-300 border-b border-blue-900/50 pb-2 flex justify-between items-center">
                Key Information
              </h2>
              <div className="space-y-4">
                {[
                  { key: 'team', label: 'Team Size', placeholder: '2-4 Members' },
                  { key: 'duration', label: 'Duration', placeholder: '24-Hour Hackathon' },
                  { key: 'venue', label: 'Venue', placeholder: 'VVCE Campus' },
                ].map(item => (
                  <div key={item.key} className="flex flex-col gap-2">
                    <label className="text-sm text-gray-400 font-bold">{item.label}</label>
                    <input 
                      type="text"
                      value={localContent[item.key] || ""} 
                      onChange={(e) => setLocalContent({ ...localContent, [item.key]: e.target.value })}
                      placeholder={item.placeholder}
                      className="w-full bg-[#02050A] border border-gray-700 rounded-lg p-3 text-sm focus:border-blue-500 outline-none"
                    />
                  </div>
                ))}
              </div>
            </div>

            {/* About Build-a-thon */}
            <div>
              <h2 className="text-xl font-bold mb-6 text-blue-300 border-b border-blue-900/50 pb-2 flex justify-between items-center">
                About Section
              </h2>
              <div className="space-y-4">
                {[
                  { key: 'about_1', label: 'About Paragraph 1', placeholder: 'Push your limits...' },
                  { key: 'about_2', label: 'About Paragraph 2', placeholder: 'Collaborate with top minds...' },
                ].map(item => (
                  <div key={item.key} className="flex flex-col gap-2">
                    <label className="text-sm text-gray-400 font-bold">{item.label}</label>
                    <textarea 
                      value={localContent[item.key] || ""} 
                      onChange={(e) => setLocalContent({ ...localContent, [item.key]: e.target.value })}
                      placeholder={item.placeholder}
                      className="w-full bg-[#02050A] border border-gray-700 rounded-lg p-3 text-sm focus:border-blue-500 outline-none resize-none"
                      rows={4}
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="flex flex-col gap-10">
            {/* Main Call To Action Button */}
            <div className="bg-[#061121] p-6 rounded-2xl border border-orange-500/50 shadow-[0_0_30px_rgba(234,88,12,0.1)]">
              <h2 className="text-xl font-bold mb-6 text-orange-400 border-b border-orange-500/50 pb-2">Main Call-to-Action Button</h2>
              <div className="space-y-4">
                <div className="flex flex-col gap-2">
                  <label className="text-sm text-gray-400 font-bold">Button Label</label>
                  <input 
                    type="text" 
                    value={btnLabel} 
                    onChange={(e) => setBtnLabel(e.target.value)} 
                    placeholder="REGISTER YOUR TEAM"
                    className="w-full bg-[#02050A] border border-gray-700 rounded-lg p-3 text-sm focus:border-orange-500 outline-none" 
                  />
                </div>
                <div className="flex flex-col gap-2">
                  <label className="text-sm text-gray-400 font-bold">Redirect URL</label>
                  <input 
                    type="text" 
                    value={btnUrl} 
                    onChange={(e) => setBtnUrl(e.target.value)} 
                    placeholder="https://forms.gle/..."
                    className="w-full bg-[#02050A] border border-gray-700 rounded-lg p-3 text-sm focus:border-orange-500 outline-none" 
                  />
                </div>
              </div>
            </div>

            {/* Live Announcements */}
            <div className="bg-[#061121] p-6 rounded-2xl border border-blue-900/50">
              <h2 className="text-xl font-bold mb-6 text-blue-300 border-b border-blue-900/50 pb-2 flex flex-col sm:flex-row justify-between sm:items-end gap-2">
                Live Announcements
                <span className="text-xs text-gray-500 font-normal">Shows in top navigation dropdown</span>
              </h2>
              
              <div className="space-y-4 max-h-[400px] overflow-y-auto mb-6 pr-2">
                {announcements.length === 0 && <p className="text-sm text-gray-500">No active announcements.</p>}
                {announcements.map(ann => (
                  <div key={ann.id} className="p-4 bg-[#02050A] border border-gray-700 rounded-xl flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-1">
                        <span className="text-xs font-bold text-orange-400 bg-orange-500/10 px-2 py-1 rounded">{ann.date}</span>
                        <h4 className="font-bold text-gray-200">{ann.title}</h4>
                      </div>
                      <p className="text-sm text-gray-500 mt-1 line-clamp-2">{ann.desc}</p>
                      {ann.btnText && (
                        <div className="mt-2 text-xs text-blue-400 flex items-center gap-1">
                          ? Button: {ann.btnText} ({ann.btnUrl})
                        </div>
                      )}
                    </div>
                    <button 
                      onClick={async () => { await deleteItem('announcements', ann.id); }} 
                      className="text-red-500 text-sm font-bold bg-red-500/10 px-4 py-2 rounded shrink-0 w-full sm:w-auto"
                    >
                      Delete
                    </button>
                  </div>
                ))}
              </div>

              <div className="flex flex-col gap-3 bg-[#02050A] p-5 rounded-xl border border-gray-700">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <input type="text" id="annDate" placeholder="Date (e.g. 15 AUG)" className="w-full bg-[#061121] border border-gray-700 rounded-lg p-3 text-sm focus:border-blue-500 outline-none" />
                  <input type="text" id="annTitle" placeholder="Announcement Title" className="w-full bg-[#061121] border border-gray-700 rounded-lg p-3 text-sm focus:border-blue-500 outline-none" />
                </div>
                <textarea id="annDesc" placeholder="Full description..." className="w-full bg-[#061121] border border-gray-700 rounded-lg p-3 text-sm focus:border-blue-500 outline-none resize-none" rows={3} />
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <input type="text" id="annBtnText" placeholder="Optional Button Text" className="w-full bg-[#061121] border border-gray-700 rounded-lg p-3 text-sm focus:border-blue-500 outline-none" />
                  <input type="text" id="annBtnUrl" placeholder="Optional URL" className="w-full bg-[#061121] border border-gray-700 rounded-lg p-3 text-sm focus:border-blue-500 outline-none" />
                </div>
                <button 
                  onClick={async () => {
                    const date = (document.getElementById('annDate') as HTMLInputElement).value;
                    const title = (document.getElementById('annTitle') as HTMLInputElement).value;
                    const desc = (document.getElementById('annDesc') as HTMLInputElement).value;
                    const btnText = (document.getElementById('annBtnText') as HTMLInputElement).value;
                    const btnUrl = (document.getElementById('annBtnUrl') as HTMLInputElement).value;
                    
                    if (date && title && desc) { 
                      await addItem('announcements', { date, title, desc, btnText, btnUrl, created_at: new Date().toISOString() });
                      (document.getElementById('annDate') as HTMLInputElement).value = '';
                      (document.getElementById('annTitle') as HTMLInputElement).value = '';
                      (document.getElementById('annDesc') as HTMLInputElement).value = '';
                      (document.getElementById('annBtnText') as HTMLInputElement).value = '';
                      (document.getElementById('annBtnUrl') as HTMLInputElement).value = '';
                    } else {
                      alert("Date, Title, and Description are required.");
                    }
                  }}
                  className="w-full py-3 bg-orange-600 rounded-lg hover:bg-orange-500 font-bold mt-2"
                >
                  Broadcast Announcement
                </button>
              </div>
            </div>

            {/* Footer / Contact Info */}
            <div className="bg-[#061121] p-6 rounded-2xl border border-blue-900/50">
              <h2 className="text-xl font-bold mb-6 text-blue-300 border-b border-blue-900/50 pb-2 flex justify-between items-center">
                Footer & Contact Info
              </h2>
              <div className="space-y-4">
                {[
                  { key: 'footer_coord1_name', label: 'Coordinator 1 Name', placeholder: 'Yash' },
                  { key: 'footer_coord1_phone', label: 'Coordinator 1 Phone', placeholder: '+91 9113636746' },
                  { key: 'footer_coord2_name', label: 'Coordinator 2 Name', placeholder: 'Navaneeth' },
                  { key: 'footer_coord2_phone', label: 'Coordinator 2 Phone', placeholder: '+91 7204703252' },
                  { key: 'footer_email', label: 'Contact Email', placeholder: 'navanieti.ece@nie.ac.in' },
                  { key: 'footer_copyright', label: 'Copyright Text', placeholder: '- 2026 NextGen...' },
                ].map(item => (
                  <div key={item.key} className="flex flex-col gap-2">
                    <label className="text-sm text-gray-400 font-bold">{item.label}</label>
                    <input 
                      type="text"
                      value={localContent[item.key] || ""} 
                      onChange={(e) => setLocalContent({ ...localContent, [item.key]: e.target.value })}
                      placeholder={item.placeholder}
                      className="w-full bg-[#02050A] border border-gray-700 rounded-lg p-3 text-sm focus:border-blue-500 outline-none"
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* SECTION 3: TIMELINE */}
        <div className="bg-[#061121] p-6 rounded-2xl border border-blue-900/50 mb-10">
          <h2 className="text-xl font-bold mb-6 text-blue-300 border-b border-blue-900/50 pb-2">
            Timeline / Schedule
          </h2>
          
          <div className="space-y-4 mb-8">
            {events.map((ev) => (
              <div key={ev.id} className={`flex items-center justify-between p-4 border rounded-xl ${ev.is_active ? 'border-orange-500 bg-orange-500/10 shadow-[0_0_15px_rgba(249,115,22,0.15)]' : 'border-gray-700 bg-[#02050A]'}`}>
                <div className="flex items-center gap-4">
                  <input 
                    type="radio" 
                    name="active_stage" 
                    checked={ev.is_active}
                    onChange={() => setEventActive(ev.id)}
                    className="w-5 h-5 accent-orange-500 cursor-pointer"
                  />
                  <div>
                    <p className="font-bold text-gray-200">{ev.stage_name}</p>
                    <p className="text-sm text-gray-500">{ev.date_time}</p>
                  </div>
                </div>
                <button onClick={async () => { await deleteItem('events', ev.id); }} className="text-red-500 hover:text-red-400 text-sm font-bold bg-red-500/10 px-3 py-1 rounded">Delete</button>
              </div>
            ))}
          </div>

          <div className="flex flex-col md:flex-row gap-4 items-end bg-[#02050A] p-6 rounded-xl border border-gray-700">
            <div className="flex-1 w-full">
              <label className="block text-xs text-gray-400 font-bold mb-2">Stage Name</label>
              <input type="text" id="evName" className="w-full bg-[#061121] border border-gray-700 rounded-lg p-3 focus:border-blue-500 outline-none" />
            </div>
            <div className="flex-1 w-full">
              <label className="block text-xs text-gray-400 font-bold mb-2">Date/Time</label>
              <input type="text" id="evDate" className="w-full bg-[#061121] border border-gray-700 rounded-lg p-3 focus:border-blue-500 outline-none" />
            </div>
            <button 
              onClick={async () => {
                const n = (document.getElementById('evName') as HTMLInputElement).value;
                const d = (document.getElementById('evDate') as HTMLInputElement).value;
                if (n && d) { 
                  await addItem('events', { stage_name: n, date_time: d, is_active: false }); 
                  (document.getElementById('evName') as HTMLInputElement).value = '';
                  (document.getElementById('evDate') as HTMLInputElement).value = '';
                }
              }}
              className="px-8 py-3 bg-blue-600 rounded-lg hover:bg-blue-500 font-bold w-full md:w-auto"
            >
              Add Stage
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
          {/* SECTION 4: DOMAINS */}
          <div className="bg-[#061121] p-6 rounded-2xl border border-blue-900/50">
            <h2 className="text-xl font-bold mb-6 text-blue-300 border-b border-blue-900/50 pb-2">Domains CRUD</h2>
            <div className="space-y-4 max-h-[400px] overflow-y-auto mb-6 pr-2">
              {domains.map(d => (
                <div key={d.id} className="p-4 bg-[#02050A] border border-gray-700 rounded-xl flex justify-between items-start">
                  <div>
                    <p className="font-bold text-gray-200">{d.number} - {d.title}</p>
                    <p className="text-sm text-gray-500 mt-1 line-clamp-2">{d.description || d.desc}</p>
                  </div>
                  <button onClick={async () => { await deleteItem('domains', d.id); }} className="text-red-500 text-sm font-bold bg-red-500/10 px-3 py-1 rounded shrink-0 ml-4">Remove</button>
                </div>
              ))}
            </div>
            
            <div className="flex flex-col gap-3 bg-[#02050A] p-5 rounded-xl border border-gray-700">
              <input type="text" id="domNum" placeholder="Number (e.g. 06)" className="w-full bg-[#061121] border border-gray-700 rounded-lg p-3 text-sm focus:border-blue-500 outline-none" />
              <input type="text" id="domTitle" placeholder="Domain Title" className="w-full bg-[#061121] border border-gray-700 rounded-lg p-3 text-sm focus:border-blue-500 outline-none" />
              <textarea id="domDesc" placeholder="Description..." className="w-full bg-[#061121] border border-gray-700 rounded-lg p-3 text-sm focus:border-blue-500 outline-none resize-none" rows={3} />
              <button 
                onClick={async () => {
                  const n = (document.getElementById('domNum') as HTMLInputElement).value;
                  const t = (document.getElementById('domTitle') as HTMLInputElement).value;
                  const d = (document.getElementById('domDesc') as HTMLInputElement).value;
                  if (n && t && d) { 
                    await addItem('domains', { number: n, title: t, description: d }); 
                    (document.getElementById('domNum') as HTMLInputElement).value = '';
                    (document.getElementById('domTitle') as HTMLInputElement).value = '';
                    (document.getElementById('domDesc') as HTMLInputElement).value = '';
                  }
                }}
                className="w-full py-3 bg-blue-600 rounded-lg hover:bg-blue-500 font-bold mt-2"
              >
                Add New Domain
              </button>
            </div>
          </div>

          {/* SECTION 5: FAQs */}
          <div className="bg-[#061121] p-6 rounded-2xl border border-blue-900/50">
            <h2 className="text-xl font-bold mb-6 text-blue-300 border-b border-blue-900/50 pb-2">FAQs CRUD</h2>
            <div className="space-y-4 max-h-[400px] overflow-y-auto mb-6 pr-2">
              {faqs.map(f => (
                <div key={f.id} className="p-4 bg-[#02050A] border border-gray-700 rounded-xl flex justify-between items-start">
                  <div>
                    <p className="font-bold text-gray-200">{f.question}</p>
                    <p className="text-sm text-gray-500 mt-1 line-clamp-2">{f.answer}</p>
                  </div>
                  <button onClick={async () => { await deleteItem('faqs', f.id); }} className="text-red-500 text-sm font-bold bg-red-500/10 px-3 py-1 rounded shrink-0 ml-4">Remove</button>
                </div>
              ))}
            </div>
            
            <div className="flex flex-col gap-3 bg-[#02050A] p-5 rounded-xl border border-gray-700">
              <input type="text" id="faqQ" placeholder="Question" className="w-full bg-[#061121] border border-gray-700 rounded-lg p-3 text-sm focus:border-blue-500 outline-none" />
              <textarea id="faqA" placeholder="Answer..." className="w-full bg-[#061121] border border-gray-700 rounded-lg p-3 text-sm focus:border-blue-500 outline-none resize-none" rows={3} />
              <button 
                onClick={async () => {
                  const q = (document.getElementById('faqQ') as HTMLInputElement).value;
                  const a = (document.getElementById('faqA') as HTMLInputElement).value;
                  if (q && a) { 
                    await addItem('faqs', { question: q, answer: a }); 
                    (document.getElementById('faqQ') as HTMLInputElement).value = '';
                    (document.getElementById('faqA') as HTMLInputElement).value = '';
                  }
                }}
                className="w-full py-3 bg-blue-600 rounded-lg hover:bg-blue-500 font-bold mt-2"
              >
                Add New FAQ
              </button>
            </div>
          </div>
        </div>

        {/* SECTION 6: INBOX */}
        <div className="bg-[#061121] p-6 rounded-2xl border border-blue-900/50">
          <h2 className="text-xl font-bold mb-6 text-blue-300 border-b border-blue-900/50 pb-2">Student Questions Inbox</h2>
          {messages.length === 0 ? (
            <p className="text-gray-500 text-center py-10">No questions received yet.</p>
          ) : (
            <div className="space-y-4">
              {messages.map((m: any) => (
                <div key={m.id} className="p-4 bg-[#02050A] border border-gray-700 rounded-xl">
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <h4 className="font-bold text-orange-400">{m.name}</h4>
                      <a href={`mailto:${m.email}`} className="text-sm text-blue-400 hover:underline">{m.email}</a>
                    </div>
                    <span className="text-xs text-gray-500">{new Date(m.created_at).toLocaleString()}</span>
                  </div>
                  <p className="text-gray-300 mt-3 whitespace-pre-wrap">{m.message}</p>
                </div>
              ))}
            </div>
          )}
        </div>

      </div>
    </div>
  );
}
