import allureReporter from '@wdio/allure-reporter';
import { takeScreenshotAndAddToReport } from '../utils/screenshotHelper.js';

class FormsPage {
  get formsButton() {
    return browser.isAndroid
      ? $('android=new UiSelector().text("Forms")')
      : $('~Forms');
  }

  async open() {
    allureReporter.addStep('Opening Forms screen');
    await this.formsButton.waitForDisplayed();
    await this.formsButton.click();
    await takeScreenshotAndAddToReport('Forms screen opened');
  }

  get inputField() {
    return $('~text-input');
  }

  async fillInputField(text) {
    allureReporter.addStep('Filling input field');
    await this.inputField.setValue(text);
    await takeScreenshotAndAddToReport('Input field filled');
  }

  get typedTextField() {
    return $('~input-text-result');
  }

  async getTypedText() {
    allureReporter.addStep('Getting typed text from input');
    const text = await this.typedTextField.getText();
    await takeScreenshotAndAddToReport('Typed text retrieved');
    return text;
  }

  get switchToggle() {
    return $('~switch');
  }

  get switchStatusMessage() {
    return $('~switch-text');
  }

  async isSwitchOn() {
    allureReporter.addStep('Checking switch status');
    const message = await this.switchStatusMessage.getText();
    await takeScreenshotAndAddToReport('Switch status retrieved');
    return message.includes('OFF');
  }

  async toggleSwitch() {
    allureReporter.addStep('Toggling switch');
    await this.switchToggle.click();
    await takeScreenshotAndAddToReport('Switch toggled');
  }

  async getSwitchMessage() {
    allureReporter.addStep('Getting switch message');
    const msg = await this.switchStatusMessage.getText();
    await takeScreenshotAndAddToReport('Switch message retrieved');
    return msg;
  }

  get dropdownToggle() {
    return browser.isAndroid
      ? $('android=new UiSelector().resourceId("text_input")')
      : $('~Dropdown');
  }

  async selectDropdownOption(optionText) {
    allureReporter.addStep(`Selecting "${optionText}" from dropdown`);
    await this.dropdownToggle.click();
    const option = browser.isAndroid
      ? $(`android=new UiSelector().text("${optionText}")`)
      : $(`~${optionText}`);
    await option.waitForDisplayed();
    await option.click();
    await takeScreenshotAndAddToReport(`Dropdown option "${optionText}" selected`);
  }

  async clickButton(type) {
    allureReporter.addStep(`Clicking on "${type}" button`);
    const button = browser.isAndroid
      ? $(`android=new UiSelector().text("${type}")`)
      : $(`~${type}`);
    await button.waitForDisplayed();
    await button.click();
    await takeScreenshotAndAddToReport(`"${type}" button clicked`);
  }

  get popupMessage() {
    return browser.isAndroid
      ? $('android=new UiSelector().resourceId("android:id/message")')
      : $('-ios predicate string:type == "XCUIElementTypeStaticText" AND name CONTAINS "This button is active"');
  }

  async getPopupText() {
    allureReporter.addStep('Retrieving popup message');
    await this.popupMessage.waitForDisplayed({ timeout: 5000 });
    const msg = await this.popupMessage.getText();
    await takeScreenshotAndAddToReport('Popup message retrieved');
    return msg;
  }

  get okButton() {
    return browser.isAndroid
      ? $('android=new UiSelector().resourceId("android:id/button1")')
      : $('~OK');
  }

  async confirmPopup() {
    allureReporter.addStep('Confirming popup');
    await this.okButton.click();
    await takeScreenshotAndAddToReport('Popup confirmed');
  }

  async validateTypedText(expectedText) {
    const result = await this.getTypedText();
    expect(result).toContain(expectedText);
    await takeScreenshotAndAddToReport('Validating typed text');
  }

  async validatePopupMessage(expectedMessage) {
    const popupText = await this.getPopupText();
    expect(popupText).toContain(expectedMessage);
    await this.confirmPopup();
    await takeScreenshotAndAddToReport('Popup message validated');
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
    await takeScreenshotAndAddToReport('Switch label validated');

    await this.selectDropdownOption(data.dropdown);
    await this.clickButton(data.button);
    await this.validatePopupMessage(`This button is ${data.button.toLowerCase()}`);
  }
}

export default new FormsPage();
