import { Given, When, Then } from '@wdio/cucumber-framework';
import LoginPage from '../pages/LoginPage.js';

Given('I am on the login screen', async () => {
  await LoginPage.open();
});

When('I enter a valid username and password', async () => {
  await LoginPage.login('test_user', 'test_password');
});

When('I click the login button', async () => {
  await LoginPage.submitLogin();
});

Then('I should be redirected to the main screen', async () => {
  expect(await LoginPage.isLoggedIn()).toBeTruthy();
});
