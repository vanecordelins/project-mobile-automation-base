import { createTextSelector, createAccessibilitySelector, createTextOrDescriptionSelector, createResourceSelector } from '../utils/selectorHelper.js';
import { logStepWithScreenshot } from '../utils/screenshotHelper.js';
import { TIMEOUTS, ANDROID_IDS, IOS_SELECTORS } from '../utils/constants.js';

class SignUpPage {
  get loginButton() {
    return $(createTextSelector("Login"));
  }

  get signUpLink() {
    return $(createTextSelector("Sign up"));
  }

  async open() {
    await logStepWithScreenshot('Navigating to Sign Up Page');
    await this.loginButton.waitForDisplayed();
    await this.loginButton.click();
    await this.signUpLink.waitForDisplayed();
    await this.signUpLink.click();
  }

  async navigateAndGenerateEmail() {
    await logStepWithScreenshot('Navigating to Sign Up page and generating test email');
    await this.open();
    const timestamp = Date.now();
    const generatedEmail = `email_test_${timestamp}@test.com`;
    return generatedEmail;
  }

  get emailInput() {
    return $(createAccessibilitySelector('input-email'));
  }

  async setEmail(email) {
    await logStepWithScreenshot('Filling email field');
    await this.emailInput.setValue(email);
  }

  get passwordInput() {
    return $(createAccessibilitySelector('input-password'));
  }

  async setPassword(password) {
    await logStepWithScreenshot('Filling password field');
    await this.passwordInput.setValue(password);
  }

  get confirmPasswordInput() {
    return $(createAccessibilitySelector('input-repeat-password'));
  }

  async confirmPassword(password) {
    await logStepWithScreenshot('Confirming password');
    await this.confirmPasswordInput.setValue(password);
  }

  get signUpButton() {
    return $(createTextOrDescriptionSelector("Sign Up", "button-SIGN UP"));
  }

  async submitForm() {
    await logStepWithScreenshot('Submitting sign up form');
    await this.signUpButton.click();
  }

  async didLoginSucceed() {
    await logStepWithScreenshot('Checking if user is logged in');
    const homeButton = $(createTextSelector("Home"));
    const visible = await homeButton.isDisplayed();
    return visible;
  }

  async getErrorMessage(expectedText) {
    await logStepWithScreenshot(`Verifying error message: "${expectedText}"`);
    const selector = $(createTextSelector(expectedText));
    await selector.waitForDisplayed({ timeout: TIMEOUTS.POPUP_WAIT });
    return await selector.getText();
  }

  get popupMessage() {
    return $(createResourceSelector(
      ANDROID_IDS.ALERT_MESSAGE,
      'type == "XCUIElementTypeStaticText" AND name CONTAINS "You successfully signed up"'
    ));
  }

  get okButton() {
    return $(createResourceSelector(
      ANDROID_IDS.ALERT_BUTTON_POSITIVE,
      IOS_SELECTORS.ALERT_OK.replace('~', '')
    ));
  }

  async handleSuccessPopup() {
    await logStepWithScreenshot('Handling success popup after sign up');
    await this.popupMessage.waitForDisplayed({ timeout: TIMEOUTS.POPUP_WAIT });
    const message = await this.popupMessage.getText();
    expect(message).toEqual('You successfully signed up!');
    await this.okButton.click();
  }
}

export default new SignUpPage();
