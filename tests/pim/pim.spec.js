import { My_Test as test } from '../../fixtures/My_Test';
import { expect } from '@playwright/test';

import { navigateMainMenuItem } from '../../helper/navigation/MainNavigationManager';
import { navigateToPIMPageMenuItem } from '../../helper/navigation/PIMSubNavigationManager';

import { mainNavigationOption } from '../../helper/mainNavigationOption';
import { pimMenuItems } from '../../helper/menuItems/pimMenuItems.js';

import { setupNewEmployee } from '../../services/userService.js';
import { generateEmployee } from '../../utils/testDataFactory';
import { DialogHelper } from "../../helper/DialogHelper.js";

test('[@smoke] TC_001: Add a new Employee ', async ({ loggedInPage }) => {
    await navigateMainMenuItem(loggedInPage, mainNavigationOption.PIM);
    await setupNewEmployee(loggedInPage);

})
test.describe('Using newly added employee Information ', () => {
    let newEmployeeData;
    test.beforeAll(async ({ loggedInPage }) => {
        newEmployeeData = await setupNewEmployee(loggedInPage);
    });

    test('[@smoke] TC_002: Verify the information of the newly added employee ', async ({ loggedInPage }) => {
        await navigateMainMenuItem(loggedInPage, mainNavigationOption.PIM);
        const employeeListPage = await navigateToPIMPageMenuItem(loggedInPage, pimMenuItems.EMPLOYEE_LIST);
        await employeeListPage.searchEmployee(newEmployeeData.firstName, newEmployeeData.fullname(), newEmployeeData.employeeId);
        await employeeListPage.openEmployeeDetails();
        expect(await employeeListPage.getEmployeeDetails()).toEqual({
            firstName: newEmployeeData.firstName,
            middleName: newEmployeeData.middleName,
            lastName: newEmployeeData.lastName,
            employeeId: newEmployeeData.employeeId
        })
    })
})

test('[@smoke] TC_003: Delete an employee record by ID a new Employee ', async ({ loggedInPage }) => {
    await navigateMainMenuItem(loggedInPage, mainNavigationOption.PIM);
    const employeeListPage = await navigateToPIMPageMenuItem(loggedInPage, pimMenuItems.EMPLOYEE_LIST);
    await employeeListPage.deleteEmployeeRecordByID(['520799', '0003', '0008']);
    const notification = new DialogHelper(loggedInPage);
    await notification.waitForVisible();
    await notification.clickButtonByText('Yes, Delete');

})



