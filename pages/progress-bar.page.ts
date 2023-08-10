import { Locator, Page } from '@playwright/test';

export type ProgressBarState = {
    ariaValueNow: number;
    styleWidth: number;
    displayed: number;
};

export class ProgressBarPage {
    readonly page: Page;
    readonly progressBar: Locator;
    readonly startStopButton: Locator;
    readonly resetButton: Locator;

    constructor(page: Page) {
        this.page = page;
        this.progressBar = this.page.getByRole('progressbar');
        this.startStopButton = this.page.locator('#startStopButton');
        this.resetButton = this.page.locator('#resetButton');
    }

    async open() {
        await this.page.goto('/progress-bar');
    }

    async clickStartStopButton() {
        await this.startStopButton.click();
    }

    async getProgressState(): Promise<ProgressBarState> {
        const ariaValueNow = await this.extractValue(this.progressBar.getAttribute('aria-valuenow'));
        const styleText = await this.progressBar.getAttribute('style');
        const matched = styleText?.match(/width: (\d+)%/)?.[1] ?? '0';
        const styleWidth = parseInt(matched, 10);
        const displayed = await this.extractValue(this.progressBar.innerText());

        return {
            ariaValueNow,
            styleWidth,
            displayed,
        };
    }

    private async extractValue(promise: Promise<string | null>): Promise<number> {
        const value = await promise;
        if (!value) {
            throw new Error(`Value mustn't be null.`);
        }
        return parseInt(value, 10);
    }

    async waitForProgressCompleted() {
        await this.resetButton.waitFor({ state: 'visible', timeout: 15_000 });
    }
}
