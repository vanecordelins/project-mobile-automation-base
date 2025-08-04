import allureReporter from '@wdio/allure-reporter';
import { takeScreenshotAndAddToReport } from '../utils/screenshotHelper.js';

class SignUpPage {
  get loginButton() {
    return $('android=new UiSelector().text("Login")');
  }

  get signUpLink() {
    return $('android=new UiSelector().text("Sign up")');
  }

  async open() {
    allureReporter.addStep('Navigating to Sign Up Page');
    await this.loginButton.waitForDisplayed();
    await this.loginButton.click();
    await this.signUpLink.waitForDisplayed();
    await this.signUpLink.click();
    await takeScreenshotAndAddToReport('Sign Up Page opened');
  }

  get emailInput() {
    return $('~input-email');
  }

  async setEmail(email) {
    allureReporter.addStep('Filling email field');
    await this.emailInput.setValue(email);
    await takeScreenshotAndAddToReport('Email field filled');
  }

  get passwordInput() {
    return $('~input-password');
  }

  async setPassword(password) {
    allureReporter.addStep('Filling password field');
    await this.passwordInput.setValue(password);
    await takeScreenshotAndAddToReport('Password field filled');
  }

  get confirmPasswordInput() {
    return $('~input-repeat-password');
  }

  async confirmPassword(password) {
    allureReporter.addStep('Confirming password');
    await this.confirmPasswordInput.setValue(password);
    await takeScreenshotAndAddToReport('Password confirmed');
  }

  get signUpButton() {
    return $('android=new UiSelector().description("button-SIGN UP")');
  }

  async submitForm() {
    allureReporter.addStep('Submitting sign up form');
    await this.signUpButton.click();
    await takeScreenshotAndAddToReport('Sign up form submitted');
  }

  async didLoginSucceed() {
    allureReporter.addStep('Checking if user is logged in');
    const homeButton = $('android=new UiSelector().text("Home")');
    const visible = await homeButton.isDisplayed();
    await takeScreenshotAndAddToReport('Login result');
    return visible;
  }

  async getErrorMessage(expectedText) {
    allureReporter.addStep(`Verifying error message: "${expectedText}"`);
    const selector = $(`android=new UiSelector().text("${expectedText}")`);
    await selector.waitForDisplayed({ timeout: 3000 });
    await takeScreenshotAndAddToReport(`Error message displayed: "${expectedText}"`);
    return await selector.getText();
  }
}

export default new SignUpPage();
