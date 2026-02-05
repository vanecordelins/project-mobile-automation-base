import { createTextSelector } from '../utils/selectorHelper.js';
import { logStepWithScreenshot } from '../utils/screenshotHelper.js';

class HomePage {
  get homeScreenIndicator() {
    return $(createTextSelector("WEBDRIVER"));
  }

  get homeButton() {
    return $(createTextSelector("Home"));
  }

  async clickButton(btnText) {
    await logStepWithScreenshot(`Click on "${btnText}" button`);
    const button = $(createTextSelector(btnText));
    await button.waitForDisplayed();
    await button.click();
  }

  async clickHome() {
    await logStepWithScreenshot('Click on Home button');
    await this.homeButton.waitForDisplayed();
    await this.homeButton.click();
  }

  async isDisplayed() {
    await logStepWithScreenshot('Verifying if Home screen is displayed');
    const visible = await this.homeScreenIndicator.isDisplayed();
    return visible;
  }
}

export default new HomePage();
