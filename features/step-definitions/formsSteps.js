import { Given, When, Then } from '@wdio/cucumber-framework';
import FormsPage from '../pages/FormsPage.js';

Given('I am on the Forms screen', async () => {
  await FormsPage.open();
});

When('I add data at the Input Field', async () => {
  await FormsPage.fillInputField('Sample data');
});

When('I select an option from the Dropdown', async () => {
  await FormsPage.selectDropdownOption('webdriverio');
});

When('I click at the Active button', async () => {
  await FormsPage.clickActiveButton();
});

Then('I should see a popup with the message {string}', async (expectedMessage) => {
  const popup = await FormsPage.getPopupText();
  expect(popup).toContain(expectedMessage);
});

Then('I should see the correct data displayed at the You have typed field', async () => {
  const typedText = await FormsPage.getTypedText();
  expect(typedText).toBe('Sample data');
});
