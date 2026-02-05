/**
 * Base class for page objects with common utilities
 *
 * Provides shared functionality for all page objects including:
 * - Platform-agnostic selector creation
 * - Common UI interactions with Allure reporting
 * - Screenshot capture integration
 *
 * @class BasePage
 * @abstract
 *
 * @example
 * // Extend BasePage in your page object
 * import BasePage from './BasePage.js';
 *
 * class LoginPage extends BasePage {
 *   async open() {
 *     await this.clickButton("Login");
 *   }
 *
 *   async login(email, password) {
 *     await this.setText("input-email", email);
 *     await this.setText("input-password", password);
 *     await this.clickButton("LOGIN");
 *   }
 * }
 *
 * // Export as singleton (page objects remain singletons, BasePage is not)
 * export default new LoginPage();
 *
 * @example
 * // When to use BasePage vs direct utilities:
 * // - Use BasePage: For new page objects to get all functionality via inheritance
 * // - Use utilities directly: For gradual migration of existing page objects
 */

import {
  createTextSelector,
  createAccessibilitySelector,
  createResourceSelector
} from '../utils/selectorHelper.js';
import {
  clickButton as clickButtonAction,
  getPopupMessage as getPopupMessageAction,
  confirmPopup as confirmPopupAction,
  setInputValue as setInputValueAction,
  isElementVisible as isElementVisibleAction
} from '../utils/actionHelper.js';
import { logStepWithScreenshot } from '../utils/screenshotHelper.js';
import { TIMEOUTS } from '../utils/constants.js';

export default class BasePage {
  /**
   * Opens the page (subclasses must implement)
   * @abstract
   * @returns {Promise<void>}
   * @throws {Error} If not implemented by subclass
   */
  async open() {
    throw new Error('Subclasses must implement open() method');
  }

  // ==================== Selector Utility Methods ====================

  /**
   * Creates text selector for current platform
   * @param {string} text - Visible text to locate
   * @returns {string} WebDriverIO selector
   * @protected
   * @example
   * const selector = this.getTextSelector("Login");
   * const element = $(selector);
   */
  getTextSelector(text) {
    return createTextSelector(text);
  }

  /**
   * Creates accessibility ID selector
   * @param {string} id - Accessibility identifier
   * @returns {string} WebDriverIO selector
   * @protected
   * @example
   * const selector = this.getAccessibilitySelector("input-email");
   * const element = $(selector);
   */
  getAccessibilitySelector(id) {
    return createAccessibilitySelector(id);
  }

  /**
   * Creates platform-specific resource ID selector
   * @param {string} androidResourceId - Android resource ID
   * @param {string} iosPredicateString - iOS predicate string
   * @returns {string} WebDriverIO selector
   * @protected
   * @example
   * const selector = this.getResourceSelector(
   *   "android:id/button1",
   *   "type == 'XCUIElementTypeButton'"
   * );
   */
  getResourceSelector(androidResourceId, iosPredicateString) {
    return createResourceSelector(androidResourceId, iosPredicateString);
  }

  // ==================== Action Utility Methods ====================

  /**
   * Clicks button by text with Allure reporting and screenshot
   * @param {string} buttonText - Visible button text
   * @param {Object} [options={}] - Optional timeout configuration
   * @param {number} [options.timeout=5000] - Wait timeout in ms
   * @returns {Promise<void>}
   * @protected
   * @example
   * await this.clickButton("Login");
   * await this.clickButton("Submit", { timeout: 10000 });
   */
  async clickButton(buttonText, options = {}) {
    await clickButtonAction(buttonText, options);
  }

  /**
   * Sets text input value with Allure reporting and screenshot
   * @param {string} accessibilityId - Input field accessibility ID
   * @param {string} value - Value to set
   * @returns {Promise<void>}
   * @protected
   * @example
   * await this.setText("input-email", "test@example.com");
   * await this.setText("input-password", "password123");
   */
  async setText(accessibilityId, value) {
    await setInputValueAction(accessibilityId, value);
  }

  /**
   * Waits for element to be displayed
   * @param {string} selector - WebDriverIO selector
   * @param {Object} [options={}] - Optional timeout configuration
   * @param {number} [options.timeout=5000] - Wait timeout in ms
   * @returns {Promise<void>}
   * @protected
   * @example
   * const selector = this.getTextSelector("Welcome");
   * await this.waitForElement(selector);
   * await this.waitForElement(selector, { timeout: 10000 });
   */
  async waitForElement(selector, options = {}) {
    const timeout = options.timeout || TIMEOUTS.ELEMENT_WAIT;
    const element = $(selector);
    await element.waitForDisplayed({ timeout });
  }

  /**
   * Gets popup message text with Allure reporting
   * @returns {Promise<string>} Popup message
   * @protected
   * @example
   * const message = await this.getPopupMessage();
   * expect(message).toContain("Success");
   */
  async getPopupMessage() {
    return await getPopupMessageAction();
  }

  /**
   * Confirms popup by clicking OK with Allure reporting
   * @returns {Promise<void>}
   * @protected
   * @example
   * await this.confirmPopup();
   */
  async confirmPopup() {
    await confirmPopupAction();
  }

  /**
   * Checks if element is visible
   * @param {string} selector - WebDriverIO selector
   * @param {Object} [options={}] - Optional timeout configuration
   * @param {number} [options.timeout=5000] - Wait timeout in ms
   * @returns {Promise<boolean>} True if visible, false otherwise
   * @protected
   * @example
   * const isVisible = await this.isElementVisible('~home-button');
   * if (isVisible) {
   *   // Element is visible
   * }
   */
  async isElementVisible(selector, options = {}) {
    return await isElementVisibleAction(selector, options);
  }

  /**
   * Logs step with screenshot using Allure
   * @param {string} stepDescription - Step description
   * @param {Object} [options={}] - Optional configuration
   * @param {boolean} [options.skipScreenshot=false] - Skip screenshot
   * @returns {Promise<void>}
   * @protected
   * @example
   * await this.logStep("User navigates to login page");
   * await this.logStep("Starting test", { skipScreenshot: true });
   */
  async logStep(stepDescription, options = {}) {
    await logStepWithScreenshot(stepDescription, options);
  }
}
