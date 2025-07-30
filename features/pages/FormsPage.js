class FormsPage {
  get formsButton() {
    return $('android=new UiSelector().text("Forms")');
  }

  async open() {
    await this.formsButton.waitForDisplayed();
    await this.formsButton.click();
  }

  get inputField() {
    return $('~text-input');
  }

  async fillInputField(text) {
    await this.inputField.setValue(text);
  }

  get typedTextField() {
    return $('~input-text-result');
  }

  async getTypedText() {
    return await this.typedTextField.getText();
  }

  get switchToggle() {
    return $('~switch');
  }

  get switchStatusMessage() {
    return $('~switch-text');
  }

  async isSwitchOn() {
    const message = await this.switchStatusMessage.getText();
    return message.includes('OFF');
  }

  async toggleSwitch() {
    await this.switchToggle.click();
  }

  async getSwitchMessage() {
    return await this.switchStatusMessage.getText();
  }

  get dropdownToggle() {
    return $('android=new UiSelector().resourceId("text_input")');
  }

  async selectDropdownOption(optionText) {
    await this.dropdownToggle.click();
    const option = $(`android=new UiSelector().text("${optionText}")`);
    await option.waitForDisplayed();
    await option.click();
  }

  async clickButton(type) {
    const button = $(`android=new UiSelector().text("${type}")`);
    await button.waitForDisplayed();
    await button.click();
  }

  get popupMessage() {
    return $('android=new UiSelector().resourceId("android:id/message")');
  }

  async getPopupText() {
    await this.popupMessage.waitForDisplayed({ timeout: 5000 });
    return await this.popupMessage.getText();
  }

  get okButton() {
    return $('android=new UiSelector().resourceId("android:id/button1")');
  }

  async confirmPopup() {
    await this.okButton.click();
  }
}

export default new FormsPage();
