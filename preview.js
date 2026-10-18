const puppeteer = require('puppeteer');
(async () => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.setViewport({ width: 1920, height: 1080 });
  await page.goto('http://localhost:3000/');
  
  // Wait for the animations to load
  await new Promise(r => setTimeout(r, 2000));
  
  // Scroll down to the highlights section (around 250vh-280vh of the 400vh scroll container)
  // Or just scroll until the text "PRIZE POOL" is fully visible and opacity is 1
  await page.evaluate(() => {
    window.scrollTo(0, window.innerHeight * 2.8);
  });
  
  await new Promise(r => setTimeout(r, 1000));
  
  await page.screenshot({ path: 'C:/Users/HP/.gemini/antigravity/brain/a0a8fcec-67a2-4548-bd55-7f616dc16d76/preview.png', fullPage: false });
  await browser.close();
})();
