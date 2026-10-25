import { test, Page } from '@playwright/test';

export class PageNavigation {
    private readonly page: Page;
    constructor(page: Page) {
        this.page = page;
    }
    async navigateToFormsPage(menuItem: string) {
        await this.checkIfAreaIsExpanded('Forms');
        await this.page.getByText(menuItem).click();
    }

    async navigateToModalsandOverlays(menuItem: string) {
        await this.checkIfAreaIsExpanded('Modal & Overlays');
        await this.page.getByText(menuItem).click();
    }

    async navigateToTablesandData(menuItem: string) {
        await this.checkIfAreaIsExpanded('Tables & Data');
        await this.page.getByText(menuItem).click();
    }

    async navigateToExtraComponents(menuItem: string) {
        await this.checkIfAreaIsExpanded('Extra Components');
        await this.page.getByText(menuItem).click();
    }

    private async checkIfAreaIsExpanded(areaName: string) {
        const area = this.page.getByTitle(areaName);
        const ariaExpanded = await area.getAttribute('aria-expanded');
        if (ariaExpanded === null) {
            throw new Error(`Element with title "${areaName}" does not have an "aria-expanded" attribute.`);
        } else if (ariaExpanded == 'false') {
            await area.click();
        }
    }
}
