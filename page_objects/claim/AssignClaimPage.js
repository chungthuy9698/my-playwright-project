import { BasePage } from '../BasePage';
import { NotificationHelper } from '../../helper/NotificationHelper';
import { expect } from '@playwright/test';

export class AssignClaimPage extends BasePage {
    constructor(page) {
        super(page);
        this.assignClaimButton = page.locator('//button[normalize-space()="Assign Claim"]');
        this.employeeNameInput = page.locator('input[placeholder="Type for hints..."]');
        this.suggestedItems = page.locator('div[role="listbox"] span');
        this.eventDropDownLocation = page.locator("//label[normalize-space()='Event']/parent::div/following-sibling::div/div");
        this.eventOption = page.locator("//div[@role='listbox']//span");
        this.currencyDropdownLocation = page.locator("//label[normalize-space()='Currency']/parent::div/following-sibling::div/div");
        this.currencyOption = page.locator("//div[@role='listbox']//span");
        this.remarkTextArea = page.locator('textarea.oxd-textarea--active');
        this.createButton = page.locator('//button[normalize-space()="Create"]');

        this.lockedEmployeeNameTextBox = page.locator("//label[normalize-space()='Employee']/parent::div/following-sibling::div/input[@disabled]")
        this.lockedReferenceID = page.locator("//label[normalize-space()='Reference Id']/parent::div/following-sibling::div/input[@disabled]")
        this.lockedEvent = page.locator("//label[normalize-space()='Event']/parent::div/following-sibling::div/input[@disabled]");
        this.lockedStatus = page.locator("//label[normalize-space()='Status']/parent::div/following-sibling::div/input[@disabled]");
        this.lockedCurrency = page.locator("//label[normalize-space()='Currency']/parent::div/following-sibling::div/input[@disabled]");
        this.lockedRemarks = page.locator("//textarea[@disabled]");
    }

    async clickAndAssignClaim(inputValue, expectedValue, eventValue, currencyValue, remarkValue) {
        await this.searchAndSelectASuggestItem(this.employeeNameInput, this.suggestedItems, inputValue, expectedValue);
        await this.page.waitForTimeout(2000);
        await this.selectDropDown(this.eventDropDownLocation, this.eventOption, eventValue);
        await this.selectDropDown(this.currencyDropdownLocation, this.currencyOption, currencyValue);
        await this.remarkTextArea.fill(remarkValue);
        await this.createButton.click();
        await NotificationHelper.isSuccessMessageDisplayed(this.page);

    }

    async getAssignClaimPageValuesDisplayed() {
        await expect(this.lockedEmployeeNameTextBox).toBeVisible();
        const html = await this.lockedEmployeeNameTextBox.evaluate(el => el.outerHTML);
        console.log(html)
        const actualEmployeeName = await this.lockedEmployeeNameTextBox.inputValue();
        const actualReferenceID = await this.lockedReferenceID.inputValue();
        const actualEvent = await this.lockedEvent.inputValue();
        const actualStatus = await this.lockedStatus.inputValue();
        const actualCurrency = await this.lockedCurrency.inputValue();
        const actualRemark = await this.lockedRemarks.inputValue();

        const actualValuesArray = {
            employeeName: actualEmployeeName,
            referenceID: actualReferenceID,
            event: actualEvent,
            status: actualStatus,
            currency: actualCurrency,
            remark: actualRemark
        }
        return actualValuesArray;

    }


}