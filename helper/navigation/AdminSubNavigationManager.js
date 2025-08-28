import {UserManagementPage} from '../../page_objects/admin/UserManagementPage';

export async function navigateToUserManagementItem(page, menuItemName = 'User Management', childItemName) {
    const locatorXPath = `//span[normalize-space()='${menuItemName}']`;
    const menuItems = page.locator(locatorXPath);
    const filteredItem = menuItems.filter({ hasText: new RegExp(`^${menuItemName}$`, 'i') }).first();

    if (await filteredItem.count() > 0) {
        console.log(`[INFO] Found "${menuItemName}" using filter. Clicking...`);
        await filteredItem.click();
    } else {
        console.warn(`[WARN] Filtered locator not found. Falling back to manual search...`);
        const itemCount = await menuItems.count();
        let found = false;

        for (let i = 0; i < itemCount; i++) {
            const text = (await menuItems.nth(i).textContent())?.trim().toLowerCase();
            if (text === menuItemName.toLowerCase()) {
                console.log(`[INFO] Found "${menuItemName}" at index ${i}. Clicking...`);
                await menuItems.nth(i).click();
                found = true;
                break;
            }
        }

        if (!found) {
            console.error(`[ERROR] Could not find "${menuItemName}" using fallback method.`);
        }
    }

    const childItems = await page.locator('ul.oxd-dropdown-menu a');
    await childItems.first().waitFor({ state: 'visible', timeout: 3000 });
    const childCount = await childItems.count();
    if (childCount > 0 && childItemName) {
        const childLocator = childItems.filter({ hasText: new RegExp(`^${childItemName}$`, 'i') }).first();
        if (await childLocator.count() > 0) {
            console.log(`[INFO] Found "${childItemName}" in user management. Clicking...`);
            await childLocator.click();
            await page.waitForLoadState('networkidle');
            return new UserManagementPage(page);
        } else {
            console.warn(`[WARN] Child item "${childItemName}" not found.`);
        }
    }
}


export async function navigateToJobItem(page, menuItemName) {

}
export async function navigateToOrganizationItem(page, menuItemName) {

}
export async function navigateToQualificationsItem(page, menuItemName) {

}
export async function navigateToConfigurationItem(page, menuItemName) {

}