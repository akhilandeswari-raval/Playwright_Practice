import test from '@playwright/test';
import { PageObjectManager } from '../page-objects/page-object-manager';

test.beforeEach(async ({ page }) => {
    await page.goto('https://playground.bondaracademy.com/pages/iot-dashboard');
});

test('Navigate to Forms Layout Page', async ({ page }) => {
    const pom = new PageObjectManager(page);
    await pom.pageNavigation.navigateToFormsPage('Datepicker');
    await pom.pageNavigation.navigateToModalsandOverlays('Tooltip');
    await pom.pageNavigation.navigateToTablesandData('Smart Table');
    await pom.pageNavigation.navigateToTablesandData('Tree Grid');
    await pom.pageNavigation.navigateToExtraComponents('Drag & Drop');
    await pom.pageNavigation.navigateToExtraComponents('Calendar');
});

test('Enter values in the Forms & Layouts page', async ({ page }) => {
    const pom = new PageObjectManager(page);
    await pom.pageNavigation.navigateToFormsPage('Form Layouts');

    await pom.formLayoutsPage.usingTheGrid('test@example.com', 'password123', 'Option 1');
    await pom.formLayoutsPage.usingInlineForm('Akhila Raval', 'raval@example.com', true);
    await pom.pageNavigation.navigateToFormsPage('Datepicker');

    await pom.datePickerPage.usingDatePickerToSelect(5);
    await pom.datePickerPage.usingRangePickerToSelect(5, 10);

});
