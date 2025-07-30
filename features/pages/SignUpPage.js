class SignUpPage {
  get screen() {
    return $('~SignUp-screen');
  }

  async isDisplayed() {
    return await this.screen.isDisplayed();
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
    return $('~input-confirm-password');
  }

  async confirmPassword(password) {
    await this.confirmPasswordInput.setValue(password);
  }

  get signUpButton() {
    return $('android=new UiSelector().text("Sign Up")');
  }

  async clickSignUp() {
    await this.signUpButton.click();
  }

  get errorMessage() {
    return $('android=new UiSelector().resourceId("error-message")'); // ajuste se necessário
  }

  async getErrorMessage() {
    return await this.errorMessage.getText();
  }

  async goHome() {
    const homeButton = $('android=new UiSelector().text("Home")');
    await homeButton.click();
  }
}

export default new SignUpPage();
