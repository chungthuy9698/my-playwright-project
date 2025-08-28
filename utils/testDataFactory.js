// utils/testDataFactory.js
import { faker } from '@faker-js/faker';

export function generateUser() {
    return {
        email: `auto_${faker.string.uuid()}@playwright.com`,
        password: generateSecurePassword(12),
        firstName: faker.person.firstName(),
        lastName: faker.person.lastName(),
        userName: `user_${faker.internet.username().toLowerCase()}_${faker.string.alphanumeric(4)}`,

        userRole: faker.helpers.arrayElement(['Admin', 'ESS']),
        status: faker.helpers.arrayElement(['Enabled', 'Disabled'])
    };
}
export function generateSecurePassword(length = 12) {
    const upper = faker.string.fromCharacters('ABCDEFGHIJKLMNOPQRSTUVWXYZ');
    const lower = faker.string.fromCharacters('abcdefghijklmnopqrstuvwxyz');
    const digit = faker.string.fromCharacters('0123456789');
    const special = faker.string.fromCharacters('!@#$%^&*()-_=+[]{}<>?');

    // Đảm bảo mỗi loại ký tự xuất hiện ít nhất 1 lần
    const required = upper + lower + digit + special;

    // Tạo phần còn lại ngẫu nhiên từ tất cả nhóm ký tự
    const allChars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()-_=+[]{}<>?';
    const remaining = faker.string.fromCharacters(allChars, length - 4);

    // Trộn tất cả lại và xáo trộn
    const rawPassword = required + remaining;
    const shuffled = faker.helpers.shuffle(rawPassword.split('')).join('');

    return shuffled;
}

export function generateEmployee() {
    return {
        firstName: faker.person.firstName(),
        middleName: faker.person.middleName(),
        lastName: faker.person.lastName(),
        employeeId: faker.string.numeric(6),
        fullname: function () {
            return [this.firstName, this.middleName, this.lastName]
                .filter(Boolean)
                .join(' ');
        },
        employeeFileImage: 'uploadFiles/image01.jpg'
    };
}

