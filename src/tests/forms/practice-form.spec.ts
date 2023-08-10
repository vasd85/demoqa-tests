import { test } from '../../../fixture/test.fixture';
import { StudentInfo } from '../../../pages/practice-form.page';
import { format } from 'date-fns';
import { expect, Page } from '@playwright/test';

const studentInfo = {
    firstName: 'John',
    lastName: 'Black',
    userEmail: 'test@test.com',
    gender: 'Male',
    phoneNumber: '0123456789',
    dateOfBirth: new Date(1990, 0, 15),
    subject: ['Computer Science', 'Chemistry'],
    hobbies: ['Reading'],
    currentAddress: '***',
    state: 'NCR',
    city: 'Delhi',
} as StudentInfo;
const filePath = './src/.resources/profile-picture.jpg';

test.describe('Practice form page tests', async () => {
    test('Verify user can submit the form', async ({ page, practiceFormPage }) => {
        await practiceFormPage.open();
        await practiceFormPage.fillForm(studentInfo);
        await practiceFormPage.uploadPhoto(filePath);
        await practiceFormPage.submitTheForm();

        const fileName = getFileNameFromPath(filePath);
        await verifyResultTable(page, studentInfo, fileName);
    });
});

const getFileNameFromPath = (filePath: string): string => {
    const regexpArray = filePath.match(/([^\\\/]+)$/);
    return regexpArray ? regexpArray[0] : '';
};

const verifyResultTable = async (page: Page, studentInfo: StudentInfo, filePath: string) => {
    const mappings = [
        {
            fieldName: 'Student Name',
            value: `${studentInfo.firstName} ${studentInfo.lastName}`,
        },
        { fieldName: 'Student Email', value: studentInfo.userEmail },
        { fieldName: 'Gender', value: studentInfo.gender },
        { fieldName: 'Mobile', value: studentInfo.phoneNumber },
        {
            fieldName: 'Date of Birth',
            value: format(studentInfo.dateOfBirth, 'dd MMMM,yyyy'),
        },
        { fieldName: 'Subjects', value: studentInfo.subject?.join(', ') },
        { fieldName: 'Hobbies', value: studentInfo.hobbies?.join(', ') },
        { fieldName: 'Picture', value: filePath },
        { fieldName: 'Address', value: studentInfo.currentAddress },
        {
            fieldName: 'State and City',
            value: `${studentInfo.state} ${studentInfo.city}`,
        },
    ];

    for (const { fieldName, value } of mappings) {
        await checkField(page, fieldName, value);
    }
};

const checkField = async (page: Page, fieldName: string, value: string | undefined) => {
    value = value ?? '';
    const field = page.locator('.table-responsive tbody').getByText(fieldName).locator('+ td');
    await expect.soft(field).toHaveText(value);
};
