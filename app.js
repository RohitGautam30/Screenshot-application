const express = require('express');
const puppeteer = require('puppeteer');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.static(path.join(__dirname, 'public')));

// Screenshot route
app.get('/fullscreenshot', async (req, res) => {
  try {
    const browser = await puppeteer.launch({
      headless: 'new',
      args: ['--no-sandbox', '--disable-setuid-sandbox'],
    });

    const page = await browser.newPage();

    // Use the internal route if running on Render
    await page.goto('http://localhost:3000', {
      waitUntil: 'networkidle0',
    });

    const screenshotBuffer = await page.screenshot({ fullPage: true });
    await browser.close();

    res.set({
      'Content-Type': 'image/png',
      'Content-Disposition': 'attachment; filename="webpage.png"',
    });
    res.send(screenshotBuffer);
  } catch (error) {
    console.error('Screenshot error:', error.message);
    res.status(500).send('Error taking webpage screenshot.');
  }
});

// Start the server
app.listen(PORT, () => {
  console.log(`✅ Server running at http://localhost:${PORT}`);
});
