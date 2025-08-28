import { NotificationHelper } from '../helper/NotificationHelper';
import { BasePage } from './BasePage';
import { expect } from '@playwright/test';

export class BuzzPage extends BasePage {
    constructor(page) {
        super(page);
        this.page = page;
        this.postTextArea = page.locator('textarea.oxd-buzz-post-input');
        this.postButton = page.locator('button[type="submit"].oxd-button--main');
        this.sharePhotos = page.locator("//button[normalize-space()='Share Photos']");
        this.inputFile = page.locator('input.oxd-file-input');
        this.uploadValidationMsg = page.locator('.oxd-alert--error');
        this.closeDialogButton = page.locator('button.oxd-dialog-close-button');
        this.uploadDialogModal = page.locator('div.orangehrm-dialog-modal');
        this.shareButton = page.locator("//button[normalize-space()='Share']");
        this.notificationHelper = new NotificationHelper(this.page);
        this.likeIcon = page.locator("//div[@class='orangehrm-buzz-post-actions']/div").nth(0);
        this.coloredLikeIcon = page.locator('orangehrm-like-animation').nth(0);
        this.commentIcon = page.locator('i.bi-chat-text-fill').nth(0);
        this.commentSection = page.getByPlaceholder('Write your comment...');
        this.postKebabIcon = page.locator('i.bi-three-dots').nth(0);
        this.deleteOption = page.locator("//p[normalize-space()='Delete Post']");
        this.confirmationPopup = page.locator('[role="document"]');
        this.confirmedDeleteButton = page.locator("//button[normalize-space()='Yes, Delete']");
    }

    async createANewPost(postContent) {
        await this.postTextArea.fill(postContent);
        await this.postButton.click();
    }

    async clickToSharePhotos() {
        await this.sharePhotos.click();
    }
    async uploadFileToSharePhoto(fileToUpload) {
        await this.page.waitForSelector('input.oxd-file-input', { state: 'attached' });
        await this.inputFile.setInputFiles(fileToUpload)
    }
    async isUploadValidationMsgDisplayed(expectedMsg) {
        await this.page.waitForSelector('.oxd-alert--error', { timeout: 3000 });
        const actualMsg = await (await this.uploadValidationMsg.textContent()).trim();
        if (actualMsg === expectedMsg.trim()) {
            return true;
        }
        return false;
    }

    async closeDialogByXButton() {
        await this.closeDialogButton.click();
        await this.uploadDialogModal.waitFor({ state: 'detached' });
    }
    async clickToShareToUploadPhoto() {
        await this.shareButton.waitFor({ state: 'visible' });
        await this.shareButton.click();
        await expect(this.notificationHelper.isLoadingFired()).toBeTruthy();
        await expect(this.notificationHelper.isSuccessMessageDisplayed()).toBeTruthy();
    }

    async likeAPost() {
        await this.likeIcon.click();
        await this.coloredLikeIcon.isVisible();
    }
    async commentAPost(commentText) {
        await this.commentIcon.click();
        await this.commentSection.fill(commentText);
        await this.commentSection.press('Enter');

    }
    async deleteAPost() {
        await this.postKebabIcon.click();
        await this.deleteOption.click();
        await this.confirmationPopup.waitFor({ state: 'visible' });
        await this.confirmedDeleteButton.click();
    }

} 