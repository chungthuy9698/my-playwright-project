import { pimMenuItems } from '../menuItems/pimMenuItems.js';


export async function navigateToPIMPageMenuItem(page, pimItemName) {
    const menuItems = await page.locator('nav.oxd-topbar-body-nav li>a')
    const menuItemCount = await menuItems.count();

    for (let i = 0; i < menuItemCount; i++) {
        const menuItemText = await menuItems.nth(i).textContent();
        const standardizeMenuItemText = (await menuItemText.trim()).toLowerCase();

        if (standardizeMenuItemText === pimItemName.toLowerCase()) {
            await menuItems.nth(i).click();
            switch (pimItemName) {
                case pimMenuItems.EMPLOYEE_LIST: {
                    const { EmployeeListPage } = await import('../../page_objects/PIM/EmployeeListPage.js');
                    await page.waitForLoadState('networkidle');
                    return new EmployeeListPage(page);
                }
                case pimMenuItems.ADD_EMPLOYEE: {
                    const { AddEmployeePage } = await import('../../page_objects/PIM/AddEmployeePage.js');
                    await page.waitForLoadState('networkidle');
                    return new AddEmployeePage(page);
                }
                case pimMenuItems.REPORTS: {
                    const { ReportsPage } = await import('../../page_objects/PIM/ReportsPage.js');
                    await page.waitForLoadState('networkidle');
                    return new ReportsPage(page);
                }
                case pimMenuItems.CONFIGURATION: {
                    const { ConfigurationPage } = await import('../../page_objects/PIM/ConfigurationPage.js');
                    await page.waitForLoadState('networkidle');
                    return new ConfigurationPage(page);
                }
                default:
                    throw new Error(`Form "${pimItemName}" is not implemented in PIM.`);
            }
        }
    }
    throw new Error(`Menu page for ${pimItemName} is not implemented!`)
}