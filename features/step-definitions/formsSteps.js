import { Given, When, Then } from '@wdio/cucumber-framework';
import formsPage from '../pages/FormsPage.js';
import { readFileSync } from 'fs';

const formData = JSON.parse(readFileSync(new URL('../data/formData.json', import.meta.url)));

Given('I access the Forms screen', async () => {
  await formsPage.open();
});

When('I add data at the Input Field', async () => {
  await formsPage.fillInputField('Testing input field');
});

Then('I should see the correct data displayed at the You have typed field', async () => {
  await formsPage.validateTypedText('Testing input field');
});

When('I select an option from the Dropdown', async () => {
  await formsPage.selectDropdownOption('webdriver.io is awesome');
});

When('I click at the Active button', async () => {
  await formsPage.clickButton('Active');
});

Then('I should see a popup with the message {string}', async (message) => {
  await formsPage.validatePopupMessage(message);
});

Then('I fill the form using the data from the JSON file', async () => {
  for (const data of formData) {
    console.log(`Running with: ${JSON.stringify(data)}`);
    await formsPage.fillCompleteForm(data);
  }

});
