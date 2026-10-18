"use server";

import { revalidatePath } from 'next/cache';
import { fallbackContent, fallbackDomains, fallbackEvents, fallbackFaqs } from "../lib/fallback-data";

// Unique, zero-configuration cloud database URL
const CLOUD_DB_URL = "https://api.restful-api.dev/objects/ff808181a09d98f701a0b27e00622f62";

// Helper to get database from cloud
async function getDB() {
  try {
    const res = await fetch(CLOUD_DB_URL, { cache: 'no-store' });
    const json = await res.json();
    
    // If DB is empty, hydrate with default structure
    if (!json.data || !json.data.content) {
      return {
        content: { ...fallbackContent },
        domains: [ ...fallbackDomains ],
        events: [ ...fallbackEvents ],
        faqs: [ ...fallbackFaqs ],
        buttons: { main_cta: { label: 'REGISTER YOUR TEAM', url: '#' } },
        messages: []
      };
    }
    return json.data;
  } catch (e) {
    // Failsafe memory if network is down
    return {
      content: { ...fallbackContent },
      domains: [ ...fallbackDomains ],
      events: [ ...fallbackEvents ],
      faqs: [ ...fallbackFaqs ],
      buttons: { main_cta: { label: 'REGISTER YOUR TEAM', url: '#' } },
      messages: []
    };
  }
}

// Helper to save database to cloud
async function saveDB(data: any) {
  try {
    await fetch(CLOUD_DB_URL, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name: 'nxt_website_production_db', data })
    });
  } catch (e) {
    console.error("Failed to sync to cloud database:", e);
  }
}

// ------------------------------------------
// FETCH ACTIONS
// ------------------------------------------

export async function fetchContentBlocks() {
  const db = await getDB();
  return db.content;
}

export async function fetchDynamicButtons() {
  const db = await getDB();
  return db.buttons;
}

export async function fetchDomains() {
  const db = await getDB();
  return db.domains || [];
}

export async function fetchEventSchedule() {
  const db = await getDB();
  return db.events || [];
}

export async function fetchFaqs() {
  const db = await getDB();
  return db.faqs || [];
}

// ------------------------------------------
// MUTATION ACTIONS (Admin Portal)
// ------------------------------------------

export async function updateContentBlock(key: string, value: string) {
  const db = await getDB();
  db.content[key] = value;
  await saveDB(db);
  revalidatePath('/');
  revalidatePath('/admin');
}

export async function updateDynamicButton(key: string, label: string, url: string) {
  const db = await getDB();
  if (!db.buttons) db.buttons = {};
  db.buttons[key] = { label, url };
  await saveDB(db);
  revalidatePath('/');
  revalidatePath('/admin');
}

export async function addEventStage(stage_name: string, date_time: string) {
  const db = await getDB();
  if (!db.events) db.events = [];
  const newId = 'e' + Date.now();
  db.events.push({ id: newId, stage_name, date_time, is_active: false });
  await saveDB(db);
  revalidatePath('/');
  revalidatePath('/admin');
}

export async function deleteEventStage(id: string) {
  const db = await getDB();
  db.events = db.events.filter((e: any) => e.id !== id);
  await saveDB(db);
  revalidatePath('/');
  revalidatePath('/admin');
}

export async function setActiveEventStage(activeId: string) {
  const db = await getDB();
  db.events = db.events.map((e: any) => ({ ...e, is_active: e.id === activeId }));
  await saveDB(db);
  revalidatePath('/');
  revalidatePath('/admin');
}

export async function addDomain(number: string, title: string, description: string) {
  const db = await getDB();
  if (!db.domains) db.domains = [];
  const newId = 'd' + Date.now();
  db.domains.push({ id: newId, number, title, description, order_index: db.domains.length });
  await saveDB(db);
  revalidatePath('/');
  revalidatePath('/admin');
}

export async function deleteDomain(id: string) {
  const db = await getDB();
  db.domains = db.domains.filter((d: any) => d.id !== id);
  await saveDB(db);
  revalidatePath('/');
  revalidatePath('/admin');
}

export async function addFaq(question: string, answer: string) {
  const db = await getDB();
  if (!db.faqs) db.faqs = [];
  const newId = 'f' + Date.now();
  db.faqs.push({ id: newId, question, answer, order_index: db.faqs.length });
  await saveDB(db);
  revalidatePath('/');
  revalidatePath('/admin');
}

export async function deleteFaq(id: string) {
  const db = await getDB();
  db.faqs = db.faqs.filter((f: any) => f.id !== id);
  await saveDB(db);
  revalidatePath('/');
  revalidatePath('/admin');
}

export async function saveAllGlobalSettings(newContent: any, btnLabel: string, btnUrl: string) {
  const db = await getDB();
  db.content = { ...db.content, ...newContent };
  if (!db.buttons) db.buttons = {};
  db.buttons.main_cta = { label: btnLabel, url: btnUrl };
  await saveDB(db);
  revalidatePath('/');
  revalidatePath('/admin');
}

export async function fetchAnnouncements() {
  const db = await getDB();
  return db.announcements || [];
}

export async function addAnnouncement(date: string, title: string, desc: string, btnText: string, btnUrl: string) {
  const db = await getDB();
  if (!db.announcements) db.announcements = [];
  db.announcements.push({
    id: 'ann_' + Date.now().toString(),
    date, title, desc, btnText, btnUrl,
    created_at: new Date().toISOString()
  });
  await saveDB(db);
  revalidatePath('/');
  revalidatePath('/admin');
}

export async function deleteAnnouncement(id: string) {
  const db = await getDB();
  if (db.announcements) {
    db.announcements = db.announcements.filter((a: any) => a.id !== id);
    await saveDB(db);
    revalidatePath('/');
    revalidatePath('/admin');
  }
}

export async function fetchAllAdminData() {
  const db = await getDB();
  return {
    c: db.content || {},
    b: db.buttons || {},
    e: db.events || [],
    d: db.domains || [],
    f: db.faqs || [],
    m: db.messages || [],
    a: db.announcements || []
  };
}

export async function submitContactMessage(formData: FormData) {
  const name = formData.get('name') as string;
  const email = formData.get('email') as string;
  const message = formData.get('message') as string;
  
  if (!name || !email || !message) return { error: 'All fields are required' };

  try {
    const db = await getDB();
    if (!db.messages) db.messages = [];
    
    db.messages.push({
      id: 'm' + Date.now(),
      name,
      email,
      message,
      created_at: new Date().toISOString(),
      is_read: false
    });
    
    await saveDB(db);
    revalidatePath('/admin');
    return { success: true };
  } catch (err: any) {
    return { error: err.message };
  }
}

export async function getContactMessages() {
  const db = await getDB();
  if (!db.messages) return [];
  return [...db.messages].sort((a: any, b: any) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime());
}
