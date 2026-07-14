import {test, expect} from '@playwright/test';
import { table } from 'node:console';

test.beforeEach(async ({page}) => {
    await page.goto('http://localhost:4200/');
});

test.describe('UI Components', () => {
    test.beforeEach(async ({page}) => {
        await page.getByText('Forms').click();
        await page.getByText('Form Layouts').click();
    });

    test('Input Fields', async ({page}) => {
        const usingGridEmailInput = page.locator('nb-card', {hasText: "Using the Grid"}).getByRole('textbox', {name: 'Email'});
        await usingGridEmailInput.fill('test@example.com');
        await usingGridEmailInput.clear();
        await usingGridEmailInput.pressSequentially('akhilaraval@gmail.com', {delay: 500}) // this will type the email address slowly
    });

    test('Radio buttons', async ({page}) => {

        const usingGridCard = page.locator('nb-card', {hasText: "Using the Grid"});
        const option1Radio = usingGridCard.getByRole('radio', {name: 'Option 1'});
        const option2Radio = usingGridCard.getByRole('radio', {name: 'Option 2'});
        

        await option1Radio.check({force: true});
       
        const option1RadioStatus = await option1Radio.isChecked();
        console.log('Option 1 Radio is checked: ', option1RadioStatus);
        expect(option1RadioStatus).toBeTruthy();

        const option2RadioStatus = await option2Radio.isChecked();
        console.log('Option 2 Radio is checked: ', option2RadioStatus);
        expect(option2RadioStatus).toBeFalsy();

        // Alternatively, you can use the built-in Playwright assertions to check the state of the radio buttons
        
        await expect(option1Radio).toBeChecked();
        await expect(option2Radio).not.toBeChecked();

        option2Radio.check({force: true});
        await expect(option1Radio).not.toBeChecked();
        await expect(option2Radio).toBeChecked();
    });

    test('Lists and Dropdowns', async ({page}) => {
        const dropdownMenu = page.locator('ngx-header nb-select');
        await dropdownMenu.click();

        const dropdownOptions = page.locator('nb-option-list nb-option');
        const optionCount = await dropdownOptions.count();

        console.log('Number of options in the dropdown: ', optionCount);
        const expectedOptions = ['Light', 'Dark'];

        const allOptionTexts = (await dropdownOptions.allTextContents()).map(option => option.trim());

        for(const option of expectedOptions) {
            expect(allOptionTexts).toContain(option);
            console.log('Dropdown option: ', option);
            // expect(expectedOptions).toContain(option?.trim());
        }
        await dropdownOptions.filter({hasText: 'Dark'}).click();
    });

    test('Working with Web Tables', async ({page}) => {
        await page.getByText('Tables & Data').click();
        await page.getByText('Smart Table').click();

        const tableRows = page.getByRole('row', {name: "twitter@outlook.com"});
        
        tableRows.locator('.nb-edit').click();
        await page.locator('input-editor').getByPlaceholder('Age').clear();
        await page.locator('input-editor').getByPlaceholder('First Name').clear();
        await page.locator('input-editor').getByPlaceholder('Last Name').clear();
        await page.locator('input-editor').getByPlaceholder('Age').fill('35');
        await page.locator('input-editor').getByPlaceholder('First Name').fill('Akhila');
        await page.locator('input-editor').getByPlaceholder('Last Name').fill('Raval');
        await page.locator('.nb-checkmark').click();

        //get the row based on specific column
        await page.locator('.ng2-smart-pagination-nav').getByText('2').click();
        const targetRow = page.getByRole('row', {name: "11"}).filter({has: page.locator('td').nth(1).getByText('11')});
        targetRow.locator('.nb-edit').click();

        await page.locator('input-editor').getByPlaceholder('E-mail').clear();
        await page.locator('input-editor').getByPlaceholder('E-mail').fill('akhilaraval@gmail.com');
        await page.locator('.nb-checkmark').click();

        await expect(targetRow.getByText('akhilaraval@gmail.com')).toBeVisible();

        const secondTarget = page.getByRole('row', {name: "12"}).filter({has: page.locator('td').nth(1).getByText('12')});
        secondTarget.locator('.nb-edit').click();
        await page.locator('input-editor').getByPlaceholder('E-mail').clear();
        await page.locator('input-editor').getByPlaceholder('E-mail').fill('test@test.com');
        await page.locator('.nb-checkmark').click();
    });

    test('Working with Date Pickers', async ({page}) => {
        await page.getByText('Forms').click();
        await page.getByText('Datepicker').click();
        const dateInput = page.getByPlaceholder('Form picker');
        await dateInput.click();

        await page.getByRole('button', {name: 'March 2026'}).click();
        await page.locator('nb-calendar-picker').getByText('2026').click();
        await page.locator('nb-calendar-picker').getByText('AUG').click();
        await page.locator('[class="day-cell ng-star-inserted"]').getByText('6',{exact: true}).click();

    });

    test('Sliders', async ({page}) => {
        page.getByTitle('IoT Dashboard').click();
        const tempGuage = page.locator('[tabtitle="Temperature"] ngx-temperature-dragger circle');
        await tempGuage.evaluate(node => {
            node.setAttribute('cx', '232.63095238095238');
            node.setAttribute('cy', '232.63095238095238');
        })
        await tempGuage.click();

        //Mouse Movement
        const tempBox = page.locator('[tabtitle="Temperature"] ngx-temperature-dragger');
        await tempBox.scrollIntoViewIfNeeded();
        
        const box = await tempBox.boundingBox();
        if (!box) {
            throw new Error('Unable to get bounding box for temperature element');
        }
        const x = box.x + box.width / 2;
        const y = box.y + box.height / 2;

        await page.mouse.move(x, y);
        await page.mouse.down();
        await page.mouse.move(x + 100, y);
        await page.mouse.move(x + 100, y + 100);
        await page.mouse.up();
        await expect(tempBox).toContainText('30');
    });
});