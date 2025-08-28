import { expect } from '@playwright/test';
import { navigateMainMenuItem } from '../helper/navigation/MainNavigationManager';
import { navigateToUserManagementItem } from '../helper/navigation/AdminSubNavigationManager';
import { navigateToPIMPageMenuItem } from '../helper/navigation/PIMSubNavigationManager';
import { mainNavigationOption } from '../helper/mainNavigationOption';
import { userManagamentDropdownItems } from '../helper/menuItems/adminMenuItems';
import { NotificationHelper } from '../helper/NotificationHelper';
import { generateUser, generateEmployee } from '../utils/testDataFactory';
import { pimMenuItems } from '../helper/menuItems/pimMenuItems.js';

export async function setupTestUser(loggedInPage) {
    await navigateMainMenuItem(loggedInPage, mainNavigationOption.ADMIN);
    const userManagementPage = await navigateToUserManagementItem(
        loggedInPage,
        'User Management',
        userManagamentDropdownItems.USERS
    );
    const newUser = generateUser();
    await userManagementPage.addNewUser(
        newUser.userRole,
        'chung',
        'chung thuy',
        newUser.status,
        newUser.userName,
        newUser.password
    );
    expect(await NotificationHelper.isLoadingFired(loggedInPage)).toBeTruthy();
    return {
        ...newUser,
        employeeName: 'chung thuy' // thêm vào để dùng cho verify 
    };
}

export async function setupNewEmployee(loggedInPage) {
    await navigateMainMenuItem(loggedInPage, mainNavigationOption.PIM);
    const addEmployeePage = await navigateToPIMPageMenuItem(loggedInPage, pimMenuItems.ADD_EMPLOYEE);
    await addEmployeePage.page.waitForLoadState('networkidle');

    const newEmployee = generateEmployee();
    await addEmployeePage.addNewEmployee(newEmployee.firstName, newEmployee.middleName, newEmployee.lastName, newEmployee.employeeId, newEmployee.employeeFileImage);
    return {
        ...newEmployee,
    };
}
