// In app.js
const puppeteer = require('puppeteer');

app.get('/fullscreenshot', async (req, res) => {
  try {
    const browser = await puppeteer.launch({
      headless: 'new',
      args: ['--no-sandbox', '--disable-setuid-sandbox']
    });
    const page = await browser.newPage();
    await page.goto('https://screenshot-application.onrender.com', {
      waitUntil: 'networkidle0'
    });

    const screenshotBuffer = await page.screenshot({ fullPage: true });
    await browser.close();

    res.set({
      'Content-Type': 'image/png',
      'Content-Disposition': 'attachment; filename="webpage.png"',
    });
    res.send(screenshotBuffer);
  } catch (error) {
    console.error('Screenshot error:', error);
    res.status(500).send('Error taking webpage screenshot.');
  }
});
