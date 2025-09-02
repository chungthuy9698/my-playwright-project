// File này chỉ thực hiện login và lưu trạng thái đăng nhập vào state.json. 

import { chromium } from '@playwright/test';
import fs from 'fs';

// Đảm bảo folder 'storage' tồn tại 
if (!fs.existsSync('storage')) {
    fs.mkdirSync('storage');
}

(async () => {
    const browser = await chromium.launch({ headless: false });
    const context = await browser.newContext();
    const page = await context.newPage();

    await page.goto('http://localhost/orangehrm/web/index.php/auth/login');

    // Lấy giá trị _token từ input hidden
    const token = await page.getAttribute('input[name="_token"]', 'value');
    console.log('_token:', token);

    await page.getByPlaceholder('Username').fill('chungthuy');
    await page.getByPlaceholder('Password').fill('Thudong1237@');
    await page.evaluate((token) => {
        document.querySelector('input[name="_token"]').value = token;
    }, token);
    await page.getByRole('button', { name: 'Login' }).click();

    // Chờ cho trang Dashboard được tải xong
    await page.waitForLoadState('networkidle');
    await page.waitForSelector("//h6[text()='Dashboard']", { timeout: 3000 });


    // Lưu trạng thái đăng nhập vào file state.json node  setup/login.setup.js
    await context.storageState({ path: 'storage/state.json' });
    await browser.close(); 
})();
