import { expect } from '@playwright/test';
import { test } from '../tests/fixture';
import { URLs } from '../utils/env';

test.describe('UI Components', () => {
    // test.beforeEach(async ({ page }) => {
    //     await page.goto(URLs.playground);
    //     await page.getByText('Forms').click();
    //     await page.getByText('Form Layouts').click();
    // });

    test('Input Fields', async ({ world, page }) => {
        await page.goto(URLs.playground);
        await page.getByText('Forms').click();
        await page.getByText('Form Layouts').click();
        const usingGridEmailInput = page.locator('nb-card', { hasText: "Using the Grid" }).getByRole('textbox', { name: 'Email' });
        await usingGridEmailInput.fill('test@example.com');
        await usingGridEmailInput.clear();
        await usingGridEmailInput.pressSequentially('akhilaraval@gmail.com')
        const inputValue = expect(await usingGridEmailInput.inputValue());
        expect(usingGridEmailInput).toHaveValue('akhilaraval@gmail.com');
        console.log(world);
    });
})