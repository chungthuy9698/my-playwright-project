import { expect } from '@playwright/test';

import { BasePage } from '../BasePage';
import { NotificationHelper } from '../../helper/NotificationHelper';

export class ConfigurationPage extends BasePage {
    constructor(page) {
        super(page);
        this.menuItem = page.locator('nav.oxd-topbar-body-nav span');
        this.eventNameTextField = page.locator("//label[normalize-space()='Event Name']/parent::div/following-sibling::div//input");
        this.statusDropdownArrow = page.locator("i.oxd-select-text--arrow");
        this.addButton = page.getByRole('button', { name: 'Add' });
        this.addEventEventNameTextField = page.locator("//label[normalize-space()='Event Name']/parent::div/following-sibling::div//input");
        this.addEventDescriptionTextArea = page.locator("textarea.oxd-textarea");
        this.activeCheckbox = page.locator('input[type="checkbox"]');
        this.saveButton = page.getByRole('button', { name: 'Save' });

    }

    async addNewEvent(eventName, description) {
        await this.addButton.click();
        await this.page.waitForURL('http://localhost/orangehrm/web/index.php/claim/saveEvents'); 
        await this.addEventEventNameTextField.fill(eventName);
        await this.addEventDescriptionTextArea.fill(description);
        await this.activeCheckbox.check();
        await this.saveButton.click();
    }
}
