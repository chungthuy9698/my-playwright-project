import ExcelJS from 'exceljs';
import fs from 'fs';


export async function readCellValue(filePath, sheetName, cellAddress) {
    const workbook = new ExcelJS.Workbook();
    await workbook.xlsx.readFile(filePath);
    const sheet = workbook.getWorksheet(sheetName);
    return sheet.getCell(cellAddress).value;
}

/**
 * Ghi giá trị vào một ô trong file Excel
 * @param {string} filePath - Đường dẫn tới file Excel (.xlsx)
 * @param {string} sheetName - Tên sheet cần ghi
 * @param {string} cellAddress - Địa chỉ ô cần ghi (ví dụ: 'B2')
 * @param {string|number|boolean} value - Giá trị cần ghi vào ô
 * @returns {Promise<void>}
 */
export const writeCellValue = async (filePath, sheetName, cellAddress, value) => {
    const workbook = new ExcelJS.Workbook();

    // Kiểm tra file tồn tại
    if (!fs.existsSync(filePath)) {
        throw new Error(`File không tồn tại: ${filePath}`);
    }

    await workbook.xlsx.readFile(filePath);
    const sheet = workbook.getWorksheet(sheetName);

    if (!sheet) {
        throw new Error(`Không tìm thấy sheet: ${sheetName}`);
    }

    sheet.getCell(cellAddress).value = value;

    await workbook.xlsx.writeFile(filePath);
};

