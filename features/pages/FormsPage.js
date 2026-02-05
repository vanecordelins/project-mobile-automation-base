import { createTextSelector, createAccessibilitySelector, createResourceSelector } from '../utils/selectorHelper.js';
import { logStepWithScreenshot } from '../utils/screenshotHelper.js';
import { TIMEOUTS, ANDROID_IDS, IOS_SELECTORS } from '../utils/constants.js';

class FormsPage {
  get formsButton() {
    return $(createTextSelector("Forms"));
  }

  async open() {
    await logStepWithScreenshot('Opening Forms screen');
    await this.formsButton.waitForDisplayed();
    await this.formsButton.click();
  }

  async isDisplayed() {
    await logStepWithScreenshot('Validating Forms screen is displayed');

    const titleElement = $(createTextSelector("Form components"));
    await titleElement.waitForDisplayed({ timeout: TIMEOUTS.ELEMENT_WAIT });
    return titleElement.isDisplayed();
  }

  get inputField() {
    return $(createAccessibilitySelector('text-input'));
  }

  async fillInputField(text) {
    await logStepWithScreenshot('Filling input field');
    await this.inputField.setValue(text);
  }

  get typedTextField() {
    return $(createAccessibilitySelector('input-text-result'));
  }

  async getTypedText() {
    await logStepWithScreenshot('Getting typed text from input');
    const text = await this.typedTextField.getText();
    return text;
  }

  get switchToggle() {
    return $(createAccessibilitySelector('switch'));
  }

  get switchStatusMessage() {
    return $(createAccessibilitySelector('switch-text'));
  }

  async isSwitchOn() {
    await logStepWithScreenshot('Checking switch status');
    const message = await this.switchStatusMessage.getText();
    return message.includes('OFF');
  }

  async toggleSwitch() {
    await logStepWithScreenshot('Toggling switch');
    await this.switchToggle.click();
  }

  async getSwitchMessage() {
    await logStepWithScreenshot('Getting switch message');
    const msg = await this.switchStatusMessage.getText();
    return msg;
  }

  get dropdownToggle() {
    return browser.isAndroid
      ? $('android=new UiSelector().resourceId("text_input")')
      : $(createAccessibilitySelector('Dropdown'));
  }

  async selectDropdownOption(optionText) {
    await logStepWithScreenshot(`Selecting "${optionText}" from dropdown`);
    await this.dropdownToggle.click();
    const option = $(createTextSelector(optionText));
    await option.waitForDisplayed();
    await option.click();
  }

  async clickButton(type) {
    await logStepWithScreenshot(`Clicking on "${type}" button`);
    const button = $(createTextSelector(type));
    await button.waitForDisplayed();
    await button.click();
  }

  get popupMessage() {
    return $(createResourceSelector(
      ANDROID_IDS.ALERT_MESSAGE,
      'type == "XCUIElementTypeStaticText" AND name CONTAINS "This button is active"'
    ));
  }

  async getPopupText() {
    await logStepWithScreenshot('Retrieving popup message');
    await this.popupMessage.waitForDisplayed({ timeout: TIMEOUTS.ELEMENT_WAIT });
    const msg = await this.popupMessage.getText();
    return msg;
  }

  get okButton() {
    return $(createResourceSelector(
      ANDROID_IDS.ALERT_BUTTON_POSITIVE,
      IOS_SELECTORS.ALERT_OK.replace('~', '')
    ));
  }

  async confirmPopup() {
    await logStepWithScreenshot('Confirming popup');
    await this.okButton.click();
  }

  async validateTypedText(expectedText) {
    const result = await this.getTypedText();
    expect(result).toContain(expectedText);
    await logStepWithScreenshot('Validating typed text');
  }

  async validatePopupMessage(expectedMessage) {
    const popupText = await this.getPopupText();
    expect(popupText).toContain(expectedMessage);
    await this.confirmPopup();
  }

  async fillCompleteForm(data) {
    await this.fillInputField(data.inputText);
    await this.validateTypedText(data.inputText);

    const switchStatus = await this.isSwitchOn();
    if (switchStatus !== data.switch) {
      await this.toggleSwitch();
    }

    const switchLabel = await this.getSwitchMessage();
    const expected = data.switch
      ? 'Click to turn the switch OFF'
      : 'Click to turn the switch ON';
    expect(switchLabel).toBe(expected);

    await this.selectDropdownOption(data.dropdown);
    await this.clickButton(data.button);
    await this.validatePopupMessage(`This button is ${data.button.toLowerCase()}`);
  }
}

export default new FormsPage();
