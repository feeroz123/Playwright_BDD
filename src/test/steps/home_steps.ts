import { Given, When, Then } from '@cucumber/cucumber';
import { expect } from '@playwright/test';
import { HomePage } from '../page_classes/home_page';
import { pageFixture } from '../../hooks/pageFixture';
import { LoginPage } from '../page_classes/login_page';

let homePage: HomePage;

Given('I navigate to {string}', { timeout: 60000 }, async (url: string) => {
    await pageFixture.page.goto(url);
    homePage = new HomePage(); // Initialize HomepageFixture object here
});

Then('I should see the User button', async () => {
    const userButton = await homePage.getUserButton();
    expect(userButton).toBeVisible();
});

Then('I should see the Cart button', async () => {
    const cartButton = await homePage.getCartButton();
    expect(cartButton).toBeVisible();
});

When('I click on the User button', { timeout: 60000 }, async function () {
    const userButton = await homePage.getUserButton();
    userButton ? await userButton.click() : console.log('User button not found');
});

When('I click on the Cart button', async function () {
    const cartButton = await homePage.getCartButton();
    cartButton ? await cartButton.click() : console.log('Cart button not found');
});

Then('I should see the Sign In button', async function () {
    const signIn = await homePage.getSignIn();
    expect(signIn).toBeVisible();
});

Then('I should see the Sign Here link', async function () {
    const signHere = await homePage.getStartHere();
    expect(signHere).toBeVisible();
});

When('I click on the Sign In button', async function () {
    const signIn = await homePage.getSignIn();
    signIn ? await signIn.click() : console.log('Sign In button not found');
});



