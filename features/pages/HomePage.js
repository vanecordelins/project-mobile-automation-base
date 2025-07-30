class HomePage {
  get homeScreenIndicator() {
    return $('android=new UiSelector().text("WEBDRIVER")');
  }

  get homeButton() {
    return $('android=new UiSelector().text("Home")');
  }

  async open() {
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
