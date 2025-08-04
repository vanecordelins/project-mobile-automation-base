import { Given, When, Then } from '@wdio/cucumber-framework';
import HomePage from '../pages/HomePage.js';
import LoginPage from '../pages/LoginPage.js';
import SignUpPage from '../pages/SignUpPage.js';
import FormsPage from '../pages/FormsPage.js';
import NavigationPage from '../pages/NavigationPage.js';

Given('I am on the Home screen', async () => {
  await expect(await HomePage.isDisplayed()).toBeTruthy();
});

When('I click on the Login button', async () => {
  await LoginPage.open();
});

Then('I click on the Sign Up button', async () => {
  await SignUpPage.open();
});

Then('I should see the sign up page', async () => {
  const title = browser.isAndroid
    ? $('android=new UiSelector().text("Login / Sign up Form")')
    : $('~Login / Sign up Form');

  await expect(await title.isDisplayed()).toBeTruthy();
});

Given('I am on the sign up page', async () => {
  await SignUpPage.open();
});

When('I click on the Home button', async () => {
  await HomePage.clickHome();
});

Then('I should be back on the home screen', async () => {
  await expect(await HomePage.isDisplayed()).toBeTruthy();
});

Given('I am on the Forms screen', async () => {
  await FormsPage.open();
});

Given('I am on the Swipe page', async () => {
  const swipeTab = browser.isAndroid
    ? $('android=new UiSelector().text("Swipe")')
    : $('~Swipe');

  await swipeTab.waitForDisplayed();
  await swipeTab.click();
});

When('I swipe Right', async () => {
  await NavigationPage.swipeRight();
});

Then('comunnity informations are displayed', async () => {
  await expect(await NavigationPage.isCommunityCardVisible()).toBeTruthy();
});

Then('JS Foundation informations are displayed', async () => {
  await expect(await NavigationPage.isJSFoundationVisible()).toBeTruthy();
});
