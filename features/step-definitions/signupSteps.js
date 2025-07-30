import { Given, When, Then } from '@wdio/cucumber-framework';
import SignUpPage from '../pages/SignUpPage.js';

let testEmail = '';

Given('I am at the sign up page', async () => {
  await SignUpPage.open();
  const timestamp = Date.now();
  testEmail = `email_test_${timestamp}@test.com`;
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

When('I click to sing up', async () => {
  await SignUpPage.submitForm();
});

Then('I handle the success popup', async () => {
  const alertMessage = await $('android=new UiSelector().resourceId("android:id/message")');
  const alertText = await alertMessage.getText();
  expect(alertText).toEqual('You successfully signed up!');

  const okButton = await $('android=new UiSelector().resourceId("android:id/button1")');
  await okButton.click();
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
