/**
 * Common UI interaction utilities with Allure reporting
 * @module actionHelper
 */

import { createTextSelector, createResourceSelector } from './selectorHelper.js';
import { logStepWithScreenshot } from './screenshotHelper.js';
import { TIMEOUTS, ANDROID_IDS, IOS_SELECTORS } from './constants.js';

/**
 * Clicks button identified by text with Allure reporting
 * @param {string} buttonText - Visible button text
 * @param {Object} [options={}] - Optional configuration
 * @param {number} [options.timeout=5000] - Wait timeout in ms
 * @returns {Promise<void>}
 * @example
 * await clickButton("Login");
 * await clickButton("Submit", { timeout: 10000 });
 */
export async function clickButton(buttonText, options = {}) {
  const timeout = options.timeout || TIMEOUTS.ELEMENT_WAIT;
  const stepDescription = `Click "${buttonText}" button`;

  await logStepWithScreenshot(stepDescription);

  const selector = createTextSelector(buttonText);
  const button = $(selector);
  await button.waitForDisplayed({ timeout });
  await button.click();
}

/**
 * Retrieves popup message text (Android dialog or iOS alert)
 * @param {Object} [options={}] - Optional configuration
 * @param {number} [options.timeout=3000] - Wait timeout in ms
 * @returns {Promise<string>} Popup message text
 * @example
 * const message = await getPopupMessage();
 * expect(message).toContain("Success");
 */
export async function getPopupMessage(options = {}) {
  const timeout = options.timeout || TIMEOUTS.POPUP_WAIT;
  const stepDescription = 'Retrieving popup message';

  await logStepWithScreenshot(stepDescription);

  const selector = browser.isAndroid
    ? `android=new UiSelector().resourceId("${ANDROID_IDS.ALERT_MESSAGE}")`
    : `-ios predicate string:type == "XCUIElementTypeStaticText"`;

  const popupElement = $(selector);
  await popupElement.waitForDisplayed({ timeout });
  return await popupElement.getText();
}

/**
 * Confirms popup by clicking OK button
 * @param {Object} [options={}] - Optional configuration
 * @param {number} [options.timeout=3000] - Wait timeout in ms
 * @returns {Promise<void>}
 * @example
 * await confirmPopup();
 */
export async function confirmPopup(options = {}) {
  const timeout = options.timeout || TIMEOUTS.POPUP_WAIT;
  const stepDescription = 'Confirming popup by clicking OK button';

  await logStepWithScreenshot(stepDescription);

  const selector = browser.isAndroid
    ? `android=new UiSelector().resourceId("${ANDROID_IDS.ALERT_BUTTON_POSITIVE}")`
    : IOS_SELECTORS.ALERT_OK;

  const okButton = $(selector);
  await okButton.waitForDisplayed({ timeout });
  await okButton.click();
}

/**
 * Sets input field value with Allure reporting
 * @param {string} accessibilityId - Input field accessibility ID
 * @param {string} value - Value to set
 * @param {Object} [options={}] - Optional configuration
 * @returns {Promise<void>}
 * @example
 * await setInputValue("input-email", "test@example.com");
 */
export async function setInputValue(accessibilityId, value, options = {}) {
  const stepDescription = `Set input "${accessibilityId}" to "${value}"`;

  await logStepWithScreenshot(stepDescription);

  const inputField = $(`~${accessibilityId}`);
  await inputField.setValue(value);
}

/**
 * Waits for element and checks visibility
 * @param {string} selector - WebDriverIO selector string
 * @param {Object} [options={}] - Optional configuration
 * @param {number} [options.timeout=5000] - Wait timeout in ms
 * @returns {Promise<boolean>} True if visible, false otherwise
 * @example
 * const isVisible = await isElementVisible('~home-button');
 */
export async function isElementVisible(selector, options = {}) {
  const timeout = options.timeout || TIMEOUTS.ELEMENT_WAIT;

  try {
    const element = $(selector);
    await element.waitForDisplayed({ timeout });
    return await element.isDisplayed();
  } catch (error) {
    // Element not found or not visible within timeout
    return false;
  }
}
