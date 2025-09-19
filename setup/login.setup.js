// setup/login.setup.js
import { chromium } from '@playwright/test';
import fs from 'fs';

export default async () => {
  if (!fs.existsSync('storage')) {
    fs.mkdirSync('storage');
  }

  const browser = await chromium.launch({ headless: false });
  const context = await browser.newContext();
  const page = await context.newPage();

  await page.goto('http://localhost/orangehrm/web/index.php/auth/login');

  const token = await page.getAttribute('input[name="_token"]', 'value');
  console.log('_token:', token);

  await page.getByPlaceholder('Username').fill('chungthuy');
  await page.getByPlaceholder('Password').fill('Thudong1237@');
  await page.evaluate((token) => {
    document.querySelector('input[name="_token"]').value = token;
  }, token);
  await page.getByRole('button', { name: 'Login' }).click();

  await page.waitForLoadState('networkidle');
  await page.waitForSelector("//h6[text()='Dashboard']", { timeout: 3000 });

  await context.storageState({ path: 'storage/state.json' });
  await browser.close();
};
