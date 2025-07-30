class LoginPage {
  get loginMenuButton() {
    return $('android=new UiSelector().text("Login")');
  }

  get emailInput() {
    return $('~input-email');
  }

  get passwordInput() {
    return $('~input-password');
  }

  get loginButton() {
    return $('~button-LOGIN');
  }

  get successMessage() {
    return $('android=new UiSelector().resourceId("android:id/message")');
  }

  get okButton() {
    return $('android=new UiSelector().resourceId("android:id/button1")');
  }

  async open() {
    await this.loginMenuButton.waitForDisplayed();
    await this.loginMenuButton.click();
  }

  async login(email, password) {
    await this.emailInput.setValue(email);
    await this.passwordInput.setValue(password);
  }

  async submitLogin() {
    await this.loginButton.click();
  }

  async isLoggedIn() {
    await this.successMessage.waitForDisplayed({ timeout: 5000 });
    const text = await this.successMessage.getText();
    const isSuccess = text.includes('You are logged in!');
    if (isSuccess) await this.okButton.click();
    return isSuccess;
  }
}

export default new LoginPage();
