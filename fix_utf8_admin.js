const fs = require('fs');
let code = fs.readFileSync('c:/nxt__website/app/admin/page.tsx', 'utf8');
const cleanCode = code.replace(/[^\x00-\x7F]/g, '-');
fs.writeFileSync('c:/nxt__website/app/admin/page.tsx', cleanCode, 'utf8');
