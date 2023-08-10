import { Locator, Page } from '@playwright/test';
import { fillIfValueNotEmpty } from '../helpers/elements.helper';
import { ModalWindow } from './components/modal.component';

type Hobby = 'Sports' | 'Reading' | 'Music';
type Gender = 'Male' | 'Female' | 'Other';

export type StudentInfo = {
    firstName: string;
    lastName: string;
    userEmail?: string;
    gender: Gender;
    phoneNumber: string;
    dateOfBirth: Date;
    subject?: string[];
    hobbies?: Hobby[];
    currentAddress?: string;
    state?: string;
    city?: string;
};

export class PracticeFormPage {
    readonly page: Page;
    readonly firstName: Locator;
    readonly lastName: Locator;
    readonly userEmail: Locator;
    readonly phoneNumber: Locator;
    readonly dateOfBirth: Locator;
    readonly subject: Locator;
    readonly currentAddress: Locator;
    readonly state: Locator;
    readonly city: Locator;

    constructor(page: Page) {
        this.page = page;
        this.firstName = this.page.locator('#firstName');
        this.lastName = this.page.locator('#lastName');
        this.userEmail = this.page.locator('#userEmail');
        this.phoneNumber = this.page.locator('#userNumber');
        this.dateOfBirth = this.page.locator('#dateOfBirthInput');
        this.subject = this.page.locator('#subjectsInput');
        this.currentAddress = this.page.locator('#currentAddress');
        this.state = this.page.locator('#react-select-3-input');
        this.city = this.page.locator('#react-select-4-input');
    }

    async open() {
        await this.page.goto('/automation-practice-form');
    }

    async uploadPhoto(filePath: string) {
        await this.page.locator('#uploadPicture').setInputFiles(filePath);
    }

    async fillForm(studentInfo: StudentInfo) {
        await fillIfValueNotEmpty(this.firstName, studentInfo.firstName);
        await fillIfValueNotEmpty(this.lastName, studentInfo.lastName);
        await fillIfValueNotEmpty(this.userEmail, studentInfo.userEmail);
        await fillIfValueNotEmpty(this.phoneNumber, studentInfo.phoneNumber);
        await fillIfValueNotEmpty(this.currentAddress, studentInfo.currentAddress);
        await this.setSubjects(studentInfo.subject);
        await this.setAutocompleteInput(this.state, studentInfo.state, '#react-select-3-option-0');
        await this.setAutocompleteInput(this.city, studentInfo.city, '#react-select-4-option-0');
        await this.setDate(studentInfo.dateOfBirth);
        await this.setGender(studentInfo.gender);
        await this.setHobbies(studentInfo.hobbies);
    }

    private async setSubjects(subjects?: string[]) {
        if (subjects) {
            for (const subject of subjects) {
                await this.setAutocompleteInput(this.subject, subject, '#react-select-2-option-0');
            }
        }
    }

    private async setAutocompleteInput(input: Locator, value: string | undefined, itemSelector: string) {
        if (value) {
            await input.fill(value);
            await this.page.locator(itemSelector).click();
        }
    }

    private async setDate(date: Date) {
        await this.dateOfBirth.click();
        await this.page.locator('.react-datepicker__year-select').selectOption(date.getFullYear().toString());
        await this.page.locator('.react-datepicker__month-select').selectOption(date.getMonth().toString());
        const monthName = date.toLocaleString('default', { month: 'long' });
        await this.page
            .locator('.react-datepicker__month')
            .locator(`//*[.='${date.getDate().toString()}'][contains(@aria-label,'${monthName}')]`)
            .click();
    }

    private async setGender(gender: Gender) {
        await this.page.getByText(gender, { exact: true }).click();
    }

    private async setHobbies(hobbies?: Hobby[]) {
        if (hobbies) {
            for (const hobby of hobbies) {
                await this.page.getByText(hobby).check();
            }
        }
    }

    async submitTheForm(): Promise<ModalWindow> {
        await this.page.locator('#submit').click();
        return new ModalWindow(this.page).waitForModalToOpen();
    }
}
