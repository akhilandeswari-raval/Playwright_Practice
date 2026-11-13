import { test, expect } from '@playwright/test';

test.describe('UI Components', () => {
    test.beforeEach(async ({ page }) => {
        await page.goto('https://playground.bondaracademy.com/pages/iot-dashboard');
        await page.getByText('Forms').click();
        await page.getByText('Form Layouts').click();
    });

    test('Input Fields', async ({ page }) => {
        const usingGridEmailInput = page.locator('nb-card', { hasText: "Using the Grid" }).getByRole('textbox', { name: 'Email' });
        await usingGridEmailInput.fill('test@example.com');
        await usingGridEmailInput.clear();
        await usingGridEmailInput.pressSequentially('akhilaraval@gmail.com')
        const inputValue = expect(await usingGridEmailInput.inputValue());
        expect(usingGridEmailInput).toHaveValue('akhilaraval@gmail.com');
        if (testInfo().title === 'Input Fields') {
        });
});