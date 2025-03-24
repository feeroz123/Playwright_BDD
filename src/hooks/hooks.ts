import { Before, After, setDefaultTimeout } from "@cucumber/cucumber";
import { chromium, _android, Browser, Page, } from "playwright/test";
import { pageFixture } from "./pageFixture";

let page: Page;
let browser: Browser;
setDefaultTimeout(60 * 1000);

const buildNumber = process.env.BUILD_NUMBER || 'default-build-number';
const caps = {
    'browserstack.username': process.env.BROWSERSTACK_USERNAME || 'YOUR BROWSERSTACK USER NAME',
    'browserstack.accessKey': process.env.BROWSERSTACK_ACCESS_KEY || 'YOUR BROWSERSTACK ACCESS KEY',
    build: `${buildNumber}`,
    realMobile: false,
    browsers: [
        {
            name: 'ES PW - Windows-Chrome',
            browser: 'chrome',
            os: 'Windows',
            os_version: '11'
        },
        // {
        //     name: 'ES PW - MacOS-Safari',
        //     browser: 'safari',
        //     os: 'OS X',
        //     os_version: 'Sequoia'
        // },
        // {
        //     name: 'ES PW - Android-Chrome',
        //     osVersion: "12.0",
        //     deviceName: "Samsung Galaxy S22",
        //     browserName: "chrome",
        //     realMobile: "true"
        // }
    ]
}

Before(async () => {
    try {
        if (caps.realMobile) {
            let device = await _android.connect(
                `wss://cdp.browserstack.com/playwright?caps=
                    ${encodeURIComponent(JSON.stringify(caps))}`);
            await device.shell("am force-stop com.android.chrome");
        } else {
            // Legacy method as BrowserStack-Node-SDK is not supported in BrowserStack for Playwright with Cucumber framework
            browser = await chromium.connect({
                wsEndpoint: `wss://cdp.browserstack.com/playwright?caps=
                ${encodeURIComponent(JSON.stringify(caps))}`
            });
        }
    } catch (error) {
        console.error('Error connecting to BrowserStack:', error);
        throw error;
    }

    //browser = await chromium.launch({ headless: false, channel: 'chrome' });
    page = await browser.newPage();
    pageFixture.page = page;
});

// Before(async function () {
//     //browser = await chromium.launch({ headless: false, channel: 'chrome' });
//     page = await browser.newPage();
//     pageFixture.page = page;
// });

After(async function () {
    try {
        if (pageFixture.page) {
            await pageFixture.page.close();
        }
    } catch (error) {
        console.error('Error closing the page:', error);
    }

    try {
        if (browser) {
            await browser.close();
        }
    } catch (error) {
        console.error('Error closing the browser:', error);
    }
});
