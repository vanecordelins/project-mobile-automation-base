import { Given, When, Then } from '@wdio/cucumber-framework';
import HomePage from '../pages/HomePage.js';
import SignUpPage from '../pages/SignUpPage.js';
import SwipePage from '../pages/SwipePage.js';

Given('I am on the Home screen', async () => {
  await HomePage.open();
});

When('I click on the {string} button', async (btnText) => {
  await HomePage.clickButton(btnText);
});

Then('I should see the sign up page', async () => {
  expect(await SignUpPage.isDisplayed()).toBeTruthy();
});

Given('I am on the sign up page', async () => {
  await SignUpPage.open();
});

When('I click on the Home button', async () => {
  await SignUpPage.clickHome();
});

Then('I should be back on the home screen', async () => {
  expect(await HomePage.isDisplayed()).toBeTruthy();
});

Given('I am on the Swipe page', async () => {
  await SwipePage.open();
});

Then('I swipe Right', async () => {
  await SwipePage.swipeRight();
});

Then('comunnity informations are displayed', async () => {
  expect(await SwipePage.isCommunityCardVisible()).toBeTruthy();
});

Then('JS Foundation informations are displayed', async () => {
  expect(await SwipePage.isJSFoundationVisible()).toBeTruthy();
});
