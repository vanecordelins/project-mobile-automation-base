import { Given, When, Then } from '@wdio/cucumber-framework';
import SignUpPage from '../pages/SignUpPage.js';

let testEmail = '';

Given('I am at the sign up page', async () => {
  testEmail = await SignUpPage.navigateAndGenerateEmail();
});

When('I set an email', async () => {
  await SignUpPage.setEmail(testEmail);
});

When('I set a password', async () => {
  await SignUpPage.setPassword('ValidPassword123');
});

When('I confirm the password', async () => {
  await SignUpPage.confirmPassword('ValidPassword123');
});

When('I click to sign up', async () => {
  await SignUpPage.submitForm();
});

Then('I handle the success popup', async () => {
  await SignUpPage.handleSuccessPopup();
});

Then('I login with the new signed up user', async () => {
  expect(await SignUpPage.didLoginSucceed()).toBeTruthy();
});

When('I confirm the password with a different value', async () => {
  await SignUpPage.confirmPassword('AnotherPassword456');
});

Then('I should see an error message {string}', async (expectedError) => {
  const error = await SignUpPage.getErrorMessage(expectedError);
  expect(error).toBe(expectedError);
});

When('I set an invalid password', async () => {
  await SignUpPage.setPassword('short');
});

When('I confirm the invalid password', async () => {
  await SignUpPage.confirmPassword('short');
});
