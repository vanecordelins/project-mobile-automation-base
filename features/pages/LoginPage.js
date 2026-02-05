import { createTextSelector, createAccessibilitySelector, createResourceSelector } from '../utils/selectorHelper.js';
import { logStepWithScreenshot } from '../utils/screenshotHelper.js';
import { TIMEOUTS, ANDROID_IDS, IOS_SELECTORS } from '../utils/constants.js';

class LoginPage {
  get loginMenuButton() {
    return $(createTextSelector("Login"));
  }

  get emailInput() {
    return $(createAccessibilitySelector('input-email'));
  }

  get passwordInput() {
    return $(createAccessibilitySelector('input-password'));
  }

  get loginButton() {
    return $(createAccessibilitySelector('button-LOGIN'));
  }

  get successMessage() {
    return $(createResourceSelector(
      ANDROID_IDS.ALERT_MESSAGE,
      'type == "XCUIElementTypeStaticText" AND name CONTAINS "You are logged in!"'
    ));
  }

  get okButton() {
    return $(createResourceSelector(
      ANDROID_IDS.ALERT_BUTTON_POSITIVE,
      IOS_SELECTORS.ALERT_OK.replace('~', '')
    ));
  }

  async open() {
    await logStepWithScreenshot('Click on Login Menu Button');
    await this.loginMenuButton.waitForDisplayed();
    await this.loginMenuButton.click();
  }

  async login(email, password) {
    await logStepWithScreenshot('Add valid email and password');
    await this.emailInput.setValue(email);
    await this.passwordInput.setValue(password);
  }

  async submitLogin() {
    await logStepWithScreenshot('Login button click');
    await this.loginButton.click();
  }

  async isLoggedIn() {
    await logStepWithScreenshot('User is logged in');
    await this.successMessage.waitForDisplayed({ timeout: TIMEOUTS.ELEMENT_WAIT });
    const text = await this.successMessage.getText();
    const isSuccess = text.includes('You are logged in!');
    if (isSuccess && (await this.okButton.isDisplayed())) {
      await this.okButton.click();
    }
    return isSuccess;
  }
}

export default new LoginPage();
