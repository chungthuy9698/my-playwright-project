import { My_Test as test } from '../../fixtures/My_Test';

import { navigateMainMenuItem } from '../../helper/navigation/MainNavigationManager';
import { navigateToClaimConfigurationPageMenuItem } from '../../helper/navigation/ClaimSubNavigationManager';

import { mainNavigationOption } from '../../helper/mainNavigationOption';
import { claimMenuItems } from '../../helper/menuItems/claimMenuItems.js';


test.describe(' Employee Claims', () => {
    test('TC_001: Add an Event successfully', async ({ loggedInPage }) => {
        await navigateMainMenuItem(loggedInPage, mainNavigationOption.CLAIM);
        const configurationPage = await navigateToClaimConfigurationPageMenuItem(loggedInPage, claimMenuItems.CONFIGURATION_EVENTS);
        await configurationPage.addNewEvent('Accommodation', 'This is a test event description created by automation!!!');
        await loggedInPage.waitForTimeout(2000);
    })
})