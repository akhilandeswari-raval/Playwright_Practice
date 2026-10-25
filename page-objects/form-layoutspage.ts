import { test, Page } from '@playwright/test';

export class FormLayoutsPage {
    private readonly page: Page;

    constructor(page: Page) {
        this.page = page;
    }

    async usingTheGrid(email: string, password: string, option: string) {
        const usingGridCard = this.page.locator('nb-card', { hasText: "Using the Grid" });
        await usingGridCard.getByRole('textbox', { name: 'Email' }).fill(email);
        await usingGridCard.getByRole('textbox', { name: 'Password' }).fill(password);
        await usingGridCard.getByText(option).check({ force: true });
        await usingGridCard.getByRole('button', { name: 'Sign in' }).click();
    }

    /**
     * This method uses the inline form to fill in the username, email, and optionally check the "Remember me" checkbox.
     * @param username 
     * @param email 
     * @param rememberMeCheckbox 
     */
    async usingInlineForm(username: string, email: string, rememberMeCheckbox: boolean) {
        const inlineFormCard = this.page.locator('nb-card', { hasText: "Inline form" });
        await inlineFormCard.getByRole('textbox', { name: 'Jane Doe' }).fill(username);
        await inlineFormCard.getByRole('textbox', { name: 'Email' }).fill(email);
        if (rememberMeCheckbox) {
            await inlineFormCard.getByRole('checkbox', { name: 'Remember me' }).check({ force: true });
        }
        await inlineFormCard.getByRole('checkbox', { name: 'Remember me' }).setChecked(rememberMeCheckbox);
    }
}