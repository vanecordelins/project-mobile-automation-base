/**
 * Shared configuration constants for mobile test automation
 * @module constants
 */

/**
 * Timeout values in milliseconds used across the test framework
 * @constant {Object} TIMEOUTS
 * @property {number} ELEMENT_WAIT - Standard element wait timeout (5000ms)
 * @property {number} POPUP_WAIT - Popup appearance timeout (3000ms)
 * @property {number} PAGE_LOAD - Page load timeout (10000ms)
 * @property {number} CUCUMBER_STEP - Cucumber step timeout reference (60000ms)
 * @example
 * import { TIMEOUTS } from '../utils/constants.js';
 * await element.waitForDisplayed({ timeout: TIMEOUTS.ELEMENT_WAIT });
 */
export const TIMEOUTS = {
  ELEMENT_WAIT: 5000,
  POPUP_WAIT: 3000,
  PAGE_LOAD: 10000,
  CUCUMBER_STEP: 60000
};

/**
 * Common Android resource IDs used across the framework
 * @constant {Object} ANDROID_IDS
 * @property {string} ALERT_MESSAGE - Alert dialog message text resource ID
 * @property {string} ALERT_BUTTON_POSITIVE - Alert dialog OK button resource ID
 * @property {string} ALERT_BUTTON_NEGATIVE - Alert dialog Cancel button resource ID
 * @example
 * import { ANDROID_IDS } from '../utils/constants.js';
 * const selector = `android=new UiSelector().resourceId("${ANDROID_IDS.ALERT_MESSAGE}")`;
 */
export const ANDROID_IDS = {
  ALERT_MESSAGE: 'android:id/message',
  ALERT_BUTTON_POSITIVE: 'android:id/button1',
  ALERT_BUTTON_NEGATIVE: 'android:id/button2'
};

/**
 * Common iOS selectors used across the framework
 * @constant {Object} IOS_SELECTORS
 * @property {string} ALERT_OK - Alert OK button accessibility ID
 * @property {string} ALERT_CANCEL - Alert Cancel button accessibility ID
 * @example
 * import { IOS_SELECTORS } from '../utils/constants.js';
 * const okButton = $(IOS_SELECTORS.ALERT_OK);
 */
export const IOS_SELECTORS = {
  ALERT_OK: '~OK',
  ALERT_CANCEL: '~Cancel'
};
