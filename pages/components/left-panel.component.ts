import { Locator, Page } from '@playwright/test';
import { ItemGroup } from '../../models/element-groups.model';
import { findElement } from '../../helpers/elements.helper';

export class LeftPanel {
    constructor(readonly page: Page) {}

    getItemGroup(group: ItemGroup): Locator {
        return this.page.locator(`//*[@class='element-group'][.//div[.='${group.name}']]`);
    }

    async isExpended(group: Locator): Promise<boolean> {
        const attribute = await group.locator('.collapse').getAttribute('class');
        return attribute!.includes('show');
    }

    async waitTitle(title: string) {
        await this.page.locator('.main-header').and(this.page.getByText(title)).waitFor({ state: 'visible' });
    }

    async getGroupItems(group: Locator): Promise<Locator[]> {
        return group.locator('li').all();
    }

    async openItem(itemName: string, group: Locator): Promise<void> {
        const items: Locator[] = await this.getGroupItems(group);
        const matchingFunction = async (item: Locator) => {
            const text = await item.innerText();
            return text.trim() === itemName;
        };
        const targetItem = await findElement(items, matchingFunction);
        await targetItem.click();
    }
}
