const express = require('express');
const path = require('path');
const puppeteer = require('puppeteer');

const app = express();
const PORT = process.env.PORT || 3000;

// Serve static files from the 'public' directory
app.use(express.static(path.join(__dirname, 'public')));

app.get('/screenshot', async (req, res) => {
  try {
    console.log('Launching Puppeteer...');
    const browser = await puppeteer.launch({
      headless: true,
      args: ['--no-sandbox', '--disable-setuid-sandbox']
    });

    const page = await browser.newPage();
    await page.goto(`http://localhost:${PORT}`, { waitUntil: 'networkidle0' });

    const screenshotBuffer = await page.screenshot({ fullPage: true });
    await browser.close();

    res.set({
      'Content-Type': 'image/png',
      'Content-Disposition': 'inline; filename="screenshot.png"',
    });
    res.send(screenshotBuffer);
  } catch (error) {
    console.error('Screenshot error:', error);
    res.status(500).send('Error taking screenshot.');
  }
});

app.listen(PORT, () => {
  console.log(`✅ Server running at http://localhost:${PORT}`);
});
