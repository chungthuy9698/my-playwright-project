import { test, expect, request } from '@playwright/test';
import { json } from 'stream/consumers';
const loginPayload = { userEmail: "anshika@gmail.com", userPassword: "Iamking@000" }

let token;

test.beforeAll(async () => {
    const apiContext = await request.newContext();
    const loginResponse = await apiContext.post('https://rahulshettyacademy.com/api/ecom/auth/login', { data: loginPayload })
    expect((loginResponse).ok()).toBeTruthy();
    const loginResponseJson = await loginResponse.json();
    token = loginResponseJson.token;
    console.log(token);

});
//tests/api/WebAPIPart1.spec.js

test.beforeEach(async () => {

});

test('API Test Case 1: Get User Details', async ({ page }) => {
    page.addInitScript(value => {
        window.localStorage.setItem('token', value);
    }, token);
    await page.goto('https://rahulshettyacademy.com/client');
    await page.waitForLoadState('networkidle');
    console.log(await page.locator('.card-body b').allTextContents());
    expect(page.locator('.card-body b').first().textContent()).toBe('IPHONE 13 PRO');
})



