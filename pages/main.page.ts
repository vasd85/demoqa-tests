import { Page } from '@playwright/test';
import { ItemGroup } from '../models/element-groups.model';
import { LeftPanel } from './components/left-panel.component';

export class MainPage {
    readonly page: Page;

    constructor(page: Page) {
        this.page = page;
    }

    async open() {
        await this.page.goto('/');
    }

    async openItemGroup(group: ItemGroup): Promise<LeftPanel> {
        await this.page.locator(`//*[@class='card-body'][.='${group.name}']`).click();
        return new LeftPanel(this.page);
    }
}
