import { My_Test as test } from '../../fixtures/My_Test';

import { navigateMainMenuItem } from '../../helper/navigation/MainNavigationManager';
import { navigateToPIMPageMenuItem } from '../../helper/navigation/PIMSubNavigationManager';

import { mainNavigationOption } from '../../helper/mainNavigationOption';

const eventName = 'Accommodation';

test.describe('[@regression] Employee Claims', () => {
    test('TC_001: Search Employee Claims successfully', async ({ loggedInPage }) => {
        const employeeClaimsPage = await navigateMainMenuItem(loggedInPage, mainNavigationOption.CLAIM);
        await employeeClaimsPage.selectEvenNameItem(eventName);
        await employeeClaimsPage.selectFromDate(2025, 'July', 30)
        await employeeClaimsPage.clickToSearchButton();
    });
})
