const fs = require('fs');
let code = fs.readFileSync('c:/nxt__website/app/admin/page.tsx', 'utf8');

// The error mentioned invalid utf-8 sequence at index 11024.
// Let's rewrite the file completely with safe utf-8.
const cleanCode = code.replace(/[^\x00-\x7F]/g, '-');
fs.writeFileSync('c:/nxt__website/app/admin/page.tsx', cleanCode, 'utf8');
console.log('Cleaned file');
