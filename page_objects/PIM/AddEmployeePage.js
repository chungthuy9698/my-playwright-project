import { BasePage } from '../BasePage';
import{NotificationHelper} from '../../helper/NotificationHelper';

export class AddEmployeePage extends BasePage {
    constructor(page) {
        super(page);
        this.addButton = page.getByRole('button', { name: 'Add' });
        this.firstNameInput = page.getByPlaceholder('First Name');
        this.middleNameInput = page.getByPlaceholder('Middle Name');
        this.lastNameInput = page.getByPlaceholder('Last Name');
        this.employeeIdInput = page.locator("//label[normalize-space()='Employee Id']/parent::div/following-sibling::div/input");
        this.addPhotoButton = page.locator('button.employee-image-action');
        this.addPhotoInputLink = page.locator('input[type="file"]');
        this.saveButton = page.getByRole('button', { name: 'Save' });
    }

    async addNewEmployee(firstName, middleName, lastName, employeeIdNumber, fileImagePath) {
        await this.firstNameInput.fill(firstName);
        await this.middleNameInput.fill(middleName);
        await this.lastNameInput.fill(lastName);
        await this.employeeIdInput.fill(employeeIdNumber);
        await this.addPhotoInputLink.setInputFiles(fileImagePath)
        await this.saveButton.click();
        await NotificationHelper.isLoadingPresent(this.page);
        await NotificationHelper.isLoadingFired(this.page);
        await this.page.waitForLoadState('networkidle');
    }
}