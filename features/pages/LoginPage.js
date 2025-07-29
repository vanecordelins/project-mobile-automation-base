class LoginPage {
  get usernameInput() { return $('~input-username'); }
  get passwordInput() { return $('~input-password'); }
  get loginButton() { return $('~button-login'); }

  async open() {
    await driver.launchApp();
  }

  async login(username, password) {
    await this.usernameInput.setValue(username);
    await this.passwordInput.setValue(password);
    await this.loginButton.click();
  }

  async isLoggedIn() {
    return $('~home-screen').isDisplayed();
  }
}

export default new LoginPage();