class FormsPage {
  // Navigation: open the Forms screen
  get formsButton() {
    return $('android=new UiSelector().text("Forms")');
  }

  async open() {
    await driver.launchApp();
    await this.formsButton.waitForDisplayed();
    await this.formsButton.click();
  }

  // Input Field
  get inputField() {
    return $('android=new UiSelector().resourceId("RNE__Input__text-input")');
  }

  async fillInputField(text) {
    await this.inputField.setValue(text);
  }

  // Typed result field
  get typedTextField() {
    return $('android=new UiSelector().description("input-text-result")');
  }

  async getTypedText() {
    return await this.typedTextField.getText();
  }

  // Switch
  get switchToggle() {
    return $('android=new UiSelector().description("switch")');
  }

  get switchMessage() {
    // We only know the ON message, but we assume the OFF message replaces it
    return $('android=new UiSelector().textContains("Click to turn the switch")');
  }

  async isSwitchOn() {
    const message = await this.switchMessage.getText();
    return message.includes('OFF'); // message shows what the next action would be
  }

  async toggleSwitch() {
    await this.switchToggle.click();
  }

  async getSwitchMessage() {
    return await this.switchMessage.getText();
  }

  // Dropdown
  get dropdownToggle() {
    return $('//android.widget.TextView[@text="󰅀"]'); // icon trigger
  }

  async selectDropdownOption(optionText) {
    await this.dropdownToggle.click();
    const option = $(`android=new UiSelector().text("${optionText}")`);
    await option.waitForDisplayed();
    await option.click();
  }

  // Buttons
  get activeButton() {
    return $('android=new UiSelector().text("Active")');
  }

  get inactiveButton() {
    return $('android=new UiSelector().text("Inactive")');
  }

  async clickButton(type) {
    if (type === 'Active') {
      await this.activeButton.click();
    } else {
      await this.inactiveButton.click();
    }
  }

  // Pop-up
  get popupMessage() {
    return $('id=android:id/message');
  }

  async getPopupText() {
    return await this.popupMessage.getText();
  }

  // (Optional) Buttons inside alert pop-up
  get askMeLaterButton() {
    return $('id=android:id/button3');
  }

  get cancelButton() {
    return $('id=android:id/button2');
  }

  get okButton() {
    return $('id=android:id/button1');
  }
}
export default new FormsPage();
