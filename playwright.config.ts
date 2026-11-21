import { defineConfig, devices } from '@playwright/test';


/**
 * Read environment variables from file.
 * https://github.com/motdotla/dotenv
 */
import dotenv from 'dotenv';
import path from 'path';

const environment = process.env.ENV || 'qa';
dotenv.config({ path: path.resolve(__dirname, `../.env.${environment}`) });


/**
 * See https://playwright.dev/docs/test-configuration.
 */
export default defineConfig({

  fullyParallel: true,
  /* Fail the build on CI if you accidentally left test.only in the source code. */
  forbidOnly: !!process.env.CI,
  /* Retry on CI only */
  retries: process.env.CI ? 2 : 0,
  /* Opt out of parallel tests on CI. */
  workers: process.env.CI ? 1 : undefined,
  /* Reporter to use. See https://playwright.dev/docs/test-reporters */
  reporter: 'html',
  /* Shared settings for all the projects below. See https://playwright.dev/docs/api/class-testoptions. */
  use: {
    /* Collect trace when retrying the failed test. See https://playwright.dev/docs/trace-viewer */
    trace: 'on-first-retry',
    video: {
      mode: 'on',
      show: {
        actions: { position: 'top-left' },
        test: { position: 'top-right' }
      },
    },
  },
  globalSetup: './global-setup',
  globalTeardown: './global-teardown',
  /* Configure projects for major browsers */
  projects: [
    {
      name: 'mobile-test',
      use: {
        ...devices['Samsung Galaxy S20'],

      },
    },
    { name: 'setup', testMatch: /.*\.setup\.ts/ },
    {
      name: 'chromium',
      use: {
        ...devices['Desktop Chrome'],
        storageState: '/playwright/.auth/user.json',
      },
      dependencies: ['setup'],
    },

    {
      name: 'firefox',
      use: {
        ...devices['Desktop Firefox'],
        storageState: '/playwright/.auth/user.json',
      },
      dependencies: ['setup'],

    },

    {
      name: 'webkit',
      use: {
        ...devices['Desktop Safari'],
        storageState: '/playwright/.auth/user.json',
      },
      dependencies: ['setup'],
    },]
});
