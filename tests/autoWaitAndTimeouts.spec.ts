import { test, expect } from "@playwright/test";

test.beforeEach(async ({page}, testInfo) => {
    //Auto-waiting
    await page.goto('http://uitestingplayground.com/ajax');
    await page.getByText('Button Triggering AJAX Request').click();
    // testInfo.setTimeout(20000); // Set a timeout of 20 seconds for this test. This will fail the test if it takes longer than this time to complete.
    testInfo.setTimeout(testInfo.timeout + 10000); // Increase the timeout for this test by 10 seconds. This will set the timeout for this test to 30 seconds.  
});

test('Auto-waiting for elements', async ({page}) => {

    const buttonText = await page.locator('.bg-success');
    // await expect(page.getByText('Data loaded with AJAX get request.')).toBeVisible();
    // await buttonText.click();
    // await buttonText.textContent();
    // await buttonText.allTextContents();
    // await buttonText.waitFor({state: "attached"});
    await expect(buttonText).toHaveText('Data loaded with AJAX get request.', {timeout: 15000});
});

test('Timeouts', async ({page}) => {
    //Timeouts
    test.setTimeout(10000); // Set a timeout of 20 seconds for this test. This will fail the test if it takes longer than this time to complete.
    const buttonText = await page.locator('.bg-success');
    await buttonText.click({timeout: 16000});
    await expect(buttonText).toHaveText('Data loaded with AJAX get request.', {timeout: 15000});

    test.slow(); // Mark this test as slow if it takes longer than 20 seconds to complete. This will not fail the test, 
    // but it will be marked as slow in the test report. This will slow the test by three times so the 10 seconds defined above 
    // will be 30 seconds and the test will be marked as slow in the test report.
});