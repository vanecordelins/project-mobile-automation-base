class HomePage {
  // Indicador de que a Home está visível (texto "WEBDRIVER")
  get homeScreenIndicator() {
    return $('android=new UiSelector().text("WEBDRIVER")');
  }

  // Botão "Home", usado para retornar à tela principal
  get homeButton() {
    return $('android=new UiSelector().text("Home")');
  }

  async open() {
    // Mantido vazio, já que a Home é a tela inicial
  }

  async clickButton(btnText) {
    const button = $(`~${btnText}`);
    await button.waitForDisplayed();
    await button.click();
  }

  async clickHome() {
    await this.homeButton.waitForDisplayed();
    await this.homeButton.click();
  }

  async isDisplayed() {
    return await this.homeScreenIndicator.isDisplayed();
  }
}

export default new HomePage();
