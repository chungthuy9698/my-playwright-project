import { My_Test as test } from '../../fixtures/My_Test';

import { navigateMainMenuItem } from '../../helper/navigation/MainNavigationManager';
import { navigateToClaimPageMenuItem } from '../../helper/navigation/ClaimSubNavigationManager';
import { navigateToClaimConfigurationPageMenuItem } from '../../helper/navigation/ClaimSubNavigationManager';

import { mainNavigationOption } from '../../helper/mainNavigationOption';
import { claimMenuItems } from '../../helper/menuItems/claimMenuItems.js';
import {
    step,
    attachment,
    label,
    description
} from 'allure-js-commons';

test.describe(' Employee Claims', () => {
    test('TC_001: Add an Event successfully', async ({ loggedInPage }) => {
        label('feature', 'Claims');
        label('flaky', 'true');
        description('Add an new Event in the Claim Configuration page');
        await navigateMainMenuItem(loggedInPage, mainNavigationOption.CLAIM);
        const configurationPage = await navigateToClaimConfigurationPageMenuItem(loggedInPage, claimMenuItems.CONFIGURATION_EVENTS);
        await step('Add New Event', async () => {
            await configurationPage.addNewEvent('Housing', 'This is a test event description created by automation!!!');
            await loggedInPage.waitForTimeout(2000);
        })
    })

    test.only('TC_002: Assign a Claim to an employee successfully', async ({ loggedInPage }) => {
        label('feature', 'Claims');
        description('Assign a new claim to an employee');
        await navigateMainMenuItem(loggedInPage, mainNavigationOption.CLAIM);
        const assignClaimPage = await navigateToClaimPageMenuItem(loggedInPage, claimMenuItems.ASSIGN_CLAIM);
        await step('Assign a Claim', async () => {
            await assignClaimPage.clickAndAssignClaim('jamir', 'Jamir Reagan Adams', 'Housing', 'Vietnamese Dong', 'This is a test remark created by automation!!!');
            await assignClaimPage.page.waitForTimeout(2000);
        })
    })
})