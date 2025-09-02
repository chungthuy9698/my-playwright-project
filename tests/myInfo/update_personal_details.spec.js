import { My_Test as test } from "../../fixtures/My_Test";
import { expect } from "@playwright/test";
import { mainNavigationOption } from "../../helper/mainNavigationOption";
import { navigateMainMenuItem } from "../../helper/navigation/MainNavigationManager";
import path from 'path';
import { fileURLToPath } from 'url';
import fs from 'fs';
import { readCellValue, writeCellValue } from "../../utils/excelHelper";
import { step, label, description } from 'allure-js-commons';

test.describe('Update Personal Details in My Info', () => {
    const relativeFilePath = 'uploadFiles/myInfoTestingFiles/automation_testing_download.xlsx';
    const fileName = 'automation_testing_download.xlsx';

    test('TC_001: Verify Excel upload & update', async ({ loggedInPage }) => {
        label('feature', 'My Info Excel Upload');
        description('Kiểm tra chức năng tải xuống, chỉnh sửa và xác minh file Excel trong trang My Info');

        // Điều hướng đến trang My Info
        const myInfoPage = await navigateMainMenuItem(loggedInPage, mainNavigationOption.MY_INFO);

        // Tải file Excel từ hệ thống
        await step('Tải file Excel từ hệ thống', async () => {
            await myInfoPage.downloadFileByName(fileName);
        });

        // Xác định đường dẫn tuyệt đối đến file đã tải
        const __filename = fileURLToPath(import.meta.url);
        const __dirname = path.dirname(__filename);
        const downloadDir = path.resolve(__dirname, '../../uploadFiles/myInfoTestingFiles');
        const downloadedFilePath = path.join(downloadDir, fileName);

        // Kiểm tra file đã tồn tại
        await step('Kiểm tra file đã được tải thành công', async () => {
            expect(fs.existsSync(downloadedFilePath)).toBeTruthy();
        });

        // Đọc giá trị ban đầu từ ô B3
        const originalValue = await readCellValue(relativeFilePath, 'Sheet1', 'B3');
        await step(`Giá trị ban đầu ở ô B3: ${originalValue}`, async () => { });

        // Ghi giá trị mới vào ô B3
        await step('Ghi giá trị mới vào ô B3', async () => {
            await writeCellValue(relativeFilePath, 'Sheet1', 'B3', 'Chung Q');
        });

        // Đọc lại giá trị sau khi cập nhật
        const updatedValue = await readCellValue(relativeFilePath, 'Sheet1', 'B3');
        await step(`Giá trị sau cập nhật ở ô B3: ${updatedValue}`, async () => {
            expect(updatedValue).toBe('Chung Q');
        });
    });
});
