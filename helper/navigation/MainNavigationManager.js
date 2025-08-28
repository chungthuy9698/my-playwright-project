import { BasePage } from '../../page_objects/BasePage';
import { BuzzPage } from '../../page_objects/BuzzPage';
import { EmployeeClaimsPage } from '../../page_objects/claim/EmployeeClaimsPage';
import { UserManagementPage } from '../../page_objects/admin/UserManagementPage';
import { MyInfoPage } from '../../page_objects/myInfo/MyInfoPage';
import { EmployeeListPage } from '../../page_objects/PIM/EmployeeListPage';


import { mainNavigationOption } from '../../helper/mainNavigationOption';


export async function navigateMainMenuItem(page, menuItemName) {
    const menuItem = page.locator('.oxd-main-menu-item--name');



    const menuItemCount = await menuItem.count();

    for (let i = 0; i < menuItemCount; i++) {
        const menuItemText = await menuItem.nth(i).textContent();
        const standardizeMenuItemText = (await menuItemText.trim()).toLowerCase();

        if (standardizeMenuItemText === menuItemName.toLowerCase()) {
            await menuItem.nth(i).click();
            switch (menuItemName) {
                case mainNavigationOption.ADMIN:
                    await page.waitForLoadState('networkidle');
                    return new UserManagementPage(page);
                case mainNavigationOption.PIM:
                    await page.waitForLoadState('networkidle');
                    return new EmployeeListPage(page);
                case mainNavigationOption.LEAVE:
                    await page.waitForLoadState('networkidle');
                    return new LeavePage(page);
                case mainNavigationOption.TIME:
                    await page.waitForLoadState('networkidle');
                    return new TimePage(page);
                case mainNavigationOption.RECRUITMENT:
                    await page.waitForLoadState('networkidle');
                    return new RecruitmentPage(page);
                case mainNavigationOption.MY_INFO:
                    await page.waitForLoadState('networkidle');
                    return new MyInfoPage(page);
                case mainNavigationOption.PERFORMANCE:
                    await page.waitForLoadState('networkidle');
                    return new PerformancePage(page);
                    await page.waitForLoadState('networkidle');
                case mainNavigationOption.DASHBOARD:
                    await page.waitForLoadState('networkidle');
                    return new DashboardPage(page);
                case mainNavigationOption.DIRECTORY:
                    await page.waitForLoadState('networkidle');
                    return new DirectoryPage(page);
                case mainNavigationOption.MAINTENANCE:
                    await page.waitForLoadState('networkidle');
                    return new MaintenancePage(page);
                case mainNavigationOption.CLAIM:
                    await page.waitForLoadState('networkidle');
                    return new EmployeeClaimsPage(page);
                case mainNavigationOption.BUZZ:
                    await page.waitForLoadState('networkidle');
                    return new BuzzPage(page);
            }
        }
    }
    throw new Error(`Menu page for ${menuItemName} is not implemented!`)
}
