import { createTextSelector } from '../utils/selectorHelper.js';
import { logStepWithScreenshot } from '../utils/screenshotHelper.js';
import { TIMEOUTS } from '../utils/constants.js';

class NavigationPage {
  get communityTitle() {
    return $(createTextSelector("GREAT COMMUNITY"));
  }

  get jsFoundationTitle() {
    return $(createTextSelector("JS.FOUNDATION"));
  }

  async openSwipePage() {
    await logStepWithScreenshot('Opening Swipe screen');

    const swipeTab = $(createTextSelector("Swipe"));
    await swipeTab.waitForDisplayed({ timeout: TIMEOUTS.ELEMENT_WAIT });
    await swipeTab.click();
  }

  async validateIsDisplayedSigupPage() {
    await logStepWithScreenshot('Validating Sign Up screen is displayed');

    const title = $(createTextSelector("Login / Sign up Form"));
    await title.waitForDisplayed({ timeout: TIMEOUTS.ELEMENT_WAIT });
    await expect(title).toBeDisplayed();
  }

  async isCommunityCardVisible() {
    await logStepWithScreenshot('Verifying if Community card is visible');
    const visible = await this.communityTitle.isDisplayed();
    return visible;
  }

  async isJSFoundationVisible() {
    await logStepWithScreenshot('Verifying if JS Foundation card is visible');
    const visible = await this.jsFoundationTitle.isDisplayed();
    return visible;
  }
}

export default new NavigationPage();
