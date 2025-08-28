// helpers/DialogHelper.js
import { expect } from '@playwright/test';

export class DialogHelper {
  constructor(page) {
    this.page = page;
    this.dialog = page.locator('.orangehrm-dialog-popup'); // modal chính
    this.closeButton = this.dialog.locator('.oxd-dialog-close-button');
  }

  // kiểm tra dialog hiển thị
  async waitForVisible() {
    await expect(this.dialog).toBeVisible();
  }

  // kiểm tra dialog ẩn đi
  async waitForHidden() {
    await expect(this.dialog).toBeHidden();
  }

  // lấy text trong dialog (header + body)
  async getText() {
    return await this.dialog.innerText();
  }

  // click vào button theo label
  async clickButtonByText(text) {
    const button = this.dialog.locator(`button:has-text("${text}")`);
    await button.click();
  }

  // confirm mặc định (Yes/Ok)
  async confirm() {
    await this.clickButtonByText('Yes');
  }

  // cancel mặc định (No/Cancel)
  async cancel() {
    await this.clickButtonByText('No');
  }

  // đóng dialog bằng nút (X)
  async close() {
    await this.closeButton.click();
  }
}
