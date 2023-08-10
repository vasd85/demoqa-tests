import { Locator, Page } from '@playwright/test';

export class DroppablePage {
    readonly page: Page;
    readonly draggable: Locator;
    readonly droppable: Locator;

    constructor(page: Page) {
        this.page = page;
        this.draggable = this.page.locator('#draggable');
        this.droppable = this.page.locator('#droppableExample-tabpane-simple #droppable');
    }

    async open() {
        await this.page.goto('/droppable');
    }

    async dragAndDrop() {
        await this.draggable.dragTo(this.droppable);
    }
}
