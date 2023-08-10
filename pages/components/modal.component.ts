import { Page } from '@playwright/test';

export class ModalWindow {
    constructor(readonly page: Page) {}

    async waitForModalToOpen(): Promise<ModalWindow> {
        await this.page.locator('.modal-content').waitFor({ state: 'attached' });
        return this;
    }
}
