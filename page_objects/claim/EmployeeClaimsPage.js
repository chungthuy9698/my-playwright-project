import { BasePage } from '../BasePage';
import { NotificationHelper } from '../../helper/NotificationHelper';
import { AssignClaimPage } from './AssignClaimPage';

export class EmployeeClaimsPage extends BasePage {
    constructor(page) {
        super(page);
        this.page = page;
        this.employeeNameTextbox = page.locator("//label[normalize-space()='Employee Name']/parent::div/following-sibling::div//input");
        this.suggestedEmployeeName = page.locator('div[role="listbox"] span')
        this.referenceIdTextbox = page.locator("//label[normalize-space()='Reference Id']/parent::div/following-sibling::div//input");
        this.eventNameDropdown = page.locator("//label[normalize-space()='Event Name']/parent::div/following-sibling::div/div");
        this.fromDateCalendar = page.locator("//label[normalize-space()='From Date']/parent::div/following-sibling::div//input");
        this.columnHeader = 'div.oxd-table-header-cell';
        this.bodyRow = page.locator('//div[@class="oxd-table-body"]//div[@role="row"]');
        this.seachButton = page.locator('button.orangehrm-left-space');
        this.viewDetailsButton = page.locator('div.oxd-table-card>div[role="row"]>div[role="cell"] button');
    }

    async selectEvenNameItem(dropdowmItemName) {
        await this.eventNameDropdown.click();
        const dropdownItems = this.page.locator("//label[normalize-space()='Event Name']/parent::div/following-sibling::div/div/div[@role='listbox']/div/span");
        const dropdownCount = await dropdownItems.count();
        for (let i = 0; i < dropdownCount; i++) {
            const itemText = await dropdownItems.nth(i).textContent();
            if (itemText.trim() === dropdowmItemName) {
                await dropdownItems.nth(i).click();
                return;
            }
        }
        throw new Error(`Dropdown item "${dropdownItemName}" not found`);
    }

    async selectFromDate(expectedYear, expectedMonth, expectedDate) {
        await this.fromDateCalendar.click();
        return await this.selectDate(expectedYear, expectedMonth, expectedDate)
    }
    async clickToSearchButton() {
        await this.seachButton.click();
        await NotificationHelper.isLoadingFired(this.page);
    }

    async verifyReturnedResultPerCol(columnName, itemName) {
        await this.page.waitForSelector('div.orangehrm-container', { timeout: 5000 });
        const colHeaderList = await this.page.locator(this.columnHeader).all();
        console.log('Header count:', colHeaderList.length);

        // debug

        let actualColNameIndex = -1;

        for (let i = 0; i < colHeaderList.length; i++) {
            const text = await colHeaderList[i].textContent();
            if (text.trim() === columnName.trim()) {
                actualColNameIndex = i;
                break;
            }
        }
        if (actualColNameIndex === -1) {
            throw new Error(`Không tìm thấy cột có tên "${columnName}"`);
        }

        const cellLocator = await this.page.locator(
            `(//div[@class='oxd-table-body']//div[@role='row']/div[${actualColNameIndex + 1}])`);

        const cellLocatorValues = await cellLocator.allTextContents();
        for (const cellValue of cellLocatorValues) {
            if (cellValue.trim() === itemName) {
                console.log(cellValue.trim())
                return true;

            }
        }
        return false;
    }

    async searchEmployeeClaimByEmployeeName(inputValue, expectedValue) {
        await this.searchAndSelectASuggestItem(this.employeeNameTextbox, this.suggestedEmployeeName, inputValue, expectedValue);
        await this.clickToSearchButton();
    }

    async viewDetailsOfAnEmployeeClaim() {
        await Promise.all([
            this.page.waitForLoadState('networkidle'),
            this.viewDetailsButton.nth(0).click()
        ]);
        return new AssignClaimPage(this.page);
    }
}