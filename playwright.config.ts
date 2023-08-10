import { defineConfig } from '@playwright/test';

/**
 * Read environment variables from file.
 * https://github.com/motdotla/dotenv
 */
require('dotenv').config();

/**
 * See https://playwright.dev/docs/test-configuration.
 */
export default defineConfig({
    testDir: './src/tests',
    fullyParallel: true,
    forbidOnly: !!process.env.CI,
    retries: process.env.CI ? 1 : 0,
    workers: undefined, // undefined - to use maximum workers
    reporter: 'html',
    use: {
        baseURL: process.env.BASE_URL,
        actionTimeout: 3000,
        trace: 'on-first-retry',
        headless: !process.env.CI,
        viewport: { width: 1920, height: 1080 },
        launchOptions: {
            devtools: !!process.env.CI,
            args: ['--use-gl=egl'], // enable hardware acceleration locally
        },
    },
});
