import { test, expect } from '@playwright/test';
import { PageObjectManager } from '../../page-objects/page-object-manager';

test('Passing API Requests', async ({ page, request }) => {
    const pom = new PageObjectManager(page);
    const loginResponse = await request.post('https://conduit-api.bondaracademy.com/api/users/login', {
        data: { "user": { "email": "araval@testing.com", "password": "Testing@1234" } }
    });

    expect(loginResponse.status()).toEqual(200);
    const jsonResponse = await loginResponse.json();
    const token = jsonResponse.user.token;

    const newArticle = await request.post('https://conduit-api.bondaracademy.com/api/articles/', {
        data: { "article": { "title": "HELLO WORLD", "description": "WORLD", "body": "HELLO,\nHOW ARE YOU ?", "tagList": ["NEW ARTICLE"] } },
        headers: {
            Authorization: `Token ${token}`
        }
    })
    expect(newArticle.status()).toEqual(201);

    pom.pageNavigation.loginToConduitPage();
    await expect(page.locator('.nav-link', { hasText: 'araval' }));

    const firstArticle = await page.locator('.preview-link h1').first();
    await expect(firstArticle).toContainText('hello world', { ignoreCase: true });
    await page.getByText('hello world', { exact: false }).click();
    await page.getByRole('button', { name: 'Delete Article' }).nth(1).click();
    await page.waitForResponse('https://conduit-api.bondaracademy.com/api/articles?limit=10&offset=0');
    await expect(firstArticle).not.toContainText('hello world', { ignoreCase: true });
})

test('Deleting Posts using API Requests', async ({ page, request }) => {
    const pom = new PageObjectManager(page);
    const loginResponse = await request.post('https://conduit-api.bondaracademy.com/api/users/login', {
        data: { "user": { "email": "araval@testing.com", "password": "Testing@1234" } }
    });

    expect(loginResponse.status()).toEqual(200);
    const jsonResponse = await loginResponse.json();
    const token = jsonResponse.user.token;

    const newArticle = await request.post('https://conduit-api.bondaracademy.com/api/articles/', {
        data: { "article": { "title": "HELLO WORLD", "description": "WORLD", "body": "HELLO,\nHOW ARE YOU ?", "tagList": ["NEW ARTICLE"] } },
        headers: {
            Authorization: `Token ${token}`
        }
    })
    expect(newArticle.status()).toEqual(201);

    pom.pageNavigation.loginToConduitPage();
    await page.getByText('Home').click();

    const firstArticle = await page.locator('.preview-link h1').first();
    await expect(firstArticle).toContainText('HELLO WORLD', { ignoreCase: true });

    const newArticleJSON = await newArticle.json();
    const slug = newArticleJSON.article.slug;

    const deleteArticle = await request.delete(`https://conduit-api.bondaracademy.com/api/articles/${slug}`, {
        headers: {
            Authorization: `Token ${token}`
        }
    })

    expect(deleteArticle.status()).toEqual(204);
    await page.reload();
    await page.waitForResponse('https://conduit-api.bondaracademy.com/api/articles?limit=10&offset=0');
    await expect(firstArticle).not.toContainText('hello world', { ignoreCase: true });

})

