class FormsPage {
  get inputField() { return $('~text-input'); }
  get typedText() { return $('~input-text-result'); }
  get dropdown() { return $('~dropdown'); }
  get dropdownOption() { return $('android=new UiSelector().text("webdriverio")'); }
  get activeButton() { return $('~button-Active'); }
  get alertMessage() { return $('android.widget.TextView'); } // ajusta conforme necessário

  async open() {
    await driver.launchApp(); // ou navegue direto se já estiver no app
    await $('~Forms').click(); // se tiver um botão com esse label
  }

  async fillInputField(text) {
    await this.inputField.setValue(text);
  }

  async getTypedText() {
    return this.typedText.getText();
  }

  async selectDropdownOption(optionText) {
    await this.dropdown.click();
    await $(`android=new UiSelector().text("${optionText}")`).click();
  }

  async clickActiveButton() {
    await this.activeButton.click();
  }

  async getPopupText() {
    return this.alertMessage.getText();
  }
}

export default new FormsPage();
