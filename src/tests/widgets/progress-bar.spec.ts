import { test } from '../../../fixture/test.fixture';
import { expect } from '@playwright/test';
import { ProgressBarState } from '../../../pages/progress-bar.page';

test.describe('Progress bar page tests', async () => {
    test('Verify the progress bar', async ({ page, progressBarPage }) => {
        await progressBarPage.open();

        // verify that progress bar has zero state
        const emptyProgressState = await progressBarPage.getProgressState();
        checkProgressStateIs(0, emptyProgressState);

        // verify there is progress on the progress bar
        await progressBarPage.clickStartStopButton();
        await page.waitForTimeout(2000);
        const firstProgressState = await progressBarPage.getProgressState();
        await page.waitForTimeout(2000);
        const secondProgressState = await progressBarPage.getProgressState();
        checkThatThereIsProgress(firstProgressState, secondProgressState);

        // verify that progress bar has filled
        await progressBarPage.waitForProgressCompleted();
        const fullProgressState = await progressBarPage.getProgressState();
        checkProgressStateIs(100, fullProgressState);
    });
});

/**
 * Verifies that attributes 'aria-valuenow', 'style' and inner text of the progress bar element
 * have values equal to @param value
 * @param value
 * @param progressState
 */
const checkProgressStateIs = (value: number, progressState: ProgressBarState): void => {
    for (const key of Object.keys(progressState) as Array<keyof ProgressBarState>) {
        expect.soft(progressState[key], `Check ${key}`).toEqual(value);
    }
};

/**
 * Compares values of attributes 'aria-valuenow', 'style' and inner text of the progress bar's
 * firstState and secondState, and checks there is a progress
 * @param firstState
 * @param secondState
 */
const checkThatThereIsProgress = (firstState: ProgressBarState, secondState: ProgressBarState): void => {
    for (const key of Object.keys(secondState) as Array<keyof ProgressBarState>) {
        expect.soft(secondState[key], `Check ${key}`).toBeGreaterThan(firstState[key]);
    }
};
