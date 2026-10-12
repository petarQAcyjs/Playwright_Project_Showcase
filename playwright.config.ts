import { defineConfig, devices } from '@playwright/test';
import { ENV } from './config/env.config';

export default defineConfig({
  testDir: './tests',
  fullyParallel: true,
  forbidOnly: ENV.IS_CI,
  retries: ENV.IS_CI ? 2 : 0,
  workers: ENV.IS_CI ? 2 : undefined,
  timeout: ENV.DEFAULT_TIMEOUT,

  reporter: [
    ['html', { outputFolder: 'playwright-report', open: 'never' }],
    ['list'],
    ['json', { outputFile: 'test-results/results.json' }]
  ],

  use: {
    baseURL: 'http://localhost:8080',
    trace: 'on-first-retry',
    screenshot: 'only-on-failure',
    video: 'retain-on-failure',
    actionTimeout: 10000,
    navigationTimeout: 15000,
  },

  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },
    {
      name: 'api-tests',
      testMatch: /.*\.spec\.ts/,
      use: {
        baseURL: ENV.API_BASE_URL,
        ignoreHTTPSErrors: true,
      },
    },
  ],

  // Playwright samostalno podiže lokalni HTTP server pre pokretanja UI testova
  webServer: {
    command: 'npx serve public -p 8080',
    port: 8080,
    reuseExistingServer: !ENV.IS_CI,
  },
});
