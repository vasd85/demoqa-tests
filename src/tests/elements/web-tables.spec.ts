import { test } from '../../../fixture/test.fixture';
import { RegistrationFields } from '../../../pages/web-tables.page';
import { expect } from '@playwright/test';

const person = {
    firstName: 'Alden',
    lastName: 'Cantrell',
    email: 'test@test.com',
    age: '30',
    salary: '12345',
    department: 'QA',
} as RegistrationFields;

test.describe('Web tables page tests', async () => {
    test('Verify user can enter new data into the table', async ({ webTablesPage }) => {
        await webTablesPage.open();
        await webTablesPage.clickAddButton();
        await webTablesPage.fillAndSubmitForm(person);
        expect(await webTablesPage.parseLastRow()).toEqual(person);
    });

    test('Verify user can edit the row in a table', async ({ webTablesPage }) => {
        const rowIndex = 1;
        const fieldsToUpdate = {
            firstName: 'John',
            lastName: 'Black',
        };

        await webTablesPage.open();
        const expected = {
            ...(await webTablesPage.parseRow(rowIndex)),
            ...fieldsToUpdate,
        };

        await webTablesPage.clickEditButton(rowIndex + 1);
        await webTablesPage.fillAndSubmitForm(fieldsToUpdate);
        const result = await webTablesPage.parseRow(rowIndex);
        expect(result, `New row's data is correct`).toEqual(expected);
    });
});
