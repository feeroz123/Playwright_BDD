export const browserStackConfig = {
    username: process.env.BROWSERSTACK_USERNAME,
    accessKey: process.env.BROWSERSTACK_ACCESS_KEY,
    capabilities: {
        browserName: 'Chrome', // Specify desired browser
        browserVersion: 'latest', // Specify desired version
        os: 'Windows', // Specify desired OS
        osVersion: '11', // Specify desired OS version
    // Add other desired capabilities (e.g., resolution, mobile device settings)
    // You can adjust the capabilities object based on your requirements (e.g., different browsers, devices, OS versions).
    }
};
