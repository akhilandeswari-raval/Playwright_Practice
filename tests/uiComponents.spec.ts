import { test, expect } from '@playwright/test';
import { table } from 'node:console';
import { link } from 'node:fs';

test.beforeEach(async ({ page }) => {
    await page.goto('https://playground.bondaracademy.com/pages/iot-dashboard');
});

test.describe('UI Components', () => {
    test.beforeEach(async ({ page }) => {
        await page.getByText('Forms').click();
        await page.getByText('Form Layouts').click();
    });

    test('Input Fields', async ({ page }) => {
        const usingGridEmailInput = page.locator('nb-card', { hasText: "Using the Grid" }).getByRole('textbox', { name: 'Email' });
        await usingGridEmailInput.fill('test@example.com');
        await usingGridEmailInput.clear();
        await usingGridEmailInput.pressSequentially('akhilaraval@gmail.com', { delay: 500 }) // this will type the email address slowly

        const inputValue = expect(await usingGridEmailInput.inputValue());
        expect(usingGridEmailInput).toHaveValue('akhilaraval@gmail.com');

    });

    test('Radio buttons', async ({ page }) => {

        const usingGridCard = page.locator('nb-card', { hasText: "Using the Grid" });
        const option1Radio = usingGridCard.getByRole('radio', { name: 'Option 1' });
        const option2Radio = usingGridCard.getByRole('radio', { name: 'Option 2' });


        await option1Radio.check({ force: true });

        const option1RadioStatus = await option1Radio.isChecked();
        console.log('Option 1 Radio is checked: ', option1RadioStatus);
        expect(option1RadioStatus).toBeTruthy();

        const option2RadioStatus = await option2Radio.isChecked();
        console.log('Option 2 Radio is checked: ', option2RadioStatus);
        expect(option2RadioStatus).toBeFalsy();

        // Alternatively, you can use the built-in Playwright assertions to check the state of the radio buttons

        await expect(option1Radio).toBeChecked();
        await expect(option2Radio).not.toBeChecked();

        option2Radio.check({ force: true });
        await expect(option1Radio).not.toBeChecked();
        await expect(option2Radio).toBeChecked();
    });

    test('Checkboxes', async ({ page }) => {
        const rememberMeCheckbox = page.getByRole('checkbox', { name: 'Check me out' });
        await rememberMeCheckbox.check({ force: true });
        await expect(rememberMeCheckbox).toBeChecked();

    });
});

test('Lists and Dropdowns', async ({ page }) => {

    await page.getByText('Modal & Overlays').click();
    await page.getByText('Toastr').click();

    // await page.getByRole('combobox').selectOption('success');

    await page.locator('.form-group', { hasText: 'Toast type:' }).getByRole('combobox').selectOption('warning');

    // Dropdown Option 2

    const positionDropdown = page.locator('.form-group', { hasText: 'Position:' }).locator('nb-select');
    await positionDropdown.click();
    // await page.getByRole('list').getByText('top-end').click();

    const dropdownValues = await page.locator('nb-option').allTextContents();

    for (const value of dropdownValues) {
        console.log('Dropdown value: ', value);
        await page.locator('nb-option', { hasText: value }).click();
        await expect(positionDropdown).toHaveText(value);
        await positionDropdown.click();
    }

});

test('Working with Tooltips', async ({ page }) => {
    await page.getByText('Modal & Overlays').click();
    await page.getByText('Tooltip').click();
    await page.getByRole('button', { name: 'DANGER' }).hover();
    await expect(page.getByRole('tooltip')).toHaveText('This is a tooltip');

});

test('Working with Dialog Boxes', async ({ page }) => {
    await page.getByText('Tables & Data').click();
    await page.getByText('Smart Table').click();

    page.on('dialog', async dialog => {
        console.log(`Dialog message: ${dialog.message()}`);
        expect(dialog.message()).toBe('Are you sure you want to delete?');
        await dialog.accept();
    });
    await page.locator('tr', { hasText: 'mdo@gmail.com' }).locator('.nb-trash').click();

    await expect(page.locator('tr', { hasText: 'mdo@gmail.com' })).not.toBeVisible();
});

