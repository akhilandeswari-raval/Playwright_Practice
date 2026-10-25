import test from '@playwright/test';
import { PageNavigation } from '../page-objects/pageNavigation';
import { FormLayoutsPage } from '../page-objects/form-layoutspage';

test.beforeEach(async ({ page }) => {
    await page.goto('https://playground.bondaracademy.com/pages/iot-dashboard');
});

test('Navigate to Forms Layout Page', async ({ page }) => {
    const pageNavigation = new PageNavigation(page);
    await pageNavigation.navigateToFormsPage('Datepicker');
    await pageNavigation.navigateToModalsandOverlays('Tooltip');
    await pageNavigation.navigateToTablesandData('Smart Table');
    await pageNavigation.navigateToTablesandData('Tree Grid');
    await pageNavigation.navigateToExtraComponents('Drag & Drop');
    await pageNavigation.navigateToExtraComponents('Calendar');
});

test('Enter values in the Forms & Layouts page', async ({ page }) => {
    const pageNavigation = new PageNavigation(page);
    await pageNavigation.navigateToFormsPage('Form Layouts');
    const formLayoutsPage = new FormLayoutsPage(page);
    await formLayoutsPage.usingTheGrid('test@example.com', 'password123', 'Option 1');
    await formLayoutsPage.usingInlineForm('Akhila Raval', 'raval@example.com', true);
});
