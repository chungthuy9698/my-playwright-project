import { My_Test as test } from "../../fixtures/My_Test";
import { expect } from "@playwright/test";
import { mainNavigationOption } from "../../helper/mainNavigationOption";
import { navigateMainMenuItem } from "../../helper/navigation/MainNavigationManager";
import path from 'path';
import { fileURLToPath } from 'url';
import fs from 'fs';
import { readCellValue, writeCellValue } from "../../utils/excelHelper";
import * as allure from "allure-js-commons";
import {
    step,
    attachment,
    label,
    description
} from 'allure-js-commons'; // ✅ Chuẩn mới

test.describe('Update Personal Details in My Info', () => {
    const filePath = 'uploadFiles/myInfoTestingFiles/automation_testing_download.xlsx';
    const fileName = 'automation_testing_download.xlsx';
    test('TC_001: Verify Excel upload & update', async ({ loggedInPage }) => {
        label('feature', 'My Info Excel Upload');
        description('Upload và chỉnh sửa file Excel trong trang My Info');


        const myInfoPage = await navigateMainMenuItem(loggedInPage, mainNavigationOption.MY_INFO);
        // await myInfoPage.uploadAttachment(filePath);

        await step('Tải file Excel về từ hệ thống', async () => {
            await myInfoPage.downloadFileByName(fileName);
        })
        // Tạo __dirname thủ công
        const __filename = fileURLToPath(import.meta.url);
        const __dirname = path.dirname(__filename);
        // Kiểm tra file đã được tải thành công
        const downloadDir = path.resolve(__dirname, '../../uploadFiles/myInfoTestingFiles');
        const downloadedFilePath = path.join(downloadDir, fileName);

        expect(fs.existsSync(downloadedFilePath)).toBeTruthy();

        const cellValue = await readCellValue(filePath, 'Sheet1', 'B3');

        step(`Giá trị ô B3 trong file Excel: ${cellValue}`);
        // Verify values in the downloaded file if needed

        await writeCellValue(filePath, 'Sheet1', 'B3', 'Chung Q');
        const updatedCellValue = await readCellValue(filePath, 'Sheet1', 'B3');
        expect(updatedCellValue).toBe('Chung Q');

        step(`Giá trị ô B3 trong file Excel: ${updatedCellValue}`);
    });
});