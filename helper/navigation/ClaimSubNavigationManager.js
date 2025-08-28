import { claimMenuItems } from '../menuItems/claimMenuItems.js';

import { SubmitClaimPage } from '../../page_objects/claim/SubmitClaimPage.js';
import { MyClaimsPage } from '../../page_objects/claim/MyClaimsPage.js';
import { EmployeeClaimsPage } from '../../page_objects/claim/EmployeeClaimsPage.js';

export async function navigateToClaimPageMenuItem(page, claimItemName) {
    const menuItems = await page.locator('nav.oxd-topbar-body-nav li>a')
    const menuItemCount = await menuItems.count();

    for (let i = 0; i < menuItemCount; i++) {
        const menuItemText = await menuItems.nth(i).textContent();
        const standardizeMenuItemText = (await menuItemText.trim()).toLowerCase();

        if (standardizeMenuItemText === claimItemName.toLowerCase()) {
            await menuItems.nth(i).click();
            switch (claimItemName) {
                case claimMenuItems.SUBMIT_CLAIMS: {
                    const { SubmitClaimPage } = await import('../../page_objects/claim/SubmitClaimPage.js');
                    await page.waitForLoadState('networkidle');
                    return new SubmitClaimPage(page);
                }
                case claimMenuItems.MY_CLAIMS: {
                    const { MyClaimsPage } = await import('../../page_objects/claim/MyClaimsPage.js');
                    await page.waitForLoadState('networkidle');
                    return new MyClaimsPage(page);
                }
                case claimMenuItems.EMPLOYEE_CLAIMS: {
                    const { EmployeeClaimsPage } = await import('../../page_objects/claim/EmployeeClaimsPage.js');
                    await page.waitForLoadState('networkidle');
                    return new EmployeeClaimsPage(page);
                }
                case claimMenuItems.ASSIGN_CLAIM: {
                    const { AssignClaimPage } = await import('../../page_objects/claim/AssignClaimPage.js');
                    await page.waitForLoadState('networkidle');
                    return new AssignClaimPage(page);
                }
                default:
                    throw new Error(`Form "${claimItemName}" is not implemented in PIM.`);
            }
        }


    }
    throw new Error(`Menu page for ${claimItemName} is not implemented!`)
}

export async function navigateToClaimConfigurationPageMenuItem(page, configItemName) {
    const configTabs = page.locator('span.oxd-topbar-body-nav-tab-item');
    const tabCount = await configTabs.count();

    for (let i = 0; i < tabCount; i++) {
        const tabText = await configTabs.nth(i).textContent();
        if (tabText.trim().toLowerCase() === 'configuration') {
            await configTabs.nth(i).click();
            break;
        }
    }

    const menuItems = await page.locator('ul.oxd-dropdown-menu a')
    const menuItemCount = await menuItems.count();

    for (let i = 0; i < menuItemCount; i++) {
        const menuItemText = await menuItems.nth(i).textContent();
        const standardizeMenuItemText = (await menuItemText.trim()).toLowerCase();

        if (standardizeMenuItemText === configItemName.toLowerCase()) {
            await menuItems.nth(i).click();
            if (configItemName === claimMenuItems.CONFIGURATION_EVENTS || configItemName === claimMenuItems.CONFIGURATION_EXPENSE_TYPES) {
                const { ConfigurationPage } = await import('../../page_objects/claim/ConfigurationPage.js');
                await page.waitForLoadState('networkidle');
                return new ConfigurationPage(page);
            } else {
                throw new Error(`Form "${configItemName}" is not implemented in PIM.`);
            }


        }
    }
    throw new Error(`Menu page for ${configItemName} is not implemented!`)
}
