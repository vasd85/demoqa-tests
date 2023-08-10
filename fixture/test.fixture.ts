import { test as base } from '@playwright/test';
import { WebTablesPage } from '../pages/web-tables.page';
import { BrokenLinksImagesPage } from '../pages/broken-links-images.page';
import { PracticeFormPage } from '../pages/practice-form.page';
import { ProgressBarPage } from '../pages/progress-bar.page';
import { ToolTipsPage } from '../pages/tooltips.page';
import { DroppablePage } from '../pages/droppable.page';

export interface BaseTest {
    webTablesPage: WebTablesPage;
    brokenLinksImagesPage: BrokenLinksImagesPage;
    practiceFormPage: PracticeFormPage;
    progressBarPage: ProgressBarPage;
    toolTipsPage: ToolTipsPage;
    droppablePage: DroppablePage;
}

export const test = base.extend<BaseTest>({
    webTablesPage: async ({ page }, use) => {
        await use(new WebTablesPage(page));
    },
    brokenLinksImagesPage: async ({ page }, use) => {
        await use(new BrokenLinksImagesPage(page));
    },
    practiceFormPage: async ({ page }, use) => {
        await use(new PracticeFormPage(page));
    },
    progressBarPage: async ({ page }, use) => {
        await use(new ProgressBarPage(page));
    },
    toolTipsPage: async ({ page }, use) => {
        await use(new ToolTipsPage(page));
    },
    droppablePage: async ({ page }, use) => {
        await use(new DroppablePage(page));
    },
});
