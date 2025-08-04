import allureReporter from '@wdio/allure-reporter';
import { takeScreenshotAndAddToReport } from '../utils/screenshotHelper.js';

class HomePage {
  get homeScreenIndicator() {
    return browser.isAndroid
      ? $('android=new UiSelector().text("WEBDRIVER")')
      : $('~WEBDRIVER');
  }

  get homeButton() {
    return browser.isAndroid
      ? $('android=new UiSelector().text("Home")')
      : $('~Home');
  }

  async clickButton(btnText) {
    allureReporter.addStep(`Click on "${btnText}" button`);
    const button = browser.isAndroid
      ? $(`android=new UiSelector().text("${btnText}")`)
      : $(`~${btnText}`);
    await button.waitForDisplayed();
    await button.click();
    await takeScreenshotAndAddToReport(`Clicked "${btnText}" button`);
  }

  async clickHome() {
    allureReporter.addStep('Click on Home button');
    await this.homeButton.waitForDisplayed();
    await this.homeButton.click();
    await takeScreenshotAndAddToReport('Clicked Home button');
  }

  async isDisplayed() {
    allureReporter.addStep('Verifying if Home screen is displayed');
    const visible = await this.homeScreenIndicator.isDisplayed();
    await takeScreenshotAndAddToReport('Home screen display verification');
    return visible;
  }
}

export default new HomePage();
