import { Given, When, Then } from '@wdio/cucumber-framework';
import formsPage from '../pages/FormsPage.js';
import { readFileSync } from 'fs';

const formData = JSON.parse(readFileSync(new URL('../data/formData.json', import.meta.url)));

Given('I am on the Forms screen', async () => {
  await formsPage.open();
});

When('I add data at the Input Field', async () => {
  await formsPage.fillInputField('Testing input field');
});

Then('I should see the correct data displayed at the You have typed field', async () => {
  const result = await formsPage.getTypedText();
  expect(result).toContain('Testing input field');
});

When('I select an option from the Dropdown', async () => {
  await formsPage.selectDropdownOption('webdriver.io is awesome');
});

When('I click at the Active button', async () => {
  await formsPage.clickButton('Active');
});

Then('I should see a popup with the message {string}', async (message) => {
  const popupText = await formsPage.getPopupText();
  expect(popupText).toContain(message);
  await formsPage.confirmPopup();
});

Given('I access the Forms screen', async () => {
  await formsPage.open();
});

Then('I fill the form using the data from the JSON file', async () => {
  for (const data of formData) {
    console.log(`Running with: ${JSON.stringify(data)}`);

    await formsPage.fillInputField(data.inputText);
    const typed = await formsPage.getTypedText();
    expect(typed).toContain(data.inputText);

    const switchStatus = await formsPage.isSwitchOn();
    if (switchStatus !== data.switch) {
      await formsPage.toggleSwitch();
    }

    const switchLabel = await formsPage.getSwitchMessage();
    const expected = data.switch
      ? 'Click to turn the switch OFF'
      : 'Click to turn the switch ON';
    expect(switchLabel).toBe(expected);

    await formsPage.selectDropdownOption(data.dropdown);

    await formsPage.clickButton(data.button);

    await formsPage.popupMessage.waitForDisplayed({ timeout: 5000 });
    const popup = await formsPage.getPopupText();
    expect(popup).toContain(`This button is ${data.button.toLowerCase()}`);
    await formsPage.confirmPopup();
  }
});

