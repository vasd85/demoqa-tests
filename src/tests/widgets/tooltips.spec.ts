import { test } from '../../../fixture/test.fixture';
import { expect } from '@playwright/test';

test.describe('Tool Tips page tests', async () => {
    test('Verify the button tool tip', async ({ toolTipsPage }) => {
        await toolTipsPage.open();
        await toolTipsPage.hoverOverTheButton();
        await expect(toolTipsPage.buttonToolTip).toHaveText('You hovered over the Button');
    });
});
