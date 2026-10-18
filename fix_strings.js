const fs = require('fs');

// 1. Fix app/admin/page.tsx
let adminCode = fs.readFileSync('c:/nxt__website/app/admin/page.tsx', 'utf8');
adminCode = adminCode.replace(/[^\x00-\x7F]/g, '-');
adminCode = adminCode.replace(/\\cms\/\\\\/g, '\cms/\\');
adminCode = adminCode.replace(/\\cms\/\\\\\/\\\\/g, '\cms/\/\\');
adminCode = adminCode.replace(/updates\[\\cms\/events\/\\\\\/is_active\\] = \(ev\.id === id\);/g, 'updates[\cms/events/\/is_active\] = (ev.id === id);');
// Check all occurrences of cms/... template strings that might have broken
adminCode = adminCode.replace(/\\cms\/\\\\/g, '\cms/\\'); // Fallback
fs.writeFileSync('c:/nxt__website/app/admin/page.tsx', adminCode, 'utf8');

// 2. Fix FooterFAQ.tsx
let footerCode = fs.readFileSync('c:/nxt__website/components/FooterFAQ.tsx', 'utf8');
footerCode = footerCode.replace(/[^\x00-\x7F]/g, '-');
fs.writeFileSync('c:/nxt__website/components/FooterFAQ.tsx', footerCode, 'utf8');
