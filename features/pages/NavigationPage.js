import allureReporter from '@wdio/allure-reporter';
import { takeScreenshotAndAddToReport } from '../utils/screenshotHelper.js';

class NavigationPage {
  get communityTitle() {
    return browser.isAndroid
      ? $('android=new UiSelector().text("GREAT COMMUNITY")')
      : $('~GREAT COMMUNITY');
  }

  get jsFoundationTitle() {
    return browser.isAndroid
      ? $('android=new UiSelector().text("JS.FOUNDATION")')
      : $('~JS.FOUNDATION');
  }

  async swipeRight() {
    allureReporter.addStep('Performing swipe right gesture');

    const { width, height } = await driver.getWindowRect();
    const startX = width * 0.8;
    const endX = width * 0.2;
    const y = height / 2;

    await driver.performActions([
      {
        type: 'pointer',
        id: 'finger1',
        parameters: { pointerType: 'touch' },
        actions: [
          { type: 'pointerMove', duration: 0, x: Math.floor(startX), y: Math.floor(y) },
          { type: 'pointerDown', button: 0 },
          { type: 'pause', duration: 500 },
          { type: 'pointerMove', duration: 1000, x: Math.floor(endX), y: Math.floor(y) },
          { type: 'pause', duration: 500 },
          { type: 'pointerUp', button: 0 },
        ],
      },
    ]);

    await driver.releaseActions();
    await driver.pause(1500);
    await takeScreenshotAndAddToReport('Swipe right completed');
  }

  async isCommunityCardVisible() {
    allureReporter.addStep('Verifying if Community card is visible');
    const visible = await this.communityTitle.isDisplayed();
    await takeScreenshotAndAddToReport('Community card visibility check');
    return visible;
  }

  async isJSFoundationVisible() {
    allureReporter.addStep('Verifying if JS Foundation card is visible');
    const visible = await this.jsFoundationTitle.isDisplayed();
    await takeScreenshotAndAddToReport('JS Foundation card visibility check');
    return visible;
  }

}

export default new NavigationPage();
