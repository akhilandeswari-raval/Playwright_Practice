import { test, expect } from '@playwright/test';
import tags from './../../testdata/apitags.json';
import { URLs } from '../../utils/env';

test.beforeEach(async ({ page }) => {

    await page.route(`${URLs.conduit}/api/tags`, async (route) => {
        await route.fulfill({
            json: tags
        });
    })

    await page.route(`${URLs.conduit}/api/articles*`, async (route) => {
        const response = await route.fetch();
        const responseJSON = await response.json();
        responseJSON.articles[0].favoritesCount = '1000000';

        await route.fulfill({
            json: responseJSON
        });
    });

    await page.route(`${URLs.conduit}/api/articles*`, async (route) => {
        const response = await route.fetch();
        const responseJSON = await response.json();
        const searchText = "Bondar Academy";
        const article = responseJSON.articles.find((article: any) => article.title.includes(searchText));

        console.log(article);

        if (article) {
            article.title = 'Discover Akhila Academy: Your Gateway to Efficient Learning';
            article.description = 'Explore the world of Akhila Academy and unlock your potential with our comprehensive learning resources.';
            article.body = 'Akhila Academy is dedicated to providing high-quality educational content that empowers learners to achieve their goals. Join us on a journey of discovery and growth.';
            article.favoritesCount = 1000000;
            article.author.username = 'Akhila Raval';
        }

        await route.fulfill({
            json: responseJSON
        });
    });
    await page.goto(URLs.conduit);
})

test('Mocking API', async ({ page }) => {
    await expect(page.locator('.navbar-brand')).toHaveText(/conduit/);
    await expect(page.locator('.sidebar .tag-pill')).toHaveText(tags.tags);
    const firstArticle = await page.locator('.preview-link h1').first();
    await expect(firstArticle).toContainText('Discover Akhila Academy: Your Gateway to Efficient Learning');
    await expect(page.getByRole('button', { name: '1000000' })).toBeVisible();
});