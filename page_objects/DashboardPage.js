import { menuItems, quickLaunchData } from '../test_data/OrgHRM_testData';
import { OrgHRMNavigation } from '../page_objects/OrgHRMNavigation';
import { OrgHRMTimePage } from '../page_objects/OrgHRMTimePage';
import { OrgHRMRecruitmentPage } from '../page_objects/OrgHRMRecruitmentPage';
import { OrgHRMLeavePage } from '../page_objects/OrgHRMLeavePage';
export class DashboardPage extends OrgHRMNavigation {
    constructor(page) {
        super(page);
        this.allWidgets = page.locator("//div[@class='oxd-grid-item oxd-grid-item--gutters orangehrm-dashboard-widget']");
        this.loginUserDetail = page.locator('.oxd-userdropdown-name');
        this.menuItem = page.locator('.oxd-main-menu-item--name');
        this.bigStopwatchIcon = page.locator('[class="oxd-icon bi-stopwatch"]');
        this.candidateToInterview = page.getByText('(1) Candidate to Interview');

    }

    async isSpecificWidgetDisplayed(widgetName) {
        const widget = this.page.locator(`//p[normalize-space()='${widgetName}']//ancestor::div[@class='oxd-grid-item oxd-grid-item--gutters orangehrm-dashboard-widget']`);
        if (await widget.count() === 0) { throw new Error(`The ${widgetName} widget is not present`) }
        return await widget.isVisible();
    }

    async verifyAllWidgetsDisplay() {
        const widgets = this.allWidgets.all();
        const widgetCount = widgets.length;
        if (await widgets.length === 0) { throw new Error('No widgets are present'); }
        for (let i = 0; i < widgetCount; i++) {
            if (!(await widgets[i].isVisible())) {
                return false;
            }


        } return true;
    }

    async isLoginUserDisplayed(expectedLoginUserName) {
        const loginUserName = await this.loginUserDetail.innerText();
        const standardizeLoginUserName = await loginUserName.trim();

        if (await standardizeLoginUserName.toLowerCase() === expectedLoginUserName.toLowerCase()) {
            return true;
        }
        return false;
    }

    async clickToBIStopwatchIcon() {
        await this.bigStopwatchIcon.click();
        await this.page.waitForLoadState('networkidle');
        return new OrgHRMTimePage(this.page);
    }
    async clickToCandidateToInterview() {
        await this.candidateToInterview.click();
        await this.page.waitForLoadState('networkidle');
        return new OrgHRMRecruitmentPage(this.page);

    }

    async clickToQuickLaunchItem(item) {
        const quickLaunchItem = this.page.locator(
            `//p[normalize-space()='Quick Launch']/ancestor::div[@class='orangehrm-dashboard-widget-header']/following-sibling::div//button[@title='${item}']`
        );
        await quickLaunchItem.click();

        switch (item) {
            case quickLaunchData.assign_leave:
            case quickLaunchData.leave_list:
            case quickLaunchData.apply_leave:
            case quickLaunchData.my_leave:
                return new OrgHRMLeavePage(this.page);
            case quickLaunchData.timesheets:
            case quickLaunchData.my_timesheet:
                return new OrgHRMTimePage(this.page);
            default:
                throw new Error(`No item name ${item} is found!`);
        }
    }

}