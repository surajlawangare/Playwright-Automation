
const { defineConfig, devices } = require('@playwright/test');

require('dotenv').config();

const BASE_URL = process.env.BASE_URL;
const HEADLESS = process.env.HEADLESS === 'true';
const DEFAULT_TIMEOUT = Number(process.env.TIMEOUT);

module.exports = defineConfig({
  testDir: './tests',
  /* Run tests in files in parallel */
  fullyParallel: true,
  /* Fail the build on CI if you accidentally left test.only in the source code. */
  forbidOnly: !!process.env.CI,
  /* Retry on CI only */
  retries: process.env.CI ? 2 : 0,
  /* Opt out of parallel tests on CI. */
  workers: process.env.CI ? 1 : undefined,
 
  reporter: [
  ['list'],
  ['html', { open: 'never' }]
],
 
use: {
  baseURL: BASE_URL,

  headless: HEADLESS,

  actionTimeout: DEFAULT_TIMEOUT,

  navigationTimeout: DEFAULT_TIMEOUT,

  screenshot: 'only-on-failure',

  video: 'retain-on-failure',

  trace: 'on-first-retry',

  viewport: {
    width: 1920,
    height: 1080
  },

  ignoreHTTPSErrors: true,

  acceptDownloads: true,

  launchOptions: {
    slowMo: 0
  }
},


projects: [
  {
    name: 'chromium',
    use: {
      ...devices['Desktop Chrome']
    }
  }
]


});

