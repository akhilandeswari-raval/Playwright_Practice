import {expect, test} from '@playwright/test';

test.beforeEach(async ({page}) => {
 await page.goto('http://localhost:4200/');
  await page.getByText('Forms').click();
 await page.getByText('Form Layouts').click();
});



test('locators test', async ({page}) => {

 await page.locator(':text("Using the Grid")').dblclick();
 await page.getByRole('button', {name: 'Sign in'}).first().click();
 await page.locator('nb-card').filter({hasText: 'Using the Grid'}).getByPlaceholder('Email').click();
 await page.getByLabel('Password').first().click();
 await page.getByTitle('IoT Dashboard').click();


 await page.getByText('Forms').click();
 await page.getByText('Form Layouts').click();
 await page.getByTestId('akhila').click();
});

test('Using the parent locator', async ({page}) => {    

    await page.locator('nb-card', {hasText: 'Using the Grid'}).getByRole('button', {name: 'Sign in'}).click();
    await page.locator('nb-card', {hasText: 'Basic form'}).getByPlaceholder('Email').click();

    await page.locator('nb-card').filter({has: page.locator('.status-danger')}).locator('span').first().click();
});

test('Extracting Values', async ({page}) => {
    //Single test value
    const basicForm = await page.locator('nb-card', {hasText: 'Basic form'});
    const buttonText = await basicForm.locator('button').first().textContent();
    expect(buttonText).toBe('Submit');

    //Multiple test values
    const allTitles = await page.locator('label').allTextContents();
    // expect(allTitles).toContain("Remember me");
    expect(allTitles).toEqual(expect.arrayContaining([
    "Remember me",
    "Email",
    "Password",
    "Radios",
    "Option 1",
    ]),
);

const allTitles1 = await page.locator('label').allTextContents();
const expected = ["Remember me", "Email", "Password", "Radios", "Option 1"];

for (const text of expected) {
  expect(allTitles1).toContain(text);
}


    //input value
    const emailField = basicForm.getByRole('textbox', {name: 'Email'});
    await emailField.fill('akhila.raval@gmail.com');
    const emailValue = await emailField.inputValue();
    expect(emailValue).toBe('akhila.raval@gmail.com');

    const placeholderValue = await emailField.getAttribute('placeholder');
    expect(placeholderValue).toEqual('Email');
});