test('Working with Web Tables', async ({ page }) => {
    await page.getByText('Tables & Data').click();
    await page.getByText('Smart Table').click();

    const tableRows = page.getByRole('row', { name: "twitter@outlook.com" });

    tableRows.locator('.nb-edit').click();
    await tableRows.getByPlaceholder('Age').fill('35');
    await tableRows.getByPlaceholder('First Name').fill('Akhila');
    await tableRows.getByPlaceholder('Last Name').fill('Raval');
    await page.locator('.nb-checkmark').click();

    //get the row based on specific column
    await page.getByRole('link', { name: '2' }).click();

    const targetRow = page.getByRole('row').filter({ has: page.getByRole('cell').nth(1).getByText('11') });
    await targetRow.locator('.nb-edit').click();

    await page.locator('tbody').getByPlaceholder('E-mail').fill('test@testing.com');
    await page.locator('.nb-checkmark').click();

    await expect(targetRow.getByText('test@testing.com')).toBeVisible();
});

test('Filtering Smart Tables', async ({ page }) => {
    await page.getByText('Tables & Data').click();
    await page.getByText('Smart Table').click();

    const ages = ["20", "30", "40", "200"];
    for (let age of ages) {
        await page.getByPlaceholder('Age').fill(age);
        if (age == "200") {
            await expect(page.getByText('No data found')).toBeVisible();
        } else {
            await expect(page.locator('tbody tr').first().locator('td').last()).toHaveText(age);
            const rowData = await page.locator('tbody tr').all();
            for (const row of rowData) {
                await expect(row.locator('td').last()).toHaveText(age);

            }
        }
    }

});

test('Working with Date Pickers', async ({ page }) => {
    await page.getByText('Forms').click();
    await page.getByText('Datepicker').click();
    const dateInput = page.getByPlaceholder('Form picker');
    await dateInput.click();

    await page.locator('.day-cell:not(.bounding-month)').getByText('11').click();

    await dateInput.click();
    await page.getByRole('button', { name: 'October 2026' }).click();
    await page.locator('nb-calendar-picker').getByText('2026').click();
    await page.locator('nb-calendar-picker').getByText('AUG').click();
    await page.locator('[class="day-cell ng-star-inserted"]').getByText('6', { exact: true }).click();

});

test('Working with Date Pickers Javascript', async ({ page }) => {
    await page.getByText('Forms').click();
    await page.getByText('Datepicker').click();
    const dateInput = page.getByPlaceholder('Form picker');
    await dateInput.click();

    const dateToSelect = new Date();
    dateToSelect.setDate(dateToSelect.getDate() + 45); // Select a date 5 days from today

    // await page.locator('[class="day-cell ng-star-inserted"]').getByText(dateToSelect.getDate().toString(), { exact: true }).click(); //This is effective when we need to select by a dateInput. But not when we need to select a future dateInput.

    const expectedDate = dateToSelect.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
    const expectedMonth = dateToSelect.toLocaleDateString('en-US', { month: 'long' });
    console.log('Expected Date: ', expectedDate);
    console.log('Expected Month: ', expectedMonth);
    const expectedDay = dateToSelect.toLocaleDateString('en-US', { day: 'numeric' });
    console.log('Expected Day: ', expectedDay);
    const expectedYear = dateToSelect.toLocaleDateString('en-US', { year: 'numeric' });
    console.log('Expected Year: ', expectedYear);

    let currentMonthandYear = await page.locator('nb-calendar-view-mode').textContent();
    console.log('Current Month and Year: ', currentMonthandYear);

    const expectedMonthandYear = `${expectedMonth} ${expectedYear}`;
    // expect(currentMonthandYear).toBe(expectedMonthandYear);

    while (!currentMonthandYear?.includes(expectedMonthandYear)) {
        await page.locator('.next-month').click();
        currentMonthandYear = await page.locator('nb-calendar-view-mode').textContent();
    }

    await page.locator('[class="day-cell ng-star-inserted"]').getByText(expectedDay, { exact: true }).click();
});

test('Sliders', async ({ page }) => {
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

    // const x = box.x + box.width / 2;
    // const y = box.y + box.height / 2;

    const x = 100;
    const y = 100;

    await page.mouse.move(x, y);
    await page.mouse.down();
    await page.mouse.move(x + 100, y);
    await page.mouse.move(x + 100, y + 100);
    await page.mouse.up();
    await expect(tempBox).toContainText('30');
});
