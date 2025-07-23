
const express = require('express');
const puppeteer = require('puppeteer');
const fs = require('fs');
const app = express();
const port = process.env.PORT || 3000;

app.use(express.static('charts'));

app.get('/generate-pdf', async (req, res) => {
  const browser = await puppeteer.launch({ headless: true });
  const page = await browser.newPage();
  await page.goto(`http://localhost:${port}/charts/report.html`, { waitUntil: 'networkidle0' });
  const pdf = await page.pdf({ format: 'A4' });
  await browser.close();

  res.contentType("application/pdf");
  res.send(pdf);
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
