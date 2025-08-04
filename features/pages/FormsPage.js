import allureReporter from '@wdio/allure-reporter';
import { takeScreenshotAndAddToReport } from '../utils/screenshotHelper.js';

class FormsPage {
  get formsButton() {
    return $('android=new UiSelector().text("Forms")');
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
    return $('android=new UiSelector().resourceId("text_input")');
  }

  async selectDropdownOption(optionText) {
    allureReporter.addStep(`Selecting "${optionText}" from dropdown`);
    await this.dropdownToggle.click();
    const option = $(`android=new UiSelector().text("${optionText}")`);
    await option.waitForDisplayed();
    await option.click();
    await takeScreenshotAndAddToReport(`Dropdown option "${optionText}" selected`);
  }

  async clickButton(type) {
    allureReporter.addStep(`Clicking on "${type}" button`);
    const button = $(`android=new UiSelector().text("${type}")`);
    await button.waitForDisplayed();
    await button.click();
    await takeScreenshotAndAddToReport(`"${type}" button clicked`);
  }

  get popupMessage() {
    return $('android=new UiSelector().resourceId("android:id/message")');
  }

  async getPopupText() {
    allureReporter.addStep('Retrieving popup message');
    await this.popupMessage.waitForDisplayed({ timeout: 5000 });
    const msg = await this.popupMessage.getText();
    await takeScreenshotAndAddToReport('Popup message retrieved');
    return msg;
  }

  get okButton() {
    return $('android=new UiSelector().resourceId("android:id/button1")');
  }

  async confirmPopup() {
    allureReporter.addStep('Confirming popup');
    await this.okButton.click();
    await takeScreenshotAndAddToReport('Popup confirmed');
  }
}

export default new FormsPage();
