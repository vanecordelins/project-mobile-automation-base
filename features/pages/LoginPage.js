import allureReporter from '@wdio/allure-reporter';
import { takeScreenshotAndAddToReport } from '../utils/screenshotHelper.js';

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
    allureReporter.addStep('Click on Login Menu Button');
    await this.loginMenuButton.waitForDisplayed();
    await this.loginMenuButton.click();
    await takeScreenshotAndAddToReport('Login screen opened');
  }

  async login(email, password) {
    allureReporter.addStep('Enter valid email and password');
    await this.emailInput.setValue(email);
    await this.passwordInput.setValue(password);
    await takeScreenshotAndAddToReport('Credentials entered');
  }

  async submitLogin() {
    allureReporter.addStep('Click on login button');
    await this.loginButton.click();
    await takeScreenshotAndAddToReport('Login button clicked');
  }

  async isLoggedIn() {
    allureReporter.addStep('Check login success');
    await this.successMessage.waitForDisplayed({ timeout: 5000 });
    const text = await this.successMessage.getText();
    const isSuccess = text.includes('You are logged in!');
    await takeScreenshotAndAddToReport('Login result');
    if (isSuccess) {
      await this.okButton.click();
    }
    return isSuccess;
  }
}

export default new LoginPage();
