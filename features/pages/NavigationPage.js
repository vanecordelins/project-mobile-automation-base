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

  async openSwipePage() {
  allureReporter.addStep('Opening Swipe screen');

  const swipeTab = browser.isAndroid
    ? $('android=new UiSelector().text("Swipe")')
    : $('~Swipe');

  await swipeTab.waitForDisplayed({ timeout: 5000 });
  await swipeTab.click();

  await takeScreenshotAndAddToReport('Swipe screen opened');
}

async validateIsDisplayedSigupPage() {
  allureReporter.addStep('Validating Sign Up screen is displayed');

  const title = browser.isAndroid
    ? $('android=new UiSelector().text("Login / Sign up Form")')
    : $('~Login / Sign up Form');

  await title.waitForDisplayed({ timeout: 5000 });
  await expect(title).toBeDisplayed();
  await takeScreenshotAndAddToReport('Sign Up screen validation');
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
