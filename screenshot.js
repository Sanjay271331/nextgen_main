const puppeteer = require('puppeteer');
(async () => {
  const browser = await puppeteer.launch({headless: 'new'});
  const page = await browser.newPage();
  await page.setViewport({width: 1440, height: 900, deviceScaleFactor: 2});
  await page.goto('http://localhost:3000', {waitUntil: 'networkidle0', timeout: 30000});
  await new Promise(r => setTimeout(r, 2000));
  await page.screenshot({path: 'C:\\Users\\HP\\.gemini\\antigravity\\brain\\a0a8fcec-67a2-4548-bd55-7f616dc16d76\\preview2.png', fullPage: true});
  await browser.close();
})();
