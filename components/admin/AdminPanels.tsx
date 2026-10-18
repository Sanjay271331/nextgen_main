"use client";

import { useEffect, useState } from "react";
import { 
  fetchContentBlocks, updateContentBlock, 
  fetchLinks, updateLink, 
  fetchAnnouncements, addAnnouncement, toggleAnnouncement,
  fetchFAQs, addFAQ,
  fetchEventSchedule, updateEventSchedule,
  fetchInbox
} from "@/app/actions";

export function ContentEditor() {
  const [blocks, setBlocks] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState<string | null>(null);

  useEffect(() => {
    fetchContentBlocks().then(data => {
      setBlocks(data);
      setLoading(false);
    });
  }, []);

  const handleSave = async (key: string, value: string) => {
    setSaving(key);
    try {
      await updateContentBlock(key, value);
      alert("Saved successfully!");
    } catch (e: any) {
      alert(e.message);
    }
    setSaving(null);
  };

  if (loading) return <div>Loading...</div>;

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold">Global Text Editor</h2>
      {blocks.length === 0 ? <p className="text-gray-400">No content found or DB not connected.</p> : null}
      <div className="grid gap-4">
        {blocks.map(block => (
          <div key={block.id} className="bg-gray-700 p-4 rounded-lg">
            <label className="block text-sm font-medium text-gray-300 mb-2">{block.section} &gt; {block.key}</label>
            <textarea
              className="w-full bg-gray-900 border border-gray-600 rounded p-2 text-white"
              rows={3}
              defaultValue={block.value}
              onBlur={(e) => {
                if (e.target.value !== block.value) {
                  handleSave(block.key, e.target.value);
                }
              }}
            />
            {saving === block.key && <span className="text-sm text-blue-400">Saving...</span>}
          </div>
        ))}
      </div>
    </div>
  );
}

export function LinkManager() {
  const [links, setLinks] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchLinks().then(data => { setLinks(data); setLoading(false); });
  }, []);

  const handleSave = async (key: string, url: string) => {
    try {
      await updateLink(key, url);
      alert("Link updated!");
    } catch (e: any) {
      alert(e.message);
    }
  };

  if (loading) return <div>Loading...</div>;

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold">Link & Button Manager</h2>
      <div className="space-y-4">
        {links.map(link => (
          <div key={link.id} className="bg-gray-700 p-4 rounded-lg flex flex-col md:flex-row gap-4 items-center">
            <div className="w-48 font-bold">{link.key}</div>
            <input 
              type="text" 
              className="flex-1 bg-gray-900 border border-gray-600 rounded p-2 text-white"
              defaultValue={link.url}
              onBlur={(e) => {
                if (e.target.value !== link.url) handleSave(link.key, e.target.value);
              }}
            />
          </div>
        ))}
      </div>
    </div>
  );
}

export function AnnouncementManager() {
  const [announcements, setAnnouncements] = useState<any[]>([]);
  const [newMsg, setNewMsg] = useState("");

  useEffect(() => {
    fetchAnnouncements().then(setAnnouncements);
  }, []);

  const handleAdd = async () => {
    if (!newMsg) return;
    await addAnnouncement(newMsg);
    setNewMsg("");
    fetchAnnouncements().then(setAnnouncements);
  };

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold">Announcements</h2>
      <div className="flex gap-2">
        <input 
          value={newMsg} onChange={e => setNewMsg(e.target.value)} 
          className="flex-1 bg-gray-900 border border-gray-600 rounded p-2 text-white" 
          placeholder="New announcement..." 
        />
        <button onClick={handleAdd} className="bg-blue-600 hover:bg-blue-500 px-4 py-2 rounded">Add</button>
      </div>
      <div className="space-y-2">
        {announcements.map(a => (
          <div key={a.id} className="bg-gray-700 p-3 rounded flex justify-between items-center">
            <span className={a.is_active ? "text-white" : "text-gray-500 line-through"}>{a.message}</span>
            <button 
              onClick={async () => {
                await toggleAnnouncement(a.id, !a.is_active);
                fetchAnnouncements().then(setAnnouncements);
              }}
              className="text-sm bg-gray-600 px-2 py-1 rounded"
            >
              Toggle
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export function FAQManager() {
  return <div>FAQ Manager (Implementation follows similar pattern)</div>;
}

export function EventManager() {
  const [events, setEvents] = useState<any[]>([]);
  useEffect(() => { fetchEventSchedule().then(setEvents); }, []);

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold">Event Flow Timeline</h2>
      <div className="space-y-3">
        {events.map(ev => (
          <div key={ev.id} className="bg-gray-700 p-4 rounded flex items-center justify-between">
            <div>
              <div className="font-bold">{ev.stage_name}</div>
              <div className="text-sm text-gray-400">{new Date(ev.date_time).toLocaleString()}</div>
            </div>
            <button 
              onClick={async () => {
                await updateEventSchedule(ev.id, !ev.is_active);
                fetchEventSchedule().then(setEvents);
              }}
              className={`px-4 py-2 rounded font-bold ${ev.is_active ? 'bg-green-600' : 'bg-gray-600'}`}
            >
              {ev.is_active ? 'Active' : 'Set Active'}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export function InboxViewer() {
  const [msgs, setMsgs] = useState<any[]>([]);
  useEffect(() => { fetchInbox().then(setMsgs); }, []);

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold">Inbox</h2>
      <div className="space-y-4">
        {msgs.map(m => (
          <div key={m.id} className="bg-gray-700 p-4 rounded">
            <div className="flex justify-between text-sm text-gray-400 mb-2">
              <span>{m.user_name} ({m.email})</span>
              <span>{new Date(m.created_at).toLocaleDateString()}</span>
            </div>
            <p className="text-white">{m.question}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
