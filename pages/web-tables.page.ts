import { Locator, Page } from '@playwright/test';
import { fillIfValueNotEmpty } from '../helpers/elements.helper';
import { ModalWindow } from './components/modal.component';

export type RegistrationFields = {
    firstName?: string;
    lastName?: string;
    age?: string;
    email?: string;
    salary?: string;
    department?: string;
};

export class WebTablesPage {
    constructor(readonly page: Page) {}

    async open() {
        await this.page.goto('/webtables');
    }

    async clickAddButton(): Promise<ModalWindow> {
        await this.page.locator('#addNewRecordButton').click();
        return new ModalWindow(this.page).waitForModalToOpen();
    }

    async clickEditButton(index: number): Promise<ModalWindow> {
        await this.page.locator(`#edit-record-${index}`).click();
        return new ModalWindow(this.page).waitForModalToOpen();
    }

    async getAllRows(): Promise<Locator[]> {
        return this.page.locator('.rt-tbody').getByRole('row').all();
    }

    async waitForTableToLoad(): Promise<void> {
        const start = Date.now();
        do {
            await this.page.waitForTimeout(100);
        } while ((await this.getAllRows()).length === 0 && Date.now() < start + 2_000);
    }

    async parseRow(index: number): Promise<RegistrationFields> {
        const allRows = await this.getAllRows();
        if (index >= allRows.length) {
            throw new Error(
                `Index must be within the table size [index - ${index}, table size - ${allRows.length}]`,
            );
        }
        return this.parseRowLocator(allRows[index]);
    }

    async parseLastRow(): Promise<RegistrationFields> {
        const allRows = await this.getAllRows();

        // Find the last not empty row
        let lastRow;
        for (const row of allRows.reverse()) {
            const attr = await row.getAttribute('class');
            if (!attr?.includes('-padRow')) {
                lastRow = row;
                break;
            }
        }
        if (!lastRow) {
            throw new Error('Should be at least one filled row in the table');
        }

        return this.parseRowLocator(lastRow);
    }

    private async parseRowLocator(row: Locator): Promise<RegistrationFields> {
        const [firstName, lastName, age, email, salary, department] = (await row.allInnerTexts())[0].split(
            '\n',
        );
        return { firstName, lastName, age, email, salary, department };
    }

    async fillAndSubmitForm(fields: RegistrationFields): Promise<void> {
        const fieldLocators = {
            '#firstName': fields.firstName,
            '#lastName': fields.lastName,
            '#userEmail': fields.email,
            '#age': fields.age,
            '#salary': fields.salary,
            '#department': fields.department,
        };

        for (const [selector, value] of Object.entries(fieldLocators)) {
            await fillIfValueNotEmpty(this.page.locator(selector), value);
        }
        await this.page.locator('#submit').click();
        await this.waitForTableToLoad();
    }
}
