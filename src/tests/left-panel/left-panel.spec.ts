import { test } from '../../../fixture/test.fixture';
import { ITEM_GROUPS, ItemGroup } from '../../../models/element-groups.model';
import { LeftPanel } from '../../../pages/components/left-panel.component';
import { expect, Page } from '@playwright/test';

test.describe('Left panel tests', () => {
    Object.values(ITEM_GROUPS).forEach((group) => {
        test(`Navigation through item group '${group.name}'`, async ({ page, mainPage }) => {
            await mainPage.open();
            const leftPanel = await mainPage.openItemGroup(group);
            await leftPanel.waitTitle(group.name);
            await verifyLeftPanelItemGroupIcon(leftPanel, group);
            await verifyLeftPanelItemList(leftPanel, group, page);
        });
    });
});

const verifyLeftPanelItemGroupIcon = async (leftPanel: LeftPanel, group: ItemGroup) => {
    const groupLocator = leftPanel.getItemGroup(group);
    const groupIconLocator = groupLocator.locator('.header-text svg');
    const iconPathLocator = groupIconLocator.locator('path');

    await expect.soft(groupIconLocator).toHaveAttribute('viewBox', group.icon.viewBox);
    await expect.soft(iconPathLocator).toHaveAttribute('d', group.icon.path.d);

    if (group.icon.path.fill_rule) {
        await expect.soft(iconPathLocator).toHaveAttribute('fill-rule', group.icon.path.fill_rule);
    } else {
        expect.soft(await iconPathLocator.getAttribute('fill-rule')).toBeNull();
    }
};

const verifyLeftPanelItemList = async (leftPanel: LeftPanel, group: ItemGroup, page: Page) => {
    const groupLocator = leftPanel.getItemGroup(group);
    const items = await leftPanel.getGroupItems(groupLocator);

    for (const [index, item] of items.entries()) {
        await item.click();
        await expect.soft(item).toHaveText(group.items[index].name);
        await expect.soft(page.url()).toMatch(new RegExp(`${group.items[index].path}$`));
    }

    expect.soft(await leftPanel.isExpended(groupLocator)).toBeTruthy();
};
