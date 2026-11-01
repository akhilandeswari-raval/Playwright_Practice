import { test, Page } from '@playwright/test';
import { step } from '../helpers/testStepDecorator';
import { link } from 'node:fs';

export class PageNavigation {
    private readonly page: Page;
    constructor(page: Page) {
        this.page = page;
    }

    @step
    async navigateToFormsPage(menuItem: string): Promise<void> {
        await this.checkIfAreaIsExpanded('Forms');
        await this.page.getByText(menuItem).click();
    }

    @step
    async navigateToModalsandOverlays(menuItem: string): Promise<void> {
        await this.checkIfAreaIsExpanded('Modal & Overlays');
        await this.page.getByText(menuItem).click();
    }

    @step
    async navigateToTablesandData(menuItem: string): Promise<void> {
        await this.checkIfAreaIsExpanded('Tables & Data');
        await this.page.getByText(menuItem).click();
    }

    @step
    async navigateToExtraComponents(menuItem: string): Promise<void> {
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

    async loginToConduitPage() {
        await this.page.goto('https://conduit.bondaracademy.com/');
        await this.page.getByText('Sign in').click();
        await this.page.getByRole('textbox', { name: 'Email' }).fill('araval@testing.com');
        await this.page.getByRole('textbox', { name: 'Password' }).fill('Testing@1234');
        await this.page.getByRole('button', { name: 'Sign in' }).click();
    }

    async loginToConduitWithAPI() {

    }
}
