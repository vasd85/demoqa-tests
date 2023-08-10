import { Locator, Page } from '@playwright/test';

export class ToolTipsPage {
    readonly page: Page;
    readonly hoverMeButton: Locator;
    readonly buttonToolTip: Locator;

    constructor(page: Page) {
        this.page = page;
        this.hoverMeButton = this.page.locator('#toolTipButton');
        this.buttonToolTip = this.page.locator('#buttonToolTip');
    }

    async open() {
        await this.page.goto('/tool-tips');
    }

    async hoverOverTheButton() {
        await this.hoverMeButton.hover();
    }
}
