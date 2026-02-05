/**
 * Allure reporting and screenshot integration utilities
 * @module screenshotHelper
 */

import allureReporter from '@wdio/allure-reporter';

/**
 * Logs Allure step and captures screenshot in single call
 * @param {string} stepDescription - Step description for Allure report
 * @param {Object} [options={}] - Optional configuration
 * @param {boolean} [options.skipScreenshot=false] - Skip screenshot capture
 * @returns {Promise<void>}
 * @example
 * await logStepWithScreenshot("User clicks login button");
 * await logStepWithScreenshot("Navigate to page", { skipScreenshot: true });
 */
export async function logStepWithScreenshot(stepDescription, options = {}) {
  if (typeof stepDescription !== 'string' || stepDescription.trim() === '') {
    throw new TypeError('stepDescription must be a non-empty string');
  }

  // Add Allure step
  allureReporter.addStep(stepDescription);

  // Capture screenshot unless skipped
  if (!options.skipScreenshot) {
    try {
      const screenshot = await browser.takeScreenshot();
      allureReporter.addAttachment(
        stepDescription,
        Buffer.from(screenshot, 'base64'),
        'image/png'
      );
    } catch (error) {
      // Log warning but don't fail test execution
      console.warn(`Screenshot capture failed for step "${stepDescription}":`, error.message);
    }
  }
}

/**
 * Logs Allure step only (no screenshot)
 * @param {string} stepDescription - Step description for Allure report
 * @returns {void}
 * @example
 * logStepOnly("Starting login flow");
 */
export function logStepOnly(stepDescription) {
  if (typeof stepDescription !== 'string' || stepDescription.trim() === '') {
    throw new TypeError('stepDescription must be a non-empty string');
  }

  allureReporter.addStep(stepDescription);
}

/**
 * DEPRECATED: Use logStepWithScreenshot instead
 * Maintains backward compatibility with existing page objects
 * @param {string} screenshotName - Screenshot attachment name
 * @returns {Promise<void>}
 * @deprecated Use logStepWithScreenshot for new code
 */
export async function takeScreenshotAndAddToReport(screenshotName) {
  const screenshot = await browser.takeScreenshot();
  allureReporter.addAttachment(
    screenshotName,
    Buffer.from(screenshot, 'base64'),
    'image/png'
  );
}
