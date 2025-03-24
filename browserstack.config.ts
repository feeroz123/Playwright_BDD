export const config = {
    user: process.env.BROWSERSTACK_USERNAME,
    key: process.env.BROWSERSTACK_ACCESS_KEY,
    server: 'hub-cloud.browserstack.com',
    capabilities: {
        'browserstack.debug': true
    },
    browsers: [
        { browser: 'chrome', os: 'Windows', os_version: '11' },
        { browser: 'safari', os: 'OS X', os_version: 'Sequoia' }
    ],
};