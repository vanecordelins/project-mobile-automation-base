/**
 * Selector creation utilities for cross-platform element identification
 * @module selectorHelper
 */

/**
 * Creates platform-specific text selector for locating elements by visible text
 * @param {string} text - Visible text to locate
 * @returns {string} WebDriverIO selector string
 * @throws {TypeError} If text parameter is not a non-empty string
 * @example
 * // Android returns: 'android=new UiSelector().text("Login")'
 * // iOS returns: '~Login'
 * const selector = createTextSelector("Login");
 * const element = $(selector);
 */
export function createTextSelector(text) {
  if (typeof text !== 'string' || text.trim() === '') {
    throw new TypeError('text parameter must be a non-empty string');
  }

  return browser.isAndroid
    ? `android=new UiSelector().text("${text}")`
    : `~${text}`;
}

/**
 * Creates platform-agnostic accessibility ID selector
 * @param {string} accessibilityId - Accessibility identifier
 * @returns {string} WebDriverIO selector string
 * @throws {TypeError} If accessibilityId parameter is not a non-empty string
 * @example
 * // Both platforms return: '~input-email'
 * const selector = createAccessibilitySelector("input-email");
 * const element = $(selector);
 */
export function createAccessibilitySelector(accessibilityId) {
  if (typeof accessibilityId !== 'string' || accessibilityId.trim() === '') {
    throw new TypeError('accessibilityId parameter must be a non-empty string');
  }

  return `~${accessibilityId}`;
}

/**
 * Creates platform-specific resource/element ID selector
 * @param {string} androidResourceId - Android resource ID (e.g., "android:id/button1")
 * @param {string} iosPredicateString - iOS predicate string (e.g., "type == 'XCUIElementTypeButton'")
 * @returns {string} WebDriverIO selector string
 * @throws {TypeError} If parameters are not non-empty strings
 * @example
 * const selector = createResourceSelector(
 *   "android:id/button1",
 *   "type == 'XCUIElementTypeButton' AND name == 'OK'"
 * );
 * const element = $(selector);
 */
export function createResourceSelector(androidResourceId, iosPredicateString) {
  if (typeof androidResourceId !== 'string' || androidResourceId.trim() === '') {
    throw new TypeError('androidResourceId parameter must be a non-empty string');
  }
  if (typeof iosPredicateString !== 'string' || iosPredicateString.trim() === '') {
    throw new TypeError('iosPredicateString parameter must be a non-empty string');
  }

  return browser.isAndroid
    ? `android=new UiSelector().resourceId("${androidResourceId}")`
    : `-ios predicate string:${iosPredicateString}`;
}

/**
 * Creates combined text + description selector with Android content-desc fallback
 * @param {string} text - Primary text to locate
 * @param {string} [description] - Android content-desc fallback (optional)
 * @returns {string} WebDriverIO selector string
 * @throws {TypeError} If text parameter is not a non-empty string
 * @example
 * // Android with description: 'android=new UiSelector().description("button-SIGN UP")'
 * // Android without description: 'android=new UiSelector().text("Sign Up")'
 * // iOS: '~Sign Up'
 * const selector = createTextOrDescriptionSelector("Sign Up", "button-SIGN UP");
 */
export function createTextOrDescriptionSelector(text, description) {
  if (typeof text !== 'string' || text.trim() === '') {
    throw new TypeError('text parameter must be a non-empty string');
  }

  if (browser.isAndroid) {
    if (description && typeof description === 'string' && description.trim() !== '') {
      return `android=new UiSelector().description("${description}")`;
    }
    return `android=new UiSelector().text("${text}")`;
  }

  return `~${text}`;
}
