class SignUpPage {
 
  get loginButton() {
    return $('android=new UiSelector().text("Login")');
  }

  get signUpLink() {
    return $('android=new UiSelector().text("Sign up")');
  }

  async open() {
    await this.loginButton.waitForDisplayed();
    await this.loginButton.click();
    await this.signUpLink.waitForDisplayed();
    await this.signUpLink.click();
  }

  get emailInput() {
    return $('~input-email');
  }

  async setEmail(email) {
    await this.emailInput.setValue(email);
  }

  get passwordInput() {
    return $('~input-password');
  }

  async setPassword(password) {
    await this.passwordInput.setValue(password);
  }

  get confirmPasswordInput() {
    return $('~input-repeat-password');
  }

  async confirmPassword(password) {
    await this.confirmPasswordInput.setValue(password);
  }

  get signUpButton() {
    return $('android=new UiSelector().description("button-SIGN UP")');
  }

  async submitForm() {
    await this.signUpButton.click();
  }

  async didLoginSucceed() {
    const homeButton = $('android=new UiSelector().text("Home")');
    return await homeButton.isDisplayed();
  }

  async getErrorMessage(expectedText) {
    const selector = $(`android=new UiSelector().text("${expectedText}")`);
    await selector.waitForDisplayed({ timeout: 3000 });
    return await selector.getText();
  }
}

export default new SignUpPage();
