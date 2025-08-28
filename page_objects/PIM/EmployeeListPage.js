import { BasePage } from '../BasePage';


export class EmployeeListPage extends BasePage {
    constructor(page) {
        super(page);
        this.employeeFirstName = page.getByPlaceholder('First Name');
        this.employeeMiddleName = page.getByPlaceholder('Middle Name');
        this.employeeLastName = page.getByPlaceholder('Last Name');
        this.employeeIdInput = page.locator("//label[normalize-space()='Employee Id']/parent::div/following-sibling::div/input");
        this.searchButton = page.getByRole('button', { name: 'Search' });
        this.clickableRow = page.locator('div.oxd-table-row--clickable');
        this.employeeNameSearcxhBox = page.locator("//label[normalize-space()='Employee Name']/parent::div/following-sibling::div//input");
        this.suggestedEmployeeNameItems = page.locator('div[role="listbox"] span');
        this.checkbox = page.locator('input[type="checkbox"]');
        this.tableCell = page.locator('div.oxd-table-cell>div');
        this.trashIconButton = page.locator('button.oxd-icon-button>i.bi-trash');
    }


    async getEmployeeDetails() {
        const firstNameValue = await this.employeeFirstName.inputValue();
        const middleNameValue = await this.employeeMiddleName.inputValue();
        const lastNameValue = await this.employeeLastName.inputValue();
        const employeeIdValue = await this.employeeIdInput.inputValue();
        return {
            firstName: firstNameValue,
            middleName: middleNameValue,
            lastName: lastNameValue,
            employeeId: employeeIdValue
        };
    }

    async searchEmployee(inputValue, expectedValue, employeeId) {
        await this.searchAndSelectASuggestItem(this.employeeNameSearcxhBox, this.suggestedEmployeeNameItems, inputValue, expectedValue);
        await this.employeeIdInput.fill(employeeId);
        await this.searchButton.click();
        await this.page.waitForLoadState('networkidle');
    }

    async openEmployeeDetails() {
        await this.clickableRow.first().click();
        await this.page.waitForLoadState('networkidle');
    }

    async deleteEmployeeRecordByID(idsToDelete) {
        const rowCount = await this.clickableRow.count()

        for (let i = 0; i < rowCount; i++) {
            const row = this.clickableRow.nth(i);
            const idCellLocator = await row.locator('div.oxd-table-cell>div').nth(1);
            const idCellText = await idCellLocator.textContent();
            const idCellTextTrimmed = await idCellText.trim();

            if (!idsToDelete.includes(idCellTextTrimmed)) {
                console.log(`[ERROR] No Row found with ID: ${idCellTextTrimmed}.`);
                continue; // bỏ qua nếu không nằm trong danh sách
            }

            try {
                if (idsToDelete.includes(idCellTextTrimmed)) {
                    const checkbox = row.locator('div.oxd-checkbox-wrapper span.oxd-checkbox-input');
                    const trashIcon = row.locator('button.oxd-icon-button>i.bi-trash');
                    if (await checkbox.isVisible() && await checkbox.isEnabled()) {
                        await checkbox.check();
                    }
                    await trashIcon.click();
                }
            } catch (error) {
                console.error(`[ERROR] No checkbox or trash icon found for ID: ${idsToDelete}. Error: ${error}`);
            }

        }

    }
}