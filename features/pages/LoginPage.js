import allureReporter from '@wdio/allure-reporter';
import { takeScreenshotAndAddToReport } from '../utils/screenshotHelper.js';

class LoginPage {
  get loginMenuButton() {
    return browser.isAndroid
      ? $('android=new UiSelector().text("Login")')
      : $('~Login');
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
    return browser.isAndroid
      ? $('android=new UiSelector().resourceId("android:id/message")')
      : $('-ios predicate string:type == "XCUIElementTypeStaticText" AND name CONTAINS "You are logged in!"');
  }

  get okButton() {
    return browser.isAndroid
      ? $('android=new UiSelector().resourceId("android:id/button1")')
      : $('~OK');
  }

  async open() {
    allureReporter.addStep('Click on Login Menu Button');
    await this.loginMenuButton.waitForDisplayed();
    await this.loginMenuButton.click();
    await takeScreenshotAndAddToReport('Click on Login Menu Button');
  }

  async login(email, password) {
    allureReporter.addStep('Add valid email and password');
    await this.emailInput.setValue(email);
    await this.passwordInput.setValue(password);
    await takeScreenshotAndAddToReport('Add valid email and password');
  }

  async submitLogin() {
    allureReporter.addStep('Login button click');
    await this.loginButton.click();
    await takeScreenshotAndAddToReport('Login button click');
  }

  async isLoggedIn() {
    allureReporter.addStep('User is logged in');
    await this.successMessage.waitForDisplayed({ timeout: 5000 });
    const text = await this.successMessage.getText();
    const isSuccess = text.includes('You are logged in!');
    await takeScreenshotAndAddToReport('User is logged in');
    if (isSuccess && (await this.okButton.isDisplayed())) {
      await this.okButton.click();
    }
    return isSuccess;
  }
}

export default new LoginPage();
