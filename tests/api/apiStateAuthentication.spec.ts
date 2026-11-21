import { test, expect } from '@playwright/test';
import { URLs } from '../../utils/env';


test('State Authenticating API Requests', async ({ page }) => {
    await page.goto(URLs.conduit);

    await page.getByRole('link', { name: 'New Article' }).click();
    await page.getByRole('textbox', { name: 'Article Title' }).fill('Hello World');
    await page.getByPlaceholder(`What's this article about?`).fill('Hello');
    await page.getByPlaceholder(`Write your article (in markdown)`).fill('Hello World');
    await page.getByRole('button', { name: 'Publish Article' }).click();

    await page.getByRole('link', { name: 'Home' }).click({ delay: 1000 });
    // await page.waitForResponse(`${URLs.conduit}/api/articles?limit=10&offset=0`);


    const firstArticle = await page.locator('.preview-link h1').first();
    await expect(firstArticle).toContainText('Hello World', { ignoreCase: true });
    await page.getByText('Hello World', { exact: false }).click();
    await page.getByRole('button', { name: 'Delete Article' }).nth(1).click();
    await page.waitForResponse(`${URLs.conduit}/api/articles?limit=10&offset=0`);
    await expect(firstArticle).not.toContainText('Hello World', { ignoreCase: true });
})

