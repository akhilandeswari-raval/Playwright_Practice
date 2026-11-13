import { test as setup, expect } from '@playwright/test';
import fs from 'fs';

const authFile = '/playwright/.auth/user.json';


setup('authenticate', async ({ page, request }) => {
    if (fs.existsSync(authFile)) {

        const loginResponse = await request.post('https://conduit-api.bondaracademy.com/api/users/login', {
            data: { "user": { "email": "araval@testing.com", "password": "Testing@1234" } }
        });

        expect(loginResponse.status()).toEqual(200);
        const jsonResponse = await loginResponse.json();
        const token = jsonResponse.user.token;

        const storageState = JSON.parse(fs.readFileSync(authFile, 'utf-8'));
        storageState.origins[0].localStorage.value = token; // Update the token in the storage state
        fs.writeFileSync(authFile, JSON.stringify(storageState));

    } else {
        // Perform authentication steps. Replace these actions with your own.
        await page.goto('https://conduit.bondaracademy.com/');
        await page.getByText('Sign in').click();
        await page.getByRole('textbox', { name: 'Email' }).fill('araval@testing.com');
        await page.getByRole('textbox', { name: 'Password' }).fill('Testing@1234');
        await page.getByRole('button', { name: 'Sign in' }).click();
        // Wait until the page receives the cookies.
        //
        // Sometimes login flow sets cookies in the process of several redirects.
        // Wait for the final URL to ensure that the cookies are actually set.
        await page.waitForURL('https://conduit.bondaracademy.com/');

        // Alternatively, you can wait until the page reaches a state where all cookies are set.
        await expect(page.locator('.nav-link', { hasText: 'araval' }));

        // End of authentication steps.

        await page.context().storageState({ path: authFile });
    }
});