import { Page } from '@playwright/test';

export class BrokenLinksImagesPage {
    constructor(readonly page: Page) {}

    async open() {
        await this.page.goto('/broken');
    }

    async getImgUrlByTitle(imageTitle: string): Promise<string> {
        const url = await this.page.getByText(imageTitle).locator('+ img').getAttribute('src');

        if (!url || url.length <= 1) {
            throw new Error('Image url must be not empty');
        }

        return url;
    }
}
