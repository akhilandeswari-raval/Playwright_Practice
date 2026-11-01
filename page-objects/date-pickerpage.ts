import { expect, Page } from '@playwright/test';
import { step } from '../helpers/testStepDecorator';

export class DatePickerPage {
    private readonly page: Page;

    constructor(page: Page) {
        this.page = page;
    }

    @step
    async usingDatePickerToSelect(daysFromToday: number) {
        const dateInput = this.page.getByPlaceholder('Form picker');
        await dateInput.click();

        const expectedDate = await this.dateSelector(daysFromToday);
        await expect(dateInput).toHaveValue(expectedDate);
    }

    async usingRangePickerToSelect(daysStart: number, daysEnd: number) {
        const dateInput = this.page.getByPlaceholder('Range picker');
        await dateInput.click();

        const startDate = await this.dateSelector(daysStart);
        const endDate = await this.dateSelector(daysEnd);
        await expect(dateInput).toHaveValue(`${startDate} - ${endDate}`);
    }

    private async dateSelector(dateToPick: number) {
        const dateToSelect = new Date();

        dateToSelect.setDate(dateToSelect.getDate() + dateToPick); // Select a date 5 days from today

        const expectedDate = dateToSelect.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
        const expectedMonth = dateToSelect.toLocaleDateString('en-US', { month: 'long' });
        const expectedDay = dateToSelect.toLocaleDateString('en-US', { day: 'numeric' });
        const expectedYear = dateToSelect.toLocaleDateString('en-US', { year: 'numeric' });
        // await page.locator('[class="day-cell ng-star-inserted"]').getByText(dateToSelect.getDate().toString(), { exact: true }).click(); //This is effective when we need to select by a dateInput. But not when we need to select a future dateInput.


        console.log('Expected Date: ', expectedDate);
        console.log('Expected Month: ', expectedMonth);
        console.log('Expected Day: ', expectedDay);
        console.log('Expected Year: ', expectedYear);

        let currentMonthandYear = await this.page.locator('nb-calendar-view-mode').textContent();
        console.log('Current Month and Year: ', currentMonthandYear);

        const expectedMonthandYear = `${expectedMonth} ${expectedYear}`;
        // expect(currentMonthandYear).toBe(expectedMonthandYear);

        while (!currentMonthandYear?.includes(expectedMonthandYear)) {
            await this.page.locator('.next-month').click();
            currentMonthandYear = await this.page.locator('nb-calendar-view-mode').textContent();
        }

        await this.page.locator('.day-cell:not(.bounding-month)').getByText(expectedDay, { exact: true }).click();
        return expectedDate;
    }
}