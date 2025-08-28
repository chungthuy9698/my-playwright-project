import { BasePage } from '../BasePage';
import { NotificationHelper } from '../../helper/NotificationHelper';
import { time } from 'console';

export class MyInfoPage extends BasePage {

    constructor(page) {
        super(page);

        this.attachmentAddButton = page.getByRole('button', { name: 'Add' });
        this.browseFileInput = page.locator('input[type="file"]');
        this.attachmentSaveButton = page.locator("//h6[normalize-space()='Add Attachment']/parent::div//button[@type='submit']");

        this.row = this.page.locator('div.oxd-table-card>div.oxd-table-row');
        this.cell = 'div.oxd-table-card>div.oxd-table-row>[role="cell"]';
        this.downloadIconInActions = 'div.oxd-table-card>div.oxd-table-row>[role="cell"] button>i.bi-download';
    }

    async uploadAttachment(filePath) {
        await this.attachmentAddButton.click();
        await this.browseFileInput.setInputFiles(filePath);
        await this.attachmentSaveButton.click();
        await NotificationHelper.isLoadingPresent(this.page);
        await NotificationHelper.isLoadingFired(this.page);
    }

    async downloadFileByName(fileName) {
        const rowCount = await this.row.count();
        for (let i = 0; i < rowCount; i++) {
            const selectedRow = await this.row.nth(i)
            const cellHasText = await selectedRow.filter({ hasText: fileName });
            if (await cellHasText.count() > 0) {
                console.log(await cellHasText.count())
                const downloadButton = await selectedRow.locator('button:has(i.bi-download)');
                const [download] = await Promise.all([
                    this.page.waitForEvent('download'),
                    downloadButton.click()
                ]);
                const savePath = `downloads/${fileName}`;
                await download.saveAs(savePath);
                console.log(`File "${fileName}" đã được tải về: ${savePath}`);
                return;
            }
        }
        console.log(`Không tìm thấy file có tên "${fileName}" trong danh sách.`);
    }



}