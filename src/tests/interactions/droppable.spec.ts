import { test } from '../../../fixture/test.fixture';
import { expect } from '@playwright/test';

test.describe('Droppable page tests', async () => {
    test('Verify user can drag and drop', async ({ droppablePage }) => {
        await droppablePage.open();
        await droppablePage.dragAndDrop();
        await expect(droppablePage.droppable).toHaveText('Dropped!');
    });
});
